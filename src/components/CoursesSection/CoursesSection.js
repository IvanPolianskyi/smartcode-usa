'use client'

import React, { useMemo, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { ClipboardCheck, PlayCircle, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import styles from './CoursesSection.module.css'

const LESSON_IDS = [0, 1, 2]
const EMBED_URLS = [
	'https://www.youtube-nocookie.com/embed/ZwW5QCe8Q7M?rel=0&modestbranding=1',
	'https://www.youtube-nocookie.com/embed/a16fFHx2QDc?rel=0&modestbranding=1',
	'https://www.youtube-nocookie.com/embed/89-nuLW2aJ0?rel=0&modestbranding=1',
]

const CoursesSection = () => {
	const t = useTranslations('homeSections.lessons')
	const [loadedVideos, setLoadedVideos] = useState(() => new Set())

	const lessonExamples = useMemo(
		() =>
			LESSON_IDS.map((id, index) => ({
				id: id + 1,
				title: t(`examples.${id}.title`),
				description: t(`examples.${id}.description`),
				embedUrl: EMBED_URLS[index],
			})),
		[t],
	)

	const lessonExamplesWithThumbs = useMemo(
		() =>
			lessonExamples.map((lesson) => {
				const videoId = lesson.embedUrl.split('/embed/')[1]?.split('?')[0]
				return {
					...lesson,
					videoId,
					thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
				}
			}),
		[lessonExamples],
	)

	const handleLoadVideo = (lessonId) => {
		setLoadedVideos((prev) => {
			const next = new Set(prev)
			next.add(lessonId)
			return next
		})
	}

	return (
		<section id='courses' className={styles.section}>
			<div className={styles.container}>
				<div className={styles.heroContent}>
					<div className={styles.badge}>
						<Sparkles size={16} />
						<span>{t('badge')}</span>
					</div>
					<h2 className={styles.title}>
						{t('title')}
						<span className={styles.titleAccent}>{t('titleAccent')}</span>
					</h2>
					<p className={styles.description}>{t('description')}</p>
				</div>

				<div className={styles.lessonExamples}>
					<div className={styles.videoGrid}>
						{lessonExamplesWithThumbs.map((lesson) => (
							<article key={lesson.id} className={styles.videoCard}>
								<div className={styles.videoWrapper}>
									{loadedVideos.has(lesson.id) ? (
										<iframe
											src={`${lesson.embedUrl}&autoplay=1`}
											title={lesson.title}
											loading='lazy'
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
											referrerPolicy='strict-origin-when-cross-origin'
											allowFullScreen
										/>
									) : (
										<button
											type='button'
											className={styles.videoPreviewButton}
											onClick={() => handleLoadVideo(lesson.id)}
											aria-label={t('playVideo', { title: lesson.title })}
										>
											<img
												src={lesson.thumbnailUrl}
												alt={lesson.title}
												loading='lazy'
												decoding='async'
												className={styles.videoPreviewImage}
											/>
											<span className={styles.videoPreviewOverlay}>
												<PlayCircle size={56} />
											</span>
										</button>
									)}
								</div>
								<h3 className={styles.videoTitle}>{lesson.title}</h3>
								<p className={styles.videoDescription}>{lesson.description}</p>
							</article>
						))}
					</div>

					<div className={styles.knowledgeRow}>
						<Link href='/knowledge-test' className={styles.knowledgeButton}>
							<ClipboardCheck className={styles.knowledgeButtonIcon} size={20} aria-hidden />
							<span>{t('knowledgeTest')}</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CoursesSection
