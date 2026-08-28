import { ensureUserIndexes, getCollection } from '@/lib/mongodb'

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

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

function displayNameFromGoogle({ name, email }) {
	const fromGoogle = String(name || '').trim()
	if (fromGoogle.length >= 2) return fromGoogle.slice(0, 60)
	return displayNameFromEmail(email)
}

function defaultStudentProfile() {
	return {
		regularSchedule: [],
		zoomLink: '',
		activeOnlineCourses: [],
		courseAccess: {},
		accountReady: true,
	}
}

/**
 * Find, link, or create a SmartCode user from a verified Google profile.
 *
 * Linking rule: same email + `email_verified: true` from Google attaches
 * `googleId` to the existing account. Admin accounts are blocked.
 */
export async function resolveGoogleAuthUser({
	sub,
	email,
	emailVerified,
	name,
	referralId = null,
}) {
	const googleId = String(sub || '').trim()
	const normalizedEmail = String(email || '').trim().toLowerCase()

	if (!googleId) {
		throw new Error('google_profile')
	}
	if (!isValidEmail(normalizedEmail)) {
		throw new Error('google_profile')
	}
	if (!emailVerified) {
		throw new Error('google_email_unverified')
	}

	await ensureUserIndexes().catch((err) => {
		console.warn('[google-auth] ensureUserIndexes:', err?.message || err)
	})

	const usersCollection = await getCollection('users')
	const now = new Date()

	const byGoogleId = await usersCollection.findOne({ googleId })
	if (byGoogleId) {
		if (byGoogleId.role === 'admin') {
			throw new Error('google_admin_blocked')
		}
		return { user: byGoogleId, isNewUser: false }
	}

	const byEmail = await usersCollection.findOne({ email: normalizedEmail })
	if (byEmail) {
		if (byEmail.role === 'admin') {
			throw new Error('google_admin_blocked')
		}
		if (byEmail.googleId && byEmail.googleId !== googleId) {
			throw new Error('google_account_conflict')
		}

		if (!byEmail.googleId) {
			await usersCollection.updateOne(
				{ _id: byEmail._id },
				{
					$set: {
						googleId,
						updatedAt: now,
						...(String(byEmail.name || '').trim().length < 2
							? { name: displayNameFromGoogle({ name, email: normalizedEmail }) }
							: {}),
					},
				}
			)
		}

		const user = await usersCollection.findOne({ _id: byEmail._id })
		return { user, isNewUser: false }
	}

	const user = {
		email: normalizedEmail,
		googleId,
		password: null,
		name: displayNameFromGoogle({ name, email: normalizedEmail }),
		phone: null,
		role: 'student',
		studentProfile: defaultStudentProfile(),
		purchasedCourses: [],
		enrolledCourses: [],
		referralId,
		legalAcceptedAt: now,
		legalAcceptedVia: 'google_signup',
		createdAt: now,
		updatedAt: now,
	}

	let result
	try {
		result = await usersCollection.insertOne(user)
	} catch (insertError) {
		if (insertError?.code === 11000) {
			const raced = await usersCollection.findOne({
				$or: [{ googleId }, { email: normalizedEmail }],
			})
			if (raced) {
				return { user: raced, isNewUser: false }
			}
		}
		throw insertError
	}

	return {
		user: { ...user, _id: result.insertedId },
		isNewUser: true,
	}
}
