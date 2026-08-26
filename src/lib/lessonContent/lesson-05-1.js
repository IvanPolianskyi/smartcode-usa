/**
 * Lesson 05-1: Обробка помилок: try / except / finally
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_1 = {
  lessonId: "lesson-05-1",
  moduleId: "module-05",
  order: 1,
  title: "Обробка помилок: try / except / finally",

  learningObjectives: [
    "Розуміти, що таке винятки та навіщо їх обробляти",
    "Використовувати блоки try / except для перехоплення помилок",
    "Застосовувати else після успішного виконання try",
    "Використовувати finally для коду, який має виконатися завжди",
    "Обирати, коли ловити помилку, а коли дозволити програмі завершитися"
  ],

  prerequisites: ["lesson-04-8"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке винятки?",
        content: `Під час роботи програми можуть виникати **помилки** (винятки, exceptions). Якщо їх не обробити, програма аварійно завершиться.

**Приклад без обробки:**

\`\`\`python
number = int("abc")  # ValueError — програма зупиниться
print("Цей рядок ніколи не виконається")
\`\`\`

**Навіщо обробляти помилки?**

1. **Стабільність** — програма не «падає» через очікувану помилку
2. **Зрозумілі повідомлення** — користувач бачить, що пішло не так
3. **Відновлення** — можна запропонувати повторити введення або продовжити роботу
4. **Ресурси** — можна коректно закрити файли, з’єднання тощо

**Аналогія:** уявіть, що ви відкриваєте двері. Якщо ключ не підходить — це помилка. Замість того щоб «зламатися», ви можете спробувати інший ключ або повідомити про проблему.`
      },
      {
        title: "Блок try / except",
        content: `Основна конструкція обробки помилок у Python — \`try\` / \`except\`.

**Синтаксис:**

\`\`\`python
try:
    # Код, який може викликати помилку
    risky_code()
except SomeError:
    # Що робити, якщо виникла помилка
    handle_error()
\`\`\`

**Приклад:**

\`\`\`python
try:
    number = int(input("Введіть число: "))
    print(f"Ви ввели: {number}")
except ValueError:
    print("Це не число! Спробуйте ще раз.")
\`\`\`

**Як це працює:**

1. Python виконує код у блоці \`try\`
2. Якщо помилки немає — \`except\` пропускається
3. Якщо виникає відповідний виняток — керування переходить до \`except\`
4. Програма продовжує роботу після блоку

**Важливо:** ловіть лише ті помилки, які ви реально вмієте обробити. Не ховайте все «мовчки» — інакше складно знайти баги.`
      },
      {
        title: "Блок else",
        content: `Блок \`else\` виконується **тільки якщо** у \`try\` не було винятків.

\`\`\`python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Ділення на нуль!")
else:
    print(f"Результат: {result}")  # Виконається лише при успіху
\`\`\`

**Навіщо else?**

- Відокремити «успішний» код від коду, який може кинути помилку
- Зробити намір очевиднішим: «якщо все ок — зроби це»

\`\`\`python
try:
    value = int(input())
except ValueError:
    print("Помилка введення")
else:
    print(f"Квадрат: {value ** 2}")
\`\`\`

У цьому прикладі піднесення до квадрата відбувається лише після успішного перетворення.`
      },
      {
        title: "Блок finally",
        content: `Блок \`finally\` виконується **завжди** — і після успіху, і після помилки (навіть якщо був \`return\` у \`try\`/\`except\`).

\`\`\`python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("Файл не знайдено")
finally:
    print("Цей рядок виконається завжди")
\`\`\`

**Типові випадки використання finally:**

1. Закриття файлів і з’єднань
2. Звільнення ресурсів
3. Повідомлення «операцію завершено»
4. Логування завершення кроку

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Помилка")
finally:
    print("Готово")  # Виведеться після обробки помилки
\`\`\`

**Порядок виконання:** \`try\` → (\`except\` або \`else\`) → \`finally\`.`
      },
      {
        title: "Повна конструкція try / except / else / finally",
        content: `Усі частини можна комбінувати:

\`\`\`python
try:
    a = int(input())
    b = int(input())
    result = a / b
except ValueError:
    print("Потрібні цілі числа")
except ZeroDivisionError:
    print("Ділення на нуль неможливе")
else:
    print(f"Результат: {result}")
finally:
    print("Обчислення завершено")
\`\`\`

**Правила порядку блоків:**

1. \`try\` — обов’язковий
2. Один або кілька \`except\`
3. \`else\` — лише після всіх \`except\`
4. \`finally\` — завжди останній

**Коли що використовувати:**

| Блок | Коли |
|------|------|
| try | Код, де можлива помилка |
| except | Обробка конкретної (або кількох) помилок |
| else | Дії лише при успіху |
| finally | Обов’язкове прибирання / фінальне повідомлення |`
      },
      {
        title: "Коли ловити помилки, а коли ні",
        content: `Не кожну помилку варто перехоплювати.

**Ловіть, коли:**

- Помилка очікувана (некоректне введення користувача)
- Ви можете запропонувати альтернативу або повторити дію
- Потрібно зберегти роботу програми

**Не ловіть «все підряд», коли:**

- Це внутрішня логічна помилка в коді (краще виправити код)
- Ви не знаєте, що робити з помилкою
- Порожній \`except:\` або \`except Exception:\` без повідомлення ховає баги

\`\`\`python
# Погано — ховає всі помилки
try:
    do_something()
except:
    pass

# Краще — конкретна помилка і зрозуміле повідомлення
try:
    do_something()
except ValueError as e:
    print(f"Некоректне значення: {e}")
\`\`\`

**Принцип:** обробляйте те, на що можете розумно відреагувати; решту — покажіть або пропустіть вище по стеку викликів.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Базовий try / except",
      code: `try:
    number = int("42")
    print(number)
except ValueError:
    print("Не вдалося перетворити на число")`,
      explanation: "Якщо рядок коректний, except не виконується. При помилці — виводиться повідомлення."
    },
    {
      title: "try з else",
      code: `try:
    value = int("10")
except ValueError:
    print("Помилка")
else:
    print(f"Успіх: {value * 2}")`,
      explanation: "Блок else виконується лише після успішного try."
    },
    {
      title: "try / except / finally",
      code: `try:
    result = 10 / 2
    print(result)
except ZeroDivisionError:
    print("Ділення на нуль")
finally:
    print("Готово")`,
      explanation: "finally виконається завжди — і при успіху, і при помилці."
    },
    {
      title: "Безпечне ділення з повною конструкцією",
      code: `a = 10
b = 0
try:
    result = a / b
except ZeroDivisionError:
    print("Помилка: ділення на нуль")
else:
    print(result)
finally:
    print("Готово")`,
      explanation: "Демонструє except, відсутність else при помилці та обов’язковий finally."
    }
  ],

  commonMistakes: [
    {
      mistake: "Порожній except без повідомлення",
      explanation: "except: pass приховує помилки і ускладнює відлагодження.",
      correctApproach: `try:
    risky()
except ValueError as e:
    print(f"Помилка: {e}")`
    },
    {
      mistake: "Код у finally, який залежить від успіху try",
      explanation: "finally виконується завжди, тож змінні з try можуть бути не визначені.",
      correctApproach: "У finally робіть лише прибирання ресурсів або загальні повідомлення; результат обробляйте в else."
    },
    {
      mistake: "Забування, що після except програма продовжується",
      explanation: "Після обробки помилки виконання йде далі — це нормально, але потрібно планувати логіку.",
      correctApproach: "Після except задайте значення за замовчуванням або зробіть return / continue, якщо далі працювати небезпечно."
    },
    {
      mistake: "Ловити помилки там, де краще виправити код",
      explanation: "try/except не замінює перевірку індексів і типів у власній логіці.",
      correctApproach: "Спочатку пишіть коректний код; except — для очікуваних збоїв (ввід, файли, мережа)."
    }
  ],

  summary: `На цьому уроці ми вивчили основи обробки помилок:

1. Винятки — події, що переривають нормальний хід програми
2. try / except — перехоплення та обробка помилок
3. else — код лише після успішного try
4. finally — код, який виконується завжди
5. Коли ловити помилки — лише очікувані ситуації з зрозумілою реакцією

У наступному уроці розглянемо конкретні типи винятків Python.`,

  practiceTask: {
    title: "Безпечне ділення з finally",
    description: "Напишіть програму, яка ділить два числа та завжди повідомляє про завершення",
    problemStatement: `Зчитайте два цілі числа a і b зі stdin.
Обчисліть a / b у блоці try.

- Якщо ділення успішне — виведіть результат (як float, наприклад 5.0)
- Якщо b дорівнює 0 — виведіть: Помилка: ділення на нуль
- У блоці finally завжди виведіть: Готово

Використовуйте try / except / else / finally.`,
    outputFormat: `5.0
Готово`,
    examples: [
      {
        input: `10
2`,
        output: `5.0
Готово`,
        explanation: "Успішне ділення; finally друкує Готово"
      },
      {
        input: `10
0`,
        output: `Помилка: ділення на нуль
Готово`,
        explanation: "ZeroDivisionError; else не виконується"
      },
      {
        input: `9
3`,
        output: `3.0
Готово`,
        explanation: "9/3 = 3.0, потім finally"
      }
    ],
    solution: {
      code: `a = int(input())
b = int(input())
try:
    result = a / b
except ZeroDivisionError:
    print("Помилка: ділення на нуль")
else:
    print(result)
finally:
    print("Готово")`,
      explanation: "try ділить числа; except ловить нуль; else друкує результат; finally завжди друкує Готово."
    },
    hints: [
      "Зчитайте a і b через int(input())",
      "Ловіть ZeroDivisionError",
      "Результат друкуйте в else",
      "print(\"Готово\") має бути у finally"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який блок виконується завжди — і після успіху, і після помилки?",
        options: ["else", "except", "finally", "try"],
        correctAnswer: 2,
        explanation: "finally виконується завжди, незалежно від того, чи була помилка."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується блок else у конструкції try/except/else?",
        options: [
          "Завжди",
          "Лише якщо в try не було винятку",
          "Лише якщо був виняток",
          "Перед блоком try"
        ],
        correctAnswer: 1,
        explanation: "else виконується тільки після успішного завершення try."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntry:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"Помилка\")\nfinally:\n    print(\"Кінець\")\n```",
        options: [
          "Помилка\nКінець",
          "Кінець",
          "Помилка",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "except друкує Помилка, потім finally друкує Кінець."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Порожній except: pass — хороша практика для приховування всіх помилок.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Це ховає баги і ускладнює відлагодження."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який правильний порядок блоків?",
        options: [
          "try → finally → except → else",
          "try → except → else → finally",
          "except → try → else → finally",
          "try → else → except → finally"
        ],
        correctAnswer: 1,
        explanation: "Спочатку try, потім except, потім else, і finally — останній."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо обробляти винятки?",
        options: [
          "Щоб програма не падала на очікуваних помилках",
          "Щоб код виконувався швидше",
          "Щоб не писати функції",
          "Щоб вимкнути синтаксичні помилки"
        ],
        correctAnswer: 0,
        explanation: "Обробка винятків робить програму стійкішою до очікуваних збоїв."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Блок try можна використовувати без except, якщо є finally.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Допустимо try/finally без except — для гарантованого прибирання ресурсів."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
