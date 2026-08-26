'use client'

import React, { useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { BookOpen, CheckCircle2, Play, Lock } from 'lucide-react'
import CheckoutButton from '@/components/Billing/CheckoutButton'
import { DASHBOARD_COURSE_IDS } from '@/hooks/useDashboardCourses'
import {
	formatBillingDate,
	statusCopy,
	useBillingStatus,
} from '@/hooks/useBillingStatus'
import { hasStudentCourseAccess } from '@/lib/courseLessonAccess'
import { LEGAL } from '@/lib/legalConfig'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

const COURSE_PATHS = {
	'roblox-studio': '/courses/roblox-studio',
	'python-developer-zero-to-junior': '/courses/python-developer-zero-to-junior',
	'ai-at-work': '/courses/ai-at-work',
}

const LOCKED_HINT_KEYS = {
	'roblox-studio': 'lockedViaLessonsRoblox',
	'python-developer-zero-to-junior': 'lockedViaLessonsPython',
	'ai-at-work': 'lockedViaLessonsAi',
}

function billingRenewalLine(program) {
	const renews = formatBillingDate(program.endsAt)
	if (!renews) return null
	const when =
		program.cancelAtPeriodEnd || program.status === 'canceled'
			? 'Access until'
			: 'Next payment'
	const interval = program.billingInterval
		? ` · ${program.billingInterval === 'year' ? 'Yearly' : 'Monthly'}`
		: ''
	return `${when} ${renews}${interval}`
}

export default function MyCoursesSection({ user, progressData, getCourseInfo }) {
	const t = useTranslations('dashboard.student.courses')
	const primaryCourseId = String(user?.studentProfile?.primaryCourseId || '').trim()
	const {
		loading: billingLoading,
		activating,
		error,
		opening,
		cancellingId,
		openPortal,
		cancelSubscription,
		programForCourse,
		canManageBilling,
		status,
	} = useBillingStatus()

	const orderedCourseIds = useMemo(() => {
		const owned = []
		const locked = []
		for (const id of DASHBOARD_COURSE_IDS) {
			if (hasStudentCourseAccess(user, id)) owned.push(id)
			else locked.push(id)
		}
		if (primaryCourseId && owned.includes(primaryCourseId)) {
			return [
				primaryCourseId,
				...owned.filter((id) => id !== primaryCourseId),
				...locked,
			]
		}
		return [...owned, ...locked]
	}, [user, primaryCourseId])

	const hasAnySubscription = Boolean(status?.programs?.length)

	const renderCourseCard = (courseId) => {
		const owned = hasStudentCourseAccess(user, courseId)
		const course = getCourseInfo(courseId)
		const progress = owned ? progressData?.[courseId]?.overallProgress || 0 : 0
		const href = COURSE_PATHS[courseId] || course.link
		const lockedHintKey = LOCKED_HINT_KEYS[courseId]
		const isPrimary = primaryCourseId === courseId
		const program = programForCourse(courseId)
		const copy = program ? statusCopy(program) : null
		const renewal = program ? billingRenewalLine(program) : null
		const busy = program && cancellingId === program.paddleSubscriptionId

		return (
			<article
				key={courseId}
				className={[
					styles.courseCard,
					owned ? null : styles.courseCardLocked,
					owned && isPrimary ? styles.courseCardPrimary : null,
				]
					.filter(Boolean)
					.join(' ')}
			>
				<div className={styles.courseBody}>
					<div className={styles.courseMeta}>
						<div className={styles.courseTitleRow}>
							<h3 className={styles.courseTitle}>{course.title}</h3>
							{owned ? (
								<span
									className={
										copy?.tone === 'warn'
											? styles.statusWarn
											: copy?.tone === 'trial'
												? styles.statusTrial
												: copy?.tone === 'off'
													? styles.statusLocked
													: styles.statusActive
									}
								>
									{copy?.tone === 'off' ? (
										<Lock size={12} aria-hidden />
									) : (
										<CheckCircle2 size={12} aria-hidden />
									)}
									{copy?.label || t('active')}
								</span>
							) : (
								<span className={styles.statusLocked}>
									<Lock size={12} aria-hidden />
									{t('locked')}
								</span>
							)}
							{owned && program ? (
								<span
									className={
										program.planTier === 'premium'
											? `${styles.tierPill} ${styles.tierPillPremium}`
											: `${styles.tierPill} ${styles.tierPillStandard}`
									}
								>
									{program.planTier === 'premium'
										? t('tierPremium')
										: t('tierStandard')}
								</span>
							) : null}
						</div>

						{owned ? (
							<>
								<div className={styles.progressRow}>
									<div className={styles.progressTrack} aria-hidden>
										<span style={{ width: `${progress}%` }} />
									</div>
									<span className={styles.progressLabel}>
										{t('progress', { percent: Math.round(progress) })}
									</span>
								</div>
								{program ? (
									<p className={styles.courseBillingLine}>
										{program.planTier === 'premium'
											? t('tierPremiumBlurb')
											: t('tierStandardBlurb')}
									</p>
								) : null}
								{copy?.line &&
								(copy.tone !== 'ok' || program?.cancelAtPeriodEnd) ? (
									<p className={styles.courseBillingLine}>{copy.line}</p>
								) : null}
								{renewal ? (
									<p className={styles.courseBillingMeta}>{renewal}</p>
								) : null}
							</>
						) : (
							<p className={styles.courseDesc}>
								{lockedHintKey ? t(lockedHintKey) : t('lockedHint')}
							</p>
						)}
					</div>

					<div className={styles.courseAside}>
						{owned ? (
							<>
								<Link href={href} className={styles.courseCta}>
									<Play size={15} aria-hidden />
									{isPrimary ? t('openTrack') : t('resume')}
								</Link>
								{program?.canCancel ? (
									<button
										type="button"
										className={styles.courseCancelBtn}
										onClick={() => cancelSubscription(program)}
										disabled={Boolean(cancellingId)}
									>
										{busy ? t('cancelling') : t('cancel')}
									</button>
								) : null}
							</>
						) : (
							<>
								<div className={styles.courseSubscribeRow}>
									<CheckoutButton
										courseId={courseId}
										plan="monthly"
										tier="standard"
										className="sc-btn sc-btn-primary"
									>
										Standard
									</CheckoutButton>
									<CheckoutButton
										courseId={courseId}
										plan="monthly"
										tier="premium"
										className="sc-btn sc-btn-ghost"
									>
										Premium
									</CheckoutButton>
								</div>
								<Link href={href} className={styles.courseCtaGhost}>
									<BookOpen size={15} aria-hidden />
									{t('preview')}
								</Link>
							</>
						)}
					</div>
				</div>
			</article>
		)
	}

	return (
		<section className={styles.coursesSection} aria-busy={billingLoading}>
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>{t('title')}</h2>
				<p className={styles.sectionHint}>{t('subtitle')}</p>
			</div>

			{activating ? (
				<p className={styles.courseBillingNotice}>{t('activating')}</p>
			) : null}

			{billingLoading && !status ? (
				<p className={styles.softLoading}>{t('billingLoading')}</p>
			) : null}

			{!billingLoading && !hasAnySubscription ? (
				<p className={styles.courseBillingNotice}>
					{t('pricingBlurb', { days: LEGAL.trialDays })}
				</p>
			) : null}

			<div className={styles.courseList}>{orderedCourseIds.map(renderCourseCard)}</div>

			<footer className={styles.courseBillingFooter}>
				{canManageBilling ? (
					<button
						type="button"
						className={styles.coursePortalBtn}
						onClick={openPortal}
						disabled={opening}
					>
						{opening ? t('portalOpening') : t('updatePayment')}
					</button>
				) : null}
				<p className={styles.courseBillingMeta}>
					{t('seePricing')}{' '}
					<Link href="/pricing" className={styles.courseInlineLink}>
						{t('pricingLink')}
					</Link>
					.
				</p>
				{error ? <p className={styles.courseBillingError}>{error}</p> : null}
			</footer>
		</section>
	)
}
