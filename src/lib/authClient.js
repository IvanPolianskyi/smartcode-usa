'use client'

/**
 * Client-side authentication utilities
 */

export async function login(email, password) {
  const { normalizeLoginIdentifier } = await import('@/lib/authLogin')
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: normalizeLoginIdentifier(email),
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }

  return data
}

export async function register({ email, password, name, phone, privacyAccepted }) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      phone: phone || undefined,
      privacyAccepted: Boolean(privacyAccepted),
    }),
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
    // Online purchase flow removed — treat access as not purchased via payment API.
    void courseId
    return false
  } catch (error) {
    return false
  }
}

/** Use Paddle checkout via Pricing instead. */
export async function createPayment() {
  throw new Error('Course purchase moved to Pricing. Pick a program and start a free trial.')
}

export async function createEnLessonPayment() {
  throw new Error('Lesson booking via site payment is disabled. Use Pricing to subscribe.')
}

/** @deprecated */
export async function purchaseCourse() {
  throw new Error('Course purchase moved to Pricing. Pick a program and start a free trial.')
}

