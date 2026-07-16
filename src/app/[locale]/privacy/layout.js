import { createPageMetadata } from '@/lib/createPageMetadata'

export async function generateMetadata({ params }) {
	return createPageMetadata('privacy', '/privacy')({ params })
}

export default function PrivacyLayout({ children }) {
	return children
}
