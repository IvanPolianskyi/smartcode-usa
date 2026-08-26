'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { BILLING_TIERS, annualSaving } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import CheckoutButton from './CheckoutButton'
import styles from './ProgramPricingFlow.module.css'

const TRIAL = LEGAL.trialDays
const TIER_ORDER = ['standard', 'premium']

/**
 * Step 2 of the purchase: tier + billing period for one already-chosen program.
 *
 * Premium is the default selection (live lessons are the upsell). Cards are
 * clickable so the visitor can switch highlight + CTA style before starting.
 */
export default function PlanPicker({ courseId }) {
	const searchParams = useSearchParams()
	const planParam = searchParams.get('plan')
	const tierParam = searchParams.get('tier')
	const [billing, setBilling] = useState(
		planParam === 'annual' || planParam === 'year' ? 'annual' : 'monthly'
	)
	const [selectedTier, setSelectedTier] = useState(
		tierParam === 'standard' || tierParam === 'premium' ? tierParam : 'premium'
	)

	const isAnnual = billing === 'annual'
	const standardSaving = annualSaving('standard')

	return (
		<div className={styles.picker}>
			<div className={styles.billingToggle} role="group" aria-label="Billing period">
				<button
					type="button"
					className={styles.billingBtn}
					data-active={!isAnnual ? 'true' : undefined}
					onClick={() => setBilling('monthly')}
				>
					Monthly
				</button>
				<button
					type="button"
					className={styles.billingBtn}
					data-active={isAnnual ? 'true' : undefined}
					onClick={() => setBilling('annual')}
				>
					Annual
					{standardSaving ? (
						<span className={styles.saveTag}>save {standardSaving.display}</span>
					) : null}
				</button>
			</div>

			<div
				className={styles.tierGrid}
				role="radiogroup"
				aria-label="Subscription plan"
			>
				{TIER_ORDER.map((tierId) => {
					const tier = BILLING_TIERS[tierId]
					const price = isAnnual ? tier.annualPrice : tier.monthlyPrice
					const saving = annualSaving(tierId)
					const isSelected = selectedTier === tierId
					const isPremium = tierId === 'premium'

					return (
						<div
							key={tierId}
							className={styles.tierCard}
							data-recommended={isSelected ? 'true' : undefined}
							role="radio"
							aria-checked={isSelected}
							tabIndex={0}
							onClick={() => setSelectedTier(tierId)}
							onKeyDown={(event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									event.preventDefault()
									setSelectedTier(tierId)
								}
							}}
						>
							<div className={styles.tierTop}>
								<h2 className={styles.tierName}>{tier.label}</h2>
								{isPremium ? (
									<span className={styles.tierFlag}>Recommended</span>
								) : null}
							</div>
							<p className={styles.tierTagline}>{tier.tagline}</p>

							<p className={styles.priceRow}>
								<span className={styles.price}>{price}</span>
								<span className={styles.per}>{isAnnual ? '/year' : '/month'}</span>
							</p>
							<p className={styles.priceNote}>
								{isAnnual && saving
									? `First ${TRIAL} days free ($0 today), then ${price}/year (save ${saving.display})`
									: `First ${TRIAL} days free ($0 today), then ${price}/month · cancel anytime`}
							</p>

							<ul className={styles.featureList}>
								{tier.features.map((feature) => (
									<li key={feature}>
										<Check
											size={16}
											strokeWidth={3}
											className={styles.featureIcon}
											aria-hidden="true"
										/>
										<span>{feature}</span>
									</li>
								))}
							</ul>

							{/* Opens Paddle in place for signed-in visitors; guests are sent
							    to /start to make an account and resume here. One click
							    fewer than routing everyone through /start. */}
							<div
								className={styles.tierCtaWrap}
								onClick={(event) => event.stopPropagation()}
							>
								<CheckoutButton
									courseId={courseId}
									plan={billing}
									tier={tierId}
									className={styles.tierCta}
									variant={isSelected ? 'primary' : 'ghost'}
								>
									Start {TRIAL} days free
								</CheckoutButton>
							</div>
						</div>
					)
				})}
			</div>

			<p className={styles.legal}>
				Payments are processed by Paddle.com Market Limited as Merchant of
				Record. By starting a trial you agree to recurring billing after the
				trial (unless you cancel), our <Link href="/terms">Terms of Service</Link>
				, <Link href="/refund">Refund Policy</Link>, and{' '}
				<Link href="/privacy">Privacy Policy</Link>.
			</p>
		</div>
	)
}
