import { Link } from '@/i18n/navigation'
import { LEGAL } from '@/lib/legalConfig'
import SiteHeader from '@/components/Nav/SiteHeader'
import styles from './LegalDoc.module.css'

const DOCS = [
	{ href: '/terms', label: 'Terms' },
	{ href: '/privacy', label: 'Privacy' },
	{ href: '/refund', label: 'Refunds' },
]

/**
 * Shared shell for Terms / Privacy / Refund.
 *
 * Payment-provider reviewers read these top to bottom, so the priorities are a
 * readable measure, numbered sections they can cite back at us, and a visible
 * last-updated date. Forced light theme matches the marketing site.
 */
export function LegalDoc({
	title,
	summary,
	lede,
	lastUpdated,
	updated,
	active,
	children,
}) {
	const intro = summary || lede
	const dated = lastUpdated || updated || LEGAL.lastUpdated

	return (
		<div className={styles.page} data-theme="light">
			<SiteHeader />

			<main className={styles.main}>
				<article className={styles.doc}>
					<header className={styles.header}>
						<p className={styles.kicker}>Legal</p>
						<nav className={styles.docSwitch} aria-label="Legal documents">
							{DOCS.map((doc) => (
								<Link
									key={doc.href}
									href={doc.href}
									className={styles.docSwitchLink}
									aria-current={active === doc.href ? 'page' : undefined}
								>
									{doc.label}
								</Link>
							))}
						</nav>
						<h1 className={styles.title}>{title}</h1>
						{intro ? <p className={styles.summary}>{intro}</p> : null}
						<p className={styles.updated}>Last updated: {dated}</p>
					</header>
					{children}
				</article>
			</main>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerBrand}>SmartCode</span>
					<div className={styles.footerLinks}>
						<Link href="/">Home</Link>
						<Link href="/pricing">Pricing</Link>
						<Link href="/contact">Contact</Link>
						{DOCS.map((doc) => (
							<Link key={doc.href} href={doc.href}>
								{doc.label}
							</Link>
						))}
					</div>
					<p className={styles.footerNote}>
						{LEGAL.legalName}, {LEGAL.legalForm} ·{' '}
						<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
						{LEGAL.supportPhone ? (
							<>
								{' '}
								·{' '}
								<a href={`tel:${LEGAL.supportPhone.replace(/\s/g, '')}`}>
									{LEGAL.supportPhone}
								</a>
							</>
						) : null}
					</p>
					<p className={styles.footerNote}>
						Payments by Paddle, our Merchant of Record.
					</p>
				</div>
			</footer>
		</div>
	)
}

/** One numbered section. `n` is passed explicitly so the numbering is data, not CSS luck. */
export function LegalSection({ n, title, children }) {
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>
				<span className={styles.sectionNumber} aria-hidden="true">
					{n}
				</span>
				{title}
			</h2>
			<div className={styles.body}>{children}</div>
		</section>
	)
}

/** Pulls a key commitment out of the prose so it is not missed in a skim. */
export function LegalCallout({ children }) {
	return <aside className={styles.callout}>{children}</aside>
}

export default LegalDoc
