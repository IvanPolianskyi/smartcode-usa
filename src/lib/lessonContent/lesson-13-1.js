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
        title: "Вступ до GUI",
        content: `**GUI (Graphical User Interface)** - це графічний інтерфейс користувача, який дозволяє взаємодіяти з програмою через вікна, кнопки, поля введення та інші візуальні елементи замість текстового інтерфейсу командного рядка.

**Переваги GUI:**
- Зручність використання - інтуїтивний інтерфейс
- Візуальна привабливість - приємний зовнішній вигляд
- Доступність - легше для новачків
- Інтерактивність - миттєва реакція на дії користувача

**Що таке Tkinter?**

**Tkinter** - це стандартна бібліотека Python для створення графічних інтерфейсів користувача. Вона постачається разом з Python, тому не потрібно встановлювати додаткові пакети.

**Переваги Tkinter:**
- Вбудована в Python - не потрібно встановлювати
- Простота використання - легка для початківців
- Крос-платформенність - працює на Windows, macOS, Linux
- Велика спільнота - багато прикладів та документації

**Архітектура GUI додатків:**

1. **Головне вікно (Root Window)** - базовий контейнер для всіх елементів
2. **Віджети (Widgets)** - елементи інтерфейсу (кнопки, поля введення, мітки тощо)
3. **Події (Events)** - дії користувача (клік, натискання клавіші)
4. **Обробники подій (Event Handlers)** - функції, які виконуються при подіях

**Основні віджети Tkinter:**
- **Label** - для відображення тексту
- **Button** - кнопка для виконання дій
- **Entry** - поле введення тексту
- **Text** - багаторядкове текстове поле
- **Frame** - контейнер для групування віджетів
- **Canvas** - для малювання графіки

**Підготовка середовища:**

Tkinter вже встановлений разом з Python, тому додаткового встановлення не потрібно. Просто імпортуйте модуль:

\`\`\`python
from tkinter import *
\`\`\`

або

\`\`\`python
import tkinter as tk
\`\`\`

**Примітка:** На деяких Linux системах може знадобитися встановити пакет \`python3-tk\`:

\`\`\`bash
sudo apt-get install python3-tk
\`\`\`

Тепер ви готові створювати свої перші GUI-додатки!`
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
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
