import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { crmJson } from '@/lib/crmStudentSchedulePull'

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }
  return {}
}

export async function POST(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const { groupId } = await params
    const body = await request.json()
    const studentId = String(body.studentId || '').trim()
    const action = String(body.action || 'add').trim()
    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required' }, { status: 400 })
    }
    const path =
      action === 'remove'
        ? `groups/${groupId}/students/remove`
        : `groups/${groupId}/students/add`
    const group = await crmJson('POST', path, { student_id: studentId })
    return NextResponse.json({ group }, { status: 200 })
  } catch (error) {
    console.error('admin crm-groups members POST:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}
