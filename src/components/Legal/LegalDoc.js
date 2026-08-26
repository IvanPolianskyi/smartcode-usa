import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { LEGAL } from '@/lib/legalConfig'
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
export function LegalDoc({ title, summary, lastUpdated, active, children }) {
	return (
		<div className={styles.page} data-theme="light">
			<header className={styles.topBar}>
				<nav className={styles.nav} aria-label="Primary">
					<Link href="/" className={styles.brand}>
						<Image
							src="/logo.jpeg"
							alt=""
							width={40}
							height={40}
							className={styles.mark}
							priority
						/>
						SmartCode
					</Link>
					<div className={styles.navLinks} aria-label="Legal documents">
						{DOCS.map((doc) => (
							<Link
								key={doc.href}
								href={doc.href}
								className={styles.navLink}
								aria-current={active === doc.href ? 'page' : undefined}
							>
								{doc.label}
							</Link>
						))}
					</div>
				</nav>
			</header>

			<main className={styles.main}>
				<article className={styles.doc}>
					<header className={styles.header}>
						<p className={styles.kicker}>Legal</p>
						<h1 className={styles.title}>{title}</h1>
						{summary ? <p className={styles.summary}>{summary}</p> : null}
						<p className={styles.updated}>
							Last updated: {lastUpdated || LEGAL.lastUpdated}
						</p>
					</header>
					{children}
				</article>
			</main>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerBrand}>SmartCode</span>
					<div className={styles.footerLinks}>
						{DOCS.map((doc) => (
							<Link key={doc.href} href={doc.href}>
								{doc.label}
							</Link>
						))}
					</div>
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
