import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/requireAdmin'

const MAX_TITLE = 200
const MAX_DESCRIPTION = 2000
const MAX_CODE = 50000
const MAX_STUDENT_NAME = 120

function trimField(value, maxLen) {
  if (value == null) return ''
  return String(value).trim().slice(0, maxLen)
}

// GET — public list of published student projects
export async function GET() {
  try {
    const projects = await getCollection('projects')
    const allProjects = await projects
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .toArray()

    const transformedProjects = allProjects.map((project) => {
      const imageUrl = project.imageUrl || '/projects/default-project.svg'
      return {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        code: project.code,
        studentName: project.studentName || 'Student',
        createdAt: project.createdAt,
        image: imageUrl,
      }
    })

    return NextResponse.json({
      success: true,
      projects: transformedProjects,
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    const errorCode = String(error?.code || '')
    if (errorCode === 'ETIMEOUT') {
      return NextResponse.json({
        success: true,
        projects: [],
        warning: 'MongoDB is temporarily unavailable',
      })
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST — admin only
export async function POST(request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  try {
    const body = await request.json()
    const title = trimField(body.title, MAX_TITLE)
    const description = trimField(body.description, MAX_DESCRIPTION)
    const code = trimField(body.code, MAX_CODE)
    const studentName = trimField(body.studentName, MAX_STUDENT_NAME) || 'Student'
    const imageUrl = body.imageUrl ? trimField(body.imageUrl, 500) : null

    if (!title || !description || !code) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, code' },
        { status: 400 }
      )
    }

    const projects = await getCollection('projects')
    const project = {
      title,
      description,
      code,
      studentName,
      imageUrl,
      createdAt: new Date(),
      status: 'published',
      createdBy: guard.userId,
    }
    const result = await projects.insertOne(project)

    return NextResponse.json({
      success: true,
      projectId: result.insertedId,
      message: 'Project added successfully',
    })
  } catch (error) {
    console.error('Error adding project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add project' },
      { status: 500 }
    )
  }
}

// DELETE — admin only (?id=...)
export async function DELETE(request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  try {
    const id = new URL(request.url).searchParams.get('id')
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Valid project id is required' },
        { status: 400 }
      )
    }

    const projects = await getCollection('projects')
    const result = await projects.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, deleted: id })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
