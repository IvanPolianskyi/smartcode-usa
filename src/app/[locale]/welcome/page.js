'use client'

import { Suspense, useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import { useBillingStatus } from '@/hooks/useBillingStatus'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'
import welcomeStyles from './welcome.module.css'

/**
 * Post-checkout landing. Paddle redirects here after a successful overlay
 * payment. Access is granted only by the webhook — this page polls until
 * entitlements appear, then sends the student to the dashboard.
 */
function WelcomeBody() {
	const router = useRouter()
	const {
		status,
		loading,
		activating,
		activationStalled,
		error,
	} = useBillingStatus()

	const ready =
		Boolean(status?.hasSubscription) && (status?.courseIds || []).length > 0

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
		lede = `Your payment went through. Access can take a minute to unlock — open the dashboard, or email ${LEGAL.supportEmail} if it is still locked.`
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
