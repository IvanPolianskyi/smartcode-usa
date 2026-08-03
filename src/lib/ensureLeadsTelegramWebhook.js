/**
 * Прив'язати TELEGRAM_BOT_TOKEN webhook → /api/telegram/leads-webhook.
 * Ідемпотентно: setWebhook лише якщо URL/secret відрізняються від поточних.
 */

function normalizeSiteBase(raw) {
  const s = String(raw || '')
    .trim()
    .replace(/\/$/, '')
  if (!s) return ''
  const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`
  return withProto
    .replace(/^https?:\/\/smartcode-academy\.com$/i, 'https://www.smartcode-academy.com')
    .replace(
      /^https?:\/\/smartcode-academy\.com\//i,
      'https://www.smartcode-academy.com/'
    )
}

export function resolveLeadsWebhookPublicBase() {
  const explicit =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL
  if (explicit) return normalizeSiteBase(explicit)

  // Лише production на Vercel — не чіпати preview-деплої.
  if (process.env.VERCEL_ENV === 'production') {
    const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
    if (prodHost) return normalizeSiteBase(`https://${prodHost}`)
    return 'https://www.smartcode-academy.com'
  }

  return ''
}

/**
 * @param {{ force?: boolean }} [opts]
 * @returns {Promise<{ skipped?: boolean, reason?: string, ok?: boolean, webhookUrl?: string, data?: any }>}
 */
export async function ensureLeadsTelegramWebhook(opts = {}) {
  const force = Boolean(opts.force)
  const botToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim()
  if (!botToken) {
    return { skipped: true, reason: 'no_token' }
  }

  const isProd =
    process.env.VERCEL_ENV === 'production' ||
    (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview')

  const autoEnabled =
    force ||
    process.env.TELEGRAM_LEADS_WEBHOOK_AUTO === '1' ||
    process.env.TELEGRAM_LEADS_WEBHOOK_AUTO === 'true'

  if (!force && !autoEnabled && !isProd) {
    return { skipped: true, reason: 'not_production' }
  }

  // Preview / local — не перебивати production webhook.
  if (
    !force &&
    (process.env.VERCEL_ENV === 'preview' ||
      process.env.VERCEL_ENV === 'development')
  ) {
    return { skipped: true, reason: 'preview_or_dev' }
  }

  const base = resolveLeadsWebhookPublicBase()
  if (!base || !/^https:\/\//i.test(base)) {
    return { skipped: true, reason: 'no_public_base' }
  }

  const webhookUrl = `${base}/api/telegram/leads-webhook`
  const secret = (process.env.TELEGRAM_LEADS_WEBHOOK_SECRET || '').trim()

  try {
    const infoRes = await fetch(
      `https://api.telegram.org/bot${botToken}/getWebhookInfo`
    )
    const infoJson = await infoRes.json().catch(() => null)
    const currentUrl = String(infoJson?.result?.url || '')
    const hasCustomCert = Boolean(infoJson?.result?.has_custom_certificate)

    if (
      !force &&
      currentUrl === webhookUrl &&
      // Telegram не віддає secret назад — якщо задано secret, раз на зміну env
      // force через TELEGRAM_LEADS_WEBHOOK_FORCE=1 або зміну URL.
      !process.env.TELEGRAM_LEADS_WEBHOOK_FORCE
    ) {
      return {
        skipped: true,
        reason: 'already_set',
        ok: true,
        webhookUrl,
        data: infoJson,
      }
    }

    const body = {
      url: webhookUrl,
      allowed_updates: ['callback_query'],
      drop_pending_updates: false,
    }
    if (secret) body.secret_token = secret

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/setWebhook`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const data = await res.json().catch(() => null)
    if (!data?.ok) {
      console.error(
        '[leads-webhook] setWebhook failed',
        data,
        'has_custom_certificate=',
        hasCustomCert
      )
      return { ok: false, webhookUrl, data }
    }
    console.log('[leads-webhook] setWebhook ok →', webhookUrl)
    return { ok: true, webhookUrl, data }
  } catch (e) {
    console.error('[leads-webhook] ensure failed:', e)
    return { ok: false, reason: String(e?.message || e), webhookUrl }
  }
}
