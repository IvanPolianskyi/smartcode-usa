/**
 * Lesson 5-5: Спеціальні методи (магічні методи)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_5 = {
  lessonId: "lesson-5-5",
  moduleId: "module-5",
  order: 5,
  title: "Спеціальні методи (магічні методи)",
  
  learningObjectives: [
    "Використовувати __str__ та __repr__",
    "Реалізовувати оператори (__add__, __eq__)",
    "Створювати контекстні менеджери",
    "Використовувати __getitem__, __setitem__"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-5-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "__str__ та __repr__",
        content: `**__str__** — рядкове представлення для користувача.
**__repr__** — технічне представлення для розробника.

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Студент {self.name}, {self.age} років"
    
    def __repr__(self):
        return f"Student('{self.name}', {self.age})"

student = Student("Олександр", 15)
print(str(student))   # Студент Олександр, 15 років
print(repr(student))  # Student('Олександр', 15)
\`\`\``
      },
      {
        title: "Оператори (__add__, __eq__)",
        content: `**Магічні методи** дозволяють використовувати оператори з об'єктами.

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Викликається __add__
print(v3)  # Vector(4, 6)
print(v1 == v2)  # False
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Магічні методи",
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"({self.x}, {self.y})"
    
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2
print(p3)`,
      explanation: "Демонструє основні магічні методи."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між __str__ та __repr__",
      explanation: "__str__ для користувача, __repr__ для розробника.",
      correctApproach: "Використовуйте __str__ для зручного виведення, __repr__ для технічного."
    }
  ],
  
  summary: `Магічні методи дозволяють використовувати оператори з об'єктами та налаштовувати їх поведінку.`,
  
  practiceTask: {
    title: "Клас Fraction",
    description: "Створіть клас для роботи з дробами",
    problemStatement: "Створіть клас Fraction з методами __add__, __str__, __eq__ для роботи з дробами.",
    solution: {
      code: `class Fraction:
    def __init__(self, numerator, denominator):
        self.n = numerator
        self.d = denominator
    
    def __add__(self, other):
        new_n = self.n * other.d + other.n * self.d
        new_d = self.d * other.d
        return Fraction(new_n, new_d)
    
    def __str__(self):
        return f"{self.n}/{self.d}"
    
    def __eq__(self, other):
        return self.n * other.d == other.n * self.d

f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f1 + f2)`,
      explanation: "Демонстрація магічних методів."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод викликається при print(obj)?",
        options: ["__repr__", "__str__", "__print__", "__display__"],
        correctAnswer: 1,
        explanation: "print() викликає __str__ для рядкового представлення."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

