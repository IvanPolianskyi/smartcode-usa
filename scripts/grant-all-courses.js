/**
 * Grant full access to all courses for a user by email.
 * Run: node scripts/grant-all-courses.js [email]
 */
try {
  require('dotenv').config()
} catch {
  /* optional */
}

const { MongoClient } = require('mongodb')

const ALL_COURSE_IDS = [
  'python-developer-zero-to-junior',
  'web-development',
  'roblox-studio',
  'unity-game-development',
]

async function main() {
  const email = (process.argv[2] || 'smartcodeacademy3@gmail.com').toLowerCase().trim()
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    console.error('Set MONGODB_URI in .env.local')
    process.exit(1)
  }
  const databaseName = process.env.MONGODB_DB || 'SmartCodeLogs'

  const client = new MongoClient(mongoUri)
  await client.connect()
  const db = client.db(databaseName)
  const users = db.collection('users')
  const progress = db.collection('userProgress')

  const user = await users.findOne({ email })
  if (!user) {
    console.error(`User not found: ${email}`)
    process.exit(1)
  }

  const courseAccess = {}
  ALL_COURSE_IDS.forEach((courseId) => {
    courseAccess[courseId] = { enabled: true, unlockedLessons: [] }
  })

  await users.updateOne(
    { _id: user._id },
    {
      $set: {
        purchasedCourses: ALL_COURSE_IDS,
        enrolledCourses: ALL_COURSE_IDS,
        'studentProfile.activeOnlineCourses': ALL_COURSE_IDS,
        'studentProfile.courseAccess': courseAccess,
        'studentProfile.accountReady': true,
        updatedAt: new Date(),
      },
    }
  )

  for (const courseId of ALL_COURSE_IDS) {
    const exists = await progress.findOne({ userId: user._id, courseId })
    if (!exists) {
      await progress.insertOne({
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

  console.log(`Granted all courses to ${email} (${user._id})`)
  console.log('Courses:', ALL_COURSE_IDS.join(', '))
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
