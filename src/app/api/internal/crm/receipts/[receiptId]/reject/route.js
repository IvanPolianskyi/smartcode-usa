import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { rejectReceiptPayment } from '@/lib/rejectReceiptPayment'

export async function POST(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  const { receiptId } = await params
  try {
    const result = await rejectReceiptPayment(receiptId)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
