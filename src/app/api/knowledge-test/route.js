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
import { scoreKnowledgeTest } from '@/lib/knowledgeTestScore'

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
    }
  } catch (error) {
    console.error('Error sending telegram notification for knowledge test:', error)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      phone,
      name,
      direction,
      directionName,
      answers,
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
            message: 'Test result saved successfully',
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
    const computed = scoreKnowledgeTest(direction, answers)

    // Validate required fields
    if (!phone || !safeName || !direction) {
      return NextResponse.json(
        { success: false, error: apiErr.phoneNameDirectionRequired },
        { status: 400 }
      )
    }

    if (!computed) {
      return NextResponse.json(
        { success: false, error: 'Invalid test submission', code: 'invalid_test' },
        { status: 400 }
      )
    }

    const { score, totalQuestions, percentage } = computed

    const normalizedPhone = normalizePhoneE164(phone, loc)
    if (!normalizedPhone) {
      return NextResponse.json(
        { success: false, error: apiErr.invalidPhone },
        { status: 400 }
      )
    }

    const leads = await getCollection('leads')
    const existingLead = await leads.findOne({ phone: normalizedPhone })
    const sameRecentTest =
      existingLead?.lastKnowledgeTest?.direction === direction &&
      existingLead?.lastKnowledgeTest?.timestamp &&
      Date.now() - new Date(existingLead.lastKnowledgeTest.timestamp).getTime() <
        15 * 60 * 1000

    // Save test result to database
    const testResults = await getCollection('knowledge_test_results')
    const testResult = {
      phone: normalizedPhone,
      name: safeName,
      direction,
      directionName: directionName || direction,
      score,
      totalQuestions,
      percentage,
      answers: answers || {},
      createdAt: new Date(timestamp || new Date()),
      lastActivity: new Date(),
    }

    await testResults.insertOne(testResult)

    if (!sameRecentTest) {
      await sendTelegramNotification({
        phone: normalizedPhone,
        name: safeName,
        direction,
        directionName: directionName || direction,
        score,
        totalQuestions,
        percentage,
      })
    }

    if (existingLead) {
      await leads.updateOne(
        { phone: normalizedPhone },
        {
          $set: {
            name: safeName,
            lastActivity: new Date(),
            lastKnowledgeTest: {
              direction,
              directionName: directionName || direction,
              score,
              totalQuestions,
              percentage,
              timestamp: new Date(timestamp || new Date()),
            },
          },
        }
      )
    } else {
      const lead = {
        phone: normalizedPhone,
        name: safeName,
        lastKnowledgeTest: {
          direction,
          directionName: directionName || direction,
          score,
          totalQuestions,
          percentage,
          timestamp: new Date(timestamp || new Date()),
        },
        createdAt: new Date(),
        lastActivity: new Date(),
        status: 'new',
        source: 'knowledge_test',
      }

      await leads.insertOne(lead)
    }

    if (tokenHash) await markLeadTokenUsed(tokenHash)
    await recordLeadSubmitAttempt(submitIp, { blocked: false })

    return NextResponse.json({
      success: true,
      message: 'Test result saved successfully',
      score,
      totalQuestions,
      percentage,
    })

  } catch (error) {
    console.error('Error saving test result:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save test result' },
      { status: 500 }
    )
  }
}

// GET — admin only (PII)
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

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

























