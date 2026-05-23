import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { approveReceiptPayment } from '@/lib/approveReceiptPayment'

export async function POST(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  const { receiptId } = await params
  try {
    const result = await approveReceiptPayment(receiptId)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
