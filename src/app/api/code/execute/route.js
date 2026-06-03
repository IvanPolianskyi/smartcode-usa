import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { writeFile, mkdtemp, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { hasStudentCourseAccess } from '@/lib/courseLessonAccess'
import { checkCodeExecuteRateLimit } from '@/lib/codeExecuteRateLimit'
import {
  validateStudentPythonCode,
  wrapStudentPythonCode,
  filterSensitiveExecutionOutput,
  parseCodeExecuteStdin,
  buildSafePythonProcessEnv,
} from '@/lib/pythonExecutionSecurity'

const EXECUTION_TIMEOUT = 10_000
const MAX_OUTPUT_LENGTH = 10_000

const CRM_BACKEND_URL = (
  process.env.CODE_RUNNER_BACKEND_URL ||
  process.env.CRM_API_URL ||
  process.env.SMARTCODE_CRM_API_URL ||
  ''
).replace(/\/$/, '')

const CODE_RUNNER_SECRET = (
  process.env.CODE_RUNNER_SECRET ||
  process.env.JWT_SECRET ||
  ''
).trim()

const ALLOW_LOCAL_PYTHON_SPAWN = process.env.ALLOW_LOCAL_PYTHON_SPAWN === 'true'
const ALLOW_PUBLIC_PISTON_RUNNER = process.env.ALLOW_PUBLIC_PISTON_RUNNER === 'true'

const PISTON_API_KEY = process.env.PISTON_API_KEY || process.env.CODE_RUNNER_API_KEY || ''

const CODE_RUNNER_URLS = (process.env.CODE_RUNNER_URLS || process.env.CODE_RUNNER_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

const DEFAULT_PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

const LOCAL_PYTHON_COMMANDS = [
  { command: 'python3', scriptArg: (scriptPath) => [scriptPath] },
  { command: 'python', scriptArg: (scriptPath) => [scriptPath] },
  { command: 'py', scriptArg: (scriptPath) => ['-3', scriptPath] },
]

async function runLocalPythonFromFile(scriptPath, stdinData) {
  const safeEnv = buildSafePythonProcessEnv()
  let lastError = null

  for (const { command, scriptArg } of LOCAL_PYTHON_COMMANDS) {
    try {
      const result = await new Promise((resolve, reject) => {
        let stdout = ''
        let stderr = ''
        const pythonProcess = spawn(command, scriptArg(scriptPath), {
          shell: false,
          stdio: ['pipe', 'pipe', 'pipe'],
          env: safeEnv,
        })

        const timeoutId = setTimeout(() => {
          pythonProcess.kill()
          reject(new Error('LOCAL_TIMEOUT'))
        }, EXECUTION_TIMEOUT)

        pythonProcess.stdout.setEncoding('utf8')
        pythonProcess.stderr.setEncoding('utf8')
        pythonProcess.stdout.on('data', (data) => {
          stdout += data
        })
        pythonProcess.stderr.on('data', (data) => {
          stderr += data
        })

        if (stdinData) {
          pythonProcess.stdin.write(stdinData, 'utf8')
        }
        pythonProcess.stdin.end()

        pythonProcess.on('error', (error) => {
          clearTimeout(timeoutId)
          reject(error)
        })

        pythonProcess.on('close', (code) => {
          clearTimeout(timeoutId)
          resolve({
            success: code === 0,
            output: stdout,
            errorOutput: stderr,
            exitCode: code,
          })
        })
      })
      return result
    } catch (error) {
      lastError = error
      if (error?.message === 'LOCAL_TIMEOUT') throw error
    }
  }

  throw lastError || new Error('Python interpreter not found')
}

async function runLocalPython(wrappedCode, stdinData) {
  const dir = await mkdtemp(join(tmpdir(), 'sc-python-'))
  const scriptPath = join(dir, 'student.py')
  try {
    await writeFile(scriptPath, wrappedCode, { encoding: 'utf8', mode: 0o600 })
    return await runLocalPythonFromFile(scriptPath, stdinData)
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

function getRunnerUrls() {
  if (CODE_RUNNER_URLS.length > 0) return CODE_RUNNER_URLS
  return ALLOW_PUBLIC_PISTON_RUNNER ? [DEFAULT_PISTON_URL] : []
}

function formatExecutionResponse(result) {
  const output = filterSensitiveExecutionOutput(String(result.output || '').trim()).slice(
    0,
    MAX_OUTPUT_LENGTH
  )
  const errorOutput = filterSensitiveExecutionOutput(String(result.errorOutput || '').trim()).slice(
    0,
    MAX_OUTPUT_LENGTH
  )
  return NextResponse.json({
    success: Boolean(result.success),
    output,
    errorOutput,
    exitCode: result.exitCode ?? (result.success ? 0 : 1),
  })
}

export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Увійдіть в акаунт, щоб запускати код на сервері' },
        { status: 401 }
      )
    }

    const rate = checkCodeExecuteRateLimit(userId)
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Забагато запусків. Спробуйте через ${rate.retryAfterSec} с.`,
        },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { code, input, moduleId, courseId } = body || {}

    if (!courseId || typeof courseId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'courseId обовʼязковий' },
        { status: 400 }
      )
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user || !hasStudentCourseAccess(user, courseId)) {
      return NextResponse.json(
        { success: false, error: 'Немає доступу до цього курсу' },
        { status: 403 }
      )
    }

    const validation = validateStudentPythonCode(code, moduleId)
    if (!validation.ok) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
          output: '',
          errorOutput: '',
        },
        { status: 400 }
      )
    }

    const stdinData = parseCodeExecuteStdin(input)
    const wrappedCode = wrapStudentPythonCode(code)
    const isVercel = Boolean(process.env.VERCEL)
    const isProduction = process.env.NODE_ENV === 'production'
    let lastErrorMessage = ''

    async function runViaOwnedBackend() {
      if (!CRM_BACKEND_URL) return null
      if (isProduction && !CODE_RUNNER_SECRET) {
        lastErrorMessage = 'CODE_RUNNER_SECRET не налаштований'
        return null
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT + 2000)
      try {
        const headers = { 'Content-Type': 'application/json' }
        if (CODE_RUNNER_SECRET) {
          headers['X-Code-Runner-Secret'] = CODE_RUNNER_SECRET
        }
        const response = await fetch(`${CRM_BACKEND_URL}/code/execute`, {
          method: 'POST',
          headers,
          signal: controller.signal,
          body: JSON.stringify({
            wrapped_code: wrappedCode,
            stdin: stdinData || '',
            module_id: moduleId || null,
          }),
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok) {
          lastErrorMessage = data?.detail || `Backend runner returned ${response.status}`
          return null
        }
        return formatExecutionResponse({
          success: Boolean(data.success),
          output: data.output,
          errorOutput: data.errorOutput,
          exitCode: data.exitCode,
        })
      } catch (error) {
        lastErrorMessage =
          error?.name === 'AbortError' ? 'Backend runner timed out' : 'Backend runner failed'
        return null
      } finally {
        clearTimeout(timeoutId)
      }
    }

    if (!isVercel && ALLOW_LOCAL_PYTHON_SPAWN) {
      try {
        const localResult = await runLocalPython(wrappedCode, stdinData)
        return formatExecutionResponse(localResult)
      } catch (localError) {
        lastErrorMessage = localError?.message || 'Local python execution failed'
      }
    }

    const backendResponse = await runViaOwnedBackend()
    if (backendResponse) return backendResponse

    if (ALLOW_PUBLIC_PISTON_RUNNER) {
      const runnerUrls = getRunnerUrls()
      for (const runnerUrl of runnerUrls) {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT)
        try {
          const headers = { 'Content-Type': 'application/json' }
          if (PISTON_API_KEY) headers.Authorization = PISTON_API_KEY
          const response = await fetch(runnerUrl, {
            method: 'POST',
            headers,
            signal: controller.signal,
            body: JSON.stringify({
              language: 'python',
              version: '3.10.0',
              files: [{ content: wrappedCode }],
              stdin: stdinData || '',
              run_timeout: EXECUTION_TIMEOUT,
              compile_timeout: 5000,
            }),
          })
          const runnerData = await response.json().catch(() => ({}))
          if (!response.ok) {
            lastErrorMessage = `Runner ${runnerUrl} returned ${response.status}`
            continue
          }
          const run = runnerData?.run || {}
          return formatExecutionResponse({
            success: (run.code ?? 1) === 0,
            output: run.stdout || '',
            errorOutput: run.stderr || '',
            exitCode: run.code ?? 1,
          })
        } catch (error) {
          lastErrorMessage =
            error?.name === 'AbortError'
              ? `Runner ${runnerUrl} timed out`
              : `Runner ${runnerUrl} failed`
        } finally {
          clearTimeout(timeoutId)
        }
      }
    }

    const guidance = isVercel
      ? 'Налаштуйте CRM_API_URL і CODE_RUNNER_SECRET (ваш Railway backend /code/execute).'
      : 'Увімкніть ALLOW_LOCAL_PYTHON_SPAWN=true або CRM_API_URL для вашого Python runner.'

    return NextResponse.json(
      {
        success: false,
        error: guidance,
        output: '',
        errorOutput: lastErrorMessage,
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('Error executing code:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Внутрішня помилка сервера',
        output: '',
        errorOutput: '',
      },
      { status: 500 }
    )
  }
}
