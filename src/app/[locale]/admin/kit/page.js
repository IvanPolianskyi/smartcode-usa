'use client'

import { useEffect } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import LmsHeader from '@/components/Nav/LmsHeader'
import KitReport from '@/components/Dashboard/KitReport'
import styles from '../AdminPanel.module.css'

export default function KitAnalyticsPage() {
	const router = useRouter()
	const { user, loading: sessionLoading } = useAuthSession()

	useEffect(() => {
		if (sessionLoading) return
		if (!user) router.push('/login')
		else if (user.role !== 'admin') router.push('/dashboard')
	}, [sessionLoading, user, router])

	return (
		<div className={styles.shell} data-theme="light">
			<LmsHeader />
			<div className={styles.container}>
				<Link href="/dashboard" className={styles.backLink}>
					← Back to admin
				</Link>
				{user?.role === 'admin' ? <KitReport /> : null}
			</div>
		</div>
	)
}
