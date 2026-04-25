import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { normalizePhoneE164 } from '@/lib/phoneE164'

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

// Function to send telegram notification for project source code requests
async function sendTelegramNotification({ phone, name, projectTitle }) {
  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      console.log('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID for project source code notification')
      return
    }

    const createdAt = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })

    const lines = [
      '🔓 <b>Новий запит на код проєкту</b>',
      '',
      `<b>Ім'я:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Проєкт:</b> ${escapeHtml(projectTitle || 'Невідомо')}`,
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
      console.error('Telegram notification failed for project source code request:', tgData)
    } else {
      console.log('Telegram notification sent successfully for project source code request')
    }
  } catch (error) {
    console.error('Error sending telegram notification for project source code request:', error)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { phone, name, projectId, projectTitle, timestamp } = body

    // Validate required fields
    if (!phone || !name) {
      return NextResponse.json(
        { success: false, error: 'Phone number and name are required' },
        { status: 400 }
      )
    }

    const normalizedPhone = normalizePhoneE164(phone)
    if (!normalizedPhone) {
      return NextResponse.json(
        { success: false, error: 'Невалідний номер (потрібен номер країни Європи)' },
        { status: 400 }
      )
    }

    // Check if phone number already exists
    const leads = await getCollection('leads')
    const existingLead = await leads.findOne({ phone: normalizedPhone })

    if (existingLead) {
      // Update existing lead with new project interest
      const updatedProjects = [...(existingLead.interestedProjects || []), {
        projectId,
        projectTitle,
        timestamp: new Date(timestamp)
      }]

      await leads.updateOne(
        { phone: normalizedPhone },
        {
          $set: {
            name: name.trim(),
            lastActivity: new Date(),
            interestedProjects: updatedProjects
          }
        }
      )

      console.log('Updated existing lead:', { phone: normalizedPhone, name, projectTitle })
    } else {
      // Create new lead
      const lead = {
        phone: normalizedPhone,
        name: name.trim(),
        interestedProjects: [{
          projectId,
          projectTitle,
          timestamp: new Date(timestamp)
        }],
        createdAt: new Date(),
        lastActivity: new Date(),
        status: 'new',
        source: 'project_code_request'
      }

      await leads.insertOne(lead)
      console.log('Created new lead:', { phone: normalizedPhone, name, projectTitle })
    }

    // Send telegram notification to admin
    await sendTelegramNotification({ phone: normalizedPhone, name, projectTitle })

    return NextResponse.json({
      success: true,
      message: 'Phone number collected successfully'
    })

  } catch (error) {
    console.error('Error collecting phone number:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to collect phone number' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve leads (for admin use)
export async function GET() {
  try {
    const leads = await getCollection('leads')
    const allLeads = await leads
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      leads: allLeads
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

