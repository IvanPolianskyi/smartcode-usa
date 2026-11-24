import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import { KIT_EVENTS } from '@/lib/kitEvents'
import { summarizeKit } from '@/lib/kitAnalytics.mjs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_ROWS = 200_000
const PROJECTION = { name: 1, kid: 1, sid: 1, props: 1, src: 1, ref: 1, device: 1, browser: 1, country: 1, variant: 1, dayKey: 1, createdAt: 1, dedupeKey: 1 }

/**
 * Kit landing report for the last `days` days (default 30, max 365).
 * `?test=1` shows only local / preview / sandbox rows instead of real traffic.
 */
export async function GET(request) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const url = new URL(request.url)
	const days = Math.min(365, Math.max(1, Number(url.searchParams.get('days')) || 30))
	const testOnly = url.searchParams.get('test') === '1'
	const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

	try {
		const col = await getCollection(KIT_EVENTS)
		const filter = { createdAt: { $gte: since }, test: testOnly ? true : { $ne: true } }
		const events = await col.find(filter, { projection: PROJECTION }).sort({ createdAt: 1 }).limit(MAX_ROWS).toArray()
		const report = summarizeKit(events)
		return NextResponse.json({
			days,
			testOnly,
			rows: events.length,
			truncated: events.length >= MAX_ROWS,
			...report,
		})
	} catch (error) {
		console.error('[kit-analytics]', error?.message)
		return NextResponse.json({ error: 'Could not build the report' }, { status: 500 })
	}
}
