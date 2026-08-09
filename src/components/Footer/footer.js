'use client'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import styles from './footer.module.css'
import { parseHomeHashTarget, navigateToHomeSection } from '@/lib/homeSectionScroll'
import {
	Code,
	Gamepad2,
	Award,
	Star,
	GraduationCap,
	Box,
	Blocks,
	Cuboid,
	Instagram,
} from 'lucide-react'
import TikTokIcon from '@/components/Icons/TikTokIcon'
import Image from 'next/image'

const Footer = () => {
	const t = useTranslations('footer')
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
		{ name: t('courses.scratch'), icon: Blocks, href: '/Scratch' },
		{ name: t('courses.minecraft'), icon: Cuboid, href: '/MinecraftEducation' },
	]

	const quickLinks = [
		{ name: t('quickLinks.about'), href: '/#about' },
		{ name: t('quickLinks.reviews'), href: '/#testimonials' },
		{ name: t('quickLinks.contacts'), href: '/#Contactform', openModal: true },
		{ name: t('quickLinks.login'), href: '/login' },
	]

	const supportLinks = [
		{ name: t('supportLinks.faq'), href: '/#faq' },
		{ name: t('supportLinks.offer'), href: '/api/oferta-pdf', useAnchor: true },
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

	const socialLinks = [
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

	return (
		<footer className={styles.footer}>
			<div className={styles.glow} aria-hidden="true" />
			<div className={styles.container}>
				<div className={styles.mainContent}>
					<div className={styles.schoolInfo}>
						<div className={styles.logoSection}>
							<div className={styles.logoIconWrapper}>
								<Image
									src='/logo.jpeg'
									alt='SmartCode Academy Logo'
									className={styles.logoImage}
									width={40}
									height={40}
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
									<item.icon size={14} className={styles.achievementIcon} />
									<span className={styles.achievementNumber}>{item.number}</span>
									<span className={styles.achievementLabel}>{item.label}</span>
								</div>
							))}
						</div>
					</div>

					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>{t('coursesTitle')}</h4>
						<ul className={`${styles.linksList} ${styles.coursesList}`}>
							{courses.map((course, index) => (
								<li key={index}>
									<Link href={course.href} className={styles.link}>
										<course.icon size={14} className={styles.linkIcon} />
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

				<div className={styles.bottomSection}>
					<div className={styles.copyright}>
						{t('copyright', { year: currentYear })}
					</div>
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
								<social.icon size={16} />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
