/**
 * Lesson 07-3: Ітератори та протокол ітерації
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_3 = {
  lessonId: "lesson-07-3",
  moduleId: "module-07",
  order: 3,
  title: "Ітератори та протокол ітерації",
  
  learningObjectives: [
    "Розуміти протокол ітерації в Python",
    "Створювати власні ітератори",
    "Використовувати __iter__ та __next__",
    "Розуміти різницю між ітерабельними об'єктами та ітераторами"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-07-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке ітератори?",
        content: `Ітератор — це об'єкт, який дозволяє перебирати елементи послідовності по одному.

**Ключові поняття:**

1. **Ітерабельний об'єкт (Iterable)** — об'єкт, який можна перебрати (список, рядок, словник)
2. **Ітератор (Iterator)** — об'єкт, який фактично виконує ітерацію
3. **Протокол ітерації** — правила, які дозволяють об'єкту бути ітерабельним

**Як це працює:**

\`\`\`python
# Список — ітерабельний об'єкт
numbers = [1, 2, 3]

# Отримуємо ітератор
iterator = iter(numbers)

# Використовуємо ітератор
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
print(next(iterator))  # StopIteration
\`\`\`

**Вбудовані ітерабельні об'єкти:**

- Списки: \`[1, 2, 3]\`
- Рядки: \`"hello"\`
- Словники: \`{'a': 1, 'b': 2}\`
- range: \`range(10)\`
- Файли: \`open('file.txt')\`

**Цикл for автоматично:**

1. Викликає \`iter()\` для отримання ітератора
2. Викликає \`next()\` для отримання значень
3. Обробляє \`StopIteration\` для завершення`
      },
      {
        title: "Протокол ітерації",
        content: `Протокол ітерації — це набір методів, які об'єкт має реалізувати, щоб бути ітерабельним.

**Два методи протоколу:**

1. **__iter__()** — повертає ітератор
2. **__next__()** — повертає наступне значення або викликає StopIteration

**Простий ітератор:**

\`\`\`python
class CountDown:
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self  # Ітератор сам є ітератором
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Використання
counter = CountDown(5)
for num in counter:
    print(num)
# Виведе: 5, 4, 3, 2, 1
\`\`\`

**Як це працює:**

1. \`for num in counter:\` викликає \`iter(counter)\`
2. \`iter(counter)\` викликає \`counter.__iter__()\`
3. Кожна ітерація викликає \`next(counter)\`
4. \`next(counter)\` викликає \`counter.__next__()\`
5. Коли \`__next__()\` викликає \`StopIteration\`, цикл завершується`
      },
      {
        title: "Створення власного ітератора",
        content: `Давайте створимо кілька прикладів власних ітераторів:

**Приклад 1: Ітератор для чисел Фібоначчі**

\`\`\`python
class Fibonacci:
    def __init__(self, limit):
        self.limit = limit
        self.a, self.b = 0, 1
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return result

# Використання
fib = Fibonacci(10)
for num in fib:
    print(num)
# Виведе: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Приклад 2: Ітератор для діапазону з кроком**

\`\`\`python
class Range:
    def __init__(self, start, stop, step=1):
        self.start = start
        self.stop = stop
        self.step = step
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if (self.step > 0 and self.current >= self.stop) or \
           (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        result = self.current
        self.current += self.step
        return result

# Використання
my_range = Range(0, 10, 2)
for num in my_range:
    print(num)
# Виведе: 0, 2, 4, 6, 8
\`\`\`

**Приклад 3: Ітератор для обходу списку в зворотному порядку**

\`\`\`python
class ReverseList:
    def __init__(self, items):
        self.items = items
        self.index = len(items) - 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index < 0:
            raise StopIteration
        result = self.items[self.index]
        self.index -= 1
        return result

# Використання
rev = ReverseList([1, 2, 3, 4, 5])
for num in rev:
    print(num)
# Виведе: 5, 4, 3, 2, 1
\`\`\`
`
      },
      {
        title: "Різниця між ітерабельним об'єктом та ітератором",
        content: `Важливо розуміти різницю між ітерабельним об'єктом та ітератором:

**Ітерабельний об'єкт (Iterable):**

- Має метод \`__iter__()\`
- Може створити багато ітераторів
- Можна використати в циклі for багато разів

\`\`\`python
# Список — ітерабельний об'єкт
numbers = [1, 2, 3]

# Можна створити багато ітераторів
iter1 = iter(numbers)
iter2 = iter(numbers)

# Можна використати багато разів
for num in numbers:
    print(num)  # Перший раз
for num in numbers:
    print(num)  # Другий раз
\`\`\`

**Ітератор (Iterator):**

- Має методи \`__iter__()\` та \`__next__()\`
- Зазвичай вичерпується після одного використання
- Зберігає стан ітерації

\`\`\`python
# Ітератор
iterator = iter([1, 2, 3])

# Використовуємо один раз
for num in iterator:
    print(num)  # 1, 2, 3

# Другий раз — порожній
for num in iterator:
    print(num)  # Нічого не виведе
\`\`\`

**Генератори — це ітератори:**

\`\`\`python
def generator():
    yield 1
    yield 2
    yield 3

gen = generator()
print(hasattr(gen, '__iter__'))  # True
print(hasattr(gen, '__next__'))  # True

# Генератор вичерпується
for num in gen:
    print(num)  # 1, 2, 3
for num in gen:
    print(num)  # Нічого
\`\`\`
`
      },
      {
        title: "Функції iter() та next()",
        content: `Python надає вбудовані функції для роботи з ітераторами:

**iter() — отримання ітератора:**

\`\`\`python
# З ітерабельного об'єкта
numbers = [1, 2, 3]
iterator = iter(numbers)

# З функції (створює генератор)
def gen():
    yield 1
    yield 2

iterator = iter(gen())

# З рядка
text = "hello"
iterator = iter(text)
\`\`\`

**next() — отримання наступного значення:**

\`\`\`python
numbers = [1, 2, 3]
iterator = iter(numbers)

print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
print(next(iterator))  # StopIteration
\`\`\`

**next() з значенням за замовчуванням:**

\`\`\`python
iterator = iter([1, 2, 3])

# Використовуємо всі значення
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3

# Наступний виклик викличе StopIteration
# Але можна вказати значення за замовчуванням
print(next(iterator, 'Кінець'))  # 'Кінець'
\`\`\`

**Перевірка, чи є об'єкт ітерабельним:**

\`\`\`python
def is_iterable(obj):
    try:
        iter(obj)
        return True
    except TypeError:
        return False

print(is_iterable([1, 2, 3]))  # True
print(is_iterable("hello"))    # True
print(is_iterable(123))        # False
\`\`\`
`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Ітератор для парних чисел**

\`\`\`python
class EvenNumbers:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        result = self.current
        self.current += 2
        return result

# Використання
evens = EvenNumbers(10)
for num in evens:
    print(num)
# Виведе: 0, 2, 4, 6, 8
\`\`\`

**Приклад 2: Ітератор для квадратів**

\`\`\`python
class Squares:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        result = self.current ** 2
        self.current += 1
        return result

# Використання
squares = Squares(5)
for square in squares:
    print(square)
# Виведе: 1, 4, 9, 16, 25
\`\`\`

**Приклад 3: Ітератор з умовою**

\`\`\`python
class FilteredNumbers:
    def __init__(self, limit, condition):
        self.limit = limit
        self.condition = condition
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        while self.current < self.limit:
            if self.condition(self.current):
                result = self.current
                self.current += 1
                return result
            self.current += 1
        raise StopIteration

# Використання
# Тільки числа, які діляться на 3
filtered = FilteredNumbers(20, lambda x: x % 3 == 0)
for num in filtered:
    print(num)
# Виведе: 0, 3, 6, 9, 12, 15, 18
\`\`\`
`
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили ітератори та протокол ітерації:

**Ключові концепції:**

1. **Ітерабельний об'єкт** — об'єкт, який можна перебрати (має __iter__)
2. **Ітератор** — об'єкт, який виконує ітерацію (має __iter__ та __next__)
3. **Протокол ітерації** — методи __iter__() та __next__()
4. **StopIteration** — виняток, який сигналізує про кінець ітерації

**Створення власного ітератора:**

\`\`\`python
class MyIterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        # Логіка генерації значень
        if умова_завершення:
            raise StopIteration
        return значення
\`\`\`

**Функції:**

- \`iter(obj)\` — отримати ітератор
- \`next(iterator)\` — отримати наступне значення

**Наступний крок:**

У наступному уроці ми закріпимо всі знання про генератори та ітератори на практиці.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Простий ітератор",
      code: `class CountDown:
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        result = self.current
        self.current -= 1
        return result

# Використання
counter = CountDown(5)
for num in counter:
    print(num)
# Виведе: 5, 4, 3, 2, 1`,
      explanation: "Найпростіший приклад власного ітератора, який рахує вниз від start до 1."
    },
    {
      title: "Ітератор чисел Фібоначчі",
      code: `class Fibonacci:
    def __init__(self, limit):
        self.limit = limit
        self.a, self.b = 0, 1
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return result

# Використання
fib = Fibonacci(10)
for num in fib:
    print(num)
# Виведе: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34`,
      explanation: "Ітератор, який генерує числа Фібоначчі до заданого ліміту."
    },
    {
      title: "Використання iter() та next()",
      code: `numbers = [1, 2, 3]
iterator = iter(numbers)

print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
# print(next(iterator))  # StopIteration

# З значенням за замовчуванням
iterator = iter([1, 2])
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator, 'Кінець'))  # 'Кінець'`,
      explanation: "Демонструє використання функцій iter() та next() для роботи з ітераторами."
    },
    {
      title: "Різниця між ітерабельним та ітератором",
      code: `# Ітерабельний об'єкт (можна використати багато разів)
numbers = [1, 2, 3]

for num in numbers:
    print(num)  # 1, 2, 3
for num in numbers:
    print(num)  # 1, 2, 3 (знову)

# Ітератор (вичерпується)
iterator = iter([1, 2, 3])
for num in iterator:
    print(num)  # 1, 2, 3
for num in iterator:
    print(num)  # Нічого (вичерпано)`,
      explanation: "Показує різницю між ітерабельним об'єктом (можна використати багато разів) та ітератором (вичерпується)."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забування викликати StopIteration",
      explanation: "Якщо не викликати StopIteration, ітератор буде продовжувати повертати значення.",
      correctApproach: `# Неправильно:
def __next__(self):
    return self.current  # Завжди повертає одне значення

# Правильно:
def __next__(self):
    if self.current > self.limit:
        raise StopIteration
    return self.current`
    },
    {
      mistake: "Спроба використати ітератор кілька разів",
      explanation: "Ітератор вичерпується після першого використання.",
      correctApproach: `# Неправильно:
iterator = iter([1, 2, 3])
list1 = list(iterator)  # Використовує ітератор
list2 = list(iterator)  # Порожній! Ітератор вичерпано

# Правильно:
numbers = [1, 2, 3]
list1 = list(iter(numbers))  # Створюємо новий ітератор
list2 = list(iter(numbers))  # Створюємо новий ітератор`
    },
    {
      mistake: "Не реалізувати __iter__()",
      explanation: "Без __iter__() об'єкт не можна використати в циклі for.",
      correctApproach: `# Неправильно:
class MyIterator:
    def __next__(self):
        return 1

# Правильно:
class MyIterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        return 1`
    },
    {
      mistake: "Плутанина між ітерабельним об'єктом та ітератором",
      explanation: "Ітерабельний об'єкт має __iter__(), ітератор має __iter__() та __next__().",
      correctApproach: `# Ітерабельний об'єкт (створює новий ітератор кожного разу)
class Iterable:
    def __iter__(self):
        return Iterator()

# Ітератор (зберігає стан)
class Iterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        # Генерує значення
        pass`
    }
  ],
  
  summary: `На цьому уроці ми вивчили ітератори та протокол ітерації:

1. **Ітерабельні об'єкти та ітератори** — різниця та використання
2. **Протокол ітерації** — методи __iter__() та __next__()
3. **Створення власних ітераторів** — класи з реалізацією протоколу
4. **Функції iter() та next()** — робота з ітераторами
5. **StopIteration** — сигналізація про кінець ітерації

Ітератори — це основа роботи з послідовностями в Python. Розуміння протоколу ітерації дозволяє створювати потужні та ефективні об'єкти.`,
  
  practiceTask: {
    title: "Створення власних ітераторів",
    description: "Створіть кілька власних ітераторів з реалізацією протоколу ітерації",
    problemStatement: `Створіть три класи-ітератори:

1. **SquareIterator(limit)** — ітератор, який генерує квадрати чисел від 1 до limit
   - Приклад: для limit=5 має генерувати: 1, 4, 9, 16, 25

2. **EvenIterator(limit)** — ітератор, який генерує парні числа від 0 до limit
   - Приклад: для limit=10 має генерувати: 0, 2, 4, 6, 8, 10

3. **ReverseIterator(items)** — ітератор, який обходить список в зворотному порядку
   - Приклад: для [1, 2, 3, 4] має генерувати: 4, 3, 2, 1

**Вимоги:**
- Кожен клас має реалізувати методи __iter__() та __next__()
- __next__() має викликати StopIteration, коли значення закінчилися
- Протестуйте кожен ітератор, використовуючи цикл for
- Введіть значення напряму в коді (не використовуйте input())`,
    outputFormat: `Приклад виведення:

=== Квадрати чисел ===
1
4
9
16
25

=== Парні числа ===
0
2
4
6
8
10

=== Зворотний порядок ===
4
3
2
1`,
    examples: [
      {
        output: `=== Квадрати чисел ===
1
4
9
16
25

=== Парні числа ===
0
2
4
6
8
10

=== Зворотний порядок ===
4
3
2
1`,
        explanation: "Демонструє роботу всіх трьох ітераторів з різними параметрами."
      }
    ],
    solution: {
      code: `# 1. Ітератор квадратів
class SquareIterator:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        result = self.current ** 2
        self.current += 1
        return result

# 2. Ітератор парних чисел
class EvenIterator:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        result = self.current
        self.current += 2
        return result

# 3. Ітератор зворотного порядку
class ReverseIterator:
    def __init__(self, items):
        self.items = items
        self.index = len(items) - 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index < 0:
            raise StopIteration
        result = self.items[self.index]
        self.index -= 1
        return result

# Тестування
print("=== Квадрати чисел ===")
squares = SquareIterator(5)
for square in squares:
    print(square)

print()
print("=== Парні числа ===")
evens = EvenIterator(10)
for num in evens:
    print(num)

print()
print("=== Зворотний порядок ===")
reverse = ReverseIterator([1, 2, 3, 4])
for num in reverse:
    print(num)`,
      explanation: "Рішення створює три класи-ітератори, кожен з яких реалізує протокол ітерації через методи __iter__() та __next__(). Кожен ітератор зберігає свій стан та викликає StopIteration, коли значення закінчуються."
    },
    hints: [
      "Кожен клас має мати __init__ для ініціалізації стану",
      "Метод __iter__() має повертати self (ітератор сам є ітератором)",
      "Метод __next__() має перевіряти умову завершення та викликати raise StopIteration",
      "Для SquareIterator зберігайте поточне число та збільшуйте його",
      "Для EvenIterator збільшуйте current на 2",
      "Для ReverseIterator зберігайте індекс та зменшуйте його"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке ітератор?",
        options: [
          "Об'єкт, який дозволяє перебирати елементи по одному",
          "Список значень",
          "Функція для циклів",
          "Тип даних"
        ],
        correctAnswer: 0,
        explanation: "Ітератор — це об'єкт, який дозволяє перебирати елементи послідовності по одному через протокол ітерації."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Які методи має реалізувати ітератор?",
        options: [
          "__iter__() та __next__()",
          "Тільки __iter__()",
          "Тільки __next__()",
          "iter() та next()"
        ],
        correctAnswer: 0,
        explanation: "Ітератор має реалізувати обидва методи: __iter__() (повертає ітератор) та __next__() (повертає наступне значення)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\niterator = iter([1, 2, 3])\nfor x in iterator:\n    print(x)\nfor x in iterator:\n    print(x)\n```",
        options: [
          "1, 2, 3 (другий цикл нічого не виведе)",
          "1, 2, 3, 1, 2, 3",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Ітератор вичерпується після першого використання. Другий цикл не виведе нічого, оскільки ітератор вже вичерпано."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке StopIteration?",
        options: [
          "Виняток, який сигналізує про кінець ітерації",
          "Метод ітератора",
          "Функція для зупинки",
          "Тип даних"
        ],
        correctAnswer: 0,
        explanation: "StopIteration — це виняток, який викликається, коли ітератор не має більше значень для повернення."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить функція iter()?",
        options: [
          "Отримує ітератор з ітерабельного об'єкта",
          "Створює список",
          "Викликає помилку",
          "Зупиняє ітерацію"
        ],
        correctAnswer: 0,
        explanation: "Функція iter() отримує ітератор з ітерабельного об'єкта, викликаючи його метод __iter__()."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чим відрізняється ітерабельний об'єкт від ітератора?",
        options: [
          "Ітерабельний об'єкт має __iter__(), ітератор має __iter__() та __next__()",
          "Немає різниці",
          "Ітератор має __iter__(), ітерабельний об'єкт має __next__()",
          "Ітерабельний об'єкт не можна використати в циклі for"
        ],
        correctAnswer: 0,
        explanation: "Ітерабельний об'єкт має метод __iter__() і може створити ітератор. Ітератор має обидва методи __iter__() та __next__() і зберігає стан ітерації."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Генератор є ітератором.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "True. Генератор реалізує протокол ітерації (має __iter__() та __next__()), тому є ітератором."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що станеться, якщо не викликати StopIteration у __next__()?",
        options: [
          "Ітератор буде продовжувати повертати значення",
          "Виникне помилка",
          "Ітератор автоматично зупиниться",
          "Нічого не станеться"
        ],
        correctAnswer: 0,
        explanation: "Якщо не викликати StopIteration, ітератор буде продовжувати повертати значення, що може призвести до нескінченного циклу."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

