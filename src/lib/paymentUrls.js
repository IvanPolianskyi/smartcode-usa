/** Базовий URL сайту для redirect/webhook Monobank та інших провайдерів. */
export function getPaymentBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  )
}

export function monobankRedirectUrl(orderId, locale = 'uk') {
  const override = process.env.MONOBANK_REDIRECT_URL?.trim()
  if (override) {
    const url = new URL(override)
    url.searchParams.set('orderId', orderId)
    return url.toString()
  }
  const base = getPaymentBaseUrl().replace(/\/$/, '')
  return `${base}/${locale}/payment-result?orderId=${encodeURIComponent(orderId)}`
}

export function monobankWebhookUrl() {
  const base = getPaymentBaseUrl().replace(/\/$/, '')
  return `${base}/api/payment/monobank/webhook`
}
