import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

/**
 * Admin statistics endpoint
 * Returns business statistics: visits, purchases, course enrollments
 */
export async function GET() {
  try {
    // Check authentication
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const usersCollection = await getCollection('users')
    let user
    try {
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      )
    }

    // Get all statistics
    const [visits, payments, users, progress] = await Promise.all([
      // Total visits
      getCollection('logs').then(collection => 
        collection.countDocuments({ type: 'visit' })
      ),
      // Payment statistics
      getCollection('payments').then(async collection => {
        const allPayments = await collection.find({}).toArray()
        const completed = allPayments.filter(p => p.status === 'completed')
        const totalRevenue = completed.reduce((sum, p) => sum + (p.amount || 0), 0)
        
        return {
          total: allPayments.length,
          completed: completed.length,
          pending: allPayments.filter(p => p.status === 'pending').length,
          failed: allPayments.filter(p => p.status === 'failed').length,
          totalRevenue: totalRevenue
        }
      }),
      // User statistics
      getCollection('users').then(async collection => {
        const allUsers = await collection.find({}).toArray()
        const totalUsers = allUsers.length
        const usersWithPurchases = allUsers.filter(u => 
          u.purchasedCourses && u.purchasedCourses.length > 0
        ).length
        
        // Count enrollments per course
        const courseEnrollments = {}
        allUsers.forEach(user => {
          if (user.enrolledCourses && Array.isArray(user.enrolledCourses)) {
            user.enrolledCourses.forEach(courseId => {
              courseEnrollments[courseId] = (courseEnrollments[courseId] || 0) + 1
            })
          }
        })
        
        return {
          total: totalUsers,
          withPurchases: usersWithPurchases,
          courseEnrollments
        }
      }),
      // Progress statistics
      getCollection('userProgress').then(async collection => {
        const allProgress = await collection.find({}).toArray()
        
        // Group by course
        const courseStats = {}
        allProgress.forEach(prog => {
          const courseId = prog.courseId
          if (!courseStats[courseId]) {
            courseStats[courseId] = {
              totalEnrolled: 0,
              totalCompletedLessons: 0,
              averageProgress: 0,
              users: []
            }
          }
          courseStats[courseId].totalEnrolled++
          courseStats[courseId].totalCompletedLessons += (prog.completedLessons?.length || 0)
          courseStats[courseId].users.push({
            userId: prog.userId.toString(),
            progress: prog.overallProgress || 0,
            completedLessons: prog.completedLessons?.length || 0,
            enrolledAt: prog.enrolledAt
          })
        })
        
        // Calculate average progress per course
        Object.keys(courseStats).forEach(courseId => {
          const stats = courseStats[courseId]
          if (stats.users.length > 0) {
            stats.averageProgress = Math.round(
              stats.users.reduce((sum, u) => sum + u.progress, 0) / stats.users.length
            )
          }
        })
        
        return courseStats
      })
    ])

    // Get recent visits (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentVisits = await getCollection('logs').then(collection =>
      collection.countDocuments({
        type: 'visit',
        createdAt: { $gte: thirtyDaysAgo }
      })
    )

    // Get course names mapping
    const courseNames = {
      'python-developer-zero-to-junior': 'Python Developer: From Zero to Confident Junior',
      'unity-game-development': 'Розробка ігор на Unity',
      'roblox-studio': 'Roblox Studio',
      'web-development': 'Веб-розробка'
    }

    // Format course enrollment data with names
    const formattedCourseEnrollments = Object.entries(users.courseEnrollments).map(([courseId, count]) => ({
      courseId,
      courseName: courseNames[courseId] || courseId,
      enrolledCount: count
    }))

    // Format course progress data with names
    const formattedCourseProgress = Object.entries(progress).map(([courseId, stats]) => ({
      courseId,
      courseName: courseNames[courseId] || courseId,
      ...stats
    }))

    // Get detailed user list with their courses
    const usersWithCourses = await usersCollection.find({}).toArray()
    const detailedUsers = usersWithCourses
      .filter(u => u.enrolledCourses && u.enrolledCourses.length > 0)
      .map(u => ({
        id: u._id.toString(),
        name: u.name || 'Без імені',
        email: u.email,
        enrolledCourses: (u.enrolledCourses || []).map(courseId => ({
          courseId,
          courseName: courseNames[courseId] || courseId
        })),
        purchasedCourses: (u.purchasedCourses || []).map(courseId => ({
          courseId,
          courseName: courseNames[courseId] || courseId
        })),
        createdAt: u.createdAt
      }))

    return NextResponse.json({
      visits: {
        total: visits,
        last30Days: recentVisits
      },
      payments: payments,
      users: {
        total: users.total,
        withPurchases: users.withPurchases,
        courseEnrollments: formattedCourseEnrollments
      },
      courseProgress: formattedCourseProgress,
      detailedUsers: detailedUsers
    }, { status: 200 })

  } catch (error) {
    console.error('Admin statistics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

