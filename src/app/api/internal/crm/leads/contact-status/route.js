import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { applyLeadContactStatus } from '@/lib/applyLeadContactStatus'
import { isValidLeadContactStatus } from '@/lib/leadContactStatus'

/**
 * CRM → LMS: оновити статус контакту заявки і кнопки в Telegram.
 * Body: { leadId, contactStatus }
 */
export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const body = await request.json().catch(() => ({}))
    const leadId = String(body.leadId || '').trim()
    const contactStatus = String(body.contactStatus || '').trim()

    if (!leadId || !isValidLeadContactStatus(contactStatus)) {
      return NextResponse.json(
        { error: 'leadId and valid contactStatus required' },
        { status: 400 }
      )
    }

    const result = await applyLeadContactStatus(leadId, contactStatus)
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || 'failed', ...result },
        { status: 400 }
      )
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('CRM lead contact-status:', error)
    return NextResponse.json(
      { error: String(error.message || error) },
      { status: 500 }
    )
  }
}
