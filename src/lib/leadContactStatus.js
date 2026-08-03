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

/** Inline keyboard; активний статус з ✅, інші з ○ — видно поточний стан. */
export function buildLeadContactKeyboard(leadId, activeCode = null) {
  const id = String(leadId || '').trim()
  if (!id) return undefined
  return {
    inline_keyboard: LEAD_CONTACT_STATUSES.map((s) => {
      const isActive = activeCode === s.code
      return [
        {
          text: isActive ? `✅ ${s.label}` : `○ ${s.label}`,
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

/** Рядок статусу в кінці повідомлення (plain text для editMessageText). */
export function contactStatusMessageLinePlain(code) {
  const label = leadContactStatusLabel(code)
  if (!label) return null
  return `Статус: ${label}`
}

/**
 * Оновити/додати рядок «Статус:» у plain-тексті заявки (з Telegram callback).
 */
export function withContactStatusInPlainText(originalText, code) {
  const text = String(originalText || '')
  const line = contactStatusMessageLinePlain(code)
  if (!line) return text
  const stripped = text.replace(/\n?\n?Статус: [^\n]*/g, '').trimEnd()
  return `${stripped}\n\n${line}`
}
