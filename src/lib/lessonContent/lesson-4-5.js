/**
 * Lesson 4-5: Модуль 4: Практичний проект - Система управління даними
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson4_5 = {
  lessonId: "lesson-4-5",
  moduleId: "module-4",
  order: 5,
  title: "Модуль 4: Практичний проект - Система управління даними",
  
  learningObjectives: [
    "Застосувати всі навички з модуля",
    "Створити систему управління даними",
    "Працювати з файлами, JSON та CSV",
    "Реалізувати CRUD операції"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-4-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `**Мета проекту:** Створити систему управління даними студентів з повним функціоналом.

**Функціонал:**
1. **Створення (Create)** — додавання нових студентів
2. **Читання (Read)** — перегляд списку студентів
3. **Оновлення (Update)** — зміна даних студентів
4. **Видалення (Delete)** — видалення студентів

**Формати даних:**
- JSON для основного зберігання
- CSV для експорту/імпорту
- Текстовий вивід для користувача`
      },
      {
        title: "Архітектура програми",
        content: `**Структура:**
\`\`\`python
# Функції для роботи з JSON
def load_data()
def save_data()

# CRUD операції
def create_student()
def read_students()
def update_student()
def delete_student()

# Додаткові функції
def export_to_csv()
def import_from_csv()
def search_students()
def calculate_statistics()
\`\`\`

**Обробка помилок:**
- Файл не знайдено
- Неправильний формат даних
- Валідація введених даних`
      },
      {
        title: "Меню програми",
        content: `**Інтерактивне меню:**
\`\`\`python
def show_menu():
    print("1. Додати студента")
    print("2. Переглянути всіх студентів")
    print("3. Знайти студента")
    print("4. Оновити дані студента")
    print("5. Видалити студента")
    print("6. Експортувати в CSV")
    print("7. Імпортувати з CSV")
    print("8. Статистика")
    print("0. Вихід")
\`\`\`

**Головний цикл:**
\`\`\`python
while True:
    show_menu()
    choice = input("Виберіть опцію: ")
    
    if choice == "1":
        create_student()
    elif choice == "2":
        read_students()
    # ... інші опції
    elif choice == "0":
        break
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базова структура",
      code: `import json
import csv
import os

DATA_FILE = "students.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

# Використання
students = load_data()
print(f"Завантажено {len(students)} студентів")`,
      explanation: "Базова структура для роботи з даними."
    },
    {
      title: "Приклад 2: CRUD операції",
      code: `def create_student(name, age, course):
    students = load_data()
    student = {
        "id": len(students) + 1,
        "name": name,
        "age": age,
        "course": course
    }
    students.append(student)
    save_data(students)
    return student

def find_student_by_id(students, student_id):
    for student in students:
        if student["id"] == student_id:
            return student
    return None

def update_student(student_id, **updates):
    students = load_data()
    student = find_student_by_id(students, student_id)
    if student:
        student.update(updates)
        save_data(students)
        return True
    return False

def delete_student(student_id):
    students = load_data()
    students = [s for s in students if s["id"] != student_id]
    save_data(students)`,
      explanation: "Демонструє CRUD операції."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не зберігати дані після змін",
      explanation: "Зміни в пам'яті не зберігаються автоматично у файл.",
      correctApproach: "Завжди викликайте save_data() після змін."
    },
    {
      mistake: "Не обробляти помилки введення",
      explanation: "Користувач може ввести неправильні дані.",
      correctApproach: "Валідуйте введені дані та обробляйте помилки."
    },
    {
      mistake: "Не перевіряти існування файлу",
      explanation: "При першому запуску файлу може не бути.",
      correctApproach: "Використовуйте os.path.exists() для перевірки."
    }
  ],
  
  summary: `На цьому уроці ми створили повноцінну систему управління даними:

1. **CRUD операції** — Create, Read, Update, Delete
2. **Робота з JSON** — зберігання даних
3. **Робота з CSV** — експорт/імпорт
4. **Обробка помилок** — валідація та обробка винятків
5. **Інтерактивне меню** — зручний інтерфейс

Це реальний проект, який можна використовувати!`,
  
  practiceTask: {
    title: "Система управління студентами",
    description: "Створіть повноцінну систему управління даними студентів",
    problemStatement: `Створіть програму з наступним функціоналом:

**Обов'язкові функції:**
1. Додавання студента (ім'я, вік, курс, email)
2. Перегляд всіх студентів
3. Пошук студента за ім'ям або ID
4. Оновлення даних студента
5. Видалення студента
6. Експорт даних в CSV
7. Імпорт даних з CSV
8. Статистика (кількість, середній вік, розподіл по курсах)

**Вимоги:**
- Зберігання в JSON
- Валідація введених даних
- Обробка помилок
- Інтерактивне меню`,
    inputFormat: "Користувач взаємодіє через меню та введення даних",
    outputFormat: `Приклад роботи:
=== Система управління студентами ===
1. Додати студента
2. Переглянути всіх студентів
...
Виберіть опцію: 1
Введіть ім'я: Олександр
...`,
    examples: [
      {
        input: "Додавання та перегляд студентів",
        output: "Студенти зберігаються та відображаються коректно",
        explanation: "Система працює з повним функціоналом CRUD"
      }
    ],
    solution: {
      code: `import json
import csv
import os

DATA_FILE = "students.json"

def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as file:
                return json.load(file)
        except json.JSONDecodeError:
            print("Помилка читання файлу!")
            return []
    return []

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

def get_next_id(students):
    if not students:
        return 1
    return max(s["id"] for s in students) + 1

def create_student():
    students = load_data()
    name = input("Ім'я: ")
    age = int(input("Вік: "))
    course = input("Курс: ")
    email = input("Email: ")
    
    student = {
        "id": get_next_id(students),
        "name": name,
        "age": age,
        "course": course,
        "email": email
    }
    students.append(student)
    save_data(students)
    print(f"Студент {name} додано!")

def read_students():
    students = load_data()
    if not students:
        print("Студентів немає.")
        return
    
    print("\\n=== Список студентів ===")
    for student in students:
        print(f"ID: {student['id']}, {student['name']}, {student['age']} років, {student['course']}")

def find_student():
    students = load_data()
    search = input("Введіть ім'я або ID: ")
    
    try:
        student_id = int(search)
        student = next((s for s in students if s["id"] == student_id), None)
    except ValueError:
        student = next((s for s in students if s["name"] == search), None)
    
    if student:
        print(f"Знайдено: {student['name']}, {student['age']} років, {student['course']}")
    else:
        print("Студент не знайдено!")

def update_student():
    students = load_data()
    student_id = int(input("Введіть ID студента: "))
    student = next((s for s in students if s["id"] == student_id), None)
    
    if not student:
        print("Студент не знайдено!")
        return
    
    print(f"Поточні дані: {student}")
    name = input("Нове ім'я (Enter для пропуску): ")
    if name:
        student["name"] = name
    
    age = input("Новий вік (Enter для пропуску): ")
    if age:
        student["age"] = int(age)
    
    save_data(students)
    print("Дані оновлено!")

def delete_student():
    students = load_data()
    student_id = int(input("Введіть ID студента: "))
    students = [s for s in students if s["id"] != student_id]
    save_data(students)
    print("Студент видалено!")

def export_to_csv():
    students = load_data()
    if not students:
        print("Немає даних для експорту!")
        return
    
    with open("students_export.csv", "w", encoding="utf-8", newline='') as file:
        fieldnames = ["id", "name", "age", "course", "email"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(students)
    print("Дані експортовано в students_export.csv!")

def import_from_csv():
    filename = input("Введіть ім'я CSV файлу: ")
    if not os.path.exists(filename):
        print("Файл не знайдено!")
        return
    
    students = load_data()
    with open(filename, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            row["id"] = get_next_id(students)
            row["age"] = int(row["age"])
            students.append(row)
    
    save_data(students)
    print("Дані імпортовано!")

def show_statistics():
    students = load_data()
    if not students:
        print("Немає даних!")
        return
    
    print(f"\\n=== Статистика ===")
    print(f"Всього студентів: {len(students)}")
    
    avg_age = sum(s["age"] for s in students) / len(students)
    print(f"Середній вік: {avg_age:.1f}")
    
    courses = {}
    for student in students:
        course = student["course"]
        courses[course] = courses.get(course, 0) + 1
    
    print("\\nРозподіл по курсах:")
    for course, count in courses.items():
        print(f"  {course}: {count}")

def show_menu():
    print("\\n=== Система управління студентами ===")
    print("1. Додати студента")
    print("2. Переглянути всіх студентів")
    print("3. Знайти студента")
    print("4. Оновити дані студента")
    print("5. Видалити студента")
    print("6. Експортувати в CSV")
    print("7. Імпортувати з CSV")
    print("8. Статистика")
    print("0. Вихід")

def main():
    while True:
        show_menu()
        choice = input("\\nВиберіть опцію: ")
        
        try:
            if choice == "1":
                create_student()
            elif choice == "2":
                read_students()
            elif choice == "3":
                find_student()
            elif choice == "4":
                update_student()
            elif choice == "5":
                delete_student()
            elif choice == "6":
                export_to_csv()
            elif choice == "7":
                import_from_csv()
            elif choice == "8":
                show_statistics()
            elif choice == "0":
                print("До побачення!")
                break
            else:
                print("Невірний вибір!")
        except Exception as e:
            print(f"Помилка: {e}")

if __name__ == "__main__":
    main()`,
      explanation: "Повна реалізація системи управління студентами з усіма функціями."
    },
    hints: [
      "Розбийте на функції: load_data, save_data, CRUD операції",
      "Використовуйте try/except для обробки помилок",
      "Створіть інтерактивне меню з циклом while"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає CRUD?",
        options: ["Create, Read, Update, Delete", "Code, Run, Update, Debug", "Copy, Read, Use, Delete", "Create, Remove, Update, Display"],
        correctAnswer: 0,
        explanation: "CRUD = Create (створення), Read (читання), Update (оновлення), Delete (видалення)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли потрібно викликати save_data()?",
        options: ["Тільки при запуску", "Після кожної зміни даних", "Раз на день", "Ніколи"],
        correctAnswer: 1,
        explanation: "save_data() потрібно викликати після кожної зміни, щоб зберегти дані у файл."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат краще для основного зберігання даних?",
        options: ["CSV", "JSON", "TXT", "Всі однакові"],
        correctAnswer: 1,
        explanation: "JSON краще для структурованих даних, підтримує вкладені структури та типи даних."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

