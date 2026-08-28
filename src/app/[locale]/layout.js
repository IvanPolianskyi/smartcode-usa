import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono, Instrument_Sans, Source_Serif_4 } from 'next/font/google'
import AuthSessionProvider from '@/components/AuthSessionProvider'
import RevealProvider from '@/components/Motion/Reveal'
import SupportWidget from '@/components/Support/SupportWidget'
import Analytics from '@/components/Analytics/Analytics'
import VisitTracker from '@/components/Analytics/VisitTracker'
import { routing } from '@/i18n/routing'
import { normalizeSiteUrl } from '@/lib/legalConfig'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500'],
})

const instrumentSans = Instrument_Sans({
	variable: '--font-instrument-sans',
	subsets: ['latin'],
	display: 'swap',
	weight: ['500', '600', '700'],
})

/** Serif display - Brilliant-style headlines. */
const sourceSerif = Source_Serif_4({
	variable: '--font-source-serif',
	subsets: ['latin'],
	display: 'swap',
	weight: ['600', '700'],
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
