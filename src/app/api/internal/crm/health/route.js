import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'

/** Перевірка з'єднання CRM → LMS (server-to-server, JWT_SECRET). */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  return NextResponse.json({ ok: true, service: 'smartcode-lms' })
}
