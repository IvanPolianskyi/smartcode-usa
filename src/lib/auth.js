import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

/** Практично «довічна» сесія учня (браузери можуть обмежити cookie ~400 днів). */
const JWT_EXPIRES_IN = '10y'
/** 10 років у секундах — maxAge cookie; оновлюється при кожному /api/auth/me. */
export const AUTH_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365 * 10

function getJwtSecret() {
  const secret = process.env.JWT_SECRET || ''
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production')
  }
  return secret || 'dev-only-change-jwt-secret'
}

/**
 * Hash a password
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

/**
 * Compare password with hash
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash)
}

/**
 * Generate JWT token
 */
export function generateToken(userId) {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN })
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret())
  } catch (error) {
    return null
  }
}

/**
 * Get current user from request (server-side)
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    
    if (!token) {
      return null
    }
    
    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }
    
    return decoded.userId
  } catch (error) {
    return null
  }
}

/**
 * Set auth cookie
 */
export async function setAuthCookie(token) {
  const cookieStore = await cookies()
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE_SEC,
  })
}

/**
 * Видати новий JWT і оновити cookie (login або sliding refresh сесії).
 */
export async function issueAuthSession(userId) {
  const token = generateToken(userId)
  await setAuthCookie(token)
  return token
}

/**
 * Remove auth cookie
 */
export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}





















