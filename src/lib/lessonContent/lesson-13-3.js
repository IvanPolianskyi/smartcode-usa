/**
 * Lesson 13-3: Віджети: Label, Button, Entry, Text
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_3 = {
  lessonId: "lesson-13-3",
  moduleId: "module-13",
  order: 3,
  title: "Віджети: Label, Button, Entry, Text",
  
  learningObjectives: [
    "Використовувати Label для тексту",
    "Створювати кнопки з Button",
    "Отримувати введення через Entry та Text",
    "Налаштовувати віджети"
  ],
  
  prerequisites: ["lesson-13-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд чотирьох віджетів",
        content: `**Label** — показує текст або зображення (не редагується користувачем).

**Button** — кнопка; при натисканні викликається \`command\`.

**Entry** — одне рядкове поле вводу.

**Text** — багаторядкове поле (нотатки, лог).

Разом вони покривають 90% простих форм до переходу на \`ttk\` або веб-інтерфейс.`
      },
      {
        title: "Label (мітка)",
        content: `**Label (Мітка):**

Label використовується для відображення тексту або зображення. Він не взаємодіє з користувачем, але може відображати інформацію.

\`\`\`python
from tkinter import *

root = Tk()
label = Label(root, text="Привіт, світ!")
label.pack()
root.mainloop()
\`\`\`

**Корисні опції:** \`font=("Arial", 14)\`, \`fg\` (колір тексту), \`bg\` (фон), \`padx\` / \`pady\` при \`pack()\`.`
      },
      {
        title: "Button (кнопка)",
        content: `**Button (Кнопка):**

Button створює кнопку, на яку можна натиснути. При натисканні виконується функція.

\`\`\`python
from tkinter import *

def button_clicked():
    print("Кнопку натиснуто!")

root = Tk()
button = Button(root, text="Натисни мене", command=button_clicked)
button.pack()
root.mainloop()
\`\`\`

**Стан кнопки:** \`state=DISABLED\` — сіра неактивна кнопка; \`state=NORMAL\` — знову активна.`
      },
      {
        title: "Entry та StringVar",
        content: `**Entry (Поле введення):**

Entry створює однострокове поле для введення тексту.

\`\`\`python
from tkinter import *

root = Tk()
entry = Entry(root, width=30)
entry.pack()

def get_text():
    text = entry.get()
    print(f"Введений текст: {text}")

button = Button(root, text="Отримати текст", command=get_text)
button.pack()
root.mainloop()
\`\`\`

**StringVar** — зв'язати Entry зі змінною для автоматичного оновлення Label:

\`\`\`python
from tkinter import *

root = Tk()
name = StringVar()
Entry(root, textvariable=name, width=30).pack()
Label(root, textvariable=name).pack()
root.mainloop()
\`\`\`

**Методи Entry:** \`get()\`, \`insert(0, text)\`, \`delete(0, END)\`.`
      },
      {
        title: "Text (багаторядкове поле)",
        content: `**Text (Багаторядкове поле):**

Text створює багаторядкове текстове поле для введення або відображення тексту.

\`\`\`python
from tkinter import *

root = Tk()
text_widget = Text(root, width=40, height=10)
text_widget.pack()

def get_text():
    content = text_widget.get("1.0", END)
    print(f"Введений текст:\\n{content}")

button = Button(root, text="Отримати текст", command=get_text)
button.pack()
root.mainloop()
\`\`\`

Індекси рядків: \`"1.0"\` — рядок 1, символ 0; \`END\` — кінець. **Scrollbar** часто додають до Text для довгих логів.

**Налаштування (усі віджети):** \`text\`, \`width\`, \`height\`, \`bg\`, \`fg\`, \`font\`, для Button — \`command\`.`
      },
      {
        title: "Підсумок",
        content: `Label — показ, Entry/Text — ввід, Button — дія. \`StringVar\` зручний для форм «поле + підпис». Далі — розміщення pack/grid (урок 13-4).`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Label",
      code: `from tkinter import *

root = Tk()
root.title("Приклад Label")

label = Label(root, text="Привіт, світ!", font=("Arial", 16))
label.pack()

root.mainloop()`,
      explanation: "Створюємо простий Label з текстом та налаштованим шрифтом."
    },
    {
      title: "Приклад 2: Button",
      code: `from tkinter import *

def on_button_click():
    print("Кнопку натиснуто!")

root = Tk()
root.title("Приклад Button")

button = Button(root, text="Натисни мене", command=on_button_click)
button.pack()

root.mainloop()`,
      explanation: "Створюємо кнопку, яка виконує функцію при натисканні."
    },
    {
      title: "Приклад 3: Entry",
      code: `from tkinter import *

def show_text():
    text = entry.get()
    label.config(text=f"Ви ввели: {text}")

root = Tk()
root.title("Приклад Entry")

entry = Entry(root, width=30)
entry.pack()

button = Button(root, text="Показати текст", command=show_text)
button.pack()

label = Label(root, text="")
label.pack()

root.mainloop()`,
      explanation: "Створюємо поле введення та кнопку для отримання введеного тексту."
    },
    {
      title: "Приклад 4: Text",
      code: `from tkinter import *

def show_text():
    content = text_widget.get("1.0", END)
    print(f"Введений текст:\\n{content}")

root = Tk()
root.title("Приклад Text")

text_widget = Text(root, width=40, height=10)
text_widget.pack()

button = Button(root, text="Показати текст", command=show_text)
button.pack()

root.mainloop()`,
      explanation: "Створюємо багаторядкове текстове поле для введення тексту."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати mainloop()",
      explanation: "Без mainloop() вікно не відобразиться або закриється одразу.",
      correctApproach: "Завжди викликайте root.mainloop() в кінці програми для відображення вікна."
    },
    {
      mistake: "Неправильне отримання тексту з Text",
      explanation: "Для Text потрібно використовувати get() з індексами рядків, а не просто get().",
      correctApproach: "Використовуйте text_widget.get('1.0', END) для отримання всього тексту."
    },
    {
      mistake: "Не вказати command для Button",
      explanation: "Button без command не виконуватиме жодних дій при натисканні.",
      correctApproach: "Завжди вказуйте параметр command=функція для Button, якщо потрібна взаємодія."
    }
  ],
  
  summary: `На цьому уроці ми вивчили основні віджети Tkinter:

1. Label - для відображення тексту або зображення
2. Button - кнопка для виконання дій при натисканні
3. Entry - однострокове поле для введення тексту
4. Text - багаторядкове текстове поле

Ці віджети є основою для створення інтерактивних GUI-додатків. У наступному уроці ми навчимося розміщувати ці віджети у вікні.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який віджет використовується для відображення тексту?",
        options: [
          "Label",
          "Button",
          "Entry",
          "Text"
        ],
        correctAnswer: 0,
        explanation: "Label використовується для відображення тексту або зображення."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який віджет створює однострокове поле для введення?",
        options: [
          "Entry",
          "Text",
          "Label",
          "Button"
        ],
        correctAnswer: 0,
        explanation: "Entry створює однострокове поле для введення тексту."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати весь текст з Text віджета?",
        options: [
          "text_widget.get('1.0', END)",
          "text_widget.get()",
          "text_widget.text",
          "text_widget.value"
        ],
        correctAnswer: 0,
        explanation: "Для Text потрібно використовувати get() з індексами '1.0' (початок) та END (кінець)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Button може працювати без параметра command.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Button може бути створений без command, але він не виконуватиме жодних дій при натисканні."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо використовують StringVar з Entry?",
        options: [
          "Автоматично оновлювати інші віджети при зміні тексту",
          "Прискорити mainloop",
          "Замінити pack()",
          "Відправити email"
        ],
        correctAnswer: 0,
        explanation: "textvariable зв'язує Entry з Label або іншими віджетами через одну змінну."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
