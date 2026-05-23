import { setRequestLocale } from 'next-intl/server'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const meta = await getLocalizedMetadata(locale, 'register')
	return {
		...meta,
		alternates: buildAlternates(locale, '/register'),
	}
}

export default async function RegisterLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
