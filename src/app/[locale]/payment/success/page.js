'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { CheckCircle2, XCircle, Loader } from 'lucide-react'
import styles from './PaymentSuccess.module.css'

function PaymentSuccessContent() {
	const t = useTranslations('pages.paymentSuccess')
	const searchParams = useSearchParams()
	const router = useRouter()
	const [status, setStatus] = useState('loading')
	const [message, setMessage] = useState('')
	const orderId = searchParams.get('orderId')

	useEffect(() => {
		setMessage(t('loading.message'))

		if (!orderId) {
			setStatus('error')
			setMessage(t('error.noOrderId'))
			return
		}

		const checkPayment = async () => {
			try {
				const response = await fetch(`/api/payment/status?orderId=${orderId}`, {
					credentials: 'include',
				})

				if (!response.ok) {
					throw new Error('Failed to check payment status')
				}

				const data = await response.json()

				if (data.requiresRegistration) {
					router.push(`/register?claimOrder=${orderId}&email=${encodeURIComponent(data.guestEmail || '')}`)
					return
				}

				if (data.purchased) {
					setStatus('success')
					setMessage(t('success.message'))
				} else {
					setStatus('pending')
					setMessage(t('pending.message'))
				}
			} catch (error) {
				console.error('Error checking payment:', error)
				setStatus('error')
				setMessage(t('error.checkFailed'))
			}
		}

		checkPayment()
	}, [orderId, t, router])

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{status === 'loading' && (
					<>
						<Loader className={styles.icon} />
						<h1>{t('loading.title')}</h1>
						<p>{message}</p>
					</>
				)}

				{status === 'success' && (
					<>
						<CheckCircle2 className={`${styles.icon} ${styles.success}`} />
						<h1>{t('success.title')}</h1>
						<p>{message}</p>
						<div className={styles.actions}>
							<Link href="/dashboard" className={styles.button}>
								{t('success.goToCourses')}
							</Link>
						</div>
					</>
				)}

				{status === 'pending' && (
					<>
						<Loader className={`${styles.icon} ${styles.pending}`} />
						<h1>{t('pending.title')}</h1>
						<p>{message}</p>
						<p className={styles.note}>{t('pending.note')}</p>
						<div className={styles.actions}>
							<Link href="/dashboard" className={styles.button}>
								{t('pending.goToCourses')}
							</Link>
						</div>
					</>
				)}

				{status === 'error' && (
					<>
						<XCircle className={`${styles.icon} ${styles.error}`} />
						<h1>{t('error.title')}</h1>
						<p>{message}</p>
						<div className={styles.actions}>
							<Link href="/dashboard" className={styles.button}>
								{t('error.goToCourses')}
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default function PaymentSuccessPage() {
	const t = useTranslations('pages.paymentSuccess')

	return (
		<Suspense
			fallback={
				<div className={styles.container}>
					<div className={styles.card}>
						<Loader className={styles.icon} />
						<h1>{t('suspense.title')}</h1>
					</div>
				</div>
			}
		>
			<PaymentSuccessContent />
		</Suspense>
	)
}
