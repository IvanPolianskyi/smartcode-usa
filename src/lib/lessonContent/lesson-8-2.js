/**
 * Lesson 8-2: Створення першого вікна. Tk(), mainloop()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson8_2 = {
  lessonId: "lesson-8-2",
  moduleId: "module-8",
  order: 2,
  title: "Створення першого вікна. Tk(), mainloop()",
  
  learningObjectives: [
    "Створити перше вікно Tkinter",
    "Використовувати Tk() та mainloop()",
    "Налаштувати розміри та заголовок вікна",
    "Закривати вікно правильно"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-8-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Створення головного вікна",
        content: `**tk.Tk()** — створює головне вікно додатку.

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.mainloop()
\`\`\`

**Що відбувається:**
1. \`tk.Tk()\` створює об'єкт головного вікна
2. Вікно ще не видиме
3. \`mainloop()\` запускає цикл подій та показує вікно

**Важливо:** Зазвичай зберігають вікно у змінну \`root\` або \`window\`, але можна використовувати будь-яку назву.

**Альтернативний спосіб:**
\`\`\`python
import tkinter as tk

window = tk.Tk()
window.mainloop()
\`\`\``
      },
      {
        title: "Налаштування вікна",
        content: `**Заголовок вікна:**

\`\`\`python
root = tk.Tk()
root.title("Мій додаток")
\`\`\`

**Розміри вікна:**

\`\`\`python
root.geometry("400x300")  # ширина x висота (в пікселях)
\`\`\`

**Мінімальні/максимальні розміри:**

\`\`\`python
root.minsize(200, 150)    # мінімальні розміри
root.maxsize(800, 600)   # максимальні розміри
\`\`\`

**Позиція вікна на екрані:**

\`\`\`python
root.geometry("400x300+100+50")  # +100 від лівого краю, +50 від верху
\`\`\`

**Повний приклад:**

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.title("Мій перший додаток")
root.geometry("400x300+100+50")
root.minsize(300, 200)

root.mainloop()
\`\`\``
      },
      {
        title: "Головний цикл mainloop()",
        content: `**mainloop()** — запускає головний цикл подій.

**Що робить mainloop():**
1. Показує вікно на екрані
2. Очікує події від користувача (кліки, натискання клавіш)
3. Обробляє події
4. Оновлює інтерфейс
5. Повертається до кроку 2

**Важливо:**
- \`mainloop()\` **блокує** виконання коду
- Код після \`mainloop()\` виконається тільки після закриття вікна
- Всі віджети мають бути створені **до** виклику \`mainloop()\`

**Правильний порядок:**

\`\`\`python
import tkinter as tk

# 1. Створення вікна
root = tk.Tk()

# 2. Налаштування
root.title("Додаток")
root.geometry("400x300")

# 3. Створення віджетів
label = tk.Label(root, text="Привіт!")
label.pack()

# 4. Запуск циклу (ВСЕГДА В КІНЦІ!)
root.mainloop()

# Цей код виконається тільки після закриття вікна
print("Вікно закрито!")
\`\`\``
      },
      {
        title: "Закриття вікна",
        content: `**Стандартні способи закриття:**
- Кнопка X у правому верхньому куті
- Alt+F4 (Windows/Linux)
- Cmd+Q (Mac)

**Програмне закриття:**

\`\`\`python
root.destroy()  # Закриває вікно та завершує mainloop()
\`\`\`

**Приклад з кнопкою закриття:**

\`\`\`python
import tkinter as tk

def close_window():
    root.destroy()

root = tk.Tk()
root.title("Додаток з кнопкою закриття")

button = tk.Button(root, text="Закрити", command=close_window)
button.pack()

root.mainloop()
\`\`\`

**Протокол закриття:**

Можна обробити спробу закриття вікна:

\`\`\`python
def on_closing():
    if messagebox.askokcancel("Вихід", "Ви впевнені, що хочете вийти?"):
        root.destroy()

root.protocol("WM_DELETE_WINDOW", on_closing)
\`\`\`

Це дозволяє підтвердити закриття або зберегти дані перед виходом.`
      },
      {
        title: "Іконка вікна",
        content: `**Встановлення іконки:**

\`\`\`python
root.iconbitmap("icon.ico")  # Windows (.ico файл)
\`\`\`

**Для кросплатформенності:**

\`\`\`python
try:
    root.iconbitmap("icon.ico")
except:
    pass  # Якщо не вдалося встановити іконку
\`\`\`

**Альтернативний спосіб (Linux/Mac):**

\`\`\`python
root.iconphoto(False, tk.PhotoImage(file="icon.png"))
\`\`\`

**Повний приклад:**

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.title("Додаток з іконкою")
root.geometry("400x300")

# Спроба встановити іконку
try:
    root.iconbitmap("icon.ico")
except:
    print("Не вдалося завантажити іконку")

root.mainloop()
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове вікно",
      code: `import tkinter as tk

# Створення та налаштування вікна
root = tk.Tk()
root.title("Моє вікно")
root.geometry("400x300")

# Запуск головного циклу
root.mainloop()`,
      explanation: "Створює базове вікно з заголовком та розмірами. mainloop() показує вікно та запускає цикл подій."
    },
    {
      title: "Приклад 2: Вікно з обмеженнями розміру",
      code: `import tkinter as tk

root = tk.Tk()
root.title("Вікно з обмеженнями")
root.geometry("500x400")
root.minsize(300, 200)  # Мінімальні розміри
root.maxsize(800, 600)  # Максимальні розміри

root.mainloop()`,
      explanation: "Встановлює мінімальні та максимальні розміри вікна, щоб користувач не міг зробити його занадто маленьким або великим."
    },
    {
      title: "Приклад 3: Вікно з кнопкою закриття",
      code: `import tkinter as tk

def close_app():
    root.destroy()

root = tk.Tk()
root.title("Додаток з кнопкою")
root.geometry("300x200")

# Кнопка для закриття
close_button = tk.Button(root, text="Закрити", command=close_app)
close_button.pack(pady=50)

root.mainloop()`,
      explanation: "Додає кнопку, яка програмно закриває вікно через root.destroy()."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Викликати mainloop() до створення віджетів",
      explanation: "mainloop() блокує виконання. Всі віджети мають бути створені до виклику mainloop().",
      correctApproach: "Створюйте всі віджети, потім викликайте root.mainloop() в кінці."
    },
    {
      mistake: "Забути викликати mainloop()",
      explanation: "Без mainloop() вікно не відобразиться або закриється одразу.",
      correctApproach: "Завжди викликайте root.mainloop() в кінці програми."
    },
    {
      mistake: "Неправильний формат geometry",
      explanation: "geometry('400x300') правильний, але geometry('400,300') або geometry(400, 300) викличе помилку.",
      correctApproach: "Використовуйте рядок у форматі 'ширинаxвисота': root.geometry('400x300')"
    },
    {
      mistake: "Спроба змінити вікно після mainloop()",
      explanation: "Код після mainloop() виконається тільки після закриття вікна.",
      correctApproach: "Всі зміни вікна та віджетів мають бути до виклику mainloop()."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **tk.Tk()** — створення головного вікна
2. **root.title()** — встановлення заголовка
3. **root.geometry()** — встановлення розмірів та позиції
4. **root.minsize() / maxsize()** — обмеження розмірів
5. **root.mainloop()** — запуск головного циклу подій
6. **root.destroy()** — програмне закриття вікна

Тепер ви можете створювати та налаштовувати вікна Tkinter!`,
  
  practiceTask: {
    title: "Налаштування вікна",
    description: "Створіть вікно з різними налаштуваннями",
    problemStatement: `Створіть програму, яка:
1. Створює вікно з заголовком "Мій додаток"
2. Встановлює розміри 500x400 пікселів
3. Встановлює мінімальні розміри 300x200
4. Розміщує вікно на позиції 200x100 від лівого верхнього кута
5. Додає кнопку "Закрити", яка закриває вікно`,
    inputFormat: "Програма не потребує введення",
    outputFormat: `Вікно з:
- Заголовком "Мій додаток"
- Розмірами 500x400
- Позицією 200x100
- Кнопкою "Закрити"`,
    examples: [
      {
        input: "Немає введення",
        output: "Вікно з налаштуваннями та кнопкою закриття",
        explanation: "Програма демонструє різні способи налаштування вікна"
      }
    ],
    solution: {
      code: `import tkinter as tk

def close_window():
    root.destroy()

# Створення вікна
root = tk.Tk()
root.title("Мій додаток")

# Розміри та позиція (ширинаxвисота+x+y)
root.geometry("500x400+200+100")

# Мінімальні розміри
root.minsize(300, 200)

# Кнопка закриття
close_button = tk.Button(root, text="Закрити", command=close_window)
close_button.pack(pady=50)

# Запуск головного циклу
root.mainloop()`,
      explanation: "Створює вікно з усіма налаштуваннями: розміри, позиція, обмеження та кнопка закриття."
    },
    hints: [
      "Використовуйте geometry('500x400+200+100') для розмірів та позиції",
      "minsize() встановлює мінімальні розміри",
      "Створіть функцію close_window() з root.destroy()",
      "Підключіть функцію до кнопки через command="
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить tk.Tk()?",
        options: ["Закриває вікно", "Створює головне вікно", "Додає віджет", "Запускає цикл"],
        correctAnswer: 1,
        explanation: "tk.Tk() створює об'єкт головного вікна Tkinter додатку."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що означає root.geometry('400x300+100+50')?",
        options: ["Розміри 400x300, позиція невідома", "Розміри 400x300, позиція 100x50", "Розміри 400x300, позиція +100 від лівого, +50 від верху", "Помилку"],
        correctAnswer: 2,
        explanation: "Формат: 'ширинаxвисота+x+y', де x та y — відстань від лівого верхнього кута екрана."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли виконується код після mainloop()?",
        options: ["Одразу", "Після закриття вікна", "Ніколи", "Під час роботи вікна"],
        correctAnswer: 1,
        explanation: "mainloop() блокує виконання. Код після нього виконається тільки після закриття вікна."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Всі віджети мають бути створені до виклику mainloop().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Оскільки mainloop() блокує виконання, всі віджети мають бути створені до його виклику."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

