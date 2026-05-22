import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('invite', '/invite')

export default async function InviteLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
