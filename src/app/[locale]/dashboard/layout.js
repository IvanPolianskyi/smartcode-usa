import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('dashboard', '/dashboard')

export default function DashboardLayout({ children }) {
	return children
}
