import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('roblox', '/Roblox')

export default async function RobloxLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
