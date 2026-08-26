import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import PlanPicker from '@/components/Billing/PlanPicker'
import { programForCourseId } from '@/lib/billingCatalog'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { ALL_PROGRAM_COURSE_IDS } from '@/lib/courseIds'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../../page.module.css'

export function generateStaticParams() {
	return ALL_PROGRAM_COURSE_IDS.map((courseId) => ({ courseId }))
}

export async function generateMetadata({ params }) {
	const { courseId } = await params
	const program = programForCourseId(courseId)
	if (!program) return { title: 'Choose your plan - SmartCode' }

	return {
		title: `${program.label} - choose your plan | SmartCode`,
		description: `Start ${program.label} free for ${LEGAL.trialDays} days, then ${LEGAL.monthlyPrice}/month. Cancel anytime, ${LEGAL.refundDays}-day money-back.`,
	}
}

export default async function PlanPage({ params }) {
	const { locale, courseId } = await params
	setRequestLocale(locale)

	const program = programForCourseId(courseId)
	if (!program) notFound()

	const landing = LANDING_PROGRAMS.find((p) => p.courseId === courseId)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />

			<SiteHeader />

			<section className={`${styles.section} ${styles.planSection}`}>
				<Link href="/#programs" className={styles.backLink}>
					<ArrowLeft size={16} aria-hidden="true" />
					All programs
				</Link>

				<div className={styles.sectionHead}>
					<p className={styles.planEyebrow}>Step 2 of 2 · Choose your plan</p>
					<h1 className={styles.sectionTitle}>{program.label}</h1>
					<p className={styles.sectionLede}>
						{landing?.outcome || program.blurb}
					</p>
				</div>

				<Suspense
					fallback={<p className={styles.sectionLede}>Loading plans…</p>}
				>
					<PlanPicker courseId={courseId} />
				</Suspense>
			</section>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerBrand}>SmartCode</span>
					<div className={styles.footerLinks}>
						<Link href="/terms">Terms</Link>
						<Link href="/privacy">Privacy</Link>
						<Link href="/refund">Refunds</Link>
					</div>
					<p className={styles.footerNote}>
						Payments by Paddle, our Merchant of Record.
					</p>
				</div>
			</footer>
		</div>
	)
}
