'use client'
import React, { useState, useEffect } from 'react'
import { Code, Eye, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import PhoneModal from '@/components/PhoneModal/PhoneModal'
import styles from './ProjectsPage.module.css'

const ProjectsPage = () => {
	const t = useTranslations('pages.projectsPage')
	const [selectedProject, setSelectedProject] = useState(null)
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [showPhoneModal, setShowPhoneModal] = useState(false)

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch('/api/projects')
				const data = await response.json()

				if (data.success) {
					setProjects(data.projects)
				} else {
					setError(t('errorLoad'))
				}
			} catch (err) {
				console.error('Error fetching projects:', err)
				setError(t('errorLoad'))
			} finally {
				setLoading(false)
			}
		}

		fetchProjects()
	}, [t])

	const openProject = (project) => {
		setSelectedProject(project)
		setShowPhoneModal(true)
	}

	const closeModal = () => {
		setSelectedProject(null)
		setShowPhoneModal(false)
	}

	const handlePhoneModalSuccess = () => {}

	if (loading) {
		return (
			<div className={styles.container}>
				<section className={styles.heroSection}>
					<div className={styles.heroContent}>
						<h1 className={styles.heroTitle}>
							<span className={styles.gradientText}>{t('hero.titleAccent')}</span>{' '}
							{t('hero.titleRest')}
						</h1>
						<div className={styles.loadingContainer}>
							<Loader2 className={styles.loader} />
							<p>{t('loading')}</p>
						</div>
					</div>
				</section>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.container}>
				<section className={styles.heroSection}>
					<div className={styles.heroContent}>
						<h1 className={styles.heroTitle}>
							<span className={styles.gradientText}>{t('hero.titleAccent')}</span>{' '}
							{t('hero.titleRest')}
						</h1>
						<div className={styles.errorContainer}>
							<p>❌ {error}</p>
							<button onClick={() => window.location.reload()} className={styles.retryButton}>
								{t('retry')}
							</button>
						</div>
					</div>
				</section>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<section className={styles.heroSection}>
				<div className={styles.heroContent}>
					<h1 className={styles.heroTitle}>
						<span className={styles.gradientText}>{t('hero.titleAccent')}</span>{' '}
						{t('hero.titleRest')}
					</h1>
					<p className={styles.heroDescription}>{t('hero.description')}</p>
					<p className={styles.heroDescription}>{t('hero.tiktok')}</p>
				</div>
			</section>

			<section className={styles.projectsSection}>
				{projects.length === 0 ? (
					<div className={styles.emptyState}>
						<p>📝 {t('empty')}</p>
					</div>
				) : (
					<div className={styles.projectsGrid}>
						{projects.map((project) => (
							<div
								key={project.id}
								className={styles.projectCard}
								onClick={() => openProject(project)}
							>
								<div className={styles.projectImageContainer}>
									{project.image && project.image !== '/projects/default-project.svg' ? (
										<Image
											src={project.image}
											alt={project.title}
											fill
											className={styles.projectImage}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											onError={(e) => {
												console.error('Image load error:', project.image, e)
												e.target.style.display = 'none'
												e.target.nextSibling.style.display = 'flex'
											}}
										/>
									) : null}
									<div
										className={styles.projectImagePlaceholder}
										style={{
											display:
												project.image && project.image !== '/projects/default-project.svg'
													? 'none'
													: 'flex',
										}}
									>
										<Code size={48} />
										<span>{t('codePlaceholder')}</span>
									</div>
									<div className={styles.projectOverlay}>
										<div className={styles.viewButton}>
											<Eye size={20} />
											{t('viewCode')}
										</div>
									</div>
								</div>

								<div className={styles.projectContent}>
									<h3 className={styles.projectTitle}>{project.title}</h3>
									<p className={styles.projectDescription}>{project.description}</p>
								</div>
							</div>
						))}
					</div>
				)}
			</section>

			<PhoneModal
				isOpen={showPhoneModal}
				onClose={closeModal}
				project={selectedProject}
				onSuccess={handlePhoneModalSuccess}
			/>
		</div>
	)
}

export default ProjectsPage
