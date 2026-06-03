const MAX_LEAD_MESSAGE = 150
const MAX_NAME = 120
const MAX_COURSE = 200

/**
 * Plain text only for lead forms — blocks stored XSS in message/name fields.
 */
export function sanitizeLeadText(value, maxLen = MAX_LEAD_MESSAGE) {
  if (value == null) return ''
  let text = String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .trim()
  if (text.length > maxLen) {
    text = text.slice(0, maxLen)
  }
  return text
}

export function sanitizeLeadName(value) {
  return sanitizeLeadText(value, MAX_NAME)
}

export function sanitizeLeadCourse(value) {
  return sanitizeLeadText(value, MAX_COURSE)
}

export function sanitizeLeadMessage(value) {
  return sanitizeLeadText(value, MAX_LEAD_MESSAGE)
}

export const LEAD_MESSAGE_MAX_LENGTH = MAX_LEAD_MESSAGE
