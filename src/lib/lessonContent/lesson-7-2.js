/**
 * Lesson 7-2: datetime та time
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_2 = {
  lessonId: "lesson-7-2",
  moduleId: "module-7",
  order: 2,
  title: "datetime та time",
  
  learningObjectives: [
    "Працювати з датами та часом",
    "Форматувати дати",
    "Виконувати операції з датами",
    "Використовувати time для вимірювання",
    "Розуміти різницю між datetime та time"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-7-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Модуль datetime",
        content: `**datetime** — модуль для роботи з датами та часом.

**Імпорт:**
\`\`\`python
from datetime import datetime, date, time, timedelta
\`\`\`

**Основні класи:**
- \`datetime\` — дата та час разом
- \`date\` — тільки дата
- \`time\` — тільки час
- \`timedelta\` — різниця між датами

**Отримання поточної дати та часу:**
\`\`\`python
from datetime import datetime

now = datetime.now()
print(now)  # 2024-01-15 14:30:45.123456

today = datetime.today()
print(today)  # Поточна дата та час
\`\`\`

**Створення конкретної дати:**
\`\`\`python
from datetime import datetime, date, time

# datetime (дата + час)
dt = datetime(2024, 1, 15, 14, 30, 45)
print(dt)  # 2024-01-15 14:30:45

# date (тільки дата)
d = date(2024, 1, 15)
print(d)  # 2024-01-15

# time (тільки час)
t = time(14, 30, 45)
print(t)  # 14:30:45
\`\`\``
      },
      {
        title: "Форматування дат",
        content: `**strftime()** — форматування дати в рядок.
**strptime()** — парсинг рядка в дату.

**Форматування (strftime):**
\`\`\`python
from datetime import datetime

now = datetime.now()

print(now.strftime("%Y-%m-%d"))           # 2024-01-15
print(now.strftime("%d.%m.%Y"))          # 15.01.2024
print(now.strftime("%H:%M:%S"))          # 14:30:45
print(now.strftime("%A, %d %B %Y"))     # Monday, 15 January 2024
print(now.strftime("%d/%m/%Y %H:%M"))    # 15/01/2024 14:30
\`\`\`

**Основні коди форматування:**
- \`%Y\` — рік (4 цифри)
- \`%m\` — місяць (01-12)
- \`%d\` — день (01-31)
- \`%H\` — година (00-23)
- \`%M\` — хвилина (00-59)
- \`%S\` — секунда (00-59)
- \`%A\` — повна назва дня тижня
- \`%B\` — повна назва місяця

**Парсинг (strptime):**
\`\`\`python
from datetime import datetime

date_string = "15.01.2024 14:30"
dt = datetime.strptime(date_string, "%d.%m.%Y %H:%M")
print(dt)  # 2024-01-15 14:30:00
\`\`\``
      },
      {
        title: "Операції з датами",
        content: `**timedelta** — різниця між датами.

**Додавання та віднімання:**
\`\`\`python
from datetime import datetime, timedelta

now = datetime.now()

# Додавання
future = now + timedelta(days=7)
print(f"Через тиждень: {future}")

# Віднімання
past = now - timedelta(days=30)
print(f"30 днів тому: {past}")

# Комбінація
future = now + timedelta(days=1, hours=2, minutes=30)
print(f"Через 1 день, 2 години, 30 хвилин: {future}")
\`\`\`

**Різниця між датами:**
\`\`\`python
from datetime import datetime

date1 = datetime(2024, 1, 1)
date2 = datetime(2024, 1, 15)

difference = date2 - date1
print(difference.days)  # 14 днів
print(difference.total_seconds())  # 1209600.0 секунд
\`\`\`

**Порівняння дат:**
\`\`\`python
from datetime import datetime

date1 = datetime(2024, 1, 1)
date2 = datetime(2024, 1, 15)

print(date1 < date2)   # True
print(date1 == date2)   # False
print(date1 > date2)    # False
\`\`\``
      },
      {
        title: "Модуль time",
        content: `**time** — модуль для роботи з часом та вимірювання.

**Імпорт:**
\`\`\`python
import time
\`\`\`

**Вимірювання часу виконання:**
\`\`\`python
import time

start = time.time()  # Початок вимірювання

# Якийсь код
for i in range(1000000):
    pass

end = time.time()  # Кінець вимірювання
elapsed = end - start
print(f"Час виконання: {elapsed:.4f} секунд")
\`\`\`

**time.sleep() — затримка:**
\`\`\`python
import time

print("Початок")
time.sleep(2)  # Затримка на 2 секунди
print("Кінець")
\`\`\`

**time.perf_counter() — точніше вимірювання:**
\`\`\`python
import time

start = time.perf_counter()

# Код для вимірювання

end = time.perf_counter()
print(f"Час: {end - start:.6f} секунд")
\`\`\`

**Різниця між time.time() та time.perf_counter():**
- \`time.time()\` — системний час (може змінюватися)
- \`time.perf_counter()\` — монотонний тармер (точніший для вимірювання)`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Вік об'єкта**
\`\`\`python
from datetime import datetime

def calculate_age(birth_date):
    today = datetime.now()
    age = today.year - birth_date.year
    if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
        age -= 1
    return age

birth = datetime(2008, 5, 15)
age = calculate_age(birth)
print(f"Вік: {age} років")
\`\`\`

**Приклад 2: Дні до події**
\`\`\`python
from datetime import datetime, timedelta

def days_until_event(event_date):
    today = datetime.now().date()
    return (event_date - today).days

event = date(2024, 12, 31)
days = days_until_event(event)
print(f"Днів до події: {days}")
\`\`\`

**Приклад 3: Форматування для користувача**
\`\`\`python
from datetime import datetime

def format_datetime(dt):
    return dt.strftime("%d %B %Y, %H:%M")

now = datetime.now()
print(format_datetime(now))  # 15 January 2024, 14:30
\`\`\`

**Приклад 4: Вимірювання швидкості функції**
\`\`\`python
import time

def slow_function():
    time.sleep(0.1)
    return "Готово"

start = time.perf_counter()
result = slow_function()
end = time.perf_counter()

print(f"Результат: {result}")
print(f"Час виконання: {end - start:.4f} секунд")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Робота з датами",
      code: `from datetime import datetime, timedelta

# Поточна дата та час
now = datetime.now()
print(f"Зараз: {now}")

# Дата через тиждень
future = now + timedelta(days=7)
print(f"Через тиждень: {future}")

# Різниця
diff = future - now
print(f"Різниця: {diff.days} днів")`,
      explanation: "Демонструє роботу з датами та timedelta."
    },
    {
      title: "Приклад 2: Форматування",
      code: `from datetime import datetime

now = datetime.now()

# Різні формати
print(now.strftime("%Y-%m-%d"))           # 2024-01-15
print(now.strftime("%d.%m.%Y"))          # 15.01.2024
print(now.strftime("%H:%M:%S"))          # 14:30:45
print(now.strftime("%A, %d %B %Y"))      # Monday, 15 January 2024`,
      explanation: "Показує різні формати дат."
    },
    {
      title: "Приклад 3: Вимірювання часу",
      code: `import time

start = time.perf_counter()

# Симуляція роботи
time.sleep(0.1)

end = time.perf_counter()
elapsed = end - start
print(f"Час виконання: {elapsed:.4f} секунд")`,
      explanation: "Демонструє вимірювання часу виконання."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між datetime та time модулями",
      explanation: "datetime для роботи з датами/часом, time для вимірювання та затримок.",
      correctApproach: "Використовуйте datetime для дат/часу, time для вимірювання та sleep()."
    },
    {
      mistake: "Неправильні коди форматування",
      explanation: "Легко переплутати %Y (рік) з %y (рік 2 цифри), %m (місяць) з %M (хвилина).",
      correctApproach: "Запам'ятайте: великі літери для більших одиниць (%Y рік, %M хвилина), малі для менших (%y рік 2 цифри, %m місяць)."
    },
    {
      mistake: "Використання time.time() замість time.perf_counter()",
      explanation: "time.time() може змінюватися при зміні системного часу, що дає неточні результати.",
      correctApproach: "Використовуйте time.perf_counter() для вимірювання часу виконання коду."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Модуль datetime** — робота з датами та часом
2. **datetime, date, time** — основні класи
3. **timedelta** — різниця між датами
4. **strftime()** — форматування дати в рядок
5. **strptime()** — парсинг рядка в дату
6. **Модуль time** — вимірювання часу
7. **time.time()** — системний час
8. **time.perf_counter()** — точне вимірювання
9. **time.sleep()** — затримка

**Важливо:**
- datetime для дат/часу
- time для вимірювання
- strftime для форматування
- timedelta для операцій

Модулі datetime та time — незамінні для роботи з часом!`,
  
  practiceTask: {
    title: "Створення системи обліку подій",
    description: "Створіть систему для обліку подій з датами",
    problemStatement: `Створіть систему обліку подій з наступними функціями:

**Функції:**
1. add_event(name, date_string) — додає подію
   - Приймає назву та дату у форматі "DD.MM.YYYY"
   - Зберігає в словник

2. get_upcoming_events(days=7) — майбутні події
   - Повертає події, які відбудуться протягом наступних N днів

3. get_past_events() — минулі події
   - Повертає всі події, які вже відбулися

4. days_until_event(name) — днів до події
   - Повертає кількість днів до події
   - Якщо подія вже минула, повертає від'ємне число

5. format_event_info(name) — форматування інформації
   - Повертає рядок: "Подія: [назва], Дата: [дата у форматі DD MMMM YYYY]"

6. get_events_by_month(month, year) — події за місяць
   - Повертає всі події у вказаному місяці

**Додатково:**
- Використовуйте datetime для роботи з датами
- Обробляйте помилки (подія не знайдена, невірний формат дати)
- Створіть меню для роботи з системою

**Створіть систему та продемонструйте всі функції.**`,
    inputFormat: "Створіть систему з функціями та меню",
    outputFormat: `Приклад виведення:
=== Система обліку подій ===
Додано подію: День народження (15.05.2024)
Додано подію: Новий рік (31.12.2024)

Майбутні події (7 днів):
- День народження: через 120 днів

Днів до події 'День народження': 120`,
    examples: [
      {
        input: "Додавання та пошук подій",
        output: "Система працює коректно",
        explanation: "Демонстрація роботи з датами"
      }
    ],
    solution: {
      code: `from datetime import datetime, timedelta

class EventManager:
    def __init__(self):
        self.events = {}  # {name: datetime}
    
    def add_event(self, name, date_string):
        """Додає подію."""
        try:
            # Парсинг дати з формату DD.MM.YYYY
            event_date = datetime.strptime(date_string, "%d.%m.%Y")
            self.events[name] = event_date
            return f"Додано подію: {name} ({date_string})"
        except ValueError:
            return "Помилка: невірний формат дати! Використовуйте DD.MM.YYYY"
    
    def get_upcoming_events(self, days=7):
        """Повертає майбутні події."""
        today = datetime.now()
        end_date = today + timedelta(days=days)
        upcoming = []
        
        for name, event_date in self.events.items():
            if today <= event_date <= end_date:
                upcoming.append((name, event_date))
        
        return sorted(upcoming, key=lambda x: x[1])
    
    def get_past_events(self):
        """Повертає минулі події."""
        today = datetime.now()
        past = []
        
        for name, event_date in self.events.items():
            if event_date < today:
                past.append((name, event_date))
        
        return sorted(past, key=lambda x: x[1], reverse=True)
    
    def days_until_event(self, name):
        """Повертає кількість днів до події."""
        if name not in self.events:
            raise ValueError(f"Подія '{name}' не знайдена!")
        
        today = datetime.now().date()
        event_date = self.events[name].date()
        return (event_date - today).days
    
    def format_event_info(self, name):
        """Форматує інформацію про подію."""
        if name not in self.events:
            raise ValueError(f"Подія '{name}' не знайдена!")
        
        event_date = self.events[name]
        formatted_date = event_date.strftime("%d %B %Y")
        return f"Подія: {name}, Дата: {formatted_date}"
    
    def get_events_by_month(self, month, year):
        """Повертає події за місяць."""
        events_in_month = []
        
        for name, event_date in self.events.items():
            if event_date.month == month and event_date.year == year:
                events_in_month.append((name, event_date))
        
        return sorted(events_in_month, key=lambda x: x[1])

def демонстрація():
    """Демонстрація роботи системи."""
    manager = EventManager()
    
    # Додавання подій
    print(manager.add_event("День народження", "15.05.2024"))
    print(manager.add_event("Новий рік", "31.12.2024"))
    print(manager.add_event("Екзамен", "20.01.2024"))
    
    # Майбутні події
    print("\\n=== Майбутні події (30 днів) ===")
    upcoming = manager.get_upcoming_events(30)
    for name, date in upcoming:
        days = manager.days_until_event(name)
        print(f"- {name}: {date.strftime('%d.%m.%Y')} (через {days} днів)")
    
    # Минулі події
    print("\\n=== Минулі події ===")
    past = manager.get_past_events()
    for name, date in past:
        print(f"- {name}: {date.strftime('%d.%m.%Y')}")
    
    # Форматування
    print("\\n=== Інформація про події ===")
    for name in manager.events.keys():
        print(manager.format_event_info(name))
    
    # Події за місяць
    print("\\n=== Події за травень 2024 ===")
    may_events = manager.get_events_by_month(5, 2024)
    for name, date in may_events:
        print(f"- {name}: {date.strftime('%d.%m.%Y')}")

if __name__ == "__main__":
    демонстрація()`,
      explanation: "Рішення демонструє повну систему обліку подій з використанням datetime."
    },
    hints: [
      "Використовуйте datetime.strptime() для парсингу дат",
      "Використовуйте timedelta для обчислення діапазонів",
      "Порівнюйте дати для визначення майбутніх/минулих подій",
      "Використовуйте strftime() для форматування"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке timedelta?",
        options: ["Дата", "Час", "Різниця між датами", "Формат"],
        correctAnswer: 2,
        explanation: "timedelta представляє різницю між двома датами або часом."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: from datetime import datetime; print(datetime.now().strftime('%Y-%m-%d'))?",
        options: ["Поточну дату у форматі YYYY-MM-DD", "Помилку", "Час", "None"],
        correctAnswer: 0,
        explanation: "strftime('%Y-%m-%d') форматує поточну дату у форматі рік-місяць-день."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка функція краще для вимірювання часу виконання?",
        options: ["time.time()", "time.perf_counter()", "datetime.now()", "time.sleep()"],
        correctAnswer: 1,
        explanation: "time.perf_counter() краще для вимірювання часу виконання, оскільки він монотонний та точніший."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
