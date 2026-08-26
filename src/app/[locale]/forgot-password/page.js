'use client'

import Link from 'next/link'
import Image from 'next/image'
import StickyNav from '@/components/Nav/StickyNav'
import styles from '../login/Auth.module.css'

const SUPPORT_EMAIL =
	process.env.NEXT_PUBLIC_MERCHANT_EMAIL ||
	process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
	'support@smartcode.academy'

export default function ForgotPasswordPage() {
	return (
		<div className={styles.page} data-theme="light">
			<StickyNav
				className={styles.nav}
				innerClassName={styles.navInner}
				brand={
					<Link href="/" className={styles.wordmark} aria-label="SmartCode home">
						<Image
							src="/logo.jpeg"
							alt=""
							width={30}
							height={30}
							className={styles.mark}
							priority
						/>
						SmartCode
					</Link>
				}
			>
				<div className={styles.navLinks}>
					<Link href="/login" className={styles.navLink}>
						Log in
					</Link>
					<Link href="/register" className="sc-btn sc-btn-primary">
						Create account
					</Link>
				</div>
			</StickyNav>

			<main className={styles.main}>
				<div className={styles.panel}>
					<p className={styles.label}>Account</p>
					<h1 className={styles.title}>Forgot password?</h1>
					<p className={styles.lede}>
						We don&apos;t offer self-serve password reset yet. Email us and
						we&apos;ll help you get back in.
					</p>

					<ul className={styles.helpList}>
						<li>
							Write to{' '}
							<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the
							address on your account.
						</li>
						<li>Tell us you need a password reset or a fresh sign-in link.</li>
						<li>We&apos;ll reply with next steps, usually within one business day.</li>
					</ul>

					<div className={styles.footer}>
						<p>
							<Link href="/login">Back to log in</Link>
						</p>
						<p>
							<Link href="/">Home</Link>
						</p>
					</div>
				</div>
			</main>
		</div>
	)
}
