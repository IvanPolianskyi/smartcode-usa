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
    terminal: true,
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
  {
    code: 'not_enrolled',
    label: 'Не записався',
    shortLabel: 'Не записався',
    terminal: true,
    hideFromKeyboard: true,
  },
]

export const LEAD_CONTACT_STATUS_BY_CODE = Object.fromEntries(
  LEAD_CONTACT_STATUSES.map((s) => [s.code, s])
)

export const TERMINAL_CONTACT_STATUSES = new Set(
  LEAD_CONTACT_STATUSES.filter((s) => s.terminal).map((s) => s.code)
)

export function isValidLeadContactStatus(code) {
  return Boolean(code && LEAD_CONTACT_STATUS_BY_CODE[code])
}

export function leadContactStatusLabel(code) {
  return LEAD_CONTACT_STATUS_BY_CODE[code]?.label || null
}

export function isTerminalLeadContactStatus(code) {
  return TERMINAL_CONTACT_STATUSES.has(String(code || '').trim())
}

/** Чи можна змінити статус з existing на next (антидаунгрейд). */
export function canChangeLeadContactStatus(existing, next) {
  const from = String(existing || '').trim()
  const to = String(next || '').trim()
  if (!to || !isValidLeadContactStatus(to)) return false
  if (!from || from === to) return true
  if (from === 'paid_enrolled') return false
  if (from === 'not_enrolled' && to !== 'paid_enrolled') return false
  return true
}

/** Inline keyboard; активний статус з ✅. Термінальні — лише поточний рядок. */
export function buildLeadContactKeyboard(leadId, activeCode = null) {
  const id = String(leadId || '').trim()
  if (!id) return undefined
  const active = String(activeCode || '').trim()
  if (isTerminalLeadContactStatus(active)) {
    const s = LEAD_CONTACT_STATUS_BY_CODE[active]
    if (!s) return { inline_keyboard: [] }
    return {
      inline_keyboard: [
        [
          {
            text: `✅ ${s.label}`,
            callback_data: `ls:${id}:${s.code}`,
          },
        ],
      ],
    }
  }
  const rows = LEAD_CONTACT_STATUSES.filter((s) => !s.hideFromKeyboard).map(
    (s) => {
      const isActive = active === s.code
      return [
        {
          text: isActive ? `✅ ${s.label}` : s.label,
          callback_data: `ls:${id}:${s.code}`,
        },
      ]
    }
  )
  return { inline_keyboard: rows }
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
export function contactStatusBannerPlain(code, opts = {}) {
  const label = leadContactStatusLabel(code)
  if (!label) return null
  const lines = [`📌 Статус: ${label}`]
  const callbackLine = formatCallbackBannerLine(opts.callbackAt, opts.clearCallback)
  if (callbackLine) lines.push(callbackLine)
  return lines.join('\n')
}

const STATUS_BANNER_RE = /^📌 Статус: [^\n]*(?:\n📌 Переобдзвін:[^\n]*)?/m
const STATUS_LINE_RE =
  /\n?\n?(?:📌 )?Статус: [^\n]*(?:\n📌 Переобдзвін:[^\n]*)?/g
const CALLBACK_LINE_RE = /\n?📌 Переобдзвін:[^\n]*/g

export function formatCallbackBannerLine(callbackAt, clearCallback = false) {
  if (clearCallback) return null
  if (!callbackAt) return null
  const d = callbackAt instanceof Date ? callbackAt : new Date(callbackAt)
  if (Number.isNaN(d.getTime())) return null
  const formatted = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
  return `📌 Переобдзвін: ${formatted}`
}

/**
 * Вставити/оновити рядок статусу (+ опційно переобдзвін) на початку тексту.
 */
export function withContactStatusInPlainText(originalText, code, opts = {}) {
  const banner = contactStatusBannerPlain(code, opts)
  if (!banner) return String(originalText || '')
  let text = String(originalText || '')
  text = text.replace(STATUS_LINE_RE, '').trim()
  text = text.replace(CALLBACK_LINE_RE, '').trim()
  text = text.replace(STATUS_BANNER_RE, '').trim()
  return `${banner}\n\n${text}`
}
