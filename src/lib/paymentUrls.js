/** Базовий URL сайту для redirect/webhook Monobank та інших провайдерів. */
export function getPaymentBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  )
}

export function monobankRedirectUrl(orderId, locale = 'uk', statusToken) {
  const override = process.env.MONOBANK_REDIRECT_URL?.trim()
  const url = override
    ? new URL(override)
    : new URL(
        `${getPaymentBaseUrl().replace(/\/$/, '')}/${locale}/payment-result`
      )
  url.searchParams.set('orderId', orderId)
  if (statusToken) {
    url.searchParams.set('token', statusToken)
  }
  return url.toString()
}

export function monobankWebhookUrl() {
  const base = getPaymentBaseUrl().replace(/\/$/, '')
  return `${base}/api/payment/monobank/webhook`
}
