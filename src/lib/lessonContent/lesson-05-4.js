/**
 * Lesson 05-4: Assert та валідація даних
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_4 = {
  lessonId: "lesson-05-4",
  moduleId: "module-05",
  order: 4,
  title: "Assert та валідація даних",

  learningObjectives: [
    "Використовувати assert для перевірки внутрішніх припущень",
    "Розуміти різницю між assert і raise ValueError",
    "Валідувати вхідні дані на межі програми",
    "Писати функції валідації з зрозумілими повідомленнями",
    "Обирати правильний інструмент: assert для розробки, винятки для контракту API"
  ],

  prerequisites: ["lesson-05-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке assert?",
        content: `\`assert\` - короткий спосіб сказати: «я впевнений, що умова істинна; якщо ні - це баг».

**Синтаксис:**

\`\`\`python
assert умова
assert умова, "Повідомлення про помилку"
\`\`\`

**Приклад:**

\`\`\`python
def average(numbers):
    assert len(numbers) > 0, "Список не може бути порожнім"
    return sum(numbers) / len(numbers)

print(average([10, 20, 30]))  # 20.0
# average([])  → AssertionError: Список не може бути порожнім
\`\`\`

Якщо умова \`False\`, Python піднімає \`AssertionError\`.

**Ідея:** assert документує **внутрішні інваріанти** програми - речі, які «ніколи не мають статися», якщо код написаний правильно.`
      },
      {
        title: "Як працює AssertionError",
        content: `\`\`\`python
x = 5
assert x > 0          # ок
assert x < 0, "x має бути від’ємним"  # AssertionError
\`\`\`

**Важлива особливість:** запуск із оптимізацією (\`python -O\`) **вимикає** assert!

\`\`\`bash
python -O script.py   # усі assert ігноруються
\`\`\`

Тому **не можна** покладатися на assert для:

- перевірки введення користувача
- безпеки (права доступу, паролі)
- бізнес-правил у продакшені

Для цього використовуйте \`raise ValueError\` / власні винятки.

Assert - інструмент **розробки й тестування припущень**, а не публічний контракт функції для зовнішніх даних.`
      },
      {
        title: "Валідація даних",
        content: `**Валідація** - перевірка, що дані коректні **до** основної обробки.

**Типові перевірки:**

- тип (\`isinstance\`)
- діапазон (вік 0-120, оцінка 0-100)
- формат (email містить \`@\`)
- обов’язковість (рядок не порожній)
- узгодженість полів між собою

\`\`\`python
def validate_score(score):
    if not isinstance(score, int):
        raise ValueError("Оцінка має бути цілим числом")
    if score < 0 or score > 100:
        raise ValueError("Оцінка має бути від 0 до 100")
    return score
\`\`\`

**Принцип «валідація на вході»:** чим раніше відхилили погані дані, тим менше багів глибше в коді.`
      },
      {
        title: "assert vs raise ValueError",
        content: `Це ключова відмінність уроку.

| | assert | raise ValueError / власний Error |
|--|--------|-----------------------------------|
| Призначення | Внутрішні припущення розробника | Контракт для зовнішніх/вхідних даних |
| Вимикається -O | Так | Ні |
| Типовий виняток | AssertionError | ValueError, TypeError, YourError |
| Повідомлення користувачу | Зазвичай ні | Так |

\`\`\`python
# Для користувацького вводу - raise
def set_username(name):
    if not name.strip():
        raise ValueError("Ім’я не може бути порожнім")
    return name.strip()

# Для внутрішньої логіки після валідації - assert
def _normalize(scores):
    assert all(0 <= s <= 100 for s in scores)
    return [s / 100 for s in scores]
\`\`\`

**Правило SmartCode:** на межі системи (stdin, API, форма) - \`raise\`; всередині після перевірок - можна \`assert\`.`
      },
      {
        title: "Практичні патерни валідації",
        content: `**1. Функція-валідатор, що повертає значення або кидає помилку:**

\`\`\`python
def require_positive(n, name="значення"):
    if not isinstance(n, (int, float)):
        raise TypeError(f"{name} має бути числом")
    if n <= 0:
        raise ValueError(f"{name} має бути додатним")
    return n
\`\`\`

**2. Валідація словника / запису:**

\`\`\`python
def validate_user(data):
    if "name" not in data or not data["name"]:
        raise ValueError("Потрібне поле name")
    age = data.get("age")
    if not isinstance(age, int) or age < 0:
        raise ValueError("Некоректний age")
    return data
\`\`\`

**3. assert для пост-умов:**

\`\`\`python
def clamp(value, low, high):
    result = max(low, min(high, value))
    assert low <= result <= high
    return result
\`\`\`

Комбінуйте: зовні - чіткі \`ValueError\`, всередині - \`assert\` на інваріанти.`
      },
      {
        title: "Типові помилки та хороші повідомлення",
        content: `**Погані повідомлення:**

\`\`\`python
raise ValueError("помилка")
assert False
\`\`\`

**Кращі повідомлення:**

\`\`\`python
raise ValueError("Оцінка має бути від 0 до 100, отримано: 150")
assert len(items) > 0, "items не може бути порожнім перед average()"
\`\`\`

**Що має містити повідомлення:**

1. Яке поле / значення некоректне
2. Яке обмеження порушено
3. За можливості - фактичне значення

\`\`\`python
def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError(
            f"Оцінка має бути від 0 до 100, отримано: {score}"
        )
    return score
\`\`\`

У практичному завданні ви застосуєте валідацію оцінок через \`ValueError\` - саме той підхід, що підходить для вводу користувача.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Базовий assert",
      code: `def square_root(x):
    assert x >= 0, "x не може бути від’ємним"
    return x ** 0.5

print(square_root(9))  # 3.0`,
      explanation: "assert перевіряє внутрішню передумову функції."
    },
    {
      title: "Валідація через ValueError",
      code: `def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError("Оцінка має бути від 0 до 100")
    return score

try:
    print(validate_score(85))
    validate_score(150)
except ValueError as e:
    print(f"Помилка: {e}")`,
      explanation: "Для зовнішніх даних використовуємо raise ValueError."
    },
    {
      title: "assert після валідації",
      code: `def process_scores(scores):
    if not scores:
        raise ValueError("Список оцінок порожній")
    cleaned = [int(s) for s in scores]
    assert all(0 <= s <= 100 for s in cleaned)
    return sum(cleaned) / len(cleaned)

print(process_scores([80, 90, 100]))`,
      explanation: "Спочатку контракт через ValueError, потім assert на інваріант."
    },
    {
      title: "Повідомлення з фактичним значенням",
      code: `def require_in_range(value, low, high):
    if value < low or value > high:
        raise ValueError(
            f"Очікувалось [{low}; {high}], отримано: {value}"
        )
    return value

print(require_in_range(50, 0, 100))`,
      explanation: "Детальне повідомлення спрощує виправлення помилки."
    }
  ],

  commonMistakes: [
    {
      mistake: "Валідувати ввід користувача через assert",
      explanation: "assert можна вимкнути прапорцем -O, тож перевірка зникне в продакшені.",
      correctApproach: "Для stdin/API використовуйте raise ValueError або власний виняток."
    },
    {
      mistake: "assert без повідомлення",
      explanation: "AssertionError без тексту важко діагностувати.",
      correctApproach: "assert умова, \"що саме порушено\""
    },
    {
      mistake: "Занадто загальне повідомлення ValueError",
      explanation: "\"невірні дані\" не допомагає користувачу виправити ввід.",
      correctApproach: "Вказуйте поле, діапазон і фактичне значення."
    },
    {
      mistake: "Валідація глибоко всередині замість на вході",
      explanation: "Погані дані проходять через кілька шарів і ламають логіку незрозуміло.",
      correctApproach: "Перевіряйте дані одразу на межі системи."
    }
  ],

  summary: `На цьому уроці ми вивчили assert і валідацію:

1. assert - перевірка внутрішніх припущень (може вимикатися -O)
2. AssertionError - наслідок невдалого assert
3. Валідація на вході - захист від некоректних даних
4. raise ValueError - правильний інструмент для зовнішнього контракту
5. Зрозумілі повідомлення - ключ до зручної обробки помилок

У наступному уроці закріпимо все на комплексній практиці.`,

  practiceTask: {
    title: "Валідація оцінок",
    description: "Перевірте оцінки в діапазоні 0-100 за допомогою ValueError",
    problemStatement: `Напишіть функцію validate_score(score):
- якщо score < 0 або score > 100 - raise ValueError("Оцінка має бути від 0 до 100")
- інакше поверніть score

Зчитайте n, потім n цілих чисел.
Для кожного:
- викличте validate_score у try/except
- при успіху виведіть: OK: {score}
- при ValueError виведіть: Помилка: {повідомлення}

Не використовуйте assert для цієї задачі - потрібен саме raise ValueError (валідація вводу).`,
    outputFormat: `OK: 85
Помилка: Оцінка має бути від 0 до 100
Помилка: Оцінка має бути від 0 до 100`,
    examples: [
      {
        input: `3
85
-1
101`,
        output: `OK: 85
Помилка: Оцінка має бути від 0 до 100
Помилка: Оцінка має бути від 0 до 100`,
        explanation: "Одна валідна оцінка і дві поза діапазоном"
      },
      {
        input: `2
0
100`,
        output: `OK: 0
OK: 100`,
        explanation: "Межі діапазону включно"
      },
      {
        input: `2
50
200`,
        output: `OK: 50
Помилка: Оцінка має бути від 0 до 100`,
        explanation: "Успіх і занадто велике значення"
      }
    ],
    solution: {
      code: `def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError("Оцінка має бути від 0 до 100")
    return score

n = int(input())
for _ in range(n):
    score = int(input())
    try:
        validate_score(score)
        print(f"OK: {score}")
    except ValueError as e:
        print(f"Помилка: {e}")`,
      explanation: "Валідація через raise ValueError - правильний підхід для даних зі stdin."
    },
    hints: [
      "У validate_score використовуйте raise ValueError, не assert",
      "Діапазон: 0 <= score <= 100",
      "Зчитайте n і цикл по оцінках",
      "Формат успіху: OK: {score}"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який виняток піднімає невдалий assert?",
        options: ["ValueError", "TypeError", "AssertionError", "RuntimeError"],
        correctAnswer: 2,
        explanation: "Невдалий assert завжди дає AssertionError."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому не варто валідувати ввід користувача через assert?",
        options: [
          "Бо assert можна вимкнути через python -O",
          "Бо assert не існує в Python",
          "Бо assert працює лише з рядками",
          "Бо assert повільніший за if"
        ],
        correctAnswer: 0,
        explanation: "При -O усі assert видаляються, тож перевірка зникне."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться?\n\n```python\nassert 1 == 2, \"не ок\"\n```",
        options: [
          "AssertionError з повідомленням \"не ок\"",
          "ValueError",
          "Нічого",
          "Надрукує \"не ок\""
        ],
        correctAnswer: 0,
        explanation: "Умова хибна - піднімається AssertionError з текстом."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Для перевірки оцінки зі stdin краще raise ValueError, ніж assert.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Зовнішні дані - це контракт через звичайні винятки."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке валідація даних?",
        options: [
          "Перевірка коректності даних перед обробкою",
          "Сортування списку",
          "Видалення файлу",
          "Компіляція програми"
        ],
        correctAnswer: 0,
        explanation: "Валідація перевіряє, що дані відповідають правилам."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де найкраще розміщувати assert?",
        options: [
          "Для внутрішніх інваріантів після валідації",
          "Замість усіх if у програмі",
          "Для паролів і прав доступу",
          "Лише в finally"
        ],
        correctAnswer: 0,
        explanation: "Assert підходить для внутрішніх припущень, не для безпеки чи вводу."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Повідомлення у ValueError має пояснювати, що саме не так.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Зрозуміле повідомлення допомагає виправити дані."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який синтаксис правильний?",
        options: [
          "assert x > 0, \"x має бути додатним\"",
          "assert(x > 0) else \"помилка\"",
          "assert: x > 0",
          "check x > 0"
        ],
        correctAnswer: 0,
        explanation: "Стандартний синтаксис: assert умова, повідомлення."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
