'use client'

const EXECUTION_TIMEOUT_MS = 10000
const INTERRUPT_GRACE_MS = 400

/** @type {Worker | null} */
let worker = null

function ensureBrowser() {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide can only run in the browser')
  }
}

function createInterruptBuffer() {
  try {
    if (typeof SharedArrayBuffer === 'undefined') return null
    return new Uint8Array(new SharedArrayBuffer(1))
  } catch {
    return null
  }
}

function createRequestId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `req-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function terminateWorker() {
  if (worker) {
    worker.terminate()
    worker = null
  }
}

function ensureWorker() {
  if (worker) return worker
  worker = new Worker(new URL('/pyodide-worker.js', window.location.origin))
  return worker
}

const DEFAULT_MESSAGES = {
  timeout: 'Execution timed out (10 s)',
  workerError: 'Python runtime error',
  workerStartFailed: 'Could not start Python in the browser',
}

/**
 * @param {string} code
 * @param {{
 *   stdin?: string,
 *   moduleId?: string,
 *   onLoading?: (phase: string) => void,
 *   messages?: { timeout?: string, workerError?: string, workerStartFailed?: string },
 * }} [options]
 */
export async function executePythonWithPyodide(code, options = {}) {
  const { stdin = '', moduleId, onLoading, messages: userMessages } = options
  const messages = { ...DEFAULT_MESSAGES, ...userMessages }
  ensureBrowser()

  onLoading?.('loading')
  const activeWorker = ensureWorker()
  const requestId = createRequestId()
  const interruptBuffer = createInterruptBuffer()

  return new Promise((resolve) => {
    let settled = false
    let timeoutId = null
    let killId = null

    const finish = (result) => {
      if (settled) return
      settled = true
      if (timeoutId) clearTimeout(timeoutId)
      if (killId) clearTimeout(killId)
      activeWorker.removeEventListener('message', onMessage)
      activeWorker.removeEventListener('error', onError)
      resolve(result)
    }

    const onMessage = (event) => {
      const data = event.data
      if (!data || data.requestId !== requestId || data.type !== 'result') return
      finish({
        success: Boolean(data.success),
        output: String(data.output || ''),
        errorOutput: String(data.errorOutput || ''),
        exitCode: data.exitCode ?? (data.success ? 0 : 1),
      })
    }

    const onError = () => {
      terminateWorker()
      finish({
        success: false,
        output: '',
        errorOutput: messages.workerError,
        exitCode: 1,
      })
    }

    activeWorker.addEventListener('message', onMessage)
    activeWorker.addEventListener('error', onError)

    const transfer = []
    const payload = {
      type: 'run',
      requestId,
      code,
      stdin,
      moduleId: moduleId || '',
      messages,
    }

    if (interruptBuffer) {
      payload.interruptBuffer = interruptBuffer
      transfer.push(interruptBuffer.buffer)
    }

    try {
      activeWorker.postMessage(payload, transfer)
    } catch {
      terminateWorker()
      finish({
        success: false,
        output: '',
        errorOutput: messages.workerStartFailed,
        exitCode: 1,
      })
      return
    }

    timeoutId = setTimeout(() => {
      if (interruptBuffer) {
        interruptBuffer[0] = 2
      }
      killId = setTimeout(() => {
        terminateWorker()
        finish({
          success: false,
          output: '',
          errorOutput: messages.timeout,
          exitCode: 1,
        })
      }, INTERRUPT_GRACE_MS)
    }, EXECUTION_TIMEOUT_MS)
  })
}

export function resetPyodideForTests() {
  terminateWorker()
}
