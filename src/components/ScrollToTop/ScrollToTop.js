'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
	const pathname = usePathname()

	useEffect(() => {
		// Скрол вгору при зміні сторінки та при першому завантаженні
		if (typeof window !== 'undefined') {
			// Використовуємо requestAnimationFrame для надійності
			requestAnimationFrame(() => {
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'instant', // Миттєвий скрол без анімації
				})
			})
		}
	}, [pathname])

	return null
}

