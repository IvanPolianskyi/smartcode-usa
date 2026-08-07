import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getAffiliateClickStats } from '@/lib/affiliateClicks'

const MAX_CODES = 500

/** Переходи по реферальних посиланнях для CRM: ?codes=alice,bob */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  const raw = new URL(request.url).searchParams.get('codes') || ''
  const codes = raw
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)
    .slice(0, MAX_CODES)

  if (!codes.length) {
    return NextResponse.json({ codes: {} })
  }

  try {
    return NextResponse.json({ codes: await getAffiliateClickStats(codes) })
  } catch (error) {
    console.error('affiliate click-stats:', error?.message || error)
    return NextResponse.json({ error: 'Не вдалося порахувати переходи' }, { status: 500 })
  }
}
