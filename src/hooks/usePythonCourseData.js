'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import {
	Cpu,
	Brain,
	Globe,
	Sparkles,
	Terminal,
	Database,
	Users,
	Clock,
	Award,
	Target,
} from 'lucide-react'

const MODULE_ICONS = [
	<Cpu className='w-6 h-6' key='cpu' />,
	<Brain className='w-6 h-6' key='brain' />,
	<Globe className='w-6 h-6' key='globe' />,
	<Sparkles className='w-6 h-6' key='sparkles' />,
]

const PROJECT_ICONS = [
	<Terminal className='w-8 h-8' key='terminal' />,
	<Globe className='w-8 h-8' key='globe' />,
	<Database className='w-8 h-8' key='db' />,
	<Brain className='w-8 h-8' key='brain' />,
]

const FEATURE_ICONS = [
	<Users className='w-8 h-8' key='users' />,
	<Clock className='w-8 h-8' key='clock' />,
	<Award className='w-8 h-8' key='award' />,
	<Target className='w-8 h-8' key='target' />,
]

/** CSS classes in PythonCoursePage.module.css */
const DIFFICULTY_CLASSES = ['новачок', 'середній', 'просунутий', 'експерт']

export function usePythonCourseData() {
	const t = useTranslations('coursePages.python')
	const tc = useTranslations('coursePages.common')

	return useMemo(() => {
		const modulesRaw = t.raw('modules.items')
		const projectsRaw = t.raw('projects.items')
		const featuresRaw = t.raw('features.items')
		const statsRaw = t.raw('stats.items')

		return {
			hero: {
				title: t('hero.title'),
				subtitle: t('hero.subtitle'),
				description: t('hero.description'),
			},
			stats: statsRaw,
			modules: modulesRaw.map((m, index) => ({
				id: index + 1,
				...m,
				icon: MODULE_ICONS[index],
				color: `from-blue-500 to-purple-600`,
			})),
			projects: projectsRaw.map((p, index) => ({
				...p,
				difficultySlug: DIFFICULTY_CLASSES[index],
				icon: PROJECT_ICONS[index],
			})),
			features: featuresRaw.map((f, index) => ({
				...f,
				icon: FEATURE_ICONS[index],
				color: `from-blue-400 to-purple-600`,
			})),
			sections: {
				modulesTitle: tc('modulesTitle'),
				projectsTitle: t('projects.title'),
				featuresTitle: t('features.title'),
				courseDescription: t('sections.courseDescription'),
				startLearning: t('cta.startLearning'),
				selectProject: tc('selectProject'),
			},
		}
	}, [t, tc])
}
