import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import {
  flattenCourseLessons,
  isKnownCourseId,
  isLessonInCourse,
} from '@/lib/courseLessonAccess'
import { KNOWN_TEACHER_COURSE_IDS } from '@/lib/crmLmsSync'
import { hashPassword } from '@/lib/auth'
import {
  allocateUniqueTeacherLogin,
  generateStudentPassword,
} from '@/lib/studentLmsLogin'
import {
  fetchTeacherCrmLessonStats,
  teacherStudentDisplayName,
} from '@/lib/crmTeacherStats'
import { isReliableStudentDisplayName } from '@/lib/crmLmsSync'

/**
 * Публічний код учня для вчителя (crmShortId).
 * Лише crmShortId — якщо немає, учень не показується в списку LMS.
 */
export function studentCodeFromProfile(profile) {
  return String(profile?.crmShortId || '').trim()
}

/** Імʼя учня для кабінету викладача — без email/телефону. */
export function displayNameForTeacher(user) {
  const name = String(user?.name || '').trim()
  if (name && isReliableStudentDisplayName(name)) return name
  const code = studentCodeFromProfile(user?.studentProfile)
  return teacherStudentDisplayName('', code)
}

/** Санітизований рядок учня для teacher API — імʼя без контактів. */
export function sanitizeStudentForTeacher(user, progressByCourse = {}, crmRow = null) {
  const code = studentCodeFromProfile(user?.studentProfile)
  if (!code) return null

  const online = user?.studentProfile?.activeOnlineCourses || []
  const purchased = user?.purchasedCourses || []
  const courseIds = [...new Set([...online, ...purchased])].filter((id) =>
    isKnownCourseId(id)
  )

  const progress = {}
  for (const courseId of courseIds) {
    const p = progressByCourse[courseId]
    const total = flattenCourseLessons(courseId).length || 1
    const done = (p?.completedLessons || []).length
    progress[courseId] = {
      completedCount: done,
      totalLessons: total,
      pct: Math.min(100, Math.round((done / total) * 100)),
      lastLessonId: p?.completedLessons?.[done - 1] || null,
    }
  }

  const lmsName = displayNameForTeacher(user)
  const name =
    lmsName && !lmsName.startsWith('Учень ·')
      ? lmsName
      : crmRow?.name || lmsName

  return {
    code,
    name,
    courseIds,
    progress,
    completedLessons: crmRow?.completedLessons ?? 0,
    recordedLessons: crmRow?.recordedLessons ?? 0,
    inLms: true,
  }
}

export async function findStudentByCodeForTeacher(code, teacherStaffId, { isAdmin = false } = {}) {
  const shortId = String(code || '').trim()
  if (!shortId) return null

  const usersCollection = await getCollection('users')
  const query = {
    role: { $ne: 'teacher' },
    'studentProfile.crmShortId': shortId,
  }
  if (!isAdmin) {
    if (!teacherStaffId) return null
    query['studentProfile.crmTeacherId'] = String(teacherStaffId)
  }

  return usersCollection.findOne(query)
}

export async function listTeacherStudents(teacherStaffId, { isAdmin = false } = {}) {
  const usersCollection = await getCollection('users')
  const progressCollection = await getCollection('userProgress')

  const query = {
    role: { $nin: ['teacher', 'admin'] },
    'studentProfile.crmShortId': { $exists: true, $nin: ['', null] },
  }
  if (!isAdmin) {
    if (!teacherStaffId) {
      return {
        students: [],
        teacherStats: {
          completed: 0,
          recorded: 0,
          currentBatchVideos: 0,
          currentBatchRecorded: 0,
          payableCount: 0,
          individualCount: 0,
          groupCount: 0,
          trialCount: 0,
          payoutUah: null,
          rateUah: null,
          groupRateUah: null,
          recordedWithVideo: 0,
          recordedTextOnly: 0,
          missingRecording: 0,
          individualCompleted: 0,
          trialCompleted: 0,
        },
        crmError: null,
      }
    }
    query['studentProfile.crmTeacherId'] = String(teacherStaffId)
  } else if (teacherStaffId) {
    query['studentProfile.crmTeacherId'] = String(teacherStaffId)
  }

  const students = await usersCollection.find(query).limit(500).toArray()
  const userIds = students.map((s) => s._id)
  const progressDocs = userIds.length
    ? await progressCollection.find({ userId: { $in: userIds } }).toArray()
    : []

  const progressMap = new Map()
  for (const doc of progressDocs) {
    const uid = doc.userId.toString()
    if (!progressMap.has(uid)) progressMap.set(uid, {})
    progressMap.get(uid)[doc.courseId] = doc
  }

  const crmStats = teacherStaffId
    ? await fetchTeacherCrmLessonStats(teacherStaffId)
    : {
        students: {},
        totals: {
          completed: 0,
          recorded: 0,
          currentBatchVideos: 0,
          currentBatchRecorded: 0,
          payableCount: 0,
          individualCount: 0,
          groupCount: 0,
          trialCount: 0,
          payoutUah: null,
          rateUah: null,
          groupRateUah: null,
          recordedWithVideo: 0,
          recordedTextOnly: 0,
          missingRecording: 0,
          individualCompleted: 0,
          trialCompleted: 0,
        },
      }

  const byCode = new Map()

  for (const student of students) {
    const code = studentCodeFromProfile(student.studentProfile)
    if (!code) continue
    const row = sanitizeStudentForTeacher(
      student,
      progressMap.get(student._id.toString()) || {},
      crmStats.students[code] || null
    )
    if (row) byCode.set(code, row)
  }

  for (const [code, crmRow] of Object.entries(crmStats.students || {})) {
    if (byCode.has(code)) continue
    byCode.set(code, {
      code,
      name: crmRow.name,
      courseIds: [],
      progress: {},
      completedLessons: crmRow.completedLessons ?? 0,
      recordedLessons: crmRow.recordedLessons ?? 0,
      inLms: false,
    })
  }

  const mergedStudents = [...byCode.values()].sort((a, b) =>
    String(a.name || a.code).localeCompare(String(b.name || b.code), 'uk')
  )

  return {
    students: mergedStudents,
    teacherStats: crmStats.totals,
    crmError: crmStats.crmError || null,
  }
}

export async function getStudentProgressDetail(student) {
  const progressCollection = await getCollection('userProgress')
  const docs = await progressCollection.find({ userId: student._id }).toArray()
  const byCourse = {}
  for (const doc of docs) {
    if (!isKnownCourseId(doc.courseId)) continue
    const total = flattenCourseLessons(doc.courseId).length
    byCourse[doc.courseId] = {
      completedLessons: doc.completedLessons || [],
      completedPracticeTasks: doc.completedPracticeTasks || [],
      completedQuizzes: Object.fromEntries(
        Object.entries(doc.completedQuizzes || {}).map(([lessonId, q]) => [
          lessonId,
          { score: q?.score ?? null },
        ])
      ),
      overallProgress: doc.overallProgress || 0,
      totalLessons: total,
    }
  }
  return byCourse
}

export async function mutateStudentProgress(student, { action, courseId, lessonId }) {
  if (!isKnownCourseId(courseId)) {
    throw new Error('Unknown courseId')
  }

  const usersCollection = await getCollection('users')
  const progressCollection = await getCollection('userProgress')
  const profile = student.studentProfile || {}
  const courseAccess = { ...(profile.courseAccess || {}) }
  const prevAccess = courseAccess[courseId] || {}
  const access = {
    enabled: true,
    fullAccess: Boolean(prevAccess.fullAccess),
    unlockedLessons: [...(prevAccess.unlockedLessons || [])],
  }

  if (action === 'unlockLesson') {
    if (!lessonId || !isLessonInCourse(courseId, lessonId)) {
      throw new Error('Invalid lessonId')
    }
    if (!access.unlockedLessons.includes(lessonId)) {
      access.unlockedLessons.push(lessonId)
    }
    access.enabled = true
    courseAccess[courseId] = access
    const active = new Set(profile.activeOnlineCourses || [])
    active.add(courseId)
    await usersCollection.updateOne(
      { _id: student._id },
      {
        $set: {
          'studentProfile.courseAccess': courseAccess,
          'studentProfile.activeOnlineCourses': [...active],
          updatedAt: new Date(),
        },
        $addToSet: { enrolledCourses: courseId },
      }
    )
    return { ok: true, action, courseId, lessonId }
  }

  let progress = await progressCollection.findOne({
    userId: student._id,
    courseId,
  })

  if (action === 'resetCourse') {
    if (progress) {
      await progressCollection.updateOne(
        { _id: progress._id },
        {
          $set: {
            completedLessons: [],
            completedPracticeTasks: [],
            completedQuizzes: {},
            overallProgress: 0,
            currentModule: 0,
            currentLesson: 0,
            updatedAt: new Date(),
          },
        }
      )
    }
    courseAccess[courseId] = {
      ...access,
      unlockedLessons: [],
      fullAccess: access.fullAccess,
    }
    await usersCollection.updateOne(
      { _id: student._id },
      {
        $set: {
          'studentProfile.courseAccess': courseAccess,
          updatedAt: new Date(),
        },
      }
    )
    return { ok: true, action, courseId }
  }

  if (action === 'resetLesson') {
    if (!lessonId || !isLessonInCourse(courseId, lessonId)) {
      throw new Error('Invalid lessonId')
    }
    if (progress) {
      const completedLessons = (progress.completedLessons || []).filter((id) => id !== lessonId)
      const completedPracticeTasks = (progress.completedPracticeTasks || []).filter(
        (id) => id !== lessonId
      )
      const completedQuizzes = { ...(progress.completedQuizzes || {}) }
      delete completedQuizzes[lessonId]
      const total = flattenCourseLessons(courseId).length || 1
      const overallProgress = Math.round((completedLessons.length / total) * 100)
      await progressCollection.updateOne(
        { _id: progress._id },
        {
          $set: {
            completedLessons,
            completedPracticeTasks,
            completedQuizzes,
            overallProgress,
            updatedAt: new Date(),
          },
        }
      )
    }
    access.unlockedLessons = access.unlockedLessons.filter((id) => id !== lessonId)
    courseAccess[courseId] = access
    await usersCollection.updateOne(
      { _id: student._id },
      {
        $set: {
          'studentProfile.courseAccess': courseAccess,
          updatedAt: new Date(),
        },
      }
    )
    return { ok: true, action, courseId, lessonId }
  }

  throw new Error('Unknown action')
}

function buildTeacherCourseAccess() {
  const courseAccess = {}
  for (const courseId of KNOWN_TEACHER_COURSE_IDS) {
    const lessonIds = flattenCourseLessons(courseId).map((l) => l.lessonId)
    courseAccess[courseId] = {
      enabled: true,
      fullAccess: true,
      unlockedLessons: lessonIds,
    }
  }
  return courseAccess
}

/**
 * Привʼязати / створити LMS-акаунт вчителя до CRM staff id.
 * @param {{
 *   email?: string,
 *   crmStaffId: string,
 *   crmStaffName?: string,
 *   name?: string,
 *   password?: string,
 *   adminId?: string,
 *   createIfMissing?: boolean,
 *   issueCredentials?: boolean,
 *   createLoginLink?: boolean,
 *   resetPassword?: boolean,
 * }} opts
 */
export async function linkTeacherAccount({
  email,
  crmStaffId,
  crmStaffName = '',
  name = '',
  password = '',
  adminId = '',
  createIfMissing = true,
  issueCredentials = false,
  createLoginLink = false,
  resetPassword = false,
}) {
  const staffId = String(crmStaffId || '').trim()
  if (!staffId) {
    throw new Error('crmStaffId is required')
  }

  const usersCollection = await getCollection('users')
  const displayName = String(name || crmStaffName || '').trim()
  let normalizedEmail = String(email || '').trim().toLowerCase()

  // Якщо email не передали — логін з імені @teachers.smartcode
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    normalizedEmail = await allocateUniqueTeacherLogin(usersCollection, {
      name: displayName,
      staffId,
    })
  }

  let user = await usersCollection.findOne({ email: normalizedEmail })
  // Якщо вже привʼязаний цей staff — беремо його акаунт (навіть з іншим email).
  if (!user) {
    user = await usersCollection.findOne({
      role: 'teacher',
      'teacherProfile.crmStaffId': staffId,
    })
  }

  let tempPassword = null
  let created = false
  const shouldIssuePassword = Boolean(
    issueCredentials || resetPassword || (password && String(password).trim())
  )
  const wantsMagicLink = Boolean(
    createLoginLink || issueCredentials || resetPassword
  )

  const teacherProfile = {
    crmStaffId: staffId,
    crmStaffName: String(crmStaffName || displayName || '').trim(),
    linkedAt: new Date(),
    linkedByAdminId: String(adminId || ''),
  }
  const courseAccess = buildTeacherCourseAccess()

  if (!user) {
    if (!createIfMissing) {
      throw new Error('User not found')
    }
    tempPassword =
      String(password || '').trim() || generateStudentPassword()
    const hashed = await hashPassword(tempPassword)
    const doc = {
      email: normalizedEmail,
      password: hashed,
      name: displayName || normalizedEmail.split('@')[0],
      phone: null,
      role: 'teacher',
      teacherProfile,
      studentProfile: {
        regularSchedule: [],
        zoomLink: '',
        activeOnlineCourses: [...KNOWN_TEACHER_COURSE_IDS],
        courseAccess,
        accountBalance: 0,
        lessonCredits: 0,
        accountReady: true,
      },
      purchasedCourses: [],
      enrolledCourses: [...KNOWN_TEACHER_COURSE_IDS],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await usersCollection.insertOne(doc)
    user = { ...doc, _id: result.insertedId }
    created = true
  } else {
    if (user.role === 'admin') {
      throw new Error('Cannot convert admin to teacher')
    }
    const setFields = {
      role: 'teacher',
      teacherProfile,
      'studentProfile.activeOnlineCourses': [...KNOWN_TEACHER_COURSE_IDS],
      'studentProfile.courseAccess': courseAccess,
      'studentProfile.accountReady': true,
      enrolledCourses: [
        ...new Set([...(user.enrolledCourses || []), ...KNOWN_TEACHER_COURSE_IDS]),
      ],
      updatedAt: new Date(),
      ...(displayName ? { name: displayName } : {}),
    }

    // Оновити email лише якщо порожній або @teachers.smartcode і новий інший.
    const currentEmail = String(user.email || '').trim().toLowerCase()
    if (
      normalizedEmail &&
      currentEmail !== normalizedEmail &&
      (!currentEmail || /@teachers\.smartcode$/i.test(currentEmail))
    ) {
      const clash = await usersCollection.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      })
      if (!clash) setFields.email = normalizedEmail
    }

    if (shouldIssuePassword) {
      tempPassword =
        String(password || '').trim() || generateStudentPassword()
      setFields.password = await hashPassword(tempPassword)
    }

    await usersCollection.updateOne({ _id: user._id }, { $set: setFields })
    user = await usersCollection.findOne({ _id: user._id })
  }

  let loginUrl = null
  let loginPath = null
  if (wantsMagicLink || created) {
    const { createLoginToken } = await import('@/lib/loginTokens')
    const link = await createLoginToken(user._id, {
      purpose: 'crm_teacher_issue',
      ttlMs: 60 * 60 * 1000,
      revokePrevious: true,
      redirectPath: '/teacher',
    })
    loginPath = link.loginPath
    const vercel =
      process.env.VERCEL_URL && !String(process.env.VERCEL_URL).includes('localhost')
        ? `https://${String(process.env.VERCEL_URL).replace(/^https?:\/\//, '')}`
        : ''
    const rawBase = String(
      process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        vercel ||
        'https://www.smartcode-academy.com'
    ).replace(/\/$/, '')
    const base = rawBase
      .replace(/^https?:\/\/smartcode-academy\.com$/i, 'https://www.smartcode-academy.com')
      .replace(
        /^https?:\/\/smartcode-academy\.com\//i,
        'https://www.smartcode-academy.com/'
      )
    loginUrl = `${base}${link.loginPath}`
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: 'teacher',
    teacherProfile: {
      crmStaffId: staffId,
      crmStaffName: teacherProfile.crmStaffName,
    },
    created,
    tempPassword,
    loginPath,
    loginUrl,
  }
}

export async function listLinkedTeachers() {
  const usersCollection = await getCollection('users')
  const teachers = await usersCollection
    .find({ role: 'teacher' })
    .project({
      email: 1,
      name: 1,
      teacherProfile: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .sort({ updatedAt: -1 })
    .limit(200)
    .toArray()

  return teachers.map((t) => ({
    id: t._id.toString(),
    email: t.email,
    name: t.name,
    crmStaffId: t.teacherProfile?.crmStaffId || '',
    crmStaffName: t.teacherProfile?.crmStaffName || '',
    linkedAt: t.teacherProfile?.linkedAt || null,
  }))
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Список викладачів LMS для CRM (привʼязки staff ↔ teacher). */
export async function listLmsTeachersForCrm({
  search = '',
  linkedOnly = false,
  unlinkedOnly = false,
  staffIds = '',
  userIds = '',
  skip = 0,
  limit = 40,
} = {}) {
  const usersCollection = await getCollection('users')
  const q = { role: 'teacher' }

  const idList = String(userIds || '')
    .split(',')
    .map((x) => x.trim())
    .filter((x) => ObjectId.isValid(x))
  if (idList.length > 0) {
    q._id = { $in: idList.map((id) => new ObjectId(id)) }
    skip = 0
    limit = Math.max(limit, idList.length)
  }

  const staffList = String(staffIds || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
  if (staffList.length > 0) {
    q['teacherProfile.crmStaffId'] = { $in: staffList }
  }

  if (unlinkedOnly) {
    q.$or = [
      { 'teacherProfile.crmStaffId': { $exists: false } },
      { 'teacherProfile.crmStaffId': null },
      { 'teacherProfile.crmStaffId': '' },
    ]
  } else if (linkedOnly) {
    q['teacherProfile.crmStaffId'] = { $exists: true, $nin: [null, ''] }
  }

  const term = String(search || '').trim()
  if (term) {
    const esc = escapeRegex(term)
    const searchClause = {
      $or: [
        { email: { $regex: esc, $options: 'i' } },
        { name: { $regex: esc, $options: 'i' } },
        { 'teacherProfile.crmStaffId': { $regex: esc, $options: 'i' } },
        { 'teacherProfile.crmStaffName': { $regex: esc, $options: 'i' } },
      ],
    }
    if (ObjectId.isValid(term)) {
      searchClause.$or.push({ _id: new ObjectId(term) })
    }
    if (q.$or) {
      q.$and = [{ $or: q.$or }, searchClause]
      delete q.$or
    } else {
      Object.assign(q, searchClause)
    }
  }

  const total = await usersCollection.countDocuments(q)
  const users = await usersCollection
    .find(q, {
      projection: {
        name: 1,
        email: 1,
        createdAt: 1,
        teacherProfile: 1,
      },
    })
    .sort({ name: 1, email: 1 })
    .skip(skip)
    .limit(limit)
    .toArray()

  return {
    total,
    teachers: users.map((user) => {
      const tp = user.teacherProfile || {}
      const crmStaffId = String(tp.crmStaffId || '').trim()
      return {
        id: user._id.toString(),
        name: user.name || '',
        email: user.email || '',
        crmStaffId: crmStaffId || null,
        crmStaffName: String(tp.crmStaffName || '').trim() || null,
        linkedAt: tp.linkedAt || null,
        createdAt: user.createdAt || null,
        linked: Boolean(crmStaffId),
      }
    }),
  }
}

export async function unlinkTeacherAccount(userId) {
  if (!ObjectId.isValid(userId)) throw new Error('Invalid userId')
  const usersCollection = await getCollection('users')
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!user || user.role !== 'teacher') throw new Error('Teacher not found')

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        role: 'student',
        teacherProfile: {
          crmStaffId: '',
          crmStaffName: '',
          linkedAt: null,
          linkedByAdminId: '',
        },
        'studentProfile.activeOnlineCourses': [],
        'studentProfile.courseAccess': {},
        updatedAt: new Date(),
      },
    }
  )
  return { ok: true, userId: user._id.toString() }
}

export async function unlinkTeacherByCrmStaffId(crmStaffId, { smartcodeUserId = '' } = {}) {
  const staffId = String(crmStaffId || '').trim()
  const usersCollection = await getCollection('users')
  let user = null

  const scUid = String(smartcodeUserId || '').trim()
  if (scUid && ObjectId.isValid(scUid)) {
    user = await usersCollection.findOne({ _id: new ObjectId(scUid), role: 'teacher' })
  }
  if (!user && staffId) {
    user = await usersCollection.findOne({
      role: 'teacher',
      'teacherProfile.crmStaffId': staffId,
    })
  }
  if (!user) {
    throw new Error('Teacher LMS account not found for this CRM staff')
  }
  return unlinkTeacherAccount(user._id.toString())
}
