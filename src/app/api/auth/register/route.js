import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCollection } from '@/lib/mongodb'
import { hashPassword, issueAuthSession } from '@/lib/auth'
import { toAuthUserResponse } from '@/lib/authUserResponse'
import { sendWelcomeEmail } from '@/lib/email'

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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

		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: 'Name, email, and password are required.' },
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

		if (!privacyAccepted) {
			return NextResponse.json(
				{ error: 'Please confirm that you have read the Privacy Policy.' },
				{ status: 400 }
			)
		}

		if (String(password).length < 6) {
			return NextResponse.json(
				{ error: 'Password must be at least 6 characters.' },
				{ status: 400 }
			)
		}

		const displayName = String(name).trim()
		if (displayName.length < 2) {
			return NextResponse.json(
				{ error: 'Enter your name (at least 2 characters).' },
				{ status: 400 }
			)
		}

		const usersCollection = await getCollection('users')
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
			createdAt: now,
			updatedAt: now,
		}

		const result = await usersCollection.insertOne(user)
		const userId = result.insertedId.toString()
		const token = await issueAuthSession(userId)

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
