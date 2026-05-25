'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Code, Gamepad2, Monitor, Box, BookOpen } from 'lucide-react'

export const DASHBOARD_COURSE_IDS = [
	'python-developer-zero-to-junior',
	'unity-game-development',
	'roblox-studio',
	'web-development',
]

const COURSE_META = {
	'python-developer-zero-to-junior': {
		icon: Code,
		color: '#3b82f6',
		link: '/courses/python-developer-zero-to-junior',
		bannerImage: '/python-logo.png',
		bannerGradient: 'linear-gradient(135deg, #1d4ed8, #4338ca)',
	},
	'unity-game-development': {
		icon: Gamepad2,
		color: '#10b981',
		link: '/Unity',
		bannerImage: '/logos/unity.svg',
		bannerGradient: 'linear-gradient(135deg, #0f766e, #065f46)',
	},
	'roblox-studio': {
		icon: Box,
		color: '#10b981',
		link: '/courses/roblox-studio',
		bannerImage: '/logos/roblox.svg',
		bannerGradient: 'linear-gradient(135deg, #b91c1c, #dc2626)',
	},
	'web-development': {
		icon: Monitor,
		color: '#8b5cf6',
		link: '/courses/web-development',
		bannerImage: '/logos/web.svg',
		bannerGradient: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
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
}
