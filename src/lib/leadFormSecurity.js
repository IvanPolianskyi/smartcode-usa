import crypto from 'crypto'
import { getCollection } from '@/lib/mongodb'

const TOKEN_VERSION = 1
const TOKEN_TTL_MS = 30 * 60 * 1000
const MIN_TOKEN_AGE_MS = 3000
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX_PER_IP = 3

function getSigningSecret() {
  const secret = process.env.LEAD_FORM_SIGNING_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'development') {
    return 'dev-only-insecure-lead-secret'
  }
  return null
}

function signPayload(payloadB64) {
  const secret = getSigningSecret()
  if (!secret) return null
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url')
}

function timingSafeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export function isUuidLike(value) {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  )
}

/**
 * Видає пару eventId + leadToken. eventId — чистий UUID для Meta; leadToken — HMAC-підпис сервера.
 */
export function issueLeadFormToken() {
  const secret = getSigningSecret()
  if (!secret) {
    return { ok: false, reason: 'signing_unconfigured' }
  }

  const eventId = crypto.randomUUID()
  const iat = Date.now()
  const exp = iat + TOKEN_TTL_MS
  const nonce = crypto.randomBytes(8).toString('hex')
  const payload = { v: TOKEN_VERSION, e: eventId, iat, exp, n: nonce }
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = signPayload(payloadB64)
  if (!sig) return { ok: false, reason: 'signing_unconfigured' }

  return {
    ok: true,
    eventId,
    leadToken: `${payloadB64}.${sig}`,
    exp,
  }
}

/**
 * @returns {{ ok: boolean, eventId?: string, reason?: string }}
 */
export function verifyLeadFormToken(leadToken) {
  const secret = getSigningSecret()
  if (!secret) {
    return { ok: false, reason: 'signing_unconfigured' }
  }
  if (typeof leadToken !== 'string' || !leadToken.includes('.')) {
    return { ok: false, reason: 'invalid_token' }
  }

  const dot = leadToken.lastIndexOf('.')
  const payloadB64 = leadToken.slice(0, dot)
  const sig = leadToken.slice(dot + 1)
  const expected = signPayload(payloadB64)
  if (!expected || !timingSafeEqual(sig, expected)) {
    return { ok: false, reason: 'invalid_signature' }
  }

  let payload
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
  } catch {
    return { ok: false, reason: 'invalid_payload' }
  }

  if (payload?.v !== TOKEN_VERSION || !isUuidLike(payload?.e)) {
    return { ok: false, reason: 'invalid_payload' }
  }

  const now = Date.now()
  if (typeof payload.iat !== 'number' || typeof payload.exp !== 'number') {
    return { ok: false, reason: 'invalid_payload' }
  }
  if (now < payload.iat + MIN_TOKEN_AGE_MS) {
    return { ok: false, reason: 'too_fast' }
  }
  if (now > payload.exp) {
    return { ok: false, reason: 'expired' }
  }

  return { ok: true, eventId: payload.e, tokenHash: hashToken(leadToken) }
}

export function hashToken(leadToken) {
  return crypto.createHash('sha256').update(String(leadToken)).digest('hex')
}

export function isInternalLeadRequest(request) {
  const expected = process.env.INTERNAL_LEAD_SECRET
  if (!expected) return false
  const header = request.headers.get('x-internal-lead')
  return Boolean(header && timingSafeEqual(header, expected))
}

/**
 * Перевірка, що токен ще не використаний (одноразовий).
 */
export async function assertLeadTokenUnused(tokenHash) {
  const used = await getCollection('lead_tokens_used')
  const existing = await used.findOne({ tokenHash })
  if (existing) return { ok: false, reason: 'token_reused' }
  return { ok: true }
}

export async function markLeadTokenUsed(tokenHash) {
  const used = await getCollection('lead_tokens_used')
  await used.insertOne({ tokenHash, createdAt: new Date() })
}

/**
 * Ліміт спроб з одного IP (успішних і заблокованих).
 */
export async function checkLeadSubmitRateLimit(ip) {
  if (!ip) {
    return { ok: false, reason: 'missing_ip' }
  }

  const attempts = await getCollection('lead_submit_attempts')
  const since = new Date(Date.now() - RATE_WINDOW_MS)
  const count = await attempts.countDocuments({ ip, createdAt: { $gte: since } })

  if (count >= RATE_MAX_PER_IP) {
    return { ok: false, reason: 'rate_limited' }
  }
  return { ok: true }
}

export async function recordLeadSubmitAttempt(ip, { blocked }) {
  if (!ip) return
  const attempts = await getCollection('lead_submit_attempts')
  await attempts.insertOne({
    ip,
    blocked: Boolean(blocked),
    createdAt: new Date(),
  })
}

export async function validatePublicLeadSubmission({ request, leadToken, honeypot }) {
  if (honeypot) {
    return { ok: false, reason: 'honeypot', silent: true }
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const rate = await checkLeadSubmitRateLimit(ip)
  if (!rate.ok) {
    await recordLeadSubmitAttempt(ip, { blocked: true })
    return { ok: false, reason: rate.reason, status: 429 }
  }

  const verified = verifyLeadFormToken(leadToken)
  if (!verified.ok) {
    await recordLeadSubmitAttempt(ip, { blocked: true })
    return { ok: false, reason: verified.reason, status: 403 }
  }

  const unused = await assertLeadTokenUnused(verified.tokenHash)
  if (!unused.ok) {
    await recordLeadSubmitAttempt(ip, { blocked: true })
    return { ok: false, reason: unused.reason, status: 403 }
  }

  return {
    ok: true,
    eventId: verified.eventId,
    tokenHash: verified.tokenHash,
    ip,
  }
}
