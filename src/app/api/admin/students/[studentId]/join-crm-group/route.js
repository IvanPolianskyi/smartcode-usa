import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { crmJson, pullCrmScheduleToSmartcodeStudent, syncStudentToCrm } from '@/lib/crmStudentSchedulePull'

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }
  return { usersCollection }
}

export async function POST(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const { usersCollection } = guard
    const { studentId } = await params
    if (!ObjectId.isValid(studentId)) {
      return NextResponse.json({ error: 'Invalid studentId' }, { status: 400 })
    }
    const body = await request.json()
    const groupId = String(body.groupId || '').trim()
    if (!groupId) {
      return NextResponse.json({ error: 'groupId is required' }, { status: 400 })
    }

    const studentDoc = await usersCollection.findOne(
      { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
      { projection: { password: 0 } }
    )
    if (!studentDoc) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const crmStudent = await syncStudentToCrm(studentDoc)
    const crmSid = String(crmStudent?.id || studentDoc.studentProfile?.crmStudentId || '').trim()
    if (!crmSid) {
      return NextResponse.json({ error: 'Не вдалося створити або знайти учня в CRM' }, { status: 502 })
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(studentId) },
      {
        $set: {
          'studentProfile.crmStudentId': crmSid,
          'studentProfile.crmShortId': String(crmStudent?.short_id || ''),
          updatedAt: new Date(),
        },
      }
    )

    const allGroups = (await crmJson('GET', 'groups?limit=400&active_only=true')) || []
    const list = Array.isArray(allGroups) ? allGroups : []
    const fromGroup = list.find((g) => (g.student_ids || []).map(String).includes(crmSid))
    const fromId = fromGroup && String(fromGroup.id) !== groupId ? String(fromGroup.id) : null

    let updatedGroup
    if (fromGroup && String(fromGroup.id) === groupId) {
      updatedGroup = fromGroup
    } else if (fromId) {
      const moved = await crmJson('POST', 'groups/move-student', {
        student_id: crmSid,
        from_group_id: fromId,
        to_group_id: groupId,
      })
      updatedGroup = Array.isArray(moved) ? moved.find((g) => String(g.id) === groupId) : null
    } else {
      updatedGroup = await crmJson('POST', `groups/${groupId}/students/add`, { student_id: crmSid })
    }

    const pulled = await pullCrmScheduleToSmartcodeStudent(
      {
        id: studentId,
        name: studentDoc.name,
        email: studentDoc.email,
        studentProfile: {
          ...(studentDoc.studentProfile || {}),
          crmStudentId: crmSid,
          lessonFormat: 'group',
        },
      },
      usersCollection
    )

    await usersCollection.updateOne(
      { _id: new ObjectId(studentId) },
      {
        $set: {
          'studentProfile.accountReady': true,
          updatedAt: new Date(),
        },
      }
    )
    const finalProfile = {
      ...(pulled.studentProfile || {}),
      accountReady: true,
    }

    return NextResponse.json(
      {
        ok: true,
        group: updatedGroup || null,
        studentProfile: finalProfile,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('join-crm-group:', error)
    return NextResponse.json({ error: String(error?.message || error) }, { status: 502 })
  }
}
