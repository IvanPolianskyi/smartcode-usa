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

export async function PATCH(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const { groupId } = await params
    const body = await request.json()
    const updated = await crmJson('PATCH', `groups/${groupId}`, body)
    return NextResponse.json({ group: updated }, { status: 200 })
  } catch (error) {
    console.error('admin crm-groups PATCH:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const { groupId } = await params
    await crmJson('DELETE', `groups/${groupId}`)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('admin crm-groups DELETE:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}
