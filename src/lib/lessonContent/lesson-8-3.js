/**
 * Lesson 8-3: Віджети: Label, Button, Entry
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson8_3 = {
  lessonId: "lesson-8-3",
  moduleId: "module-8",
  order: 3,
  title: "Віджети: Label, Button, Entry",
  
  learningObjectives: [
    "Використовувати Label для відображення тексту",
    "Створювати кнопки з Button",
    "Отримувати введення через Entry",
    "Налаштовувати віджети (кольори, шрифти, розміри)"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-8-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Label — відображення тексту",
        content: `**Label** — віджет для відображення тексту або зображень.

**Базове використання:**

\`\`\`python
import tkinter as tk

root = tk.Tk()
label = tk.Label(root, text="Привіт, світ!")
label.pack()

root.mainloop()
\`\`\`

**Налаштування Label:**

\`\`\`python
label = tk.Label(
    root,
    text="Привіт!",
    font=("Arial", 16),           # Шрифт та розмір
    fg="blue",                    # Колір тексту (foreground)
    bg="yellow",                  # Колір фону (background)
    width=20,                     # Ширина в символах
    height=3,                     # Висота в рядках
    anchor="w"                    # Вирівнювання (n, s, e, w, center)
)
\`\`\`

**Кольори:**
- Назви: "red", "blue", "green"
- HEX: "#FF0000", "#00FF00"
- RGB: (255, 0, 0)

**Шрифти:**
\`\`\`python
font=("Arial", 16)              # Назва, розмір
font=("Arial", 16, "bold")      # З жирним
font=("Arial", 16, "italic")    # З курсивом
\`\`\``
      },
      {
        title: "Button — кнопки",
        content: `**Button** — кнопка, яка виконує дію при натисканні.

**Базове використання:**

\`\`\`python
def button_clicked():
    print("Кнопку натиснуто!")

button = tk.Button(root, text="Натисни мене", command=button_clicked)
button.pack()
\`\`\`

**Налаштування Button:**

\`\`\`python
button = tk.Button(
    root,
    text="Натисни",
    command=button_clicked,      # Функція при натисканні
    font=("Arial", 14),
    fg="white",
    bg="blue",
    width=15,
    height=2,
    relief="raised",             # Стиль (flat, raised, sunken)
    cursor="hand2"               # Курсор при наведенні
)
\`\`\`

**Приклад з оновленням Label:**

\`\`\`python
def update_label():
    label.config(text="Текст змінено!")

root = tk.Tk()
label = tk.Label(root, text="Початковий текст")
label.pack()

button = tk.Button(root, text="Змінити текст", command=update_label)
button.pack()

root.mainloop()
\`\`\``
      },
      {
        title: "Entry — поле введення",
        content: `**Entry** — однострокове поле для введення тексту.

**Базове використання:**

\`\`\`python
entry = tk.Entry(root)
entry.pack()
\`\`\`

**Отримання значення:**

\`\`\`python
text = entry.get()  # Отримує введений текст
\`\`\`

**Встановлення значення:**

\`\`\`python
entry.insert(0, "Початковий текст")  # Вставляє текст на позицію 0
entry.delete(0, tk.END)              # Видаляє весь текст
\`\`\`

**Налаштування Entry:**

\`\`\`python
entry = tk.Entry(
    root,
    width=30,                      # Ширина в символах
    font=("Arial", 12),
    fg="black",
    bg="white",
    show="*"                       # Приховує введення (для паролів)
)
\`\`\`

**Повний приклад:**

\`\`\`python
def get_text():
    text = entry.get()
    label.config(text=f"Ви ввели: {text}")

root = tk.Tk()

entry = tk.Entry(root, width=30)
entry.pack(pady=10)

button = tk.Button(root, text="Отримати текст", command=get_text)
button.pack()

label = tk.Label(root, text="")
label.pack()

root.mainloop()
\`\`\``
      },
      {
        title: "Комбінований приклад",
        content: `**Простий калькулятор з GUI:**

\`\`\`python
import tkinter as tk

def calculate():
    try:
        num1 = float(entry1.get())
        num2 = float(entry2.get())
        result = num1 + num2
        result_label.config(text=f"Результат: {result}")
    except ValueError:
        result_label.config(text="Помилка! Введіть числа")

root = tk.Tk()
root.title("Калькулятор")
root.geometry("300x200")

# Перше число
label1 = tk.Label(root, text="Перше число:")
label1.pack()
entry1 = tk.Entry(root)
entry1.pack()

# Друге число
label2 = tk.Label(root, text="Друге число:")
label2.pack()
entry2 = tk.Entry(root)
entry2.pack()

# Кнопка
button = tk.Button(root, text="Обчислити", command=calculate)
button.pack(pady=10)

# Результат
result_label = tk.Label(root, text="Результат: ")
result_label.pack()

root.mainloop()
\`\`\`

**Приклад форми:**

\`\`\`python
def submit():
    name = name_entry.get()
    age = age_entry.get()
    info_label.config(text=f"Ім'я: {name}, Вік: {age}")

root = tk.Tk()
root.title("Форма")
root.geometry("300x200")

# Ім'я
tk.Label(root, text="Ім'я:").pack()
name_entry = tk.Entry(root)
name_entry.pack()

# Вік
tk.Label(root, text="Вік:").pack()
age_entry = tk.Entry(root)
age_entry.pack()

# Кнопка
tk.Button(root, text="Відправити", command=submit).pack(pady=10)

# Результат
info_label = tk.Label(root, text="")
info_label.pack()

root.mainloop()
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Label з налаштуваннями",
      code: `import tkinter as tk

root = tk.Tk()
root.geometry("300x200")

# Різні Label
label1 = tk.Label(root, text="Простий текст")
label1.pack()

label2 = tk.Label(root, text="Великий текст", font=("Arial", 20))
label2.pack()

label3 = tk.Label(root, text="Кольоровий текст", fg="red", bg="yellow")
label3.pack()

root.mainloop()`,
      explanation: "Демонструє різні способи налаштування Label: шрифт, кольори, розміри."
    },
    {
      title: "Приклад 2: Button з обробкою подій",
      code: `import tkinter as tk

counter = 0

def increment():
    global counter
    counter += 1
    label.config(text=f"Лічильник: {counter}")

root = tk.Tk()
root.geometry("200x150")

label = tk.Label(root, text="Лічильник: 0")
label.pack(pady=20)

button = tk.Button(root, text="+1", command=increment)
button.pack()

root.mainloop()`,
      explanation: "Створює лічильник з кнопкою, яка збільшує значення та оновлює Label."
    },
    {
      title: "Приклад 3: Entry з отриманням тексту",
      code: `import tkinter as tk

def show_text():
    text = entry.get()
    result_label.config(text=f"Ви ввели: {text}")

root = tk.Tk()
root.geometry("300x150")

entry = tk.Entry(root, width=30)
entry.pack(pady=10)

button = tk.Button(root, text="Показати текст", command=show_text)
button.pack()

result_label = tk.Label(root, text="")
result_label.pack()

root.mainloop()`,
      explanation: "Демонструє отримання тексту з Entry та відображення його в Label."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати pack(), grid() або place()",
      explanation: "Віджет не з'явиться у вікні, якщо не викликати метод розміщення.",
      correctApproach: "Завжди викликайте pack(), grid() або place() після створення віджета."
    },
    {
      mistake: "Неправильне використання command у Button",
      explanation: "command=button_clicked() викличе функцію одразу, а не при натисканні.",
      correctApproach: "Використовуйте command=button_clicked (без дужок) для передачі функції."
    },
    {
      mistake: "Спроба отримати текст з Entry до введення",
      explanation: "entry.get() поверне порожній рядок, якщо користувач ще нічого не ввів.",
      correctApproach: "Перевіряйте, чи текст не порожній, або використовуйте значення за замовчуванням."
    },
    {
      mistake: "Використання неправильних назв кольорів",
      explanation: "Неправильні назви кольорів (наприклад, 'bleu' замість 'blue') викличуть помилку.",
      correctApproach: "Використовуйте правильні назви кольорів або HEX коди."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Label** — відображення тексту з налаштуваннями (шрифт, кольори)
2. **Button** — кнопки з обробкою подій через command
3. **Entry** — поля введення з отриманням тексту через get()
4. **Налаштування віджетів** — font, fg, bg, width, height
5. **Комбінування віджетів** — створення інтерактивних форм

Тепер ви можете створювати інтерактивні GUI додатки!`,
  
  practiceTask: {
    title: "Форма реєстрації",
    description: "Створіть форму з полями введення та кнопкою",
    problemStatement: `Створіть програму, яка:
1. Має поля для введення: ім'я, email, вік
2. Має кнопку "Зареєструватися"
3. При натисканні кнопки показує введені дані
4. Має красиве оформлення (шрифти, кольори)`,
    inputFormat: "Користувач вводить дані в поля Entry",
    outputFormat: `Після натискання кнопки відображається:
"Реєстрація успішна!
Ім'я: [введене ім'я]
Email: [введений email]
Вік: [введений вік]"`,
    examples: [
      {
        input: "Ім'я: Олександр, Email: alex@example.com, Вік: 15",
        output: "Реєстрація успішна!\nІм'я: Олександр\nEmail: alex@example.com\nВік: 15",
        explanation: "Форма збирає дані та відображає їх після натискання кнопки"
      }
    ],
    solution: {
      code: `import tkinter as tk

def register():
    name = name_entry.get()
    email = email_entry.get()
    age = age_entry.get()
    
    if name and email and age:
        result_text = f"Реєстрація успішна!\\n\\nІм'я: {name}\\nEmail: {email}\\nВік: {age}"
        result_label.config(text=result_text, fg="green")
    else:
        result_label.config(text="Заповніть всі поля!", fg="red")

root = tk.Tk()
root.title("Форма реєстрації")
root.geometry("400x300")

# Заголовок
title_label = tk.Label(root, text="Реєстрація", font=("Arial", 18, "bold"))
title_label.pack(pady=10)

# Ім'я
tk.Label(root, text="Ім'я:", font=("Arial", 12)).pack()
name_entry = tk.Entry(root, width=30, font=("Arial", 11))
name_entry.pack(pady=5)

# Email
tk.Label(root, text="Email:", font=("Arial", 12)).pack()
email_entry = tk.Entry(root, width=30, font=("Arial", 11))
email_entry.pack(pady=5)

# Вік
tk.Label(root, text="Вік:", font=("Arial", 12)).pack()
age_entry = tk.Entry(root, width=30, font=("Arial", 11))
age_entry.pack(pady=5)

# Кнопка
register_button = tk.Button(root, text="Зареєструватися", command=register, 
                           font=("Arial", 12), bg="blue", fg="white", width=20)
register_button.pack(pady=15)

# Результат
result_label = tk.Label(root, text="", font=("Arial", 11), justify="left")
result_label.pack()

root.mainloop()`,
      explanation: "Створює форму реєстрації з трьома полями введення, кнопкою та відображенням результату."
    },
    hints: [
      "Використовуйте Entry для полів введення",
      "Створіть функцію register() для обробки натискання",
      "Отримуйте значення через .get()",
      "Оновлюйте Label через .config(text=...)",
      "Використовуйте font та кольори для оформлення"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який віджет використовується для відображення тексту?",
        options: ["Button", "Entry", "Label", "Text"],
        correctAnswer: 2,
        explanation: "Label використовується для відображення тексту, який користувач не може редагувати."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nbutton = tk.Button(root, text='Натисни', command=my_function())\n```",
        options: ["Нічого", "Потрібно pack()", "command має бути без дужок", "Неправильна назва"],
        correctAnswer: 2,
        explanation: "command=my_function() викличе функцію одразу. Потрібно command=my_function (без дужок) для передачі функції."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати текст з Entry?",
        options: ["entry.text", "entry.get()", "entry.value", "entry.read()"],
        correctAnswer: 1,
        explanation: "entry.get() повертає текст, введений у поле Entry."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що означає fg='red' у Label?",
        options: ["Фон червоний", "Текст червоний", "Рамка червона", "Помилку"],
        correctAnswer: 1,
        explanation: "fg (foreground) встановлює колір тексту. bg (background) встановлює колір фону."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

