/**
 * Seed a local demo student with active subscriptions (prod-shaped billing rows).
 *
 * Usage:
 *   node scripts/seed-local-student.js
 *   node scripts/seed-local-student.js student@local.test localpass123
 *
 * Loads .env.local (falls back to .env).
 */
const path = require('path')
const fs = require('fs')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const text = fs.readFileSync(filePath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvFile(path.join(__dirname, '..', '.env.local'))
loadEnvFile(path.join(__dirname, '..', '.env'))

const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')

const COURSE_IDS = [
  'roblox-studio',
  'python-developer-zero-to-junior',
  'ai-at-work',
]

async function main() {
  const email = (process.argv[2] || 'student@local.test').toLowerCase().trim()
  const password = process.argv[3] || 'student123'
  const mongoUri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB || 'SmartCode'

  if (!mongoUri) {
    console.error('Set MONGODB_URI in .env.local')
    process.exit(1)
  }

  const client = new MongoClient(mongoUri)
  await client.connect()
  const db = client.db(databaseName)
  const users = db.collection('users')
  const subscriptions = db.collection('subscriptions')
  const progress = db.collection('userProgress')

  const hashed = await bcrypt.hash(password, 10)
  const now = new Date()
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const courseAccess = {}
  for (const courseId of COURSE_IDS) {
    courseAccess[courseId] = { enabled: true, fullAccess: true, unlockedLessons: [] }
  }

  const existing = await users.findOne({ email })
  let userId
  if (existing) {
    userId = existing._id
    await users.updateOne(
      { _id: userId },
      {
        $set: {
          password: hashed,
          name: existing.name || 'Local Student',
          role: 'student',
          purchasedCourses: COURSE_IDS,
          enrolledCourses: COURSE_IDS,
          studentProfile: {
            ...(existing.studentProfile || {}),
            accountReady: true,
            primaryCourseId: 'roblox-studio',
            activeOnlineCourses: COURSE_IDS,
            courseAccess,
            regularSchedule: [
              { day: 'mon', time: '16:00', courseId: 'roblox-studio' },
              { day: 'wed', time: '16:00', courseId: 'python-developer-zero-to-junior' },
            ],
            zoomLink: 'https://zoom.us/j/00000000000',
            lessonCredits: 4,
          },
          updatedAt: now,
        },
      }
    )
    console.log(`Updated student: ${email}`)
  } else {
    userId = new ObjectId()
    await users.insertOne({
      _id: userId,
      email,
      password: hashed,
      name: 'Local Student',
      role: 'student',
      purchasedCourses: COURSE_IDS,
      enrolledCourses: COURSE_IDS,
      studentProfile: {
        accountReady: true,
        primaryCourseId: 'roblox-studio',
        activeOnlineCourses: COURSE_IDS,
        courseAccess,
        regularSchedule: [
          { day: 'mon', time: '16:00', courseId: 'roblox-studio' },
          { day: 'wed', time: '16:00', courseId: 'python-developer-zero-to-junior' },
        ],
        zoomLink: 'https://zoom.us/j/00000000000',
        lessonCredits: 4,
      },
      createdAt: now,
      updatedAt: now,
    })
    console.log(`Created student: ${email}`)
  }

  // Prod-shaped subscription rows (what Paddle webhooks write).
  for (const courseId of COURSE_IDS) {
    const paddleSubscriptionId = `local_sub_${courseId}`
    await subscriptions.updateOne(
      { paddleSubscriptionId },
      {
        $set: {
          userId,
          paddleCustomerId: 'local_cus_demo',
          priceId: `pri_local_${courseId}_month`,
          productId: `pro_local_${courseId}`,
          courseIds: [courseId],
          status: 'active',
          billingInterval: 'month',
          trialEndsAt: null,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: false,
          scheduledChangeAt: null,
          lastEventType: 'subscription.updated',
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    )

    const existingProgress = await progress.findOne({ userId, courseId })
    if (!existingProgress) {
      await progress.insertOne({
        userId,
        courseId,
        enrolledAt: now,
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

  await subscriptions.createIndex({ paddleSubscriptionId: 1 }, { unique: true }).catch(() => {})
  await subscriptions.createIndex({ userId: 1, updatedAt: -1 }).catch(() => {})

  console.log('')
  console.log('Local student ready (mirrors production entitlement flow):')
  console.log(`  Email:    ${email}`)
  console.log(`  Password: ${password}`)
  console.log(`  Courses:  ${COURSE_IDS.join(', ')}`)
  console.log(`  Login:    http://localhost:3000/login`)
  console.log(`  Cabinet:  http://localhost:3000/dashboard`)
  console.log('')

  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
