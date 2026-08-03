import { getCrmLeadIngestKey } from '@/lib/integrationApiKey'

/**
 * URL для POST /site-leads/contact-status (LMS → CRM).
 * Базується на CRM_LEAD_ENDPOINT (.../incoming) або CRM_API_URL.
 */
export function resolveCrmLeadContactStatusUrl() {
  const incoming = String(process.env.CRM_LEAD_ENDPOINT || '').trim()
  if (incoming) {
    const base = incoming.replace(/\/incoming\/?$/i, '').replace(/\/$/, '')
    if (base) return `${base}/contact-status`
  }
  const api = String(
    process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''
  )
    .trim()
    .replace(/\/$/, '')
  if (api) return `${api}/site-leads/contact-status`
  return ''
}

export async function postCrmLeadContactStatus(leadId, contactStatus) {
  const url = resolveCrmLeadContactStatusUrl()
  if (!url) {
    console.error(
      'CRM contact-status: no CRM_LEAD_ENDPOINT / CRM_API_URL configured'
    )
    return { ok: false, error: 'not_configured' }
  }
  const apiKey = getCrmLeadIngestKey()
  if (!apiKey) {
    console.error('CRM contact-status: missing ingest key')
    return { ok: false, error: 'missing key' }
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ leadId, contactStatus }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      console.error('CRM contact-status failed:', response.status, url, data)
      return { ok: false, status: response.status, data, url }
    }
    return { ok: true, data, url }
  } catch (e) {
    console.error('CRM contact-status error:', e)
    return { ok: false, error: String(e?.message || e), url }
  }
}
