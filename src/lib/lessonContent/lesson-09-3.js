/**
 * Lesson 09-3: Скрапінг веб-сайтів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_09_3 = {
  lessonId: "lesson-09-3",
  moduleId: "module-09",
  order: 3,
  title: "Скрапінг веб-сайтів",
  
  learningObjectives: [
    "Створити скрапер для веб-сайту",
    "Обробляти динамічні сторінки",
    "Зберігати отримані дані",
    "Дотримуватися правил robots.txt"
  ],
  
  prerequisites: ["lesson-09-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до веб-скрапінгу",
        content: `Веб-скрапінг - це автоматизований процес збору даних з веб-сайтів.

**Що таке веб-скрапінг?**

- Автоматичне витягування даних з веб-сторінок
- Конвертація HTML в структуровані дані
- Збереження даних для подальшого аналізу
- Автоматизація рутинних задач

**Коли використовувати скрапінг:**

- Збір даних для аналізу
- Моніторинг цін та товарів
- Збір новин та статей
- Створення датасетів
- Інтеграція з API (якщо API недоступне)

**Етичні аспекти:**

- Дотримуйтеся robots.txt
- Не перевантажуйте сервер запитами
- Поважайте авторські права
- Використовуйте затримки між запитами
- Перевіряйте Terms of Service`
      },
      {
        title: "Інструменти для скрапінгу",
        content: `**BeautifulSoup - бібліотека для парсингу HTML**

BeautifulSoup - це потужна бібліотека Python для парсингу HTML та XML. Вона дозволяє легко знаходити та витягувати дані з HTML сторінок.

**Основні методи BeautifulSoup:**

- \`soup.find('tag')\` - знайти перший елемент
- \`soup.find_all('tag')\` - знайти всі елементи
- \`soup.find('div', class_='content')\` - пошук за класом
- \`element.get_text()\` - отримати текст з елемента

**Примітка:** BeautifulSoup потребує встановлення (\`pip install beautifulsoup4\`). У цьому курсі ми показуємо приклади з BeautifulSoup для демонстрації, але для практичних завдань рекомендуємо використовувати JSON API через requests, що простіше та не потребує додаткових бібліотек.`
      },
      {
        title: "Структура скрапера",
        content: `**Основні компоненти скрапера:**

1. **Завантаження сторінки** - requests
2. **Парсинг HTML** - BeautifulSoup (для складних HTML) або JSON (якщо доступний API)
3. **Витягування даних** - пошук елементів
4. **Збереження даних** - JSON, CSV, база даних
5. **Обробка помилок** - try/except

**Базовий шаблон скрапера з BeautifulSoup:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import time
import json

def scrape_website(url):
    # 1. Завантаження
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    response.raise_for_status()
    
    # 2. Парсинг HTML (якщо потрібно)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 3. Витягування даних
    data = extract_data(soup)
    
    # 4. Збереження
    save_data(data)
    
    return data

def extract_data(soup):
    # Логіка витягування
    pass

def save_data(data):
    # Логіка збереження
    pass
\`\`\`

**Альтернатива: використання JSON API (рекомендовано):**

\`\`\`python
import requests
import json

def scrape_with_api(api_url):
    response = requests.get(api_url)
    data = response.json()  # Просто отримуємо JSON
    return data
\`\`\``
      },
      {
        title: "Обробка багатосторінкового контенту",
        content: `**Скрапінг кількох сторінок:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import time

def scrape_multiple_pages(base_url, num_pages):
    all_data = []
    
    for page in range(1, num_pages + 1):
        url = f'{base_url}?page={page}'
        
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            page_data = extract_data(soup)
            all_data.extend(page_data)
            
            # Затримка між запитами
            time.sleep(1)
            
            print(f'Оброблено сторінку {page}')
            
        except Exception as e:
            print(f'Помилка на сторінці {page}: {e}')
            continue
    
    return all_data
\`\`\`

**Знаходження посилань на наступні сторінки:**

\`\`\`python
from bs4 import BeautifulSoup
import requests

def scrape_with_pagination(start_url):
    all_data = []
    current_url = start_url
    
    while current_url:
        response = requests.get(current_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Витягуємо дані
        data = extract_data(soup)
        all_data.extend(data)
        
        # Знаходимо посилання на наступну сторінку
        next_link = soup.find('a', class_='next-page')
        if next_link:
            current_url = next_link['href']
        else:
            current_url = None
        
        time.sleep(1)  # Затримка
    
    return all_data
\`\`\``
      },
      {
        title: "Обробка динамічних сторінок",
        content: `**Проблема з JavaScript:**

Деякі сайти завантажують контент через JavaScript, який requests не виконує.

**Рішення 1: Аналіз AJAX запитів**

\`\`\`python
import requests
import json

# Знаходимо API endpoint, який використовує сайт
api_url = 'https://example.com/api/data'

# Робимо запит до API напряму
response = requests.get(api_url, headers={
    'X-Requested-With': 'XMLHttpRequest'
})

data = response.json()
# Працюємо з JSON замість HTML
\`\`\`

**Рішення 2: Selenium (для складних випадків)**

\`\`\`python
from selenium import webdriver
from bs4 import BeautifulSoup

# Запускаємо браузер
driver = webdriver.Chrome()
driver.get('https://example.com')

# Чекаємо завантаження JavaScript
time.sleep(2)

# Отримуємо HTML після виконання JS
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

driver.quit()
\`\`\`

**Перевірка динамічного контенту:**

\`\`\`python
import requests

response = requests.get('https://example.com')
html = response.text

# Якщо в HTML немає потрібних даних, можливо вони завантажуються через JS
if 'expected-content' not in html:
    print('Контент завантажується динамічно')
\`\`\``
      },
      {
        title: "Робота з формами та POST запитами",
        content: `**Скрапінг з авторизацією:**

\`\`\`python
import requests
from bs4 import BeautifulSoup

# Створюємо сесію
session = requests.Session()

# Логін
login_url = 'https://example.com/login'
login_data = {
    'username': 'user',
    'password': 'pass'
}

response = session.post(login_url, data=login_data)
response.raise_for_status()

# Тепер можемо робити авторизовані запити
protected_url = 'https://example.com/profile'
response = session.get(protected_url)
soup = BeautifulSoup(response.text, 'html.parser')
\`\`\`

**Відправка форм:**

\`\`\`python
import requests
from bs4 import BeautifulSoup

# Отримуємо форму
response = requests.get('https://example.com/form')
soup = BeautifulSoup(response.text, 'html.parser')

# Знаходимо CSRF токен (якщо є)
csrf_token = soup.find('input', {'name': 'csrf_token'})['value']

# Відправляємо форму
form_data = {
    'csrf_token': csrf_token,
    'field1': 'value1',
    'field2': 'value2'
}

response = requests.post('https://example.com/form', data=form_data)
\`\`\``
      },
      {
        title: "Обробка різних форматів даних",
        content: `**Збереження в JSON:**

\`\`\`python
import json

def save_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f'Дані збережено в {filename}')

# Використання
scraped_data = [
    {'title': 'Стаття 1', 'url': 'https://example.com/1'},
    {'title': 'Стаття 2', 'url': 'https://example.com/2'}
]

save_to_json(scraped_data, 'articles.json')
\`\`\`

**Збереження в CSV:**

\`\`\`python
import csv

def save_to_csv(data, filename):
    if not data:
        return
    
    # Отримуємо ключі з першого елемента
    fieldnames = data[0].keys()
    
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    
    print(f'Дані збережено в {filename}')

# Використання
save_to_csv(scraped_data, 'articles.csv')
\`\`\`

**Збереження в базу даних:**

\`\`\`python
import sqlite3

def save_to_database(data, db_name='scraped_data.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    
    # Створюємо таблицю
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Вставляємо дані
    for item in data:
        cursor.execute(
            'INSERT INTO articles (title, url) VALUES (?, ?)',
            (item['title'], item['url'])
        )
    
    conn.commit()
    conn.close()
    print(f'Дані збережено в базу {db_name}')
\`\`\``
      },
      {
        title: "Обробка помилок та retry логіка",
        content: `**Retry механізм:**

\`\`\`python
import requests
import time
from requests.exceptions import RequestException

def fetch_with_retry(url, max_retries=3, delay=1):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response
        except RequestException as e:
            if attempt < max_retries - 1:
                print(f'Спроба {attempt + 1} не вдалася, повтор через {delay} сек...')
                time.sleep(delay)
            else:
                print(f'Всі спроби не вдалі: {e}')
                raise
    
    return None

# Використання
response = fetch_with_retry('https://example.com')
\`\`\`

**Обробка різних типів помилок:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError, Timeout, ConnectionError

def safe_scrape(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response
    except HTTPError as e:
        if e.response.status_code == 404:
            print(f'Сторінка не знайдена: {url}')
        elif e.response.status_code == 403:
            print(f'Доступ заборонено: {url}')
        else:
            print(f'HTTP помилка {e.response.status_code}: {url}')
    except Timeout:
        print(f'Таймаут для {url}')
    except ConnectionError:
        print(f'Помилка з'єднання з {url}')
    except RequestException as e:
        print(f'Помилка запиту до {url}: {e}')
    
    return None
\`\`\``
      },
      {
        title: "Robots.txt та етичний скрапінг",
        content: `**Перевірка robots.txt:**

\`\`\`python
import requests
from urllib.robotparser import RobotFileParser

def check_robots_txt(base_url, path):
    rp = RobotFileParser()
    rp.set_url(f'{base_url}/robots.txt')
    rp.read()
    
    if rp.can_fetch('*', path):
        print(f'Дозволено скрапити: {path}')
        return True
    else:
        print(f'Заборонено скрапити: {path}')
        return False

# Використання
base_url = 'https://example.com'
path = '/articles'
check_robots_txt(base_url, path)
\`\`\`

**Етичні практики:**

1. **Затримки між запитами:**
\`\`\`python
import time

for url in urls:
    response = requests.get(url)
    # Затримка 1-2 секунди
    time.sleep(1.5)
\`\`\`

2. **User-Agent:**
\`\`\`python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
response = requests.get(url, headers=headers)
\`\`\`

3. **Обмеження частоти:**
\`\`\`python
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests, time_window):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def wait_if_needed(self):
        now = time.time()
        # Видаляємо старі запити
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        # Якщо досягли ліміту, чекаємо
        if len(self.requests) >= self.max_requests:
            sleep_time = self.time_window - (now - self.requests[0])
            time.sleep(sleep_time)
        
        self.requests.append(time.time())

# Використання
limiter = RateLimiter(max_requests=10, time_window=60)  # 10 запитів на хвилину

for url in urls:
    limiter.wait_if_needed()
    response = requests.get(url)
\`\`\``
      },
      {
        title: "Практичний приклад: Скрапер новин",
        content: `**Повний приклад скрапера:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import json
import time
from datetime import datetime

class NewsScraper:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.articles = []
    
    def scrape_page(self, url):
        try:
            response = self.session.get(url, timeout=5)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Знаходимо всі статті (приклад структури)
            article_elements = soup.find_all('article', class_='news-item')
            
            for article in article_elements:
                title = article.find('h2').text.strip()
                link = article.find('a')['href']
                date = article.find('time')['datetime']
                summary = article.find('p', class_='summary').text.strip()
                
                self.articles.append({
                    'title': title,
                    'link': self.base_url + link if link.startswith('/') else link,
                    'date': date,
                    'summary': summary,
                    'scraped_at': datetime.now().isoformat()
                })
            
            return True
            
        except Exception as e:
            print(f'Помилка при скрапінгу {url}: {e}')
            return False
    
    def scrape_all(self, num_pages=5):
        for page in range(1, num_pages + 1):
            url = f'{self.base_url}/news?page={page}'
            print(f'Скрапінг сторінки {page}...')
            
            if self.scrape_page(url):
                time.sleep(2)  # Затримка між сторінками
            else:
                break
        
        return self.articles
    
    def save(self, filename='news.json'):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.articles, f, indent=2, ensure_ascii=False)
        print(f'Збережено {len(self.articles)} статей в {filename}')

# Використання
scraper = NewsScraper('https://example.com')
articles = scraper.scrape_all(num_pages=3)
scraper.save('news.json')
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили створення веб-скраперів:

**Ключові концепції:**

1. **Структура скрапера** - завантаження, парсинг, збереження
2. **Багатосторінковий скрапінг** - обробка кількох сторінок
3. **Динамічний контент** - робота з JavaScript
4. **Збереження даних** - JSON, CSV, база даних
5. **Обробка помилок** - retry логіка
6. **Етичний скрапінг** - robots.txt, затримки

**Важливі практики:**

- Використовуйте затримки між запитами
- Дотримуйтеся robots.txt
- Обробляйте всі типи помилок
- Використовуйте User-Agent
- Обмежуйте частоту запитів
- Поважайте Terms of Service

**Наступний крок:**

У наступному уроці ми створимо повноцінний проект веб-скрапінгу.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий скрапер",
      code: `from bs4 import BeautifulSoup
import requests

def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    titles = [h2.text for h2 in soup.find_all('h2')]
    return titles

titles = scrape_page('https://example.com')`,
      explanation: "Простий скрапер для витягування заголовків зі сторінки."
    },
    {
      title: "Приклад 2: Скрапінг кількох сторінок",
      code: `from bs4 import BeautifulSoup
import requests
import time

def scrape_multiple(base_url, pages):
    all_data = []
    for page in range(1, pages + 1):
        url = f'{base_url}?page={page}'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        data = extract_data(soup)
        all_data.extend(data)
        time.sleep(1)
    return all_data`,
      explanation: "Скрапінг кількох сторінок з затримкою між запитами."
    },
    {
      title: "Приклад 3: Збереження в JSON",
      code: `import json

data = [{'title': 'Стаття 1', 'url': 'url1'}]
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)`,
      explanation: "Збереження зібраних даних у JSON файл."
    },
    {
      title: "Приклад 4: Retry логіка",
      code: `import requests
import time

def fetch_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            return requests.get(url, timeout=5)
        except:
            if attempt < max_retries - 1:
                time.sleep(1)
            else:
                raise`,
      explanation: "Механізм повторних спроб при помилках запитів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати затримки між запитами",
      explanation: "Без затримок можна перевантажити сервер та отримати блокування.",
      correctApproach: "Завжди додавайте time.sleep(1-2) між запитами до одного домену."
    },
    {
      mistake: "Ігнорувати robots.txt",
      explanation: "Порушення robots.txt може призвести до блокування та юридичних проблем.",
      correctApproach: "Перевіряйте robots.txt перед скрапінгом та дотримуйтеся правил."
    },
    {
      mistake: "Не обробляти помилки",
      explanation: "Веб-сайти можуть бути недоступні, змінювати структуру, блокувати запити.",
      correctApproach: "Використовуйте try/except та retry логіку для надійності."
    },
    {
      mistake: "Не зберігати дані під час скрапінгу",
      explanation: "Якщо скрапер зупиниться, всі дані будуть втрачені.",
      correctApproach: "Зберігайте дані періодично або після кожної сторінки."
    }
  ],
  
  summary: `На цьому уроці ми вивчили створення веб-скраперів:

1. Структура скрапера - завантаження, парсинг, збереження
2. Багатосторінковий скрапінг - обробка кількох сторінок
3. Збереження даних - JSON, CSV, база даних
4. Обробка помилок - retry логіка
5. Етичний скрапінг - robots.txt, затримки

Веб-скрапінг - потужний інструмент для збору даних!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо додавати затримки між запитами?",
        options: [
          "Щоб не перевантажувати сервер та уникнути блокування",
          "Щоб прискорити скрапінг",
          "Щоб зберегти більше пам'яті",
          "Затримки не потрібні"
        ],
        correctAnswer: 0,
        explanation: "Затримки допомагають не перевантажувати сервер та уникнути блокування IP адреси."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке robots.txt?",
        options: [
          "Файл з правилами для веб-скраперів",
          "Файл з паролями",
          "Файл з налаштуваннями браузера",
          "Файл з даними"
        ],
        correctAnswer: 0,
        explanation: "robots.txt містить правила, які вказують, які частини сайту можна скрапити, а які ні."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як обробити динамічний контент, що завантажується через JavaScript?",
        options: [
          "Використати Selenium або знайти API endpoint",
          "Використати тільки requests",
          "Парсити HTML напряму",
          "Неможливо обробити"
        ],
        correctAnswer: 0,
        explanation: "Для динамічного контенту потрібен Selenium (виконує JS) або пошук API endpoint, який використовує сайт."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке retry логіка?",
        options: [
          "Повторні спроби виконати запит при помилці",
          "Видалення помилкових даних",
          "Пропуск помилкових сторінок",
          "Збереження помилок"
        ],
        correctAnswer: 0,
        explanation: "Retry логіка дозволяє автоматично повторювати запити при тимчасових помилках (таймаути, мережеві проблеми)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Можна скрапити будь-який сайт без обмежень.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Потрібно дотримуватися robots.txt, Terms of Service, додавати затримки та не перевантажувати сервер."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
