/**
 * Lesson 13-5: Обробка подій та практика: GUI-застосунок
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_5 = {
  lessonId: "lesson-13-5",
  moduleId: "module-13",
  order: 5,
  title: "Обробка подій та практика: GUI-застосунок",
  
  learningObjectives: [
    "Обробляти події кліку",
    "Створювати callback-функції",
    "Створити повноцінний GUI-додаток",
    "Застосувати всі набуті знання"
  ],
  
  prerequisites: ["lesson-13-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Обробка подій та практика: GUI-застосунок",
        content: `На цьому уроці ми створимо повноцінний GUI-додаток, використовуючи всі набуті знання про Tkinter.

**Що ви дізнаєтеся:**
- Обробляти події кліку та інші події
- Створювати callback-функції для обробки подій
- Створити повноцінний GUI-додаток
- Застосувати всі набуті знання про віджети та розміщення

**Обробка подій:**

У Tkinter події обробляються через callback-функції. Найпоширеніші події:
- \`command\` - для Button (натискання кнопки)
- \`bind()\` - для інших подій (клік миші, натискання клавіші тощо)

**Приклад обробки подій:**

\`\`\`python
from tkinter import *

def on_button_click():
    label.config(text="Кнопку натиснуто!")

def on_key_press(event):
    print(f"Натиснуто клавішу: {event.keysym}")

root = Tk()
root.title("Обробка подій")

button = Button(root, text="Натисни мене", command=on_button_click)
button.pack()

label = Label(root, text="Чекаю натискання...")
label.pack()

# Обробка натискання клавіш
root.bind('<Key>', on_key_press)
root.focus_set()  # Встановлюємо фокус для отримання подій клавіатури

root.mainloop()
\`\`\`

**Створення повноцінного додатку:**

Давайте створимо простий калькулятор як приклад повноцінного GUI-додатку:

\`\`\`python
from tkinter import *

class Calculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Калькулятор")
        
        self.result_var = StringVar()
        self.result_var.set("0")
        
        self.create_widgets()
    
    def create_widgets(self):
        # Поле результату
        result_entry = Entry(self.root, textvariable=self.result_var, 
                           font=("Arial", 20), justify=RIGHT)
        result_entry.grid(row=0, column=0, columnspan=4, padx=5, pady=5, sticky=EW)
        
        # Кнопки
        buttons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+'],
            ['C']
        ]
        
        for i, row in enumerate(buttons):
            for j, text in enumerate(row):
                if text == 'C':
                    btn = Button(self.root, text=text, command=self.clear,
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=0, columnspan=4, padx=2, pady=2, sticky=EW)
                elif text == '=':
                    btn = Button(self.root, text=text, command=self.calculate,
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=j, padx=2, pady=2, sticky=EW)
                else:
                    btn = Button(self.root, text=text, 
                               command=lambda t=text: self.button_click(t),
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=j, padx=2, pady=2, sticky=EW)
    
    def button_click(self, char):
        current = self.result_var.get()
        if current == "0":
            self.result_var.set(char)
        else:
            self.result_var.set(current + char)
    
    def clear(self):
        self.result_var.set("0")
    
    def calculate(self):
        try:
            result = eval(self.result_var.get())
            self.result_var.set(str(result))
        except:
            self.result_var.set("Помилка")

root = Tk()
calc = Calculator(root)
root.mainloop()
\`\`\`

Це практичний урок-проект, де ми створимо реальний GUI-додаток, використовуючи всі набуті знання.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Обробка подій кнопки",
      code: `from tkinter import *

def on_click():
    label.config(text="Кнопку натиснуто!", fg="green")

root = Tk()
root.title("Обробка подій")

button = Button(root, text="Натисни мене", command=on_click)
button.pack(pady=10)

label = Label(root, text="Чекаю натискання...")
label.pack()

root.mainloop()`,
      explanation: "Простий приклад обробки події натискання кнопки через callback-функцію."
    },
    {
      title: "Приклад 2: Обробка подій клавіатури",
      code: `from tkinter import *

def on_key(event):
    label.config(text=f"Натиснуто: {event.keysym}")

root = Tk()
root.title("Обробка клавіатури")
root.geometry("300x200")

label = Label(root, text="Натисніть будь-яку клавішу")
label.pack(pady=50)

root.bind('<Key>', on_key)
root.focus_set()

root.mainloop()`,
      explanation: "Приклад обробки подій клавіатури за допомогою bind()."
    },
    {
      title: "Приклад 3: Простий калькулятор",
      code: `from tkinter import *

class SimpleCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Калькулятор")
        
        self.result = StringVar()
        self.result.set("0")
        
        Entry(root, textvariable=self.result, font=("Arial", 16), 
              justify=RIGHT).grid(row=0, column=0, columnspan=4, padx=5, pady=5)
        
        buttons = ['7', '8', '9', '/', '4', '5', '6', '*',
                  '1', '2', '3', '-', '0', '.', '=', '+']
        
        row = 1
        col = 0
        for btn_text in buttons:
            if btn_text == '=':
                Button(root, text=btn_text, command=self.calculate,
                      width=5).grid(row=row, column=col, padx=2, pady=2)
            else:
                Button(root, text=btn_text, 
                      command=lambda t=btn_text: self.button_click(t),
                      width=5).grid(row=row, column=col, padx=2, pady=2)
            col += 1
            if col > 3:
                col = 0
                row += 1
    
    def button_click(self, char):
        if self.result.get() == "0":
            self.result.set(char)
        else:
            self.result.set(self.result.get() + char)
    
    def calculate(self):
        try:
            self.result.set(str(eval(self.result.get())))
        except:
            self.result.set("Помилка")

root = Tk()
calc = SimpleCalculator(root)
root.mainloop()`,
      explanation: "Повноцінний GUI-додаток - простий калькулятор з обробкою подій."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання lambda без правильних параметрів",
      explanation: "У циклі створення кнопок lambda може захоплювати неправильне значення.",
      correctApproach: "Використовуйте lambda t=text: функція(t) для правильного захоплення значення."
    },
    {
      mistake: "Забути встановити фокус для обробки клавіатури",
      explanation: "Без focus_set() вікно не отримуватиме події клавіатури.",
      correctApproach: "Викликайте root.focus_set() після bind() для отримання подій клавіатури."
    },
    {
      mistake: "Не обробляти помилки в calculate()",
      explanation: "eval() може викликати помилки при некоректному введенні.",
      correctApproach: "Використовуйте try/except для обробки помилок у функції calculate()."
    }
  ],
  
  summary: `На цьому уроці ми вивчили обробку подій та створили повноцінний GUI-додаток:

1. Обробка подій - через callback-функції та bind()
2. command - для обробки натискання кнопок
3. bind() - для обробки інших подій (клавіатура, миша)
4. Створення додатків - комбінування всіх знань про Tkinter

Підсумок модуля 13:

Ми вивчили:
- Основи Tkinter та створення вікон
- Віджети: Label, Button, Entry, Text
- Методи розміщення: pack, grid, place
- Обробку подій та створення повноцінних додатків

Тепер ви можете створювати графічні інтерфейси користувача на Python!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як обробити подію натискання кнопки?",
        options: [
          "Використати параметр command",
          "Використати bind()",
          "Використати event()",
          "Використати click()"
        ],
        correctAnswer: 0,
        explanation: "Для обробки натискання кнопки використовується параметр command=функція."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод використовується для обробки подій клавіатури?",
        options: [
          "bind()",
          "command",
          "key()",
          "keyboard()"
        ],
        correctAnswer: 0,
        explanation: "bind() використовується для обробки подій клавіатури, миші та інших подій."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Після bind() для клавіатури потрібно викликати focus_set().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. focus_set() встановлює фокус на вікно, щоб воно могло отримувати події клавіатури."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що потрібно зробити при використанні eval() в калькуляторі?",
        options: [
          "Обробити помилки через try/except",
          "Нічого, eval() безпечний",
          "Використати exec() замість eval()",
          "Використати compile()"
        ],
        correctAnswer: 0,
        explanation: "eval() може викликати помилки, тому потрібно обробляти їх через try/except."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
