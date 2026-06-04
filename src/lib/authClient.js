'use client'

/**
 * Client-side authentication utilities
 */

export async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }

  return data
}

export async function register(
  email,
  password,
  name,
  locale = 'uk',
  claimOrder,
  privacyAccepted = false
) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, locale, claimOrder, privacyAccepted }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Registration failed')
  }

  return data
}

export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }

  return true
}

export async function deleteAccount() {
  const response = await fetch('/api/auth/delete-account', {
    method: 'POST',
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete account')
  }

  return data
}

export async function getCurrentUser() {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    return null
  }
}

export async function getUserProgress(courseId) {
  try {
    const response = await fetch(`/api/progress?courseId=${courseId}`, {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.progress
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return null
  }
}

export async function updateProgress(courseId, updates) {
  const response = await fetch('/api/progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ courseId, ...updates }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update progress')
  }

  return data.progress
}

export async function enrollInCourse(courseId) {
  const response = await fetch('/api/courses/enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ courseId }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to enroll in course')
  }

  return data
}

export async function checkCoursePurchase(courseId) {
  try {
    const response = await fetch(`/api/payment?courseId=${courseId}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    return data.purchased || false
  } catch (error) {
    return false
  }
}

export async function createPayment(courseId, locale = 'uk', guestEmail, guestName) {
  const response = await fetch('/api/payment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ courseId, locale, guestEmail, guestName }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create payment')
  }

  return data
}

export async function createEnLessonPayment({ courseId, lessonFormat, day, time, guestEmail, guestName }) {
  const response = await fetch('/api/payment/en-lesson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ courseId, lessonFormat, day, time, guestEmail, guestName }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create payment')
  }
  return data
}

/** Тестовий платіж Monobank (100 грн за замовчуванням) */
export async function createMonobankTestPayment(options = {}) {
  const response = await fetch('/api/payment/monobank/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(options),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create test payment')
  }
  return data
}

// Legacy function for backward compatibility
export async function purchaseCourse(courseId, paymentMethod = 'manual', paymentData = {}) {
  // This should not be called directly anymore - use createPayment instead
  throw new Error('Use createPayment() instead of purchaseCourse()')
}

