import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'
import SubjectCourseLanding from '@/components/CourseLandings/SubjectCourseLanding'

export const generateMetadata = createPageMetadata('scratch', '/Scratch')

export default async function ScratchPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return (
		<SubjectCourseLanding
			courseKey="scratch"
			pixelKey="scratch"
			theme="scratch"
			leadCourseLabel="Scratch"
		/>
	)
}
