'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Wallet, Copy, Check, Upload, AlertTriangle, CircleCheck, Clock, BookOpen } from 'lucide-react'
import { UK_BANK_PAYMENT_DETAILS } from '@/lib/paymentBankDetails'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }
  return (
    <div className={styles.bankRow}>
      <div className={styles.bankRowText}>
        <div className={styles.bankLabel}>{label}</div>
        <div className={styles.bankValue}>{value}</div>
      </div>
      <button type="button" className={styles.copyBtn} onClick={copy} aria-label="Копіювати">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  )
}

export default function StudentPaymentPanel({
  t,
  lessonPrice,
  formatLabel,
  paymentStats,
  scheduleCount = 0,
  onRefresh,
  defaultOpen = false,
}) {
  const [amount, setAmount] = useState('')
  const [receiptFile, setReceiptFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  const bank = UK_BANK_PAYMENT_DETAILS
  const lessonCredits = Number(paymentStats?.lessonCredits || 0)
  const currency = t('student.payments.currency')

  const debtLessons = useMemo(() => {
    if (scheduleCount > 0) {
      return Math.max(0, scheduleCount - lessonCredits)
    }
    return lessonCredits < 1 ? 1 : 0
  }, [scheduleCount, lessonCredits])

  const hasDebt = debtLessons > 0
  const debtAmount = debtLessons * lessonPrice

  const quickAmounts = useMemo(() => {
    const base = [1, 2, 3, 4].map((n) => n * lessonPrice)
    if (debtAmount > 0 && !base.includes(debtAmount)) {
      return [debtAmount, ...base].slice(0, 4)
    }
    return base
  }, [lessonPrice, debtAmount])

  useEffect(() => {
    if (defaultOpen) {
      document.getElementById('payment-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [defaultOpen])

  useEffect(() => {
    if (debtAmount > 0) {
      setAmount(String(debtAmount))
    }
  }, [debtAmount])

  const validateAmount = () => {
    const num = Number(amount)
    if (!num || num <= 0) {
      setMessage(t('student.payments.errors.invalidAmount'))
      setMessageType('error')
      return null
    }
    if (num % lessonPrice !== 0) {
      setMessage(t('student.payments.errors.amountMultiple', { price: lessonPrice }))
      setMessageType('error')
      return null
    }
    return num
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const num = validateAmount()
    if (num == null) return
    if (!receiptFile) {
      setMessage(t('student.payments.errors.noPhoto'))
      setMessageType('error')
      return
    }
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append('amount', String(num))
      formData.append('receipt', receiptFile)
      const res = await fetch('/api/payment/receipt', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || t('student.payments.errors.submitFailed'))
      setMessage(t('student.payments.success', { count: data.creditedLessonsPreview || 0 }))
      setMessageType('success')
      setAmount(debtAmount > 0 ? String(debtAmount) : '')
      setReceiptFile(null)
      const input = document.getElementById('receipt-upload')
      if (input) input.value = ''
      await onRefresh?.()
    } catch (err) {
      setMessage(err.message || t('student.payments.errors.submitError'))
      setMessageType('error')
    } finally {
      setBusy(false)
    }
  }

  const fileLabel = receiptFile ? receiptFile.name : t('student.payments.noFile')

  return (
    <section className={styles.payCard}>
      <div className={styles.payCardHead}>
        <h3>
          <Wallet size={20} />
          {t('student.payments.title')}
        </h3>
        <p>{t('student.payments.subtitle')}</p>
      </div>

      <div className={styles.payCardInner}>
        <div className={styles.paySummaryCol}>
          <div className={styles.payStatsGrid}>
            <div className={styles.payStatItem}>
              <CircleCheck size={16} />
              <span>{t('student.payments.completed')}</span>
              <strong>{paymentStats.completed}</strong>
            </div>
            <div className={styles.payStatItem}>
              <Clock size={16} />
              <span>{t('student.payments.pending')}</span>
              <strong>{paymentStats.pending}</strong>
            </div>
            <div className={styles.payStatItem}>
              <BookOpen size={16} />
              <span>{t('student.payments.lessonCredits')}</span>
              <strong>{lessonCredits}</strong>
            </div>
          </div>

          <div className={`${styles.debtRow} ${hasDebt ? styles.debtRowActive : ''}`}>
            <div className={styles.debtRowMain}>
              <div className={styles.debtRowLabel}>
                {hasDebt ? <AlertTriangle size={18} /> : <CircleCheck size={18} />}
                <span>{t('student.payments.debt')}</span>
              </div>
              <strong className={styles.debtRowValue}>
                {hasDebt
                  ? t('student.payments.debtAmount', { amount: debtAmount, currency })
                  : t('student.payments.noDebt')}
              </strong>
            </div>
            {hasDebt ? (
              <p className={styles.debtRowHint}>
                {t('student.payments.debtHint', { lessons: debtLessons, price: lessonPrice, currency })}
              </p>
            ) : null}
          </div>
        </div>

        <form className={styles.payFormCol} onSubmit={handleSubmit}>
          <div className={styles.payStep}>
            <span className={styles.payStepNum}>1</span>
            <div className={styles.payStepBody}>
              <label className={styles.receiptLabel} htmlFor="pay-amount">
                {t('student.payments.amountLabel')}
              </label>
              <input
                id="pay-amount"
                type="number"
                min={lessonPrice}
                step={lessonPrice}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={styles.receiptInput}
                placeholder={t('student.payments.amountPlaceholder', { amount: lessonPrice * 2 })}
              />
              <p className={styles.payHint}>
                {t('student.payments.amountHint', { price: lessonPrice, format: formatLabel.toLowerCase() })}
              </p>
              <div className={styles.amountChips}>
                {quickAmounts.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={`${styles.amountChip} ${Number(amount) === chip ? styles.amountChipActive : ''}`}
                    onClick={() => setAmount(String(chip))}
                  >
                    {chip} {currency}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.payStep}>
            <span className={styles.payStepNum}>2</span>
            <div className={styles.payStepBody}>
              <p className={styles.payStepTitle}>{t('student.payments.stepTransfer')}</p>
              <p className={styles.payHint}>{t('student.payments.ibanHint')}</p>
              <div className={styles.bankBlock}>
                <CopyRow label={t('student.payments.bankRecipient')} value={bank.recipient} />
                <CopyRow label="IBAN" value={bank.iban} />
                <CopyRow label={t('student.payments.bankTaxId')} value={bank.taxId} />
                <CopyRow label={t('student.payments.bankName')} value={bank.bankName} />
                <CopyRow label={t('student.payments.bankMfo')} value={bank.mfo} />
                <CopyRow label={t('student.payments.bankEdrpou')} value={bank.bankEdrpou} />
              </div>
            </div>
          </div>

          <div className={styles.payStep}>
            <span className={styles.payStepNum}>3</span>
            <div className={styles.payStepBody}>
              <p className={styles.payStepTitle}>{t('student.payments.stepReceipt')}</p>
              <label className={styles.uploadZone} htmlFor="receipt-upload">
                <Upload size={22} />
                <span className={styles.uploadZoneTitle}>{t('student.payments.receiptPhoto')}</span>
                <span className={styles.uploadZoneFile}>{fileLabel}</span>
              </label>
              <input
                id="receipt-upload"
                type="file"
                accept="image/*"
                className={styles.uploadInputHidden}
                onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <button type="submit" className={styles.paySubmitBtn} disabled={busy}>
            {busy ? t('student.payments.submitting') : t('student.payments.payCta')}
          </button>

          {message ? (
            <p className={messageType === 'error' ? styles.payMessageError : styles.payMessageSuccess}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
