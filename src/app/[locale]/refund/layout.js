import { createPageMetadata } from '@/lib/createPageMetadata'

export async function generateMetadata({ params }) {
	const { locale } = await params
	if (locale !== 'en') return { title: 'SmartCode Academy' }
	return createPageMetadata('refund', '/refund')({ params })
}

export default function RefundLayout({ children }) {
	return children
}
