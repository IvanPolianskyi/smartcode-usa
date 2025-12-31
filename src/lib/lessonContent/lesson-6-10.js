/**
 * Lesson 6-10: Абстрактні класи та інтерфейси
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_10 = {
  lessonId: "lesson-6-10",
  moduleId: "module-6",
  order: 10,
  title: "Абстрактні класи та інтерфейси",
  
  learningObjectives: [
    "Використовувати абстрактні базові класи",
    "Реалізовувати інтерфейси",
    "Застосовувати ABC модуль",
    "Створювати контракти для класів",
    "Розуміти переваги абстракції"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-6-9"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке абстрактний клас?",
        content: `**Абстрактний клас** — клас, який не можна інстанціювати напряму, тільки через дочірні класи.

**Основна мета:**
- Визначити інтерфейс (контракт) для дочірніх класів
- Гарантувати, що дочірні класи реалізують потрібні методи
- Створити спільну структуру для сімейства класів

**Аналогія:**
Абстрактний клас "Тварина" визначає, що всі тварини мають метод speak(), але не визначає, як саме вони говорять. Кожна конкретна тварина (Собака, Кіт) реалізує speak() по-своєму.

**Приклад:**
\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):  # Абстрактний клас
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав-гав!"

dog = Dog()  # OK
# animal = Animal()  # TypeError! Не можна створити абстрактний клас
\`\`\``
      },
      {
        title: "Модуль abc",
        content: `**abc (Abstract Base Classes)** — модуль для створення абстрактних класів.

**Імпорт:**
\`\`\`python
from abc import ABC, abstractmethod
\`\`\`

**Базове використання:**
\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):  # Наслідуємо від ABC
    @abstractmethod
    def area(self):
        """Абстрактний метод - має бути реалізований."""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Абстрактний метод - має бути реалізований."""
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)  # OK
# shape = Shape()  # TypeError! Shape - абстрактний
\`\`\`

**Що робить @abstractmethod:**
- Позначає метод як абстрактний
- Вимагає реалізації в дочірніх класах
- Не дозволяє створити об'єкт, якщо не всі абстрактні методи реалізовані`
      },
      {
        title: "Абстрактні методи",
        content: `**Абстрактний метод** — метод без реалізації, який має бути реалізований в дочірніх класах.

\`\`\`python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        """Абстрактний метод - має бути реалізований."""
        pass
    
    @abstractmethod
    def get_info(self):
        """Абстрактний метод - має бути реалізований."""
        pass

class CreditCard(PaymentMethod):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def pay(self, amount):
        return f"Оплачено {amount} грн карткою {self.card_number}"
    
    def get_info(self):
        return f"Кредитна картка: {self.card_number}"

class PayPal(PaymentMethod):
    def __init__(self, email):
        self.email = email
    
    def pay(self, amount):
        return f"Оплачено {amount} грн через PayPal ({self.email})"
    
    def get_info(self):
        return f"PayPal: {self.email}"

# Всі методи реалізовані - можна створити об'єкти
card = CreditCard("1234-5678")
paypal = PayPal("user@example.com")
\`\`\`

**Якщо не реалізувати абстрактний метод:**
\`\`\`python
class IncompletePayment(PaymentMethod):
    def pay(self, amount):
        return f"Оплата {amount}"

# incomplete = IncompletePayment()  # TypeError! get_info() не реалізовано
\`\`\``
      },
      {
        title: "Абстрактні властивості",
        content: `**Абстрактні property** — можна створити абстрактні властивості.

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @property
    @abstractmethod
    def area(self):
        """Абстрактна властивість."""
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @property
    def area(self):
        return self.width * self.height

rect = Rectangle(5, 3)
print(rect.area)  # 15
\`\`\`

**Важливо:** Порядок декораторів має бути правильним: спочатку @property, потім @abstractmethod!`
      },
      {
        title: "Інтерфейси в Python",
        content: `**В Python немає окремого поняття "інтерфейс"**, але абстрактні класи виконують цю роль.

**Інтерфейс** — контракт, який визначає, які методи має реалізувати клас.

\`\`\`python
from abc import ABC, abstractmethod

class Drawable(ABC):  # Інтерфейс для об'єктів, які можна малювати
    @abstractmethod
    def draw(self):
        pass

class Clickable(ABC):  # Інтерфейс для об'єктів, на які можна клікнути
    @abstractmethod
    def click(self):
        pass

class Button(Drawable, Clickable):  # Реалізує обидва інтерфейси
    def draw(self):
        return "Малюю кнопку"
    
    def click(self):
        return "Кнопка натиснута"

button = Button()
print(button.draw())
print(button.click())
\`\`\`

**Переваги інтерфейсів:**
- Гарантують, що класи мають потрібні методи
- Дозволяють поліморфізм
- Легше тестувати (можна створити mock об'єкти)`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Система фігур**
\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass
    
    def info(self):  # Звичайний метод (не абстрактний)
        return f"Площа: {self.area()}, Периметр: {self.perimeter()}"

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
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

shapes = [Rectangle(5, 3), Circle(4)]
for shape in shapes:
    print(shape.info())  # Поліморфізм!
\`\`\`

**Приклад 2: Система плагінів**
\`\`\`python
from abc import ABC, abstractmethod

class Plugin(ABC):
    @abstractmethod
    def execute(self):
        pass
    
    @abstractmethod
    def get_name(self):
        pass

class EmailPlugin(Plugin):
    def execute(self):
        return "Відправка email"
    
    def get_name(self):
        return "Email Plugin"

class SMSPlugin(Plugin):
    def execute(self):
        return "Відправка SMS"
    
    def get_name(self):
        return "SMS Plugin"

plugins = [EmailPlugin(), SMSPlugin()]
for plugin in plugins:
    print(f"{plugin.get_name()}: {plugin.execute()}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий абстрактний клас",
      code: `from abc import ABC, abstractmethod

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

dog = Dog()
cat = Cat()
print(dog.speak())
print(cat.speak())`,
      explanation: "Демонструє базовий абстрактний клас з абстрактними методами."
    },
    {
      title: "Приклад 2: Абстрактний клас з реалізованими методами",
      code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    def info(self):  # Звичайний метод
        return f"Площа: {self.area()}"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

rect = Rectangle(5, 3)
print(rect.info())`,
      explanation: "Показує абстрактний клас з реалізованими та абстрактними методами."
    },
    {
      title: "Приклад 3: Множинні інтерфейси",
      code: `from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

class Clickable(ABC):
    @abstractmethod
    def click(self):
        pass

class Button(Drawable, Clickable):
    def draw(self):
        return "Малюю кнопку"
    
    def click(self):
        return "Кнопка натиснута"

button = Button()
print(button.draw())
print(button.click())`,
      explanation: "Демонструє реалізацію множинних інтерфейсів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути @abstractmethod",
      explanation: "Без @abstractmethod метод не буде абстрактним, і можна буде створити об'єкт без реалізації.",
      correctApproach: "Завжди використовуйте @abstractmethod для абстрактних методів."
    },
    {
      mistake: "Спроба створити об'єкт абстрактного класу",
      explanation: "Абстрактний клас не можна інстанціювати напряму, тільки через дочірні класи з реалізованими методами.",
      correctApproach: "Створюйте об'єкти тільки дочірніх класів, які реалізували всі абстрактні методи."
    },
    {
      mistake: "Не реалізувати всі абстрактні методи",
      explanation: "Якщо не реалізувати всі абстрактні методи, не можна створити об'єкт дочірнього класу.",
      correctApproach: "Реалізуйте всі абстрактні методи в дочірньому класі перед створенням об'єктів."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Абстрактні класи** — класи, які не можна інстанціювати напряму
2. **ABC модуль** — для створення абстрактних класів
3. **@abstractmethod** — позначення абстрактних методів
4. **Інтерфейси** — контракти для класів (через абстрактні класи)
5. **Переваги** — гарантія реалізації методів, поліморфізм

**Основні концепції:**
- Абстрактний клас визначає інтерфейс
- Дочірні класи реалізують абстрактні методи
- Не можна створити об'єкт абстрактного класу
- Всі абстрактні методи мають бути реалізовані

**Переваги:**
- Гарантія реалізації методів
- Поліморфізм
- Легше тестувати
- Чіткі контракти

Абстрактні класи створюють чіткі контракти для класів!`,
  
  practiceTask: {
    title: "Створення системи плагінів",
    description: "Створіть систему плагінів з використанням абстрактних класів",
    problemStatement: `Створіть систему плагінів з використанням абстрактних класів:

**Абстрактний клас Plugin:**
- Абстрактні методи:
  - execute() — виконує дію плагіна
  - get_name() — повертає назву плагіна
  - get_version() — повертає версію плагіна
- Звичайний метод:
  - info() — повертає інформацію про плагін

**Конкретні плагіни:**
- EmailPlugin — відправка email
- SMSPlugin — відправка SMS
- NotificationPlugin — відправка сповіщень

**Кожен плагін має:**
- Реалізувати всі абстрактні методи
- Мати унікальну назву та версію
- Виконувати свою специфічну дію

**Клас PluginManager:**
- Атрибут: plugins (список плагінів)
- Методи:
  - register(plugin) — реєструє плагін
  - execute_all() — виконує всі плагіни
  - get_plugin(name) — знаходить плагін за назвою

**Створіть плагіни, зареєструйте їх та продемонструйте роботу.**`,
    inputFormat: "Створіть абстрактний клас та конкретні реалізації",
    outputFormat: `Приклад виведення:
Email Plugin v1.0: Відправка email
SMS Plugin v1.0: Відправка SMS
Notification Plugin v1.0: Відправка сповіщення

Виконання всіх плагінів:
Відправка email
Відправка SMS
Відправка сповіщення`,
    examples: [
      {
        input: "Створення та реєстрація плагінів",
        output: "Всі плагіни працюють через один інтерфейс",
        explanation: "Демонстрація абстрактних класів та поліморфізму"
      }
    ],
    solution: {
      code: `from abc import ABC, abstractmethod

class Plugin(ABC):
    @abstractmethod
    def execute(self):
        """Виконує дію плагіна."""
        pass
    
    @abstractmethod
    def get_name(self):
        """Повертає назву плагіна."""
        pass
    
    @abstractmethod
    def get_version(self):
        """Повертає версію плагіна."""
        pass
    
    def info(self):
        """Повертає інформацію про плагін."""
        return f"{self.get_name()} v{self.get_version()}: {self.execute()}"

class EmailPlugin(Plugin):
    def execute(self):
        return "Відправка email"
    
    def get_name(self):
        return "Email Plugin"
    
    def get_version(self):
        return "1.0"

class SMSPlugin(Plugin):
    def execute(self):
        return "Відправка SMS"
    
    def get_name(self):
        return "SMS Plugin"
    
    def get_version(self):
        return "1.0"

class NotificationPlugin(Plugin):
    def execute(self):
        return "Відправка сповіщення"
    
    def get_name(self):
        return "Notification Plugin"
    
    def get_version(self):
        return "1.0"

class PluginManager:
    def __init__(self):
        self.plugins = []
    
    def register(self, plugin):
        """Реєструє плагін."""
        if not isinstance(plugin, Plugin):
            raise TypeError("Плагін має наслідувати від Plugin!")
        self.plugins.append(plugin)
        print(f"Плагін '{plugin.get_name()}' зареєстровано")
    
    def execute_all(self):
        """Виконує всі плагіни."""
        print("\\nВиконання всіх плагінів:")
        for plugin in self.plugins:
            print(plugin.execute())
    
    def get_plugin(self, name):
        """Знаходить плагін за назвою."""
        for plugin in self.plugins:
            if plugin.get_name() == name:
                return plugin
        return None

# Створення та реєстрація плагінів
manager = PluginManager()

email_plugin = EmailPlugin()
sms_plugin = SMSPlugin()
notification_plugin = NotificationPlugin()

manager.register(email_plugin)
manager.register(sms_plugin)
manager.register(notification_plugin)

# Виведення інформації
print("\\n=== Інформація про плагіни ===")
for plugin in manager.plugins:
    print(plugin.info())

# Виконання всіх плагінів
manager.execute_all()

# Пошук плагіна
found = manager.get_plugin("Email Plugin")
if found:
    print(f"\\nЗнайдено: {found.info()}")`,
      explanation: "Рішення демонструє повну систему плагінів з абстрактними класами та поліморфізмом."
    },
    hints: [
      "Використовуйте ABC та @abstractmethod для абстрактного класу",
      "Реалізуйте всі абстрактні методи в конкретних плагінах",
      "Використовуйте isinstance() для перевірки типу в PluginManager",
      "Покажіть поліморфізм через execute_all()"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке абстрактний клас?",
        options: ["Клас без методів", "Клас, який не можна інстанціювати напряму", "Клас з усіма методами", "Звичайний клас"],
        correctAnswer: 1,
        explanation: "Абстрактний клас — це клас, який не можна інстанціювати напряму, тільки через дочірні класи з реалізованими абстрактними методами."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: from abc import ABC, abstractmethod; class A(ABC): @abstractmethod def x(self): pass; class B(A): pass; b=B()?",
        options: ["Створить об'єкт", "TypeError", "None", "Помилку"],
        correctAnswer: 1,
        explanation: "TypeError, бо B не реалізує абстрактний метод x() з класу A."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого використовується @abstractmethod?",
        options: ["Створення методів", "Позначення абстрактних методів", "Видалення методів", "Копіювання методів"],
        correctAnswer: 1,
        explanation: "@abstractmethod використовується для позначення методів як абстрактних, які мають бути реалізовані в дочірніх класах."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

