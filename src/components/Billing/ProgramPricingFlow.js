import { Link } from '@/i18n/navigation'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import { planPath } from '@/lib/startCheckout'
import pageStyles from '@/app/[locale]/page.module.css'
import styles from './ProgramPricingFlow.module.css'

const TRIAL = LEGAL.trialDays

/**
 * Step 1 of the purchase: pick a program.
 *
 * Choosing one navigates to its own plan page rather than expanding a panel
 * in place - a card that grows a second decision underneath it reads as a
 * dead end on a phone, where the new controls open below the fold.
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
						{program.outcome ? (
							<p className={styles.outcome}>{program.outcome}</p>
						) : null}
						<p className={styles.cardPrice}>
							<span className={styles.cardPriceValue}>$0</span>
							<span className={styles.cardPriceWas}>
								{BILLING_TIERS.standard.monthlyPrice}
							</span>
							<span className={styles.cardPricePer}>
								today · then {BILLING_TIERS.standard.monthlyPrice}/month after{' '}
								{TRIAL} days
							</span>
						</p>
						<div className={pageStyles.programCta}>
							<Link
								href={planPath(program.courseId)}
								className={styles.chooseBtn}
							>
								Choose {program.title}
							</Link>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}
