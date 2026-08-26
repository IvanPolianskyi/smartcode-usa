/**
 * Lesson 04-2: Атрибути та методи класу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_2 = {
  lessonId: "lesson-04-2",
  moduleId: "module-04",
  order: 2,
  title: "Атрибути та методи класу",

  learningObjectives: [
    "Розрізняти атрибути екземпляра та атрибути класу",
    "Створювати та викликати методи екземпляра",
    "Розуміти, коли атрибут класу є спільним для всіх об'єктів",
    "Коротко ознайомитися з @classmethod та @staticmethod",
    "Застосовувати методи для зміни стану об'єкта"
  ],

  prerequisites: ["lesson-04-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Атрибути екземпляра vs атрибути класу",
        content: `У попередньому уроці ми зберігали дані через \`self.name\` — це **атрибути екземпляра**. Вони належать **конкретному** об'єкту.

**Атрибути класу** оголошують безпосередньо в тілі класу (поза \`__init__\`). Вони **спільні** для всіх екземплярів.

\`\`\`python
class Dog:
    species = "Canis familiaris"  # атрибут класу

    def __init__(self, name):
        self.name = name  # атрибут екземпляра

dog1 = Dog("Рекс")
dog2 = Dog("Лакі")

print(dog1.name)      # Рекс
print(dog2.name)      # Лакі
print(dog1.species)   # Canis familiaris
print(dog2.species)   # Canis familiaris
print(Dog.species)    # Canis familiaris
\`\`\`

**Порівняння:**

| | Атрибут екземпляра | Атрибут класу |
|--|-------------------|---------------|
| Де оголошують | у \`__init__\` через \`self\` | у тілі класу |
| Кому належить | одному об'єкту | усім об'єктам класу |
| Приклад | \`self.balance\` | \`Bank.bank_name\` |

**Увага зі змінними типами як атрибутами класу!**

\`\`\`python
class Team:
    members = []  # НЕБЕЗПЕЧНО — спільний список!

    def __init__(self, name):
        self.name = name

    def add(self, person):
        self.members.append(person)

t1 = Team("A")
t2 = Team("B")
t1.add("Оля")
print(t2.members)  # ['Оля'] — сюрприз!
\`\`\`

Краще тримати списки як **атрибути екземпляра**: \`self.members = []\` у \`__init__\`.`
      },
      {
        title: "Методи екземпляра",
        content: `**Метод екземпляра** — звичайний метод класу з першим параметром \`self\`. Він працює з даними конкретного об'єкта.

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False

    def get_balance(self):
        return self.balance

account = BankAccount("Марія", 1000)
account.deposit(500)
account.withdraw(200)
print(account.get_balance())  # 1300
\`\`\`

**Добрі практики:**

1. Методи називайте дієсловами: \`deposit\`, \`calculate_total\`, \`reset\`
2. Один метод — одна чітка дія
3. Стан змінюйте через методи, а не «ззовні навмання» (хоча в Python це можливо)

\`\`\`python
# Можна, але гірше для контролю:
account.balance = -100  # від'ємний баланс?

# Краще через метод з перевіркою:
account.withdraw(100)
\`\`\`

Методи можуть викликати інші методи того ж об'єкта:

\`\`\`python
class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def is_square(self):
        return self.w == self.h

    def summary(self):
        kind = "квадрат" if self.is_square() else "прямокутник"
        return f"{kind}, площа={self.area()}"
\`\`\``
      },
      {
        title: "Атрибути класу на практиці",
        content: `Атрибути класу зручні для:

1. **Констант / спільних налаштувань**
2. **Лічильників створених об'єктів**
3. **Значень за замовчуванням, спільних для всіх**

\`\`\`python
class Student:
    school = "SmartCode Academy"
    count = 0

    def __init__(self, name):
        self.name = name
        Student.count += 1

    def info(self):
        print(f"{self.name} навчається в {Student.school}")

s1 = Student("Іван")
s2 = Student("Оля")
print(Student.count)  # 2
s1.info()
\`\`\`

**Читання vs перезапис:**

\`\`\`python
class Demo:
    value = 10

d = Demo()
print(d.value)   # 10 — читає атрибут класу
d.value = 99     # створює атрибут ЕКЗЕМПЛЯРА!
print(Demo.value)  # 10 — атрибут класу не змінився
print(d.value)     # 99
\`\`\`

Щоб змінити саме атрибут класу, пишіть через ім'я класу: \`Demo.value = 20\`.`
      },
      {
        title: "Коротко: @classmethod та @staticmethod",
        content: `Окрім методів екземпляра, у Python є ще два типи. На цьому етапі достатньо **розуміти ідею**; основний фокус лишається на методах екземпляра.

**\`@classmethod\`** — отримує клас (\`cls\`), а не екземпляр. Часто використовують як альтернативні конструктори.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, year):
        age = 2026 - year
        return cls(name, age)

p = Person.from_birth_year("Олена", 2000)
print(p.age)  # 26
\`\`\`

**\`@staticmethod\`** — звичайна функція всередині класу **без** \`self\` і \`cls\`. Логічно пов'язана з класом, але не використовує його стан.

\`\`\`python
class MathHelper:
    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathHelper.is_even(4))  # True
\`\`\`

**Коли що використовувати:**

| Тип | Перший аргумент | Коли |
|-----|-----------------|------|
| Метод екземпляра | \`self\` | робота з даними об'єкта (основний випадок) |
| \`@classmethod\` | \`cls\` | фабрики / альтернативні конструктори |
| \`@staticmethod\` | немає | допоміжна логіка без стану |

На практиці **90%** вашого коду на старті — методи екземпляра.`
      },
      {
        title: "Приклад: повний клас з різними атрибутами",
        content: `Зберемо все докупи на прикладі інтернет-магазину:

\`\`\`python
class Product:
    store_name = "SmartShop"  # атрибут класу
    tax_rate = 0.2

    def __init__(self, title, price):
        self.title = title
        self.price = price

    def price_with_tax(self):
        return self.price * (1 + Product.tax_rate)

    def label(self):
        return f"[{Product.store_name}] {self.title}: {self.price_with_tax():.2f} грн"

p1 = Product("Клавіатура", 1000)
p2 = Product("Миша", 500)

print(p1.label())
print(p2.label())
print(Product.store_name)
\`\`\`

Тут:
- \`store_name\`, \`tax_rate\` — спільні для всіх товарів
- \`title\`, \`price\` — унікальні для кожного
- \`price_with_tax\`, \`label\` — методи екземпляра

Такий поділ робить код чистішим і зрозумілішим.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Атрибут класу та екземпляра",
      code: `class Car:
    wheels = 4  # атрибут класу

    def __init__(self, brand, color):
        self.brand = brand
        self.color = color

    def describe(self):
        print(f"{self.color} {self.brand}, коліс: {Car.wheels}")

car1 = Car("Toyota", "Червона")
car2 = Car("BMW", "Чорна")
car1.describe()
car2.describe()`,
      explanation: "wheels спільний для всіх авто; brand і color — унікальні."
    },
    {
      title: "Методи змінюють стан",
      code: `class Counter:
    def __init__(self):
        self.value = 0

    def inc(self, step=1):
        self.value += step

    def reset(self):
        self.value = 0

c = Counter()
c.inc()
c.inc(5)
print(c.value)  # 6
c.reset()
print(c.value)  # 0`,
      explanation: "Методи екземпляра інкапсулюють зміну внутрішнього стану."
    },
    {
      title: "Лічильник об'єктів через атрибут класу",
      code: `class User:
    total = 0

    def __init__(self, username):
        self.username = username
        User.total += 1

u1 = User("anna")
u2 = User("bohdan")
u3 = User("katya")
print(User.total)  # 3
print(u1.username)`,
      explanation: "Атрибут класу total збільшується при кожному створенні User."
    },
    {
      title: "classmethod як альтернативний конструктор",
      code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        c = (f - 32) * 5 / 9
        return cls(c)

    def show(self):
        print(f"{self.celsius:.1f} °C")

t = Temperature.from_fahrenheit(68)
t.show()`,
      explanation: "from_fahrenheit створює Temperature, працюючи з класом через cls."
    }
  ],

  commonMistakes: [
    {
      mistake: "Спільний список як атрибут класу",
      explanation: "Змінний об'єкт у тілі класу ділиться між усіма екземплярами.",
      correctApproach: `class Team:
    def __init__(self, name):
        self.name = name
        self.members = []  # окремий список для кожного об'єкта`
    },
    {
      mistake: "Плутати зміну атрибута класу через екземпляр",
      explanation: "Присвоєння d.value = x створює атрибут екземпляра, а не змінює класовий.",
      correctApproach: `Demo.value = 20  # зміна атрибута класу
# або
d = Demo()
# читання d.value OK; для зміни класового — через Demo.value`
    },
    {
      mistake: "Викликати метод екземпляра без об'єкта",
      explanation: "Метод з self потребує екземпляр.",
      correctApproach: `account = BankAccount("Оля", 100)
account.deposit(50)  # правильно`
    },
    {
      mistake: "Надмірне використання @staticmethod замість звичайних функцій",
      explanation: "Якщо логіка не пов'язана з класом, краще звичайна функція модуля.",
      correctApproach: "staticmethod — лише коли логіка концептуально належить класу, але не потребує стану"
    }
  ],

  summary: `На цьому уроці ми вивчили:

1. Атрибути екземпляра — унікальні дані кожного об'єкта
2. Атрибути класу — спільні для всіх екземплярів
3. Методи екземпляра — основний спосіб працювати зі станом
4. Обережність зі змінними атрибутами класу (списки, словники)
5. Коротко: @classmethod і @staticmethod

Далі — інкапсуляція та контроль доступу до даних.`,

  practiceTask: {
    title: "Банківський рахунок",
    description: "Реалізуйте клас BankAccount з методами поповнення та зняття",
    problemStatement: `Напишіть програму, яка:
1. Оголошує клас BankAccount з атрибутом класу bank_name = "SmartBank"
2. Конструктор __init__(self, owner, balance) зберігає власника та баланс
3. Методи:
   - deposit(self, amount) — додає amount до балансу
   - withdraw(self, amount) — віднімає amount від балансу (без перевірок для цього завдання)
   - status(self) — виводить рядок: {bank_name} | {owner}: {balance}
4. Зчитує з stdin: власника, початковий баланс, суму поповнення, суму зняття
5. Виводить status() після створення, після deposit і після withdraw

Формат вводу:
Марія
1000
500
200`,
    outputFormat: `SmartBank | Марія: 1000
SmartBank | Марія: 1500
SmartBank | Марія: 1300`,
    examples: [
      {
        input: `Марія
1000
500
200`,
        output: `SmartBank | Марія: 1000
SmartBank | Марія: 1500
SmartBank | Марія: 1300`,
        explanation: "1000 → +500 = 1500 → -200 = 1300"
      },
      {
        input: `Ігор
200
50
30`,
        output: `SmartBank | Ігор: 200
SmartBank | Ігор: 250
SmartBank | Ігор: 220`,
        explanation: "200 → 250 → 220"
      },
      {
        input: `Оля
0
1000
100`,
        output: `SmartBank | Оля: 0
SmartBank | Оля: 1000
SmartBank | Оля: 900`,
        explanation: "Старт з нуля, поповнення 1000, зняття 100"
      }
    ],
    solution: {
      code: `class BankAccount:
    bank_name = "SmartBank"

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount

    def status(self):
        print(f"{BankAccount.bank_name} | {self.owner}: {self.balance}")

owner = input().strip()
balance = int(input())
deposit_amount = int(input())
withdraw_amount = int(input())

account = BankAccount(owner, balance)
account.status()
account.deposit(deposit_amount)
account.status()
account.withdraw(withdraw_amount)
account.status()`,
      explanation: "Використовуємо атрибут класу bank_name та методи екземпляра для зміни балансу."
    },
    hints: [
      "bank_name оголосіть у тілі класу, не в __init__",
      "У status використовуйте BankAccount.bank_name або self.bank_name",
      "Читайте 4 рядки: owner, balance, deposit, withdraw",
      "Викликайте status() тричі в потрібні моменти"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де зазвичай створюють атрибути екземпляра?",
        options: [
          "У __init__ через self",
          "Тільки поза класом",
          "Лише в @staticmethod",
          "У імпорті модуля"
        ],
        correctAnswer: 0,
        explanation: "Атрибути екземпляра задають у конструкторі: self.name = ..."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Атрибут класу є спільним для всіх екземплярів цього класу.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, атрибут класу належить класу і доступний усім об'єктам."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n```python\nclass A:\n    x = 5\n\na = A()\nprint(a.x)\nA.x = 9\nprint(a.x)\n```",
        options: [
          "5, потім 9",
          "5, потім 5",
          "Помилка",
          "9, потім 9"
        ],
        correctAnswer: 0,
        explanation: "Спочатку читається 5; після зміни A.x усі бачать 9 (якщо немає атрибута екземпляра)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке метод екземпляра?",
        options: [
          "Метод з параметром self, що працює з конкретним об'єктом",
          "Функція поза класом",
          "Лише метод без параметрів",
          "Декоратор @property"
        ],
        correctAnswer: 0,
        explanation: "Метод екземпляра отримує self і працює зі станом об'єкта."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так?\n\n```python\nclass Bag:\n    items = []\n    def add(self, x):\n        self.items.append(x)\n```",
        options: [
          "items як [] у класі буде спільним для всіх екземплярів",
          "Не можна використовувати append",
          "Потрібен @staticmethod",
          "Немає жодної проблеми"
        ],
        correctAnswer: 0,
        explanation: "Змінний атрибут класу ділиться між об'єктами — краще self.items = [] у __init__."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого часто використовують @classmethod?",
        options: [
          "Як альтернативний конструктор (фабрика об'єктів)",
          "Для виводу тексту на екран",
          "Для видалення класу",
          "Замість ключового слова class"
        ],
        correctAnswer: 0,
        explanation: "classmethod зручний для створення об'єктів іншим способом (наприклад, from_string)."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "@staticmethod отримує self як перший аргумент.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 1,
        explanation: "False: staticmethod не отримує ні self, ні cls."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
