import { createMonobankInvoice, uahToKopiyky } from '@/lib/monobank'
import { monobankRedirectUrl, monobankWebhookUrl } from '@/lib/paymentUrls'

/**
 * Створює рахунок Monobank і повертає URL для редіректу.
 */
export async function startMonobankPayment({
  orderId,
  amountUah,
  description,
  locale = 'uk',
  basketName,
}) {
  const amountKop = uahToKopiyky(amountUah)
  if (amountKop <= 0) {
    throw new Error('Invalid payment amount')
  }

  const { invoiceId, pageUrl } = await createMonobankInvoice({
    amount: amountKop,
    reference: orderId,
    destination: description,
    redirectUrl: monobankRedirectUrl(orderId, locale),
    webHookUrl: monobankWebhookUrl(),
    basketOrder: [
      {
        name: basketName || description,
        qty: 1,
        sum: amountKop,
        total: amountKop,
      },
    ],
  })

  return { invoiceId, paymentUrl: pageUrl, amountKopiyky: amountKop }
}
