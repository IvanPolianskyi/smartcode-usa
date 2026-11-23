import { Anton, Rubik } from 'next/font/google'
import { Link } from '@/i18n/navigation'
import { LEGAL } from '@/lib/legalConfig'
import s from '@/app/[locale]/kit/kit.module.css'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--k-display', display: 'swap' })
const rubik = Rubik({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--k-body', display: 'swap' })

/**
 * Dark frame shared by the kit sales, thank-you and access pages. The kit is
 * sold as a stand-alone product: the logo links back to /kit and the footer
 * carries only the legal pages, no links into the rest of the site.
 */
export default function KitShell({ action = null, children }) {
	return (
		<div className={`${s.page} ${anton.variable} ${rubik.variable}`} data-theme="dark">
			<header className={s.header}>
				<Link href="/kit" className={s.logo} aria-label="SmartCode">
					SMART<span>CODE</span>
				</Link>
				{action}
			</header>

			{children}

			<footer className={s.footer}>
				<nav aria-label="Legal">
					<Link href="/terms">Terms</Link>
					<Link href="/privacy">Privacy</Link>
					<Link href="/refund">Refunds</Link>
					<Link href="/contact">Contact</Link>
					<Link href="/kit/access">I already bought</Link>
				</nav>
				<span>
					© {new Date().getFullYear()} {LEGAL.brandName} · {LEGAL.legalName}, {LEGAL.legalForm} ·{' '}
					{LEGAL.supportEmail}
				</span>
				<span>
					Payments by Paddle.com, our Merchant of Record. Results are not guaranteed. View counts
					are from our own Instagram. Not affiliated with Roblox, Anthropic or OpenAI.
				</span>
			</footer>
		</div>
	)
}
