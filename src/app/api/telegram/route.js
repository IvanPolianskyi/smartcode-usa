import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { cookies } from 'next/headers'
import { sendCapiLead, getClientIp, getClientUserAgent, getFbCookies } from '@/lib/metaCapi'
import { normalizePhoneE164 } from '@/lib/phoneE164'
import { detectTrafficType, resolveServerAttribution } from '@/lib/attribution'
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
import {
  sanitizeLeadName,
  sanitizeLeadCourse,
  sanitizeLeadMessage,
} from '@/lib/sanitizeLeadText'
import { getCrmLeadIngestKey } from '@/lib/integrationApiKey'

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
  existingEvent,
}) {
  if (!normalizedPhone) return 'немає телефону'
  if (!hasValidEventId) return 'немає event id (не пробна форма)'
  if (existingEvent) return 'дубль event id'
  return null
}

async function sendLeadToCrm(payload) {
  const crmLeadEndpoint = process.env.CRM_LEAD_ENDPOINT
  if (!crmLeadEndpoint) return { skipped: true }

  const headers = { 'content-type': 'application/json' }
  const apiKey = getCrmLeadIngestKey()
  if (!apiKey) {
    throw new Error(
      'CRM lead sync: задайте SITE_LEADS_INGEST_KEY / CRM_API_KEY / CRM_LMS_SYNC_KEY'
    )
  }
  headers['x-api-key'] = apiKey

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
        {
          ok: false,
          error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID',
          code: 'telegram_not_configured',
        },
        { status: 503 }
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
    const safeName = sanitizeLeadName(name)
    const safeMessage = sanitizeLeadMessage(message)
    const safeCourseInput = sanitizeLeadCourse(course)

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
          {
            ok: false,
            error: 'Request rejected',
            code: security.code || security.reason || 'rejected',
          },
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
    const hasValidEventId = Boolean(eventId)
    const { fbc, fbp } = getFbCookies(request)
    // Клієнтські UTM + fallback з sourceUrl + _fbc/_fbp cookies (Meta часто дає лише fbclid без UTM).
    const resolvedAttribution = resolveServerAttribution({
      clientAttribution: attribution,
      sourceUrl,
      fbc,
      fbp,
    })
    const {
      fbc: resolvedFbc,
      fbp: resolvedFbp,
      _from_live_url: fromLiveUrl,
      _deferred_visit: deferredVisit,
      ...cleanAttribution
    } = resolvedAttribution
    const preferredContactLabel = preferredContactMethod === 'telegram_phone' ? 'Написати в Telegram за цим номером' : 'Подзвонити'
    const isTrialCourse = isTrialCourseValue(safeCourseInput)
    const displayCourse =
      safeCourseInput ||
      (hasValidEventId ? getTrialGenericCourse(loc) : '')
    const traffic = detectTrafficType({
      ...cleanAttribution,
      ...(resolvedFbc ? { fbc: resolvedFbc } : {}),
      ...(resolvedFbp ? { fbp: resolvedFbp } : {}),
      _from_live_url: fromLiveUrl,
      _deferred_visit: deferredVisit,
    })
    const trafficType = traffic.type
    const crmAttribution = {
      ...cleanAttribution,
      ...(resolvedFbc ? { fbc: resolvedFbc } : {}),
      ...(resolvedFbp ? { fbp: resolvedFbp } : {}),
      ...(hasValidEventId ? { event_id: eventId } : {}),
      event_time: Math.floor(Date.now() / 1000),
      traffic_type: trafficType,
      traffic_reason: traffic.reason,
      traffic_confidence: traffic.confidence,
      traffic_deferred: Boolean(traffic.deferred),
    }

    const cookieStore = await cookies()
    const referralIdCookie = cookieStore.get('referralId')
    const referralId = referralIdCookie?.value || null

    const leadIdentity = buildLeadIdentity({ normalizedPhone, normalizedTelegram })
    const submissions = await getCollection('submissions')
    // Блокуємо лише повторну відправку того самого eventId (той самий токен форми).
    // Один телефон / IP може залишати кілька заявок.
    const existingEvent = hasValidEventId
      ? await submissions.findOne({ eventId })
      : null

    if (existingEvent) {
      await recordLeadSubmitAttempt(submitIp, { blocked: false })
      return NextResponse.json({
        ok: true,
        trackLead: false,
        metaLeadSent: false,
        metaLeadSkipReason: 'дубль event id',
        duplicate: true,
      })
    }

    const shouldTrackLead = Boolean(normalizedPhone && hasValidEventId)
    const shouldNotifyTelegram = Boolean(internalLead || hasValidEventId || leadIdentity)

    const metaLeadSkipReason = getMetaLeadSkipReason({
      normalizedPhone,
      hasValidEventId,
      existingEvent,
    })

    if (!shouldNotifyTelegram) {
      await recordLeadSubmitAttempt(submitIp, { blocked: false })
      return NextResponse.json({
        ok: true,
        trackLead: false,
        metaLeadSent: false,
        metaLeadSkipReason: metaLeadSkipReason || 'немає даних для заявки',
        duplicate: false,
      })
    }

    let metaLeadSent = false
    let metaLeadError = null
    if (shouldTrackLead) {
      const clientIp = getClientIp(request)
      const userAgent = getClientUserAgent(request)
      const { trialInterestToContentIds } = await import('@/lib/metaPixel')
      const contentIds = isTrialCourse ? trialInterestToContentIds(course) : []

      const capiResult = await sendCapiLead({
        eventId,
        sourceUrl: sourceUrl || 'https://smartcode-academy.com',
        phone: normalizedPhone,
        externalId: leadIdentity || (normalizedTelegram ? normalizedTelegram.replace(/^@/, '').toLowerCase() : undefined),
        name: safeName || undefined,
        clientIp,
        userAgent,
        fbc: resolvedFbc || fbc,
        fbp: resolvedFbp || fbp,
        fbclid: cleanAttribution.fbclid || undefined,
        contentName: displayCourse || 'trial_lesson',
        contentIds,
      })
      metaLeadSent = Boolean(capiResult?.ok)
      metaLeadError = capiResult?.ok ? null : (capiResult?.error || 'невідома помилка CAPI')
    }

    const metaLeadLine = metaLeadSent
      ? '<b>Meta Lead Sent:</b> yes'
      : shouldTrackLead
        ? `<b>Meta Lead Sent:</b> no (${escapeHtml(metaLeadError || 'помилка CAPI')})`
        : `<b>Meta Lead Sent:</b> no (${escapeHtml(metaLeadSkipReason || 'невідомо')})`

    const lines = [
      '<b>Нова заявка зі сайту SmartCode Academy</b>',
      '',
      safeName ? `<b>Ім'я:</b> ${escapeHtml(safeName)}` : null,
      contactMethod === 'telegram'
        ? `<b>Телеграм:</b> ${escapeHtml(normalizedTelegram)}`
        : `<b>Телефон:</b> ${escapeHtml(normalizedPhone)}`,
      normalizedPhone ? `<b>Бажаний спосіб зв'язку:</b> ${escapeHtml(preferredContactLabel)}` : null,
      displayCourse ? `<b>Курс:</b> ${escapeHtml(displayCourse)}` : null,
      safeMessage ? `<b>Повідомлення:</b>\n${escapeHtml(safeMessage)}` : null,
      trafficType === 'Реклама'
        ? traffic.deferred
          ? `<b>Трафік:</b> Реклама (відкладений візит)`
          : `<b>Трафік:</b> Реклама`
        : `<b>Трафік:</b> Органіка/невідомо`,
      // Деталі атрибуції — лише для реклами (таргетологам корисно).
      trafficType === 'Реклама' && traffic.reason
        ? `<b>Підстава:</b> ${escapeHtml(traffic.reason)}`
        : null,
      trafficType === 'Реклама' && cleanAttribution.utm_source
        ? `<b>UTM Source:</b> ${escapeHtml(cleanAttribution.utm_source)}`
        : null,
      trafficType === 'Реклама' && cleanAttribution.utm_medium
        ? `<b>UTM Medium:</b> ${escapeHtml(cleanAttribution.utm_medium)}`
        : null,
      trafficType === 'Реклама' && cleanAttribution.utm_campaign
        ? `<b>UTM Campaign:</b> ${escapeHtml(cleanAttribution.utm_campaign)}`
        : null,
      trafficType === 'Реклама' && cleanAttribution.utm_term
        ? `<b>UTM Term:</b> ${escapeHtml(cleanAttribution.utm_term)}`
        : null,
      trafficType === 'Реклама' && cleanAttribution.utm_content
        ? `<b>UTM Content:</b> ${escapeHtml(cleanAttribution.utm_content)}`
        : null,
      trafficType === 'Реклама' && cleanAttribution.fbclid
        ? `<b>fbclid:</b> <code>${escapeHtml(cleanAttribution.fbclid)}</code>`
        : null,
      trafficType === 'Реклама' && cleanAttribution.gclid
        ? `<b>gclid:</b> <code>${escapeHtml(cleanAttribution.gclid)}</code>`
        : null,
      trafficType === 'Реклама' && cleanAttribution.ttclid
        ? `<b>ttclid:</b> <code>${escapeHtml(cleanAttribution.ttclid)}</code>`
        : null,
      metaLeadLine,
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
      console.error('Telegram sendMessage failed:', tgData)
      let savedOffline = false
      try {
        const insertResult = await submissions.insertOne({
          name: safeName,
          phone: normalizedPhone || '',
          telegram: normalizedTelegram || '',
          eventId: hasValidEventId ? eventId : null,
          leadIdentity,
          course: displayCourse || '',
          message: safeMessage,
          contactMethod: contactMethod || 'phone',
          preferredContactMethod: preferredContactMethod || 'phone_call',
          attribution: crmAttribution,
          createdAt: new Date(),
          via: 'telegram-api-failed',
          isUniqueLead: shouldTrackLead,
        })
        savedOffline = true
        if (tokenHash) {
          await markLeadTokenUsed(tokenHash)
        }
        await recordLeadSubmitAttempt(submitIp, { blocked: false })
        await sendLeadToCrm({
          leadId: String(insertResult.insertedId),
          name: safeName,
          phone: normalizedPhone || null,
          telegram: normalizedTelegram || null,
          course: displayCourse || '',
          message: safeMessage,
          contactMethod: contactMethod || 'phone',
          preferredContactMethod: preferredContactMethod || 'phone_call',
          sourceUrl: sourceUrl || null,
          attribution: crmAttribution,
          referralId,
          createdAt: new Date().toISOString(),
        }).catch((error) => {
          console.error('CRM lead sync failed after telegram error:', error)
        })
      } catch (dbErr) {
        console.error('Failed to save submission after telegram error:', dbErr)
      }

      if (savedOffline) {
        return NextResponse.json({
          ok: true,
        trackLead: shouldTrackLead,
        metaLeadSent,
        metaLeadError,
        metaLeadSkipReason,
          telegramDelivered: false,
        })
      }

      return NextResponse.json(
        { ok: false, error: 'Telegram API error', detail: tgData },
        { status: 500 }
      )
    }

    try {
      const insertResult = await submissions.insertOne({
        name: safeName,
        phone: normalizedPhone || '',
        telegram: normalizedTelegram || '',
        eventId: hasValidEventId ? eventId : null,
        leadIdentity,
        course: displayCourse || '',
        message: safeMessage,
        contactMethod: contactMethod || 'phone',
        preferredContactMethod: preferredContactMethod || 'phone_call',
        attribution: crmAttribution,
        createdAt: new Date(),
        via: 'telegram',
        isUniqueLead: shouldTrackLead,
        metaLeadSent,
        metaLeadError: metaLeadError || null,
      })
      if (tokenHash) {
        await markLeadTokenUsed(tokenHash)
      }
      await recordLeadSubmitAttempt(submitIp, { blocked: false })
      await sendLeadToCrm({
        leadId: String(insertResult.insertedId),
        name: safeName,
        phone: normalizedPhone || null,
        telegram: normalizedTelegram || null,
        course: displayCourse || '',
        message: safeMessage,
        contactMethod: contactMethod || 'phone',
        preferredContactMethod: preferredContactMethod || 'phone_call',
        sourceUrl: sourceUrl || null,
        attribution: crmAttribution,
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
        metaLeadError,
        metaLeadSkipReason,
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}
