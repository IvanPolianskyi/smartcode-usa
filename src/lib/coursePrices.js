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
 * Uses a consistent format to avoid hydration mismatches
 */
export function formatPrice(price, currency = 'UAH') {
  // Format number with Ukrainian locale (space as thousand separator, comma as decimal)
  const formattedNumber = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
  
  // Use consistent currency symbol/abbreviation
  // Always use "грн" for UAH to ensure server/client consistency
  if (currency === 'UAH') {
    return `${formattedNumber} грн`
  }
  
  // Fallback for other currencies
  return `${formattedNumber} ${currency}`
}
















