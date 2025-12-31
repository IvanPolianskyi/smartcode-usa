/**
 * Lesson 7-8: Практика: використання стандартної бібліотеки
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_8 = {
  lessonId: "lesson-7-8",
  moduleId: "module-7",
  order: 8,
  title: "Практика: використання стандартної бібліотеки",
  
  learningObjectives: [
    "Застосувати модулі стандартної бібліотеки",
    "Створити проект з використанням різних модулів",
    "Оптимізувати код за допомогою бібліотеки",
    "Практикуватися у використанні інструментів",
    "Об'єднати всі знання модуля 7"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-7-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `**Мета:** Створити повноцінну систему аналізу даних з використанням модулів стандартної бібліотеки.

**Що ми створимо:**
- Систему збору та аналізу статистики
- Роботу з файлами та датами
- Генерацію звітів
- Оптимізацію з functools

**Модулі, які використаємо:**
- ✅ math — математичні обчислення
- ✅ random — генерація випадкових даних
- ✅ datetime — робота з датами
- ✅ pathlib — робота з файлами
- ✅ collections — спеціалізовані контейнери
- ✅ itertools — ітератори
- ✅ functools — оптимізація функцій

**Структура проекту:**
- Модульна організація
- Повна обробка помилок
- Документація`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад структури проекту",
      code: `# Структура проекту
# data_analyzer.py - головний модуль
# statistics.py - статистичні функції
# file_handler.py - робота з файлами
# report_generator.py - генерація звітів

# Приклад імпортів
import math
import random
from datetime import datetime, timedelta
from pathlib import Path
from collections import Counter, defaultdict
from itertools import groupby
from functools import lru_cache, partial`,
      explanation: "Демонструє модульну структуру проекту."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати модулі стандартної бібліотеки",
      explanation: "Написання власних реалізацій замість використання готових модулів ускладнює код.",
      correctApproach: "Використовуйте модулі стандартної бібліотеки для спрощення та оптимізації коду."
    },
    {
      mistake: "Не об'єднувати модулі",
      explanation: "Використання тільки одного модуля не демонструє повне розуміння.",
      correctApproach: "Комбінуйте різні модулі для створення потужних рішень."
    }
  ],
  
  summary: `На цьому уроці ми створили повноцінний проект, який об'єднує всі знання модуля 7:

1. **math та random** — математичні обчислення та випадковість
2. **datetime** — робота з датами та часом
3. **os, sys, pathlib** — робота з файловою системою
4. **collections** — спеціалізовані контейнери
5. **itertools** — ефективні ітератори
6. **functools** — оптимізація функцій

Проект демонструє практичне застосування всіх модулів стандартної бібліотеки!`,
  
  practiceTask: {
    title: "Система аналізу даних",
    description: "Створіть систему аналізу з використанням стандартної бібліотеки",
    problemStatement: `Створіть систему аналізу даних з використанням модулів стандартної бібліотеки:

**Частина 1: Збір даних (random, datetime)**
- generate_sample_data(count) — генерує випадкові дані
  - Кожен запис: дата, значення, категорія
  - Використовуйте random та datetime

**Частина 2: Статистичний аналіз (math, collections)**
- calculate_statistics(data) — обчислює статистику
  - Середнє, медіана, стандартне відхилення
  - Використовуйте math для обчислень
  - Використовуйте Counter для підрахунку

**Частина 3: Групування (itertools, collections)**
- group_by_category(data) — групує за категоріями
  - Використовуйте groupby або defaultdict

**Частина 4: Робота з файлами (pathlib)**
- save_report(data, filename) — зберігає звіт
- load_data(filename) — завантажує дані

**Частина 5: Оптимізація (functools)**
- Використовуйте lru_cache для кешування обчислень
- Використовуйте partial для створення спеціалізованих функцій

**Створіть систему та продемонструйте роботу.**`,
    inputFormat: "Створіть модульну систему",
    outputFormat: `Приклад виведення:
=== Система аналізу даних ===
Згенеровано 100 записів

Статистика:
- Середнє: 50.3
- Медіана: 50.0
- Стандартне відхилення: 15.2

Групування за категоріями:
- Категорія A: 35 записів
- Категорія B: 33 записи
- Категорія C: 32 записи`,
    examples: [
      {
        input: "Генерація та аналіз даних",
        output: "Система працює з усіма модулями",
        explanation: "Демонстрація всіх модулів стандартної бібліотеки"
      }
    ],
    solution: {
      code: `import math
import random
from datetime import datetime, timedelta
from pathlib import Path
from collections import Counter, defaultdict
from itertools import groupby
from functools import lru_cache, partial
from dataclasses import dataclass

# ===== СТРУКТУРА ДАНИХ =====
@dataclass
class DataPoint:
    date: datetime
    value: float
    category: str

# ===== ГЕНЕРАЦІЯ ДАНИХ =====
def generate_sample_data(count=100):
    """Генерує випадкові дані."""
    categories = ['A', 'B', 'C']
    start_date = datetime.now() - timedelta(days=30)
    
    data = []
    for i in range(count):
        date = start_date + timedelta(days=random.randint(0, 30))
        value = random.uniform(0, 100)
        category = random.choice(categories)
        data.append(DataPoint(date, value, category))
    
    return data

# ===== СТАТИСТИЧНИЙ АНАЛІЗ =====
@lru_cache(maxsize=128)
def calculate_statistics(values):
    """Обчислює статистику (кешована версія для tuple)."""
    if not values:
        return {}
    
    values_list = list(values)
    n = len(values_list)
    
    # Середнє
    mean = sum(values_list) / n
    
    # Медіана
    sorted_values = sorted(values_list)
    if n % 2 == 0:
        median = (sorted_values[n//2 - 1] + sorted_values[n//2]) / 2
    else:
        median = sorted_values[n//2]
    
    # Стандартне відхилення
    variance = sum((x - mean) ** 2 for x in values_list) / n
    std_dev = math.sqrt(variance)
    
    # Мінімум та максимум
    minimum = min(values_list)
    maximum = max(values_list)
    
    return {
        'mean': mean,
        'median': median,
        'std_dev': std_dev,
        'min': minimum,
        'max': maximum,
        'count': n
    }

def analyze_data(data):
    """Аналізує дані."""
    values = tuple(point.value for point in data)
    stats = calculate_statistics(values)
    
    # Підрахунок за категоріями
    categories = [point.category for point in data]
    category_count = Counter(categories)
    
    return {
        'statistics': stats,
        'category_count': dict(category_count)
    }

# ===== ГРУПУВАННЯ =====
def group_by_category(data):
    """Групує дані за категоріями."""
    # Сортування перед групуванням
    sorted_data = sorted(data, key=lambda x: x.category)
    
    grouped = defaultdict(list)
    for point in sorted_data:
        grouped[point.category].append(point)
    
    return dict(grouped)

def group_by_date_range(data, days=7):
    """Групує дані за діапазонами дат."""
    sorted_data = sorted(data, key=lambda x: x.date)
    
    groups = defaultdict(list)
    for point in sorted_data:
        # Групуємо за тижнями
        week_num = (point.date - sorted_data[0].date).days // days
        groups[week_num].append(point)
    
    return dict(groups)

# ===== РОБОТА З ФАЙЛАМИ =====
def save_report(data, filename="report.txt"):
    """Зберігає звіт у файл."""
    path = Path(filename)
    
    analysis = analyze_data(data)
    grouped = group_by_category(data)
    
    report = "=== ЗВІТ З АНАЛІЗУ ДАНИХ ===\\n\\n"
    report += f"Дата створення: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\\n"
    report += f"Всього записів: {len(data)}\\n\\n"
    
    report += "=== СТАТИСТИКА ===\\n"
    stats = analysis['statistics']
    report += f"Середнє: {stats['mean']:.2f}\\n"
    report += f"Медіана: {stats['median']:.2f}\\n"
    report += f"Стандартне відхилення: {stats['std_dev']:.2f}\\n"
    report += f"Мінімум: {stats['min']:.2f}\\n"
    report += f"Максимум: {stats['max']:.2f}\\n\\n"
    
    report += "=== ГРУПУВАННЯ ЗА КАТЕГОРІЯМИ ===\\n"
    for category, points in grouped.items():
        report += f"Категорія {category}: {len(points)} записів\\n"
    
    path.write_text(report, encoding="utf-8")
    return f"Звіт збережено у {filename}"

def load_data_from_file(filename):
    """Завантажує дані з файлу (симуляція)."""
    path = Path(filename)
    if not path.exists():
        return None
    # Тут можна реалізувати реальне завантаження
    return None

# ===== СПЕЦІАЛІЗОВАНІ ФУНКЦІЇ (PARTIAL) =====
def filter_data(data, min_value=None, max_value=None, category=None):
    """Фільтрує дані."""
    filtered = data
    if min_value is not None:
        filtered = [p for p in filtered if p.value >= min_value]
    if max_value is not None:
        filtered = [p for p in filtered if p.value <= max_value]
    if category is not None:
        filtered = [p for p in filtered if p.category == category]
    return filtered

# Створюємо спеціалізовані функції
filter_high_values = partial(filter_data, min_value=70)
filter_low_values = partial(filter_data, max_value=30)
filter_category_a = partial(filter_data, category='A')

# ===== ГОЛОВНА ФУНКЦІЯ =====
def демонстрація():
    """Демонстрація роботи системи."""
    print("=== Система аналізу даних ===\\n")
    
    # Генерація даних
    print("Генерація даних...")
    data = generate_sample_data(100)
    print(f"Згенеровано {len(data)} записів\\n")
    
    # Аналіз
    print("=== Аналіз даних ===")
    analysis = analyze_data(data)
    stats = analysis['statistics']
    
    print(f"Середнє: {stats['mean']:.2f}")
    print(f"Медіана: {stats['median']:.2f}")
    print(f"Стандартне відхилення: {stats['std_dev']:.2f}")
    print(f"Мінімум: {stats['min']:.2f}")
    print(f"Максимум: {stats['max']:.2f}")
    
    print(f"\\nГрупування за категоріями:")
    for category, count in analysis['category_count'].items():
        print(f"  Категорія {category}: {count} записів")
    
    # Групування
    print(f"\\n=== Детальне групування ===")
    grouped = group_by_category(data)
    for category, points in grouped.items():
        values = [p.value for p in points]
        avg = sum(values) / len(values)
        print(f"Категорія {category}: {len(points)} записів, середнє: {avg:.2f}")
    
    # Фільтрація
    print(f"\\n=== Фільтрація ===")
    high = filter_high_values(data)
    low = filter_low_values(data)
    category_a = filter_category_a(data)
    
    print(f"Високі значення (>=70): {len(high)} записів")
    print(f"Низькі значення (<=30): {len(low)} записів")
    print(f"Категорія A: {len(category_a)} записів")
    
    # Збереження звіту
    print(f"\\n=== Збереження звіту ===")
    print(save_report(data, "analysis_report.txt"))
    
    print("\\n=== Система працює успішно! ===")

if __name__ == "__main__":
    демонстрація()`,
      explanation: "Рішення демонструє повну систему аналізу з використанням всіх модулів стандартної бібліотеки."
    },
    hints: [
      "Використовуйте random для генерації даних",
      "Використовуйте datetime для роботи з датами",
      "Використовуйте math для статистичних обчислень",
      "Використовуйте collections для групування",
      "Використовуйте functools для оптимізації",
      "Використовуйте pathlib для роботи з файлами"
    ],
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Які модулі стандартної бібліотеки ми вивчили?",
        options: ["Тільки math", "Всі основні модулі", "Тільки datetime", "Тільки collections"],
        correctAnswer: 1,
        explanation: "Ми вивчили багато модулів: math, random, datetime, time, os, sys, pathlib, collections, itertools, functools."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо використовувати стандартну бібліотеку?",
        options: ["Швидше", "Оптимізовано та перевірено", "Краще виглядає", "Менше коду"],
        correctAnswer: 1,
        explanation: "Стандартна бібліотека оптимізована, перевірена та підтримується, що робить код надійнішим."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

