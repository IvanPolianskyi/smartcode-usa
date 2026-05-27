'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Wallet, Copy, Check, Upload, AlertTriangle, CircleCheck, Clock, BookOpen, X, ImageIcon } from 'lucide-react'
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
  paymentStats,
  scheduleCount = 0,
  lessonPrice = 350,
  onRefresh,
  defaultOpen = false,
}) {
  const [amount, setAmount] = useState('')
  const [lessonCount, setLessonCount] = useState('1')
  const [lessonCountTouched, setLessonCountTouched] = useState(false)
  const [receiptFile, setReceiptFile] = useState(null)
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState(null)
  const receiptInputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  const bank = UK_BANK_PAYMENT_DETAILS
  const lessonCredits = Number(paymentStats?.lessonCredits || 0)

  const debtLessons = useMemo(() => {
    if (scheduleCount > 0) {
      return Math.max(0, scheduleCount - lessonCredits)
    }
    return lessonCredits < 1 ? 1 : 0
  }, [scheduleCount, lessonCredits])

  const hasDebt = debtLessons > 0

  useEffect(() => {
    if (defaultOpen) {
      document.getElementById('payment-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [defaultOpen])

  const lessonsFromAmount = useMemo(() => {
    const num = Number(amount)
    const price = Number(lessonPrice)
    if (!Number.isFinite(num) || num <= 0 || !Number.isFinite(price) || price <= 0) {
      return null
    }
    return Math.floor(num / price)
  }, [amount, lessonPrice])

  useEffect(() => {
    if (lessonsFromAmount && lessonsFromAmount >= 1 && !lessonCountTouched) {
      setLessonCount(String(lessonsFromAmount))
    }
  }, [lessonsFromAmount, lessonCountTouched])

  useEffect(() => {
    if (debtLessons > 0 && !amount) {
      setAmount(String(lessonPrice))
      if (!lessonCountTouched) setLessonCount('1')
    }
  }, [debtLessons, lessonPrice, amount, lessonCountTouched])

  useEffect(() => {
    if (!receiptFile) {
      setReceiptPreviewUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(receiptFile)
    setReceiptPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [receiptFile])

  const clearReceipt = () => {
    setReceiptFile(null)
    if (receiptInputRef.current) receiptInputRef.current.value = ''
  }

  const validateForm = () => {
    const num = Number(amount)
    if (!num || num <= 0) {
      setMessage(t('student.payments.errors.invalidAmount'))
      setMessageType('error')
      return null
    }
    const price = Number(lessonPrice)
    const lessonsFromSum =
      price > 0 ? Math.floor(num / price) : Math.floor(Number(lessonCount))
    if (!lessonsFromSum || lessonsFromSum < 1) {
      setMessage(
        price > 0
          ? t('student.payments.errors.amountTooLow', { price })
          : t('student.payments.errors.invalidLessons')
      )
      setMessageType('error')
      return null
    }
    return { amount: num, lessons: lessonsFromSum }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const validated = validateForm()
    if (!validated) return
    if (!receiptFile) {
      setMessage(t('student.payments.errors.noPhoto'))
      setMessageType('error')
      return
    }
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append('amount', String(validated.amount))
      formData.append('creditedLessons', String(validated.lessons))
      formData.append('receipt', receiptFile)
      const res = await fetch('/api/payment/receipt', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || t('student.payments.errors.submitFailed'))
      setMessage(t('student.payments.success', { count: data.creditedLessonsPreview || 0 }))
      setMessageType('success')
      setAmount('')
      setLessonCount('1')
      clearReceipt()
      await onRefresh?.()
    } catch (err) {
      setMessage(err.message || t('student.payments.errors.submitError'))
      setMessageType('error')
    } finally {
      setBusy(false)
    }
  }

  const hasReceiptPreview = Boolean(receiptFile && receiptPreviewUrl)

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
                  ? t('student.payments.debtLessons', { count: debtLessons })
                  : t('student.payments.noDebt')}
              </strong>
            </div>
            {hasDebt ? (
              <p className={styles.debtRowHint}>
                {t('student.payments.debtHint', { lessons: debtLessons })}
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
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={styles.receiptInput}
                placeholder={t('student.payments.amountPlaceholder')}
              />
              <label className={`${styles.receiptLabel} ${styles.payFieldSpaced}`} htmlFor="pay-lessons">
                {t('student.payments.lessonsLabel')}
              </label>
              <input
                id="pay-lessons"
                type="number"
                min={1}
                step={1}
                value={lessonCount}
                onChange={(e) => {
                  setLessonCountTouched(true)
                  setLessonCount(e.target.value)
                }}
                className={styles.receiptInput}
              />
              <p className={styles.payHint}>
                {lessonsFromAmount && lessonsFromAmount >= 1
                  ? t('student.payments.lessonsFromAmount', {
                      count: lessonsFromAmount,
                      price: lessonPrice,
                    })
                  : t('student.payments.lessonsHint', { price: lessonPrice })}
              </p>
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
              {hasReceiptPreview ? (
                <div className={styles.receiptPreviewCard}>
                  <div className={styles.receiptPreviewHead}>
                    <span className={styles.receiptPreviewBadge}>
                      <ImageIcon size={14} aria-hidden />
                      {t('student.payments.receiptAttached')}
                    </span>
                    <button
                      type="button"
                      className={styles.receiptPreviewRemove}
                      onClick={clearReceipt}
                      aria-label={t('student.payments.removeReceipt')}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className={styles.receiptPreviewImageWrap}>
                    <img
                      src={receiptPreviewUrl}
                      alt={t('student.payments.receiptPreviewAlt')}
                      className={styles.receiptPreviewImage}
                    />
                  </div>
                  <p className={styles.receiptPreviewFileName} title={receiptFile.name}>
                    {receiptFile.name}
                  </p>
                  <button
                    type="button"
                    className={styles.receiptPreviewChangeBtn}
                    onClick={() => receiptInputRef.current?.click()}
                  >
                    {t('student.payments.changeReceipt')}
                  </button>
                </div>
              ) : (
                <label className={styles.uploadZone} htmlFor="receipt-upload">
                  <Upload size={22} />
                  <span className={styles.uploadZoneTitle}>{t('student.payments.receiptPhoto')}</span>
                  <span className={styles.uploadZoneFile}>{t('student.payments.noFile')}</span>
                </label>
              )}
              <input
                id="receipt-upload"
                ref={receiptInputRef}
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
