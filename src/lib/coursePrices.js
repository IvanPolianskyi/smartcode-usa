/**
 * Course prices configuration
 */

export const coursePrices = {
  'python-developer-zero-to-junior': {
    price: 2000, // UAH
    currency: 'UAH',
    name: 'Python Developer: From Zero to Confident Junior'
  },
  'web-development': {
    price: 2000, // UAH
    currency: 'UAH',
    name: 'Веб-розробка: Від основ до просунутого рівня'
  }
}

/**
 * Get course price
 */
export function getCoursePrice(courseId) {
  return coursePrices[courseId] || { price: 0, currency: 'UAH', name: 'Unknown Course' }
}

/**
 * Format price for display
 */
export function formatPrice(price, currency = 'UAH') {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: currency
  }).format(price)
}














