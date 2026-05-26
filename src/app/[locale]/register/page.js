'use client'

import React, { useState, useEffect } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { register } from '@/lib/authClient'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'
import Logo from '@/components/Logo/Logo'
import { Eye, EyeOff } from 'lucide-react'
import styles from '../login/Auth.module.css'

export default function RegisterPage() {
  const t = useTranslations('auth.register')
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneInput = usePhoneInput('UA')
  
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

  const hasPhoneInput =
    Boolean(phoneInput.rawDigits) ||
    Boolean(phoneInput.intlInputValue?.replace(/\D/g, ''))

  const phoneClasses = {
    field: styles.formGroup,
    fieldError: phoneStyles.fieldError,
    label: styles.label,
    phoneContainer: phoneStyles.phoneContainer,
    countryBtn: phoneStyles.countryBtn,
    flagEmoji: phoneStyles.flagEmoji,
    dropdownArrow: phoneStyles.dropdownArrow,
    divider: phoneStyles.divider,
    phoneInputWrap: phoneStyles.phoneInputWrap,
    phonePrefix: phoneStyles.phonePrefix,
    phoneInput: phoneStyles.phoneInput,
    dropdown: phoneStyles.dropdown,
    dropdownPortal: phoneStyles.dropdownPortal,
    dropdownSearchWrap: phoneStyles.dropdownSearchWrap,
    dropdownSearch: phoneStyles.dropdownSearch,
    dropdownList: phoneStyles.dropdownList,
    dropdownEmpty: phoneStyles.dropdownEmpty,
    dropdownItem: phoneStyles.dropdownItem,
    dropdownItemActive: phoneStyles.dropdownItemActive,
    dropdownItemFlag: phoneStyles.dropdownItemFlag,
    dropdownItemName: phoneStyles.dropdownItemName,
    dropdownItemCode: phoneStyles.dropdownItemCode,
    dropdownItemDial: phoneStyles.dropdownItemDial,
    error: phoneStyles.error,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError(t('errorPasswordMismatch'))
      return
    }

    if (formData.password.length < 6) {
      setError(t('errorPasswordLength'))
      return
    }

    if (hasPhoneInput && !phoneInput.validateOnSubmit()) {
      return
    }

    setLoading(true)

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        hasPhoneInput ? phoneInput.getFullNumber() : undefined,
        locale,
        claimOrder
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

            <PhoneField
              phoneInput={phoneInput}
              classes={phoneClasses}
              id="phone"
              labelText={t('phone')}
            />

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


