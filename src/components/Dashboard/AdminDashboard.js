'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import adminStyles from '@/app/[locale]/admin/AdminPanel.module.css'
import styles from './AdminDashboard.module.css'
import { niceAxis, labelStride } from '@/lib/funnelAnalytics.mjs'

function StatusBadge({ active, trialing }) {
	if (trialing) {
		return <span className={`${adminStyles.badge} ${adminStyles.badgeTrial}`}>Trial</span>
	}
	if (active) {
		return <span className={`${adminStyles.badge} ${adminStyles.badgeActive}`}>Active</span>
	}
	return <span className={`${adminStyles.badge} ${adminStyles.badgeInactive}`}>No access</span>
}

function formatPct(value) {
	if (value === null || value === undefined) return '—'
	return `${value}%`
}

function FunnelChart({ rows = [], anomalies = [] }) {
	if (!rows.length) return null

	return (
		<section className={styles.chartCard}>
			<h3 className={styles.chartTitle}>Funnel conversion</h3>
			<p className={styles.chartHint}>
				Percent of site sessions that reached each step, and step-over-step drop-off.
			</p>
			{anomalies.length > 0 ? (
				<ul className={styles.anomalyList}>
					{anomalies.map((item) => (
						<li key={item.id}>{item.message}</li>
					))}
				</ul>
			) : null}
			<div className={styles.funnelList}>
				{rows.map((row, index) => (
					<div key={row.id} className={styles.funnelRow}>
						<div className={styles.funnelMeta}>
							<span className={styles.funnelLabel}>{row.label}</span>
							<span className={styles.funnelCount}>{row.count}</span>
						</div>
						<div className={styles.funnelBarTrack} aria-hidden="true">
							<div
								className={styles.funnelBarFill}
								style={{ width: `${row.barPct}%` }}
							/>
						</div>
						<div className={styles.funnelRates}>
							<span title="Share of site sessions">{formatPct(row.pctOfTop)} of top</span>
							{index > 0 ? (
								<span title="Conversion from previous step">
									{formatPct(row.pctOfPrev)} from prev
								</span>
							) : null}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

function VisitorsChart({ series }) {
	const width = 640
	const height = 200
	const pad = { top: 12, right: 12, bottom: 28, left: 36 }
	const innerW = width - pad.left - pad.right
	const innerH = height - pad.top - pad.bottom

	const yaxis = niceAxis(Math.max(0, ...series.map((d) => d.visitors)))
	const maxY = yaxis.max
	const stride = labelStride(series.length, 8)

	const points = series.map((d, i) => {
		const x = pad.left + (i / Math.max(1, series.length - 1)) * innerW
		const y = pad.top + innerH - (d.visitors / maxY) * innerH
		return { x, y, ...d }
	})
	const line = points.map((p) => `${p.x},${p.y}`).join(' ')
	const area = `${pad.left},${pad.top + innerH} ${line} ${width - pad.right},${pad.top + innerH}`

	return (
		<svg
			className={styles.chartSvg}
			viewBox={`0 0 ${width} ${height}`}
			role="img"
			aria-label="Daily unique visitors"
		>
			{yaxis.ticks.map((val) => {
				const t = maxY > 0 ? val / maxY : 0
				const y = pad.top + innerH * (1 - t)
				return (
					<g key={val}>
						<line
							x1={pad.left}
							y1={y}
							x2={width - pad.right}
							y2={y}
							className={styles.chartGridLine}
						/>
						<text x={4} y={y + 4} className={styles.chartAxis}>
							{val}
						</text>
					</g>
				)
			})}
			<polygon points={area} className={styles.chartArea} />
			<polyline points={line} className={styles.chartLine} fill="none" />
			{points.map((p) => (
				<circle key={p.date} cx={p.x} cy={p.y} r={3} className={styles.chartDot}>
					<title>
						{p.date}: {p.visitors} unique visitor{p.visitors === 1 ? '' : 's'}
					</title>
				</circle>
			))}
			{points.map((p, i) => {
				if (i % stride !== 0 && i !== points.length - 1) return null
				return (
					<text
						key={`label-${p.date}`}
						x={p.x}
						y={height - 4}
						textAnchor="middle"
						className={styles.chartAxis}
					>
						{p.date.slice(5)}
					</text>
				)
			})}
		</svg>
	)
}

export default function AdminDashboard({ user }) {
	const [days, setDays] = useState(30)
	const [analytics, setAnalytics] = useState(null)
	const [stats, setStats] = useState(null)
	const [students, setStudents] = useState([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		setLoading(true)
		setError('')
		Promise.all([
			fetch(`/api/admin/analytics?days=${days}`, { credentials: 'include' }).then((r) =>
				r.ok ? r.json() : Promise.reject()
			),
			fetch('/api/admin/stats', { credentials: 'include' }).then((r) =>
				r.ok ? r.json() : Promise.reject()
			),
		])
			.then(([analyticsData, statsData]) => {
				setAnalytics(analyticsData)
				setStats(statsData)
			})
			.catch(() => setError('Could not load analytics'))
			.finally(() => setLoading(false))
	}, [days])

	useEffect(() => {
		const controller = new AbortController()
		const qs = search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''
		fetch(`/api/admin/students${qs}`, { credentials: 'include', signal: controller.signal })
			.then((res) => (res.ok ? res.json() : Promise.reject()))
			.then((data) => setStudents(data.students || []))
			.catch(() => {})
		return () => controller.abort()
	}, [search])

	// Funnel counts (sign_up / start_trial / purchase) are all-time-window,
	// distinct-people counts from analyticsEvents — the same population as
	// every other row in the funnel. Total users / active subs / manual
	// grants come from a different collection with a different lifetime
	// (all accounts ever, not "in the last N days"), so they render in their
	// own group instead of a merged row that mixes windowed and cumulative
	// numbers under one heading.
	const periodCards = useMemo(() => {
		if (!analytics) return []
		return [
			{ label: 'Sessions (period)', value: analytics.summary?.totalSessions ?? '—' },
			{ label: 'Unique visitors', value: analytics.summary?.totalVisitors ?? '—' },
			{ label: 'Sign-ups', value: analytics.funnel?.find((f) => f.id === 'sign_up')?.count ?? '—' },
			{ label: 'Trials started', value: analytics.funnel?.find((f) => f.id === 'start_trial')?.count ?? '—' },
			{ label: 'Paid subs', value: analytics.funnel?.find((f) => f.id === 'purchase')?.count ?? '—' },
		]
	}, [analytics])

	const lifetimeCards = useMemo(() => {
		if (!stats) return []
		return [
			{ label: 'Total users', value: stats.totalUsers ?? '—' },
			{ label: 'Active subs', value: stats.byStatus?.active ?? 0 },
			{ label: 'Manual grants', value: stats.manualGrants ?? 0 },
		]
	}, [stats])

	const daily = analytics?.daily || []

	return (
		<div className={styles.wrap}>
			<header className={styles.head}>
				<div>
					<p className={styles.eyebrow}>Analytics</p>
					<h2 className={styles.title}>Acquisition funnel</h2>
					<p className={styles.lede}>
						First-party tracking: sessions, funnel steps, and conversion rates — last{' '}
						{days} days.
					</p>
				</div>
				<div className={styles.headActions}>
					<label className={styles.rangeLabel}>
						Range
						<select
							className={styles.rangeSelect}
							value={days}
							onChange={(e) => setDays(Number(e.target.value))}
						>
							<option value={7}>7 days</option>
							<option value={14}>14 days</option>
							<option value={30}>30 days</option>
							<option value={90}>90 days</option>
						</select>
					</label>
					<Link href="/admin/live-lessons" className="sc-btn sc-btn-primary">
						Live lessons
					</Link>
				</div>
			</header>

			{error ? <p className={adminStyles.error}>{error}</p> : null}
			{loading ? <p className={styles.loading}>Loading analytics…</p> : null}

			{!loading && analytics ? (
				<>
					<div className={adminStyles.statGrid}>
						{periodCards.map((card) => (
							<div className={adminStyles.statCard} key={card.label}>
								<p className={adminStyles.statValue}>{card.value}</p>
								<p className={adminStyles.statLabel}>{card.label}</p>
							</div>
						))}
					</div>

					{lifetimeCards.length > 0 && (
						<div className={styles.lifetimeGroup}>
							<p className={styles.lifetimeLabel}>All-time</p>
							<div className={adminStyles.statGrid}>
								{lifetimeCards.map((card) => (
									<div className={adminStyles.statCard} key={card.label}>
										<p className={adminStyles.statValue}>{card.value}</p>
										<p className={adminStyles.statLabel}>{card.label}</p>
									</div>
								))}
							</div>
						</div>
					)}

					<FunnelChart rows={analytics.funnel} anomalies={analytics.anomalies} />

					<section className={styles.chartCard}>
						<h3 className={styles.chartTitle}>Unique visitors per day</h3>
						<VisitorsChart series={daily} />
					</section>
				</>
			) : null}

			<section className={adminStyles.panel}>
				<div className={adminStyles.panelHead}>
					<h3 className={adminStyles.panelTitle}>Students</h3>
					<input
						type="search"
						className={adminStyles.searchInput}
						placeholder="Search by name or email"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{students.length === 0 ? (
					<p className={adminStyles.empty}>No students found</p>
				) : (
					<div className={adminStyles.tableWrap}>
						<table className={adminStyles.table}>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Access</th>
									<th>Courses</th>
								</tr>
							</thead>
							<tbody>
								{students.map((s) => (
									<tr key={s.id}>
										<td>
											<Link
												href={`/admin/students/${s.id}`}
												className={adminStyles.rowLink}
											>
												{s.name || '-'}
											</Link>
										</td>
										<td>{s.email}</td>
										<td>{s.role}</td>
										<td>
											<StatusBadge active={s.active} trialing={s.trialing} />
										</td>
										<td>{s.courseIds.length ? s.courseIds.join(', ') : '-'}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</section>

			<p className={styles.adminMeta}>
				Signed in as {user?.name} · {user?.email}
			</p>
		</div>
	)
}
