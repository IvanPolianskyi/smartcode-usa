import { Suspense } from 'react'
import { Link } from '@/i18n/navigation'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import ProgramPricingFlow from '@/components/Billing/ProgramPricingFlow'
import HeroDemo from '@/components/Visual/HeroDemo'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { LEGAL } from '@/lib/legalConfig'
import styles from './page.module.css'

export const metadata = {
	title: 'SmartCode - learn by building',
	description:
		'Interactive programs for Roblox, Python, and AI at Work. Write code, run it, get it checked - each program its own subscription.',
}

const INCLUDED = [
	{
		title: 'Online learning platform',
		text: 'Interactive lessons you can take at your own pace - write code, run it, and get it checked instantly.',
	},
	{
		title: 'Private Discord community',
		text: 'A closed developer community where students help each other, share builds, and get unstuck together.',
	},
	{
		title: '2 live lessons a week',
		text: 'Add Premium to get two live sessions with a teacher every week - miss one, watch the recording anytime.',
	},
]

const FAQ = [
	{
		q: 'Do I need experience?',
		a: 'No. Every program assumes you have never written a line of code. If you have, you move faster.',
	},
	{
		q: 'Separate subscriptions?',
		a: 'Yes. Roblox, Python, and AI at Work are separate. Standard is $14/month (or $99/year). Premium is $20/month (or $149/year) and adds live lessons.',
	},
	{
		q: 'What is included?',
		a: 'Standard includes the platform, Discord, and free Instagram promotion for student games. Premium adds 2 live lessons a week with a teacher.',
	},
	{
		q: 'What do I install?',
		a: 'Python runs in the browser. For Roblox you install free Roblox Studio.',
	},
	{
		q: 'Can I cancel?',
		a: `Anytime from your account. Access lasts through the period you paid for, with a ${LEGAL.refundDays}-day money-back on the first charge.`,
	},
]

export default async function Home({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light" id="top">
			<div className={styles.gridBg} aria-hidden="true" />

			<div className={styles.firstScreen}>
				<header className={styles.topBar}>
					<nav className={styles.pillNav} aria-label="Primary">
						<a href="#top" className={styles.navBrand} aria-label="Back to top">
							<Image
								src="/logo.jpeg"
								alt=""
								width={32}
								height={32}
								className={styles.navMark}
								priority
							/>
							SmartCode
						</a>
						<div className={styles.navRight}>
							<Link href="/pricing" className={styles.navQuiet}>
								Pricing
							</Link>
							<Link href="/login" className={styles.navQuiet}>
								Log in
							</Link>
							<a href="#programs" className={styles.navCta}>
								Start learning
							</a>
						</div>
					</nav>
				</header>

				<section className={styles.hero}>
					<div className={styles.heroCopy}>
					<h1 className={styles.heroTitle}>
						Your interactive tutor for{' '}
						<span className={styles.hl}>programming</span>
					</h1>
						<p className={`${styles.heroLede} ${styles.heroLedeMobile}`}>
							Write code. Run it. Get it checked. Platform + Discord included.
						</p>
						<p className={`${styles.heroLede} ${styles.heroLedeDesktop}`}>
							Write code. Run it. Get it checked. You get full access to the online
							platform and a Discord community. Add Premium for 2 live lessons a
							week - miss one, watch the recording anytime.
						</p>
						<div className={styles.heroCtas}>
							<a href="#programs" className={styles.btnPrimary}>
								Start learning
							</a>
							<Link href="/pricing" className={styles.btnGhost}>
								See pricing
							</Link>
						</div>
					</div>
					<div className={styles.heroVisual}>
						<HeroDemo />
					</div>
				</section>
			</div>

			<section className={styles.section} id="included">
				<div className={styles.sectionHead}>
					<h2 className={styles.sectionTitle}>What you get</h2>
					<p className={styles.sectionLede}>
						Standard covers the platform and Discord. Premium adds live lessons.
					</p>
				</div>
				<div className={styles.includedGrid}>
					{INCLUDED.map((item, index) => (
						<article key={item.title} className={styles.includedCard}>
							<span className={styles.includedIndex} aria-hidden="true">
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3 className={styles.includedTitle}>{item.title}</h3>
							<p className={styles.includedText}>{item.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.section} id="showcase">
				<div className={styles.showcase}>
					<div className={styles.showcaseCopy}>
						<p className={styles.showcaseEyebrow}>Free promotion for students</p>
						<h2 className={styles.showcaseTitle}>
							We promote{' '}
							<span className={styles.hl}>student games</span> on{' '}
							<span className={styles.hl}>Instagram</span>
						</h2>
						<p className={styles.showcaseLede}>
							When students publish{' '}
							<span className={styles.hl}>Roblox</span> games, we give them{' '}
							<span className={styles.hl}>free advertising</span> on our
							Instagram. Real projects, real audiences - from tens of thousands
							to <span className={styles.hl}>millions of views</span>.
						</p>
						<p className={styles.showcaseStat}>
							<span className={styles.hl}>2.9M</span> views on a single student
							game reel
						</p>
						<a
							href="https://www.instagram.com/smartcode_academy_official/"
							className={styles.showcaseLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Your project could be next
						</a>
					</div>
					<figure className={styles.showcaseFrame}>
						<Image
							src="/images/student-games-instagram.png"
							alt="Instagram reels of student Roblox games with view counts from 17K to 2.9 million"
							width={873}
							height={1024}
							className={styles.showcaseImage}
							sizes="(max-width: 900px) min(100vw - 40px, 560px), 580px"
						/>
					</figure>
				</div>
			</section>

			<section className={styles.section} id="programs">
				<div className={styles.sectionHead}>
					<h2 className={styles.sectionTitle}>Pick a program. Master it.</h2>
					<p className={styles.sectionLede}>
						Choose a path, then pick Standard or Premium. Free for {LEGAL.trialDays}{' '}
						days - cancel anytime.
					</p>
				</div>

				<div className={styles.pricingWrap}>
					<Suspense fallback={<p className={styles.sectionLede}>Loading plans…</p>}>
						<ProgramPricingFlow programs={LANDING_PROGRAMS} />
					</Suspense>
				</div>

				<div className={styles.faq}>
					{FAQ.map((item) => (
						<details key={item.q} className={styles.faqItem}>
							<summary className={styles.faqQ}>{item.q}</summary>
							<p className={styles.faqA}>{item.a}</p>
						</details>
					))}
				</div>
			</section>

			<section className={styles.close}>
				<h2 className={styles.closeTitle}>
					The best way to learn code is already here
				</h2>
				<a href="#programs" className={styles.btnPrimary}>
					Start learning
				</a>
			</section>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerBrand}>SmartCode</span>
					<div className={styles.footerLinks}>
						<Link href="/terms">Terms</Link>
						<Link href="/privacy">Privacy</Link>
						<Link href="/refund">Refunds</Link>
					</div>
					<p className={styles.footerNote}>
						Payments by Paddle, our Merchant of Record.
					</p>
				</div>
			</footer>
		</div>
	)
}
