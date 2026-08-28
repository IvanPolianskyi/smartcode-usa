'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'

/** Legacy /admin URL → unified admin dashboard. */
export default function AdminRedirectPage() {
	const router = useRouter()

	useEffect(() => {
		router.replace('/dashboard')
	}, [router])

	return null
}
