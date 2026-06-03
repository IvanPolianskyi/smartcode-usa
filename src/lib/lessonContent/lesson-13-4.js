/**
 * Lesson 13-4: Розміщення елементів: pack, grid, place
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_4 = {
  lessonId: "lesson-13-4",
  moduleId: "module-13",
  order: 4,
  title: "Розміщення елементів: pack, grid, place",
  
  learningObjectives: [
    "Використовувати pack для розміщення",
    "Застосовувати grid для таблиць",
    "Використовувати place для точкового розміщення",
    "Вибирати правильний метод"
  ],
  
  prerequisites: ["lesson-13-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Три менеджери геометрії",
        content: `У Tkinter віджети не стоять «самі» — їх розміщує **менеджер геометрії**:

| Метод | Ідея |
|-------|------|
| \`pack()\` | Стек зверху/знизу/збоку |
| \`grid()\` | Таблиця row × column |
| \`place()\` | Координати x, y |

**Правило:** у **одному батьківському** віджеті (Frame або root) — лише **один** тип менеджера.`
      },
      {
        title: "pack() — стек віджетів",
        content: `**1. pack() - автоматичне розміщення**

\`pack()\` розміщує віджети автоматично, один за одним. Це найпростіший метод.

\`\`\`python
from tkinter import *

root = Tk()
label1 = Label(root, text="Перший")
label1.pack()

label2 = Label(root, text="Другий")
label2.pack()

label3 = Label(root, text="Третій")
label3.pack()

root.mainloop()
\`\`\`

**Параметри pack():**
- \`side\` - TOP (за замовчуванням), BOTTOM, LEFT, RIGHT
- \`fill\` - X, Y, BOTH - заповнення простору
- \`padx\`, \`pady\` - відступи

**Frame + pack:** вкладені Frame дозволяють зібрати панель зліва (LEFT) і справа (RIGHT).`
      },
      {
        title: "grid() — форми та таблиці",
        content: `**2. grid() - табличне розміщення**

\`grid()\` розміщує віджети у вигляді таблиці з рядками та стовпцями. Ідеально для форм.

\`\`\`python
from tkinter import *

root = Tk()

Label(root, text="Ім'я:").grid(row=0, column=0)
Entry(root).grid(row=0, column=1)

Label(root, text="Email:").grid(row=1, column=0)
Entry(root).grid(row=1, column=1)

Button(root, text="Відправити").grid(row=2, column=0, columnspan=2)

root.mainloop()
\`\`\`

**Параметри grid():**
- \`row\`, \`column\` - позиція у таблиці
- \`rowspan\`, \`columnspan\` - об'єднання клітинок
- \`sticky\` - вирівнювання (N, S, E, W)
- \`padx\`, \`pady\` - відступи

**Вага колонок:** \`columnconfigure(0, weight=1)\` — розтягування при зміні розміру вікна.`
      },
      {
        title: "place() — абсолютні координати",
        content: `**3. place() - точкове розміщення**

\`place()\` розміщує віджети за абсолютними координатами. Використовується рідко.

\`\`\`python
from tkinter import *

root = Tk()
root.geometry("300x200")

label = Label(root, text="Точкове розміщення")
label.place(x=50, y=50)

button = Button(root, text="Кнопка")
button.place(x=100, y=100)

root.mainloop()
\`\`\`

**Параметри place():**
- \`x\`, \`y\` - координати
- \`relx\`, \`rely\` - відносні координати (0.0 до 1.0)
- \`anchor\` - точка прив'язки

\`relx=0.5, rely=0.5, anchor=CENTER\` — центрування при зміні розміру вікна (рідко на практиці).`
      },
      {
        title: "Що обрати",
        content: `**Не змішуйте** pack і grid в одному контейнері — Tkinter видасть помилку або «зламає» макет.

- **pack** — панелі інструментів, прості списки кнопок
- **grid** — логін-форма, калькулятор, таблиці
- **place** — анімації, накладення елементів

**Порада:** почніть з grid для форм; pack — для швидких прототипів.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: pack()",
      code: `from tkinter import *

root = Tk()
root.title("Приклад pack()")

label1 = Label(root, text="Перший", bg="lightblue")
label1.pack(fill=X, padx=10, pady=5)

label2 = Label(root, text="Другий", bg="lightgreen")
label2.pack(fill=X, padx=10, pady=5)

label3 = Label(root, text="Третій", bg="lightyellow")
label3.pack(fill=X, padx=10, pady=5)

root.mainloop()`,
      explanation: "pack() автоматично розміщує віджети один за одним з заповненням по ширині."
    },
    {
      title: "Приклад 2: grid()",
      code: `from tkinter import *

root = Tk()
root.title("Приклад grid()")

Label(root, text="Ім'я:").grid(row=0, column=0, padx=5, pady=5)
Entry(root, width=30).grid(row=0, column=1, padx=5, pady=5)

Label(root, text="Email:").grid(row=1, column=0, padx=5, pady=5)
Entry(root, width=30).grid(row=1, column=1, padx=5, pady=5)

Button(root, text="Відправити").grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()`,
      explanation: "grid() створює табличний макет, ідеальний для форм."
    },
    {
      title: "Приклад 3: place()",
      code: `from tkinter import *

root = Tk()
root.title("Приклад place()")
root.geometry("300x200")

label = Label(root, text="Точкове розміщення", bg="lightblue")
label.place(x=50, y=50)

button = Button(root, text="Кнопка")
button.place(x=100, y=100)

root.mainloop()`,
      explanation: "place() розміщує віджети за абсолютними координатами."
    },
    {
      title: "Приклад 4: Комбінація grid() з sticky",
      code: `from tkinter import *

root = Tk()
root.title("Grid з sticky")

Label(root, text="Вирівняно вліво").grid(row=0, column=0, sticky=W, padx=5, pady=5)
Label(root, text="Вирівняно вправо").grid(row=0, column=1, sticky=E, padx=5, pady=5)
Label(root, text="Заповнює весь простір").grid(row=1, column=0, columnspan=2, sticky=EW, padx=5, pady=5)

root.mainloop()`,
      explanation: "sticky використовується для вирівнювання та заповнення простору в grid()."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Змішування pack() та grid()",
      explanation: "Не можна використовувати pack() та grid() для віджетів в одному контейнері.",
      correctApproach: "Використовуйте один метод (pack, grid або place) для всіх віджетів у контейнері."
    },
    {
      mistake: "Не вказати row та column для grid()",
      explanation: "Без вказання row та column віджети можуть розміститися некоректно.",
      correctApproach: "Завжди вказуйте row та column для віджетів у grid()."
    },
    {
      mistake: "Використання place() для складних макетів",
      explanation: "place() важко підтримувати та адаптувати для різних розмірів вікна.",
      correctApproach: "Використовуйте grid() для складних макетів, place() тільки для точкового позиціонування."
    }
  ],
  
  summary: `На цьому уроці ми вивчили три методи розміщення віджетів:

1. pack() - автоматичне розміщення, найпростіший метод
2. grid() - табличне розміщення, ідеально для форм
3. place() - точкове розміщення за координатами

Важливо пам'ятати:
- Не змішувати pack() та grid() в одному контейнері
- grid() найкраще підходить для складних макетів
- pack() найпростіший для базового розміщення

У наступному уроці ми навчимося обробляти події та створювати повноцінні GUI-додатки!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод розміщення найкраще підходить для форм?",
        options: [
          "grid()",
          "pack()",
          "place()",
          "layout()"
        ],
        correctAnswer: 0,
        explanation: "grid() ідеально підходить для форм, оскільки створює табличний макет з рядками та стовпцями."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна змішувати pack() та grid() в одному контейнері?",
        options: [
          "Ні, не можна",
          "Так, можна",
          "Тільки для різних типів віджетів",
          "Тільки якщо використати place()"
        ],
        correctAnswer: 0,
        explanation: "Не можна змішувати pack() та grid() в одному контейнері. Використовуйте один метод для всіх віджетів."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр grid() використовується для об'єднання клітинок?",
        options: [
          "columnspan або rowspan",
          "merge",
          "combine",
          "join"
        ],
        correctAnswer: 0,
        explanation: "columnspan та rowspan використовуються для об'єднання клітинок у grid()."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "place() найкраще підходить для складних макетів з багатьма віджетами.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. place() важко підтримувати для складних макетів. Використовуйте grid() для складних макетів."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить grid(sticky='ew')?",
        options: [
          "Розтягує віджет по горизонталі в клітинці",
          "Видаляє віджет",
          "Змінює шрифт",
          "Викликає mainloop"
        ],
        correctAnswer: 0,
        explanation: "sticky=E+W (або 'ew') прив'язує віджет до східної та західної стінки клітинки."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
