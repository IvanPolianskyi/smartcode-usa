/**
 * Lesson 05-5: Практика: обробка помилок у програмах
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_5 = {
  lessonId: "lesson-05-5",
  moduleId: "module-05",
  order: 5,
  title: "Практика: обробка помилок у програмах",
  
  learningObjectives: [
    "Створити програму з обробкою помилок",
    "Реалізувати валідацію даних",
    "Обробляти різні типи помилок",
    "Створити надійну програму"
  ],
  
  prerequisites: ["lesson-05-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Принципи обробки помилок",
        content: `**Ключові принципи обробки помилок:**

1. **Валідація на вході** - перевіряй дані перед обробкою
2. **Конкретні повідомлення** - показуй зрозумілі повідомлення про помилки
3. **Обробка на різних рівнях** - обробляй помилки там, де це доречно
4. **Логування** - логуй помилки для відлагодження
5. **Відновлення** - намагайся відновити роботу програми, коли це можливо

**Приклад: Базова структура обробки помилок**

\`\`\`python
def process_data(data):
    try:
        # Валідація
        if not data:
            raise ValueError("Дані не можуть бути порожніми")
        
        # Обробка
        result = perform_operation(data)
        return result
        
    except ValueError as e:
        # Обробка помилок валідації
        print(f"Помилка валідації: {e}")
        return None
    except Exception as e:
        # Обробка несподіваних помилок
        print(f"Невідома помилка: {e}")
        return None
\`\`\``
      },
      {
        title: "Практичний приклад: Калькулятор з обробкою помилок",
        content: `**Створимо калькулятор з повною обробкою помилок:**

\`\`\`python
class CalculatorError(Exception):
    """Базовий виняток для калькулятора"""
    pass

class DivisionByZeroError(CalculatorError):
    """Помилка ділення на нуль"""
    pass

class InvalidInputError(CalculatorError):
    """Помилка некоректного введення"""
    pass

def safe_calculate(operation, a, b):
    """
    Безпечне виконання математичних операцій
    """
    try:
        # Валідація вхідних даних
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise InvalidInputError("Обидва аргументи мають бути числами")
        
        # Виконання операції
        if operation == '+':
            return a + b
        elif operation == '-':
            return a - b
        elif operation == '*':
            return a * b
        elif operation == '/':
            if b == 0:
                raise DivisionByZeroError("Ділення на нуль неможливе!")
            return a / b
        else:
            raise InvalidInputError(f"Невідома операція: {operation}")
            
    except DivisionByZeroError as e:
        print(f"Помилка: {e}")
        return None
    except InvalidInputError as e:
        print(f"Помилка введення: {e}")
        return None
    except CalculatorError as e:
        print(f"Помилка калькулятора: {e}")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

# Використання
result = safe_calculate('+', 10, 5)  # 15
result = safe_calculate('/', 10, 0)  # None (обробка помилки)
\`\`\``
      },
      {
        title: "Практичний приклад: Робота з файлами",
        content: `**Створимо функцію для безпечної роботи з файлами:**

\`\`\`python
import os

class FileError(Exception):
    """Базовий виняток для роботи з файлами"""
    pass

class FileNotFoundError(FileError):
    """Файл не знайдено"""
    pass

class FilePermissionError(FileError):
    """Немає доступу до файлу"""
    pass

def safe_read_file(filename):
    """
    Безпечно читає файл з обробкою всіх помилок
    """
    try:
        # Перевірка існування файлу
        if not os.path.exists(filename):
            raise FileNotFoundError(f"Файл '{filename}' не знайдено")
        
        # Перевірка доступу
        if not os.access(filename, os.R_OK):
            raise FilePermissionError(f"Немає доступу до файлу '{filename}'")
        
        # Читання файлу
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        return content
        
    except FileNotFoundError as e:
        print(f"Помилка: {e}")
        return None
    except FilePermissionError as e:
        print(f"Помилка: {e}")
        return None
    except UnicodeDecodeError as e:
        print(f"Помилка кодування: не вдалося декодувати файл")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

# Використання
content = safe_read_file("data.txt")
if content:
    print(content)
\`\`\``
      },
      {
        title: "Практичний приклад: Валідація користувацького введення",
        content: `**Створимо систему валідації введення користувача:**

\`\`\`python
class ValidationError(Exception):
    """Базовий виняток для валідації"""
    pass

class AgeValidationError(ValidationError):
    """Помилка валідації віку"""
    pass

class EmailValidationError(ValidationError):
    """Помилка валідації email"""
    pass

def validate_age(age):
    """Валідація віку"""
    if not isinstance(age, int):
        raise AgeValidationError("Вік має бути цілим числом")
    if age < 0:
        raise AgeValidationError("Вік не може бути від'ємним")
    if age > 120:
        raise AgeValidationError("Вік не може бути більше 120")
    return True

def validate_email(email):
    """Валідація email"""
    if not isinstance(email, str):
        raise EmailValidationError("Email має бути рядком")
    if '@' not in email:
        raise EmailValidationError("Email має містити символ @")
    if '.' not in email.split('@')[1]:
        raise EmailValidationError("Email має неправильний формат")
    return True

def register_user(name, age, email):
    """
    Реєстрація користувача з валідацією
    """
    try:
        # Валідація віку
        validate_age(age)
        
        # Валідація email
        validate_email(email)
        
        # Валідація імені
        if not isinstance(name, str) or len(name) == 0:
            raise ValidationError("Ім'я має бути непорожнім рядком")
        
        # Створення користувача
        user = {
            "name": name,
            "age": age,
            "email": email
        }
        
        print(f"Користувач {name} успішно зареєстрований!")
        return user
        
    except AgeValidationError as e:
        print(f"Помилка валідації віку: {e}")
        return None
    except EmailValidationError as e:
        print(f"Помилка валідації email: {e}")
        return None
    except ValidationError as e:
        print(f"Помилка валідації: {e}")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

# Використання
user = register_user("Олексій", 25, "oleksiy@example.com")
\`\`\``
      },
      {
        title: "Комплексний приклад: Система управління рахунками",
        content: `**Створимо систему управління банківськими рахунками:**

\`\`\`python
class BankError(Exception):
    """Базовий виняток для банківських операцій"""
    pass

class InsufficientFundsError(BankError):
    """Недостатньо коштів"""
    pass

class InvalidAmountError(BankError):
    """Неправильна сума"""
    pass

class AccountNotFoundError(BankError):
    """Рахунок не знайдено"""
    pass

class BankAccount:
    def __init__(self, account_number, owner, initial_balance=0):
        self.account_number = account_number
        self.owner = owner
        self.balance = initial_balance
    
    def deposit(self, amount):
        """Поповнення рахунку"""
        try:
            if not isinstance(amount, (int, float)):
                raise InvalidAmountError("Сума має бути числом")
            if amount <= 0:
                raise InvalidAmountError("Сума має бути додатньою")
            
            self.balance += amount
            print(f"Поповнено {amount} грн. Новий баланс: {self.balance} грн")
            return self.balance
            
        except InvalidAmountError as e:
            print(f"Помилка: {e}")
            return None
    
    def withdraw(self, amount):
        """Зняття з рахунку"""
        try:
            if not isinstance(amount, (int, float)):
                raise InvalidAmountError("Сума має бути числом")
            if amount <= 0:
                raise InvalidAmountError("Сума має бути додатньою")
            if amount > self.balance:
                raise InsufficientFundsError(
                    f"Недостатньо коштів. Баланс: {self.balance} грн, "
                    f"запитується: {amount} грн"
                )
            
            self.balance -= amount
            print(f"Знято {amount} грн. Новий баланс: {self.balance} грн")
            return self.balance
            
        except InsufficientFundsError as e:
            print(f"Помилка: {e}")
            return None
        except InvalidAmountError as e:
            print(f"Помилка: {e}")
            return None
    
    def get_balance(self):
        """Отримання балансу"""
        return self.balance

# Використання
account = BankAccount("12345", "Олексій", 1000)
account.deposit(500)
account.withdraw(200)
account.withdraw(2000)  # Помилка: недостатньо коштів
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Калькулятор з обробкою помилок",
      code: `# Калькулятор з обробкою помилок
class CalculatorError(Exception):
    pass

def safe_calculate(operation, a, b):
    try:
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise CalculatorError("Аргументи мають бути числами")
        if operation == '+':
            return a + b
        elif operation == '/':
            if b == 0:
                raise CalculatorError("Ділення на нуль!")
            return a / b
        else:
            raise CalculatorError(f"Невідома операція: {operation}")
    except CalculatorError as e:
        print(f"Помилка: {e}")
        return None

result = safe_calculate('+', 10, 5)`,
      explanation: "Демонструє калькулятор з обробкою різних типів помилок."
    },
    {
      title: "Приклад 2: Безпечна робота з файлами",
      code: `# Безпечна робота з файлами
def safe_read_file(filename):
    try:
        if not os.path.exists(filename):
            raise FileNotFoundError(f"Файл '{filename}' не знайдено")
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError as e:
        print(f"Помилка: {e}")
        return None
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return None

content = safe_read_file("data.txt")`,
      explanation: "Показує безпечну роботу з файлами з обробкою помилок."
    },
    {
      title: "Приклад 3: Валідація користувацького введення",
      code: `# Валідація введення користувача
class ValidationError(Exception):
    pass

def validate_user_input(name, age, email):
    try:
        if not name or len(name) == 0:
            raise ValidationError("Ім'я не може бути порожнім")
        if not isinstance(age, int) or age < 18:
            raise ValidationError("Вік має бути не менше 18")
        if '@' not in email:
            raise ValidationError("Email має містити @")
        return True
    except ValidationError as e:
        print(f"Помилка валідації: {e}")
        return False

validate_user_input("Олексій", 25, "oleksiy@example.com")`,
      explanation: "Демонструє валідацію користувацького введення з обробкою помилок."
    },
    {
      title: "Приклад 4: Банківський рахунок",
      code: `# Банківський рахунок з обробкою помилок
class InsufficientFundsError(Exception):
    pass

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
    
    def withdraw(self, amount):
        try:
            if amount > self.balance:
                raise InsufficientFundsError("Недостатньо коштів")
            self.balance -= amount
            return self.balance
        except InsufficientFundsError as e:
            print(f"Помилка: {e}")
            return None

account = BankAccount(1000)
account.withdraw(500)
account.withdraw(1000)  # Помилка`,
      explanation: "Показує клас банківського рахунку з обробкою помилок."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не валідувати дані на вході",
      explanation: "Без валідації програма може отримати некоректні дані та працювати неправильно.",
      correctApproach: "Завжди валідуй вхідні дані перед обробкою"
    },
    {
      mistake: "Приховувати помилки без повідомлень",
      explanation: "Без повідомлень користувач не зрозуміє, що пішло не так.",
      correctApproach: "Завжди показуй зрозумілі повідомлення про помилки"
    },
    {
      mistake: "Обробляти всі помилки однаково",
      explanation: "Різні типи помилок потребують різної обробки.",
      correctApproach: "Обробляй різні типи помилок окремо, використовуй ієрархію винятків"
    },
    {
      mistake: "Не логувати критичні помилки",
      explanation: "Без логування важко відлагоджувати програму та розуміти проблеми.",
      correctApproach: "Логуй всі критичні помилки для подальшого аналізу"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. Принципи обробки помилок - валідація, конкретні повідомлення, логування
2. Практичні приклади - калькулятор, робота з файлами, валідація введення
3. Комплексні системи - банківські рахунки з повною обробкою помилок
4. Надійний код - створення програм, які правильно обробляють помилки

Тепер ви вмієте створювати надійні програми з правильною обробкою помилок!

Це завершує модуль 7 - Обробка помилок та винятків!`,
  
  practiceTask: {
    title: "Створення простої програми з обробкою помилок",
    description: "Створіть просту програму для додавання книг з обробкою помилок",
    problemStatement: `Напишіть програму, яка:
1. Створює кастомний виняток BookError
2. Створює функцію add_book(title, author) з валідацією та обробкою помилок
3. Зчитує зі stdin n пар (title, author) і викликає add_book для кожної

Формат вводу:
- число n
- для кожної книги: рядок title, потім рядок author
(порожній рядок title або author - помилка валідації)`,
    outputFormat: `Книга 'Гаррі Поттер' додана успішно
Помилка: Назва книги не може бути порожньою
Помилка: Книга 'Гаррі Поттер' вже існує`,
    examples: [
      {
        input: `3
Гаррі Поттер
Дж. Роулінг

Автор
Гаррі Поттер
Інший автор`,
        output: `Книга 'Гаррі Поттер' додана успішно
Помилка: Назва книги не може бути порожньою
Помилка: Книга 'Гаррі Поттер' вже існує`,
        explanation: "Успіх, порожня назва, дублікат"
      },
      {
        input: `2
Кобзар
Т. Шевченко
Кобзар
Інший`,
        output: `Книга 'Кобзар' додана успішно
Помилка: Книга 'Кобзар' вже існує`,
        explanation: "Друга спроба з тією ж назвою - BookError"
      },
      {
        input: `2
Дюна

1984
Оруелл`,
        output: `Помилка: Автор не може бути порожнім
Книга '1984' додана успішно`,
        explanation: "Порожній автор, потім успішне додавання"
      }
    ],
    solution: {
      code: `class BookError(Exception):
    pass

books = {}

def add_book(title, author):
    try:
        if not title or len(title.strip()) == 0:
            raise ValueError("Назва книги не може бути порожньою")
        if not author or len(author.strip()) == 0:
            raise ValueError("Автор не може бути порожнім")
        if title in books:
            raise BookError(f"Книга '{title}' вже існує")
        books[title] = author
        print(f"Книга '{title}' додана успішно")
        return True
    except ValueError as e:
        print(f"Помилка: {e}")
        return False
    except BookError as e:
        print(f"Помилка: {e}")
        return False

n = int(input())
for _ in range(n):
    title = input()
    author = input()
    add_book(title, author)`,
      explanation: "Читаємо пари title/author з stdin і обробляємо ValueError/BookError."
    },
    hints: [
      "Створи клас BookError від Exception",
      "Зчитай n, потім для кожної книги два рядки через input()",
      "Порожній рядок - це помилка валідації",
      "Дублікат назви - BookError"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який принцип обробки помилок найважливіший?",
        options: [
          "Валідація на вході",
          "Швидкість виконання",
          "Мінімальний код",
          "Відсутність коментарів"
        ],
        correctAnswer: 0,
        explanation: "Валідація на вході - один з найважливіших принципів, оскільки запобігає обробці некоректних даних."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо показувати конкретні повідомлення про помилки?",
        options: [
          "Щоб користувач зрозумів, що пішло не так",
          "Щоб код працював швидше",
          "Щоб займати менше пам'яті",
          "Немає переваг"
        ],
        correctAnswer: 0,
        explanation: "Конкретні повідомлення допомагають користувачу зрозуміти проблему та виправити її."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\ndef process(data):\n    try:\n        result = data / 0\n    except:\n        pass\n```",
        options: [
          "Пустий except приховує помилки",
          "Неправильний синтаксис try",
          "Неправильний синтаксис except",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "Пустий except з pass приховує помилки без повідомлення, що ускладнює відлагодження."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати ієрархію винятків?",
        options: [
          "Коли потрібно обробляти різні типи помилок по-різному",
          "Коли потрібно швидший код",
          "Коли потрібно менше пам'яті",
          "Ніколи"
        ],
        correctAnswer: 0,
        explanation: "Ієрархія винятків дозволяє обробляти різні типи помилок на різних рівнях (конкретні та загальні)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке валідація даних?",
        options: [
          "Перевірка вхідних даних на коректність",
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
