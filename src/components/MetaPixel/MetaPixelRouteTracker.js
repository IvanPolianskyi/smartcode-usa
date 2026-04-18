'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackMetaPageView } from '@/lib/metaPixel'

/**
 * Додатковий PageView при клієнтській навігації Next.js (layout лишається змонтованим).
 * Перший показ сторінки вже дає базовий скрипт у layout - пропускаємо один раз.
 */
export default function MetaPixelRouteTracker() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const isFirst = useRef(true)

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false
			return
		}
		trackMetaPageView()
	}, [pathname, searchParams])

	return null
}
