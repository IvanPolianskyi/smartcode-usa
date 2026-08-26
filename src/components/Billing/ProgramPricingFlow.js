'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { BILLING_PROGRAMS, BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import { startPath } from '@/lib/startCheckout'
import pageStyles from '@/app/[locale]/page.module.css'
import styles from './ProgramPricingFlow.module.css'

const TRIAL = LEGAL.trialDays

/**
 * Program cards navigate to /start for account + checkout.
 * Plan panel still offers Standard / Premium with CheckoutButton.
 */
export default function ProgramPricingFlow({ programs }) {
	const searchParams = useSearchParams()
	const panelRef = useRef(null)
	const courseFromUrl = searchParams.get('course')

	const [selectedId, setSelectedId] = useState(null)
	const [billing, setBilling] = useState('monthly')
	const [tierId, setTierId] = useState('standard')

	useEffect(() => {
		if (!courseFromUrl) return
		const match = programs.some((p) => p.courseId === courseFromUrl)
		if (match) setSelectedId(courseFromUrl)

		const plan = searchParams.get('plan')
		if (plan === 'annual' || plan === 'year') setBilling('annual')
		else if (plan === 'monthly' || plan === 'month') setBilling('monthly')

		const tier = searchParams.get('tier')
		if (tier === 'premium' || tier === 'standard') setTierId(tier)
	}, [courseFromUrl, programs, searchParams])

	useEffect(() => {
		if (!selectedId || !panelRef.current) return
		panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
	}, [selectedId])

	const selectedProgram = programs.find((p) => p.courseId === selectedId)
	const catalogProgram = BILLING_PROGRAMS.find((p) => p.courseId === selectedId)
	const tier = BILLING_TIERS[tierId] || BILLING_TIERS.standard
	const isAnnual = billing === 'annual'
	const price = isAnnual ? tier.annualPrice : tier.monthlyPrice

	return (
		<div className={styles.flow}>
			<div className={pageStyles.programGrid}>
				{programs.map((program) => {
					const active = selectedId === program.courseId
					const href = startPath({
						courseId: program.courseId,
						plan: 'monthly',
						tier: 'standard',
					})

					return (
						<article
							key={program.courseId}
							className={pageStyles.programCard}
							data-tone={program.tone}
							data-selected={active ? 'true' : undefined}
						>
							<p className={pageStyles.programKind}>{program.kind}</p>
							<h3 className={pageStyles.programTitle}>{program.title}</h3>
							<p className={pageStyles.programText}>{program.text}</p>
							<ul className={pageStyles.topicList}>
								{program.topics.map((topic) => (
									<li key={topic}>{topic}</li>
								))}
							</ul>
							<div className={pageStyles.programCta}>
								<Link href={href} className={pageStyles.btnPrimary}>
									Start free · {TRIAL} days
								</Link>
							</div>
							<button
								type="button"
								className={styles.planLink}
								onClick={() => {
									setSelectedId(program.courseId)
									setBilling('monthly')
									setTierId('standard')
								}}
							>
								Standard or Premium?
							</button>
						</article>
					)
				})}
			</div>

			{selectedProgram && catalogProgram ? (
				<div
					ref={panelRef}
					className={styles.panel}
					id={`plan-${selectedId}`}
					aria-live="polite"
				>
					<div className={styles.panelHead}>
						<div>
							<p className={styles.panelEyebrow}>Choose your plan</p>
							<h3 className={styles.panelTitle}>{selectedProgram.title}</h3>
							<p className={styles.panelBlurb}>{catalogProgram.blurb}</p>
						</div>
						<button
							type="button"
							className={styles.changeBtn}
							onClick={() => setSelectedId(null)}
						>
							Close
						</button>
					</div>

					<div className={styles.tierToggle} role="group" aria-label="Plan tier">
						<button
							type="button"
							className={styles.tierBtn}
							data-active={tierId === 'standard' ? 'true' : undefined}
							onClick={() => setTierId('standard')}
						>
							Standard
						</button>
						<button
							type="button"
							className={styles.tierBtn}
							data-active={tierId === 'premium' ? 'true' : undefined}
							onClick={() => setTierId('premium')}
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
						onClick={() => setBilling(isAnnual ? 'monthly' : 'annual')}
					>
						{isAnnual
							? `or ${tier.monthlyPrice}/month`
							: `or ${tier.annualPrice}/year · save more`}
					</button>

					<p className={styles.includesLabel}>{tier.includes}</p>
					<p className={styles.includesDetail}>{tier.includesDetail}</p>

					<div className={styles.ctaWrap}>
						<Link
							href={startPath({
								courseId: selectedId,
								plan: billing,
								tier: tierId,
							})}
							className={`sc-btn sc-btn-primary ${styles.cta}`}
						>
							Start free · {TRIAL} days
						</Link>
					</div>

					<p className={styles.fine}>
						Free for {TRIAL} days, then {price}
						{isAnnual ? '/year' : '/month'}. Cancel anytime.
					</p>
				</div>
			) : null}

			<p className={styles.legal}>
				Each program is its own subscription. Standard is platform + Discord;
				Premium adds 2 live lessons a week. Payments by Paddle, our Merchant of
				Record. {LEGAL.refundDays}-day money-back on your first charge. By starting
				a trial you agree to our <Link href="/terms">Terms</Link> and{' '}
				<Link href="/refund">Refund Policy</Link>.
			</p>
		</div>
	)
}
