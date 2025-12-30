/**
 * Lesson 8-6: Практика: GUI-застосунок на Tkinter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson8_6 = {
  lessonId: "lesson-8-6",
  moduleId: "module-8",
  order: 6,
  title: "Практика: GUI-застосунок на Tkinter",
  
  learningObjectives: [
    "Створити повноцінний GUI-додаток",
    "Застосувати всі набуті знання Tkinter",
    "Реалізувати інтерактивність",
    "Створити корисний додаток"
  ],
  
  estimatedTime: 150,
  prerequisites: ["lesson-8-5"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `На цьому уроці ми створимо **Калькулятор з GUI** — повноцінний додаток, який об'єднує всі знання з Tkinter.

**Функціональність:**
- Графічний інтерфейс з кнопками
- Відображення введених чисел та операцій
- Виконання обчислень
- Обробка помилок
- Очищення екрана

**Що ми використаємо:**
- **Tk()** — створення вікна
- **Label** — відображення результату
- **Button** — кнопки для цифр та операцій
- **grid()** — розміщення кнопок у сітці
- **command** — обробка натискань кнопок
- **Логіка обчислень** — обробка математичних операцій`
      },
      {
        title: "Планування структури",
        content: `**Структура додатку:**

1. **Вікно** — головне вікно з налаштуваннями
2. **Екран** — Label для відображення чисел та результатів
3. **Кнопки цифр** — 0-9 для введення чисел
4. **Кнопки операцій** — +, -, *, /, =
5. **Службові кнопки** — C (очистити), CE (очистити введення)

**Розміщення:**
- Екран — верхня частина (grid row=0, columnspan=4)
- Кнопки — сітка 4x5 (grid)
- Цифри — 3x3 сітка + 0
- Операції — правий стовпець

**Логіка:**
- Зберігати поточне число
- Зберігати попереднє число
- Зберігати операцію
- Обчислювати результат при натисканні =`
      },
      {
        title: "Реалізація логіки",
        content: `**Змінні стану:**

\`\`\`python
current = "0"      # Поточне число (рядок)
previous = None    # Попереднє число
operation = None   # Операція (+, -, *, /)
\`\`\`

**Функції:**

1. **click_number()** — додає цифру до поточного числа
2. **click_operation()** — зберігає операцію та попереднє число
3. **calculate()** — виконує обчислення
4. **clear()** — очищає все
5. **update_display()** — оновлює екран

**Приклад логіки:**

\`\`\`python
def click_number(num):
    global current
    if current == "0":
        current = str(num)
    else:
        current += str(num)
    update_display()

def click_operation(op):
    global previous, operation, current
    if previous is None:
        previous = float(current)
    else:
        calculate()
    operation = op
    current = "0"
\`\`\``
      },
      {
        title: "Покращення додатку",
        content: `**Додаткові функції:**

1. **Обробка помилок** — ділення на нуль
2. **Десяткові числа** — кнопка "."
3. **Від'ємні числа** — кнопка "+/-"
4. **Відображення** — форматування великих чисел
5. **Клавіатура** — підтримка введення з клавіатури

**Стилізація:**
- Різні кольори для цифр та операцій
- Великий шрифт для екрана
- Зручні розміри кнопок
- Візуальна відповідь на натискання

**Розширення:**
- Додаткові операції (√, x², %)
- Історія обчислень
- Збереження налаштувань
- Темна тема`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базова структура калькулятора",
      code: `import tkinter as tk

class Calculator:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Калькулятор")
        self.root.geometry("300x400")
        
        self.current = "0"
        self.previous = None
        self.operation = None
        
        self.create_widgets()
        
    def create_widgets(self):
        # Екран
        self.display = tk.Label(self.root, text="0", font=("Arial", 24), 
                               bg="white", anchor="e", relief="sunken")
        self.display.grid(row=0, column=0, columnspan=4, sticky="ew", padx=5, pady=5)
        
        # Кнопки (спрощена версія)
        buttons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', 'C', '=', '+']
        ]
        
        for i, row in enumerate(buttons):
            for j, text in enumerate(row):
                btn = tk.Button(self.root, text=text, width=5, height=2)
                btn.grid(row=i+1, column=j, padx=2, pady=2)
        
    def run(self):
        self.root.mainloop()

calc = Calculator()
calc.run()`,
      explanation: "Базова структура калькулятора з вікном, екраном та кнопками."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не оновлювати екран після змін",
      explanation: "Якщо не викликати update_display(), екран не покаже зміни.",
      correctApproach: "Завжди викликайте update_display() після зміни current."
    },
    {
      mistake: "Не обробляти ділення на нуль",
      explanation: "Ділення на нуль викличе помилку ZeroDivisionError.",
      correctApproach: "Додайте перевірку: if num2 == 0: return 'Помилка'"
    },
    {
      mistake: "Плутанина між рядками та числами",
      explanation: "current має бути рядком для відображення, але для обчислень потрібно float().",
      correctApproach: "Використовуйте float(current) для обчислень, str() для відображення."
    }
  ],
  
  summary: `На цьому проекті ми:

1. **Створили повноцінний GUI-додаток** — калькулятор
2. **Застосували всі знання Tkinter** — вікна, віджети, події, розміщення
3. **Реалізували логіку** — обчислення, обробка стану
4. **Додали інтерактивність** — кнопки, оновлення екрана

Це перший повноцінний GUI-додаток, який демонструє практичне застосування Tkinter!`,
  
  practiceTask: {
    title: "Калькулятор з GUI",
    description: "Створіть повноцінний графічний калькулятор",
    problemStatement: `Створіть калькулятор, який:
1. Має екран для відображення чисел та результатів
2. Має кнопки цифр 0-9
3. Має кнопки операцій: +, -, *, /, =
4. Має кнопку C для очищення
5. Виконує обчислення правильно
6. Обробляє помилки (ділення на нуль)
7. Має красиве оформлення`,
    inputFormat: "Користувач натискає кнопки",
    outputFormat: "Екран показує введені числа та результати обчислень",
    examples: [
      {
        input: "Натискання: 5, +, 3, =",
        output: "Екран показує: 8",
        explanation: "Калькулятор виконує обчислення 5 + 3 = 8"
      }
    ],
    solution: {
      code: `import tkinter as tk

class Calculator:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Калькулятор")
        self.root.geometry("300x450")
        self.root.resizable(False, False)
        
        self.current = "0"
        self.previous = None
        self.operation = None
        
        self.create_widgets()
        
    def create_widgets(self):
        # Екран
        self.display = tk.Label(self.root, text="0", font=("Arial", 28), 
                               bg="#f0f0f0", fg="black", anchor="e", 
                               relief="sunken", padx=10, pady=20)
        self.display.grid(row=0, column=0, columnspan=4, sticky="ew", padx=5, pady=5)
        
        # Кнопки
        buttons = [
            ['C', 'CE', '/', '*'],
            ['7', '8', '9', '-'],
            ['4', '5', '6', '+'],
            ['1', '2', '3', '='],
            ['0', '.', '=', '=']
        ]
        
        for i, row in enumerate(buttons):
            for j, text in enumerate(row):
                if text == '=' and (i, j) != (4, 2):
                    continue
                if text == '=' and (i, j) == (4, 2):
                    btn = tk.Button(self.root, text=text, width=5, height=2,
                                  font=("Arial", 14), bg="#4CAF50", fg="white",
                                  command=lambda: self.calculate())
                    btn.grid(row=i+1, column=j, columnspan=2 if j == 2 else 1, 
                           sticky="ew", padx=2, pady=2)
                elif text in ['+', '-', '*', '/']:
                    btn = tk.Button(self.root, text=text, width=5, height=2,
                                  font=("Arial", 14), bg="#FF9800", fg="white",
                                  command=lambda t=text: self.click_operation(t))
                    btn.grid(row=i+1, column=j, padx=2, pady=2)
                elif text == 'C':
                    btn = tk.Button(self.root, text=text, width=5, height=2,
                                  font=("Arial", 14), bg="#f44336", fg="white",
                                  command=self.clear)
                    btn.grid(row=i+1, column=j, padx=2, pady=2)
                elif text == 'CE':
                    btn = tk.Button(self.root, text=text, width=5, height=2,
                                  font=("Arial", 14), bg="#f44336", fg="white",
                                  command=self.clear_entry)
                    btn.grid(row=i+1, column=j, padx=2, pady=2)
                elif text == '.':
                    btn = tk.Button(self.root, text=text, width=5, height=2,
                                  font=("Arial", 14), command=lambda: self.click_number('.'))
                    btn.grid(row=i+1, column=j, padx=2, pady=2)
                else:
                    btn = tk.Button(self.root, text=text, width=5, height=2,
                                  font=("Arial", 14), command=lambda t=text: self.click_number(t))
                    btn.grid(row=i+1, column=j, padx=2, pady=2)
        
        # Налаштування grid
        for i in range(4):
            self.root.grid_columnconfigure(i, weight=1)
            
    def update_display(self):
        self.display.config(text=self.current)
        
    def click_number(self, num):
        if self.current == "0":
            self.current = str(num)
        else:
            self.current += str(num)
        self.update_display()
        
    def click_operation(self, op):
        if self.previous is None:
            self.previous = float(self.current)
        else:
            self.calculate()
        self.operation = op
        self.current = "0"
        
    def calculate(self):
        if self.previous is None or self.operation is None:
            return
            
        try:
            num2 = float(self.current)
            if self.operation == '+':
                result = self.previous + num2
            elif self.operation == '-':
                result = self.previous - num2
            elif self.operation == '*':
                result = self.previous * num2
            elif self.operation == '/':
                if num2 == 0:
                    self.current = "Помилка!"
                    self.previous = None
                    self.operation = None
                    self.update_display()
                    return
                result = self.previous / num2
            
            self.current = str(result)
            self.previous = None
            self.operation = None
            self.update_display()
        except:
            self.current = "Помилка!"
            self.update_display()
            
    def clear(self):
        self.current = "0"
        self.previous = None
        self.operation = None
        self.update_display()
        
    def clear_entry(self):
        self.current = "0"
        self.update_display()
        
    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    calc = Calculator()
    calc.run()`,
      explanation: "Повноцінний калькулятор з GUI, який виконує всі базові операції та обробляє помилки."
    },
    hints: [
      "Використовуйте grid() для розміщення кнопок у сітці",
      "Зберігайте стан у змінних current, previous, operation",
      "Оновлюйте екран через update_display()",
      "Обробляйте ділення на нуль",
      "Використовуйте lambda для передачі параметрів у command"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод розміщення найкраще для калькулятора?",
        options: ["pack()", "grid()", "place()", "Всі однаково"],
        correctAnswer: 1,
        explanation: "grid() ідеально підходить для калькулятора, оскільки кнопки розташовані у сітці."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо обробляти ділення на нуль?",
        options: ["Це викличе помилку", "Це неважливо", "Це покращить швидкість", "Це не потрібно"],
        correctAnswer: 0,
        explanation: "Ділення на нуль викличе ZeroDivisionError, тому потрібно додати перевірку та обробку помилки."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

