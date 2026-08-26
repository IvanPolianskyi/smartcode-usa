'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import CheckoutButton from './CheckoutButton'
import { BILLING_PROGRAMS, BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import styles from './PricingPlans.module.css'

/**
 * One card per program. Pick Standard or Premium, then monthly/yearly.
 */
export default function PricingPlans({ highlightCourseId = null } = {}) {
	const searchParams = useSearchParams()
	const [billingByCourse, setBillingByCourse] = useState(() => {
		const initial = {}
		for (const program of BILLING_PROGRAMS) {
			initial[program.courseId] = 'monthly'
		}
		return initial
	})
	const [tierByCourse, setTierByCourse] = useState(() => {
		const initial = {}
		for (const program of BILLING_PROGRAMS) {
			initial[program.courseId] = 'standard'
		}
		return initial
	})

	const focusId = highlightCourseId || searchParams.get('course') || null
	const planFromUrl = searchParams.get('plan')
	const tierFromUrl = searchParams.get('tier')

	useEffect(() => {
		if (!focusId) return
		if (planFromUrl) {
			const normalized =
				planFromUrl === 'annual' || planFromUrl === 'year' ? 'annual' : 'monthly'
			setBillingByCourse((prev) => ({ ...prev, [focusId]: normalized }))
		}
		if (tierFromUrl === 'premium' || tierFromUrl === 'standard') {
			setTierByCourse((prev) => ({ ...prev, [focusId]: tierFromUrl }))
		}
	}, [focusId, planFromUrl, tierFromUrl])

	return (
		<div className={styles.wrap}>
			<div className={styles.grid}>
				{BILLING_PROGRAMS.map((program) => {
					const billing = billingByCourse[program.courseId] || 'monthly'
					const isAnnual = billing === 'annual'
					const tierId = tierByCourse[program.courseId] || 'standard'
					const tier = BILLING_TIERS[tierId]
					const focused = focusId === program.courseId
					const price = isAnnual ? tier.annualPrice : tier.monthlyPrice

					return (
						<article
							key={program.courseId}
							id={`plan-${program.courseId}`}
							className={styles.card}
							data-focus={focused ? 'true' : undefined}
							data-tier={tierId}
						>
							<p className={styles.label}>{program.label}</p>
							<p className={styles.blurb}>{program.blurb}</p>

							<div className={styles.tierToggle} role="group" aria-label="Plan tier">
								<button
									type="button"
									className={styles.tierBtn}
									data-active={tierId === 'standard' ? 'true' : undefined}
									onClick={() =>
										setTierByCourse((prev) => ({
											...prev,
											[program.courseId]: 'standard',
										}))
									}
								>
									Standard
								</button>
								<button
									type="button"
									className={styles.tierBtn}
									data-active={tierId === 'premium' ? 'true' : undefined}
									onClick={() =>
										setTierByCourse((prev) => ({
											...prev,
											[program.courseId]: 'premium',
										}))
									}
								>
									Premium
								</button>
							</div>

							<div className={styles.priceRow}>
								<span className={styles.price}>{price}</span>
								<span className={styles.per}>
									{isAnnual ? 'per year' : 'per month'}
								</span>
							</div>

							<button
								type="button"
								className={styles.altBilling}
								onClick={() =>
									setBillingByCourse((prev) => ({
										...prev,
										[program.courseId]: isAnnual ? 'monthly' : 'annual',
									}))
								}
							>
								{isAnnual
									? `or ${tier.monthlyPrice}/month`
									: `or ${tier.annualPrice}/year · save more`}
							</button>

							<p className={styles.includes}>{tier.includes}</p>
							<p className={styles.includesDetail}>{tier.includesDetail}</p>

							<CheckoutButton
								courseId={program.courseId}
								plan={billing}
								tier={tierId}
								className={`sc-btn sc-btn-primary ${styles.cta}`}
							>
								Start learning · {LEGAL.trialDays} days
							</CheckoutButton>

							<p className={styles.fine}>
								Free for {LEGAL.trialDays} days, then {price}
								{isAnnual ? '/year' : '/month'}. Cancel anytime.
							</p>
						</article>
					)
				})}
			</div>

			<p className={styles.legal}>
				Each program is its own subscription. Standard is platform + Discord;
				Premium adds 2 live lessons a week. Payments by Paddle, our Merchant of
				Record. 30-day money-back on your first charge. By starting a trial you
				agree to our <Link href="/terms">Terms</Link> and{' '}
				<Link href="/refund">Refund Policy</Link>.
			</p>
		</div>
	)
}
