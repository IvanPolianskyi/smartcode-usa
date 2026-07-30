'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Wallet, Upload, BookOpen, X, ImageIcon, Star, Gift } from 'lucide-react'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

function packageLessonsLabel(t, count) {
  const n = Number(count) || 0
  if (n === 1) return t('student.packages.oneLesson')
  if (n >= 2 && n <= 4) return t('student.packages.lessonsFew', { count: n })
  return t('student.packages.lessonsMany', { count: n })
}

/** Пропозиція з пакетами (як у повідомленні бота «Як оплатити?»). */
function LessonPackagesOffer({ t, paymentStats, onSelect }) {
  const packages = Array.isArray(paymentStats?.lessonPackages)
    ? paymentStats.lessonPackages
    : []
  if (packages.length === 0) return null

  const lessonPrice = Number(paymentStats?.lessonPrice || 0)
  const isGroup = String(paymentStats?.lessonFormat || '') === 'group'
  const best = packages.find((p) => p?.is_best_value)

  return (
    <div className={styles.packOffer}>
      <div className={styles.packOfferHead}>
        <h4>{t('student.packages.title')}</h4>
        <p>{t('student.packages.subtitle')}</p>
      </div>
      <p className={styles.packMeta}>
        {isGroup
          ? t('student.packages.formatGroup')
          : t('student.packages.formatIndividual')}
        {lessonPrice > 0
          ? ` · ${t('student.packages.basePrice', { price: lessonPrice })}`
          : ''}
      </p>
      <div className={styles.packGrid}>
        {packages.map((pack) => {
          const n = Number(pack.lessons) || 0
          const showGift = Boolean(pack.show_gift_in_copy) && Number(pack.gift_lessons) >= 1
          return (
            <button
              key={n}
              type="button"
              className={`${styles.packItem} ${pack.is_best_value ? styles.packItemBest : ''}`}
              onClick={() => onSelect?.(pack)}
            >
              {pack.is_best_value ? (
                <span className={styles.packBestBadge}>
                  <Star size={12} aria-hidden /> {t('student.packages.bestValue')}
                </span>
              ) : null}
              <strong className={styles.packCount}>{packageLessonsLabel(t, n)}</strong>
              <span className={styles.packUnit}>
                {t('student.packages.perLesson', { price: pack.unit_price })}
              </span>
              <span className={styles.packTotal}>
                {t('student.packages.total', { total: pack.total })}
              </span>
              {showGift ? (
                <span className={styles.packGift}>
                  <Gift size={12} aria-hidden />{' '}
                  {t('student.packages.payAsFor', { count: pack.paid_as_lessons })} ·{' '}
                  {t('student.packages.gift', { count: pack.gift_lessons })}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
      {best ? (
        <p className={styles.packBestNote}>
          {t('student.packages.bestNote', {
            count: best.lessons,
            price: best.unit_price,
          })}
        </p>
      ) : null}
      <p className={styles.packChooseHint}>{t('student.packages.chooseHint')}</p>
    </div>
  )
}

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
    !paymentLoading &&
    paymentStats?.lessonCredits != null &&
    lessonCredits < 0
      ? styles.payStatNegative
      : undefined
  const debtLessons =
    !paymentLoading && paymentStats?.debtLessons != null
      ? Number(paymentStats.debtLessons) || 0
      : 0
  const debtItems =
    !paymentLoading && Array.isArray(paymentStats?.debtItems)
      ? paymentStats.debtItems
      : []
  const pendingReceiptsCount = paymentLoading
    ? 0
    : Math.max(
        Number(paymentStats?.pendingReceiptsCount || 0),
        paymentStats?.hasPendingReceiptReview ? 1 : 0
      )

  const applyPackage = (pack) => {
    const total = Number(pack?.total || 0)
    const lessons = Number(pack?.lessons || 0)
    if (!total || !lessons) return
    setAmount(String(total))
    setLessonCount(String(lessons))
    setMessage('')
    document.getElementById('pay-amount')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

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

        {!paymentLoading && debtLessons > 0 ? (
          <div className={styles.payDebtNote}>
            <p>{t('student.payments.debtNote', { count: debtLessons })}</p>
            {debtItems.length > 0 ? (
              <ul>
                {debtItems.slice(0, 3).map((item, i) => (
                  <li key={item.lesson_id || i}>
                    {[item.date_label, item.time, item.kind].filter(Boolean).join(' · ')}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {!paymentLoading && pendingReceiptsCount > 0 ? (
          <p className={styles.payPendingNote}>
            {t('student.payments.pendingReviewNote', { count: pendingReceiptsCount })}
          </p>
        ) : null}

        <LessonPackagesOffer t={t} paymentStats={paymentStats} onSelect={applyPackage} />

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
