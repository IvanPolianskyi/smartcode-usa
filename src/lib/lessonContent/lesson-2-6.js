/**
 * Lesson 2-6: Практичний проект - Система управління завданнями
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_6 = {
  lessonId: "lesson-2-6",
  moduleId: "module-2",
  order: 6,
  title: "Модуль 2: Практичний проект - Система управління завданнями",
  
  learningObjectives: [
    "Створити систему для управління завданнями",
    "Використати словники для зберігання даних",
    "Реалізувати CRUD операції (Create, Read, Update, Delete)",
    "Додати пошук та фільтрацію"
  ],
  
  estimatedTime: 150,
  prerequisites: ["lesson-2-5"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `Ми створимо повноцінну систему управління завданнями (To-Do List), яка:
- Дозволяє додавати завдання з описом та пріоритетом
- Зберігає завдання у словнику
- Дозволяє відмічати завдання як виконані
- Показує статистику
- Дозволяє фільтрувати завдання

Це проект, який об'єднує всі знання з модуля 2!`
      },
      {
        title: "Структура даних",
        content: `Кожне завдання буде словником:
\`\`\`python
task = {
    "id": 1,
    "title": "Купити молоко",
    "description": "Купити 2 літри молока",
    "priority": "високий",
    "completed": False,
    "created_at": "2025-01-27"
}
\`\`\`

Всі завдання зберігаються у словнику, де ключ — ID завдання:
\`\`\`python
tasks = {
    1: task1,
    2: task2,
    ...
}
\`\`\``
      },
      {
        title: "Функціональність",
        content: `**CRUD операції:**
- **Create** — додавання нового завдання
- **Read** — перегляд завдань (всі, по ID, фільтровані)
- **Update** — оновлення завдання (відмітка як виконане)
- **Delete** — видалення завдання

**Додаткові функції:**
- Пошук завдань за текстом
- Фільтрація за пріоритетом
- Фільтрація за статусом (виконані/невиконані)
- Статистика (всього, виконаних, залишилося)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Структура завдання",
      code: `# Створення завдання
def create_task(title, description, priority="середній"):
    return {
        "title": title,
        "description": description,
        "priority": priority,
        "completed": False
    }

task = create_task("Купити молоко", "2 літри", "високий")
print(task)`,
      explanation: "Демонструє створення структури завдання."
    },
    {
      title: "Приклад 2: CRUD операції",
      code: `tasks = {}
task_id = 1

# Create
tasks[task_id] = {"title": "Завдання 1", "completed": False}
task_id += 1

# Read
print(tasks[1])

# Update
tasks[1]["completed"] = True

# Delete
del tasks[1]`,
      explanation: "Показує базові CRUD операції зі словником."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не перевіряти існування ключа перед видаленням",
      explanation: "del tasks[id] викличе KeyError, якщо ключа немає.",
      correctApproach: "Використовуйте if id in tasks: del tasks[id] або tasks.pop(id, None)."
    },
    {
      mistake: "Не оновлювати ID після видалення",
      explanation: "Якщо видалити завдання, ID можуть стати не послідовними.",
      correctApproach: "Використовуйте унікальні ID (наприклад, збільшуйте лічильник) або UUID."
    }
  ],
  
  summary: `На цьому проекті ми:

1. **Створили повноцінну систему** управління завданнями
2. **Використали словники** для зберігання структурованих даних
3. **Реалізували CRUD** операції
4. **Додали пошук та фільтрацію**

Це перший серйозний проект, який демонструє практичне застосування всіх знань!`,
  
  practiceTask: {
    title: "Система управління завданнями",
    description: "Створіть повноцінну систему для управління завданнями",
    problemStatement: `Створіть програму, яка:
1. Дозволяє додавати завдання (назва, опис, пріоритет: низький/середній/високий)
2. Показує всі завдання з ID, статусом та пріоритетом
3. Дозволяє відмічати завдання як виконані
4. Дозволяє видаляти завдання
5. Дозволяє фільтрувати завдання (всі/виконані/невиконані/за пріоритетом)
6. Показує статистику (всього, виконаних, залишилося)
7. Дозволяє шукати завдання за текстом`,
    inputFormat: "Користувач вводить команди через меню",
    outputFormat: `Приклад виведення:
=== Завдання ===
1. [ ] Купити молоко (високий)
   Опис: 2 літри
2. [✓] Зробити домашнє завдання (середній)
   Опис: Математика, сторінка 45

Статистика: Всього: 2, Виконано: 1, Залишилося: 1`,
    examples: [
      {
        input: "Додати: 'Купити молоко', пріоритет: 'високий'",
        output: "Завдання додано! ID: 1",
        explanation: "Система створює нове завдання з унікальним ID"
      }
    ],
    solution: {
      code: `# Система управління завданнями
tasks = {}
next_id = 1

def add_task():
    global next_id
    title = input("Назва завдання: ")
    description = input("Опис: ")
    priority = input("Пріоритет (низький/середній/високий): ").lower()
    
    if priority not in ["низький", "середній", "високий"]:
        priority = "середній"
    
    tasks[next_id] = {
        "title": title,
        "description": description,
        "priority": priority,
        "completed": False
    }
    print(f"Завдання додано! ID: {next_id}")
    next_id += 1

def show_tasks(filter_type="всі"):
    if not tasks:
        print("Немає завдань!")
        return
    
    print("\n=== Завдання ===")
    displayed = 0
    
    for task_id, task in tasks.items():
        if filter_type == "виконані" and not task["completed"]:
            continue
        if filter_type == "невиконані" and task["completed"]:
            continue
        
        status = "✓" if task["completed"] else " "
        print(f"{task_id}. [{status}] {task['title']} ({task['priority']})")
        print(f"   Опис: {task['description']}")
        displayed += 1
    
    if displayed == 0:
        print("Немає завдань за цим фільтром!")
    else:
        show_statistics()

def show_statistics():
    total = len(tasks)
    completed = sum(1 for t in tasks.values() if t["completed"])
    remaining = total - completed
    print(f"\nСтатистика: Всього: {total}, Виконано: {completed}, Залишилося: {remaining}")

def complete_task():
    show_tasks("невиконані")
    try:
        task_id = int(input("ID завдання для відмітки: "))
        if task_id in tasks:
            tasks[task_id]["completed"] = True
            print("Завдання відмічено як виконане!")
        else:
            print("Завдання не знайдено!")
    except ValueError:
        print("Введіть правильний ID!")

def delete_task():
    show_tasks()
    try:
        task_id = int(input("ID завдання для видалення: "))
        if task_id in tasks:
            del tasks[task_id]
            print("Завдання видалено!")
        else:
            print("Завдання не знайдено!")
    except ValueError:
        print("Введіть правильний ID!")

def search_tasks():
    query = input("Пошук (введіть текст): ").lower()
    found = False
    
    for task_id, task in tasks.items():
        if query in task["title"].lower() or query in task["description"].lower():
            status = "✓" if task["completed"] else " "
            print(f"{task_id}. [{status}] {task['title']} ({task['priority']})")
            found = True
    
    if not found:
        print("Нічого не знайдено!")

def filter_by_priority():
    priority = input("Пріоритет (низький/середній/високий): ").lower()
    found = False
    
    for task_id, task in tasks.items():
        if task["priority"] == priority:
            status = "✓" if task["completed"] else " "
            print(f"{task_id}. [{status}] {task['title']}")
            found = True
    
    if not found:
        print(f"Немає завдань з пріоритетом '{priority}'!")

# Головне меню
while True:
    print("\n=== Система управління завданнями ===")
    print("1. Додати завдання")
    print("2. Показати всі завдання")
    print("3. Показати виконані")
    print("4. Показати невиконані")
    print("5. Відмітити як виконане")
    print("6. Видалити завдання")
    print("7. Пошук завдань")
    print("8. Фільтр за пріоритетом")
    print("9. Вийти")
    
    choice = input("\nВиберіть дію: ")
    
    if choice == "1": add_task()
    elif choice == "2": show_tasks("всі")
    elif choice == "3": show_tasks("виконані")
    elif choice == "4": show_tasks("невиконані")
    elif choice == "5": complete_task()
    elif choice == "6": delete_task()
    elif choice == "7": search_tasks()
    elif choice == "8": filter_by_priority()
    elif choice == "9":
        print("До побачення!")
        break
    else:
        print("Невірний вибір!")`,
      explanation: "Повноцінна система управління завданнями з CRUD операціями, пошуком та фільтрацією."
    },
    hints: [
      "Використовуйте словник для зберігання завдань, де ключ — ID",
      "Створюйте функції для кожної операції (add, show, complete, delete)",
      "Використовуйте глобальну змінну для зберігання наступного ID",
      "Додайте перевірки на існування завдання перед операціями"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає CRUD?",
        options: ["Create, Read, Update, Delete", "Copy, Remove, Update, Delete", "Create, Remove, Update, Delete", "Copy, Read, Update, Delete"],
        correctAnswer: 0,
        explanation: "CRUD — Create (створення), Read (читання), Update (оновлення), Delete (видалення)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка структура даних найкраща для зберігання завдань з ID?",
        options: ["Список", "Словник", "Множина", "Кортеж"],
        correctAnswer: 1,
        explanation: "Словник ідеальний для зберігання структурованих даних з унікальними ключами (ID)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}


