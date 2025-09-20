import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request) {
  try {
    console.log('📤 Upload API called')
    
    const formData = await request.formData()
    const file = formData.get('image')
    
    console.log('📁 File received:', file ? {
      name: file.name,
      type: file.type,
      size: file.size
    } : 'No file')
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file type - be more flexible with MIME types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/pjpeg']
    const fileType = file.type || 'application/octet-stream'
    
    if (!allowedTypes.includes(fileType)) {
      console.log('Invalid file type:', fileType, 'File name:', file.name)
      return NextResponse.json(
        { success: false, error: `Invalid file type: ${fileType}. Only JPEG, PNG, GIF, and WebP are allowed.` },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'projects')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const fileName = `project_${timestamp}_${randomString}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)

    console.log('💾 Saving file:', fileName, 'to:', filePath)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return the public URL
    const imageUrl = `/uploads/projects/${fileName}`
    
    console.log('✅ File saved successfully:', imageUrl)

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
