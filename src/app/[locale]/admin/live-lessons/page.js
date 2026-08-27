'use client'

import { useCallback, useEffect, useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import LmsHeader from '@/components/Nav/LmsHeader'
import { ALL_PROGRAM_COURSE_IDS } from '@/lib/courseIds'
import { BILLING_PROGRAMS } from '@/lib/billingCatalog'
import styles from '../AdminPanel.module.css'

const EMPTY_FORM = {
	title: '',
	courseId: 'all',
	startsAt: '',
	endsAt: '',
	joinUrl: '',
	youtubeUrl: '',
}

function toLocalInputValue(iso) {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const pad = (n) => String(n).padStart(2, '0')
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function addHoursLocal(localValue, hours) {
	if (!localValue) return ''
	const d = new Date(localValue)
	if (Number.isNaN(d.getTime())) return ''
	d.setHours(d.getHours() + hours)
	return toLocalInputValue(d.toISOString())
}

function formatWhen(iso) {
	if (!iso) return '-'
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return '-'
	return d.toLocaleString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

function lessonToForm(lesson) {
	return {
		title: lesson.title || '',
		courseId: lesson.courseId || 'all',
		startsAt: toLocalInputValue(lesson.startsAt),
		endsAt: toLocalInputValue(lesson.endsAt),
		joinUrl: lesson.joinUrl || '',
		youtubeUrl: lesson.youtubeUrl || '',
	}
}

function formToPayload(form) {
	return {
		title: form.title.trim(),
		courseId: form.courseId === 'all' ? null : form.courseId,
		startsAt: new Date(form.startsAt).toISOString(),
		endsAt: new Date(form.endsAt).toISOString(),
		joinUrl: form.joinUrl.trim(),
		youtubeUrl: form.youtubeUrl.trim(),
	}
}

export default function AdminLiveLessonsPage() {
	const router = useRouter()
	const { user, loading: sessionLoading } = useAuthSession()

	const [upcoming, setUpcoming] = useState([])
	const [past, setPast] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [notice, setNotice] = useState('')
	const [busy, setBusy] = useState(false)
	const [editingId, setEditingId] = useState(null)
	const [form, setForm] = useState(EMPTY_FORM)

	const load = useCallback(async () => {
		setLoading(true)
		setError('')
		try {
			const res = await fetch('/api/admin/live-lessons', { credentials: 'include' })
			if (!res.ok) throw new Error('load failed')
			const json = await res.json()
			setUpcoming(json.upcoming || [])
			setPast(json.past || [])
		} catch {
			setError('Could not load live lessons')
		} finally {
			setLoading(false)
		}
	}, [])

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

	function startCreate() {
		setEditingId(null)
		setForm(EMPTY_FORM)
		setNotice('')
		setError('')
	}

	function startEdit(lesson) {
		setEditingId(lesson.id)
		setForm(lessonToForm(lesson))
		setNotice('')
		setError('')
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	function onStartsAtChange(value) {
		setForm((f) => ({
			...f,
			startsAt: value,
			// Default length: 1 hour when ending time is empty or still matches the old start+1h.
			endsAt:
				!f.endsAt || f.endsAt === addHoursLocal(f.startsAt, 1)
					? addHoursLocal(value, 1)
					: f.endsAt,
		}))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		setBusy(true)
		setNotice('')
		setError('')
		try {
			const payload = formToPayload(form)
			const url = editingId
				? `/api/admin/live-lessons/${editingId}`
				: '/api/admin/live-lessons'
			const res = await fetch(url, {
				method: editingId ? 'PATCH' : 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
			const json = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(json.error || 'Save failed')
			setNotice(
				editingId
					? 'Lesson updated — Premium students see the new Zoom link on their dashboard.'
					: 'Lesson created — Premium students can join from their dashboard.'
			)
			setEditingId(null)
			setForm(EMPTY_FORM)
			await load()
		} catch (err) {
			setError(err.message || 'Could not save lesson')
		} finally {
			setBusy(false)
		}
	}

	async function handleDelete(id) {
		if (!window.confirm('Delete this live lesson?')) return
		setBusy(true)
		setNotice('')
		setError('')
		try {
			const res = await fetch(`/api/admin/live-lessons/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			})
			const json = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(json.error || 'Delete failed')
			if (editingId === id) startCreate()
			setNotice('Lesson deleted')
			await load()
		} catch (err) {
			setError(err.message || 'Could not delete lesson')
		} finally {
			setBusy(false)
		}
	}

	async function quickSetZoom(lesson) {
		const next = window.prompt(
			`Zoom / broadcast link for “${lesson.title}”`,
			lesson.joinUrl || 'https://zoom.us/j/'
		)
		if (next === null) return
		const joinUrl = next.trim()
		if (!joinUrl) {
			setError('Zoom link cannot be empty')
			return
		}
		setBusy(true)
		setNotice('')
		setError('')
		try {
			const res = await fetch(`/api/admin/live-lessons/${lesson.id}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ joinUrl }),
			})
			const json = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(json.error || 'Could not update Zoom link')
			setNotice('Zoom link updated')
			await load()
		} catch (err) {
			setError(err.message || 'Could not update Zoom link')
		} finally {
			setBusy(false)
		}
	}

	if (sessionLoading || !user || user.role !== 'admin') {
		return <div className={styles.loading}>Loading…</div>
	}

	const rows = [
		{ label: 'Upcoming', items: upcoming },
		{ label: 'Past', items: past },
	]

	return (
		<div className={styles.shell} data-theme="light">
			<LmsHeader />
			<div className={styles.container}>
				<Link href="/admin" className={styles.backLink}>
					← Back to students
				</Link>

				<header className={styles.pageHead}>
					<div>
						<p className={styles.pageEyebrow}>Admin</p>
						<h1 className={styles.pageTitle}>Live lessons</h1>
						<p className={styles.panelHint}>
							Pick a time, paste the Zoom (or Meet) link, save. Premium students
							see it on <strong>/dashboard</strong> and tap Join.
						</p>
					</div>
				</header>

				{error ? <p className={styles.error}>{error}</p> : null}
				{notice ? <p className={styles.notice}>{notice}</p> : null}

				<section className={styles.panel}>
					<div className={styles.panelHead}>
						<h2 className={styles.panelTitle}>
							{editingId ? 'Edit lesson' : 'Schedule a live lesson'}
						</h2>
						{editingId ? (
							<button type="button" className="sc-btn sc-btn-ghost" onClick={startCreate}>
								New lesson
							</button>
						) : null}
					</div>

					<form className={styles.form} onSubmit={handleSubmit}>
						<label className={styles.field}>
							Title
							<input
								className={styles.input}
								required
								value={form.title}
								onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
								placeholder="Group build & live coding"
							/>
						</label>
						<label className={styles.field}>
							Program
							<select
								className={styles.select}
								value={form.courseId}
								onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
							>
								<option value="all">All programs</option>
								{ALL_PROGRAM_COURSE_IDS.map((id) => {
									const label =
										BILLING_PROGRAMS.find((p) => p.courseId === id)?.label || id
									return (
										<option key={id} value={id}>
											{label}
										</option>
									)
								})}
							</select>
						</label>
						<label className={styles.field}>
							Starts
							<input
								className={styles.input}
								type="datetime-local"
								required
								value={form.startsAt}
								onChange={(e) => onStartsAtChange(e.target.value)}
							/>
						</label>
						<label className={styles.field}>
							Ends
							<input
								className={styles.input}
								type="datetime-local"
								required
								value={form.endsAt}
								onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))}
							/>
						</label>
						<label className={styles.field}>
							Zoom / broadcast link
							<input
								className={styles.input}
								type="url"
								required
								value={form.joinUrl}
								onChange={(e) => setForm((f) => ({ ...f, joinUrl: e.target.value }))}
								placeholder="https://zoom.us/j/123456789"
							/>
						</label>
						<label className={styles.field}>
							YouTube recording (optional, after the class)
							<input
								className={styles.input}
								type="url"
								value={form.youtubeUrl}
								onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
								placeholder="https://youtube.com/…"
							/>
						</label>
						<button type="submit" className="sc-btn sc-btn-primary" disabled={busy}>
							{busy ? 'Saving…' : editingId ? 'Save changes' : 'Publish lesson'}
						</button>
					</form>
				</section>

				{rows.map((section) => (
					<section className={styles.panel} key={section.label}>
						<h2 className={styles.panelTitle}>{section.label}</h2>
						{loading ? (
							<p className={styles.empty}>Loading…</p>
						) : section.items.length === 0 ? (
							<p className={styles.empty}>No lessons</p>
						) : (
							<div className={styles.tableWrap}>
								<table className={styles.table}>
									<thead>
										<tr>
											<th>When</th>
											<th>Title</th>
											<th>Program</th>
											<th>Zoom</th>
											<th>Recording</th>
											<th />
										</tr>
									</thead>
									<tbody>
										{section.items.map((lesson) => (
											<tr key={lesson.id}>
												<td>
													{formatWhen(lesson.startsAt)}
													<br />
													<span className={styles.subDetail}>
														→ {formatWhen(lesson.endsAt)}
													</span>
												</td>
												<td>{lesson.title}</td>
												<td>{lesson.courseLabel}</td>
												<td>
													{lesson.joinUrl ? (
														<a
															href={lesson.joinUrl}
															target="_blank"
															rel="noopener noreferrer"
															className={styles.rowLink}
														>
															Open Zoom
														</a>
													) : (
														'-'
													)}
												</td>
												<td>
													{lesson.youtubeUrl ? (
														<a
															href={lesson.youtubeUrl}
															target="_blank"
															rel="noopener noreferrer"
															className={styles.rowLink}
														>
															YouTube
														</a>
													) : (
														'-'
													)}
												</td>
												<td>
													<button
														type="button"
														className="sc-btn sc-btn-ghost"
														disabled={busy}
														onClick={() => quickSetZoom(lesson)}
													>
														Set Zoom
													</button>{' '}
													<button
														type="button"
														className="sc-btn sc-btn-ghost"
														disabled={busy}
														onClick={() => startEdit(lesson)}
													>
														Edit
													</button>{' '}
													<button
														type="button"
														className="sc-btn sc-btn-ghost"
														disabled={busy}
														onClick={() => handleDelete(lesson.id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</section>
				))}
			</div>
		</div>
	)
}
