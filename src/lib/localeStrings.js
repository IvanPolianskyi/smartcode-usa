/** Shared UK/EN strings for server routes and phone validation (no next-intl on API). */

export function resolveLocale(locale) {
  return locale === 'en' ? 'en' : 'uk'
}

export const PHONE_VALIDATION = {
  uk: {
    empty: 'Введіть номер телефону',
    tooShort: 'Введіть номер телефону після коду країни',
    tooLong: 'Надто довгий номер',
    duplicateDial: (dial) => `Не дублюйте код країни (+${dial} лише один раз)`,
    badFormat: 'Перевірте формат номера',
    badDigits: 'Перевірте кількість цифр (без дубля коду країни)',
    notEurope: 'Потрібен номер з країни Європи',
  },
  en: {
    empty: 'Enter your phone number',
    tooShort: 'Enter the phone number after the country code',
    tooLong: 'Phone number is too long',
    duplicateDial: (dial) => `Do not duplicate the country code (+${dial} only once)`,
    badFormat: 'Check the phone number format',
    badDigits: 'Check the number of digits (without duplicating the country code)',
    notEurope: 'A European country phone number is required',
  },
}

export const API_ERRORS = {
  uk: {
    invalidPhone: 'Невалідний номер (потрібен номер країни Європи)',
    phoneOrTelegramRequired: 'Потрібен телефон або Telegram',
    phoneAndNameRequired: 'Потрібні імʼя та телефон',
    phoneNameDirectionRequired: 'Потрібні імʼя, телефон та напрямок',
  },
  en: {
    invalidPhone: 'Invalid phone number (a European country number is required)',
    phoneOrTelegramRequired: 'Phone or Telegram is required',
    phoneAndNameRequired: 'Name and phone number are required',
    phoneNameDirectionRequired: 'Name, phone number, and track are required',
  },
}

/** Course option values from trial form — UK and EN labels both count as trial leads. */
export const TRIAL_COURSE_VALUES = new Set([
  // Ukrainian (uk locale forms)
  'Roblox Studio',
  'Python',
  'JavaScript та веб-розробка',
  'Розробка ігор на Unity',
  'Не впевнений(а), потрібна консультація',
  // English (en locale forms)
  'Roblox Studio',
  'Python',
  'JavaScript & Web Development',
  'Unity Game Development',
  'Not sure — need a consultation',
])

export function isTrialCourseValue(course) {
  return TRIAL_COURSE_VALUES.has(String(course || '').trim())
}

export function paymentDescription(courseName, locale) {
  if (resolveLocale(locale) === 'en') {
    return `Course payment: ${courseName}`
  }
  return `Оплата курсу: ${courseName}`
}

export function ofertaDownloadFilename(locale) {
  return resolveLocale(locale) === 'en' ? 'Terms-of-Service.pdf' : 'Публічна оферта.pdf'
}
