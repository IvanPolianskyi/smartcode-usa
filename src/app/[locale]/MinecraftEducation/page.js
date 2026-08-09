import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/createPageMetadata'
import SubjectCourseLanding from '@/components/CourseLandings/SubjectCourseLanding'

export const generateMetadata = createPageMetadata('minecraft', '/MinecraftEducation')

export default async function MinecraftEducationPage({ params }) {
	const { locale } = await params
	setRequestLocale(locale)
	return (
		<SubjectCourseLanding
			courseKey="minecraft"
			pixelKey="minecraft"
			theme="minecraft"
			leadCourseLabel="Minecraft Education"
		/>
	)
}
