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
    const search = searchParams.get('q') || searchParams.get('search') || ''
    const limit = Math.min(Number(searchParams.get('limit')) || 80, 200)
    const q = new URLSearchParams({ limit: String(limit), active_only: 'true' })
    if (search.trim()) q.set('search', search.trim())
    const list = await crmJson('GET', `students?${q}`)
    return NextResponse.json({ students: Array.isArray(list) ? list : [] }, { status: 200 })
  } catch (error) {
    console.error('admin crm-students GET:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}
