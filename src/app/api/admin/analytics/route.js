import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import {
	buildFunnelRows,
	buildDailySeries,
	funnelAnomalies,
} from '@/lib/funnelAnalytics.mjs'
import { dayKeyFromDate } from '@/lib/funnelSteps.js'
import {
	ANALYTICS_EVENTS,
	VISIT_LOGS,
	IDENTITY_EXPR,
	DAY_KEY_EXPR,
	ensureAnalyticsIndexes,
} from '@/lib/analyticsStore.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DEFAULT_DAYS = 30

/** Inclusive range: [startDate, endDate). */
function dateRangeForDays(days) {
	const now = new Date()
	const start = new Date(
		Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
	)
	start.setUTCDate(start.getUTCDate() - (days - 1))
	const end = new Date(start)
	end.setUTCDate(end.getUTCDate() + days)
	return { start, end }
}

/** Admin analytics: daily sessions + funnel + anomalies. */
export async function GET(request) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const { searchParams } = new URL(request.url)
	const days = Math.min(90, Math.max(7, Number(searchParams.get('days')) || DEFAULT_DAYS))
	const { start, end } = dateRangeForDays(days)
	const sinceKey = dayKeyFromDate(start)

	try {
		await ensureAnalyticsIndexes()
		const [events, logs] = await Promise.all([
			getCollection(ANALYTICS_EVENTS),
			getCollection(VISIT_LOGS),
		])

		// Daily sessions: from the visit log, one row per unique session.
		const dailySessions = await logs
			.aggregate([
				{
					$match: {
						type: 'visit',
						createdAt: { $gte: start, $lt: end },
					},
				},
				{
					$group: {
						_id: {
							$dateToString: {
								format: '%Y-%m-%d',
								date: '$createdAt',
								timezone: 'UTC',
							},
						},
						sessions: { $sum: 1 },
					},
				},
			])
			.toArray()

		// Daily unique visitors: from the event log, distinct people per day.
		const dailyVisitors = await events
			.aggregate([
				{
					$match: {
						step: 'visit',
						createdAt: { $gte: start, $lt: end },
					},
				},
				{
					$group: {
						_id: DAY_KEY_EXPR,
						visitors: { $addToSet: IDENTITY_EXPR },
					},
				},
				{
					$project: {
						_id: 1,
						visitors: { $size: '$visitors' },
					},
				},
			])
			.toArray()

		// Full funnel: distinct people per step, regardless of time.
		const funnelCounts = {}
		const funnelByStep = await events
			.aggregate([
				{
					$match: {
						createdAt: { $gte: start, $lt: end },
					},
				},
				{
					$group: {
						_id: '$step',
						people: { $addToSet: IDENTITY_EXPR },
					},
				},
				{
					$project: {
						_id: 1,
						count: { $size: '$people' },
					},
				},
			])
			.toArray()

		for (const row of funnelByStep) {
			funnelCounts[row._id] = row.count
		}

		const funnel = buildFunnelRows(funnelCounts)
		const anomalies = funnelAnomalies(funnel)
		const daily = buildDailySeries(dailySessions, dailyVisitors, days)

		const totalSessions = dailySessions.reduce((sum, d) => sum + d.sessions, 0)
		// Distinct people across the whole range, not a sum of daily distincts -
		// someone who visits on three different days must count once here, the
		// same way they count once in the funnel above.
		const totalVisitors = funnelCounts.visit || 0

		return NextResponse.json({
			days,
			since: sinceKey,
			summary: {
				totalSessions,
				totalVisitors,
			},
			daily,
			funnel,
			anomalies,
		})
	} catch (error) {
		console.error('[admin] analytics error:', error)
		return NextResponse.json({ error: 'Could not load analytics' }, { status: 500 })
	}
}
