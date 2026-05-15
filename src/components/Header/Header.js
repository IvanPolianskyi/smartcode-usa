'use client'
import React, { useState, useEffect, useRef } from 'react'

import {
	Menu,
	X,
	Code,
	Gamepad2,
	Monitor,
	Star,
	Box,
	User,
	LogOut,
} from 'lucide-react'
import styles from './Header.module.css'
import gsap from 'gsap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import { logout } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import {
	parseHomeHashTarget,
	setPendingHomeSectionScroll,
	scheduleScrollToHomeSectionId,
} from '@/lib/homeSectionScroll'

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef(null)
    const scrollLockYRef = useRef(0)
	const router = useRouter()
	const { user, loading: userLoading } = useAuthSession()

	// Відстеження прокрутки для зміни стилю хедера
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll, { passive: true })
	}, [])

	// ПОВНОЕКРАННА анімація мобільного меню + Scroll Lock як у модального вікна
	useEffect(() => {
		const mobileMenu = headerRef.current?.querySelector(`.${styles.mobileMenu}`)
		if (!mobileMenu) return

		if (isMobileMenuOpen) {
            // Блокуємо скрол сторінки (навіть на iOS)
            scrollLockYRef.current = window.scrollY || window.pageYOffset || 0
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollLockYRef.current}px`
            document.body.style.left = '0'
            document.body.style.right = '0'
            document.body.style.width = '100%'
			
			// Показуємо меню
			gsap.set(mobileMenu, { 
				display: 'flex', 
				opacity: 0,
				scale: 0.95
			})
			
			// Анімація входу (fade + scale)
			gsap.to(mobileMenu, { 
				opacity: 1,
				scale: 1,
				duration: 0.3, 
				ease: 'power2.out' 
			})
			
			// Легкий зсув без приховування opacity — пункти одразу видно, можна скролити
			gsap.fromTo(
				mobileMenu.querySelectorAll(`.${styles.mobileMenuItem}`),
				{ opacity: 1, y: 10 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.04,
					duration: 0.32,
					ease: 'power2.out',
					delay: 0.08,
				}
			)
		} else {
            // Розблоковуємо скрол і відновлюємо позицію
            const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || 0
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.width = ''
			
			// Анімація виходу
			gsap.to(mobileMenu, {
				opacity: 0,
				scale: 0.95,
				duration: 0.25,
				ease: 'power2.in',
				onComplete: () => {
					gsap.set(mobileMenu, { display: 'none' })
                    window.scrollTo(0, y)
				}
			})
		}

		// Cleanup функція
        return () => {
            if (!isMobileMenuOpen) {
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.left = ''
                document.body.style.right = ''
                document.body.style.width = ''
            }
        }
	}, [isMobileMenuOpen])

	// Закриття мобільного меню по ESC
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setIsMobileMenuOpen(false)
			}
		}

		if (isMobileMenuOpen) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isMobileMenuOpen])

	const handleMobileMenuToggle = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const handleMobileMenuClose = () => {
		setIsMobileMenuOpen(false)
	}

	const handleCtaClick = (e) => {
        e.preventDefault()
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('openContactModal'))
        }
        setIsMobileMenuOpen(false)
    }

	const navigateToHomeSection = (sectionId) => {
		if (typeof window === 'undefined' || !sectionId) return
		setIsMobileMenuOpen(false)
		const path = window.location.pathname
		if (path === '/' || path === '') {
			scheduleScrollToHomeSectionId(sectionId)
			return
		}
		setPendingHomeSectionScroll(sectionId)
		router.push('/')
	}

	const handleDesktopNavClick = (e, item) => {
		if (item.ctaModal) {
			handleCtaClick(e)
			return
		}
		const id = parseHomeHashTarget(item.href)
		if (id) {
			e.preventDefault()
			navigateToHomeSection(id)
		}
	}

	const handleMobileNavClick = (e, item) => {
		if (item.ctaModal) {
			handleCtaClick(e)
			return
		}
		const id = parseHomeHashTarget(item.href)
		if (id) {
			e.preventDefault()
			navigateToHomeSection(id)
			return
		}
		handleMobileMenuClose()
	}

	const handleLogout = async () => {
		try {
			await logout()
			window.dispatchEvent(new Event('auth:logout'))
			router.push('/')
			router.refresh()
		} catch (error) {
			console.error('Logout error:', error)
		}
	}

	const navItems = [
		{ label: 'Записатися', href: '/#trial-signup', ctaModal: true },
		{ label: 'Курси', href: '/#courses' },
		{ label: 'Соцмережі', href: '/#social-media' },
		{ label: 'Ціни', href: '/tariff' },
		{ label: 'Відгуки', href: '/#testimonials' },
		{ label: 'Запроси друга', href: '/invite' },
	]
	
	const courses = [
		{
			icon: <Code size={24} />,
			title: 'Python',
			description: 'Основи програмування на Python',
			link: "/python",
			age: '10-16 років',
			theme: 'blue',
			popular: true,
		},
		{
			icon: <Gamepad2 size={24} />,
			title: 'Розробка ігор',
			description: 'C# та Unity',
			link: "/Unity",
			age: '8-17 років',
			theme: 'green',
		},
		{
			icon: <Box size={24} />,
			title: 'Roblox Studio',
			description: 'Створення ігор у Roblox Studio',
			link: "/Roblox",
			age: '8-16 років',
			theme: 'green',
		},
		{
			icon: <Monitor size={24} />,
			title: 'Веб-розробка',
			description: 'HTML, CSS, React, дизайн',
			link: "/webDev",	
			age: '12-18 років',
			theme: 'purple',
		},
	]

	return (
		<>
		<header
			ref={headerRef}
			className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
		>
			<div className={styles.container}>
				<div className={styles.headerContent}>
					{/* Логотип */}
					<Logo className={styles.logo} />

					{!userLoading && !user && (
						<button
							type='button'
							className={styles.mobileTopCta}
							onClick={handleCtaClick}
							aria-label='Записатися на пробне заняття'
						>
							Записатися
						</button>
					)}

					{/* Навігація для десктопу */}
					<nav className={styles.nav}>
						{navItems.map((item, index) => (
							<Link
								key={item.label}
								href={item.href}
								className={`${styles.navLink} ${item.ctaModal ? styles.navLinkCta : ''}`}
								scroll={item.ctaModal || parseHomeHashTarget(item.href) ? false : undefined}
								onClick={(e) => handleDesktopNavClick(e, item)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Права частина хедера */}
                    <div className={styles.headerRight}>
						{userLoading ? (
							<div className={`${styles.userButton} ${styles.skeletonButton}`} style={{ width: '100px', pointerEvents: 'none' }}>
								<div className={styles.skeletonPulse} />
							</div>
						) : user ? (
							<>
								<Link href="/dashboard" className={styles.userButton}>
									<User size={18} />
									<span className={styles.userName}>{user.name}</span>
								</Link>
								<button onClick={handleLogout} className={styles.logoutButton}>
									<LogOut size={18} />
									Вийти
								</button>
							</>
						) : (
							<Link href="/login" className={styles.userButton}>
								<User size={18} />
								<span className={styles.userName}>Увійти</span>
							</Link>
						)}
						{/* Кнопка кабінету для мобільної версії */}
						{!userLoading && user && (
							<Link
								href="/dashboard"
								className={styles.mobileCabinetButton}
								aria-label="Мій профіль"
							>
								<User size={20} />
							</Link>
						)}
						<button
							type="button"
							className={styles.mobileMenuButton}
							onClick={handleMobileMenuToggle}
							aria-label={isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
							aria-expanded={isMobileMenuOpen}
							aria-controls="site-mobile-menu"
						>
							{isMobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
						</button>
					</div>
				</div>
			</div>

			{/* Повноекранне мобільне меню */}
            <div 
                id="site-mobile-menu"
                className={styles.mobileMenu}
                role="dialog" 
                aria-modal="true" 
                aria-hidden={!isMobileMenuOpen}
                onClick={handleMobileMenuClose}
            >
				{/* Кнопка закриття зверху справа */}
				<button 
					className={styles.mobileMenuClose}
					onClick={handleMobileMenuClose}
					aria-label="Закрити меню"
				>
					<X size={24} />
				</button>

                <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
					{/* Логотип в меню */}
					<div className={styles.mobileMenuHeader}>
						<div className={styles.mobileMenuLogo}>
							<Logo hideText />
						</div>
					</div>

					{/* Спочатку сторінки (видно без скролу), потім курси */}
					<div className={styles.mobileMenuNav}>
						<div className={styles.mobileMenuSection}>
							<h3 className={styles.mobileMenuSectionTitle}>Сторінки</h3>
							{navItems.map((item) => (
									<Link
										key={item.label}
										href={item.href}
										className={`${styles.mobileMenuItem} ${styles.mobileNavItem} ${item.ctaModal ? styles.mobileNavCta : ''}`}
										scroll={item.ctaModal || parseHomeHashTarget(item.href) ? false : undefined}
										onClick={(e) => handleMobileNavClick(e, item)}
									>
										{item.label}
									</Link>
								))}
						</div>

						<div className={`${styles.mobileMenuSection} ${styles.mobileMenuCoursesSection}`}>
							<h3 className={styles.mobileMenuSectionTitle}>Курси</h3>
							{courses.map((course, index) => (
								<Link
									key={course.link}
									href={course.link}
									className={`${styles.mobileMenuItem} ${styles.mobileCourseItem}`}
									onClick={handleMobileMenuClose}
								>
									<div className={`${styles.mobileCourseIcon} ${styles[course.theme]}`}>
										{course.icon}
									</div>
									<div className={styles.mobileCourseInfo}>
										<div className={styles.mobileCourseTitle}>
											{course.title}
											{course.popular && (
												<span className={styles.mobilePopularBadge}>
													<Star size={10} /> Топ
												</span>
											)}
										</div>
										<div className={styles.mobileCourseDescription}>{course.description}</div>
										<div className={styles.mobileCourseAge}>{course.age}</div>
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* Кнопки входу та реєстрації або профіль */}
					<div className={styles.mobileMenuFooter}>
						{userLoading ? (
							<>
								<div className={`${styles.mobileMenuItem} ${styles.skeletonButton}`} style={{ width: '100%', pointerEvents: 'none', height: '48px', marginBottom: '0.5rem' }}>
									<div className={styles.skeletonPulse} />
								</div>
								<div className={`${styles.mobileMenuItem} ${styles.skeletonButton}`} style={{ width: '100%', pointerEvents: 'none', height: '48px' }}>
									<div className={styles.skeletonPulse} />
								</div>
							</>
						) : user ? (
							<>
								<Link 
									href="/dashboard" 
									className={`${styles.mobileMenuItem} ${styles.mobileLoginButton}`}
									onClick={handleMobileMenuClose}
								>
									<User size={18} />
									Мій профіль
								</Link>
								<button 
									onClick={() => {
										handleLogout()
										handleMobileMenuClose()
									}}
									className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton}`}
								>
									<LogOut size={18} />
									Вийти
								</button>
							</>
						) : (
							<>
								<Link 
									href="/login" 
									className={`${styles.mobileMenuItem} ${styles.mobileLoginButton}`}
									onClick={handleMobileMenuClose}
								>
									<User size={18} />
									Увійти
								</Link>
								<Link 
									href="/register" 
									className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton}`}
									onClick={handleMobileMenuClose}
								>
									Реєстрація
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
		</>
	)
}

export default Header