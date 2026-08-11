import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import {
  buildLeadContactKeyboard,
  canChangeLeadContactStatus,
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
  callbackAt = null,
  clearCallback = false,
}) {
  if (!botToken || chatId == null || messageId == null) {
    return { ok: false, error: 'missing_target' }
  }

  const keyboard = buildLeadContactKeyboard(leadId, contactStatus)
  const hasText = typeof originalText === 'string' && originalText.length > 0

  if (hasText) {
    const newText = withContactStatusInPlainText(originalText, contactStatus, {
      callbackAt,
      clearCallback,
    })
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
  const callbackAt = opts.callbackAt ?? null
  const clearCallback = Boolean(opts.clearCallback)

  let leadOid = null
  try {
    leadOid = new ObjectId(id)
  } catch {
    return { ok: false, contactStatus: code, label, updatedMessages: 0, error: 'bad_lead_id' }
  }

  // Антидаунгрейд з уже збереженого статусу (окрім force при reopen).
  if (!opts.force) {
    try {
      const submissions = await getCollection('submissions')
      const existing = await submissions.findOne(
        { _id: leadOid },
        { projection: { contactStatus: 1 } }
      )
      const prev = existing?.contactStatus
      if (prev && !canChangeLeadContactStatus(prev, code)) {
        return {
          ok: false,
          contactStatus: code,
          label,
          updatedMessages: 0,
          error: 'terminal_status',
          existingContactStatus: prev,
        }
      }
    } catch (e) {
      console.warn('[leads-tg] precheck contact status failed:', e)
    }
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
        callbackAt,
        clearCallback,
      })
      if (r.ok) updatedMessages += 1
    }
  }

  // Persist + інші чати (дубль реклами) — не блокуємо вже оновлене повідомлення.
  try {
    const submissions = await getCollection('submissions')
    const setFields = {
      contactStatus: code,
      contactStatusUpdatedAt: now,
    }
    if (clearCallback) {
      setFields.callbackAt = null
    } else if (callbackAt) {
      const d = callbackAt instanceof Date ? callbackAt : new Date(callbackAt)
      if (!Number.isNaN(d.getTime())) setFields.callbackAt = d
    }
    await submissions.updateOne(
      { _id: leadOid },
      {
        $set: setFields,
      }
    )
    const updated = await submissions.findOne(
      { _id: leadOid },
      { projection: { telegramDeliveries: 1, telegramNotifyText: 1, callbackAt: 1 } }
    )
    const deliveries = Array.isArray(updated?.telegramDeliveries)
      ? updated.telegramDeliveries
      : []
    const storedText =
      typeof updated?.telegramNotifyText === 'string' &&
      updated.telegramNotifyText.trim()
        ? updated.telegramNotifyText
        : null
    const storedCallback = clearCallback
      ? null
      : callbackAt || updated?.callbackAt || null

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
          originalText: storedText,
          callbackAt: storedCallback,
          clearCallback,
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
