import { NextResponse } from 'next/server'
import {
  issueLeadFormToken,
  checkLeadSubmitRateLimit,
  recordLeadSubmitAttempt,
} from '@/lib/leadFormSecurity'
import { getClientIp } from '@/lib/metaCapi'

export async function GET(request) {
  const ip = getClientIp(request) || 'unknown'
  const rate = await checkLeadSubmitRateLimit(ip)
  if (!rate.ok) {
    await recordLeadSubmitAttempt(ip, { blocked: true })
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      { status: 429 }
    )
  }

  const issued = issueLeadFormToken()
  if (!issued.ok) {
    return NextResponse.json(
      { ok: false, error: 'Lead form signing is not configured' },
      { status: 503 }
    )
  }

  return NextResponse.json({
    ok: true,
    eventId: issued.eventId,
    leadToken: issued.leadToken,
    exp: issued.exp,
  })
}
