import { NextResponse } from 'next/server'
import {
  leadContactStatusLabel,
  parseLeadStatusCallbackData,
} from '@/lib/leadContactStatus'
import { applyLeadContactStatusFromCallback } from '@/lib/applyLeadContactStatus'
import { getCrmLeadIngestKey } from '@/lib/integrationApiKey'

async function tgApi(botToken, method, body) {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json().catch(() => null)
}

async function syncContactStatusToCrm(leadId, contactStatus) {
  const crmLeadEndpoint = process.env.CRM_LEAD_ENDPOINT
  if (!crmLeadEndpoint) return { skipped: true }
  const base = crmLeadEndpoint.replace(/\/incoming\/?$/i, '')
  const url = `${base}/contact-status`
  const headers = { 'content-type': 'application/json' }
  const apiKey = getCrmLeadIngestKey()
  if (!apiKey) {
    console.error('CRM contact-status: missing ingest key')
    return { ok: false, error: 'missing key' }
  }
  headers['x-api-key'] = apiKey
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ leadId, contactStatus }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      console.error('CRM contact-status failed:', response.status, data)
      return { ok: false, status: response.status, data }
    }
    return { ok: true, data }
  } catch (e) {
    console.error('CRM contact-status error:', e)
    return { ok: false, error: String(e?.message || e) }
  }
}

/**
 * Webhook бота заявок (TELEGRAM_BOT_TOKEN): кнопки статусу контакту.
 * setWebhook → https://www.smartcode-academy.com/api/telegram/leads-webhook
 */
export async function POST(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    if (!botToken) {
      return NextResponse.json({ ok: false, error: 'bot not configured' }, { status: 503 })
    }

    const secret = (process.env.TELEGRAM_LEADS_WEBHOOK_SECRET || '').trim()
    if (secret) {
      const provided =
        request.headers.get('x-telegram-bot-api-secret-token') || ''
      if (provided !== secret) {
        return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
      }
    }

    const update = await request.json().catch(() => null)
    const cq = update?.callback_query
    if (!cq) {
      return NextResponse.json({ ok: true, ignored: true })
    }

    const parsed = parseLeadStatusCallbackData(cq.data)
    const chatId = cq.message?.chat?.id
    const messageId = cq.message?.message_id
    const originalText = cq.message?.text || cq.message?.caption || ''

    if (!parsed) {
      await tgApi(botToken, 'answerCallbackQuery', {
        callback_query_id: cq.id,
        text: 'Невідома дія',
        show_alert: false,
      })
      return NextResponse.json({ ok: true })
    }

    const { leadId, code } = parsed
    const label = leadContactStatusLabel(code)

    await applyLeadContactStatusFromCallback({
      leadId,
      contactStatus: code,
      chatId,
      messageId,
      originalText,
    })
    await syncContactStatusToCrm(leadId, code)

    await tgApi(botToken, 'answerCallbackQuery', {
      callback_query_id: cq.id,
      text: label ? `Статус: ${label}` : 'Оновлено',
      show_alert: false,
    })

    return NextResponse.json({ ok: true, leadId, contactStatus: code })
  } catch (error) {
    console.error('leads-webhook error:', error)
    return NextResponse.json(
      { ok: false, error: String(error?.message || error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'telegram-leads-webhook',
    hint: 'POST updates from Telegram here. Run scripts/setup-leads-webhook.js once.',
  })
}
