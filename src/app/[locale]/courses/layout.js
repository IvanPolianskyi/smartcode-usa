import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'
import CourseScrollEnable from '@/components/Course/CourseScrollEnable'

export const generateMetadata = createPageMetadata('courses', '/courses')

export default async function CoursesLayout({ children, params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return (
		<>
			<CourseScrollEnable />
			{children}
		</>
	)
}
