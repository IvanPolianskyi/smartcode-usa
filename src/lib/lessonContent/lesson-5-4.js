/**
 * Lesson 5-4: Поліморфізм та абстрактні класи
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_4 = {
  lessonId: "lesson-5-4",
  moduleId: "module-5",
  order: 4,
  title: "Поліморфізм та абстрактні класи",
  
  learningObjectives: [
    "Розуміти поліморфізм",
    "Використовувати абстрактні базові класи",
    "Реалізовувати інтерфейси",
    "Застосовувати duck typing"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-5-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке поліморфізм?",
        content: `**Поліморфізм** — можливість об'єктів різних класів використовувати один інтерфейс.

**Ідея:** Різні об'єкти можуть реагувати на однакову команду по-різному.

\`\`\`python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав-гав!"

class Cat(Animal):
    def speak(self):
        return "Мяу!"

animals = [Dog(), Cat(), Dog()]
for animal in animals:
    print(animal.speak())  # Поліморфізм: різні об'єкти, одна команда
\`\`\``
      },
      {
        title: "Абстрактні базові класи (ABC)",
        content: `**Абстрактний клас** — клас, який не можна інстанціювати напряму, тільки через дочірні класи.

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

# shape = Shape()  # Помилка! Shape — абстрактний
rect = Rectangle(5, 3)  # OK
print(rect.area())
\`\`\``
      },
      {
        title: "Duck Typing",
        content: `**"Якщо щось ходить як качка і крякає як качка, то це качка"**

Python використовує **duck typing** — тип об'єкта визначається методами, які він має.

\`\`\`python
class Dog:
    def speak(self):
        return "Гав!"

class Robot:
    def speak(self):
        return "Біп-біп!"

def make_sound(thing):
    print(thing.speak())  # Не важливо, що це — важливо, що має speak()

make_sound(Dog())    # Гав!
make_sound(Robot())  # Біп-біп!
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Поліморфізм",
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

def make_all_speak(animals):
    for animal in animals:
        print(animal.speak())

make_all_speak([Dog(), Cat(), Dog()])`,
      explanation: "Демонструє поліморфізм та абстрактні класи."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути @abstractmethod",
      explanation: "Без @abstractmethod метод не буде абстрактним.",
      correctApproach: "Завжди використовуйте @abstractmethod для абстрактних методів."
    }
  ],
  
  summary: `Поліморфізм дозволяє різним об'єктам використовувати один інтерфейс. Абстрактні класи визначають структуру без реалізації.`,
  
  practiceTask: {
    title: "Система фігур",
    description: "Створіть абстрактний клас Shape та реалізації",
    problemStatement: "Створіть абстрактний клас Shape з методами area() та perimeter(), реалізуйте Rectangle та Circle.",
    solution: {
      code: `from abc import ABC, abstractmethod

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
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius`,
      explanation: "Демонстрація абстрактних класів."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке поліморфізм?",
        options: ["Багато форм", "Можливість різних об'єктів використовувати один інтерфейс", "Створення класів", "Видалення методів"],
        correctAnswer: 1,
        explanation: "Поліморфізм — це можливість різних об'єктів реагувати на одну команду по-різному."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

