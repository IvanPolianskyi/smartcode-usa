import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('webDev', '/webDev')

export default async function WebDevLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
