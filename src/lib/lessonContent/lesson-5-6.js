/**
 * Lesson 5-6: Модуль 5: Практичний проект - Система управління бібліотекою
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_6 = {
  lessonId: "lesson-5-6",
  moduleId: "module-5",
  order: 6,
  title: "Модуль 5: Практичний проект - Система управління бібліотекою",
  
  learningObjectives: [
    "Створити систему з використанням ООП",
    "Реалізувати наслідування",
    "Застосувати поліморфізм",
    "Створити повноцінний проект"
  ],
  
  estimatedTime: 180,
  prerequisites: ["lesson-5-5"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `Створимо систему управління бібліотекою з використанням ООП:

**Класи:**
- Book (базовий клас)
- EBook, PrintedBook (дочірні класи)
- Library (система управління)
- Member (читач)

**Функціонал:**
- Додавання книг
- Пошук книг
- Видача книг читачам
- Повернення книг
- Статистика`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Базова структура",
      code: `class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True

class Library:
    def __init__(self):
        self.books = []
    
    def add_book(self, book):
        self.books.append(book)`,
      explanation: "Базова структура бібліотеки."
    }
  ],
  
  commonMistakes: [],
  
  summary: `Проект об'єднує всі концепції ООП: класи, наслідування, поліморфізм.`,
  
  practiceTask: {
    title: "Система управління бібліотекою",
    description: "Створіть повноцінну систему з ООП",
    problemStatement: `Створіть систему з класами Book, EBook, PrintedBook, Library, Member. Реалізуйте CRUD операції, видачу та повернення книг.`,
    solution: {
      code: `class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True
    
    def __str__(self):
        return f"{self.title} - {self.author}"

class EBook(Book):
    def __init__(self, title, author, isbn, file_size):
        super().__init__(title, author, isbn)
        self.file_size = file_size

class PrintedBook(Book):
    def __init__(self, title, author, isbn, pages):
        super().__init__(title, author, isbn)
        self.pages = pages

class Library:
    def __init__(self):
        self.books = []
    
    def add_book(self, book):
        self.books.append(book)
    
    def find_book(self, title):
        for book in self.books:
            if book.title == title:
                return book
        return None

library = Library()
library.add_book(EBook("Python Basics", "Автор", "123", "5MB"))
library.add_book(PrintedBook("Advanced Python", "Автор", "456", 300))`,
      explanation: "Повна реалізація системи бібліотеки."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що об'єднує всі концепції ООП?",
        options: ["Функції", "Класи", "Змінні", "Списки"],
        correctAnswer: 1,
        explanation: "Класи об'єднують всі концепції ООП."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

