/**
 * Lesson 2-8: Практика: алгоритмічні задачі
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_8 = {
  lessonId: "lesson-2-8",
  moduleId: "module-2",
  order: 8,
  title: "Практика: алгоритмічні задачі",
  
  learningObjectives: [
    "Розв'язувати алгоритмічні задачі",
    "Застосовувати цикли та умови",
    "Аналізувати складність алгоритмів",
    "Практикуватися у написанні ефективного коду"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-2-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Підхід до алгоритмічних задач",
        content: `**Крок 1: Зрозуміти задачу**
- Що потрібно зробити?
- Які вхідні дані?
- Який очікуваний результат?

**Крок 2: Розбити на підзадачі**
- Які кроки потрібні?
- Які умови потрібно перевірити?
- Які цикли потрібні?

**Крок 3: Написати код**
- Почніть з простого
- Додавайте складність поступово
- Тестуйте на кожному етапі

**Крок 4: Оптимізувати**
- Чи можна спростити?
- Чи є зайві перевірки?
- Чи можна зменшити кількість ітерацій?`
      },
      {
        title: "Типові алгоритмічні задачі",
        content: `**1. Підрахунок:**
\`\`\`python
# Підрахунок парних чисел
count = 0
for i in range(1, 11):
    if i % 2 == 0:
        count += 1
print(f"Парних чисел: {count}")
\`\`\`

**2. Пошук максимуму/мінімуму:**
\`\`\`python
# Знаходження максимуму з введених чисел
maximum = None
for i in range(5):
    num = int(input(f"Введіть число {i+1}: "))
    if maximum is None or num > maximum:
        maximum = num
print(f"Максимум: {maximum}")
\`\`\`

**3. Сума/добуток:**
\`\`\`python
# Сума чисел
total = 0
for i in range(1, 11):
    total += i
print(f"Сума: {total}")
\`\`\`

**4. Перевірка умови для всіх:**
\`\`\`python
# Перевірка, чи всі введені числа додатні
all_positive = True
for i in range(4):
    num = int(input(f"Введіть число {i+1}: "))
    if num <= 0:
        all_positive = False
        break
print(f"Всі додатні: {all_positive}")
\`\`\``
      },
      {
        title: "Аналіз складності",
        content: `**Часова складність** — скільки часу займає виконання.

**O(1)** — константна (завжди однаковий час)
\`\`\`python
x = 5 + 3  # O(1)
\`\`\`

**O(n)** — лінійна (пропорційна кількості елементів)
\`\`\`python
for i in range(n):  # O(n)
    print(i)
\`\`\`

**O(n²)** — квадратична (для вкладених циклів)
\`\`\`python
for i in range(n):  # O(n²)
    for j in range(n):
        print(i, j)
\`\`\`

**Практичні поради:**
- Уникайте зайвих вкладених циклів
- Використовуйте break для раннього виходу
- Перевіряйте прості умови спочатку`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Факторіал",
      code: `# Обчислення факторіалу числа
number = 5
factorial = 1

for i in range(1, number + 1):
    factorial *= i

print(f"Факторіал {number} = {factorial}")`,
      explanation: "Використання циклу for для обчислення факторіалу."
    },
    {
      title: "Приклад 2: Перевірка простого числа",
      code: `# Перевірка, чи число просте
number = 17
is_prime = True

if number < 2:
    is_prime = False
else:
    for i in range(2, number):
        if number % i == 0:
            is_prime = False
            break

print(f"{number} {'просте' if is_prime else 'не просте'}")`,
      explanation: "Використання циклу з break для перевірки простого числа."
    },
    {
      title: "Приклад 3: Послідовність Фібоначчі",
      code: `# Перші 10 чисел Фібоначчі
n = 10
a, b = 0, 1

print("Послідовність Фібоначчі:")
for i in range(n):
    print(a, end=" ")
    a, b = b, a + b`,
      explanation: "Використання циклу для генерації послідовності Фібоначчі."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неефективні алгоритми",
      explanation: "Використання O(n²) замість O(n) там, де можна.",
      correctApproach: "Аналізуйте складність та оптимізуйте алгоритми."
    },
    {
      mistake: "Зайві перевірки",
      explanation: "Перевірка однієї умови кілька разів.",
      correctApproach: "Зберігайте результати перевірок у змінних."
    },
    {
      mistake: "Не враховувати крайові випадки",
      explanation: "Забувати про порожні послідовності, нульові значення тощо.",
      correctApproach: "Завжди перевіряйте крайові випадки."
    }
  ],
  
  summary: `На цьому уроці ми практикувалися:

1. **Підхід до задач** — розуміння, розбиття, реалізація, оптимізація
2. **Типові алгоритми** — підрахунок, пошук, сума, перевірка
3. **Аналіз складності** — O(1), O(n), O(n²)
4. **Практика** — розв'язання реальних алгоритмічних задач

Алгоритмічне мислення — це основа програмування!`,
  
  practiceTask: {
    title: "Калькулятор статистики",
    description: "Створіть програму для обчислення статистики",
    problemStatement: `Напишіть програму, яка:
1. Отримує список чисел від користувача (через input, розділені комами)
2. Обчислює статистику:
   - Кількість чисел
   - Суму
   - Середнє значення
   - Мінімум
   - Максимум
   - Кількість парних чисел
   - Кількість додатніх чисел
3. Виводить всю статистику у форматованому вигляді`,
    inputFormat: "Користувач вводить числа через input(), розділені комами: '5, 10, 15, 20'",
    outputFormat: `Приклад виведення:
Кількість: 4
Сума: 50
Середнє: 12.5
Мінімум: 5
Максимум: 20
Парних: 2
Додатніх: 4`,
    examples: [
      {
        input: "numbers = '5, 10, 15, 20'",
        output: `Кількість: 4
Сума: 50
Середнє: 12.5
Мінімум: 5
Максимум: 20
Парних: 2
Додатніх: 4`,
        explanation: "Програма обчислює різну статистику для введених чисел"
      }
    ],
    solution: {
      code: `# Калькулятор статистики
user_input = input("Введіть числа через кому: ")
numbers_str = user_input.split(",")

# Конвертація в числа та обчислення статистики
count = 0
total = 0
minimum = None
maximum = None
evens = 0
positives = 0

for num_str in numbers_str:
    try:
        num = int(num_str.strip())
        count += 1
        total += num
        
        if minimum is None or num < minimum:
            minimum = num
        if maximum is None or num > maximum:
            maximum = num
        
        if num % 2 == 0:
            evens += 1
        if num > 0:
            positives += 1
    except ValueError:
        print(f"Пропущено некоректне значення: {num_str}")

if count == 0:
    print("Немає валідних чисел!")
else:
    average = total / count
    
    # Виведення
    print(f"Кількість: {count}")
    print(f"Сума: {total}")
    print(f"Середнє: {average}")
    print(f"Мінімум: {minimum}")
    print(f"Максимум: {maximum}")
    print(f"Парних: {evens}")
    print(f"Додатніх: {positives}")`,
      explanation: "Рішення використовує один цикл для обчислення всієї статистики одночасно."
    },
    hints: [
      "Використовуйте split() для розбиття рядка на числа",
      "Використовуйте один цикл для обчислення всієї статистики",
      "Ініціалізуйте min/max першим елементом",
      "Перевіряйте умови (парність, додатність) всередині циклу"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка складність циклу for i in range(n)?",
        options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
        correctAnswer: 1,
        explanation: "Цикл for i in range(n) виконується n разів, тому складність O(n)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка складність двох вкладених циклів for i in range(n): for j in range(n)?",
        options: ["O(n)", "O(n²)", "O(2n)", "O(n log n)"],
        correctAnswer: 1,
        explanation: "Два вкладені цикли дають n*n ітерацій, тому складність O(n²)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

