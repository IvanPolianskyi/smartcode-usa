import { setRequestLocale } from 'next-intl/server'

export const metadata = {
	title: 'Reset password - SmartCode',
	description: 'Set a new password for your SmartCode account.',
	robots: { index: false, follow: false },
}

export default async function ResetPasswordLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
