'use client'

import { useCallback, useMemo, useState } from 'react'
import styles from './AffiliateCabinet.module.css'

const PLATFORMS = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'threads', label: 'Threads' },
  { value: 'other', label: 'Інше' },
]

const GROUP_PLATFORMS = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'other', label: 'Інше' },
]

const GROUP_STATUSES = [
  { value: 'testing', label: 'Тестую' },
  { value: 'active', label: 'Працює' },
  { value: 'paused', label: 'На паузі' },
  { value: 'dead', label: 'Не працює' },
]

const LEAD_STATUS_LABELS = {
  new: 'Нова',
  scheduling_trial: 'Записуємо на пробне',
  trial_scheduled: 'Пробне призначено',
  enrolled: 'Записався на курс',
  not_enrolled: 'Не записався',
}

const platformLabel = (value) =>
  PLATFORMS.find((p) => p.value === value)?.label || 'Інше'

const groupPlatformLabel = (value) =>
  GROUP_PLATFORMS.find((p) => p.value === value)?.label || 'Інше'

const groupStatusLabel = (value) =>
  GROUP_STATUSES.find((p) => p.value === value)?.label || value

const emptyGroupForm = () => ({
  title: '',
  platform: 'telegram',
  url: '',
  city: '',
  niche: '',
  size_estimate: '',
  status: 'testing',
  notes: '',
})

const formatNumber = (value) => new Intl.NumberFormat('uk-UA').format(Number(value) || 0)

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

async function callCabinetApi(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: { 'content-type': 'application/json' },
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.error || 'Не вдалося зберегти зміни')
  }
  return data
}

export default function AffiliateCabinet({ token, initialCabinet }) {
  const [cabinet, setCabinet] = useState(initialCabinet)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)

  const [socialPlatform, setSocialPlatform] = useState('tiktok')
  const [socialUrl, setSocialUrl] = useState('')

  const [postUrl, setPostUrl] = useState('')
  const [postPlatform, setPostPlatform] = useState('tiktok')
  const [postViews, setPostViews] = useState('')
  const [groupForm, setGroupForm] = useState(emptyGroupForm)
  const [editingGroupId, setEditingGroupId] = useState(null)
  const [copiedGroupId, setCopiedGroupId] = useState(null)

  const stats = cabinet.stats || {}
  const socials = useMemo(() => cabinet.socials || [], [cabinet.socials])
  const groups = useMemo(() => cabinet.groups || [], [cabinet.groups])
  const apiBase = `/api/affiliate/${encodeURIComponent(token)}`

  const runAction = useCallback(async (action, successMessage) => {
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const updated = await action()
      if (updated) setCabinet(updated)
      if (successMessage) setNotice(successMessage)
      return true
    } catch (e) {
      setError(e?.message || 'Сталася помилка')
      return false
    } finally {
      setBusy(false)
    }
  }, [])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cabinet.referral_url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Не вдалося скопіювати. Скопіюйте посилання вручну.')
    }
  }, [cabinet.referral_url])

  const saveSocials = useCallback(
    (nextSocials, message) =>
      runAction(
        () =>
          callCabinetApi(`${apiBase}/socials`, {
            method: 'PUT',
            body: JSON.stringify({ socials: nextSocials }),
          }),
        message
      ),
    [apiBase, runAction]
  )

  const addSocial = useCallback(async () => {
    const url = socialUrl.trim()
    if (!url) {
      setError('Вставте посилання на профіль')
      return
    }
    const ok = await saveSocials(
      [...socials, { platform: socialPlatform, url }],
      'Соцмережу додано'
    )
    if (ok) setSocialUrl('')
  }, [saveSocials, socialPlatform, socialUrl, socials])

  const removeSocial = useCallback(
    (index) =>
      saveSocials(
        socials.filter((_, i) => i !== index),
        'Соцмережу видалено'
      ),
    [saveSocials, socials]
  )

  const submitPost = useCallback(async () => {
    const url = postUrl.trim()
    const views = Number(postViews)
    if (!url) {
      setError('Вставте посилання на допис')
      return
    }
    if (!Number.isFinite(views) || views < 0) {
      setError('Вкажіть кількість переглядів числом')
      return
    }
    const ok = await runAction(
      () =>
        callCabinetApi(`${apiBase}/social-posts`, {
          method: 'POST',
          body: JSON.stringify({ url, platform: postPlatform, views }),
        }),
      'Перегляди збережено'
    )
    if (ok) {
      setPostUrl('')
      setPostViews('')
    }
  }, [apiBase, postPlatform, postUrl, postViews, runAction])

  const removePost = useCallback(
    (postId) =>
      runAction(
        () =>
          callCabinetApi(`${apiBase}/social-posts/${encodeURIComponent(postId)}`, {
            method: 'DELETE',
          }),
        'Допис видалено'
      ),
    [apiBase, runAction]
  )

  const copyGroupLink = useCallback(async (group) => {
    try {
      await navigator.clipboard.writeText(group.tracking_url)
      setCopiedGroupId(group.id)
      setTimeout(() => setCopiedGroupId(null), 2000)
    } catch {
      setError('Не вдалося скопіювати. Скопіюйте посилання вручну.')
    }
  }, [])

  const startEditGroup = useCallback((group) => {
    setEditingGroupId(group.id)
    setGroupForm({
      title: group.title || '',
      platform: group.platform || 'telegram',
      url: group.url || '',
      city: group.city || '',
      niche: group.niche || '',
      size_estimate: group.size_estimate || '',
      status: group.status || 'testing',
      notes: group.notes || '',
    })
  }, [])

  const resetGroupForm = useCallback(() => {
    setEditingGroupId(null)
    setGroupForm(emptyGroupForm())
  }, [])

  const saveGroup = useCallback(async () => {
    const title = groupForm.title.trim()
    if (!title) {
      setError('Вкажіть назву групи')
      return
    }
    const payload = {
      title,
      platform: groupForm.platform || 'telegram',
      url: groupForm.url.trim() || null,
      city: groupForm.city.trim() || null,
      niche: groupForm.niche.trim() || null,
      size_estimate: groupForm.size_estimate.trim() || null,
      status: groupForm.status || 'testing',
      notes: groupForm.notes.trim() || null,
    }
    const ok = await runAction(
      () =>
        editingGroupId
          ? callCabinetApi(`${apiBase}/groups/${encodeURIComponent(editingGroupId)}`, {
              method: 'PATCH',
              body: JSON.stringify(payload),
            })
          : callCabinetApi(`${apiBase}/groups`, {
              method: 'POST',
              body: JSON.stringify(payload),
            }),
      editingGroupId ? 'Групу оновлено' : 'Групу додано'
    )
    if (ok) resetGroupForm()
  }, [apiBase, editingGroupId, groupForm, resetGroupForm, runAction])

  const removeGroup = useCallback(
    (groupId) =>
      runAction(
        () =>
          callCabinetApi(`${apiBase}/groups/${encodeURIComponent(groupId)}`, {
            method: 'DELETE',
          }),
        'Групу прибрано з робочого простору'
      ),
    [apiBase, runAction]
  )

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Кабінет партнера SmartCode</p>
          <h1 className={styles.title}>{cabinet.full_name}</h1>
          <p className={styles.subtitle}>
            Приводьте учнів за своїм посиланням — тут видно кожен перехід, заявку
            і нарахування.
          </p>
        </header>

        {error && <p className={styles.error}>{error}</p>}
        {notice && !error && <p className={styles.success}>{notice}</p>}

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Ваше реферальне посилання</h2>
          <div className={styles.linkRow}>
            <code className={styles.linkValue}>{cabinet.referral_url}</code>
            <button type="button" className={styles.btn} onClick={copyLink}>
              {copied ? 'Скопійовано' : 'Копіювати'}
            </button>
          </div>
          <p className={styles.cardHint}>
            Посилання працює 30 днів після переходу: якщо людина залишить заявку
            протягом цього часу, вона зарахується вам.
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Результати</h2>
          <div className={styles.kpiGrid}>
            <div className={styles.kpi}>
              <span className={styles.kpiLabel}>Переходи</span>
              <span className={styles.kpiValue}>{formatNumber(stats.clicks)}</span>
              <span className={styles.kpiNote}>
                унікальних: {formatNumber(stats.unique_clicks)}
              </span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiLabel}>Перегляди соцмереж</span>
              <span className={styles.kpiValue}>{formatNumber(stats.social_views)}</span>
              <span className={styles.kpiNote}>за вашими звітами</span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiLabel}>Заявки</span>
              <span className={styles.kpiValue}>{formatNumber(stats.leads)}</span>
              <span className={styles.kpiNote}>
                конверсія: {Number(stats.conversion_rate || 0)}%
              </span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiLabel}>Пробні уроки</span>
              <span className={styles.kpiValue}>{formatNumber(stats.trials)}</span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiLabel}>Записались на курс</span>
              <span className={styles.kpiValue}>{formatNumber(stats.enrolled)}</span>
              <span className={styles.kpiNote}>
                ставка: {formatNumber(cabinet.commission_uah)} грн за учня
              </span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiLabel}>До виплати</span>
              <span className={`${styles.kpiValue} ${styles.kpiAccent}`}>
                {formatNumber(stats.balance_uah)} грн
              </span>
              <span className={styles.kpiNote}>
                нараховано {formatNumber(stats.accrued_uah)} · виплачено{' '}
                {formatNumber(stats.paid_uah)}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Мої соцмережі</h2>
          <p className={styles.cardHint}>
            Додайте профілі, де ви розповідаєте про SmartCode — щоб ми бачили
            джерела трафіку.
          </p>
          <div className={styles.formRow}>
            <select
              className={`${styles.select} ${styles.inputNarrow}`}
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              aria-label="Платформа"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              className={styles.input}
              type="url"
              inputMode="url"
              placeholder="https://tiktok.com/@your_profile"
              value={socialUrl}
              onChange={(e) => setSocialUrl(e.target.value)}
              aria-label="Посилання на профіль"
            />
            <button
              type="button"
              className={styles.btn}
              onClick={addSocial}
              disabled={busy}
            >
              Додати
            </button>
          </div>

          {socials.length === 0 ? (
            <p className={styles.empty}>Поки що не додано жодного профілю.</p>
          ) : (
            <ul className={styles.list}>
              {socials.map((social, index) => (
                <li key={`${social.url}-${index}`} className={styles.listItem}>
                  <span className={styles.badge}>{platformLabel(social.platform)}</span>
                  <div className={styles.listMain}>
                    <span className={styles.listTitle}>{social.url}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => removeSocial(index)}
                    disabled={busy}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Мої групи</h2>
          <p className={styles.cardHint}>
            Збирай сюди Telegram- і Facebook-групи, з якими працюєш. Для кожної — своє
            посилання: так побачиш, яка реально приводить заявки.
          </p>

          <div className={styles.formStack}>
            <div className={styles.formGrid}>
              <input
                className={styles.input}
                type="text"
                placeholder="Назва групи"
                value={groupForm.title}
                onChange={(e) =>
                  setGroupForm((prev) => ({ ...prev, title: e.target.value }))
                }
                aria-label="Назва групи"
              />
              <select
                className={styles.select}
                value={groupForm.platform}
                onChange={(e) =>
                  setGroupForm((prev) => ({ ...prev, platform: e.target.value }))
                }
                aria-label="Платформа групи"
              >
                {GROUP_PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <select
                className={styles.select}
                value={groupForm.status}
                onChange={(e) =>
                  setGroupForm((prev) => ({ ...prev, status: e.target.value }))
                }
                aria-label="Статус групи"
              >
                {GROUP_STATUSES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <input
                className={styles.input}
                type="url"
                inputMode="url"
                placeholder="Посилання на групу (необовʼязково)"
                value={groupForm.url}
                onChange={(e) =>
                  setGroupForm((prev) => ({ ...prev, url: e.target.value }))
                }
                aria-label="Посилання на групу"
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Місто"
                value={groupForm.city}
                onChange={(e) =>
                  setGroupForm((prev) => ({ ...prev, city: e.target.value }))
                }
                aria-label="Місто"
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Ніша (мами, ЖК, школа…)"
                value={groupForm.niche}
                onChange={(e) =>
                  setGroupForm((prev) => ({ ...prev, niche: e.target.value }))
                }
                aria-label="Ніша"
              />
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Нотатка для себе"
              value={groupForm.notes}
              onChange={(e) =>
                setGroupForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              aria-label="Нотатка"
            />
            <div className={styles.groupActions}>
              <button
                type="button"
                className={styles.btn}
                onClick={saveGroup}
                disabled={busy}
              >
                {editingGroupId ? 'Зберегти зміни' : 'Додати групу'}
              </button>
              {editingGroupId ? (
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={resetGroupForm}
                  disabled={busy}
                >
                  Скасувати
                </button>
              ) : null}
            </div>
          </div>

          {groups.length === 0 ? (
            <p className={styles.empty}>
              Поки порожньо. Додай першу групу — і тримай під рукою окреме посилання
              для неї.
            </p>
          ) : (
            <div className={styles.formStack}>
              {groups.map((group) => (
                <article key={group.id} className={styles.groupCard}>
                  <div className={styles.groupHeader}>
                    <div>
                      <h3 className={styles.groupTitle}>{group.title}</h3>
                      <p className={styles.groupMeta}>
                        {groupPlatformLabel(group.platform)} ·{' '}
                        {groupStatusLabel(group.status)}
                        {group.city ? ` · ${group.city}` : ''}
                        {group.niche ? ` · ${group.niche}` : ''}
                      </p>
                    </div>
                    <span className={styles.badge}>
                      {groupStatusLabel(group.status)}
                    </span>
                  </div>

                  <div className={styles.groupStats}>
                    <div className={styles.groupStat}>
                      <span className={styles.groupStatLabel}>Кліки</span>
                      <span className={styles.groupStatValue}>
                        {formatNumber(group.stats?.clicks)}
                      </span>
                    </div>
                    <div className={styles.groupStat}>
                      <span className={styles.groupStatLabel}>Заявки</span>
                      <span className={styles.groupStatValue}>
                        {formatNumber(group.stats?.leads)}
                      </span>
                    </div>
                    <div className={styles.groupStat}>
                      <span className={styles.groupStatLabel}>Пробні</span>
                      <span className={styles.groupStatValue}>
                        {formatNumber(group.stats?.trials)}
                      </span>
                    </div>
                    <div className={styles.groupStat}>
                      <span className={styles.groupStatLabel}>Записи</span>
                      <span className={styles.groupStatValue}>
                        {formatNumber(group.stats?.enrolled)}
                      </span>
                    </div>
                  </div>

                  <code className={styles.linkValue}>{group.tracking_url}</code>
                  {group.notes ? (
                    <p className={styles.groupMeta}>{group.notes}</p>
                  ) : null}

                  <div className={styles.groupActions}>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => copyGroupLink(group)}
                    >
                      {copiedGroupId === group.id
                        ? 'Скопійовано'
                        : 'Копіювати лінк групи'}
                    </button>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => startEditGroup(group)}
                      disabled={busy}
                    >
                      Редагувати
                    </button>
                    <button
                      type="button"
                      className={styles.btnDanger}
                      onClick={() => removeGroup(group.id)}
                      disabled={busy}
                    >
                      Прибрати
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Перегляди дописів</h2>
          <p className={styles.cardHint}>
            Вкажіть посилання на відео і скільки воно набрало. Повторний звіт по
            тому самому посиланню просто оновить число.
          </p>
          <div className={styles.formRow}>
            <select
              className={`${styles.select} ${styles.inputNarrow}`}
              value={postPlatform}
              onChange={(e) => setPostPlatform(e.target.value)}
              aria-label="Платформа допису"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              className={styles.input}
              type="url"
              inputMode="url"
              placeholder="Посилання на допис"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              aria-label="Посилання на допис"
            />
            <input
              className={`${styles.input} ${styles.inputNarrow}`}
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Перегляди"
              value={postViews}
              onChange={(e) => setPostViews(e.target.value)}
              aria-label="Кількість переглядів"
            />
            <button
              type="button"
              className={styles.btn}
              onClick={submitPost}
              disabled={busy}
            >
              Зберегти
            </button>
          </div>

          {(cabinet.social_posts || []).length === 0 ? (
            <p className={styles.empty}>Ще немає звітів по дописах.</p>
          ) : (
            <ul className={styles.list}>
              {cabinet.social_posts.map((post) => (
                <li key={post.id} className={styles.listItem}>
                  <span className={styles.badge}>{platformLabel(post.platform)}</span>
                  <div className={styles.listMain}>
                    <span className={styles.listTitle}>{post.title || post.url}</span>
                    <span className={styles.listMeta}>
                      оновлено {formatDate(post.updated_at)}
                    </span>
                  </div>
                  <span className={styles.views}>{formatNumber(post.views)}</span>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => removePost(post.id)}
                    disabled={busy}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Заявки з вашого посилання</h2>
          {(cabinet.leads || []).length === 0 ? (
            <p className={styles.empty}>
              Заявок ще немає. Поділіться посиланням у своїх соцмережах.
            </p>
          ) : (
            <ul className={styles.list}>
              {cabinet.leads.map((lead) => (
                <li key={lead.id} className={styles.listItem}>
                  <div className={styles.listMain}>
                    <span className={styles.listTitle}>
                      {lead.course || 'Заявка на пробний урок'}
                    </span>
                    <span className={styles.listMeta}>
                      {formatDate(lead.created_at)}
                      {lead.contact_status_label ? ` · ${lead.contact_status_label}` : ''}
                    </span>
                  </div>
                  <span
                    className={`${styles.badge} ${
                      lead.status === 'enrolled' ? styles.badgeSuccess : ''
                    }`}
                  >
                    {LEAD_STATUS_LABELS[lead.status] || lead.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Виплати</h2>
          {(cabinet.payouts || []).length === 0 ? (
            <p className={styles.empty}>Виплат ще не було.</p>
          ) : (
            <ul className={styles.list}>
              {cabinet.payouts.map((payout) => (
                <li key={payout.id} className={styles.listItem}>
                  <div className={styles.listMain}>
                    <span className={styles.listTitle}>
                      {payout.comment || 'Виплата'}
                    </span>
                    <span className={styles.listMeta}>{formatDate(payout.paid_at)}</span>
                  </div>
                  <span className={styles.views}>
                    {formatNumber(payout.amount_uah)} грн
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
