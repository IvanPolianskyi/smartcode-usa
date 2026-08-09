import { getCrmLeadIngestKey } from '@/lib/integrationApiKey'
import {
  getAffiliateClickStats,
  getAffiliateClickStatsBySrc,
} from '@/lib/affiliateClicks'

/** Корінь CRM API: з CRM_LEAD_ENDPOINT (.../site-leads/incoming) або CRM_API_URL. */
export function resolveCrmApiBase() {
  const incoming = String(process.env.CRM_LEAD_ENDPOINT || '').trim()
  if (incoming) {
    const base = incoming
      .replace(/\/site-leads\/incoming\/?$/i, '')
      .replace(/\/incoming\/?$/i, '')
      .replace(/\/site-leads\/?$/i, '')
      .replace(/\/$/, '')
    if (base) return base
  }
  return String(process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || '')
    .trim()
    .replace(/\/$/, '')
}

export class CrmCabinetError extends Error {
  constructor(status, detail) {
    super(detail || `CRM ${status}`)
    this.status = status
    this.detail = detail
  }
}

async function crmCabinetRequest(method, path, body) {
  const base = resolveCrmApiBase()
  if (!base) {
    throw new CrmCabinetError(503, 'CRM_LEAD_ENDPOINT / CRM_API_URL не налаштовано')
  }
  const apiKey = getCrmLeadIngestKey()
  if (!apiKey) {
    throw new CrmCabinetError(503, 'Немає ключа доступу до CRM')
  }

  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new CrmCabinetError(
      response.status,
      data?.detail || data?.error || `CRM ${response.status}`
    )
  }
  return data
}

const cabinetPath = (token, suffix = '') =>
  `/affiliates/cabinet/${encodeURIComponent(token)}${suffix}`

/**
 * CRM бере переходи через LMS, тож у відповіді вони можуть бути нульові,
 * якщо той виклик не пройшов. Локальна БД поруч — беремо числа з неї.
 */
async function withLocalClicks(cabinet) {
  if (!cabinet?.code) return cabinet
  try {
    const code = String(cabinet.code).toLowerCase()
    const [stats, bySrcAll] = await Promise.all([
      getAffiliateClickStats([cabinet.code]),
      getAffiliateClickStatsBySrc([cabinet.code]),
    ])
    const local = stats[code]
    const srcMap = bySrcAll[code] || {}
    const groups = Array.isArray(cabinet.groups)
      ? cabinet.groups.map((group) => {
          const key = String(group?.source_key || '').toLowerCase()
          const srcStats = key ? srcMap[key] : null
          if (!srcStats) return group
          return {
            ...group,
            stats: {
              ...(group.stats || {}),
              clicks: srcStats.total,
              unique_clicks: srcStats.unique,
            },
          }
        })
      : cabinet.groups
    return {
      ...cabinet,
      groups,
      stats: local
        ? { ...cabinet.stats, clicks: local.total, unique_clicks: local.unique }
        : cabinet.stats,
    }
  } catch (error) {
    console.warn('affiliate cabinet local clicks:', error?.message || error)
    return cabinet
  }
}

async function cabinetCall(method, token, suffix, body) {
  return withLocalClicks(await crmCabinetRequest(method, cabinetPath(token, suffix), body))
}

export function fetchAffiliateCabinet(token) {
  return cabinetCall('GET', token, '')
}

export function saveAffiliateSocials(token, socials) {
  return cabinetCall('PUT', token, '/socials', { socials })
}

export function reportAffiliateSocialPost(token, post) {
  return cabinetCall('POST', token, '/social-posts', post)
}

export function deleteAffiliateSocialPost(token, postId) {
  return cabinetCall(
    'DELETE',
    token,
    `/social-posts/${encodeURIComponent(postId)}`
  )
}

export function createAffiliateGroup(token, group) {
  return cabinetCall('POST', token, '/groups', group)
}

export function updateAffiliateGroup(token, groupId, group) {
  return cabinetCall(
    'PATCH',
    token,
    `/groups/${encodeURIComponent(groupId)}`,
    group
  )
}

export function deleteAffiliateGroup(token, groupId) {
  return cabinetCall(
    'DELETE',
    token,
    `/groups/${encodeURIComponent(groupId)}`
  )
}
