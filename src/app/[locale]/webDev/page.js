'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
	Code,
	Monitor,
	Palette,
	Server,
	Users,
	Clock,
	Award,
	Play,
	ChevronRight,
	Download,
	ArrowLeft,
	Layers,
	Wind,
	MousePointerClick,
	ShieldCheck,
	Rocket,
	Sparkles,
	Terminal,
	Globe,
	Zap,
	Heart,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { trackCourseLanding } from '@/lib/metaPixel'
import styles from './WebCoursePage.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MODULE_META = [
	{ Icon: Layers, color: 'iconPink', gradient: 'from-pink-400 to-purple-400' },
	{ Icon: MousePointerClick, color: 'iconPurple', gradient: 'from-purple-400 to-blue-400' },
	{ Icon: Wind, color: 'iconBlue', gradient: 'from-blue-400 to-cyan-400' },
]
const PROJECT_META = [
	{ icon: '🧑‍🎨', fillClass: 'fillEasy' },
	{ icon: '🤖', fillClass: 'fillMedium' },
	{ icon: '💬', fillClass: 'fillHard' },
]
const FEATURE_ICONS = [Palette, Zap, Globe]

const WebCoursePage = () => {
	const t = useTranslations('coursePages.webDev')
	const tc = useTranslations('coursePages.common')
	const [stats, setStats] = useState({ 
		linesOfCode: 0, 
		projects: 0,
		students: 0
	})
	const [typedText, setTypedText] = useState('')
	const [hoveredModule, setHoveredModule] = useState(null)
	const [hoveredProject, setHoveredProject] = useState(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	
	useEffect(() => {
		trackCourseLanding('webdev')
	}, [])

	const mainRef = useRef(null)
	const heroRef = useRef(null)
	const modulesRef = useRef(null)
	const projectsRef = useRef(null)

	// Code string for typing animation (moved outside to avoid dependency warning)
	const codeString = useMemo(() => `const createAwesomeWebsite = () => {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React'];
  const creativity = Infinity;
  
  return buildFuture(skills, creativity);
}`, [])

	// Typing animation
	useEffect(() => {
		let index = 0
		const timer = setInterval(() => {
			if (index <= codeString.length) {
				setTypedText(codeString.slice(0, index))
				index++
			} else {
				clearInterval(timer)
			}
		}, 30)
		return () => clearInterval(timer)
	}, [codeString])

	// Mouse tracking for parallax
	useEffect(() => {
		const handleMouseMove = (e) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 2
			const y = (e.clientY / window.innerHeight - 0.5) * 2
			setMousePosition({ x, y })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	// Animated counters
	useEffect(() => {
		const animateValue = (start, end, duration, key) => {
			const range = end - start
			const startTime = Date.now()
			
			const timer = setInterval(() => {
				const elapsed = Date.now() - startTime
				const progress = Math.min(elapsed / duration, 1)
				const easeOutQuart = 1 - Math.pow(1 - progress, 4)
				const current = Math.floor(start + range * easeOutQuart)
				
				setStats(prev => ({ ...prev, [key]: current }))
				
				if (progress >= 1) {
					clearInterval(timer)
				}
			}, 16)
			
			return timer
		}

		const timers = [
			animateValue(0, 99999, 3000, 'linesOfCode'),
			animateValue(0, 200, 2500, 'projects'),
			animateValue(0, 1000, 2800, 'students')
		]

		return () => timers.forEach(timer => clearInterval(timer))
	}, [])

    // GSAP ScrollTrigger animations
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero section animations
			gsap.fromTo(
				`.${styles.heroLeft}`,
				{ opacity: 0, x: -50 },
				{
					opacity: 1,
					x: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top 80%',
					}
				}
			)

			gsap.fromTo(
				`.${styles.browserWindow}`,
				{ opacity: 0, x: 50, rotateY: -30 },
				{
					opacity: 1,
					x: 0,
					rotateY: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top 80%',
					}
				}
			)

			// Module cards stagger animation
			gsap.fromTo(
				`.${styles.moduleCard}`,
				{ opacity: 0, y: 50, scale: 0.9 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: modulesRef.current,
						start: 'top 80%',
					}
				}
			)

			// Project cards animation
			gsap.fromTo(
				`.${styles.projectCard}`,
				{ opacity: 0, scale: 0.8, rotateY: -20 },
				{
					opacity: 1,
					scale: 1,
					rotateY: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: projectsRef.current,
						start: 'top 80%',
					}
				}
			)

			// Parallax effect for floating elements
			gsap.to(`.${styles.floatingTag}`, {
				scrollTrigger: {
					scrub: 1
				},
				y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
				ease: 'none'
			})
		}, mainRef)

		return () => ctx.revert()
    }, [])

    const handleCtaClick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new Event('openContactModal'))
    }

	const modules = useMemo(() => {
		const items = t.raw('modules.items')
		return items.map((m, index) => ({ ...m, ...MODULE_META[index] }))
	}, [t])

	const projects = useMemo(() => {
		const items = t.raw('projects.items')
		return items.map((p, index) => ({ ...p, ...PROJECT_META[index] }))
	}, [t])

	const features = useMemo(() => {
		const items = t.raw('features.items')
		const emojis = ['🎨', '⚡', '🌐']
		const colors = ['featurePink', 'featurePurple', 'featureBlue']
		return items.map((f, index) => ({
			...f,
			Icon: FEATURE_ICONS[index],
			emoji: emojis[index],
			color: colors[index],
		}))
	}, [t])

	const whatYouLearn = useMemo(() => t.raw('sections.whatYouLearnItems'), [t])
	const courseStats = useMemo(() => t.raw('sections.stats'), [t])

	return (
		<div className={styles.container} ref={mainRef}>
			{/* Animated Background */}
			<div className={styles.backgroundElements}>
				{/* Floating code tags */}
				<span className={`${styles.floatingTag} ${styles.tag1}`} data-speed="0.5">&lt;div&gt;</span>
				<span className={`${styles.floatingTag} ${styles.tag2}`} data-speed="0.3">{'{ }'}</span>
				<span className={`${styles.floatingTag} ${styles.tag3}`} data-speed="0.7">&lt;/body&gt;</span>
				<span className={`${styles.floatingTag} ${styles.tag4}`} data-speed="0.4">React</span>
				<span className={`${styles.floatingTag} ${styles.tag5}`} data-speed="0.6">&lt;h1&gt;</span>
				<span className={`${styles.floatingTag} ${styles.tag6}`} data-speed="0.2">async</span>
				<span className={`${styles.floatingTag} ${styles.tag7}`} data-speed="0.8">=&gt;</span>
				<span className={`${styles.floatingTag} ${styles.tag8}`} data-speed="0.5">const</span>
				
				{/* Gradient orbs with parallax */}
				<div 
					className={`${styles.gradientOrb} ${styles.orb1}`}
					style={{
						transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
					}}
				/>
				<div 
					className={`${styles.gradientOrb} ${styles.orb2}`}
					style={{
						transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
					}}
				/>
			</div>

			{/* Hero Section */}
			<section className={styles.heroSection} ref={heroRef}>
				<div className={styles.heroContent}>
					<div className={styles.heroLeft}>
						<div className={styles.heroBadge}>
							<Sparkles size={16} />
							<span>{t('hero.badge')}</span>
						</div>
						
						<h1 className={styles.heroTitle}>
							<span className={styles.gradientText}>{t('hero.titleLine1')}</span>
							<br />
							{t('hero.titleLine2')}
						</h1>
						
						<p className={styles.heroDescription}>{t('hero.description')}</p>
						
                        <div className={styles.ctaButtons}>
                            <Link href="/#Contactform" className={styles.primaryButton} onClick={handleCtaClick} scroll={false}>
                                <Play size={20} />
                                {t('cta.startLearning')}
                            </Link>
                        </div>
						
					</div>
					
					<div className={styles.heroRight}>
						<div className={styles.browserWindow}>
							<div className={styles.browserHeader}>
								<div className={styles.browserDots}>
									<span className={`${styles.browserDot} ${styles.dotRed}`}></span>
									<span className={`${styles.browserDot} ${styles.dotYellow}`}></span>
									<span className={`${styles.browserDot} ${styles.dotGreen}`}></span>
								</div>
								<div className={styles.browserUrl}>localhost:3000</div>
							</div>
							<div className={styles.browserBody}>
								<pre className={styles.codeBlock}>
									<code>{typedText}</code>
									<span className={styles.cursor}></span>
								</pre>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Modules Section */}
			<section className={styles.modulesSection} ref={modulesRef}>
				<header className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>{t('modules.title')}</h2>
					<p className={styles.sectionSubtitle}>{t('modules.subtitle')}</p>
				</header>
				
				<div className={styles.modulesGrid}>
					{modules.map((module, index) => (
						<div 
							key={index} 
							className={styles.moduleCard}
							onMouseEnter={() => setHoveredModule(index)}
							onMouseLeave={() => setHoveredModule(null)}
						>
							<div className={`${styles.moduleIcon} ${styles[module.color]}`}>
								<module.Icon size={28} />
							</div>
							
							<div className={styles.moduleHeader}>
								<h3 className={styles.moduleTitle}>{module.title}</h3>
								<span className={styles.moduleBadge}>{tc('moduleBadge', { number: index + 1 })}</span>
							</div>
							
							<p className={styles.moduleDuration}>{module.duration}</p>
							
							<ul className={styles.moduleTopics}>
								{module.topics.map((topic, i) => (
									<li 
										key={i} 
										className={styles.moduleTopic}
										style={{
											transitionDelay: `${i * 50}ms`
										}}
									>
										{topic}
									</li>
								))}
							</ul>
							
							{hoveredModule === index && (
								<div className={styles.moduleHoverEffect}>
									<Sparkles size={20} />
								</div>
							)}
						</div>
					))}
				</div>
			</section>

			{/* Projects Section */}
			<section className={styles.projectsSection} ref={projectsRef}>
				<header className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
					<p className={styles.sectionSubtitle}>{t('projects.subtitle')}</p>
				</header>
				
				<div className={styles.projectsGrid}>
					{projects.map((project, index) => (
						<div 
							key={index} 
							className={styles.projectCard}
							onMouseEnter={() => setHoveredProject(index)}
							onMouseLeave={() => setHoveredProject(null)}
						>
							<div className={styles.projectIcon}>{project.icon}</div>
							
							<h3 className={styles.projectTitle}>{project.name}</h3>
							
							<div className={styles.difficultyBar}>
								<span className={styles.difficultyLabel}>
									{tc('difficultyPercent', { percent: project.difficulty })}
								</span>
								<div className={styles.difficultyProgress}>
									<div 
										className={`${styles.difficultyFill} ${styles[project.fillClass]}`}
										style={{ 
											width: hoveredProject === index ? `${project.difficulty}%` : '0%',
											transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
										}}
									/>
								</div>
							</div>
							
							<p className={styles.projectDescription}>{project.description}</p>
							
							<div className={styles.projectFooter}>
								<div className={styles.projectTime}>
									<Clock size={16} />
									<span>{project.time}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Features Section */}
			<section className={styles.featuresSection}>
				<header className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>{t('features.title')}</h2>
					<p className={styles.sectionSubtitle}>{t('features.subtitle')}</p>
				</header>
				
				<div className={styles.featuresGrid}>
					{features.map((feature, index) => (
						<div key={index} className={styles.featureCard}>
							<div className={styles.featureEmoji}>{feature.emoji}</div>
							<div className={styles.featureIcon}>
								<feature.Icon size={32} />
							</div>
							<h3 className={styles.featureTitle}>{feature.title}</h3>
							<p className={styles.featureDescription}>{feature.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Course Section - WebDev Style */}
			<section className={styles.courseSection}>
				<div className={styles.courseSectionBackground}>
					<div className={styles.courseGradientOrb1}></div>
					<div className={styles.courseGradientOrb2}></div>
				</div>
				
				<div className={styles.courseSectionContainer}>
					<div className={styles.courseSectionBadge}>
						<Code size={20} />
						<span>{t('sections.courseBadge')}</span>
					</div>
					
					<h2 className={styles.courseSectionTitle}>{t('sections.courseTitle')}</h2>
					
					<p className={styles.courseSectionDescription}>{t('sections.courseDescription')}</p>

					<div className={styles.courseSectionStats}>
						{[Layers, Clock, Award, Users].map((Icon, index) => (
							<div key={index} className={styles.courseStat}>
								<div className={styles.courseStatIcon}>
									<Icon size={24} />
								</div>
								<div className={styles.courseStatContent}>
									<div className={styles.courseStatValue}>{courseStats[index]?.value}</div>
									<div className={styles.courseStatLabel}>{courseStats[index]?.label}</div>
								</div>
							</div>
						))}
					</div>

					<div className={styles.courseSectionModules}>
						<h3 className={styles.courseSectionModulesTitle}>{t('sections.whatYouLearnTitle')}</h3>
						<div className={styles.courseSectionModulesList}>
							{[Monitor, Code, Zap, Server, Globe].map((Icon, index) => (
								<div key={index} className={styles.courseModuleItem}>
									<Icon size={20} />
									<span>{whatYouLearn[index]}</span>
								</div>
							))}
						</div>
					</div>
					
					<div className={styles.courseSectionButtons}>
						<Link href="/courses/web-development" className={styles.coursePrimaryButton}>
							<Rocket size={20} />
							{t('cta.goToCourse')}
						</Link>
						<Link href="/#Contactform" className={styles.courseSecondaryButton} onClick={handleCtaClick} scroll={false}>
							<Sparkles size={20} />
							{t('cta.freeLesson')}
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

export default WebCoursePage