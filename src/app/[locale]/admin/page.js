'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import LmsHeader from '@/components/Nav/LmsHeader'
import styles from './AdminPanel.module.css'

function StatusBadge({ active, trialing }) {
	if (trialing) return <span className={`${styles.badge} ${styles.badgeTrial}`}>Trial</span>
	if (active) return <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>
	return <span className={`${styles.badge} ${styles.badgeInactive}`}>No access</span>
}

export default function AdminPanelPage() {
	const router = useRouter()
	const { user, loading: sessionLoading } = useAuthSession()

	const [stats, setStats] = useState(null)
	const [students, setStudents] = useState([])
	const [studentsLoading, setStudentsLoading] = useState(true)
	const [error, setError] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		if (sessionLoading) return
		if (!user) {
			router.push('/login')
			return
		}
		if (user.role !== 'admin') {
			router.push('/dashboard')
		}
	}, [sessionLoading, user, router])

	useEffect(() => {
		if (sessionLoading || !user || user.role !== 'admin') return
		fetch('/api/admin/stats', { credentials: 'include' })
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then(setStats)
			.catch(() => setError('Could not load statistics'))
	}, [sessionLoading, user])

	useEffect(() => {
		if (sessionLoading || !user || user.role !== 'admin') return
		const controller = new AbortController()
		setStudentsLoading(true)
		const qs = search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''
		fetch(`/api/admin/students${qs}`, { credentials: 'include', signal: controller.signal })
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then((data) => setStudents(data.students || []))
			.catch((err) => {
				if (err?.name !== 'AbortError') setError('Could not load students')
			})
			.finally(() => setStudentsLoading(false))
		return () => controller.abort()
	}, [sessionLoading, user, search])

	const statCards = useMemo(() => {
		if (!stats) return []
		const active = stats.byStatus?.active || 0
		const trialing = stats.byStatus?.trialing || 0
		const pastDue = stats.byStatus?.past_due || 0
		const canceled = stats.byStatus?.canceled || 0
		return [
			{ label: 'Total users', value: stats.totalUsers },
			{ label: 'Active subscriptions', value: active },
			{ label: 'Trialing', value: trialing },
			{ label: 'Past due', value: pastDue },
			{ label: 'Canceled', value: canceled },
			{ label: 'Manual grants', value: stats.manualGrants },
		]
	}, [stats])

	if (sessionLoading || !user || user.role !== 'admin') {
		return <div className={styles.loading}>Loading…</div>
	}

	return (
		<div className={styles.shell} data-theme="light">
			<LmsHeader />
			<div className={styles.container}>
				<header className={styles.pageHead}>
					<div>
						<p className={styles.pageEyebrow}>Admin</p>
						<h1 className={styles.pageTitle}>Students &amp; subscriptions</h1>
					</div>
				</header>

				{error ? <p className={styles.error}>{error}</p> : null}

				<div className={styles.statGrid}>
					{statCards.map((card) => (
						<div className={styles.statCard} key={card.label}>
							<p className={styles.statValue}>{card.value ?? '—'}</p>
							<p className={styles.statLabel}>{card.label}</p>
						</div>
					))}
				</div>

				<section className={styles.panel}>
					<div className={styles.panelHead}>
						<h2 className={styles.panelTitle}>Students</h2>
						<input
							type="search"
							className={styles.searchInput}
							placeholder="Search by name or email"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

					{studentsLoading ? (
						<p className={styles.empty}>Loading…</p>
					) : students.length === 0 ? (
						<p className={styles.empty}>No students found</p>
					) : (
						<div className={styles.tableWrap}>
							<table className={styles.table}>
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
												<Link href={`/admin/students/${s.id}`} className={styles.rowLink}>
													{s.name || '—'}
												</Link>
											</td>
											<td>{s.email}</td>
											<td>{s.role}</td>
											<td>
												<StatusBadge active={s.active} trialing={s.trialing} />
											</td>
											<td>{s.courseIds.length ? s.courseIds.join(', ') : '—'}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>
			</div>
		</div>
	)
}
