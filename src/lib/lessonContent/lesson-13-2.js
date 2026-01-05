/**
 * Lesson 13-2: Створення першого вікна. Tk(), mainloop()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_2 = {
  lessonId: "lesson-13-2",
  moduleId: "module-13",
  order: 2,
  title: "Створення першого вікна. Tk(), mainloop()",
  
  learningObjectives: [
    "Створити перше вікно",
    "Використовувати Tk() та mainloop()",
    "Налаштувати розміри та заголовок",
    "Закривати вікно"
  ],
  
  prerequisites: ["lesson-13-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Створення першого вікна",
        content: `На цьому уроці ми навчимося створювати наше перше GUI-вікно за допомогою Tkinter.

**Створення головного вікна:**

Для створення головного вікна використовується клас \`Tk()\`:

\`\`\`python
from tkinter import *

root = Tk()
root.mainloop()
\`\`\`

**Що відбувається:**
1. \`Tk()\` - створює головне вікно програми
2. \`mainloop()\` - запускає головний цикл подій, який відображає вікно та обробляє події

**Налаштування вікна:**

**Заголовок вікна:**
\`\`\`python
root.title("Мій додаток")
\`\`\`

**Розміри вікна:**
\`\`\`python
root.geometry("400x300")  # ширина x висота
\`\`\`

**Мінімальні/максимальні розміри:**
\`\`\`python
root.minsize(200, 150)  # мінімальні розміри
root.maxsize(800, 600)  # максимальні розміри
\`\`\`

**Позиція вікна на екрані:**
\`\`\`python
root.geometry("400x300+100+100")  # розміри + позиція x + позиція y
\`\`\`

**Інші корисні налаштування:**

**Зміна іконки:**
\`\`\`python
root.iconbitmap("icon.ico")  # Windows
# або для крос-платформенності:
root.iconphoto(False, PhotoImage(file="icon.png"))
\`\`\`

**Фон вікна:**
\`\`\`python
root.configure(bg="lightblue")
\`\`\`

**Закриття вікна:**

Вікно можна закрити:
- Натиснувши кнопку X у верхньому куті
- Викликавши метод \`destroy()\`:
\`\`\`python
root.destroy()
\`\`\`

**Обробка закриття:**

Можна додати обробник події закриття вікна:
\`\`\`python
def on_closing():
    if messagebox.askokcancel("Вихід", "Ви впевнені, що хочете вийти?"):
        root.destroy()

root.protocol("WM_DELETE_WINDOW", on_closing)
\`\`\`

**Важливо про mainloop():**

\`mainloop()\` - це нескінченний цикл, який:
- Відображає вікно на екрані
- Обробляє події (кліки, натискання клавіш тощо)
- Оновлює інтерфейс
- Блокує виконання коду після себе

**Примітка:** Код після \`mainloop()\` виконається тільки після закриття вікна.

**Повний приклад:**

\`\`\`python
from tkinter import *

root = Tk()
root.title("Мій перший додаток")
root.geometry("400x300")
root.configure(bg="lightgray")

label = Label(root, text="Привіт, Tkinter!", font=("Arial", 16))
label.pack(pady=50)

root.mainloop()
\`\`\`

Тепер ви вмієте створювати та налаштовувати GUI-вікна!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Мінімальне вікно",
      code: `from tkinter import *

root = Tk()
root.mainloop()`,
      explanation: "Найпростіший приклад створення вікна. Створює порожнє вікно з розмірами за замовчуванням."
    },
    {
      title: "Вікно з заголовком",
      code: `from tkinter import *

root = Tk()
root.title("Мій додаток")
root.mainloop()`,
      explanation: "Додаємо заголовок до вікна за допомогою методу title()."
    },
    {
      title: "Вікно з заданими розмірами",
      code: `from tkinter import *

root = Tk()
root.title("Вікно 400x300")
root.geometry("400x300")
root.mainloop()`,
      explanation: "Встановлюємо розміри вікна 400 пікселів завширшки та 300 пікселів заввишки."
    },
    {
      title: "Вікно з позицією на екрані",
      code: `from tkinter import *

root = Tk()
root.title("Вікно з позицією")
root.geometry("400x300+100+100")
root.mainloop()`,
      explanation: "Встановлюємо розміри та позицію вікна. +100+100 означає 100 пікселів від лівого краю та 100 від верху."
    },
    {
      title: "Вікно з мінімальними та максимальними розмірами",
      code: `from tkinter import *

root = Tk()
root.title("Вікно з обмеженнями")
root.geometry("400x300")
root.minsize(200, 150)
root.maxsize(800, 600)
root.mainloop()`,
      explanation: "Встановлюємо обмеження на розміри вікна. Користувач не зможе зробити вікно менше або більше вказаних розмірів."
    },
    {
      title: "Вікно з кольоровим фоном",
      code: `from tkinter import *

root = Tk()
root.title("Кольорове вікно")
root.geometry("400x300")
root.configure(bg="lightblue")
root.mainloop()`,
      explanation: "Змінюємо колір фону вікна за допомогою методу configure()."
    },
    {
      title: "Вікно з обробкою закриття",
      code: `from tkinter import *
from tkinter import messagebox

def on_closing():
    if messagebox.askokcancel("Вихід", "Ви впевнені, що хочете вийти?"):
        root.destroy()

root = Tk()
root.title("Вікно з підтвердженням")
root.geometry("400x300")
root.protocol("WM_DELETE_WINDOW", on_closing)
root.mainloop()`,
      explanation: "Додаємо обробник події закриття вікна з підтвердженням від користувача."
    },
    {
      title: "Повний приклад з віджетами",
      code: `from tkinter import *

root = Tk()
root.title("Мій перший додаток")
root.geometry("400x300")
root.configure(bg="lightgray")

label = Label(root, text="Привіт, Tkinter!", font=("Arial", 16), bg="lightgray")
label.pack(pady=50)

button = Button(root, text="Натисни мене", command=lambda: print("Кнопку натиснуто!"))
button.pack()

root.mainloop()`,
      explanation: "Повний приклад вікна з міткою та кнопкою. Демонструє базову структуру GUI-додатку."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати mainloop()",
      explanation: "Без mainloop() вікно не відобразиться або закриється одразу після створення.",
      correctApproach: "Завжди викликайте root.mainloop() в кінці програми для відображення та підтримки вікна."
    },
    {
      mistake: "Неправильний формат geometry",
      explanation: "Формат geometry має бути 'ширинаxвисота' або 'ширинаxвисота+x+y'.",
      correctApproach: "Використовуйте правильний формат: root.geometry('400x300') або root.geometry('400x300+100+100')."
    },
    {
      mistake: "Код після mainloop() не виконується",
      explanation: "mainloop() блокує виконання, тому код після нього виконається тільки після закриття вікна.",
      correctApproach: "Розміщуйте весь код, який має виконатися до відображення вікна, перед mainloop()."
    },
    {
      mistake: "Створення кількох Tk() об'єктів",
      explanation: "Зазвичай потрібен тільки один головний Tk() об'єкт. Кілька об'єктів можуть викликати проблеми.",
      correctApproach: "Створюйте один головний Tk() об'єкт, а для додаткових вікон використовуйте Toplevel()."
    }
  ],
  
  summary: `На цьому уроці ми навчилися створювати GUI-вікна:

1. Tk() - створює головне вікно програми
2. mainloop() - запускає головний цикл подій для відображення та обробки подій
3. title() - встановлює заголовок вікна
4. geometry() - налаштовує розміри та позицію вікна
5. minsize() / maxsize() - встановлює обмеження на розміри
6. configure() - налаштовує різні властивості вікна (колір фону тощо)
7. destroy() - закриває вікно програмно
8. protocol() - додає обробник події закриття вікна

Тепер ви можете створювати та налаштовувати GUI-вікна! У наступному уроці ми додамо віджети до наших вікон.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод потрібно викликати для відображення вікна?",
        options: [
          "mainloop()",
          "show()",
          "display()",
          "run()"
        ],
        correctAnswer: 0,
        explanation: "mainloop() запускає головний цикл подій, який відображає вікно та обробляє події."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який правильний формат для geometry()?",
        options: [
          "400x300",
          "400,300",
          "400*300",
          "400 300"
        ],
        correctAnswer: 0,
        explanation: "Правильний формат: 'ширинаxвисота' (наприклад, '400x300')."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як встановити заголовок вікна?",
        options: [
          "root.title('Заголовок')",
          "root.setTitle('Заголовок')",
          "root.heading('Заголовок')",
          "root.name('Заголовок')"
        ],
        correctAnswer: 0,
        explanation: "Метод title() встановлює заголовок вікна."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Код після mainloop() виконається одразу після створення вікна.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. mainloop() блокує виконання, тому код після нього виконається тільки після закриття вікна."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як програмно закрити вікно?",
        options: [
          "root.destroy()",
          "root.close()",
          "root.exit()",
          "root.quit()"
        ],
        correctAnswer: 0,
        explanation: "Метод destroy() закриває вікно та звільняє ресурси."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
