import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

// Helper function to escape HTML for Telegram
function escapeHtml(input) {
  const str = String(input ?? '')
  return str.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char])
}

// Function to send telegram notification for test results
async function sendTelegramNotification({ phone, name, direction, directionName, score, totalQuestions, percentage }) {
  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      console.log('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID for knowledge test notification')
      return
    }

    const createdAt = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })

    const lines = [
      '📝 <b>Новий результат тесту знань</b>',
      '',
      `<b>Ім'я:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Напрямок:</b> ${escapeHtml(directionName)}`,
      `<b>Результат:</b> ${escapeHtml(score)}/${escapeHtml(totalQuestions)} (${escapeHtml(percentage)}%)`,
      '',
      `<b>Час:</b> ${escapeHtml(createdAt)}`,
    ]

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: lines.join('\n'),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    )

    const tgData = await telegramResponse.json().catch(() => null)

    if (!telegramResponse.ok || !tgData?.ok) {
      console.error('Telegram notification failed for knowledge test:', tgData)
    } else {
      console.log('Telegram notification sent successfully for knowledge test')
    }
  } catch (error) {
    console.error('Error sending telegram notification for knowledge test:', error)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { phone, name, direction, directionName, score, totalQuestions, percentage, answers, timestamp } = body

    // Validate required fields
    if (!phone || !name || !direction) {
      return NextResponse.json(
        { success: false, error: 'Phone number, name, and direction are required' },
        { status: 400 }
      )
    }

    // Validate phone number format (Ukrainian numbers)
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10 && !(phoneDigits.length === 12 && phoneDigits.startsWith('380'))) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Normalize phone number
    const normalizedPhone = phoneDigits.length === 10 ? `380${phoneDigits}` : phoneDigits

    // Save test result to database
    const testResults = await getCollection('knowledge_test_results')
    const testResult = {
      phone: normalizedPhone,
      name: name.trim(),
      direction,
      directionName: directionName || direction,
      score: score || 0,
      totalQuestions: totalQuestions || 0,
      percentage: percentage || 0,
      answers: answers || {},
      createdAt: new Date(timestamp || new Date()),
      lastActivity: new Date(),
    }

    await testResults.insertOne(testResult)
    console.log('Test result saved:', { phone: normalizedPhone, name, direction, percentage })

    // Send telegram notification to admin
    await sendTelegramNotification({
      phone: normalizedPhone,
      name,
      direction,
      directionName: directionName || direction,
      score,
      totalQuestions,
      percentage
    })

    // Also update or create lead in leads collection
    const leads = await getCollection('leads')
    const existingLead = await leads.findOne({ phone: normalizedPhone })

    if (existingLead) {
      // Update existing lead with test result
      await leads.updateOne(
        { phone: normalizedPhone },
        {
          $set: {
            name: name.trim(),
            lastActivity: new Date(),
            lastKnowledgeTest: {
              direction,
              directionName: directionName || direction,
              score,
              totalQuestions,
              percentage,
              timestamp: new Date(timestamp || new Date())
            }
          }
        }
      )
    } else {
      // Create new lead
      const lead = {
        phone: normalizedPhone,
        name: name.trim(),
        lastKnowledgeTest: {
          direction,
          directionName: directionName || direction,
          score,
          totalQuestions,
          percentage,
          timestamp: new Date(timestamp || new Date())
        },
        createdAt: new Date(),
        lastActivity: new Date(),
        status: 'new',
        source: 'knowledge_test'
      }

      await leads.insertOne(lead)
    }

    return NextResponse.json({
      success: true,
      message: 'Test result saved successfully'
    })

  } catch (error) {
    console.error('Error saving test result:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save test result' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve test results (for admin use)
export async function GET() {
  try {
    const testResults = await getCollection('knowledge_test_results')
    const allResults = await testResults
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      results: allResults
    })
  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test results' },
      { status: 500 }
    )
  }
}
























