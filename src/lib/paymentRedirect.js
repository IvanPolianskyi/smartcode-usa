const PURCHASABLE_COURSE_IDS = new Set([
  'python-developer-zero-to-junior',
  'roblox-studio',
  'web-development',
])

export function isPurchasableCourseId(courseId) {
  return Boolean(courseId && PURCHASABLE_COURSE_IDS.has(courseId))
}

/** Куди відправити користувача після успішної оплати. */
export function getPaymentRedirectPath({ paymentType, courseId }) {
  if (paymentType === 'full_course' && isPurchasableCourseId(courseId)) {
    return `/courses/${courseId}`
  }
  return '/dashboard'
}
