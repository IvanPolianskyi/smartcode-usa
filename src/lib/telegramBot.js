const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

class TelegramBotService {
  constructor() {
    this.bot = null;
    this.isRunning = false;
    this.userStates = new Map();
    
    // Configuration
    this.BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || "8112933065:AAGSPHlzAmuwJ2Kvul84E6kci-JY6nLpqW0";
    this.API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
    this.AUTHORIZED_USERS = process.env.TELEGRAM_AUTHORIZED_USERS?.split(',') || [];
  }

  // Helper function to check if user is authorized
  isAuthorized(userId) {
    return true;
    // return this.AUTHORIZED_USERS.length === 0 || this.AUTHORIZED_USERS.includes(userId.toString());
  }

  // Helper function to send API request
  async sendToAPI(endpoint, data) {
    try {
      const response = await axios.post(`${this.API_BASE_URL}/api/${endpoint}`, data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.error || error.message 
      };
    }
  }

  // Create project function (direct DB insert to avoid self-HTTP calls)
  async createProject(chatId, projectData) {
    try {
      const { getCollection } = await import('./mongodb.js')
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

      if (result?.insertedId) {
        this.bot.sendMessage(
          chatId,
          `✅ <b>Проєкт успішно створено!</b>\n\n` +
            `📝 <b>Назва:</b> ${projectData.title}\n` +
            `📄 <b>Опис:</b> ${projectData.description}\n` +
            `💻 <b>Код:</b> ${projectData.code.substring(0, 100)}${projectData.code.length > 100 ? '...' : ''}`,
          { parse_mode: 'HTML' }
        )
      } else {
        this.bot.sendMessage(chatId, '❌ Помилка при створенні проєкту: неможливо вставити документ')
      }
    } catch (error) {
      console.error('DB insert error (createProject):', error)
      this.bot.sendMessage(chatId, `❌ Помилка при створенні проєкту: ${error.message || String(error)}`)
    }
  }

  // Setup bot event handlers
  setupEventHandlers() {
    if (!this.bot) return;

    // Start command
    this.bot.onText(/\/start|\/help/, (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      if (!this.isAuthorized(userId)) {
        this.bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
        return;
      }

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
`;

      this.bot.sendMessage(chatId, helpText, { parse_mode: 'HTML' });
    });

    // Add project command
    this.bot.onText(/\/addproject/, (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      if (!this.isAuthorized(userId)) {
        this.bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
        return;
      }

      this.userStates.set(userId, { step: 'title', data: {} });
      this.bot.sendMessage(chatId, '📝 <b>Додавання нового проєкту</b>\n\nВведіть назву проєкту:', { parse_mode: 'HTML' });
    });

    // List projects command
    this.bot.onText(/\/listprojects/, async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      if (!this.isAuthorized(userId)) {
        this.bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
        return;
      }

      const result = await this.sendToAPI('projects', {});
      
      if (result.success && result.data.projects) {
        const projects = result.data.projects;
        
        if (projects.length === 0) {
          this.bot.sendMessage(chatId, '📝 Поки що немає проєктів.');
          return;
        }

        let message = '📚 <b>Останні проєкти:</b>\n\n';
        projects.slice(0, 10).forEach((project, index) => {
          message += `${index + 1}. <b>${project.title}</b>\n`;
          message += `   ${project.description}\n`;
          message += `   📅 ${new Date(project.createdAt).toLocaleDateString('uk-UA')}\n\n`;
        });

        this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      } else {
        this.bot.sendMessage(chatId, '❌ Помилка при отриманні списку проєктів.');
      }
    });

    // List leads command (project source code requests)
    this.bot.onText(/\/listleads/, async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      if (!this.isAuthorized(userId)) {
        this.bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
        return;
      }

      const result = await this.sendToAPI('phone-collection', {});
      
      if (result.success && result.leads) {
        const leads = result.leads;
        
        if (leads.length === 0) {
          this.bot.sendMessage(chatId, '📝 Поки що немає запитів на код проєктів.');
          return;
        }

        let message = '🔓 <b>Останні запити на код проєктів:</b>\n\n';
        leads.slice(0, 10).forEach((lead, index) => {
          message += `${index + 1}. <b>${lead.name}</b>\n`;
          message += `   📞 ${lead.phone}\n`;
          message += `   📅 ${new Date(lead.lastActivity).toLocaleDateString('uk-UA')}\n`;
          
          if (lead.interestedProjects && lead.interestedProjects.length > 0) {
            message += `   🎯 Проєкти: `;
            const projectTitles = lead.interestedProjects.map(p => p.projectTitle).join(', ');
            message += projectTitles + '\n';
          }
          message += '\n';
        });

        this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      } else {
        this.bot.sendMessage(chatId, '❌ Помилка при отриманні списку запитів.');
      }
    });

    // Handle photo uploads
    this.bot.on('photo', async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      if (!this.isAuthorized(userId)) return;

      const userState = this.userStates.get(userId);
      
      if (!userState || userState.step !== 'image') {
        this.bot.sendMessage(chatId, 'Спочатку використовуйте /addproject для початку додавання проєкту.');
        return;
      }

      try {
        console.log('📸 Processing photo upload...');
        
        // Get the largest photo size
        const photo = msg.photo[msg.photo.length - 1];
        const fileId = photo.file_id;
        
        console.log('📁 File ID:', fileId);
        
        // Get file info
        const fileInfo = await this.bot.getFile(fileId);
        console.log('📋 File info:', fileInfo);
        
        const fileUrl = `https://api.telegram.org/file/bot${this.BOT_TOKEN}/${fileInfo.file_path}`;
        console.log('🔗 File URL:', fileUrl);
        
        // Download the image
        console.log('⬇️ Downloading image...');
        const response = await axios.get(fileUrl, { 
          responseType: 'arraybuffer',
          timeout: 30000 // 30 second timeout
        });
        
        const imageBuffer = Buffer.from(response.data);
        console.log('📦 Image buffer size:', imageBuffer.length, 'bytes');
        
        // Determine file extension based on content
        let fileExtension = 'jpg';
        if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50) {
          fileExtension = 'png';
        } else if (imageBuffer[0] === 0x47 && imageBuffer[1] === 0x49) {
          fileExtension = 'gif';
        } else if (imageBuffer[0] === 0x52 && imageBuffer[1] === 0x49) {
          fileExtension = 'webp';
        }
        
        console.log('🔍 Detected file type:', fileExtension);
        
        // Create form data for upload
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('image', imageBuffer, {
          filename: `project_${Date.now()}.${fileExtension}`,
          contentType: `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`
        });
        
        console.log('📤 Uploading to API...');
        
        // Upload to our API
        const uploadResponse = await axios.post(`http://localhost:3000/api/upload`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 30000 // 30 second timeout
        });
        
        console.log('📥 Upload response:', uploadResponse.data);
        
        if (uploadResponse.data.success) {
          userState.data.imageUrl = uploadResponse.data.imageUrl;
          userState.step = 'confirm';
          
          const confirmText = `
📝 <b>Підтвердження проєкту:</b>

<b>Назва:</b> ${userState.data.title}
<b>Опис:</b> ${userState.data.description}
<b>Код:</b> ${userState.data.code.substring(0, 100)}${userState.data.code.length > 100 ? '...' : ''}
<b>Зображення:</b> ✅ Завантажено

Натисніть /confirm для створення або /cancel для скасування.
          `;
          
          this.bot.sendMessage(chatId, confirmText, { parse_mode: 'HTML' });
        } else {
          console.error('❌ Upload failed:', uploadResponse.data);
          this.bot.sendMessage(chatId, `❌ Помилка при завантаженні зображення: ${uploadResponse.data.error}. Спробуйте ще раз або пропустіть крок з /skip`);
        }
      } catch (error) {
        console.error('❌ Photo upload error:', error);
        
        let errorMessage = '❌ Помилка при завантаженні зображення.';
        
        if (error.code === 'ECONNREFUSED') {
          errorMessage += ' Сервер недоступний. Перевірте, чи запущений Next.js сервер.';
        } else if (error.code === 'ETIMEDOUT') {
          errorMessage += ' Час очікування вичерпано. Спробуйте ще раз.';
        } else if (error.response) {
          errorMessage += ` Помилка сервера: ${error.response.data?.error || error.response.statusText}`;
        } else {
          errorMessage += ` ${error.message}`;
        }
        
        errorMessage += ' Спробуйте ще раз або пропустіть крок з /skip';
        
        this.bot.sendMessage(chatId, errorMessage);
      }
    });

    // Handle conversation flow
    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      const text = msg.text?.trim();

      if (!text || text.startsWith('/')) return;
      if (!this.isAuthorized(userId)) return;

      const userState = this.userStates.get(userId);
      
      // Handle quick format: "Title|Description|Code"
      if (text.includes('|') && text.split('|').length === 3) {
        const [title, description, code] = text.split('|').map(s => s.trim());
        
        if (title && description && code) {
          await this.createProject(chatId, { title, description, code });
          this.userStates.delete(userId);
          return;
        }
      }

      // Handle conversation flow
      if (!userState) {
        this.bot.sendMessage(chatId, 'Використовуйте /addproject для початку додавання проєкту.');
        return;
      }

      switch (userState.step) {
        case 'title':
          userState.data.title = text;
          userState.step = 'description';
          this.bot.sendMessage(chatId, '📄 Введіть опис проєкту:');
          break;

        case 'description':
          userState.data.description = text;
          userState.step = 'code';
          this.bot.sendMessage(chatId, '💻 Введіть код проєкту:');
          break;

        case 'code':
          userState.data.code = text;
          userState.step = 'image';
          this.bot.sendMessage(chatId, '🖼️ Відправте зображення для проєкту (або /skip щоб пропустити):');
          break;

        case 'image':
          // This should be handled by the photo handler above
          this.bot.sendMessage(chatId, 'Будь ласка, відправте зображення або використовуйте /skip');
          break;

        default:
          this.userStates.delete(userId);
          this.bot.sendMessage(chatId, 'Щось пішло не так. Спробуйте /addproject знову.');
      }
    });

    // Confirm command
    this.bot.onText(/\/confirm/, async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      const userState = this.userStates.get(userId);

      if (!userState || userState.step !== 'confirm') {
        this.bot.sendMessage(chatId, 'Немає проєкту для підтвердження.');
        return;
      }

      await this.createProject(chatId, userState.data);
      this.userStates.delete(userId);
    });

    // Skip image command
    this.bot.onText(/\/skip/, (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      const userState = this.userStates.get(userId);

      if (!userState || userState.step !== 'image') {
        this.bot.sendMessage(chatId, 'Немає зображення для пропуску.');
        return;
      }

      userState.step = 'confirm';
      
      const confirmText = `
📝 <b>Підтвердження проєкту:</b>

<b>Назва:</b> ${userState.data.title}
<b>Опис:</b> ${userState.data.description}
<b>Код:</b> ${userState.data.code.substring(0, 100)}${userState.data.code.length > 100 ? '...' : ''}
<b>Зображення:</b> ❌ Пропущено

Натисніть /confirm для створення або /cancel для скасування.
      `;
      
      this.bot.sendMessage(chatId, confirmText, { parse_mode: 'HTML' });
    });

    // Cancel command
    this.bot.onText(/\/cancel/, (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      
      this.userStates.delete(userId);
      this.bot.sendMessage(chatId, '❌ Додавання проєкту скасовано.');
    });

    // Error handling
    this.bot.on('polling_error', (error) => {
      console.error('Polling error:', error);
    });

    this.bot.on('error', (error) => {
      console.error('Bot error:', error);
    });
  }

  // Start the bot
  async start() {
    if (this.isRunning || globalThis.__telegramBotStarted) {
      console.log('🤖 Bot is already running');
      return;
    }

    try {
      // Ensure webhook is disabled before starting polling
      try {
        await axios.get(`https://api.telegram.org/bot${this.BOT_TOKEN}/deleteWebhook`);
        console.log('🔌 Telegram webhook deleted (ensuring polling works)');
      } catch (whError) {
        console.warn('⚠️ Could not delete webhook (may be already off):', whError?.response?.data || whError?.message);
      }

      this.bot = new TelegramBot(this.BOT_TOKEN, { polling: { interval: 800, autoStart: true } });
      this.setupEventHandlers();
      this.isRunning = true;
      globalThis.__telegramBotStarted = true;
      
      console.log('🤖 Telegram bot started successfully!');
      console.log(`📡 API Base URL: ${this.API_BASE_URL}`);
      console.log(`👥 Authorized users: ${this.AUTHORIZED_USERS.length > 0 ? this.AUTHORIZED_USERS.join(', ') : 'All users'}`);
    } catch (error) {
      console.error('❌ Failed to start Telegram bot:', error);
      this.isRunning = false;
    }
  }

  // Stop the bot
  async stop() {
    if (!this.isRunning || !this.bot) {
      return;
    }

    try {
      await this.bot.stopPolling();
      this.bot = null;
      this.isRunning = false;
      globalThis.__telegramBotStarted = false;
      console.log('🤖 Telegram bot stopped');
    } catch (error) {
      console.error('❌ Error stopping bot:', error);
    }
  }

  // Get bot status
  getStatus() {
    return {
      isRunning: this.isRunning,
      hasBot: !!this.bot
    };
  }
}

// Create singleton instance
const telegramBotService = new TelegramBotService();

module.exports = telegramBotService;

