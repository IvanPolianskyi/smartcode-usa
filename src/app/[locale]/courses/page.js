'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import {
	Clock,
	Users,
	Star,
	ChevronRight,
	BookOpen,
	Lock,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getUserProgress } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { useCoursesListData } from '@/hooks/useCoursesListData'
import styles from './CoursesPage.module.css'

export default function CoursesPage() {
	const { courses } = useCoursesListData()
	const t = useTranslations('pages.coursesList')
	const { user, loading: sessionLoading } = useAuthSession()
	const [progressData, setProgressData] = useState({})
	const [progressLoading, setProgressLoading] = useState(true)

	useEffect(() => {
		if (sessionLoading) return

		const loadProgress = async () => {
			setProgressLoading(true)
			try {
				if (user?.enrolledCourses?.length) {
					const progressPromises = user.enrolledCourses.map((courseId) =>
						getUserProgress(courseId).then((progress) => ({ courseId, progress }))
					)
					const progressResults = await Promise.all(progressPromises)
					const progressMap = {}
					progressResults.forEach(({ courseId, progress }) => {
						progressMap[courseId] = progress
					})
					setProgressData(progressMap)
				} else {
					setProgressData({})
				}
			} catch (error) {
				console.error('Error loading progress:', error)
				setProgressData({})
			} finally {
				setProgressLoading(false)
			}
		}

		loadProgress()
	}, [sessionLoading, user])

	const loading = sessionLoading || progressLoading

	return (
		<div className={styles.container}>
			<section className={styles.heroSection}>
				<div className={styles.heroContent}>
					<div className={styles.breadcrumb}>
						<Link href="/">{t('breadcrumb.home')}</Link>
						<ChevronRight size={16} />
						<span>{t('breadcrumb.courses')}</span>
					</div>
					<h1 className={styles.heroTitle}>{t('hero.title')}</h1>
					<p className={styles.heroDescription}>{t('hero.description')}</p>
				</div>
			</section>

			<section className={styles.coursesSection}>
				<div className={styles.coursesGrid}>
					{courses.map((course) => {
						const progress = progressData[course.courseId]
						const isEnrolled = !!progress
						const progressPercent = progress?.overallProgress || 0
						const lmsAvailable = [
							'python-developer-zero-to-junior',
							'roblox-studio',
							'scratch',
							'minecraft-education',
						].includes(course.courseId)
						const isLocked = !lmsAvailable

						return (
							<div
								key={course.courseId}
								className={`${styles.courseCard} ${isLocked ? styles.lockedCard : ''}`}
							>
								<div className={styles.badgeContainer}>
									{course.popular && (
										<div className={styles.popularBadge}>
											<Star size={14} />
											<span>{t('badges.popular')}</span>
										</div>
									)}
									{isLocked && (
										<div className={styles.lockedBadge}>
											<Lock size={14} />
											<span>{t('badges.comingSoon')}</span>
										</div>
									)}
								</div>

								<div className={styles.courseHeader}>
									<div
										className={styles.courseIcon}
										style={{ backgroundColor: `${course.color}15`, color: course.color }}
									>
										{course.icon}
									</div>
									<div className={styles.courseTitleSection}>
										<h2 className={styles.courseTitle}>{course.title}</h2>
										<div className={styles.courseMeta}>
											<div className={styles.rating}>
												<Star size={14} fill="#fbbf24" color="#fbbf24" />
												<span>{course.rating}</span>
											</div>
										</div>
									</div>
								</div>

								<p className={styles.courseDescription}>{course.shortDescription}</p>

								<div className={styles.courseStats}>
									<div className={styles.stat}>
										<Clock size={16} />
										<span>{t('stats.weeks', { count: course.duration.weeks })}</span>
									</div>
									<div className={styles.stat}>
										<BookOpen size={16} />
										<span>{t('stats.lessons', { count: course.duration.lessons })}</span>
									</div>
									<div className={styles.stat}>
										<Users size={16} />
										<span>{t('stats.hours', { count: course.duration.hours })}</span>
									</div>
								</div>

								{isEnrolled && (
									<div className={styles.progressSection}>
										<div className={styles.progressHeader}>
											<span>{t('progress')}</span>
											<span className={styles.progressPercent}>{progressPercent}%</span>
										</div>
										<div className={styles.progressBar}>
											<div
												className={styles.progressFill}
												style={{ width: `${progressPercent}%`, backgroundColor: course.color }}
											/>
										</div>
									</div>
								)}

								<div className={styles.skillsSection}>
									<h3 className={styles.skillsTitle}>{t('skillsTitle')}</h3>
									<div className={styles.skillsList}>
										{course.skills.slice(0, 4).map((skill, index) => (
											<div key={index} className={styles.skillTag}>
												{skill}
											</div>
										))}
										{course.skills.length > 4 && (
											<div className={styles.skillTag}>
												{t('skillsMore', { count: course.skills.length - 4 })}
											</div>
										)}
									</div>
								</div>

								<div className={styles.courseActions}>
									{isLocked ? (
										course.marketingOnly ? (
											<Link
												href={course.link}
												className={styles.primaryButton}
												style={{ backgroundColor: course.color }}
											>
												{t('actions.learnMore')}
												<ChevronRight size={18} />
											</Link>
										) : (
										<button
											className={styles.lockedButton}
											onClick={(e) => {
												e.preventDefault()
												window.dispatchEvent(new Event('openContactModal'))
											}}
										>
											<Lock size={18} />
											{t('actions.comingSoon')}
										</button>
										)
									) : (
										<>
											<Link
												href={course.courseLink}
												className={styles.primaryButton}
												style={{ backgroundColor: course.color }}
											>
												{isEnrolled ? t('actions.continue') : t('actions.learnMore')}
												<ChevronRight size={18} />
											</Link>
											{isEnrolled && (
												<Link href={course.courseLink} className={styles.secondaryButton}>
													{t('actions.goToCourse')}
												</Link>
											)}
										</>
									)}
								</div>
							</div>
						)
					})}
				</div>
			</section>
		</div>
	)
}
