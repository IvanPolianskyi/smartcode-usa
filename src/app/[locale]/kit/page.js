import { setRequestLocale } from 'next-intl/server'
import SiteHeader from '@/components/Nav/SiteHeader'
import SiteFooter from '@/components/Nav/SiteFooter'
import KitBuyButton from '@/components/Funnel/KitBuyButton'
import InAppBrowserNotice from '@/components/Funnel/InAppBrowserNotice'
import PromoCapture from '@/components/Funnel/PromoCapture'
import StickyBuyBar from '@/components/Funnel/StickyBuyBar'
import Image from 'next/image'
import { KITS } from '@/lib/kits'
import { LEGAL } from '@/lib/legalConfig'
import styles from '../page.module.css'
import f from '../funnel.module.css'

const KIT = KITS['roblox-ai-games']
const DESCRIPTION = `Build a Roblox game with AI. The setup and copy-paste prompts behind our AI vs student reels. ${KIT.displayPrice} one-time, instant access, ${LEGAL.refundDays}-day money-back guarantee.`

export const metadata = {
	title: 'Roblox AI Game Kit - build a Roblox game with AI',
	description: DESCRIPTION,
	alternates: { canonical: '/kit' },
	openGraph: { title: 'Roblox AI Game Kit', description: DESCRIPTION, url: '/kit' },
	twitter: { card: 'summary_large_image', title: 'Roblox AI Game Kit', description: DESCRIPTION },
}

const STATS = [
	{ big: '57M', small: 'views on our Roblox reels in 90 days' },
	{ big: '68', small: 'copy-paste prompts' },
	{ big: '5', small: 'game types' },
]

const STACK = [
	{
		title: 'The setup guide',
		text: 'Connect AI to Roblox Studio step by step: the free Roblox Assistant built into Studio, plus Claude or ChatGPT if you have them. About 10 minutes.',
	},
	{
		title: '60+ copy-paste prompts',
		text: 'Prompts for 5 game types, each from first map to working game loop: obby, tycoon, simulator, tower defense and a story game.',
	},
	{
		title: 'Bug-fix and polish prompts',
		text: 'What to paste when the script breaks, when the Output window turns red, and when the game works but feels boring.',
	},
	{
		title: 'Publish checklist + the reel playbook',
		text: 'Publish your game on Roblox, then film it the way we film ours - the format behind 57M views on our page.',
	},
	{
		title: 'AI helper - 50 questions a day',
		text: 'Paste your script or an error on our site and the AI helper explains what is wrong and how to fix it.',
	},
	{
		title: 'Private Telegram',
		text: 'New prompts, weekly live builds and help when you are stuck. Updates to the kit are included free.',
	},
]

const STEPS = [
	{ title: 'Set it up once', text: 'Open Roblox Studio, switch on the AI assistant, follow the guide. About 10 minutes.' },
	{ title: 'Paste a prompt', text: 'Pick a game type and paste the first prompt. Example: “Make an obby with 10 stages that get harder, with checkpoints.”' },
	{ title: 'Play, fix, publish', text: 'Test it, use the fix prompts when something breaks, then publish to Roblox and share it.' },
]

const FAQ = [
	{ q: 'How much is it, exactly?', a: `${KIT.displayPrice} once, in USD. No subscription. Checkout is handled by Paddle, our Merchant of Record, which adds sales tax or VAT where it applies.` },
	{ q: 'Do I need to know how to code?', a: 'No. The prompts are written for beginners, and the AI helper explains anything you do not understand. You will pick up real Luau along the way.' },
	{ q: 'Can I do this on my phone?', a: 'No. Roblox Studio runs on Windows and Mac. You can buy and read the kit on your phone, then build on your computer.' },
	{ q: 'Do I need to pay for an AI tool?', a: 'No. The Roblox Assistant inside Roblox Studio is free. If you already pay for Claude or ChatGPT, the guide shows how to use them too. They are not included.' },
	{ q: 'How do I get it after paying?', a: 'We email you a link straight away - tap it and the kit opens, no password needed. You can also join our Telegram from the thank-you page.' },
	{ q: 'Will my game get popular?', a: 'Results are not guaranteed. Players and views depend on your game, how you share it, and the platforms.' },
	{ q: "I'm under 18.", a: 'Ask a parent or guardian to buy it with their card - the kit is yours to use.' },
	{ q: 'Can I get a refund?', a: `Yes. If the kit is not for you, email us within ${LEGAL.refundDays} days of buying for a full refund.` },
]

/**
 * Link in bio / Direct bot destination: smartcode.academy/kit?src=ig
 */
export default async function KitPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	const buyBlock = (id) => (
		<div style={{ display: 'grid', gap: 10 }} id={id}>
			<InAppBrowserNotice />
			<KitBuyButton kitId={KIT.id}>Get the kit - {KIT.displayPrice}</KitBuyButton>
			<p className={f.fine}>
				{KIT.displayPrice} one-time · instant access · {LEGAL.refundDays}-day money-back guarantee ·
				secure checkout by Paddle
			</p>
		</div>
	)

	return (
		<div className={styles.page} data-theme="light">
			<div className={styles.gridBg} aria-hidden="true" />
			<SiteHeader variant="sales" />
			<PromoCapture />
			<StickyBuyBar kitId={KIT.id} title={KIT.title} price={KIT.displayPrice} watchId="hero-buy" />

			<main className={f.wrap}>
				<div style={{ display: 'grid', gap: 16 }}>
					<p className={f.eyebrow}>Roblox AI Game Kit</p>
					<h1 className={f.title}>Build a Roblox game with AI - from one prompt</h1>
					<p className={f.lede}>
						The setup and the prompts behind our “AI vs student” reels. Turn an idea
						into a playable Roblox game in Roblox Studio, even if you have never
						written code.
					</p>
					<div className={f.statRow}>
						{STATS.map((s) => (
							<div key={s.big} className={f.stat}>
								<strong>{s.big}</strong>
								<span>{s.small}</span>
							</div>
						))}
					</div>
					{buyBlock('hero-buy')}
					<p className={f.fine}>
						Needs a Windows or Mac computer with Roblox Studio (free). Buy on your phone,
						build on your computer.
					</p>
				</div>

				<section className={f.proof} aria-label="Proof">
					<figure>
						<Image
							src="/images/student-games-instagram.png"
							alt="Our Instagram reels of Roblox games, with view counts up to millions"
							width={873}
							height={1024}
							sizes="(max-width: 700px) 45vw, 360px"
						/>
						<figcaption>Our Roblox reels on Instagram</figcaption>
					</figure>
					<figure>
						<Image
							src="/kits/kit-prompts.png"
							alt="A page of the kit with numbered copy-paste prompts for Roblox Studio"
							width={910}
							height={1287}
							sizes="(max-width: 700px) 45vw, 360px"
						/>
						<figcaption>Inside the kit: 13 pages, 68 prompts</figcaption>
					</figure>
				</section>

				<section style={{ display: 'grid', gap: 14 }} aria-labelledby="kit-stack">
					<h2 id="kit-stack" className={f.cardTitle}>
						What you get
					</h2>
					<div className={f.included}>
						{STACK.map((item) => (
							<div key={item.title} className={f.includedItem}>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</div>
						))}
					</div>
				</section>

				<section style={{ display: 'grid', gap: 14 }} aria-labelledby="kit-how">
					<h2 id="kit-how" className={f.cardTitle}>
						How it works
					</h2>
					<ol className={f.list}>
						{STEPS.map((s) => (
							<li key={s.title}>
								<strong>{s.title}.</strong> {s.text}
							</li>
						))}
					</ol>
				</section>

				<section className={f.card} aria-labelledby="kit-need">
					<h2 id="kit-need" className={f.cardTitle}>
						What you need
					</h2>
					<ul className={f.list}>
						<li>A Windows or Mac computer</li>
						<li>Roblox Studio - free from roblox.com</li>
						<li>Nothing else. The AI assistant in Roblox Studio is free.</li>
					</ul>
				</section>

				<section style={{ display: 'grid', gap: 14 }} aria-labelledby="kit-faq">
					<h2 id="kit-faq" className={f.cardTitle}>
						Questions
					</h2>
					<div className={f.faq}>
						{FAQ.map((item) => (
							<details key={item.q}>
								<summary>{item.q}</summary>
								<p>{item.a}</p>
							</details>
						))}
					</div>
				</section>

				<section className={f.card} aria-labelledby="kit-close">
					<h2 id="kit-close" className={f.cardTitle}>
						Start building today
					</h2>
					{buyBlock('close-buy')}
				</section>

				<p className={f.fine}>
					Results are not guaranteed. View counts are from our own Instagram. SmartCode is
					not affiliated with Roblox, Anthropic or OpenAI.
				</p>
			</main>

			<SiteFooter />
		</div>
	)
}
