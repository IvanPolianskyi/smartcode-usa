'use client'

import { useCallback, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import styles from './CertificateView.module.css'

function formatIssuedAt(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

function slugifyName(name) {
  return String(name || 'student')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-яіїєґ0-9\-]/gi, '')
    .slice(0, 40) || 'student'
}

export default function CertificateView({ certificate }) {
  const cardRef = useRef(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const issuedLabel = formatIssuedAt(certificate.issuedAt)
  const verification = String(certificate.id || '').slice(-8).toUpperCase()

  const savePhoto = useCallback(async () => {
    if (!cardRef.current || saving) return
    setSaving(true)
    setError(null)
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0a0612',
      })
      const link = document.createElement('a')
      link.download = `smartcode-certificate-${slugifyName(certificate.studentName)}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error('Certificate PNG error:', e)
      setError('Не вдалося зберегти фото. Спробуйте ще раз або зробіть скріншот.')
    } finally {
      setSaving(false)
    }
  }, [certificate.studentName, saving])

  return (
    <div className={styles.page}>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.saveBtn}
          onClick={() => void savePhoto()}
          disabled={saving}
        >
          {saving ? 'Збереження…' : 'Зберегти фото сертифіката'}
        </button>
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>

      <div className={styles.cardWrap}>
        <article ref={cardRef} className={styles.card} aria-label="Сертифікат">
          <div className={styles.ornamentTop} />
          <p className={styles.brand}>SmartCode Academy</p>
          <h1 className={styles.heading}>Сертифікат</h1>
          <p className={styles.sub}>про завершення курсу</p>

          <p className={styles.awarded}>Цим засвідчується, що</p>
          <p className={styles.name}>{certificate.studentName}</p>

          <p className={styles.completed}>успішно завершив(ла)</p>
          <p className={styles.track}>{certificate.trackTitle}</p>
          {certificate.directionLabel ? (
            <p className={styles.direction}>{certificate.directionLabel}</p>
          ) : null}

          <div className={styles.footer}>
            <div>
              <p className={styles.metaLabel}>Дата видачі</p>
              <p className={styles.metaValue}>{issuedLabel || '—'}</p>
            </div>
            <div className={styles.seal}>
              <span>SC</span>
            </div>
            <div className={styles.metaRight}>
              <p className={styles.metaLabel}>Код перевірки</p>
              <p className={styles.metaValue}>{verification}</p>
            </div>
          </div>
          <div className={styles.ornamentBottom} />
        </article>
      </div>
    </div>
  )
}
