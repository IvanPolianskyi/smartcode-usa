import { FUNNEL_STEPS, dayKeyFromDate } from './funnelSteps.js'

/** One decimal place, without floating-point tails. */
function round1(value) {
	return Math.round(value * 10) / 10
}

/**
 * Build funnel rows with step-over-step and top-of-funnel conversion rates.
 *
 * `null` is a real answer here: a percentage of zero is undefined, not 0%.
 * The old version returned 0 for it, so a step with 12 people rendered as
 * "600% of top - 0% of prev" in the same line.
 *
 * @param {Record<string, number>} counts keyed by step id
 */
export function buildFunnelRows(counts = {}) {
	const top = Number(counts[FUNNEL_STEPS[0].id]) || 0
	let prev = null

	return FUNNEL_STEPS.map((step, index) => {
		const count = Number(counts[step.id]) || 0
		const pctOfTop = top > 0 ? round1((count / top) * 100) : null
		let pctOfPrev
		if (index === 0) {
			pctOfPrev = top > 0 ? 100 : null
		} else {
			pctOfPrev = prev > 0 ? round1((count / prev) * 100) : null
		}
		// The bar is a share of the top of the funnel, capped: a step that
		// somehow exceeds the top is a data problem, not a 600%-wide bar.
		const barPct = top > 0 ? Math.min(100, round1((count / top) * 100)) : 0
		prev = count
		return {
			id: step.id,
			label: step.label,
			count,
			pctOfTop,
			pctOfPrev,
			barPct,
		}
	})
}

/**
 * Steps that report more people than the step above them.
 *
 * A funnel cannot widen. When it does, the cause is always data - events that
 * predate session tracking, an ad blocker eating the session ping, a backfill.
 * Surfacing it beats rendering an impossible percentage and hoping nobody
 * reads it.
 *
 * @param {ReturnType<typeof buildFunnelRows>} rows
 */
export function funnelAnomalies(rows = []) {
	const out = []
	for (let i = 1; i < rows.length; i += 1) {
		const step = rows[i]
		const above = rows[i - 1]
		if (step.count > above.count) {
			out.push({
				id: step.id,
				message: `${step.label} (${step.count}) is above ${above.label} (${above.count}) - these people were not measured at the earlier step.`,
			})
		}
	}
	return out
}

/** UTC midnight, `days - 1` days ago, so the range includes today. */
export function startDateForRange(days) {
	const now = new Date()
	const start = new Date(
		Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
	)
	start.setUTCDate(start.getUTCDate() - (days - 1))
	return start
}

/**
 * Merge per-day sessions and per-day unique visitors into one continuous
 * series with no gaps.
 *
 * The two come from different pipelines on purpose: sessions are session-ping
 * rows, visitors are distinct visitor ids. They used to be reconciled with
 * `Math.max`, which let a day's raw *event count* stand in for its session
 * count whenever it happened to be larger.
 *
 * @param {Array<{ _id: string, sessions: number }>} sessionRows
 * @param {Array<{ _id: string, visitors: number }>} visitorRows
 */
export function buildDailySeries(sessionRows = [], visitorRows = [], days = 30) {
	const sessions = new Map(sessionRows.map((r) => [r._id, Number(r.sessions) || 0]))
	const visitors = new Map(visitorRows.map((r) => [r._id, Number(r.visitors) || 0]))
	const out = []
	const start = startDateForRange(days)

	for (let i = 0; i < days; i += 1) {
		const d = new Date(start)
		d.setUTCDate(start.getUTCDate() + i)
		const key = dayKeyFromDate(d)
		out.push({
			date: key,
			sessions: sessions.get(key) || 0,
			visitors: visitors.get(key) || 0,
		})
	}
	return out
}

/**
 * Axis ticks that are whole numbers and never repeat.
 *
 * `Math.round(max * t)` over five fixed fractions produced "2, 2, 1, 1, 0" on a
 * chart whose maximum was 2.
 */
export function niceAxis(maxValue, desiredTicks = 4) {
	const raw = Math.max(1, Math.ceil(Number(maxValue) || 0))

	if (raw <= desiredTicks) {
		return { max: raw, ticks: Array.from({ length: raw + 1 }, (_, i) => i) }
	}

	const rough = raw / desiredTicks
	const magnitude = Math.pow(10, Math.floor(Math.log10(rough)))
	const step = [1, 2, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) || magnitude * 10
	const max = Math.ceil(raw / step) * step

	const ticks = []
	for (let v = 0; v <= max + step / 2; v += step) ticks.push(Math.round(v))
	return { max, ticks }
}

/** Every Nth label, so a 90-day axis does not render 90 overlapping dates. */
export function labelStride(pointCount, maxLabels = 12) {
	return Math.max(1, Math.ceil(pointCount / maxLabels))
}
