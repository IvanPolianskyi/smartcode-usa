'use client'
import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'
import { isHomePathname } from '@/lib/homeSectionScroll'
import styles from './Logo.module.css'

export default function Logo({ className = '', href = '/', hideText = false }) {
	const pathname = usePathname()

	const handleClick = (e) => {
		if (isHomePathname(pathname)) {
			e.preventDefault()
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	return (
		<Link
			href={href}
			className={`${styles.logo} ${className}`}
			onClick={handleClick}
			scroll={!isHomePathname(pathname)}
		>
			<div className={styles.logoIconWrapper}>
				<Image
					src='/logo.jpeg'
					alt='SmartCode Academy Logo'
					className={styles.logoImage}
					width={56}
					height={56}
					priority
				/>
			</div>
			{!hideText && (
				<div className={styles.logoText}>
					<span className={styles.logoTitle}>SmartCode</span>
					<span className={styles.logoSubtitle}>Academy</span>
				</div>
			)}
		</Link>
	)
}
