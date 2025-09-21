const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const telegramBotService = require('./src/lib/telegramBot')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

// Create Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  // Start the Telegram bot
  console.log('🚀 Starting Next.js application...')
  
  try {
    await telegramBotService.start()
    console.log('✅ Telegram bot initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize Telegram bot:', error)
    // Don't exit the process, just log the error
  }

  // Create HTTP server
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // Graceful shutdown
  const gracefulShutdown = async () => {
    console.log('🛑 Shutting down gracefully...')
    
    try {
      await telegramBotService.stop()
      console.log('✅ Telegram bot stopped')
    } catch (error) {
      console.error('❌ Error stopping bot:', error)
    }

    server.close(() => {
      console.log('✅ Server closed')
      process.exit(0)
    })
  }

  // Handle shutdown signals
  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)

  // Start the server
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Environment: ${dev ? 'development' : 'production'}`)
  })
})

