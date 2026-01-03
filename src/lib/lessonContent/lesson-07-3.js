/**
 * Lesson 07-3: Створення власних винятків
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_3 = {
  lessonId: "lesson-07-3",
  moduleId: "module-07",
  order: 3,
  title: "Створення власних винятків",
  
  learningObjectives: [
    "Створювати кастомні класи винятків",
    "Піднімати винятки (raise)",
    "Створювати ієрархію винятків",
    "Документувати винятки"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-07-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Навіщо створювати власні винятки?",
        content: `Іноді вбудованих винятків недостатньо для опису конкретних помилок у вашій програмі.

**Переваги власних винятків:**
- ✅ Більш зрозумілі повідомлення про помилки
- ✅ Краща організація коду
- ✅ Легше обробляти специфічні помилки
- ✅ Професійніший код

**Приклад: Без власного винятку**
\`\`\`python
def withdraw_money(balance, amount):
    if amount > balance:
        raise ValueError("Недостатньо коштів")  # Не дуже зрозуміло
\`\`\`

**Приклад: З власним винятком**
\`\`\`python
class InsufficientFundsError(Exception):
    pass

def withdraw_money(balance, amount):
    if amount > balance:
        raise InsufficientFundsError("Недостатньо коштів на рахунку")
\`\`\`

Тепер помилка більш зрозуміла та специфічна!`
      },
      {
        title: "Створення простого кастомного винятку",
        content: `**Базовий синтаксис:**

\`\`\`python
class НазваВинятку(Exception):
    pass
\`\`\`

**Приклад: Виняток для віку**

\`\`\`python
class InvalidAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("Вік не може бути від'ємним")
    if age > 150:
        raise InvalidAgeError("Вік не може бути більше 150")
    return age

# Використання
try:
    set_age(-5)
except InvalidAgeError as e:
    print(f"Помилка: {e}")
\`\`\`

**Приклад: Виняток для валідації email**

\`\`\`python
class InvalidEmailError(Exception):
    pass

def validate_email(email):
    if '@' not in email:
        raise InvalidEmailError(f"Email '{email}' не містить символ @")
    if '.' not in email.split('@')[1]:
        raise InvalidEmailError(f"Email '{email}' має неправильний формат")
    return True

# Використання
try:
    validate_email("неправильний_email")
except InvalidEmailError as e:
    print(f"Помилка валідації: {e}")
\`\`\``
      },
      {
        title: "Підняття винятків (raise)",
        content: `**raise** - ключове слово для підняття (виклику) винятку.

**Синтаксис:**

\`\`\`python
raise НазваВинятку("Повідомлення про помилку")
\`\`\`

**Приклад: Підняття вбудованого винятку**

\`\`\`python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Ділення на нуль неможливе!")
    return a / b

divide(10, 0)  # Піднімає ZeroDivisionError
\`\`\`

**Приклад: Підняття кастомного винятку**

\`\`\`python
class NegativeNumberError(Exception):
    pass

def square_root(number):
    if number < 0:
        raise NegativeNumberError("Не можна обчислити квадратний корінь з від'ємного числа")
    return number ** 0.5

# Використання
try:
    result = square_root(-4)
except NegativeNumberError as e:
    print(f"Помилка: {e}")
\`\`\`

**Приклад: Підняття з повідомленням**

\`\`\`python
class ValidationError(Exception):
    pass

def validate_password(password):
    if len(password) < 8:
        raise ValidationError("Пароль має бути не менше 8 символів")
    if not any(char.isdigit() for char in password):
        raise ValidationError("Пароль має містити хоча б одну цифру")
    return True

try:
    validate_password("weak")
except ValidationError as e:
    print(f"Помилка валідації: {e}")
\`\`\``
      },
      {
        title: "Кастомні винятки з атрибутами",
        content: `Можна додати атрибути до кастомного винятку для зберігання додаткової інформації:

**Приклад: Виняток з атрибутами**

\`\`\`python
class BankAccountError(Exception):
    def __init__(self, message, balance, amount):
        self.message = message
        self.balance = balance
        self.amount = amount
        super().__init__(self.message)

def withdraw(balance, amount):
    if amount > balance:
        raise BankAccountError(
            "Недостатньо коштів",
            balance,
            amount
        )
    return balance - amount

# Використання
try:
    withdraw(100, 200)
except BankAccountError as e:
    print(f"Помилка: {e.message}")
    print(f"Баланс: {e.balance}")
    print(f"Сума зняття: {e.amount}")
\`\`\`

**Приклад: Виняток з детальною інформацією**

\`\`\`python
class FileProcessingError(Exception):
    def __init__(self, filename, operation, reason):
        self.filename = filename
        self.operation = operation
        self.reason = reason
        message = f"Помилка {operation} файлу {filename}: {reason}"
        super().__init__(message)

def process_file(filename):
    try:
        with open(filename, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        raise FileProcessingError(
            filename,
            "читання",
            "файл не знайдено"
        )
    return content

try:
    process_file("неіснуючий.txt")
except FileProcessingError as e:
    print(f"Файл: {e.filename}")
    print(f"Операція: {e.operation}")
    print(f"Причина: {e.reason}")
\`\`\``
      },
      {
        title: "Ієрархія кастомних винятків",
        content: `Можна створити ієрархію винятків для кращої організації:

**Приклад: Ієрархія винятків для банківської системи**

\`\`\`python
# Базовий виняток
class BankError(Exception):
    """Базовий виняток для всіх банківських помилок"""
    pass

# Специфічні винятки
class InsufficientFundsError(BankError):
    """Недостатньо коштів на рахунку"""
    pass

class InvalidAccountError(BankError):
    """Неправильний номер рахунку"""
    pass

class TransactionLimitError(BankError):
    """Перевищено ліміт транзакції"""
    pass

# Використання
def process_transaction(account, amount):
    if not account.is_valid():
        raise InvalidAccountError("Рахунок не існує")
    if amount > account.balance:
        raise InsufficientFundsError("Недостатньо коштів")
    if amount > 10000:
        raise TransactionLimitError("Перевищено ліміт транзакції")
    return True

# Обробка
try:
    process_transaction(account, 5000)
except BankError as e:  # Обробить всі банківські помилки
    print(f"Банківська помилка: {e}")
except InsufficientFundsError as e:  # Конкретна обробка
    print(f"Недостатньо коштів: {e}")
\`\`\``
      },
      {
        title: "Документування винятків",
        content: `Важливо документувати винятки для інших розробників:

**Приклад: Документований виняток**

\`\`\`python
class ValidationError(Exception):
    """
    Виняток для помилок валідації даних.
    
    Attributes:
        field: Назва поля, яке не пройшло валідацію
        value: Значення, яке не пройшло валідацію
        rule: Правило валідації, яке було порушено
    """
    def __init__(self, message, field=None, value=None, rule=None):
        self.message = message
        self.field = field
        self.value = value
        self.rule = rule
        super().__init__(self.message)
    
    def __str__(self):
        details = f"{self.message}"
        if self.field:
            details += f" (поле: {self.field})"
        if self.value:
            details += f" (значення: {self.value})"
        if self.rule:
            details += f" (правило: {self.rule})"
        return details

# Використання
def validate_user_age(age):
    if age < 18:
        raise ValidationError(
            "Вік має бути не менше 18 років",
            field="age",
            value=age,
            rule="min_age_18"
        )
    return True

try:
    validate_user_age(15)
except ValidationError as e:
    print(e)  # Виведе детальну інформацію
\`\`\``
      },
      {
        title: "Практичний приклад: Система валідації",
        content: `**Створимо систему валідації з кастомними винятками:**

\`\`\`python
# Базовий виняток валідації
class ValidationError(Exception):
    """Базовий виняток для помилок валідації"""
    pass

# Специфічні винятки
class EmailValidationError(ValidationError):
    """Помилка валідації email"""
    pass

class PasswordValidationError(ValidationError):
    """Помилка валідації паролю"""
    pass

class AgeValidationError(ValidationError):
    """Помилка валідації віку"""
    pass

# Функції валідації
def validate_email(email):
    if '@' not in email:
        raise EmailValidationError(f"Email '{email}' не містить @")
    if '.' not in email.split('@')[1]:
        raise EmailValidationError(f"Email '{email}' має неправильний формат")
    return True

def validate_password(password):
    if len(password) < 8:
        raise PasswordValidationError("Пароль має бути не менше 8 символів")
    if not any(char.isdigit() for char in password):
        raise PasswordValidationError("Пароль має містити цифру")
    return True

def validate_age(age):
    if age < 18:
        raise AgeValidationError("Вік має бути не менше 18 років")
    if age > 120:
        raise AgeValidationError("Вік не може бути більше 120 років")
    return True

# Використання
def register_user(email, password, age):
    try:
        validate_email(email)
        validate_password(password)
        validate_age(age)
        print("Користувач успішно зареєстрований!")
        return True
    except ValidationError as e:
        print(f"Помилка валідації: {e}")
        return False

register_user("test@example.com", "strongpass123", 25)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий кастомний виняток",
      code: `# Створення простого кастомного винятку
class InvalidAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("Вік не може бути від'ємним")
    if age > 150:
        raise InvalidAgeError("Вік не може бути більше 150")
    return age

# Використання
try:
    set_age(-5)
except InvalidAgeError as e:
    print(f"Помилка: {e}")`,
      explanation: "Демонструє створення та використання простого кастомного винятку."
    },
    {
      title: "Приклад 2: Виняток з атрибутами",
      code: `# Виняток з додатковими атрибутами
class BankAccountError(Exception):
    def __init__(self, message, balance, amount):
        self.message = message
        self.balance = balance
        self.amount = amount
        super().__init__(self.message)

def withdraw(balance, amount):
    if amount > balance:
        raise BankAccountError("Недостатньо коштів", balance, amount)
    return balance - amount

# Використання
try:
    withdraw(100, 200)
except BankAccountError as e:
    print(f"Помилка: {e.message}")
    print(f"Баланс: {e.balance}, Сума: {e.amount}")`,
      explanation: "Показує як створити виняток з додатковими атрибутами."
    },
    {
      title: "Приклад 3: Ієрархія винятків",
      code: `# Ієрархія винятків
class BankError(Exception):
    pass

class InsufficientFundsError(BankError):
    pass

class InvalidAccountError(BankError):
    pass

def process_transaction(account, amount):
    if not account.is_valid():
        raise InvalidAccountError("Рахунок не існує")
    if amount > account.balance:
        raise InsufficientFundsError("Недостатньо коштів")
    return True

# Обробка
try:
    process_transaction(account, 5000)
except InsufficientFundsError as e:
    print(f"Недостатньо коштів: {e}")
except BankError as e:
    print(f"Банківська помилка: {e}")`,
      explanation: "Демонструє створення ієрархії винятків."
    },
    {
      title: "Приклад 4: Підняття винятків",
      code: `# Підняття винятків
class NegativeNumberError(Exception):
    pass

def square_root(number):
    if number < 0:
        raise NegativeNumberError("Не можна обчислити квадратний корінь з від'ємного числа")
    return number ** 0.5

# Використання
try:
    result = square_root(-4)
except NegativeNumberError as e:
    print(f"Помилка: {e}")`,
      explanation: "Показує як піднімати кастомні винятки."
    },
    {
      title: "Приклад 5: Документований виняток",
      code: `# Документований виняток
class ValidationError(Exception):
    """
    Виняток для помилок валідації даних.
    
    Attributes:
        field: Назва поля
        value: Значення поля
    """
    def __init__(self, message, field=None, value=None):
        self.message = message
        self.field = field
        self.value = value
        super().__init__(self.message)

def validate_age(age):
    if age < 18:
        raise ValidationError("Вік має бути не менше 18", field="age", value=age)
    return True

try:
    validate_age(15)
except ValidationError as e:
    print(f"Помилка: {e.message}, поле: {e.field}, значення: {e.value}")`,
      explanation: "Демонструє документований виняток з атрибутами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не успадковувати від Exception",
      explanation: "Якщо виняток не успадковується від Exception, він не буде правильно оброблятися.",
      correctApproach: "Завжди успадковуй кастомні винятки від Exception або його підкласів"
    },
    {
      mistake: "Забути викликати super().__init__()",
      explanation: "Без виклику super().__init__() повідомлення про помилку може не відображатися правильно.",
      correctApproach: "Завжди викликай super().__init__(message) в __init__ кастомного винятку"
    },
    {
      mistake: "Створювати занадто багато специфічних винятків",
      explanation: "Надмірна кількість винятків ускладнює код та його підтримку.",
      correctApproach: "Створюй винятки тільки коли це дійсно потрібно, використовуй ієрархію"
    },
    {
      mistake: "Не документувати винятки",
      explanation: "Без документації інші розробники не зрозуміють, коли та як використовувати виняток.",
      correctApproach: "Завжди документуй кастомні винятки, описуй коли вони виникають"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Створення кастомних винятків** - class MyError(Exception)
2. **Підняття винятків** - raise MyError("повідомлення")
3. **Винятки з атрибутами** - додавання додаткової інформації
4. **Ієрархія винятків** - створення базових та специфічних винятків
5. **Документування** - опис винятків для інших розробників

Тепер ви вмієте створювати власні винятки для кращої обробки помилок у ваших програмах!

Наступний урок - assert та валідація даних!`,
  
  practiceTask: {
    title: "Створення системи валідації з кастомними винятками",
    description: "Створіть систему валідації з використанням кастомних винятків",
    problemStatement: `Напишіть програму, яка:
1. Створює ієрархію винятків для валідації:
   - ValidationError (базовий)
   - EmailValidationError
   - PasswordValidationError
   - AgeValidationError
2. Створює функції валідації:
   - validate_email(email) - перевіряє наявність @ та .
   - validate_password(password) - перевіряє довжину >= 8 та наявність цифри
   - validate_age(age) - перевіряє що вік між 18 та 120
3. Створює функцію register_user, яка використовує всі валідації
4. Обробляє винятки та показує зрозумілі повідомлення

**Важливо:** Напишіть всі класи, функції та викличте register_user з тестовими значеннями для перевірки.`,
    outputFormat: `Приклад виведення:
Користувач успішно зареєстрований!
Помилка валідації: Email 'test' не містить @
Помилка валідації: Пароль має бути не менше 8 символів`,
    examples: [
      {
        input: "",
        output: "Користувач успішно зареєстрований!\nПомилка валідації: Email 'test' не містить @\nПомилка валідації: Пароль має бути не менше 8 символів",
        explanation: "Програма обробляє різні випадки: успішна реєстрація, помилка email та помилка паролю"
      }
    ],
    solution: {
      code: `# Ієрархія винятків для валідації
class ValidationError(Exception):
    """Базовий виняток для помилок валідації"""
    pass

class EmailValidationError(ValidationError):
    """Помилка валідації email"""
    pass

class PasswordValidationError(ValidationError):
    """Помилка валідації паролю"""
    pass

class AgeValidationError(ValidationError):
    """Помилка валідації віку"""
    pass

# Функції валідації
def validate_email(email):
    if '@' not in email:
        raise EmailValidationError(f"Email '{email}' не містить @")
    if '.' not in email.split('@')[1]:
        raise EmailValidationError(f"Email '{email}' має неправильний формат")
    return True

def validate_password(password):
    if len(password) < 8:
        raise PasswordValidationError("Пароль має бути не менше 8 символів")
    if not any(char.isdigit() for char in password):
        raise PasswordValidationError("Пароль має містити хоча б одну цифру")
    return True

def validate_age(age):
    if age < 18:
        raise AgeValidationError("Вік має бути не менше 18 років")
    if age > 120:
        raise AgeValidationError("Вік не може бути більше 120 років")
    return True

# Функція реєстрації
def register_user(email, password, age):
    try:
        validate_email(email)
        validate_password(password)
        validate_age(age)
        print("Користувач успішно зареєстрований!")
        return True
    except ValidationError as e:
        print(f"Помилка валідації: {e}")
        return False

# Тестування
register_user("test@example.com", "strongpass123", 25)
register_user("test", "strongpass123", 25)
register_user("test@example.com", "weak", 25)`,
      explanation: "Рішення створює ієрархію винятків та функції валідації для реєстрації користувача."
    },
    hints: [
      "Створи базовий клас ValidationError, що успадковується від Exception",
      "Створи специфічні класи для кожного типу валідації",
      "Використовуй raise для підняття винятків у функціях валідації",
      "Обробляй ValidationError в register_user для обробки всіх типів помилок",
      "Використовуй any() та isdigit() для перевірки наявності цифри в паролі"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно створити кастомний виняток?",
        options: [
          "class MyError(Exception): pass",
          "class MyError: pass",
          "class MyError(Error): pass",
          "def MyError(): pass"
        ],
        correctAnswer: 0,
        explanation: "Кастомний виняток має успадковуватися від Exception: class MyError(Exception): pass"
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass MyError(Exception):\n    pass\n\ntry:\n    raise MyError('Помилка')\nexcept MyError as e:\n    print(e)\n```",
        options: [
          "Помилка",
          "MyError",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Код піднімає кастомний виняток з повідомленням 'Помилка' та обробляє його, виводячи повідомлення."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як підняти виняток?",
        options: [
          "raise MyError('повідомлення')",
          "throw MyError('повідомлення')",
          "error MyError('повідомлення')",
          "except MyError('повідомлення')"
        ],
        correctAnswer: 0,
        explanation: "Для підняття винятку використовується ключове слово raise: raise MyError('повідомлення')"
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nclass MyError(Exception):\n    def __init__(self, message, code):\n        self.message = message\n        self.code = code\n```",
        options: [
          "Відсутній виклик super().__init__()",
          "Неправильний синтаксис __init__",
          "Неправильна назва класу",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "У __init__ кастомного винятку потрібно викликати super().__init__(message) для правильного відображення повідомлення."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому краще створювати ієрархію винятків?",
        options: [
          "Для кращої організації та обробки помилок",
          "Для швидшої роботи програми",
          "Для економії пам'яті",
          "Немає переваг"
        ],
        correctAnswer: 0,
        explanation: "Ієрархія винятків дозволяє краще організувати код та обробляти помилки на різних рівнях (конкретні та загальні)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно обробити базовий виняток та його підкласи?",
        options: [
          "Спочатку обробляти підкласи, потім базовий клас",
          "Спочатку обробляти базовий клас, потім підкласи",
          "Обробляти тільки базовий клас",
          "Обробляти тільки підкласи"
        ],
        correctAnswer: 0,
        explanation: "Як і з вбудованими винятками, спочатку обробляються конкретні типи (підкласи), потім загальні (базовий клас)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
