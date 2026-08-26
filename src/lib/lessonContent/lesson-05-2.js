/**
 * Lesson 05-2: Типи винятків та обробка помилок
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_2 = {
  lessonId: "lesson-05-2",
  moduleId: "module-05",
  order: 2,
  title: "Типи винятків та обробка помилок",

  learningObjectives: [
    "Розрізняти поширені типи винятків Python",
    "Обробляти ValueError, TypeError, ZeroDivisionError, IndexError, KeyError та FileNotFoundError",
    "Ловити кілька типів помилок в одному або кількох except",
    "Використовувати except Exception та as e для доступу до повідомлення",
    "Обирати конкретні except замість надто загальних"
  ],

  prerequisites: ["lesson-05-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Ієрархія винятків у Python",
        content: `У Python майже всі помилки - це класи, що наслідуються від \`BaseException\`. Для звичайної обробки важливий клас \`Exception\` та його нащадки.

**Спрощена схема:**

\`\`\`
BaseException
 └── Exception
      ├── ValueError
      ├── TypeError
      ├── ZeroDivisionError
      ├── IndexError
      ├── KeyError
      ├── FileNotFoundError
      └── ... багато інших
\`\`\`

**Чому це важливо?**

- \`except ValueError\` ловить лише ValueError (і його нащадків)
- \`except Exception\` ловить майже всі «звичайні» помилки
- \`except:\` без типу ловить навіть KeyboardInterrupt - це майже завжди погана ідея

Пам’ятайте: чим **конкретніший** except, тим зрозуміліша поведінка програми.`
      },
      {
        title: "ValueError, TypeError, ZeroDivisionError",
        content: `**ValueError** - значення має правильний тип, але неприпустимий зміст.

\`\`\`python
int("hello")      # ValueError
int("3.14")       # ValueError (для int потрібен цілий запис)
\`\`\`

**TypeError** - операція застосована до об’єкта не того типу.

\`\`\`python
"5" + 5           # TypeError
len(10)           # TypeError
\`\`\`

**ZeroDivisionError** - ділення або остача від ділення на нуль.

\`\`\`python
10 / 0            # ZeroDivisionError
10 % 0            # ZeroDivisionError
\`\`\`

**Приклад обробки:**

\`\`\`python
try:
    a = int(input())
    b = int(input())
    print(a / b)
except ValueError:
    print("Потрібні цілі числа")
except ZeroDivisionError:
    print("Ділення на нуль")
\`\`\``
      },
      {
        title: "IndexError, KeyError, FileNotFoundError",
        content: `**IndexError** - індекс поза межами послідовності.

\`\`\`python
nums = [1, 2, 3]
print(nums[10])   # IndexError
\`\`\`

**KeyError** - ключа немає у словнику.

\`\`\`python
user = {"name": "Оля"}
print(user["age"])  # KeyError
\`\`\`

**FileNotFoundError** - файл або шлях не існує.

\`\`\`python
open("немає_такого.txt")  # FileNotFoundError
\`\`\`

**Безпечні альтернативи (інколи краще за except):**

\`\`\`python
# Замість KeyError
age = user.get("age", 0)

# Замість IndexError - перевірка довжини
if index < len(nums):
    print(nums[index])
\`\`\`

Але except все одно корисний, коли помилка може виникнути глибше в коді або при роботі з файлами.`
      },
      {
        title: "Кілька типів у except та порядок блоків",
        content: `Можна ловити кілька типів в одному блоці:

\`\`\`python
try:
    process(data)
except (ValueError, TypeError) as e:
    print(f"Проблема з даними: {e}")
\`\`\`

Або окремими блоками - коли реакція різна:

\`\`\`python
try:
    items = [10, 20, 30]
    index = int(input())
    print(items[index])
except ValueError:
    print("Індекс має бути числом")
except IndexError:
    print("Немає такого елемента")
\`\`\`

**Важливо про порядок:**

Спочатку - **конкретні** типи, потім - загальніші.

\`\`\`python
# Правильно
except ValueError:
    ...
except Exception:
    ...

# Неправильно - ValueError ніколи не дійде сюди,
# якщо Exception стоїть вище
except Exception:
    ...
except ValueError:
    ...
\`\`\``
      },
      {
        title: "except Exception та as e",
        content: `\`as e\` зберігає об’єкт винятку - можна прочитати повідомлення:

\`\`\`python
try:
    int("abc")
except ValueError as e:
    print(type(e))   # <class 'ValueError'>
    print(e)         # invalid literal for int() with base 10: 'abc'
    print(str(e))    # те саме повідомлення рядком
\`\`\`

**except Exception** - «страхувальна сітка» для несподіваних помилок:

\`\`\`python
try:
    risky_operation()
except ValueError as e:
    print(f"Валідація: {e}")
except Exception as e:
    print(f"Несподівана помилка: {e}")
\`\`\`

**Коли використовувати Exception:**

- На межі програми (CLI, обробник запиту), щоб показати дружнє повідомлення
- З обов’язковим логуванням деталей

**Коли НЕ використовувати як єдиний except:**

- Усередині бібліотечних функцій замість конкретних типів
- Без \`as e\` і без будь-якого повідомлення`
      },
      {
        title: "Практичні поради з вибору типу",
        content: `**Швидка шпаргалка:**

| Ситуація | Типовий виняток |
|----------|-----------------|
| \`int("x")\`, невірний формат | ValueError |
| \`"a" + 1\`, не той тип | TypeError |
| \`n / 0\` | ZeroDivisionError |
| \`list[i]\` поза діапазоном | IndexError |
| \`dict[key]\` немає ключа | KeyError |
| \`open\` неіснуючого файлу | FileNotFoundError |

**Приклад комбінованої обробки:**

\`\`\`python
data = {"a": 10, "b": 0}
key = input()
try:
    print(100 / data[key])
except KeyError:
    print("Помилка: KeyError")
except ZeroDivisionError:
    print("Помилка: ZeroDivisionError")
except Exception as e:
    print(f"Інша помилка: {type(e).__name__}")
\`\`\`

У наступному уроці навчимося створювати **власні** класи винятків для доменної логіки.`
      }
    ]
  },

  codeExamples: [
    {
      title: "ValueError та ZeroDivisionError",
      code: `try:
    a = int("10")
    b = int("0")
    print(a / b)
except ValueError:
    print("Помилка: ValueError")
except ZeroDivisionError:
    print("Помилка: ZeroDivisionError")`,
      explanation: "Спочатку успішне int(), потім ZeroDivisionError при діленні."
    },
    {
      title: "IndexError та KeyError",
      code: `nums = [1, 2, 3]
user = {"name": "Іван"}
try:
    print(nums[5])
except IndexError as e:
    print(f"Список: {e}")
try:
    print(user["age"])
except KeyError as e:
    print(f"Словник: немає ключа {e}")`,
      explanation: "Демонструє типові помилки доступу до колекцій."
    },
    {
      title: "Кілька типів в одному except",
      code: `try:
    value = int("hello")
except (ValueError, TypeError) as e:
    print(f"Проблема з даними: {e}")`,
      explanation: "Один обробник для кількох споріднених помилок."
    },
    {
      title: "except Exception як запасний варіант",
      code: `try:
    result = 10 / int("2")
    print(result)
except ValueError:
    print("Не число")
except Exception as e:
    print(f"Інше: {type(e).__name__}: {e}")`,
      explanation: "Спочатку конкретний ValueError, потім загальний Exception."
    }
  ],

  commonMistakes: [
    {
      mistake: "Занадто загальний except першим",
      explanation: "Якщо except Exception стоїть вище за ValueError, конкретний блок ніколи не спрацює.",
      correctApproach: "Спочатку конкретні типи, в кінці - Exception."
    },
    {
      mistake: "Плутати ValueError і TypeError",
      explanation: "ValueError - погане значення правильного типу; TypeError - операція з неправильним типом.",
      correctApproach: "int('x') → ValueError; 'a' + 1 → TypeError."
    },
    {
      mistake: "Ігнорувати повідомлення винятку",
      explanation: "Без as e користувач і розробник не бачать деталей.",
      correctApproach: "except SomeError as e: print(e) або залогуйте str(e)."
    },
    {
      mistake: "Ловити FileNotFoundError порожнім except",
      explanation: "Можна випадково сховати PermissionError або інші проблеми з файлами.",
      correctApproach: "except FileNotFoundError as e: ... і окремо інші файлові помилки за потреби."
    }
  ],

  summary: `На цьому уроці ми вивчили типи винятків:

1. ValueError, TypeError, ZeroDivisionError - помилки значень, типів і ділення
2. IndexError, KeyError, FileNotFoundError - доступ до даних і файлів
3. Кілька типів у одному except - (A, B) as e
4. except Exception - запасний варіант після конкретних блоків
5. as e - доступ до повідомлення помилки

Далі - створення власних винятків для бізнес-логіки.`,

  practiceTask: {
    title: "Калькулятор з різними типами помилок",
    description: "Обробіть ValueError та ZeroDivisionError у простому калькуляторі",
    problemStatement: `Зчитайте три рядки зі stdin:
1. перше число (як рядок)
2. операція: один символ +, -, * або /
3. друге число (як рядок)

Перетворіть числа через float() і виконайте операцію.

- При успіху виведіть результат
- При помилці перетворення виведіть: Помилка: ValueError
- При діленні на нуль виведіть: Помилка: ZeroDivisionError
- При невідомій операції виведіть: Помилка: невідома операція`,
    outputFormat: `5.0`,
    examples: [
      {
        input: `10
/
2`,
        output: `5.0`,
        explanation: "Успішне ділення 10/2"
      },
      {
        input: `10
/
0`,
        output: `Помилка: ZeroDivisionError`,
        explanation: "Ділення на нуль"
      },
      {
        input: `abc
+
1`,
        output: `Помилка: ValueError`,
        explanation: "Некоректне перше число"
      }
    ],
    solution: {
      code: `a_str = input()
op = input()
b_str = input()
try:
    a = float(a_str)
    b = float(b_str)
    if op == "+":
        print(a + b)
    elif op == "-":
        print(a - b)
    elif op == "*":
        print(a * b)
    elif op == "/":
        print(a / b)
    else:
        print("Помилка: невідома операція")
except ValueError:
    print("Помилка: ValueError")
except ZeroDivisionError:
    print("Помилка: ZeroDivisionError")`,
      explanation: "float() може кинути ValueError; ділення на 0 - ZeroDivisionError."
    },
    hints: [
      "Зчитайте три рядки: число, операція, число",
      "Використайте float() для перетворення",
      "Окремо обробіть ValueError і ZeroDivisionError",
      "Для невідомої операції не потрібен except - звичайний else"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який виняток виникає при int(\"abc\")?",
        options: ["TypeError", "ValueError", "IndexError", "KeyError"],
        correctAnswer: 1,
        explanation: "Рядок має тип str, але значення непридатне для int - ValueError."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає запис except (ValueError, TypeError) as e?",
        options: [
          "Ловить обидва типи в одному блоці",
          "Ловить лише ValueError",
          "Створює новий виняток",
          "Це синтаксична помилка"
        ],
        correctAnswer: 0,
        explanation: "Кортеж типів дозволяє обробити кілька винятків однаково."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n```python\ndata = {\"x\": 1}\ntry:\n    print(data[\"y\"])\nexcept KeyError:\n    print(\"немає ключа\")\n```",
        options: ["1", "немає ключа", "KeyError", "None"],
        correctAnswer: 1,
        explanation: "Ключа \"y\" немає - спрацьовує except KeyError."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "except Exception варто ставити перед except ValueError.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Спочатку конкретні типи, інакше загальний блок перехопить усе."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який виняток при nums[10], якщо len(nums) == 3?",
        options: ["KeyError", "ValueError", "IndexError", "TypeError"],
        correctAnswer: 2,
        explanation: "Індекс поза межами списку - IndexError."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого використовують as e у except?",
        options: [
          "Щоб отримати об’єкт винятку та його повідомлення",
          "Щоб проігнорувати помилку",
          "Щоб змінити тип помилки",
          "Щоб зупинити програму"
        ],
        correctAnswer: 0,
        explanation: "as e дає доступ до повідомлення та типу винятку."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "FileNotFoundError виникає, коли open() не знаходить файл.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Це стандартний виняток для відсутнього файлу."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "\"hello\" + 5 викликає:",
        options: ["ValueError", "TypeError", "IndexError", "ZeroDivisionError"],
        correctAnswer: 1,
        explanation: "Несумісні типи для + - TypeError."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
