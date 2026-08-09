'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
	Blocks,
	BookOpen,
	Box,
	ChevronRight,
	Clock,
	Code2,
	Gamepad2,
	GraduationCap,
	Layers,
	Puzzle,
	Rocket,
	Sparkles,
	Users,
	Wand2,
} from 'lucide-react'
import { trackCourseLanding } from '@/lib/metaPixel'
import styles from './SubjectCourseLanding.module.css'

const MODULE_ICONS = [BookOpen, Puzzle, Gamepad2, Rocket]
const FEATURE_ICONS = [Users, GraduationCap, Wand2, Sparkles]
const PROJECT_ICONS = ['🎬', '🗺️', '🕹️', '🏆']

function openTrial(e, courseLabel) {
	e.preventDefault()
	window.dispatchEvent(
		new CustomEvent('openContactModal', {
			detail: { course: courseLabel },
		})
	)
}

/**
 * Shared marketing landing for description-only courses (Scratch, Minecraft Education).
 */
export default function SubjectCourseLanding({
	courseKey,
	pixelKey,
	theme = 'scratch',
	leadCourseLabel = '',
}) {
	const t = useTranslations(`coursePages.${courseKey}`)
	const tc = useTranslations('coursePages.common')
	const [isLoaded, setIsLoaded] = useState(false)
	const [visibleSections, setVisibleSections] = useState([])

	const courseLabel =
		leadCourseLabel ||
		(courseKey === 'minecraft' ? 'Minecraft Education' : 'Scratch')

	const getRawArray = (key) => {
		const value = t.raw(key)
		return Array.isArray(value) ? value : []
	}

	const modules = useMemo(() => {
		const items = getRawArray('modules.items')
		return items.map((m, index) => ({
			...m,
			Icon: MODULE_ICONS[index % MODULE_ICONS.length],
		}))
	}, [t])

	const stats = useMemo(() => getRawArray('stats.items'), [t])

	const projects = useMemo(() => {
		const items = getRawArray('projects.items')
		return items.map((p, index) => ({
			...p,
			icon: PROJECT_ICONS[index % PROJECT_ICONS.length],
		}))
	}, [t])

	const features = useMemo(() => {
		const items = getRawArray('features.items')
		return items.map((f, index) => ({
			...f,
			Icon: FEATURE_ICONS[index % FEATURE_ICONS.length],
		}))
	}, [t])

	useEffect(() => {
		trackCourseLanding(pixelKey)
		setIsLoaded(true)

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisibleSections((prev) =>
							prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]
						)
					}
				})
			},
			{ threshold: 0.12 }
		)

		const sections = document.querySelectorAll('[data-scroll-section]')
		sections.forEach((section) => observer.observe(section))
		return () => observer.disconnect()
	}, [pixelKey])

	return (
		<div className={`${styles.page} ${styles[theme]}`}>
			<section className={styles.hero} data-scroll-section id="hero">
				<div className={styles.heroInner}>
					<h1 className={`${styles.title} ${isLoaded ? styles.visible : ''}`}>
						<span className={styles.titleLine}>{t('hero.titleLine1')}</span>
						<span className={styles.titleAccent}>{t('hero.titleLine2')}</span>
					</h1>
					<p className={`${styles.description} ${isLoaded ? styles.visible : ''}`}>
						{t('hero.description')}
					</p>

					{stats.length > 0 && (
						<div className={`${styles.statsRow} ${isLoaded ? styles.visible : ''}`}>
							{stats.map((stat, index) => (
								<div key={index} className={styles.statChip}>
									<span className={styles.statNumber}>{stat.number}</span>
									<span className={styles.statLabel}>{stat.label}</span>
								</div>
							))}
						</div>
					)}

					<div className={`${styles.ctaRow} ${isLoaded ? styles.visible : ''}`}>
						<Link
							href="/#Contactform"
							className={styles.primaryBtn}
							onClick={(e) => openTrial(e, courseLabel)}
							scroll={false}
						>
							{t('hero.freeLesson')}
							<ChevronRight className={styles.btnIcon} />
						</Link>
						<Link href="/#our-courses" className={styles.secondaryBtn} scroll={false}>
							Інші предмети
						</Link>
					</div>
				</div>
				<div className={styles.heroDecor} aria-hidden="true">
					{theme === 'scratch' ? (
						<Blocks className={styles.decorIcon} />
					) : (
						<Box className={styles.decorIcon} />
					)}
					<Code2 className={styles.decorIconSmall} />
					<Layers className={styles.decorIconSmall2} />
				</div>
			</section>

			<section
				className={styles.section}
				id="modules"
				data-scroll-section
			>
				<h2
					className={`${styles.sectionTitle} ${
						visibleSections.includes('modules') ? styles.visible : ''
					}`}
				>
					{t('modules.title')}
				</h2>
				<div className={styles.modulesGrid}>
					{modules.map((module, index) => {
						const Icon = module.Icon
						return (
							<article
								key={module.phase || index}
								className={`${styles.moduleCard} ${
									visibleSections.includes('modules') ? styles.visible : ''
								}`}
								style={{ animationDelay: `${index * 80}ms` }}
							>
								<div className={styles.moduleTop}>
									<span className={styles.modulePhase}>
										{tc('moduleBadge', { number: module.phase || index + 1 })}
									</span>
									<Icon className={styles.moduleIcon} />
								</div>
								<h3 className={styles.moduleTitle}>{module.title}</h3>
								{module.lessons ? (
									<p className={styles.moduleMeta}>{module.lessons}</p>
								) : null}
								<ul className={styles.topicList}>
									{(module.topics || []).map((topic, i) => (
										<li key={i}>{topic}</li>
									))}
								</ul>
							</article>
						)
					})}
				</div>
			</section>

			<section
				className={styles.section}
				id="projects"
				data-scroll-section
			>
				<h2
					className={`${styles.sectionTitle} ${
						visibleSections.includes('projects') ? styles.visible : ''
					}`}
				>
					{t('projects.title')}
				</h2>
				<div className={styles.projectsGrid}>
					{projects.map((project, index) => (
						<article
							key={project.name}
							className={`${styles.projectCard} ${
								visibleSections.includes('projects') ? styles.visible : ''
							}`}
							style={{ animationDelay: `${index * 90}ms` }}
						>
							<div className={styles.projectHeader}>
								<span className={styles.projectEmoji}>{project.icon}</span>
								<span className={styles.projectXp}>
									{tc('xp', { points: project.points })}
								</span>
							</div>
							<h3 className={styles.projectTitle}>{project.name}</h3>
							<span className={styles.difficulty}>{project.difficulty}</span>
							<p className={styles.projectDesc}>{project.description}</p>
							<div className={styles.projectTime}>
								<Clock className={styles.timeIcon} />
								{project.time}
							</div>
						</article>
					))}
				</div>
			</section>

			<section
				className={styles.section}
				id="features"
				data-scroll-section
			>
				<h2
					className={`${styles.sectionTitle} ${
						visibleSections.includes('features') ? styles.visible : ''
					}`}
				>
					{t('features.title')}
				</h2>
				<div className={styles.featuresGrid}>
					{features.map((feature, index) => {
						const Icon = feature.Icon
						return (
							<article
								key={feature.title}
								className={`${styles.featureCard} ${
									visibleSections.includes('features') ? styles.visible : ''
								}`}
								style={{ animationDelay: `${index * 80}ms` }}
							>
								<Icon className={styles.featureIcon} />
								<h3 className={styles.featureTitle}>{feature.title}</h3>
								<p className={styles.featureDesc}>{feature.desc}</p>
							</article>
						)
					})}
				</div>
			</section>

			<section className={styles.ctaBand}>
				<div className={styles.ctaBandInner}>
					<h2 className={styles.ctaTitle}>{t('cta.readyTitle')}</h2>
					<p className={styles.ctaText}>{t('cta.enrollText')}</p>
					<Link
						href="/#Contactform"
						className={styles.primaryBtn}
						onClick={(e) => openTrial(e, courseLabel)}
						scroll={false}
					>
						<Rocket className={styles.btnIcon} />
						{t('cta.enroll')}
					</Link>
				</div>
			</section>
		</div>
	)
}
