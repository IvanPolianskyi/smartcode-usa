import { ObjectId } from 'mongodb'
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
  const userObjectId =
    userId instanceof ObjectId ? userId : new ObjectId(String(userId))
  const usersCollection = await getCollection('users')
  await usersCollection.updateOne(
    { _id: userObjectId },
    {
      $addToSet: {
        purchasedCourses: courseId,
        enrolledCourses: courseId,
      },
      $set: { updatedAt: new Date() },
    }
  )

  const progressCollection = await getCollection('userProgress')
  const existing = await progressCollection.findOne({ userId: userObjectId, courseId })
  if (!existing) {
    await progressCollection.insertOne({
      userId: userObjectId,
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

export async function grantEnLiveLessonAccess(identifier, courseId, { lessonFormat, day, time }) {
  const usersCollection = await getCollection('users')
  
  // Identifier could be an ObjectId (string or actual) or an email
  let userQuery
  if (identifier && typeof identifier === 'string' && identifier.includes('@')) {
    userQuery = { email: identifier }
  } else {
    try {
      userQuery = { _id: typeof identifier === 'string' ? new ObjectId(identifier) : identifier }
    } catch (e) {
      userQuery = { _id: identifier }
    }
  }

  const user = await usersCollection.findOne(userQuery)
  
  // We still book the exact slot even if the user hasn't registered yet
  const slotsCollection = await getCollection('availableSlots')
  const dayRegex = new RegExp(`^${day}$`, 'i')
  const matchedSlot = await slotsCollection.findOneAndUpdate(
    { courseId, day: dayRegex, time, isBooked: false },
    { $set: { isBooked: true, bookedBy: user ? user._id : identifier, updatedAt: new Date() } }
  )

  if (!user) return // If they are a guest who hasn't registered, we just booked the slot for them.


  const profile = user.studentProfile || {}
  const schedule = Array.isArray(profile.regularSchedule) ? [...profile.regularSchedule] : []
  const dayUa = EN_DAY_TO_UA[day] || day
  const slot = { day: dayUa, time }
  const exists = schedule.some((s) => s.day === slot.day && s.time === slot.time)
  if (!exists) schedule.push(slot)

  const lessonCredits = (profile.lessonCredits || 0) + 1

  await usersCollection.updateOne(
    { _id: user._id },
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
  const existing = await progressCollection.findOne({ userId: user._id, courseId })
  if (!existing) {
    await progressCollection.insertOne({
      userId: user._id,
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
