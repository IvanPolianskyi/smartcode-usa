import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import localFont from 'next/font/local'
import AuthSessionProvider from '@/components/AuthSessionProvider'
import RevealProvider from '@/components/Motion/Reveal'
import SupportWidget from '@/components/Support/SupportWidget'
import Analytics from '@/components/Analytics/Analytics'
import VisitTracker from '@/components/Analytics/VisitTracker'
import { routing } from '@/i18n/routing'
import { normalizeSiteUrl } from '@/lib/legalConfig'

// Fonts are self-hosted: next/font/google downloads them at build time, and a
// failed download from Google broke production deploys (24.11.2026).
const geistSans = localFont({
	src: '../../fonts/geist-latin-var.woff2',
	variable: '--font-geist-sans',
	display: 'swap',
	weight: '400 700',
})

const geistMono = localFont({
	src: '../../fonts/geist-mono-latin-var.woff2',
	variable: '--font-geist-mono',
	display: 'swap',
	weight: '400 500',
})

const instrumentSans = localFont({
	src: '../../fonts/instrument-sans-latin-var.woff2',
	variable: '--font-instrument-sans',
	display: 'swap',
	weight: '500 700',
})

/** Serif display - Brilliant-style headlines. */
const sourceSerif = localFont({
	src: '../../fonts/source-serif-4-latin-var.woff2',
	variable: '--font-source-serif',
	display: 'swap',
	weight: '600 700',
})

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

/**
 * Site-wide metadata defaults.
 *
 * `metadataBase` is what makes the generated opengraph-image resolve to an
 * absolute URL - without it every share card silently falls back to no image.
 */
export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'SmartCode - build a game people actually play',
		template: '%s | SmartCode',
	},
	description:
		'Learn Roblox, Python, or AI by building real projects. Write code, run it, get it checked instantly.',
	openGraph: {
		type: 'website',
		siteName: 'SmartCode Academy',
		locale: 'en_US',
		url: SITE_URL,
	},
	twitter: {
		card: 'summary_large_image',
	},
	robots: {
		index: true,
		follow: true,
	},
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<html lang={locale} data-theme="light" suppressHydrationWarning>
			<head>
				<meta name='format-detection' content='telephone=no' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='mobile-web-app-capable' content='yes' />
				<link rel='icon' href='/favicon.ico?v=6' sizes='any' />
				<link rel='icon' href='/favicon.png?v=6' type='image/png' sizes='32x32' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png?v=6' />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${sourceSerif.variable} sc-page`}
				suppressHydrationWarning
			>
				<NextIntlClientProvider messages={messages}>
					<AuthSessionProvider>
						<RevealProvider />
						{children}
						<VisitTracker />
						<SupportWidget />
						<Analytics />
					</AuthSessionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
