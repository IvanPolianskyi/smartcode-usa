import { NextResponse } from 'next/server'
import {
  leadContactStatusLabel,
  parseLeadStatusCallbackData,
} from '@/lib/leadContactStatus'
import { applyLeadContactStatusFromCallback } from '@/lib/applyLeadContactStatus'
import { postCrmLeadContactStatus } from '@/lib/crmLeadContactStatus'
import { ensureLeadsTelegramWebhook } from '@/lib/ensureLeadsTelegramWebhook'

async function tgApi(botToken, method, body) {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json().catch(() => null)
}

/**
 * Webhook бота заявок: кнопки статусу.
 * Критично: answerCallbackQuery одразу; CRM sync обовʼязково await (Vercel ріже void).
 */
export async function POST(request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    return NextResponse.json({ ok: false, error: 'bot not configured' }, { status: 503 })
  }

  let cq = null
  try {
    const secret = (process.env.TELEGRAM_LEADS_WEBHOOK_SECRET || '').trim()
    if (secret) {
      const provided =
        request.headers.get('x-telegram-bot-api-secret-token') || ''
      if (provided && provided !== secret) {
        console.warn('[leads-webhook] secret mismatch (header present)')
        return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
      }
      if (!provided) {
        console.warn(
          '[leads-webhook] secret configured but no header — processing; re-register webhook'
        )
        void ensureLeadsTelegramWebhook({ force: true })
      }
    }

    const update = await request.json().catch(() => null)
    cq = update?.callback_query
    if (!cq) {
      return NextResponse.json({ ok: true, ignored: true })
    }

    const parsed = parseLeadStatusCallbackData(cq.data)
    const label = parsed ? leadContactStatusLabel(parsed.code) : null

    // 1) Миттєво зняти спінер у Telegram.
    await tgApi(botToken, 'answerCallbackQuery', {
      callback_query_id: cq.id,
      text: label ? `📌 ${label}` : 'Оновлено',
      show_alert: false,
    })

    if (!parsed) {
      return NextResponse.json({ ok: true, unknown_action: true })
    }

    const { leadId, code } = parsed
    const chatId = cq.message?.chat?.id
    const messageId = cq.message?.message_id
    const originalText = cq.message?.text || cq.message?.caption || ''

    // 2) Оновити повідомлення в чаті.
    const applied = await applyLeadContactStatusFromCallback({
      leadId,
      contactStatus: code,
      chatId,
      messageId,
      originalText,
    })

    if (applied && applied.ok === false && applied.error === 'terminal_status') {
      await tgApi(botToken, 'answerCallbackQuery', {
        callback_query_id: cq.id,
        text: 'Статус уже фінальний — зміна заблокована',
        show_alert: true,
      }).catch(() => null)
      return NextResponse.json({
        ok: false,
        blocked: true,
        leadId,
        contactStatus: code,
        existingContactStatus: applied.existingContactStatus,
      })
    }

    // 3) CRM — обовʼязково await (інакше на Vercel запит не встигає).
    const crm = await postCrmLeadContactStatus(leadId, code)

    return NextResponse.json({
      ok: true,
      leadId,
      contactStatus: code,
      updatedMessages: applied?.updatedMessages ?? 0,
      crmSynced: Boolean(crm?.ok),
      crmError: crm?.ok ? undefined : crm?.error || crm?.status || null,
    })
  } catch (error) {
    console.error('leads-webhook error:', error)
    if (cq?.id) {
      await tgApi(botToken, 'answerCallbackQuery', {
        callback_query_id: cq.id,
        text: 'Помилка оновлення',
        show_alert: false,
      }).catch(() => null)
    }
    return NextResponse.json(
      { ok: false, error: String(error?.message || error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  const setup = await ensureLeadsTelegramWebhook().catch((e) => ({
    ok: false,
    error: String(e?.message || e),
  }))
  return NextResponse.json({
    ok: true,
    service: 'telegram-leads-webhook',
    setup,
  })
}
