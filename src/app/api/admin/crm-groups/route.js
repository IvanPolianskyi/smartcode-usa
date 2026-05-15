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

export async function GET(request) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get('teacher_id') || ''
    const q = new URLSearchParams({ limit: '400', active_only: 'true' })
    if (teacherId) q.set('teacher_id', teacherId)
    const list = await crmJson('GET', `groups?${q}`)
    return NextResponse.json({ groups: Array.isArray(list) ? list : [] }, { status: 200 })
  } catch (error) {
    console.error('admin crm-groups GET:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}

export async function POST(request) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const body = await request.json()
    const created = await crmJson('POST', 'groups', body)
    return NextResponse.json({ group: created }, { status: 201 })
  } catch (error) {
    console.error('admin crm-groups POST:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}
