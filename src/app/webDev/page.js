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
import Link from 'next/link'
import { trackCourseLanding } from '@/lib/metaPixel'
import styles from './WebCoursePage.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WebCoursePage = () => {
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

	const modules = [
		{
			title: 'Frontend Основи',
			duration: '4 тижні',
			topics: [
				'HTML5 семантика',
				'CSS Flexbox & Grid',
				'Адаптивна верстка',
				'Основи JavaScript'
			],
			Icon: Layers,
			color: 'iconPink',
			gradient: 'from-pink-400 to-purple-400'
		},
		{
			title: 'Інтерактивний JavaScript',
			duration: '6 тижнів',
			topics: [
				'DOM-маніпуляції',
				'Робота з API (Fetch)',
				'Асинхронність',
				'ES6+ синтаксис'
			],
			Icon: MousePointerClick,
			color: 'iconPurple',
			gradient: 'from-purple-400 to-blue-400'
		},
		{
			title: 'React & Next.js',
			duration: '6 тижнів',
			topics: [
				'Компонентний підхід',
				'State та Props',
				'React Hooks',
				'SSR/SSG з Next.js'
			],
			Icon: Wind,
			color: 'iconBlue',
			gradient: 'from-blue-400 to-cyan-400'
		}
	]

	const projects = [
		{
			name: 'Сайт-портфоліо',
			difficulty: 25,
			time: '2 тижні',
			description: 'Створіть свій перший професійний сайт з анімаціями та адаптивним дизайном.',
			icon: '🧑‍🎨',
			fillClass: 'fillEasy'
		},
		{
			name: 'Todo App',
			difficulty: 50,
			time: '3 тижні',
			description: 'Розробіть розумний планувальник дій із синхронізацією.',
			icon: '🤖',
			fillClass: 'fillMedium'
		},
		{
			name: 'Social Network',
			difficulty: 75,
			time: '5 тижнів',
			description: 'Створіть соціальну мережу з real-time чатом та stories.',
			icon: '💬',
			fillClass: 'fillHard'
		}
	]

	const features = [
		{ 
			Icon: Palette, 
			title: 'UI/UX Design', 
			desc: 'Створюйте красиві та зручні інтерфейси',
			emoji: '🎨'
		},
		{ 
			Icon: Zap, 
			title: 'Performance', 
			desc: 'Оптимізація швидкості завантаження',
			emoji: '⚡'
		},
		{ 
			Icon: Globe, 
			title: 'Web APIs', 
			desc: 'Інтеграція з сучасними сервісами',
			emoji: '🌐'
		}
	]

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
							<span>Новий курс 2025</span>
						</div>
						
						<h1 className={styles.heroTitle}>
							<span className={styles.gradientText}>Web</span>
							<br />
							Development
						</h1>
						
						<p className={styles.heroDescription}>
							Від простої сторінки до складних веб-додатків. 
							Навчись створювати сайти, які вражають та надихають!
						</p>
						
                        <div className={styles.ctaButtons}>
                            <Link href="/#Contactform" className={styles.primaryButton} onClick={handleCtaClick} scroll={false}>
                                <Play size={20} />
                                Почати навчання
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
					<h2 className={styles.sectionTitle}>Програма курсу</h2>
					<p className={styles.sectionSubtitle}>
						3 модулі = твій шлях до професії веб-розробника
					</p>
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
								<span className={styles.moduleBadge}>Модуль {index + 1}</span>
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
					<h2 className={styles.sectionTitle}>Твої майбутні проекти</h2>
					<p className={styles.sectionSubtitle}>
						Від простого до складного - створюй реальні проекти
					</p>
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
									Складність: {project.difficulty}%
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
					<h2 className={styles.sectionTitle}>Що ти отримаєш</h2>
					<p className={styles.sectionSubtitle}>
						Навички, які зроблять тебе професіоналом
					</p>
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
						<span>Повноцінний курс</span>
					</div>
					
					<h2 className={styles.courseSectionTitle}>
						Веб-розробка: Від основ до просунутого рівня
					</h2>
					
					<p className={styles.courseSectionDescription}>
						Структурований курс з чіткою програмою навчання. Від HTML/CSS до створення 
						повноцінних веб-додатків з React та Node.js. 7 модулів, 44 уроки, реальні проекти та підтримка менторів.
					</p>

					<div className={styles.courseSectionStats}>
						<div className={styles.courseStat}>
							<div className={styles.courseStatIcon}>
								<Layers size={24} />
							</div>
							<div className={styles.courseStatContent}>
								<div className={styles.courseStatValue}>7 модулів</div>
								<div className={styles.courseStatLabel}>Структурована програма</div>
							</div>
						</div>
						
						<div className={styles.courseStat}>
							<div className={styles.courseStatIcon}>
								<Clock size={24} />
							</div>
							<div className={styles.courseStatContent}>
								<div className={styles.courseStatValue}>44 уроки</div>
								<div className={styles.courseStatLabel}>Практичні завдання</div>
							</div>
						</div>
						
						<div className={styles.courseStat}>
							<div className={styles.courseStatIcon}>
								<Award size={24} />
							</div>
							<div className={styles.courseStatContent}>
								<div className={styles.courseStatValue}>Сертифікат</div>
								<div className={styles.courseStatLabel}>Після завершення</div>
							</div>
						</div>
						
						<div className={styles.courseStat}>
							<div className={styles.courseStatIcon}>
								<Users size={24} />
							</div>
							<div className={styles.courseStatContent}>
								<div className={styles.courseStatValue}>22 тижні</div>
								<div className={styles.courseStatLabel}>Тривалість курсу</div>
							</div>
						</div>
					</div>

					<div className={styles.courseSectionModules}>
						<h3 className={styles.courseSectionModulesTitle}>Що ти вивчиш:</h3>
						<div className={styles.courseSectionModulesList}>
							<div className={styles.courseModuleItem}>
								<Monitor size={20} />
								<span>HTML, CSS та адаптивний дизайн</span>
							</div>
							<div className={styles.courseModuleItem}>
								<Code size={20} />
								<span>JavaScript та робота з DOM</span>
							</div>
							<div className={styles.courseModuleItem}>
								<Zap size={20} />
								<span>React та сучасний frontend</span>
							</div>
							<div className={styles.courseModuleItem}>
								<Server size={20} />
								<span>Node.js та backend розробка</span>
							</div>
							<div className={styles.courseModuleItem}>
								<Globe size={20} />
								<span>Деплой та DevOps основи</span>
							</div>
						</div>
					</div>
					
					<div className={styles.courseSectionButtons}>
						<Link href="/courses/web-development" className={styles.coursePrimaryButton}>
							<Rocket size={20} />
							Перейти до курсу
						</Link>
						<Link href="/#Contactform" className={styles.courseSecondaryButton} onClick={handleCtaClick} scroll={false}>
							<Sparkles size={20} />
							Безкоштовний урок
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

export default WebCoursePage