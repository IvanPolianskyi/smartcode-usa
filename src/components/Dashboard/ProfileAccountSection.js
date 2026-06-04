'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { User, Trash2, AlertTriangle } from 'lucide-react'
import { deleteAccount } from '@/lib/authClient'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function ProfileAccountSection({ user, onDeleted }) {
  const t = useTranslations('dashboard.profile')
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setError('')
    if (!window.confirm(t('confirmMessage'))) {
      return
    }

    setDeleting(true)
    try {
      await deleteAccount()
      window.dispatchEvent(new Event('auth:logout'))
      if (onDeleted) {
        onDeleted()
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError(err?.message || t('errorGeneric'))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className={styles.profileCard} aria-labelledby="profile-account-title">
      <div className={styles.sectionHeader}>
        <h3 id="profile-account-title">
          <User size={20} /> {t('title')}
        </h3>
      </div>
      <p className={styles.profileEmail}>{user.email}</p>
      <div className={styles.profileWarning}>
        <AlertTriangle size={18} aria-hidden />
        <p>{t('dataLossWarning')}</p>
      </div>
      {error ? <p className={styles.profileError}>{error}</p> : null}
      <button
        type="button"
        className={styles.deleteAccountBtn}
        onClick={handleDelete}
        disabled={deleting}
      >
        <Trash2 size={16} aria-hidden />
        {deleting ? t('deleting') : t('deleteButton')}
      </button>
    </section>
  )
}
