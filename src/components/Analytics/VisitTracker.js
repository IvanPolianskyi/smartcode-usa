'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'
import { funnelStepForPath } from '@/lib/funnelSteps'

/**
 * Session ping + passive funnel steps from the URL. Runs once per route change.
 *
 * The two requests are sequential on purpose. `/api/visit` is what mints the
 * `sc_vid` cookie; firing the funnel event alongside it meant that on a first
 * visit both requests arrived with no cookie, and the person was recorded under
 * two different visitor ids.
 */
export default function VisitTracker() {
	const pathname = usePathname()
	const lastPath = useRef('')

	useEffect(() => {
		if (!pathname || pathname === lastPath.current) return
		lastPath.current = pathname

		let cancelled = false

		const payload = {
			path: pathname,
			referrer: typeof document !== 'undefined' ? document.referrer : '',
			userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
			screen:
				typeof window !== 'undefined'
					? { w: window.screen?.width, h: window.screen?.height }
					: {},
			locale: typeof document !== 'undefined' ? document.documentElement.lang : '',
		}

		const step = funnelStepForPath(pathname)

		fetch('/api/visit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
			credentials: 'same-origin',
			keepalive: true,
		})
			.catch(() => {})
			.finally(() => {
				if (cancelled || !step) return
				const params = {}
				const planMatch = pathname.match(/\/plans\/([^/]+)/)
				if (planMatch) params.courseId = decodeURIComponent(planMatch[1])
				track(step, params)
			})

		return () => {
			cancelled = true
		}
	}, [pathname])

	return null
}
