'use client'

import React, { useState } from 'react'
import { CreditCard, Building2, Copy, Check } from 'lucide-react'
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
      <div>
        <div className={styles.bankLabel}>{label}</div>
        <div className={styles.bankValue}>{value}</div>
      </div>
      <button type="button" className={styles.copyBtn} onClick={copy} title="Копіювати">
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
  onRefresh,
}) {
  const [payOpen, setPayOpen] = useState(false)
  const [payMode, setPayMode] = useState('wayforpay')
  const [amount, setAmount] = useState('')
  const [receiptFile, setReceiptFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const bank = UK_BANK_PAYMENT_DETAILS

  const validateAmount = () => {
    const num = Number(amount)
    if (!num || num <= 0) {
      setMessage(t('student.payments.errors.invalidAmount'))
      return null
    }
    if (num % lessonPrice !== 0) {
      setMessage(t('student.payments.errors.amountMultiple', { price: lessonPrice }))
      return null
    }
    return num
  }

  const handleWayforpay = async () => {
    setMessage('')
    const num = validateAmount()
    if (num == null) return
    setBusy(true)
    try {
      const res = await fetch('/api/payment/wayforpay-topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: num }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || t('student.payments.errors.wfpFailed'))
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
        return
      }
      throw new Error(t('student.payments.errors.wfpFailed'))
    } catch (e) {
      setMessage(e.message || t('student.payments.errors.submitError'))
    } finally {
      setBusy(false)
    }
  }

  const handleIbanReceipt = async (e) => {
    e.preventDefault()
    setMessage('')
    const num = validateAmount()
    if (num == null) return
    if (!receiptFile) {
      setMessage(t('student.payments.errors.noPhoto'))
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
      setAmount('')
      setReceiptFile(null)
      await onRefresh?.()
    } catch (err) {
      setMessage(err.message || t('student.payments.errors.submitError'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <CreditCard size={18} /> {t('student.payments.title')}
      </h3>
      <div className={styles.listRow}>
        <span>{t('student.payments.completed')}</span>
        <strong>{paymentStats.completed}</strong>
      </div>
      <div className={styles.listRow}>
        <span>{t('student.payments.pending')}</span>
        <strong>{paymentStats.pending}</strong>
      </div>
      <div className={styles.listRow}>
        <span>{t('student.payments.lessonCredits')}</span>
        <strong>{paymentStats.lessonCredits || 0}</strong>
      </div>

      <button
        type="button"
        className={styles.primaryBtn}
        style={{ marginTop: '0.75rem', width: '100%' }}
        onClick={() => setPayOpen((p) => !p)}
      >
        {payOpen ? t('student.payments.closePay') : t('student.payments.openPay')}
      </button>

      {payOpen && (
        <div className={styles.payPanel}>
          <div className={styles.payModeRow}>
            <button
              type="button"
              className={`${styles.payModeBtn} ${payMode === 'wayforpay' ? styles.payModeBtnActive : ''}`}
              onClick={() => setPayMode('wayforpay')}
            >
              <CreditCard size={16} />
              {t('student.payments.modeWayforpay')}
            </button>
            <button
              type="button"
              className={`${styles.payModeBtn} ${payMode === 'iban' ? styles.payModeBtnActive : ''}`}
              onClick={() => setPayMode('iban')}
            >
              <Building2 size={16} />
              {t('student.payments.modeIban')}
            </button>
          </div>

          <label className={styles.receiptLabel}>
            {t('student.payments.amountLabel')}
            <input
              type="number"
              min={lessonPrice}
              step={lessonPrice}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.receiptInput}
              placeholder={t('student.payments.amountPlaceholder', { amount: lessonPrice * 2 })}
            />
          </label>
          <p className={styles.receiptMessage} style={{ marginTop: '-0.15rem' }}>
            {t('student.payments.amountHint', { price: lessonPrice, format: formatLabel.toLowerCase() })}
          </p>

          {payMode === 'wayforpay' ? (
            <div className={styles.paySection}>
              <p className={styles.cardText}>{t('student.payments.wayforpayHint')}</p>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={busy}
                onClick={handleWayforpay}
              >
                {busy ? t('student.payments.submitting') : t('student.payments.payWayforpay')}
              </button>
            </div>
          ) : (
            <div className={styles.paySection}>
              <p className={styles.cardText}>{t('student.payments.ibanHint')}</p>
              <div className={styles.bankBlock}>
                <CopyRow label={t('student.payments.bankRecipient')} value={bank.recipient} />
                <CopyRow label="IBAN" value={bank.iban} />
                <CopyRow label={t('student.payments.bankTaxId')} value={bank.taxId} />
                <CopyRow label={t('student.payments.bankName')} value={bank.bankName} />
                <CopyRow label={t('student.payments.bankMfo')} value={bank.mfo} />
                <CopyRow label={t('student.payments.bankEdrpou')} value={bank.bankEdrpou} />
              </div>
              <form className={styles.receiptForm} onSubmit={handleIbanReceipt}>
                <label className={styles.receiptLabel}>
                  {t('student.payments.receiptPhoto')}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    className={styles.receiptInput}
                    required
                  />
                </label>
                <button type="submit" className={styles.secondaryBtn} disabled={busy}>
                  {busy ? t('student.payments.submitting') : t('student.payments.submitReceipt')}
                </button>
              </form>
            </div>
          )}

          {message && <p className={styles.receiptMessage}>{message}</p>}
        </div>
      )}
    </div>
  )
}
