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

/** Full courses sold on EN site via Monobank (UAH) */
export function getEnPurchasableFullCourses() {
  return Object.entries(coursePrices).map(([courseId, info]) => ({
    courseId,
    ...info,
    paymentProvider: 'monobank',
    purchasable: true,
    name: info.nameEn || info.name,
  }))
}

export function getCoursePrice(courseId, locale = 'uk') {
  const info = coursePrices[courseId]
  if (!info) return { price: 0, currency: 'UAH', name: 'Unknown Course' }

  if (locale === 'en') {
    return {
      ...info,
      currency: 'UAH',
      paymentProvider: 'monobank',
      name: info.nameEn || info.name,
      purchasable: true,
    }
  }

  return { ...info, purchasable: false }
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
