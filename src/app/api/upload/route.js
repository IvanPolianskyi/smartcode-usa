import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { requireAdmin } from '@/lib/requireAdmin'

function isInternalUpload(request) {
  const secret = process.env.INTERNAL_UPLOAD_SECRET
  if (!secret) return false
  return request.headers.get('x-internal-upload-secret') === secret
}

export async function POST(request) {
  if (!isInternalUpload(request)) {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
  }

  try {
    const formData = await request.formData()
    const file = formData.get('image')

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      )
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/pjpeg',
    ]
    const fileType = file.type || 'application/octet-stream'

    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type: ${fileType}. Only JPEG, PNG, GIF, and WebP are allowed.`,
        },
        { status: 400 }
      )
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'projects')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const fileName = `project_${timestamp}_${randomString}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const imageUrl = `/uploads/projects/${fileName}`

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
