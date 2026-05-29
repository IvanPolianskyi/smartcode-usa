/**
 * Course prices configuration
 */

export const coursePrices = {
  'python-developer-zero-to-junior': {
    price: 1000,
    currency: 'UAH',
    name: 'Пайтон',
    nameEn: 'Python Developer Course',
  },
  'roblox-studio': {
    price: 1000,
    currency: 'UAH',
    name: 'Roblox Studio',
    nameEn: 'Roblox Studio Course',
  },
}

/** Ціна на EN-сайті (відображення) */
export const EN_FULL_COURSE_DISPLAY = {
  price: 23,
  currency: 'USD',
}

/** Сума списання через Monobank (UAH) */
export const EN_FULL_COURSE_CHARGE_UAH = 1000

/** Live lesson prices for English site (Monobank, UAH) */
export const enLessonPrices = {
  group: { price: 350, currency: 'UAH', label: 'Group lesson' },
  individual: { price: 500, currency: 'UAH', label: 'Individual lesson' },
}

/** Live lesson prices for Ukrainian site (bank receipt) */
export const ukLessonPrices = {
  group: { price: 350, currency: 'UAH' },
  individual: { price: 500, currency: 'UAH' },
}

function withEnCoursePricing(info) {
  return {
    ...info,
    price: EN_FULL_COURSE_DISPLAY.price,
    currency: EN_FULL_COURSE_DISPLAY.currency,
    chargePrice: EN_FULL_COURSE_CHARGE_UAH,
    chargeCurrency: 'UAH',
    paymentProvider: 'monobank',
    purchasable: true,
    name: info.nameEn || info.name,
  }
}

/** Full courses sold on EN site via Monobank */
export function getEnPurchasableFullCourses() {
  return Object.entries(coursePrices).map(([courseId, info]) => ({
    courseId,
    ...withEnCoursePricing(info),
  }))
}

export function getCoursePrice(courseId, locale = 'uk') {
  const info = coursePrices[courseId]
  if (!info) return { price: 0, currency: 'UAH', name: 'Unknown Course' }

  if (locale === 'en') {
    return withEnCoursePricing(info)
  }

  return { ...info, purchasable: false }
}

/** Сума для Monobank (копійки рахуються з chargePrice або price). */
export function getCourseChargeAmount(courseInfo) {
  if (!courseInfo) return 0
  return Number(courseInfo.chargePrice ?? courseInfo.price) || 0
}

export function getLessonPrice(format, locale = 'uk') {
  const table = locale === 'en' ? enLessonPrices : ukLessonPrices
  return table[format] || table.group
}

export function formatPrice(price, currency = 'UAH', locale = 'uk') {
  if (currency === 'USD') {
    return new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formattedNumber = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  if (currency === 'UAH') {
    return `${formattedNumber} грн`
  }

  return `${formattedNumber} ${currency}`
}
