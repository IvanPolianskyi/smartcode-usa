import { createHash } from 'crypto'
import { getCollection } from '@/lib/mongodb'

const COLLECTION = 'affiliateClicks'
const MAX_CODE_LENGTH = 60
const MAX_SRC_LENGTH = 80

/** Реферальний код у канонічній формі (як зберігає CRM: нижній регістр, slug). */
export function normalizeAffiliateCode(value) {
  const raw = String(value || '').trim().toLowerCase()
  if (!raw) return ''
  return raw.slice(0, MAX_CODE_LENGTH)
}

export function normalizeAffiliateSrc(value) {
  const raw = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
  if (!raw) return ''
  return raw.slice(0, MAX_SRC_LENGTH)
}

function visitorHash(code, ip, userAgent) {
  return createHash('sha256')
    .update(`${code}|${ip || ''}|${userAgent || ''}`)
    .digest('hex')
    .slice(0, 32)
}

function clientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    ''
  )
}

/** Записати перехід. Ніколи не кидає — облік не має ламати редірект. */
export async function recordAffiliateClick(code, request, src = null) {
  const normalized = normalizeAffiliateCode(code)
  if (!normalized) return false
  const sourceKey = normalizeAffiliateSrc(src)
  try {
    const userAgent = request.headers.get('user-agent') || ''
    const clicks = await getCollection(COLLECTION)
    const doc = {
      code: normalized,
      visitorHash: visitorHash(normalized, clientIp(request), userAgent),
      referrer: request.headers.get('referer') || '',
      userAgent: userAgent.slice(0, 500),
      createdAt: new Date(),
    }
    if (sourceKey) doc.src = sourceKey
    await clicks.insertOne(doc)
    return true
  } catch (error) {
    console.warn('recordAffiliateClick:', error?.message || error)
    return false
  }
}

/** {code: {total, unique}} для набору кодів. Унікальні — за хешем IP+UA. */
export async function getAffiliateClickStats(codes) {
  const wanted = [...new Set((codes || []).map(normalizeAffiliateCode).filter(Boolean))]
  const result = Object.fromEntries(wanted.map((c) => [c, { total: 0, unique: 0 }]))
  if (!wanted.length) return result

  const clicks = await getCollection(COLLECTION)
  const rows = await clicks
    .aggregate([
      { $match: { code: { $in: wanted } } },
      {
        $group: {
          _id: '$code',
          total: { $sum: 1 },
          visitors: { $addToSet: '$visitorHash' },
        },
      },
      {
        $project: {
          total: 1,
          unique: { $size: '$visitors' },
        },
      },
    ])
    .toArray()

  for (const row of rows) {
    result[row._id] = {
      total: Number(row.total) || 0,
      unique: Number(row.unique) || 0,
    }
  }
  return result
}

/**
 * Статистика переходів у розрізі src: { code: { src: { total, unique } } }
 */
export async function getAffiliateClickStatsBySrc(codes) {
  const wanted = [...new Set((codes || []).map(normalizeAffiliateCode).filter(Boolean))]
  const result = Object.fromEntries(wanted.map((c) => [c, {}]))
  if (!wanted.length) return result

  const clicks = await getCollection(COLLECTION)
  const rows = await clicks
    .aggregate([
      {
        $match: {
          code: { $in: wanted },
          src: { $type: 'string', $nin: [null, ''] },
        },
      },
      {
        $group: {
          _id: { code: '$code', src: '$src' },
          total: { $sum: 1 },
          visitors: { $addToSet: '$visitorHash' },
        },
      },
      {
        $project: {
          code: '$_id.code',
          src: '$_id.src',
          total: 1,
          unique: { $size: '$visitors' },
        },
      },
    ])
    .toArray()

  for (const row of rows) {
    const code = String(row.code || '').toLowerCase()
    const src = String(row.src || '').toLowerCase()
    if (!code || !src) continue
    if (!result[code]) result[code] = {}
    result[code][src] = {
      total: Number(row.total) || 0,
      unique: Number(row.unique) || 0,
    }
  }
  return result
}

export async function ensureAffiliateClickIndexes() {
  try {
    const clicks = await getCollection(COLLECTION)
    await Promise.all([
      clicks.createIndex({ code: 1, createdAt: -1 }),
      clicks.createIndex({ code: 1, visitorHash: 1 }),
      clicks.createIndex({ code: 1, src: 1, createdAt: -1 }),
    ])
  } catch (error) {
    console.warn('ensureAffiliateClickIndexes:', error?.message || error)
  }
}
