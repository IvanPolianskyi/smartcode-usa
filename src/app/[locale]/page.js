import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import ProgramPricingFlow from '@/components/Billing/ProgramPricingFlow'
import HeroDemo from '@/components/Visual/HeroDemo'
import SiteHeader from '@/components/Nav/SiteHeader'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import JsonLd from '@/components/Seo/JsonLd'
import { faqSchema, organizationSchema } from '@/lib/structuredData'
import styles from './page.module.css'
import SiteFooter from '@/components/Nav/SiteFooter'

const HOME_DESCRIPTION = `Build Roblox games with AI: an AI helper in every lesson, weekly live AI builds, and the Roblox Studio skills to turn AI code into a real game. Start free, then ${LEGAL.monthlyPrice}/month. Cancel anytime.`

export const metadata = {
	title: 'SmartCode - build Roblox games with AI',
	description: HOME_DESCRIPTION,
	alternates: { canonical: '/' },
	openGraph: {
		title: 'SmartCode - build Roblox games people actually play',
		description: HOME_DESCRIPTION,
		url: '/',
	},
	twitter: {
		// Page-level `twitter` replaces the layout's object outright, so the card
		// type has to be restated - without it the share card silently drops to
		// the small `summary` layout.
		card: 'summary_large_image',
		title: 'SmartCode - build Roblox games people actually play',
		description: HOME_DESCRIPTION,
	},
}

const STEPS = [
	{
		title: 'Start building free',
		text: 'Make a free account - no card - and build in Roblox Studio from the first lesson, with an AI helper that explains your code when you get stuck.',
		href: '/free',
	},
	{
		title: 'Build with us live',
		text: 'Every week we build a Roblox game live in Discord, using AI the way real developers do - and fixing the parts AI gets wrong.',
		href: '/live',
	},
	{
		title: 'Join the club and ship',
		text: 'All 92 lessons, club-only Discord channels, and a path to a published game. The best member games get featured on our Instagram.',
		href: '/club',
	},
]

const INCLUDED = [
	{
		title: 'An AI helper in every lesson',
		text: 'Paste your script or the error from Output and the AI helper explains what is wrong and how to fix it - right inside the lesson.',
	},
	{
		title: 'Weekly live builds with AI',
		text: 'Watch a game get built with AI tools in real time, ask questions, and learn the scripting that makes AI code actually work.',
	},
	{
		title: 'Club-only Discord channels',
		text: 'Members-only channels with other builders. Get unstuck in minutes instead of giving up.',
	},
	{
		title: 'All 92 Roblox lessons',
		text: `From your first part to a published game - ${BILLING_TIERS.standard.monthlyPrice}/month or ${BILLING_TIERS.standard.annualPrice}/year, and you can cancel in two clicks.`,
	},
]

const FAQ = [
	{
		q: "I've never written code. Can I still do this?",
		a: 'Yes. The course starts from zero and assumes you have never written a line of code. If you already have, you just move faster.',
	},
	{
		q: `What happens after the ${LEGAL.trialDays} free days?`,
		a: `Your club membership continues at ${LEGAL.monthlyPrice}/month (or ${LEGAL.annualPrice}/year if you pick annual). Nothing is charged during the free days, and you can cancel before they end from your account page - it takes two clicks.`,
	},
	{
		q: "I'm not old enough to have a card. How do I pay?",
		a: 'A parent or guardian can pay with their card and you keep your own account and login. Full pricing, refunds, and billing details are in our Terms and Refund Policy.',
	},
	{
		q: 'Does AI build the game for me?',
		a: 'No - it builds it with you. The AI helper in every lesson explains your code and errors, and in our live builds we use AI tools the way developers do. The lessons teach you the Roblox Studio and Luau skills to understand AI code, fix it, and make the game your own.',
	},
	{
		q: 'Are the live builds free?',
		a: 'Yes. Anyone can join the weekly live build in our Discord - register on the live page and we email you the time and link. Club members also get members-only channels.',
	},
	{
		q: 'What do I need to install?',
		a: 'Roblox Studio, which is free, on a Windows or Mac computer. Everything else happens in your browser and in Discord.',
	},
	{
		q: 'Will you really promote my game?',
		a: 'We pick the best member games and feature them on our Instagram at no extra cost. We cannot promise that every game gets featured or how many players it gets. Student game reels on that account have gone from tens of thousands of views to 2.9 million.',
	},
	{
		q: 'How do I cancel?',
		a: `From your account page, anytime. You keep access through the period you already paid for, and there is a ${LEGAL.refundDays}-day money-back guarantee on your first charge.`,
	},
]

export default async function Home({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className={styles.page} data-theme="light" id="top">
			<JsonLd data={organizationSchema()} />
			<JsonLd data={faqSchema(FAQ)} />
			<div className={styles.gridBg} aria-hidden="true" />

			<div className={styles.firstFold}>
				<SiteHeader variant="home" />

				<div className={styles.firstScreen}>
					<section className={styles.hero}>
						<div className={styles.heroCopy}>
							<h1 className={`${styles.heroTitle} ${styles.heroIn}`}>
								Build Roblox games{' '}
								<span className={styles.hl}>with AI</span>
							</h1>
							<p
								className={`${styles.heroLede} ${styles.heroLedeMobile} ${styles.heroIn}`}
								style={{ '--heroInDelay': '90ms' }}
							>
								An AI helper in every lesson, live AI builds every week, and the
								skills to turn AI code into a real game.
							</p>
							<p
								className={`${styles.heroLede} ${styles.heroLedeDesktop} ${styles.heroIn}`}
								style={{ '--heroInDelay': '90ms' }}
							>
								AI can write a Roblox script in seconds. Turning it into a game
								people play is the skill. Learn Roblox Studio and Luau with an AI
								helper in every lesson, build with us at weekly live AI sessions,
								and ship your first game.
							</p>
							<div className={styles.heroCtas}>
								<Link
									href="/free"
									className={`${styles.btnPrimary} ${styles.heroIn}`}
									style={{ '--heroInDelay': '170ms' }}
								>
									Start building free
								</Link>
								<Link
									href="/live"
									className={`${styles.btnGhost} ${styles.heroIn}`}
									style={{ '--heroInDelay': '210ms' }}
								>
									Join the free live build
								</Link>
							</div>
						</div>
						<div
							className={`${styles.heroVisual} ${styles.heroIn}`}
							style={{ '--heroInDelay': '120ms' }}
						>
							<HeroDemo />
						</div>
					</section>
				</div>
			</div>

			<section className={styles.section} id="programs">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>Join the club</h2>
					<p className={styles.sectionLede}>
						One membership for everything: the full Roblox course, live builds,
						and club-only Discord. Free for {LEGAL.trialDays} days, cancel anytime.
					</p>
				</div>

				<div className={styles.pricingWrap}>
					<Suspense fallback={<p className={styles.sectionLede}>Loading plans…</p>}>
						<ProgramPricingFlow programs={LANDING_PROGRAMS} />
					</Suspense>
				</div>
			</section>

			<section className={styles.section} id="showcase">
				<div className={styles.showcase}>
					<div className={`${styles.showcaseCopy} sc-reveal`}>
						<p className={styles.showcaseEyebrow}>Included in the club</p>
						<h2 className={styles.showcaseTitle}>
							We put <span className={styles.hl}>student games</span> on{' '}
							<span className={styles.hl}>Instagram</span>
						</h2>
						<p className={styles.showcaseLede}>
							Finish <span className={styles.hl}>your game</span> and the best
							ones get featured to our audience for{' '}
							<span className={styles.hl}>free</span>. Student game reels have
							reached from tens of thousands of views to{' '}
							<span className={styles.hl}>millions</span>.
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
					<figure
						className={`${styles.showcaseFrame} sc-reveal`}
						style={{ '--sc-reveal-delay': '120ms' }}
					>
						<Image
							src="/images/student-games-instagram.png"
							alt="Instagram reels of student Roblox games with view counts from 17K to 2.9 million"
							width={873}
							height={1024}
							className={styles.showcaseImage}
							sizes="(max-width: 900px) min(100vw - 40px, 560px), 55vw"
						/>
					</figure>
				</div>
			</section>

			<section className={styles.section} id="how">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>How it works</h2>
					<p className={styles.sectionLede}>
						Start free, build with us live, then join the club when you are ready.
					</p>
				</div>
				<ol className={styles.stepGrid}>
					{STEPS.map((step, index) => (
						<li
							key={step.title}
							className={`${styles.stepCard} sc-reveal${step.href ? ` ${styles.stepCardLink}` : ''}`}
							style={{ '--sc-reveal-delay': `${index * 90}ms` }}
						>
							{step.href ? (
								<a href={step.href} className={styles.stepCardHit}>
									<div className={styles.stepHead}>
										<span className={styles.stepNum} aria-hidden="true">
											{index + 1}
										</span>
									</div>
									<h3 className={styles.stepTitle}>{step.title}</h3>
									<p className={styles.stepText}>{step.text}</p>
								</a>
							) : (
								<>
									<div className={styles.stepHead}>
										<span className={styles.stepNum} aria-hidden="true">
											{index + 1}
										</span>
									</div>
									<h3 className={styles.stepTitle}>{step.title}</h3>
									<p className={styles.stepText}>{step.text}</p>
								</>
							)}
						</li>
					))}
				</ol>
			</section>

			<section className={styles.section} id="included">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>What you get</h2>
					<p className={styles.sectionLede}>
						All of it comes with one club membership - there is no upsell tier.
					</p>
				</div>
				<div className={styles.includedGrid}>
					{INCLUDED.map((item, index) => (
						<article
							key={item.title}
							className={`${styles.includedCard} sc-reveal`}
							style={{ '--sc-reveal-delay': `${index * 90}ms` }}
						>
							<span className={styles.includedIndex} aria-hidden="true">
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3 className={styles.includedTitle}>{item.title}</h3>
							<p className={styles.includedText}>{item.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.section} id="faq">
				<div className={`${styles.faqHead} sc-reveal`}>
					<h2 className={styles.faqTitle}>Popular questions</h2>
				</div>

				<div className={styles.faq}>
					{FAQ.map((item, index) => (
						<details
							key={item.q}
							className={`${styles.faqItem} sc-reveal`}
							style={{ '--sc-reveal-delay': `${index * 60}ms` }}
						>
							<summary className={styles.faqQ}>{item.q}</summary>
							<p className={styles.faqA}>{item.a}</p>
						</details>
					))}
				</div>
			</section>

			<section className={`${styles.close} sc-reveal`}>
				<h2 className={styles.closeTitle}>
					Stop watching other people build games
				</h2>
				<p className={styles.closeLede}>
					Start building in Roblox Studio today - free, no card. Join the club when
					you want the full course: {LEGAL.monthlyPrice}/month, cancel anytime.
				</p>
				<Link href="/free" className={styles.btnPrimary}>
					Start building free
				</Link>
			</section>

			<SiteFooter />
		</div>
	)
}
