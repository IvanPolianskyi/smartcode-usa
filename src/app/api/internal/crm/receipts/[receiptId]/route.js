import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCollection } from '@/lib/mongodb'

export async function PATCH(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  const { receiptId } = await params
  if (!ObjectId.isValid(receiptId)) {
    return NextResponse.json({ error: 'Invalid receiptId' }, { status: 400 })
  }

  try {
    const data = await request.json()
    const creditedLessons = parseInt(data.creditedLessons, 10)
    if (isNaN(creditedLessons) || creditedLessons < 0) {
      return NextResponse.json({ error: 'Invalid creditedLessons' }, { status: 400 })
    }

    const paymentsCollection = await getCollection('payments')
    const receipt = await paymentsCollection.findOne({
      _id: new ObjectId(receiptId),
      paymentMethod: 'receipt_upload',
    })
    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 })
    }

    await paymentsCollection.updateOne(
      { _id: new ObjectId(receiptId) },
      { $set: { creditedLessons, updatedAt: new Date() } }
    )

    if (
      (receipt.approvalStatus === 'approved' || receipt.status === 'completed') &&
      creditedLessons !== (receipt.creditedLessons || 0) &&
      receipt.userId
    ) {
      const diff = creditedLessons - (receipt.creditedLessons || 0)
      const usersCollection = await getCollection('users')
      // Для привʼязаних до CRM учнів баланс веде CRM-ledger — локальні
      // lessonCredits не коригуємо, щоб не дублювати нарахування.
      const user = await usersCollection.findOne(
        { _id: receipt.userId },
        { projection: { 'studentProfile.crmStudentId': 1 } }
      )
      const crmLinked = Boolean(
        String(user?.studentProfile?.crmStudentId || '').trim()
      )
      if (!crmLinked) {
        await usersCollection.updateOne(
          { _id: receipt.userId },
          { $inc: { 'studentProfile.lessonCredits': diff }, $set: { updatedAt: new Date() } }
        )
      }
      // crmLinked: баланс уже змінює CRM (цей PATCH викликається з CRM) —
      // зворотний sync сюди не робимо, щоб не подвоїти adjust.
    }

    return NextResponse.json({ success: true, creditedLessons })
  } catch (error) {
    console.error('internal crm receipt PATCH:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
