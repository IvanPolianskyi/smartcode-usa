/**
 * One-time / short-lived login tokens for CRM → LMS magic links.
 */
import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export function generateLoginTokenRaw() {
  return crypto.randomBytes(32).toString('hex')
}

export function hashLoginToken(raw) {
  return crypto.createHash('sha256').update(String(raw)).digest('hex')
}

/**
 * @param {string|ObjectId} userId
 * @param {{ ttlMs?: number, purpose?: string }} [opts]
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
  return {
    token,
    expiresAt,
    loginPath: `/api/auth/magic?token=${encodeURIComponent(token)}`,
  }
}

/**
 * Consume token once. Returns userId string or null.
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
  return existing.userId.toString()
}
