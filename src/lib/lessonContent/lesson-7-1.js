/**
 * Lesson 7-1: Модуль math, random
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_1 = {
  lessonId: "lesson-7-1",
  moduleId: "module-7",
  order: 1,
  title: "Модуль math, random",
  
  learningObjectives: [
    "Використовувати математичні функції",
    "Генерувати випадкові числа",
    "Застосовувати math для обчислень",
    "Працювати з random для ігор та симуляцій",
    "Розуміти різницю між math та random"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-6-12"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Модуль math",
        content: `**math** — модуль для математичних обчислень.

**Імпорт:**
\`\`\`python
import math
\`\`\`

**Основні функції:**

**1. Константи:**
\`\`\`python
import math

print(math.pi)    # 3.141592653589793
print(math.e)     # 2.718281828459045
print(math.tau)   # 6.283185307179586 (2 * pi)
\`\`\`

**2. Тригонометричні функції:**
\`\`\`python
import math

angle = math.pi / 4  # 45 градусів в радіанах
print(math.sin(angle))   # 0.707...
print(math.cos(angle))   # 0.707...
print(math.tan(angle))   # 1.0
\`\`\`

**3. Степінь та корінь:**
\`\`\`python
import math

print(math.pow(2, 3))    # 8.0 (2^3)
print(math.sqrt(16))     # 4.0 (√16)
print(math.exp(2))       # 7.389... (e^2)
\`\`\`

**4. Округлення:**
\`\`\`python
import math

print(math.ceil(4.3))    # 5 (округлення вгору)
print(math.floor(4.7))   # 4 (округлення вниз)
print(math.trunc(4.7))   # 4 (відсікання дробової частини)
\`\`\`

**5. Логарифми:**
\`\`\`python
import math

print(math.log(10))      # 2.302... (натуральний логарифм)
print(math.log10(100))   # 2.0 (логарифм за основою 10)
print(math.log2(8))      # 3.0 (логарифм за основою 2)
\`\`\``
      },
      {
        title: "Модуль random",
        content: `**random** — модуль для генерації випадкових чисел.

**Імпорт:**
\`\`\`python
import random
\`\`\`

**Основні функції:**

**1. Випадкові числа:**
\`\`\`python
import random

print(random.random())        # Випадкове число від 0.0 до 1.0
print(random.randint(1, 10))  # Випадкове ціле від 1 до 10 (включно)
print(random.uniform(1, 10))  # Випадкове float від 1 до 10
\`\`\`

**2. Випадковий вибір:**
\`\`\`python
import random

items = ["яблуко", "банан", "апельсин"]
print(random.choice(items))        # Випадковий елемент
print(random.choices(items, k=2))  # Список з 2 випадкових елементів (з повторенням)
print(random.sample(items, 2))     # Список з 2 унікальних елементів (без повторення)
\`\`\`

**3. Перемішування:**
\`\`\`python
import random

numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)  # Перемішує список на місці
print(numbers)  # [3, 1, 5, 2, 4] (випадковий порядок)
\`\`\`

**4. Seed (для відтворюваності):**
\`\`\`python
import random

random.seed(42)  # Встановлює початкове значення
print(random.randint(1, 10))  # Завжди однакове при seed(42)
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Обчислення площі кола**
\`\`\`python
import math

def circle_area(radius):
    return math.pi * radius ** 2

print(circle_area(5))  # 78.54...
\`\`\`

**Приклад 2: Генератор паролів**
\`\`\`python
import random
import string

def generate_password(length=8):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

print(generate_password(12))
\`\`\`

**Приклад 3: Симуляція кидка кубика**
\`\`\`python
import random

def roll_dice():
    return random.randint(1, 6)

# Симуляція 10 кидків
results = [roll_dice() for _ in range(10)]
print(f"Результати: {results}")
print(f"Середнє: {sum(results) / len(results):.2f}")
\`\`\`

**Приклад 4: Обчислення відстані між точками**
\`\`\`python
import math

def distance(x1, y1, x2, y2):
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

print(distance(0, 0, 3, 4))  # 5.0
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Математичні обчислення",
      code: `import math

# Обчислення площі кола
radius = 5
area = math.pi * radius ** 2
print(f"Площа кола з радіусом {radius}: {area:.2f}")

# Обчислення гіпотенузи
a, b = 3, 4
hypotenuse = math.sqrt(a**2 + b**2)
print(f"Гіпотенуза: {hypotenuse}")`,
      explanation: "Демонструє використання math для математичних обчислень."
    },
    {
      title: "Приклад 2: Генерація випадкових чисел",
      code: `import random

# Випадкове число від 1 до 100
number = random.randint(1, 100)
print(f"Випадкове число: {number}")

# Випадковий вибір зі списку
colors = ["червоний", "синій", "зелений", "жовтий"]
chosen = random.choice(colors)
print(f"Випадковий колір: {chosen}")`,
      explanation: "Показує генерацію випадкових чисел та вибір."
    },
    {
      title: "Приклад 3: Комбінація math та random",
      code: `import math
import random

# Генерація випадкових координат на колі
def random_point_on_circle(radius):
    angle = random.uniform(0, 2 * math.pi)
    x = radius * math.cos(angle)
    y = radius * math.sin(angle)
    return (x, y)

point = random_point_on_circle(5)
print(f"Випадкова точка на колі: ({point[0]:.2f}, {point[1]:.2f})")`,
      explanation: "Демонструє комбінацію math та random."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між random.random() та random.randint()",
      explanation: "random.random() повертає float від 0.0 до 1.0, random.randint() повертає int у діапазоні.",
      correctApproach: "Використовуйте random.random() для float, random.randint(a, b) для цілих чисел у діапазоні [a, b]."
    },
    {
      mistake: "Забути імпортувати math або random",
      explanation: "Без імпорту модулів функції недоступні.",
      correctApproach: "Завжди імпортуйте модулі: import math, import random."
    },
    {
      mistake: "Використання градусів замість радіанів",
      explanation: "Тригонометричні функції math працюють з радіанами, не градусами.",
      correctApproach: "Конвертуйте градуси в радіани: math.radians(degrees) або використовуйте math.degrees() для зворотної конвертації."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Модуль math** — математичні функції та константи
2. **Константи** — pi, e, tau
3. **Тригонометричні функції** — sin, cos, tan
4. **Степінь та корінь** — pow, sqrt, exp
5. **Округлення** — ceil, floor, trunc
6. **Модуль random** — генерація випадкових чисел
7. **Випадкові числа** — random(), randint(), uniform()
8. **Випадковий вибір** — choice(), choices(), sample()
9. **Перемішування** — shuffle()

**Важливо:**
- math для математичних обчислень
- random для випадковості
- Тригонометрія працює з радіанами

Модулі math та random — потужні інструменти для обчислень та симуляцій!`,
  
  practiceTask: {
    title: "Створення математичного калькулятора та генератора",
    description: "Створіть калькулятор з math та генератор з random",
    problemStatement: `Створіть програму з двома частинами:

**Частина 1: Математичний калькулятор (використовуйте math)**
Функції:
- calculate_circle_area(radius) — площа кола
- calculate_distance(x1, y1, x2, y2) — відстань між точками
- calculate_hypotenuse(a, b) — гіпотенуза прямокутного трикутника
- calculate_factorial(n) — факторіал (використовуйте math.factorial)
- convert_degrees_to_radians(degrees) — конвертація градусів в радіани

**Частина 2: Генератор випадкових даних (використовуйте random)**
Функції:
- generate_random_password(length) — випадковий пароль (літери + цифри)
- roll_dice() — кидок кубика (1-6)
- pick_random_student(students) — випадковий студент зі списку
- generate_lottery_numbers(count, max_number) — лотерейні номери (унікальні)
- shuffle_deck(cards) — перемішування колоди карт

**Головне меню:**
1. Математичні обчислення
2. Генерація випадкових даних
0. Вихід

**Створіть програму та продемонструйте всі функції.**`,
    inputFormat: "Створіть програму з меню та функціями",
    outputFormat: `Приклад виведення:
=== Математичний калькулятор та генератор ===
1. Математичні обчислення
2. Генерація випадкових даних
0. Вихід

Виберіть дію: 1
Площа кола (радіус 5): 78.54
Відстань між (0,0) та (3,4): 5.0`,
    examples: [
      {
        input: "Математичні обчислення",
        output: "Результати обчислень",
        explanation: "Демонстрація math модуля"
      }
    ],
    solution: {
      code: `import math
import random
import string

# ===== МАТЕМАТИЧНІ ФУНКЦІЇ =====
def calculate_circle_area(radius):
    """Обчислює площу кола."""
    return math.pi * radius ** 2

def calculate_distance(x1, y1, x2, y2):
    """Обчислює відстань між двома точками."""
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

def calculate_hypotenuse(a, b):
    """Обчислює гіпотенузу прямокутного трикутника."""
    return math.sqrt(a**2 + b**2)

def calculate_factorial(n):
    """Обчислює факторіал числа."""
    return math.factorial(n)

def convert_degrees_to_radians(degrees):
    """Конвертує градуси в радіани."""
    return math.radians(degrees)

# ===== ГЕНЕРАТОРИ =====
def generate_random_password(length=8):
    """Генерує випадковий пароль."""
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def roll_dice():
    """Симулює кидок кубика."""
    return random.randint(1, 6)

def pick_random_student(students):
    """Вибирає випадкового студента."""
    return random.choice(students)

def generate_lottery_numbers(count=6, max_number=49):
    """Генерує унікальні лотерейні номери."""
    return sorted(random.sample(range(1, max_number + 1), count))

def shuffle_deck(cards):
    """Перемішує колоду карт."""
    shuffled = cards.copy()
    random.shuffle(shuffled)
    return shuffled

# ===== МЕНЮ =====
def математичні_обчислення():
    """Меню математичних обчислень."""
    print("\\n=== Математичні обчислення ===")
    print("1. Площа кола")
    print("2. Відстань між точками")
    print("3. Гіпотенуза")
    print("4. Факторіал")
    print("5. Конвертація градусів в радіани")
    
    вибір = input("Виберіть операцію: ")
    
    if вибір == "1":
        radius = float(input("Введіть радіус: "))
        area = calculate_circle_area(radius)
        print(f"Площа кола: {area:.2f}")
    elif вибір == "2":
        x1, y1 = map(float, input("Точка 1 (x y): ").split())
        x2, y2 = map(float, input("Точка 2 (x y): ").split())
        dist = calculate_distance(x1, y1, x2, y2)
        print(f"Відстань: {dist:.2f}")
    elif вибір == "3":
        a, b = map(float, input("Катети (a b): ").split())
        hyp = calculate_hypotenuse(a, b)
        print(f"Гіпотенуза: {hyp:.2f}")
    elif вибір == "4":
        n = int(input("Введіть число: "))
        fact = calculate_factorial(n)
        print(f"Факторіал {n}: {fact}")
    elif вибір == "5":
        degrees = float(input("Введіть градуси: "))
        radians = convert_degrees_to_radians(degrees)
        print(f"{degrees}° = {radians:.4f} радіан")

def генерація_випадкових_даних():
    """Меню генерації випадкових даних."""
    print("\\n=== Генерація випадкових даних ===")
    print("1. Генератор паролів")
    print("2. Кидок кубика")
    print("3. Випадковий студент")
    print("4. Лотерейні номери")
    print("5. Перемішування колоди")
    
    вибір = input("Виберіть операцію: ")
    
    if вибір == "1":
        length = int(input("Довжина пароля: "))
        password = generate_random_password(length)
        print(f"Пароль: {password}")
    elif вибір == "2":
        result = roll_dice()
        print(f"Випало: {result}")
    elif вибір == "3":
        students = ["Олександр", "Марія", "Дмитро", "Анна"]
        chosen = pick_random_student(students)
        print(f"Випадковий студент: {chosen}")
    elif вибір == "4":
        count = int(input("Кількість номерів: "))
        numbers = generate_lottery_numbers(count)
        print(f"Лотерейні номери: {numbers}")
    elif вибір == "5":
        cards = ["Туз", "Король", "Дама", "Валет", "10", "9", "8", "7"]
        shuffled = shuffle_deck(cards)
        print(f"Перемішана колода: {shuffled}")

def головне_меню():
    """Головне меню програми."""
    while True:
        print("\\n=== Математичний калькулятор та генератор ===")
        print("1. Математичні обчислення")
        print("2. Генерація випадкових даних")
        print("0. Вихід")
        
        вибір = input("Виберіть дію: ")
        
        if вибір == "1":
            математичні_обчислення()
        elif вибір == "2":
            генерація_випадкових_даних()
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір!")

if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє використання math та random модулів у практичній програмі."
    },
    hints: [
      "Використовуйте math.pi для площі кола",
      "Використовуйте math.sqrt() для кореня",
      "Використовуйте random.choice() для випадкового вибору",
      "Використовуйте random.sample() для унікальних елементів"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає random.random()?",
        options: ["Ціле число", "Float від 0.0 до 1.0", "Список", "Словник"],
        correctAnswer: 1,
        explanation: "random.random() повертає випадкове float число від 0.0 до 1.0."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: import math; print(math.sqrt(16))?",
        options: ["4.0", "4", "16", "Помилку"],
        correctAnswer: 0,
        explanation: "math.sqrt(16) обчислює квадратний корінь з 16, що дорівнює 4.0 (float)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка функція генерує випадкове ціле число в діапазоні?",
        options: ["random.random()", "random.randint(a, b)", "random.choice()", "random.shuffle()"],
        correctAnswer: 1,
        explanation: "random.randint(a, b) генерує випадкове ціле число від a до b включно."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
