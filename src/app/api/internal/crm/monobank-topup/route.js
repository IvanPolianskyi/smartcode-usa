import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'

/**
 * CRM/Telegram створює Monobank lesson_topup для привʼязаного LMS-учня (server-to-server).
 */
export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  void request
  return NextResponse.json(
    { error: 'Monobank topup вимкнено. Використовуйте IBAN-квитанцію.' },
    { status: 410 }
  )
}
