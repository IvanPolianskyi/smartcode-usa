import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { normalizeLoginIdentifier } from '@/lib/authLogin'
import { createLoginToken } from '@/lib/loginTokens'
import { sendPasswordResetEmail } from '@/lib/email'

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'

export async function POST(request) {
	try {
		const body = await request.json().catch(() => ({}))
		const { email } = body

		if (!email || typeof email !== 'string') {
			return NextResponse.json(
				{ error: 'Please enter your email address.' },
				{ status: 400 }
			)
		}

		const loginId = normalizeLoginIdentifier(email)
		if (!loginId.includes('@')) {
			return NextResponse.json(
				{ error: 'Please enter a valid email address.' },
				{ status: 400 }
			)
		}

		const usersCollection = await getCollection('users')
		const user = await usersCollection.findOne({ email: loginId })

		// To prevent account enumeration attacks, always respond with success
		if (user) {
			try {
				const { token } = await createLoginToken(user._id, {
					ttlMs: 60 * 60 * 1000, // 1 hour
					purpose: 'password_reset',
					revokePrevious: true,
				})

				const resetUrl = `${SITE_URL}/reset-password?token=${encodeURIComponent(token)}`
				await sendPasswordResetEmail({
					to: user.email,
					name: user.name,
					resetUrl,
				})
			} catch (emailErr) {
				console.error('[forgot-password] Email sending failed:', emailErr)
			}
		}

		return NextResponse.json(
			{
				ok: true,
				message:
					'If an account exists with that email, we have sent instructions to reset your password.',
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('[forgot-password] Error:', error)
		return NextResponse.json(
			{ error: 'An unexpected error occurred. Please try again.' },
			{ status: 500 }
		)
	}
}
