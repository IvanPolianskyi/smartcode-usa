'use client'
import React, { useState, useEffect } from 'react'
import {
	Code,
	Eye,
	ArrowRight,
	Star,
	Users,
	ExternalLink,
	Loader2
} from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import PhoneModal from '@/components/PhoneModal/PhoneModal'
import styles from './ProjectsShowcase.module.css'

const ProjectsShowcase = () => {
	const t = useTranslations('pages.projects')
	const [featuredProjects, setFeaturedProjects] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [showPhoneModal, setShowPhoneModal] = useState(false)
	const [selectedProject, setSelectedProject] = useState(null)
	// Fetch featured projects
	useEffect(() => {
		const fetchFeaturedProjects = async () => {
			try {
				const response = await fetch('/api/projects')
				const data = await response.json()
				
				if (data.success) {
					// Take only the first 3 projects as featured
					setFeaturedProjects(data.projects.slice(2, 5))
				} else {
					setError(t('errorLoad'))
				}
			} catch (err) {
				console.error('Error fetching featured projects:', err)
				setError(t('errorLoad'))
			} finally {
				setLoading(false)
			}
		}

		fetchFeaturedProjects()
	}, [t])

	const openProject = (project) => {
		setSelectedProject(project)
		setShowPhoneModal(true)
	}

	const closeModal = () => {
		setSelectedProject(null)
		setShowPhoneModal(false)
	}

	const handlePhoneModalSuccess = () => {
		// Phone collected successfully - can add analytics tracking here if needed
	}

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.mainContainer}>
					<div className={styles.header}>
						<h2 className={styles.title}>{t('title')}</h2>
						<div className={styles.loadingContainer}>
							<Loader2 className={styles.loader} />
							<p>{t('loading')}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.container}>
				<div className={styles.mainContainer}>
					<div className={styles.header}>
						<h2 className={styles.title}>
							<span className={styles.titleAccent}>{t('titleAccent')}</span> {t('titleSuffix')}
						</h2>
						<div className={styles.errorContainer}>
							<p>❌ {error}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			{/* Background elements */}
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
				<div className={`${styles.floatingElement} ${styles.element3}`}></div>
			</div>

			<div className={styles.mainContainer}>
				{/* Header */}
				<div className={styles.header}>
					<div className={styles.titleSection}>
						<h2 className={styles.title}>
							<span className={styles.titleAccent}>{t('titleAccent')}</span> {t('titleSuffix')}
						</h2>
						<p className={styles.subtitle}>{t('subtitle')}</p>
					</div>
				</div>

				{/* Projects Grid */}
				{featuredProjects.length > 0 ? (
					<div className={styles.projectsGrid}>
						{featuredProjects.map((project, index) => (
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
												console.error('Image load error:', project.image, e);
												e.target.style.display = 'none';
												e.target.nextSibling.style.display = 'flex';
											}}
										/>
									) : null}
									<div 
										className={styles.projectImagePlaceholder}
										style={{ display: project.image && project.image !== '/projects/default-project.svg' ? 'none' : 'flex' }}
									>
										<Code size={32} />
										<span>{t('codePlaceholder')}</span>
									</div>
									<div className={styles.projectOverlay}>
										<div className={styles.viewButton}>
											<Eye size={16} />
											{t('view')}
										</div>
									</div>
								</div>

								<div className={styles.projectContent}>
									<h3 className={styles.projectTitle}>{project.title}</h3>
									<p className={styles.projectDescription}>
										{project.description}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className={styles.emptyState}>
						<Code size={48} />
						<p>{t('empty')}</p>
					</div>
				)}

				{/* CTA Section */}
				<div className={styles.ctaSection}>
					<div className={styles.ctaContent}>
						<h3 className={styles.ctaTitle}>{t('cta.title')}</h3>
						<p className={styles.ctaDescription}>{t('cta.description')}</p>
						<Link href="/projects" className={styles.ctaButton}>
							<span>{t('cta.button')}</span>
							<ArrowRight className={styles.buttonIcon} />
						</Link>
					</div>
					
					
				</div>

				{/* Phone Modal */}
				<PhoneModal
					isOpen={showPhoneModal}
					onClose={closeModal}
					project={selectedProject}
					onSuccess={handlePhoneModalSuccess}
				/>
			</div>
		</div>
	)
}

export default ProjectsShowcase
