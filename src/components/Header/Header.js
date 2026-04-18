'use client'
import React, { useState, useEffect, useRef } from 'react'

import {
	ChevronDown,
	ChevronRight,
	Phone,
	Menu,
	X,
	Code,
	Gamepad2,
	Monitor,
	Sparkles,
	Star,
	Users,
	Box,
} from 'lucide-react'
import styles from './Header.module.css'
import gsap from 'gsap'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import { logout } from '@/lib/authClient'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { useRouter } from 'next/navigation'
import { User, LogOut } from 'lucide-react'

const Header = () => {
	const [isCoursesOpen, setIsCoursesOpen] = useState(false)
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

	// Анімація випадаючого меню
	useEffect(() => {
		const dropdown = headerRef.current?.querySelector(`.${styles.dropdown}`)
		if (!dropdown) return

		if (isCoursesOpen) {
			gsap
				.timeline()
				.set(dropdown, { display: 'block' })
				.to(dropdown, { opacity: 1, duration: 0.3, ease: 'power2.out' })
				.fromTo(
					`.${styles.dropdownItem}`,
					{ opacity: 0, y: 10 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: 0.3,
						ease: 'power2.out',
					},
					'-=0.2'
				)
		} else {
			gsap.to(dropdown, {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.in',
				onComplete: () => gsap.set(dropdown, { display: 'none' }),
			})
		}
	}, [isCoursesOpen])

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
			
			// Анімація контенту всередині
			gsap.fromTo(
				mobileMenu.querySelectorAll(`.${styles.mobileMenuItem}`),
				{ 
					opacity: 0, 
					y: 20
				},
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					duration: 0.4,
					ease: 'power2.out',
					delay: 0.2
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

	// Закриття dropdown по ESC або кліку поза меню
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setIsCoursesOpen(false)
			}
		}

		const handleClickOutside = (e) => {
			if (isCoursesOpen && !e.target.closest(`.${styles.dropdown}`) && !e.target.closest(`.${styles.navItemDropdown}`)) {
				setIsCoursesOpen(false)
			}
		}

		if (isCoursesOpen) {
			document.addEventListener('keydown', handleEscape)
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isCoursesOpen])

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

	// Логіка для dropdown меню (тільки клік, без hover)
	const handleDropdownToggle = () => {
		setIsCoursesOpen(!isCoursesOpen)
	}

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
		{ label: 'Предмети', dropdown: true },
		{ label: 'Записатися', href: '/#Contactform' },
		{ label: 'Соцмережі', href: '/#social-media' },
		{ label: 'Ціни', href: '/tariff' },
		{ label: 'Відгуки', href: '/#testimonials' },
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
		<header
			ref={headerRef}
			className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
		>
			<div className={styles.container}>
				<div className={styles.headerContent}>
					{/* Логотип */}
					<Logo className={styles.logo} />

					{/* Навігація для десктопу */}
					<nav className={styles.nav}>
                        {navItems.map((item, index) =>
							item.dropdown ? (
								<div
									key={index}
									className={styles.navItemDropdown}
								>
									<button 
										className={styles.navLink}
										onClick={handleDropdownToggle}
									>
										{item.label}
										<ChevronDown
											size={16}
											className={`${styles.chevron} ${
												isCoursesOpen ? styles.chevronRotated : ''
											}`}
										/>
									</button>
									<div className={styles.dropdown}>
										<div className={styles.dropdownContent}>
											<div className={styles.dropdownHeader}>
												<h3 className={styles.dropdownTitle}>Наші предмети</h3>
												<p className={styles.dropdownSubtitle}>
													Обери свій шлях у програмуванні
												</p>
											</div>

											<div className={styles.dropdownGrid}>
												
												{courses.map((course, courseIndex) => (
													<Link
														key={courseIndex}
														href={course.link}
														className={styles.dropdownItem}
														onClick={() => setIsCoursesOpen(false)}
													>
														<div
															className={`${styles.dropdownIcon} ${
																styles[course.theme]
															}`}
														>
															{course.icon}
														</div>
														<div className={styles.dropdownInfo}>
															<div className={styles.courseHeader}>
																<h4 className={styles.courseTitle}>
																	{course.title}
																</h4>
																{course.popular && (
																	<span className={styles.popularBadge}>
																		<Star size={10} /> Популярний
																	</span>
																)}
															</div>
															<p className={styles.courseDescription}>
																{course.description}
															</p>
															<span className={styles.courseAge}>
																{course.age}
															</span>
														</div>
													</Link>
												))}
											</div>
										</div>
									</div>
								</div>
                            ) : (
                                <Link 
									key={index} 
									href={item.href} 
									className={styles.navLink}
									onClick={item.label === 'Записатися' ? handleCtaClick : undefined}
									scroll={item.label === 'Записатися' ? false : undefined}
								>
									{item.label}
								</Link>
                            )
						)}
					</nav>

					{/* Права частина хедера */}
                    <div className={styles.headerRight}>
						{!userLoading && (
							user ? (
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
							) : null
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
							className={styles.mobileMenuButton}
							onClick={handleMobileMenuToggle}
							aria-label='Меню'
						>
							<Menu size={24} />
						</button>
					</div>
				</div>
			</div>

			{/* Повноекранне мобільне меню */}
            <div 
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
							<Logo />
						</div>
					</div>

					{/* Меню пунктів */}
					<div className={styles.mobileMenuNav}>
						{/* Курси */}
						<div className={styles.mobileMenuSection}>
							<h3 className={styles.mobileMenuSectionTitle}>Курси</h3>
							{courses.map((course, index) => (
								<Link
									key={index}
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
										<div className={styles.mobileCourseDescription}>
											{course.description}
										</div>
										<div className={styles.mobileCourseAge}>{course.age}</div>
									</div>
								</Link>
							))}
						</div>

						{/* Навігація */}
						<div className={styles.mobileMenuSection}>
							<h3 className={styles.mobileMenuSectionTitle}>Сторінки</h3>
							{navItems
								.filter(item => !item.dropdown)
                                .map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`${styles.mobileMenuItem} ${styles.mobileNavItem}`}
                                        onClick={item.label === 'Записатися' ? handleCtaClick : handleMobileMenuClose}
                                        scroll={item.label === 'Записатися' ? false : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
						</div>
					</div>

					{/* Кнопки входу та реєстрації або профіль */}
					<div className={styles.mobileMenuFooter}>
						{!userLoading && (
							user ? (
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
							) : null
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header