'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getClientAttribution } from '@/lib/attribution'

/**
 * Зберігає UTM / click-id у localStorage одразу при заході (і при зміні query),
 * а не лише в момент відправки форми — інакше після клієнтської навігації
 * бот заявок показує «Органіка/невідомо» замість реальної реклами.
 */
export default function AttributionCapture() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		getClientAttribution()
	}, [pathname, searchParams])

	return null
}
