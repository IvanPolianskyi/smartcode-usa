import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { cookies } from 'next/headers'

function escapeHtml(input) {
  const str = String(input ?? '')
  return str.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char])
}

export async function POST(request) {
  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      return NextResponse.json(
        { ok: false, error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { phone, telegram, course, message, contactMethod, name } = body || {}

    if (!phone && !telegram) {
      return NextResponse.json(
        { ok: false, error: 'Required field: phone or telegram' },
        { status: 400 }
      )
    }

    const createdAt = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })
    const normalizedPhone = phone ? "+380" + phone : null
    const normalizedTelegram = telegram ? (telegram.startsWith('@') ? telegram : '@' + telegram) : null

    // Читаємо cookies для реферальної системи
    const cookieStore = await cookies()
    const referralIdCookie = cookieStore.get('referralId')
    const referralId = referralIdCookie?.value || null

    const lines = [
      '<b>Нова заявка зі сайту SmartCode Academy</b>',
      '',
      name ? `<b>Ім'я:</b> ${escapeHtml(name)}` : null,
      contactMethod === 'telegram' 
        ? `<b>Телеграм:</b> ${escapeHtml(normalizedTelegram)}`
        : `<b>Телефон:</b> ${escapeHtml(normalizedPhone)}`,
      course ? `<b>Курс:</b> ${escapeHtml(course)}` : null,
      message ? `<b>Повідомлення:</b>\n${escapeHtml(message)}` : null,
      referralId ? `<b>🔥 Реферал ID:</b> <code>${escapeHtml(referralId)}</code>` : null,
      '',
      `<b>Час:</b> ${escapeHtml(createdAt)}`,
    ].filter(Boolean)

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: lines.join('\n'),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    )

    const tgData = await telegramResponse.json().catch(() => null)

    if (!telegramResponse.ok || !tgData?.ok) {
      // Even if Telegram fails, still attempt to store submission for auditing
      try {
        const submissions = await getCollection('submissions')
        await submissions.insertOne({
          name: name || '',
          phone: normalizedPhone || '',
          telegram: normalizedTelegram || '',
          course: course || '',
          message: message || '',
          contactMethod: contactMethod || 'phone',
          createdAt: new Date(),
          via: 'telegram-api-failed',
        })
      } catch {}
      return NextResponse.json(
        { ok: false, error: 'Telegram API error', detail: tgData },
        { status: 500 }
      )
    }

    // Store successful submission as well
    try {
      const submissions = await getCollection('submissions')
      await submissions.insertOne({
        name: name || '',
        phone: normalizedPhone || '',
        telegram: normalizedTelegram || '',
        course: course || '',
        message: message || '',
        contactMethod: contactMethod || 'phone',
        createdAt: new Date(),
        via: 'telegram',
      })
    } catch {}

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}


