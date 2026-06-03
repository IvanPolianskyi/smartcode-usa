import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

// Helper function to escape HTML
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

// Helper function to send message to Telegram
async function sendTelegramMessage(chatId, text, parseMode = 'HTML') {
  const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN
  
  if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN_PROJECTS not configured')
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
  }

  return await response.json()
}

// Helper function to get file from Telegram
async function getTelegramFile(fileId) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN
  
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)
  const data = await response.json()
  
  if (!data.ok) {
    throw new Error(`Failed to get file: ${data.description}`)
  }
  
  return data.result
}

// Helper function to download file from Telegram
async function downloadTelegramFile(filePath) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`
  
  const response = await fetch(fileUrl)
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`)
  }
  
  return await response.arrayBuffer()
}

function getSiteBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

// Helper function to upload image to our API (server-to-server, requires INTERNAL_UPLOAD_SECRET)
async function uploadImageToAPI(imageBuffer, filename) {
  const formData = new FormData()
  formData.append('image', new Blob([imageBuffer]), filename)

  const headers = {}
  if (process.env.INTERNAL_UPLOAD_SECRET) {
    headers['x-internal-upload-secret'] = process.env.INTERNAL_UPLOAD_SECRET
  }

  const response = await fetch(`${getSiteBaseUrl()}/api/upload`, {
    method: 'POST',
    headers,
    body: formData,
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Upload API error: ${errorData.error || response.statusText}`)
  }
  
  return await response.json()
}

// Helper function to create project in database
async function createProject(projectData) {
  const projects = await getCollection('projects')
  
  const doc = {
    title: projectData.title,
    description: projectData.description,
    code: projectData.code,
    studentName: 'Student',
    imageUrl: projectData.imageUrl || null,
    createdAt: new Date(),
    status: 'published'
  }
  
  const result = await projects.insertOne(doc)
  return result
}

// Helper function to get projects from database
async function getProjects() {
  const projects = await getCollection('projects')
  return await projects.find({}).sort({ createdAt: -1 }).limit(10).toArray()
}

// Helper function to get leads from database
async function getLeads() {
  const leads = await getCollection('phone-collection')
  return await leads.find({}).sort({ lastActivity: -1 }).limit(10).toArray()
}

// In-memory storage for user states (in production, use Redis or database)
const userStates = new Map()

export async function POST(request) {
  try {
    const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET
    if (webhookSecret) {
      const headerSecret = request.headers.get('x-telegram-bot-api-secret-token')
      if (headerSecret !== webhookSecret) {
        return NextResponse.json({ ok: false }, { status: 401 })
      }
    }

    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const chatId = message.chat.id
    const userId = message.from.id
    const text = message.text?.trim()
    const photo = message.photo

    console.log('📨 Received message:', { chatId, userId, text: text?.substring(0, 50) })

    // Handle start/help command
    if (text === '/start' || text === '/help') {
      const helpText = `
🤖 <b>SmartCode Academy Projects Bot</b>

<b>Доступні команди:</b>
/addproject - Додати новий проєкт
/listprojects - Показати всі проєкти
/listleads - Показати запити на код проєктів
/help - Показати цю довідку

<b>Як додати проєкт:</b>
1. Натисніть /addproject
2. Введіть назву проєкту
3. Введіть опис проєкту
4. Введіть код проєкту
5. Відправте зображення (або /skip)
6. Підтвердіть створення

Або використовуйте швидкий формат:
<b>Назва|Опис|Код</b>
      `

      await sendTelegramMessage(chatId, helpText)
      return NextResponse.json({ ok: true })
    }

    // Handle add project command
    if (text === '/addproject') {
      userStates.set(userId, { step: 'title', data: {} })
      await sendTelegramMessage(chatId, '📝 <b>Додавання нового проєкту</b>\n\nВведіть назву проєкту:')
      return NextResponse.json({ ok: true })
    }

    // Handle list projects command
    if (text === '/listprojects') {
      try {
        const projects = await getProjects()
        
        if (projects.length === 0) {
          await sendTelegramMessage(chatId, '📝 Поки що немає проєктів.')
          return NextResponse.json({ ok: true })
        }

        let message = '📚 <b>Останні проєкти:</b>\n\n'
        projects.forEach((project, index) => {
          message += `${index + 1}. <b>${escapeHtml(project.title)}</b>\n`
          message += `   ${escapeHtml(project.description)}\n`
          message += `   📅 ${new Date(project.createdAt).toLocaleDateString('uk-UA')}\n\n`
        })

        await sendTelegramMessage(chatId, message)
        return NextResponse.json({ ok: true })
      } catch (error) {
        console.error('Error getting projects:', error)
        await sendTelegramMessage(chatId, '❌ Помилка при отриманні списку проєктів.')
        return NextResponse.json({ ok: true })
      }
    }

    // Handle list leads command
    if (text === '/listleads') {
      try {
        const leads = await getLeads()
        
        if (leads.length === 0) {
          await sendTelegramMessage(chatId, '📝 Поки що немає запитів на код проєктів.')
          return NextResponse.json({ ok: true })
        }

        let message = '🔓 <b>Останні запити на код проєктів:</b>\n\n'
        leads.forEach((lead, index) => {
          message += `${index + 1}. <b>${escapeHtml(lead.name)}</b>\n`
          message += `   📞 ${escapeHtml(lead.phone)}\n`
          message += `   📅 ${new Date(lead.lastActivity).toLocaleDateString('uk-UA')}\n`
          
          if (lead.interestedProjects && lead.interestedProjects.length > 0) {
            message += `   🎯 Проєкти: `
            const projectTitles = lead.interestedProjects.map(p => escapeHtml(p.projectTitle)).join(', ')
            message += projectTitles + '\n'
          }
          message += '\n'
        })

        await sendTelegramMessage(chatId, message)
        return NextResponse.json({ ok: true })
      } catch (error) {
        console.error('Error getting leads:', error)
        await sendTelegramMessage(chatId, '❌ Помилка при отриманні списку запитів.')
        return NextResponse.json({ ok: true })
      }
    }

    // Handle photo uploads
    if (photo && photo.length > 0) {
      const userState = userStates.get(userId)
      
      if (!userState || userState.step !== 'image') {
        await sendTelegramMessage(chatId, 'Спочатку використовуйте /addproject для початку додавання проєкту.')
        return NextResponse.json({ ok: true })
      }

      try {
        console.log('📸 Processing photo upload...')
        
        // Get the largest photo size
        const photoObj = photo[photo.length - 1]
        const fileId = photoObj.file_id
        
        console.log('📁 File ID:', fileId)
        
        // Get file info and download
        const fileInfo = await getTelegramFile(fileId)
        console.log('📋 File info:', fileInfo)
        
        const imageBuffer = await downloadTelegramFile(fileInfo.file_path)
        console.log('📦 Image buffer size:', imageBuffer.byteLength, 'bytes')
        
        // Determine file extension
        const buffer = new Uint8Array(imageBuffer)
        let fileExtension = 'jpg'
        if (buffer[0] === 0x89 && buffer[1] === 0x50) {
          fileExtension = 'png'
        } else if (buffer[0] === 0x47 && buffer[1] === 0x49) {
          fileExtension = 'gif'
        } else if (buffer[0] === 0x52 && buffer[1] === 0x49) {
          fileExtension = 'webp'
        }
        
        console.log('🔍 Detected file type:', fileExtension)
        
        // Upload to our API
        const filename = `project_${Date.now()}.${fileExtension}`
        console.log('📤 Uploading to API...')
        
        const uploadResponse = await uploadImageToAPI(imageBuffer, filename)
        console.log('📥 Upload response:', uploadResponse)
        
        if (uploadResponse.success) {
          userState.data.imageUrl = uploadResponse.imageUrl
          userState.step = 'confirm'
          
          const confirmText = `
📝 <b>Підтвердження проєкту:</b>

<b>Назва:</b> ${escapeHtml(userState.data.title)}
<b>Опис:</b> ${escapeHtml(userState.data.description)}
<b>Код:</b> ${escapeHtml(userState.data.code.substring(0, 100))}${userState.data.code.length > 100 ? '...' : ''}
<b>Зображення:</b> ✅ Завантажено

Натисніть /confirm для створення або /cancel для скасування.
          `
          
          await sendTelegramMessage(chatId, confirmText)
        } else {
          console.error('❌ Upload failed:', uploadResponse)
          await sendTelegramMessage(chatId, `❌ Помилка при завантаженні зображення: ${uploadResponse.error}. Спробуйте ще раз або пропустіть крок з /skip`)
        }
      } catch (error) {
        console.error('❌ Photo upload error:', error)
        
        let errorMessage = '❌ Помилка при завантаженні зображення.'
        
        if (error.message.includes('ECONNREFUSED')) {
          errorMessage += ' Сервер недоступний.'
        } else if (error.message.includes('ETIMEDOUT')) {
          errorMessage += ' Час очікування вичерпано. Спробуйте ще раз.'
        } else {
          errorMessage += ` ${error.message}`
        }
        
        errorMessage += ' Спробуйте ще раз або пропустіть крок з /skip'
        
        await sendTelegramMessage(chatId, errorMessage)
      }
      
      return NextResponse.json({ ok: true })
    }

    // Handle text messages
    if (text && !text.startsWith('/')) {
      const userState = userStates.get(userId)
      
      // Handle quick format: "Title|Description|Code"
      if (text.includes('|') && text.split('|').length === 3) {
        const [title, description, code] = text.split('|').map(s => s.trim())
        
        if (title && description && code) {
          try {
            const result = await createProject({ title, description, code })
            
            if (result?.insertedId) {
              await sendTelegramMessage(chatId, 
                `✅ <b>Проєкт успішно створено!</b>\n\n` +
                `📝 <b>Назва:</b> ${escapeHtml(title)}\n` +
                `📄 <b>Опис:</b> ${escapeHtml(description)}\n` +
                `💻 <b>Код:</b> ${escapeHtml(code.substring(0, 100))}${code.length > 100 ? '...' : ''}`
              )
            } else {
              await sendTelegramMessage(chatId, '❌ Помилка при створенні проєкту: неможливо вставити документ')
            }
          } catch (error) {
            console.error('Error creating project:', error)
            await sendTelegramMessage(chatId, `❌ Помилка при створенні проєкту: ${error.message}`)
          }
          
          userStates.delete(userId)
          return NextResponse.json({ ok: true })
        }
      }

      // Handle conversation flow
      if (!userState) {
        await sendTelegramMessage(chatId, 'Використовуйте /addproject для початку додавання проєкту.')
        return NextResponse.json({ ok: true })
      }

      switch (userState.step) {
        case 'title':
          userState.data.title = text
          userState.step = 'description'
          await sendTelegramMessage(chatId, '📄 Введіть опис проєкту:')
          break

        case 'description':
          userState.data.description = text
          userState.step = 'code'
          await sendTelegramMessage(chatId, '💻 Введіть код проєкту:')
          break

        case 'code':
          userState.data.code = text
          userState.step = 'image'
          await sendTelegramMessage(chatId, '🖼️ Відправте зображення для проєкту (або /skip щоб пропустити):')
          break

        case 'image':
          await sendTelegramMessage(chatId, 'Будь ласка, відправте зображення або використовуйте /skip')
          break

        default:
          userStates.delete(userId)
          await sendTelegramMessage(chatId, 'Щось пішло не так. Спробуйте /addproject знову.')
      }
      
      return NextResponse.json({ ok: true })
    }

    // Handle confirm command
    if (text === '/confirm') {
      const userState = userStates.get(userId)

      if (!userState || userState.step !== 'confirm') {
        await sendTelegramMessage(chatId, 'Немає проєкту для підтвердження.')
        return NextResponse.json({ ok: true })
      }

      try {
        const result = await createProject(userState.data)
        
        if (result?.insertedId) {
          await sendTelegramMessage(chatId, 
            `✅ <b>Проєкт успішно створено!</b>\n\n` +
            `📝 <b>Назва:</b> ${escapeHtml(userState.data.title)}\n` +
            `📄 <b>Опис:</b> ${escapeHtml(userState.data.description)}\n` +
            `💻 <b>Код:</b> ${escapeHtml(userState.data.code.substring(0, 100))}${userState.data.code.length > 100 ? '...' : ''}`
          )
        } else {
          await sendTelegramMessage(chatId, '❌ Помилка при створенні проєкту: неможливо вставити документ')
        }
      } catch (error) {
        console.error('Error creating project:', error)
        await sendTelegramMessage(chatId, `❌ Помилка при створенні проєкту: ${error.message}`)
      }
      
      userStates.delete(userId)
      return NextResponse.json({ ok: true })
    }

    // Handle skip command
    if (text === '/skip') {
      const userState = userStates.get(userId)

      if (!userState || userState.step !== 'image') {
        await sendTelegramMessage(chatId, 'Немає зображення для пропуску.')
        return NextResponse.json({ ok: true })
      }

      userState.step = 'confirm'
      
      const confirmText = `
📝 <b>Підтвердження проєкту:</b>

<b>Назва:</b> ${escapeHtml(userState.data.title)}
<b>Опис:</b> ${escapeHtml(userState.data.description)}
<b>Код:</b> ${escapeHtml(userState.data.code.substring(0, 100))}${userState.data.code.length > 100 ? '...' : ''}
<b>Зображення:</b> ❌ Пропущено

Натисніть /confirm для створення або /cancel для скасування.
      `
      
      await sendTelegramMessage(chatId, confirmText)
      return NextResponse.json({ ok: true })
    }

    // Handle cancel command
    if (text === '/cancel') {
      userStates.delete(userId)
      await sendTelegramMessage(chatId, '❌ Додавання проєкту скасовано.')
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ ok: true })
  }
}
