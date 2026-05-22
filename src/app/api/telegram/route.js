import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { cookies } from 'next/headers'
import { sendCapiLead, getClientIp, getClientUserAgent, getFbCookies } from '@/lib/metaCapi'
import { normalizePhoneE164 } from '@/lib/phoneE164'
import { sanitizeAttribution } from '@/lib/attribution'
import { API_ERRORS, isTrialCourseValue, resolveLocale } from '@/lib/localeStrings'

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

function buildLeadIdentity({ normalizedPhone, normalizedTelegram }) {
  if (normalizedPhone) return `phone:${normalizedPhone}`
  if (normalizedTelegram) return `telegram:${normalizedTelegram.toLowerCase()}`
  return null
}

function isUuidLike(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function detectTrafficType(attribution) {
  const medium = String(attribution?.utm_medium || '').toLowerCase()
  const source = String(attribution?.utm_source || '').toLowerCase()
  const hasClickId = Boolean(attribution?.fbclid || attribution?.gclid || attribution?.ttclid)
  const paidMedium = ['cpc', 'ppc', 'paid', 'paid_social', 'cpm', 'display']
  const paidSource = ['facebook', 'instagram', 'meta', 'google', 'tiktok']
  const looksPaid = hasClickId || paidMedium.some((m) => medium.includes(m)) || paidSource.some((s) => source.includes(s))
  return looksPaid ? 'Реклама' : 'Органіка/невідомо'
}

async function sendLeadToCrm(payload) {
  const crmLeadEndpoint = process.env.CRM_LEAD_ENDPOINT
  if (!crmLeadEndpoint) return { skipped: true }

  const headers = { 'content-type': 'application/json' }
  if (process.env.CRM_API_KEY) {
    headers['x-api-key'] = process.env.CRM_API_KEY
  }

  const response = await fetch(crmLeadEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(`CRM lead sync failed (${response.status}): ${JSON.stringify(data)}`)
  }
  return data
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
    const {
      phone,
      telegram,
      course,
      message,
      contactMethod,
      preferredContactMethod,
      name,
      eventId,
      sourceUrl,
      attribution,
      locale: bodyLocale,
    } = body || {}
    const loc = resolveLocale(bodyLocale)
    const apiErr = API_ERRORS[loc]

    if (!phone && !telegram) {
      return NextResponse.json(
        { ok: false, error: 'Required field: phone or telegram' },
        { status: 400 }
      )
    }

    const createdAt = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })
    const normalizedPhone = phone ? normalizePhoneE164(phone, loc) : null
    if (phone && !normalizedPhone) {
      return NextResponse.json(
        { ok: false, error: apiErr.invalidPhone },
        { status: 400 }
      )
    }
    const normalizedTelegram = telegram ? (telegram.startsWith('@') ? telegram : '@' + telegram) : null
    const cleanAttribution = sanitizeAttribution(attribution)
    const preferredContactLabel = preferredContactMethod === 'telegram_phone' ? 'Написати в Telegram за цим номером' : 'Подзвонити'
    const isTrialCourse = isTrialCourseValue(course)
    const hasValidEventId = isUuidLike(eventId)
    const trafficType = detectTrafficType(cleanAttribution)

    // Читаємо cookies для реферальної системи
    const cookieStore = await cookies()
    const referralIdCookie = cookieStore.get('referralId')
    const referralId = referralIdCookie?.value || null

    const leadIdentity = buildLeadIdentity({ normalizedPhone, normalizedTelegram })
    const submissions = await getCollection('submissions')
    const existingEvent = hasValidEventId
      ? await submissions.findOne({ eventId })
      : null
    const existingLead = leadIdentity
      ? await submissions.findOne({
        $or: [
          { leadIdentity },
          ...(normalizedPhone ? [{ phone: normalizedPhone }] : []),
          ...(normalizedTelegram ? [{ telegram: normalizedTelegram }] : []),
        ],
      })
      : null
    const shouldTrackLead = Boolean(
      normalizedPhone &&
      isTrialCourse &&
      hasValidEventId &&
      !existingLead &&
      !existingEvent
    )

    const lines = [
      '<b>Нова заявка зі сайту SmartCode Academy</b>',
      '',
      name ? `<b>Ім'я:</b> ${escapeHtml(name)}` : null,
      contactMethod === 'telegram'
        ? `<b>Телеграм:</b> ${escapeHtml(normalizedTelegram)}`
        : `<b>Телефон:</b> ${escapeHtml(normalizedPhone)}`,
      normalizedPhone ? `<b>Бажаний спосіб зв'язку:</b> ${escapeHtml(preferredContactLabel)}` : null,
      course ? `<b>Курс:</b> ${escapeHtml(course)}` : null,
      message ? `<b>Повідомлення:</b>\n${escapeHtml(message)}` : null,
      `<b>Трафік:</b> ${escapeHtml(trafficType)}`,
      `<b>Meta Lead Sent:</b> ${shouldTrackLead ? 'yes' : 'no'}`,
      cleanAttribution.utm_source ? `<b>UTM Source:</b> ${escapeHtml(cleanAttribution.utm_source)}` : null,
      cleanAttribution.utm_medium ? `<b>UTM Medium:</b> ${escapeHtml(cleanAttribution.utm_medium)}` : null,
      cleanAttribution.utm_campaign ? `<b>UTM Campaign:</b> ${escapeHtml(cleanAttribution.utm_campaign)}` : null,
      cleanAttribution.utm_term ? `<b>UTM Term:</b> ${escapeHtml(cleanAttribution.utm_term)}` : null,
      cleanAttribution.utm_content ? `<b>UTM Content:</b> ${escapeHtml(cleanAttribution.utm_content)}` : null,
      cleanAttribution.fbclid ? `<b>fbclid:</b> <code>${escapeHtml(cleanAttribution.fbclid)}</code>` : null,
      cleanAttribution.gclid ? `<b>gclid:</b> <code>${escapeHtml(cleanAttribution.gclid)}</code>` : null,
      cleanAttribution.ttclid ? `<b>ttclid:</b> <code>${escapeHtml(cleanAttribution.ttclid)}</code>` : null,
      sourceUrl ? `<b>URL:</b> ${escapeHtml(sourceUrl)}` : null,
      hasValidEventId ? `<b>Event ID:</b> <code>${escapeHtml(eventId)}</code>` : `<b>Event ID:</b> невалідний/відсутній`,
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
        const insertResult = await submissions.insertOne({
          name: name || '',
          phone: normalizedPhone || '',
          telegram: normalizedTelegram || '',
          eventId: hasValidEventId ? eventId : null,
          leadIdentity,
          course: course || '',
          message: message || '',
          contactMethod: contactMethod || 'phone',
          preferredContactMethod: preferredContactMethod || 'phone_call',
          attribution: cleanAttribution,
          createdAt: new Date(),
          via: 'telegram-api-failed',
          isUniqueLead: shouldTrackLead,
        })
        await sendLeadToCrm({
          leadId: String(insertResult.insertedId),
          name: name || '',
          phone: normalizedPhone || null,
          telegram: normalizedTelegram || null,
          course: course || '',
          message: message || '',
          contactMethod: contactMethod || 'phone',
          preferredContactMethod: preferredContactMethod || 'phone_call',
          sourceUrl: sourceUrl || null,
          attribution: cleanAttribution,
          referralId,
          createdAt: new Date().toISOString(),
        }).catch((error) => {
          console.error('CRM lead sync failed after telegram error:', error)
        })
      } catch {}
      return NextResponse.json(
        { ok: false, error: 'Telegram API error', detail: tgData },
        { status: 500 }
      )
    }

    // Store successful submission as well
    try {
      const insertResult = await submissions.insertOne({
        name: name || '',
        phone: normalizedPhone || '',
        telegram: normalizedTelegram || '',
        eventId: hasValidEventId ? eventId : null,
        leadIdentity,
        course: course || '',
        message: message || '',
        contactMethod: contactMethod || 'phone',
        preferredContactMethod: preferredContactMethod || 'phone_call',
        attribution: cleanAttribution,
        createdAt: new Date(),
        via: 'telegram',
        isUniqueLead: shouldTrackLead,
      })
      await sendLeadToCrm({
        leadId: String(insertResult.insertedId),
        name: name || '',
        phone: normalizedPhone || null,
        telegram: normalizedTelegram || null,
        course: course || '',
        message: message || '',
        contactMethod: contactMethod || 'phone',
        preferredContactMethod: preferredContactMethod || 'phone_call',
        sourceUrl: sourceUrl || null,
        attribution: cleanAttribution,
        referralId,
        createdAt: new Date().toISOString(),
      }).catch((error) => {
        console.error('CRM lead sync failed:', error)
      })
    } catch {}

    // CAPI: відправляємо Lead лише для нового унікального контакту
    if (eventId && shouldTrackLead) {
      const clientIp = getClientIp(request)
      const userAgent = getClientUserAgent(request)
      const { fbc, fbp } = getFbCookies(request)
      const { trialInterestToContentIds } = await import('@/lib/metaPixel')
      const contentIds = trialInterestToContentIds(course)

      try {
        await sendCapiLead({
          eventId,
          sourceUrl: sourceUrl || 'https://smartcode-academy.com',
          phone: normalizedPhone,
          // external_id як стабільний ідентифікатор ліда для покращення matching
          externalId: leadIdentity || (normalizedTelegram ? normalizedTelegram.replace(/^@/, '').toLowerCase() : undefined),
          name: name || undefined,
          clientIp,
          userAgent,
          fbc,
          fbp,
          fbclid: cleanAttribution.fbclid || undefined,
          contentName: course || 'trial_lesson',
          contentIds,
        })
      } catch {}
    }

    return NextResponse.json({ ok: true, trackLead: shouldTrackLead })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}


