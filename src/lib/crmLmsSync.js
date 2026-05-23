import { ObjectId } from 'mongodb'
import crypto from 'crypto'
import { getCollection } from '@/lib/mongodb'
import { hashPassword } from '@/lib/auth'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { robloxCurriculum } from '@/lib/robloxCurriculum'

export const LMS_COURSE_CATALOG = [
  { id: 'python-developer-zero-to-junior', name: 'Python' },
  { id: 'web-development', name: 'Веб-розробка' },
  { id: 'roblox-studio', name: 'Roblox Studio' },
  { id: 'unity-game-development', name: 'Unity' },
]

const CURRICULA = {
  'python-developer-zero-to-junior': pythonCurriculum,
  'web-development': webDevCurriculum,
  'roblox-studio': robloxCurriculum,
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

function defaultStudentProfile() {
  return {
    lessonFormat: 'group',
    regularSchedule: [],
    zoomLink: '',
    activeOnlineCourses: [],
    courseAccess: {},
    accountBalance: 0,
    lessonCredits: 0,
    scheduleSyncStartAt: null,
    crmTeacherId: '',
    crmTeacherName: '',
    crmStudentId: '',
    crmShortId: '',
    accountReady: false,
  }
}

function firstLessonIds(courseId, count = 1) {
  const curriculum = CURRICULA[courseId]
  if (!curriculum?.modules) return []
  const lessons = curriculum.modules.flatMap((m) => m.lessons || [])
  return lessons.slice(0, Math.max(1, count)).map((l) => l.lessonId)
}

export async function findUserByCrmStudentId(crmStudentId, usersCollection) {
  const coll = usersCollection || (await getCollection('users'))
  return coll.findOne({ 'studentProfile.crmStudentId': String(crmStudentId) })
}

export async function upsertUserFromCrm(payload) {
  const crmStudentId = String(payload.crmStudentId || '').trim()
  if (!crmStudentId) {
    throw new Error('crmStudentId is required')
  }

  const usersCollection = await getCollection('users')
  const explicitUserId = String(payload.smartcodeUserId || '').trim()
  const email = normalizeEmail(payload.email)
  const name = String(payload.fullName || payload.name || '').trim() || 'Учень SmartCode'
  const phone = payload.phone ? String(payload.phone).trim() : null

  let user = null
  let created = false

  if (explicitUserId && ObjectId.isValid(explicitUserId)) {
    user = await usersCollection.findOne({ _id: new ObjectId(explicitUserId) })
  }
  if (!user) {
    user = await findUserByCrmStudentId(crmStudentId, usersCollection)
  }
  if (!user && email) {
    user = await usersCollection.findOne({ email })
  }

  const profilePatch = {
    crmStudentId,
    crmShortId: String(payload.crmShortId || '').trim(),
    accountReady: true,
  }
  if (payload.parentContact) {
    profilePatch.parentContact = String(payload.parentContact).trim()
  }

  if (user) {
    const prev = user.studentProfile || defaultStudentProfile()
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          name: name || user.name,
          phone: phone ?? user.phone,
          studentProfile: { ...prev, ...profilePatch },
          updatedAt: new Date(),
        },
      }
    )
    user = await usersCollection.findOne({ _id: user._id })
  } else {
    if (!email) {
      return {
        userId: null,
        created: false,
        message: 'Потрібен email для створення акаунта LMS',
      }
    }
    const randomPassword = crypto.randomBytes(24).toString('hex')
    const hashedPassword = await hashPassword(randomPassword)
    const doc = {
      email,
      password: hashedPassword,
      name,
      phone,
      role: 'student',
      studentProfile: { ...defaultStudentProfile(), ...profilePatch },
      purchasedCourses: [],
      enrolledCourses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await usersCollection.insertOne(doc)
    created = true
    user = { ...doc, _id: result.insertedId }
  }

  return {
    userId: user._id.toString(),
    created,
    message: created ? 'Створено акаунт LMS' : 'Оновлено акаунт LMS',
  }
}

export async function grantCourseAccessForCrmStudent(crmStudentId, courseId, { enabled = true } = {}) {
  const catalogIds = LMS_COURSE_CATALOG.map((c) => c.id)
  if (!catalogIds.includes(courseId)) {
    throw new Error('Unknown courseId')
  }

  const usersCollection = await getCollection('users')
  let user = await findUserByCrmStudentId(crmStudentId, usersCollection)
  if (!user) {
    throw new Error('Користувача LMS не знайдено. Спочатку синхронізуйте учня з CRM')
  }

  const profile = { ...(user.studentProfile || defaultStudentProfile()) }
  const courseAccess = { ...(profile.courseAccess || {}) }
  const existing = courseAccess[courseId] || {}
  const unlocked = Array.isArray(existing.unlockedLessons)
    ? [...existing.unlockedLessons]
    : []
  if (enabled && unlocked.length === 0) {
    firstLessonIds(courseId, 1).forEach((id) => {
      if (!unlocked.includes(id)) unlocked.push(id)
    })
  }

  courseAccess[courseId] = {
    enabled: Boolean(enabled),
    unlockedLessons: enabled ? unlocked : [],
  }

  const activeOnline = new Set(profile.activeOnlineCourses || [])
  if (enabled) activeOnline.add(courseId)
  else activeOnline.delete(courseId)

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        'studentProfile.courseAccess': courseAccess,
        'studentProfile.activeOnlineCourses': [...activeOnline],
        'studentProfile.scheduleSyncStartAt': profile.scheduleSyncStartAt || new Date(),
        'studentProfile.accountReady': true,
        updatedAt: new Date(),
      },
      $addToSet: { enrolledCourses: courseId },
    }
  )

  return { userId: user._id.toString(), courseId, enabled }
}

export async function revokeCourseAccessForCrmStudent(crmStudentId, courseId) {
  return grantCourseAccessForCrmStudent(crmStudentId, courseId, { enabled: false })
}

export async function listCourseEnrollments(courseId) {
  const usersCollection = await getCollection('users')
  const users = await usersCollection
    .find(
      {
        role: { $ne: 'admin' },
        $or: [
          { 'studentProfile.activeOnlineCourses': courseId },
          { [`studentProfile.courseAccess.${courseId}.enabled`]: true },
        ],
      },
      {
        projection: {
          email: 1,
          name: 1,
          studentProfile: 1,
        },
      }
    )
    .limit(5000)
    .toArray()

  return users.map((user) => {
    const profile = user.studentProfile || {}
    const access = profile.courseAccess?.[courseId] || {}
    const unlocked = Array.isArray(access.unlockedLessons) ? access.unlockedLessons : []
    const hasAccess =
      (profile.activeOnlineCourses || []).includes(courseId) ||
      access.enabled === true ||
      unlocked.length > 0
    return {
      userId: user._id.toString(),
      crmStudentId: String(profile.crmStudentId || ''),
      email: user.email,
      name: user.name,
      hasAccess,
      accessEnabled: access.enabled !== false && hasAccess,
      unlockedLessonsCount: unlocked.length,
    }
  })
}
