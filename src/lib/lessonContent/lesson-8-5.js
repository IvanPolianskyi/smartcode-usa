/**
 * Lesson 8-5: Обробка подій та callback-функції
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson8_5 = {
  lessonId: "lesson-8-5",
  moduleId: "module-8",
  order: 5,
  title: "Обробка подій та callback-функції",
  
  learningObjectives: [
    "Обробляти події кліку миші",
    "Створювати callback-функції",
    "Працювати з різними типами подій",
    "Зв'язувати події з функціями"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-8-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке події?",
        content: `**Події (Events)** — дії користувача або системи, які вимагають реакції програми.

**Типи подій:**
- **Клік миші** — натискання кнопки миші
- **Натискання клавіші** — натискання клавіші на клавіатурі
- **Рух миші** — переміщення курсора
- **Зміна значення** — зміна тексту в Entry
- **Закриття вікна** — спроба закрити вікно

**Обробка подій:**
Події обробляються через **callback-функції** — функції, які викликаються при настанні події.

**Простий приклад:**

\`\`\`python
def button_clicked():
    print("Кнопку натиснуто!")

button = tk.Button(root, text="Натисни", command=button_clicked)
\`\`\`

Тут \`button_clicked\` — це callback-функція, яка викликається при натисканні кнопки.`
      },
      {
        title: "Події миші",
        content: `**bind()** — метод для прив'язки подій до віджетів.

**Базові події миші:**

\`\`\`python
def on_click(event):
    print(f"Клік на позиції: {event.x}, {event.y}")

label = tk.Label(root, text="Натисни мене")
label.bind("<Button-1>", on_click)  # Button-1 = ліва кнопка миші
label.pack()
\`\`\`

**Типи подій миші:**
- \`<Button-1>\` — ліва кнопка миші
- \`<Button-2>\` — середня кнопка (колесо)
- \`<Button-3>\` — права кнопка
- \`<Double-Button-1>\` — подвійний клік
- \`<ButtonRelease-1>\` — відпускання кнопки
- \`<Motion>\` — рух миші
- \`<Enter>\` — наведення миші на віджет
- \`<Leave>\` — відведення миші від віджета

**Приклад:**

\`\`\`python
def on_enter(event):
    label.config(bg="yellow")

def on_leave(event):
    label.config(bg="white")

label = tk.Label(root, text="Наведіть мишу")
label.bind("<Enter>", on_enter)
label.bind("<Leave>", on_leave)
label.pack()
\`\`\``
      },
      {
        title: "Події клавіатури",
        content: `**Події клавіатури:**

\`\`\`python
def on_key(event):
    print(f"Натиснуто: {event.char}")

root.bind("<Key>", on_key)
\`\`\`

**Типи подій клавіатури:**
- \`<Key>\` — будь-яка клавіша
- \`<KeyPress>\` — натискання клавіші
- \`<KeyRelease>\` — відпускання клавіші
- \`<Return>\` — Enter
- \`<Escape>\` — Escape
- \`<space>\` — пробіл
- \`<Control-c>\` — Ctrl+C

**Приклад з Enter:**

\`\`\`python
def on_enter(event):
    text = entry.get()
    print(f"Введено: {text}")

entry = tk.Entry(root)
entry.bind("<Return>", on_enter)  # Enter
entry.pack()
\`\`\`

**Фокус:**

Для обробки подій клавіатури віджет має мати фокус:

\`\`\`python
entry.focus()  # Встановлює фокус на Entry
\`\`\``
      },
      {
        title: "Callback-функції з параметрами",
        content: `**Проблема:** Callback-функції не можуть приймати параметри напряму.

**Рішення 1: lambda:**

\`\`\`python
def process(name):
    print(f"Обробка: {name}")

button = tk.Button(root, text="OK", command=lambda: process("Олександр"))
\`\`\`

**Рішення 2: lambda з параметром:**

\`\`\`python
def update_label(text):
    label.config(text=text)

button1 = tk.Button(root, text="1", command=lambda: update_label("Один"))
button2 = tk.Button(root, text="2", command=lambda: update_label("Два"))
\`\`\`

**Рішення 3: functools.partial:**

\`\`\`python
from functools import partial

def greet(name, greeting):
    print(f"{greeting}, {name}!")

button = tk.Button(root, text="Привіт", command=partial(greet, "Олександр", "Привіт"))
\`\`\`

**Рішення 4: Клас з методами:**

\`\`\`python
class App:
    def __init__(self):
        self.root = tk.Tk()
        self.counter = 0
        self.button = tk.Button(self.root, text="+1", command=self.increment)
        self.button.pack()
    
    def increment(self):
        self.counter += 1
        print(self.counter)
\`\`\``
      },
      {
        title: "Об'єкт події (event)",
        content: `**Об'єкт event** містить інформацію про подію.

**Властивості event:**

\`\`\`python
def on_event(event):
    print(f"x: {event.x}")           # X координата
    print(f"y: {event.y}")           # Y координата
    print(f"char: {event.char}")     # Символ (для клавіатури)
    print(f"keysym: {event.keysym}") # Назва клавіші
    print(f"widget: {event.widget}") # Віджет, де сталася подія
\`\`\`

**Приклад з координатами:**

\`\`\`python
def on_click(event):
    x, y = event.x, event.y
    label.config(text=f"Клік: ({x}, {y})")

canvas = tk.Canvas(root, width=400, height=300)
canvas.bind("<Button-1>", on_click)
canvas.pack()

label = tk.Label(root, text="Натисніть на canvas")
label.pack()
\`\`\`

**Приклад з клавіатурою:**

\`\`\`python
def on_key(event):
    if event.keysym == "Return":
        print("Натиснуто Enter!")
    elif event.keysym == "Escape":
        root.destroy()

root.bind("<Key>", on_key)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Обробка кліку",
      code: `import tkinter as tk

def on_button_click():
    label.config(text="Кнопку натиснуто!")

root = tk.Tk()
root.geometry("300x150")

button = tk.Button(root, text="Натисни мене", command=on_button_click)
button.pack(pady=20)

label = tk.Label(root, text="Очікую клік...")
label.pack()

root.mainloop()`,
      explanation: "Демонструє обробку кліку через command у Button."
    },
    {
      title: "Приклад 2: Події миші з bind()",
      code: `import tkinter as tk

def on_enter(event):
    label.config(bg="lightgreen", text="Миша над кнопкою!")

def on_leave(event):
    label.config(bg="white", text="Миша не над кнопкою")

root = tk.Tk()
root.geometry("300x150")

label = tk.Label(root, text="Наведіть мишу", width=30, height=3)
label.bind("<Enter>", on_enter)
label.bind("<Leave>", on_leave)
label.pack(pady=50)

root.mainloop()`,
      explanation: "Показує обробку подій наведення та відведення миші через bind()."
    },
    {
      title: "Приклад 3: Lambda для callback",
      code: `import tkinter as tk

def update_text(text):
    label.config(text=text)

root = tk.Tk()
root.geometry("300x200")

label = tk.Label(root, text="Оберіть кнопку")
label.pack(pady=20)

button1 = tk.Button(root, text="Варіант 1", command=lambda: update_text("Обрано варіант 1"))
button1.pack(pady=5)

button2 = tk.Button(root, text="Варіант 2", command=lambda: update_text("Обрано варіант 2"))
button2.pack(pady=5)

root.mainloop()`,
      explanation: "Демонструє використання lambda для передачі параметрів у callback-функції."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Виклик функції замість передачі функції",
      explanation: "command=my_function() викличе функцію одразу, а не при натисканні.",
      correctApproach: "Використовуйте command=my_function (без дужок) для передачі функції."
    },
    {
      mistake: "Забути параметр event у функції обробки",
      explanation: "Функції обробки подій через bind() мають приймати параметр event.",
      correctApproach: "def on_event(event): або def on_event(_): якщо event не використовується."
    },
    {
      mistake: "Спроба передати параметри напряму у callback",
      explanation: "command=my_function(param) викличе функцію одразу з параметром.",
      correctApproach: "Використовуйте lambda: command=lambda: my_function(param)"
    },
    {
      mistake: "Не встановити фокус для подій клавіатури",
      explanation: "Події клавіатури працюють тільки для віджета з фокусом.",
      correctApproach: "Використовуйте widget.focus() для встановлення фокусу."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Події** — дії користувача (кліки, натискання клавіш)
2. **Callback-функції** — функції, які викликаються при подіях
3. **command** — параметр Button для обробки кліку
4. **bind()** — метод для прив'язки подій до віджетів
5. **lambda** — для передачі параметрів у callback-функції
6. **Об'єкт event** — містить інформацію про подію

Обробка подій робить GUI додатки інтерактивними!`,
  
  practiceTask: {
    title: "Інтерактивний додаток",
    description: "Створіть додаток з обробкою різних подій",
    problemStatement: `Створіть програму, яка:
1. Має кнопку, яка збільшує лічильник
2. Має Label, який змінює колір при наведенні миші
3. Має Entry, який виводить текст при натисканні Enter
4. Показує координати кліку миші`,
    inputFormat: "Користувач взаємодіє з інтерфейсом",
    outputFormat: "Додаток реагує на різні події",
    examples: [
      {
        input: "Клік на кнопку, наведення миші, натискання Enter",
        output: "Лічильник збільшується, Label змінює колір, текст виводиться",
        explanation: "Додаток обробляє різні типи подій"
      }
    ],
    solution: {
      code: `import tkinter as tk

class InteractiveApp:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Інтерактивний додаток")
        self.root.geometry("400x300")
        self.counter = 0
        
        self.setup_ui()
        
    def setup_ui(self):
        # Лічильник
        self.counter_label = tk.Label(self.root, text="Лічильник: 0", font=("Arial", 14))
        self.counter_label.pack(pady=20)
        
        button = tk.Button(self.root, text="+1", command=self.increment, width=15)
        button.pack(pady=10)
        
        # Label з подією миші
        self.hover_label = tk.Label(self.root, text="Наведіть мишу", width=30, height=3, bg="white")
        self.hover_label.bind("<Enter>", self.on_enter)
        self.hover_label.bind("<Leave>", self.on_leave)
        self.hover_label.pack(pady=20)
        
        # Entry з Enter
        self.entry = tk.Entry(self.root, width=30)
        self.entry.bind("<Return>", self.on_enter_key)
        self.entry.pack(pady=10)
        
        self.result_label = tk.Label(self.root, text="")
        self.result_label.pack()
        
        # Canvas для кліків
        self.canvas = tk.Canvas(self.root, width=300, height=100, bg="lightgray")
        self.canvas.bind("<Button-1>", self.on_canvas_click)
        self.canvas.pack(pady=10)
        
        self.click_label = tk.Label(self.root, text="Клікніть на canvas")
        self.click_label.pack()
        
    def increment(self):
        self.counter += 1
        self.counter_label.config(text=f"Лічильник: {self.counter}")
        
    def on_enter(self, event):
        self.hover_label.config(bg="lightblue", text="Миша над Label!")
        
    def on_leave(self, event):
        self.hover_label.config(bg="white", text="Наведіть мишу")
        
    def on_enter_key(self, event):
        text = self.entry.get()
        self.result_label.config(text=f"Введено: {text}")
        
    def on_canvas_click(self, event):
        x, y = event.x, event.y
        self.click_label.config(text=f"Клік на позиції: ({x}, {y})")

app = InteractiveApp()
app.root.mainloop()`,
      explanation: "Створює інтерактивний додаток з обробкою різних типів подій: кліки, наведення миші, натискання клавіш."
    },
    hints: [
      "Використовуйте command= для кнопок",
      "Використовуйте bind() для подій миші та клавіатури",
      "Пам'ятайте про параметр event у функціях обробки",
      "Використовуйте lambda для передачі параметрів"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке callback-функція?",
        options: ["Функція, яка викликається при події", "Функція для закриття вікна", "Функція для створення віджетів", "Функція для обчислень"],
        correctAnswer: 0,
        explanation: "Callback-функція — це функція, яка викликається автоматично при настанні події (наприклад, клік кнопки)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nbutton = tk.Button(root, text='OK', command=my_function())\n```",
        options: ["Нічого", "Потрібен pack()", "command має бути без дужок", "Неправильна назва"],
        correctAnswer: 2,
        explanation: "command=my_function() викличе функцію одразу. Потрібно command=my_function (без дужок) для передачі функції."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка подія відповідає за лівий клік миші?",
        options: ["<Button-1>", "<Click-1>", "<Mouse-1>", "<Left-Click>"],
        correctAnswer: 0,
        explanation: "<Button-1> відповідає за лівий клік миші. Button-2 — середня кнопка, Button-3 — права."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Як передати параметр у callback-функцію?",
        options: ["command=func(param)", "command=lambda: func(param)", "command=func, param", "Неможливо"],
        correctAnswer: 1,
        explanation: "Використовуйте lambda для передачі параметрів: command=lambda: func(param)"
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

