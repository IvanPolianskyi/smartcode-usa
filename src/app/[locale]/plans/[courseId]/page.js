import { Suspense } from 'react'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import PlanPicker from '@/components/Billing/PlanPicker'
import { programForCourseId } from '@/lib/billingCatalog'
import { countryFromHeaders } from '@/lib/paddleCountry'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { ALL_PROGRAM_COURSE_IDS } from '@/lib/courseIds'
import { LEGAL } from '@/lib/legalConfig'
import JsonLd from '@/components/Seo/JsonLd'
import { courseSchema } from '@/lib/structuredData'
import styles from '../../page.module.css'
import SiteFooter from '@/components/Nav/SiteFooter'

export function generateStaticParams() {
	return ALL_PROGRAM_COURSE_IDS.map((courseId) => ({ courseId }))
}

export async function generateMetadata({ params }) {
	const { courseId } = await params
	const program = programForCourseId(courseId)
	if (!program) return { title: 'Choose your plan - SmartCode' }

	const description = `Start ${program.label} free for ${LEGAL.trialDays} days, then ${LEGAL.monthlyPrice}/month. Cancel anytime, ${LEGAL.refundDays}-day money-back.`

	return {
		title: `${program.label} - choose your plan | SmartCode`,
		description,
		alternates: { canonical: `/plans/${courseId}` },
		openGraph: {
			title: `${program.label} - start free for ${LEGAL.trialDays} days`,
			description,
			url: `/plans/${courseId}`,
		},
		twitter: {
			// Restated because page metadata replaces the layout's twitter object.
			card: 'summary_large_image',
			title: `${program.label} - start free for ${LEGAL.trialDays} days`,
			description,
		},
	}
}

export default async function PlanPage({ params }) {
	const { locale, courseId } = await params
	setRequestLocale(locale)

	const program = programForCourseId(courseId)
	if (!program) notFound()

	const landing = LANDING_PROGRAMS.find((p) => p.courseId === courseId)
	const country = countryFromHeaders(await headers())

	return (
		<div className={styles.page} data-theme="light">
			<JsonLd
				data={courseSchema({
					name: program.label,
					description: landing?.outcome || program.blurb,
					courseId,
				})}
			/>
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
					<PlanPicker courseId={courseId} country={country} />
				</Suspense>
			</section>

			<SiteFooter />
		</div>
	)
}
