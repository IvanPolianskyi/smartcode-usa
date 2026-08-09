'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Code, Gamepad2, Monitor, Box, Blocks, Cuboid } from 'lucide-react'

const COURSE_CONFIG = [
	{
		key: 'python',
		courseId: 'python-developer-zero-to-junior',
		icon: Code,
		color: '#3b82f6',
		theme: 'blue',
		link: '/python',
		courseLink: '/courses/python-developer-zero-to-junior',
		level: 'Beginner',
		duration: { weeks: 41, lessons: 96, hours: 192 },
		popular: false,
		rating: 4.9,
		marketingOnly: false,
	},
	{
		key: 'unity',
		courseId: 'unity-game-development',
		icon: Gamepad2,
		color: '#10b981',
		theme: 'green',
		link: '/Unity',
		courseLink: '/courses/unity-game-development',
		level: 'Beginner',
		duration: { weeks: 20, lessons: 40, hours: 80 },
		popular: false,
		rating: 4.8,
		marketingOnly: false,
	},
	{
		key: 'roblox',
		courseId: 'roblox-studio',
		icon: Box,
		color: '#10b981',
		theme: 'green',
		link: '/Roblox',
		courseLink: '/courses/roblox-studio',
		level: 'Beginner',
		duration: { weeks: 46, lessons: 92, hours: 92 },
		popular: false,
		rating: 4.7,
		marketingOnly: false,
	},
	{
		key: 'webdev',
		courseId: 'web-development',
		icon: Monitor,
		color: '#8b5cf6',
		theme: 'purple',
		link: '/webDev',
		courseLink: '/courses/web-development',
		level: 'Intermediate',
		duration: { weeks: 22, lessons: 44, hours: 88 },
		popular: false,
		rating: 4.8,
		marketingOnly: false,
	},
	{
		key: 'scratch',
		courseId: 'scratch',
		icon: Blocks,
		color: '#f97316',
		theme: 'orange',
		link: '/Scratch',
		courseLink: '/courses/scratch',
		level: 'Beginner',
		duration: { weeks: 46, lessons: 92, hours: 92 },
		popular: false,
		rating: 4.9,
		marketingOnly: false,
	},
	{
		key: 'minecraft',
		courseId: 'minecraft-education',
		icon: Cuboid,
		color: '#22c55e',
		theme: 'green',
		link: '/MinecraftEducation',
		courseLink: '/courses/minecraft-education',
		level: 'Beginner',
		duration: { weeks: 46, lessons: 92, hours: 92 },
		popular: false,
		rating: 4.8,
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
