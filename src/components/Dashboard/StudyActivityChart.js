'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { BookOpen, Clock3, TrendingUp } from 'lucide-react'
import styles from './StudyActivityChart.module.css'

function formatMinutes(total) {
	if (total < 60) return `${total}m`
	const hours = Math.floor(total / 60)
	const mins = total % 60
	return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export default function StudyActivityChart() {
	const t = useTranslations('dashboard.student.studyChart')
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let mounted = true
		fetch('/api/progress/study-activity', { credentials: 'include' })
			.then((res) => (res.ok ? res.json() : null))
			.then((json) => {
				if (mounted) setData(json)
			})
			.catch(() => {})
			.finally(() => {
				if (mounted) setLoading(false)
			})
		return () => {
			mounted = false
		}
	}, [])

	const peak = data?.summary?.peakMinutes || 0
	const hasActivity = (data?.summary?.totalLessons || 0) > 0

	const bars = useMemo(() => {
		if (!data?.days?.length) return []
		const max = Math.max(peak, 1)
		return data.days.map((row) => ({
			...row,
			heightPct: Math.round((row.minutes / max) * 100),
		}))
	}, [data, peak])

	return (
		<section className={styles.panel} aria-labelledby="study-chart-title">
			<header className={styles.head}>
				<div>
					<p className={styles.eyebrow}>{t('eyebrow')}</p>
					<h2 id="study-chart-title" className={styles.title}>
						{t('title')}
					</h2>
					<p className={styles.lede}>{t('lede')}</p>
				</div>
			</header>

			{loading ? (
				<p className={styles.loading}>{t('loading')}</p>
			) : (
				<>
					<div className={styles.summaryRow}>
						<div className={styles.summaryItem}>
							<Clock3 size={15} aria-hidden />
							<div>
								<span className={styles.summaryLabel}>{t('weekTotal')}</span>
								<strong className={styles.summaryValue}>
									{formatMinutes(data?.summary?.totalMinutes || 0)}
								</strong>
							</div>
						</div>
						<div className={styles.summaryItem}>
							<BookOpen size={15} aria-hidden />
							<div>
								<span className={styles.summaryLabel}>{t('lessonsDone')}</span>
								<strong className={styles.summaryValue}>
									{data?.summary?.totalLessons || 0}
								</strong>
							</div>
						</div>
						<div className={styles.summaryItem}>
							<TrendingUp size={15} aria-hidden />
							<div>
								<span className={styles.summaryLabel}>{t('dailyAvg')}</span>
								<strong className={styles.summaryValue}>
									{formatMinutes(data?.summary?.avgMinutes || 0)}
								</strong>
							</div>
						</div>
					</div>

					<div className={styles.chartWrap}>
						<div
							className={styles.chart}
							role="img"
							aria-label={t('chartAria', {
								minutes: data?.summary?.totalMinutes || 0,
							})}
						>
							{bars.map((row) => (
								<div key={row.date} className={styles.barCol}>
									<div className={styles.barTrack}>
										<div
											className={[
												styles.barFill,
												row.minutes > 0 ? styles.barFillActive : null,
											]
												.filter(Boolean)
												.join(' ')}
											style={{ height: `${Math.max(row.heightPct, row.minutes ? 8 : 4)}%` }}
											title={t('barTooltip', {
												minutes: row.minutes,
												lessons: row.lessons,
											})}
										/>
									</div>
									<span className={styles.barLabel}>{row.label}</span>
									{row.minutes > 0 ? (
										<span className={styles.barValue}>{row.minutes}m</span>
									) : null}
								</div>
							))}
						</div>
					</div>

					{!hasActivity ? (
						<p className={styles.emptyHint}>{t('empty')}</p>
					) : (
						<p className={styles.footnote}>{t('footnote')}</p>
					)}
				</>
			)}
		</section>
	)
}
