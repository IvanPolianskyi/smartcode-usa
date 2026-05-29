import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { startMonobankPayment } from '@/lib/createMonobankPayment'

const PYTHON_COURSE_ID = 'python-developer-zero-to-junior'
const TEST_AMOUNT_UAH = 5

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) {
    return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  }

  const usersCollection = await getCollection('users')
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!user || user.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }

  return { userId, user }
}

/**
 * Admin: тестова оплата 5 грн → доступ до Python курсу після успішної оплати.
 * POST /api/admin/monobank-test-python
 */
export async function POST(request) {
  try {
    const auth = await requireAdmin()
    if (auth.error) return auth.error

    const { userId } = auth
    let locale = 'uk'
    try {
      const body = await request.json()
      if (body?.locale === 'en') locale = 'en'
    } catch {
      /* empty body ok */
    }

    const orderId = `admin_test_python_${userId}_${Date.now()}`
    const description = 'Тест: Python курс (5 грн)'

    const { invoiceId, paymentUrl } = await startMonobankPayment({
      orderId,
      amountUah: TEST_AMOUNT_UAH,
      description,
      locale,
      basketName: 'Python Developer Course (test)',
    })

    const paymentsCollection = await getCollection('payments')
    await paymentsCollection.insertOne({
      userId: new ObjectId(userId),
      courseId: PYTHON_COURSE_ID,
      orderId,
      invoiceId,
      amount: TEST_AMOUNT_UAH,
      currency: 'UAH',
      status: 'pending',
      paymentMethod: 'monobank',
      paymentType: 'full_course',
      isAdminTest: true,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      paymentUrl,
      orderId,
      invoiceId,
      courseId: PYTHON_COURSE_ID,
      amountUah: TEST_AMOUNT_UAH,
      provider: 'monobank',
    })
  } catch (error) {
    console.error('Admin monobank test python error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
