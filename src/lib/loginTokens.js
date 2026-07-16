/**
 * One-time / short-lived login tokens for CRM → LMS magic links.
 */
import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

/** Default for CRM magic links: 1 hour (was 7 days). */
const DEFAULT_TTL_MS = 60 * 60 * 1000

export function generateLoginTokenRaw() {
  return crypto.randomBytes(32).toString('hex')
}

export function hashLoginToken(raw) {
  return crypto.createHash('sha256').update(String(raw)).digest('hex')
}

/**
 * Invalidate unused tokens for a user (before issuing a new one).
 * @param {string|ObjectId} userId
 */
export async function revokeUnusedLoginTokensForUser(userId) {
  const uid =
    typeof userId === 'string' && ObjectId.isValid(userId)
      ? new ObjectId(userId)
      : userId
  if (!uid || !(uid instanceof ObjectId)) return 0
  const coll = await getCollection('login_tokens')
  const now = new Date()
  const res = await coll.updateMany(
    { userId: uid, usedAt: null },
    { $set: { usedAt: now, revokedAt: now } }
  )
  return res.modifiedCount || 0
}

/**
 * @param {string|ObjectId} userId
 * @param {{ ttlMs?: number, purpose?: string, revokePrevious?: boolean, redirectPath?: string }} [opts]
 * @returns {Promise<{ token: string, expiresAt: Date, loginPath: string }>}
 */
export async function createLoginToken(userId, opts = {}) {
  const uid =
    typeof userId === 'string' && ObjectId.isValid(userId)
      ? new ObjectId(userId)
      : userId
  if (!uid || !(uid instanceof ObjectId)) {
    throw new Error('Invalid userId')
  }
  if (opts.revokePrevious !== false) {
    await revokeUnusedLoginTokensForUser(uid)
  }
  const ttlMs = Number(opts.ttlMs) > 0 ? Number(opts.ttlMs) : DEFAULT_TTL_MS
  const token = generateLoginTokenRaw()
  const tokenHash = hashLoginToken(token)
  const now = new Date()
  const expiresAt = new Date(now.getTime() + ttlMs)
  const coll = await getCollection('login_tokens')
  await coll.insertOne({
    tokenHash,
    userId: uid,
    purpose: String(opts.purpose || 'crm_magic_login'),
    createdAt: now,
    expiresAt,
    usedAt: null,
  })
  let loginPath = `/api/auth/login?token=${encodeURIComponent(token)}`
  const redirectPath = String(opts.redirectPath || '').trim()
  if (
    redirectPath.startsWith('/') &&
    !redirectPath.startsWith('//') &&
    redirectPath !== '/dashboard'
  ) {
    loginPath += `&redirect=${encodeURIComponent(redirectPath)}`
  }
  return {
    token,
    expiresAt,
    // Use /api/auth/login (already on prod). /api/auth/magic is CDN-cached 404.
    loginPath,
  }
}

/**
 * Consume token once. Returns userId string or null.
 * Verifies user exists and is not admin/teacher when possible.
 */
export async function consumeLoginToken(rawToken) {
  const raw = String(rawToken || '').trim()
  if (!raw || raw.length < 20) return null
  const tokenHash = hashLoginToken(raw)
  const coll = await getCollection('login_tokens')
  const now = new Date()
  const existing = await coll.findOne({
    tokenHash,
    usedAt: null,
    expiresAt: { $gt: now },
  })
  if (!existing?.userId) return null
  const claimed = await coll.updateOne(
    { _id: existing._id, usedAt: null },
    { $set: { usedAt: now } }
  )
  if (!claimed.modifiedCount) return null

  try {
    const users = await getCollection('users')
    const user = await users.findOne(
      { _id: existing.userId },
      { projection: { role: 1 } }
    )
    if (!user) return null
    const role = String(user.role || 'student')
    if (role === 'admin' || role === 'teacher') return null
  } catch {
    /* if users lookup fails, still allow consume for resilience */
  }

  return existing.userId.toString()
}
