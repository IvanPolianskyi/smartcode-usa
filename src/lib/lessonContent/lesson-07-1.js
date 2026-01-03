/**
 * Lesson 07-1: Обробка помилок: try / except / finally
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_1 = {
  lessonId: "lesson-07-1",
  moduleId: "module-07",
  order: 1,
  title: "Обробка помилок: try / except / finally",
  
  learningObjectives: [
    "Розуміти концепцію винятків",
    "Використовувати try/except блоки",
    "Обробляти конкретні типи помилок",
    "Використовувати finally та else"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-05-9"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке винятки та помилки?",
        content: `**Виняток (Exception)** - це помилка, яка виникає під час виконання програми.

**Типи помилок:**
1. **Синтаксичні помилки** - помилки в написанні коду (наприклад, забута дужка)
2. **Помилки виконання (винятки)** - помилки, що виникають під час роботи програми

**Приклад синтаксичної помилки:**
\`\`\`python
print('Привіт)  # Помилка: не закрита лапка
\`\`\`

**Приклад помилки виконання:**
\`\`\`python
number = int("abc")  # ValueError: не можна перетворити "abc" на число
\`\`\`

**Чому важливо обробляти помилки?**
- ✅ Програма не "падає" при помилці
- ✅ Можна показати зрозуміле повідомлення користувачу
- ✅ Можна продовжити виконання програми
- ✅ Надійніший та професійніший код`
      },
      {
        title: "Базовий синтаксис try/except",
        content: `**Синтаксис обробки помилок:**

\`\`\`python
try:
    # Код, який може викликати помилку
    операція
except ТипПомилки:
    # Що робити, якщо виникла помилка
    обробка_помилки
\`\`\`

**Приклад: Обробка ділення на нуль**

\`\`\`python
try:
    result = 10 / 0
    print(result)
except ZeroDivisionError:
    print("Помилка: ділення на нуль неможливе!")
\`\`\`

**Результат:** Програма не "падає", а виводить зрозуміле повідомлення.

**Без try/except:**
\`\`\`python
result = 10 / 0  # ZeroDivisionError: division by zero
# Програма зупиняється тут
\`\`\`

**З try/except:**
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Помилка: ділення на нуль!")
# Програма продовжує виконання
print("Програма завершена")
\`\`\``
      },
      {
        title: "Обробка конкретних типів помилок",
        content: `Можна обробляти різні типи помилок окремо:

\`\`\`python
try:
    # Код, який може викликати різні помилки
    операція
except ТипПомилки1:
    # Обробка першого типу помилки
    обробка1
except ТипПомилки2:
    # Обробка другого типу помилки
    обробка2
except ТипПомилки3:
    # Обробка третього типу помилки
    обробка3
\`\`\`

**Приклад: Робота з файлами**

\`\`\`python
try:
    f = open('testfile.txt', 'w')
    f.write('Тестовий запис')
except IOError:
    print("Помилка: не вдалося знайти файл або прочитати дані")
else:
    print("Вміст успішно записано")
    f.close()
\`\`\`

**Приклад: Обробка кількох типів помилок**

\`\`\`python
def calculate(number_str):
    try:
        number = int(number_str)
        result = 100 / number
        print(f"Результат: {result}")
    except ValueError:
        print("Помилка: ви ввели не число!")
    except ZeroDivisionError:
        print("Помилка: ділення на нуль неможливе!")
    except Exception as e:
        print(f"Сталася невідома помилка: {e}")

# Використання
calculate("10")  # Результат: 10.0
calculate("abc")  # Помилка: ви ввели не число!
calculate("0")  # Помилка: ділення на нуль неможливе!
\`\`\``
      },
      {
        title: "Загальна обробка всіх помилок",
        content: `Якщо не знаєш, яка саме помилка може виникнути, можна використати загальний \`except\`:

\`\`\`python
try:
    # Код, який може викликати помилку
    операція
except:
    # Обробка будь-якої помилки
    print("Сталася помилка!")
\`\`\`

**Приклад:**

\`\`\`python
try:
    f = open('testfile.txt', 'r')
    f.write('Тестовий запис')
except:
    print("Помилка: не вдалося знайти файл або прочитати дані")
else:
    print("Вміст успішно записано")
    f.close()
\`\`\`

**Важливо:** 
- Загальний \`except\` ловить всі помилки
- Краще вказувати конкретний тип помилки, коли це можливо
- Загальний \`except\` корисний, коли не знаєш, яка помилка може виникнути`
      },
      {
        title: "Блок finally",
        content: `**finally** - блок коду, який завжди виконується, незалежно від того, чи виникла помилка.

**Синтаксис:**

\`\`\`python
try:
    # Код, який може викликати помилку
    операція
except:
    # Обробка помилки
    обробка
finally:
    # Цей код завжди виконається
    завжди_виконується
\`\`\`

**Приклад:**

\`\`\`python
try:
    f = open("testfile.txt", "w")
    f.write("Тестовий запис")
    f.close()
finally:
    print("Блок finally завжди виконується")
\`\`\`

**Коли використовувати finally?**
- Закриття файлів
- Закриття з'єднань з базою даних
- Очищення ресурсів
- Логування подій

**Приклад: Гарантоване закриття файлу**

\`\`\`python
try:
    f = open("data.txt", "r")
    content = f.read()
    # Якщо тут станеться помилка, файл все одно закриється
except:
    print("Помилка при читанні файлу")
finally:
    f.close()  # Завжди закриваємо файл
    print("Файл закрито")
\`\`\``
      },
      {
        title: "Блок else з try/except",
        content: `**else** - блок, який виконується, якщо помилка НЕ виникла.

**Синтаксис:**

\`\`\`python
try:
    # Код, який може викликати помилку
    операція
except:
    # Обробка помилки
    обробка
else:
    # Виконується, якщо помилки НЕ було
    код_без_помилки
finally:
    # Завжди виконується
    завжди
\`\`\`

**Приклад:**

\`\`\`python
def validate_int(value):
    try:
        val = int(value)
    except ValueError:
        print("Схоже, ви ввели не ціле число!")
        return None
    else:
        print(f"Ви ввели: {val}")
        return val
    finally:
        print("Finally, я виконався!")

# Використання
validate_int("5")  # Ви ввели: 5
validate_int("abc")  # Схоже, ви ввели не ціле число!
\`\`\`

**Важливо:**
- \`else\` виконується тільки якщо помилки НЕ було
- \`finally\` виконується завжди
- \`else\` корисний для коду, який має виконатися тільки при успішному виконанні`
      },
      {
        title: "Практичний приклад: Валідація введення",
        content: `**Створимо функцію для безпечної обробки числа:**

\`\`\`python
def get_number(value_str):
    try:
        number = int(value_str)
        return number
    except ValueError:
        print("Помилка: ви ввели не число! Спробуйте ще раз.")
        return None
    finally:
        print("Спроба завершена")

# Використання
number = get_number("25")
if number is not None:
    print(f"Ви ввели: {number}")

number = get_number("abc")  # Помилка: ви ввели не число!
\`\`\`

**Приклад: Безпечна робота з файлами**

\`\`\`python
def read_file_safe(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
            return content
    except FileNotFoundError:
        print(f"Помилка: файл '{filename}' не знайдено")
        return None
    except PermissionError:
        print(f"Помилка: немає доступу до файлу '{filename}'")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

# Використання
content = read_file_safe("data.txt")
if content:
    print(content)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий try/except",
      code: `# Обробка ділення на нуль
try:
    result = 10 / 0
    print(result)
except ZeroDivisionError:
    print("Помилка: ділення на нуль неможливе!")
print("Програма продовжує виконання")`,
      explanation: "Демонструє базову обробку помилки ділення на нуль."
    },
    {
      title: "Приклад 2: Обробка кількох типів помилок",
      code: `# Обробка різних типів помилок
def calculate(number_str):
    try:
        number = int(number_str)
        result = 100 / number
        print(f"Результат: {result}")
    except ValueError:
        print("Помилка: ви ввели не число!")
    except ZeroDivisionError:
        print("Помилка: ділення на нуль неможливе!")
    except Exception as e:
        print(f"Сталася невідома помилка: {e}")

calculate("10")  # Результат: 10.0
calculate("abc")  # Помилка: ви ввели не число!
calculate("0")  # Помилка: ділення на нуль неможливе!`,
      explanation: "Показує обробку кількох конкретних типів помилок."
    },
    {
      title: "Приклад 3: Робота з файлами",
      code: `# Безпечна робота з файлами
try:
    f = open('testfile.txt', 'w', encoding='utf-8')
    f.write('Тестовий запис')
except IOError:
    print("Помилка: не вдалося знайти файл або прочитати дані")
else:
    print("Вміст успішно записано")
    f.close()`,
      explanation: "Демонструє обробку помилок при роботі з файлами."
    },
    {
      title: "Приклад 4: Використання finally",
      code: `# finally завжди виконується
try:
    f = open("testfile.txt", "w", encoding="utf-8")
    f.write("Тестовий запис")
    f.close()
finally:
    print("Блок finally завжди виконується")`,
      explanation: "Показує що блок finally виконується завжди, незалежно від помилок."
    },
    {
      title: "Приклад 5: try/except/else/finally",
      code: `# Повний приклад з усіма блоками
def validate_int(value_str):
    try:
        val = int(value_str)
    except ValueError:
        print("Схоже, ви ввели не ціле число!")
        return None
    else:
        print(f"Ви ввели: {val}")
        return val
    finally:
        print("Finally, я виконався!")

validate_int("5")  # Ви ввели: 5
validate_int("abc")  # Схоже, ви ввели не ціле число!`,
      explanation: "Демонструє використання всіх блоків: try, except, else, finally."
    },
    {
      title: "Приклад 6: Безпечна функція для введення",
      code: `# Функція для безпечної обробки числа
def get_number(value_str):
    try:
        number = int(value_str)
        return number
    except ValueError:
        print("Помилка: ви ввели не число! Спробуйте ще раз.")
        return None

number = get_number("25")
if number is not None:
    print(f"Ви ввели: {number}")

number = get_number("abc")  # Помилка`,
      explanation: "Показує практичне використання try/except для валідації введення користувача."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути обробити конкретний тип помилки",
      explanation: "Використання загального except без конкретного типу може приховати важливі помилки.",
      correctApproach: "Спочатку обробляй конкретні типи помилок, потім загальний except для несподіваних помилок"
    },
    {
      mistake: "Не використовувати finally для закриття ресурсів",
      explanation: "Без finally файли або з'єднання можуть залишитися відкритими при помилці.",
      correctApproach: "Використовуй finally для гарантованого закриття ресурсів (файли, з'єднання)"
    },
    {
      mistake: "Плутати else та finally",
      explanation: "else виконується тільки якщо помилки НЕ було, finally виконується завжди.",
      correctApproach: "else - для коду при успіху, finally - для коду, який має виконатися завжди"
    },
    {
      mistake: "Приховувати помилки без повідомлення",
      explanation: "Пустий except блок приховує помилки, що ускладнює відлагодження.",
      correctApproach: "Завжди додавай повідомлення про помилку або логування в except блок"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Винятки** - помилки, що виникають під час виконання програми
2. **try/except** - базовий синтаксис обробки помилок
3. **Конкретні типи помилок** - обробка різних типів окремо
4. **Загальний except** - обробка будь-якої помилки
5. **finally** - блок, який завжди виконується
6. **else** - блок, який виконується при відсутності помилки

Тепер ви вмієте обробляти помилки та робити програми надійнішими!

Наступний урок - типи винятків та обробка помилок!`,
  
  practiceTask: {
    title: "Створення безпечної програми з обробкою помилок",
    description: "Створіть програму, яка безпечно обробляє різні типи помилок",
    problemStatement: `Напишіть функцію safe_divide, яка:
1. Приймає два параметри (рядки з числами): num1_str та num2_str
2. Виконує ділення першого на друге
3. Обробляє всі можливі помилки:
   - ValueError (якщо введено не число)
   - ZeroDivisionError (якщо ділення на нуль)
   - Інші несподівані помилки
4. Використовує try/except/else/finally
5. Показує зрозумілі повідомлення про помилки

**Важливо:** Напишіть визначення функції та викличте її з тестовими значеннями для перевірки.`,
    outputFormat: `Функція має виводити результат або повідомлення про помилку, а потім "Операція завершена!"

Приклад виводу:
Результат ділення: 5.0
Операція завершена!
Помилка: ділення на нуль неможливе!
Операція завершена!
Помилка: ви ввели не число! Спробуйте ще раз.
Операція завершена!`,
    examples: [
      {
        input: "",
        output: "Результат ділення: 5.0\nОперація завершена!\nПомилка: ділення на нуль неможливе!\nОперація завершена!\nПомилка: ви ввели не число! Спробуйте ще раз.\nОперація завершена!",
        explanation: "Функція обробляє різні випадки: успішне ділення, ділення на нуль та некоректне введення"
      }
    ],
    solution: {
      code: `# Безпечна програма для ділення з обробкою помилок

def safe_divide(num1_str, num2_str):
    try:
        num1 = float(num1_str)
        num2 = float(num2_str)
        result = num1 / num2
    except ValueError:
        print("Помилка: ви ввели не число! Спробуйте ще раз.")
        return None
    except ZeroDivisionError:
        print("Помилка: ділення на нуль неможливе!")
        return None
    except Exception as e:
        print(f"Сталася невідома помилка: {e}")
        return None
    else:
        print(f"Результат ділення: {result}")
        return result
    finally:
        print("Операція завершена!")

# Тестування функції
safe_divide('10', '2')
safe_divide('10', '0')
safe_divide('abc', '2')`,
      explanation: "Рішення використовує try/except/else/finally для безпечної обробки всіх можливих помилок при діленні."
    },
    hints: [
      "Використовуй float() для перетворення параметрів в числа",
      "Обробляй ValueError для некоректного введення",
      "Обробляй ZeroDivisionError для ділення на нуль",
      "Використовуй else для виведення результату при успіху",
      "Використовуй finally для повідомлення про завершення операції",
      "Виклич функцію з різними тестовими значеннями для перевірки"
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
          "Помилка, яка виникає під час виконання програми",
          "Синтаксична помилка в коді",
          "Коментар у коді",
          "Змінна"
        ],
        correctAnswer: 0,
        explanation: "Виняток - це помилка, яка виникає під час виконання програми, на відміну від синтаксичних помилок."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Помилка ділення на нуль')\nprint('Програма продовжується')\n```",
        options: [
          "Помилка ділення на нуль\nПрограма продовжується",
          "Помилку",
          "Програма продовжується",
          "10"
        ],
        correctAnswer: 0,
        explanation: "Код обробляє помилку ділення на нуль та продовжує виконання, виводячи обидва повідомлення."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується блок finally?",
        options: [
          "Завжди, незалежно від того, чи виникла помилка",
          "Тільки якщо виникла помилка",
          "Тільки якщо помилки не було",
          "Ніколи"
        ],
        correctAnswer: 0,
        explanation: "Блок finally виконується завжди, незалежно від того, чи виникла помилка в try блоці."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\ndef process_number(value_str):\n    try:\n        number = int(value_str)\n    except:\n        pass\n```",
        options: [
          "Пустий except приховує помилки без повідомлення",
          "Неправильний синтаксис try",
          "Неправильний синтаксис except",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "Пустий except з pass приховує помилки без повідомлення, що ускладнює відлагодження. Краще додати повідомлення про помилку."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується блок else в try/except?",
        options: [
          "Тільки якщо помилки НЕ було",
          "Тільки якщо виникла помилка",
          "Завжди",
          "Ніколи"
        ],
        correctAnswer: 0,
        explanation: "Блок else виконується тільки якщо в try блоці не виникло помилки."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    val = int('5')\n    print('Успіх')\nexcept ValueError:\n    print('Помилка')\nelse:\n    print('Else блок')\nfinally:\n    print('Finally блок')\n```",
        options: [
          "Успіх\nElse блок\nFinally блок",
          "Помилка\nFinally блок",
          "Успіх\nFinally блок",
          "Finally блок"
        ],
        correctAnswer: 0,
        explanation: "Оскільки помилки не було, виконується try блок ('Успіх'), потім else блок ('Else блок'), і нарешті finally блок ('Finally блок')."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
