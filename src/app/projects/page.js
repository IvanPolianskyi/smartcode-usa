'use client'
import React, { useState, useEffect } from 'react'
import {
    Code,
    Eye,
    Heart,
    User,
    Calendar,
    Tag,
    Loader2
} from 'lucide-react'
import Image from 'next/image'
import styles from './ProjectsPage.module.css'

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects')
                const data = await response.json()
                
                if (data.success) {
                    setProjects(data.projects)
                } else {
                    setError('Failed to load projects')
                }
            } catch (err) {
                console.error('Error fetching projects:', err)
                setError('Failed to load projects')
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const openProject = (project) => {
        setSelectedProject(project)
    }

    const closeModal = () => {
        setSelectedProject(null)
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.gradientText}>Проєкти</span> нашої школи з учнями
                        </h1>
                        <div className={styles.loadingContainer}>
                            <Loader2 className={styles.loader} />
                            <p>Завантаження проєктів...</p>
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
                            <span className={styles.gradientText}>Проєкти</span> нашої школи з учнями
                        </h1>
                        <div className={styles.errorContainer}>
                            <p>❌ {error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className={styles.retryButton}
                            >
                                Спробувати ще раз
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {/* Hero секція */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.gradientText}>Проєкти</span> нашої школи з учнями
                    </h1>
                    <p className={styles.heroDescription}>
                        Подивіться на чудові роботи наших талановитих студентів. 
                        Кожен проєкт - це крок до великого майбутнього в IT!
                    </p>
                    <p className={styles.heroDescription}>

                    Відео з  роботою цих проєктів шукай в нашому TikTok:
@smartcode_academy
                    </p>
                </div>
            </section>

            {/* Сітка проєктів */}
            <section className={styles.projectsSection}>
                {projects.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>📝 Поки що немає проєктів. Перші проєкти з&apos;являться тут!</p>
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
                                        <Code size={48} />
                                        <span>Код проєкту</span>
                                    </div>
                                    <div className={styles.projectOverlay}>
                                        <div className={styles.viewButton}>
                                            <Eye size={20} />
                                            Переглянути код
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
                )}
            </section>

            {/* Модальне вікно з кодом */}
            {selectedProject && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <div>
                                </div>
                            <button 
                                className={styles.closeButton}
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className={styles.modalBody}>
                            
                            {/* Code Section */}
                            <div className={styles.codeContainer}>
                                <div className={styles.codeHeader}>
                                    <span>{selectedProject.title}</span>
                                    <button 
                                        className={styles.copyButton}
                                        onClick={() => navigator.clipboard.writeText(selectedProject.code)}
                                    >
                                        Копіювати
                                    </button>
                                </div>
                                <pre className={styles.codeBlock}>
                                    <code>{selectedProject.code}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectsPage