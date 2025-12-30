import { NextResponse } from 'next/server'
import { spawn } from 'child_process'

const EXECUTION_TIMEOUT = 10000 // 10 seconds
const MAX_OUTPUT_LENGTH = 10000 // Maximum output length

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { code } = body || {}

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Код не надано або має неправильний формат' },
        { status: 400 }
      )
    }

    // Basic security: check for dangerous operations
    const dangerousPatterns = [
      /import\s+os/,
      /import\s+subprocess/,
      /import\s+sys/,
      /__import__/,
      /eval\(/,
      /exec\(/,
      /compile\(/,
      /open\(['"]\/etc/,
      /open\(['"]\/proc/,
      /open\(['"]\/sys/,
      /rm\s+-rf/,
      /shutil\./,
    ]

    const hasDangerousCode = dangerousPatterns.some(pattern => pattern.test(code))
    
    if (hasDangerousCode) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Код містить небезпечні операції, які не дозволені для виконання',
          output: '',
          errorOutput: ''
        },
        { status: 400 }
      )
    }

    // Wrap code to ensure UTF-8 encoding
    // Add encoding declaration and ensure stdout/stderr use UTF-8
    const wrappedCode = `# -*- coding: utf-8 -*-
import sys
import io

# Set UTF-8 encoding for stdout and stderr
if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
if sys.stderr.encoding != 'utf-8':
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

${code}`

    // Execute Python code
    return await new Promise((resolve) => {
      let stdout = ''
      let stderr = ''
      let isResolved = false

      // Spawn Python process with UTF-8 encoding
      const pythonProcess = spawn('python', ['-c', wrappedCode], {
        shell: false,
        env: { 
          ...process.env, 
          PYTHONUNBUFFERED: '1',
          PYTHONIOENCODING: 'utf-8',
          LANG: 'en_US.UTF-8',
          LC_ALL: 'en_US.UTF-8'
        }
      })

      // Set encoding for streams
      pythonProcess.stdout.setEncoding('utf8')
      pythonProcess.stderr.setEncoding('utf8')

      // Collect stdout with proper UTF-8 handling
      pythonProcess.stdout.on('data', (data) => {
        // Ensure data is treated as UTF-8 string
        const text = Buffer.isBuffer(data) ? data.toString('utf8') : String(data)
        stdout += text
        if (stdout.length > MAX_OUTPUT_LENGTH) {
          stdout = stdout.substring(0, MAX_OUTPUT_LENGTH) + '\n... (вивід обрізано)'
          if (!isResolved) {
            pythonProcess.kill()
          }
        }
      })

      // Collect stderr with proper UTF-8 handling
      pythonProcess.stderr.on('data', (data) => {
        // Ensure data is treated as UTF-8 string
        const text = Buffer.isBuffer(data) ? data.toString('utf8') : String(data)
        stderr += text
        if (stderr.length > MAX_OUTPUT_LENGTH) {
          stderr = stderr.substring(0, MAX_OUTPUT_LENGTH) + '\n... (помилки обрізано)'
        }
      })

      // Set timeout
      const timeoutId = setTimeout(() => {
        if (!isResolved) {
          isResolved = true
          pythonProcess.kill()
          resolve(NextResponse.json({
            success: false,
            error: `Час виконання перевищено (більше ${EXECUTION_TIMEOUT / 1000} секунд)`,
            output: stdout.trim(),
            errorOutput: stderr.trim() || 'Процес було перервано через таймаут'
          }, { status: 408 }))
        }
      }, EXECUTION_TIMEOUT)

      // Handle process completion
      pythonProcess.on('close', (code) => {
        if (isResolved) return
        isResolved = true
        clearTimeout(timeoutId)

        resolve(NextResponse.json({
          success: code === 0,
          output: stdout.trim(),
          errorOutput: stderr.trim(),
          exitCode: code
        }))
      })

      // Handle process errors
      pythonProcess.on('error', (error) => {
        if (isResolved) return
        isResolved = true
        clearTimeout(timeoutId)

        // Check if Python is not installed
        if (error.code === 'ENOENT') {
          resolve(NextResponse.json({
            success: false,
            error: 'Python не встановлено на сервері. Будь ласка, встановіть Python для виконання коду.',
            output: '',
            errorOutput: ''
          }, { status: 500 }))
        } else {
          resolve(NextResponse.json({
            success: false,
            error: `Помилка виконання: ${error.message}`,
            output: stdout.trim(),
            errorOutput: stderr.trim()
          }, { status: 500 }))
        }
      })
    })

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

