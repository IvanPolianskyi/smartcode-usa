/* global loadPyodide */
/* eslint-disable no-restricted-globals */

const PYODIDE_VERSION = '0.26.4'
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

let pyodide = null
let pyodideLoading = null
const loadedPackages = new Set()

function post(payload) {
  self.postMessage(payload)
}

async function ensurePyodide() {
  if (pyodide) return pyodide
  if (!pyodideLoading) {
    pyodideLoading = (async () => {
      importScripts(`${PYODIDE_CDN}pyodide.js`)
      pyodide = await loadPyodide({ indexURL: PYODIDE_CDN })
      return pyodide
    })()
  }
  return pyodideLoading
}

async function ensureModulePackages(moduleId) {
  if (!moduleId || loadedPackages.has(moduleId)) return

  const packagesByModule = {
    'module-09': ['micropip'],
    'module-10': ['pillow'],
  }

  const packages = packagesByModule[moduleId]
  if (!packages?.length) return

  const instance = await ensurePyodide()
  await instance.loadPackage(packages)
  loadedPackages.add(moduleId)

  if (moduleId === 'module-09') {
    await instance.runPythonAsync(`
import micropip
await micropip.install('requests')
await micropip.install('beautifulsoup4')
`)
  }
}

function formatError(error, stderr, messages) {
  const stderrText = stderr?.trim() || ''
  const message = String(error?.message || error || '')
  const timeoutMsg = messages?.timeout || 'Execution timed out (10 s)'

  if (
    message.includes('KeyboardInterrupt') ||
    stderrText.includes('KeyboardInterrupt')
  ) {
    return timeoutMsg
  }

  if (stderrText) return stderrText
  return message.replace(/^PythonError:\s*/i, '').trim() || message || 'Unknown error'
}

async function runPython({ requestId, code, stdin, moduleId, interruptBuffer, messages }) {
  const instance = await ensurePyodide()
  await ensureModulePackages(moduleId)

  if (interruptBuffer) {
    instance.setInterruptBuffer(interruptBuffer)
  } else {
    instance.setInterruptBuffer(undefined)
  }

  let stdout = ''
  let stderr = ''

  instance.setStdout({ batched: (text) => { stdout += text } })
  instance.setStderr({ batched: (text) => { stderr += text } })

  if (stdin) {
    const lines = stdin.replace(/\r\n/g, '\n').split('\n')
    let index = 0
    instance.setStdin({
      stdin: () => {
        if (index >= lines.length) return null
        const line = lines[index]
        index += 1
        if (line === '') return '\n'
        return line.endsWith('\n') ? line : `${line}\n`
      },
      isatty: () => true,
    })
  } else {
    instance.setStdin({ error: true })
  }

  try {
    await instance.runPythonAsync(code)
    post({
      type: 'result',
      requestId,
      success: true,
      output: stdout,
      errorOutput: stderr.trim(),
      exitCode: 0,
    })
  } catch (error) {
    post({
      type: 'result',
      requestId,
      success: false,
      output: stdout,
      errorOutput: formatError(error, stderr, messages),
      exitCode: 1,
    })
  } finally {
    if (interruptBuffer) {
      interruptBuffer[0] = 0
    }
  }
}

self.onmessage = async (event) => {
  const data = event.data || {}

  if (data.type === 'ping') {
    post({ type: 'pong' })
    return
  }

  if (data.type === 'run') {
    try {
      await runPython(data)
    } catch (error) {
      post({
        type: 'result',
        requestId: data.requestId,
        success: false,
        output: '',
        errorOutput: formatError(error, '', data.messages),
        exitCode: 1,
      })
    }
  }
}
