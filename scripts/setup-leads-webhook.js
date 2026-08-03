/**
 * Ручний запуск (опційно): node scripts/setup-leads-webhook.js
 * На production webhook також ставиться автоматично з instrumentation.js після деплою.
 */
require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

async function main() {
  const { ensureLeadsTelegramWebhook } = await import(
    '../src/lib/ensureLeadsTelegramWebhook.js'
  )
  const result = await ensureLeadsTelegramWebhook({ force: true })
  console.log(result)
  if (result?.ok === false) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
