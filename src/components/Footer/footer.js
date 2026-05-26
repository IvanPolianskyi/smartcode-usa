'use client'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import styles from './footer.module.css'
import { parseHomeHashTarget, navigateToHomeSection } from '@/lib/homeSectionScroll'
import {
	Code,
	Gamepad2,
	Award,
	Star,
	GraduationCap,
	Box,
	Instagram,
} from 'lucide-react'
import TikTokIcon from '@/components/Icons/TikTokIcon'
import Image from 'next/image'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'

const Footer = () => {
	const t = useTranslations('footer')
	const locale = useLocale()
	const isEn = locale === 'en'
	const router = useRouter()
	const currentYear = new Date().getFullYear()

	const handleHashLinkClick = (e, href) => {
		const id = parseHomeHashTarget(href)
		if (!id) return
		e.preventDefault()
		navigateToHomeSection(id, router)
	}

	const courses = [
		{ name: t('courses.python'), icon: Code, href: '/python' },
		{ name: t('courses.webDev'), icon: Code, href: '/webDev' },
		{ name: t('courses.unity'), icon: Gamepad2, href: '/Unity' },
		{ name: t('courses.roblox'), icon: Box, href: '/Roblox' },
	]

	const quickLinks = [
		...(!isEn ? [{ name: t('quickLinks.about'), href: '/#about' }] : []),
		{ name: t('quickLinks.reviews'), href: '/#testimonials' },
		...(isEn
			? [{ name: t('quickLinks.courses'), href: '/#our-courses' }]
			: [{ name: t('quickLinks.contacts'), href: '/#Contactform', openModal: true }]),
		{ name: t('quickLinks.login'), href: '/login' },
		{ name: t('quickLinks.register'), href: '/register' },
	]

	const supportLinks = [
		...(!isEn ? [{ name: t('supportLinks.faq'), href: '/#faq' }] : []),
		{ name: t('supportLinks.offer'), href: isEn ? '/terms' : '/api/oferta-pdf', useAnchor: !isEn },
		...(isEn ? [
			{ name: t('supportLinks.refund'), href: '/refund', useAnchor: false },
			{ name: t('supportLinks.privacy'), href: '/privacy', useAnchor: false }
		] : [])
	]

	const achievements = [
		{
			number: t('achievements.graduates.number'),
			label: t('achievements.graduates.label'),
			icon: GraduationCap,
		},
		{
			number: t('achievements.experience.number'),
			label: t('achievements.experience.label'),
			icon: Award,
		},
		{
			number: t('achievements.rating.number'),
			label: t('achievements.rating.label'),
			icon: Star,
		},
	]

	const allSocialLinks = [
		{
			name: t('social.instagram'),
			icon: Instagram,
			href: 'https://www.instagram.com/smartcode_academy_official/',
		},
		{
			name: t('social.tiktokMain'),
			icon: TikTokIcon,
			href: 'https://www.tiktok.com/@smartcodeacademy',
		},
		{
			name: t('social.tiktokAlt'),
			icon: TikTokIcon,
			href: 'https://www.tiktok.com/@smartcode_academy',
		},
		{
			name: t('social.tiktokIvan'),
			icon: TikTokIcon,
			href: 'https://www.tiktok.com/@ivan_smartcode',
		},
		{
			name: t('social.tiktokArtem'),
			icon: TikTokIcon,
			href: 'https://www.tiktok.com/@artem.smartcode',
		},
	]

	const socialLinks = isEn ? allSocialLinks.slice(0, 1) : allSocialLinks

	return (
		<footer className={styles.footer}>
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
			</div>
			<div className={styles.container}>
				<div className={styles.mainContent}>
					<div className={styles.schoolInfo}>
						<div className={styles.logoSection}>
							<div className={styles.logoIconWrapper}>
								<Image
									src='/logo.jpeg'
									alt='SmartCode Academy Logo'
									className={styles.logoImage}
									width={48}
									height={48}
								/>
							</div>
							<div className={styles.logoText}>
								<h3 className={styles.schoolName}>{t('schoolName')}</h3>
								<p className={styles.schoolSubtitle}>{t('schoolSubtitle')}</p>
							</div>
						</div>
						<p className={styles.description}>{t('description')}</p>
						<div className={styles.achievements}>
							{achievements.map((item, index) => (
								<div key={index} className={styles.achievement}>
									<div className={styles.achievementIcon}>
										<item.icon size={16} />
									</div>
									<div>
										<div className={styles.achievementNumber}>
											{item.number}
										</div>
										<div className={styles.achievementLabel}>{item.label}</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>{t('coursesTitle')}</h4>
						<ul className={styles.linksList}>
							{courses.map((course, index) => (
								<li key={index}>
									<Link href={course.href} className={styles.link}>
										<course.icon size={16} className={styles.linkIcon} />{' '}
										{course.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>{t('navigationTitle')}</h4>
						<ul className={styles.linksList}>
							{quickLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className={styles.link}
										onClick={
											link.openModal
												? (e) => {
														e.preventDefault()
														window.dispatchEvent(
															new Event('openContactModal'),
														)
													}
												: undefined
										}
										scroll={link.openModal ? false : undefined}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>{t('supportTitle')}</h4>
						<ul className={styles.linksList}>
							{supportLinks.map((link, index) => (
								<li key={index}>
									{link.useAnchor ? (
										<a href={link.href} className={styles.link}>
											{link.name}
										</a>
									) : (
										<Link
											href={link.href}
											className={styles.link}
											scroll={parseHomeHashTarget(link.href) ? false : undefined}
											onClick={(e) => handleHashLinkClick(e, link.href)}
										>
											{link.name}
										</Link>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>



				<div className={styles.divider}></div>

				<div className={styles.bottomSection}>
					<div className={styles.copyright}>
						{t('copyright', { year: currentYear })}
					</div>
					<LanguageSwitcher className={styles.langSwitcher} />
					<div className={styles.socialLinks}>
						{socialLinks.map((social, index) => (
							<a
								key={index}
								href={social.href}
								className={styles.socialLink}
								title={social.name}
								target='_blank'
								rel='noopener noreferrer'
							>
								<social.icon size={18} />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
