/**
 * Course prices configuration
 */

export const coursePrices = {
  'python-developer-zero-to-junior': {
    price: 2000,
    currency: 'UAH',
    name: 'Пайтон',
    nameEn: 'Python Developer Course',
  },
  'roblox-studio': {
    price: 2000,
    currency: 'UAH',
    name: 'Roblox Studio',
    nameEn: 'Roblox Studio Course',
  },
}

/** Full-course prices on English site (WayForPay, USD) */
export const EN_FULL_COURSE_PRICES = {
  'python-developer-zero-to-junior': { price: 15, currency: 'USD' },
  'roblox-studio': { price: 15, currency: 'USD' },
}

/** Live lesson prices for English site (WayForPay) */
export const enLessonPrices = {
  group: { price: 10, currency: 'USD', label: 'Group lesson' },
  individual: { price: 15, currency: 'USD', label: 'Individual lesson' },
}

/** Live lesson prices for Ukrainian site (bank receipt) */
export const ukLessonPrices = {
  group: { price: 350, currency: 'UAH' },
  individual: { price: 500, currency: 'UAH' },
}

/** Full courses sold on EN site via WayForPay */
export function getEnPurchasableFullCourses() {
  return Object.entries(EN_FULL_COURSE_PRICES).map(([courseId, en]) => ({
    courseId,
    ...coursePrices[courseId],
    price: en.price,
    currency: en.currency,
    paymentProvider: 'wayforpay',
  }))
}

export function getCoursePrice(courseId, locale = 'uk') {
  const info = coursePrices[courseId]
  if (!info) return { price: 0, currency: 'UAH', name: 'Unknown Course' }

  const enPrice = EN_FULL_COURSE_PRICES[courseId]
  if (locale === 'en' && enPrice) {
    return {
      ...info,
      price: enPrice.price,
      currency: enPrice.currency,
      paymentProvider: 'wayforpay',
      name: info.nameEn || info.name,
      purchasable: true,
    }
  }

  return info
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
