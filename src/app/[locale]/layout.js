import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono, Instrument_Sans, Source_Serif_4 } from 'next/font/google'
import AuthSessionProvider from '@/components/AuthSessionProvider'
import RevealProvider from '@/components/Motion/Reveal'
import { routing } from '@/i18n/routing'

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

/** Serif display — Brilliant-style headlines. */
const sourceSerif = Source_Serif_4({
	variable: '--font-source-serif',
	subsets: ['latin'],
	display: 'swap',
	weight: ['600', '700'],
})

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
				<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${sourceSerif.variable} sc-page`}
				suppressHydrationWarning
			>
				<NextIntlClientProvider messages={messages}>
					<AuthSessionProvider>
						<RevealProvider />
						{children}
					</AuthSessionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
