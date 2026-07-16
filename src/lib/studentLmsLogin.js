/**
 * Логін учня на LMS (@students.smartcode) і простий пароль.
 */

import crypto from 'crypto'

const STUDENTS_DOMAIN = 'students.smartcode'
const TEACHERS_DOMAIN = 'teachers.smartcode'

/** Українська/російська → латиниця (для логіну). */
const CYR_MAP = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ye',
  ж: 'zh',
  з: 'z',
  и: 'y',
  і: 'i',
  ї: 'yi',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ь: '',
  ю: 'yu',
  я: 'ya',
  э: 'e',
  ё: 'yo',
  ы: 'y',
  ъ: '',
}

export function sanitizeShortId(shortId) {
  return String(shortId || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

export function translitPersonName(value) {
  let out = ''
  for (const ch of String(value || '').trim().toLowerCase()) {
    if (CYR_MAP[ch] !== undefined) {
      out += CYR_MAP[ch]
      continue
    }
    if (/[a-z0-9]/.test(ch)) {
      out += ch
      continue
    }
    if (/\s|-|'|ʼ|`/.test(ch)) {
      out += '.'
    }
  }
  return out
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .replace(/[^a-z0-9.]+/g, '')
}

/** Локальна частина логіну з імені: «Олег Коваленко» → oleg.kovalenko */
export function loginLocalFromName(name, shortId = '') {
  const sid = sanitizeShortId(shortId)
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => translitPersonName(p))
    .filter(Boolean)

  let local = parts.join('.').replace(/\.+/g, '.').replace(/^\.+|\.+$/g, '')
  if (local.length < 2) {
    local = sid ? `student.${sid}` : ''
  }
  if (local.length > 36) {
    local = local.slice(0, 36).replace(/\.+$/g, '')
  }
  return local
}

/**
 * Логін на основі імені (+ short_id як запасний унікалізатор у caller).
 * Приклад: oleg.kovalenko@students.smartcode
 */
export function studentLoginFromName(name, shortId = '') {
  const local = loginLocalFromName(name, shortId)
  if (!local) return ''
  return `${local}@${STUDENTS_DOMAIN}`
}

/** Старий формат sc-{shortId}@… (лише fallback / пошу). */
export function syntheticStudentLogin(shortId) {
  const sid = sanitizeShortId(shortId)
  if (!sid) return ''
  return `sc-${sid}@${STUDENTS_DOMAIN}`
}

export function isSyntheticScLogin(email) {
  return /^sc-[a-z0-9]+@students\.smartcode$/i.test(String(email || '').trim())
}

export function isStudentsDomainLogin(email) {
  return /@students\.smartcode$/i.test(String(email || '').trim())
}

/** Простий пароль: 8 символів без плутанини (0/O, 1/l). */
export function generateStudentPassword() {
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789'
  const bytes = crypto.randomBytes(8)
  let out = ''
  for (let i = 0; i < 8; i += 1) {
    out += alphabet[bytes[i] % alphabet.length]
  }
  return out
}

/**
 * Унікальний логін: preferred → preferred.shortId → student.shortId.
 */
export async function allocateUniqueStudentLogin(
  usersCollection,
  { name, shortId, preferredEmail = '', excludeUserId = null } = {}
) {
  const sid = sanitizeShortId(shortId)
  const preferred = String(preferredEmail || '').trim().toLowerCase()
  const fromName = studentLoginFromName(name, sid)
  const candidates = []

  if (preferred && !isSyntheticScLogin(preferred)) {
    candidates.push(preferred)
  }
  if (fromName) candidates.push(fromName)
  if (fromName && sid) {
    const local = fromName.split('@')[0]
    candidates.push(`${local}.${sid}@${STUDENTS_DOMAIN}`)
  }
  if (sid) candidates.push(`student.${sid}@${STUDENTS_DOMAIN}`)
  candidates.push(syntheticStudentLogin(sid))

  const seen = new Set()
  for (const email of candidates) {
    const e = String(email || '').trim().toLowerCase()
    if (!e || seen.has(e)) continue
    seen.add(e)
    const query = { email: e }
    if (excludeUserId) query._id = { $ne: excludeUserId }
    const taken = await usersCollection.findOne(query, { projection: { _id: 1 } })
    if (!taken) return e
  }

  const fallback = `student.${sid || crypto.randomBytes(3).toString('hex')}@${STUDENTS_DOMAIN}`
  return fallback
}

/**
 * Логін викладача на основі імені.
 * Приклад: oleh.kovalenko@teachers.smartcode
 */
export function teacherLoginFromName(name, staffId = '') {
  const local = loginLocalFromName(name, sanitizeShortId(staffId).slice(-6))
  if (!local) {
    const sid =
      sanitizeShortId(staffId).slice(-8) || crypto.randomBytes(3).toString('hex')
    return `teacher.${sid}@${TEACHERS_DOMAIN}`
  }
  return `${local}@${TEACHERS_DOMAIN}`
}

export async function allocateUniqueTeacherLogin(
  usersCollection,
  { name, staffId = '', preferredEmail = '', excludeUserId = null } = {}
) {
  const preferred = String(preferredEmail || '').trim().toLowerCase()
  const fromName = teacherLoginFromName(name, staffId)
  const sid = sanitizeShortId(staffId).slice(-8)
  const candidates = []
  if (preferred && preferred.includes('@')) candidates.push(preferred)
  if (fromName) candidates.push(fromName)
  if (fromName && sid) {
    const local = fromName.split('@')[0]
    candidates.push(`${local}.${sid}@${TEACHERS_DOMAIN}`)
  }
  if (sid) candidates.push(`teacher.${sid}@${TEACHERS_DOMAIN}`)

  const seen = new Set()
  for (const email of candidates) {
    const e = String(email || '').trim().toLowerCase()
    if (!e || seen.has(e)) continue
    seen.add(e)
    const query = { email: e }
    if (excludeUserId) query._id = { $ne: excludeUserId }
    const taken = await usersCollection.findOne(query, { projection: { _id: 1 } })
    if (!taken) return e
  }
  return `teacher.${sid || crypto.randomBytes(3).toString('hex')}@${TEACHERS_DOMAIN}`
}
