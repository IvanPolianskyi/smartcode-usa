import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ensureUserIndexes, getCollection } from '@/lib/mongodb'
import { hashPassword, issueAuthSession } from '@/lib/auth'
import { toAuthUserResponse } from '@/lib/authUserResponse'
import { sendWelcomeEmail } from '@/lib/email'
import {
	recordFunnelEvent,
	stitchVisitorToUser,
	VISITOR_COOKIE,
} from '@/lib/analyticsStore'

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * A display name when the signup form did not ask for one.
 *
 * Signup only collects email + password now, so the local part of the address
 * is the best guess we have. It is a label in the UI, not an identity - the
 * student can set a real one later.
 */
function displayNameFromEmail(email) {
	const local = String(email).split('@')[0] || ''
	const cleaned = local.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim()
	if (cleaned.length < 2) return 'Student'
	return cleaned
		.split(/\s+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
		.slice(0, 60)
}

export async function POST(request) {
	try {
		const body = await request.json()
		const {
			email,
			password,
			name,
			phone,
			privacyAccepted,
		} = body

		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email and password are required.' },
				{ status: 400 }
			)
		}

		const normalizedEmail = String(email).trim().toLowerCase()
		if (!isValidEmail(normalizedEmail)) {
			return NextResponse.json(
				{ error: 'Enter a valid email address.' },
				{ status: 400 }
			)
		}

		if (String(password).length < 6) {
			return NextResponse.json(
				{ error: 'Password must be at least 6 characters.' },
				{ status: 400 }
			)
		}

		// Name is optional: the signup form no longer asks for one. Callers that
		// do send it (admin tooling, imports) still win over the derived label.
		const providedName = String(name || '').trim()
		const displayName =
			providedName.length >= 2 ? providedName : displayNameFromEmail(normalizedEmail)

		const usersCollection = await getCollection('users')
		// Memoised after the first call. This is what actually puts the unique
		// email index in place, so the race below fails at insert time.
		await ensureUserIndexes().catch((err) => {
			console.warn('[register] ensureUserIndexes:', err?.message || err)
		})
		const existingUser = await usersCollection.findOne({ email: normalizedEmail })
		if (existingUser) {
			return NextResponse.json(
				{ error: 'An account with this email already exists. Log in instead.' },
				{ status: 409 }
			)
		}

		const hashedPassword = await hashPassword(password)
		const cookieStore = await cookies()
		const referralId = cookieStore.get('referralId')?.value || null
		const now = new Date()

		const user = {
			email: normalizedEmail,
			password: hashedPassword,
			name: displayName,
			phone: phone ? String(phone).trim() : null,
			role: 'student',
			studentProfile: {
				regularSchedule: [],
				zoomLink: '',
				activeOnlineCourses: [],
				courseAccess: {},
				// Self-serve: ready to browse dashboard and pick a subscription.
				accountReady: true,
			},
			purchasedCourses: [],
			enrolledCourses: [],
			referralId,
			// Consent is clickwrap now - the signup button carries the notice
			// instead of a separate checkbox. Record when and how it was given,
			// because "they ticked a box" is no longer the evidence.
			legalAcceptedAt: now,
			legalAcceptedVia: privacyAccepted ? 'checkbox' : 'signup_button',
			createdAt: now,
			updatedAt: now,
		}

		let result
		try {
			result = await usersCollection.insertOne(user)
		} catch (insertError) {
			// Lost the race to a simultaneous signup with the same email.
			if (insertError?.code === 11000) {
				return NextResponse.json(
					{ error: 'An account with this email already exists. Log in instead.' },
					{ status: 409 }
				)
			}
			throw insertError
		}
		const userId = result.insertedId.toString()
		const token = await issueAuthSession(userId)

		// Funnel bookkeeping, recorded server-side so an ad blocker cannot make
		// signups disappear from the dashboard.
		//
		// Stitch first: it rewrites this person's anonymous page views onto the
		// new account, so the funnel counts them as one entity rather than an
		// anonymous visitor plus an unexplained extra signup.
		const visitorId = cookieStore.get(VISITOR_COOKIE)?.value || null
		await stitchVisitorToUser({ visitorId, userId })
		await recordFunnelEvent({
			step: 'sign_up',
			visitorId,
			userId,
			path: '/register',
			params: { method: 'password' },
			dedupeKey: `sign_up:${userId}`,
			occurredAt: now,
		})

		// Send welcome email asynchronously without blocking registration response
		sendWelcomeEmail({
			to: user.email,
			name: user.name,
		}).catch((err) => {
			console.error('[register] Welcome email dispatch failed:', err)
		})

		return NextResponse.json(
			{
				user: toAuthUserResponse({ ...user, _id: result.insertedId }),
				token,
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('Register error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
