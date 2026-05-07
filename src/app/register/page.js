'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { register } from '@/lib/authClient'
import Logo from '@/components/Logo/Logo'
import { Eye, EyeOff } from 'lucide-react'
import styles from '../login/Auth.module.css'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formatPhoneNumber = (digits) => {
    if (!digits) return '+380 '
    const part1 = digits.slice(0, 2)
    const part2 = digits.slice(2, 5)
    const part3 = digits.slice(5, 7)
    const part4 = digits.slice(7, 9)

    let formatted = '+380 '
    if (part1) formatted += `(${part1}`
    if (part1.length === 2) formatted += ') '
    if (part2) formatted += part2
    if (part2.length === 3 && digits.length > 5) formatted += '-'
    if (part3) formatted += part3
    if (part3.length === 2 && digits.length > 7) formatted += '-'
    if (part4) formatted += part4

    return formatted
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають')
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль повинен містити мінімум 6 символів')
      return
    }

    if (formData.phone && formData.phone.length !== 9) {
      setError('Будь ласка, введіть повний номер телефону (9 цифр після +380)')
      return
    }

    setLoading(true)

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.phone ? `+380${formData.phone}` : undefined
      )
      window.dispatchEvent(new Event('auth:register'))
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err.message || 'Помилка реєстрації. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      const digits = e.target.value.replace(/\D/g, '')
      const clean = digits.startsWith('380') ? digits.slice(3) : digits
      setFormData({
        ...formData,
        phone: clean.slice(0, 9),
      })
      setError('')
      return
    }

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
          <h1 className={styles.title}>Створити акаунт</h1>
          <div className={styles.authSwitch} role="tablist" aria-label="Вибір дії">
            <Link href="/login" className={styles.authSwitchBtn}>
              Увійти
            </Link>
            <button type="button" className={`${styles.authSwitchBtn} ${styles.authSwitchBtnActive}`} aria-current="page">
              Зареєструватися
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                ПІБ учня
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Введіть повне ім'я"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="smartcode@gmail.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Номер телефону
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formatPhoneNumber(formData.phone)}
                onChange={handleChange}
                className={styles.input}
                placeholder="+380 (50) 000-00-00"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль
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
                Підтвердження пароля
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
              {loading ? 'Реєстрація...' : 'Зареєструватися'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Вже зареєстровані?{' '}
              <Link href="/login" className={styles.link}>
                Увійти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


