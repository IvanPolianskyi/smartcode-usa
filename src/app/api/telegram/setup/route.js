import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/requireAdmin'
import { blockUnlessDevOrAdminEnabled } from '@/lib/requireAdminRoute'

export async function POST() {
  const blocked = blockUnlessDevOrAdminEnabled()
  if (blocked) return blocked
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN
    
    if (!botToken) {
      return NextResponse.json(
        { success: false, error: 'TELEGRAM_BOT_TOKEN_PROJECTS not configured' },
        { status: 500 }
      )
    }

    // Get the webhook URL
    const webhookUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/telegram/webhook`
      : `${process.env.API_BASE_URL || 'http://localhost:3000'}/api/telegram/webhook`

    console.log('🔗 Setting webhook URL:', webhookUrl)

    // Set webhook
    const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message', 'photo']
      })
    })

    const data = await response.json()

    if (!data.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to set webhook', detail: data },
        { status: 500 }
      )
    }

    // Get webhook info to verify
    const infoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`)
    const infoData = await infoResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Webhook set successfully',
      webhookUrl,
      webhookInfo: infoData.result
    })

  } catch (error) {
    console.error('Error setting webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to set webhook', detail: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const blocked = blockUnlessDevOrAdminEnabled()
  if (blocked) return blocked
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN
    
    if (!botToken) {
      return NextResponse.json(
        { success: false, error: 'TELEGRAM_BOT_TOKEN_PROJECTS not configured' },
        { status: 500 }
      )
    }

    // Delete webhook
    const response = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
      method: 'POST'
    })

    const data = await response.json()

    if (!data.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete webhook', detail: data },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete webhook', detail: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  const blocked = blockUnlessDevOrAdminEnabled()
  if (blocked) return blocked
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN
    
    if (!botToken) {
      return NextResponse.json(
        { success: false, error: 'TELEGRAM_BOT_TOKEN_PROJECTS not configured' },
        { status: 500 }
      )
    }

    // Get webhook info
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`)
    const data = await response.json()

    if (!data.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to get webhook info', detail: data },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      webhookInfo: data.result
    })

  } catch (error) {
    console.error('Error getting webhook info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get webhook info', detail: error.message },
      { status: 500 }
    )
  }
}
