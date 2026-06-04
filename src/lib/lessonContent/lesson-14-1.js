/**
 * Lesson 14-1: Telegram Bot API: токен і перші запити
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_1 = {
  lessonId: "lesson-14-1",
  moduleId: "module-14",
  order: 1,
  title: "Telegram Bot API: токен і перші запити",

  learningObjectives: [
    "Створити бота через @BotFather",
    "Зберігати токен у змінних оточення",
    "Надсилати повідомлення через HTTP API",
    "Отримувати оновлення getUpdates",
    "Розуміти різницю між polling і webhook"
  ],

  prerequisites: ["lesson-13-5"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке Telegram-бот",
        content: `**Telegram-бот** - спеціальний акаунт, яким керує ваш код через **Bot API**, а не людина вручну.

**Створення бота:**

1. Відкрийте [@BotFather](https://t.me/BotFather) у Telegram
2. Команда \`/newbot\` - ім'я для людей та **username** (обов'язково закінчується на \`bot\`, наприклад \`my_helper_bot\`)
3. BotFather видасть **токен** виду \`123456789:AAH...\` - це секретний ключ до API

**Команди BotFather, які знадобляться:**

- \`/mybots\` - список ваших ботів, зміна опису, аватара
- \`/setcommands\` - меню команд у клієнті Telegram
- \`/revoke\` - скасувати токен, якщо він засвітився

**Ніколи не публікуйте токен** у GitHub, скріншотах чи чатах. Хто має токен - керує ботом повністю.`
      },
      {
        title: "Безпечне зберігання токена",
        content: `Файл \`.env\` у корені проєкту (додайте \`.env\` у \`.gitignore\`):

\`\`\`
TELEGRAM_BOT_TOKEN=123456789:AAHxxxxxxxx
\`\`\`

\`\`\`python
import os
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if not TOKEN:
    raise RuntimeError("Задайте TELEGRAM_BOT_TOKEN у .env")
\`\`\`

\`\`\`bash
pip install python-dotenv requests
\`\`\`

**На продакшені** (хостинг, VPS) токен задають у панелі як **secret / environment variable**, не в коді.`
      },
      {
        title: "Як працює Bot API",
        content: `Усі методи - **HTTPS-запити** до:

\`https://api.telegram.org/bot<TOKEN>/<METHOD>\`

Відповідь завжди JSON:

\`\`\`json
{"ok": true, "result": { ... }}
\`\`\`

або при помилці:

\`\`\`json
{"ok": false, "description": "Bad Request: chat not found"}
\`\`\`

**Основні поняття:**

| Термін | Значення |
|--------|----------|
| **chat_id** | Числовий id чату (користувач, група, канал) |
| **Update** | Подія: нове повідомлення, натискання кнопки тощо |
| **message** | Об'єкт повідомлення всередині Update |

**Два способи отримувати Update:**

1. **Polling** - ваш скрипт періодично викликає \`getUpdates\` (простіше для навчання)
2. **Webhook** - Telegram сам надсилає POST на ваш HTTPS-сервер (модуль 15)`
      },
      {
        title: "sendMessage - перше повідомлення",
        content: `\`\`\`python
import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

def api(method: str, **params):
    url = f"https://api.telegram.org/bot{TOKEN}/{method}"
    r = requests.post(url, json=params, timeout=30)
    r.raise_for_status()
    data = r.json()
    if not data.get("ok"):
        raise RuntimeError(data.get("description", "API error"))
    return data["result"]

# CHAT_ID дізнаємось з getUpdates (наступний розділ)
CHAT_ID = 123456789

api("sendMessage", chat_id=CHAT_ID, text="Привіт з Python!")
\`\`\`

**Параметри sendMessage (корисні):**

- \`parse_mode\` - \`"HTML"\` або \`"MarkdownV2"\` для форматування
- \`reply_markup\` - клавіатура (урок 14-3)
- \`disable_notification\` - тихе повідомлення`
      },
      {
        title: "getUpdates та chat_id",
        content: `**Алгоритм для першого тесту:**

1. Запустіть бота (напишіть йому \`/start\` у Telegram)
2. Викличте \`getUpdates\`
3. Знайдіть \`result[].message.chat.id\`

\`\`\`python
import json

updates = api("getUpdates")
print(json.dumps(updates, indent=2, ensure_ascii=False))

for u in updates:
    msg = u.get("message") or u.get("edited_message")
    if msg:
        chat = msg["chat"]
        print("chat_id:", chat["id"], "ім'я:", chat.get("first_name"))
\`\`\`

**Offset (важливо для polling):** після обробки оновлення передайте \`offset = update_id + 1\`, щоб не отримувати те саме знову:

\`\`\`python
last_id = 0
while True:
    updates = api("getUpdates", offset=last_id, timeout=30)
    for u in updates:
        last_id = u["update_id"] + 1
        # обробка u
\`\`\`

У продакшені зручніше бібліотека **python-telegram-bot** (урок 14-2), яка робить це за вас.`
      },
      {
        title: "Інші корисні методи API",
        content: `\`\`\`python
# Інформація про бота
me = api("getMe")
print(me["username"])

# Видалити webhook перед polling (якщо раніше налаштовували webhook)
api("deleteWebhook")

# Встановити команди меню
api("setMyCommands", commands=[
    {"command": "start", "description": "Початок"},
    {"command": "help", "description": "Допомога"},
])
\`\`\`

**Обмеження (орієнтовно):**

- Не більше ~30 повідомлень на секунду в один чат
- Довжина тексту до 4096 символів
- Файли - окремі методи (\`sendDocument\`, \`sendPhoto\`)

Повний список: [документація Bot API](https://core.telegram.org/bots/api).`
      },
      {
        title: "Підсумок",
        content: `Ви створили бота в BotFather, навчилися зберігати токен у \`.env\`, викликати \`sendMessage\` та \`getUpdates\` через \`requests\`.

**Далі:** урок 14-2 - бібліотека python-telegram-bot з async handlers і \`run_polling()\`, без ручного циклу getUpdates.`
      }
    ]
  },

  codeExamples: [
    {
      title: "getUpdates",
      code: `import os, requests
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
r = requests.get(
    f"https://api.telegram.org/bot{TOKEN}/getUpdates",
    timeout=30,
)
print(r.json())`,
      explanation: "Показує останні повідомлення користувачів боту - звідси беруть chat_id."
    },
    {
      title: "Обгортка api()",
      code: `def api(method, **params):
    url = f"https://api.telegram.org/bot{TOKEN}/{method}"
    data = requests.post(url, json=params, timeout=30).json()
    if not data.get("ok"):
        raise RuntimeError(data["description"])
    return data["result"]`,
      explanation: "Єдине місце для перевірки ok та обробки помилок API."
    }
  ],

  commonMistakes: [
    {
      mistake: "Токен у коді або в README",
      explanation: "Потрапляє в git історію назавжди.",
      correctApproach: "Тільки .env / secrets; при витоку - /revoke у BotFather."
    },
    {
      mistake: "Викликати sendMessage без chat_id",
      explanation: "API поверне 'chat not found'.",
      correctApproach: "Спочатку getUpdates після повідомлення боту від себе."
    },
    {
      mistake: "Polling без offset",
      explanation: "Одні й ті самі Update приходять знову.",
      correctApproach: "Передавайте offset = update_id + 1 після кожної обробки."
    },
    {
      mistake: "Забути deleteWebhook перед getUpdates",
      explanation: "Якщо webhook активний, getUpdates може бути порожнім.",
      correctApproach: "deleteWebhook, потім polling або бібліотека PTB."
    }
  ],

  summary: `Bot API - HTTP JSON до api.telegram.org. Токен з BotFather зберігають у .env. sendMessage надсилає текст, getUpdates + offset отримує події. Далі - python-telegram-bot.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де безпечно зберігати токен бота?",
        options: ["У .env файлі (не в git)", "У README", "У коментарі коду", "У назві змінної в коді"],
        correctAnswer: 0,
        explanation: "Секрети - лише в оточенні або .env з .gitignore."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод надсилає текст користувачу?",
        options: ["sendMessage", "getUpdates", "deleteWebhook", "getMe"],
        correctAnswer: 0,
        explanation: "sendMessage доставляє повідомлення в чат за chat_id."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Звідки взяти chat_id для особистого чату з ботом?",
        options: [
          "З getUpdates після того, як ви написали боту",
          "З імені файлу main.py",
          "З pip list",
          "BotFather надсилає chat_id у /newbot"
        ],
        correctAnswer: 0,
        explanation: "chat_id з'являється в message.chat.id у відповіді getUpdates."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо передають offset у getUpdates?",
        options: [
          "Щоб не отримувати вже оброблені оновлення",
          "Щоб прискорити інтернет",
          "Щоб змінити токен",
          "Щоб увімкнути HTML у повідомленнях"
        ],
        correctAnswer: 0,
        explanation: "offset = last_update_id + 1 позначає, що попередні Update вже прочитані."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Токен бота можна безпечно публікувати в соцмережах.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - токен дає повний контроль над ботом; при витоку зробіть revoke."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
