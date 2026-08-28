'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import { useBillingStatus } from '@/hooks/useBillingStatus'
import { entitlementCoversCheckout } from '@/lib/billingActivation'
import { LEGAL } from '@/lib/legalConfig'
import { track } from '@/lib/analytics'
import styles from '../page.module.css'
import welcomeStyles from './welcome.module.css'

/**
 * Post-checkout landing. Paddle redirects here after a successful overlay
 * payment. Access is granted only by the webhook — this page polls until
 * entitlements appear, then sends the student to the dashboard.
 */
function WelcomeBody() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const expectedCourseId = String(searchParams.get('course') || '').trim() || null
	const {
		status,
		loading,
		activating,
		activationStalled,
		syncing,
		error,
		syncPurchases,
	} = useBillingStatus()

	const ready = entitlementCoversCheckout(status, expectedCourseId)

	// Fired once, when entitlements actually land. Reporting the conversion on
	// page view instead would count every abandoned checkout as a sale.
	const reported = useRef(false)

	useEffect(() => {
		if (!ready || reported.current) return
		reported.current = true
		const params = {
			currency: 'USD',
			course_ids: status?.courseIds || [],
			tier: status?.programs?.[0]?.planTier || 'standard',
			plan: status?.programs?.[0]?.billingInterval || null,
		}
		track(status?.trialing ? 'start_trial' : 'purchase', params)
	}, [ready, status])

	useEffect(() => {
		if (!ready) return
		const timer = setTimeout(() => {
			router.replace('/dashboard')
		}, 1200)
		return () => clearTimeout(timer)
	}, [ready, router])

	let title = 'Welcome to SmartCode'
	let lede = 'Confirming your free trial…'
	if (ready) {
		title = 'You are in'
		lede = 'Your trial is active. Opening your dashboard…'
	} else if (activationStalled) {
		title = 'Payment received'
		lede = `Your payment went through. Access can take a minute to unlock — try refresh access below, or email ${LEGAL.supportEmail} if it is still locked.`
	} else if (error) {
		title = 'Almost there'
		lede = error
	} else if (!loading && !activating) {
		lede = 'Nothing charged today. When your trial unlocks, we will take you to your courses.'
	}

	return (
		<section className={`${styles.section} ${welcomeStyles.wrap}`}>
			<div className={styles.sectionHead}>
				<p className={styles.planEyebrow}>Checkout complete</p>
				<h1 className={styles.sectionTitle}>{title}</h1>
				<p className={styles.sectionLede}>{lede}</p>
			</div>

			{(activating || loading) && !ready ? (
				<p className={welcomeStyles.status} role="status">
					Unlocking your programs…
				</p>
			) : null}

			<div className={welcomeStyles.actions}>
				{activationStalled ? (
					<button
						type="button"
						className="sc-btn sc-btn-primary sc-btn-lg"
						onClick={() => syncPurchases()}
						disabled={syncing}
					>
						{syncing ? 'Refreshing…' : 'Refresh access'}
					</button>
				) : null}
				<Link href="/dashboard" className="sc-btn sc-btn-primary sc-btn-lg">
					Go to dashboard
				</Link>
				<Link href="/pricing" className="sc-btn sc-btn-ghost sc-btn-lg">
					Browse programs
				</Link>
			</div>
		</section>
	)
}

export default function WelcomePage() {
	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader />
			<main>
				<Suspense
					fallback={
						<section className={styles.section}>
							<p className={styles.sectionLede}>Confirming your trial…</p>
						</section>
					}
				>
					<WelcomeBody />
				</Suspense>
			</main>
			<SiteFooter />
		</div>
	)
}
