'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import {
	BILLING_TIERS,
	SELLABLE_TIER_IDS,
	annualSaving,
	comparePlans,
	priceIdFor,
} from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import { usePaddlePrices } from '@/hooks/usePaddlePrices'
import CheckoutButton from './CheckoutButton'
import styles from './ProgramPricingFlow.module.css'

const TRIAL = LEGAL.trialDays
const TIER_ORDER = SELLABLE_TIER_IDS
const DEFAULT_TIER = TIER_ORDER[TIER_ORDER.length - 1]

/**
 * Step 2 of the purchase: tier + billing period for one already-chosen program.
 *
 * Prices come from Paddle PricePreview (localised totals). Catalog strings are
 * only a fallback while preview loads or if Paddle is unreachable.
 */
export default function PlanPicker({ courseId, country = null }) {
	const searchParams = useSearchParams()
	const planParam = searchParams.get('plan')
	const tierParam = searchParams.get('tier')
	const [billing, setBilling] = useState(
		planParam === 'annual' || planParam === 'year' ? 'annual' : 'monthly'
	)
	const [selectedTier, setSelectedTier] = useState(
		TIER_ORDER.includes(tierParam) ? tierParam : DEFAULT_TIER
	)

	const priceIds = TIER_ORDER.flatMap((tierId) => [
		priceIdFor(courseId, 'month', tierId),
		priceIdFor(courseId, 'year', tierId),
	]).filter(Boolean)

	const { prices: paddlePrices, loading: pricesLoading } = usePaddlePrices(
		priceIds,
		country
	)

	/**
	 * The plan this visitor is already on, if any. An existing subscriber
	 * arriving from the dashboard upgrade banner must not be sold "Start 3 days
	 * free" on the plan they are already paying for.
	 */
	const [currentPriceId, setCurrentPriceId] = useState(null)

	useEffect(() => {
		let cancelled = false
		fetch('/api/billing/status', { credentials: 'include' })
			.then((response) => (response.ok ? response.json() : null))
			.then((status) => {
				if (cancelled || !status) return
				const program = (status.programs || []).find((entry) =>
					(entry.courseIds || []).includes(courseId)
				)
				setCurrentPriceId(program?.priceId || null)
			})
			.catch(() => {
				// Guests 401 here - the default "start free" copy is correct for them.
			})
		return () => {
			cancelled = true
		}
	}, [courseId])

	const isAnnual = billing === 'annual'
	// Show the saving for the tier actually selected - quoting Standard's $69
	// next to a selected Premium card understates the annual saving by $22.
	const toggleSaving = annualSaving(selectedTier)

	function displayPrice(tierId) {
		const interval = isAnnual ? 'year' : 'month'
		const priceId = priceIdFor(courseId, interval, tierId)
		if (priceId && paddlePrices[priceId]) return paddlePrices[priceId]
		const tier = BILLING_TIERS[tierId]
		return isAnnual ? tier.annualPrice : tier.monthlyPrice
	}

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
					{!pricesLoading && toggleSaving ? (
						<span className={styles.saveTag}>save {toggleSaving.display}</span>
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
					const price = displayPrice(tierId)
					const saving = annualSaving(tierId)
					const isSelected = selectedTier === tierId
					// A "Recommended" badge only means something next to an alternative.
					const showFlag = TIER_ORDER.length > 1 && tierId === 'premium'
					const cardPriceId = priceIdFor(courseId, isAnnual ? 'year' : 'month', tierId)
					const move = currentPriceId
						? comparePlans(currentPriceId, cardPriceId)
						: null
					const isCurrentPlan = Boolean(move?.same)
					const ctaLabel = !currentPriceId
						? `Start ${TRIAL} days free`
						: isCurrentPlan
							? 'Your current plan'
							: move?.upgrade
								? `Upgrade to ${tier.label}`
								: `Switch to ${tier.label}`
					const priceBusy = pricesLoading && !paddlePrices[priceIdFor(courseId, isAnnual ? 'year' : 'month', tierId)]

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
								{showFlag ? (
									<span className={styles.tierFlag}>Recommended</span>
								) : null}
							</div>
							<p className={styles.tierTagline}>{tier.tagline}</p>

							<p className={styles.priceRow}>
								<span className={styles.price}>{priceBusy ? '…' : price}</span>
								<span className={styles.per}>{isAnnual ? '/year' : '/month'}</span>
							</p>
							<p className={styles.priceNote}>
								{currentPriceId
									? isCurrentPlan
										? `You are on this plan · ${priceBusy ? '…' : price}${isAnnual ? '/year' : '/month'}`
										: move?.upgrade
											? `Switch today · you are only billed the difference for the rest of this period`
											: `Switch at your next renewal · nothing is charged today`
									: isAnnual && saving
										? `First ${TRIAL} days free ($0 today), then ${priceBusy ? '…' : price}/year (save ${saving.display})`
										: `First ${TRIAL} days free ($0 today), then ${priceBusy ? '…' : price}/month · cancel anytime`}
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

							{/* Opens Paddle overlay for signed-in visitors; guests go to register. */}
							<div
								className={styles.tierCtaWrap}
								onClick={(event) => event.stopPropagation()}
							>
								{isCurrentPlan ? (
									<p className={styles.currentPlanNote} role="status">
										{ctaLabel}
									</p>
								) : (
									<CheckoutButton
										courseId={courseId}
										plan={billing}
										tier={tierId}
										className={styles.tierCta}
										variant={isSelected ? 'primary' : 'ghost'}
									>
										{ctaLabel}
									</CheckoutButton>
								)}
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
