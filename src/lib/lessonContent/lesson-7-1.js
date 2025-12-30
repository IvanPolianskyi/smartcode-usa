/**
 * Lesson 7-1: Тестування коду (pytest)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_1 = {
  lessonId: "lesson-7-1",
  moduleId: "module-7",
  order: 1,
  title: "Тестування коду (pytest)",
  
  learningObjectives: [
    "Написати перші unit тести",
    "Використовувати pytest",
    "Тестувати функції та класи",
    "Використовувати fixtures"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-6-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Чому тестування?",
        content: `**Тестування** — перевірка, що код працює правильно.

**Переваги:**
- Знаходження помилок раніше
- Впевненість при змінах
- Документація поведінки коду

**Встановлення pytest:**
\`\`\`bash
pip install pytest
\`\`\``
      },
      {
        title: "Перший тест",
        content: `**test_calculator.py:**
\`\`\`python
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(0, 0) == 0
    assert add(-1, 1) == 0
\`\`\`

**Запуск:**
\`\`\`bash
pytest test_calculator.py
\`\`\``
      },
      {
        title: "Fixtures",
        content: `**Fixtures** — функції, які підготовлюють дані для тестів.

\`\`\`python
import pytest

@pytest.fixture
def sample_student():
    return {'name': 'Олександр', 'age': 15}

def test_student_name(sample_student):
    assert sample_student['name'] == 'Олександр'
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Тестування функцій",
      code: `# calculator.py
def multiply(a, b):
    return a * b

# test_calculator.py
import pytest
from calculator import multiply

def test_multiply():
    assert multiply(2, 3) == 6
    assert multiply(0, 5) == 0
    assert multiply(-1, 4) == -4`,
      explanation: "Демонструє базове тестування функцій."
    }
  ],
  
  commonMistakes: [],
  
  summary: `Тестування допомагає знаходити помилки та впевнено змінювати код. pytest — потужний інструмент для тестування.`,
  
  practiceTask: {
    title: "Написання тестів",
    description: "Створіть тести для функцій",
    problemStatement: "Створіть тести для функцій add, subtract, multiply, divide.",
    solution: {
      code: `# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

# test_calculator.py
import pytest
from calculator import add, subtract

def test_add():
    assert add(2, 3) == 5

def test_subtract():
    assert subtract(5, 2) == 3`,
      explanation: "Базові тести для функцій."
    },
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке unit тест?",
        options: ["Тест всього додатку", "Тест окремої функції/класу", "Тест UI", "Тест БД"],
        correctAnswer: 1,
        explanation: "Unit тест перевіряє окрему функцію або клас."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

