'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { CheckCircle2, XCircle, Loader } from 'lucide-react'
import { getPaymentRedirectPath } from '@/lib/paymentRedirect'
import styles from '@/app/[locale]/payment/success/PaymentSuccess.module.css'

const POLL_ATTEMPTS = 8
const POLL_INTERVAL_MS = 1500

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function PaymentResultFlow({ syncMonobank = true }) {
  const t = useTranslations('pages.paymentSuccess')
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [redirectTo, setRedirectTo] = useState(null)
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    setMessage(t('loading.message'))

    if (!orderId) {
      setStatus('error')
      setMessage(t('error.noOrderId'))
      return
    }

    let cancelled = false

    const checkPayment = async () => {
      try {
        for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt += 1) {
          if (cancelled) return

          const syncParam = syncMonobank ? '&sync=1' : ''
          const response = await fetch(
            `/api/payment/status?orderId=${encodeURIComponent(orderId)}${syncParam}`,
            { credentials: 'include' }
          )

          if (!response.ok) {
            throw new Error('Failed to check payment status')
          }

          const data = await response.json()

          if (data.requiresRegistration) {
            const coursePath = getPaymentRedirectPath({
              paymentType: data.paymentType,
              courseId: data.courseId,
            })
            const registerUrl = new URLSearchParams({
              claimOrder: orderId,
              email: data.guestEmail || '',
            })
            if (coursePath && coursePath !== '/dashboard') {
              registerUrl.set('redirect', coursePath)
            }
            router.replace(`/register?${registerUrl.toString()}`)
            return
          }

          if (data.purchased || data.status === 'completed') {
            const target = data.redirectTo || getPaymentRedirectPath(data)
            setRedirectTo(target)
            setStatus('success')
            setMessage(t('success.message'))
            router.replace(target)
            return
          }

          if (data.status === 'failed') {
            setStatus('error')
            setMessage(t('error.checkFailed'))
            return
          }

          if (attempt < POLL_ATTEMPTS - 1) {
            await sleep(POLL_INTERVAL_MS)
          }
        }

        setStatus('pending')
        setMessage(t('pending.message'))
      } catch (error) {
        console.error('Error checking payment:', error)
        if (!cancelled) {
          setStatus('error')
          setMessage(t('error.checkFailed'))
        }
      }
    }

    checkPayment()

    return () => {
      cancelled = true
    }
  }, [orderId, t, router, syncMonobank])

  const fallbackHref = redirectTo || '/dashboard'

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
              <Link href={fallbackHref} className={styles.button}>
                {t('success.goToCourse')}
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
