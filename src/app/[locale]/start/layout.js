import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('start', '/start')

export default function StartLayout({ children }) {
	return children
}
