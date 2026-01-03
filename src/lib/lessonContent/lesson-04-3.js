/**
 * Lesson 04-3: Обробка помилок: try / except / finally
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_3 = {
  lessonId: "lesson-04-3",
  moduleId: "module-04",
  order: 3,
  title: "Обробка помилок: try / except / finally",
  
  learningObjectives: [
    "Розуміти концепцію винятків",
    "Використовувати try/except блоки",
    "Обробляти конкретні типи помилок",
    "Використовувати finally та else",
    "Розуміти ієрархію винятків"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-04-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке винятки?",
        content: `**Виняток (Exception)** - це помилка, яка виникає під час виконання програми.

**Типи помилок:**
1. **Синтаксичні помилки** - помилки в коді (виявляються до запуску)
2. **Винятки** - помилки під час виконання (виявляються під час роботи)

**Приклади винятків:**
- \`FileNotFoundError\` - файл не знайдено
- \`ValueError\` - неправильне значення
- \`ZeroDivisionError\` - ділення на нуль
- \`TypeError\` - неправильний тип даних
- \`IndexError\` - індекс поза межами

**Без обробки помилок:**
\`\`\`python
number = int(input("Введіть число: "))  # Якщо ввести текст - помилка!
result = 10 / number  # Якщо number = 0 - помилка!
print(result)
\`\`\`

**З обробкою помилок:**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
    print(result)
except ValueError:
    print("Потрібно ввести число!")
except ZeroDivisionError:
    print("Не можна ділити на нуль!")
\`\`\``
      },
      {
        title: "Синтаксис try/except",
        content: `**Базова структура:**

\`\`\`python
try:
    # Код, який може викликати помилку
    небезпечний_код
except ТипПомилки:
    # Що робити якщо сталася помилка
    обробка_помилки
\`\`\`

**Приклад 1: Обробка ValueError**
\`\`\`python
try:
    age = int(input("Скільки вам років? "))
    print(f"Вам {age} років")
except ValueError:
    print("Потрібно ввести число!")
\`\`\`

**Приклад 2: Обробка FileNotFoundError**
\`\`\`python
try:
    with open("data.txt", "r") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("Файл не знайдено!")
\`\`\`

**Приклад 3: Обробка кількох помилок**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
    print(f"Результат: {result}")
except ValueError:
    print("Потрібно ввести число!")
except ZeroDivisionError:
    print("Не можна ділити на нуль!")
\`\`\``
      },
      {
        title: "except без типу",
        content: `Можна обробляти **всі** винятки одночасно:

\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
    print(result)
except:
    print("Сталася якась помилка!")
\`\`\`

**Коли використовувати:**
- Коли не важливо яка саме помилка
- Для швидкого прототипування
- Коли потрібно просто запобігти падінню програми

**Коли НЕ використовувати:**
- В продакшн коді (краще обробляти конкретні помилки)
- Коли потрібно різну обробку для різних помилок

**Краще рішення:**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
    print(result)
except Exception as e:
    print(f"Помилка: {e}")  # Виводить тип помилки
\`\`\``
      },
      {
        title: "else та finally",
        content: `**else** - виконується якщо помилок не було:

\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
except ValueError:
    print("Потрібно ввести число!")
except ZeroDivisionError:
    print("Не можна ділити на нуль!")
else:
    print(f"Результат: {result}")  # Виконується тільки якщо все ОК
\`\`\`

**finally** - виконується **завжди**, навіть при помилках:

\`\`\`python
try:
    file = open("data.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("Файл не знайдено!")
finally:
    file.close()  # Завжди закриваємо файл
    print("Очищення завершено")
\`\`\`

**Повна структура:**
\`\`\`python
try:
    # Небезпечний код
    код
except ТипПомилки:
    # Обробка помилки
    обробка
else:
    # Якщо помилок не було
    успіх
finally:
    # Завжди виконується
    очищення
\`\`\``
      },
      {
        title: "Ієрархія винятків",
        content: `**Всі винятки успадковуються від Exception:**

\`\`\`
BaseException
  └── Exception
      ├── ValueError
      ├── TypeError
      ├── FileNotFoundError
      ├── ZeroDivisionError
      └── ...
\`\`\`

**Важливо:** Обробляй спочатку конкретні помилки, потім загальні!

**Правильно:**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
except ZeroDivisionError:  # Конкретна помилка спочатку
    print("Ділення на нуль!")
except ValueError:  # Конкретна помилка
    print("Потрібно число!")
except Exception:  # Загальна помилка в кінці
    print("Інша помилка!")
\`\`\`

**Неправильно:**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
except Exception:  # Загальна помилка спочатку - погано!
    print("Помилка!")
except ZeroDivisionError:  # Це ніколи не виконається!
    print("Ділення на нуль!")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий try/except",
      code: `# Обробка ValueError
try:
    age = int(input("Скільки вам років? "))
    print(f"Вам {age} років")
except ValueError:
    print("Потрібно ввести число!")`,
      explanation: "Демонструє базову обробку помилки ValueError."
    },
    {
      title: "Приклад 2: Кілька except",
      code: `# Обробка кількох помилок
try:
    number = int(input("Введіть число: "))
    result = 10 / number
    print(result)
except ValueError:
    print("Потрібно ввести число!")
except ZeroDivisionError:
    print("Не можна ділити на нуль!")`,
      explanation: "Показує обробку кількох різних типів помилок."
    },
    {
      title: "Приклад 3: else та finally",
      code: `# Використання else та finally
try:
    number = int(input("Введіть число: "))
    result = 10 / number
except ValueError:
    print("Потрібно ввести число!")
else:
    print(f"Результат: {result}")
finally:
    print("Операція завершена")`,
      explanation: "Демонструє використання else (при успіху) та finally (завжди)."
    },
    {
      title: "Приклад 4: Обробка файлів",
      code: `# Обробка помилок при роботі з файлами
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("Файл не знайдено!")
except PermissionError:
    print("Немає доступу до файлу!")`,
      explanation: "Показує обробку помилок при роботі з файлами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Обробляти загальні помилки перед конкретними",
      explanation: "Якщо except Exception йде перед except ValueError, ValueError ніколи не спрацює.",
      correctApproach: "Завжди обробляй конкретні помилки перед загальними"
    },
    {
      mistake: "Використовувати except без типу",
      explanation: "except без типу ловить всі помилки, навіть ті, які не очікувались.",
      correctApproach: "Краще обробляти конкретні типи помилок або використовувати except Exception as e"
    },
    {
      mistake: "Забути про finally для очищення",
      explanation: "Без finally можна забути закрити файли або звільнити ресурси.",
      correctApproach: "Використовуй finally для очищення ресурсів або with statement"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Винятки** - помилки під час виконання програми
2. **try/except** - обробка помилок
3. **Конкретні типи помилок** - ValueError, FileNotFoundError, ZeroDivisionError
4. **else** - код при успішному виконанні
5. **finally** - код, який завжди виконується
6. **Ієрархія винятків** - порядок обробки помилок

Тепер ви вмієте обробляти помилки та робити програми більш надійними!

Наступний урок - створення власних винятків!`,
  
  practiceTask: {
    title: "Калькулятор з обробкою помилок",
    description: "Створіть калькулятор з обробкою різних типів помилок",
    problemStatement: `Напишіть програму, яка:
1. Використовує захардкожені значення: num1 = 10, num2 = 5, operation = "/"
2. Виконує обчислення залежно від операції
3. Обробляє помилки:
   - ZeroDivisionError - якщо ділення на нуль
   - Інші помилки
4. Використовує try/except/else/finally
5. Виводить результат або повідомлення про помилку`,
    outputFormat: `Приклад виведення:
Результат: 2.0
Операція завершена`,
    examples: [
      {
        output: `Результат: 2.0
Операція завершена`,
        explanation: "Програма виконує ділення та виводить результат"
      },
    ],
    solution: {
      code: `# Калькулятор з обробкою помилок
num1 = 10
num2 = 5
operation = "/"

try:
    if operation == "+":
        result = num1 + num2
    elif operation == "-":
        result = num1 - num2
    elif operation == "*":
        result = num1 * num2
    elif operation == "/":
        result = num1 / num2
    else:
        print("Невідома операція!")
        result = None
except ZeroDivisionError:
    print("Не можна ділити на нуль!")
    result = None
except Exception as e:
    print(f"Помилка: {e}")
    result = None
else:
    if result is not None:
        print(f"Результат: {result}")
finally:
    print("Операція завершена")`,
      explanation: "Рішення використовує захардкожені значення, try/except для обробки ZeroDivisionError, else для виведення результату, та finally для завершення."
    },
    hints: [
      "Використовуйте float() для введення чисел",
      "Обробляйте ValueError для некоректного введення",
      "Обробляйте ZeroDivisionError для ділення на нуль",
      "Використовуйте else для виведення результату",
      "Використовуйте finally для завершення операції"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке виняток (exception)?",
        options: [
          "Помилка під час виконання програми",
          "Синтаксична помилка",
          "Помилка в назві змінної",
          "Коментар у коді"
        ],
        correctAnswer: 0,
        explanation: "Виняток - це помилка, яка виникає під час виконання програми."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Помилка ділення')\nprint('Продовжено')\n```",
        options: [
          "Помилка ділення\\nПродовжено",
          "Помилку",
          "Продовжено",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "ZeroDivisionError обробляється, виводиться 'Помилка ділення', потім 'Продовжено'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується блок finally?",
        options: [
          "Завжди, навіть при помилках",
          "Тільки якщо помилок не було",
          "Тільки при помилках",
          "Ніколи"
        ],
        correctAnswer: 0,
        explanation: "finally виконується завжди, незалежно від того, чи була помилка."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    number = int('10')\n    print(number)\nexcept ValueError:\n    print('Помилка')\nelse:\n    print('Успіх')\n```",
        options: [
          "10\\nУспіх",
          "Помилка",
          "10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "int('10') успішно виконується, виводиться 10, потім else блок виводить 'Успіх'."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який порядок обробки помилок правильний?",
        options: [
          "Конкретні помилки спочатку, загальні в кінці",
          "Загальні помилки спочатку, конкретні в кінці",
          "Будь-який порядок",
          "Тільки конкретні помилки"
        ],
        correctAnswer: 0,
        explanation: "Конкретні помилки мають оброблятися перед загальними, інакше загальні перехоплять їх."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
