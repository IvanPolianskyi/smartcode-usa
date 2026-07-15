/**
 * Отримує серверний leadToken + eventId для пробних форм.
 * Токен неможливо підробити з консолі без секрету на сервері.
 */

let cachedIntent = null

export async function acquireLeadIntent() {
  const now = Date.now()
  if (cachedIntent && cachedIntent.exp > now + 60_000) {
    return cachedIntent
  }

  const response = await fetch('/api/lead-intent', { method: 'GET', cache: 'no-store' })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data?.ok || !data.leadToken || !data.eventId) {
    const err = new Error(data?.error || 'lead_intent_failed')
    err.status = response.status
    throw err
  }

  cachedIntent = {
    eventId: data.eventId,
    leadToken: data.leadToken,
    exp: data.exp,
  }
  return cachedIntent
}

export function clearLeadIntentCache() {
  cachedIntent = null
}
