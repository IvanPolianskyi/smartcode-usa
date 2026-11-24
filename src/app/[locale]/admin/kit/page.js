'use client'

import { useCallback, useEffect, useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import LmsHeader from '@/components/Nav/LmsHeader'
import styles from '../AdminPanel.module.css'
import k from './kit.module.css'

const DIMENSIONS = [
	{ id: 'src', label: 'Source' },
	{ id: 'browser', label: 'Browser' },
	{ id: 'device', label: 'Device' },
	{ id: 'country', label: 'Country' },
	{ id: 'ref', label: 'Came from site' },
	{ id: 'variant', label: 'Page version' },
]

const SECTION_NAMES = {
	offer: 'Offer text (hero)',
	proof: 'Instagram proof',
	get: 'What you get',
	how: 'How it works',
	need: 'What you need',
	faq: 'Questions',
	final: 'Final buy block',
}

const BROWSER_NAMES = {
	browser: 'Safari / Chrome',
	'instagram-app': 'Instagram app',
	'facebook-app': 'Facebook app',
	'tiktok-app': 'TikTok app',
	'snapchat-app': 'Snapchat app',
}

const money = (n) => `$${Number(n || 0).toFixed(2)}`
const fmtSeconds = (s) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`)

function Bar({ label, value, max, right }) {
	const width = max > 0 ? Math.max(1, Math.round((value / max) * 100)) : 0
	return (
		<div className={k.barRow}>
			<span>{label}</span>
			<div className={k.barTrack}>
				<div className={k.barFill} style={{ width: `${width}%` }} />
			</div>
			<span className={k.barValue}>{right}</span>
		</div>
	)
}

function Panel({ title, hint, children }) {
	return (
		<section className={styles.panel}>
			<h2 className={styles.panelTitle}>{title}</h2>
			{hint ? <p className={styles.panelHint}>{hint}</p> : null}
			{children}
		</section>
	)
}

export default function KitAnalyticsPage() {
	const router = useRouter()
	const { user, loading: sessionLoading } = useAuthSession()
	const [days, setDays] = useState(30)
	const [testOnly, setTestOnly] = useState(false)
	const [dim, setDim] = useState('src')
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const load = useCallback(async () => {
		setLoading(true)
		setError('')
		try {
			const res = await fetch(`/api/admin/kit-analytics?days=${days}${testOnly ? '&test=1' : ''}`, { credentials: 'include' })
			if (!res.ok) throw new Error('load failed')
			setData(await res.json())
		} catch {
			setError('Could not load the kit report')
		} finally {
			setLoading(false)
		}
	}, [days, testOnly])

	useEffect(() => {
		if (sessionLoading) return
		if (!user) {
			router.push('/login')
			return
		}
		if (user.role !== 'admin') {
			router.push('/dashboard')
			return
		}
		load()
	}, [sessionLoading, user, router, load])

	const t = data?.totals
	const maxDay = Math.max(1, ...(data?.daily || []).map((d) => d.visitors))
	const rows = data?.breakdowns?.[dim] || []

	return (
		<div className={styles.shell} data-theme="light">
			<LmsHeader />
			<div className={styles.container}>
				<Link href="/dashboard" className={styles.backLink}>
					← Back to admin
				</Link>

				<header className={styles.pageHead}>
					<div>
						<p className={styles.pageEyebrow}>/kit landing</p>
						<h1 className={styles.pageTitle}>Kit analytics</h1>
					</div>
					<div className={k.toolbar}>
						<select className={styles.select} value={days} onChange={(e) => setDays(Number(e.target.value))}>
							<option value={1}>Last 24 hours</option>
							<option value={7}>7 days</option>
							<option value={14}>14 days</option>
							<option value={30}>30 days</option>
							<option value={90}>90 days</option>
						</select>
						<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 14 }}>
							<input type="checkbox" checked={testOnly} onChange={(e) => setTestOnly(e.target.checked)} />
							Test traffic only
						</label>
						<button type="button" className="sc-btn" onClick={load}>
							Refresh
						</button>
					</div>
				</header>

				{error ? <p className={styles.error}>{error}</p> : null}
				{loading && !data ? <p className={styles.loading}>Loading…</p> : null}

				{data && t ? (
					<>
						<div className={styles.statGrid}>
							{[
								[t.visitors, 'Visitors'],
								[`${t.ctaRate}%`, 'Pressed buy'],
								[t.purchases, 'Purchases'],
								[`${t.conversion}%`, 'Visitor → buyer'],
								[money(t.revenue), 'Revenue'],
								[money(t.net), 'After Paddle fees'],
								[money(t.revenuePerVisitor), 'Per visitor'],
								[fmtSeconds(t.medianSeconds), 'Median time on page'],
							].map(([value, label]) => (
								<div className={styles.statCard} key={label}>
									<p className={styles.statValue}>{value}</p>
									<p className={styles.statLabel}>{label}</p>
								</div>
							))}
						</div>

						{data.insights?.length ? (
							<Panel title="What to fix first">
								<ul className={k.insights}>
									{data.insights.map((i) => (
										<li key={i.text} className={`${k.insight} ${i.level === 'warn' ? k.warn : i.level === 'good' ? k.good : ''}`}>
											{i.text}
										</li>
									))}
								</ul>
							</Panel>
						) : null}

						<Panel title="Funnel" hint="Distinct people. The % on the right is how many of the previous step continued.">
							<div className={k.bars}>
								{data.funnel.map((s) => (
									<Bar
										key={s.id}
										label={s.label}
										value={s.people}
										max={data.funnel[0].people}
										right={
											<>
												<b>{s.people}</b> · {s.ofVisitors}% of visitors{s.id !== 'visit' ? ` · ${s.fromPrevious}% from prev.` : ''}
											</>
										}
									/>
								))}
							</div>
						</Panel>

						<Panel title="Visitors per day" hint="Green dot = at least one sale that day.">
							{data.daily.length ? (
								<>
									<div className={k.days}>
										{data.daily.map((d) => (
											<div
												key={d.day}
												className={k.day}
												style={{ height: `${Math.max(2, (d.visitors / maxDay) * 100)}%` }}
												title={`${d.day}: ${d.visitors} visitors, ${d.cta} pressed buy, ${d.checkout} opened checkout, ${d.purchases} paid (${money(d.revenue)})`}
											>
												{d.purchases ? <span className={k.dayBuy} /> : null}
											</div>
										))}
									</div>
									<div className={k.dayAxis}>
										<span>{data.daily[0].day}</span>
										<span>{data.daily[data.daily.length - 1].day}</span>
									</div>
								</>
							) : (
								<p className={styles.empty}>No visits yet.</p>
							)}
						</Panel>

						<Panel title="Where buyers come from" hint="Each person counts once, by their first visit.">
							<div className={k.tabs}>
								{DIMENSIONS.map((d) => (
									<button key={d.id} type="button" className={`${k.tab} ${dim === d.id ? k.tabOn : ''}`} onClick={() => setDim(d.id)}>
										{d.label}
									</button>
								))}
							</div>
							<div className={styles.tableWrap}>
								<table className={styles.table}>
									<thead>
										<tr>
											<th>{DIMENSIONS.find((d) => d.id === dim)?.label}</th>
											<th className={k.num}>Visitors</th>
											<th className={k.num}>Pressed buy</th>
											<th className={k.num}>Checkout</th>
											<th className={k.num}>Card failed</th>
											<th className={k.num}>Paid</th>
											<th className={k.num}>Conv.</th>
											<th className={k.num}>Revenue</th>
											<th className={k.num}>$ / visitor</th>
										</tr>
									</thead>
									<tbody>
										{rows.map((r) => (
											<tr key={r.key}>
												<td>{dim === 'browser' ? BROWSER_NAMES[r.key] || r.key : r.key}</td>
												<td className={k.num}>{r.visitors}</td>
												<td className={k.num}>
													{r.cta} <span style={{ opacity: 0.6 }}>({r.ctaRate}%)</span>
												</td>
												<td className={k.num}>{r.checkout}</td>
												<td className={k.num}>{r.failed}</td>
												<td className={k.num}>{r.purchases}</td>
												<td className={k.num}>{r.conversion}%</td>
												<td className={k.num}>{money(r.revenue)}</td>
												<td className={k.num}>{money(r.revenuePerVisitor)}</td>
											</tr>
										))}
										{!rows.length ? (
											<tr>
												<td colSpan={9} className={styles.empty}>
													No data yet.
												</td>
											</tr>
										) : null}
									</tbody>
								</table>
							</div>
						</Panel>

						<div className={k.twoCol}>
							<Panel title="How far people scroll">
								<div className={k.bars}>
									{data.scroll.map((s) => (
										<Bar key={s.depth} label={`${s.depth}% of page`} value={s.people} max={t.visitors} right={<><b>{s.share}%</b> ({s.people})</>} />
									))}
								</div>
							</Panel>
							<Panel title="Which blocks are seen">
								<div className={k.bars}>
									{data.sections.map((s) => (
										<Bar key={s.section} label={SECTION_NAMES[s.section] || s.section} value={s.people} max={t.visitors} right={<><b>{s.share}%</b> ({s.people})</>} />
									))}
									{!data.sections.length ? <p className={styles.empty}>No data yet.</p> : null}
								</div>
							</Panel>
						</div>

						<div className={k.twoCol}>
							<Panel title="Which buy button works" hint="Clicks and paid orders per button on the page.">
								<div className={k.bars}>
									{data.ctas.map((c) => (
										<Bar key={c.position} label={c.position} value={c.clicks} max={data.ctas[0]?.clicks || 1} right={<><b>{c.clicks}</b> clicks · {c.purchases} paid</>} />
									))}
									{!data.ctas.length ? <p className={styles.empty}>No clicks yet.</p> : null}
								</div>
							</Panel>
							<Panel title="Checkout" hint="From Paddle's own checkout events.">
								<div className={k.bars}>
									<Bar label="Opened" value={data.checkout.opened} max={data.checkout.opened} right={<b>{data.checkout.opened}</b>} />
									<Bar label="Payment attempts" value={data.checkout.attempts} max={Math.max(data.checkout.opened, data.checkout.attempts)} right={<b>{data.checkout.attempts}</b>} />
									<Bar label="Failed attempts" value={data.checkout.failures} max={Math.max(1, data.checkout.attempts)} right={<><b>{data.checkout.failures}</b> ({data.checkout.failureRate}%)</>} />
									<Bar label="Closed without paying" value={data.checkout.closedWithoutPaying} max={Math.max(1, data.checkout.opened)} right={<b>{data.checkout.closedWithoutPaying}</b>} />
								</div>
								{data.checkout.reasons.length ? (
									<p className={styles.panelHint} style={{ marginTop: 12 }}>
										Fail reasons: {data.checkout.reasons.map((r) => `${r.key} (${r.count})`).join(', ')}
									</p>
								) : null}
								{data.checkout.paidMethods.length ? (
									<p className={styles.panelHint}>Paid with: {data.checkout.paidMethods.map((r) => `${r.key} (${r.count})`).join(', ')}</p>
								) : null}
							</Panel>
						</div>

						<div className={k.twoCol}>
							<Panel title="Instagram / TikTok browser prompt" hint="The 'open in browser' screen shown inside apps.">
								<div className={k.bars}>
									<Bar label="Visitors in apps" value={data.inApp.visitors} max={Math.max(1, data.inApp.visitors)} right={<b>{data.inApp.visitors}</b>} />
									<Bar label="Saw the prompt" value={data.inApp.shown} max={Math.max(1, data.inApp.visitors)} right={<b>{data.inApp.shown}</b>} />
									<Bar label="Opened Chrome" value={data.inApp.openedChrome} max={Math.max(1, data.inApp.shown)} right={<b>{data.inApp.openedChrome}</b>} />
									<Bar label="Copied the link" value={data.inApp.copiedLink} max={Math.max(1, data.inApp.shown)} right={<b>{data.inApp.copiedLink}</b>} />
									<Bar label="Paid in the app anyway" value={data.inApp.payHere} max={Math.max(1, data.inApp.shown)} right={<b>{data.inApp.payHere}</b>} />
									<Bar label="Kept reading" value={data.inApp.keptReading} max={Math.max(1, data.inApp.shown)} right={<b>{data.inApp.keptReading}</b>} />
								</div>
							</Panel>
							<Panel title="Questions people open" hint="Doubts to answer higher on the page.">
								<div className={k.bars}>
									{data.faq.map((f) => (
										<Bar key={f.question} label={f.question} value={f.opens} max={data.faq[0]?.opens || 1} right={<b>{f.opens}</b>} />
									))}
									{!data.faq.length ? <p className={styles.empty}>Nobody opened a question yet.</p> : null}
								</div>
							</Panel>
						</div>

						<p className={styles.panelHint}>
							{data.rows} events in the last {data.days} days{data.truncated ? ' (report cut at 200k events)' : ''}. Links with{' '}
							<code>?src=name</code> show up as their own source - e.g. <code>/kit?src=bio</code>, <code>/kit?src=dm</code>,{' '}
							<code>/kit?src=reel-vortex</code>.
						</p>
					</>
				) : null}
			</div>
		</div>
	)
}
