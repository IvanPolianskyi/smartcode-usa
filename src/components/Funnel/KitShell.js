import localFont from 'next/font/local'
import { Link } from '@/i18n/navigation'
import { LEGAL } from '@/lib/legalConfig'
import s from '@/app/[locale]/kit/sales.module.css'

// Self-hosted (OFL) so builds never depend on downloading Google Fonts.
const anton = localFont({ src: '../../fonts/anton-latin.woff2', weight: '400', variable: '--k-display', display: 'swap' })
const rubik = localFont({ src: '../../fonts/rubik-latin-var.woff2', weight: '400 700', variable: '--k-body', display: 'swap' })

/**
 * Frame shared by the kit sales, thank-you and access pages. The kit is sold
 * as a stand-alone product: the logo links back to /kit and the footer only
 * carries the legal pages, no links into the rest of the site.
 */
export default function KitShell({ action = null, children }) {
	return (
		<div className={`${s.page} ${anton.variable} ${rubik.variable}`} data-theme="dark">
			<nav className={s.nav}>
				<div className={s.wrap}>
					<Link href="/kit" className={s.logo} aria-label="SmartCode">
						Smart<span>Code</span>
					</Link>
					{action}
				</div>
			</nav>

			{children}

			<footer className={s.footer}>
				<div className={s.wrap}>
					<div>
						© {new Date().getFullYear()} {LEGAL.brandName} · {LEGAL.legalName}, {LEGAL.legalForm} ·{' '}
						{LEGAL.supportEmail}
						<br />
						Payments by Paddle.com, our Merchant of Record. Results are not guaranteed. Paid Claude plan
						not included. Not affiliated with Roblox or Anthropic.
					</div>
					<nav aria-label="Legal">
						<Link href="/terms">Terms</Link>
						<Link href="/privacy">Privacy</Link>
						<Link href="/refund">Refunds</Link>
						<Link href="/contact">Contact</Link>
						<Link href="/kit/access">I already bought</Link>
					</nav>
				</div>
			</footer>
		</div>
	)
}
