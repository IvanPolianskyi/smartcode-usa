'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Code, Box, BookOpen } from 'lucide-react'

const COURSE_CONFIG = [
	{
		key: 'python',
		courseId: 'python-developer-zero-to-junior',
		icon: Code,
		color: '#3b82f6',
		theme: 'blue',
		link: '/courses/python-developer-zero-to-junior',
		courseLink: '/courses/python-developer-zero-to-junior',
		level: 'Beginner',
		duration: { weeks: 41, lessons: 96, hours: 192 },
		popular: false,
		rating: 4.9,
		marketingOnly: false,
	},
	{
		key: 'roblox',
		courseId: 'roblox-studio',
		icon: Box,
		color: '#fc6e51',
		theme: 'green',
		link: '/courses/roblox-studio',
		courseLink: '/courses/roblox-studio',
		level: 'Beginner',
		duration: { weeks: 46, lessons: 92, hours: 92 },
		popular: false,
		rating: 4.7,
		marketingOnly: false,
	},
	{
		key: 'ai',
		courseId: 'ai-at-work',
		icon: BookOpen,
		color: '#e85d3a',
		theme: 'teal',
		link: '/courses/ai-at-work',
		courseLink: '/courses/ai-at-work',
		level: 'Beginner',
		duration: { weeks: 5, lessons: 3, hours: 10 },
		popular: false,
		rating: 5,
		marketingOnly: false,
	},
]

export function useCoursesListData() {
	const t = useTranslations('pages.coursesList')

	return useMemo(() => {
		const courses = COURSE_CONFIG.map((cfg) => {
			const skillsRaw = t.raw(`courses.${cfg.key}.skills`)
			const skills = Object.keys(skillsRaw)
				.sort((a, b) => Number(a) - Number(b))
				.map((k) => skillsRaw[k])

			return {
				...cfg,
				title: t(`courses.${cfg.key}.title`),
				shortDescription: t(`courses.${cfg.key}.shortDescription`),
				description: t(`courses.${cfg.key}.description`),
				age: t(`courses.${cfg.key}.age`),
				skills,
				icon: <cfg.icon size={32} />,
			}
		})

		return { courses, t }
	}, [t])
}
