import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('pricing', '/pricing')

export default function PricingLayout({ children }) {
	return children
}
