import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/requireAdmin'
import { ObjectId } from 'mongodb'
import { getPaymentBaseUrl } from '@/lib/paymentUrls'
import { createMonobankInvoice } from '@/lib/monobank'
import { createPaymentStatusToken } from '@/lib/paymentStatusToken'

const DEFAULT_AMOUNT_KOPIYKY = 100000
const DEFAULT_DESCRIPTION = 'Тестова оплата'
const DEFAULT_REDIRECT = 'https://mysite.com/payment-result'

/**
 * Тестовий платіж Monobank (1000 грн за замовчуванням).
 * POST /api/payment/monobank/test
 */
export async function POST(request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  try {
    let body = {}
    try {
      body = await request.json()
    } catch {
      body = {}
    }

    const amountKopiyky = Number(body.amountKopiyky ?? body.amount ?? DEFAULT_AMOUNT_KOPIYKY)
    const description = String(body.description || DEFAULT_DESCRIPTION)
    const redirectUrl =
      body.redirectUrl ||
      process.env.MONOBANK_REDIRECT_URL ||
      DEFAULT_REDIRECT
    const locale = body.locale || 'uk'

    const orderId = body.orderId || `test_mono_${Date.now()}`
    const statusToken = createPaymentStatusToken()

    const { invoiceId, pageUrl } = await createMonobankInvoice({
      amount: amountKopiyky,
      reference: orderId,
      destination: description,
      redirectUrl,
      webHookUrl: `${getPaymentBaseUrl().replace(/\/$/, '')}/api/payment/monobank/webhook`,
      basketOrder: [
        {
          name: description,
          qty: 1,
          sum: amountKopiyky,
          total: amountKopiyky,
        },
      ],
    })

    const paymentsCollection = await getCollection('payments')
    const paymentRecord = {
      courseId: 'monobank-test',
      orderId,
      statusToken,
      invoiceId,
      amount: amountKopiyky / 100,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'monobank',
      paymentType: 'test',
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    paymentRecord.userId = new ObjectId(guard.userId)

    await paymentsCollection.insertOne(paymentRecord)

    return NextResponse.json({
      paymentUrl: pageUrl,
      invoiceId,
      orderId,
      amountKopiyky,
      amountUah: amountKopiyky / 100,
      description,
      redirectUrl,
      provider: 'monobank',
    })
  } catch (error) {
    console.error('Monobank test payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
