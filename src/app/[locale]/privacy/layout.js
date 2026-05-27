import { createPageMetadata } from '@/lib/createPageMetadata'

export async function generateMetadata({ params }) {
	const { locale } = await params
	if (locale !== 'en') return { title: 'SmartCode Academy' }
	return createPageMetadata('privacy', '/privacy')({ params })
}

export default function PrivacyLayout({ children }) {
	return children
}
