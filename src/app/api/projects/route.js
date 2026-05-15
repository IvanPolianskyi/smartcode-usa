import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

// GET endpoint to fetch all published projects
export async function GET() {
  try {
    const projects = await getCollection('projects')
    const allProjects = await projects
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .toArray()

    // Transform the data to match the frontend format
    const transformedProjects = allProjects.map(project => {
      const imageUrl = project.imageUrl || '/projects/default-project.svg'
      console.log('Project image URL:', imageUrl, 'for project:', project.title)
      return {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        code: project.code,
        studentName: project.studentName || 'Student',
        createdAt: project.createdAt,
        image: imageUrl
      }
    })

    return NextResponse.json({ 
      success: true, 
      projects: transformedProjects 
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    const errorCode = String(error?.code || '')
    if (errorCode === 'ETIMEOUT') {
      // Atlas DNS/network outage should not hard-fail the public projects page.
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

// POST endpoint to add a new project (for admin use)
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, code, studentName, imageUrl } = body

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
      studentName: studentName || 'Student',
      imageUrl: imageUrl || null,
      createdAt: new Date(),
      status: 'published'
    }
    const result = await projects.insertOne(project)
    
    return NextResponse.json({ 
      success: true, 
      projectId: result.insertedId,
      message: 'Project added successfully' 
    })
  } catch (error) {
    console.error('Error adding project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add project' },
      { status: 500 }
    )
  }
}
