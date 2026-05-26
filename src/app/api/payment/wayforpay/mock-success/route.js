import { NextResponse } from 'next/server'
import { buildWebhookSignature } from '@/lib/wayforpay'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const orderReference = searchParams.get('orderReference')
  const amount = searchParams.get('amount')
  const currency = searchParams.get('currency')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const webhookBody = {
    merchantAccount: 'test_merchant',
    orderReference,
    amount,
    currency,
    authCode: '123456',
    cardPan: '4***4',
    transactionStatus: 'Approved',
    reasonCode: 1100,
  }
  
  webhookBody.merchantSignature = buildWebhookSignature(webhookBody)

  try {
    await fetch(`${baseUrl}/api/payment/wayforpay/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookBody)
    })
  } catch (error) {
    console.error('Mock success webhook error:', error)
  }

  const locale = searchParams.get('locale') || ''
  const redirectPath = locale === 'en' ? '/en/payment/success' : '/payment/success'

  return NextResponse.redirect(`${baseUrl}${redirectPath}?orderId=${orderReference}`)
}
