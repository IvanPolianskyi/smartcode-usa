import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { cookies } from 'next/headers'
import { sendCapiLead, getClientIp, getClientUserAgent, getFbCookies } from '@/lib/metaCapi'
import { normalizePhoneE164 } from '@/lib/phoneE164'
import { sanitizeAttribution } from '@/lib/attribution'
import {
  API_ERRORS,
  getTrialGenericCourse,
  isTrialCourseValue,
  resolveLocale,
} from '@/lib/localeStrings'
import {
  isUuidLike,
  isInternalLeadRequest,
  validatePublicLeadSubmission,
  markLeadTokenUsed,
  recordLeadSubmitAttempt,
} from '@/lib/leadFormSecurity'

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

function getMetaLeadSkipReason({
  normalizedPhone,
  hasValidEventId,
  existingLead,
  existingEvent,
}) {
  if (!normalizedPhone) return 'немає телефону'
  if (!hasValidEventId) return 'немає event id (не пробна форма)'
  if (existingEvent) return 'дубль event id'
  if (existingLead) return 'дубль контакту'
  return null
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
      eventId: rawEventId,
      leadToken,
      sourceUrl,
      attribution,
      locale: bodyLocale,
      company: honeypot,
    } = body || {}
    const loc = resolveLocale(bodyLocale)
    const apiErr = API_ERRORS[loc]

    if (!phone && !telegram) {
      return NextResponse.json(
        { ok: false, error: 'Required field: phone or telegram' },
        { status: 400 }
      )
    }

    const internalLead = isInternalLeadRequest(request)
    let verifiedEventId = null
    let tokenHash = null
    let submitIp = getClientIp(request) || 'unknown'

    if (!internalLead) {
      const security = await validatePublicLeadSubmission({
        request,
        leadToken,
        honeypot,
      })
      if (!security.ok) {
        if (security.silent) {
          return NextResponse.json({ ok: true, trackLead: false, metaLeadSent: false })
        }
        return NextResponse.json(
          { ok: false, error: 'Request rejected' },
          { status: security.status || 403 }
        )
      }
      verifiedEventId = security.eventId
      tokenHash = security.tokenHash
      submitIp = security.ip || submitIp
    }

    const eventId = internalLead
      ? (isUuidLike(rawEventId) ? rawEventId : null)
      : verifiedEventId

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
    const hasValidEventId = Boolean(eventId)
    const isTrialCourse = isTrialCourseValue(course)
    const displayCourse =
      course?.trim() ||
      (hasValidEventId ? getTrialGenericCourse(loc) : '')
    const trafficType = detectTrafficType(cleanAttribution)

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
      hasValidEventId &&
      !existingLead &&
      !existingEvent
    )
    const shouldNotifyTelegram = Boolean(
      shouldTrackLead || internalLead || (!hasValidEventId && !existingLead)
    )

    const metaLeadSkipReason = getMetaLeadSkipReason({
      normalizedPhone,
      hasValidEventId,
      existingLead,
      existingEvent,
    })

    if (!shouldNotifyTelegram) {
      await recordLeadSubmitAttempt(submitIp, { blocked: false })
      return NextResponse.json({
        ok: true,
        trackLead: false,
        metaLeadSent: false,
        metaLeadSkipReason: metaLeadSkipReason || 'дубль заявки',
        duplicate: true,
      })
    }

    let metaLeadSent = false
    if (shouldTrackLead) {
      const clientIp = getClientIp(request)
      const userAgent = getClientUserAgent(request)
      const { fbc, fbp } = getFbCookies(request)
      const { trialInterestToContentIds } = await import('@/lib/metaPixel')
      const contentIds = isTrialCourse ? trialInterestToContentIds(course) : []

      metaLeadSent = await sendCapiLead({
        eventId,
        sourceUrl: sourceUrl || 'https://smartcode-academy.com',
        phone: normalizedPhone,
        externalId: leadIdentity || (normalizedTelegram ? normalizedTelegram.replace(/^@/, '').toLowerCase() : undefined),
        name: name || undefined,
        clientIp,
        userAgent,
        fbc,
        fbp,
        fbclid: cleanAttribution.fbclid || undefined,
        contentName: displayCourse || 'trial_lesson',
        contentIds,
      })
    }

    const metaLeadLine = metaLeadSent
      ? '<b>Meta Lead Sent:</b> yes'
      : shouldTrackLead
        ? '<b>Meta Lead Sent:</b> no (помилка CAPI — перевірте META_CAPI_TOKEN)'
        : `<b>Meta Lead Sent:</b> no (${escapeHtml(metaLeadSkipReason || 'невідомо')})`

    const lines = [
      '<b>Нова заявка зі сайту SmartCode Academy</b>',
      '',
      name ? `<b>Ім'я:</b> ${escapeHtml(name)}` : null,
      contactMethod === 'telegram'
        ? `<b>Телеграм:</b> ${escapeHtml(normalizedTelegram)}`
        : `<b>Телефон:</b> ${escapeHtml(normalizedPhone)}`,
      normalizedPhone ? `<b>Бажаний спосіб зв'язку:</b> ${escapeHtml(preferredContactLabel)}` : null,
      displayCourse ? `<b>Курс:</b> ${escapeHtml(displayCourse)}` : null,
      message ? `<b>Повідомлення:</b>\n${escapeHtml(message)}` : null,
      `<b>Трафік:</b> ${escapeHtml(trafficType)}`,
      metaLeadLine,
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
      try {
        const insertResult = await submissions.insertOne({
          name: name || '',
          phone: normalizedPhone || '',
          telegram: normalizedTelegram || '',
          eventId: hasValidEventId ? eventId : null,
          leadIdentity,
          course: displayCourse || '',
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
          course: displayCourse || '',
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

    try {
      const insertResult = await submissions.insertOne({
        name: name || '',
        phone: normalizedPhone || '',
        telegram: normalizedTelegram || '',
        eventId: hasValidEventId ? eventId : null,
        leadIdentity,
        course: displayCourse || '',
        message: message || '',
        contactMethod: contactMethod || 'phone',
        preferredContactMethod: preferredContactMethod || 'phone_call',
        attribution: cleanAttribution,
        createdAt: new Date(),
        via: 'telegram',
        isUniqueLead: shouldTrackLead,
        metaLeadSent,
      })
      if (tokenHash) {
        await markLeadTokenUsed(tokenHash)
      }
      await recordLeadSubmitAttempt(submitIp, { blocked: false })
      await sendLeadToCrm({
        leadId: String(insertResult.insertedId),
        name: name || '',
        phone: normalizedPhone || null,
        telegram: normalizedTelegram || null,
        course: displayCourse || '',
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

    return NextResponse.json({
      ok: true,
      trackLead: shouldTrackLead,
      metaLeadSent,
      metaLeadSkipReason,
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}
