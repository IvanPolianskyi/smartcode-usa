import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'
import Visit from '@/components/Visit/Visit'
import HomeClient from './HomeClient'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const meta = await getLocalizedMetadata(locale, 'home')
	return {
		...meta,
		alternates: buildAlternates(locale, '/'),
	}
}

function buildHomeJsonLd({ title, description }) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': 'https://smartcode-academy.com/#website',
				url: 'https://smartcode-academy.com',
				name: title,
				description,
				inLanguage: 'uk-UA',
			},
			{
				'@type': 'EducationalOrganization',
				'@id': 'https://smartcode-academy.com/#organization',
				name: 'SmartCode Academy',
				url: 'https://smartcode-academy.com',
				description,
				inLanguage: 'uk-UA',
			},
		],
	}
}

export default async function Home({ params }) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations({ locale, namespace: 'metadata.home' })
	const jsonLd =
		locale === 'uk'
			? buildHomeJsonLd({ title: t('title'), description: t('description') })
			: null

	return (
		<div className='home-page-wrapper'>
			{jsonLd && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<div className='overflow-x-hidden'>
				<Visit />
				<HomeClient />
			</div>
		</div>
	)
}
