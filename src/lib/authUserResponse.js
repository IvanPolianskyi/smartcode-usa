/** Client-facing shape for /api/auth/* responses (no CRM-internal fields). */

const DEFAULT_LMS_STUDENT_NAME = 'Student'

const CRM_TRIAL_PLACEHOLDER_NAME = 'Trial Student'

const CRM_INTERNAL_PROFILE_KEYS = [
  'crmStudentId',
  'crmShortId',
  'crmTeacherId',
  'crmTeacherName',
  'crmScheduleSyncedAt',
  'parentContact',
  'notes',
]

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

const KNOWN_TEACHER_COURSE_IDS = [
  'python-developer-zero-to-junior',
  'roblox-studio',
  'ai-at-work',
]

function isPlaceholderStudentName(name) {
  const value = String(name || '').trim()
  return (
    !value ||
    value === DEFAULT_LMS_STUDENT_NAME ||
    value === CRM_TRIAL_PLACEHOLDER_NAME
  )
}

function isCalendarEventStyleName(name) {
  const value = String(name || '').trim()
  if (!value) return false
  if (value.includes(' · ')) return true
  if (/^(ПУ|ІУ|ГУ)\b/.test(value)) return true
  if (/^Вільні години/i.test(value)) return true
  return false
}

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
    subscribedCourseIds: user?.subscribedCourseIds || [],
    subscriptionActive: Boolean(user?.subscriptionActive),
    courseDripStartedAt: user?.courseDripStartedAt || {},
    courseModuleAccess: user?.courseModuleAccess || {},
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
      name:
        String(user?.name || '').trim() ||
        String(user?.email || '').split('@')[0] ||
        'Teacher',
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
