/**
 * Статуси контакту по заявці (кнопки в Telegram-сповіщенні).
 * callback_data: ls:{leadId}:{code}  (≤64 байт)
 */

export const LEAD_CONTACT_STATUSES = [
  {
    code: 'trial_booked',
    label: 'Записалися на пробне',
    shortLabel: 'Пробне',
  },
  {
    code: 'paid_enrolled',
    label: 'Записався на платне',
    shortLabel: 'Платне',
  },
  {
    code: 'no_answer',
    label: 'Не відповідають',
    shortLabel: 'Не відповідають',
  },
  {
    code: 'wrote_messenger',
    label: 'Написали в месенджер',
    shortLabel: 'Написали',
  },
  {
    code: 'replied_messenger',
    label: 'Відписали в месенджері',
    shortLabel: 'Відписали',
  },
]

export const LEAD_CONTACT_STATUS_BY_CODE = Object.fromEntries(
  LEAD_CONTACT_STATUSES.map((s) => [s.code, s])
)

export function isValidLeadContactStatus(code) {
  return Boolean(code && LEAD_CONTACT_STATUS_BY_CODE[code])
}

export function leadContactStatusLabel(code) {
  return LEAD_CONTACT_STATUS_BY_CODE[code]?.label || null
}

/** Inline keyboard; активний статус з ✅ */
export function buildLeadContactKeyboard(leadId, activeCode = null) {
  const id = String(leadId || '').trim()
  if (!id) return undefined
  return {
    inline_keyboard: LEAD_CONTACT_STATUSES.map((s) => {
      const isActive = activeCode === s.code
      return [
        {
          text: isActive ? `✅ ${s.label}` : s.label,
          callback_data: `ls:${id}:${s.code}`,
        },
      ]
    }),
  }
}

export function parseLeadStatusCallbackData(data) {
  const raw = String(data || '')
  const m = /^ls:([a-fA-F0-9]{24}):([a-z_]+)$/.exec(raw)
  if (!m) return null
  const leadId = m[1]
  const code = m[2]
  if (!isValidLeadContactStatus(code)) return null
  return { leadId, code }
}

/** Видимий блок статусу на початку повідомлення в чаті. */
export function contactStatusBannerPlain(code) {
  const label = leadContactStatusLabel(code)
  if (!label) return null
  return `📌 Статус: ${label}`
}

const STATUS_BANNER_RE = /^📌 Статус: [^\n]*/m
const STATUS_LINE_RE = /\n?\n?(?:📌 )?Статус: [^\n]*/g

/**
 * Вставити/оновити рядок статусу на початку тексту повідомлення (plain).
 * Так стан видно прямо в чаті, не лише в toast.
 */
export function withContactStatusInPlainText(originalText, code) {
  const banner = contactStatusBannerPlain(code)
  if (!banner) return String(originalText || '')
  let text = String(originalText || '')
  text = text.replace(STATUS_LINE_RE, '').trim()
  // Прибрати старий банер на початку
  text = text.replace(STATUS_BANNER_RE, '').trim()
  return `${banner}\n\n${text}`
}
