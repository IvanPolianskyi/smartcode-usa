'use client'

import React, { Suspense, useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { register } from '@/lib/authClient'
import Logo from '@/components/Logo/Logo'
import { Eye, EyeOff } from 'lucide-react'
import styles from '../login/Auth.module.css'

function RegisterPageContent() {
  const t = useTranslations('auth.register')
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialEmail = searchParams.get('email') || ''
  const claimOrder = searchParams.get('claimOrder')

  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!privacyAccepted) {
      setError(t('errorAcceptPrivacy'))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('errorPasswordMismatch'))
      return
    }

    if (formData.password.length < 6) {
      setError(t('errorPasswordLength'))
      return
    }

    setLoading(true)

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        locale,
        claimOrder,
        true
      )
      window.dispatchEvent(new Event('auth:register'))
      const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/dashboard'
      router.push(redirectUrl)
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Logo href="/" className={styles.logo} />
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>{t('title')}</h1>
          <div className={styles.authSwitch} role="tablist" aria-label={t('switchAria')}>
            <Link href="/login" className={styles.authSwitchBtn}>
              {t('signIn')}
            </Link>
            <button type="button" className={`${styles.authSwitchBtn} ${styles.authSwitchBtnActive}`} aria-current="page">
              {t('signUp')}
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                {t('fullName')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder={t('fullNamePlaceholder')}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder={t('emailPlaceholder')}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                {t('password')}
              </label>
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
                  minLength={6}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                {t('confirmPassword')}
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <label className={styles.legalCheckboxRow}>
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked)
                  if (error) setError('')
                }}
                required
              />
              <span>
                {t.rich('privacyCheckbox', {
                  privacy: (chunks) => (
                    <Link href="/privacy" className={styles.legalLink}>
                      {chunks}
                    </Link>
                  ),
                })}
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !privacyAccepted}
              className={styles.submitButton}
            >
              {loading ? t('submitting') : t('submit')}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              {t('footer')}{' '}
              <Link href="/login" className={styles.link}>
                {t('footerLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const t = useTranslations('auth.register')

  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.logoWrapper}>
              <Logo href="/" className={styles.logo} />
            </div>
            <div className={styles.card}>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.label}>{t('submitting')}</p>
            </div>
          </div>
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  )
}

