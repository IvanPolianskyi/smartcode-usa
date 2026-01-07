/**
 * Lesson 09-4: Практика: веб-скрапінг проект
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_09_4 = {
  lessonId: "lesson-09-4",
  moduleId: "module-09",
  order: 4,
  title: "Практика: веб-скрапінг проект",
  
  learningObjectives: [
    "Створити повноцінний скрапер",
    "Збирати дані з реального сайту",
    "Обробляти та зберігати дані",
    "Створити корисний інструмент"
  ],
  
  prerequisites: ["lesson-09-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до проекту",
        content: `У цьому уроці ми створимо повноцінний веб-скрапінг проект.

**Цілі проекту:**

- Створити функціональний скрапер
- Зібрати реальні дані
- Обробити та структурувати дані
- Зберегти дані в зручному форматі
- Дотримуватися етичних практик

**Що ми будемо робити:**

1. Аналіз цільового сайту
2. Планування структури скрапера
3. Реалізація основних функцій
4. Обробка помилок та edge cases
5. Збереження та аналіз даних

**Приклад проекту: Скрапер курсів валют**

Ми створимо скрапер для збору курсів валют з публічного API або веб-сайту.`
      },
      {
        title: "Етап 1: Аналіз та планування",
        content: `**Крок 1: Визначення цілей**

- Які дані потрібно зібрати?
- Як часто оновлюються дані?
- Який формат збереження найкращий?

**Крок 2: Аналіз структури сайту**

\`\`\`python
from bs4 import BeautifulSoup
import requests

# Досліджуємо структуру сторінки
url = 'https://example.com/exchange-rates'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Знаходимо потрібні елементи
# Використовуємо інспектор браузера для аналізу
print(soup.prettify()[:1000])  # Перші 1000 символів
\`\`\`

**Крок 3: Планування структури**

\`\`\`python
# Плануємо класи та функції
class ExchangeRateScraper:
    def __init__(self):
        # Ініціалізація
        pass
    
    def fetch_data(self):
        # Завантаження даних
        pass
    
    def parse_data(self, html):
        # Парсинг HTML
        pass
    
    def save_data(self, data):
        # Збереження даних
        pass
    
    def run(self):
        # Головна логіка
        pass
\`\`\``
      },
      {
        title: "Етап 2: Реалізація базового скрапера",
        content: `**Повна реалізація скрапера:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import json
import csv
from datetime import datetime
from requests.exceptions import RequestException
import time

class ExchangeRateScraper:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.rates = []
    
    def fetch_page(self, url):
        """Завантажує сторінку з обробкою помилок"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except RequestException as e:
            print(f'Помилка завантаження {url}: {e}')
            return None
    
    def parse_rates(self, html):
        """Парсить HTML та витягує курси валют"""
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        rates = []
        
        # Знаходимо таблицю з курсами (приклад структури)
        table = soup.find('table', class_='exchange-rates')
        if not table:
            return []
        
        rows = table.find_all('tr')[1:]  # Пропускаємо заголовок
        
        for row in rows:
            cells = row.find_all('td')
            if len(cells) >= 3:
                currency = cells[0].text.strip()
                buy_rate = cells[1].text.strip()
                sell_rate = cells[2].text.strip()
                
                rates.append({
                    'currency': currency,
                    'buy_rate': buy_rate,
                    'sell_rate': sell_rate,
                    'timestamp': datetime.now().isoformat()
                })
        
        return rates
    
    def save_to_json(self, filename='exchange_rates.json'):
        """Зберігає дані в JSON"""
        data = {
            'scraped_at': datetime.now().isoformat(),
            'rates': self.rates
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f'Дані збережено в {filename}')
    
    def save_to_csv(self, filename='exchange_rates.csv'):
        """Зберігає дані в CSV"""
        if not self.rates:
            return
        
        fieldnames = ['currency', 'buy_rate', 'sell_rate', 'timestamp']
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(self.rates)
        
        print(f'Дані збережено в {filename}')
    
    def run(self):
        """Головна функція скрапера"""
        print('Початок скрапінгу...')
        
        html = self.fetch_page(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
            print(f'Зібрано {len(self.rates)} курсів валют')
            
            if self.rates:
                self.save_to_json()
                self.save_to_csv()
        else:
            print('Не вдалося завантажити дані')

# Використання
scraper = ExchangeRateScraper('https://example.com/exchange-rates')
scraper.run()
\`\`\``
      },
      {
        title: "Етап 3: Розширення функціональності",
        content: `**Додавання моніторингу змін:**

\`\`\`python
import json
from datetime import datetime

class ExchangeRateMonitor:
    def __init__(self, scraper):
        self.scraper = scraper
        self.previous_rates = {}
    
    def load_previous_rates(self, filename='exchange_rates.json'):
        """Завантажує попередні курси"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for rate in data.get('rates', []):
                    self.previous_rates[rate['currency']] = rate
        except FileNotFoundError:
            print('Попередні дані не знайдено')
    
    def compare_rates(self, new_rates):
        """Порівнює нові курси з попередніми"""
        changes = []
        
        for rate in new_rates:
            currency = rate['currency']
            new_buy = rate['buy_rate']
            
            if currency in self.previous_rates:
                old_buy = self.previous_rates[currency]['buy_rate']
                if new_buy != old_buy:
                    changes.append({
                        'currency': currency,
                        'old_rate': old_buy,
                        'new_rate': new_buy,
                        'change': f'{float(new_buy) - float(old_buy):.2f}'
                    })
        
        return changes
    
    def monitor(self):
        """Моніторить зміни курсів"""
        self.load_previous_rates()
        
        self.scraper.run()
        new_rates = self.scraper.rates
        
        if self.previous_rates:
            changes = self.compare_rates(new_rates)
            if changes:
                print('\\nВиявлено зміни в курсах:')
                for change in changes:
                    print(f"{change['currency']}: {change['old_rate']} -> {change['new_rate']}")
            else:
                print('Змін не виявлено')
\`\`\`

**Додавання автоматичного запуску:**

\`\`\`python
import schedule
import time

def job():
    scraper = ExchangeRateScraper('https://example.com/exchange-rates')
    scraper.run()

# Запускати кожну годину
schedule.every().hour.do(job)

while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\``
      },
      {
        title: "Етап 4: Обробка edge cases",
        content: `**Обробка різних форматів даних:**

\`\`\`python
def parse_rate_value(value_str):
    """Парсить значення курсу з різних форматів"""
    try:
        # Видаляємо пробіли та зайві символи
        cleaned = value_str.replace(' ', '').replace(',', '.')
        
        # Видаляємо нечислові символи (крім крапки)
        import re
        cleaned = re.sub(r'[^0-9.]', '', cleaned)
        
        return float(cleaned)
    except (ValueError, AttributeError):
        return None

# Використання
rate_str = "36.50 грн"
rate_value = parse_rate_value(rate_str)  # 36.50
\`\`\`

**Валідація даних:**

\`\`\`python
def validate_rate(rate_data):
    """Перевіряє валідність даних про курс"""
    required_fields = ['currency', 'buy_rate', 'sell_rate']
    
    # Перевірка наявності полів
    for field in required_fields:
        if field not in rate_data or not rate_data[field]:
            return False, f'Відсутнє поле: {field}'
    
    # Перевірка форматів
    try:
        buy = float(rate_data['buy_rate'])
        sell = float(rate_data['sell_rate'])
        
        if buy <= 0 or sell <= 0:
            return False, 'Курс не може бути від\'ємним або нульовим'
        
        if sell < buy:
            return False, 'Курс продажу не може бути меншим за курс купівлі'
        
        return True, 'OK'
    except ValueError:
        return False, 'Невірний формат курсу'

# Використання
rate = {'currency': 'USD', 'buy_rate': '36.50', 'sell_rate': '37.00'}
is_valid, message = validate_rate(rate)
\`\`\`

**Обробка відсутніх даних:**

\`\`\`python
def safe_get_text(element, default=''):
    """Безпечно отримує текст з елемента"""
    if element:
        text = element.get_text(strip=True)
        return text if text else default
    return default

# Використання
name_element = soup.find('span', class_='currency-name')
currency_name = safe_get_text(name_element, 'Невідома валюта')
\`\`\``
      },
      {
        title: "Етап 5: Візуалізація даних",
        content: `**Створення звіту:**

\`\`\`python
def generate_report(rates, filename='report.txt'):
    """Генерує текстовий звіт"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write('ЗВІТ ПРО КУРСИ ВАЛЮТ\\n')
        f.write('=' * 50 + '\\n')
        f.write(f'Дата: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\\n')
        f.write(f'Кількість валют: {len(rates)}\\n\\n')
        
        f.write('Курси валют:\\n')
        f.write('-' * 50 + '\\n')
        
        for rate in rates:
            f.write(f"Валюта: {rate['currency']}\\n")
            f.write(f"  Купівля: {rate['buy_rate']}\\n")
            f.write(f"  Продаж: {rate['sell_rate']}\\n")
            f.write('-' * 50 + '\\n')
    
    print(f'Звіт збережено в {filename}')

# Використання
generate_report(scraper.rates)
\`\`\`

**Створення HTML звіту:**

\`\`\`python
def generate_html_report(rates, filename='report.html'):
    """Генерує HTML звіт"""
    html = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Курси валют</title>
        <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; }
        </style>
    </head>
    <body>
        <h1>Курси валют</h1>
        <p>Дата: {date}</p>
        <table>
            <tr>
                <th>Валюта</th>
                <th>Купівля</th>
                <th>Продаж</th>
            </tr>
    '''.format(date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    
    for rate in rates:
        html += f'''
            <tr>
                <td>{rate['currency']}</td>
                <td>{rate['buy_rate']}</td>
                <td>{rate['sell_rate']}</td>
            </tr>
        '''
    
    html += '''
        </table>
    </body>
    </html>
    '''
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f'HTML звіт збережено в {filename}')

# Використання
generate_html_report(scraper.rates)
\`\`\``
      },
      {
        title: "Етап 6: Тестування та оптимізація",
        content: `**Тестування функцій:**

\`\`\`python
def test_scraper():
    """Тестує основний функціонал скрапера"""
    scraper = ExchangeRateScraper('https://example.com/exchange-rates')
    
    # Тест завантаження
    html = scraper.fetch_page(scraper.base_url)
    assert html is not None, "Не вдалося завантажити сторінку"
    
    # Тест парсингу
    rates = scraper.parse_rates(html)
    assert len(rates) > 0, "Не знайдено курсів валют"
    
    # Тест валідації
    for rate in rates:
        is_valid, message = validate_rate(rate)
        assert is_valid, f"Невалідні дані: {message}"
    
    print("Всі тести пройдено успішно!")

# Запуск тестів
test_scraper()
\`\`\`

**Оптимізація продуктивності:**

\`\`\`python
import time
from functools import lru_cache

class OptimizedScraper(ExchangeRateScraper):
    @lru_cache(maxsize=1)
    def fetch_page_cached(self, url):
        """Кешує результат на короткий час"""
        return self.fetch_page(url)
    
    def run_optimized(self):
        """Оптимізована версія з кешуванням"""
        start_time = time.time()
        
        html = self.fetch_page_cached(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
        
        elapsed = time.time() - start_time
        print(f'Скрапінг завершено за {elapsed:.2f} секунд')
        
        return self.rates
\`\`\``
      },
      {
        title: "Повний приклад проекту",
        content: `**Повна реалізація з усіма функціями:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import json
import csv
from datetime import datetime
from requests.exceptions import RequestException
import time
import os

class CompleteExchangeRateScraper:
    def __init__(self, base_url, output_dir='data'):
        self.base_url = base_url
        self.output_dir = output_dir
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.rates = []
        
        # Створюємо директорію для даних
        os.makedirs(output_dir, exist_ok=True)
    
    def fetch_page(self, url, retries=3):
        """Завантажує сторінку з retry логікою"""
        for attempt in range(retries):
            try:
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                return response.text
            except RequestException as e:
                if attempt < retries - 1:
                    print(f'Спроба {attempt + 1} не вдалася, повтор...')
                    time.sleep(2)
                else:
                    print(f'Помилка завантаження: {e}')
                    return None
        return None
    
    def parse_rates(self, html):
        """Парсить курси валют"""
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        rates = []
        
        # Адаптуйте селектори під конкретний сайт
        table = soup.find('table', class_='exchange-rates')
        if not table:
            return []
        
        rows = table.find_all('tr')[1:]
        
        for row in rows:
            cells = row.find_all('td')
            if len(cells) >= 3:
                currency = cells[0].text.strip()
                buy_rate = cells[1].text.strip()
                sell_rate = cells[2].text.strip()
                
                rates.append({
                    'currency': currency,
                    'buy_rate': buy_rate,
                    'sell_rate': sell_rate,
                    'timestamp': datetime.now().isoformat()
                })
        
        return rates
    
    def save_data(self):
        """Зберігає дані в різних форматах"""
        if not self.rates:
            print('Немає даних для збереження')
            return
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # JSON
        json_file = os.path.join(self.output_dir, f'exchange_rates_{timestamp}.json')
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump({
                'scraped_at': datetime.now().isoformat(),
                'rates': self.rates
            }, f, indent=2, ensure_ascii=False)
        
        # CSV
        csv_file = os.path.join(self.output_dir, f'exchange_rates_{timestamp}.csv')
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['currency', 'buy_rate', 'sell_rate', 'timestamp'])
            writer.writeheader()
            writer.writerows(self.rates)
        
        print(f'Дані збережено:')
        print(f'  JSON: {json_file}')
        print(f'  CSV: {csv_file}')
    
    def run(self):
        """Головна функція"""
        print(f'Початок скрапінгу з {self.base_url}...')
        
        html = self.fetch_page(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
            print(f'Зібрано {len(self.rates)} курсів валют')
            
            if self.rates:
                self.save_data()
            else:
                print('Не знайдено курсів валют')
        else:
            print('Не вдалося завантажити дані')

# Використання
if __name__ == '__main__':
    scraper = CompleteExchangeRateScraper('https://example.com/exchange-rates')
    scraper.run()
\`\`\``
      },
      {
        title: "Підсумок проекту",
        content: `На цьому уроці ми створили повноцінний веб-скрапінг проект:

**Що ми зробили:**

1. **Аналіз та планування** - визначили цілі та структуру
2. **Базова реалізація** - створили основний скрапер
3. **Розширення функціональності** - додали моніторинг та автоматизацію
4. **Обробка edge cases** - валідація та обробка помилок
5. **Візуалізація** - створення звітів
6. **Тестування** - перевірка функціональності

**Навички, які ми отримали:**

- Планування скрапінг проектів
- Структурування коду
- Обробка помилок та edge cases
- Збереження даних у різних форматах
- Створення звітів та візуалізація
- Тестування та оптимізація

**Наступні кроки:**

- Додати базу даних для зберігання історії
- Створити веб-інтерфейс для перегляду даних
- Додати сповіщення про зміни
- Розгорнути проект на сервері

Веб-скрапінг - потужний інструмент для автоматизації збору даних!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий скрапер",
      code: `from bs4 import BeautifulSoup
import requests

def scrape_rates(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    rates = []
    for row in soup.find_all('tr')[1:]:
        cells = row.find_all('td')
        if len(cells) >= 3:
            rates.append({
                'currency': cells[0].text.strip(),
                'buy': cells[1].text.strip(),
                'sell': cells[2].text.strip()
            })
    return rates`,
      explanation: "Базовий скрапер для витягування курсів валют з таблиці."
    },
    {
      title: "Приклад 2: Збереження даних",
      code: `import json
import csv

def save_data(rates):
    # JSON
    with open('rates.json', 'w') as f:
        json.dump(rates, f, indent=2)
    
    # CSV
    with open('rates.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['currency', 'buy', 'sell'])
        writer.writeheader()
        writer.writerows(rates)`,
      explanation: "Збереження даних у JSON та CSV формати."
    },
    {
      title: "Приклад 3: Валідація даних",
      code: `def validate_rate(rate):
    if not rate.get('currency'):
        return False
    try:
        float(rate['buy'])
        float(rate['sell'])
        return True
    except:
        return False`,
      explanation: "Перевірка валідності даних про курс валют."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не структурувати код",
      explanation: "Весь код в одній функції робить проект важким для підтримки.",
      correctApproach: "Розділіть код на класи та методи за відповідальністю."
    },
    {
      mistake: "Не обробляти зміни структури сайту",
      explanation: "Структура сайту може змінитися, що зламає скрапер.",
      correctApproach: "Додайте перевірки наявності елементів та обробку помилок парсингу."
    },
    {
      mistake: "Не зберігати дані під час скрапінгу",
      explanation: "Якщо скрапер зупиниться, дані будуть втрачені.",
      correctApproach: "Зберігайте дані після кожної успішної ітерації або використовуйте базу даних."
    },
    {
      mistake: "Не тестувати на різних даних",
      explanation: "Скрапер може працювати тільки на конкретних даних.",
      correctApproach: "Створіть тести для різних сценаріїв та edge cases."
    }
  ],
  
  summary: `На цьому уроці ми створили повноцінний веб-скрапінг проект:

1. Планування - аналіз та структура проекту
2. Реалізація - створення функціонального скрапера
3. Розширення - додавання нових можливостей
4. Обробка помилок - валідація та edge cases
5. Збереження - різні формати даних
6. Тестування - перевірка функціональності

Практичний проект - найкращий спосіб закріпити навички!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка основна перевага структурування коду в класи?",
        options: [
          "Краща організація та підтримка коду",
          "Швидший виконання",
          "Менше пам'яті",
          "Немає переваг"
        ],
        correctAnswer: 0,
        explanation: "Структурування коду в класи покращує читабельність, організацію та спрощує підтримку проекту."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо валідувати дані перед збереженням?",
        options: [
          "Щоб уникнути збереження некоректних даних",
          "Щоб прискорити скрапінг",
          "Щоб зберегти пам'ять",
          "Валідація не потрібна"
        ],
        correctAnswer: 0,
        explanation: "Валідація забезпечує якість даних та допомагає виявити проблеми на ранніх етапах."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке retry логіка?",
        options: [
          "Повторні спроби виконати операцію при помилці",
          "Видалення помилкових даних",
          "Пропуск помилок",
          "Збереження помилок"
        ],
        correctAnswer: 0,
        explanation: "Retry логіка дозволяє автоматично повторювати операції при тимчасових помилках (мережа, таймаути)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому варто зберігати дані в кількох форматах?",
        options: [
          "Для різних цілей використання (аналіз, імпорт, перегляд)",
          "Щоб зайняти більше місця",
          "Щоб ускладнити код",
          "Це не потрібно"
        ],
        correctAnswer: 0,
        explanation: "Різні формати (JSON, CSV, HTML) зручні для різних задач: JSON для програм, CSV для Excel, HTML для перегляду."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Тестування скрапера не потрібне, якщо він працює на одному сайті.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Тестування допомагає виявити проблеми, перевірити обробку edge cases та забезпечити надійність."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
