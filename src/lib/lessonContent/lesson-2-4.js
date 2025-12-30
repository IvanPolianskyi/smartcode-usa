/**
 * Lesson 2-4: Словники (Dictionaries)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_4 = {
  lessonId: "lesson-2-4",
  moduleId: "module-2",
  order: 4,
  title: "Словники (Dictionaries)",
  
  learningObjectives: [
    "Створювати та модифікувати словники",
    "Отримувати доступ до значень за ключами",
    "Використовувати методи словників (keys, values, items)",
    "Ітерувати по словниках"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-2-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке словники?",
        content: `Словник (dictionary) — це невпорядкована колекція пар ключ-значення.

**Створення словників:**
\`\`\`python
# Порожній словник
empty_dict = {}

# Словник з елементами
student = {
    "ім'я": "Олександр",
    "вік": 15,
    "клас": 9
}

# Альтернативний спосіб
student = dict(ім'я="Олександр", вік=15, клас=9)
\`\`\`

**Доступ до значень:**
\`\`\`python
student = {"ім'я": "Олександр", "вік": 15}
print(student["ім'я"])        # Олександр
print(student.get("вік"))     # 15
print(student.get("місто", "Невідомо"))  # Невідомо (якщо ключа немає)
\`\`\`

**Зміна та додавання:**
\`\`\`python
student = {"ім'я": "Олександр", "вік": 15}
student["вік"] = 16           # Зміна значення
student["місто"] = "Київ"     # Додавання нового ключа
print(student)  # {"ім'я": "Олександр", "вік": 16, "місто": "Київ"}
\`\`\``
      },
      {
        title: "Методи словників",
        content: `**Отримання значень:**
\`\`\`python
student = {"ім'я": "Олександр", "вік": 15}

# get() - безпечний доступ
age = student.get("вік", 0)  # 15, або 0 якщо ключа немає

# keys() - всі ключі
print(list(student.keys()))  # ["ім'я", "вік"]

# values() - всі значення
print(list(student.values()))  # ["Олександр", 15]

# items() - пари ключ-значення
print(list(student.items()))  # [("ім'я", "Олександр"), ("вік", 15)]
\`\`\`

**Видалення:**
\`\`\`python
student = {"ім'я": "Олександр", "вік": 15, "клас": 9}

del student["клас"]           # Видаляє ключ
age = student.pop("вік")      # Видаляє та повертає значення
student.clear()               # Очищає весь словник
\`\`\`

**Оновлення:**
\`\`\`python
student = {"ім'я": "Олександр", "вік": 15}
updates = {"вік": 16, "місто": "Київ"}
student.update(updates)       # Оновлює словник
print(student)  # {"ім'я": "Олександр", "вік": 16, "місто": "Київ"}
\`\`\``
      },
      {
        title: "Ітерація по словниках",
        content: `**Ітерація по ключах:**
\`\`\`python
student = {"ім'я": "Олександр", "вік": 15, "клас": 9}

for key in student:
    print(f"{key}: {student[key]}")

# Або явно
for key in student.keys():
    print(key)
\`\`\`

**Ітерація по значеннях:**
\`\`\`python
for value in student.values():
    print(value)
\`\`\`

**Ітерація по парах:**
\`\`\`python
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\`

**Вкладені словники:**
\`\`\`python
students = {
    "студент1": {"ім'я": "Олександр", "вік": 15},
    "студент2": {"ім'я": "Марія", "вік": 16}
}

for student_id, info in students.items():
    print(f"{student_id}: {info['ім'я']}, {info['вік']} років")
\`\`\``
      },
      {
        title: "Словникові включення",
        content: `Аналогічно списковим включенням:

\`\`\`python
# Звичайний спосіб
squares = {}
for x in range(5):
    squares[x] = x ** 2

# Зі словниковим включенням
squares = {x: x ** 2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# З умовою
evens_squares = {x: x ** 2 for x in range(10) if x % 2 == 0}
print(evens_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
\`\`\`

**Перетворення списків:**
\`\`\`python
names = ["Олександр", "Марія", "Дмитро"]
ages = [15, 16, 14]

# Створення словника з двох списків
students = {name: age for name, age in zip(names, ages)}
print(students)  # {"Олександр": 15, "Марія": 16, "Дмитро": 14}
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові операції",
      code: `# Створення та робота зі словником
student = {
    "ім'я": "Олександр",
    "вік": 15,
    "клас": 9,
    "місто": "Київ"
}

# Доступ до значень
print(f"Ім'я: {student['ім'я']}")
print(f"Вік: {student.get('вік', 'Невідомо')}")

# Додавання та зміна
student["середній_бал"] = 4.5
student["вік"] = 16

# Видалення
del student["місто"]
print(student)`,
      explanation: "Демонструє створення, доступ, зміну та видалення в словниках."
    },
    {
      title: "Приклад 2: Ітерація по словнику",
      code: `# Перебір елементів словника
grades = {
    "Математика": 85,
    "Фізика": 92,
    "Хімія": 78,
    "Історія": 88
}

# По ключах та значеннях
for subject, score in grades.items():
    print(f"{subject}: {score}")

# Тільки предмети з високими оцінками
high_grades = {s: g for s, g in grades.items() if g >= 85}
print(f"Високі оцінки: {high_grades}")`,
      explanation: "Показує ітерацію по словнику та фільтрацію."
    },
    {
      title: "Приклад 3: Вкладені словники",
      code: `# База даних студентів
students = {
    "001": {
        "ім'я": "Олександр",
        "вік": 15,
        "оцінки": [85, 92, 78]
    },
    "002": {
        "ім'я": "Марія",
        "вік": 16,
        "оцінки": [90, 88, 95]
    }
}

# Доступ до вкладених даних
for student_id, info in students.items():
    avg = sum(info["оцінки"]) / len(info["оцінки"])
    print(f"{info['ім'я']} (ID: {student_id}): середній бал {avg:.2f}")`,
      explanation: "Демонструє роботу з вкладеними словниками."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Доступ до неіснуючого ключа",
      explanation: "student['місто'] викличе KeyError, якщо ключа немає.",
      correctApproach: "Використовуйте student.get('місто', 'Невідомо') для безпечного доступу."
    },
    {
      mistake: "Плутанина між ключами та значеннями",
      explanation: "Ключі — це те, за чим шукаємо, значення — те, що зберігаємо.",
      correctApproach: "Пам'ятайте: словник[ключ] = значення"
    },
    {
      mistake: "Використання незмінних типів як ключів",
      explanation: "Ключі мають бути незмінними (str, int, tuple), не можна використовувати списки.",
      correctApproach: "Використовуйте str, int, tuple як ключі. Для списків використовуйте tuple."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Створення словників** — {} або dict()
2. **Доступ до значень** — dict[key] або dict.get(key, default)
3. **Методи** — keys(), values(), items(), update(), pop()
4. **Ітерація** — for key, value in dict.items()
5. **Словникові включення** — {key: value for ...}

Словники — ідеальний вибір для структурованих даних!`,
  
  practiceTask: {
    title: "Система управління студентами",
    description: "Створіть програму для управління базою даних студентів",
    problemStatement: `Напишіть програму, яка:
1. Дозволяє додавати студентів (ID, ім'я, вік, клас)
2. Зберігає оцінки для кожного студента
3. Показує інформацію про студента
4. Обчислює середній бал студента
5. Показує список всіх студентів`,
    inputFormat: "Користувач вводить команди через input()",
    outputFormat: `Приклад виведення:
=== Студенти ===
ID: 001, Ім'я: Олександр, Вік: 15, Клас: 9
Оцінки: [85, 92, 78], Середній: 85.0`,
    examples: [
      {
        input: "Додати студента: ID=001, ім'я=Олександр, вік=15, клас=9",
        output: "Студент додано!",
        explanation: "Програма зберігає дані студента у словнику"
      }
    ],
    solution: {
      code: `# Система управління студентами
students = {}

def add_student():
    student_id = input("ID студента: ")
    name = input("Ім'я: ")
    age = int(input("Вік: "))
    grade = int(input("Клас: "))
    
    students[student_id] = {
        "ім'я": name,
        "вік": age,
        "клас": grade,
        "оцінки": []
    }
    print("Студент додано!")

def add_grade():
    student_id = input("ID студента: ")
    if student_id in students:
        score = float(input("Оцінка: "))
        students[student_id]["оцінки"].append(score)
        print("Оцінку додано!")
    else:
        print("Студента не знайдено!")

def show_student():
    student_id = input("ID студента: ")
    if student_id in students:
        s = students[student_id]
        avg = sum(s["оцінки"]) / len(s["оцінки"]) if s["оцінки"] else 0
        print(f"ID: {student_id}")
        print(f"Ім'я: {s['ім'я']}, Вік: {s['вік']}, Клас: {s['клас']}")
        print(f"Оцінки: {s['оцінки']}, Середній: {avg:.2f}")
    else:
        print("Студента не знайдено!")

def show_all():
    print("\n=== Всі студенти ===")
    for student_id, info in students.items():
        avg = sum(info["оцінки"]) / len(info["оцінки"]) if info["оцінки"] else 0
        print(f"ID: {student_id}, {info['ім'я']}, Середній: {avg:.2f}")

while True:
    print("\n1. Додати студента")
    print("2. Додати оцінку")
    print("3. Показати студента")
    print("4. Показати всіх")
    print("5. Вийти")
    
    choice = input("Виберіть: ")
    if choice == "1": add_student()
    elif choice == "2": add_grade()
    elif choice == "3": show_student()
    elif choice == "4": show_all()
    elif choice == "5": break`,
      explanation: "Рішення використовує словники для зберігання структурованих даних про студентів."
    },
    hints: [
      "Використовуйте словник, де ключ — ID студента, значення — словник з даними",
      "Зберігайте оцінки як список всередині словника студента",
      "Використовуйте sum() та len() для обчислення середнього"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати значення зі словника без помилки, якщо ключа немає?",
        options: ["dict[key]", "dict.get(key)", "dict[key, default]", "dict.find(key)"],
        correctAnswer: 1,
        explanation: "get(key, default) повертає значення або default, якщо ключа немає, не викликаючи помилку."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: {'a': 1, 'b': 2}.keys()?",
        options: ["['a', 'b']", "dict_keys(['a', 'b'])", "[1, 2]", "Помилку"],
        correctAnswer: 1,
        explanation: "keys() повертає dict_keys об'єкт, який можна конвертувати в список через list()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип даних може бути ключем словника?",
        options: ["Тільки str", "str, int, tuple", "Будь-який", "Тільки незмінні типи"],
        correctAnswer: 3,
        explanation: "Ключі мають бути незмінними (immutable): str, int, float, tuple, bool. Не можна використовувати списки."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: {x: x*2 for x in range(3)}?",
        options: ["{0: 0, 1: 2, 2: 4}", "{0, 2, 4}", "[0, 2, 4]", "Помилку"],
        correctAnswer: 0,
        explanation: "Словникове включення створює словник: {0: 0*2, 1: 1*2, 2: 2*2} = {0: 0, 1: 2, 2: 4}."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}


