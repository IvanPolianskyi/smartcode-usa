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
	Blocks,
	Cuboid,
	User,
	LogOut,
} from 'lucide-react'
import styles from './Header.module.css'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
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
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [menuMounted, setMenuMounted] = useState(false)
	const [menuAnimatedOpen, setMenuAnimatedOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef(null)
	const mobileMenuRef = useRef(null)
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

	// Scroll lock + відкриття мобільного меню
	useEffect(() => {
		if (!isMobileMenuOpen) {
			setMenuAnimatedOpen(false)
			return undefined
		}

		setMenuMounted(true)
		scrollLockYRef.current = window.scrollY || window.pageYOffset || 0
		document.body.style.position = 'fixed'
		document.body.style.top = `-${scrollLockYRef.current}px`
		document.body.style.left = '0'
		document.body.style.right = '0'
		document.body.style.width = '100%'

		const raf = requestAnimationFrame(() => {
			requestAnimationFrame(() => setMenuAnimatedOpen(true))
		})
		return () => cancelAnimationFrame(raf)
	}, [isMobileMenuOpen])

	// Закриття мобільного меню + розблокування скролу
	useEffect(() => {
		if (isMobileMenuOpen || !menuMounted) return undefined

		const mobileMenu = mobileMenuRef.current
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

		const handleTransitionEnd = (e) => {
			if (e.target !== mobileMenu) return
			if (e.propertyName !== 'opacity' && e.propertyName !== 'transform') return
			setMenuMounted(false)
		}

		mobileMenu?.addEventListener('transitionend', handleTransitionEnd)
		return () => mobileMenu?.removeEventListener('transitionend', handleTransitionEnd)
	}, [isMobileMenuOpen, menuMounted])

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
		{ label: tc('login'), href: '/login', accentCta: true, hideOnMobile: true },
		{ label: t('nav.courses'), href: '/#our-courses' },
		{ label: t('nav.lessons'), href: '/#courses', hideOnDesktop: true },
		{ label: t('nav.reviews'), href: '/#testimonials' },
		{ label: t('nav.invite'), href: '/invite' },
	]
	const desktopNavItems = navItems
		.filter((item) => !item.hideOnDesktop)
		.filter((item) => !(user && item.accentCta))
	const mobileNavItems = navItems
		.filter((item) => !item.hideOnMobile)
		.filter((item) => !(user && item.accentCta))

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
		{
			icon: <Blocks size={24} />,
			title: t('coursesDropdown.scratch.title'),
			description: t('coursesDropdown.scratch.description'),
			link: '/Scratch',
			age: t('coursesDropdown.scratch.age'),
			theme: 'orange',
		},
		{
			icon: <Cuboid size={24} />,
			title: t('coursesDropdown.minecraft.title'),
			description: t('coursesDropdown.minecraft.description'),
			link: '/MinecraftEducation',
			age: t('coursesDropdown.minecraft.age'),
			theme: 'green',
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
								className={`${styles.navLink} ${item.accentCta ? styles.navLinkCta : ''}`}
								scroll={parseHomeHashTarget(item.href) ? false : undefined}
								onClick={(e) => handleDesktopNavClick(e, item)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Права частина хедера */}
                    <div className={styles.headerRight}>
						{/* Кнопка "Записатися" */}
						{!userLoading && !user && (
							<button
								type='button'
								className={styles.registerButton}
								onClick={handleCtaClick}
								aria-label={t('signUpAria')}
							>
								{t('nav.signUp')}
							</button>
						)}
						{userLoading ? (
							<div className={`${styles.userButton} ${styles.skeletonButton}`} style={{ width: '100px', pointerEvents: 'none' }}>
								<div className={styles.skeletonPulse} />
							</div>
						) : user ? (
							<div className={styles.profileWrap}>
								<Link href="/dashboard" className={styles.profileChip} title={tc('cabinet')}>
									<span className={styles.profileAvatar} aria-hidden="true">
										<User size={16} />
									</span>
									<span className={styles.profileName}>{tc('cabinet')}</span>
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
						) : null}
						{/* Кнопка кабінету для мобільної версії */}
						{!userLoading && user && (
							<Link
								href="/dashboard"
								className={styles.mobileCabinetButton}
								aria-label={tc('cabinet')}
							>
								<span className={styles.mobileProfileAvatar} aria-hidden="true">
									<User size={16} />
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
                ref={mobileMenuRef}
                className={`${styles.mobileMenu} ${menuMounted ? styles.mobileMenuMounted : ''} ${menuAnimatedOpen ? styles.mobileMenuOpen : ''}`}
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
							{mobileNavItems.map((item, index) => {
								const homeSectionId = parseHomeHashTarget(item.href)
								const itemStyle = { '--item-index': index }
								if (homeSectionId) {
									return (
										<button
											key={item.label}
											type="button"
											className={`${styles.mobileMenuItem} ${styles.mobileNavItem}`}
											style={itemStyle}
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
										className={`${styles.mobileMenuItem} ${styles.mobileNavItem}`}
										style={itemStyle}
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
									style={{ '--item-index': mobileNavItems.length + index }}
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
									<span className={styles.mobileProfileAvatar} aria-hidden="true"><User size={16} /></span>
									<span className={styles.mobileProfileName}>{tc('cabinet')}</span>
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