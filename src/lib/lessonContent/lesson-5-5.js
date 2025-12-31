/**
 * Lesson 5-5: Створення власних винятків
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_5 = {
  lessonId: "lesson-5-5",
  moduleId: "module-5",
  order: 5,
  title: "Створення власних винятків",
  
  learningObjectives: [
    "Створювати кастомні класи винятків",
    "Піднімати винятки (raise)",
    "Створювати ієрархію винятків",
    "Документувати винятки",
    "Розуміти коли створювати власні винятки"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-5-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Чому створювати власні винятки?",
        content: `**Проблема:** Стандартні винятки не завжди описують конкретну ситуацію.

**Приклад:**
\`\`\`python
def встановити_вік(вік):
    if вік < 0:
        raise ValueError("Вік не може бути від'ємним")  # Не дуже зрозуміло
\`\`\`

**Рішення:** Створити власний клас винятку!

**Переваги власних винятків:**
- ✅ Більш зрозумілі повідомлення
- ✅ Легше обробляти конкретні помилки
- ✅ Краща організація коду
- ✅ Можна додати додаткову інформацію

**Коли створювати:**
- Коли стандартні винятки не підходять
- Коли потрібна специфічна обробка
- Для кращої читабельності коду`
      },
      {
        title: "Базовий кастомний виняток",
        content: `**Створення власного винятку:**

\`\`\`python
class InvalidAgeError(Exception):
    """Виняток для некоректного віку."""
    pass

# Використання
def встановити_вік(вік):
    if вік < 0:
        raise InvalidAgeError("Вік не може бути від'ємним!")
    if вік > 150:
        raise InvalidAgeError("Вік занадто великий!")
    return вік

# Обробка
try:
    встановити_вік(-5)
except InvalidAgeError as e:
    print(f"Помилка віку: {e}")
\`\`\`

**Структура:**
- Наслідується від \`Exception\`
- Може мати docstring для документації
- Може приймати повідомлення через конструктор

**Приклад з повідомленням:**
\`\`\`python
class InvalidAgeError(Exception):
    """Виняток для некоректного віку."""
    def __init__(self, message, вік=None):
        self.message = message
        self.вік = вік
        super().__init__(self.message)

def встановити_вік(вік):
    if вік < 0:
        raise InvalidAgeError(f"Вік {вік} некоректний!", вік=вік)
\`\`\``
      },
      {
        title: "Ієрархія винятків",
        content: `**Ієрархія** — створення сімейства пов'язаних винятків.

**Приклад: Система обліку студентів**
\`\`\`python
# Базовий виняток
class StudentError(Exception):
    """Базовий виняток для помилок студентів."""
    pass

# Спеціалізовані винятки
class InvalidStudentError(StudentError):
    """Помилка валідації студента."""
    pass

class StudentNotFoundError(StudentError):
    """Студент не знайдено."""
    pass

class DuplicateStudentError(StudentError):
    """Дублікат студента."""
    pass

# Використання
def знайти_студента(ім_я):
    if not ім_я:
        raise InvalidStudentError("Ім'я не може бути порожнім!")
    # ... пошук
    if не_знайдено:
        raise StudentNotFoundError(f"Студент '{ім_я}' не знайдено!")

# Обробка
try:
    знайти_студента("")
except StudentError as e:  # Обробляє всі типи помилок студентів
    print(f"Помилка студента: {e}")
\`\`\`

**Переваги ієрархії:**
- ✅ Можна обробляти всі типи разом (через базовий клас)
- ✅ Можна обробляти конкретні типи окремо
- ✅ Логічна організація помилок`
      },
      {
        title: "Додавання атрибутів до винятків",
        content: `**Можна додавати додаткову інформацію:**

\`\`\`python
class ValidationError(Exception):
    """Помилка валідації з додатковою інформацією."""
    def __init__(self, message, field=None, value=None):
        self.message = message
        self.field = field  # Яке поле некоректне
        self.value = value  # Яке значення
        super().__init__(self.message)

def валідувати_студента(ім_я, вік):
    if not ім_я:
        raise ValidationError("Ім'я не може бути порожнім", field="ім'я", value=ім_я)
    if вік < 0:
        raise ValidationError("Вік не може бути від'ємним", field="вік", value=вік)

# Обробка з доступом до атрибутів
try:
    валідувати_студента("", -5)
except ValidationError as e:
    print(f"Помилка валідації: {e.message}")
    print(f"Поле: {e.field}")
    print(f"Значення: {e.value}")
\`\`\`

**Корисно для:**
- Детальної інформації про помилку
- Логування
- Відлагодження`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Файлові операції**
\`\`\`python
class FileOperationError(Exception):
    """Базовий виняток для файлових операцій."""
    pass

class FileNotFoundError(FileOperationError):
    """Файл не знайдено."""
    pass

class FilePermissionError(FileOperationError):
    """Немає доступу до файлу."""
    pass

class FileCorruptedError(FileOperationError):
    """Файл пошкоджено."""
    pass
\`\`\`

**Приклад 2: Валідація даних**
\`\`\`python
class DataValidationError(Exception):
    """Помилка валідації даних."""
    def __init__(self, message, field, value):
        self.message = message
        self.field = field
        self.value = value
        super().__init__(f"{message} (поле: {field}, значення: {value})")
\`\`\`

**Приклад 3: Бізнес-логіка**
\`\`\`python
class InsufficientFundsError(Exception):
    """Недостатньо коштів."""
    def __init__(self, баланс, сума):
        self.баланс = баланс
        self.сума = сума
        message = f"Недостатньо коштів! Баланс: {баланс}, потрібно: {сума}"
        super().__init__(message)
\`\`\``
      },
      {
        title: "Документування винятків",
        content: `**Важливо документувати винятки:**

\`\`\`python
class InvalidEmailError(Exception):
    """
    Виняток для некоректної електронної пошти.
    
    Args:
        email: Некоректна електронна пошта
        reason: Причина помилки
    
    Example:
        >>> raise InvalidEmailError("test@", "відсутній домен")
        InvalidEmailError: Некоректна електронна пошта: test@ (причина: відсутній домен)
    """
    def __init__(self, email, reason=None):
        self.email = email
        self.reason = reason
        message = f"Некоректна електронна пошта: {email}"
        if reason:
            message += f" (причина: {reason})"
        super().__init__(message)
\`\`\`

**Переваги документації:**
- ✅ Зрозуміло, коли використовувати
- ✅ Зрозуміло, які параметри приймає
- ✅ Приклади використання
- ✅ Краща підтримка коду`
      },
      {
        title: "Кращі практики",
        content: `**1. Назви винятків закінчуються на Error:**
\`\`\`python
# Добре:
class InvalidAgeError(Exception): pass
class FileNotFoundError(Exception): pass

# Погано:
class InvalidAge(Exception): pass
class FileNotFound(Exception): pass
\`\`\`

**2. Створюйте ієрархію для пов'язаних винятків:**
\`\`\`python
# Добре:
class DatabaseError(Exception): pass
class ConnectionError(DatabaseError): pass
class QueryError(DatabaseError): pass

# Погано:
class ConnectionError(Exception): pass
class QueryError(Exception): pass  # Не пов'язані
\`\`\`

**3. Додавайте корисну інформацію:**
\`\`\`python
# Добре:
raise ValidationError("Вік некоректний", field="вік", value=-5)

# Погано:
raise ValidationError("Помилка")
\`\`\`

**4. Документуйте винятки:**
\`\`\`python
class MyError(Exception):
    """Опис того, коли виникає ця помилка."""
    pass
\`\`\`

**5. Не створюйте занадто багато винятків:**
- Використовуйте стандартні, коли можливо
- Створюйте власні тільки коли потрібно`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий кастомний виняток",
      code: `# Створення власного винятку
class InvalidAgeError(Exception):
    """Виняток для некоректного віку."""
    pass

# Використання
def встановити_вік(вік):
    if вік < 0:
        raise InvalidAgeError("Вік не може бути від'ємним!")
    if вік > 150:
        raise InvalidAgeError("Вік занадто великий!")
    return вік

# Обробка
try:
    встановити_вік(-5)
except InvalidAgeError as e:
    print(f"Помилка: {e}")`,
      explanation: "Демонструє створення та використання базового кастомного винятку."
    },
    {
      title: "Приклад 2: Виняток з атрибутами",
      code: `# Виняток з додатковою інформацією
class ValidationError(Exception):
    """Помилка валідації."""
    def __init__(self, message, field=None, value=None):
        self.message = message
        self.field = field
        self.value = value
        super().__init__(self.message)

# Використання
def валідувати_дані(ім_я, вік):
    if not ім_я:
        raise ValidationError("Ім'я не може бути порожнім", field="ім'я", value=ім_я)
    if вік < 0:
        raise ValidationError("Вік некоректний", field="вік", value=вік)

# Обробка
try:
    валідувати_дані("", -5)
except ValidationError as e:
    print(f"Помилка: {e.message}")
    print(f"Поле: {e.field}, Значення: {e.value}")`,
      explanation: "Показує створення винятку з додатковими атрибутами для детальної інформації."
    },
    {
      title: "Приклад 3: Ієрархія винятків",
      code: `# Базовий виняток
class StudentError(Exception):
    """Базовий виняток для помилок студентів."""
    pass

# Спеціалізовані винятки
class InvalidStudentError(StudentError):
    """Помилка валідації студента."""
    pass

class StudentNotFoundError(StudentError):
    """Студент не знайдено."""
    pass

# Використання
def знайти_студента(ім_я, студенти):
    if not ім_я:
        raise InvalidStudentError("Ім'я не може бути порожнім!")
    if ім_я not in студенти:
        raise StudentNotFoundError(f"Студент '{ім_я}' не знайдено!")
    return студенти[ім_я]

# Обробка
try:
    знайти_студента("", {})
except StudentNotFoundError as e:
    print(f"Студент не знайдено: {e}")
except StudentError as e:  # Обробляє всі типи помилок студентів
    print(f"Помилка студента: {e}")`,
      explanation: "Демонструє створення ієрархії винятків для логічної організації помилок."
    },
    {
      title: "Приклад 4: Практичний приклад - банківська система",
      code: `# Банківські винятки
class BankError(Exception):
    """Базовий виняток для банківських операцій."""
    pass

class InsufficientFundsError(BankError):
    """Недостатньо коштів."""
    def __init__(self, баланс, сума):
        self.баланс = баланс
        self.сума = сума
        message = f"Недостатньо коштів! Баланс: {баланс}, потрібно: {сума}"
        super().__init__(message)

class InvalidAmountError(BankError):
    """Некоректна сума."""
    pass

# Використання
class BankAccount:
    def __init__(self, баланс=0):
        self.баланс = баланс
    
    def зняти(self, сума):
        if сума <= 0:
            raise InvalidAmountError("Сума має бути додатньою!")
        if сума > self.баланс:
            raise InsufficientFundsError(self.баланс, сума)
        self.баланс -= сума
        return self.баланс

# Обробка
account = BankAccount(100)
try:
    account.зняти(150)
except InsufficientFundsError as e:
    print(f"Помилка: {e}")
    print(f"Баланс: {e.баланс}, Потрібно: {e.сума}")`,
      explanation: "Показує практичне використання кастомних винятків у реальному сценарії."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не наслідувати від Exception",
      explanation: "Якщо виняток не наслідується від Exception, він не буде правильно оброблятися стандартними механізмами.",
      correctApproach: "Завжди наслідуйте від Exception або його підкласів: class MyError(Exception): pass"
    },
    {
      mistake: "Створення занадто багатьох винятків",
      explanation: "Створення окремого винятку для кожної ситуації ускладнює код та обробку помилок.",
      correctApproach: "Використовуйте стандартні винятки, коли можливо. Створюйте власні тільки коли потрібна специфічна обробка."
    },
    {
      mistake: "Не документувати винятки",
      explanation: "Без документації важко зрозуміти, коли та як використовувати виняток.",
      correctApproach: "Додавайте docstring до класу винятку, описуючи коли він виникає та які параметри приймає."
    },
    {
      mistake: "Назви без суфіксу Error",
      explanation: "Назви без Error менш зрозумілі та не відповідають конвенціям Python.",
      correctApproach: "Завжди додавайте суфікс Error до назв винятків: InvalidAgeError, а не InvalidAge."
    },
    {
      mistake: "Не передавати корисну інформацію",
      explanation: "Винятки без детальної інформації ускладнюють відлагодження та обробку помилок.",
      correctApproach: "Додавайте атрибути з корисними даними: field, value, reason тощо."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Власні винятки** — створення кастомних класів винятків
2. **Наслідування від Exception** — базовий клас для всіх винятків
3. **Ієрархія винятків** — створення сімейства пов'язаних винятків
4. **Атрибути винятків** — додавання додаткової інформації
5. **Документування** — опис винятків через docstring
6. **raise** — виклик власних винятків

**Кращі практики:**
- Назви закінчуються на Error
- Наслідуйте від Exception
- Створюйте ієрархію для пов'язаних винятків
- Додавайте корисну інформацію
- Документуйте винятки

**Коли створювати:**
- Коли стандартні винятки не підходять
- Коли потрібна специфічна обробка
- Для кращої читабельності коду

Власні винятки роблять код більш зрозумілим та легшим для обробки помилок!`,
  
  practiceTask: {
    title: "Створення системи валідації з кастомними винятками",
    description: "Створіть систему валідації даних з використанням власних винятків",
    problemStatement: `Створіть систему валідації користувацьких даних з наступними вимогами:

**1. Створіть ієрархію винятків:**
- ValidationError (базовий)
- InvalidEmailError (некоректна електронна пошта)
- InvalidPasswordError (некоректний пароль)
- InvalidAgeError (некоректний вік)
- InvalidPhoneError (некоректний телефон)

**2. Кожен виняток має містити:**
- Повідомлення про помилку
- Поле, яке некоректне
- Значення, яке викликало помилку
- Додаткову інформацію (якщо потрібно)

**3. Створіть функції валідації:**
- валідувати_email(email) — перевіряє формат email
- валідувати_пароль(пароль) — мінімум 8 символів, велика літера, цифра
- валідувати_вік(вік) — від 0 до 150
- валідувати_телефон(телефон) — формат +380XXXXXXXXX

**4. Функція реєстрації:**
- Приймає всі дані
- Валідує кожне поле
- Викликає відповідний виняток при помилці
- Повертає True при успішній валідації

**5. Обробка помилок:**
- Обробляйте конкретні типи винятків
- Виводьте зрозумілі повідомлення
- Показуйте поле та значення, яке викликало помилку

**Вимоги:**
- Використовуйте ієрархію винятків
- Додавайте docstring до кожного винятку
- Додавайте корисну інформацію до винятків
- Обробляйте помилки з детальною інформацією

**Приклад використання:**
\`\`\`
Введіть email: test@
Введіть пароль: 123
Введіть вік: -5
Введіть телефон: 123

Помилка валідації email: Некоректний формат email (поле: email, значення: test@)
Помилка валідації пароля: Пароль має містити мінімум 8 символів (поле: пароль)
Помилка валідації віку: Вік не може бути від'ємним (поле: вік, значення: -5)
\`\`\``,
    inputFormat: "Створіть систему валідації з винятками та функціями",
    outputFormat: `Приклад виведення:
Введіть email: test@example.com
Введіть пароль: Password123
Введіть вік: 25
Введіть телефон: +380501234567

Валідація успішна!`,
    examples: [
      {
        input: "Email: test@, Пароль: 123, Вік: -5",
        output: "Помилки валідації для кожного поля",
        explanation: "Система виявляє та виводить помилки для кожного некоректного поля"
      },
      {
        input: "Всі дані коректні",
        output: "Валідація успішна!",
        explanation: "При коректних даних система підтверджує успішну валідацію"
      }
    ],
    solution: {
      code: `# Ієрархія винятків
class ValidationError(Exception):
    """Базовий виняток для помилок валідації."""
    def __init__(self, message, field=None, value=None):
        self.message = message
        self.field = field
        self.value = value
        super().__init__(self.message)

class InvalidEmailError(ValidationError):
    """Виняток для некоректної електронної пошти."""
    pass

class InvalidPasswordError(ValidationError):
    """Виняток для некоректного пароля."""
    pass

class InvalidAgeError(ValidationError):
    """Виняток для некоректного віку."""
    pass

class InvalidPhoneError(ValidationError):
    """Виняток для некоректного телефону."""
    pass

# Функції валідації
def валідувати_email(email):
    """Валідує електронну пошту."""
    if not email:
        raise InvalidEmailError("Email не може бути порожнім", field="email", value=email)
    
    if "@" not in email or "." not in email:
        raise InvalidEmailError("Некоректний формат email", field="email", value=email)
    
    частини = email.split("@")
    if len(частини) != 2 or not частини[0] or not частини[1]:
        raise InvalidEmailError("Некоректний формат email", field="email", value=email)
    
    return True

def валідувати_пароль(пароль):
    """Валідує пароль."""
    if not пароль:
        raise InvalidPasswordError("Пароль не може бути порожнім", field="пароль")
    
    if len(пароль) < 8:
        raise InvalidPasswordError("Пароль має містити мінімум 8 символів", field="пароль")
    
    if not any(c.isupper() for c in пароль):
        raise InvalidPasswordError("Пароль має містити хоча б одну велику літеру", field="пароль")
    
    if not any(c.isdigit() for c in пароль):
        raise InvalidPasswordError("Пароль має містити хоча б одну цифру", field="пароль")
    
    return True

def валідувати_вік(вік):
    """Валідує вік."""
    try:
        вік = int(вік)
    except (ValueError, TypeError):
        raise InvalidAgeError("Вік має бути числом", field="вік", value=вік)
    
    if вік < 0:
        raise InvalidAgeError("Вік не може бути від'ємним", field="вік", value=вік)
    
    if вік > 150:
        raise InvalidAgeError("Вік занадто великий", field="вік", value=вік)
    
    return True

def валідувати_телефон(телефон):
    """Валідує номер телефону."""
    if not телефон:
        raise InvalidPhoneError("Телефон не може бути порожнім", field="телефон", value=телефон)
    
    if not телефон.startswith("+380"):
        raise InvalidPhoneError("Телефон має починатися з +380", field="телефон", value=телефон)
    
    if len(телефон) != 13:
        raise InvalidPhoneError("Телефон має містити 13 символів (+380XXXXXXXXX)", field="телефон", value=телефон)
    
    if not телефон[1:].isdigit():
        raise InvalidPhoneError("Телефон має містити тільки цифри після +", field="телефон", value=телефон)
    
    return True

def реєстрація(email, пароль, вік, телефон):
    """Валідує всі дані для реєстрації."""
    помилки = []
    
    # Валідація email
    try:
        валідувати_email(email)
    except InvalidEmailError as e:
        помилки.append(e)
    
    # Валідація пароля
    try:
        валідувати_пароль(пароль)
    except InvalidPasswordError as e:
        помилки.append(e)
    
    # Валідація віку
    try:
        валідувати_вік(вік)
    except InvalidAgeError as e:
        помилки.append(e)
    
    # Валідація телефону
    try:
        валідувати_телефон(телефон)
    except InvalidPhoneError as e:
        помилки.append(e)
    
    # Виведення помилок
    if помилки:
        print("\\n=== Помилки валідації ===")
        for помилка in помилки:
            print(f"Помилка валідації {помилка.field}: {помилка.message}", end="")
            if помилка.value is not None:
                print(f" (значення: {помилка.value})")
            else:
                print()
        return False
    
    print("\\nВалідація успішна!")
    return True

# Головна функція
def головна():
    """Головна функція програми."""
    print("=== Реєстрація ===")
    
    email = input("Введіть email: ")
    пароль = input("Введіть пароль: ")
    вік = input("Введіть вік: ")
    телефон = input("Введіть телефон: ")
    
    реєстрація(email, пароль, вік, телефон)

# Запуск програми
if __name__ == "__main__":
    головна()`,
      explanation: "Рішення демонструє повну систему валідації з ієрархією винятків, детальною інформацією та обробкою помилок."
    },
    hints: [
      "Створіть базовий ValidationError з атрибутами field та value",
      "Наслідуйте спеціалізовані винятки від ValidationError",
      "Додавайте docstring до кожного винятку",
      "У функціях валідації викликайте raise з відповідним винятком",
      "У функції реєстрації зберігайте всі помилки та виводьте їх разом"
    ],
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Від чого має наслідуватися кастомний виняток?",
        options: ["object", "Exception", "Error", "BaseException"],
        correctAnswer: 1,
        explanation: "Кастомні винятки мають наслідуватися від Exception або його підкласів для правильної обробки."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка конвенція для назв винятків?",
        options: ["Починатися з Error", "Закінчуватися на Error", "Бути в нижньому регістрі", "Бути скороченими"],
        correctAnswer: 1,
        explanation: "Назви винятків за конвенцією Python закінчуються на Error: InvalidAgeError, FileNotFoundError."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\nclass MyError(Exception): pass\ntry:\n    raise MyError('Помилка')\nexcept Exception as e:\n    print(type(e).__name__)",
        options: ["MyError", "Exception", "Error", "Помилка"],
        correctAnswer: 0,
        explanation: "type(e).__name__ поверне назву класу винятку, який був викликаний, тобто 'MyError'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо створювати ієрархію винятків?",
        options: ["Швидше працює", "Можна обробляти всі типи разом через базовий клас", "Менше пам'яті", "Краще виглядає"],
        correctAnswer: 1,
        explanation: "Ієрархія дозволяє обробляти всі пов'язані винятки через базовий клас (except BaseError:) або конкретні типи окремо."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\nclass A(Exception): pass\nclass B(A): pass\ntry:\n    raise B('Помилка')\nexcept A:\n    print('Оброблено')",
        options: ["Оброблено", "Помилка", "B", "Помилку"],
        correctAnswer: 0,
        explanation: "Оскільки B наслідується від A, except A: обробить виняток типу B, тому виведе 'Оброблено'."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
