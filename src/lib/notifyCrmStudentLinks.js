import { getIntegrationApiKey } from '@/lib/integrationApiKey'

const CRM_BASE_URL = process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''

/**
 * Повідомляє CRM/manager: зʼявився новий LMS-акаунт — оновити списки привʼязок.
 * Не блокує реєстрацію при помилці.
 */
export async function notifyCrmStudentLinksRefresh({ userId, email, name }) {
  const apiKey = getIntegrationApiKey()
  if (!CRM_BASE_URL || !apiKey || !userId) {
    return { skipped: true }
  }
  const base = CRM_BASE_URL.replace(/\/$/, '')
  try {
    const res = await fetch(`${base}/integrations/lms/student-links/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        user_id: String(userId),
        email: email || null,
        name: name || null,
      }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('CRM student-links notify failed:', res.status, text)
      return { ok: false }
    }
    return { ok: true }
  } catch (error) {
    console.error('CRM student-links notify error:', error)
    return { ok: false }
  }
}
