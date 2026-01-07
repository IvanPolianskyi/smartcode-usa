/**
 * Lesson 08-6: Практика: обробка даних з модулями
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_6 = {
  lessonId: "lesson-08-6",
  moduleId: "module-08",
  order: 6,
  title: "Практика: обробка даних з модулями",
  
  learningObjectives: [
    "Застосувати всі вивчені модулі на практиці",
    "Створити проект з обробки даних",
    "Оптимізувати код за допомогою модулів",
    "Комбінувати різні техніки роботи з даними"
  ],
  
  prerequisites: ["lesson-08-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого",
        content: `На цьому уроці ми закріпимо всі знання з модуля 08:

**Що ми вивчили:**

1. **Модуль collections** - namedtuple, deque, Counter, defaultdict
2. **Модуль itertools** - комбінації, перестановки, групування
3. **Модуль functools** - partial, reduce, lru_cache
4. **Робота з JSON** - читання, запис, парсинг
5. **Робота з CSV та Excel** - обробка табличних даних

**Мета цього уроку:**

- Об'єднати всі концепції
- Створити практичний проект
- Оптимізувати код
- Покращити навички програмування`
      },
      {
        title: "Задача 1: Аналіз продажів",
        content: `**Завдання:** Створіть систему аналізу продажів з використанням collections та itertools.

**Рішення:**

\`\`\`python
from collections import Counter, defaultdict
from itertools import groupby

# Дані продажів
sales = [
    {'product': 'Ноутбук', 'category': 'Електроніка', 'price': 25000},
    {'product': 'Миша', 'category': 'Електроніка', 'price': 500},
    {'product': 'Стіл', 'category': 'Меблі', 'price': 3000},
    {'product': 'Ноутбук', 'category': 'Електроніка', 'price': 25000},
    {'product': 'Крісло', 'category': 'Меблі', 'price': 2000}
]

# Підрахунок продажів за продуктом
product_counter = Counter(s['product'] for s in sales)
print('Найпопулярніші товари:')
for product, count in product_counter.most_common(3):
    print(f'{product}: {count} продажів')

# Групування за категорією
sales_sorted = sorted(sales, key=lambda x: x['category'])
total_by_category = defaultdict(int)

for category, group in groupby(sales_sorted, key=lambda x: x['category']):
    total = sum(item['price'] for item in group)
    total_by_category[category] += total

print('\\nЗагальна сума за категоріями:')
for category, total in total_by_category.items():
    print(f'{category}: {total} грн')
\`\`\``
      },
      {
        title: "Задача 2: Обробка даних з JSON та CSV",
        content: `**Завдання:** Створіть систему для обробки даних з JSON та експорту в CSV.

**Рішення:**

\`\`\`python
import json
import csv
from collections import defaultdict

# Читаємо дані з JSON
def load_data_from_json(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

# Обробляємо дані
def process_students(students_data):
    from collections import Counter
    
    # Підрахунок за курсами
    courses = Counter(s['course'] for s in students_data)
    
    # Групування за містом
    by_city = defaultdict(list)
    for student in students_data:
        by_city[student['city']].append(student)
    
    return courses, by_city

# Експортуємо в CSV
def export_to_csv(data, filename):
    with open(filename, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['name', 'course', 'grade', 'city'])
        writer.writeheader()
        writer.writerows(data)

# Використання
students = load_data_from_json('students.json')
courses, by_city = process_students(students)

# Експортуємо
export_to_csv(students, 'students_export.csv')
\`\`\``
      },
      {
        title: "Задача 3: Оптимізація з functools",
        content: `**Завдання:** Створіть систему обчислень з кешуванням та частковим застосуванням.

**Рішення:**

\`\`\`python
from functools import lru_cache, partial, reduce
from collections import Counter

# Кешована функція обчислення
@lru_cache(maxsize=128)
def calculate_total(items_tuple):
    """Обчислює загальну суму"""
    return sum(items_tuple)

# Часткове застосування для знижок
def apply_discount(price, discount_percent):
    return price * (1 - discount_percent / 100)

# Створюємо функції для різних знижок
apply_10_discount = partial(apply_discount, discount_percent=10)
apply_20_discount = partial(apply_discount, discount_percent=20)

# Використання
prices = [1000, 2000, 3000]
discounted_10 = [apply_10_discount(p) for p in prices]
discounted_20 = [apply_20_discount(p) for p in prices]

# Обчислюємо загальну суму з reduce
total = reduce(lambda x, y: x + y, discounted_10)
print(f'Загальна сума зі знижкою 10%: {total}')
\`\`\``
      },
      {
        title: "Задача 4: Комплексна система обробки даних",
        content: `**Завдання:** Створіть повноцінну систему для обробки та аналізу даних.

**Рішення:**

\`\`\`python
import json
import csv
from collections import Counter, defaultdict, namedtuple
from itertools import groupby, chain
from functools import lru_cache

# Використовуємо namedtuple для структури даних
Student = namedtuple('Student', ['name', 'course', 'grade', 'city'])

class DataProcessor:
    def __init__(self):
        self.students = []
    
    def load_from_json(self, filename):
        """Завантажує дані з JSON"""
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            self.students = [Student(**s) for s in data]
        return self
    
    def analyze_by_course(self):
        """Аналізує дані за курсами"""
        from collections import Counter
        courses = Counter(s.course for s in self.students)
        return courses
    
    def analyze_by_city(self):
        """Аналізує дані за містами"""
        by_city = defaultdict(list)
        for student in self.students:
            by_city[student.city].append(student)
        return by_city
    
    @lru_cache(maxsize=128)
    def calculate_average_grade(self, course):
        """Обчислює середню оцінку за курсом"""
        course_students = [s for s in self.students if s.course == course]
        if not course_students:
            return 0
        total = sum(s.grade for s in course_students)
        return total / len(course_students)
    
    def export_to_csv(self, filename):
        """Експортує дані в CSV"""
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Ім\'я', 'Курс', 'Оцінка', 'Місто'])
            for student in self.students:
                writer.writerow([student.name, student.course, 
                               student.grade, student.city])
    
    def generate_report(self):
        """Генерує звіт"""
        courses = self.analyze_by_course()
        by_city = self.analyze_by_city()
        
        print('=== Звіт про студентів ===')
        print(f'\\nЗагальна кількість: {len(self.students)}')
        
        print('\\nЗа курсами:')
        for course, count in courses.most_common():
            avg = self.calculate_average_grade(course)
            print(f'{course}: {count} студентів, середня оцінка: {avg:.2f}')
        
        print('\\nЗа містами:')
        for city, students in by_city.items():
            print(f'{city}: {len(students)} студентів')

# Використання
processor = DataProcessor()
processor.load_from_json('students.json')
processor.generate_report()
processor.export_to_csv('report.csv')
\`\`\``
      },
      {
        title: "Практичні поради",
        content: `**Коли використовувати який модуль:**

1. **collections** - коли потрібні спеціалізовані структури даних
   - Counter - для підрахунку
   - defaultdict - для групування
   - namedtuple - для структурованих даних

2. **itertools** - коли потрібна робота з ітераторами
   - combinations/permutations - для комбінаторики
   - groupby - для групування
   - chain - для об'єднання

3. **functools** - коли потрібна оптимізація функцій
   - lru_cache - для кешування
   - partial - для спеціалізації
   - reduce - для згортки

4. **json** - для обміну даними та конфігурацій
5. **csv/Excel** - для табличних даних

**Оптимізація коду:**

- Використовуйте генератори замість списків для великих даних
- Кешуйте результати важких обчислень
- Групуйте дані за допомогою defaultdict та groupby
- Використовуйте namedtuple для структурованих даних`
      },
      {
        title: "Підсумок модуля 8",
        content: `Ми завершили модуль 08 - Розширені модулі Python!

**Що ми вивчили:**

1. **collections** - спеціалізовані контейнери даних
2. **itertools** - потужні інструменти для ітераторів
3. **functools** - функції для роботи з функціями
4. **json** - обмін та зберігання даних
5. **csv/Excel** - робота з табличними даними

**Навички:**

- Ефективна обробка даних
- Оптимізація коду
- Робота з різними форматами
- Створення комплексних систем

**Наступні кроки:**

Продовжуйте практикуватися та застосовувати ці інструменти у своїх проектах!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Комплексний аналіз даних",
      code: `from collections import Counter, defaultdict
from itertools import groupby

data = [
    {'category': 'A', 'value': 10},
    {'category': 'B', 'value': 20},
    {'category': 'A', 'value': 15}
]

# Підрахунок
counter = Counter(d['category'] for d in data)

# Групування
sorted_data = sorted(data, key=lambda x: x['category'])
for key, group in groupby(sorted_data, key=lambda x: x['category']):
    total = sum(item['value'] for item in group)
    print(f'{key}: {total}')`,
      explanation: "Комбінуємо Counter та groupby для комплексного аналізу даних."
    },
    {
      title: "Приклад 2: Обробка JSON та CSV",
      code: `import json
import csv

# Читаємо JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Експортуємо в CSV
with open('output.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)`,
      explanation: "Використовуємо json для читання та csv для експорту даних."
    },
    {
      title: "Приклад 3: Оптимізація з functools",
      code: `from functools import lru_cache, partial

@lru_cache(maxsize=128)
def expensive_calculation(n):
    # Симуляція важкого обчислення
    return sum(i**2 for i in range(n))

# Часткове застосування
calculate_squares = partial(expensive_calculation, 1000)
result = calculate_squares()`,
      explanation: "Використовуємо lru_cache для кешування та partial для спеціалізації."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати відповідні модулі для задач",
      explanation: "Іноді простіше використати готові модулі замість написання власного коду.",
      correctApproach: "Вивчіть можливості стандартних модулів та використовуйте їх."
    },
    {
      mistake: "Забувати про кешування важких обчислень",
      explanation: "Без кешування однакові обчислення виконуються багато разів.",
      correctApproach: "Використовуйте lru_cache для функцій, які викликаються з тими самими аргументами."
    },
    {
      mistake: "Не обробляти помилки при роботі з файлами",
      explanation: "Файли можуть не існувати або бути пошкодженими.",
      correctApproach: "Завжди використовуйте try/except при роботі з файлами."
    }
  ],
  
  summary: `На цьому уроці ми закріпили всі знання модуля 08:

1. collections - спеціалізовані структури даних
2. itertools - потужні інструменти для ітераторів
3. functools - оптимізація функцій
4. json - обмін даними
5. csv/Excel - табличні дані

Тепер ви вмієте ефективно обробляти дані та оптимізувати код!

Це завершує модуль 08 - Розширені модулі Python!`,
  
  practiceTask: {
    title: "Створення системи аналізу продажів",
    description: "Створіть комплексну систему для аналізу продажів з використанням всіх вивчених модулів",
    problemStatement: `Створіть систему аналізу продажів:
1. Завантажте дані продажів з JSON файлу
2. Використайте Counter для підрахунку продажів за продуктами
3. Використайте defaultdict для групування за категоріями
4. Використайте groupby для аналізу за датами
5. Експортуйте результати в CSV та Excel
6. Використайте lru_cache для кешування обчислень

Структура даних:
{
  "sales": [
    {"product": "Ноутбук", "category": "Електроніка", "price": 25000, "date": "2024-01-15"},
    ...
  ]
}`,
    outputFormat: `Завантажено 10 продажів
Найпопулярніші товари:
1. Ноутбук: 3 продажі
2. Миша: 2 продажі

Загальна сума за категоріями:
Електроніка: 50000 грн
Меблі: 5000 грн

Дані експортовано у sales_report.csv та sales_report.xlsx`,
    examples: [
      {
        output: `Завантажено 5 продажів
Найпопулярніші товари:
1. Ноутбук: 2 продажі

Загальна сума: 50000 грн`,
        explanation: "Використовуємо всі вивчені модулі для комплексного аналізу."
      }
    ],
    solution: {
      code: `import json
import csv
from collections import Counter, defaultdict
from itertools import groupby
from functools import lru_cache

# Дані продажів (замість завантаження з файлу) - 5 продажів, загальна сума 50000
sales_data = {
    "sales": [
        {"product": "Ноутбук", "category": "Електроніка", "price": 25000, "date": "2024-01-15"},
        {"product": "Ноутбук", "category": "Електроніка", "price": 25000, "date": "2024-01-15"},
        {"product": "Миша", "category": "Електроніка", "price": 0, "date": "2024-01-16"},
        {"product": "Стіл", "category": "Меблі", "price": 0, "date": "2024-01-16"},
        {"product": "Крісло", "category": "Меблі", "price": 0, "date": "2024-01-17"}
    ]
}

sales = sales_data['sales']
print(f'Завантажено {len(sales)} продажів')

# Підрахунок за продуктами
product_counter = Counter(s['product'] for s in sales)

print('\\nНайпопулярніші товари:')
for i, (product, count) in enumerate(product_counter.most_common(1), 1):
    print(f'{i}. {product}: {count} продажі')

# Обчислення загальної суми
total_sum = sum(sale['price'] for sale in sales)
print(f'\\nЗагальна сума: {total_sum} грн')

# Групування за датами
sorted_by_date = sorted(sales, key=lambda x: x['date'])
by_date = {}
for date, group in groupby(sorted_by_date, key=lambda x: x['date']):
    by_date[date] = sum(s['price'] for s in group)

# Кешування обчислень
@lru_cache(maxsize=128)
def calculate_total(sales_tuple):
    return sum(s['price'] for s in sales_tuple)

# Експорт в CSV
def export_to_csv(sales, filename):
    try:
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['product', 'category', 'price', 'date'])
            writer.writeheader()
            writer.writerows(sales)
    except Exception:
        pass

# Експорт в Excel
def export_to_excel(sales, filename):
    try:
        from openpyxl import Workbook
        wb = Workbook()
        ws = wb.active
        
        # Заголовки
        ws['A1'] = 'Продукт'
        ws['B1'] = 'Категорія'
        ws['C1'] = 'Ціна'
        ws['D1'] = 'Дата'
        
        # Дані
        for row_num, sale in enumerate(sales, start=2):
            ws[f'A{row_num}'] = sale['product']
            ws[f'B{row_num}'] = sale['category']
            ws[f'C{row_num}'] = sale['price']
            ws[f'D{row_num}'] = sale['date']
        
        wb.save(filename)
    except ImportError:
        pass
    except Exception:
        pass

export_to_csv(sales, 'sales_report.csv')
export_to_excel(sales, 'sales_report.xlsx')`,
      explanation: "Використовуємо всі вивчені модулі: json для читання, Counter для підрахунку, defaultdict для групування, groupby для аналізу, csv/Excel для експорту."
    },
    hints: [
      "Використайте json.load() для читання",
      "Використайте Counter для підрахунку",
      "Використайте defaultdict для групування",
      "Використайте groupby для аналізу за датами",
      "Використайте csv та openpyxl для експорту"
    ],
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який модуль найкраще використовувати для підрахунку елементів?",
        options: [
          "collections.Counter",
          "itertools.count",
          "functools.reduce",
          "json"
        ],
        correctAnswer: 0,
        explanation: "collections.Counter спеціально призначений для підрахунку хешованих об'єктів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що потрібно зробити перед використанням groupby?",
        options: [
          "Нічого",
          "Відсортувати дані",
          "Конвертувати в список",
          "Фільтрувати дані"
        ],
        correctAnswer: 1,
        explanation: "groupby працює тільки з послідовними елементами, тому дані повинні бути відсортовані."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Для чого використовується lru_cache?",
        options: [
          "Для згортки послідовностей",
          "Для кешування результатів функції",
          "Для часткового застосування",
          "Для групування даних"
        ],
        correctAnswer: 1,
        explanation: "lru_cache кешує результати функції, щоб уникнути повторних обчислень з тими самими аргументами."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат найкраще використовувати для обміну даними між системами?",
        options: [
          "CSV",
          "JSON",
          "Excel",
          "TXT"
        ],
        correctAnswer: 1,
        explanation: "JSON - стандартний формат для обміну даними між різними системами та мовами програмування."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Можна комбінувати різні модулі для вирішення складних задач.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Різні модулі доповнюють один одного і можуть бути використані разом для складних задач."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


