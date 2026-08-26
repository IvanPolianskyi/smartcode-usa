import { setRequestLocale } from 'next-intl/server'

export const metadata = {
	title: 'Log in - SmartCode',
	description: 'Sign in to your SmartCode account to continue learning.',
}

export default async function LoginLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
