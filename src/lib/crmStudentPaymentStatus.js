import { getIntegrationApiKey } from '@/lib/integrationApiKey'

const CRM_BASE_URL = process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''

export async function fetchCrmStudentPaymentStatus(crmStudentId) {
  const studentId = String(crmStudentId || '').trim()
  const apiKey = getIntegrationApiKey()
  if (!studentId || !CRM_BASE_URL || !apiKey) return null

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)
  try {
    const base = CRM_BASE_URL.replace(/\/$/, '')
    const response = await fetch(
      `${base}/integrations/lms/students/${encodeURIComponent(studentId)}/payment-status`,
      {
        headers: { 'x-api-key': apiKey },
        cache: 'no-store',
        signal: controller.signal,
      }
    )
    if (!response.ok) {
      console.error('CRM payment status failed:', response.status)
      return null
    }
    return response.json()
  } catch (error) {
    console.error('CRM payment status unavailable:', error)
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}
