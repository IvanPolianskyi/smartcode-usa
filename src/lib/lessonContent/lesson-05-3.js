/**
 * Lesson 05-3: Інкапсуляція та модифікатори доступу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_3 = {
  lessonId: "lesson-05-3",
  moduleId: "module-05",
  order: 3,
  title: "Інкапсуляція та модифікатори доступу",
  
  learningObjectives: [
    "Розуміти концепцію інкапсуляції",
    "Використовувати публічні та приватні атрибути",
    "Застосовувати property декоратор",
    "Контролювати доступ до даних",
    "Створювати геттери та сеттери"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-05-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке інкапсуляція?",
        content: `**Інкапсуляція** — це один з основних принципів об'єктно-орієнтованого програмування.

**Визначення:**
Інкапсуляція — це механізм об'єднання даних та методів, які працюють з цими даними, в одному класі, а також обмеження доступу до внутрішніх деталей об'єкта.

**Основні ідеї:**
- ✅ **Приховування реалізації** — внутрішні деталі об'єкта приховані від зовнішнього коду
- ✅ **Контроль доступу** — можна контролювати, як зовнішній код взаємодіє з об'єктом
- ✅ **Захист даних** — дані захищені від некоректного використання
- ✅ **Гнучкість** — можна змінювати внутрішню реалізацію без впливу на зовнішній код

**Аналогія:**
Уявіть автомобіль:
- Ви знаєте, як керувати (публічний інтерфейс: руль, педалі)
- Ви не знаєте, як працює двигун всередині (прихована реалізація)
- Ви не можете безпосередньо змінювати внутрішні деталі (захист)

**У Python:**
- За замовчуванням всі атрибути та методи публічні
- Можна зробити атрибути приватними (починаються з подвійного підкреслення)
- Можна використовувати property для контролю доступу`
      },
      {
        title: "Публічні атрибути та методи",
        content: `**Публічні** атрибути та методи доступні з будь-якого місця в коді.

**У Python за замовчуванням все публічне:**

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name      # Публічний атрибут
        self.age = age        # Публічний атрибут
        self.grades = []      # Публічний атрибут
    
    def add_grade(self, grade):  # Публічний метод
        self.grades.append(grade)
    
    def get_average(self):  # Публічний метод
        if len(self.grades) == 0:
            return 0
        return sum(self.grades) / len(self.grades)

# Можна отримати доступ з будь-якого місця
student = Student("Олександр", 20)
print(student.name)        # Прямий доступ до атрибута
student.age = 21           # Можна змінити напряму
student.add_grade(85)      # Виклик публічного методу
\`\`\`

**Переваги публічних атрибутів:**
- Простота використання
- Легкий доступ до даних

**Недоліки:**
- Немає контролю над змінами
- Можна встановити некоректні значення
- Неможливо додати валідацію при зміні`
      },
      {
        title: "Приватні атрибути та методи",
        content: `**Приватні** атрибути та методи доступні тільки всередині класу.

**Синтаксис:**
- Починаються з подвійного підкреслення: __attribute
- Python автоматично перейменовує їх (name mangling)

**Приклад:**

\`\`\`python
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner                    # Публічний
        self.__balance = initial_balance      # Приватний
        self.__transaction_history = []       # Приватний
    
    def deposit(self, amount):
        """Публічний метод для поповнення"""
        if amount > 0:
            self.__balance += amount
            self.__transaction_history.append(f"Поповнення: +{amount}")
            return True
        return False
    
    def withdraw(self, amount):
        """Публічний метод для зняття"""
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            self.__transaction_history.append(f"Зняття: -{amount}")
            return True
        return False
    
    def get_balance(self):
        """Публічний метод для отримання балансу"""
        return self.__balance
    
    def get_history(self):
        """Публічний метод для отримання історії"""
        return self.__transaction_history.copy()

# Використання
account = BankAccount("Олександр", 1000)

# Публічні методи - працюють
account.deposit(500)
account.withdraw(200)
print(account.get_balance())  # 1300

# Спроба прямого доступу до приватного атрибута
# print(account.__balance)  # Помилка! AttributeError

# Але можна отримати доступ через name mangling (не рекомендується)
# print(account._BankAccount__balance)  # Працює, але не рекомендується
\`\`\`

**Важливо:**
- Приватні атрибути захищені від прямого доступу
- Доступ можливий тільки через публічні методи
- Це дозволяє контролювати та валідувати зміни

**Name Mangling:**
Python перейменовує приватні атрибути: __balance стає _BankAccount__balance
Це робить їх важкодоступними, але не повністю недоступними.`
      },
      {
        title: "Захищені атрибути (protected)",
        content: `**Захищені** атрибути — це конвенція в Python (не захищені на рівні мови).

**Синтаксис:**
- Починаються з одного підкреслення: \`_attribute\`
- Це конвенція для розробників: "не використовуйте ззовні класу"

**Приклад:**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name          # Публічний
        self._age = age           # Захищений (конвенція)
        self.__id = "P123"        # Приватний
    
    def get_age(self):
        return self._age
    
    def set_age(self, age):
        if 0 <= age <= 150:
            self._age = age
        else:
            print("Невірний вік")

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self._student_id = student_id  # Захищений
    
    def show_info(self):
        # Можна використовувати захищені атрибути батьківського класу
        return f"{self.name}, {self._age} років, ID: {self._student_id}"

# Використання
student = Student("Олександр", 20, "S001")
print(student.show_info())  # Олександр, 20 років, ID: S001

# Технічно можна отримати доступ (але не рекомендується)
print(student._age)  # Працює, але це конвенція - не використовуйте
\`\`\`

**Конвенції доступу в Python:**

| Префікс | Тип | Доступність | Приклад |
|---------|-----|-------------|---------|
| Немає | Публічний | З будь-якого місця | name |
| _ | Захищений | Конвенція (не використовуйте ззовні) | _age |
| __ | Приватний | Тільки всередині класу | __balance |

**Важливо:**
- Python не забороняє доступ до захищених атрибутів
- Це конвенція для розробників
- Використовується для позначення "внутрішніх" атрибутів`
      },
      {
        title: "Property декоратор",
        content: `**Property** — це спосіб контролю доступу до атрибутів через методи.

**Проблема без property:**
\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    def get_area(self):
        return 3.14159 * self.radius ** 2

circle = Circle(5)
print(circle.radius)  # 5
circle.radius = -10   # Можна встановити від'ємне значення!
print(circle.get_area())  # Некоректний результат
\`\`\`

**Рішення з property:**

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius  # Захищений атрибут
    
    @property
    def radius(self):
        """Геттер - отримує значення"""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Сеттер - встановлює значення з валідацією"""
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним")
        self._radius = value
    
    @property
    def area(self):
        """Обчислювана властивість"""
        return 3.14159 * self._radius ** 2

# Використання
circle = Circle(5)
print(circle.radius)  # 5 (викликається геттер)
print(circle.area)    # 78.54 (обчислюється автоматично)

circle.radius = 10     # Викликається сеттер
print(circle.radius)   # 10
print(circle.area)    # 314.16

# circle.radius = -5   # Помилка! ValueError
\`\`\`

**Переваги property:**
- ✅ Використання як звичайного атрибута
- ✅ Можна додати валідацію
- ✅ Можна обчислювати значення
- ✅ Можна додати логіку при читанні/записі

**Синтаксис:**
\`\`\`python
@property
def attribute(self):
    """Геттер"""
    return self._attribute

@attribute.setter
def attribute(self, value):
    """Сеттер"""
    self._attribute = value
\`\`\``
      },
      {
        title: "Практичний приклад: клас Temperature",
        content: `**Комплексний приклад з property:**

\`\`\`python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Температура в Цельсіях"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Встановлює температуру в Цельсіях з валідацією"""
        if value < -273.15:
            raise ValueError("Температура не може бути нижчою за абсолютний нуль")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Температура в Фаренгейтах (тільки для читання)"""
        return self._celsius * 9/5 + 32
    
    @property
    def kelvin(self):
        """Температура в Кельвінах (тільки для читання)"""
        return self._celsius + 273.15
    
    def __str__(self):
        return f"{self._celsius}°C ({self.fahrenheit}°F, {self.kelvin}K)"

# Використання
temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)   # 77.0 (обчислюється автоматично)
print(temp.kelvin)      # 298.15 (обчислюється автоматично)

temp.celsius = 30       # Змінюємо через сеттер
print(temp.fahrenheit)  # 86.0 (автоматично перераховується)

# temp.celsius = -300   # Помилка! ValueError
\`\`\`

**Що ми бачимо:**
- \`celsius\` має геттер та сеттер з валідацією
- \`fahrenheit\` та \`kelvin\` — тільки для читання (немає сеттера)
- Значення автоматично перераховуються при зміні`
      },
      {
        title: "Геттери та сеттери без property",
        content: `**Традиційний підхід (без property):**

\`\`\`python
class BankAccount:
    def __init__(self, balance=0):
        self.__balance = balance
    
    def get_balance(self):
        """Геттер"""
        return self.__balance
    
    def set_balance(self, value):
        """Сеттер"""
        if value < 0:
            raise ValueError("Баланс не може бути від'ємним")
        self.__balance = value

# Використання
account = BankAccount(1000)
print(account.get_balance())  # 1000
account.set_balance(2000)     # Використовуємо методи
print(account.get_balance())  # 2000
\`\`\`

**Підхід з property (краще):**

\`\`\`python
class BankAccount:
    def __init__(self, balance=0):
        self.__balance = balance
    
    @property
    def balance(self):
        """Геттер"""
        return self.__balance
    
    @balance.setter
    def balance(self, value):
        """Сеттер"""
        if value < 0:
            raise ValueError("Баланс не може бути від'ємним")
        self.__balance = value

# Використання
account = BankAccount(1000)
print(account.balance)  # 1000 (виглядає як атрибут)
account.balance = 2000  # Виглядає як присвоєння атрибуту
print(account.balance)  # 2000
\`\`\`

**Переваги property:**
- Більш природний синтаксис
- Виглядає як робота з атрибутом
- Легше читати та писати код`
      },
      {
        title: "Read-only properties",
        content: `**Read-only properties** — властивості тільки для читання (без сеттера).

**Приклад:**

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    @property
    def width(self):
        return self._width
    
    @width.setter
    def width(self, value):
        if value <= 0:
            raise ValueError("Ширина має бути додатньою")
        self._width = value
    
    @property
    def height(self):
        return self._height
    
    @height.setter
    def height(self, value):
        if value <= 0:
            raise ValueError("Висота має бути додатньою")
        self._height = value
    
    @property
    def area(self):
        """Read-only property - обчислюється автоматично"""
        return self._width * self._height
    
    @property
    def perimeter(self):
        """Read-only property"""
        return 2 * (self._width + self._height)

# Використання
rect = Rectangle(5, 10)
print(rect.area)        # 50 (можна читати)
print(rect.perimeter)   # 30 (можна читати)

rect.width = 7          # Можна змінити
print(rect.area)        # 70 (автоматично перераховується)

# rect.area = 100       # Помилка! Немає сеттера
\`\`\`

**Коли використовувати read-only properties:**
- Обчислювані значення (площа, периметр)
- Значення, які не повинні змінюватися напряму
- Значення, які залежать від інших атрибутів`
      },
      {
        title: "Підсумок",
        content: `**Що ми вивчили:**

1. ✅ **Інкапсуляція** — приховування деталей реалізації
2. ✅ **Публічні атрибути** — доступні з будь-якого місця
3. ✅ **Приватні атрибути** (__attribute) — доступні тільки всередині класу
4. ✅ **Захищені атрибути** (\`_attribute\`) — конвенція для розробників
5. ✅ **Property декоратор** — контроль доступу через методи

**Ключові моменти:**

| Тип | Префікс | Доступність | Приклад |
|-----|---------|-------------|---------|
| Публічний | Немає | З будь-якого місця | name |
| Захищений | _ | Конвенція | _age |
| Приватний | __ | Тільки в класі | __balance |

**Property:**
- \`@property\` — геттер
- \`@attribute.setter\` — сеттер
- Дозволяє використовувати як атрибут з валідацією

**Переваги інкапсуляції:**
- Захист даних
- Контроль доступу
- Валідація значень
- Гнучкість змін реалізації

**Наступні кроки:**
- Вивчимо наслідування
- Дізнаємося про поліморфізм
- Вивчимо магічні методи

Тепер ви можете контролювати доступ до даних у ваших класах!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приватні атрибути",
      code: `class BankAccount:
    def __init__(self, balance=0):
        self.__balance = balance  # Приватний атрибут
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # 1500
# print(account.__balance)  # Помилка!`,
      explanation: "Демонструє використання приватних атрибутів для захисту даних."
    },
    {
      title: "Property з геттером та сеттером",
      code: `class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним")
        self._radius = value

circle = Circle(5)
circle.radius = 10  # Викликається сеттер
print(circle.radius)  # 10`,
      explanation: "Показує використання property для контролю доступу з валідацією."
    },
    {
      title: "Read-only property",
      code: `class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    @property
    def area(self):
        """Read-only - обчислюється автоматично"""
        return self._width * self._height

rect = Rectangle(5, 10)
print(rect.area)  # 50
# rect.area = 100  # Помилка! Немає сеттера`,
      explanation: "Демонструє read-only property для обчислюваних значень."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутають приватні та захищені атрибути",
      explanation: "Важливо розуміти різницю: _attribute — захищений (конвенція), __attribute — приватний (name mangling).",
      correctApproach: `# Захищений (конвенція)
class Student:
    def __init__(self, name):
        self._age = 20  # Конвенція - не використовуйте ззовні

# Приватний (name mangling)
class Student:
    def __init__(self, name):
        self.__age = 20  # Python перейменовує в _Student__age`
    },
    {
      mistake: "Намагаються встановити read-only property",
      explanation: "Якщо property не має сеттера, його неможливо змінити.",
      correctApproach: `# Правильно: read-only property
class Rectangle:
    @property
    def area(self):
        return self.width * self.height
    # Немає сеттера - тільки для читання

# Якщо потрібно змінювати, додайте сеттер
class Rectangle:
    @property
    def area(self):
        return self.width * self.height
    
    @area.setter
    def area(self, value):
        # Можна додати логіку для зміни width/height
        pass`
    },
    {
      mistake: "Забувають про валідацію в сеттерах",
      explanation: "Сеттери — ідеальне місце для валідації даних перед збереженням.",
      correctApproach: `# Неправильно: без валідації
class Circle:
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        self._radius = value  # Немає перевірки

# Правильно: з валідацією
class Circle:
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним")
        self._radius = value`
    },
    {
      mistake: "Використовують публічні атрибути для важливих даних",
      explanation: "Важливі дані (баланс, паролі) мають бути приватними з контролем доступу.",
      correctApproach: `# Неправильно: публічний баланс
class BankAccount:
    def __init__(self, balance):
        self.balance = balance  # Можна змінити напряму

# Правильно: приватний баланс з методами
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Приватний
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount`
    }
  ],
  
  summary: `На цьому уроці ми вивчили інкапсуляцію та модифікатори доступу:

**Основні концепції:**

1. **Інкапсуляція**
   - Приховування деталей реалізації
   - Контроль доступу до даних
   - Захист від некоректного використання

2. **Типи доступу:**
   - **Публічний** (немає префіксу) — доступний з будь-якого місця
   - **Захищений** (\`_attribute\`) — конвенція, не використовуйте ззовні
   - **Приватний** (__attribute) — доступний тільки всередині класу

3. **Property декоратор:**
   - \`@property\` — геттер (отримання значення)
   - \`@attribute.setter\` — сеттер (встановлення з валідацією)
   - Read-only properties — тільки для читання

**Ключові моменти:**
- Python за замовчуванням все публічне
- \`_attribute\` — конвенція (не захищено на рівні мови)
- __attribute — name mangling (Python перейменовує)
- Property дозволяє використовувати методи як атрибути

**Переваги:**
- Захист даних
- Валідація значень
- Гнучкість змін реалізації
- Чистіший інтерфейс

Тепер ви можете контролювати доступ до даних у ваших класах!`,
  
  practiceTask: {
    title: "Клас User з інкапсуляцією",
    description: "Створіть клас User з приватними атрибутами та property для контролю доступу",
    problemStatement: `Створіть клас User з наступними вимогами:

1. **Приватні атрибути:**
   - __username — ім'я користувача
   - __email — email
   - __age — вік
   - __password — пароль (тільки для зберігання, не можна читати напряму)

2. **Property для username:**
   - Геттер повертає username
   - Сеттер перевіряє, що username має мінімум 3 символи

3. **Property для email:**
   - Геттер повертає email
   - Сеттер перевіряє, що email містить символ '@'

4. **Property для age:**
   - Геттер повертає age
   - Сеттер перевіряє, що вік від 0 до 150

5. **Property для password (read-only для читання):**
   - Геттер повертає "***" (приховує пароль)
   - Немає сеттера (пароль встановлюється тільки в __init__)

6. **Методи:**
   - \`change_password(old_password, new_password)\` — змінює пароль, якщо старий правильний
   - \`verify_password(password)\` — перевіряє, чи пароль правильний (повертає True/False)
   - \`get_info()\` — повертає інформацію про користувача (без пароля)

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді.

Створіть об'єкт User та продемонструйте роботу всіх property та методів.`,
    inputFormat: `Введіть значення напряму в коді:
username = "oleksandr"
email = "oleksandr@example.com"
age = 25
password = "secret123"

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Приклад виведення:
Ім'я користувача: oleksandr
Email: oleksandr@example.com
Вік: 25
Пароль: ***
Інформація: Користувач: oleksandr, Email: oleksandr@example.com, Вік: 25
Пароль правильний: True
Пароль змінено: True`,
    examples: [
      {
        input: "username = 'oleksandr', email = 'oleksandr@example.com', age = 25, password = 'secret123'",
        output: `Ім'я користувача: oleksandr
Email: oleksandr@example.com
Вік: 25
Пароль: ***
Інформація: Користувач: oleksandr, Email: oleksandr@example.com, Вік: 25
Пароль правильний: True
Пароль змінено: True`,
        explanation: "Демонструє створення об'єкта User та використання property та методів."
      },
      {
        input: "Спроба встановити некоректні значення",
        output: `Спроба встановити username 'ab': ValueError
Спроба встановити email 'invalid': ValueError
Спроба встановити вік 200: ValueError`,
        explanation: "Демонструє валідацію через property сеттери."
      }
    ],
    solution: {
      code: `# Клас User з інкапсуляцією

class User:
    def __init__(self, username, email, age, password):
        # Приватні атрибути
        self.__username = username
        self.__email = email
        self.__age = age
        self.__password = password
    
    # Property для username
    @property
    def username(self):
        """Геттер для username"""
        return self.__username
    
    @username.setter
    def username(self, value):
        """Сеттер для username з валідацією"""
        if len(value) < 3:
            raise ValueError("Ім'я користувача має містити мінімум 3 символи")
        self.__username = value
    
    # Property для email
    @property
    def email(self):
        """Геттер для email"""
        return self.__email
    
    @email.setter
    def email(self, value):
        """Сеттер для email з валідацією"""
        if "@" not in value:
            raise ValueError("Email має містити символ '@'")
        self.__email = value
    
    # Property для age
    @property
    def age(self):
        """Геттер для age"""
        return self.__age
    
    @age.setter
    def age(self, value):
        """Сеттер для age з валідацією"""
        if not (0 <= value <= 150):
            raise ValueError("Вік має бути від 0 до 150")
        self.__age = value
    
    # Property для password (read-only для читання)
    @property
    def password(self):
        """Геттер для password - приховує пароль"""
        return "***"
    
    # Методи
    def change_password(self, old_password, new_password):
        """Змінює пароль, якщо старий правильний"""
        if self.__password == old_password:
            self.__password = new_password
            return True
        return False
    
    def verify_password(self, password):
        """Перевіряє, чи пароль правильний"""
        return self.__password == password
    
    def get_info(self):
        """Повертає інформацію про користувача"""
        return f"Користувач: {self.__username}, Email: {self.__email}, Вік: {self.__age}"

# Вводимо значення напряму в коді (не використовуємо input())

# Створюємо користувача
username = "oleksandr"
email = "oleksandr@example.com"
age = 25
password = "secret123"

user = User(username, email, age, password)

# Використовуємо property
print(f"Ім'я користувача: {user.username}")
print(f"Email: {user.email}")
print(f"Вік: {user.age}")
print(f"Пароль: {user.password}")  # Приховано

# Викликаємо методи
print(f"Інформація: {user.get_info()}")
print(f"Пароль правильний: {user.verify_password('secret123')}")
print(f"Пароль змінено: {user.change_password('secret123', 'newpass456')}")
print(f"Пароль правильний (новий): {user.verify_password('newpass456')}")

print()

# Демонстрація валідації через property
try:
    user.username = "ab"  # Занадто коротке
except ValueError as e:
    print(f"Помилка валідації username: {e}")

try:
    user.email = "invalid"  # Немає @
except ValueError as e:
    print(f"Помилка валідації email: {e}")

try:
    user.age = 200  # Занадто великий вік
except ValueError as e:
    print(f"Помилка валідації age: {e}")

# Успішна зміна
user.username = "oleksandr_new"
user.email = "newemail@example.com"
user.age = 30
print(f"Оновлена інформація: {user.get_info()}")`,
      explanation: "Рішення демонструє повну інкапсуляцію з приватними атрибутами, property для контролю доступу з валідацією, read-only property для пароля та методи для роботи з паролем."
    },
    hints: [
      "Введіть значення напряму в коді - не використовуйте input()",
      "Приватні атрибути починаються з __",
      "Property геттер використовує @property декоратор",
      "Property сеттер використовує @attribute.setter декоратор",
      "Для read-only property не створюйте сеттер",
      "Валідацію виконуйте в сеттерах перед присвоєнням",
      "Метод verify_password() порівнює переданий пароль з __password",
      "Метод change_password() перевіряє старий пароль перед зміною"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: ['"oleksandr"', '"oleksandr@example.com"', '25', '"secret123"'],
        expectedOutput: "oleksandr",
        description: "Перевірка створення об'єкта та property username"
      },
      {
        input: ['"oleksandr"', '"oleksandr@example.com"', '25', '"secret123"'],
        expectedOutput: "True",
        description: "Перевірка методу verify_password()"
      },
      {
        input: ['"ab"'],
        expectedOutput: "ValueError",
        description: "Перевірка валідації username (мінімум 3 символи)"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як позначаються приватні атрибути в Python?",
        options: [
          "Починаються з __ (подвійне підкреслення)",
          "Починаються з _ (одне підкреслення)",
          "Не мають префіксу",
          "Починаються з private"
        ],
        correctAnswer: 0,
        explanation: "Приватні атрибути в Python позначаються подвійним підкресленням на початку: __attribute. Python використовує name mangling для їх захисту."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке інкапсуляція?",
        options: [
          "Приховування деталей реалізації та контроль доступу до даних",
          "Створення об'єктів",
          "Наслідування класів",
          "Використання функцій"
        ],
        correctAnswer: 0,
        explanation: "Інкапсуляція — це механізм приховування деталей реалізації та контролю доступу до даних об'єкта. Вона дозволяє захистити дані від некоректного використання."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який декоратор використовується для створення property?",
        options: [
          "@property",
          "@getter",
          "@setter",
          "@attribute"
        ],
        correctAnswer: 0,
        explanation: "Декоратор @property використовується для створення property. Для сеттера використовується @attribute.setter."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке захищені атрибути в Python?",
        options: [
          "Конвенція (починаються з _), не захищені на рівні мови",
          "Повністю захищені атрибути",
          "Публічні атрибути",
          "Приватні атрибути"
        ],
        correctAnswer: 0,
        explanation: "Захищені атрибути в Python — це конвенція. Вони починаються з одного підкреслення (_attribute) і вказують розробникам, що не слід використовувати їх ззовні класу, але Python не забороняє доступ до них."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Circle:\n    def __init__(self, radius):\n        self.__radius = radius\n    \n    @property\n    def radius(self):\n        return self.__radius\n    \n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError(\"Радіус не може бути від'ємним\")\n        self.__radius = value\n\ncircle = Circle(5)\ncircle.radius = -10\nprint(circle.radius)\n```",
        options: [
          "Помилка ValueError",
          "-10",
          "5",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Код спробує встановити від'ємний радіус (-10), що викличе ValueError через валідацію в сеттері. Радіус залишиться 5, але помилка буде викинута."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як створити read-only property?",
        options: [
          "Створити тільки геттер з @property, без сеттера",
          "Створити тільки сеттер",
          "Не використовувати декоратор",
          "Використати @readonly"
        ],
        correctAnswer: 0,
        explanation: "Read-only property створюється тільки з геттером (@property), без сеттера. Це робить властивість доступною тільки для читання."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У Python за замовчуванням всі атрибути та методи публічні.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, у Python за замовчуванням всі атрибути та методи публічні. Для обмеження доступу потрібно використовувати префікси (_ або __) або property."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо використовувати property замість прямих атрибутів?",
        options: [
          "Для валідації та контролю доступу",
          "Для швидкості",
          "Для зменшення коду",
          "Для автоматичного видалення"
        ],
        correctAnswer: 0,
        explanation: "Property використовується для валідації даних, контролю доступу, обчислення значень та додавання логіки при читанні/записі атрибутів."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
