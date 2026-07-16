'use client'

import React, { useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { login } from '@/lib/authClient'
import Logo from '@/components/Logo/Logo'
import { Eye, EyeOff } from 'lucide-react'
import styles from './Auth.module.css'

export default function LoginPage() {
  const t = useTranslations('auth.login')
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/dashboard'
      await login(formData.email, formData.password)
      window.dispatchEvent(new Event('auth:login'))
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
            <button type="button" className={`${styles.authSwitchBtn} ${styles.authSwitchBtnActive}`} aria-current="page">
              {t('signIn')}
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}

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
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder={t('emailPlaceholder')}
              />
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
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? t('submitting') : t('submit')}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Акаунт видає менеджер SmartCode. Якщо маєте посилання з Telegram —
              відкрийте його, щоб увійти в кабінет одразу.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

