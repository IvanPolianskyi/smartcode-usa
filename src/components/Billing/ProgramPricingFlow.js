import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import pageStyles from '@/app/[locale]/page.module.css'
import CheckoutButton from './CheckoutButton'
import styles from './ProgramPricingFlow.module.css'

const TRIAL = LEGAL.trialDays
const STANDARD = BILLING_TIERS.standard

/**
 * Pick a program and buy it in one click.
 *
 * With Premium off the market there is no second decision left to make, so the
 * card opens Paddle directly instead of routing through a tier picker - every
 * extra screen between the button and the card form costs conversions.
 */
export default function ProgramPricingFlow({ programs }) {
	return (
		<div className={styles.flow}>
			<div className={pageStyles.programGrid}>
				{programs.map((program) => (
					<article
						key={program.courseId}
						className={pageStyles.programCard}
						data-tone={program.tone}
					>
						<p className={pageStyles.programKind}>{program.kind}</p>
						<h3 className={pageStyles.programTitle}>{program.title}</h3>
						<p className={pageStyles.programText}>{program.text}</p>
						<ul className={pageStyles.topicList}>
							{program.topics.map((topic) => (
								<li key={topic}>{topic}</li>
							))}
						</ul>
						<div className={styles.bigPriceRow}>
							<span className={styles.bigPriceNow}>$0</span>
							<span className={styles.bigPriceWas}>{STANDARD.monthlyPrice}/mo</span>
						</div>
						<div className={pageStyles.programCta}>
							<CheckoutButton
								courseId={program.courseId}
								plan="monthly"
								tier="standard"
								className={styles.chooseBtn}
							>
								Try {program.title} for free
							</CheckoutButton>
							<p className={styles.cardFinePrint}>
								Then {STANDARD.monthlyPrice}/mo after {TRIAL} days · cancel anytime
							</p>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}
