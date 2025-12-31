/**
 * Lesson 2-3: Практика: задачі на умови
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_3 = {
  lessonId: "lesson-2-3",
  moduleId: "module-2",
  order: 3,
  title: "Практика: задачі на умови",
  
  learningObjectives: [
    "Розв'язувати практичні задачі з умовами",
    "Застосовувати набуті знання",
    "Аналізувати та оптимізувати код",
    "Практикуватися у написанні умовних конструкцій"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-2-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Підхід до розв'язання задач",
        content: `При розв'язанні задач з умовами важливо:

1. **Зрозуміти задачу** — що потрібно зробити?
2. **Визначити умови** — які перевірки потрібні?
3. **Визначити порядок** — які умови перевіряти спочатку?
4. **Написати код** — реалізувати логіку
5. **Протестувати** — перевірити на різних вхідних даних

**Приклад: Визначення сезону за місяцем**

Крок 1: Зрозуміти задачу
- Потрібно визначити сезон (зима, весна, літо, осінь) за номером місяця

Крок 2: Визначити умови
- Грудень, січень, лютий → зима
- Березень, квітень, травень → весна
- Червень, липень, серпень → літо
- Вересень, жовтень, листопад → осінь

Крок 3: Визначити порядок
- Перевіряємо зиму (12, 1, 2)
- Потім весну (3, 4, 5)
- Потім літо (6, 7, 8)
- Інакше осінь (9, 10, 11)

Крок 4: Написати код
\`\`\`python
month = 6

if month == 12 or month == 1 or month == 2:
    season = "зима"
elif month >= 3 and month <= 5:
    season = "весна"
elif month >= 6 and month <= 8:
    season = "літо"
elif month >= 9 and month <= 11:
    season = "осінь"
else:
    season = "невідомий місяць"

print(f"Місяць {month}: {season}")
\`\`\``
      },
      {
        title: "Типові патерни",
        content: `**Патерн 1: Діапазони**
\`\`\`python
score = 85

if score >= 90:
    grade = "Відмінно"
elif score >= 75:
    grade = "Добре"
elif score >= 60:
    grade = "Задовільно"
else:
    grade = "Незадовільно"
\`\`\`

**Патерн 2: Множинний вибір**
\`\`\`python
day = "понеділок"

if day == "субота" or day == "неділя":
    type_day = "вихідний"
elif day == "понеділок" or day == "вівторок" or day == "середа" or day == "четвер" or day == "п'ятниця":
    type_day = "робочий"
else:
    type_day = "невідомий"
\`\`\`

**Патерн 3: Вкладені перевірки**
\`\`\`python
age = 16
has_permission = True

if age >= 13:
    if has_permission:
        access = "повний"
    else:
        access = "обмежений"
else:
    access = "заборонений"
\`\`\``
      },
      {
        title: "Оптимізація коду",
        content: `**Уникайте дублювання коду:**
\`\`\`python
# Погано
if age >= 18:
    print("Повнолітній")
    print("Можна голосувати")
if age >= 18:
    print("Можна водити")

# Добре
if age >= 18:
    print("Повнолітній")
    print("Можна голосувати")
    print("Можна водити")
\`\`\`

**Використовуйте elif замість кількох if:**
\`\`\`python
# Погано
if score >= 90:
    grade = "Відмінно"
if score >= 75 and score < 90:
    grade = "Добре"
if score >= 60 and score < 75:
    grade = "Задовільно"

# Добре
if score >= 90:
    grade = "Відмінно"
elif score >= 75:
    grade = "Добре"
elif score >= 60:
    grade = "Задовільно"
\`\`\`

**Групуйте пов'язані умови:**
\`\`\`python
# Добре
if (age >= 18) and (has_license) and (has_insurance):
    can_drive = True
else:
    can_drive = False
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Визначення типу числа",
      code: `# Перевірка, чи число додатнє, від'ємне або нуль
number = -5

if number > 0:
    number_type = "додатнє"
elif number < 0:
    number_type = "від'ємне"
else:
    number_type = "нуль"

print(f"Число {number} є {number_type}")`,
      explanation: "Простий приклад використання if/elif/else для класифікації."
    },
    {
      title: "Приклад 2: Калькулятор знижок",
      code: `# Розрахунок знижки залежно від суми покупки
total = 1500

if total >= 2000:
    discount = 0.15  # 15% знижка
elif total >= 1000:
    discount = 0.10  # 10% знижка
elif total >= 500:
    discount = 0.05  # 5% знижка
else:
    discount = 0     # Без знижки

final_price = total * (1 - discount)
print(f"Сума: {total}, Знижка: {discount*100}%, До оплати: {final_price}")`,
      explanation: "Демонструє використання умов для розрахунку знижок."
    },
    {
      title: "Приклад 3: Перевірка парності та кратності",
      code: `# Перевірка числа на парність та кратність 3
number = 12

if number % 2 == 0:
    parity = "парне"
else:
    parity = "непарне"

if number % 3 == 0:
    multiple = "кратне 3"
else:
    multiple = "не кратне 3"

print(f"Число {number} є {parity} та {multiple}")`,
      explanation: "Показує використання оператора модуло (%) для перевірки умов."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання кількох if замість elif",
      explanation: "Кілька if перевіряються всі, навіть якщо перший True. elif перевіряється тільки якщо попередні False.",
      correctApproach: "Використовуйте elif для взаємовиключних умов."
    },
    {
      mistake: "Неправильний порядок перевірки діапазонів",
      explanation: "Якщо перевіряти менші діапазони спочатку, більші ніколи не спрацюють.",
      correctApproach: "Перевіряйте діапазони від більших до менших або від менших до більших послідовно."
    },
    {
      mistake: "Забути обробку крайових випадків",
      explanation: "Не всі можливі значення обробляються, що може призвести до помилок.",
      correctApproach: "Завжди додавайте else для обробки неочікуваних значень."
    }
  ],
  
  summary: `На цьому уроці ми практикувалися:

1. **Розв'язання задач** — систематичний підхід до задач з умовами
2. **Типові патерни** — діапазони, множинний вибір, вкладені перевірки
3. **Оптимізація** — уникання дублювання, використання elif, групування умов

Практика допомагає краще розуміти та застосовувати умовні конструкції!`,
  
  practiceTask: {
    title: "Система оцінювання з бонусами",
    description: "Створіть програму для оцінювання з додатковими умовами",
    problemStatement: `Напишіть програму, яка:
1. Приймає бал студента (0-100)
2. Приймає відвідуваність (0-100%)
3. Визначає базову оцінку:
   - 90-100: "Відмінно"
   - 75-89: "Добре"
   - 60-74: "Задовільно"
   - < 60: "Незадовільно"
4. Застосовує бонуси:
   - Якщо відвідуваність >= 95%: підвищити оцінку на один рівень (якщо можливо)
   - Якщо відвідуваність < 60%: знизити оцінку на один рівень
5. Визначає фінальний статус (здав/не здав)
6. Виводить детальну інформацію`,
    inputFormat: "Використовуйте змінні: score = 85, attendance = 96",
    outputFormat: `Приклад виведення:
Бал: 85
Відвідуваність: 96%
Базова оцінка: Добре
Бонус: +1 рівень (відвідуваність >= 95%)
Фінальна оцінка: Відмінно
Статус: Здав`,
    examples: [
      {
        input: "score = 85, attendance = 96",
        output: `Базова оцінка: Добре
Бонус: +1 рівень
Фінальна оцінка: Відмінно
Статус: Здав`,
        explanation: "Висока відвідуваність підвищує оцінку"
      },
      {
        input: "score = 65, attendance = 55",
        output: `Базова оцінка: Задовільно
Штраф: -1 рівень
Фінальна оцінка: Незадовільно
Статус: Не здав`,
        explanation: "Низька відвідуваність знижує оцінку"
      }
    ],
    solution: {
      code: `# Система оцінювання з бонусами
score = 85
attendance = 96

# Визначення базової оцінки
if score >= 90:
    base_grade = "Відмінно"
    grade_value = 4
elif score >= 75:
    base_grade = "Добре"
    grade_value = 3
elif score >= 60:
    base_grade = "Задовільно"
    grade_value = 2
else:
    base_grade = "Незадовільно"
    grade_value = 1

# Застосування бонусів/штрафів
bonus_text = ""
if attendance >= 95 and grade_value < 4:
    grade_value += 1
    bonus_text = "+1 рівень (відвідуваність >= 95%)"
elif attendance < 60 and grade_value > 1:
    grade_value -= 1
    bonus_text = "-1 рівень (відвідуваність < 60%)"
else:
    bonus_text = "Без змін"

# Визначення фінальної оцінки
if grade_value == 4:
    final_grade = "Відмінно"
elif grade_value == 3:
    final_grade = "Добре"
elif grade_value == 2:
    final_grade = "Задовільно"
else:
    final_grade = "Незадовільно"

# Статус
passed = grade_value >= 2

# Виведення
print(f"Бал: {score}")
print(f"Відвідуваність: {attendance}%")
print(f"Базова оцінка: {base_grade}")
print(f"Бонус/Штраф: {bonus_text}")
print(f"Фінальна оцінка: {final_grade}")
print(f"Статус: {'Здав' if passed else 'Не здав'}")`,
      explanation: "Рішення використовує умовні конструкції для визначення оцінки та застосування бонусів/штрафів."
    },
    hints: [
      "Спочатку визначте базову оцінку за балом",
      "Використовуйте числове значення оцінки для зручності зміни рівня",
      "Перевіряйте умови бонусів/штрафів окремо",
      "Визначайте фінальну оцінку на основі зміненого значення"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 5\nif x > 3:\n    print('A')\nif x > 4:\n    print('B')\nelse:\n    print('C')\n```",
        options: ["A", "B", "A B", "A C"],
        correctAnswer: 2,
        explanation: "Обидва if виконуються: x > 3 (True) → 'A', x > 4 (True) → 'B'. Виведе 'A B'."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 5\nif x > 3:\n    print('A')\nelif x > 4:\n    print('B')\nelse:\n    print('C')\n```",
        options: ["A", "B", "C", "A B"],
        correctAnswer: 0,
        explanation: "elif виконується тільки якщо попередній if False. x > 3 (True) → 'A', elif не перевіряється."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно перевірити, чи число в діапазоні від 10 до 20?",
        options: [
          "if 10 <= number <= 20:",
          "if number >= 10 and number <= 20:",
          "Обидва варіанти правильні",
          "Жоден не правильний"
        ],
        correctAnswer: 2,
        explanation: "Обидва варіанти правильні в Python. Перший коротший, другий більш явний."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
