/**
 * Lesson 09-2: Додаткові інструменти: BeautifulSoup
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_09_2 = {
  lessonId: "lesson-09-2",
  moduleId: "module-09",
  order: 2,
  title: "Додаткові інструменти: BeautifulSoup",

  learningObjectives: [
    "Дізнатися про BeautifulSoup та його роль у веб-скрапінгу",
    "Розрізняти HTML-парсинг і роботу з JSON API",
    "Використовувати find та find_all для пошуку елементів",
    "Обирати правильний інструмент для задачі"
  ],

  prerequisites: ["lesson-09-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке BeautifulSoup?",
        content: `**BeautifulSoup** (пакет \`beautifulsoup4\`) - бібліотека для парсингу HTML і XML у Python. Вона перетворює «сирі» рядки HTML у зручне дерево DOM, по якому можна шукати теги, класи та атрибути.

**Навіщо вона потрібна:**

- Сайти без публічного API часто віддають дані лише в HTML
- HTML на реальних сторінках буває «ламаним» - BeautifulSoup намагається його виправити
- API \`find\` / \`find_all\` читабельніший, ніж складні регулярні вирази по всьому документу

**Встановлення:**

\`\`\`bash
pip install beautifulsoup4
# опційно, швидший парсер:
pip install lxml
\`\`\`

\`\`\`python
from bs4 import BeautifulSoup
\`\`\`

**У цьому курсі:** основний фокус - \`requests\` + JSON API (простіше і стабільніше). BeautifulSoup - додатковий інструмент, коли API немає або дані лише на сторінці.`
      },
      {
        title: "Перший парсинг HTML",
        content: `**Мінімальний приклад** (HTML з рядка або з \`requests\`):

\`\`\`python
from bs4 import BeautifulSoup
import requests

url = "https://example.com"
response = requests.get(url, timeout=10)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")
print(soup.title.string)  # текст у <title>
\`\`\`

**Парсери:**

| Парсер | Коли використовувати |
|--------|----------------------|
| \`html.parser\` | Вбудований, без додаткових пакетів |
| \`lxml\` | Швидший, для великих сторінок |

\`\`\`python
soup = BeautifulSoup(html, "lxml")
\`\`\`

**Структура дерева:** кожен тег - вузол; можна переходити \`.parent\`, \`.children\`, \`.next_sibling\`.`
      },
      {
        title: "Пошук елементів: find і find_all",
        content: `**Один елемент** - \`find\` (перший збіг або \`None\`):

\`\`\`python
header = soup.find("h1")
if header:
    print(header.get_text(strip=True))
\`\`\`

**Усі збіги** - \`find_all\` (список):

\`\`\`python
links = soup.find_all("a", href=True)
for link in links:
    print(link["href"], link.get_text(strip=True))
\`\`\`

**За класом або id** (у HTML атрибут \`class\`, у Python - \`class_\`):

\`\`\`python
cards = soup.find_all("div", class_="product-card")
nav = soup.find(id="main-nav")
\`\`\`

**CSS-селектори** через \`select\` / \`select_one\`:

\`\`\`python
prices = soup.select("span.price")
first = soup.select_one("article.post h2")
\`\`\`

**Порада:** спочатку відкрийте сторінку в браузері (DevTools → Elements), знайдіть стабільний селектор, потім перенесіть його в код.`
      },
      {
        title: "Витягування тексту та атрибутів",
        content: `\`\`\`python
# Текст одного елемента (без вкладених тегів окремо - get_text)
paragraph = soup.find("p", class_="lead")
if paragraph:
    print(paragraph.get_text(strip=True))

# Увесь видимий текст сторінки (обережно - багато «шуму»)
all_text = soup.get_text(separator="\\n", strip=True)

# Атрибути
img = soup.find("img")
if img and img.get("src"):
    print(img["src"])
\`\`\`

**Таблиці** часто парсять через \`find("table")\` і рядки \`<tr>\`, або через \`pandas.read_html\` для простих таблиць.

**Кодування:** якщо \`requests\` повертає «кракозябри», перевірте \`response.encoding\` або \`response.apparent_encoding\`.`
      },
      {
        title: "BeautifulSoup vs JSON API vs regex",
        content: `| Підхід | Плюси | Мінуси |
|--------|-------|--------|
| **JSON API** | Стабільний контракт, швидко | Не завжди є |
| **BeautifulSoup** | Гнучкий парсинг HTML | Ламається при зміні верстки |
| **regex** | Для дрібних фрагментів | Погано масштабується на весь HTML |

**Правило:** якщо є офіційне API - використовуйте його. BeautifulSoup - коли дані лише в HTML і це дозволено правилами сайту (\`robots.txt\`, ToS).

\`\`\`python
# Погано: парсити JSON через BeautifulSoup
# Добре:
data = response.json()
\`\`\``
      },
      {
        title: "Етика та обмеження",
        content: `Перед скрапінгом перевірте:

1. **robots.txt** - \`https://site.com/robots.txt\`
2. **Умови використання** сайту
3. **Навантаження** - паузи між запитами (\`time.sleep\`), не DDoS
4. **Заголовок User-Agent** - чесно вказуйте бота або скрипт навчання

\`\`\`python
import time
import requests

headers = {"User-Agent": "SmartCode-Learning-Bot/1.0"}
for url in urls:
    r = requests.get(url, headers=headers, timeout=10)
    # обробка...
    time.sleep(1)  # пауза між запитами
\`\`\`

Динамічні сторінки (контент після JavaScript) BeautifulSoup **не** виконає - потрібні інші інструменти (Selenium, Playwright); у базовому курсі ми їх не розглядаємо.`
      },
      {
        title: "Підсумок",
        content: `BeautifulSoup доповнює \`requests\`, коли потрібно витягнути дані з HTML:

- \`BeautifulSoup(html, "html.parser")\` - дерево документа
- \`find\` / \`find_all\` / \`select\` - пошук елементів
- \`get_text(strip=True)\` - чистий текст
- JSON API залишається пріоритетом, якщо він доступний

У наступних уроках модуля 9 ви застосуєте \`requests\` для повноцінного скрапінгу та збереження даних.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Заголовок сторінки",
      code: `from bs4 import BeautifulSoup
import requests

r = requests.get("https://example.com", timeout=10)
soup = BeautifulSoup(r.text, "html.parser")
print(soup.title.string)`,
      explanation: "Отримуємо HTML і читаємо вміст тега title."
    },
    {
      title: "Усі посилання",
      code: `links = soup.find_all("a", href=True)
for a in links[:5]:
    print(a["href"])`,
      explanation: "find_all з href=True відсікає теги без атрибута href."
    },
    {
      title: "CSS-селектор",
      code: `items = soup.select("ul.menu li a")
for item in items:
    print(item.get_text(strip=True))`,
      explanation: "select працює як у CSS - зручно для вкладених структур."
    }
  ],

  commonMistakes: [
    {
      mistake: "Парсити JSON-відповідь через BeautifulSoup",
      explanation: "API повертає application/json, не HTML.",
      correctApproach: "Використовуйте response.json() для API."
    },
    {
      mistake: "Не перевіряти результат find",
      explanation: "find повертає None, якщо елемент не знайдено - буде AttributeError.",
      correctApproach: "if element: ... або element = soup.find(...) or default"
    },
    {
      mistake: "Скрапити без пауз і без перевірки robots.txt",
      explanation: "Можна перевантажити сервер або порушити правила сайту.",
      correctApproach: "Читайте robots.txt, додавайте затримки між запитами."
    },
    {
      mistake: "Очікувати, що BeautifulSoup виконає JavaScript",
      explanation: "Бібліотека бачить лише статичний HTML з відповіді requests.",
      correctApproach: "Для SPA потрібні браузерні інструменти або готове API."
    }
  ],

  summary: `BeautifulSoup - зручний парсер HTML для веб-скрапінгу, коли JSON API недоступний. У курсі пріоритет - requests + API; Soup - додатковий інструмент для розуміння повного стеку збору даних.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який пакет встановлюють для BeautifulSoup?",
        options: [
          "beautifulsoup4",
          "beautifulsoup",
          "bs4-only",
          "html5lib-only без bs4"
        ],
        correctAnswer: 0,
        explanation: "На PyPI пакет називається beautifulsoup4, імпорт - from bs4 import BeautifulSoup."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає find(), якщо елемент не знайдено?",
        options: [
          "None",
          "Порожній список",
          "Виняток ValueError",
          "Порожній рядок"
        ],
        correctAnswer: 0,
        explanation: "find повертає None; find_all - порожній список."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як шукати за CSS-селектором у BeautifulSoup?",
        options: [
          "soup.select('.class')",
          "soup.find(css='.class')",
          "soup.regex('.class')",
          "soup.get_css('.class')"
        ],
        correctAnswer: 0,
        explanation: "Методи select та select_one приймають CSS-селектори."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати JSON API замість BeautifulSoup?",
        options: [
          "Коли сайт офіційно надає структуроване API",
          "Коли HTML дуже великий",
          "Коли потрібен лише заголовок title",
          "Ніколи - Soup завжди кращий"
        ],
        correctAnswer: 0,
        explanation: "API стабільніший і простіший у підтримці, ніж парсинг верстки."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "BeautifulSoup виконує JavaScript на сторінці перед парсингом.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Обробляється лише HTML, який повернув HTTP-запит (наприклад через requests)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
