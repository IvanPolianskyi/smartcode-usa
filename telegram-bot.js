const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Configuration
const BOT_TOKEN = "8112933065:AAGSPHlzAmuwJ2Kvul84E6kci-JY6nLpqW0";
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const AUTHORIZED_USERS = process.env.TELEGRAM_AUTHORIZED_USERS?.split(',') || [];


// Create bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// User states for conversation flow
const userStates = new Map();

// Helper function to check if user is authorized
function isAuthorized(userId) {
    return true;
  return AUTHORIZED_USERS.length === 0 || AUTHORIZED_USERS.includes(userId.toString());
}

// Helper function to send API request
async function sendToAPI(endpoint, data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/${endpoint}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || error.message 
    };
  }
}

// Start command
bot.onText(/\/start|\/help/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!isAuthorized(userId)) {
    bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
    return;
  }

  const helpText = `
🤖 <b>SmartCode Academy Projects Bot</b>

<b>Доступні команди:</b>
/addproject - Додати новий проєкт
/listprojects - Показати всі проєкти
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

  bot.sendMessage(chatId, helpText, { parse_mode: 'HTML' });
});

// Add project command
bot.onText(/\/addproject/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!isAuthorized(userId)) {
    bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
    return;
  }

  userStates.set(userId, { step: 'title', data: {} });
  bot.sendMessage(chatId, '📝 <b>Додавання нового проєкту</b>\n\nВведіть назву проєкту:', { parse_mode: 'HTML' });
});

// List projects command
bot.onText(/\/listprojects/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!isAuthorized(userId)) {
    bot.sendMessage(chatId, '❌ Ви не маєте дозволу використовувати цього бота.');
    return;
  }

  const result = await sendToAPI('projects', {});
  
  if (result.success && result.data.projects) {
    const projects = result.data.projects;
    
    if (projects.length === 0) {
      bot.sendMessage(chatId, '📝 Поки що немає проєктів.');
      return;
    }

    let message = '📚 <b>Останні проєкти:</b>\n\n';
    projects.slice(0, 10).forEach((project, index) => {
      message += `${index + 1}. <b>${project.title}</b>\n`;
      message += `   ${project.description}\n`;
      message += `   📅 ${new Date(project.createdAt).toLocaleDateString('uk-UA')}\n\n`;
    });

    bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  } else {
    bot.sendMessage(chatId, '❌ Помилка при отриманні списку проєктів.');
  }
});

// Handle photo uploads
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!isAuthorized(userId)) return;

  const userState = userStates.get(userId);
  
  if (!userState || userState.step !== 'image') {
    bot.sendMessage(chatId, 'Спочатку використовуйте /addproject для початку додавання проєкту.');
    return;
  }

  try {
    console.log('📸 Processing photo upload...');
    
    // Get the largest photo size
    const photo = msg.photo[msg.photo.length - 1];
    const fileId = photo.file_id;
    
    console.log('📁 File ID:', fileId);
    
    // Get file info
    const fileInfo = await bot.getFile(fileId);
    console.log('📋 File info:', fileInfo);
    
    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileInfo.file_path}`;
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
    const uploadResponse = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
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
      
      bot.sendMessage(chatId, confirmText, { parse_mode: 'HTML' });
    } else {
      console.error('❌ Upload failed:', uploadResponse.data);
      bot.sendMessage(chatId, `❌ Помилка при завантаженні зображення: ${uploadResponse.data.error}. Спробуйте ще раз або пропустіть крок з /skip`);
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
    
    bot.sendMessage(chatId, errorMessage);
  }
});

// Handle conversation flow
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text?.trim();

  if (!text || text.startsWith('/')) return;
  if (!isAuthorized(userId)) return;

  const userState = userStates.get(userId);
  
  // Handle quick format: "Title|Description|Code"
  if (text.includes('|') && text.split('|').length === 3) {
    const [title, description, code] = text.split('|').map(s => s.trim());
    
    if (title && description && code) {
      await createProject(chatId, { title, description, code });
      userStates.delete(userId);
      return;
    }
  }

  // Handle conversation flow
  if (!userState) {
    bot.sendMessage(chatId, 'Використовуйте /addproject для початку додавання проєкту.');
    return;
  }

  switch (userState.step) {
    case 'title':
      userState.data.title = text;
      userState.step = 'description';
      bot.sendMessage(chatId, '📄 Введіть опис проєкту:');
      break;

    case 'description':
      userState.data.description = text;
      userState.step = 'code';
      bot.sendMessage(chatId, '💻 Введіть код проєкту:');
      break;

    case 'code':
      userState.data.code = text;
      userState.step = 'image';
      bot.sendMessage(chatId, '🖼️ Відправте зображення для проєкту (або /skip щоб пропустити):');
      break;

    case 'image':
      // This should be handled by the photo handler above
      bot.sendMessage(chatId, 'Будь ласка, відправте зображення або використовуйте /skip');
      break;

    default:
      userStates.delete(userId);
      bot.sendMessage(chatId, 'Щось пішло не так. Спробуйте /addproject знову.');
  }
});

// Confirm command
bot.onText(/\/confirm/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userState = userStates.get(userId);

  if (!userState || userState.step !== 'confirm') {
    bot.sendMessage(chatId, 'Немає проєкту для підтвердження.');
    return;
  }

  await createProject(chatId, userState.data);
  userStates.delete(userId);
});

// Skip image command
bot.onText(/\/skip/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userState = userStates.get(userId);

  if (!userState || userState.step !== 'image') {
    bot.sendMessage(chatId, 'Немає зображення для пропуску.');
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
  
  bot.sendMessage(chatId, confirmText, { parse_mode: 'HTML' });
});

// Cancel command
bot.onText(/\/cancel/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  userStates.delete(userId);
  bot.sendMessage(chatId, '❌ Додавання проєкту скасовано.');
});

// Create project function
async function createProject(chatId, projectData) {
  const result = await sendToAPI('projects', {
    title: projectData.title,
    description: projectData.description,
    code: projectData.code,
    studentName: 'Student', // You can modify this
    imageUrl: projectData.imageUrl || null,
    status: 'published'
  });

  if (result.success) {
    bot.sendMessage(chatId, 
      `✅ <b>Проєкт успішно створено!</b>\n\n` +
      `📝 <b>Назва:</b> ${projectData.title}\n` +
      `📄 <b>Опис:</b> ${projectData.description}\n` +
      `💻 <b>Код:</b> ${projectData.code.substring(0, 100)}${projectData.code.length > 100 ? '...' : ''}`,
      { parse_mode: 'HTML' }
    );
  } else {
    bot.sendMessage(chatId, `❌ Помилка при створенні проєкту: ${result.error}`);
  }
}

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

console.log('🤖 Telegram bot started successfully!');
console.log(`📡 API Base URL: ${API_BASE_URL}`);
console.log(`👥 Authorized users: ${AUTHORIZED_USERS.length > 0 ? AUTHORIZED_USERS.join(', ') : 'All users'}`);
