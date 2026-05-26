'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthSession } from '@/components/AuthSessionProvider'
import styles from '../AdminPanel.module.css'
import { ArrowLeft, RefreshCw, Clock } from 'lucide-react'

export default function AdminPendingPaymentsPage() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('admin.pendingPayments')
  const { user, loading: sessionLoading } = useAuthSession()
  const dateLocale = locale === 'uk' ? 'uk-UA' : 'en-US'
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const formatCurrency = (amount) =>
    new Intl.NumberFormat(dateLocale, {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
    }).format(amount)

  const formatDate = (date) => {
    if (!date) return '—'
    return new Date(date).toLocaleString(dateLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/payments?status=pending')
      if (response.status === 403) {
        router.push('/dashboard')
        return
      }
      if (!response.ok) throw new Error('Failed to load')
      const data = await response.json()
      setPayments(data.payments || [])
    } catch (error) {
      console.error(error)
      alert(t('errors.load'))
    } finally {
      setLoading(false)
    }
  }, [router, t])

  useEffect(() => {
    if (sessionLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    if (user.role !== 'admin') {
      router.push('/dashboard')
      return
    }
    loadPayments()
  }, [sessionLoading, user, router, loadPayments])

  if (sessionLoading || (loading && payments.length === 0)) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t('loading')}</div>
      </div>
    )
  }

  const otherPending = payments.filter((p) => p.paymentMethod !== 'receipt_upload')

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <Link href="/admin" className={styles.backLink}>
              <ArrowLeft size={18} />
              {t('backToAdmin')}
            </Link>
            <h1 className={styles.title}>
              <Clock size={24} />
              {t('title')}
            </h1>
            <p className={styles.subtitle}>{t('subtitle', { count: payments.length })}</p>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.refreshButton}
              onClick={loadPayments}
              disabled={loading}
            >
              <RefreshCw size={20} className={loading ? styles.spinning : ''} />
              {t('refresh')}
            </button>
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className={styles.section}>
          <p className={styles.emptyState}>{t('empty')}</p>
        </div>
      ) : (
        <>
          {otherPending.length > 0 ? (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('otherSection')}</h2>
              <div className={styles.usersTable}>
                <table>
                  <thead>
                    <tr>
                      <th>{t('columns.student')}</th>
                      <th>{t('columns.amount')}</th>
                      <th>{t('columns.method')}</th>
                      <th>{t('columns.date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherPending.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          {payment.studentName}
                          <br />
                          <span className={styles.noData}>{payment.studentEmail}</span>
                        </td>
                        <td>{formatCurrency(payment.amount)}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>{formatDate(payment.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.emptyState} style={{ marginTop: '1rem' }}>{t('otherHint')}</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
