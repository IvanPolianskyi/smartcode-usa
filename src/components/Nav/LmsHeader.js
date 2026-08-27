'use client'

import SiteHeader from '@/components/Nav/SiteHeader'

/**
 * LMS surfaces use the same homepage pill header.
 * Pass onLogout on the dashboard to show the Log out control.
 */
export default function LmsHeader({ onLogout = null }) {
	return <SiteHeader variant="lms" onLogout={onLogout} />
}
