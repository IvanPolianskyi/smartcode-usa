/**
 * Lesson 8-4: Розміщення елементів: pack, grid, place
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson8_4 = {
  lessonId: "lesson-8-4",
  moduleId: "module-8",
  order: 4,
  title: "Розміщення елементів: pack, grid, place",
  
  learningObjectives: [
    "Використовувати pack() для автоматичного розміщення",
    "Застосовувати grid() для табличного розміщення",
    "Використовувати place() для точкового розміщення",
    "Вибирати правильний метод для різних ситуацій"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-8-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Метод pack()",
        content: `**pack()** — найпростіший метод розміщення. Автоматично розміщує віджети один за одним.

**Базове використання:**

\`\`\`python
label1 = tk.Label(root, text="Перший")
label1.pack()

label2 = tk.Label(root, text="Другий")
label2.pack()
\`\`\`

**Параметри pack():**

\`\`\`python
widget.pack(
    side="top",      # top, bottom, left, right
    fill="none",     # none, x, y, both
    expand=False,    # True/False
    padx=10,         # Відступ по горизонталі
    pady=10,         # Відступ по вертикалі
    anchor="center"  # Вирівнювання
)
\`\`\`

**Приклади:**

\`\`\`python
# Вертикальне розміщення (за замовчуванням)
label1.pack()
label2.pack()
label3.pack()

# Горизонтальне розміщення
label1.pack(side="left")
label2.pack(side="left")
label3.pack(side="left")

# З відступами
label.pack(padx=20, pady=10)

# Заповнення простору
button.pack(fill="x")  # Заповнює всю ширину
\`\`\`

**Переваги pack():**
- Простий у використанні
- Автоматичне розміщення
- Добре для простих макетів

**Недоліки:**
- Обмежений контроль
- Складніше для складних макетів`
      },
      {
        title: "Метод grid()",
        content: `**grid()** — табличне розміщення. Віджети розміщуються у сітці (рядки та стовпці).

**Базове використання:**

\`\`\`python
label = tk.Label(root, text="Текст")
label.grid(row=0, column=0)  # Рядок 0, стовпець 0

button = tk.Button(root, text="Кнопка")
button.grid(row=1, column=0)  # Рядок 1, стовпець 0
\`\`\`

**Параметри grid():**

\`\`\`python
widget.grid(
    row=0,          # Номер рядка (починається з 0)
    column=0,       # Номер стовпця (починається з 0)
    rowspan=1,      # Скільки рядків займає
    columnspan=1,  # Скільки стовпців займає
    padx=10,        # Відступ по горизонталі
    pady=10,        # Відступ по вертикалі
    sticky="nsew"   # Розтягування (n=north, s=south, e=east, w=west)
)
\`\`\`

**Приклад форми:**

\`\`\`python
# Рядок 0
tk.Label(root, text="Ім'я:").grid(row=0, column=0, sticky="w")
name_entry = tk.Entry(root)
name_entry.grid(row=0, column=1, padx=10)

# Рядок 1
tk.Label(root, text="Email:").grid(row=1, column=0, sticky="w")
email_entry = tk.Entry(root)
email_entry.grid(row=1, column=1, padx=10)

# Рядок 2
button = tk.Button(root, text="Відправити")
button.grid(row=2, column=0, columnspan=2, pady=10)
\`\`\`

**Переваги grid():**
- Точний контроль розміщення
- Ідеально для форм та таблиць
- Легко вирівнювати елементи

**Недоліки:**
- Трохи складніше за pack()
- Потрібно вказувати row та column`
      },
      {
        title: "Метод place()",
        content: `**place()** — точкове розміщення. Віджети розміщуються за абсолютними координатами.

**Базове використання:**

\`\`\`python
label = tk.Label(root, text="Текст")
label.place(x=100, y=50)  # 100 пікселів від лівого краю, 50 від верху
\`\`\`

**Параметри place():**

\`\`\`python
widget.place(
    x=100,          # Відстань від лівого краю
    y=50,           # Відстань від верху
    relx=0.5,       # Відносна позиція по X (0.0-1.0)
    rely=0.5,       # Відносна позиція по Y (0.0-1.0)
    anchor="nw"     # Точка прив'язки (n, s, e, w, center, nw, ne, sw, se)
)
\`\`\`

**Приклади:**

\`\`\`python
# Абсолютні координати
label.place(x=100, y=50)

# Відносні координати (центр)
label.place(relx=0.5, rely=0.5, anchor="center")

# Комбінація
label.place(x=100, y=50, anchor="nw")
\`\`\`

**Переваги place():**
- Повний контроль позиції
- Добре для точкового розміщення
- Корисно для графіки та ігор

**Недоліки:**
- Не адаптується до зміни розміру вікна
- Складніше підтримувати
- Не рекомендується для звичайних форм`
      },
      {
        title: "Вибір методу розміщення",
        content: `**Коли використовувати pack():**
- Прості макети (вертикальні або горизонтальні списки)
- Швидке прототипування
- Коли не потрібен точний контроль

**Коли використовувати grid():**
- Форми з полями введення
- Табличні макети
- Коли потрібно вирівнювання
- Більшість реальних додатків

**Коли використовувати place():**
- Точкове розміщення
- Графіка та ігри
- Кастомні макети
- Коли потрібен повний контроль

**Важливо:** Не змішуйте pack() та grid() в одному контейнері! Використовуйте один метод для всіх віджетів у контейнері.

**Frame для групування:**

\`\`\`python
# Створення Frame для групування
frame = tk.Frame(root)
frame.pack()

# У Frame можна використовувати інший метод
label1 = tk.Label(frame, text="1")
label1.grid(row=0, column=0)

label2 = tk.Label(frame, text="2")
label2.grid(row=0, column=1)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: pack() з різними параметрами",
      code: `import tkinter as tk

root = tk.Tk()
root.geometry("300x200")

# Вертикальне розміщення
label1 = tk.Label(root, text="Перший", bg="red")
label1.pack(fill="x", padx=10, pady=5)

label2 = tk.Label(root, text="Другий", bg="blue")
label2.pack(fill="x", padx=10, pady=5)

# Горизонтальне розміщення
frame = tk.Frame(root)
frame.pack()

btn1 = tk.Button(frame, text="1")
btn1.pack(side="left", padx=5)

btn2 = tk.Button(frame, text="2")
btn2.pack(side="left", padx=5)

root.mainloop()`,
      explanation: "Демонструє використання pack() з різними параметрами: fill, side, padx, pady."
    },
    {
      title: "Приклад 2: grid() для форми",
      code: `import tkinter as tk

root = tk.Tk()
root.geometry("300x150")

# Форма з grid
tk.Label(root, text="Ім'я:").grid(row=0, column=0, sticky="w", padx=5, pady=5)
entry1 = tk.Entry(root)
entry1.grid(row=0, column=1, padx=5, pady=5)

tk.Label(root, text="Вік:").grid(row=1, column=0, sticky="w", padx=5, pady=5)
entry2 = tk.Entry(root)
entry2.grid(row=1, column=1, padx=5, pady=5)

button = tk.Button(root, text="Відправити")
button.grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()`,
      explanation: "Створює форму з використанням grid() для точного вирівнювання полів."
    },
    {
      title: "Приклад 3: place() для точкового розміщення",
      code: `import tkinter as tk

root = tk.Tk()
root.geometry("400x300")

# Розміщення за координатами
label1 = tk.Label(root, text="Лівий верхній", bg="yellow")
label1.place(x=10, y=10)

label2 = tk.Label(root, text="Центр", bg="green")
label2.place(relx=0.5, rely=0.5, anchor="center")

label3 = tk.Label(root, text="Правий нижній", bg="blue")
label3.place(relx=1.0, rely=1.0, anchor="se")

root.mainloop()`,
      explanation: "Демонструє place() з абсолютними та відносними координатами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Змішування pack() та grid() в одному контейнері",
      explanation: "Не можна використовувати pack() та grid() для віджетів в одному батьківському контейнері.",
      correctApproach: "Використовуйте один метод для всіх віджетів у контейнері, або використовуйте Frame для групування."
    },
    {
      mistake: "Забути вказати row та column у grid()",
      explanation: "Без row та column віджет може розміститися не там, де очікується.",
      correctApproach: "Завжди вказуйте row та column у grid(): widget.grid(row=0, column=0)"
    },
    {
      mistake: "Використання place() для адаптивних макетів",
      explanation: "place() використовує абсолютні координати і не адаптується до зміни розміру вікна.",
      correctApproach: "Для адаптивних макетів використовуйте pack() або grid()."
    },
    {
      mistake: "Неправильне використання sticky у grid()",
      explanation: "sticky визначає, як віджет розтягується. 'nsew' означає всі сторони.",
      correctApproach: "Використовуйте sticky='w' для вирівнювання вліво, sticky='nsew' для розтягування."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **pack()** — автоматичне розміщення, простий у використанні
2. **grid()** — табличне розміщення, ідеально для форм
3. **place()** — точкове розміщення, повний контроль позиції
4. **Вибір методу** — pack() для простих макетів, grid() для форм, place() для точкового розміщення
5. **Frame** — контейнер для групування віджетів

Правильний вибір методу розміщення робить код простішим та зрозумілішим!`,
  
  practiceTask: {
    title: "Форма з grid()",
    description: "Створіть форму з використанням grid()",
    problemStatement: `Створіть програму, яка:
1. Використовує grid() для розміщення
2. Має форму з полями: Ім'я, Прізвище, Email, Телефон
3. Має кнопку "Зберегти" на окремому рядку
4. Всі поля вирівняні правильно`,
    inputFormat: "Користувач вводить дані в поля",
    outputFormat: "Форма з правильно вирівняними полями",
    examples: [
      {
        input: "Заповнення форми",
        output: "Форма з вирівняними полями",
        explanation: "grid() забезпечує правильне вирівнювання полів форми"
      }
    ],
    solution: {
      code: `import tkinter as tk

root = tk.Tk()
root.title("Форма реєстрації")
root.geometry("350x200")

# Рядок 0: Ім'я
tk.Label(root, text="Ім'я:").grid(row=0, column=0, sticky="w", padx=10, pady=5)
name_entry = tk.Entry(root, width=25)
name_entry.grid(row=0, column=1, padx=10, pady=5)

# Рядок 1: Прізвище
tk.Label(root, text="Прізвище:").grid(row=1, column=0, sticky="w", padx=10, pady=5)
surname_entry = tk.Entry(root, width=25)
surname_entry.grid(row=1, column=1, padx=10, pady=5)

# Рядок 2: Email
tk.Label(root, text="Email:").grid(row=2, column=0, sticky="w", padx=10, pady=5)
email_entry = tk.Entry(root, width=25)
email_entry.grid(row=2, column=1, padx=10, pady=5)

# Рядок 3: Телефон
tk.Label(root, text="Телефон:").grid(row=3, column=0, sticky="w", padx=10, pady=5)
phone_entry = tk.Entry(root, width=25)
phone_entry.grid(row=3, column=1, padx=10, pady=5)

# Рядок 4: Кнопка
def save():
    print("Дані збережено!")

button = tk.Button(root, text="Зберегти", command=save, width=20)
button.grid(row=4, column=0, columnspan=2, pady=15)

root.mainloop()`,
      explanation: "Створює форму з використанням grid() для точного вирівнювання всіх полів."
    },
    hints: [
      "Використовуйте grid(row=X, column=Y) для кожного віджета",
      "sticky='w' вирівнює Label вліво",
      "columnspan=2 для кнопки, щоб вона займала обидва стовпці",
      "Використовуйте padx та pady для відступів"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод розміщення найкраще для форм?",
        options: ["pack()", "grid()", "place()", "Всі однаково"],
        correctAnswer: 1,
        explanation: "grid() ідеально підходить для форм, оскільки дозволяє точно вирівнювати елементи у рядках та стовпцях."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що означає sticky='nsew' у grid()?",
        options: ["Вирівнювання вліво", "Розтягування на всі сторони", "Центрування", "Помилку"],
        correctAnswer: 1,
        explanation: "sticky='nsew' означає розтягування віджета на всі сторони (north, south, east, west)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна змішувати pack() та grid() в одному контейнері?",
        options: ["Так", "Ні", "Тільки для різних типів віджетів", "Тільки на Windows"],
        correctAnswer: 1,
        explanation: "Ні, не можна змішувати pack() та grid() для віджетів в одному батьківському контейнері. Використовуйте один метод."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить place(relx=0.5, rely=0.5, anchor='center')?",
        options: ["Розміщує в лівому верхньому куті", "Розміщує в центрі", "Розміщує в правому нижньому куті", "Помилку"],
        correctAnswer: 1,
        explanation: "relx=0.5, rely=0.5 означає 50% від ширини та висоти (центр), anchor='center' центрує віджет."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

