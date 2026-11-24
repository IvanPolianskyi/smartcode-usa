/**
 * Kit landing analytics - pure aggregation over `kitEvents` rows.
 *
 * Unit: distinct people (`kid`, a random id per browser). A purchase row from
 * the webhook carries the same `kid`, so revenue joins the visit and its
 * source. Every breakdown uses the visitor's FIRST page view for its source,
 * device, browser and country, so a person is never counted in two buckets.
 */

export const FUNNEL = [
	{ id: 'visit', label: 'Opened the page', event: 'page_view' },
	{ id: 'scroll50', label: 'Scrolled half the page', event: 'scroll', match: (e) => Number(e.props?.depth) >= 50 },
	{ id: 'cta', label: 'Pressed a buy button', event: 'cta_click' },
	{ id: 'checkout', label: 'Checkout opened', event: 'checkout_open' },
	{ id: 'email', label: 'Entered email', event: 'checkout_email' },
	{ id: 'pay', label: 'Tried to pay', event: 'payment_attempt' },
	{ id: 'purchase', label: 'Paid', event: 'purchase' },
]

export const SECTIONS = ['offer', 'proof', 'get', 'how', 'need', 'faq', 'final']
export const DEPTHS = [25, 50, 75, 100]
const DIMENSIONS = ['src', 'device', 'browser', 'country', 'ref', 'variant']

const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 1000) / 10 : 0)
const round2 = (n) => Math.round(n * 100) / 100

function median(values) {
	if (!values.length) return 0
	const s = [...values].sort((a, b) => a - b)
	const mid = Math.floor(s.length / 2)
	return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2)
}

function personKey(e) {
	return e.kid || (e.name === 'purchase' ? `purchase:${e.dedupeKey || e._id || Math.random()}` : null)
}

/**
 * @param {Array<object>} events rows from kitEvents in the period
 * @param {{ currency?: string }} [options]
 */
export function summarizeKit(events, { currency = 'USD' } = {}) {
	const rows = (events || []).filter((e) => e && e.name)
	const sorted = [...rows].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

	// First page view per person decides their source / device / browser / country.
	const profile = new Map()
	for (const e of sorted) {
		if (e.name !== 'page_view' || !e.kid || profile.has(e.kid)) continue
		profile.set(e.kid, {
			src: e.src || 'direct',
			device: e.device || 'unknown',
			browser: e.browser || 'unknown',
			country: e.country || 'unknown',
			ref: e.ref || (e.src && e.src !== 'direct' ? '(tagged link)' : 'none'),
			variant: e.variant || 'none',
		})
	}
	const profileOf = (e) =>
		profile.get(e.kid) || {
			src: e.src || 'direct',
			device: e.device || 'unknown',
			browser: e.browser || 'unknown',
			country: e.country || 'unknown',
			ref: e.ref || 'none',
			variant: e.variant || 'none',
		}

	// People per funnel step.
	const stepPeople = Object.fromEntries(FUNNEL.map((s) => [s.id, new Set()]))
	for (const e of sorted) {
		for (const step of FUNNEL) {
			if (e.name !== step.event) continue
			if (step.match && !step.match(e)) continue
			const key = personKey(e)
			if (key) stepPeople[step.id].add(key)
		}
	}
	const visitors = stepPeople.visit.size

	const purchases = sorted.filter((e) => e.name === 'purchase')
	const sameCurrency = purchases.filter((p) => !p.props?.currency || p.props.currency === currency)
	const revenue = round2(sameCurrency.reduce((sum, p) => sum + (Number(p.props?.amount) || 0), 0))
	const net = round2(sameCurrency.reduce((sum, p) => sum + (Number(p.props?.net) || 0), 0))

	const funnel = FUNNEL.map((step, i) => {
		const people = stepPeople[step.id].size
		const prev = i === 0 ? people : stepPeople[FUNNEL[i - 1].id].size
		return {
			id: step.id,
			label: step.label,
			people,
			ofVisitors: pct(people, visitors),
			fromPrevious: i === 0 ? 100 : pct(people, prev),
		}
	})

	// Daily series.
	const days = new Map()
	const day = (k) => {
		if (!days.has(k)) days.set(k, { day: k, visitors: new Set(), cta: new Set(), checkout: new Set(), purchases: 0, revenue: 0 })
		return days.get(k)
	}
	for (const e of sorted) {
		const d = day(e.dayKey || String(e.createdAt).slice(0, 10))
		if (e.name === 'page_view' && e.kid) d.visitors.add(e.kid)
		if (e.name === 'cta_click' && e.kid) d.cta.add(e.kid)
		if (e.name === 'checkout_open' && e.kid) d.checkout.add(e.kid)
		if (e.name === 'purchase') {
			d.purchases += 1
			if (!e.props?.currency || e.props.currency === currency) d.revenue += Number(e.props?.amount) || 0
		}
	}
	const daily = [...days.values()]
		.sort((a, b) => a.day.localeCompare(b.day))
		.map((d) => ({ day: d.day, visitors: d.visitors.size, cta: d.cta.size, checkout: d.checkout.size, purchases: d.purchases, revenue: round2(d.revenue) }))

	// Breakdowns by the visitor's first-visit context.
	const breakdowns = {}
	for (const dim of DIMENSIONS) {
		const groups = new Map()
		const g = (k) => {
			if (!groups.has(k)) groups.set(k, { key: k, visitors: new Set(), cta: new Set(), checkout: new Set(), failed: new Set(), purchases: 0, revenue: 0 })
			return groups.get(k)
		}
		for (const e of sorted) {
			const key = profileOf(e)[dim]
			const row = g(key)
			if (e.name === 'page_view' && e.kid) row.visitors.add(e.kid)
			if (e.name === 'cta_click' && e.kid) row.cta.add(e.kid)
			if (e.name === 'checkout_open' && e.kid) row.checkout.add(e.kid)
			if (e.name === 'payment_failed' && e.kid) row.failed.add(e.kid)
			if (e.name === 'purchase') {
				row.purchases += 1
				if (!e.props?.currency || e.props.currency === currency) row.revenue += Number(e.props?.amount) || 0
			}
		}
		breakdowns[dim] = [...groups.values()]
			.map((r) => ({
				key: r.key,
				visitors: r.visitors.size,
				cta: r.cta.size,
				checkout: r.checkout.size,
				failed: r.failed.size,
				purchases: r.purchases,
				revenue: round2(r.revenue),
				ctaRate: pct(r.cta.size, r.visitors.size),
				conversion: pct(r.purchases, r.visitors.size),
				revenuePerVisitor: r.visitors.size ? round2(r.revenue / r.visitors.size) : 0,
			}))
			.filter((r) => r.visitors || r.purchases)
			.sort((a, b) => b.visitors - a.visitors || b.purchases - a.purchases)
	}

	// Scroll depth and section reach, as a share of visitors.
	const depthPeople = Object.fromEntries(DEPTHS.map((d) => [d, new Set()]))
	const sectionPeople = new Map()
	for (const e of sorted) {
		if (!e.kid) continue
		if (e.name === 'scroll') for (const d of DEPTHS) if (Number(e.props?.depth) >= d) depthPeople[d].add(e.kid)
		if (e.name === 'section_view' && e.props?.section) {
			if (!sectionPeople.has(e.props.section)) sectionPeople.set(e.props.section, new Set())
			sectionPeople.get(e.props.section).add(e.kid)
		}
	}
	const scroll = DEPTHS.map((d) => ({ depth: d, people: depthPeople[d].size, share: pct(depthPeople[d].size, visitors) }))
	const sectionOrder = [...new Set([...SECTIONS, ...sectionPeople.keys()])]
	const sections = sectionOrder
		.filter((s) => sectionPeople.has(s))
		.map((s) => ({ section: s, people: sectionPeople.get(s).size, share: pct(sectionPeople.get(s).size, visitors) }))

	// Which button sells.
	const ctaMap = new Map()
	for (const e of sorted) {
		const pos = e.name === 'cta_click' ? e.props?.position : e.name === 'purchase' ? e.props?.cta : null
		if (!pos) continue
		if (!ctaMap.has(pos)) ctaMap.set(pos, { position: pos, clicks: 0, people: new Set(), purchases: 0 })
		const r = ctaMap.get(pos)
		if (e.name === 'cta_click') {
			r.clicks += 1
			if (e.kid) r.people.add(e.kid)
		} else r.purchases += 1
	}
	const ctas = [...ctaMap.values()]
		.map((r) => ({ position: r.position, clicks: r.clicks, people: r.people.size, purchases: r.purchases }))
		.sort((a, b) => b.clicks - a.clicks)

	// Checkout trouble.
	const failures = sorted.filter((e) => e.name === 'payment_failed')
	const tally = (list, field) => {
		const m = new Map()
		for (const e of list) {
			const k = e.props?.[field] || 'unknown'
			m.set(k, (m.get(k) || 0) + 1)
		}
		return [...m.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count)
	}
	const attempts = sorted.filter((e) => e.name === 'payment_attempt').length
	const checkout = {
		opened: stepPeople.checkout.size,
		attempts,
		failures: failures.length,
		failureRate: pct(failures.length, attempts),
		failedPeople: new Set(failures.map((e) => e.kid).filter(Boolean)).size,
		closedWithoutPaying: new Set(sorted.filter((e) => e.name === 'checkout_closed').map((e) => e.kid).filter(Boolean)).size,
		reasons: tally(failures, 'reason'),
		failedMethods: tally(failures, 'method'),
		paidMethods: tally(purchases, 'method'),
	}

	// In-app browser prompt.
	const peopleWith = (name, filter) => new Set(sorted.filter((e) => e.name === name && (!filter || filter(e))).map((e) => e.kid).filter(Boolean)).size
	const inApp = {
		visitors: breakdowns.browser.filter((r) => r.key.endsWith('-app')).reduce((s, r) => s + r.visitors, 0),
		shown: peopleWith('iab_shown'),
		openedChrome: peopleWith('iab_open_chrome'),
		copiedLink: peopleWith('iab_copy_link'),
		payHere: peopleWith('iab_pay_here'),
		keptReading: peopleWith('iab_continue'),
	}

	// FAQ and time on page.
	const faq = tally(sorted.filter((e) => e.name === 'faq_open'), 'q').map((r) => ({ question: r.key, opens: r.count }))
	const leaveBySession = new Map()
	for (const e of sorted) {
		if (e.name !== 'leave') continue
		const k = e.sid || e.kid
		if (!k) continue
		leaveBySession.set(k, Math.max(leaveBySession.get(k) || 0, Number(e.props?.seconds) || 0))
	}
	const times = [...leaveBySession.values()].filter((s) => s > 0 && s < 3600)

	const totals = {
		visitors,
		ctaPeople: stepPeople.cta.size,
		checkoutPeople: stepPeople.checkout.size,
		purchases: purchases.length,
		revenue,
		net,
		currency,
		conversion: pct(purchases.length, visitors),
		ctaRate: pct(stepPeople.cta.size, visitors),
		revenuePerVisitor: visitors ? round2(revenue / visitors) : 0,
		medianSeconds: median(times),
	}

	// Last sales with where the buyer came from (newest first).
	const recentPurchases = purchases
		.slice(-10)
		.reverse()
		.map((p) => {
			const who = profileOf(p)
			return {
				at: p.createdAt,
				amount: Number(p.props?.amount) || 0,
				currency: p.props?.currency || currency,
				method: p.props?.method || null,
				cta: p.props?.cta || null,
				src: who.src,
				browser: who.browser,
				device: who.device,
				country: who.country,
			}
		})

	return { totals, verdict: buildVerdict(totals), funnel, daily, breakdowns, scroll, sections, ctas, checkout, inApp, faq, recentPurchases, insights: buildInsights({ totals, funnel, breakdowns, checkout, inApp, sections }) }
}

/**
 * One plain sentence: is the kit selling, and is there enough data to judge.
 * Cold Instagram traffic to a $19 digital product usually converts 0.5-3%.
 */
export function buildVerdict(totals) {
	const { visitors, purchases, revenue, conversion } = totals
	const sales = `${purchases} sale${purchases === 1 ? '' : 's'}`
	if (visitors === 0) return { level: 'info', text: 'No visitors yet. Put smartcode.academy/kit?src=bio in the Instagram bio and send traffic.' }
	if (purchases === 0 && visitors < 150) {
		return { level: 'info', text: `${visitors} visitors and no sales yet. Too early to judge: wait for about 150-300 visitors.` }
	}
	if (purchases === 0) {
		return { level: 'warn', text: `${visitors} visitors and no sales. Something blocks buying: look at the funnel below to see where people stop.` }
	}
	if (conversion >= 1) {
		return { level: 'good', text: `Selling: ${sales}, $${revenue} from ${visitors} visitors (${conversion}% buy). That is a healthy rate for Instagram traffic. Send more traffic.` }
	}
	return { level: 'warn', text: `Selling, but slowly: ${sales}, $${revenue} from ${visitors} visitors (${conversion}% buy, aim for 1%+). Fix the biggest drop below.` }
}

/** Plain-language hints about the biggest problems, ordered by impact. */
export function buildInsights({ totals, funnel, breakdowns, checkout, inApp, sections }) {
	const out = []
	if (totals.visitors < 30) {
		out.push({ level: 'info', text: `Only ${totals.visitors} visitors in this period - numbers below are not reliable yet. Aim for 300+ before changing the page.` })
	}
	// Biggest drop between consecutive steps (after the first step).
	let worst = null
	for (let i = 1; i < funnel.length; i += 1) {
		const prev = funnel[i - 1]
		if (prev.people < 10) continue
		const lost = prev.people - funnel[i].people
		if (!worst || lost > worst.lost) worst = { from: prev.label, to: funnel[i].label, lost, keep: funnel[i].fromPrevious }
	}
	if (worst && worst.lost > 0) {
		out.push({ level: 'warn', text: `Biggest drop: "${worst.from}" → "${worst.to}" - only ${worst.keep}% continue (${worst.lost} people lost).` })
	}
	const app = breakdowns.browser.filter((r) => r.key.endsWith('-app'))
	const web = breakdowns.browser.find((r) => r.key === 'browser')
	const appVisitors = app.reduce((s, r) => s + r.visitors, 0)
	const appBuyers = app.reduce((s, r) => s + r.purchases, 0)
	if (appVisitors >= 20 && web?.visitors >= 20) {
		const appConv = pct(appBuyers, appVisitors)
		out.push({
			level: appConv < web.conversion / 2 ? 'warn' : 'info',
			text: `In-app browsers (Instagram/TikTok) convert at ${appConv}% vs ${web.conversion}% in Safari/Chrome. ${inApp.openedChrome} people opened Chrome from the prompt, ${inApp.payHere} chose to pay in the app.`,
		})
	}
	if (checkout.attempts >= 5 && checkout.failureRate >= 20) {
		const top = checkout.reasons[0]
		out.push({ level: 'warn', text: `${checkout.failureRate}% of payment attempts fail${top ? ` - most often "${top.key}"` : ''}. Check that PayPal, Apple Pay and Google Pay are on in Paddle.` })
	}
	if (checkout.opened >= 10 && checkout.closedWithoutPaying / checkout.opened >= 0.5) {
		out.push({ level: 'warn', text: `${checkout.closedWithoutPaying} of ${checkout.opened} people closed the checkout without paying - price shock or a payment method they don't have.` })
	}
	const proof = sections.find((s) => s.section === 'proof')
	if (proof && totals.visitors >= 30 && proof.share < 50) {
		out.push({ level: 'info', text: `Only ${proof.share}% of visitors reach the Instagram proof block - consider moving it higher.` })
	}
	const sources = breakdowns.src.filter((r) => r.visitors >= 20)
	if (sources.length >= 2) {
		const best = [...sources].sort((a, b) => b.revenuePerVisitor - a.revenuePerVisitor)[0]
		if (best.revenuePerVisitor > 0) out.push({ level: 'good', text: `Best source: "${best.key}" - $${best.revenuePerVisitor} per visitor (${best.conversion}% buy). Send more traffic there.` })
	}
	return out
}
