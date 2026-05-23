'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher({ className = '' }) {
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const switchTo = (nextLocale) => {
		if (nextLocale === locale) return
		router.replace(pathname, { locale: nextLocale })
	}

	return (
		<div className={`${styles.switcher} ${className}`} role='group' aria-label='Language'>
			<button
				type='button'
				className={`${styles.btn} ${locale === 'uk' ? styles.active : ''}`}
				onClick={() => switchTo('uk')}
				aria-pressed={locale === 'uk'}
			>
				UA
			</button>
			<button
				type='button'
				className={`${styles.btn} ${locale === 'en' ? styles.active : ''}`}
				onClick={() => switchTo('en')}
				aria-pressed={locale === 'en'}
			>
				EN
			</button>
		</div>
	)
}
