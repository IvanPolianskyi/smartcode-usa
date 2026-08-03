/**
 * Один раз після деплою: прив'язати webhook бота заявок до /api/telegram/leads-webhook
 *
 *   node scripts/setup-leads-webhook.js
 *
 * Потрібні env: TELEGRAM_BOT_TOKEN, API_BASE_URL (або NEXT_PUBLIC_SITE_URL)
 * Опційно: TELEGRAM_LEADS_WEBHOOK_SECRET
 */
require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

async function main() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const base =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://www.smartcode-academy.com'
  const secret = (process.env.TELEGRAM_LEADS_WEBHOOK_SECRET || '').trim()

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN not set')
    process.exit(1)
  }

  const webhookUrl = `${String(base).replace(/\/$/, '')}/api/telegram/leads-webhook`
  console.log('Setting webhook:', webhookUrl)

  const body = {
    url: webhookUrl,
    allowed_updates: ['callback_query'],
    drop_pending_updates: true,
  }
  if (secret) body.secret_token = secret

  const res = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => null)
  console.log(data)

  const info = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`).then((r) =>
    r.json()
  )
  console.log('Webhook info:', info)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
