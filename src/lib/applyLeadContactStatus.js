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
  return res.json().catch(() => null)
}

/**
 * Зберегти статус контакту в submissions і оновити Telegram-повідомлення.
 * @returns {{ ok: boolean, contactStatus: string, label: string|null, updatedMessages: number, error?: string }}
 */
export async function applyLeadContactStatus(leadId, contactStatus) {
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
    }
  )
  const updated = await submissions.findOne({ _id: leadOid })
  const deliveries = Array.isArray(updated?.telegramDeliveries)
    ? updated.telegramDeliveries
    : []

  let updatedMessages = 0
  if (botToken && deliveries.length > 0) {
    const keyboard = buildLeadContactKeyboard(id, code)
    for (const d of deliveries) {
      const chatId = d.chatId
      const messageId = d.messageId
      if (chatId == null || messageId == null) continue

      // Спочатку лише кнопки — текст заявки лишається з HTML-розміткою.
      const markup = await tgApi(botToken, 'editMessageReplyMarkup', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard,
      })
      if (markup?.ok) {
        updatedMessages += 1
        continue
      }

      // Fallback: якщо markup не вийшов, спробуємо plain text + статус.
      // (потрібен getChat — немає тексту; пропускаємо якщо немає)
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
 * Оновити повідомлення після кліку в Telegram (є оригінальний текст з callback).
 */
export async function applyLeadContactStatusFromCallback({
  leadId,
  contactStatus,
  chatId,
  messageId,
  originalText,
}) {
  const base = await applyLeadContactStatus(leadId, contactStatus)
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken || !base.ok) return base

  const keyboard = buildLeadContactKeyboard(leadId, contactStatus)
  const newText = withContactStatusInPlainText(originalText, contactStatus)

  if (chatId != null && messageId != null) {
    const edited = await tgApi(botToken, 'editMessageText', {
      chat_id: chatId,
      message_id: messageId,
      text: newText,
      disable_web_page_preview: true,
      reply_markup: keyboard,
    })
    if (!edited?.ok) {
      await tgApi(botToken, 'editMessageReplyMarkup', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard,
      })
    }
  }

  // Дублі в інших чатах — лише кнопки (тексту немає).
  try {
    const leadOid = new ObjectId(leadId)
    const submissions = await getCollection('submissions')
    const doc = await submissions.findOne(
      { _id: leadOid },
      { projection: { telegramDeliveries: 1 } }
    )
    const deliveries = Array.isArray(doc?.telegramDeliveries)
      ? doc.telegramDeliveries
      : []
    for (const d of deliveries) {
      const dChat = String(d.chatId || '')
      const dMsg = d.messageId
      if (!dChat || dMsg == null) continue
      if (String(dChat) === String(chatId) && Number(dMsg) === Number(messageId)) {
        continue
      }
      await tgApi(botToken, 'editMessageReplyMarkup', {
        chat_id: dChat,
        message_id: dMsg,
        reply_markup: keyboard,
      })
    }
  } catch {
    /* ignore */
  }

  return base
}
