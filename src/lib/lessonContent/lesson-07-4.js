/**
 * Lesson 07-4: Assert та валідація даних
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_4 = {
  lessonId: "lesson-07-4",
  moduleId: "module-07",
  order: 4,
  title: "Assert та валідація даних",
  
  learningObjectives: [
    "Використовувати assert для перевірки",
    "Валідувати вхідні дані",
    "Обробляти помилки валідації",
    "Створювати надійний код"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-07-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке assert?",
        content: `**assert** - це ключове слово для перевірки умов під час виконання програми.

**Синтаксис:**

\`\`\`python
assert умова, "Повідомлення про помилку"
\`\`\`

**Як працює assert:**
- Якщо умова **True** - програма продовжує виконання
- Якщо умова **False** - піднімається AssertionError

**Приклад:**

\`\`\`python
def divide(a, b):
    assert b != 0, "Ділення на нуль неможливе!"
    return a / b

result = divide(10, 2)  # Працює
result = divide(10, 0)  # AssertionError: Ділення на нуль неможливе!
\`\`\`

**Переваги assert:**
- ✅ Простий спосіб перевірки умов
- ✅ Допомагає знаходити помилки на ранніх етапах
- ✅ Можна додати зрозуміле повідомлення
- ✅ Корисно для тестування та відлагодження`
      },
      {
        title: "Використання assert для валідації",
        content: `**assert** часто використовується для валідації вхідних даних:

**Приклад: Валідація віку**

\`\`\`python
def set_age(age):
    assert age >= 0, "Вік не може бути від'ємним"
    assert age <= 150, "Вік не може бути більше 150"
    return age

set_age(25)  # Працює
set_age(-5)  # AssertionError: Вік не може бути від'ємним
\`\`\`

**Приклад: Валідація списку**

\`\`\`python
def get_first_element(my_list):
    assert len(my_list) > 0, "Список не може бути порожнім"
    assert isinstance(my_list, list), "Аргумент має бути списком"
    return my_list[0]

get_first_element([1, 2, 3])  # Працює
get_first_element([])  # AssertionError: Список не може бути порожнім
\`\`\`

**Приклад: Валідація діапазону**

\`\`\`python
def calculate_percentage(value, total):
    assert value >= 0, "Значення не може бути від'ємним"
    assert total > 0, "Загальна сума має бути більше нуля"
    assert value <= total, "Значення не може бути більше загальної суми"
    return (value / total) * 100

calculate_percentage(75, 100)  # 75.0
calculate_percentage(150, 100)  # AssertionError
\`\`\``
      },
      {
        title: "Assert vs try/except",
        content: `**Коли використовувати assert, а коли try/except?**

**assert використовується для:**
- Перевірки внутрішніх умов програми (які не повинні порушуватися)
- Відлагодження та тестування
- Перевірки передумов функцій
- Перевірки інваріантів

**try/except використовується для:**
- Обробки помилок, які можуть виникнути під час виконання
- Обробки зовнішніх помилок (файли, мережа, введення користувача)
- Відновлення після помилок
- Показу зрозумілих повідомлень користувачу

**Приклад: assert для внутрішньої перевірки**

\`\`\`python
def calculate_average(numbers):
    # assert для перевірки внутрішньої логіки
    assert len(numbers) > 0, "Список не може бути порожнім"
    assert all(isinstance(n, (int, float)) for n in numbers), "Всі елементи мають бути числами"
    return sum(numbers) / len(numbers)
\`\`\`

**Приклад: try/except для зовнішніх помилок**

\`\`\`python
def read_file(filename):
    # try/except для обробки зовнішніх помилок
    try:
        with open(filename, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Файл {filename} не знайдено")
        return None
\`\`\``
      },
      {
        title: "Валідація вхідних даних",
        content: `Важливо валідувати вхідні дані перед обробкою:

**Приклад: Валідація функції з assert**

\`\`\`python
def process_user_data(name, age, email):
    # Валідація імені
    assert isinstance(name, str), "Ім'я має бути рядком"
    assert len(name) > 0, "Ім'я не може бути порожнім"
    assert len(name) <= 50, "Ім'я не може бути довше 50 символів"
    
    # Валідація віку
    assert isinstance(age, int), "Вік має бути цілим числом"
    assert age >= 0, "Вік не може бути від'ємним"
    assert age <= 120, "Вік не може бути більше 120"
    
    # Валідація email
    assert isinstance(email, str), "Email має бути рядком"
    assert '@' in email, "Email має містити @"
    
    return {"name": name, "age": age, "email": email}

# Використання
user = process_user_data("Олексій", 25, "oleksiy@example.com")
\`\`\`

**Приклад: Валідація з try/except**

\`\`\`python
def process_user_data_safe(name, age, email):
    try:
        # Валідація
        if not isinstance(name, str) or len(name) == 0:
            raise ValueError("Ім'я має бути непорожнім рядком")
        if not isinstance(age, int) or age < 0 or age > 120:
            raise ValueError("Вік має бути числом від 0 до 120")
        if '@' not in email:
            raise ValueError("Email має містити @")
        
        return {"name": name, "age": age, "email": email}
    except ValueError as e:
        print(f"Помилка валідації: {e}")
        return None

# Використання
user = process_user_data_safe("Олексій", 25, "oleksiy@example.com")
\`\`\``
      },
      {
        title: "Вимкнення assert в продакшн",
        content: `**Важливо:** assert може бути вимкнений за допомогою прапорця -O (оптимізація).

**Приклад:**

\`\`\`python
# Файл: test.py
def divide(a, b):
    assert b != 0, "Ділення на нуль!"
    return a / b

result = divide(10, 0)
\`\`\`

**Запуск з assert:**
\`\`\`bash
python test.py
# AssertionError: Ділення на нуль!
\`\`\`

**Запуск без assert (з оптимізацією):**
\`\`\`bash
python -O test.py
# ZeroDivisionError: division by zero
\`\`\`

**Рекомендація:**
- Не використовуй assert для критичних перевірок у продакшн коді
- Використовуй assert для тестування та відлагодження
- Для критичних перевірок використовуй try/except або if/raise

**Приклад: Правильна валідація для продакшн**

\`\`\`python
def divide_safe(a, b):
    if b == 0:
        raise ValueError("Ділення на нуль неможливе!")
    return a / b

# Це працюватиме навіть з -O
result = divide_safe(10, 0)
\`\`\``
      },
      {
        title: "Практичний приклад: Валідація даних",
        content: `**Створимо функцію з повною валідацією:**

\`\`\`python
def create_bank_account(owner, initial_balance):
    """
    Створює банківський рахунок з валідацією даних
    """
    # Валідація імені власника
    assert isinstance(owner, str), "Власник має бути рядком"
    assert len(owner) > 0, "Ім'я власника не може бути порожнім"
    assert len(owner) <= 100, "Ім'я власника занадто довге"
    
    # Валідація початкового балансу
    assert isinstance(initial_balance, (int, float)), "Баланс має бути числом"
    assert initial_balance >= 0, "Баланс не може бути від'ємним"
    
    return {
        "owner": owner,
        "balance": initial_balance
    }

# Використання
account = create_bank_account("Олексій", 1000)
print(account)

# З помилкою
try:
    account = create_bank_account("", -100)
except AssertionError as e:
    print(f"Помилка валідації: {e}")
\`\`\`

**Приклад: Валідація з try/except (для продакшн)**

\`\`\`python
def create_bank_account_safe(owner, initial_balance):
    """
    Створює банківський рахунок з валідацією (без assert)
    """
    # Валідація імені власника
    if not isinstance(owner, str):
        raise TypeError("Власник має бути рядком")
    if len(owner) == 0:
        raise ValueError("Ім'я власника не може бути порожнім")
    if len(owner) > 100:
        raise ValueError("Ім'я власника занадто довге")
    
    # Валідація початкового балансу
    if not isinstance(initial_balance, (int, float)):
        raise TypeError("Баланс має бути числом")
    if initial_balance < 0:
        raise ValueError("Баланс не може бути від'ємним")
    
    return {
        "owner": owner,
        "balance": initial_balance
    }

# Використання
try:
    account = create_bank_account_safe("Олексій", 1000)
    print(account)
except (TypeError, ValueError) as e:
    print(f"Помилка: {e}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове використання assert",
      code: `# Базове використання assert
def divide(a, b):
    assert b != 0, "Ділення на нуль неможливе!"
    return a / b

result = divide(10, 2)  # 5.0
# result = divide(10, 0)  # AssertionError`,
      explanation: "Демонструє базове використання assert для перевірки умови."
    },
    {
      title: "Приклад 2: Валідація з assert",
      code: `# Валідація даних з assert
def set_age(age):
    assert age >= 0, "Вік не може бути від'ємним"
    assert age <= 150, "Вік не може бути більше 150"
    assert isinstance(age, int), "Вік має бути цілим числом"
    return age

set_age(25)  # Працює
# set_age(-5)  # AssertionError`,
      explanation: "Показує використання assert для валідації вхідних даних."
    },
    {
      title: "Приклад 3: Валідація списку",
      code: `# Валідація списку
def get_average(numbers):
    assert len(numbers) > 0, "Список не може бути порожнім"
    assert all(isinstance(n, (int, float)) for n in numbers), "Всі елементи мають бути числами"
    return sum(numbers) / len(numbers)

result = get_average([1, 2, 3, 4, 5])  # 3.0`,
      explanation: "Демонструє валідацію списку з assert."
    },
    {
      title: "Приклад 4: Валідація з try/except",
      code: `# Валідація з try/except (для продакшн)
def set_age_safe(age):
    if not isinstance(age, int):
        raise TypeError("Вік має бути цілим числом")
    if age < 0:
        raise ValueError("Вік не може бути від'ємним")
    if age > 150:
        raise ValueError("Вік не може бути більше 150")
    return age

try:
    set_age_safe(25)
except (TypeError, ValueError) as e:
    print(f"Помилка: {e}")`,
      explanation: "Показує валідацію з try/except замість assert для продакшн коду."
    },
    {
      title: "Приклад 5: Комплексна валідація",
      code: `# Комплексна валідація даних
def process_user(name, age, email):
    assert isinstance(name, str) and len(name) > 0, "Ім'я має бути непорожнім рядком"
    assert isinstance(age, int) and 0 <= age <= 120, "Вік має бути від 0 до 120"
    assert isinstance(email, str) and '@' in email, "Email має містити @"
    
    return {"name": name, "age": age, "email": email}

user = process_user("Олексій", 25, "oleksiy@example.com")`,
      explanation: "Демонструє комплексну валідацію кількох параметрів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використовувати assert для критичних перевірок у продакшн",
      explanation: "assert може бути вимкнений з прапорцем -O, тому не підходить для критичних перевірок.",
      correctApproach: "Використовуй if/raise або try/except для критичних перевірок у продакшн коді"
    },
    {
      mistake: "Не валідувати вхідні дані",
      explanation: "Без валідації програма може отримати некоректні дані та працювати неправильно.",
      correctApproach: "Завжди валідуй вхідні дані перед обробкою"
    },
    {
      mistake: "Використовувати assert замість try/except для зовнішніх помилок",
      explanation: "assert призначений для внутрішніх перевірок, а не для обробки зовнішніх помилок.",
      correctApproach: "Використовуй try/except для обробки зовнішніх помилок (файли, мережа, введення)"
    },
    {
      mistake: "Не додавати повідомлення до assert",
      explanation: "Без повідомлення важко зрозуміти, що саме пішло не так.",
      correctApproach: "Завжди додавай зрозуміле повідомлення до assert: assert умова, 'повідомлення'"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **assert** - ключове слово для перевірки умов
2. **Валідація даних** - перевірка вхідних даних перед обробкою
3. **assert vs try/except** - коли використовувати кожен підхід
4. **Вимкнення assert** - assert може бути вимкнений з -O
5. **Практики валідації** - як правильно валідувати дані

Тепер ви вмієте використовувати assert для валідації та розумієте, коли його використовувати!

Наступний урок - практика: обробка помилок у програмах!`,
  
  practiceTask: {
    title: "Створення функції з валідацією даних",
    description: "Створіть функцію з повною валідацією вхідних даних",
    problemStatement: `Напишіть функцію calculate_discount, яка:
1. Приймає параметри: price (ціна) та discount_percent (відсоток знижки)
2. Валідує дані:
   - price має бути додатнім числом
   - discount_percent має бути від 0 до 100
   - Обидва параметри мають бути числами
3. Обчислює ціну зі знижкою
4. Використовує assert для валідації
5. Повертає фінальну ціну`,
    outputFormat: `Приклад виведення:
Ціна зі знижкою: 80.0
або
AssertionError: Відсоток знижки має бути від 0 до 100`,
    examples: [
      {
        input: "calculate_discount(100, 20)",
        output: "Ціна зі знижкою: 80.0",
        explanation: "Функція обчислює ціну зі знижкою 20%"
      },
      {
        input: "calculate_discount(100, 150)",
        output: "AssertionError: Відсоток знижки має бути від 0 до 100",
        explanation: "Функція валідує що знижка не може бути більше 100%"
      },
      {
        input: "calculate_discount(-100, 20)",
        output: "AssertionError: Ціна має бути додатнім числом",
        explanation: "Функція валідує що ціна не може бути від'ємною"
      }
    ],
    solution: {
      code: `# Функція з валідацією даних
def calculate_discount(price, discount_percent):
    # Валідація ціни
    assert isinstance(price, (int, float)), "Ціна має бути числом"
    assert price > 0, "Ціна має бути додатнім числом"
    
    # Валідація відсотка знижки
    assert isinstance(discount_percent, (int, float)), "Відсоток знижки має бути числом"
    assert 0 <= discount_percent <= 100, "Відсоток знижки має бути від 0 до 100"
    
    # Обчислення ціни зі знижкою
    discount_amount = price * (discount_percent / 100)
    final_price = price - discount_amount
    
    print(f"Ціна зі знижкою: {final_price}")
    return final_price

# Тестування
calculate_discount(100, 20)  # 80.0
# calculate_discount(100, 150)  # AssertionError
# calculate_discount(-100, 20)  # AssertionError`,
      explanation: "Рішення використовує assert для валідації всіх параметрів перед обчисленням."
    },
    hints: [
      "Використовуй isinstance() для перевірки типу",
      "Перевіряй що price > 0",
      "Перевіряй що discount_percent від 0 до 100",
      "Обчислюй знижку як price * (discount_percent / 100)",
      "Додавай зрозумілі повідомлення до assert"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке assert?",
        options: [
          "Ключове слово для перевірки умов",
          "Функція для обробки помилок",
          "Тип даних",
          "Модуль Python"
        ],
        correctAnswer: 0,
        explanation: "assert - це ключове слово Python для перевірки умов під час виконання програми."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef divide(a, b):\n    assert b != 0, 'Ділення на нуль!'\n    return a / b\n\nresult = divide(10, 0)\n```",
        options: [
          "AssertionError: Ділення на нуль!",
          "ZeroDivisionError",
          "5.0",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Код піднімає AssertionError з повідомленням 'Ділення на нуль!' коли b == 0."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати assert, а коли try/except?",
        options: [
          "assert для внутрішніх перевірок, try/except для зовнішніх помилок",
          "assert для зовнішніх помилок, try/except для внутрішніх перевірок",
          "Завжди використовувати assert",
          "Завжди використовувати try/except"
        ],
        correctAnswer: 0,
        explanation: "assert використовується для внутрішніх перевірок логіки, try/except - для обробки зовнішніх помилок."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому не варто використовувати assert для критичних перевірок у продакшн?",
        options: [
          "assert може бути вимкнений з прапорцем -O",
          "assert працює повільніше",
          "assert займає більше пам'яті",
          "assert не підтримується в Python"
        ],
        correctAnswer: 0,
        explanation: "assert може бути вимкнений при запуску Python з прапорцем -O (оптимізація), тому не підходить для критичних перевірок."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\ndef validate_age(age):\n    assert age >= 0\n    assert age <= 150\n    return age\n```",
        options: [
          "Відсутні повідомлення в assert",
          "Неправильний синтаксис assert",
          "Неправильна назва функції",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "Краще додавати зрозумілі повідомлення до assert для легшого відлагодження: assert age >= 0, 'Вік не може бути від\'ємним'"
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке валідація даних?",
        options: [
          "Перевірка вхідних даних перед обробкою",
          "Збереження даних у файл",
          "Видалення даних",
          "Сортування даних"
        ],
        correctAnswer: 0,
        explanation: "Валідація даних - це перевірка вхідних даних на коректність перед їх обробкою."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
