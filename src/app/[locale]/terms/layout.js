import { createPageMetadata } from '@/lib/createPageMetadata'

export async function generateMetadata({ params }) {
	return createPageMetadata('terms', '/terms')({ params })
}

export default function TermsLayout({ children }) {
	return children
}
