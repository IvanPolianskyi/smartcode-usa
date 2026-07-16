'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from '../AdminPanel.module.css'

/**
 * Керування акаунтами вчителів перенесено в CRM:
 * Admin → «Акаунти вчителів» (/links/teachers).
 */
export default function AdminTeachersMovedPage() {
  const t = useTranslations('admin.teachersPage')
  const tAdmin = useTranslations('admin')
  const router = useRouter()
  const { user, loading } = useAuthSession()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (user.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [loading, user, router])

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{tAdmin('loading')}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>
            Привʼязка акаунтів викладачів більше не в адмінці сайту. Відкрийте CRM →
            Адміністрування → «Акаунти вчителів».
          </p>
          <Link href="/admin" className={styles.certReloadButton}>
            {t('back')}
          </Link>
        </div>
      </div>
    </div>
  )
}
