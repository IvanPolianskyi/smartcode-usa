'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, XCircle, Loader } from 'lucide-react'
import styles from './PaymentSuccess.module.css'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Перевіряємо статус оплати...')
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderId) {
      setStatus('error')
      setMessage('Помилка: не знайдено ID замовлення')
      return
    }

    // Check payment status
    const checkPayment = async () => {
      try {
        const response = await fetch(`/api/payment/status?orderId=${orderId}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to check payment status')
        }

        const data = await response.json()
        
        if (data.purchased) {
          setStatus('success')
          setMessage('Оплата успішна! Курс тепер доступний.')
        } else {
          setStatus('pending')
          setMessage('Оплата обробляється. Будь ласка, зачекайте...')
        }
      } catch (error) {
        console.error('Error checking payment:', error)
        setStatus('error')
        setMessage('Помилка перевірки статусу оплати. Будь ласка, перевірте пізніше.')
      }
    }

    checkPayment()
  }, [orderId])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === 'loading' && (
          <>
            <Loader className={styles.icon} />
            <h1>Перевірка оплати</h1>
            <p>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className={`${styles.icon} ${styles.success}`} />
            <h1>Оплата успішна!</h1>
            <p>{message}</p>
            <div className={styles.actions}>
              <Link href="/dashboard" className={styles.button}>
                Перейти до курсів
              </Link>
            </div>
          </>
        )}

        {status === 'pending' && (
          <>
            <Loader className={`${styles.icon} ${styles.pending}`} />
            <h1>Обробка оплати</h1>
            <p>{message}</p>
            <p className={styles.note}>
              Якщо оплата не підтвердиться протягом кількох хвилин, зверніться до підтримки.
            </p>
            <div className={styles.actions}>
              <Link href="/dashboard" className={styles.button}>
                Перейти до курсів
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className={`${styles.icon} ${styles.error}`} />
            <h1>Помилка</h1>
            <p>{message}</p>
            <div className={styles.actions}>
              <Link href="/dashboard" className={styles.button}>
                Повернутися до курсів
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}



