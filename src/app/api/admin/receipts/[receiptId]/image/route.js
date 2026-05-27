import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'

export async function GET(request, { params }) {
  try {
    const { receiptId } = await params
    
    if (!ObjectId.isValid(receiptId)) {
      return new NextResponse('Invalid receipt ID', { status: 400 })
    }

    const paymentsCollection = await getCollection('payments')
    const receiptDoc = await paymentsCollection.findOne({ _id: new ObjectId(receiptId) })

    if (!receiptDoc || !receiptDoc.receipt || !receiptDoc.receipt.dataUrl) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const dataUrl = receiptDoc.receipt.dataUrl
    
    // Parse the dataUrl
    // format: data:image/jpeg;base64,/9j/4AAQSkZJRg...
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    
    if (!matches || matches.length !== 3) {
      return new NextResponse('Invalid image format', { status: 500 })
    }

    const mimeType = matches[1]
    const buffer = Buffer.from(matches[2], 'base64')

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    console.error('Error serving receipt image:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
