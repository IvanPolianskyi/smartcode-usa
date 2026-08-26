/**
 * Lesson 04-3: Інкапсуляція та модифікатори доступу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_3 = {
  lessonId: "lesson-04-3",
  moduleId: "module-04",
  order: 3,
  title: "Інкапсуляція та модифікатори доступу",

  learningObjectives: [
    "Пояснити ідею інкапсуляції та навіщо ховати внутрішні деталі",
    "Використовувати публічні, «захищені» (_) та «приватні» (__) атрибути",
    "Розуміти name mangling для атрибутів з подвійним підкресленням",
    "Створювати контрольований доступ через методи getter/setter",
    "Ознайомитися з декоратором @property"
  ],

  prerequisites: ["lesson-04-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке інкапсуляція?",
        content: `**Інкапсуляція** - принцип ООП, за яким внутрішні дані об'єкта **приховані**, а зовні доступна лише безпечна «публічна» поведінка.

Уявіть банкомат: ви натискаєте кнопки (публічний інтерфейс), але не лізете руками в механізм видачі купюр.

**Навіщо це потрібно?**

1. **Захист даних** - не дати встановити від'ємну ціну чи вік -5
2. **Гнучкість** - можна змінити внутрішню реалізацію, не ламаючи зовнішній код
3. **Чистіший API** - користувач класу бачить лише те, що потрібно

\`\`\`python
# Без контролю - небезпечно
class Account:
    def __init__(self, balance):
        self.balance = balance

acc = Account(100)
acc.balance = -1000000  # хто завгодно може зламати стан
\`\`\`

З інкапсуляцією ми обмежуємо прямий доступ і дозволяємо зміну лише через перевірені методи.`
      },
      {
        title: "Публічні, protected і private в Python",
        content: `У Python **немає справжніх** модифікаторів доступу як у Java (\`private\`, \`protected\`). Є **угоди (conventions)** і механізм name mangling.

**1. Публічні** - звичайні імена (\`name\`, \`balance\`)**
Доступні звідусіль.

**2. «Захищені»** - одне підкреслення на початку (\`_balance\`)**
Сигнал: «це внутрішня деталь, не чіпай ззовні». Python **не блокує** доступ.

\`\`\`python
class User:
    def __init__(self, name):
        self.name = name       # публічний
        self._id = 42          # «захищений» за угодою
\`\`\`

**3. «Приватні»** - два підкреслення (\`__balance\`)**
Python змінює ім'я атрибута (**name mangling**): \`__balance\` стає \`_ClassName__balance\`.

\`\`\`python
class Vault:
    def __init__(self, secret):
        self.__secret = secret

    def reveal(self):
        return self.__secret

v = Vault("ключ")
print(v.reveal())       # ключ
# print(v.__secret)     # AttributeError
print(v._Vault__secret) # ключ - технічно доступно, але так робити не варто
\`\`\`

| Запис | Зміст | Рівень «захисту» |
|-------|--------|------------------|
| \`value\` | публічний | відкритий |
| \`_value\` | protected (угода) | слабкий |
| \`__value\` | private (mangling) | сильніший, але не абсолютний |

Python дотримується філософії: *«ми всі дорослі»* - угоди важливіші за жорсткі заборони.`
      },
      {
        title: "Getter і setter методи",
        content: `Класичний спосіб контролю - методи **отримання** (getter) і **встановлення** (setter).

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.__price = 0
        self.set_price(price)

    def get_price(self):
        return self.__price

    def set_price(self, price):
        if price < 0:
            raise ValueError("Ціна не може бути від'ємною")
        self.__price = price

p = Product("Навушники", 1500)
print(p.get_price())  # 1500
p.set_price(1800)
print(p.get_price())  # 1800
# p.set_price(-10)    # ValueError
\`\`\`

**Переваги:**

- Валідація при записі
- Можливість логувати зміни
- Можливість обчислювати значення «на льоту»

**Недолік стилю getter/setter:** код стає багатослівним (\`get_x()\` / \`set_x()\`). У Python частіше використовують \`@property\`.`
      },
      {
        title: "Декоратор @property",
        content: `**\`@property\`** дозволяє звертатися до методу як до атрибута: \`obj.price\` замість \`obj.get_price()\`.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Ціна не може бути від'ємною")
        self._price = value

p = Product("Монітор", 8000)
print(p.price)   # читання через getter
p.price = 8500   # запис через setter
print(p.price)
\`\`\`

**Тільки для читання (без setter):**

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def area(self):
        return 3.14 * self._radius ** 2

c = Circle(5)
print(c.area)   # 78.5
# c.area = 10   # AttributeError - немає setter
\`\`\`

\`@property\` - ідіоматичний Python-спосіб інкапсуляції: зручний синтаксис + контроль доступу.`
      },
      {
        title: "Практичний приклад: температура",
        content: `Збережемо температуру всередині в Цельсіях, а назовні дамо зручні властивості:

\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius  # піде через setter

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Нижче абсолютного нуля!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

t = Temperature(25)
print(t.celsius)      # 25
print(t.fahrenheit)   # 77.0
t.celsius = 30
print(t.fahrenheit)   # 86.0
\`\`\`

Користувач класу не зобов'язаний знати, як саме зберігаються дані - він працює з чистим інтерфейсом.

**Рекомендації SmartCode:**

1. Починайте з публічних атрибутів, якщо валідація не потрібна
2. Додавайте \`_\` / \`__\` і \`property\`, коли з'являються правила
3. Не робіть «приватним» усе підряд - ховайте лише те, що справді внутрішнє`
      }
    ]
  },

  codeExamples: [
    {
      title: "Приватний атрибут і метод доступу",
      code: `class Wallet:
    def __init__(self, money):
        self.__money = money

    def get_money(self):
        return self.__money

    def add(self, amount):
        if amount > 0:
            self.__money += amount

w = Wallet(100)
w.add(50)
print(w.get_money())  # 150`,
      explanation: "__money прихований; зміна лише через контрольовані методи."
    },
    {
      title: "Property з валідацією",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0 or value > 150:
            raise ValueError("Некоректний вік")
        self._age = value

p = Person("Олег", 30)
print(p.age)
p.age = 31
print(p.age)`,
      explanation: "Зовні age виглядає як атрибут, але проходить перевірку в setter."
    },
    {
      title: "Лише для читання",
      code: `class Order:
    def __init__(self, items):
        self._items = list(items)

    @property
    def items(self):
        return tuple(self._items)

    @property
    def total_count(self):
        return len(self._items)

order = Order(["A", "B", "C"])
print(order.items)
print(order.total_count)`,
      explanation: "items і total_count доступні для читання без прямого ламання внутрішнього списку."
    },
    {
      title: "Protected за угодою",
      code: `class Engine:
    def __init__(self, power):
        self._power = power  # внутрішня деталь

    def status(self):
        print(f"Потужність: {self._power} к.с.")

e = Engine(150)
e.status()
# З технічної точки зору e._power доступний,
# але за угодою ззовні його не змінюють.`,
      explanation: "Одне підкреслення - сигнал для інших розробників."
    }
  ],

  commonMistakes: [
    {
      mistake: "Вважати, що __ повністю недоступний",
      explanation: "Name mangling можна обійти через _ClassName__attr. Це угода + ускладнення, не сейф.",
      correctApproach: "Використовуйте __ для уникнення випадкових колізій імен, а не як абсолютний захист"
    },
    {
      mistake: "Робити приватними всі атрибути без потреби",
      explanation: "Надмірна інкапсуляція ускладнює код і не дає переваг.",
      correctApproach: "Ховайте лише дані, які потребують контролю або є внутрішньою реалізацією"
    },
    {
      mistake: "Забути setter і дивуватися AttributeError",
      explanation: "Якщо є лише @property без @x.setter, присвоєння заборонене.",
      correctApproach: "Додайте @price.setter, якщо запис має бути дозволений"
    },
    {
      mistake: "Зберігати в property інший публічний атрибут з тим самим ім'ям",
      explanation: "Нескінченна рекурсія: self.price всередині property price знову викликає property.",
      correctApproach: "Зберігайте в self._price, а property називайте price"
    }
  ],

  summary: `На цьому уроці ми вивчили інкапсуляцію:

1. Інкапсуляція ховає внутрішні деталі й захищає стан
2. _attr - «не чіпай» за угодою (protected)
3. __attr - name mangling (умовний private)
4. Getter/setter - класичний контроль доступу
5. @property - зручний пітонівський спосіб

Далі - наслідування: як створювати нові класи на базі існуючих.`,

  practiceTask: {
    title: "Товар з контрольованою ціною",
    description: "Реалізуйте клас Product з приватною ціною та методами доступу",
    problemStatement: `Напишіть програму, яка:
1. Оголошує клас Product
2. У __init__(self, name, price) зберігає name (публічно) та __price (приватно)
3. Має методи:
   - get_price(self) - повертає __price
   - set_price(self, price) - якщо price > 0, встановлює __price; інакше залишає без змін
   - info(self) - виводить:
     Товар: {name}
     Ціна: {price}
4. Зчитує name, початкову ціну, нову ціну
5. Створює Product, виводить info(), викликає set_price(нова_ціна), знову info()

Формат вводу:
Ноутбук
25000
30000`,
    outputFormat: `Товар: Ноутбук
Ціна: 25000
Товар: Ноутбук
Ціна: 30000`,
    examples: [
      {
        input: `Ноутбук
25000
30000`,
        output: `Товар: Ноутбук
Ціна: 25000
Товар: Ноутбук
Ціна: 30000`,
        explanation: "Ціну оновлено з 25000 на 30000"
      },
      {
        input: `Миша
500
-10`,
        output: `Товар: Миша
Ціна: 500
Товар: Миша
Ціна: 500`,
        explanation: "Від'ємна ціна ігнорується, залишається 500"
      },
      {
        input: `Клавіатура
1200
990`,
        output: `Товар: Клавіатура
Ціна: 1200
Товар: Клавіатура
Ціна: 990`,
        explanation: "Ціну знижено до 990"
      }
    ],
    solution: {
      code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.__price = price

    def get_price(self):
        return self.__price

    def set_price(self, price):
        if price > 0:
            self.__price = price

    def info(self):
        print(f"Товар: {self.name}")
        print(f"Ціна: {self.__price}")

name = input().strip()
price = int(input())
new_price = int(input())

product = Product(name, price)
product.info()
product.set_price(new_price)
product.info()`,
      explanation: "Приватний __price змінюється лише через set_price з перевіркою price > 0."
    },
    hints: [
      "Зберігайте ціну як self.__price",
      "У set_price перевіряйте if price > 0",
      "info() має друкувати два рядки кожного разу",
      "Після set_price знову викличте info()"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке інкапсуляція?",
        options: [
          "Приховування внутрішніх деталей і контроль доступу до даних",
          "Створення дочірніх класів",
          "Виклик однієї функції багато разів",
          "Перетворення типів даних"
        ],
        correctAnswer: 0,
        explanation: "Інкапсуляція об'єднує дані з поведінкою і обмежує прямий доступ до внутрішнього стану."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає одне підкреслення на початку імені (_value)?",
        options: [
          "Угода: атрибут внутрішній (protected)",
          "Атрибут повністю недоступний",
          "Атрибут видаляється автоматично",
          "Це синтаксична помилка"
        ],
        correctAnswer: 0,
        explanation: "_value - сигнал для розробників не використовувати атрибут ззовні."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У Python атрибут __secret справді неможливо прочитати жодним способом.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 1,
        explanation: "False: через name mangling доступ можливий як _ClassName__secret."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться?\n\n```python\nclass A:\n    def __init__(self):\n        self.__x = 1\n\nprint(A().__x)\n```",
        options: [
          "AttributeError",
          "1",
          "None",
          "SyntaxError"
        ],
        correctAnswer: 0,
        explanation: "Зовнішній доступ до __x напряму викликає AttributeError через mangling."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо потрібен @property?",
        options: [
          "Щоб звертатися до методу як до атрибута з можливістю валідації",
          "Щоб створити новий клас",
          "Щоб видалити об'єкт",
          "Щоб імпортувати модуль"
        ],
        correctAnswer: 0,
        explanation: "@property дає зручний синтаксис obj.x з логікою getter/setter."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n```python\nclass P:\n    def __init__(self, v):\n        self._v = v\n    @property\n    def v(self):\n        return self._v\n\nprint(P(7).v)\n```",
        options: [
          "7",
          "None",
          "Помилка",
          "_v"
        ],
        correctAnswer: 0,
        explanation: "Звернення .v викликає property-getter і повертає 7."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Setter дозволяє додати перевірку значення перед збереженням у об'єкт.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, саме для валідації часто й пишуть setter."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як Python перетворює ім'я __value всередині класу Demo?",
        options: [
          "_Demo__value",
          "__value__",
          "Demo.value",
          "private_value"
        ],
        correctAnswer: 0,
        explanation: "Name mangling додає _Ім'яКласу перед __атрибутом."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
