'use client'

import SiteHeader from '@/components/Nav/SiteHeader'

/**
 * LMS surfaces (dashboard, admin) share the same pill header as marketing,
 * with the signed-in account chip and optional log out.
 */
export default function LmsHeader({ onLogout = null }) {
	return <SiteHeader variant="lms" onLogout={onLogout} />
}
