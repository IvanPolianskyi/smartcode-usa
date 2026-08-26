import { setRequestLocale } from 'next-intl/server'

export const metadata = {
	title: 'Start learning — SmartCode',
	description: 'Create an account or log in to start your SmartCode free trial.',
	robots: { index: false, follow: false },
}

export default async function StartLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
