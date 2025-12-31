/**
 * Lesson 2-4: Цикл while
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_4 = {
  lessonId: "lesson-2-4",
  moduleId: "module-2",
  order: 4,
  title: "Цикл while",
  
  learningObjectives: [
    "Використовувати цикл while",
    "Контролювати умови виходу з циклу",
    "Уникати нескінченних циклів",
    "Застосовувати while для різних задач"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-2-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке цикл while?",
        content: `Цикл while виконує код повторно, поки умова True. Це як питання "Чи продовжувати?" — якщо відповідь "так" (True), цикл виконується знову.

**Синтаксис:**
\`\`\`python
while умова:
    # код, який виконується
    # поки умова True
\`\`\`

**Простий приклад:**
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
# Виведе: 0, 1, 2, 3, 4
\`\`\`

**Як це працює:**
1. Перевіряється умова (count < 5)
2. Якщо True, виконується код всередині циклу
3. Після виконання знову перевіряється умова
4. Якщо все ще True, цикл повторюється
5. Якщо False, цикл завершується`
      },
      {
        title: "Базові приклади",
        content: `**Підрахунок:**
\`\`\`python
number = 1
while number <= 10:
    print(number)
    number += 1
# Виведе числа від 1 до 10
\`\`\`

**Введення до правильного значення:**
\`\`\`python
age = 0
while age < 1 or age > 120:
    age = int(input("Введіть вік (1-120): "))
    if age < 1 or age > 120:
        print("Невірний вік! Спробуйте ще раз.")
print(f"Ваш вік: {age}")
\`\`\`

**Підрахунок суми:**
\`\`\`python
total = 0
number = 1
while number <= 10:
    total += number
    number += 1
print(f"Сума чисел від 1 до 10: {total}")
# Виведе: Сума чисел від 1 до 10: 55
\`\`\``
      },
      {
        title: "Нескінченні цикли та як їх уникнути",
        content: `**Нескінченний цикл** — це цикл, який ніколи не закінчується, бо умова завжди True.

**Приклад нескінченного циклу:**
\`\`\`python
# УВАГА: Цей код виконається вічно!
count = 0
while count < 5:
    print(count)
    # Забули збільшити count!
    # count завжди 0, тому count < 5 завжди True
\`\`\`

**Як уникнути нескінченних циклів:**

1. **Завжди змінюйте змінну в умові:**
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1  # Важливо!
\`\`\`

2. **Використовуйте break для виходу:**
\`\`\`python
while True:
    user_input = input("Введіть 'quit' для виходу: ")
    if user_input == "quit":
        break  # Виходить з циклу
    print(f"Ви ввели: {user_input}")
\`\`\`

3. **Перевіряйте умову перед циклом:**
\`\`\`python
# Якщо умова False з самого початку, цикл не виконається
count = 10
while count < 5:  # False, цикл не виконається
    print(count)
\`\`\``
      },
      {
        title: "Практичні застосування",
        content: `**Меню з вибором:**
\`\`\`python
while True:
    print("1. Додати")
    print("2. Видалити")
    print("3. Вийти")
    choice = input("Виберіть опцію: ")
    
    if choice == "1":
        print("Додавання...")
    elif choice == "2":
        print("Видалення...")
    elif choice == "3":
        print("До побачення!")
        break
    else:
        print("Невірний вибір!")
\`\`\`

**Валідація введення:**
\`\`\`python
while True:
    try:
        number = int(input("Введіть число: "))
        if number > 0:
            break
        else:
            print("Число має бути додатнім!")
    except ValueError:
        print("Введіть правильне число!")
print(f"Ви ввели: {number}")
\`\`\`

**Підрахунок до досягнення мети:**
\`\`\`python
savings = 0
target = 1000
month = 0

while savings < target:
    month += 1
    savings += 100
    print(f"Місяць {month}: {savings} грн")
print(f"Мета досягнута за {month} місяців!")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Підрахунок",
      code: `# Виведення чисел від 1 до 10
count = 1
while count <= 10:
    print(count)
    count += 1`,
      explanation: "Базовий приклад циклу while для підрахунку."
    },
    {
      title: "Приклад 2: Валідація введення",
      code: `# Отримання правильного віку
age = 0
while age < 1 or age > 120:
    try:
        age = int(input("Введіть вік (1-120): "))
        if age < 1 or age > 120:
            print("Вік має бути від 1 до 120!")
    except ValueError:
        print("Введіть число!")
print(f"Ваш вік: {age}")`,
      explanation: "Цикл while для валідації введення користувача."
    },
    {
      title: "Приклад 3: Меню",
      code: `# Просте меню
while True:
    print("1. Привіт")
    print("2. Пока")
    print("3. Вийти")
    choice = input("Виберіть: ")
    
    if choice == "1":
        print("Привіт!")
    elif choice == "2":
        print("Пока!")
    elif choice == "3":
        break
    else:
        print("Невірний вибір!")`,
      explanation: "Використання while True з break для меню."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Нескінченний цикл через незмінну умову",
      explanation: "Якщо змінна в умові не змінюється, цикл стає нескінченним.",
      correctApproach: "Завжди змінюйте змінну, яка використовується в умові циклу."
    },
    {
      mistake: "Забути break у while True",
      explanation: "while True виконується вічно, якщо немає break.",
      correctApproach: "Завжди додавайте умову з break для виходу з while True."
    },
    {
      mistake: "Неправильна умова виходу",
      explanation: "Якщо умова ніколи не стає False, цикл не завершиться.",
      correctApproach: "Переконайтеся, що умова може стати False."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Цикл while** — виконує код, поки умова True
2. **Контроль циклу** — зміна змінних, break для виходу
3. **Нескінченні цикли** — як їх уникнути
4. **Практичні застосування** — меню, валідація, підрахунки

Цикл while ідеальний для ситуацій, коли не знаємо точно, скільки разів потрібно повторити дію.`,
  
  practiceTask: {
    title: "Гра 'Вгадай число'",
    description: "Створіть гру, де користувач вгадує число",
    problemStatement: `Напишіть програму "Вгадай число", яка:
1. Генерує випадкове число від 1 до 100 (використовуйте number = 42 для тестування)
2. Дозволяє користувачу вгадувати число
3. Підказує "більше" або "менше" після кожної спроби
4. Підраховує кількість спроб
5. Вітає при правильній відповіді
6. Питає, чи хоче грати ще раз`,
    inputFormat: "Користувач вводить числа через input()",
    outputFormat: `Приклад виведення:
Вгадайте число від 1 до 100!
Спроба 1: 50
Менше!
Спроба 2: 30
Більше!
Спроба 3: 42
Вітаю! Ви вгадали за 3 спроби!
Грати ще раз? (так/ні): `,
    examples: [
      {
        input: "number = 42, guesses = [50, 30, 42]",
        output: `Спроба 1: 50
Менше!
Спроба 2: 30
Більше!
Спроба 3: 42
Вітаю! Ви вгадали за 3 спроби!`,
        explanation: "Гра підказує користувачу та підраховує спроби"
      }
    ],
    solution: {
      code: `# Гра "Вгадай число"
number = 42  # Для тестування (пізніше використаємо random)

while True:
    print("Вгадайте число від 1 до 100!")
    attempts = 0
    guessed = False
    
    while not guessed:
        try:
            guess = int(input("Ваше число: "))
            attempts += 1
            
            if guess == number:
                print(f"Вітаю! Ви вгадали за {attempts} спроб!")
                guessed = True
            elif guess < number:
                print("Більше!")
            else:
                print("Менше!")
        except ValueError:
            print("Введіть число!")
    
    play_again = input("Грати ще раз? (так/ні): ").lower()
    if play_again != "так":
        print("Дякую за гру!")
        break`,
      explanation: "Рішення використовує вкладені цикли while: зовнішній для повторення гри, внутрішній для вгадування."
    },
    hints: [
      "Використовуйте while True для зовнішнього циклу (повторення гри)",
      "Використовуйте окремий while для циклу вгадування",
      "Використовуйте змінну guessed для контролю внутрішнього циклу",
      "Підраховуйте спроби всередині циклу вгадування"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки разів виконається цикл?\n\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```",
        options: ["4", "5", "6", "Нескінченно"],
        correctAnswer: 1,
        explanation: "Цикл виконається 5 разів: для count = 0, 1, 2, 3, 4."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що потрібно зробити, щоб вийти з while True?",
        options: ["Змінити умову на False", "Використати break", "Використати continue", "Обидва A і B"],
        correctAnswer: 3,
        explanation: "Можна використати break або змінити умову через змінну."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 10\nwhile x > 5:\n    print(x)\n    x -= 2\n```",
        options: ["10, 8, 6", "10, 8, 6, 4", "10", "Нескінченно"],
        correctAnswer: 0,
        explanation: "x починається з 10, потім 8, потім 6. Коли x стає 4, умова x > 5 стає False, цикл зупиняється."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
