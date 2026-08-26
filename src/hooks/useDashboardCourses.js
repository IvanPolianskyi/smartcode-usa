'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Code, Box, BookOpen, Sparkles } from 'lucide-react'

export const DASHBOARD_COURSE_IDS = [
	'python-developer-zero-to-junior',
	'roblox-studio',
	'ai-at-work',
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
		color: '#fc6e51',
		link: '/courses/roblox-studio',
		bannerImage: '/logos/roblox.svg',
		bannerGradient: 'linear-gradient(135deg, #b91c1c, #dc2626)',
	},
	'ai-at-work': {
		icon: Sparkles,
		color: '#8b5cf6',
		link: '/courses/ai-at-work',
		bannerImage: '/projects/default-project.svg',
		bannerGradient: 'linear-gradient(135deg, #2e1065, #7c3aed)',
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
