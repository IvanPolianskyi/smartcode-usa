'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Wallet, Upload, BookOpen, X, ImageIcon } from 'lucide-react'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function StudentPaymentPanel({
  t,
  paymentStats,
  paymentLoading = false,
  onRefresh,
  defaultOpen = false,
}) {
  const [amount, setAmount] = useState('')
  const [lessonCount, setLessonCount] = useState('1')
  const [receiptFile, setReceiptFile] = useState(null)
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState(null)
  const receiptInputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  const lessonCredits = Number(paymentStats?.lessonCredits || 0)
  const balanceStrongClass =
    !paymentLoading && lessonCredits < 0 ? styles.payStatNegative : undefined

  useEffect(() => {
    if (defaultOpen) {
      document.getElementById('payment-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [defaultOpen])

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
    const lessons = Math.floor(Number(lessonCount) || 0)
    if (!lessons || lessons < 1) {
      setMessage(t('student.payments.errors.invalidLessons'))
      setMessageType('error')
      return null
    }
    return { amount: num, lessons }
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
        <div className={styles.payBalance}>
          <BookOpen size={18} aria-hidden />
          <span>{t('student.payments.accountBalance')}</span>
          <strong className={balanceStrongClass} aria-live="polite">
            {paymentLoading ? t('student.payments.balanceLoading') : lessonCredits}
          </strong>
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
                step="0.01"
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
                onChange={(e) => setLessonCount(e.target.value)}
                className={styles.receiptInput}
              />
            </div>
          </div>

          <div className={styles.payStep}>
            <span className={styles.payStepNum}>2</span>
            <div className={styles.payStepBody}>
              <p className={styles.payStepTitle}>{t('student.payments.stepReceipt')}</p>
              <p className={styles.payHint}>{t('student.payments.receiptHint')}</p>
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
            {busy ? t('student.payments.submitting') : t('student.payments.submit')}
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
