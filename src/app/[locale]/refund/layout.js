import { createPageMetadata } from '@/lib/createPageMetadata'

export async function generateMetadata({ params }) {
	return createPageMetadata('refund', '/refund')({ params })
}

export default function RefundLayout({ children }) {
	return children
}
