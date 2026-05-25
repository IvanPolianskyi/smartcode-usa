import { getCollection } from '@/lib/mongodb'
const EN_DAY_TO_UA = {
  sun: 'Нд',
  mon: 'Пн',
  tue: 'Вт',
  wed: 'Ср',
  thu: 'Чт',
  fri: 'Пт',
  sat: 'Сб',
}

export async function grantFullCourseAccess(userId, courseId) {
  const usersCollection = await getCollection('users')
  await usersCollection.updateOne(
    { _id: userId },
    {
      $addToSet: {
        purchasedCourses: courseId,
        enrolledCourses: courseId,
      },
      $set: { updatedAt: new Date() },
    }
  )

  const progressCollection = await getCollection('userProgress')
  const existing = await progressCollection.findOne({ userId, courseId })
  if (!existing) {
    await progressCollection.insertOne({
      userId,
      courseId,
      enrolledAt: new Date(),
      completedLessons: [],
      completedQuizzes: {},
      completedPracticeTasks: [],
      currentModule: 0,
      currentLesson: 0,
      overallProgress: 0,
      certificates: [],
    })
  }
}

export async function grantEnLiveLessonAccess(userId, courseId, { lessonFormat, day, time }) {
  const usersCollection = await getCollection('users')
  const user = await usersCollection.findOne({ _id: userId })
  if (!user) return

  const profile = user.studentProfile || {}
  const schedule = Array.isArray(profile.regularSchedule) ? [...profile.regularSchedule] : []
  const dayUa = EN_DAY_TO_UA[day] || day
  const slot = { day: dayUa, time }
  const exists = schedule.some((s) => s.day === slot.day && s.time === slot.time)
  if (!exists) schedule.push(slot)

  const lessonCredits = (profile.lessonCredits || 0) + 1

  await usersCollection.updateOne(
    { _id: userId },
    {
      $set: {
        'studentProfile.regularSchedule': schedule,
        'studentProfile.lessonFormat': lessonFormat,
        'studentProfile.accountReady': true,
        'studentProfile.lessonCredits': lessonCredits,
        [`studentProfile.courseAccess.${courseId}`]: {
          enabled: true,
          fullAccess: false,
          unlockedLessons: [],
        },
        updatedAt: new Date(),
      },
      $addToSet: {
        'studentProfile.activeOnlineCourses': courseId,
        enrolledCourses: courseId,
      },
    }
  )

  const progressCollection = await getCollection('userProgress')
  const existing = await progressCollection.findOne({ userId, courseId })
  if (!existing) {
    await progressCollection.insertOne({
      userId,
      courseId,
      enrolledAt: new Date(),
      completedLessons: [],
      completedQuizzes: {},
      completedPracticeTasks: [],
      currentModule: 0,
      currentLesson: 0,
      overallProgress: 0,
      certificates: [],
    })
  }
}
