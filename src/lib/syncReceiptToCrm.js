import { getIntegrationApiKey } from '@/lib/integrationApiKey'

const CRM_BASE_URL = process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''

/**
 * Надсилає квитанцію в CRM (не блокує основний потік при помилці).
 */
export async function syncReceiptToCrm(payload) {
  const apiKey = getIntegrationApiKey()
  if (!CRM_BASE_URL || !apiKey) {
    return { skipped: true, reason: 'CRM not configured' }
  }
  const base = CRM_BASE_URL.replace(/\/$/, '')
  const res = await fetch(`${base}/integrations/lms/receipts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    throw new Error(
      typeof data === 'object' && data?.detail
        ? String(data.detail)
        : text || `CRM receipt sync ${res.status}`
    )
  }
  return data
}

export async function syncReceiptStatusToCrm(crmReceiptId, status) {
  const apiKey = getIntegrationApiKey()
  if (!CRM_BASE_URL || !apiKey || !crmReceiptId) return { skipped: true }
  const base = CRM_BASE_URL.replace(/\/$/, '')
  const res = await fetch(
    `${base}/integrations/lms/receipts/${encodeURIComponent(crmReceiptId)}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ status }),
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `CRM status sync ${res.status}`)
  }
  return res.json()
}
