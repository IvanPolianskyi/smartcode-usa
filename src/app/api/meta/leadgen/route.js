import { NextResponse } from 'next/server'
import { isInternalLeadRequest } from '@/lib/leadFormSecurity'
import {
  ingestMetaLeadgen,
  isMetaLeadgenConfigured,
  processLeadgenWebhookPayload,
} from '@/lib/metaLeadgen'

/**
 * Meta Lead Ads webhook (Instagram / Facebook Instant Forms).
 *
 * App: SmartCode Leads Integration
 * Callback URL: https://www.smartcode-academy.com/api/meta/leadgen
 * Verify Token: META_LEADGEN_VERIFY_TOKEN
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')
  const expected = String(process.env.META_LEADGEN_VERIFY_TOKEN || '').trim()

  if (mode === 'subscribe' && expected && token === expected && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    })
  }

  return NextResponse.json(
    {
      ok: false,
      error: 'Verification failed',
      configured: Boolean(expected),
      hint: 'Set META_LEADGEN_VERIFY_TOKEN and use the same value in Meta App → Webhooks',
    },
    { status: 403 }
  )
}

export async function POST(request) {
  // Ручний тест: POST { "leadgenId": "..." } з INTERNAL_LEAD_SECRET.
  if (isInternalLeadRequest(request)) {
    try {
      const body = await request.json().catch(() => ({}))
      const leadgenId = String(body.leadgenId || body.leadgen_id || '').trim()
      if (!leadgenId) {
        return NextResponse.json(
          { ok: false, error: 'leadgenId required' },
          { status: 400 }
        )
      }
      if (!isMetaLeadgenConfigured()) {
        return NextResponse.json(
          { ok: false, error: 'meta_leadgen_not_configured' },
          { status: 503 }
        )
      }
      const result = await ingestMetaLeadgen({
        leadgenId,
        pageId: body.pageId ? String(body.pageId) : null,
        formId: body.formId ? String(body.formId) : null,
        adId: body.adId ? String(body.adId) : null,
      })
      return NextResponse.json(result)
    } catch (error) {
      console.error('[meta-leadgen] manual ingest error:', error)
      return NextResponse.json(
        { ok: false, error: String(error?.message || error) },
        { status: 500 }
      )
    }
  }

  if (!isMetaLeadgenConfigured()) {
    console.warn(
      '[meta-leadgen] webhook received but META_PAGE_ACCESS_TOKEN / META_LEADGEN_VERIFY_TOKEN not set'
    )
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: 'not_configured',
    })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const results = await processLeadgenWebhookPayload(body)
    return NextResponse.json({ ok: true, results })
  } catch (error) {
    console.error('[meta-leadgen] webhook error:', error)
    return NextResponse.json({
      ok: false,
      error: String(error?.message || error),
    })
  }
}
