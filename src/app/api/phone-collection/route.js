import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { normalizePhoneE164 } from '@/lib/phoneE164'
import { API_ERRORS, resolveLocale } from '@/lib/localeStrings'
import { requireAdmin } from '@/lib/requireAdmin'
import { getClientIp } from '@/lib/metaCapi'
import {
  isInternalLeadRequest,
  validatePublicLeadSubmission,
  markLeadTokenUsed,
  recordLeadSubmitAttempt,
} from '@/lib/leadFormSecurity'
import { sanitizeLeadName } from '@/lib/sanitizeLeadText'

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

function projectAlreadyRequested(existingLead, projectId) {
  if (!existingLead?.interestedProjects?.length || projectId == null) return false
  const id = String(projectId)
  return existingLead.interestedProjects.some((p) => String(p.projectId) === id)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      phone,
      name,
      projectId,
      projectTitle,
      timestamp,
      locale: bodyLocale,
      leadToken,
      company: honeypot,
    } = body
    const loc = resolveLocale(bodyLocale)
    const apiErr = API_ERRORS[loc]

    const internalLead = isInternalLeadRequest(request)
    let tokenHash = null
    let submitIp = getClientIp(request) || 'unknown'

    if (!internalLead) {
      const security = await validatePublicLeadSubmission({
        request,
        leadToken,
        honeypot,
      })
      if (!security.ok) {
        if (security.silent) {
          return NextResponse.json({
            success: true,
            message: 'Phone number collected successfully',
          })
        }
        return NextResponse.json(
          {
            success: false,
            error: 'Request rejected',
            code: security.code || security.reason || 'rejected',
          },
          { status: security.status || 403 }
        )
      }
      tokenHash = security.tokenHash
      submitIp = security.ip || submitIp
    }

    const safeName = sanitizeLeadName(name)

    // Validate required fields
    if (!phone || !safeName) {
      return NextResponse.json(
        { success: false, error: apiErr.phoneAndNameRequired },
        { status: 400 }
      )
    }

    const normalizedPhone = normalizePhoneE164(phone, loc)
    if (!normalizedPhone) {
      return NextResponse.json(
        { success: false, error: apiErr.invalidPhone },
        { status: 400 }
      )
    }

    // Check if phone number already exists
    const leads = await getCollection('leads')
    const existingLead = await leads.findOne({ phone: normalizedPhone })

    if (projectAlreadyRequested(existingLead, projectId)) {
      if (tokenHash) await markLeadTokenUsed(tokenHash)
      await recordLeadSubmitAttempt(submitIp, { blocked: false })
      return NextResponse.json({
        success: true,
        message: 'Phone number collected successfully',
      })
    }

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
            name: safeName,
            lastActivity: new Date(),
            interestedProjects: updatedProjects
          }
        }
      )

      console.log('Updated existing lead:', { phone: normalizedPhone, name: safeName, projectTitle })
    } else {
      // Create new lead
      const lead = {
        phone: normalizedPhone,
        name: safeName,
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
      console.log('Created new lead:', { phone: normalizedPhone, name: safeName, projectTitle })
    }

    // Send telegram notification to admin
    await sendTelegramNotification({ phone: normalizedPhone, name: safeName, projectTitle })

    if (tokenHash) await markLeadTokenUsed(tokenHash)
    await recordLeadSubmitAttempt(submitIp, { blocked: false })

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

// GET — admin only (PII)
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

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

