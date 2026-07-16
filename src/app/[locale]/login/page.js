'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { login } from '@/lib/authClient'
import { normalizeLoginIdentifier } from '@/lib/authLogin'
import Logo from '@/components/Logo/Logo'
import { Eye, EyeOff } from 'lucide-react'
import styles from './Auth.module.css'

function LoginForm() {
  const t = useTranslations('auth.login')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const prefill = String(searchParams.get('email') || '').trim()
    if (prefill) {
      setFormData((prev) => ({ ...prev, email: prefill }))
    }
  }, [searchParams])

  const banner = useMemo(() => {
    const err = searchParams.get('error')
    if (err === 'magic_expired') return { kind: 'warn', text: t('bannerMagicExpired') }
    if (err === 'magic_missing') return { kind: 'warn', text: t('bannerMagicMissing') }
    if (searchParams.get('paid') === '1' || searchParams.get('needAccount') === '1') {
      return { kind: 'info', text: t('bannerNeedAccount') }
    }
    if (searchParams.get('claimOrder')) {
      return { kind: 'info', text: t('bannerNeedAccount') }
    }
    return null
  }, [searchParams, t])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const redirectParam =
        new URLSearchParams(window.location.search).get('redirect') || ''
      const loginId = normalizeLoginIdentifier(formData.email)
      const data = await login(loginId, formData.password)
      window.dispatchEvent(new Event('auth:login'))
      const primary = String(data?.user?.studentProfile?.primaryCourseId || '').trim()
      const safeRedirect =
        redirectParam.startsWith('/') && !redirectParam.startsWith('//')
          ? redirectParam
          : primary
            ? `/courses/${primary}`
            : '/dashboard'
      router.push(safeRedirect)
      router.refresh()
    } catch (err) {
      setError(err.message || t('error'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      {banner ? (
        <div
          className={banner.kind === 'warn' ? styles.bannerWarn : styles.bannerInfo}
          role="status"
        >
          {banner.text}
        </div>
      ) : null}

      {error ? <div className={styles.error}>{error}</div> : null}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t('email')}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="username"
            inputMode="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t('emailPlaceholder')}
          />
          <p className={styles.fieldHint}>{t('emailHint')}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.passwordLabelRow}>
            <label htmlFor="password" className={styles.label}>
              {t('password')}
            </label>
            <Link href="/forgot-password" className={styles.forgotPassword}>
              {t('forgotPassword')}
            </Link>
          </div>
          <div className={styles.passwordInputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="••••••••"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? t('submitting') : t('submit')}
        </button>
      </form>

      <div className={styles.helpBox}>
        <p className={styles.helpTitle}>{t('helpTitle')}</p>
        <ul className={styles.helpList}>
          <li>{t('helpTelegram')}</li>
          <li>{t('helpManager')}</li>
          <li>{t('helpMagic')}</li>
        </ul>
      </div>

      <div className={styles.footer}>
        <p>{t('footer')}</p>
        <p>
          <Link href="/" className={styles.link}>
            {t('footerHome')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Logo href="/" className={styles.logo} />
        </div>
        <Suspense fallback={<div className={styles.card} />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
