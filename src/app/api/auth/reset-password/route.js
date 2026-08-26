import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { hashPassword, issueAuthSession } from '@/lib/auth'
import { consumeLoginToken } from '@/lib/loginTokens'
import { toAuthUserResponse } from '@/lib/authUserResponse'

export async function POST(request) {
	try {
		const body = await request.json().catch(() => ({}))
		const { token, password } = body

		if (!token || typeof token !== 'string') {
			return NextResponse.json(
				{ error: 'Reset link is missing or invalid.' },
				{ status: 400 }
			)
		}

		if (!password || typeof password !== 'string' || password.length < 6) {
			return NextResponse.json(
				{ error: 'Password must be at least 6 characters long.' },
				{ status: 400 }
			)
		}

		const userId = await consumeLoginToken(token)
		if (!userId) {
			return NextResponse.json(
				{ error: 'This reset link has expired or has already been used. Please request a new one.' },
				{ status: 400 }
			)
		}

		const usersCollection = await getCollection('users')
		const userObjId = new ObjectId(userId)
		const user = await usersCollection.findOne({ _id: userObjId })

		if (!user) {
			return NextResponse.json(
				{ error: 'User account not found.' },
				{ status: 404 }
			)
		}

		const hashedPassword = await hashPassword(password)
		const now = new Date()

		await usersCollection.updateOne(
			{ _id: userObjId },
			{
				$set: {
					password: hashedPassword,
					updatedAt: now,
				},
			}
		)

		// Log the user in automatically upon successful password reset
		const sessionToken = await issueAuthSession(userId)

		return NextResponse.json(
			{
				ok: true,
				user: toAuthUserResponse({ ...user, password: hashedPassword, updatedAt: now }),
				token: sessionToken,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('[reset-password] Error:', error)
		return NextResponse.json(
			{ error: 'Could not reset your password. Please try again.' },
			{ status: 500 }
		)
	}
}
