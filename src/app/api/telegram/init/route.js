import { NextResponse } from 'next/server'

// Import the bot service
const telegramBotService = require('@/lib/telegramBot')

export async function POST() {
  try {
    // Start the bot if it's not already running
    if (!telegramBotService.getStatus().isRunning) {
      await telegramBotService.start()
      return NextResponse.json({ 
        success: true, 
        message: 'Telegram bot started successfully',
        status: telegramBotService.getStatus()
      })
    } else {
      return NextResponse.json({ 
        success: true, 
        message: 'Telegram bot is already running',
        status: telegramBotService.getStatus()
      })
    }
  } catch (error) {
    console.error('Error starting Telegram bot:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to start Telegram bot' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const status = telegramBotService.getStatus()
    return NextResponse.json({ 
      success: true, 
      status,
      message: status.isRunning ? 'Bot is running' : 'Bot is not running'
    })
  } catch (error) {
    console.error('Error getting bot status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get bot status' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    await telegramBotService.stop()
    return NextResponse.json({ 
      success: true, 
      message: 'Telegram bot stopped successfully'
    })
  } catch (error) {
    console.error('Error stopping Telegram bot:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to stop Telegram bot' },
      { status: 500 }
    )
  }
}

