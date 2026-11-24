import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import KitBuyButton from '@/components/Funnel/KitBuyButton'
import KitClip from '@/components/Funnel/KitClip'
import KitShell from '@/components/Funnel/KitShell'
import OpenInBrowserGate from '@/components/Funnel/OpenInBrowser'
import PromoCapture from '@/components/Funnel/PromoCapture'
import { KITS } from '@/lib/kits'
import { LEGAL } from '@/lib/legalConfig'
import s from './sales.module.css'

const KIT = KITS['roblox-ai-games']
const DESCRIPTION = `Build Roblox games with Claude Code. The setup and the exact prompts behind our AI-built Roblox games (57M+ views), plus the finished game files. ${KIT.displayPrice} one-time, instant access, ${LEGAL.refundDays}-day money-back guarantee.`

export const metadata = {
	title: 'Build Roblox games with AI - Roblox AI Game Kit',
	description: DESCRIPTION,
	alternates: { canonical: '/kit' },
	openGraph: { title: 'Build Roblox games with AI', description: DESCRIPTION, url: '/kit' },
	twitter: { card: 'summary_large_image', title: 'Build Roblox games with AI', description: DESCRIPTION },
}

const INSIDE = [
	{ thumb: 'claude', title: 'Full setup guide', text: 'Install Claude Code and Rojo, add our rules file and connect Roblox Studio - every command, step by step.', by: 'About 15 minutes' },
	{ thumb: 'house', title: 'Game 1: LEGO house', text: 'The exact prompt for a house of 2 000 blocks you can smash through, plus 3 follow-ups to make it yours.', by: 'One prompt' },
	{ thumb: 'vortex', title: 'Game 2: Vortex floor', text: '14 400 blocks that sink into a whirlpool under your feet - and the prompt that keeps it smooth.', by: 'One prompt' },
	{ thumb: 'swarm', title: 'Game 3: Nanobot swarm', text: '2 000 cubes that swirl around you, spin into a tornado and build walls - the game from our reel seen by 4.4M people.', by: 'One prompt + one fix' },
	{ thumb: 'grass', title: 'Test & fix prompts', text: 'Let Claude press Play, read the errors and fix them itself. Plus 3 more game prompts to try.', by: 'Inside the kit' },
	{ thumb: 'sinkhole', title: 'The 3 finished games', text: 'Every game as a full project - the game file plus all the scripts Claude wrote - so you can play it now and change it with Claude.', by: 'Download' },
]

const NEED = [
	{ title: 'A computer', text: 'Windows or Mac. Roblox Studio and Claude Code do not run on phones or tablets.' },
	{ title: 'Claude Code', text: 'On a paid Claude Pro plan or other paid Claude subscription. Not included: you buy it from Anthropic.' },
	{ title: 'Roblox Studio + Rojo', text: 'Both free. The guide shows you how to install them - Claude can even install Rojo for you.' },
]

const FAQ = [
	{ q: 'How much do I pay, exactly?', a: `${KIT.displayPrice}, once, in USD. No subscription. Paddle, our Merchant of Record, adds sales tax or VAT only where the law requires it.` },
	{ q: 'Can I do this on my phone?', a: 'No. Building the games needs a Windows or Mac computer, because Roblox Studio and Claude Code run there. You can read the guide on your phone.' },
	{ q: 'What do I need?', a: 'A Windows or Mac computer, Claude Code on a paid Claude plan, Roblox Studio (free) and Rojo (free).' },
	{ q: 'How do I get access after paying?', a: 'We email you a link straight away - tap it and your kit page opens, no password needed. Download the PDF and the starter files there.' },
	{ q: 'Do I need any skills?', a: 'No. You paste the prompts and Claude Code writes all the code. The guide explains every step in plain words.' },
	{ q: 'Is Claude included?', a: `No. You need a paid Claude Pro plan or another paid Claude subscription, bought separately from Anthropic. The ${KIT.displayPrice} covers the guide and the starter files only.` },
	{ q: 'Will my game go viral?', a: 'Results are not guaranteed. Players and views depend on your game, how you share it, and the platforms.' },
	{ q: "I'm under 18.", a: 'Ask a parent or guardian to buy it with their card - the kit is yours to use.' },
	{ q: 'Can I get a refund?', a: `Yes. Email us within ${LEGAL.refundDays} days of buying and we refund you in full.` },
]

/**
 * Sales page for the Roblox AI Game Kit, laid out like the reference page.
 * Link in bio / Direct bot: smartcode.academy/kit?src=ig
 */
export default async function KitPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<KitShell
			action={
				<KitBuyButton kitId={KIT.id} className={`${s.btn} ${s.small}`}>
					Get it for {KIT.displayPrice}
				</KitBuyButton>
			}
		>
			<PromoCapture />
			<OpenInBrowserGate />

			<header className={s.hero}>
				<div className={s.wrap}>
					<div className={s.pill}>57M+ views on our Roblox reels</div>
					<h1>
						Build <span className={s.accent}>Roblox games</span> with AI.
					</h1>

					<div className={s.phones}>
						<KitClip src="/kits/clips/vortex.mp4" poster="/kits/clips/vortex.jpg" className={s.phone} priority />
						<KitClip src="/kits/clips/blocks.mp4" poster="/kits/clips/blocks.jpg" className={s.phone} priority />
					</div>

					<div className={s.stats}>
						<div className={s.wrap}>
							<div>
								<b>
									57M<em>+</em>
								</b>
								<span>views in 90 days</span>
							</div>
							<div>
								<b>
									3 <em>games</em>
								</b>
								<span>our best, code included</span>
							</div>
							<div>
								<b>
									~3 <em>min</em>
								</b>
								<span>from prompt to game</span>
							</div>
						</div>
					</div>

					<p className={s.lead}>
						<b>Get our 3 best Roblox games</b> - the ones from our viral reels - ready to play, with
						all the code. Plus the step-by-step guide and exact prompts to build your own with
						Claude Code: you paste one prompt, it writes every script and hands you a game file.
					</p>

					<div className={s.heroBuy}>
						<div className={s.priceRow}>
							<KitBuyButton kitId={KIT.id} className={s.btn}>
								Get instant access
							</KitBuyButton>
							<div className={s.price}>
								{KIT.displayPrice} <small>one-time</small>
							</div>
						</div>
						<p className={s.trust}>
							Secure checkout by Paddle &nbsp;·&nbsp; Instant access &nbsp;·&nbsp; {LEGAL.refundDays}-day
							money-back
						</p>
					</div>

					<div className={s.disclaim}>
						<b>Good to know</b>
						<ul>
							<li>
								<b>No skills needed:</b> Claude Code writes the scripts and builds the map for you.
							</li>
							<li>
								<b>Not included:</b> a paid Claude Pro plan (or other paid Claude subscription) is
								required and sold separately by Anthropic.
							</li>
							<li>
								<b>Results are not guaranteed.</b> Players and views depend on your game, your
								posting and the platforms.
							</li>
						</ul>
					</div>
				</div>
			</header>

			<section className={s.block} style={{ paddingBottom: 0 }} aria-labelledby="proof">
				<div className={s.wrap}>
					<h2 id="proof" className={s.center}>
						Seen by <span className={s.accent}>millions</span>
					</h2>
					<p className={`${s.sub} ${s.center}`}>Straight from our Instagram dashboard - the games in this kit come from these reels.</p>
					<div className={s.proof}>
						<figure className={s.proofCard}>
							<Image src="/kits/proof/views-90d.jpg" alt="Instagram dashboard: 57,191,258 views and 19,386,035 viewers in 90 days" width={790} height={250} />
							<figcaption>
								<b>57.2M views</b> in the last 90 days
							</figcaption>
						</figure>
						<figure className={s.proofCard}>
							<Image src="/kits/proof/top-reels.jpg" alt="Our top Roblox reels: 14M, 4.4M, 1.7M and 1.6M viewers" width={924} height={690} />
							<figcaption>
								Our top reels: <b>14M</b>, <b>4.4M</b> (the nanobot swarm), 1.7M and 1.6M people
							</figcaption>
						</figure>
					</div>
				</div>
			</section>

			<section className={s.block}>
				<div className={s.wrap}>
					<h2 className={s.center}>What you get</h2>
					<p className={`${s.sub} ${s.center}`}>
						A 22-page guide and the 3 finished games. Everything is on one private page you can
						come back to any time, and every update is free.
					</p>
					<ul className={`${s.inside} ${s.card}`}>
						{INSIDE.map((item) => (
							<li key={item.title}>
								<Image src={`/kits/thumbs/${item.thumb}.jpg`} alt="" width={72} height={72} className={s.thumb} />
								<div>
									<h3>{item.title}</h3>
									<p>{item.text}</p>
									{item.by ? <span className={s.by}>{item.by}</span> : null}
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className={s.block} style={{ paddingTop: 0 }}>
				<div className={s.wrap}>
					<h2 className={s.center}>How it works</h2>
					<p className={`${s.sub} ${s.center}`}>From one prompt to a game you can play.</p>
					<div className={`${s.grid} ${s.c3}`}>
						<div className={`${s.card} ${s.step}`}>
							<Image src="/kits/how-setup.jpg" alt="" width={640} height={400} />
							<div>
								<h3>Set it up once</h3>
								<p>Follow the guide to install Claude Code and Rojo and connect Roblox Studio. About 15 minutes.</p>
							</div>
						</div>
						<div className={`${s.card} ${s.step}`}>
							<div className={s.prompt}>
								<q>make me a Roblox game where the floor sinks into a whirlpool wherever I walk</q>
							</div>
							<div>
								<h3>Paste a prompt</h3>
								<p>Claude Code writes the scripts, builds the map and makes the game file.</p>
							</div>
						</div>
						<div className={`${s.card} ${s.step}`}>
							<Image src="/kits/how-play.jpg" alt="" width={640} height={400} />
							<div>
								<h3>Press Play</h3>
								<p>Open the file in Roblox Studio and play. Ask Claude to change anything, then publish.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={s.block} style={{ paddingTop: 0 }}>
				<div className={s.wrap}>
					<h2 className={s.center}>What you need</h2>
					<p className={`${s.sub} ${s.center}`}>Check this before you buy.</p>
					<div className={`${s.grid} ${s.c3}`} style={{ marginBottom: 72 }}>
						{NEED.map((item) => (
							<div key={item.title} className={s.card}>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</div>
						))}
					</div>

					<h2 className={s.center}>Questions</h2>
					<div className={s.faq} style={{ marginTop: 24 }}>
						{FAQ.map((item) => (
							<details key={item.q}>
								<summary>{item.q}</summary>
								<p>{item.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className={s.block} style={{ paddingTop: 0 }}>
				<div className={s.wrap}>
					<div className={s.ctaBox}>
						<h2>Start building tonight</h2>
						<p className={s.muted} style={{ marginBottom: 24 }}>
							The setup guide, the prompts for 3 games and the finished game files. {KIT.displayPrice}{' '}
							one-time.
							<br />
							No skills needed. Requires a Windows or Mac computer and a paid Claude subscription (not
							included).
						</p>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<KitBuyButton kitId={KIT.id} className={s.btn}>
								Get instant access
							</KitBuyButton>
						</div>
					</div>
				</div>
			</section>
		</KitShell>
	)
}
