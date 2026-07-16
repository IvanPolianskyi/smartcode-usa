import { setRequestLocale } from 'next-intl/server'
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

export default async function Home({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<div className='home-page-wrapper'>
			<Visit />
			<HomeClient />
		</div>
	)
}
