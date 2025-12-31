/**
 * Lesson 6-12: Практика: ООП-проєкт
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_12 = {
  lessonId: "lesson-6-12",
  moduleId: "module-6",
  order: 12,
  title: "Практика: ООП-проєкт",
  
  learningObjectives: [
    "Створити систему з використанням ООП",
    "Реалізувати наслідування та поліморфізм",
    "Застосувати всі принципи ООП",
    "Створити повноцінний проект",
    "Об'єднати всі знання модуля 6"
  ],
  
  estimatedTime: 180,
  prerequisites: ["lesson-6-11"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `**Мета:** Створити повноцінну систему управління бібліотекою з використанням всіх принципів ООП.

**Що ми створимо:**
- Систему управління книгами
- Різні типи книг (наслідування)
- Систему видачі та повернення
- Поліморфізм для роботи з різними типами книг
- Інкапсуляцію для захисту даних

**Принципи ООП, які використаємо:**
- ✅ Інкапсуляція — приватні атрибути, property
- ✅ Наслідування — ієрархія класів книг
- ✅ Поліморфізм — різні типи книг, одна обробка
- ✅ Абстракція — абстрактні класи для контрактів

**Структура проекту:**
- Модульна організація
- Чіткі інтерфейси
- Повна обробка помилок
- Документація`
      },
      {
        title: "Планування архітектури",
        content: `**Класи системи:**

1. **Book (абстрактний базовий клас)**
   - Атрибути: title, author, isbn, is_available
   - Абстрактні методи: get_info(), get_type()

2. **EBook (наслідує від Book)**
   - Додаткові: file_size, format
   - Реалізує абстрактні методи

3. **PrintedBook (наслідує від Book)**
   - Додаткові: pages, condition
   - Реалізує абстрактні методи

4. **Member (читач)**
   - Атрибути: name, member_id, borrowed_books
   - Методи: borrow_book(), return_book()

5. **Library (бібліотека)**
   - Атрибути: books, members
   - Методи: add_book(), find_book(), register_member()

**Взаємодія:**
- Library містить Book (композиція)
- Member має список Book (композиція)
- Різні типи Book через поліморфізм`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад структури проекту",
      code: `# Структура проекту
# library_system.py - головний модуль
# book.py - класи книг
# member.py - клас читача
# library.py - клас бібліотеки

# Приклад імпортів
from abc import ABC, abstractmethod
from book import Book, EBook, PrintedBook
from member import Member
from library import Library`,
      explanation: "Демонструє модульну структуру проекту."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати абстрактні класи",
      explanation: "Без абстрактних класів немає гарантії, що всі типи книг реалізують потрібні методи.",
      correctApproach: "Використовуйте абстрактні класи для визначення контракту для всіх типів книг."
    },
    {
      mistake: "Не використовувати інкапсуляцію",
      explanation: "Публічні атрибути дозволяють встановити некоректні значення.",
      correctApproach: "Використовуйте приватні атрибути та property для контролю доступу."
    },
    {
      mistake: "Не використовувати поліморфізм",
      explanation: "Перевірка типів через isinstance() руйнує поліморфізм.",
      correctApproach: "Використовуйте поліморфізм — викликайте методи без перевірки типів."
    }
  ],
  
  summary: `На цьому уроці ми створили повноцінний проект, який об'єднує всі знання модуля 6:

1. **Абстрактні класи** — для визначення контрактів
2. **Наслідування** — ієрархія класів книг
3. **Поліморфізм** — різні типи книг, одна обробка
4. **Інкапсуляція** — захист даних через property
5. **Композиція** — Library має Book, Member має Book
6. **Модульна структура** — організація коду

Проект демонструє практичне застосування всіх принципів ООП!`,
  
  practiceTask: {
    title: "Система управління бібліотекою",
    description: "Створіть повноцінну систему управління бібліотекою з використанням ООП",
    problemStatement: `Створіть систему управління бібліотекою з наступними вимогами:

**Частина 1: Абстрактний клас Book**
- Атрибути: title, author, isbn (приватні)
- Property: title, author, isbn (read-only)
- Абстрактні методи: get_info(), get_type()
- Методи: __init__(), __str__(), __repr__()

**Частина 2: Конкретні типи книг**
- EBook (наслідує від Book)
  - Додаткові: file_size, format
  - Реалізує абстрактні методи
- PrintedBook (наслідує від Book)
  - Додаткові: pages, condition
  - Реалізує абстрактні методи

**Частина 3: Клас Member**
- Атрибути: name, member_id, borrowed_books (приватні)
- Property: name, member_id (read-only)
- Методи: borrow_book(book), return_book(book), get_borrowed_books()

**Частина 4: Клас Library**
- Атрибути: books, members (приватні)
- Методи:
  - add_book(book) — додає книгу
  - find_book(isbn) — знаходить книгу
  - register_member(name) — реєструє читача
  - borrow_book(member_id, isbn) — видає книгу
  - return_book(member_id, isbn) — приймає книгу
  - get_available_books() — повертає доступні книги
  - get_statistics() — статистика бібліотеки

**Вимоги:**
- Використовуйте абстрактні класи для Book
- Використовуйте інкапсуляцію (приватні атрибути, property)
- Використовуйте поліморфізм (різні типи книг)
- Обробляйте помилки (книга не знайдена, вже видана тощо)
- Використовуйте магічні методи (__str__, __repr__)

**Створіть бібліотеку, додайте книги, зареєструйте читачів та продемонструйте роботу.**`,
    inputFormat: "Створіть модульну систему з кількома файлами",
    outputFormat: `Приклад виведення:
=== Бібліотека ===
Додано книгу: Python Basics (EBook)
Додано книгу: Advanced Python (PrintedBook)

Зареєстровано читача: Олександр (ID: 1)

Видано книгу: Python Basics читачу Олександр
Повернено книгу: Python Basics

=== Статистика ===
Всього книг: 2
Доступних: 1
Виданих: 0`,
    examples: [
      {
        input: "Створення бібліотеки з книгами та читачами",
        output: "Система працює з поліморфізмом",
        explanation: "Демонстрація всіх принципів ООП"
      }
    ],
    solution: {
      code: `from abc import ABC, abstractmethod

# ===== АБСТРАКТНИЙ КЛАС BOOK =====
class Book(ABC):
    def __init__(self, title, author, isbn):
        self._title = title
        self._author = author
        self._isbn = isbn
        self._is_available = True
    
    @property
    def title(self):
        return self._title
    
    @property
    def author(self):
        return self._author
    
    @property
    def isbn(self):
        return self._isbn
    
    @property
    def is_available(self):
        return self._is_available
    
    @is_available.setter
    def is_available(self, value):
        self._is_available = value
    
    @abstractmethod
    def get_info(self):
        """Абстрактний метод - має бути реалізований."""
        pass
    
    @abstractmethod
    def get_type(self):
        """Абстрактний метод - має бути реалізований."""
        pass
    
    def __str__(self):
        return f"{self._title} ({self.get_type()})"
    
    def __repr__(self):
        return f"{self.__class__.__name__}('{self._title}', '{self._author}', '{self._isbn}')"

# ===== КОНКРЕТНІ ТИПИ КНИГ =====
class EBook(Book):
    def __init__(self, title, author, isbn, file_size, format):
        super().__init__(title, author, isbn)
        self._file_size = file_size
        self._format = format
    
    @property
    def file_size(self):
        return self._file_size
    
    @property
    def format(self):
        return self._format
    
    def get_info(self):
        return (f"Електронна книга: {self._title}, Автор: {self._author}, "
                f"ISBN: {self._isbn}, Розмір: {self._file_size}, Формат: {self._format}")
    
    def get_type(self):
        return "EBook"

class PrintedBook(Book):
    def __init__(self, title, author, isbn, pages, condition="Нова"):
        super().__init__(title, author, isbn)
        self._pages = pages
        self._condition = condition
    
    @property
    def pages(self):
        return self._pages
    
    @property
    def condition(self):
        return self._condition
    
    def get_info(self):
        return (f"Друкована книга: {self._title}, Автор: {self._author}, "
                f"ISBN: {self._isbn}, Сторінок: {self._pages}, Стан: {self._condition}")
    
    def get_type(self):
        return "PrintedBook"

# ===== КЛАС MEMBER =====
class Member:
    _member_counter = 0
    
    def __init__(self, name):
        Member._member_counter += 1
        self._name = name
        self._member_id = Member._member_counter
        self._borrowed_books = []
    
    @property
    def name(self):
        return self._name
    
    @property
    def member_id(self):
        return self._member_id
    
    def borrow_book(self, book):
        """Видає книгу читачу."""
        if not book.is_available:
            raise ValueError(f"Книга '{book.title}' вже видана!")
        book.is_available = False
        self._borrowed_books.append(book)
        return f"Книга '{book.title}' видана читачу {self._name}"
    
    def return_book(self, book):
        """Повертає книгу в бібліотеку."""
        if book not in self._borrowed_books:
            raise ValueError(f"Читач {self._name} не брав книгу '{book.title}'!")
        self._borrowed_books.remove(book)
        book.is_available = True
        return f"Книга '{book.title}' повернена читачем {self._name}"
    
    def get_borrowed_books(self):
        """Повертає список позичених книг."""
        return self._borrowed_books.copy()
    
    def __str__(self):
        return f"Читач: {self._name} (ID: {self._member_id})"
    
    def __repr__(self):
        return f"Member('{self._name}')"

# ===== КЛАС LIBRARY =====
class Library:
    def __init__(self, name):
        self._name = name
        self._books = []
        self._members = []
    
    @property
    def name(self):
        return self._name
    
    def add_book(self, book):
        """Додає книгу в бібліотеку."""
        if not isinstance(book, Book):
            raise TypeError("Можна додати тільки об'єкт класу Book!")
        self._books.append(book)
        return f"Додано книгу: {book}"
    
    def find_book(self, isbn):
        """Знаходить книгу за ISBN."""
        for book in self._books:
            if book.isbn == isbn:
                return book
        return None
    
    def register_member(self, name):
        """Реєструє нового читача."""
        member = Member(name)
        self._members.append(member)
        return f"Зареєстровано читача: {member}"
    
    def get_member(self, member_id):
        """Знаходить читача за ID."""
        for member in self._members:
            if member.member_id == member_id:
                return member
        return None
    
    def borrow_book(self, member_id, isbn):
        """Видає книгу читачу."""
        book = self.find_book(isbn)
        if not book:
            raise ValueError(f"Книга з ISBN {isbn} не знайдена!")
        
        member = self.get_member(member_id)
        if not member:
            raise ValueError(f"Читач з ID {member_id} не знайдений!")
        
        return member.borrow_book(book)
    
    def return_book(self, member_id, isbn):
        """Приймає книгу від читача."""
        book = self.find_book(isbn)
        if not book:
            raise ValueError(f"Книга з ISBN {isbn} не знайдена!")
        
        member = self.get_member(member_id)
        if not member:
            raise ValueError(f"Читач з ID {member_id} не знайдений!")
        
        return member.return_book(book)
    
    def get_available_books(self):
        """Повертає список доступних книг."""
        return [book for book in self._books if book.is_available]
    
    def get_statistics(self):
        """Повертає статистику бібліотеки."""
        total_books = len(self._books)
        available = len(self.get_available_books())
        borrowed = total_books - available
        total_members = len(self._members)
        
        # Статистика по типах книг
        ebook_count = sum(1 for book in self._books if isinstance(book, EBook))
        printed_count = sum(1 for book in self._books if isinstance(book, PrintedBook))
        
        return {
            "total_books": total_books,
            "available": available,
            "borrowed": borrowed,
            "total_members": total_members,
            "ebooks": ebook_count,
            "printed_books": printed_count
        }
    
    def __str__(self):
        return f"Бібліотека: {self._name}"

# ===== ДЕМОНСТРАЦІЯ =====
def демонстрація():
    """Демонстрація роботи системи."""
    print("=== Система управління бібліотекою ===\\n")
    
    # Створення бібліотеки
    library = Library("SmartCode Library")
    print(library)
    
    # Додавання книг (поліморфізм!)
    book1 = EBook("Python Basics", "Олександр", "ISBN-001", "5MB", "PDF")
    book2 = PrintedBook("Advanced Python", "Марія", "ISBN-002", 450, "Нова")
    book3 = EBook("Web Development", "Дмитро", "ISBN-003", "10MB", "EPUB")
    
    print(library.add_book(book1))
    print(library.add_book(book2))
    print(library.add_book(book3))
    
    # Реєстрація читачів
    print(f"\\n{library.register_member('Олександр')}")
    print(library.register_member('Марія'))
    
    # Видача книг
    print(f"\\n{library.borrow_book(1, 'ISBN-001')}")
    print(library.borrow_book(2, 'ISBN-002'))
    
    # Повернення книги
    print(f"\\n{library.return_book(1, 'ISBN-001')}")
    
    # Статистика
    stats = library.get_statistics()
    print("\\n=== Статистика ===")
    print(f"Всього книг: {stats['total_books']}")
    print(f"Доступних: {stats['available']}")
    print(f"Виданих: {stats['borrowed']}")
    print(f"Читачів: {stats['total_members']}")
    print(f"Електронних: {stats['ebooks']}")
    print(f"Друкованих: {stats['printed_books']}")
    
    # Демонстрація поліморфізму
    print("\\n=== Поліморфізм ===")
    for book in library.get_available_books():
        print(f"{book.get_type()}: {book.get_info()}")

if __name__ == "__main__":
    демонстрація()`,
      explanation: "Рішення демонструє повну систему з усіма принципами ООП: абстракція, наслідування, поліморфізм, інкапсуляція."
    },
    hints: [
      "Використовуйте ABC та @abstractmethod для Book",
      "Використовуйте приватні атрибути та property для інкапсуляції",
      "Використовуйте поліморфізм для роботи з різними типами книг",
      "Обробляйте помилки (книга не знайдена, вже видана)",
      "Використовуйте магічні методи для зручного виведення"
    ],
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Які принципи ООП використовуються в проекті?",
        options: ["Тільки наслідування", "Всі принципи ООП", "Тільки інкапсуляція", "Тільки поліморфізм"],
        correctAnswer: 1,
        explanation: "Проект використовує всі принципи ООП: інкапсуляцію, наслідування, поліморфізм та абстракцію."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо використовувати абстрактні класи?",
        options: ["Швидше працює", "Гарантує реалізацію методів", "Менше пам'яті", "Краще виглядає"],
        correctAnswer: 1,
        explanation: "Абстрактні класи гарантують, що всі дочірні класи реалізують потрібні методи."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

