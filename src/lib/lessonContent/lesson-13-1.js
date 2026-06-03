/**
 * Lesson 13-1: Вступ до GUI. Що таке Tkinter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_1 = {
  lessonId: "lesson-13-1",
  moduleId: "module-13",
  order: 1,
  title: "Вступ до GUI. Що таке Tkinter",
  
  learningObjectives: [
    "Розуміти, що таке GUI",
    "Ознайомитися з Tkinter",
    "Зрозуміти архітектуру GUI додатків",
    "Підготувати середовище для роботи"
  ],
  
  prerequisites: ["lesson-12-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке GUI",
        content: `**GUI (Graphical User Interface)** — графічний інтерфейс: вікна, кнопки, поля вводу замість лише текстових команд у терміналі.

**Коли GUI доречний:**

- Настільні утиліти для непрограмістів
- Прототипи внутрішніх інструментів
- Навчальні демо після CLI та веб-модулів

**CLI vs GUI:**

| CLI | GUI |
|-----|-----|
| Швидко автоматизувати | Зручно «клацати» |
| Скрипти, сервери | Настільні програми |
| Менше коду для простих задач | Більше коду для верстки |

У промислових продуктах часто обирають **веб** (React) або **мобільні** застосунки; Tkinter — чудовий **перший крок** у GUI на Python.`
      },
      {
        title: "Tkinter у екосистемі Python",
        content: `**Tkinter** — стандартна прив'язка до бібліотеки Tcl/Tk, йде з Python.

**Переваги для курсу:**

- Не потрібен \`pip install\` (на Windows/macOS)
- Малий поріг входу
- Один файл \`main.py\` — і вікно вже є

**Альтернативи (огляд):**

- **PyQt / PySide** — потужні, важчі ліцензії/розмір
- **Kivy** — мобільні та touch
- **Dear PyGui** — ігри та візуалізації

Для модуля 13 достатньо Tkinter.`
      },
      {
        title: "Архітектура GUI-додатку",
        content: `Типовий цикл:

1. **Root** (\`Tk()\`) — головне вікно
2. **Віджети** — Label, Button, Entry…
3. **Геометрія** — pack / grid / place (урок 13-4)
4. **mainloop()** — цикл подій: кліки, введення, перемальовка
5. **Callbacks** — функції на події (урок 13-5)

\`\`\`python
import tkinter as tk

def on_click():
    label.config(text="Натиснуто!")

root = tk.Tk()
label = tk.Label(root, text="Привіт")
label.pack()
btn = tk.Button(root, text="OK", command=on_click)
btn.pack()
root.mainloop()
\`\`\`

Поки \`mainloop()\` працює — програма «жива»; код після нього виконається лише після закриття вікна.`
      },
      {
        title: "Основні віджети",
        content: `| Віджет | Призначення |
|--------|-------------|
| Label | Текст або картинка |
| Button | Кнопка, \`command=callback\` |
| Entry | Один рядок вводу |
| Text | Багаторядковий ввід |
| Frame | Групування віджетів |
| Canvas | Малювання, кастомна графіка |
| Listbox | Список рядків |
| Menu | Меню вікна |

Уроки 13-3–13-5 розберуть Label, Button, Entry, Text та обробку подій детальніше.`
      },
      {
        title: "Імпорт та Linux",
        content: `Рекомендований стиль:

\`\`\`python
import tkinter as tk
from tkinter import ttk  # теми «під Windows 10»
\`\`\`

Уникайте \`from tkinter import *\` у великих проєктах — засмічує простір імен.

**Linux:** якщо \`ModuleNotFoundError: tkinter\`:

\`\`\`bash
sudo apt install python3-tk
\`\`\`

**Перевірка:**

\`\`\`python
import tkinter
print(tkinter.TkVersion)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `GUI — візуальна взаємодія; Tkinter — вбудований старт. Далі: \`Tk()\`, \`mainloop()\`, налаштування вікна (урок 13-2), віджети та розміщення.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Імпорт Tkinter",
      code: `from tkinter import *`,
      explanation: "Імпортуємо всі класи та функції з модуля tkinter. Це найпростіший спосіб для початківців."
    },
    {
      title: "Альтернативний імпорт",
      code: `import tkinter as tk`,
      explanation: "Альтернативний спосіб імпорту з префіксом tk. Дозволяє уникнути конфліктів імен."
    },
    {
      title: "Перевірка встановлення Tkinter",
      code: `import tkinter
print(tkinter.TkVersion)`,
      explanation: "Перевіряємо версію Tkinter. Якщо помилки немає, Tkinter встановлений правильно."
    },
    {
      title: "Простий приклад GUI",
      code: `from tkinter import *

# Створюємо головне вікно
root = Tk()
root.title("Мій перший GUI")

# Додаємо мітку з текстом
label = Label(root, text="Привіт, GUI!")
label.pack()

# Запускаємо головний цикл
root.mainloop()`,
      explanation: "Мінімальний приклад GUI-додатку. Створює вікно з текстом 'Привіт, GUI!'"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати mainloop()",
      explanation: "Без mainloop() вікно не відобразиться або закриється одразу після відкриття.",
      correctApproach: "Завжди викликайте root.mainloop() в кінці програми для відображення та підтримки вікна."
    },
    {
      mistake: "Імпорт через * замість as tk",
      explanation: "Імпорт через * може створити конфлікти імен з іншими модулями.",
      correctApproach: "Для великих проектів краще використовувати 'import tkinter as tk' для уникнення конфліктів."
    },
    {
      mistake: "Спроба використати Tkinter без встановлення на Linux",
      explanation: "На деяких Linux системах Tkinter не встановлений за замовчуванням.",
      correctApproach: "Встановіть python3-tk через пакетний менеджер: sudo apt-get install python3-tk"
    }
  ],
  
  summary: `На цьому уроці ми дізналися:

1. GUI - графічний інтерфейс користувача для зручної взаємодії
2. Tkinter - стандартна бібліотека Python для створення GUI
3. Архітектура GUI - головне вікно, віджети, події та обробники
4. Основні віджети - Label, Button, Entry, Text та інші
5. Підготовка - Tkinter вже встановлений з Python

У наступному уроці ми створимо наше перше вікно!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке GUI?",
        options: [
          "Графічний інтерфейс користувача",
          "Графічний інструмент для обробки",
          "Генератор унікальних ідентифікаторів",
          "Глобальний інтерфейс користувача"
        ],
        correctAnswer: 0,
        explanation: "GUI (Graphical User Interface) - це графічний інтерфейс користувача, який дозволяє взаємодіяти з програмою через візуальні елементи."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи потрібно встановлювати Tkinter окремо?",
        options: [
          "Ні, він встановлений разом з Python",
          "Так, потрібно встановити через pip",
          "Тільки на Windows",
          "Тільки на Linux"
        ],
        correctAnswer: 0,
        explanation: "Tkinter постачається разом з Python, тому додаткового встановлення не потрібно (окрім деяких Linux систем)."
      },
      {
        id: "q3",
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
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Tkinter працює тільки на Windows.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Tkinter є крос-платформенним і працює на Windows, macOS та Linux."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке віджет у Tkinter?",
        options: [
          "Елемент інтерфейсу (кнопка, поле введення тощо)",
          "Спеціальна функція",
          "Тип даних",
          "Модуль Python"
        ],
        correctAnswer: 0,
        explanation: "Віджет - це елемент інтерфейсу, такий як кнопка, поле введення, мітка тощо."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить mainloop()?",
        options: [
          "Запускає цикл обробки подій GUI",
          "Закриває вікно",
          "Встановлює заголовок",
          "Компілює .py у .exe"
        ],
        correctAnswer: 0,
        explanation: "mainloop() тримає вікно відкритим і обробляє кліки та введення."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
