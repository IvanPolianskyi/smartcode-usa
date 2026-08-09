import { ObjectId } from 'mongodb'
import { ensureUserIndexes, getCollection } from '@/lib/mongodb'
import { hashPassword } from '@/lib/auth'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { robloxCurriculum } from '@/lib/robloxCurriculum'
import { scratchCurriculum } from '@/lib/scratchCurriculum'
import { minecraftCurriculum } from '@/lib/minecraftCurriculum'
import { flattenCourseLessons } from '@/lib/courseLessonAccess'
import {
  allocateUniqueStudentLogin,
  generateStudentPassword,
  isSyntheticScLogin,
  loginLocalFromName,
  studentLoginFromName,
  syntheticStudentLogin,
} from '@/lib/studentLmsLogin'

export const LMS_COURSE_CATALOG = [
  { id: 'python-developer-zero-to-junior', name: 'Python' },
  { id: 'web-development', name: 'Створення сайтів' },
  { id: 'roblox-studio', name: 'Roblox Studio' },
  { id: 'unity-game-development', name: 'Unity' },
  { id: 'scratch', name: 'Scratch' },
  { id: 'minecraft-education', name: 'Minecraft Education' },
]

const CURRICULA = {
  'python-developer-zero-to-junior': pythonCurriculum,
  'web-development': webDevCurriculum,
  'roblox-studio': robloxCurriculum,
  scratch: scratchCurriculum,
  'minecraft-education': minecraftCurriculum,
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

function defaultStudentProfile() {
  return {
    regularSchedule: [],
    upcomingLessons: [],
    conductedLessonsCount: 0,
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

/**
 * Знайти LMS-учня для відкриття курсу з CRM (вже привʼязаний crmStudentId або smartcode_user_id).
 * Якщо знайдено за ObjectId сайту — дописує crmStudentId у профіль.
 */
export async function findUserForCrmGrant(
  crmStudentId,
  { smartcodeUserId = '', email = '' } = {},
  usersCollection
) {
  const coll = usersCollection || (await getCollection('users'))
  const crmId = String(crmStudentId || '').trim()

  if (crmId) {
    const byCrm = await findUserByCrmStudentId(crmId, coll)
    if (byCrm) return byCrm
  }

  const scUid = String(smartcodeUserId || '').trim()
  if (scUid && ObjectId.isValid(scUid)) {
    const bySite = await coll.findOne({ _id: new ObjectId(scUid) })
    if (bySite) {
      if (crmId && String(bySite.studentProfile?.crmStudentId || '') !== crmId) {
        const prev = bySite.studentProfile || defaultStudentProfile()
        await coll.updateOne(
          { _id: bySite._id },
          {
            $set: {
              studentProfile: { ...prev, crmStudentId: crmId, accountReady: true },
              updatedAt: new Date(),
            },
          }
        )
        return coll.findOne({ _id: bySite._id })
      }
      return bySite
    }
  }

  return null
}

async function ensureCourseProgressRecord(userObjectId, courseId) {
  const progressCollection = await getCollection('userProgress')
  const existing = await progressCollection.findOne({
    userId: userObjectId,
    courseId,
  })
  if (existing) return
  await progressCollection.insertOne({
    userId: userObjectId,
    courseId,
    enrolledAt: new Date(),
    completedLessons: [],
    completedQuizzes: {},
    completedPracticeTasks: {},
    currentModule: 0,
    currentLesson: 0,
    overallProgress: 0,
    certificates: [],
  })
}

/** Placeholder when CRM/LMS has no display name yet — must not overwrite a real name on sync. */
export const DEFAULT_LMS_STUDENT_NAME = 'Учень SmartCode'

/** CRM default for trial lessons without a real name (see lessons.py). */
export const CRM_TRIAL_PLACEHOLDER_NAME = 'Пробний урок'

export function isPlaceholderStudentName(name) {
  const value = String(name || '').trim()
  return (
    !value ||
    value === DEFAULT_LMS_STUDENT_NAME ||
    value === CRM_TRIAL_PLACEHOLDER_NAME
  )
}

/** Назва як у Google Calendar (ПУ · код · …), не справжнє імʼя. */
export function isCalendarEventStyleName(name) {
  const value = String(name || '').trim()
  if (!value) return false
  if (value.includes(' · ')) return true
  if (/^(ПУ|ІУ|ГУ)\b/.test(value)) return true
  if (/^Вільні години/i.test(value)) return true
  return false
}

export function isReliableStudentDisplayName(name) {
  return !isPlaceholderStudentName(name) && !isCalendarEventStyleName(name)
}

/** Поля профілю лише для синхронізації з CRM — не віддавати учню в API. */
const CRM_INTERNAL_PROFILE_KEYS = [
  'crmStudentId',
  'crmShortId',
  'crmTeacherId',
  'crmTeacherName',
  'crmScheduleSyncedAt',
  'parentContact',
  'notes',
]

/** Імʼя для UI учня: ніколи не показувати назви з календаря/CRM. */
export function displayNameForStudent(user) {
  const name = String(user?.name || '').trim()
  if (name && !isPlaceholderStudentName(name) && !isCalendarEventStyleName(name)) {
    return name
  }
  const local = String(user?.email || '').split('@')[0]?.trim()
  return local || DEFAULT_LMS_STUDENT_NAME
}

export function studentProfileForClient(profile) {
  const src = profile && typeof profile === 'object' ? profile : {}
  const out = { ...src }
  for (const key of CRM_INTERNAL_PROFILE_KEYS) {
    delete out[key]
  }
  return out
}

const DEFAULT_CLIENT_STUDENT_PROFILE = {
  regularSchedule: [],
  upcomingLessons: [],
  conductedLessonsCount: 0,
  zoomLink: '',
  activeOnlineCourses: [],
  courseAccess: {},
  accountBalance: 0,
  lessonCredits: 0,
  scheduleSyncStartAt: null,
  accountReady: false,
}

/** Курси, які відкриваємо викладачу при привʼязці. */
export const KNOWN_TEACHER_COURSE_IDS = LMS_COURSE_CATALOG.filter((c) =>
  [
    'python-developer-zero-to-junior',
    'web-development',
    'roblox-studio',
    'scratch',
    'minecraft-education',
  ].includes(c.id)
).map((c) => c.id)

/** Відповідь /api/auth/* для клієнта: без CRM-імʼі та внутрішніх полів профілю. */
export function toAuthUserResponse(user) {
  const role = user?.role || 'user'
  const profile = user?.studentProfile || DEFAULT_CLIENT_STUDENT_PROFILE
  const base = {
    id: user?._id?.toString?.() || String(user?.id || ''),
    email: user?.email,
    phone: user?.phone ?? null,
    role,
    purchasedCourses: user?.purchasedCourses || [],
    enrolledCourses: user?.enrolledCourses || [],
    createdAt: user?.createdAt ?? null,
    referralId: user?.referralId ?? null,
  }
  if (role === 'admin') {
    return { ...base, name: user?.name, studentProfile: profile }
  }
  if (role === 'teacher') {
    const tp = user?.teacherProfile || {}
    return {
      ...base,
      name: String(user?.name || '').trim() || String(user?.email || '').split('@')[0] || 'Teacher',
      phone: null,
      teacherProfile: {
        crmStaffId: String(tp.crmStaffId || '').trim(),
        crmStaffName: String(tp.crmStaffName || '').trim(),
      },
      studentProfile: {
        activeOnlineCourses: [...KNOWN_TEACHER_COURSE_IDS],
        courseAccess: {},
        accountReady: true,
      },
    }
  }
  return {
    ...base,
    name: displayNameForStudent(user),
    studentProfile: studentProfileForClient(profile),
  }
}

async function applyTelegramFields(usersCollection, setFields, payload, excludeUserId) {
  const tgUid = String(payload.telegramUserId || payload.telegram_user_id || '').trim()
  const tgChat = String(payload.telegramChatId || payload.telegram_chat_id || '').trim()
  const tgUser = String(payload.telegramUsername || payload.telegram_username || '').trim()
  if (!tgUid) return { ok: true }
  const query = { telegramUserId: tgUid }
  if (excludeUserId) {
    query._id = { $ne: excludeUserId }
  }
  const other = await usersCollection.findOne(query, { projection: { _id: 1 } })
  if (other) {
    return {
      ok: false,
      message:
        'Цей Telegram уже привʼязаний до іншого акаунта LMS. Відвʼяжіть його спочатку.',
    }
  }
  setFields.telegramUserId = tgUid
  if (tgChat) setFields.telegramChatId = tgChat
  if (tgUser) setFields.telegramUsername = tgUser
  return { ok: true }
}

export async function upsertUserFromCrm(payload) {
  const crmStudentId = String(payload.crmStudentId || '').trim()
  if (!crmStudentId) {
    throw new Error('crmStudentId is required')
  }

  await ensureUserIndexes()
  const usersCollection = await getCollection('users')
  const explicitUserId = String(payload.smartcodeUserId || '').trim()
  const shortId = String(payload.crmShortId || '').trim().toLowerCase()
  const displayNameForLogin = String(payload.name || '').trim()
  let email = normalizeEmail(payload.email)
  // Особистий email лишаємо; sc-* / порожній → логін з імені.
  if (!email || isSyntheticScLogin(email)) {
    email = await allocateUniqueStudentLogin(usersCollection, {
      name: displayNameForLogin,
      shortId,
      preferredEmail: email && !isSyntheticScLogin(email) ? email : '',
    })
  }
  const phone = payload.phone ? String(payload.phone).trim() : null
  // Create magic link without rotating password (Telegram «відкрити LMS»).
  const createLoginLinkOnly = Boolean(payload.createLoginLink) && !payload.issueCredentials && !payload.resetPassword
  const issueCredentials = Boolean(payload.issueCredentials || payload.resetPassword)
  // Ігноруємо client-supplied password — тільки серверна генерація.
  const requestedPassword = ''

  let user = null
  let created = false
  let tempPassword = null

  const rejectPrivileged = (doc) => {
    const role = String(doc?.role || 'student')
    if (role === 'admin' || role === 'teacher') {
      return {
        userId: null,
        created: false,
        message:
          'Не можна привʼязати акаунт викладача/адміна як учня. Оберіть інший акаунт на сторінці «Звʼязки».',
      }
    }
    return null
  }

  if (explicitUserId && ObjectId.isValid(explicitUserId)) {
    user = await usersCollection.findOne({ _id: new ObjectId(explicitUserId) })
    if (user) {
      const blocked = rejectPrivileged(user)
      if (blocked) return blocked
    }
  }
  if (!user) {
    user = await findUserByCrmStudentId(crmStudentId, usersCollection)
    if (user) {
      const blocked = rejectPrivileged(user)
      if (blocked) return blocked
    }
  }

  const profilePatch = {
    crmStudentId,
    crmShortId: shortId,
    accountReady: true,
  }
  if (payload.parentContact) {
    profilePatch.parentContact = String(payload.parentContact).trim()
  }
  const primaryCourseId = String(payload.primaryCourseId || payload.primary_course_id || '').trim()
  if (primaryCourseId) {
    profilePatch.primaryCourseId = primaryCourseId
  }

  if (user) {
    const prev = user.studentProfile || defaultStudentProfile()
    const setFields = {
      phone: phone ?? user.phone,
      studentProfile: { ...prev, ...profilePatch },
      updatedAt: new Date(),
    }
    // Не перетираємо особистий email; sc-* / порожній — оновлюємо на логін з імені.
    const currentEmail = normalizeEmail(user.email)
    if (
      email &&
      (!currentEmail || isSyntheticScLogin(currentEmail) || currentEmail !== email)
    ) {
      if (!currentEmail || isSyntheticScLogin(currentEmail)) {
        const nextLogin = await allocateUniqueStudentLogin(usersCollection, {
          name: displayNameForLogin,
          shortId,
          preferredEmail: email,
          excludeUserId: user._id,
        })
        if (nextLogin) setFields.email = nextLogin
        email = nextLogin || email
      }
    }
    const tgApply = await applyTelegramFields(
      usersCollection,
      setFields,
      payload,
      user._id
    )
    if (!tgApply.ok) {
      // Не валимо весь upsert — профіль/email оновлюємо, Telegram пропускаємо.
      console.warn('upsertUserFromCrm telegram skip:', tgApply.message)
    }

    // Пароль: reset лише за issueCredentials; якщо пароля немає — один раз при login-link.
    if (issueCredentials || (!user.password && createLoginLinkOnly)) {
      tempPassword = requestedPassword || generateStudentPassword()
      setFields.password = await hashPassword(tempPassword)
    }

    await usersCollection.updateOne({ _id: user._id }, { $set: setFields })
    user = await usersCollection.findOne({ _id: user._id })
  } else {
    if (!email) {
      return {
        userId: null,
        created: false,
        message:
          'Потрібен email або код учня (short_id) для створення акаунта LMS',
      }
    }
    const existingByEmail = await usersCollection.findOne({ email })
    if (existingByEmail) {
      const blocked = rejectPrivileged(existingByEmail)
      if (blocked) return blocked

      // Claim by email when already linked to this CRM student.
      // Синтетичний sc-{shortId}@… без crmStudentId — теж можна привʼязати автоматично.
      const existingCrm = String(
        existingByEmail.studentProfile?.crmStudentId || ''
      ).trim()
      const claimExistingAccount = async () => {
        user = existingByEmail
        const prev = user.studentProfile || defaultStudentProfile()
        const setFields = {
          phone: phone ?? user.phone,
          studentProfile: { ...prev, ...profilePatch },
          updatedAt: new Date(),
        }
        if (issueCredentials || (!user.password && createLoginLinkOnly)) {
          tempPassword = requestedPassword || generateStudentPassword()
          setFields.password = await hashPassword(tempPassword)
        }
        await usersCollection.updateOne({ _id: user._id }, { $set: setFields })
        user = await usersCollection.findOne({ _id: user._id })
      }

      if (existingCrm === crmStudentId) {
        await claimExistingAccount()
      } else if (existingCrm) {
        // Логін зайнятий іншим учнем — не блокуємо: беремо інший вільний логін
        // і створюємо новий акаунт нижче.
        email = await allocateUniqueStudentLogin(usersCollection, {
          name: displayNameForLogin,
          shortId,
        })
      } else {
        const local = loginLocalFromName(displayNameForLogin, shortId)
        const ownLogins = new Set(
          [
            studentLoginFromName(displayNameForLogin, shortId),
            shortId ? `student.${shortId}@students.smartcode` : '',
            shortId ? syntheticStudentLogin(shortId) : '',
            local && shortId ? `${local}.${shortId}@students.smartcode` : '',
          ].filter(Boolean)
        )
        if (ownLogins.has(email)) {
          await claimExistingAccount()
        } else {
          // Чужий логін без привʼязки CRM — теж просто беремо інший вільний.
          email = await allocateUniqueStudentLogin(usersCollection, {
            name: displayNameForLogin,
            shortId,
          })
        }
      }
    }

    if (!user) {
      tempPassword = requestedPassword || generateStudentPassword()
      const hashedPassword = await hashPassword(tempPassword)
      const displayName = String(payload.name || '').trim()
      const doc = {
        email,
        password: hashedPassword,
        name: isReliableStudentDisplayName(displayName)
          ? displayName
          : DEFAULT_LMS_STUDENT_NAME,
        phone,
        role: 'student',
        studentProfile: { ...defaultStudentProfile(), ...profilePatch },
        purchasedCourses: [],
        enrolledCourses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const tgApply = await applyTelegramFields(usersCollection, doc, payload, null)
      if (!tgApply.ok) {
        return {
          userId: null,
          created: false,
          message: tgApply.message,
        }
      }
      try {
        const result = await usersCollection.insertOne(doc)
        created = true
        user = { ...doc, _id: result.insertedId }
      } catch (e) {
        if (e?.code === 11000) {
          return {
            userId: null,
            created: false,
            message:
              'Конфлікт унікальності (email / Telegram / CRM id). Привʼяжіть вручну на «Звʼязки».',
          }
        }
        throw e
      }
    }
  }

  let loginUrl = null
  let loginPath = null
  const wantsMagicLink =
    issueCredentials || created || createLoginLinkOnly || Boolean(payload.createLoginLink)
  if (wantsMagicLink) {
    try {
      const { createLoginToken } = await import('@/lib/loginTokens')
      const primary =
        primaryCourseId ||
        String(user?.studentProfile?.primaryCourseId || '').trim()
      const redirectPath = primary ? `/courses/${primary}` : ''
      const link = await createLoginToken(user._id, {
        purpose: 'crm_issue',
        ttlMs: 60 * 60 * 1000,
        revokePrevious: true,
        redirectPath,
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
      // Канонічний хост з www (apex редіректить і може зʼїсти query на CDN).
      const base = rawBase
        .replace(/^https?:\/\/smartcode-academy\.com$/i, 'https://www.smartcode-academy.com')
        .replace(
          /^https?:\/\/smartcode-academy\.com\//i,
          'https://www.smartcode-academy.com/'
        )
      if (!base || !/^https?:\/\//i.test(base)) {
        throw new Error('LMS public base URL is not configured')
      }
      if (!String(link.loginPath || '').includes('token=')) {
        throw new Error('createLoginToken returned path without token')
      }
      loginUrl = `${base}${link.loginPath}`
    } catch (e) {
      console.error('createLoginToken failed', e)
      // Для Telegram/CRM magic-login без token= — помилка, а не голий /login.
      if (createLoginLinkOnly || payload.createLoginLink || issueCredentials) {
        throw new Error(
          `Не вдалося створити посилання для входу: ${String(e?.message || e)}`
        )
      }
      const fallbackBase = String(
        process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.NEXT_PUBLIC_BASE_URL ||
          'https://www.smartcode-academy.com'
      )
        .replace(/\/$/, '')
        .replace(
          /^https?:\/\/smartcode-academy\.com$/i,
          'https://www.smartcode-academy.com'
        )
      loginPath = '/login'
      loginUrl = `${fallbackBase}/login`
    }
  }

  // Повертаємо plaintext лише якщо пароль згенеровано в цьому запиті (1 раз / reset).
  const passwordOut = tempPassword || null
  const login =
    String(user?.email || '').trim() ||
    email ||
    (shortId ? syntheticStudentLogin(shortId) : '')

  // Напрям навчання з CRM — одразу відкрити доступ до курсу на LMS.
  const grantPrimary =
    primaryCourseId || String(user?.studentProfile?.primaryCourseId || '').trim()
  if (grantPrimary && user?._id) {
    try {
      await grantCourseAccessForCrmStudent(crmStudentId, grantPrimary, {
        enabled: true,
        smartcodeUserId: user._id.toString(),
        email: login || email,
      })
    } catch (e) {
      console.warn('upsertUserFromCrm primary course grant skipped:', e?.message || e)
    }
  }

  return {
    userId: user._id.toString(),
    created,
    login,
    email: login,
    tempPassword: passwordOut,
    loginPath,
    loginUrl,
    message: created
      ? 'Створено акаунт LMS'
      : passwordOut
        ? 'Оновлено пароль LMS'
        : createLoginLinkOnly
          ? 'Посилання для входу створено'
          : 'Оновлено акаунт LMS',
  }
}

export {
  generateStudentPassword,
  studentLoginFromName,
  syntheticStudentLogin,
}

export async function grantCourseAccessForCrmStudent(
  crmStudentId,
  courseId,
  { enabled = true, smartcodeUserId = '', email = '' } = {}
) {
  const catalogIds = LMS_COURSE_CATALOG.map((c) => c.id)
  if (!catalogIds.includes(courseId)) {
    throw new Error('Unknown courseId')
  }

  const usersCollection = await getCollection('users')
  const user = await findUserForCrmGrant(
    crmStudentId,
    { smartcodeUserId, email },
    usersCollection
  )
  if (!user) {
    throw new Error(
      'Користувача SmartCode не знайдено. Спочатку привʼяжіть акаунт на сторінці «Звʼязки» або додайте email учню в CRM.'
    )
  }

  const profile = { ...(user.studentProfile || defaultStudentProfile()) }
  const courseAccess = { ...(profile.courseAccess || {}) }
  const lessonIds = flattenCourseLessons(courseId).map((l) => l.lessonId)
  courseAccess[courseId] = {
    enabled: Boolean(enabled),
    fullAccess: Boolean(enabled),
    unlockedLessons: enabled ? lessonIds : [],
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
      ...(enabled
        ? { $addToSet: { enrolledCourses: courseId } }
        : { $pull: { enrolledCourses: courseId } }),
    }
  )

  if (enabled) {
    await ensureCourseProgressRecord(user._id, courseId)
  }

  return { userId: user._id.toString(), courseId, enabled }
}

export async function revokeCourseAccessForCrmStudent(crmStudentId, courseId) {
  return grantCourseAccessForCrmStudent(crmStudentId, courseId, { enabled: false })
}

/**
 * Відвʼязати LMS-акаунт від CRM: скинути CRM-поля, доступ до курсів і весь прогрес.
 */
export async function unlinkUserFromCrm({ crmStudentId = '', smartcodeUserId = '' } = {}) {
  const crmId = String(crmStudentId || '').trim()
  const explicitUserId = String(smartcodeUserId || '').trim()
  if (!crmId && !explicitUserId) {
    throw new Error('crmStudentId або smartcodeUserId обовʼязковий')
  }

  const usersCollection = await getCollection('users')
  let user = null
  if (crmId) {
    user = await findUserByCrmStudentId(crmId, usersCollection)
  }
  if (!user && explicitUserId && ObjectId.isValid(explicitUserId)) {
    user = await usersCollection.findOne({ _id: new ObjectId(explicitUserId) })
  }
  if (!user) {
    throw new Error('Користувача LMS не знайдено')
  }

  const userObjectId = user._id
  const progressCollection = await getCollection('userProgress')
  const progressResult = await progressCollection.deleteMany({ userId: userObjectId })

  const catalogIds = new Set(LMS_COURSE_CATALOG.map((c) => c.id))
  const prev = user.studentProfile || defaultStudentProfile()
  const resetProfile = defaultStudentProfile()
  if (prev.parentContact) {
    resetProfile.parentContact = prev.parentContact
  }

  const enrolled = Array.isArray(user.enrolledCourses) ? user.enrolledCourses : []
  const purchased = Array.isArray(user.purchasedCourses) ? user.purchasedCourses : []
  const nextEnrolled = enrolled.filter((id) => !catalogIds.has(id))
  const nextPurchased = purchased.filter((id) => !catalogIds.has(id))

  await usersCollection.updateOne(
    { _id: userObjectId },
    {
      $set: {
        studentProfile: resetProfile,
        enrolledCourses: nextEnrolled,
        purchasedCourses: nextPurchased,
        updatedAt: new Date(),
      },
    }
  )

  return {
    userId: userObjectId.toString(),
    progressDocumentsRemoved: progressResult.deletedCount || 0,
    message: 'Відвʼязано від CRM: прогрес і доступ до курсів скинуто',
  }
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Список учнів LMS для CRM (привʼязки). linkedOnly / unlinkedOnly — взаємовиключні фільтри.
 */
export async function listLmsStudentsForCrm({
  search = '',
  linkedOnly = false,
  unlinkedOnly = false,
  userIds = '',
  skip = 0,
  limit = 40,
} = {}) {
  const usersCollection = await getCollection('users')
  const q = { role: { $ne: 'admin' } }

  const idList = String(userIds || '')
    .split(',')
    .map((x) => x.trim())
    .filter((x) => ObjectId.isValid(x))
  if (idList.length > 0) {
    q._id = { $in: idList.map((id) => new ObjectId(id)) }
    skip = 0
    limit = Math.max(limit, idList.length)
  }

  if (unlinkedOnly) {
    q.$or = [
      { 'studentProfile.crmStudentId': { $exists: false } },
      { 'studentProfile.crmStudentId': null },
      { 'studentProfile.crmStudentId': '' },
    ]
  } else if (linkedOnly) {
    q['studentProfile.crmStudentId'] = { $exists: true, $nin: [null, ''] }
  }

  const term = String(search || '').trim()
  if (term) {
    const tokens = term.split(/\s+/).filter(Boolean)
    const tokenClause = (token) => {
      const esc = escapeRegex(token)
      const searchOr = [
        { email: { $regex: esc, $options: 'i' } },
        { name: { $regex: esc, $options: 'i' } },
        { phone: { $regex: esc, $options: 'i' } },
        { 'studentProfile.crmShortId': { $regex: esc, $options: 'i' } },
      ]
      if (ObjectId.isValid(token)) {
        searchOr.push({ _id: new ObjectId(token) })
      }
      return { $or: searchOr }
    }
    const searchClause =
      tokens.length <= 1
        ? tokenClause(tokens[0] || term)
        : { $and: tokens.map((token) => tokenClause(token)) }
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
        phone: 1,
        createdAt: 1,
        studentProfile: 1,
      },
    })
    .sort({ name: 1, email: 1 })
    .skip(skip)
    .limit(limit)
    .toArray()

  const students = users.map((user) => {
    const profile = user.studentProfile || {}
    const crmId = String(profile.crmStudentId || '').trim()
    return {
      userId: user._id.toString(),
      name: String(user.name || '').trim() || 'Без імені',
      email: user.email || null,
      phone: user.phone || null,
      crmStudentId: crmId || null,
      crmShortId: String(profile.crmShortId || '').trim() || null,
      linked: Boolean(crmId),
      createdAt: user.createdAt || null,
    }
  })

  return { students, total, skip, limit, lmsConfigured: true }
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
