import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { isBotUserAgent, isTrackableStep } from '@/lib/funnelSteps'
import { recordFunnelEvent, VISITOR_COOKIE } from '@/lib/analyticsStore'

export const runtime = 'nodejs'

const SESSION_FUNNEL_COOKIE = 'sc_funnel'

function parseFunnelCookie(raw) {
	try {
		const parsed = JSON.parse(raw || '{}')
		return parsed && typeof parsed === 'object' ? parsed : {}
	} catch {
		return {}
	}
}

/**
 * First-party funnel events from the browser - never blocks the UI.
 *
 * Deliberately does not mint `sc_vid`: `/api/visit` owns visitor identity and
 * runs first. An event that arrives with no visitor and no session is from a
 * client that skipped the ping, and is dropped rather than counted under a
 * second, throwaway identity.
 */
export async function POST(request) {
	try {
		const body = await request.json().catch(() => ({}))
		const step = String(body?.event || '').trim()

		// `visit` is written by the session ping; a browser cannot claim it.
		if (!isTrackableStep(step)) {
			return NextResponse.json({ ok: false, skipped: 'step' }, { status: 200 })
		}

		if (isBotUserAgent(request.headers.get('user-agent') || '')) {
			return NextResponse.json({ ok: true, skipped: 'bot' })
		}

		const visitorId = request.cookies?.get?.(VISITOR_COOKIE)?.value || null
		const userId = await getCurrentUser().catch(() => null)
		if (!visitorId && !userId) {
			return NextResponse.json({ ok: false, skipped: 'no identity' }, { status: 200 })
		}

		// One row per step per browser session keeps the collection small. The
		// admin aggregation counts distinct people anyway, so this is a storage
		// optimisation, not the thing that makes the numbers correct.
		const seen = parseFunnelCookie(request.cookies?.get?.(SESSION_FUNNEL_COOKIE)?.value)
		if (seen[step]) {
			return NextResponse.json({ ok: true, skipped: 'duplicate' })
		}

		const ip =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			''

		const result = await recordFunnelEvent({
			step,
			visitorId,
			userId,
			path: body?.path,
			params: body?.params,
			ip,
		})

		if (!result.ok) {
			return NextResponse.json({ ok: false, skipped: result.reason }, { status: 200 })
		}

		seen[step] = true
		const res = NextResponse.json({ ok: true, created: true })
		res.cookies.set(SESSION_FUNNEL_COOKIE, JSON.stringify(seen), {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
		})
		return res
	} catch {
		return NextResponse.json({ ok: false }, { status: 500 })
	}
}
