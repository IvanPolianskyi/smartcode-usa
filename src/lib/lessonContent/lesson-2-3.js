/**
 * Lesson 2-3: Списки (Lists)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_3 = {
  lessonId: "lesson-2-3",
  moduleId: "module-2",
  order: 3,
  title: "Списки (Lists)",
  
  learningObjectives: [
    "Створювати та модифікувати списки",
    "Використовувати методи списків (append, insert, remove, pop)",
    "Працювати зі зрізами списків",
    "Створювати спискові включення (list comprehensions)"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-2-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке списки?",
        content: `Список (list) — це впорядкована колекція елементів, яка може містити різні типи даних.

**Створення списків:**
\`\`\`python
# Порожній список
empty_list = []

# Список з елементами
fruits = ["яблуко", "банан", "апельсин"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "два", 3.0, True]  # Можна змішувати типи
\`\`\`

**Доступ до елементів:**
\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]
print(fruits[0])   # яблуко (перший елемент)
print(fruits[1])   # банан
print(fruits[-1])  # апельсин (останній елемент)
\`\`\`

**Зміна елементів:**
\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]
fruits[0] = "груша"
print(fruits)  # ['груша', 'банан', 'апельсин']
\`\`\``
      },
      {
        title: "Методи списків",
        content: `**Додавання елементів:**
\`\`\`python
fruits = ["яблуко", "банан"]
fruits.append("апельсин")  # Додає в кінець
print(fruits)  # ['яблуко', 'банан', 'апельсин']

fruits.insert(1, "груша")  # Вставляє на позицію 1
print(fruits)  # ['яблуко', 'груша', 'банан', 'апельсин']
\`\`\`

**Видалення елементів:**
\`\`\`python
fruits = ["яблуко", "банан", "апельсин"]
fruits.remove("банан")  # Видаляє перше входження
print(fruits)  # ['яблуко', 'апельсин']

fruits.pop()  # Видаляє останній елемент
print(fruits)  # ['яблуко']

fruits.pop(0)  # Видаляє елемент за індексом
\`\`\`

**Інші корисні методи:**
\`\`\`python
numbers = [3, 1, 4, 1, 5]
print(len(numbers))      # 5 (довжина)
print(numbers.count(1))   # 2 (кількість входжень)
print(numbers.index(4))  # 2 (індекс першого входження)

numbers.sort()           # Сортує список
print(numbers)           # [1, 1, 3, 4, 5]

numbers.reverse()        # Реверсує список
print(numbers)           # [5, 4, 3, 1, 1]
\`\`\``
      },
      {
        title: "Зрізи списків",
        content: `Зрізи працюють так само, як з рядками:

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])    # [2, 3, 4] (індекси 2, 3, 4)
print(numbers[:5])     # [0, 1, 2, 3, 4] (з початку до 5)
print(numbers[5:])     # [5, 6, 7, 8, 9] (від 5 до кінця)
print(numbers[::2])    # [0, 2, 4, 6, 8] (кожен другий)
print(numbers[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (реверс)
\`\`\`

**Копіювання списків:**
\`\`\`python
original = [1, 2, 3]
copy1 = original[:]      # Повна копія
copy2 = original.copy()   # Теж повна копія
copy3 = list(original)   # Ще один спосіб
\`\`\`

**Важливо:** \`copy = original\` створює посилання, а не копію!
\`\`\`python
original = [1, 2, 3]
reference = original     # Посилання на той самий список
reference.append(4)
print(original)         # [1, 2, 3, 4] - змінилося!
\`\`\``
      },
      {
        title: "Спискові включення (List Comprehensions)",
        content: `Спискові включення — елегантний спосіб створювати списки:

**Базовий синтаксис:**
\`\`\`python
# Звичайний спосіб
squares = []
for x in range(10):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Зі списковим включенням
squares = [x ** 2 for x in range(10)]
print(squares)  # Те саме, але коротше!
\`\`\`

**З умовою:**
\`\`\`python
# Тільки парні числа
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Квадрати парних чисел
squares_evens = [x ** 2 for x in range(10) if x % 2 == 0]
print(squares_evens)  # [0, 4, 16, 36, 64]
\`\`\`

**Вкладені цикли:**
\`\`\`python
# Таблиця множення
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(table)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові операції зі списками",
      code: `# Створення та модифікація списку
students = ["Олександр", "Марія", "Дмитро"]
print(f"Студентів: {len(students)}")

# Додавання
students.append("Анна")
students.insert(1, "Іван")
print(students)

# Видалення
students.remove("Марія")
last = students.pop()
print(f"Видалено: {last}")
print(students)`,
      explanation: "Демонструє створення, додавання та видалення елементів зі списку."
    },
    {
      title: "Приклад 2: Сортування та пошук",
      code: `# Робота з оцінками
scores = [85, 92, 78, 95, 88]
print(f"Оцінки: {scores}")

# Сортування
scores.sort()
print(f"Відсортовані: {scores}")

# Максимальна та мінімальна
print(f"Найвища: {max(scores)}")
print(f"Найнижча: {min(scores)}")
print(f"Середня: {sum(scores) / len(scores):.2f}")`,
      explanation: "Показує сортування та пошук у списках."
    },
    {
      title: "Приклад 3: Спискові включення",
      code: `# Генерація списків
# Квадрати чисел від 0 до 9
squares = [x ** 2 for x in range(10)]
print(f"Квадрати: {squares}")

# Тільки парні числа
evens = [x for x in range(20) if x % 2 == 0]
print(f"Парні: {evens}")

# Перетворення рядків
words = ["hello", "world", "python"]
uppercase = [word.upper() for word in words]
print(f"Верхній регістр: {uppercase}")`,
      explanation: "Демонструє використання спискових включень для створення списків."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між append() та extend()",
      explanation: "append() додає один елемент, extend() додає всі елементи з іншого списку.",
      correctApproach: "Використовуйте append() для одного елемента, extend() для списку елементів."
    },
    {
      mistake: "Спроба змінити список під час ітерації",
      explanation: "Зміна списку під час ітерації може призвести до неочікуваних результатів.",
      correctApproach: "Створіть копію списку або використовуйте зворотну ітерацію."
    },
    {
      mistake: "Плутанина між копією та посиланням",
      explanation: "list2 = list1 створює посилання, не копію. Зміни в list2 вплинуть на list1.",
      correctApproach: "Використовуйте list2 = list1[:] або list2 = list1.copy() для копії."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Створення списків** — [] або list()
2. **Методи списків** — append(), insert(), remove(), pop(), sort(), reverse()
3. **Зрізи списків** — [start:end:step]
4. **Спискові включення** — [вираз for елемент in послідовність if умова]

Списки — це потужний інструмент для роботи з колекціями даних!`,
  
  practiceTask: {
    title: "Менеджер завдань",
    description: "Створіть програму для управління списком завдань",
    problemStatement: `Напишіть програму, яка:
1. Дозволяє додавати завдання до списку
2. Показує всі завдання з номерами
3. Дозволяє видаляти завдання за номером
4. Дозволяє відмічати завдання як виконані
5. Показує статистику (всього, виконаних, залишилося)`,
    inputFormat: "Користувач вводить команди через input()",
    outputFormat: `Приклад виведення:
=== Менеджер завдань ===
1. Купити молоко [ ]
2. Зробити домашнє завдання [✓]
Всього: 2, Виконано: 1, Залишилося: 1`,
    examples: [
      {
        input: "Додати: 'Купити молоко', Видалити: 1",
        output: "Завдання видалено",
        explanation: "Програма додає та видаляє завдання зі списку"
      }
    ],
    solution: {
      code: `# Менеджер завдань
tasks = []
completed = []

def show_tasks():
    print("\n=== Завдання ===")
    for i, task in enumerate(tasks, 1):
        status = "✓" if i-1 in completed else " "
        print(f"{i}. {task} [{status}]")
    print(f"\nВсього: {len(tasks)}, Виконано: {len(completed)}, Залишилося: {len(tasks) - len(completed)}")

while True:
    print("\n1. Додати завдання")
    print("2. Видалити завдання")
    print("3. Відмітити як виконане")
    print("4. Показати завдання")
    print("5. Вийти")
    
    choice = input("Виберіть дію: ")
    
    if choice == "1":
        task = input("Введіть завдання: ")
        tasks.append(task)
        print("Завдання додано!")
    elif choice == "2":
        show_tasks()
        try:
            num = int(input("Номер завдання для видалення: ")) - 1
            if 0 <= num < len(tasks):
                tasks.pop(num)
                if num in completed:
                    completed.remove(num)
                print("Завдання видалено!")
            else:
                print("Невірний номер!")
        except ValueError:
            print("Введіть число!")
    elif choice == "3":
        show_tasks()
        try:
            num = int(input("Номер виконаного завдання: ")) - 1
            if 0 <= num < len(tasks):
                if num not in completed:
                    completed.append(num)
                    print("Завдання відмічено як виконане!")
                else:
                    print("Завдання вже виконане!")
            else:
                print("Невірний номер!")
        except ValueError:
            print("Введіть число!")
    elif choice == "4":
        show_tasks()
    elif choice == "5":
        print("До побачення!")
        break
    else:
        print("Невірний вибір!")`,
      explanation: "Рішення використовує списки для зберігання завдань та виконаних завдань, з методами append(), pop(), remove()."
    },
    hints: [
      "Використовуйте два списки: один для завдань, інший для індексів виконаних",
      "Використовуйте enumerate() для нумерації завдань",
      "Перевіряйте індекси перед видаленням або відміткою"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить метод append()?",
        options: ["Додає елемент в кінець списку", "Додає елемент на початок", "Додає кілька елементів", "Видаляє елемент"],
        correctAnswer: 0,
        explanation: "append() додає один елемент в кінець списку."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: [1, 2, 3][1:3]?",
        options: ["[1, 2]", "[2, 3]", "[1, 2, 3]", "[2]"],
        correctAnswer: 1,
        explanation: "[1:3] бере елементи з індексами 1 та 2 (не включаючи 3), тобто [2, 3]."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як створити копію списку?",
        options: ["copy = original", "copy = original[:]", "copy = original.copy()", "Обидва B і C"],
        correctAnswer: 3,
        explanation: "І original[:], і original.copy() створюють копію. original = copy створює посилання."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: [x*2 for x in range(5)]?",
        options: ["[0, 2, 4, 6, 8]", "[2, 4, 6, 8, 10]", "[0, 1, 2, 3, 4]", "Помилку"],
        correctAnswer: 0,
        explanation: "Спискове включення множить кожен елемент range(5) на 2: [0*2, 1*2, 2*2, 3*2, 4*2] = [0, 2, 4, 6, 8]."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить pop() без аргументів?",
        options: ["Видаляє перший елемент", "Видаляє останній елемент", "Видаляє всі елементи", "Нічого"],
        correctAnswer: 1,
        explanation: "pop() без аргументів видаляє та повертає останній елемент списку."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


