// Next.js instrumentation hook (runs on server startup)
// Must live at the project root and use ESM exports

import telegramBotService from './src/lib/telegramBot.js'

async function startBotIfNeeded() {
  try {
    const status = telegramBotService.getStatus()
    if (!status.isRunning) {
      await telegramBotService.start()
    }
  } catch (error) {
    console.error('Failed to start Telegram bot in instrumentation:', error)
  }
}

export async function register() {
  await startBotIfNeeded()
}


