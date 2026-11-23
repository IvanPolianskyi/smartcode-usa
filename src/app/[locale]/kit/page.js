import { setRequestLocale } from 'next-intl/server'
import KitBuyButton from '@/components/Funnel/KitBuyButton'
import KitClip from '@/components/Funnel/KitClip'
import KitShell from '@/components/Funnel/KitShell'
import InAppBrowserNotice from '@/components/Funnel/InAppBrowserNotice'
import PromoCapture from '@/components/Funnel/PromoCapture'
import { KITS } from '@/lib/kits'
import { LEGAL } from '@/lib/legalConfig'
import s from './kit.module.css'


const KIT = KITS['roblox-ai-games']
const DESCRIPTION = `Build Roblox games with AI. The setup and 68 copy-paste prompts behind our AI-built Roblox games (57M+ views). ${KIT.displayPrice} one-time, instant access, ${LEGAL.refundDays}-day money-back guarantee.`

export const metadata = {
	title: 'Build Roblox games with AI - Roblox AI Game Kit',
	description: DESCRIPTION,
	alternates: { canonical: '/kit' },
	openGraph: { title: 'Build Roblox games with AI', description: DESCRIPTION, url: '/kit' },
	twitter: { card: 'summary_large_image', title: 'Build Roblox games with AI', description: DESCRIPTION },
}

const STACK = [
	{ badge: 'Core', title: 'The 10-minute setup', text: 'Switch on the free AI inside Roblox Studio step by step. Already pay for Claude or ChatGPT? The guide shows how to use them too.' },
	{ badge: 'Core', title: '68 copy-paste prompts', text: 'Obby, tycoon, simulator, tower defense and a story game - each from empty map to working game, one prompt at a time.' },
	{ badge: 'Core', title: 'Fix-it and polish prompts', text: 'What to paste when the script breaks or the Output window turns red, and how to make a working game feel fun.' },
	{ badge: 'Bonus', title: 'The reel playbook', text: 'How we film our games for Instagram - the formats behind 57M+ views in 90 days, plus 20 hooks you can copy.' },
]

const FAQ = [
	{ q: 'How much do I pay, exactly?', a: `${KIT.displayPrice} once, in USD. No subscription. Paddle, our Merchant of Record, adds sales tax or VAT only where the law requires it.` },
	{ q: 'Can I do this on my phone?', a: 'No. Roblox Studio runs on Windows and Mac. You can buy and read the kit on your phone, then build on your computer.' },
	{ q: 'Do I need coding skills?', a: 'No. The prompts are written for beginners, and every prompt says where the script goes and how to test it. You will pick up real Luau along the way.' },
	{ q: 'Do I need a paid AI plan?', a: 'No. The AI assistant inside Roblox Studio is free. Claude or ChatGPT are optional and not included.' },
	{ q: 'How do I get access after paying?', a: 'We email you a link straight away - tap it and the kit opens, no password needed.' },
	{ q: 'Will my game go viral?', a: 'Results are not guaranteed. Players and views depend on your game, how you share it, and the platforms.' },
	{ q: "I'm under 18.", a: 'Ask a parent or guardian to buy it with their card - the kit is yours to use.' },
	{ q: 'Can I get a refund?', a: `Yes. Email us within ${LEGAL.refundDays} days of buying and we refund you in full.` },
]

function BuyBlock({ id }) {
	return (
		<div className={s.buy} id={id}>
			<InAppBrowserNotice />
			<KitBuyButton kitId={KIT.id} className={s.bigBtn}>
				Get instant access
			</KitBuyButton>
			<div className={s.price}>
				<strong>{KIT.displayPrice}</strong>
				<small>one-time · no subscription</small>
			</div>
			<p className={s.trust}>
				Secure checkout by Paddle · access by email in a minute · {LEGAL.refundDays}-day money-back
			</p>
		</div>
	)
}

/**
 * Sales page for the Roblox AI Game Kit. Link in bio / Direct bot:
 * smartcode.academy/kit?src=ig
 */
export default async function KitPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<KitShell
			action={
				<KitBuyButton kitId={KIT.id} className={s.headerBtn}>
					Get it for {KIT.displayPrice}
				</KitBuyButton>
			}
		>
			<PromoCapture />

			<main className={s.wrap}>
				<section className={s.hero}>
					<p className={s.eyebrow}>57M+ views on our Roblox reels</p>
					<h1 className={s.h1}>
						Build <em>Roblox games</em> with AI.
					</h1>

					<div className={s.clips}>
						<KitClip src="/kits/clips/vortex.mp4" poster="/kits/clips/vortex.jpg" label="From our reels" className={s.clip} tagClassName={s.clipTag} />
						<KitClip src="/kits/clips/blocks.mp4" poster="/kits/clips/blocks.jpg" label="From our reels" className={s.clip} tagClassName={s.clipTag} />
					</div>

					<div className={s.stats}>
						<div>
							<strong>
								57M<em>+</em>
							</strong>
							<span>views in 90 days</span>
						</div>
						<div>
							<strong>68</strong>
							<span>copy-paste prompts</span>
						</div>
						<div>
							<strong>
								1 <em>prompt</em>
							</strong>
							<span>to start a new game</span>
						</div>
					</div>

					<p className={s.lede}>
						The step-by-step setup and 68 prompts behind my AI-built Roblox games. You type
						an idea, AI writes the scripts, builds the map and makes it playable in Roblox
						Studio - then you test it and publish a ready-to-play game.
					</p>

					<BuyBlock id="hero-buy" />

					<ul className={s.goodToKnow}>
						<li>No coding skills needed</li>
						<li>The AI in Roblox Studio is free - no paid AI plan required</li>
						<li>Lifetime access, free updates</li>
					</ul>
				</section>

				<section className={s.section} aria-labelledby="stack">
					<h2 id="stack" className={s.h2}>
						What you <em>get</em>
					</h2>
					<div className={s.cards}>
						{STACK.map((item) => (
							<article key={item.title} className={s.card}>
								<h3>
									{item.title} <span className={s.badge}>{item.badge}</span>
								</h3>
								<p>{item.text}</p>
							</article>
						))}
					</div>
				</section>

				<section className={s.section} aria-labelledby="how">
					<h2 id="how" className={s.h2}>
						From idea to <em>game</em>
					</h2>
					<ol className={s.steps}>
						<li>
							<div>
								<strong>Set it up once</strong>
								<span>Open Roblox Studio, switch on the AI assistant, follow the guide. About 10 minutes.</span>
							</div>
						</li>
						<li>
							<div>
								<strong>Paste a prompt</strong>
								<span>Pick a game type and paste the first prompt.</span>
								<code className={s.prompt}>Build an obby with 10 stages that get harder, with checkpoints, themed lava.</code>
							</div>
						</li>
						<li>
							<div>
								<strong>Play, fix, publish</strong>
								<span>Test it, use the fix prompts when something breaks, then publish to Roblox and share it.</span>
							</div>
						</li>
					</ol>
					<div className={s.clips}>
						<KitClip src="/kits/clips/bridge.mp4" poster="/kits/clips/bridge.jpg" className={s.clip} tagClassName={s.clipTag} label="From our reels" />
						<KitClip src="/kits/clips/neon-bridge.mp4" poster="/kits/clips/neon-bridge.jpg" className={s.clip} tagClassName={s.clipTag} label="From our reels" />
					</div>
				</section>

				<section className={s.guarantee} aria-label="Money-back guarantee">
					<div className={s.seal}>
						30
						<br />
						DAYS
					</div>
					<div>
						<h3>Money-back guarantee</h3>
						<p>
							Try the kit. If it does not help you build your first game, email us within{' '}
							{LEGAL.refundDays} days and get every cent back.
						</p>
					</div>
				</section>

				<section className={s.section} aria-labelledby="faq">
					<h2 id="faq" className={s.h2}>
						Questions
					</h2>
					<div className={s.faq}>
						{FAQ.map((item) => (
							<details key={item.q}>
								<summary>{item.q}</summary>
								<p>{item.a}</p>
							</details>
						))}
					</div>
				</section>

				<section className={s.section} aria-labelledby="close">
					<h2 id="close" className={s.h2}>
						Start building <em>tonight</em>
					</h2>
					<BuyBlock id="close-buy" />
				</section>
			</main>

		</KitShell>
	)
}
