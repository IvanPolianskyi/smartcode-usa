/**
 * Lesson 04-7: Абстрактні класи та інтерфейси
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_7 = {
  lessonId: "lesson-04-7",
  moduleId: "module-04",
  order: 7,
  title: "Абстрактні класи та інтерфейси",
  
  learningObjectives: [
    "Використовувати абстрактні базові класи",
    "Реалізовувати інтерфейси",
    "Застосовувати ABC модуль",
    "Створювати контракти для класів"
  ],
  
  prerequisites: ["lesson-04-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке абстрактні класи?",
        content: `**Абстрактний клас** - це клас, який не можна інстанціювати (створювати об'єкти), і який визначає інтерфейс для дочірніх класів.

**Навіщо потрібні абстрактні класи:**
-  Визначають контракт для дочірніх класів
-  Гарантують, що дочірні класи реалізують певні методи
-  Забезпечують спільний інтерфейс
-  Попереджають помилки на етапі розробки

**У Python абстрактні класи створюються за допомогою модуля ABC (Abstract Base Classes).**

**Приклад без абстрактних класів (проблема):**

\`\`\`python
class Shape:
    def area(self):
        pass  # Що тут писати? Немає загальної формули

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    # Забули реалізувати area()! Помилка буде тільки в runtime

circle = Circle(5)
print(circle.area())  # None - помилка не очевидна
\`\`\`

**З абстрактними класами:**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    # Забули реалізувати area()

# Помилка при спробі створити об'єкт:
# circle = Circle(5)  # TypeError: Can't instantiate abstract class
\`\`\``
      },
      {
        title: "Створення абстрактних класів",
        content: `**Синтаксис створення абстрактного класу:**

\`\`\`python
from abc import ABC, abstractmethod

class НазваКласу(ABC):
    @abstractmethod
    def абстрактний_метод(self):
        pass
\`\`\`

**Приклад: Абстрактний клас для фігур**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Обчислює площу фігури"""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Обчислює периметр фігури"""
        pass
    
    # Звичайний метод (не абстрактний)
    def describe(self):
        return f"Це фігура з площею {self.area()}"

# Не можна створити об'єкт абстрактного класу
# shape = Shape()  # TypeError!
\`\`\`

**Правила:**
- Абстрактний клас наслідується від ABC
- Абстрактні методи позначаються @abstractmethod
- Не можна створити об'єкт абстрактного класу
- Дочірні класи МАЮТЬ реалізувати всі абстрактні методи`
      },
      {
        title: "Реалізація абстрактних класів",
        content: `**Дочірні класи повинні реалізувати всі абстрактні методи:**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14 * self.radius

# Тепер можна створювати об'єкти
rect = Rectangle(5, 3)
circle = Circle(4)

print(f"Площа прямокутника: {rect.area()}")  # 15
print(f"Площа кола: {circle.area()}")  # 50.24
\`\`\`

**Що станеться, якщо не реалізувати метод:**

\`\`\`python
class Triangle(Shape):
    def __init__(self, a, b, c):
        self.a = a
        self.b = b
        self.c = c
    
    def area(self):
        # Формула Герона
        s = (self.a + self.b + self.c) / 2
        return (s * (s - self.a) * (s - self.b) * (s - self.c)) ** 0.5
    
    # Забули реалізувати perimeter()

# triangle = Triangle(3, 4, 5)  # TypeError: Can't instantiate abstract class Triangle
\`\`\``
      },
      {
        title: "Абстрактні властивості (properties)",
        content: `**Можна створювати абстрактні властивості:**

\`\`\`python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @property
    @abstractmethod
    def max_speed(self):
        """Максимальна швидкість транспортного засобу"""
        pass
    
    @abstractmethod
    def start(self):
        """Запустити транспортний засіб"""
        pass

class Car(Vehicle):
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self._max_speed = 200
    
    @property
    def max_speed(self):
        return self._max_speed
    
    def start(self):
        return f"{self.brand} {self.model} запущено"

car = Car("Toyota", "Camry")
print(car.max_speed)  # 200
print(car.start())  # Toyota Camry запущено
\`\`\`

**Примітка:** При створенні абстрактних властивостей, декоратор @abstractmethod має бути останнім.`
      },
      {
        title: "Інтерфейси в Python",
        content: `**Python не має вбудованого поняття інтерфейсу, але абстрактні класи можна використовувати як інтерфейси.**

**Приклад: Інтерфейс для платіжних методів**

\`\`\`python
from abc import ABC, abstractmethod

class PaymentInterface(ABC):
    """Інтерфейс для всіх платіжних методів"""
    
    @abstractmethod
    def process_payment(self, amount):
        """Обробити платіж"""
        pass
    
    @abstractmethod
    def refund(self, amount):
        """Повернути кошти"""
        pass

class CreditCardPayment(PaymentInterface):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def process_payment(self, amount):
        return f"Оплачено {amount} грн карткою {self.card_number[-4:]}"
    
    def refund(self, amount):
        return f"Повернено {amount} грн на картку {self.card_number[-4:]}"

class PayPalPayment(PaymentInterface):
    def __init__(self, email):
        self.email = email
    
    def process_payment(self, amount):
        return f"Оплачено {amount} грн через PayPal ({self.email})"
    
    def refund(self, amount):
        return f"Повернено {amount} грн на PayPal ({self.email})"

# Функція приймає будь-який об'єкт PaymentInterface
def handle_payment(payment: PaymentInterface, amount):
    print(payment.process_payment(amount))

card = CreditCardPayment("1234-5678-9012-3456")
paypal = PayPalPayment("user@example.com")

handle_payment(card, 1000)
handle_payment(paypal, 500)
\`\`\``
      },
      {
        title: "Комбінування абстрактних та звичайних методів",
        content: `**Абстрактний клас може мати як абстрактні, так і звичайні методи:**

\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    # Абстрактний метод - ПОТРІБНО реалізувати
    @abstractmethod
    def make_sound(self):
        pass
    
    # Звичайний метод - вже реалізовано
    def get_info(self):
        return f"{self.name}, {self.age} років"
    
    # Звичайний метод, що використовує абстрактний
    def introduce(self):
        print(f"Привіт! Я {self.name}!")
        print(self.make_sound())

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self.breed = breed
    
    def make_sound(self):
        return "Гав-гав!"

class Cat(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)
    
    def make_sound(self):
        return "Мяу!"

dog = Dog("Рекс", 3, "Лабрадор")
cat = Cat("Мурка", 2)

dog.introduce()
# Привіт! Я Рекс!
# Гав-гав!

cat.introduce()
# Привіт! Я Мурка!
# Мяу!
\`\`\``
      },
      {
        title: "Практичний приклад: Система сховищ даних",
        content: `**Повний приклад з абстрактними класами:**

\`\`\`python
from abc import ABC, abstractmethod
from typing import Any, Optional

class DataStorage(ABC):
    """Абстрактний клас для сховищ даних"""
    
    @abstractmethod
    def save(self, key: str, value: Any) -> bool:
        """Зберегти дані"""
        pass
    
    @abstractmethod
    def load(self, key: str) -> Optional[Any]:
        """Завантажити дані"""
        pass
    
    @abstractmethod
    def delete(self, key: str) -> bool:
        """Видалити дані"""
        pass
    
    def exists(self, key: str) -> bool:
        """Перевірити чи існують дані (реалізовано)"""
        return self.load(key) is not None

class MemoryStorage(DataStorage):
    """Сховище в пам'яті"""
    
    def __init__(self):
        self.data = {}
    
    def save(self, key: str, value: Any) -> bool:
        self.data[key] = value
        return True
    
    def load(self, key: str) -> Optional[Any]:
        return self.data.get(key)
    
    def delete(self, key: str) -> bool:
        if key in self.data:
            del self.data[key]
            return True
        return False

class FileStorage(DataStorage):
    """Сховище у файлах"""
    
    def __init__(self, directory):
        self.directory = directory
    
    def save(self, key: str, value: Any) -> bool:
        # Спрощена реалізація
        print(f"Збережено {key} у файл {self.directory}/{key}.txt")
        return True
    
    def load(self, key: str) -> Optional[Any]:
        print(f"Завантажено {key} з файлу {self.directory}/{key}.txt")
        return "дані з файлу"
    
    def delete(self, key: str) -> bool:
        print(f"Видалено файл {self.directory}/{key}.txt")
        return True

# Використання
def demo_storage(storage: DataStorage):
    storage.save("user1", {"name": "Олексій", "age": 20})
    print(f"Існує user1: {storage.exists('user1')}")
    data = storage.load("user1")
    print(f"Дані: {data}")
    storage.delete("user1")
    print(f"Існує user1 після видалення: {storage.exists('user1')}")

print("=== Memory Storage ===")
memory = MemoryStorage()
demo_storage(memory)

print("\\n=== File Storage ===")
files = FileStorage("/data")
demo_storage(files)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий абстрактний клас",
      code: `# Простий абстрактний клас
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав-гав!"

class Cat(Animal):
    def speak(self):
        return "Мяу!"

# animal = Animal()  # Помилка!
dog = Dog()
cat = Cat()

print(dog.speak())  # Гав-гав!
print(cat.speak())  # Мяу!`,
      explanation: "Демонструє створення простого абстрактного класу та його реалізацію."
    },
    {
      title: "Приклад 2: Абстрактний клас з властивостями",
      code: `# Абстрактний клас з властивостями
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, name):
        self.name = name
    
    @property
    @abstractmethod
    def salary(self):
        pass
    
    @abstractmethod
    def get_bonus(self):
        pass

class Developer(Employee):
    def __init__(self, name, base_salary):
        super().__init__(name)
        self._salary = base_salary
    
    @property
    def salary(self):
        return self._salary
    
    def get_bonus(self):
        return self._salary * 0.2

dev = Developer("Олексій", 50000)
print(f"{dev.name}: {dev.salary} грн, бонус: {dev.get_bonus()} грн")`,
      explanation: "Показує використання абстрактних властивостей."
    },
    {
      title: "Приклад 3: Інтерфейс для логування",
      code: `# Інтерфейс для логування
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, message):
        pass
    
    @abstractmethod
    def error(self, message):
        pass

class ConsoleLogger(Logger):
    def log(self, message):
        print(f"[LOG] {message}")
    
    def error(self, message):
        print(f"[ERROR] {message}")

class FileLogger(Logger):
    def __init__(self, filename):
        self.filename = filename
    
    def log(self, message):
        print(f"[LOG to {self.filename}] {message}")
    
    def error(self, message):
        print(f"[ERROR to {self.filename}] {message}")

def process_data(logger: Logger):
    logger.log("Початок обробки")
    logger.log("Обробка даних...")
    logger.error("Виникла помилка!")

console = ConsoleLogger()
file = FileLogger("app.log")

process_data(console)
print()
process_data(file)`,
      explanation: "Демонструє використання абстрактних класів як інтерфейсів."
    },
    {
      title: "Приклад 4: Абстрактний клас з частковою реалізацією",
      code: `# Абстрактний клас з частковою реалізацією
from abc import ABC, abstractmethod

class DatabaseConnection(ABC):
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connected = False
    
    @abstractmethod
    def connect(self):
        pass
    
    @abstractmethod
    def disconnect(self):
        pass
    
    @abstractmethod
    def execute(self, query):
        pass
    
    def is_connected(self):
        return self.connected

class MySQLConnection(DatabaseConnection):
    def connect(self):
        print(f"Підключення до MySQL {self.host}:{self.port}")
        self.connected = True
    
    def disconnect(self):
        print("Відключення від MySQL")
        self.connected = False
    
    def execute(self, query):
        if self.connected:
            print(f"Виконання MySQL запиту: {query}")
        else:
            print("Помилка: не підключено")

db = MySQLConnection("localhost", 3306)
print(f"Підключено: {db.is_connected()}")
db.connect()
print(f"Підключено: {db.is_connected()}")
db.execute("SELECT * FROM users")
db.disconnect()`,
      explanation: "Показує комбінування абстрактних та звичайних методів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути наслідуватися від ABC",
      explanation: "Щоб створити абстрактний клас, потрібно наслідуватися від ABC.",
      correctApproach: "class MyClass(ABC): ..."
    },
    {
      mistake: "Не реалізувати всі абстрактні методи",
      explanation: "Дочірній клас повинен реалізувати ВСІ абстрактні методи батьківського класу.",
      correctApproach: "Переконайся, що реалізував всі методи з @abstractmethod"
    },
    {
      mistake: "Намагатися створити об'єкт абстрактного класу",
      explanation: "Не можна створювати об'єкти абстрактних класів.",
      correctApproach: "Створюй об'єкти тільки конкретних (не абстрактних) класів"
    },
    {
      mistake: "Неправильний порядок декораторів для властивостей",
      explanation: "@abstractmethod має бути останнім декоратором.",
      correctApproach: "@property \\n @abstractmethod \\n def method(self): ..."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. Абстрактні класи - класи, які не можна інстанціювати
2. ABC модуль - для створення абстрактних класів
3. @abstractmethod - декоратор для абстрактних методів
4. Абстрактні властивості - використання @property з @abstractmethod
5. Інтерфейси - абстрактні класи як контракти
6. Комбінування - абстрактні та звичайні методи разом

Тепер ви вмієте створювати контракти для класів та гарантувати правильну реалізацію!

Наступний урок - композиція vs наслідування!`,
  
  practiceTask: {
    title: "Система обробки файлів з абстрактними класами",
    description: "Створіть систему для обробки різних типів файлів",
    problemStatement: `Напишіть програму, яка:
1. Створює абстрактний клас FileProcessor з методами:
   - read() - абстрактний
   - write(content) - абстрактний
   - get_extension() - абстрактний
   - process() - звичайний метод, що викликає read() та write()
2. Створює дочірні класи:
   - TextFileProcessor - для текстових файлів (.txt)
   - JSONFileProcessor - для JSON файлів (.json)
3. Кожен клас реалізує всі абстрактні методи
4. Створює об'єкти та тестує методи`,
    outputFormat: `Приклад виведення:
Читання текстового файлу: data.txt
Запис у текстовий файл: data.txt
Розширення: .txt
---
Читання JSON файлу: config.json
Запис у JSON файл: config.json
Розширення: .json`,
    examples: [
      {
        output: `Читання текстового файлу: data.txt
Запис у текстовий файл: data.txt
Розширення: .txt
---
Читання JSON файлу: config.json
Запис у JSON файл: config.json
Розширення: .json`,
        explanation: "Програма демонструє роботу з абстрактними класами"
      }
    ],
    solution: {
      code: `# Система обробки файлів
from abc import ABC, abstractmethod

class FileProcessor(ABC):
    def __init__(self, filename):
        self.filename = filename
    
    @abstractmethod
    def read(self):
        pass
    
    @abstractmethod
    def write(self, content):
        pass
    
    @abstractmethod
    def get_extension(self):
        pass
    
    def process(self):
        print(self.read())
        print(self.write("дані"))
        print(f"Розширення: {self.get_extension()}")

class TextFileProcessor(FileProcessor):
    def read(self):
        return f"Читання текстового файлу: {self.filename}"
    
    def write(self, content):
        return f"Запис у текстовий файл: {self.filename}"
    
    def get_extension(self):
        return ".txt"

class JSONFileProcessor(FileProcessor):
    def read(self):
        return f"Читання JSON файлу: {self.filename}"
    
    def write(self, content):
        return f"Запис у JSON файл: {self.filename}"
    
    def get_extension(self):
        return ".json"

# Тестування
txt_processor = TextFileProcessor("data.txt")
txt_processor.process()

print("---")

json_processor = JSONFileProcessor("config.json")
json_processor.process()`,
      explanation: "Рішення використовує абстрактний клас FileProcessor з абстрактними та звичайними методами."
    },
    hints: [
      "Імпортуй ABC та abstractmethod з модуля abc",
      "Клас FileProcessor має наслідуватися від ABC",
      "Позначай абстрактні методи декоратором @abstractmethod",
      "Дочірні класи мають реалізувати ВСІ абстрактні методи",
      "Метод process() викликає інші методи"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке абстрактний клас?",
        options: [
          "Клас, який не можна інстанціювати і який визначає інтерфейс",
          "Клас без методів",
          "Клас з приватними атрибутами",
          "Статичний клас"
        ],
        correctAnswer: 0,
        explanation: "Абстрактний клас - це клас, який не можна інстанціювати і який визначає контракт для дочірніх класів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться при спробі створити об'єкт?\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nshape = Shape()\n```",
        options: [
          "TypeError: не можна створити об'єкт абстрактного класу",
          "Створиться об'єкт успішно",
          "None",
          "SyntaxError"
        ],
        correctAnswer: 0,
        explanation: "Не можна створювати об'єкти абстрактних класів."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який декоратор використовується для абстрактних методів?",
        options: [
          "@abstractmethod",
          "@abstract",
          "@virtual",
          "@interface"
        ],
        correctAnswer: 0,
        explanation: "@abstractmethod - декоратор для позначення абстрактних методів."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи правильний цей код?\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass A(ABC):\n    @abstractmethod\n    def method(self):\n        pass\n\nclass B(A):\n    pass\n\nb = B()\n```",
        options: [
          "Ні, клас B не реалізує абстрактний метод",
          "Так, код правильний",
          "Ні, неправильний синтаксис",
          "Так, але method() поверне None"
        ],
        correctAnswer: 0,
        explanation: "Клас B повинен реалізувати метод method(), інакше не можна створити об'єкт."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Від чого має наслідуватися абстрактний клас?",
        options: [
          "ABC",
          "object",
          "abstractclass",
          "Interface"
        ],
        correctAnswer: 0,
        explanation: "Абстрактний клас має наслідуватися від ABC (Abstract Base Class)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Test(ABC):\n    @abstractmethod\n    @property\n    def value(self):\n        pass\n```",
        options: [
          "Неправильний порядок декораторів, @abstractmethod має бути останнім",
          "Все правильно",
          "Не можна комбінувати @abstractmethod та @property",
          "Потрібен return"
        ],
        correctAnswer: 0,
        explanation: "@abstractmethod має бути останнім декоратором: @property \\n @abstractmethod."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}


