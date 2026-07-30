import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { normalizePhoneE164 } from '@/lib/phoneE164'
import { API_ERRORS, resolveLocale } from '@/lib/localeStrings'
import {
  checkLeadSubmitRateLimit,
  recordLeadSubmitAttempt,
} from '@/lib/leadFormSecurity'

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { phone, course, message, locale: bodyLocale, website } = body || {}
    const loc = resolveLocale(bodyLocale)
    const apiErr = API_ERRORS[loc]

    // Honeypot
    if (website) {
      return NextResponse.json({ ok: true })
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const rate = await checkLeadSubmitRateLimit(ip, 'submissions')
    if (!rate.ok) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests' },
        { status: 429 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: apiErr.phoneOrTelegramRequired },
        { status: 400 }
      )
    }

    const normalizedPhone = normalizePhoneE164(phone, loc)
    if (!normalizedPhone) {
      return NextResponse.json(
        { ok: false, error: apiErr.invalidPhone },
        { status: 400 }
      )
    }

    const userAgent = request.headers.get('user-agent') || ''

    const submissions = await getCollection('submissions')
    await submissions.insertOne({
      phone: normalizedPhone,
      course: course || '',
      message: message || '',
      ip,
      userAgent,
      createdAt: new Date(),
    })

    await recordLeadSubmitAttempt(ip, { blocked: false, kind: 'submissions' })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}
