// src/components/PythonCoursePage.jsx
"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { 
  Code, 
  Rocket, 
  Star, 
  Zap, 
  Brain, 
  Target, 
  Users, 
  Clock, 
  Award,
  Play,
  ChevronRight,
  Download,
  Cpu,
  Globe,
  Sparkles,
  ArrowLeft,
  Terminal,
  Database,
  BookOpen
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { trackCourseLanding } from '@/lib/metaPixel'
import { usePythonCourseData } from '@/hooks/usePythonCourseData'
import styles from './PythonCoursePage.module.css'

const PythonCoursePage = () => {
  const { hero, stats, modules, projects, features, sections } = usePythonCourseData()
  const [activeModule, setActiveModule] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState([])
  const [sunPosition, setSunPosition] = useState('topRight')

  // Генеруємо зірки один раз при завантаженні компонента
  const stars = useMemo(() => {
    const starTypes = [
      { type: 'starPurple', count: 30 },
      { type: 'starBlue', count: 20 },
      { type: 'starPink', count: 15 },
      { type: 'starGold', count: 10 },
      { type: 'starTwinkle', count: 25 }
    ];

    const allStars = [];

    starTypes.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        allStars.push({
          id: `${type}-${i}`,
          type,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * (type === 'starTwinkle' ? 4 : type === 'starGold' ? 6 : type === 'starBlue' ? 8 : type === 'starPink' ? 15 : 12),
          animationDuration: type === 'starTwinkle' ? 2 + Math.random() * 4 : 
                           type === 'starGold' ? 4 + Math.random() * 4 : 
                           type === 'starBlue' ? 5 + Math.random() * 6 :
                           type === 'starPink' ? 10 + Math.random() * 10 :
                           8 + Math.random() * 8
        });
      }
    });

    return allStars;
  }, []); // Пустий масив залежностей - генеруємо тільки один раз

  // Генеруємо зірки з випадковими анімаціями один раз
  const randomStars = useMemo(() => {
    const animations = ['starWave', 'starDiagonal'];
    const colors = ['starBlue', 'starPink', 'starPurple'];
    const randomStarsArray = [];

    for (let i = 0; i < 20; i++) {
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      randomStarsArray.push({
        id: `star-random-${i}`,
        color: randomColor,
        animation: randomAnimation,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: 6 + Math.random() * 6,
        animationDelay: Math.random() * 8
      });
    }

    return randomStarsArray;
  }, []); // Пустий масив залежностей

  // Генеруємо частинки сонця один раз
  const sunParticles = useMemo(() => {
    const particles = [];
    
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) + Math.random() * 20;
      const distance = 40 + Math.random() * 20;
      const radians = (angle * Math.PI) / 180;
      
      particles.push({
        id: `particle-${i}`,
        endX: Math.cos(radians) * distance,
        endY: Math.sin(radians) * distance,
        animationDelay: i * 0.2 + Math.random() * 2,
        animationDuration: 3 + Math.random() * 2
      });
    }

    return particles;
  }, []); // Пустий масив залежностей

  useEffect(() => {
    trackCourseLanding('python')
    setIsLoaded(true)
    
    // Intersection Observer для анімацій при скролі
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 }
    )

    // Спостерігаємо за секціями
    const sections = document.querySelectorAll('[data-scroll-section]')
    sections.forEach(section => observer.observe(section))
    
    // Scroll listener для переслідування сонця
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Обчислюємо позицію сонця в залежності від скролу
      const scrollProgress = scrollY / (documentHeight - windowHeight)
      
      // Логіка з невеликою зоною гістерезису для плавнішого переходу
      // При скролі вниз: переключається на 45%
      // При скролі вгору: переключається на 55%
      setSunPosition(prev => {
        if (scrollProgress < 0.45) {
          return 'topRight'
        } else if (scrollProgress > 0.55) {
          return 'topLeft'
        }
        // Зберігаємо поточну позицію в зоні 45-55%
        return prev
      })
    }

    // Додаємо scroll listener з throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', scrollListener, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className={styles.container}>

      {/* Animated Background */}
      <div className={styles.animatedBackground}>
        <div className={styles.gradientBackground}></div>
        
        {/* Основні зірки - рендеримо з заздалегідь згенерованих даних */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`${styles.floatingParticle} ${styles[star.type]}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`
            }}
          />
        ))}
        
        {/* Зірки з випадковими анімаціями - рендеримо з заздалегідь згенерованих даних */}
        {randomStars.map((star) => (
          <div
            key={star.id}
            className={`${styles.floatingParticle} ${styles[star.color]}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationName: star.animation,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out'
            }}
          />
        ))}
        
        {/* Анімоване сонце з пелюстками */}
        <div className={`${styles.followingSun} ${styles[sunPosition]}`}>
          {/* Пелюстки навколо сонця */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`petal-${i}`}
              className={styles.sunPetal}
              style={{
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
          
          {/* Частинки, що розлітаються у всі сторони - рендеримо з заздалегідь згенерованих даних */}
          {sunParticles.map((particle) => (
            <div
              key={particle.id}
              className={styles.sunParticle}
              style={{
                '--end-x': `${particle.endX}px`,
                '--end-y': `${particle.endY}px`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`
              }}
            />
          ))}
        </div>
        
        {/* Великі орби */}
        <div className={styles.floatingOrb} />
        <div className={styles.floatingOrbSecondary} />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={`${styles.heroContent} ${isLoaded ? styles.visible : ''}`}>
            {/* Python Logo Animation */}
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <div className={styles.logoSpinner}></div>
                <div className={styles.logoInner}>
                  <Code className={styles.logoIcon} />
                </div>
              </div>
              <div className={styles.logoDecorTop}></div>
              <div className={styles.logoDecorBottom}></div>
            </div>

            <h1 className={styles.mainTitle}>
              {hero.title}
            </h1>
            <h2 className={styles.subtitle}>
              {hero.subtitle}
            </h2>
            <p className={styles.description}>
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <Link 
                href="/#Contactform" 
                className={styles.primaryButton}
                onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('openContactModal'))}}
                scroll={false}
              >
                <div className={styles.buttonOverlay}></div>
                <span className={styles.buttonContent}>
                  <Rocket className="w-6 h-6" />
                  {sections.startLearning}
                  <ChevronRight className={styles.buttonArrow} />
                </span>
              </Link> 
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Code Snippets */}
          <div className={`${styles.floatingCode} ${styles.codeLeft}`}>
            <code className={styles.codeGreen}>
              print(&quot;Hello, Future!&quot;)
            </code>
          </div>
          <div className={`${styles.floatingCode} ${styles.codeRight}`}>
            <code className={styles.codeBlue}>
              import tensorflow as tf
            </code>
          </div>
        </section>

        {/* Course Modules */}
        <section className={styles.modulesSection} data-scroll-section id="modules">
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${
              visibleSections.includes('modules') ? styles.visible : ''
            }`}>
              {sections.modulesTitle}
            </h2>
            
            <div className={styles.modulesGrid}>
              {modules.map((module, index) => (
                <div 
                  key={module.id}
                  className={`${styles.moduleCard} ${
                    activeModule === index ? styles.active : ''
                  } ${
                    visibleSections.includes('modules') ? styles.visible : ''
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animationDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={() => setActiveModule(index)}
                >
                  {/* Номер модуля */}
                  <div className={styles.moduleNumber}>
                    {index + 1}
                  </div>
                  
                  {/* Іконка з анімацією */}
                  <div className={`${styles.moduleIcon} ${styles[`color${index + 1}`]}`}>
                    {module.icon}
                  </div>
                  
                  <h3 className={styles.moduleTitle}>{module.title}</h3>                  
                  <ul className={styles.moduleTopics}>
                    {module.topics.map((topic, i) => (
                      <li key={i} className={styles.moduleTopic}>
                        <div className={styles.topicDot} style={{ animationDelay: `${i * 200}ms` }}></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Ефекти */}
                  <div className={styles.moduleOverlay}></div>
                  <div className={styles.moduleGlow}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className={styles.projectsSection} data-scroll-section id="projects">
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${
              visibleSections.includes('projects') ? styles.visible : ''
            }`}>
              {sections.projectsTitle}
            </h2>
            
            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className={`${styles.projectCard} ${
                    visibleSections.includes('projects') ? styles.visible : ''
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Іконка проекта */}
                  <div className={styles.projectHeader}>
                    <div className={styles.projectIcon}>
                      <div className={styles.projectIconInner}>
                        {project.icon}
                      </div>
                    </div>
                    <span className={`${styles.difficultyBadge} ${styles[project.difficultySlug]}`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectFooter}>
                    <p className={styles.projectTime}>
                      <Clock className="w-4 h-4" />
                      {project.time}
                    </p>
                    <div className={styles.projectAction}>
                      <Star className={styles.projectStar} />
                      <span>{sections.selectProject}</span>
                    </div>
                  </div>
                  
                  {/* Анімований бордер */}
                  <div className={styles.projectShimmer}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.featuresSection} data-scroll-section id="features">
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${
              visibleSections.includes('features') ? styles.visible : ''
            }`}>
              {sections.featuresTitle}
            </h2>
            
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`${styles.featureCard} ${
                    visibleSections.includes('features') ? styles.visible : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`${styles.featureIcon} ${styles[`featureColor${index + 1}`]}`}>
                    <div className={styles.featureIconInner}>
                      {feature.icon}
                    </div>
                    {/* Анімований фон */}
                    <div className={styles.featureIconBg}></div>
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Section - Simplified */}
        <section className={styles.courseSection}>
          <div className={styles.courseSectionContainer}>
            <p className={styles.courseSectionDescription}>
              {sections.courseDescription}
            </p>
            
            <div className={styles.courseSectionButtons}>
              <Link 
                href="/#Contactform" 
                className={styles.coursePrimaryButton}
                onClick={(e) => {
                  e.preventDefault()
                  window.dispatchEvent(new Event('openContactModal'))
                }}
                scroll={false}
              >
                <div className={styles.buttonOverlay}></div>
                <span className={styles.buttonContent}>
                  <Rocket className="w-6 h-6" />
                  {sections.startLearning}
                  <ChevronRight className={styles.buttonArrow} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PythonCoursePage