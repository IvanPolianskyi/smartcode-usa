'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Code, Box, BookOpen, Blocks, Cuboid, Gamepad2, Globe } from 'lucide-react'

export const DASHBOARD_COURSE_IDS = [
	'python-developer-zero-to-junior',
	'roblox-studio',
	'scratch',
	'minecraft-education',
	'web-development',
	'unity-game-development',
]

const COURSE_META = {
	'python-developer-zero-to-junior': {
		icon: Code,
		color: '#3b82f6',
		link: '/courses/python-developer-zero-to-junior',
		bannerImage: '/python-logo.png',
		bannerGradient: 'linear-gradient(135deg, #1d4ed8, #4338ca)',
	},
	'roblox-studio': {
		icon: Box,
		color: '#10b981',
		link: '/courses/roblox-studio',
		bannerImage: '/logos/roblox.svg',
		bannerGradient: 'linear-gradient(135deg, #b91c1c, #dc2626)',
	},
	scratch: {
		icon: Blocks,
		color: '#f97316',
		link: '/courses/scratch',
		bannerImage: '/logos/scratch-course.png',
		bannerGradient: 'linear-gradient(135deg, #ea580c, #f97316)',
	},
	'minecraft-education': {
		icon: Cuboid,
		color: '#22c55e',
		link: '/courses/minecraft-education',
		bannerImage: '/logos/minecraft-course.png',
		bannerGradient: 'linear-gradient(135deg, #15803d, #22c55e)',
	},
	'web-development': {
		icon: Globe,
		color: '#0ea5e9',
		link: '/webDev',
		bannerImage: '/logos/web.svg',
		bannerGradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
	},
	'unity-game-development': {
		icon: Gamepad2,
		color: '#64748b',
		link: '/courses/unity-game-development',
		bannerImage: '/logos/unity.svg',
		bannerGradient: 'linear-gradient(135deg, #1e293b, #475569)',
	},
}

export function useDashboardCourses() {
	const t = useTranslations('dashboard')

	return useMemo(() => {
		const map = {}
		DASHBOARD_COURSE_IDS.forEach((id) => {
			const meta = COURSE_META[id]
			const Icon = meta?.icon || BookOpen
			map[id] = {
				title: t(`courses.${id}.title`),
				icon: <Icon size={20} />,
				color: meta?.color || '#6b7280',
				link: meta?.link || '#',
				bannerImage: meta?.bannerImage,
				bannerGradient: meta?.bannerGradient || 'linear-gradient(135deg, #334155, #475569)',
			}
		})
		return (courseId) =>
			map[courseId] || {
				title: courseId,
				icon: <BookOpen size={20} />,
				color: '#6b7280',
				link: '#',
				bannerImage: '/projects/default-project.svg',
				bannerGradient: 'linear-gradient(135deg, #334155, #475569)',
			}
	}, [t])
}

export const DAY_KEY_MAP = {
	Нд: 'sun',
	Пн: 'mon',
	Вт: 'tue',
	Ср: 'wed',
	Чт: 'thu',
	Пт: 'fri',
	Сб: 'sat',
	sun: 'sun',
	mon: 'mon',
	tue: 'tue',
	wed: 'wed',
	thu: 'thu',
	fri: 'fri',
	sat: 'sat',
}
