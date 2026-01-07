import { NextResponse } from 'next/server'
import { spawn } from 'child_process'

const EXECUTION_TIMEOUT = 10000 // 10 seconds
const MAX_OUTPUT_LENGTH = 10000 // Maximum output length

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

    // Install required packages for module-09 and module-10 if needed
    let installPackages = ''
    if (moduleId === 'module-09') {
      installPackages = `
# Install required packages for module-09
import sys
import subprocess

def install_package(package_name, import_name=None):
    """Safely install a Python package if not already installed"""
    if import_name is None:
        import_name = package_name
    try:
        __import__(import_name)
    except ImportError:
        try:
            subprocess.check_call(
                [sys.executable, '-m', 'pip', 'install', '--quiet', '--user', package_name],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            __import__(import_name)
        except Exception:
            pass  # Silently fail if installation doesn't work

# Install required packages
install_package('beautifulsoup4', 'bs4')
install_package('requests')
`
    } else if (moduleId === 'module-10') {
      installPackages = `
# Install required packages for module-10
import sys
import subprocess

def install_package(package_name, import_name=None):
    """Safely install a Python package if not already installed"""
    if import_name is None:
        import_name = package_name
    try:
        __import__(import_name)
        return True
    except ImportError:
        try:
            subprocess.check_call(
                [sys.executable, '-m', 'pip', 'install', '--quiet', '--user', package_name],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                timeout=60
            )
            # Try to import again after installation
            try:
                __import__(import_name)
                return True
            except ImportError:
                # If still fails, try without --user flag
                try:
                    subprocess.check_call(
                        [sys.executable, '-m', 'pip', 'install', '--quiet', package_name],
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL,
                        timeout=60
                    )
                    __import__(import_name)
                    return True
                except Exception:
                    return False
        except Exception:
            return False
    return False

# Install required packages
install_package('Pillow', 'PIL')
`
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

${installPackages}
${code}`

    // Execute Python code
    return await new Promise((resolve) => {
      let stdout = ''
      let stderr = ''
      let isResolved = false

      // Spawn Python process with UTF-8 encoding and restricted environment
      // Create a minimal, safe environment
      const safeEnv = {
        PYTHONUNBUFFERED: '1',
        PYTHONIOENCODING: 'utf-8',
        LANG: 'en_US.UTF-8',
        LC_ALL: 'en_US.UTF-8',
        PATH: '/usr/bin:/bin', // Minimal PATH
        HOME: '/tmp', // Safe home directory
        TMPDIR: '/tmp',
        // Remove potentially dangerous environment variables
        // Don't pass through process.env to prevent information leakage
      }

      // Spawn Python process with restricted environment
      const pythonProcess = spawn('python', ['-c', wrappedCode], {
        shell: false,
        env: safeEnv,
        stdio: ['pipe', 'pipe', 'pipe'], // Explicit stdio configuration
        detached: false, // Don't allow process to outlive parent
      })
      
      // Set resource limits (if available on the system)
      // Note: This requires appropriate permissions and may not work on all systems
      try {
        // Limit CPU time (if setrlimit is available)
        // This is handled by the timeout instead
      } catch (error) {
        // Ignore if resource limiting is not available
      }

      // Set encoding for streams
      pythonProcess.stdout.setEncoding('utf8')
      pythonProcess.stderr.setEncoding('utf8')
      pythonProcess.stdin.setEncoding('utf8')

      // Write input data to stdin if provided
      if (stdinData) {
        try {
          pythonProcess.stdin.write(stdinData, 'utf8')
          pythonProcess.stdin.end()
        } catch (error) {
          // If stdin is already closed, ignore the error
          console.error('Error writing to stdin:', error)
        }
      }

      // Filter function to remove sensitive information from output
      const filterSensitiveInfo = (text) => {
        if (!text) return text
        
        // Remove potential paths that might leak system information
        let filtered = text
          .replace(/\/home\/[^\s\n]+/g, '[path removed]')
          .replace(/\/root\/[^\s\n]+/g, '[path removed]')
          .replace(/\/etc\/[^\s\n]+/g, '[path removed]')
          .replace(/\/var\/[^\s\n]+/g, '[path removed]')
          .replace(/\/usr\/[^\s\n]+/g, '[path removed]')
          .replace(/\/proc\/[^\s\n]+/g, '[path removed]')
          .replace(/\/sys\/[^\s\n]+/g, '[path removed]')
        
        // Remove potential environment variable values
        filtered = filtered.replace(/([A-Z_]+)=([^\s\n]+)/g, (match, key, value) => {
          // Keep common safe env vars, filter others
          const safeVars = ['PATH', 'HOME', 'TMPDIR', 'LANG', 'LC_ALL', 'PYTHONUNBUFFERED', 'PYTHONIOENCODING']
          if (safeVars.includes(key)) {
            return match
          }
          return `${key}=[hidden]`
        })
        
        // Remove potential API keys, tokens, passwords (basic patterns)
        filtered = filtered.replace(/(api[_-]?key|token|password|secret|auth)[\s:=]+([^\s\n]+)/gi, '$1=[hidden]')
        
        return filtered
      }

      // Collect stdout with proper UTF-8 handling and filtering
      pythonProcess.stdout.on('data', (data) => {
        // Ensure data is treated as UTF-8 string
        const text = Buffer.isBuffer(data) ? data.toString('utf8') : String(data)
        const filteredText = filterSensitiveInfo(text)
        stdout += filteredText
        if (stdout.length > MAX_OUTPUT_LENGTH) {
          stdout = stdout.substring(0, MAX_OUTPUT_LENGTH) + '\n... (вивід обрізано)'
          if (!isResolved) {
            pythonProcess.kill()
          }
        }
      })

      // Collect stderr with proper UTF-8 handling and filtering
      pythonProcess.stderr.on('data', (data) => {
        // Ensure data is treated as UTF-8 string
        const text = Buffer.isBuffer(data) ? data.toString('utf8') : String(data)
        const filteredText = filterSensitiveInfo(text)
        stderr += filteredText
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

