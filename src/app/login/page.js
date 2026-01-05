'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/lib/authClient'
import Logo from '@/components/Logo/Logo'
import { Eye, EyeOff } from 'lucide-react'
import styles from './Auth.module.css'

export default function LoginPage() {
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
      setError(err.message || 'Помилка входу. Перевірте дані.')
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
          <h1 className={styles.title}>Увійти в акаунт</h1>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Ел. пошта
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
              <div className={styles.passwordLabelRow}>
                <label htmlFor="password" className={styles.label}>
                  Пароль
                </label>
                <Link href="/forgot-password" className={styles.forgotPassword}>
                  Забули пароль?
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
              {loading ? 'Вхід...' : 'Увійти'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Ще не зареєстровані?{' '}
              <Link href="/register" className={styles.link}>
                Створити акаунт
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

