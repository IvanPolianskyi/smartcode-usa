/**
 * Lesson 4-3: Створення власних винятків
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson4_3 = {
  lessonId: "lesson-4-3",
  moduleId: "module-4",
  order: 3,
  title: "Створення власних винятків",
  
  learningObjectives: [
    "Створювати кастомні класи винятків",
    "Піднімати винятки (raise)",
    "Створювати ієрархію винятків",
    "Документувати винятки"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-4-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Створення власного винятку",
        content: `Власний виняток — це клас, який наслідується від Exception:

\`\`\`python
class MyCustomError(Exception):
    pass

# Використання
raise MyCustomError("Щось пішло не так!")
\`\`\`

**З повідомленням:**
\`\`\`python
class ValidationError(Exception):
    def __init__(self, message, field=None):
        self.message = message
        self.field = field
        super().__init__(self.message)

# Використання
raise ValidationError("Вік не може бути від'ємним", field="age")
\`\`\`

**Обробка:**
\`\`\`python
try:
    raise ValidationError("Помилка валідації")
except ValidationError as e:
    print(f"Помилка: {e.message}")
\`\`\``
      },
      {
        title: "Ієрархія винятків",
        content: `Можна створювати ієрархію винятків:

\`\`\`python
class StudentError(Exception):
    """Базовий виняток для помилок студентів"""
    pass

class InvalidAgeError(StudentError):
    """Помилка невалідного віку"""
    pass

class InvalidGradeError(StudentError):
    """Помилка невалідного класу"""
    pass

# Використання
try:
    raise InvalidAgeError("Вік має бути від 13 до 17")
except StudentError as e:  # Ловить всі підкласи
    print(f"Помилка студента: {e}")
\`\`\`

**Переваги ієрархії:**
- Можна обробляти групи помилок
- Краща організація коду
- Легше розширювати`
      },
      {
        title: "Підняття винятків (raise)",
        content: `**Базове використання:**
\`\`\`python
def check_age(age):
    if age < 0:
        raise ValueError("Вік не може бути від'ємним!")
    if age > 150:
        raise ValueError("Вік занадто великий!")
    return age

try:
    age = check_age(-5)
except ValueError as e:
    print(f"Помилка: {e}")
\`\`\`

**Повторне підняття:**
\`\`\`python
try:
    # код
except ValueError:
    print("Обробка помилки...")
    raise  # Повторно піднімає помилку
\`\`\`

**З новим повідомленням:**
\`\`\`python
try:
    # код
except ValueError as e:
    raise ValueError(f"Нова помилка: {e}") from e
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий кастомний виняток",
      code: `# Власний виняток
class NegativeNumberError(Exception):
    pass

def check_positive(number):
    if number < 0:
        raise NegativeNumberError("Число не може бути від'ємним!")
    return number

try:
    result = check_positive(-5)
except NegativeNumberError as e:
    print(f"Помилка: {e}")`,
      explanation: "Демонструє створення та використання простого кастомного винятку."
    },
    {
      title: "Приклад 2: Ієрархія винятків",
      code: `# Ієрархія винятків
class BankError(Exception):
    pass

class InsufficientFundsError(BankError):
    pass

class InvalidAccountError(BankError):
    pass

def withdraw(account, amount):
    if account not in accounts:
        raise InvalidAccountError(f"Рахунок {account} не існує!")
    if accounts[account] < amount:
        raise InsufficientFundsError("Недостатньо коштів!")
    accounts[account] -= amount

# Обробка всіх банківських помилок
try:
    withdraw("account123", 1000)
except BankError as e:
    print(f"Банківська помилка: {e}")`,
      explanation: "Показує створення ієрархії винятків для різних типів помилок."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не наслідувати від Exception",
      explanation: "Якщо клас не наслідується від Exception, він не буде правильно оброблятися.",
      correctApproach: "Завжди наслідуйте від Exception або його підкласів."
    },
    {
      mistake: "Створення занадто багатьох кастомних винятків",
      explanation: "Не потрібно створювати виняток для кожної ситуації, використовуйте стандартні коли можливо.",
      correctApproach: "Створюйте кастомні винятки тільки коли стандартні не підходять."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Створення винятків** — class MyError(Exception)
2. **Підняття винятків** — raise MyError("повідомлення")
3. **Ієрархія** — наслідування від базових винятків
4. **Документація** — docstrings для опису винятків

Власні винятки роблять код більш зрозумілим та структурованим!`,
  
  practiceTask: {
    title: "Система валідації з кастомними винятками",
    description: "Створіть систему валідації з власними винятками",
    problemStatement: `Створіть:
1. Базовий виняток ValidationError
2. Підкласи: InvalidEmailError, InvalidAgeError, InvalidPasswordError
3. Функції валідації, які викликають ці винятки
4. Обробку помилок з виведенням повідомлень`,
    inputFormat: "Функції валідації викликаються з різними даними",
    outputFormat: `Приклад виведення:
Валідація успішна!
Або:
Помилка валідації: Неправильний email`,
    examples: [
      {
        input: "email='test@example.com', age=15, password='123456'",
        output: "Валідація успішна!",
        explanation: "Всі дані валідні"
      }
    ],
    solution: {
      code: `# Кастомні винятки
class ValidationError(Exception):
    """Базовий виняток для валідації"""
    pass

class InvalidEmailError(ValidationError):
    pass

class InvalidAgeError(ValidationError):
    pass

class InvalidPasswordError(ValidationError):
    pass

# Функції валідації
def validate_email(email):
    if "@" not in email or "." not in email:
        raise InvalidEmailError("Неправильний формат email!")
    return True

def validate_age(age):
    if not isinstance(age, int):
        raise InvalidAgeError("Вік має бути числом!")
    if age < 13 or age > 17:
        raise InvalidAgeError("Вік має бути від 13 до 17!")
    return True

def validate_password(password):
    if len(password) < 6:
        raise InvalidPasswordError("Пароль має бути мінімум 6 символів!")
    return True

# Використання
try:
    validate_email("test@example.com")
    validate_age(15)
    validate_password("123456")
    print("Валідація успішна!")
except ValidationError as e:
    print(f"Помилка валідації: {e}")`,
      explanation: "Рішення демонструє створення ієрархії винятків та їх використання."
    },
    hints: [
      "Створіть базовий клас ValidationError",
      "Створіть підкласи для різних типів помилок",
      "Використовуйте raise для виклику винятків"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Від чого має наслідуватися кастомний виняток?",
        options: ["object", "Exception", "Error", "BaseException"],
        correctAnswer: 1,
        explanation: "Кастомні винятки мають наслідуватися від Exception або його підкласів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить: raise ValueError('Помилка')?",
        options: ["Обробляє помилку", "Викликає помилку", "Ігнорує помилку", "Логує помилку"],
        correctAnswer: 1,
        explanation: "raise викликає (піднімає) виняток з повідомленням."
      }
    ],
    timeLimit: 8,
    passingScore: 70
  }
}

