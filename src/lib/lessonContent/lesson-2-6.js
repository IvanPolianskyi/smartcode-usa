/**
 * Lesson 2-6: break, continue, else в циклах
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_6 = {
  lessonId: "lesson-2-6",
  moduleId: "module-2",
  order: 6,
  title: "break, continue, else в циклах",
  
  learningObjectives: [
    "Використовувати break для виходу з циклу",
    "Застосовувати continue для пропуску ітерації",
    "Розуміти else в циклах",
    "Контролювати виконання циклів"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-2-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Оператор break",
        content: `break одразу виходить з циклу, не виконуючи решту коду в поточній ітерації та наступні ітерації.

**Синтаксис:**
\`\`\`python
for i in range(10):
    if умова:
        break  # Виходить з циклу
    # решта коду
\`\`\`

**Приклад:**
\`\`\`python
# Пошук першого парного числа
for i in range(1, 10):
    if i % 2 == 0:
        print(f"Знайдено перше парне число: {i}")
        break
# Виведе: Знайдено перше парне число: 2
# Цикл зупиниться після знаходження
\`\`\`

**З while:**
\`\`\`python
while True:
    user_input = input("Введіть 'quit' для виходу: ")
    if user_input == "quit":
        break
    print(f"Ви ввели: {user_input}")
print("Цикл завершено")
\`\`\``
      },
      {
        title: "Оператор continue",
        content: `continue пропускає поточну ітерацію та переходить до наступної.

**Синтаксис:**
\`\`\`python
for i in range(10):
    if умова:
        continue  # Пропускає решту коду в цій ітерації
    # решта коду виконається тільки якщо умова False
\`\`\`

**Приклад:**
\`\`\`python
# Виведення тільки непарних чисел
for i in range(1, 11):
    if i % 2 == 0:
        continue  # Пропустити парні числа
    print(i)
# Виведе: 1, 3, 5, 7, 9 (тільки непарні)
\`\`\`

**Практичний приклад:**
\`\`\`python
# Обробка чисел від 1 до 10, пропускуючи парні
for number in range(1, 11):
    if number % 2 == 0:
        continue  # Пропустити парні
    print(f"Непарне число: {number}")
# Виведе: Непарне число: 1, Непарне число: 3, ..., Непарне число: 9
\`\`\``
      },
      {
        title: "else в циклах",
        content: `else в циклах виконується тільки якщо цикл завершився нормально (не через break).

**Синтаксис:**
\`\`\`python
for i in range(10):
    if умова:
        break
else:
    # Виконається тільки якщо break не викликався
    код_якщо_не_знайдено
\`\`\`

**Приклад:**
\`\`\`python
# Пошук числа
number = 5
for i in range(1, 10):
    if i == number:
        print(f"Знайдено: {i}")
        break
else:
    print(f"Число {number} не знайдено в діапазоні")
\`\`\`

**З while:**
\`\`\`python
count = 0
while count < 5:
    if count == 3:
        break
    count += 1
else:
    print("Цикл завершився нормально")
# else не виконається, бо був break
\`\`\`

**Коли використовувати else:**
- Пошук елемента (якщо не знайдено)
- Перевірка умови для всіх елементів
- Підтвердження нормального завершення циклу`
      },
      {
        title: "Комбінування break, continue, else",
        content: `Можна комбінувати всі три оператори:

\`\`\`python
# Пошук першого додатнього числа, пропускуючи нулі
numbers = [0, 0, -5, 10, 0, 8]

for num in numbers:
    if num == 0:
        continue  # Пропустити нулі
    if num < 0:
        continue  # Пропустити від'ємні
    # Якщо дійшли сюди, num > 0
    print(f"Знайдено перше додатнє число: {num}")
    break
else:
    print("Додатніх чисел не знайдено")
\`\`\`

**Практичний приклад:**
\`\`\`python
# Валідація чисел від користувача
for i in range(5):
    num = int(input(f"Введіть число {i+1}: "))
    if num < 0:
        print(f"Помилка: від'ємне число {num}")
        break
    if num % 5 != 0:
        print(f"Попередження: {num} не кратне 5")
        continue
    print(f"OK: {num} кратне 5")
else:
    print("Всі числа валідні!")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: break для виходу",
      code: `# Пошук першого дільника
number = 12
for i in range(2, number):
    if number % i == 0:
        print(f"Знайдено дільник: {i}")
        break
else:
    print("Дільників не знайдено (просте число)")`,
      explanation: "break виходить з циклу після знаходження першого дільника."
    },
    {
      title: "Приклад 2: continue для пропуску",
      code: `# Виведення тільки парних чисел
for i in range(1, 11):
    if i % 2 != 0:
        continue  # Пропустити непарні
    print(i)
# Виведе: 2, 4, 6, 8, 10`,
      explanation: "continue пропускає непарні числа та виводить тільки парні."
    },
    {
      title: "Приклад 3: else в циклі",
      code: `# Перевірка, чи всі числа додатні
numbers = [5, 10, 15]
for num in numbers:
    if num < 0:
        print(f"Знайдено від'ємне: {num}")
        break
else:
    print("Всі числа додатні!")`,
      explanation: "else виконується тільки якщо цикл не перервався через break."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між break та continue",
      explanation: "break виходить з циклу повністю, continue тільки пропускає поточну ітерацію.",
      correctApproach: "break = вихід, continue = пропуск ітерації."
    },
    {
      mistake: "Неправильне розуміння else в циклах",
      explanation: "else виконується тільки якщо цикл завершився нормально (без break).",
      correctApproach: "Використовуйте else для обробки випадку, коли break не викликався."
    },
    {
      mistake: "Використання break/continue поза циклом",
      explanation: "break та continue працюють тільки всередині циклів.",
      correctApproach: "Використовуйте break/continue тільки всередині for або while."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **break** — вихід з циклу одразу
2. **continue** — пропуск поточної ітерації
3. **else в циклах** — виконується якщо цикл завершився нормально (без break)
4. **Комбінування** — використання всіх трьох разом

Ці оператори дають повний контроль над виконанням циклів!`,
  
  practiceTask: {
    title: "Пошук та фільтрація чисел",
    description: "Створіть програму для пошуку та фільтрації чисел",
    problemStatement: `Напишіть програму, яка:
1. Перевіряє список чисел
2. Знаходить перше число, кратне 7
3. Пропускає від'ємні числа (continue)
4. Виходить, якщо знайдено число > 100 (break)
5. Використовує else для повідомлення, якщо число, кратне 7, не знайдено
6. Виводить статистику`,
    inputFormat: "Програма працює з попередньо заданими числами: 5, -3, 14, 20, 21",
    outputFormat: `Приклад виведення:
Перевірка числа: 5
Перевірка числа: -3 (пропущено)
Перевірка числа: 14
Знайдено перше число, кратне 7: 14`,
    examples: [
      {
        input: "numbers: 5, -3, 14, 20, 21",
        output: `Перевірка числа: 5
Перевірка числа: -3 (пропущено)
Перевірка числа: 14
Знайдено перше число, кратне 7: 14`,
        explanation: "Програма знаходить перше число, кратне 7, пропускаючи від'ємні"
      },
      {
        input: "numbers: 5, 10, 20, 105",
        output: `Перевірка числа: 5
Перевірка числа: 10
Перевірка числа: 20
Перевірка числа: 105
Число > 100 знайдено! Зупинка.
Число, кратне 7, не знайдено.`,
        explanation: "break зупиняє цикл при числі > 100, else не виконується"
      }
    ],
    solution: {
      code: `# Пошук та фільтрація чисел
# Отримуємо числа від користувача
print("Введіть 5 чисел:")
for i in range(5):
    try:
        num = int(input(f"Число {i+1}: "))
        
        # Перевірка на число > 100
        if num > 100:
            print(f"Число > 100 знайдено! Зупинка.")
            break
        
        # Пропуск від'ємних
        if num < 0:
            print(f"Перевірка числа: {num} (пропущено)")
            continue
        
        print(f"Перевірка числа: {num}")
        
        # Перевірка на кратність 7
        if num % 7 == 0:
            print(f"Знайдено перше число, кратне 7: {num}")
            break
    except ValueError:
        print("Пропущено некоректне значення")
        continue
else:
    print("Число, кратне 7, не знайдено.")`,
      explanation: "Рішення використовує break для виходу, continue для пропуску від'ємних, та else для обробки випадку, коли число не знайдено."
    },
    hints: [
      "Використовуйте break для виходу після знаходження числа, кратного 7",
      "Використовуйте continue для пропуску від'ємних чисел",
      "Перевіряйте num > 100 перед іншими перевірками",
      "Використовуйте else для повідомлення, якщо число не знайдено"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)\n```",
        options: ["0, 1, 2, 3", "0, 1, 2", "0, 1, 2, 3, 4", "3"],
        correctAnswer: 1,
        explanation: "break виходить з циклу коли i == 3, тому виведе 0, 1, 2 (до break)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i)\n```",
        options: ["0, 1, 2, 3, 4", "0, 1, 2, 4", "0, 1, 2", "3"],
        correctAnswer: 1,
        explanation: "continue пропускає ітерацію коли i == 3, тому виведе 0, 1, 2, 4 (пропустить 3)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(5):\n    if i == 10:\n        break\nelse:\n    print('Not found')\n```",
        options: ["Нічого", "Not found", "0, 1, 2, 3, 4", "Помилку"],
        correctAnswer: 1,
        explanation: "break ніколи не викликається (i ніколи не буде 10), тому else виконається і виведе 'Not found'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить continue?",
        options: ["Вихід з циклу", "Пропуск ітерації", "Продовження циклу", "Зупинка програми"],
        correctAnswer: 1,
        explanation: "continue пропускає поточну ітерацію та переходить до наступної."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
