import { setRequestLocale } from 'next-intl/server'

export const metadata = {
	title: 'Create account — SmartCode',
	description: 'Create a SmartCode account, then subscribe to Roblox, Python, or AI at Work.',
	robots: { index: false, follow: false },
}

export default async function RegisterLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
