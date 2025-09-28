#!/usr/bin/env node

const https = require('https');
const http = require('http');

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function setupWebhook() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN_PROJECTS || process.env.TELEGRAM_BOT_TOKEN;
  const webhookUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/telegram/webhook`
    : process.env.API_BASE_URL 
    ? `${process.env.API_BASE_URL}/api/telegram/webhook`
    : 'http://localhost:3000/api/telegram/webhook';

  if (!botToken) {
    console.error('❌ TELEGRAM_BOT_TOKEN_PROJECTS not configured');
    process.exit(1);
  }

  console.log('🤖 Setting up Telegram webhook...');
  console.log('🔗 Webhook URL:', webhookUrl);

  try {
    // Set webhook
    const response = await makeRequest(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message', 'photo']
      })
    });

    if (response.status === 200 && response.data.ok) {
      console.log('✅ Webhook set successfully!');
      
      // Get webhook info
      const infoResponse = await makeRequest(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
      
      if (infoResponse.status === 200 && infoResponse.data.ok) {
        console.log('📊 Webhook info:');
        console.log('   URL:', infoResponse.data.result.url);
        console.log('   Pending updates:', infoResponse.data.result.pending_update_count);
        console.log('   Last error:', infoResponse.data.result.last_error_message || 'None');
      }
    } else {
      console.error('❌ Failed to set webhook:', response.data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error setting webhook:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  setupWebhook();
}

module.exports = { setupWebhook };
