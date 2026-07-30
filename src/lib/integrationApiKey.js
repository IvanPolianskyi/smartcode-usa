/**
 * Секрет server-to-server (LMS ↔ CRM).
 * Рекомендовано окремий CRM_LMS_SYNC_KEY на обох сторонах.
 * Fallback: JWT_SECRET / CRM_JWT_SECRET (legacy).
 */
export function getIntegrationApiKey() {
  return String(
    process.env.CRM_LMS_SYNC_KEY ||
      process.env.CRM_SYNC_API_KEY ||
      process.env.SMARTCODE_LMS_SYNC_SECRET ||
      process.env.CRM_API_KEY ||
      process.env.JWT_SECRET ||
      process.env.CRM_JWT_SECRET ||
      ''
  ).trim()
}

/** Ключ для POST лідів у CRM (/site-leads/incoming). */
export function getCrmLeadIngestKey() {
  return String(
    process.env.SITE_LEADS_INGEST_KEY ||
      process.env.CRM_API_KEY ||
      getIntegrationApiKey()
  ).trim()
}
