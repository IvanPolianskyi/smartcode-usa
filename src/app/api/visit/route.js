import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { getCurrentUser } from '@/lib/auth'
import { dayKeyFromDate, isBotUserAgent } from '@/lib/funnelSteps'
import {
	ensureAnalyticsIndexes,
	newVisitorId,
	recordFunnelEvent,
	SESSION_COOKIE,
	SESSION_TTL_SECONDS,
	VISIT_LOGS,
	VISITOR_COOKIE,
} from '@/lib/analyticsStore'

export const runtime = 'nodejs'

/**
 * Session ping - the top of the acquisition funnel.
 *
 * This route is the *only* minter of `sc_vid`. The funnel-event route used to
 * mint one too, and because the browser fires both at once on a first visit,
 * each handed out a different id and the same person was counted twice.
 *
 * It also writes the `visit` funnel step, so "Site sessions" means every
 * session rather than "somebody opened the homepage".
 */
export async function POST(request) {
	try {
		const userAgentHeader = request.headers.get('user-agent') || ''

		let visitorId = request.cookies?.get?.(VISITOR_COOKIE)?.value
		const isNewVisitor = !visitorId
		if (!visitorId) visitorId = newVisitorId()

		// Rolling window: refreshed on every ping, so a session ends after 30
		// minutes of inactivity instead of lasting until the browser is closed.
		const inSession = Boolean(request.cookies?.get?.(SESSION_COOKIE)?.value)

		const setCookies = (res) => {
			res.cookies.set(VISITOR_COOKIE, visitorId, {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
			})
			res.cookies.set(SESSION_COOKIE, '1', {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				maxAge: SESSION_TTL_SECONDS,
			})
			return res
		}

		if (isBotUserAgent(userAgentHeader)) {
			// Answer normally, record nothing. A crawler in "Site sessions" is
			// the denominator of every conversion rate on the dashboard.
			return NextResponse.json({ ok: true, skipped: 'bot' })
		}

		if (inSession) {
			return setCookies(NextResponse.json({ ok: true, skipped: 'session' }))
		}

		const body = await request.json().catch(() => ({}))
		const {
			path = '',
			referrer = '',
			userAgent = '',
			screen = {},
			locale = '',
		} = body || {}

		const ip =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			''

		const now = new Date()
		const userId = await getCurrentUser().catch(() => null)

		const doc = {
			type: 'visit',
			path,
			referrer,
			userAgent: userAgent || userAgentHeader,
			screen,
			locale,
			ip,
			visitorId,
			userId: userId ? String(userId) : null,
			dayKey: dayKeyFromDate(now),
			createdAt: now,
		}

		try {
			await ensureAnalyticsIndexes()
			const visits = await getCollection(VISIT_LOGS)
			await visits.insertOne(doc)
		} catch {
			return setCookies(NextResponse.json({ ok: false, skipped: 'store' }, { status: 200 }))
		}

		// One `visit` step per session, from the same row that defines a session.
		await recordFunnelEvent({
			step: 'visit',
			visitorId,
			userId,
			path,
			ip,
			occurredAt: now,
		})

		return setCookies(NextResponse.json({ ok: true, created: true, isNewVisitor }))
	} catch {
		return NextResponse.json({ ok: false }, { status: 500 })
	}
}
