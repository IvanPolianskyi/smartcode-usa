/**
 * Lesson 6-9: Dataclasses
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_9 = {
  lessonId: "lesson-6-9",
  moduleId: "module-6",
  order: 9,
  title: "Dataclasses",
  
  learningObjectives: [
    "Використовувати dataclasses для спрощення класів",
    "Автоматично генерувати методи",
    "Застосовувати декоратори dataclass",
    "Працювати з полями та значеннями за замовчуванням",
    "Розуміти переваги dataclasses"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-6-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке dataclasses?",
        content: `**dataclasses** — модуль Python (з версії 3.7), який автоматично генерує методи для класів.

**Проблема без dataclasses:**
\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# Багато коду для простого класу!
\`\`\`

**Рішення з dataclasses:**
\`\`\`python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

# Автоматично генерується __init__, __repr__, __eq__!
point = Point(3, 4)
print(point)  # Point(x=3, y=4)
\`\`\`

**Переваги:**
- ✅ Менше коду
- ✅ Автоматична генерація методів
- ✅ Менше помилок
- ✅ Більш читабельний код`
      },
      {
        title: "Базове використання",
        content: `**Імпорт та декоратор:**
\`\`\`python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    age: int
    course: str

student = Student("Олександр", 15, "Python")
print(student)  # Student(name='Олександр', age=15, course='Python')
\`\`\`

**Що генерується автоматично:**
- \`__init__()\` — конструктор
- \`__repr__()\` — рядкове представлення
- \`__eq__()\` — порівняння на рівність

**Значення за замовчуванням:**
\`\`\`python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    age: int = 15  # Значення за замовчуванням
    course: str = "Python"

student1 = Student("Олександр")  # age=15, course="Python"
student2 = Student("Марія", 16)   # course="Python"
student3 = Student("Дмитро", 15, "Web")
\`\`\`

**Важливо:** Поля зі значеннями за замовчуванням мають бути після полів без них!`
      },
      {
        title: "Параметри dataclass",
        content: `**Параметри декоратора @dataclass:**

\`\`\`python
from dataclasses import dataclass

@dataclass(frozen=True)  # Незмінний об'єкт
class Point:
    x: int
    y: int

point = Point(3, 4)
# point.x = 5  # FrozenInstanceError! (не можна змінити)
\`\`\`

**Основні параметри:**
- \`frozen=True\` — робить об'єкт незмінним (immutable)
- \`order=True\` — генерує методи порівняння (__lt__, __le__, __gt__, __ge__)
- \`repr=True\` — генерує __repr__ (за замовчуванням True)
- \`eq=True\` — генерує __eq__ (за замовчуванням True)

**Приклад з order:**
\`\`\`python
from dataclasses import dataclass

@dataclass(order=True)
class Student:
    name: str
    age: int
    score: int

students = [
    Student("Олександр", 15, 85),
    Student("Марія", 16, 92),
    Student("Дмитро", 15, 78)
]

# Сортування (порівнює по полях по порядку)
sorted_students = sorted(students)
\`\`\``
      },
      {
        title: "Поля (field)",
        content: `**field()** — для налаштування полів.

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int
    grades: list = field(default_factory=list)  # Порожній список за замовчуванням
    is_active: bool = field(default=True)

student = Student("Олександр", 15)
student.grades.append(85)  # Працює!
\`\`\`

**Чому default_factory?**
\`\`\`python
# ПРОБЛЕМА:
@dataclass
class Student:
    grades: list = []  # Помилка! Список спільний для всіх об'єктів!

# РІШЕННЯ:
@dataclass
class Student:
    grades: list = field(default_factory=list)  # Новий список для кожного об'єкта
\`\`\`

**Інші параметри field:**
\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int = field(default=15)
    score: int = field(init=False)  # Не включається в __init__
    
    def __post_init__(self):
        self.score = 0  # Встановлюється в __post_init__
\`\`\``
      },
      {
        title: "__post_init__",
        content: `**__post_init__** — викликається після __init__ для додаткової ініціалізації.

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int
    full_name: str = field(init=False)  # Не в __init__
    
    def __post_init__(self):
        self.full_name = f"{self.name} ({self.age} років)"

student = Student("Олександр", 15)
print(student.full_name)  # Олександр (15 років)
\`\`\`

**Приклад з обчисленнями:**
\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Rectangle:
    width: int
    height: int
    area: int = field(init=False)  # Обчислюється автоматично
    
    def __post_init__(self):
        self.area = self.width * self.height

rect = Rectangle(5, 3)
print(rect.area)  # 15
\`\`\``
      },
      {
        title: "Порівняння: звичайний клас vs dataclass",
        content: `**Звичайний клас:**
\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"
    
    def __eq__(self, other):
        if not isinstance(other, Point):
            return False
        return self.x == other.x and self.y == other.y

# Багато коду!
\`\`\`

**З dataclass:**
\`\`\`python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

# Все автоматично!
\`\`\`

**Переваги dataclass:**
- ✅ Менше коду (в 3-5 разів)
- ✅ Менше помилок
- ✅ Автоматична генерація
- ✅ Більш читабельний код

**Коли використовувати:**
- Класи для зберігання даних
- Класи з багатьма атрибутами
- Коли потрібні стандартні методи (__init__, __repr__, __eq__)

**Коли НЕ використовувати:**
- Складні класи з багатою логікою
- Коли потрібна специфічна поведінка`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий dataclass",
      code: `from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

point = Point(3, 4)
print(point)  # Point(x=3, y=4)
print(point.x, point.y)  # 3 4`,
      explanation: "Демонструє базове використання dataclass."
    },
    {
      title: "Приклад 2: Значення за замовчуванням",
      code: `from dataclasses import dataclass

@dataclass
class Student:
    name: str
    age: int = 15
    course: str = "Python"

student1 = Student("Олександр")
student2 = Student("Марія", 16)
print(student1)  # Student(name='Олександр', age=15, course='Python')
print(student2)  # Student(name='Марія', age=16, course='Python')`,
      explanation: "Показує використання значень за замовчуванням."
    },
    {
      title: "Приклад 3: field та __post_init__",
      code: `from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int
    grades: list = field(default_factory=list)
    total_score: int = field(init=False)
    
    def __post_init__(self):
        self.total_score = sum(self.grades) if self.grades else 0

student = Student("Олександр", 15)
student.grades.append(85)
student.grades.append(90)
print(student.total_score)  # 0 (потрібно перерахувати)`,
      explanation: "Демонструє field та __post_init__."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання mutable значень за замовчуванням",
      explanation: "list=[] або dict={} створює спільний об'єкт для всіх екземплярів, що призводить до неочікуваної поведінки.",
      correctApproach: "Використовуйте field(default_factory=list) замість list=[] для mutable значень."
    },
    {
      mistake: "Поля зі значеннями за замовчуванням перед полями без них",
      explanation: "Python не дозволяє поля зі значеннями за замовчуванням перед полями без них.",
      correctApproach: "Завжди розміщуйте поля зі значеннями за замовчуванням після полів без них."
    },
    {
      mistake: "Використання dataclass для складних класів",
      explanation: "dataclass призначений для класів даних, не для складних класів з багатою логікою.",
      correctApproach: "Використовуйте dataclass для простих класів даних, звичайні класи для складних."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **dataclasses** — модуль для спрощення класів
2. **@dataclass** — декоратор для автоматичної генерації методів
3. **Автоматична генерація** — __init__, __repr__, __eq__
4. **field()** — для налаштування полів
5. **__post_init__** — додаткова ініціалізація
6. **Параметри** — frozen, order, repr, eq

**Переваги:**
- Менше коду
- Автоматична генерація
- Менше помилок
- Більш читабельний код

**Коли використовувати:**
- Класи для зберігання даних
- Коли потрібні стандартні методи
- Прості класи з багатьма атрибутами

**Важливо:**
- Використовуйте field(default_factory=...) для mutable значень
- Поля зі значеннями за замовчуванням після полів без них

Dataclasses спрощують створення класів даних!`,
  
  practiceTask: {
    title: "Створення dataclass для обліку книг",
    description: "Створіть dataclass для представлення книг",
    problemStatement: `Створіть dataclass Book з наступними вимогами:

**Поля:**
- title (назва) — обов'язкове
- author (автор) — обов'язкове
- year (рік) — за замовчуванням поточний рік
- pages (сторінки) — обов'язкове
- tags (теги) — список, за замовчуванням порожній
- is_read (прочитана) — за замовчуванням False
- rating (оцінка) — за замовчуванням None

**Додатково:**
- Використовуйте field() для tags (default_factory=list)
- Створіть __post_init__ для валідації:
  - year не може бути більше поточного року
  - pages має бути додатнім
  - rating має бути від 1 до 10 (якщо встановлено)

**Методи:**
- add_tag(tag) — додає тег
- mark_as_read() — позначає як прочитану
- set_rating(rating) — встановлює оцінку з валідацією

**Створіть кілька книг та продемонструйте роботу.**`,
    inputFormat: "Створіть dataclass та об'єкти",
    outputFormat: `Приклад виведення:
Book(title='Python Basics', author='Олександр', year=2024, pages=250, tags=[], is_read=False, rating=None)
Після додавання тегів та оцінки:
Book(title='Python Basics', author='Олександр', year=2024, pages=250, tags=['програмування', 'python'], is_read=True, rating=8)`,
    examples: [
      {
        input: "Book('Python Basics', 'Олександр', pages=250)",
        output: "Книга створена з автоматичною генерацією методів",
        explanation: "Демонстрація dataclass"
      }
    ],
    solution: {
      code: `from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Book:
    title: str
    author: str
    pages: int
    year: int = None
    tags: list = field(default_factory=list)
    is_read: bool = False
    rating: int = None
    
    def __post_init__(self):
        # Встановлюємо поточний рік, якщо не вказано
        if self.year is None:
            self.year = datetime.now().year
        
        # Валідація
        current_year = datetime.now().year
        if self.year > current_year:
            raise ValueError(f"Рік не може бути більше {current_year}!")
        
        if self.pages <= 0:
            raise ValueError("Кількість сторінок має бути додатньою!")
        
        if self.rating is not None and not (1 <= self.rating <= 10):
            raise ValueError("Оцінка має бути від 1 до 10!")
    
    def add_tag(self, tag):
        """Додає тег до книги."""
        if tag not in self.tags:
            self.tags.append(tag)
    
    def mark_as_read(self):
        """Позначає книгу як прочитану."""
        self.is_read = True
    
    def set_rating(self, rating):
        """Встановлює оцінку з валідацією."""
        if not (1 <= rating <= 10):
            raise ValueError("Оцінка має бути від 1 до 10!")
        self.rating = rating

# Створення об'єктів
book1 = Book("Python Basics", "Олександр", 250)
print(book1)

book1.add_tag("програмування")
book1.add_tag("python")
book1.mark_as_read()
book1.set_rating(8)
print(book1)

# Порівняння (автоматично з dataclass)
book2 = Book("Python Basics", "Олександр", 250)
print(f"book1 == book2: {book1 == book2}")  # False (різні теги, is_read, rating)`,
      explanation: "Рішення демонструє повний dataclass з валідацією та методами."
    },
    hints: [
      "Використовуйте field(default_factory=list) для tags",
      "Використовуйте __post_init__ для валідації",
      "Використовуйте datetime.now().year для поточного року",
      "Додайте методи для роботи з тегами та оцінкою"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке dataclass?",
        options: ["Клас для даних", "Модуль для автоматичної генерації методів", "Тип даних", "Функція"],
        correctAnswer: 1,
        explanation: "dataclass — це декоратор, який автоматично генерує методи (__init__, __repr__, __eq__) для класу."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: @dataclass class P: x:int; y:int=0; p=P(1); print(p)?",
        options: ["P(x=1, y=0)", "Помилку", "P(1, 0)", "None"],
        correctAnswer: 0,
        explanation: "dataclass автоматично генерує __repr__, який виводить P(x=1, y=0)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно встановити порожній список за замовчуванням?",
        options: ["list=[]", "list=field(default=[])", "list=field(default_factory=list)", "list=None"],
        correctAnswer: 2,
        explanation: "Для mutable значень використовуйте field(default_factory=list), щоб уникнути спільного об'єкта."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

