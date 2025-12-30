/**
 * Lesson 4-2: Обробка винятків (try/except)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson4_2 = {
  lessonId: "lesson-4-2",
  moduleId: "module-4",
  order: 2,
  title: "Обробка винятків (try/except)",
  
  learningObjectives: [
    "Розуміти концепцію винятків",
    "Використовувати try/except блоки",
    "Обробляти конкретні типи помилок",
    "Використовувати finally та else"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-4-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке винятки?",
        content: `Виняток (exception) — це помилка, яка виникає під час виконання програми.

**Типові винятки:**
\`\`\`python
# ZeroDivisionError — ділення на нуль
result = 10 / 0

# ValueError — неправильне значення
number = int("abc")

# TypeError — неправильний тип
result = "5" + 5

# IndexError — індекс поза межами
items = [1, 2, 3]
item = items[10]

# KeyError — ключа немає в словнику
data = {"name": "Олександр"}
value = data["age"]

# FileNotFoundError — файл не знайдено
file = open("неіснуючий_файл.txt")
\`\`\`

**Без обробки винятків програма зупиняється!**
\`\`\`python
number = int(input("Введіть число: "))  # Якщо ввести "abc" — програма впаде
print(f"Число: {number}")
\`\`\``
      },
      {
        title: "Блок try/except",
        content: `**Базовий синтаксис:**
\`\`\`python
try:
    # Код, який може викликати помилку
    number = int(input("Введіть число: "))
    result = 10 / number
    print(f"Результат: {result}")
except:
    # Код, який виконується при помилці
    print("Сталася помилка!")
\`\`\`

**Обробка конкретних винятків:**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
except ValueError:
    print("Помилка: введіть правильне число!")
except ZeroDivisionError:
    print("Помилка: ділення на нуль!")
except Exception as e:
    print(f"Невідома помилка: {e}")
\`\`\`

**Краще обробляти конкретні винятки, ніж загальний except!**
\`\`\`python
# Погано
try:
    # код
except:  # Ловить ВСІ помилки, навіть системні
    pass

# Добре
try:
    # код
except ValueError:
    # обробка конкретної помилки
    pass
\`\`\``
      },
      {
        title: "Блоки else та finally",
        content: `**else** — виконується, якщо помилок не було:
\`\`\`python
try:
    number = int(input("Введіть число: "))
except ValueError:
    print("Помилка введення!")
else:
    print(f"Ви ввели: {number}")  # Виконається тільки якщо не було помилки
\`\`\`

**finally** — виконується завжди:
\`\`\`python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("Файл не знайдено!")
finally:
    file.close()  # Виконається завжди, навіть при помилці
\`\`\`

**Комбінування:**
\`\`\`python
try:
    # код
except ValueError:
    # обробка помилки
else:
    # якщо помилок не було
finally:
    # завжди виконується
\`\`\``
      },
      {
        title: "Підняття винятків (raise)",
        content: `Можна самостійно викликати винятки:

\`\`\`python
def divide(a, b):
    if b == 0:
        raise ValueError("Ділення на нуль неможливе!")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(f"Помилка: {e}")
\`\`\`

**Перевірка умов:**
\`\`\`python
def set_age(age):
    if age < 0:
        raise ValueError("Вік не може бути від'ємним!")
    if age > 150:
        raise ValueError("Вік занадто великий!")
    return age

try:
    age = set_age(-5)
except ValueError as e:
    print(e)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Обробка введення",
      code: `# Безпечне отримання числа
def get_number():
    while True:
        try:
            number = int(input("Введіть число: "))
            return number
        except ValueError:
            print("Помилка! Введіть правильне число.")
        except KeyboardInterrupt:
            print("\\nОперацію скасовано.")
            return None

number = get_number()
if number:
    print(f"Ви ввели: {number}")`,
      explanation: "Демонструє обробку помилок введення з повторенням."
    },
    {
      title: "Приклад 2: Обробка ділення",
      code: `# Безпечне ділення
def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Помилка: ділення на нуль!")
        return None
    except TypeError:
        print("Помилка: нечислові аргументи!")
        return None
    else:
        print("Ділення виконано успішно!")
        return result
    finally:
        print("Операція завершена.")

result = safe_divide(10, 2)
print(f"Результат: {result}")`,
      explanation: "Показує обробку різних типів помилок з else та finally."
    },
    {
      title: "Приклад 3: Валідація з raise",
      code: `# Валідація даних
def validate_score(score):
    if not isinstance(score, (int, float)):
        raise TypeError("Оцінка має бути числом!")
    if score < 0 or score > 100:
        raise ValueError("Оцінка має бути від 0 до 100!")
    return score

try:
    score = validate_score(150)
except ValueError as e:
    print(f"Помилка валідації: {e}")`,
      explanation: "Демонструє використання raise для валідації даних."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання загального except без конкретного типу",
      explanation: "except: ловить всі помилки, включаючи системні, що може приховати важливі помилки.",
      correctApproach: "Завжди вказуйте конкретний тип винятку: except ValueError:"
    },
    {
      mistake: "Порожній except блок",
      explanation: "except: pass приховує помилки, що ускладнює відлагодження.",
      correctApproach: "Завжди обробляйте помилки або логуйте їх."
    },
    {
      mistake: "Забути finally для закриття ресурсів",
      explanation: "Якщо не використати finally, файли можуть залишитися відкритими при помилках.",
      correctApproach: "Використовуйте finally або краще with для автоматичного закриття."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Винятки** — помилки під час виконання програми
2. **try/except** — обробка помилок
3. **Конкретні винятки** — ValueError, ZeroDivisionError, FileNotFoundError тощо
4. **else** — виконується якщо помилок не було
5. **finally** — виконується завжди
6. **raise** — підняття власних винятків

Обробка помилок робить програми надійнішими!`,
  
  practiceTask: {
    title: "Безпечний калькулятор",
    description: "Створіть калькулятор з повною обробкою помилок",
    problemStatement: `Напишіть програму, яка:
1. Отримує два числа від користувача (з обробкою помилок)
2. Отримує операцію (+, -, *, /)
3. Виконує обчислення з обробкою ділення на нуль
4. Обробляє всі можливі помилки
5. Продовжує роботу після помилок`,
    inputFormat: "Користувач вводить дані через input()",
    outputFormat: `Приклад виведення:
Введіть перше число: 10
Введіть операцію: /
Введіть друге число: 0
Помилка: Ділення на нуль неможливе!
Спробуйте ще раз...`,
    examples: [
      {
        input: "a=10, op='/', b=0",
        output: "Помилка: Ділення на нуль неможливе!",
        explanation: "Програма обробляє помилку ділення на нуль"
      }
    ],
    solution: {
      code: `def get_number(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Помилка! Введіть правильне число.")

def calculate(a, b, operation):
    try:
        if operation == "+":
            return a + b
        elif operation == "-":
            return a - b
        elif operation == "*":
            return a * b
        elif operation == "/":
            if b == 0:
                raise ZeroDivisionError("Ділення на нуль неможливе!")
            return a / b
        else:
            raise ValueError(f"Невідома операція: {operation}")
    except ZeroDivisionError as e:
        print(f"Помилка: {e}")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

while True:
    try:
        a = get_number("Введіть перше число: ")
        operation = input("Введіть операцію (+, -, *, /): ")
        b = get_number("Введіть друге число: ")
        
        result = calculate(a, b, operation)
        if result is not None:
            print(f"Результат: {a} {operation} {b} = {result}")
        
        again = input("Продовжити? (так/ні): ").lower()
        if again != "так":
            break
    except KeyboardInterrupt:
        print("\\nПрограму перервано.")
        break`,
      explanation: "Рішення демонструє повну обробку помилок для безпечного калькулятора."
    },
    hints: [
      "Використовуйте try/except для введення чисел",
      "Перевіряйте ділення на нуль перед операцією",
      "Використовуйте цикл для повторення після помилок"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який блок виконується завжди?",
        options: ["try", "except", "else", "finally"],
        correctAnswer: 3,
        explanation: "finally виконується завжди, навіть якщо була помилка."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: int('abc')?",
        options: ["0", "None", "Помилку ValueError", "Помилку TypeError"],
        correctAnswer: 2,
        explanation: "int('abc') викличе ValueError, оскільки 'abc' не можна конвертувати в число."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить raise?",
        options: ["Обробляє помилку", "Викликає помилку", "Ігнорує помилку", "Логує помилку"],
        correctAnswer: 1,
        explanation: "raise викликає (піднімає) виняток самостійно."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

