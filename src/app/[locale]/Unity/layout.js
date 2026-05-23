import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('unity', '/Unity')

export default async function UnityLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
