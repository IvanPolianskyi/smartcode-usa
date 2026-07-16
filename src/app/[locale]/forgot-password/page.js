'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Logo from '@/components/Logo/Logo'
import styles from '../login/Auth.module.css'

/** Немає самоскидання пароля — доступ видає CRM / Telegram. */
export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword')

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Logo href="/" className={styles.logo} />
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>

          <div className={styles.helpBox}>
            <ul className={styles.helpList}>
              <li>{t('stepTelegram')}</li>
              <li>{t('stepManager')}</li>
              <li>{t('stepCredentials')}</li>
            </ul>
          </div>

          <div className={styles.footer}>
            <p>
              <Link href="/login" className={styles.link}>
                {t('backToLogin')}
              </Link>
            </p>
            <p>
              <Link href="/" className={styles.link}>
                {t('home')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
