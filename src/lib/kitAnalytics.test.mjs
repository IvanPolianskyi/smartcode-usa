import { test } from 'node:test'
import assert from 'node:assert/strict'
import { summarizeKit } from './kitAnalytics.mjs'

let n = 0
const at = (min) => new Date(Date.UTC(2026, 10, 24, 10, min)).toISOString()
function ev(name, kid, extra = {}) {
	n += 1
	return { _id: n, name, kid, sid: kid ? `s_${kid}` : null, props: {}, dayKey: '2026-11-24', createdAt: at(n), ...extra }
}

const events = [
	ev('page_view', 'a', { src: 'bio', device: 'phone', browser: 'instagram-app', country: 'US' }),
	ev('scroll', 'a', { props: { depth: 50 } }),
	ev('cta_click', 'a', { props: { position: 'hero' } }),
	ev('iab_shown', 'a'),
	ev('iab_open_chrome', 'a'),
	ev('page_view', 'b', { src: 'dm', device: 'desktop', browser: 'browser', country: 'GB' }),
	ev('scroll', 'b', { props: { depth: 100 } }),
	ev('section_view', 'b', { props: { section: 'proof' } }),
	ev('cta_click', 'b', { props: { position: 'final' } }),
	ev('checkout_open', 'b'),
	ev('checkout_email', 'b'),
	ev('payment_attempt', 'b'),
	ev('payment_failed', 'b', { props: { reason: 'card_declined', method: 'card' } }),
	ev('payment_attempt', 'b'),
	ev('purchase', 'b', { props: { amount: 19, net: 17.55, currency: 'USD', method: 'paypal', cta: 'final' }, dedupeKey: 'kit:purchase:txn_1' }),
	ev('leave', 'b', { props: { seconds: 80 } }),
	ev('page_view', 'c', { src: 'bio', device: 'phone', browser: 'browser', country: 'US' }),
	ev('faq_open', 'c', { props: { q: 'Can I get a refund?' } }),
	ev('leave', 'c', { props: { seconds: 20 } }),
]

test('counts distinct people per funnel step and joins revenue to the visit', () => {
	const r = summarizeKit(events)
	assert.equal(r.totals.visitors, 3)
	assert.equal(r.totals.ctaPeople, 2)
	assert.equal(r.totals.purchases, 1)
	assert.equal(r.totals.revenue, 19)
	assert.equal(r.totals.net, 17.55)
	assert.equal(r.totals.conversion, 33.3)
	assert.equal(r.totals.revenuePerVisitor, 6.33)
	const steps = Object.fromEntries(r.funnel.map((s) => [s.id, s.people]))
	assert.deepEqual(steps, { visit: 3, scroll50: 2, cta: 2, checkout: 1, email: 1, pay: 1, purchase: 1 })
})

test('breaks down by the first-visit source, device and browser', () => {
	const r = summarizeKit(events)
	const dm = r.breakdowns.src.find((x) => x.key === 'dm')
	assert.equal(dm.visitors, 1)
	assert.equal(dm.purchases, 1)
	assert.equal(dm.revenue, 19)
	const bio = r.breakdowns.src.find((x) => x.key === 'bio')
	assert.equal(bio.visitors, 2)
	assert.equal(bio.purchases, 0)
	const ig = r.breakdowns.browser.find((x) => x.key === 'instagram-app')
	assert.equal(ig.visitors, 1)
	assert.equal(r.inApp.shown, 1)
	assert.equal(r.inApp.openedChrome, 1)
})

test('reports checkout failures, scroll depth, CTA positions, FAQ and time on page', () => {
	const r = summarizeKit(events)
	assert.equal(r.checkout.attempts, 2)
	assert.equal(r.checkout.failures, 1)
	assert.equal(r.checkout.failureRate, 50)
	assert.deepEqual(r.checkout.reasons[0], { key: 'card_declined', count: 1 })
	assert.deepEqual(r.checkout.paidMethods[0], { key: 'paypal', count: 1 })
	assert.equal(r.scroll.find((s) => s.depth === 100).people, 1)
	assert.equal(r.scroll.find((s) => s.depth === 25).people, 2)
	assert.equal(r.sections.find((s) => s.section === 'proof').share, 33.3)
	const final = r.ctas.find((c) => c.position === 'final')
	assert.equal(final.clicks, 1)
	assert.equal(final.purchases, 1)
	assert.equal(r.faq[0].question, 'Can I get a refund?')
	assert.equal(r.totals.medianSeconds, 50)
})

test('handles no data without dividing by zero', () => {
	const r = summarizeKit([])
	assert.equal(r.totals.visitors, 0)
	assert.equal(r.totals.conversion, 0)
	assert.equal(r.funnel[0].people, 0)
	assert.ok(r.insights.some((i) => i.text.includes('not reliable')))
})
