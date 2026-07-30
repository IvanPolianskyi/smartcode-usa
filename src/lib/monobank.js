import crypto from 'crypto'

const API_BASE =
  process.env.MONOBANK_API_URL?.replace(/\/$/, '') || 'https://api.monobank.ua'
const TOKEN = process.env.MONOBANK_TOKEN || ''

/** ISO 4217 UAH */
export const MONOBANK_CCY_UAH = 980

let cachedPubKeyPem = null
let pubKeyFetchedAt = 0
const PUBKEY_TTL_MS = 60 * 60 * 1000

function requireToken() {
  if (!TOKEN) {
    throw new Error('Monobank: MONOBANK_TOKEN is not configured')
  }
  return TOKEN
}

async function monobankFetch(path, { method = 'GET', body } = {}) {
  const token = requireToken()
  const url = `${API_BASE}${path}`
  const init = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
    cache: 'no-store',
  }
  if (body !== undefined) {
    init.body = JSON.stringify(body)
  }
  const res = await fetch(url, init)
  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { raw: text }
    }
  }
  if (!res.ok) {
    const msg =
      data?.errText ||
      data?.errorDescription ||
      data?.message ||
      (typeof data === 'string' ? data : JSON.stringify(data))
    throw new Error(`Monobank API ${res.status}: ${msg || res.statusText}`)
  }
  return data
}

/**
 * Створення рахунку (amount у копійках).
 * @see https://monobank.ua/api-docs/acquiring/methods/ia/post--api--merchant--invoice--create
 */
export async function createMonobankInvoice({
  amount,
  ccy = MONOBANK_CCY_UAH,
  reference,
  destination,
  redirectUrl,
  webHookUrl,
  basketOrder,
  validity,
}) {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('Monobank: amount must be a positive integer (kopiyky)')
  }

  const merchantPaymInfo = {
    reference: String(reference),
    destination: String(destination || 'Оплата SmartCode'),
  }
  if (Array.isArray(basketOrder) && basketOrder.length > 0) {
    merchantPaymInfo.basketOrder = basketOrder
  }

  const payload = {
    amount,
    ccy,
    merchantPaymInfo,
    redirectUrl,
    webHookUrl,
  }
  if (validity != null) payload.validity = validity

  const data = await monobankFetch('/api/merchant/invoice/create', {
    method: 'POST',
    body: payload,
  })

  if (!data?.pageUrl || !data?.invoiceId) {
    throw new Error('Monobank: missing pageUrl or invoiceId in response')
  }

  return {
    invoiceId: data.invoiceId,
    pageUrl: data.pageUrl,
    appUrl: data.appUrl || null,
  }
}

/**
 * Статус рахунку.
 * @see https://monobank.ua/api-docs/acquiring/methods/ia/get--api--merchant--invoice--status
 */
export async function getMonobankInvoiceStatus(invoiceId) {
  if (!invoiceId) throw new Error('Monobank: invoiceId is required')
  const q = encodeURIComponent(String(invoiceId))
  return monobankFetch(`/api/merchant/invoice/status?invoiceId=${q}`)
}

export async function fetchMonobankPubKeyPem(force = false) {
  const now = Date.now()
  if (!force && cachedPubKeyPem && now - pubKeyFetchedAt < PUBKEY_TTL_MS) {
    return cachedPubKeyPem
  }
  const data = await monobankFetch('/api/merchant/pubkey')
  const key =
    data?.key ||
    data?.pubKey ||
    data?.publicKey ||
    (typeof data === 'string' ? data : null)
  if (!key) {
    throw new Error('Monobank: empty pubkey response')
  }
  cachedPubKeyPem = Buffer.from(key, 'base64').toString('utf8')
  pubKeyFetchedAt = now
  return cachedPubKeyPem
}

/**
 * Перевірка підпису webhook (X-Sign, ECDSA SHA256).
 * @see https://monobank.ua/api-docs/acquiring/dev/webhooks/verify
 */
export async function verifyMonobankWebhook(rawBody, xSignBase64) {
  if (!xSignBase64) return false
  // Ніколи не пропускати перевірку на production.
  if (
    process.env.MONOBANK_SKIP_WEBHOOK_VERIFY === 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.VERCEL_ENV !== 'production'
  ) {
    return true
  }
  try {
    const pubKeyPem = await fetchMonobankPubKeyPem()
    const signatureBuf = Buffer.from(xSignBase64, 'base64')
    const verify = crypto.createVerify('SHA256')
    verify.update(rawBody)
    verify.end()
    return verify.verify(pubKeyPem, signatureBuf)
  } catch (e) {
    console.error('Monobank webhook verify error:', e)
    return false
  }
}

/** UAH (грн) → копійки для API. */
export function uahToKopiyky(uah) {
  const n = Number(uah)
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.round(n * 100)
}

export function isMonobankSuccessStatus(status) {
  return String(status || '').toLowerCase() === 'success'
}

export function mapMonobankStatusToPayment(status) {
  const s = String(status || '').toLowerCase()
  if (s === 'success') return 'completed'
  if (s === 'failure' || s === 'reversed' || s === 'expired') return 'failed'
  return 'pending'
}
