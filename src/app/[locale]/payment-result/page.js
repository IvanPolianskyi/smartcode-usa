'use client'

import React, { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { Loader } from 'lucide-react'
import PaymentResultFlow from '@/components/Payment/PaymentResultFlow'
import styles from '../payment/success/PaymentSuccess.module.css'

export default function PaymentResultPage() {
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
      <PaymentResultFlow syncMonobank />
    </Suspense>
  )
}
