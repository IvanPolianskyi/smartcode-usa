import { setRequestLocale } from 'next-intl/server'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'
import PricingPage from '@/components/Pricing/PricingPage'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const meta = await getLocalizedMetadata(locale, 'tariff')
	return {
		...meta,
		alternates: buildAlternates(locale, '/tariff'),
	}
}

export default async function TariffPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return <PricingPage />
}
