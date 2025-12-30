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
- **ZeroDivisionError** — ділення на нуль
- **ValueError** — неправильне значення
- **TypeError** — неправильний тип
- **FileNotFoundError** — файл не знайдено
- **KeyError** — ключ не знайдено в словнику
- **IndexError** — індекс поза межами списку

**Без обробки винятків:**
\`\`\`python
number = int(input("Введіть число: "))  # Якщо ввести текст — програма впаде!
result = 10 / number  # Якщо 0 — програма впаде!
\`\`\``
      },
      {
        title: "Базова обробка винятків",
        content: `**try/except блок:**
\`\`\`python
try:
    # Код, який може викликати помилку
    number = int(input("Введіть число: "))
    result = 10 / number
    print(f"Результат: {result}")
except:
    # Що робити, якщо виникла помилка
    print("Сталася помилка!")
\`\`\`

**Обробка конкретних винятків:**
\`\`\`python
try:
    number = int(input("Введіть число: "))
    result = 10 / number
except ValueError:
    print("Помилка! Введіть правильне число.")
except ZeroDivisionError:
    print("Помилка! Ділення на нуль неможливе.")
except Exception as e:
    print(f"Невідома помилка: {e}")
\`\`\`

**Краще обробляти конкретні помилки, ніж всі разом!**
\`\`\`python
# Погано
except:
    pass  # Приховує всі помилки, навіть неочікувані

# Добре
except ValueError:
    print("Помилка введення")
\`\`\``
      },
      {
        title: "else та finally",
        content: `**else** — виконується, якщо помилок не було:
\`\`\`python
try:
    number = int(input("Введіть число: "))
except ValueError:
    print("Помилка введення!")
else:
    print(f"Ви ввели: {number}")  # Виконається тільки якщо не було помилки
\`\`\`

**finally** — виконується завжди (навіть якщо була помилка):
\`\`\`python
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("Файл не знайдено!")
finally:
    if file:
        file.close()  # Завжди закриємо файл
\`\`\`

**Повна структура:**
\`\`\`python
try:
    # Код
except SpecificError:
    # Обробка конкретної помилки
except Exception as e:
    # Обробка інших помилок
else:
    # Якщо помилок не було
finally:
    # Завжди виконується
\`\`\``
      },
      {
        title: "Підняття винятків (raise)",
        content: `Можна самому викликати виняток:

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
while True:
    try:
        age = int(input("Скільки вам років? "))
        if age < 0 or age > 150:
            raise ValueError("Вік має бути від 0 до 150")
        break
    except ValueError as e:
        print(f"Помилка: {e}")
        print("Спробуйте ще раз!")

print(f"Вам {age} років")`,
      explanation: "Демонструє обробку помилок введення з повторенням."
    },
    {
      title: "Приклад 2: Робота з файлами",
      code: `# Безпечне читання файлу
filename = "data.txt"
try:
    with open(filename, "r", encoding="utf-8") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print(f"Файл {filename} не знайдено!")
except PermissionError:
    print("Немає доступу до файлу!")
except Exception as e:
    print(f"Невідома помилка: {e}")`,
      explanation: "Показує обробку різних помилок при роботі з файлами."
    },
    {
      title: "Приклад 3: try/except/else/finally",
      code: `# Повна структура обробки помилок
try:
    number = int(input("Введіть число: "))
    result = 100 / number
except ValueError:
    print("Помилка! Введіть число.")
except ZeroDivisionError:
    print("Помилка! Ділення на нуль.")
else:
    print(f"Результат: {result}")
finally:
    print("Обробка завершена.")`,
      explanation: "Демонструє використання else та finally."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Занадто широкий except",
      explanation: "except: без конкретного типу приховує всі помилки, навіть неочікувані.",
      correctApproach: "Обробляйте конкретні винятки: except ValueError:, except FileNotFoundError:"
    },
    {
      mistake: "Приховування помилок (except: pass)",
      explanation: "pass приховує помилки, що ускладнює відлагодження.",
      correctApproach: "Завжди обробляйте помилки або логуйте їх."
    },
    {
      mistake: "Плутанина між else та finally",
      explanation: "else виконується якщо не було помилки, finally виконується завжди.",
      correctApproach: "else для коду без помилок, finally для очищення ресурсів."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Винятки** — помилки під час виконання програми
2. **try/except** — обробка винятків
3. **Конкретні винятки** — ValueError, FileNotFoundError, ZeroDivisionError
4. **else** — код без помилок
5. **finally** — код, який виконується завжди
6. **raise** — підняття власних винятків

Обробка помилок робить програми надійнішими!`,
  
  practiceTask: {
    title: "Безпечна обробка даних",
    description: "Створіть програму з повною обробкою помилок",
    problemStatement: `Напишіть програму, яка:
1. Безпечно отримує число від користувача (з повторенням при помилці)
2. Безпечно читає файл (обробляє FileNotFoundError)
3. Безпечно виконує ділення (обробляє ZeroDivisionError)
4. Використовує try/except/else/finally
5. Виводить інформативні повідомлення про помилки`,
    inputFormat: "Користувач вводить дані через input()",
    outputFormat: `Приклад виведення:
Введіть число: abc
Помилка! Введіть правильне число.
Введіть число: 5
Число прийнято: 5
Результат: 20.0`,
    examples: [
      {
        input: "Неправильне введення, потім правильне",
        output: "Помилка обробляється, програма продовжує роботу",
        explanation: "Програма обробляє помилки та продовжує виконання"
      }
    ],
    solution: {
      code: `# Безпечна обробка даних
def get_number():
    while True:
        try:
            number = float(input("Введіть число: "))
            return number
        except ValueError:
            print("Помилка! Введіть правильне число.")
        except Exception as e:
            print(f"Невідома помилка: {e}")

def read_file_safe(filename):
    try:
        with open(filename, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Файл {filename} не знайдено!")
        return None
    except Exception as e:
        print(f"Помилка читання файлу: {e}")
        return None

def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Помилка! Ділення на нуль неможливе.")
        return None
    except TypeError:
        print("Помилка! Обидва аргументи мають бути числами.")
        return None
    else:
        print(f"Ділення виконано успішно!")
        return result
    finally:
        print("Обробка ділення завершена.")

# Використання
number = get_number()
print(f"Число прийнято: {number}")

content = read_file_safe("data.txt")
if content:
    print("Файл прочитано успішно!")

result = safe_divide(100, number)
if result is not None:
    print(f"Результат: {result}")`,
      explanation: "Рішення демонструє повну обробку помилок з try/except/else/finally."
    },
    hints: [
      "Використовуйте while True для повторення при помилці",
      "Обробляйте конкретні винятки (ValueError, FileNotFoundError)",
      "Використовуйте finally для очищення"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який виняток виникне при int('abc')?",
        options: ["TypeError", "ValueError", "NameError", "SyntaxError"],
        correctAnswer: 1,
        explanation: "ValueError виникає, коли функція отримує правильний тип, але неправильне значення."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: try: 10/0; except: print('Помилка'); finally: print('Готово')?",
        options: ["Помилка\\nГотово", "Готово", "Помилка", "Помилка ділення"],
        correctAnswer: 0,
        explanation: "except обробить помилку, finally виконається завжди, тому обидва повідомлення."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується блок else в try/except?",
        options: ["Завжди", "Якщо була помилка", "Якщо не було помилки", "Ніколи"],
        correctAnswer: 2,
        explanation: "else виконується тільки якщо в try не виникло винятків."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
