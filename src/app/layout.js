import Footer from '@/components/Footer/footer'
import ContactForm from '@/components/ContactForm/ContactForm'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import Script from 'next/script'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
	metadataBase: new URL('https://smartcode-academy.com'),
	title: 'SmartCode Academy - Школа програмування для дітей та підлітків',
	description:
		'Навчаємо дітей 8-17 років програмуванню через інтерактивні заняття. Python, JavaScript, розробка ігор, веб-дизайн. Перший урок безкоштовно! Онлайн та офлайн формати навчання в Україні.',
	keywords: [
		'програмування для дітей',
		'школа програмування',
		'Python для дітей',
		'JavaScript навчання',
		'Roblox Studio',
		'Unity розробка',
		'веб-дизайн для дітей',
		'онлайн навчання програмування',
		'ІТ-освіта',
		'курси програмування',
		'SmartCode Academy',
		'кодинг для дітей',
		'програмування Україна',
		'дитячі ІТ курси',
		'навчання програмування онлайн',
		'розробка ігор для дітей',
	].join(', '),
	authors: [{ name: 'SmartCode Academy' }],
	creator: 'SmartCode Academy',
	publisher: 'SmartCode Academy',
	robots: 'index, follow',
	openGraph: {
		title: 'SmartCode Academy - Школа програмування для дітей',
		description:
			'Навчаємо дітей програмуванню через захопливі проекти. Перший урок безкоштовно!',
		url: 'https://smartcode-academy.com',
		siteName: 'SmartCode Academy',
		images: [
			{
				url: '/logo.jpg',
				width: 400,
				height: 400,
				alt: 'SmartCode Academy - Школа програмування для дітей',
			},
		],
		locale: 'uk_UA',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SmartCode Academy - Школа програмування для дітей',
		description: 'Навчаємо дітей програмуванню через захопливі проекти',
		images: ['/logo.jpg'],
	},
	/* 
	// РОЗКОМЕНТУЙТЕ ОЦЕЙ БЛОК, КОЛИ ОТРИМАЄТЕ СПРАВЖНІ КОДИ ВІД GOOGLE SEARCH CONSOLE ТА YANDEX WEBMASTER
	verification: {
		google: 'МВЕДІТЬ_СВІЙ_КОД_ТУТ',
	},
	*/
	alternates: {
		canonical: 'https://smartcode-academy.com',
		languages: {
			'uk-UA': 'https://smartcode-academy.com',
			'en-US': 'https://smartcode-academy.com/en',
		},
	},
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#2563eb' },
		{ media: '(prefers-color-scheme: dark)', color: '#1d4ed8' },
	],
}

export default function RootLayout({ children }) {




	return (
		<html lang='uk' suppressHydrationWarning>
			<head>
				<meta name='format-detection' content='telephone=no' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='mobile-web-app-capable' content='yes' />
				<link rel='icon' href='/logo.jpeg' />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<ScrollToTop />
				<Header />
                <div className='min-h-screen flex flex-col'>
					<main className='flex-1 relative main-content'>{children}</main>
					<Footer />
                    {/* Глобально змонтована модалка контакту, доступна на всіх сторінках */}
                    <ContactForm />
				</div>

				{/* Structured Data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'EducationalOrganization',
							name: 'SmartCode Academy',
							description: 'Школа програмування для дітей 8-17 років',
							url: 'https://smartcode-academy.com',
							logo: 'https://smartcode-academy.com/logo.jpg',
							image: 'https://smartcode-academy.com/logo.jpg',
							telephone: '+380671234567',
							email: 'info@smartcode-academy.com',
							address: {
								'@type': 'PostalAddress',
								addressCountry: 'UA',
								addressRegion: 'Україна',
							},
							sameAs: [
								'https://www.facebook.com/smartcodeacademy',
								'https://www.instagram.com/smartcodeacademy',
								'https://t.me/smartcodeacademy',
							],
							offers: {
								'@type': 'Offer',
								name: 'Безкоштовний пробний урок',
								description: 'Перший урок програмування безкоштовно',
								price: '0',
								priceCurrency: 'UAH',
							},
							hasOfferCatalog: {
								'@type': 'OfferCatalog',
								name: 'Курси програмування',
								itemListElement: [
									{
										'@type': 'Offer',
										name: 'Python для дітей',
										description: 'Основи програмування на Python',
										category: 'Programming Course',
									},
									{
										'@type': 'Offer',
										name: 'JavaScript та веб-розробка',
										description: 'Створення веб-сайтів і додатків',
										category: 'Web Development Course',
									},
									{
										'@type': 'Offer',
										name: 'Розробка ігор',
										description: 'Unity, Roblox Studio, Scratch',
										category: 'Game Development Course',
									},
								],
							},
						}),
					}}
				/>
				{/* Google Analytics */}
				<Script
					src='https://www.googletagmanager.com/gtag/js?id=G-MYR6FDXWYF'
					strategy='afterInteractive'
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-MYR6FDXWYF');
					`}
				</Script>
				{/* Meta Pixel */}
				<Script id='meta-pixel' strategy='afterInteractive'>
					{`
						!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '4274611226126341');
						fbq('track', 'PageView');
					`}
				</Script>
				<noscript>
					<img
						height='1'
						width='1'
						style={{ display: 'none' }}
						src='https://www.facebook.com/tr?id=4274611226126341&ev=PageView&noscript=1'
						alt=''
					/>
				</noscript>
			</body>
		</html>
	)
}
