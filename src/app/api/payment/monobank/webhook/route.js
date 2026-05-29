import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { verifyMonobankWebhook } from '@/lib/monobank'
import { applyPaymentProviderUpdate } from '@/lib/fulfillPayment'

export async function POST(request) {
  try {
    const rawBody = await request.text()
    const xSign = request.headers.get('x-sign')

    if (!(await verifyMonobankWebhook(rawBody, xSign))) {
      console.error('Monobank: invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const body = JSON.parse(rawBody)
    const reference =
      body.reference ||
      body.merchantPaymInfo?.reference ||
      body.invoiceId

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
    }

    const paymentsCollection = await getCollection('payments')
    let payment = await paymentsCollection.findOne({ orderId: reference })

    if (!payment && body.invoiceId) {
      payment = await paymentsCollection.findOne({ invoiceId: body.invoiceId })
    }

    if (!payment) {
      console.error('Monobank: payment not found', reference, body.invoiceId)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    await applyPaymentProviderUpdate(payment, body)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Monobank webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
