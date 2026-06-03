import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { getMonobankInvoiceStatus } from '@/lib/monobank'
import { applyPaymentProviderUpdate } from '@/lib/fulfillPayment'
import { getPaymentRedirectPath } from '@/lib/paymentRedirect'
import { paymentStatusTokenMatches } from '@/lib/paymentStatusToken'

/**
 * Check payment status by orderId (optional Monobank sync with ?sync=1)
 */
export async function GET(request) {
  try {
    const userId = await getCurrentUser()

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const sync = searchParams.get('sync') === '1'

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const paymentsCollection = await getCollection('payments')
    let payment = await paymentsCollection.findOne({ orderId })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    const statusToken = searchParams.get('token')

    if (payment.userId) {
      if (!userId || payment.userId.toString() !== userId) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 403 }
        )
      }
    } else if (paymentStatusTokenMatches(payment, statusToken)) {
      // guest checkout — token from redirect URL
    } else if (payment.isGuest) {
      const guestEmail = searchParams.get('guestEmail')?.toLowerCase().trim()
      const storedGuest = payment.guestEmail?.toLowerCase().trim()
      if (!guestEmail || !storedGuest || guestEmail !== storedGuest) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 403 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (
      sync &&
      payment.status === 'pending' &&
      payment.paymentMethod === 'monobank' &&
      payment.invoiceId
    ) {
      try {
        const monoStatus = await getMonobankInvoiceStatus(payment.invoiceId)
        await applyPaymentProviderUpdate(payment, monoStatus)
        payment = await paymentsCollection.findOne({ orderId })
      } catch (e) {
        console.error('Monobank status sync error:', e)
      }
    }

    const isPurchased = payment.status === 'completed'
    const isGuest = !!payment.isGuest

    return NextResponse.json({
      orderId: payment.orderId,
      invoiceId: payment.invoiceId || null,
      status: payment.status,
      purchased: isPurchased,
      courseId: payment.courseId,
      paymentType: payment.paymentType || null,
      amount: payment.amount,
      currency: payment.currency,
      requiresRegistration: isGuest && isPurchased,
      guestEmail: payment.guestEmail,
      provider: payment.paymentMethod || null,
      redirectTo: isPurchased
        ? getPaymentRedirectPath({
            paymentType: payment.paymentType,
            courseId: payment.courseId,
          })
        : null,
    })
  } catch (error) {
    console.error('Check payment status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
