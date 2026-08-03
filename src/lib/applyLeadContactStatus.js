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

function isNotModified(data) {
  return String(data?.description || '')
    .toLowerCase()
    .includes('not modified')
}

/**
 * Оновити текст (зі статусом) + кнопки на повідомленні в чаті.
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
  const hasText = typeof originalText === 'string' && originalText.length > 0

  if (hasText) {
    const newText = withContactStatusInPlainText(originalText, contactStatus)
    const edited = await tgApi(botToken, 'editMessageText', {
      chat_id: chatId,
      message_id: messageId,
      text: newText,
      disable_web_page_preview: true,
      reply_markup: keyboard,
    })
    if (edited?.ok || isNotModified(edited)) {
      // Гарантуємо актуальні кнопки навіть після «not modified» по тексту.
      if (isNotModified(edited) || !edited?.ok) {
        await tgApi(botToken, 'editMessageReplyMarkup', {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: keyboard,
        })
      }
      return { ok: true, textOk: Boolean(edited?.ok), markupOk: true }
    }
  }

  // Fallback: лише кнопки (якщо тексту немає або editMessageText впав).
  const markup = await tgApi(botToken, 'editMessageReplyMarkup', {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: keyboard,
  })
  const markupOk = Boolean(markup?.ok) || isNotModified(markup)
  return {
    ok: markupOk,
    textOk: false,
    markupOk,
    error: markupOk ? undefined : markup?.description || 'edit_failed',
  }
}

/**
 * Зберегти статус і оновити Telegram-повідомлення заявки.
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

  // Спочатку оновити чат (швидкий UX), Mongo — після.
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

  // Persist + інші чати (дубль реклами) — не блокуємо вже оновлене повідомлення.
  try {
    const submissions = await getCollection('submissions')
    await submissions.updateOne(
      { _id: leadOid },
      {
        $set: {
          contactStatus: code,
          contactStatusUpdatedAt: now,
        },
      }
    )
    const updated = await submissions.findOne(
      { _id: leadOid },
      { projection: { telegramDeliveries: 1 } }
    )
    const deliveries = Array.isArray(updated?.telegramDeliveries)
      ? updated.telegramDeliveries
      : []

    if (botToken) {
      for (const d of deliveries) {
        const key = `${d.chatId}:${d.messageId}`
        if (seen.has(key)) continue
        seen.add(key)
        const r = await refreshLeadTelegramMessage({
          botToken,
          chatId: d.chatId,
          messageId: d.messageId,
          leadId: id,
          contactStatus: code,
          originalText: null,
        })
        if (r.ok) updatedMessages += 1
      }
    }
  } catch (e) {
    console.warn('[leads-tg] persist/sync deliveries failed:', e)
  }

  return {
    ok: true,
    contactStatus: code,
    label,
    updatedMessages,
  }
}

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
