'use client'

import React from 'react'
import { AlertCircle, CreditCard, Clock } from 'lucide-react'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function PaymentReminderBanner({
  visible,
  currency = 'грн',
  deadlineText,
  lessonCredits,
  pendingCount,
  onPayClick,
  t,
}) {
  if (!visible) return null

  const urgent = lessonCredits === 0 && pendingCount === 0

  return (
    <aside
      className={`${styles.paymentBanner} ${urgent ? styles.paymentBannerUrgent : ''}`}
      role="alert"
    >
      <div className={styles.paymentBannerIcon}>
        <AlertCircle size={22} />
      </div>
      <div className={styles.paymentBannerBody}>
        <strong>{t('student.paymentReminder.title')}</strong>
        <p>
          {t('student.paymentReminder.text', {
            currency,
            deadline: deadlineText,
          })}
        </p>
        {lessonCredits > 0 ? (
          <span className={styles.paymentBannerMeta}>
            <Clock size={14} />
            {t('student.paymentReminder.creditsLeft', { count: lessonCredits })}
          </span>
        ) : null}
      </div>
      <button type="button" className={styles.paymentBannerCta} onClick={onPayClick}>
        <CreditCard size={18} />
        {t('student.paymentReminder.payNow')}
      </button>
    </aside>
  )
}
