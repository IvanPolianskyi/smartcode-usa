import test from 'node:test'
import assert from 'node:assert/strict'
import {
	buildFunnelRows,
	funnelAnomalies,
	buildDailySeries,
	niceAxis,
	labelStride,
} from './funnelAnalytics.mjs'

test('buildFunnelRows computes top and step conversion', () => {
	const rows = buildFunnelRows({
		visit: 1000,
		view_pricing: 400,
		view_program: 200,
		begin_checkout: 80,
		sign_up: 50,
		start_trial: 30,
		purchase: 10,
	})
	assert.equal(rows[0].pctOfTop, 100)
	assert.equal(rows[1].count, 400)
	assert.equal(rows[1].pctOfTop, 40)
	assert.equal(rows[2].pctOfPrev, 50)
	assert.equal(rows[rows.length - 1].count, 10)
})

test('buildFunnelRows returns null percentages instead of dividing by zero', () => {
	const rows = buildFunnelRows({ visit: 0, sign_up: 3 })
	assert.equal(rows[0].pctOfTop, null)
	assert.equal(rows[0].pctOfPrev, null)
	// sign_up has no visits above it in this pathological input, but the
	// "of prev" comparison is against view_program/begin_checkout (0), not visit.
	const signUp = rows.find((r) => r.id === 'sign_up')
	assert.equal(signUp.pctOfTop, null)
})

test('buildFunnelRows never produces a bar over 100%', () => {
	// A step reporting more people than the top of the funnel is a data
	// problem (see funnelAnomalies), but the bar must still render sanely.
	const rows = buildFunnelRows({ visit: 2, sign_up: 12 })
	const signUp = rows.find((r) => r.id === 'sign_up')
	assert.equal(signUp.barPct, 100)
	assert.equal(signUp.pctOfTop, 600)
})

test('funnelAnomalies flags a step wider than the one above it', () => {
	const rows = buildFunnelRows({ visit: 2, sign_up: 12 })
	const anomalies = funnelAnomalies(rows)
	assert.ok(anomalies.length > 0)
	assert.ok(anomalies[0].message.includes('sign_up') === false) // uses labels, not ids
	assert.ok(anomalies[0].message.includes('Account created'))
})

test('funnelAnomalies is empty for a monotonically shrinking funnel', () => {
	const rows = buildFunnelRows({
		visit: 100,
		view_pricing: 50,
		view_program: 20,
		begin_checkout: 10,
		sign_up: 8,
		start_trial: 4,
		purchase: 2,
	})
	assert.deepEqual(funnelAnomalies(rows), [])
})

test('buildDailySeries returns a continuous UTC series with no gaps', () => {
	const today = new Date()
	const key = today.toISOString().slice(0, 10)
	const series = buildDailySeries([{ _id: key, sessions: 7 }], [{ _id: key, visitors: 5 }], 3)
	assert.equal(series.length, 3)
	assert.equal(series[series.length - 1].visitors, 5)
	assert.equal(series[series.length - 1].sessions, 7)
	assert.equal(series[0].visitors, 0)
})

test('niceAxis produces whole, non-repeating ticks', () => {
	const a = niceAxis(2)
	assert.deepEqual(a.ticks, [0, 1, 2])
	const b = niceAxis(37)
	assert.equal(new Set(b.ticks).size, b.ticks.length)
	assert.ok(b.max >= 37)
})

test('niceAxis handles an all-zero series', () => {
	const a = niceAxis(0)
	assert.equal(a.max, 1)
})

test('labelStride keeps label count within the cap', () => {
	assert.equal(labelStride(90, 12), 8)
	assert.equal(labelStride(7, 12), 1)
})
