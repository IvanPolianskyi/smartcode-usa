import { setRequestLocale } from 'next-intl/server'

export const metadata = {
	title: 'Forgot password — SmartCode',
	description: 'Get help recovering access to your SmartCode account.',
	robots: { index: false, follow: false },
}

export default async function ForgotPasswordLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
