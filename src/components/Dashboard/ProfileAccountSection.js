'use client'

import { useTranslations } from 'next-intl'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function ProfileAccountSection({ user }) {
  const t = useTranslations('dashboard.profile')
  const initial = String(user?.name || user?.email || '?')
    .trim()
    .charAt(0)
    .toUpperCase()

  return (
    <section className={styles.profileCard} aria-labelledby="profile-account-title">
      <h2 id="profile-account-title" className={styles.sectionTitle}>
        {t('title')}
      </h2>
      <div className={styles.profileRow}>
        <span className={styles.profileAvatar} aria-hidden>
          {initial}
        </span>
        <div className={styles.profileInfo}>
          {user?.name ? <p className={styles.profileName}>{user.name}</p> : null}
          <p className={styles.profileEmail}>{user.email}</p>
        </div>
      </div>
    </section>
  )
}
