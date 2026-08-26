'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import LmsHeader from '@/components/Nav/LmsHeader'
import { ALL_PROGRAM_COURSE_IDS } from '@/lib/courseIds'
import styles from '../../AdminPanel.module.css'

function statusBadgeClass(status, cancelAtPeriodEnd) {
	if (status === 'active' || status === 'trialing') {
		return cancelAtPeriodEnd ? styles.badgeInactive : styles.badgeActive
	}
	if (status === 'past_due') return styles.badgeTrial
	if (status === 'canceled') return styles.badgeCanceled
	return styles.badgeInactive
}

function formatDate(value) {
	if (!value) return '—'
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}

export default function AdminStudentDetailPage() {
	const params = useParams()
	const studentId = String(params?.studentId || '')
	const router = useRouter()
	const { user, loading: sessionLoading } = useAuthSession()

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [notice, setNotice] = useState('')
	const [busy, setBusy] = useState(false)
	const [grantForm, setGrantForm] = useState({
		courseId: ALL_PROGRAM_COURSE_IDS[0],
		tier: 'standard',
		days: '',
		note: '',
	})

	const load = useCallback(async () => {
		setLoading(true)
		setError('')
		try {
			const res = await fetch(`/api/admin/students/${studentId}`, { credentials: 'include' })
			if (!res.ok) throw new Error('load failed')
			const json = await res.json()
			setData(json)
		} catch {
			setError('Could not load this student')
		} finally {
			setLoading(false)
		}
	}, [studentId])

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

	async function handleGrant(e) {
		e.preventDefault()
		setBusy(true)
		setNotice('')
		setError('')
		try {
			const res = await fetch(`/api/admin/students/${studentId}/grant`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					courseId: grantForm.courseId,
					tier: grantForm.tier,
					days: grantForm.days ? Number(grantForm.days) : undefined,
					note: grantForm.note,
				}),
			})
			const json = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(json.error || 'Grant failed')
			setNotice(`Granted ${grantForm.courseId}`)
			await load()
		} catch (err) {
			setError(err.message || 'Could not grant access')
		} finally {
			setBusy(false)
		}
	}

	async function handleRevoke(subscriptionRowId, immediately) {
		if (!window.confirm(immediately ? 'Cancel this subscription immediately?' : 'Cancel at period end?')) {
			return
		}
		setBusy(true)
		setNotice('')
		setError('')
		try {
			const res = await fetch(`/api/admin/students/${studentId}/revoke`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ subscriptionRowId, immediately }),
			})
			const json = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(json.error || 'Revoke failed')
			setNotice('Updated')
			await load()
		} catch (err) {
			setError(err.message || 'Could not revoke access')
		} finally {
			setBusy(false)
		}
	}

	if (sessionLoading || !user || user.role !== 'admin' || loading) {
		return <div className={styles.loading}>Loading…</div>
	}

	if (!data?.student) {
		return (
			<div className={styles.shell} data-theme="light">
				<LmsHeader />
				<div className={styles.container}>
					<p className={styles.error}>{error || 'Student not found'}</p>
					<Link href="/admin" className={styles.backLink}>
						← Back to students
					</Link>
				</div>
			</div>
		)
	}

	const { student, subscriptions } = data

	return (
		<div className={styles.shell} data-theme="light">
			<LmsHeader />
			<div className={styles.container}>
				<Link href="/admin" className={styles.backLink}>
					← Back to students
				</Link>

				<header className={styles.pageHead}>
					<div>
						<p className={styles.pageEyebrow}>Student</p>
						<h1 className={styles.pageTitle}>{student.name || student.email}</h1>
					</div>
				</header>

				{error ? <p className={styles.error}>{error}</p> : null}
				{notice ? <p className={styles.notice}>{notice}</p> : null}

				<section className={styles.panel}>
					<h2 className={styles.panelTitle}>Account</h2>
					<p>Email: {student.email}</p>
					<p>Role: {student.role}</p>
					<p>Joined: {formatDate(student.createdAt)}</p>
				</section>

				<section className={styles.panel}>
					<h2 className={styles.panelTitle}>Subscriptions</h2>
					{subscriptions.length === 0 ? (
						<p className={styles.empty}>No subscriptions</p>
					) : (
						subscriptions.map((sub) => (
							<div className={styles.subRow} key={sub.id}>
								<div className={styles.subMeta}>
									<span className={styles.subLabel}>
										{sub.label} · {sub.planTier || 'standard'}
										{sub.isManual ? ' · manual grant' : ''}
									</span>
									<span className={styles.subDetail}>
										<span className={`${styles.badge} ${statusBadgeClass(sub.status, sub.cancelAtPeriodEnd)}`}>
											{sub.status}
											{sub.cancelAtPeriodEnd ? ' (ending)' : ''}
										</span>
										{' · '}
										Ends {formatDate(sub.currentPeriodEnd)}
										{sub.billingInterval ? ` · ${sub.billingInterval}ly` : ''}
									</span>
								</div>
								{sub.status !== 'canceled' ? (
									<div className={styles.form}>
										{!sub.isManual ? (
											<button
												type="button"
												className="sc-btn sc-btn-ghost"
												disabled={busy}
												onClick={() => handleRevoke(sub.id, false)}
											>
												Cancel at period end
											</button>
										) : null}
										<button
											type="button"
											className="sc-btn sc-btn-ghost"
											disabled={busy}
											onClick={() => handleRevoke(sub.id, true)}
										>
											Cancel now
										</button>
									</div>
								) : null}
							</div>
						))
					)}
				</section>

				<section className={styles.panel}>
					<h2 className={styles.panelTitle}>Manually grant a course</h2>
					<p className={styles.subDetail}>
						For support cases and comps. Never used for real Paddle purchases — those come
						from the webhook only.
					</p>
					<form className={styles.form} onSubmit={handleGrant}>
						<label className={styles.field}>
							Course
							<select
								className={styles.select}
								value={grantForm.courseId}
								onChange={(e) => setGrantForm((f) => ({ ...f, courseId: e.target.value }))}
							>
								{ALL_PROGRAM_COURSE_IDS.map((id) => (
									<option key={id} value={id}>
										{id}
									</option>
								))}
							</select>
						</label>
						<label className={styles.field}>
							Tier
							<select
								className={styles.select}
								value={grantForm.tier}
								onChange={(e) => setGrantForm((f) => ({ ...f, tier: e.target.value }))}
							>
								<option value="standard">Standard</option>
								<option value="premium">Premium</option>
							</select>
						</label>
						<label className={styles.field}>
							Days (blank = indefinite)
							<input
								type="number"
								min="1"
								className={styles.input}
								value={grantForm.days}
								onChange={(e) => setGrantForm((f) => ({ ...f, days: e.target.value }))}
							/>
						</label>
						<label className={styles.field}>
							Note
							<input
								type="text"
								className={styles.input}
								value={grantForm.note}
								onChange={(e) => setGrantForm((f) => ({ ...f, note: e.target.value }))}
							/>
						</label>
						<button type="submit" className="sc-btn sc-btn-primary" disabled={busy}>
							Grant access
						</button>
					</form>
				</section>
			</div>
		</div>
	)
}
