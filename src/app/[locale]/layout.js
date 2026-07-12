import '../globals.css'
import { Suspense } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer/footer'
import ContactFormLoader from '@/components/ContactForm/ContactFormLoader'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/Header/Header'
import Script from 'next/script'
import MetaPixelRouteTracker from '@/components/MetaPixel/MetaPixelRouteTracker'
import AuthSessionProvider from '@/components/AuthSessionProvider'
import { META_PIXEL_ID } from '@/lib/metaPixel'
import { routing } from '@/i18n/routing'
import { getSearchIndexingMetadata, SITE_URL } from '@/lib/i18nMetadata'

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
	weight: ['400', '500', '600', '700'],
})

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
	const { locale } = await params
	return {
		metadataBase: SITE_URL,
		...getSearchIndexingMetadata(locale),
	}
}

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	setRequestLocale(locale)
	const messages = await getMessages()
	const htmlLang = locale === 'uk' ? 'uk' : 'en'

	return (
		<html lang={htmlLang} suppressHydrationWarning>
			<head>
				<meta name='format-detection' content='telephone=no' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='mobile-web-app-capable' content='yes' />
				<link rel='icon' href='/logo.jpeg' />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){function setAppHeight(){var h=window.visualViewport?window.visualViewport.height:window.innerHeight;document.documentElement.style.setProperty('--app-height',h+'px')}setAppHeight();window.addEventListener('resize',setAppHeight,{passive:true});window.addEventListener('orientationchange',setAppHeight,{passive:true});if(window.visualViewport){window.visualViewport.addEventListener('resize',setAppHeight,{passive:true})}})();`,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<NextIntlClientProvider messages={messages}>
					<AuthSessionProvider>
						<Suspense fallback={null}>
							<MetaPixelRouteTracker />
						</Suspense>
						<ScrollToTop />
						<Header />
						<div className='min-h-screen flex flex-col'>
							<main className='flex-1 relative main-content'>{children}</main>
							<Footer />
							<ContactFormLoader />
						</div>
					</AuthSessionProvider>
				</NextIntlClientProvider>

				<Script
					src='https://www.googletagmanager.com/gtag/js?id=G-MYR6FDXWYF'
					strategy='lazyOnload'
				/>
				<Script id='google-analytics' strategy='lazyOnload'>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-MYR6FDXWYF');
					`}
				</Script>
				{META_PIXEL_ID && (
					<>
						<Script id='meta-pixel' strategy='lazyOnload'>
							{`
								!function(f,b,e,v,n,t,s)
								{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
								n.callMethod.apply(n,arguments):n.queue.push(arguments)};
								if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
								n.queue=[];t=b.createElement(e);t.async=!0;
								t.src=v;s=b.getElementsByTagName(e)[0];
								s.parentNode.insertBefore(t,s)}(window, document,'script',
								'https://connect.facebook.net/en_US/fbevents.js');
								fbq('set', 'autoConfig', false, '${META_PIXEL_ID}');
								fbq('init', '${META_PIXEL_ID}');
								fbq('track', 'PageView');
							`}
						</Script>
						<noscript>
							<img
								height='1'
								width='1'
								style={{ display: 'none' }}
								src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
								alt=''
							/>
						</noscript>
					</>
				)}
			</body>
		</html>
	)
}
