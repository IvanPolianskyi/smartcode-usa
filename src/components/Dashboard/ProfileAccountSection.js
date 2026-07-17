'use client'

import { useTranslations } from 'next-intl'
import { User } from 'lucide-react'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function ProfileAccountSection({ user }) {
  const t = useTranslations('dashboard.profile')

  return (
    <section className={styles.profileCard} aria-labelledby="profile-account-title">
      <div className={styles.sectionHeader}>
        <h3 id="profile-account-title">
          <User size={20} /> {t('title')}
        </h3>
      </div>
      <p className={styles.profileEmail}>{user.email}</p>
    </section>
  )
}
