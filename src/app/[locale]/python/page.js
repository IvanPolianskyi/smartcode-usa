import { setRequestLocale } from 'next-intl/server'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'
import PythonCoursePage from '@/components/PythonCourseComponents/PythonCoursePage'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const meta = await getLocalizedMetadata(locale, 'python')
	return {
		...meta,
		alternates: buildAlternates(locale, '/python'),
	}
}

export default async function PythonCourse({ params }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Course',
						name: 'Python Programming Course',
						description:
							'Full Python programming course for children and teens',
						provider: {
							'@type': 'EducationalOrganization',
							name: 'SmartCode Academy',
							url: 'https://smartcode-academy.com',
						},
						inLanguage: locale === 'uk' ? 'uk' : 'en',
					}),
				}}
			/>
			<PythonCoursePage />
		</>
	)
}
