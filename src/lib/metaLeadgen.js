/**
 * Meta / Instagram Lead Ads → той самий пайплайн, що заявки з сайту
 * (Telegram 1–2 групи + CRM site_leads).
 *
 * Env:
 * - META_LEADGEN_VERIFY_TOKEN — Verify Token для webhook
 * - META_PAGE_ACCESS_TOKEN — Page token з leads_retrieval
 * - META_PAGE_ID — фільтр page (рекомендовано)
 * - META_LEAD_FORM_IDS — опційно, comma-separated Form ID
 * - TELEGRAM_* / CRM_* — ті самі, що для сайту
 */

import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { normalizePhoneE164 } from '@/lib/phoneE164'
import { getCrmLeadIngestKey } from '@/lib/integrationApiKey'
import { buildLeadContactKeyboard } from '@/lib/leadContactStatus'
import { ensureLeadsTelegramWebhook } from '@/lib/ensureLeadsTelegramWebhook'
import {
  sanitizeLeadCourse,
  sanitizeLeadMessage,
  sanitizeLeadName,
} from '@/lib/sanitizeLeadText'

const GRAPH_VERSION = 'v22.0'
const ADS_CHAT_ID = '-1004284257942'

function escapeHtml(input) {
  return String(input ?? '').replace(/[&<>"']/g, (char) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[char]
  )
}

function htmlToPlain(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
}

function configuredFormIds() {
  return String(process.env.META_LEAD_FORM_IDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function normalizeFieldKey(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
}

/** field_data → map + list (для fuzzy-пошуку кастомних питань UA/RU). */
function fieldMapFromLead(fieldData = []) {
  const out = {}
  const list = []
  for (const row of fieldData) {
    const rawName = String(row?.name || '').trim()
    const key = normalizeFieldKey(rawName)
    const values = Array.isArray(row?.values) ? row.values : []
    const value = String(values[0] ?? '').trim()
    if (!key && !value) continue
    if (key) out[key] = value
    list.push({ key, rawName, value })
  }
  return { map: out, list }
}

function pickExact(map, keys) {
  for (const key of keys) {
    const k = normalizeFieldKey(key)
    const v = map[k]
    if (v) return v
  }
  return ''
}

/** Знайти значення за підрядком у назві поля (кастомні питання Meta). */
function pickByKeyIncludes(list, needles) {
  const norms = needles.map((n) => normalizeFieldKey(n))
  for (const row of list) {
    if (!row.value) continue
    for (const n of norms) {
      if (row.key.includes(n)) return row.value
    }
  }
  return ''
}

function looksLikePhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15
}

function resolveLeadFields(fieldData) {
  const { map, list } = fieldMapFromLead(fieldData)

  let name = sanitizeLeadName(
    pickExact(map, [
      'full_name',
      'full name',
      'first_name',
      'last_name',
      'name',
      "ім'я",
      'имя',
    ]) ||
      pickByKeyIncludes(list, [
        'як вас звати',
        'як звати',
        'ваше ім',
        'ваше имя',
        'full name',
        'first name',
        'имя',
        "ім'я",
        'звати',
      ])
  )

  let phoneRaw =
    pickExact(map, [
      'phone_number',
      'phone',
      'work_phone_number',
      'user_provided_phone_number',
      'мобільний телефон',
      'телефон',
      'номер телефону',
    ]) ||
    pickByKeyIncludes(list, [
      'phone number',
      'phone',
      'телефон',
      'номер',
      'мобіль',
    ])

  // Якщо «Phone number» прийшло як кастомне текстове поле без стандартного key.
  if (!phoneRaw) {
    for (const row of list) {
      if (looksLikePhone(row.value) && !/email|mail|вік|років|age/i.test(row.key)) {
        phoneRaw = row.value
        break
      }
    }
  }

  const age =
    pickExact(map, ['age', 'вік', 'возраст']) ||
    pickByKeyIncludes(list, [
      'скільки років',
      'років дитин',
      'вік',
      'возраст',
      'age',
      'років',
    ])

  const email =
    pickExact(map, ['email', 'e-mail', 'email_address', 'почта', 'work_email']) ||
    pickByKeyIncludes(list, ['email', 'e-mail', 'почта', 'пошта'])

  const telegramRaw =
    pickExact(map, ['telegram', 'телеграм', 'tg']) ||
    pickByKeyIncludes(list, ['telegram', 'телеграм', 'тг', 'tg'])

  const course = sanitizeLeadCourse(
    pickExact(map, ['course', 'курс', 'напрям', 'направление']) ||
      pickByKeyIncludes(list, ['курс', 'напрям', 'course'])
  )

  const knownKeys = new Set(
    [
      'full_name',
      'full name',
      'first_name',
      'last_name',
      'name',
      'phone_number',
      'phone',
      'email',
      'telegram',
      'course',
      'age',
    ].map(normalizeFieldKey)
  )

  const extraLines = list
    .filter((row) => {
      if (!row.value) return false
      if (knownKeys.has(row.key)) return false
      // Вже розпарсили як name/phone/age
      if (name && row.value === name) return false
      if (phoneRaw && row.value === phoneRaw) return false
      if (age && row.value === age) return false
      if (email && row.value === email) return false
      if (telegramRaw && row.value === telegramRaw) return false
      return true
    })
    .map((row) => `${row.rawName || row.key}: ${row.value}`)

  const message = sanitizeLeadMessage(
    [
      age ? `Вік дитини: ${age}` : '',
      email ? `Email: ${email}` : '',
      ...extraLines,
    ]
      .filter(Boolean)
      .join('\n')
      .slice(0, 2000)
  )

  return {
    name,
    phoneRaw,
    telegramRaw,
    course,
    age,
    email,
    message,
    rawMap: map,
  }
}

export function isMetaLeadgenConfigured() {
  return Boolean(
    process.env.META_PAGE_ACCESS_TOKEN && process.env.META_LEADGEN_VERIFY_TOKEN
  )
}

export async function fetchMetaLeadById(leadgenId) {
  const token = process.env.META_PAGE_ACCESS_TOKEN
  if (!token) throw new Error('META_PAGE_ACCESS_TOKEN missing')
  const url = new URL(
    `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(leadgenId)}`
  )
  url.searchParams.set(
    'fields',
    'id,created_time,ad_id,adset_id,campaign_id,form_id,field_data'
  )
  url.searchParams.set('access_token', token)
  const res = await fetch(url.toString(), { method: 'GET' })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(
      `Graph lead fetch failed (${res.status}): ${JSON.stringify(data)}`
    )
  }
  return data
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
    throw new Error(
      `CRM lead sync failed (${response.status}): ${JSON.stringify(data)}`
    )
  }
  return data
}

/**
 * Зберегти лід з Instagram/Facebook Lead Form і розіслати як заявку з сайту.
 */
export async function ingestMetaLeadgen({
  leadgenId,
  pageId = null,
  formId = null,
  adId = null,
}) {
  const allowedForms = configuredFormIds()
  if (allowedForms.length && formId && !allowedForms.includes(String(formId))) {
    return { ok: true, skipped: true, reason: 'form_not_allowed', formId }
  }
  const pageFilter = String(process.env.META_PAGE_ID || '').trim()
  if (pageFilter && pageId && String(pageId) !== pageFilter) {
    return { ok: true, skipped: true, reason: 'page_mismatch', pageId }
  }

  const submissions = await getCollection('submissions')
  const existing = await submissions.findOne({
    metaLeadgenId: String(leadgenId),
  })
  if (existing) {
    return { ok: true, duplicate: true, leadId: String(existing._id) }
  }

  const raw = await fetchMetaLeadById(leadgenId)
  const resolvedFormId = raw?.form_id || formId
  if (
    allowedForms.length &&
    resolvedFormId &&
    !allowedForms.includes(String(resolvedFormId))
  ) {
    return {
      ok: true,
      skipped: true,
      reason: 'form_not_allowed',
      formId: resolvedFormId,
    }
  }

  const resolved = resolveLeadFields(raw?.field_data || [])
  const {
    name,
    phoneRaw,
    telegramRaw,
    course,
    age,
    message,
  } = resolved

  const normalizedPhone = phoneRaw ? normalizePhoneE164(phoneRaw, 'uk') : null
  const normalizedTelegram = telegramRaw
    ? telegramRaw.startsWith('@')
      ? telegramRaw
      : `@${telegramRaw.replace(/^@/, '')}`
    : null

  if (!normalizedPhone && !normalizedTelegram && !name) {
    return {
      ok: false,
      error: 'empty_lead_fields',
      fields: resolved.rawMap,
      field_data: raw?.field_data || [],
    }
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChatId = process.env.TELEGRAM_CHAT_ID
  if (!telegramBotToken || !telegramChatId) {
    return { ok: false, error: 'telegram_not_configured' }
  }

  const createdAtLabel = new Date().toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
  })
  const leadObjectId = new ObjectId()
  const leadIdStr = leadObjectId.toString()
  const displayCourse = course || 'Пробний урок (Instagram)'
  const crmAttribution = {
    traffic_type: 'Реклама',
    traffic_reason: 'instagram_lead_form',
    traffic_confidence: 'high',
    utm_source: 'instagram',
    utm_medium: 'paid',
    utm_campaign: String(resolvedFormId || ''),
    meta_leadgen_id: String(leadgenId),
    meta_form_id: resolvedFormId ? String(resolvedFormId) : null,
    meta_ad_id: adId ? String(adId) : raw?.ad_id ? String(raw.ad_id) : null,
    meta_page_id: pageId ? String(pageId) : null,
    child_age: age || null,
    event_time: Math.floor(Date.now() / 1000),
  }

  const lines = [
    '<b>Нова заявка з Instagram Lead Form</b>',
    '',
    name ? `<b>Ім'я:</b> ${escapeHtml(name)}` : null,
    normalizedPhone
      ? `<b>Телефон:</b> ${escapeHtml(normalizedPhone)}`
      : null,
    normalizedTelegram
      ? `<b>Телеграм:</b> ${escapeHtml(normalizedTelegram)}`
      : null,
    age ? `<b>Вік дитини:</b> ${escapeHtml(age)}` : null,
    `<b>Курс:</b> ${escapeHtml(displayCourse)}`,
    message ? `<b>Деталі:</b>\n${escapeHtml(message)}` : null,
    '<b>Трафік:</b> Реклама',
    '<b>Підстава:</b> Instagram Lead Form',
    resolvedFormId
      ? `<b>Form ID:</b> <code>${escapeHtml(String(resolvedFormId))}</code>`
      : null,
    `<b>Leadgen ID:</b> <code>${escapeHtml(String(leadgenId))}</code>`,
    '',
    `<b>Час:</b> ${escapeHtml(createdAtLabel)}`,
  ].filter(Boolean)

  const htmlText = lines.join('\n')
  const telegramNotifyText = htmlToPlain(htmlText)
  const statusKeyboard = buildLeadContactKeyboard(leadIdStr)

  const chatIds = [String(telegramChatId).trim()].filter(Boolean)
  if (ADS_CHAT_ID && !chatIds.includes(ADS_CHAT_ID)) {
    chatIds.push(ADS_CHAT_ID)
  }

  async function sendTelegramToChat(chatId) {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: htmlText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
          reply_markup: statusKeyboard,
        }),
      }
    )
    const tgData = await telegramResponse.json().catch(() => null)
    const messageId = tgData?.result?.message_id
    return {
      chatId,
      ok: Boolean(telegramResponse.ok && tgData?.ok),
      messageId: typeof messageId === 'number' ? messageId : null,
    }
  }

  const sendResults = await Promise.all(chatIds.map((id) => sendTelegramToChat(id)))
  const telegramDeliveries = sendResults
    .filter((r) => r.ok && r.messageId != null)
    .map((r) => ({ chatId: String(r.chatId), messageId: r.messageId }))

  void ensureLeadsTelegramWebhook()

  await submissions.insertOne({
    _id: leadObjectId,
    name: name || '',
    phone: normalizedPhone || '',
    telegram: normalizedTelegram || '',
    eventId: null,
    leadIdentity: normalizedPhone
      ? `phone:${normalizedPhone}`
      : normalizedTelegram
        ? `telegram:${normalizedTelegram.toLowerCase()}`
        : null,
    course: displayCourse,
    message: message || '',
    contactMethod: normalizedPhone ? 'phone' : 'telegram',
    preferredContactMethod: 'phone_call',
    attribution: crmAttribution,
    childAge: age || null,
    referralId: null,
    affiliateSrc: null,
    createdAt: new Date(),
    via: 'instagram-leadgen',
    metaLeadgenId: String(leadgenId),
    metaFormId: resolvedFormId ? String(resolvedFormId) : null,
    isUniqueLead: Boolean(normalizedPhone),
    contactStatus: null,
    telegramDeliveries,
    telegramNotifyText,
  })

  await sendLeadToCrm({
    leadId: leadIdStr,
    name: name || null,
    phone: normalizedPhone || null,
    telegram: normalizedTelegram || null,
    course: displayCourse,
    message: message || '',
    contactMethod: normalizedPhone ? 'phone' : 'telegram',
    preferredContactMethod: 'phone_call',
    sourceUrl: 'instagram://lead_form',
    attribution: crmAttribution,
    referralId: null,
    affiliateSrc: null,
    createdAt: new Date().toISOString(),
    telegramDeliveries,
  }).catch((err) => {
    console.error('[meta-leadgen] CRM sync failed:', err)
  })

  return {
    ok: true,
    leadId: leadIdStr,
    telegramDeliveries: telegramDeliveries.length,
    formId: resolvedFormId ? String(resolvedFormId) : null,
  }
}

export async function processLeadgenWebhookPayload(body) {
  const entries = Array.isArray(body?.entry) ? body.entry : []
  const results = []
  for (const entry of entries) {
    const pageId = entry?.id
    const changes = Array.isArray(entry?.changes) ? entry.changes : []
    for (const change of changes) {
      if (change?.field !== 'leadgen') continue
      const value = change?.value || {}
      const leadgenId = value.leadgen_id || value.lead_id
      if (!leadgenId) continue
      try {
        const r = await ingestMetaLeadgen({
          leadgenId: String(leadgenId),
          pageId: pageId ? String(pageId) : value.page_id ? String(value.page_id) : null,
          formId: value.form_id ? String(value.form_id) : null,
          adId: value.ad_id ? String(value.ad_id) : null,
        })
        results.push(r)
      } catch (e) {
        console.error('[meta-leadgen] ingest failed:', e)
        results.push({ ok: false, error: String(e?.message || e) })
      }
    }
  }
  return results
}
