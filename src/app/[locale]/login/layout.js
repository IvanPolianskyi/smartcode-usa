import { setRequestLocale } from 'next-intl/server'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const meta = await getLocalizedMetadata(locale, 'login')
	return {
		...meta,
		alternates: buildAlternates(locale, '/login'),
	}
}

export default async function LoginLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
