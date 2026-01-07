'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	Code,
	Eye,
	ArrowRight,
	Star,
	Users,
	Rocket,
	ExternalLink,
	Loader2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PhoneModal from '@/components/PhoneModal/PhoneModal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProjectsShowcase.module.css'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const ProjectsShowcase = () => {
	const [featuredProjects, setFeaturedProjects] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [showPhoneModal, setShowPhoneModal] = useState(false)
	const [selectedProject, setSelectedProject] = useState(null)
	const sectionRef = useRef(null)

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
					setError('Failed to load projects')
				}
			} catch (err) {
				console.error('Error fetching featured projects:', err)
				setError('Failed to load projects')
			} finally {
				setLoading(false)
			}
		}

		fetchFeaturedProjects()
	}, [])

	// GSAP animations
	useEffect(() => {
		if (!sectionRef.current || featuredProjects.length === 0) return

		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.animate-up',
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 85%',
						end: 'bottom 15%',
						toggleActions: 'play none none reverse',
					},
				}
			)

			gsap.fromTo(
				'.animate-scale',
				{ scale: 0.8, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.6,
					ease: 'back.out(1.7)',
					stagger: 0.1,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [featuredProjects])

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
			<div className={styles.container} ref={sectionRef}>
				<div className={styles.mainContainer}>
					<div className={styles.header}>
						<h2 className={styles.title}>Проєкти наших учнів</h2>
						<div className={styles.loadingContainer}>
							<Loader2 className={styles.loader} />
							<p>Завантаження проєктів...</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.container} ref={sectionRef}>
				<div className={styles.mainContainer}>
					<div className={styles.header}>
						<h2 className={styles.title}>Проєкти наших учнів</h2>
						<div className={styles.errorContainer}>
							<p>❌ {error}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container} ref={sectionRef}>
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
						<h2 className={`${styles.title} animate-up`}>
							<span className={styles.titleAccent}>Проєкти</span> наших учнів
						</h2>
						<p className={`${styles.subtitle} animate-up`}>
							Подивіться на чудові роботи наших талановитих студентів. 
							Кожен проєкт - це крок до великого майбутнього в IT!
						</p>
					</div>

					<div className={`${styles.stats} animate-up`}>
						<div className={styles.statItem}>
							<Star className={styles.statIcon} />
							<span>Високий рівень</span>
						</div>
						<div className={styles.statItem}>
							<Rocket className={styles.statIcon} />
							<span>Інновації</span>
						</div>
					</div>
				</div>

				{/* Projects Grid */}
				{featuredProjects.length > 0 ? (
					<div className={styles.projectsGrid}>
						{featuredProjects.map((project, index) => (
							<div
								key={project.id}
								className={`${styles.projectCard} animate-scale`}
								style={{ animationDelay: `${index * 0.1}s` }}
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
										<span>Код проєкту</span>
									</div>
									<div className={styles.projectOverlay}>
										<div className={styles.viewButton}>
											<Eye size={16} />
											Переглянути
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
						<p>Перші проєкти з&apos;являться тут!</p>
					</div>
				)}

				{/* CTA Section */}
				<div className={`${styles.ctaSection} animate-up`}>
					<div className={styles.ctaContent}>
						<h3 className={styles.ctaTitle}>
							Хочете побачити більше проєктів?
						</h3>
						<p className={styles.ctaDescription}>
							Перегляньте повну колекцію робіт наших учнів та надихніться їхніми досягненнями
						</p>
						<Link href="/projects" className={styles.ctaButton}>
							<span>Переглянути всі проєкти</span>
							<ArrowRight className={styles.buttonIcon} />
						</Link>
					</div>
					
					<div className={styles.ctaFeatures}>
						<div className={styles.featureItem}>
							<ExternalLink className={styles.featureIcon} />
							<span>Повний код проєктів</span>
						</div>
						<div className={styles.featureItem}>
							<Star className={styles.featureIcon} />
							<span>Найкращі роботи</span>
						</div>
						<div className={styles.featureItem}>
							<Code className={styles.featureIcon} />
							<span>Детальний аналіз</span>
						</div>
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
