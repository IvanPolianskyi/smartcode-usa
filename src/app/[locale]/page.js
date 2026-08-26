import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Star } from 'lucide-react'
import ProgramPricingFlow from '@/components/Billing/ProgramPricingFlow'
import HeroDemo from '@/components/Visual/HeroDemo'
import SiteHeader from '@/components/Nav/SiteHeader'
import { LANDING_PROGRAMS } from '@/lib/landingPrograms'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'
import styles from './page.module.css'
import SiteFooter from '@/components/Nav/SiteFooter'

export const metadata = {
	title: 'SmartCode - build a game people actually play',
	description: `Learn Roblox, Python, or AI by building real projects. Write code, run it, get it checked instantly. ${LEGAL.monthlyPrice}/month, first ${LEGAL.trialDays} days free, cancel anytime.`,
}

const REVIEWS = [
	{
		name: 'Marcus',
		initials: 'MK',
		tone: 'coral',
		role: 'Dad · Austin, TX',
		context: 'after week 3',
		stars: 5,
		quote:
			'He used to only play other people’s games. Last Tuesday he yelled from his room that his obstacle course finally worked - and made me watch the whole run. Twice.',
		course: 'Roblox',
	},
	{
		name: 'Jordan',
		initials: 'JT',
		tone: 'cyan',
		role: '15 · learning on his own',
		context: 'Discord bot shipped',
		stars: 5,
		quote:
			'YouTube tutorials always lost me halfway. Here I hit Run and see what broke. Module 3 and I actually have a bot in our class server. Still messy. But it works.',
		course: 'Python',
	},
	{
		name: 'Sarah',
		initials: 'SL',
		tone: 'ink',
		role: 'Mom · Denver, CO',
		context: 'missed a live class',
		stars: 5,
		quote:
			'We tried the free days mostly to see if she’d stick with it. She did. When she skipped a live lesson she watched the recording the next morning - no guilt trip, just catch-up.',
		course: 'Live lessons',
	},
]

const STEPS = [
	{
		title: 'Pick your program',
		text: 'Roblox, Python, or AI for Real Life. One subscription covers one program - start with the one you actually want.',
		href: '#programs',
	},
	{
		title: 'Study programming',
		text: 'Learn by doing - write real code, hit Run, and get it checked instantly. No sitting through someone else’s build.',
	},
	{
		title: 'Publish it and get seen',
		text: 'Finish real projects. Publish them. We put the best student games in front of our Instagram audience for free.',
	},
]

const INCLUDED = [
	{
		title: 'Lessons that check your work',
		text: 'Write code, hit Run, and find out instantly if it works - no waiting for someone to grade it.',
	},
	{
		title: 'A Discord full of builders',
		text: 'A private community of students working on the same things. Get unstuck in minutes instead of giving up.',
	},
	{
		title: 'Free promotion for your project',
		text: 'Publish a game and we can feature it on our Instagram - the same account your friends already follow.',
	},
	{
		title: 'Live lessons with a teacher',
		text: `On Premium (${BILLING_TIERS.premium.monthlyPrice}/month) you get two live sessions a week. Miss one and the recording is waiting for you.`,
	},
]

const FAQ = [
	{
		q: "I've never written code. Can I still do this?",
		a: 'Yes - that is who these programs are built for. Every one starts from zero and assumes you have never written a line of code. If you already have, you just move faster.',
	},
	{
		q: `What happens after the ${LEGAL.trialDays} free days?`,
		a: `Your program continues at ${LEGAL.monthlyPrice}/month (or ${LEGAL.annualPrice}/year if you pick annual). Nothing is charged during the free days, and you can cancel before they end from your account page - it takes two clicks.`,
	},
	{
		q: "I'm not old enough to have a card. How do I pay?",
		a: 'A parent or guardian can pay with their card and you keep your own account and login. Full pricing, refunds, and billing details are in our Terms and Refund Policy.',
	},
	{
		q: 'Do I need to buy all three programs?',
		a: `No. Each program is its own subscription, so you only pay for the one you are actually doing. Standard is ${BILLING_TIERS.standard.monthlyPrice}/month (or ${BILLING_TIERS.standard.annualPrice}/year). Premium is ${BILLING_TIERS.premium.monthlyPrice}/month (or ${BILLING_TIERS.premium.annualPrice}/year) and adds two live lessons a week.`,
	},
	{
		q: 'What do I need to install?',
		a: 'For Python and AI for Real Life, nothing - everything runs in your browser. For Roblox you install Roblox Studio, which is free.',
	},
	{
		q: 'Will you really promote my game?',
		a: 'We feature student projects on our Instagram at no extra cost - it is included in every plan, not an upsell. Student game reels on that account have gone from tens of thousands of views to 2.9 million.',
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
			<div className={styles.gridBg} aria-hidden="true" />

			<div className={styles.firstFold}>
				<SiteHeader variant="home" />

				<div className={styles.firstScreen}>
					<section className={styles.hero}>
						<div className={styles.heroCopy}>
							<h1 className={`${styles.heroTitle} ${styles.heroIn}`}>
								Build a game people{' '}
								<span className={styles.hl}>actually play</span>
							</h1>
							<p
								className={`${styles.heroLede} ${styles.heroLedeMobile} ${styles.heroIn}`}
								style={{ '--heroInDelay': '90ms' }}
							>
								Learn to code, build games and real projects - and get them in
								front of people who actually play.
							</p>
							<p
								className={`${styles.heroLede} ${styles.heroLedeDesktop} ${styles.heroIn}`}
								style={{ '--heroInDelay': '90ms' }}
							>
								Learn programming by making things that matter - games, apps,
								real projects. When you ship something great, we put it in front of
								the world so players can find it.
							</p>
							<div className={styles.heroCtas}>
								<a
									href="#programs"
									className={`${styles.btnPrimary} ${styles.heroIn}`}
									style={{ '--heroInDelay': '170ms' }}
								>
									Start free for {LEGAL.trialDays} days
								</a>
								<a
									href="#how"
									className={`${styles.btnGhost} ${styles.heroIn}`}
									style={{ '--heroInDelay': '210ms' }}
								>
									See how it works
								</a>
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

			<section className={styles.section} id="how">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>How it works</h2>
					<p className={styles.sectionLede}>
						Three steps. You are writing code in the first lesson.
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
									<span className={styles.stepNum} aria-hidden="true">
										{index + 1}
									</span>
									<h3 className={styles.stepTitle}>{step.title}</h3>
									<p className={styles.stepText}>{step.text}</p>
								</a>
							) : (
								<>
									<span className={styles.stepNum} aria-hidden="true">
										{index + 1}
									</span>
									<h3 className={styles.stepTitle}>{step.title}</h3>
									<p className={styles.stepText}>{step.text}</p>
								</>
							)}
						</li>
					))}
				</ol>
			</section>

			<section className={styles.section} id="showcase">
				<div className={styles.showcase}>
					<div className={`${styles.showcaseCopy} sc-reveal`}>
						<p className={styles.showcaseEyebrow}>Included in every plan</p>
						<h2 className={styles.showcaseTitle}>
							We put <span className={styles.hl}>student games</span> on{' '}
							<span className={styles.hl}>Instagram</span>
						</h2>
						<p className={styles.showcaseLede}>
							Finish <span className={styles.hl}>your project</span> and we
							promote it to our audience for{' '}
							<span className={styles.hl}>free</span>. Real projects, real
							players - from tens of thousands of views to{' '}
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

			<section className={styles.section} id="included">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>What you get</h2>
					<p className={styles.sectionLede}>
						The first three come with every plan. Live lessons are the Premium
						upgrade.
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

			<section className={styles.section} id="reviews">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>What people actually say</h2>
					<p className={styles.sectionLede}>
						Parents and students - not polished marketing copy.
					</p>
				</div>
				<div className={styles.reviewsGrid}>
					{REVIEWS.map((review, index) => (
						<article
							key={review.name}
							className={`${styles.reviewCard} ${styles[`reviewTone_${review.tone}`] || ''} sc-reveal`}
							style={{ '--sc-reveal-delay': `${index * 90}ms`, '--review-i': index }}
						>
							<div className={styles.reviewTop}>
								<div className={styles.reviewStars} aria-label={`${review.stars} out of 5 stars`}>
									{Array.from({ length: review.stars }).map((_, i) => (
										<Star key={i} size={14} fill="currentColor" />
									))}
								</div>
								<span className={styles.reviewContext}>{review.context}</span>
							</div>
							<p className={styles.reviewQuote}>{review.quote}</p>
							<div className={styles.reviewAuthor}>
								<span
									className={`${styles.reviewAvatar} ${styles[`avatar_${review.tone}`] || ''}`}
									aria-hidden="true"
								>
									{review.initials}
								</span>
								<span className={styles.reviewMeta}>
									<span className={styles.reviewName}>{review.name}</span>
									<span className={styles.reviewRole}>
										{review.role} · {review.course}
									</span>
								</span>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className={styles.section} id="programs">
				<div className={`${styles.sectionHead} sc-reveal`}>
					<h2 className={styles.sectionTitle}>Pick your program</h2>
					<p className={styles.sectionLede}>
						Each one is its own subscription, so you only pay for what you are
						actually doing. Free for {LEGAL.trialDays} days, cancel anytime.
					</p>
				</div>

				<div className={styles.pricingWrap}>
					<Suspense fallback={<p className={styles.sectionLede}>Loading plans…</p>}>
						<ProgramPricingFlow programs={LANDING_PROGRAMS} />
					</Suspense>
				</div>

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
					Stop watching other people build things
				</h2>
				<p className={styles.closeLede}>
					Pick a program and write your first line of code today. Free for{' '}
					{LEGAL.trialDays} days, then {LEGAL.monthlyPrice}/month. Cancel anytime.
				</p>
				<a href="#programs" className={styles.btnPrimary}>
					Start free for {LEGAL.trialDays} days
				</a>
			</section>

			<SiteFooter />
		</div>
	)
}
