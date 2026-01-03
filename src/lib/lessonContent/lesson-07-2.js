/**
 * Lesson 07-2: Типи винятків та обробка помилок
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_2 = {
  lessonId: "lesson-07-2",
  moduleId: "module-07",
  order: 2,
  title: "Типи винятків та обробка помилок",
  
  learningObjectives: [
    "Розуміти різні типи винятків",
    "Обробляти кілька типів помилок",
    "Використовувати except без типу",
    "Логувати помилки"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-07-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Основні типи винятків в Python",
        content: `Python має багато вбудованих типів винятків. Ось найпоширеніші:

**Основні типи винятків:**

1. **ValueError** - неправильне значення
   \`\`\`python
   int("abc")  # ValueError: invalid literal for int()
   \`\`\`

2. **TypeError** - неправильний тип
   \`\`\`python
   "5" + 3  # TypeError: can only concatenate str to str
   \`\`\`

3. **ZeroDivisionError** - ділення на нуль
   \`\`\`python
   10 / 0  # ZeroDivisionError: division by zero
   \`\`\`

4. **IndexError** - неправильний індекс
   \`\`\`python
   my_list = [1, 2, 3]
   my_list[10]  # IndexError: list index out of range
   \`\`\`

5. **KeyError** - неправильний ключ у словнику
   \`\`\`python
   my_dict = {"name": "Олексій"}
   my_dict["age"]  # KeyError: 'age'
   \`\`\`

6. **FileNotFoundError** - файл не знайдено
   \`\`\`python
   open("неіснуючий_файл.txt")  # FileNotFoundError
   \`\`\`

7. **AttributeError** - атрибут не існує
   \`\`\`python
   my_list = [1, 2, 3]
   my_list.appendd()  # AttributeError: 'list' object has no attribute 'appendd'
   \`\`\``
      },
      {
        title: "Ієрархія винятків",
        content: `Всі винятки в Python успадковуються від базового класу **Exception**.

**Ієрархія винятків:**

\`\`\`
BaseException
├── Exception
│   ├── ArithmeticError
│   │   ├── ZeroDivisionError
│   │   └── OverflowError
│   ├── LookupError
│   │   ├── IndexError
│   │   └── KeyError
│   ├── ValueError
│   ├── TypeError
│   ├── FileNotFoundError
│   └── ...
└── SystemExit
\`\`\`

**Важливо:**
- Якщо обробляєш батьківський клас, він також обробить дочірні класи
- Наприклад, обробка \`Exception\` обробить всі винятки
- Краще обробляти конкретні типи, ніж загальні

**Приклад:**

\`\`\`python
try:
    # код
    pass
except ValueError:  # Конкретний тип
    print("Помилка значення")
except Exception:  # Загальний тип (обробить всі інші)
    print("Інша помилка")
\`\`\``
      },
      {
        title: "Обробка кількох типів помилок",
        content: `Можна обробляти кілька типів помилок в одному except блоці:

**Спосіб 1: Кілька except блоків**

\`\`\`python
try:
    # код
    pass
except ValueError:
    print("Помилка значення")
except TypeError:
    print("Помилка типу")
except ZeroDivisionError:
    print("Ділення на нуль")
\`\`\`

**Спосіб 2: Кілька типів в одному except**

\`\`\`python
try:
    # код
    pass
except (ValueError, TypeError):
    print("Помилка значення або типу")
except (ZeroDivisionError, IndexError):
    print("Ділення на нуль або помилка індексу")
\`\`\`

**Приклад: Обробка різних помилок при роботі зі списком**

\`\`\`python
def safe_list_access(my_list, index):
    try:
        return my_list[index]
    except IndexError:
        print(f"Помилка: індекс {index} виходить за межі списку")
        return None
    except TypeError:
        print("Помилка: індекс має бути числом")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

# Використання
my_list = [1, 2, 3]
result = safe_list_access(my_list, 10)  # IndexError
result = safe_list_access(my_list, "abc")  # TypeError
\`\`\``
      },
      {
        title: "Отримання інформації про помилку",
        content: `Можна отримати детальну інформацію про помилку за допомогою \`as\`:

\`\`\`python
try:
    # код, який може викликати помилку
    pass
except ExceptionType as e:
    # e - об'єкт помилки з інформацією
    print(f"Помилка: {e}")
    print(f"Тип помилки: {type(e).__name__}")
\`\`\`

**Приклад:**

\`\`\`python
try:
    number = int("abc")
except ValueError as e:
    print(f"Помилка: {e}")  # invalid literal for int() with base 10: 'abc'
    print(f"Тип: {type(e).__name__}")  # ValueError
\`\`\`

**Приклад: Логування помилок**

\`\`\`python
import traceback

def process_data(data):
    try:
        result = int(data) * 2
        return result
    except ValueError as e:
        print(f"Помилка значення: {e}")
        traceback.print_exc()  # Виводить повний стек помилки
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        traceback.print_exc()
        return None

process_data("abc")
\`\`\``
      },
      {
        title: "Загальна обробка всіх помилок",
        content: `Іноді потрібно обробити всі можливі помилки:

**Спосіб 1: except без типу**

\`\`\`python
try:
    # код
    pass
except:
    print("Сталася якась помилка")
\`\`\`

**Спосіб 2: except Exception**

\`\`\`python
try:
    # код
    pass
except Exception as e:
    print(f"Помилка: {e}")
\`\`\`

**Різниця:**
- \`except:\` - ловить ВСІ помилки, включаючи SystemExit, KeyboardInterrupt
- \`except Exception:\` - ловить тільки винятки, що успадковуються від Exception

**Рекомендація:** Використовуй \`except Exception as e:\` замість \`except:\`

**Приклад:**

\`\`\`python
def safe_operation():
    try:
        # Будь-який код
        result = 10 / 0
    except Exception as e:
        print(f"Помилка: {type(e).__name__}: {e}")
        return None
    return result

safe_operation()
\`\`\``
      },
      {
        title: "Логування помилок",
        content: `Важливо логувати помилки для відлагодження та моніторингу:

**Базове логування:**

\`\`\`python
import logging

# Налаштування логування
logging.basicConfig(level=logging.ERROR)

def process_file(filename):
    try:
        with open(filename, 'r') as f:
            content = f.read()
            return content
    except FileNotFoundError as e:
        logging.error(f"Файл не знайдено: {filename}")
        logging.error(f"Помилка: {e}")
        return None
    except Exception as e:
        logging.error(f"Невідома помилка при обробці файлу: {e}")
        return None

process_file("неіснуючий.txt")
\`\`\`

**Приклад: Детальне логування з traceback**

\`\`\`python
import logging
import traceback

logging.basicConfig(
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def divide_numbers(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        logging.error("Спроба ділення на нуль")
        logging.error(traceback.format_exc())
        return None
    except Exception as e:
        logging.error(f"Невідома помилка: {e}")
        logging.error(traceback.format_exc())
        return None

divide_numbers(10, 0)
\`\`\``
      },
      {
        title: "Практичний приклад: Універсальна обробка помилок",
        content: `**Створимо функцію для безпечної обробки різних операцій:**

\`\`\`python
def safe_operation(operation_func, *args, **kwargs):
    """
    Безпечно виконує операцію з обробкою всіх помилок
    """
    try:
        return operation_func(*args, **kwargs)
    except ValueError as e:
        print(f"Помилка значення: {e}")
        return None
    except TypeError as e:
        print(f"Помилка типу: {e}")
        return None
    except ZeroDivisionError as e:
        print(f"Ділення на нуль: {e}")
        return None
    except KeyError as e:
        print(f"Ключ не знайдено: {e}")
        return None
    except IndexError as e:
        print(f"Індекс поза межами: {e}")
        return None
    except FileNotFoundError as e:
        print(f"Файл не знайдено: {e}")
        return None
    except Exception as e:
        print(f"Невідома помилка: {type(e).__name__}: {e}")
        return None

# Використання
def divide(a, b):
    return a / b

result = safe_operation(divide, 10, 2)  # 5.0
result = safe_operation(divide, 10, 0)  # None (обробка помилки)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Обробка різних типів помилок",
      code: `# Обробка кількох типів помилок
def process_number(number_str):
    try:
        number = int(number_str)
        result = 100 / number
        my_list = [1, 2, 3]
        value = my_list[number]
    except ValueError:
        print("Помилка: ви ввели не число!")
    except ZeroDivisionError:
        print("Помилка: ділення на нуль!")
    except IndexError:
        print("Помилка: індекс поза межами списку!")
    except Exception as e:
        print(f"Невідома помилка: {e}")

process_number("2")  # Працює
process_number("abc")  # ValueError
process_number("0")  # ZeroDivisionError
process_number("10")  # IndexError`,
      explanation: "Демонструє обробку кількох конкретних типів помилок."
    },
    {
      title: "Приклад 2: Кілька типів в одному except",
      code: `# Обробка кількох типів в одному блоці
try:
    # код, який може викликати різні помилки
    data = {"name": "Олексій"}
    value = data["age"] + 5
except (KeyError, TypeError) as e:
    print(f"Помилка доступу або типу: {e}")
except (ValueError, ZeroDivisionError) as e:
    print(f"Помилка значення або ділення: {e}")`,
      explanation: "Показує обробку кількох типів помилок в одному except блоці."
    },
    {
      title: "Приклад 3: Отримання інформації про помилку",
      code: `# Отримання детальної інформації про помилку
try:
    number = int("abc")
except ValueError as e:
    print(f"Помилка: {e}")
    print(f"Тип помилки: {type(e).__name__}")
    print(f"Повідомлення: {str(e)}")`,
      explanation: "Демонструє як отримати детальну інформацію про помилку."
    },
    {
      title: "Приклад 4: Логування помилок",
      code: `# Логування помилок
import logging

logging.basicConfig(level=logging.ERROR)

try:
    with open("неіснуючий.txt", "r") as f:
        content = f.read()
except FileNotFoundError as e:
    logging.error(f"Файл не знайдено: {e}")
except Exception as e:
    logging.error(f"Помилка: {e}")`,
      explanation: "Показує як логувати помилки для відлагодження."
    },
    {
      title: "Приклад 5: Загальна обробка всіх помилок",
      code: `# Обробка всіх можливих помилок
def safe_function(func, *args):
    try:
        return func(*args)
    except Exception as e:
        print(f"Помилка {type(e).__name__}: {e}")
        return None

# Використання
def divide(a, b):
    return a / b

result = safe_function(divide, 10, 0)`,
      explanation: "Демонструє загальну обробку всіх помилок через Exception."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Обробляти загальний Exception перед конкретними типами",
      explanation: "Якщо except Exception йде першим, конкретні типи ніколи не спрацюють.",
      correctApproach: "Спочатку обробляй конкретні типи, потім загальний Exception"
    },
    {
      mistake: "Використовувати except: без типу",
      explanation: "except: без типу ловить навіть SystemExit та KeyboardInterrupt, що може бути небажаним.",
      correctApproach: "Використовуй except Exception as e: замість except:"
    },
    {
      mistake: "Не логувати помилки",
      explanation: "Без логування важко відлагоджувати програму та розуміти, що пішло не так.",
      correctApproach: "Завжди логуй помилки, особливо в продакшн коді"
    },
    {
      mistake: "Приховувати важливі помилки",
      explanation: "Обробка всіх помилок однаково може приховати критичні проблеми.",
      correctApproach: "Обробляй різні типи помилок по-різному, залежно від їх важливості"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Основні типи винятків** - ValueError, TypeError, ZeroDivisionError, IndexError, KeyError, FileNotFoundError
2. **Ієрархія винятків** - всі винятки успадковуються від Exception
3. **Обробка кількох типів** - кілька except блоків або кілька типів в одному
4. **Отримання інформації** - використання as для отримання деталей помилки
5. **Загальна обробка** - except Exception для всіх помилок
6. **Логування помилок** - важливість логування для відлагодження

Тепер ви вмієте обробляти різні типи помилок та логувати їх!

Наступний урок - створення власних винятків!`,
  
  practiceTask: {
    title: "Створення безпечної функції з обробкою різних помилок",
    description: "Створіть функцію, яка обробляє різні типи помилок",
    problemStatement: `Напишіть функцію safe_calculate, яка:
1. Приймає два аргументи та операцію (+, -, *, /)
2. Виконує операцію між двома числами
3. Обробляє різні типи помилок:
   - ValueError (якщо аргументи не числа)
   - ZeroDivisionError (при діленні на нуль)
   - TypeError (якщо операція не підтримується)
   - Інші несподівані помилки
4. Повертає результат або None при помилці
5. Виводить зрозумілі повідомлення про кожен тип помилки

**Важливо:** Напишіть визначення функції та викличте її з тестовими значеннями для перевірки.`,
    outputFormat: `Приклад виведення:
Результат: 15.0
Помилка: ділення на нуль неможливе!
Помилка значення: could not convert string to float: 'abc'`,
    examples: [
      {
        input: "",
        output: "Результат: 15.0\nПомилка: ділення на нуль неможливе!\nПомилка значення: could not convert string to float: 'abc'",
        explanation: "Функція обробляє різні випадки: успішне обчислення, ділення на нуль та некоректне введення"
      }
    ],
    solution: {
      code: `# Безпечна функція для обчислень
def safe_calculate(a, b, operation):
    try:
        # Перетворюємо в числа
        num1 = float(a)
        num2 = float(b)
        
        # Виконуємо операцію
        if operation == '+':
            result = num1 + num2
        elif operation == '-':
            result = num1 - num2
        elif operation == '*':
            result = num1 * num2
        elif operation == '/':
            result = num1 / num2
        else:
            raise TypeError(f"Операція '{operation}' не підтримується")
        
        print(f"Результат: {result}")
        return result
        
    except ValueError as e:
        print(f"Помилка значення: {e}")
        return None
    except ZeroDivisionError:
        print("Помилка: ділення на нуль неможливе!")
        return None
    except TypeError as e:
        print(f"Помилка типу: {e}")
        return None
    except Exception as e:
        print(f"Невідома помилка: {type(e).__name__}: {e}")
        return None

# Тестування
safe_calculate(10, 5, '+')
safe_calculate(10, 0, '/')
safe_calculate('abc', 5, '+')`,
      explanation: "Рішення обробляє різні типи помилок та повертає зрозумілі повідомлення."
    },
    hints: [
      "Використовуй float() для перетворення аргументів",
      "Обробляй ValueError для некоректних значень",
      "Обробляй ZeroDivisionError для ділення на нуль",
      "Використовуй raise TypeError для непідтримуваних операцій",
      "Використовуй except Exception для несподіваних помилок"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип помилки виникне при int('abc')?",
        options: [
          "ValueError",
          "TypeError",
          "ZeroDivisionError",
          "IndexError"
        ],
        correctAnswer: 0,
        explanation: "ValueError виникає коли значення не може бути перетворене в потрібний тип."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    my_list = [1, 2, 3]\n    value = my_list[10]\nexcept IndexError as e:\n    print(f'Помилка: {e}')\n```",
        options: [
          "Помилка: list index out of range",
          "Помилку",
          "Нічого",
          "3"
        ],
        correctAnswer: 0,
        explanation: "Код обробляє IndexError та виводить повідомлення про помилку з деталями."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно обробити кілька типів помилок в одному блоці?",
        options: [
          "except (TypeError, ValueError):",
          "except TypeError, ValueError:",
          "except TypeError or ValueError:",
          "except TypeError and ValueError:"
        ],
        correctAnswer: 0,
        explanation: "Правильний синтаксис: except (TypeError, ValueError): - типи в дужках через кому."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому краще використовувати except Exception as e: замість except:?",
        options: [
          "except Exception не ловить SystemExit та KeyboardInterrupt",
          "except Exception швидше працює",
          "except Exception займає менше пам'яті",
          "Немає різниці"
        ],
        correctAnswer: 0,
        explanation: "except Exception не ловить системні винятки як SystemExit та KeyboardInterrupt, що часто є бажаним поведінкою."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\ntry:\n    result = 10 / 0\nexcept Exception:\n    print('Помилка')\nexcept ZeroDivisionError:\n    print('Ділення на нуль')\n```",
        options: [
          "ZeroDivisionError ніколи не спрацює, бо Exception йде першим",
          "Неправильний синтаксис except",
          "Неправильний синтаксис try",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "Конкретні типи помилок мають йти перед загальним Exception, інакше вони ніколи не спрацюють."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип помилки виникне при my_dict['неіснуючий_ключ']?",
        options: [
          "KeyError",
          "ValueError",
          "TypeError",
          "IndexError"
        ],
        correctAnswer: 0,
        explanation: "KeyError виникає коли ключ не знайдено в словнику."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
