import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('courses', '/courses')

export default async function CoursesLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return children
}
