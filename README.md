This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or1  2 3 4 5 6  7 8 9 10 11 12 13 14 15 16 17 18 19 20
bun dev
``` 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Telegram Bot Integration

The application includes two types of Telegram bot functionality:

### 1. Main Project Management Bot
A comprehensive bot that handles project management and starts automatically with the application.

**Features:**
- Add new projects via `/addproject` command
- List all projects via `/listprojects` command  
- List project source code requests via `/listleads` command
- Handle project image uploads
- Quick project creation with format: `Title|Description|Code`

**Setup:**
1. Create a Telegram bot via BotFather and get the bot token
2. Create a `.env.local` file and set:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
TELEGRAM_AUTHORIZED_USERS=user_id_1,user_id_2
API_BASE_URL=http://localhost:3000
# Захист пробних форм (обов'язково на проді): openssl rand -hex 32
LEAD_FORM_SIGNING_SECRET=your_random_secret_here
# Для серверних викликів /api/telegram (реєстрація по рефералу)
INTERNAL_LEAD_SECRET=another_random_secret_here
```

3. Start the application: `npm run start` (bot starts automatically)

### 2. Notification Bot
Sends notifications for contact form submissions and project source code requests.

**Features:**
- Sends notifications when contact forms are submitted
- Sends notifications when users request project source code
- Uses the same bot token as the main bot

**API Endpoints:**
- `/api/telegram` - Contact form notifications
- `/api/phone-collection` - Project source code request notifications
- `/api/telegram/init` - Bot management (start/stop/status)

### Running the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm run start
```

The Telegram bot will start automatically when you run `npm run start`. For development, you can still use `npm run dev` but the bot won't start automatically (you can manually trigger it via the API).
