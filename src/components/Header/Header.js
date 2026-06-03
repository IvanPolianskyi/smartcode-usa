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
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Logo from '@/components/Logo/Logo'
import { logout } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import {
	parseHomeHashTarget,
	navigateToHomeSection,
	requestHomeSectionScroll,
	setPendingHomeSectionScroll,
	unlockBodyScrollLock,
	isHomePathname,
	getHomeBasePath,
} from '@/lib/homeSectionScroll'

const Header = () => {
	const t = useTranslations('header')
	const tc = useTranslations('common')
	const locale = useLocale()
	const isEn = locale === 'en'
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef(null)
    const scrollLockYRef = useRef(0)
	const pendingHomeSectionRef = useRef(null)
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
			const lockedY =
				scrollLockYRef.current ||
				Math.abs(parseInt(document.body.style.top || '0', 10)) ||
				0
			const sectionAfterUnlock = pendingHomeSectionRef.current
			const isHome =
				typeof window !== 'undefined' &&
				isHomePathname(window.location.pathname)

			unlockBodyScrollLock(lockedY, { restorePosition: !sectionAfterUnlock })

			const runSectionScroll = () => {
				if (!sectionAfterUnlock) return
				if (!isHome) {
					pendingHomeSectionRef.current = null
					return
				}
				pendingHomeSectionRef.current = null
				requestAnimationFrame(() => {
					requestHomeSectionScroll(sectionAfterUnlock)
				})
			}

			runSectionScroll()

			// Анімація виходу
			gsap.to(mobileMenu, {
				opacity: 0,
				scale: 0.95,
				duration: 0.25,
				ease: 'power2.in',
				onComplete: () => {
					gsap.set(mobileMenu, { display: 'none' })
				},
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
		if (e?.preventDefault) e.preventDefault()
		if (isEn) {
			router.push('/register')
			setIsMobileMenuOpen(false)
			return
		}
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new Event('openContactModal'))
		}
		setIsMobileMenuOpen(false)
	}

	const scrollToHomeSection = (sectionId) => {
		const isHome =
			typeof window !== 'undefined' &&
			isHomePathname(window.location.pathname)

		if (isMobileMenuOpen) {
			pendingHomeSectionRef.current = sectionId
			setIsMobileMenuOpen(false)
			if (!isHome) {
				setPendingHomeSectionScroll(sectionId)
				const base = getHomeBasePath(window.location.pathname)
				router.push(`${base}#${sectionId}`)
			}
			return
		}

		navigateToHomeSection(sectionId, router)
	}

	const handleDesktopNavClick = (e, item) => {
		if (item.ctaModal) {
			handleCtaClick(e)
			return
		}
		const id = parseHomeHashTarget(item.href)
		if (id) {
			e.preventDefault()
			scrollToHomeSection(id)
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
			scrollToHomeSection(id)
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
		isEn
			? { label: t('nav.signUp'), href: '/register' }
			: { label: t('nav.signUp'), href: '/#trial-signup', ctaModal: true },
		{ label: t('nav.courses'), href: '/#our-courses' },
		{ label: t('nav.lessons'), href: '/#courses', hideOnDesktop: true },
		{ label: t('nav.prices'), href: '/tariff' },
		{ label: t('nav.reviews'), href: '/#testimonials' },
		{ label: t('nav.invite'), href: '/invite' },
	]
	const desktopNavItems = navItems
		.filter((item) => !item.hideOnDesktop)
		.filter((item) => !(user && item.ctaModal))
	const mobileNavItems = navItems.filter((item) => !(user && item.ctaModal))

	const getUserInitials = (name) => {
		if (!name) return '?'
		const parts = name.trim().split(/\s+/).filter(Boolean)
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
		}
		return parts[0].slice(0, 2).toUpperCase()
	}

	const courses = [
		{
			icon: <Code size={24} />,
			title: t('coursesDropdown.python.title'),
			description: t('coursesDropdown.python.description'),
			link: '/python',
			age: t('coursesDropdown.python.age'),
			theme: 'blue',
			popular: true,
		},
		{
			icon: <Gamepad2 size={24} />,
			title: t('coursesDropdown.unity.title'),
			description: t('coursesDropdown.unity.description'),
			link: '/Unity',
			age: t('coursesDropdown.unity.age'),
			theme: 'green',
		},
		{
			icon: <Box size={24} />,
			title: t('coursesDropdown.roblox.title'),
			description: t('coursesDropdown.roblox.description'),
			link: '/Roblox',
			age: t('coursesDropdown.roblox.age'),
			theme: 'green',
		},
		{
			icon: <Monitor size={24} />,
			title: t('coursesDropdown.webDev.title'),
			description: t('coursesDropdown.webDev.description'),
			link: '/webDev',
			age: t('coursesDropdown.webDev.age'),
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
							aria-label={t('signUpAria')}
						>
							{t('nav.signUp')}
						</button>
					)}

					{/* Навігація для десктопу */}
					<nav className={styles.nav}>
						{desktopNavItems.map((item) => (
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
							<div className={styles.profileWrap}>
								<Link href="/dashboard" className={styles.profileChip} title={tc('myProfile')}>
									<span className={styles.profileAvatar} aria-hidden="true">
										{getUserInitials(user.name)}
									</span>
									<span className={styles.profileName}>{user.name}</span>
								</Link>
								<button
									type="button"
									onClick={handleLogout}
									className={styles.profileLogout}
									aria-label={tc('logout')}
									title={tc('logout')}
								>
									<LogOut size={16} aria-hidden />
								</button>
							</div>
						) : (
							<Link href="/register" className={styles.userButton}>
								<User size={18} />
								<span className={styles.userName}>{tc('login')}</span>
							</Link>
						)}
						{/* Кнопка кабінету для мобільної версії */}
						{!userLoading && user && (
							<Link
								href="/dashboard"
								className={styles.mobileCabinetButton}
								aria-label={tc('myProfile')}
							>
								<span className={styles.mobileProfileAvatar} aria-hidden="true">
									{getUserInitials(user.name)}
								</span>
							</Link>
						)}
						<button
							type="button"
							className={styles.mobileMenuButton}
							onClick={handleMobileMenuToggle}
							aria-label={isMobileMenuOpen ? tc('closeMenu') : tc('openMenu')}
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
					aria-label={tc('closeMenu')}
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
							<h3 className={styles.mobileMenuSectionTitle}>{t('mobile.pages')}</h3>
							{mobileNavItems.map((item) => {
								const homeSectionId = parseHomeHashTarget(item.href)
								if (homeSectionId) {
									return (
										<button
											key={item.label}
											type="button"
											className={`${styles.mobileMenuItem} ${styles.mobileNavItem}`}
											onClick={(e) => handleMobileNavClick(e, item)}
										>
											{item.label}
										</button>
									)
								}
								return (
									<Link
										key={item.label}
										href={item.href}
										className={`${styles.mobileMenuItem} ${styles.mobileNavItem} ${item.ctaModal ? styles.mobileNavCta : ''}`}
										scroll={item.ctaModal ? false : undefined}
										onClick={(e) => handleMobileNavClick(e, item)}
									>
										{item.label}
									</Link>
								)
							})}
						</div>

						<div className={`${styles.mobileMenuSection} ${styles.mobileMenuCoursesSection}`}>
							<h3 className={styles.mobileMenuSectionTitle}>{t('mobile.courses')}</h3>
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
													<Star size={10} /> {tc('popular')}
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
									className={`${styles.mobileMenuItem} ${styles.mobileProfileLink}`}
									onClick={handleMobileMenuClose}
								>
									<span className={styles.mobileProfileAvatar}>{getUserInitials(user.name)}</span>
									<span className={styles.mobileProfileName}>{user.name}</span>
								</Link>
								<button 
									onClick={() => {
										handleLogout()
										handleMobileMenuClose()
									}}
									className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton}`}
								>
									<LogOut size={18} />
									{tc('logout')}
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
									{tc('login')}
								</Link>
								<Link 
									href="/register" 
									className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton}`}
									onClick={handleMobileMenuClose}
								>
									{tc('register')}
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