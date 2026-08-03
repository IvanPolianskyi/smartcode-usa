import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import {
  buildLeadContactKeyboard,
  isValidLeadContactStatus,
  leadContactStatusLabel,
  withContactStatusInPlainText,
} from '@/lib/leadContactStatus'

async function tgApi(botToken, method, body) {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => null)
  if (!data?.ok) {
    console.warn(
      `[leads-tg] ${method} failed:`,
      data?.description || data,
      'chat=',
      body?.chat_id,
      'msg=',
      body?.message_id
    )
  }
  return data
}

/**
 * Оновити кнопки (і бажано рядок статусу) на конкретному повідомленні.
 * Кнопки — обовʼязково; текст — best-effort (HTML-повідомлення інколи не дає editMessageText).
 */
export async function refreshLeadTelegramMessage({
  botToken,
  chatId,
  messageId,
  leadId,
  contactStatus,
  originalText = null,
}) {
  if (!botToken || chatId == null || messageId == null) {
    return { ok: false, error: 'missing_target' }
  }

  const keyboard = buildLeadContactKeyboard(leadId, contactStatus)

  // 1) Спочатку саме кнопки — це те, що має змінюватись при кліку.
  const markup = await tgApi(botToken, 'editMessageReplyMarkup', {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: keyboard,
  })

  let textOk = false
  if (typeof originalText === 'string' && originalText.length > 0) {
    const newText = withContactStatusInPlainText(originalText, contactStatus)
    // Якщо текст той самий — Telegram ігнорує і reply_markup («message is not modified»).
    // Тому текст оновлюємо лише коли він реально змінився; кнопки вже оновили вище.
    if (newText !== originalText) {
      const edited = await tgApi(botToken, 'editMessageText', {
        chat_id: chatId,
        message_id: messageId,
        text: newText,
        disable_web_page_preview: true,
        reply_markup: keyboard,
      })
      textOk = Boolean(edited?.ok)
      // Якщо editMessageText зняв/зламав markup — ще раз поставимо кнопки.
      if (edited?.ok) {
        await tgApi(botToken, 'editMessageReplyMarkup', {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: keyboard,
        })
      }
    }
  }

  const markupOk =
    Boolean(markup?.ok) ||
    // «message is not modified» = кнопки вже в потрібному стані
    String(markup?.description || '').toLowerCase().includes('not modified')

  return {
    ok: markupOk || textOk,
    markupOk,
    textOk,
    error: markupOk || textOk ? undefined : markup?.description || 'edit_failed',
  }
}

/**
 * Зберегти статус контакту в submissions і оновити всі Telegram-повідомлення заявки.
 */
export async function applyLeadContactStatus(leadId, contactStatus, opts = {}) {
  const id = String(leadId || '').trim()
  const code = String(contactStatus || '').trim()
  if (!id || !isValidLeadContactStatus(code)) {
    return { ok: false, contactStatus: code, label: null, updatedMessages: 0, error: 'invalid' }
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const label = leadContactStatusLabel(code)
  const now = new Date()

  let leadOid = null
  try {
    leadOid = new ObjectId(id)
  } catch {
    return { ok: false, contactStatus: code, label, updatedMessages: 0, error: 'bad_lead_id' }
  }

  const submissions = await getCollection('submissions')
  await submissions.updateOne(
    { _id: leadOid },
    {
      $set: {
        contactStatus: code,
        contactStatusUpdatedAt: now,
      },
    },
    // Якщо документа ще немає (гонка з insert) — не падаємо.
    { upsert: false }
  )
  const updated = await submissions.findOne({ _id: leadOid })
  const deliveries = Array.isArray(updated?.telegramDeliveries)
    ? updated.telegramDeliveries
    : []

  // Додаткова ціль з callback (навіть якщо deliveries порожні / старі заявки).
  const extra = opts.primaryMessage
  const targets = []
  const seen = new Set()
  const pushTarget = (chatId, messageId, originalText = null) => {
    if (chatId == null || messageId == null) return
    const key = `${chatId}:${messageId}`
    if (seen.has(key)) return
    seen.add(key)
    targets.push({ chatId, messageId, originalText })
  }

  if (extra) {
    pushTarget(extra.chatId, extra.messageId, extra.originalText ?? null)
  }
  for (const d of deliveries) {
    pushTarget(d.chatId, d.messageId, null)
  }

  let updatedMessages = 0
  if (botToken) {
    for (const t of targets) {
      const r = await refreshLeadTelegramMessage({
        botToken,
        chatId: t.chatId,
        messageId: t.messageId,
        leadId: id,
        contactStatus: code,
        originalText: t.originalText,
      })
      if (r.ok) updatedMessages += 1
    }
  }

  return {
    ok: true,
    contactStatus: code,
    label,
    updatedMessages,
    found: Boolean(updated),
  }
}

/**
 * Оновити повідомлення після кліку в Telegram.
 */
export async function applyLeadContactStatusFromCallback({
  leadId,
  contactStatus,
  chatId,
  messageId,
  originalText,
}) {
  return applyLeadContactStatus(leadId, contactStatus, {
    primaryMessage: {
      chatId,
      messageId,
      originalText,
    },
  })
}
