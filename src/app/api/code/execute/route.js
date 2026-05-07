import { NextResponse } from 'next/server'
import { spawn } from 'child_process'

const EXECUTION_TIMEOUT = 10000 // 10 seconds
const MAX_OUTPUT_LENGTH = 10000 // Maximum output length
const CODE_RUNNER_URLS = (
  process.env.CODE_RUNNER_URLS ||
  process.env.CODE_RUNNER_URL ||
  'https://emkc.org/api/v2/piston/execute,https://piston.rs/api/v2/execute'
)
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

function runLocalPython(wrappedCode, stdinData) {
  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    const pythonProcess = spawn('python', ['-c', wrappedCode], {
      shell: false,
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    const timeoutId = setTimeout(() => {
      pythonProcess.kill()
      reject(new Error('LOCAL_TIMEOUT'))
    }, EXECUTION_TIMEOUT)

    pythonProcess.stdout.setEncoding('utf8')
    pythonProcess.stderr.setEncoding('utf8')
    pythonProcess.stdout.on('data', (data) => { stdout += data })
    pythonProcess.stderr.on('data', (data) => { stderr += data })

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
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { code, input, moduleId } = body || {}

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Код не надано або має неправильний формат' },
        { status: 400 }
      )
    }

    // Prepare input data for stdin
    let stdinData = ''
    if (input) {
      if (Array.isArray(input)) {
        // If input is an array, join with newlines
        stdinData = input.join('\n') + '\n'
      } else if (typeof input === 'string') {
        // If input is a string, parse it (expecting format like "Введіть ваш вік: 20\n...")
        // Extract values after colons
        const lines = input.split('\n').filter(line => line.trim())
        stdinData = lines.map(line => {
          // Try to extract value after colon
          const colonMatch = line.match(/:\s*(.+)$/)
          if (colonMatch) {
            return colonMatch[1].trim()
          }
          // If no colon, try to extract number or text
          const numberMatch = line.match(/\d+/)
          if (numberMatch) {
            return numberMatch[0]
          }
          // Return the line as is if no pattern matches
          return line.trim()
        }).filter(val => val).join('\n') + '\n'
      }
    }

    // Comprehensive security: check for dangerous operations
    const dangerousPatterns = [
      // System access
      /import\s+os\b/,
      /from\s+os\s+import/,
      /import\s+subprocess\b/,
      /from\s+subprocess\s+import/,
      /import\s+commands\b/,
      /from\s+commands\s+import/,
      
      // Dynamic code execution
      /__import__\s*\(/,
      /eval\s*\(/,
      /exec\s*\(/,
      /compile\s*\(/,
      /execfile\s*\(/,
      
      // File system access (dangerous paths)
      /open\s*\(['"]\/etc/,
      /open\s*\(['"]\/proc/,
      /open\s*\(['"]\/sys/,
      /open\s*\(['"]\/dev/,
      /open\s*\(['"]\/root/,
      /open\s*\(['"]\/home/,
      /open\s*\(['"]\/var/,
      /open\s*\(['"]\/usr/,
      /open\s*\(['"]\.\./,
      /file\s*\(/,
      
      // Network access
      /import\s+requests\b/,
      /from\s+requests\s+import/,
      /import\s+urllib\b/,
      /from\s+urllib\s+import/,
      /import\s+urllib2\b/,
      /from\s+urllib2\s+import/,
      /import\s+http\.client\b/,
      /from\s+http\.client\s+import/,
      /import\s+socket\b/,
      /from\s+socket\s+import/,
      /import\s+ftplib\b/,
      /from\s+ftplib\s+import/,
      /import\s+telnetlib\b/,
      /from\s+telnetlib\s+import/,
      /import\s+httplib\b/,
      /from\s+httplib\s+import/,
      
      // System commands
      /os\.system\s*\(/,
      /os\.popen\s*\(/,
      /os\.spawn\s*\(/,
      /os\.exec\s*\(/,
      /subprocess\.call\s*\(/,
      /subprocess\.Popen\s*\(/,
      /subprocess\.run\s*\(/,
      /subprocess\.check_call\s*\(/,
      /subprocess\.check_output\s*\(/,
      /commands\.getoutput\s*\(/,
      /commands\.getstatusoutput\s*\(/,
      
      // File operations
      /shutil\./,
      /rm\s+-rf/,
      /rmdir\s*\(/,
      /remove\s*\(/,
      /unlink\s*\(/,
      /rmtree\s*\(/,
      
      // Environment access
      /os\.environ/,
      /os\.getenv\s*\(/,
      /os\.putenv\s*\(/,
      /os\.setenv\s*\(/,
      
      // Process control
      /os\.kill\s*\(/,
      /os\.killpg\s*\(/,
      /signal\./,
      
      // Import manipulation
      /importlib\./,
      /imp\./,
      /__builtin__\./,
      /builtins\./,
      
      // Database access
      /import\s+sqlite3\b/,
      /from\s+sqlite3\s+import/,
      /import\s+MySQLdb\b/,
      /from\s+MySQLdb\s+import/,
      /import\s+psycopg2\b/,
      /from\s+psycopg2\s+import/,
      /import\s+pymongo\b/,
      /from\s+pymongo\s+import/,
      
      // Pickle and serialization (can execute code)
      /pickle\.loads\s*\(/,
      /pickle\.load\s*\(/,
      /marshal\.loads\s*\(/,
      /marshal\.load\s*\(/,
      /yaml\.load\s*\(/,
      
      // Reflection and introspection
      /getattr\s*\(/,
      /setattr\s*\(/,
      /delattr\s*\(/,
      /hasattr\s*\(/,
      /__getattribute__/,
      /__setattr__/,
      
      // Threading (potential DoS)
      /threading\.Thread\s*\(/,
      /multiprocessing\.Process\s*\(/,
      /multiprocessing\.Pool\s*\(/,
      
      // System info access
      /platform\./,
      /sys\.modules/,
      /sys\.path/,
      
      // Dangerous string operations that could be used for injection
      /\.format\s*\(.*\{.*__/,
      
      // File path traversal attempts
      /\.\.\/\.\./,
      /\.\.\\\.\./,
    ]

    // Normalize code for checking (remove comments and strings to avoid false positives)
    const normalizeCode = (code) => {
      // Remove single-line comments
      let normalized = code.replace(/#.*$/gm, '')
      // Remove multi-line strings (basic)
      normalized = normalized.replace(/""".*?"""/gs, '')
      normalized = normalized.replace(/'''.*?'''/gs, '')
      normalized = normalized.replace(/"[^"]*"/g, '')
      normalized = normalized.replace(/'[^']*'/g, '')
      return normalized
    }

    const normalizedCode = normalizeCode(code)
    
    // Filter dangerous patterns - allow requests and bs4 for module-09, PIL for module-10
    let filteredPatterns = dangerousPatterns
    if (moduleId === 'module-09') {
      // Remove requests, bs4, and safe subprocess usage from blocked patterns for module-09
      filteredPatterns = dangerousPatterns.filter(pattern => {
        const patternStr = pattern.toString()
        // Allow requests and bs4 imports
        if (patternStr.includes('requests') || patternStr.includes('bs4') || patternStr.includes('beautifulsoup')) {
          return false
        }
        // Allow subprocess.check_call only for pip install (safe usage)
        // This is handled in the wrapped code, not user code
        return true
      })
    } else if (moduleId === 'module-10') {
      // Remove PIL/Pillow imports from blocked patterns for module-10
      filteredPatterns = dangerousPatterns.filter(pattern => {
        const patternStr = pattern.toString()
        // Allow PIL/Pillow imports
        if (patternStr.includes('PIL') || patternStr.includes('Image')) {
          return false
        }
        return true
      })
    }
    
    const hasDangerousCode = filteredPatterns.some(pattern => pattern.test(normalizedCode))
    
    if (hasDangerousCode) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Код містить небезпечні операції, які не дозволені для виконання. Будь ласка, використовуйте тільки безпечні Python конструкції для навчання.',
          output: '',
          errorOutput: ''
        },
        { status: 400 }
      )
    }
    
    // Additional check: prevent code that's too long (potential DoS)
    if (code.length > 50000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Код занадто довгий. Максимальна довжина: 50000 символів',
          output: '',
          errorOutput: ''
        },
        { status: 400 }
      )
    }

    // Wrap code to ensure UTF-8 encoding in remote runtime
    const wrappedCode = `# -*- coding: utf-8 -*-
import sys
import io

# Set UTF-8 encoding for stdout and stderr
if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
if sys.stderr.encoding != 'utf-8':
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
${code}`
    const filterSensitiveInfo = (text) => {
      if (!text) return ''
      let filtered = String(text)
        .replace(/\/home\/[^\s\n]+/g, '[path removed]')
        .replace(/\/root\/[^\s\n]+/g, '[path removed]')
        .replace(/\/etc\/[^\s\n]+/g, '[path removed]')
        .replace(/\/var\/[^\s\n]+/g, '[path removed]')
        .replace(/\/usr\/[^\s\n]+/g, '[path removed]')
        .replace(/\/proc\/[^\s\n]+/g, '[path removed]')
        .replace(/\/sys\/[^\s\n]+/g, '[path removed]')
      filtered = filtered.replace(/(api[_-]?key|token|password|secret|auth)[\s:=]+([^\s\n]+)/gi, '$1=[hidden]')
      return filtered
    }

    let lastErrorMessage = ''

    const isVercel = Boolean(process.env.VERCEL)
    if (!isVercel) {
      try {
        const localResult = await runLocalPython(wrappedCode, stdinData)
        return NextResponse.json({
          success: localResult.success,
          output: localResult.output.trim().slice(0, MAX_OUTPUT_LENGTH),
          errorOutput: localResult.errorOutput.trim().slice(0, MAX_OUTPUT_LENGTH),
          exitCode: localResult.exitCode,
        })
      } catch (localError) {
        lastErrorMessage = localError?.message || 'Local python execution failed'
      }
    }

    for (const runnerUrl of CODE_RUNNER_URLS) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT)
      try {
        const response = await fetch(runnerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
        let stdout = filterSensitiveInfo(run.stdout || '')
        let stderr = filterSensitiveInfo(run.stderr || '')

        if (stdout.length > MAX_OUTPUT_LENGTH) {
          stdout = `${stdout.substring(0, MAX_OUTPUT_LENGTH)}\n... (вивід обрізано)`
        }
        if (stderr.length > MAX_OUTPUT_LENGTH) {
          stderr = `${stderr.substring(0, MAX_OUTPUT_LENGTH)}\n... (помилки обрізано)`
        }

        return NextResponse.json({
          success: (run.code ?? 1) === 0,
          output: stdout.trim(),
          errorOutput: stderr.trim(),
          exitCode: run.code ?? 1,
        })
      } catch (error) {
        if (error?.name === 'AbortError') {
          lastErrorMessage = `Runner ${runnerUrl} timed out`
          continue
        }
        lastErrorMessage = `Runner ${runnerUrl} failed`
      } finally {
        clearTimeout(timeoutId)
      }
    }

    const guidance = isVercel
      ? 'Сервіси виконання коду недоступні. Налаштуйте власний раннер у CODE_RUNNER_URLS для Vercel.'
      : 'Сервіси виконання коду недоступні і локальний Python fallback не спрацював.'

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
        errorOutput: ''
      },
      { status: 500 }
    )
  }
}

