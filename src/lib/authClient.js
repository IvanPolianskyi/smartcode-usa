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

/** Публічна реєстрація вимкнена — акаунти створює CRM / Telegram. */
export async function register() {
  throw new Error(
    'Публічна реєстрація вимкнена. Акаунт видає менеджер SmartCode або Telegram-бот.'
  )
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

/** Онлайн-оплата повних курсів вимкнена — доступ через CRM / онлайн-уроки. */
export async function createPayment() {
  throw new Error(
    'Купівля курсів на сайті вимкнена. Доступ до платформи відкриває менеджер SmartCode разом з онлайн-уроками.'
  )
}

export async function createEnLessonPayment() {
  throw new Error('Запис на урок через оплату на сайті вимкнено.')
}

/** @deprecated */
export async function purchaseCourse() {
  throw new Error(
    'Купівля курсів на сайті вимкнена. Зверніться до менеджера SmartCode.'
  )
}

