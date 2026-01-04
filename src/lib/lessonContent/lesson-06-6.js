/**
 * Lesson 06-6: Dataclasses
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_6 = {
  lessonId: "lesson-06-6",
  moduleId: "module-06",
  order: 6,
  title: "Dataclasses",
  
  learningObjectives: [
    "Використовувати dataclasses для спрощення класів",
    "Автоматично генерувати методи",
    "Застосовувати декоратори dataclass",
    "Працювати з полями та значеннями за замовчуванням"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-06-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке Dataclasses?",
        content: `**Dataclasses** - це спеціальний декоратор в Python (з версії 3.7), який автоматично генерує методи для класів, що в основному зберігають дані.

**Проблема без dataclasses:**

\`\`\`python
class Person:
    def __init__(self, name, age, city):
        self.name = name
        self.age = age
        self.city = city
    
    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age}, city='{self.city}')"
    
    def __eq__(self, other):
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age and self.city == other.city
\`\`\`

**З dataclasses:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    city: str
\`\`\`

**Переваги dataclasses:**
- ✅ Менше коду
- ✅ Автоматична генерація __init__, __repr__, __eq__
- ✅ Типізація полів
- ✅ Значення за замовчуванням
- ✅ Зручна робота з даними`
      },
      {
        title: "Основи використання dataclasses",
        content: `**Створення простого dataclass:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    pages: int
    price: float

# Створення об'єкта
book = Book("1984", "Дж. Оруелл", 328, 250.50)

print(book)  # Book(title='1984', author='Дж. Оруелл', pages=328, price=250.5)
print(book.title)  # 1984

# Порівняння
book2 = Book("1984", "Дж. Оруелл", 328, 250.50)
print(book == book2)  # True - автоматичне порівняння полів
\`\`\`

**Що генерується автоматично:**
- \`__init__\` - конструктор
- \`__repr__\` - строкове представлення
- \`__eq__\` - порівняння на рівність

**Примітка:** Типи (str, int, float) є анотаціями і не обов'язкові для виконання, але рекомендовані для читабельності.`
      },
      {
        title: "Значення за замовчуванням",
        content: `**Dataclasses підтримують значення за замовчуванням:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float
    quantity: int = 1  # Значення за замовчуванням
    discount: float = 0.0  # Значення за замовчуванням
    
    def total_price(self):
        return self.price * self.quantity * (1 - self.discount)

# Можна створити без вказівки quantity та discount
product1 = Product("Ноутбук", 25000)
print(product1)  # Product(name='Ноутбук', price=25000, quantity=1, discount=0.0)

# Або вказати всі поля
product2 = Product("Телефон", 15000, 2, 0.1)
print(product2)  # Product(name='Телефон', price=15000, quantity=2, discount=0.1)
print(product2.total_price())  # 27000.0
\`\`\`

**Правила:**
- Поля без значень за замовчуванням мають бути першими
- Поля зі значеннями за замовчуванням - після них`
      },
      {
        title: "Параметри декоратора @dataclass",
        content: `**@dataclass** приймає кілька параметрів для налаштування:

\`\`\`python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

# frozen=True робить об'єкт незмінним
point = Point(3, 4)
# point.x = 5  # Помилка! FrozenInstanceError
\`\`\`

**Основні параметри:**

\`\`\`python
@dataclass(
    init=True,       # Генерувати __init__ (за замовчуванням True)
    repr=True,       # Генерувати __repr__ (за замовчуванням True)
    eq=True,         # Генерувати __eq__ (за замовчуванням True)
    order=False,     # Генерувати __lt__, __le__, __gt__, __ge__
    frozen=False     # Робити об'єкт незмінним
)
class Example:
    field: str
\`\`\`

**Приклад з order=True:**

\`\`\`python
from dataclasses import dataclass

@dataclass(order=True)
class Student:
    name: str
    grade: float

students = [
    Student("Олексій", 4.5),
    Student("Марія", 4.8),
    Student("Іван", 4.2)
]

# Можна сортувати
students.sort()
for s in students:
    print(s)
# Student(name='Іван', grade=4.2)
# Student(name='Олексій', grade=4.5)
# Student(name='Марія', grade=4.8)
\`\`\``
      },
      {
        title: "field() та складні значення за замовчуванням",
        content: `**Для складних значень за замовчуванням (списки, словники) потрібно використовувати field():**

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int
    grades: list = field(default_factory=list)  # Правильно!
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def average(self):
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)

# Кожен студент має свій власний список оцінок
student1 = Student("Олексій", 15)
student2 = Student("Марія", 16)

student1.add_grade(5)
student1.add_grade(4)
student2.add_grade(5)

print(student1.grades)  # [5, 4]
print(student2.grades)  # [5]
print(student1.average())  # 4.5
\`\`\`

**Чому потрібен field(default_factory)?**

\`\`\`python
# ❌ НЕПРАВИЛЬНО!
@dataclass
class Wrong:
    items: list = []  # Всі об'єкти будуть ділити один список!

# ✅ ПРАВИЛЬНО!
@dataclass
class Correct:
    items: list = field(default_factory=list)  # Кожен об'єкт має свій список
\`\`\`

**Параметри field():**
- \`default\` - просте значення за замовчуванням
- \`default_factory\` - функція для створення значення
- \`init\` - включати поле в __init__
- \`repr\` - включати поле в __repr__`
      },
      {
        title: "Post-init обробка",
        content: `**__post_init__** - метод, який викликається після __init__ для додаткової обробки:

\`\`\`python
from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float
    area: float = 0
    
    def __post_init__(self):
        # Обчислюємо площу після ініціалізації
        self.area = self.width * self.height

rect = Rectangle(5, 3)
print(rect)  # Rectangle(width=5, height=3, area=15)
\`\`\`

**Приклад з валідацією:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    
    def __post_init__(self):
        # Валідація в __post_init__
        if self.age < 0:
            raise ValueError("Вік не може бути від'ємним!")
        if not self.name:
            raise ValueError("Ім'я не може бути порожнім!")

# Правильно
person1 = Person("Олексій", 20)

# Помилка
try:
    person2 = Person("", 20)
except ValueError as e:
    print(e)  # Ім'я не може бути порожнім!
\`\`\``
      },
      {
        title: "Практичний приклад: Система управління товарами",
        content: `**Повний приклад використання dataclasses:**

\`\`\`python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    name: str
    price: float
    quantity: int = 1
    
    def total_value(self):
        return self.price * self.quantity

@dataclass
class Store:
    name: str
    products: List[Product] = field(default_factory=list)
    
    def add_product(self, product: Product):
        self.products.append(product)
    
    def total_inventory_value(self):
        return sum(p.total_value() for p in self.products)
    
    def get_product_by_name(self, name: str):
        for product in self.products:
            if product.name == name:
                return product
        return None

# Використання
store = Store("Техномаркет")

# Додаємо товари
store.add_product(Product("Ноутбук", 25000, 5))
store.add_product(Product("Мишка", 500, 20))
store.add_product(Product("Клавіатура", 1500, 10))

print(f"Магазин: {store.name}")
print(f"Товарів: {len(store.products)}")
print(f"Загальна вартість: {store.total_inventory_value()} грн")

# Пошук товару
laptop = store.get_product_by_name("Ноутбук")
if laptop:
    print(f"\\nЗнайдено: {laptop.name}")
    print(f"Ціна: {laptop.price} грн")
    print(f"Кількість: {laptop.quantity}")
    print(f"Загальна вартість: {laptop.total_value()} грн")
\`\`\`

**Результат:**
\`\`\`
Магазин: Техномаркет
Товарів: 3
Загальна вартість: 150000 грн

Знайдено: Ноутбук
Ціна: 25000 грн
Кількість: 5
Загальна вартість: 125000 грн
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий dataclass",
      code: `# Простий dataclass
from dataclasses import dataclass

@dataclass
class Car:
    brand: str
    model: str
    year: int
    price: float

car1 = Car("Toyota", "Camry", 2020, 500000)
car2 = Car("BMW", "X5", 2021, 1200000)

print(car1)  # Car(brand='Toyota', model='Camry', year=2020, price=500000)
print(car1 == car2)  # False
print(car1.brand)  # Toyota`,
      explanation: "Демонструє створення простого dataclass з автоматичною генерацією методів."
    },
    {
      title: "Приклад 2: Значення за замовчуванням",
      code: `# Значення за замовчуванням
from dataclasses import dataclass

@dataclass
class Task:
    title: str
    description: str = ""
    completed: bool = False
    priority: int = 1
    
    def mark_completed(self):
        self.completed = True

task1 = Task("Вивчити dataclasses")
task2 = Task("Зробити проект", "Створити веб-додаток", False, 3)

print(task1)
task1.mark_completed()
print(f"Завдання виконано: {task1.completed}")`,
      explanation: "Показує використання значень за замовчуванням в dataclass."
    },
    {
      title: "Приклад 3: field() для списків",
      code: `# field() для складних типів
from dataclasses import dataclass, field
from typing import List

@dataclass
class Playlist:
    name: str
    songs: List[str] = field(default_factory=list)
    
    def add_song(self, song: str):
        self.songs.append(song)
    
    def count(self):
        return len(self.songs)

playlist1 = Playlist("Улюблені")
playlist2 = Playlist("Робочі")

playlist1.add_song("Song 1")
playlist1.add_song("Song 2")
playlist2.add_song("Song 3")

print(f"{playlist1.name}: {playlist1.count()} пісень")
print(f"{playlist2.name}: {playlist2.count()} пісень")`,
      explanation: "Демонструє використання field(default_factory) для списків та інших змінних типів."
    },
    {
      title: "Приклад 4: frozen dataclass",
      code: `# frozen dataclass (незмінний)
from dataclasses import dataclass

@dataclass(frozen=True)
class Coordinates:
    latitude: float
    longitude: float
    
    def distance_to(self, other):
        # Спрощена формула для прикладу
        dx = self.latitude - other.latitude
        dy = self.longitude - other.longitude
        return (dx**2 + dy**2) ** 0.5

coord1 = Coordinates(50.4501, 30.5234)  # Київ
coord2 = Coordinates(49.8397, 24.0297)  # Львів

print(coord1)
print(f"Відстань: {coord1.distance_to(coord2):.2f}")

# coord1.latitude = 51.0  # Помилка! FrozenInstanceError`,
      explanation: "Показує використання frozen=True для створення незмінних об'єктів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використовувати [] або {} як значення за замовчуванням",
      explanation: "Змінні об'єкти (списки, словники) будуть спільними для всіх екземплярів.",
      correctApproach: "Використовуй field(default_factory=list) або field(default_factory=dict)"
    },
    {
      mistake: "Змінювати frozen dataclass",
      explanation: "Якщо dataclass має frozen=True, його не можна змінювати.",
      correctApproach: "Створюй новий об'єкт замість зміни frozen об'єкта"
    },
    {
      mistake: "Плутати порядок полів з та без значень за замовчуванням",
      explanation: "Поля без значень за замовчуванням мають бути першими.",
      correctApproach: "Спочатку оголошуй поля без значень, потім з значеннями за замовчуванням"
    },
    {
      mistake: "Забувати про типізацію",
      explanation: "Dataclass потребує анотації типів для всіх полів.",
      correctApproach: "Завжди вказуй типи: name: str, age: int, тощо"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Dataclasses** - декоратор для спрощення класів, що зберігають дані
2. **@dataclass** - автоматично генерує __init__, __repr__, __eq__
3. **Значення за замовчуванням** - можна вказати для полів
4. **field()** - для складних значень за замовчуванням (списки, словники)
5. **Параметри декоратора** - frozen, order, init, repr, eq
6. **__post_init__** - додаткова обробка після ініціалізації

Тепер ви вмієте створювати класи даних швидко та зручно!

Наступний урок - абстрактні класи та інтерфейси!`,
  
  practiceTask: {
    title: "Система управління бібліотекою з dataclasses",
    description: "Створіть систему управління бібліотекою використовуючи dataclasses",
    problemStatement: `Напишіть програму, яка:
1. Створює dataclass Book з полями:
   - title: str
   - author: str
   - isbn: str
   - is_available: bool = True
2. Створює dataclass Library з полями:
   - name: str
   - books: List[Book] (використати field(default_factory))
3. Додає методи до Library:
   - add_book(book) - додає книгу
   - borrow_book(isbn) - позичає книгу (is_available = False)
   - return_book(isbn) - повертає книгу (is_available = True)
   - available_books_count() - кількість доступних книг
4. Створює бібліотеку, додає кілька книг та тестує методи`,
    outputFormat: `Приклад виведення:
Бібліотека: Центральна
Додано: "1984" від Дж. Оруелл
Додано: "Кобзар" від Т. Шевченко
Доступно книг: 2
Позичено: "1984"
Доступно книг: 1
Повернено: "1984"
Доступно книг: 2`,
    examples: [
      {
        output: `Бібліотека: Центральна
Додано: "1984" від Дж. Оруелл
Додано: "Кобзар" від Т. Шевченко
Доступно книг: 2
Позичено: "1984"
Доступно книг: 1
Повернено: "1984"
Доступно книг: 2`,
        explanation: "Програма демонструє роботу з dataclasses для управління бібліотекою"
      }
    ],
    solution: {
      code: `# Система управління бібліотекою
from dataclasses import dataclass, field
from typing import List

@dataclass
class Book:
    title: str
    author: str
    isbn: str
    is_available: bool = True

@dataclass
class Library:
    name: str
    books: List[Book] = field(default_factory=list)
    
    def add_book(self, book: Book):
        self.books.append(book)
        print(f'Додано: "{book.title}" від {book.author}')
    
    def borrow_book(self, isbn: str):
        for book in self.books:
            if book.isbn == isbn and book.is_available:
                book.is_available = False
                print(f'Позичено: "{book.title}"')
                return
        print(f"Книга з ISBN {isbn} недоступна")
    
    def return_book(self, isbn: str):
        for book in self.books:
            if book.isbn == isbn:
                book.is_available = True
                print(f'Повернено: "{book.title}"')
                return
        print(f"Книга з ISBN {isbn} не знайдена")
    
    def available_books_count(self):
        return sum(1 for book in self.books if book.is_available)

# Створюємо бібліотеку
library = Library("Центральна")
print(f"Бібліотека: {library.name}")

# Додаємо книги
book1 = Book("1984", "Дж. Оруелл", "978-0-452-28423-4")
book2 = Book("Кобзар", "Т. Шевченко", "978-966-03-4385-8")

library.add_book(book1)
library.add_book(book2)

# Тестуємо методи
print(f"Доступно книг: {library.available_books_count()}")
library.borrow_book("978-0-452-28423-4")
print(f"Доступно книг: {library.available_books_count()}")
library.return_book("978-0-452-28423-4")
print(f"Доступно книг: {library.available_books_count()}")`,
      explanation: "Рішення використовує dataclasses для створення класів Book та Library з автоматичною генерацією методів."
    },
    hints: [
      "Використовуй @dataclass для обох класів",
      "Для списку books використовуй field(default_factory=list)",
      "Додай typing import для List[Book]",
      "Методи можна додавати як у звичайних класах",
      "Перевіряй is_available при позиченні книги"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке dataclass в Python?",
        options: [
          "Декоратор для автоматичної генерації методів класів даних",
          "Тип даних",
          "Функція",
          "Модуль"
        ],
        correctAnswer: 0,
        explanation: "Dataclass - це декоратор, який автоматично генерує методи для класів, що зберігають дані."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Які методи автоматично генеруються для dataclass за замовчуванням?\n\n```python\n@dataclass\nclass Person:\n    name: str\n    age: int\n```",
        options: [
          "__init__, __repr__, __eq__",
          "Тільки __init__",
          "__init__, __str__",
          "Всі методи"
        ],
        correctAnswer: 0,
        explanation: "За замовчуванням dataclass генерує __init__, __repr__ та __eq__."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно вказати список як значення за замовчуванням в dataclass?",
        options: [
          "items: list = field(default_factory=list)",
          "items: list = []",
          "items = []",
          "items: list()"
        ],
        correctAnswer: 0,
        explanation: "Для змінних об'єктів (списків, словників) потрібно використовувати field(default_factory)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить параметр frozen=True?\n\n```python\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int\n```",
        options: [
          "Робить об'єкт незмінним",
          "Заморожує виконання",
          "Робить клас статичним",
          "Нічого не робить"
        ],
        correctAnswer: 0,
        explanation: "frozen=True робить об'єкт незмінним - не можна змінювати його атрибути."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли викликається метод __post_init__?",
        options: [
          "Після __init__",
          "Перед __init__",
          "Замість __init__",
          "Ніколи"
        ],
        correctAnswer: 0,
        explanation: "__post_init__ викликається автоматично після __init__ для додаткової обробки."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\n@dataclass\nclass Test:\n    items: list = []\n```",
        options: [
          "Всі об'єкти будуть ділити один список",
          "Неправильний синтаксис",
          "Немає помилок",
          "Потрібен тип List"
        ],
        correctAnswer: 0,
        explanation: "Змінні об'єкти як [] будуть спільними для всіх екземплярів. Потрібно field(default_factory=list)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}


