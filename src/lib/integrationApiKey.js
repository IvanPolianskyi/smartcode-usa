/**
 * Секрет server-to-server (LMS ↔ CRM): той самий JWT_SECRET, що й на Railway CRM.
 * Окремий CRM_SYNC_API_KEY не потрібен.
 */
export function getIntegrationApiKey() {
  return String(
    process.env.JWT_SECRET ||
      process.env.CRM_JWT_SECRET ||
      ''
  ).trim()
}
