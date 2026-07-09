'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

const COURSE_CONFIG = [
	{
		id: 'python',
		theme: 'themePython',
		href: '/python',
		icon: '/python-logo.png',
		iconType: 'image',
		rating: 4.9,
		stats: { students: '324+', projects: '20+' },
		particleColors: ['#c084fc', '#93c5fd', '#f9a8d4', '#fbbf24'],
	},
	{
		id: 'roblox',
		theme: 'themeRoblox',
		href: '/courses/roblox-studio',
		icon: '/logos/roblox.svg',
		iconType: 'image',
		rating: 4.8,
		stats: { students: '140+', projects: '8+' },
		particleColors: ['#fecaca', '#fca5a5', '#fb7185', '#f87171'],
	},
	{
		id: 'gamedev',
		theme: 'themeGamedev',
		href: '/Unity',
		icon: '/logos/unity.svg',
		iconType: 'image',
		rating: 4.8,
		stats: { duration: '8', students: '189+', projects: '12+' },
		particleColors: ['#6ee7b7', '#5eead4', '#a7f3d0', '#34d399'],
	},
	{
		id: 'webdev',
		theme: 'themeWebdev',
		href: '/webDev',
		icon: '/logos/web.svg',
		iconType: 'image',
		rating: 4.9,
		stats: { students: '156+', projects: '10+' },
		particleColors: ['#7dd3fc', '#67e8f9', '#a5f3fc', '#38bdf8'],
	},
]

export function useHomeCourseCards() {
	const t = useTranslations('homeSections.courseCards')

	return useMemo(
		() =>
			COURSE_CONFIG.map((c) => ({
				...c,
				title: t(`${c.id}.title`),
				subtitle: t(`${c.id}.subtitle`),
				description: t(`${c.id}.description`),
				features: t.raw(`${c.id}.features`),
				badge: t(`${c.id}.badge`),
			})),
		[t],
	)
}
