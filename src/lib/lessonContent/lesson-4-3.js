/**
 * Lesson 4-3: JSON та структуровані дані
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson4_3 = {
  lessonId: "lesson-4-3",
  moduleId: "module-4",
  order: 3,
  title: "JSON та структуровані дані",
  
  learningObjectives: [
    "Розуміти формат JSON",
    "Читати та записувати JSON файли",
    "Конвертувати між Python об'єктами та JSON",
    "Обробляти складні структури даних"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-4-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке JSON?",
        content: `JSON (JavaScript Object Notation) — формат для зберігання та обміну даними.

**Переваги JSON:**
- Легко читається людьми
- Легко обробляється комп'ютерами
- Використовується скрізь (API, конфіги, бази даних)
- Підтримується багатьма мовами

**Структура JSON:**
\`\`\`json
{
  "name": "Олександр",
  "age": 15,
  "city": "Київ",
  "hobbies": ["програмування", "читання"],
  "student": true
}
\`\`\`

**Типи даних в JSON:**
- Числа (int, float)
- Рядки (str)
- Булеві (true/false)
- null
- Масиви (списки)
- Об'єкти (словники)`
      },
      {
        title: "Робота з JSON в Python",
        content: `**Імпорт модуля:**
\`\`\`python
import json
\`\`\`

**Конвертація Python → JSON (dumps):**
\`\`\`python
import json

data = {
    "name": "Олександр",
    "age": 15,
    "city": "Київ"
}

json_string = json.dumps(data)
print(json_string)
# {"name": "Олександр", "age": 15, "city": "Київ"}
\`\`\`

**Конвертація JSON → Python (loads):**
\`\`\`python
json_string = '{"name": "Олександр", "age": 15}'
data = json.loads(json_string)
print(data["name"])  # Олександр
\`\`\`

**Форматування (indent):**
\`\`\`python
data = {"name": "Олександр", "age": 15}
pretty_json = json.dumps(data, indent=2, ensure_ascii=False)
print(pretty_json)
# {
#   "name": "Олександр",
#   "age": 15
# }
\`\`\``
      },
      {
        title: "Робота з JSON файлами",
        content: `**Запис у JSON файл (dump):**
\`\`\`python
import json

data = {
    "students": [
        {"name": "Олександр", "age": 15},
        {"name": "Марія", "age": 16}
    ]
}

with open("students.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2, ensure_ascii=False)
\`\`\`

**Читання з JSON файлу (load):**
\`\`\`python
import json

with open("students.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    print(data["students"][0]["name"])  # Олександр
\`\`\`

**Обробка помилок:**
\`\`\`python
import json

try:
    with open("data.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    print("Файл не знайдено!")
except json.JSONDecodeError:
    print("Помилка формату JSON!")
\`\`\``
      },
      {
        title: "Складні структури даних",
        content: `**Вкладені структури:**
\`\`\`python
import json

school = {
    "name": "SmartCode Academy",
    "students": [
        {
            "id": 1,
            "name": "Олександр",
            "courses": ["Python", "Web Development"],
            "grades": {
                "Python": 95,
                "Web Development": 88
            }
        },
        {
            "id": 2,
            "name": "Марія",
            "courses": ["Python"],
            "grades": {
                "Python": 92
            }
        }
    ]
}

# Запис
with open("school.json", "w", encoding="utf-8") as file:
    json.dump(school, file, indent=2, ensure_ascii=False)

# Читання та доступ
with open("school.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    first_student = data["students"][0]
    print(f"{first_student['name']}: {first_student['grades']['Python']}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базова робота з JSON",
      code: `import json

# Створення даних
student = {
    "name": "Олександр",
    "age": 15,
    "city": "Київ",
    "active": True
}

# Конвертація в JSON рядок
json_string = json.dumps(student, ensure_ascii=False)
print("JSON рядок:", json_string)

# Конвертація назад в Python
data = json.loads(json_string)
print("Ім'я:", data["name"])`,
      explanation: "Демонструє базову конвертацію між Python та JSON."
    },
    {
      title: "Приклад 2: Робота з JSON файлами",
      code: `import json

# Запис у файл
students = [
    {"name": "Олександр", "age": 15},
    {"name": "Марія", "age": 16},
    {"name": "Дмитро", "age": 15}
]

with open("students.json", "w", encoding="utf-8") as file:
    json.dump(students, file, indent=2, ensure_ascii=False)

# Читання з файлу
with open("students.json", "r", encoding="utf-8") as file:
    loaded_students = json.load(file)
    for student in loaded_students:
        print(f"{student['name']}, {student['age']} років")`,
      explanation: "Показує запис та читання JSON файлів."
    },
    {
      title: "Приклад 3: Складні структури",
      code: `import json

# Складна структура
course = {
    "title": "Python Basics",
    "instructor": "Олександр",
    "students": [
        {
            "name": "Марія",
            "progress": 75,
            "completed_lessons": [1, 2, 3, 4, 5]
        },
        {
            "name": "Дмитро",
            "progress": 50,
            "completed_lessons": [1, 2, 3]
        }
    ]
}

# Запис
with open("course.json", "w", encoding="utf-8") as file:
    json.dump(course, file, indent=2, ensure_ascii=False)

# Читання та обробка
with open("course.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    print(f"Курс: {data['title']}")
    for student in data["students"]:
        print(f"{student['name']}: {student['progress']}%")`,
      explanation: "Демонструє роботу зі складними вкладеними структурами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути ensure_ascii=False для українського тексту",
      explanation: "Без ensure_ascii=False українські символи будуть у вигляді \\uXXXX.",
      correctApproach: "Завжди використовуйте ensure_ascii=False для json.dump/json.dumps з українським текстом."
    },
    {
      mistake: "Плутанина між dumps/loads та dump/load",
      explanation: "dumps/loads працюють з рядками, dump/load працюють з файлами.",
      correctApproach: "dumps/loads для рядків, dump/load для файлів."
    },
    {
      mistake: "Не обробляти JSONDecodeError",
      explanation: "Якщо JSON файл пошкоджений, виникне помилка.",
      correctApproach: "Обробляйте json.JSONDecodeError при читанні JSON."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **JSON** — формат для структурованих даних
2. **json.dumps/loads** — конвертація між Python та JSON рядками
3. **json.dump/load** — робота з JSON файлами
4. **Складні структури** — вкладені словники та списки
5. **ensure_ascii=False** — для коректного відображення українського тексту

JSON — стандартний спосіб зберігання та обміну даними!`,
  
  practiceTask: {
    title: "Система управління студентами",
    description: "Створіть програму для роботи з JSON даними студентів",
    problemStatement: `Напишіть програму, яка:
1. Створює JSON файл з даними студентів (ім'я, вік, курс, оцінки)
2. Додає нового студента до файлу
3. Знаходить студента за ім'ям
4. Оновлює оцінки студента
5. Виводить список всіх студентів з їх середніми оцінками`,
    inputFormat: "Програма працює з файлом students.json",
    outputFormat: `Приклад виведення:
Студенти:
1. Олександр (Python) - середня оцінка: 92.5
2. Марія (Python) - середня оцінка: 88.0`,
    examples: [
      {
        input: "Додавання студента",
        output: "Студент додано успішно",
        explanation: "Програма додає нового студента до JSON файлу"
      }
    ],
    solution: {
      code: `import json
import os

def load_students():
    if os.path.exists("students.json"):
        with open("students.json", "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def save_students(students):
    with open("students.json", "w", encoding="utf-8") as file:
        json.dump(students, file, indent=2, ensure_ascii=False)

def add_student(name, age, course, grades):
    students = load_students()
    student = {
        "name": name,
        "age": age,
        "course": course,
        "grades": grades
    }
    students.append(student)
    save_students(students)
    print(f"Студент {name} додано!")

def find_student(name):
    students = load_students()
    for student in students:
        if student["name"] == name:
            return student
    return None

def update_grades(name, new_grades):
    students = load_students()
    for student in students:
        if student["name"] == name:
            student["grades"].update(new_grades)
            save_students(students)
            print(f"Оцінки {name} оновлено!")
            return True
    print(f"Студент {name} не знайдено!")
    return False

def calculate_average(grades):
    if not grades:
        return 0
    return sum(grades.values()) / len(grades)

def list_students():
    students = load_students()
    print("Студенти:")
    for i, student in enumerate(students, 1):
        avg = calculate_average(student["grades"])
        print(f"{i}. {student['name']} ({student['course']}) - середня оцінка: {avg:.1f}")

# Використання
add_student("Олександр", 15, "Python", {"Python": 95, "Math": 90})
add_student("Марія", 16, "Python", {"Python": 88, "Math": 88})
list_students()`,
      explanation: "Рішення демонструє повну роботу з JSON: створення, читання, оновлення, пошук."
    },
    hints: [
      "Використовуйте json.load() та json.dump() для роботи з файлами",
      "Перевіряйте існування файлу перед читанням",
      "Оновлюйте дані в пам'яті, потім зберігайте у файл"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка функція конвертує Python об'єкт в JSON рядок?",
        options: ["json.load()", "json.dumps()", "json.read()", "json.parse()"],
        correctAnswer: 1,
        explanation: "json.dumps() конвертує Python об'єкт в JSON рядок (string)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: json.loads('{\"age\": 15}')['age']?",
        options: ["15", "'15'", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "json.loads() конвертує JSON рядок в Python словник, тому ['age'] поверне 15 (int)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого потрібен ensure_ascii=False?",
        options: ["Швидкість", "Коректне відображення українського тексту", "Безпека", "Стиснення"],
        correctAnswer: 1,
        explanation: "ensure_ascii=False дозволяє коректно зберігати та відображати не-ASCII символи (українські літери)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
