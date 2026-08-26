/*Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.*/

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_08_6 = {
  lessonId: "lesson-08-6",
  moduleId: "module-08",
  order: 6,
  title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
  
  learningObjectives: [
    "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
    "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
    "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
    "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
  ],
  
  prerequisites: ["lesson-08-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      },
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      },
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      },
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      },
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      },
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      },
      {
        title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        content: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      code: `from collections import Counter, defaultdict
from itertools import groupby

data = [
    {'category': 'A', 'value': 10},
    {'category': 'B', 'value': 20},
    {'category': 'A', 'value': 15}
]

# Підрахунок
counter = Counter(d['category'] for d in data)

# Групування
sorted_data = sorted(data, key=lambda x: x['category'])
for key, group in groupby(sorted_data, key=lambda x: x['category']):
    total = sum(item['value'] for item in group)
    print(f'{key}: {total}')`,
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    },
    {
      title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      code: `import json
import csv

# Читаємо JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Експортуємо в CSV
with open('output.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)`,
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    },
    {
      title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      code: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      correctApproach: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    },
    {
      mistake: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      correctApproach: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    },
    {
      mistake: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      correctApproach: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    }
  ],
  
  summary: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
  
  practiceTask: {
    title: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
    description: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
    problemStatement: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
    outputFormat: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
    examples: [
      {
        input: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
        output: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      },
      {
        input: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
        output: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      },
      {
        input: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
        output: `Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.`,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      }
    ],
    solution: {
      code: `import csv
from collections import Counter, defaultdict
from itertools import groupby
from functools import lru_cache

n = int(input())
sales = []
for _ in range(n):
    product, category, price, date = input().split()
    sales.append({
        'product': product,
        'category': category,
        'price': int(price),
        'date': date
    })

print(f'Завантажено {len(sales)} продажів')

product_counter = Counter(s['product'] for s in sales)
print('Найпопулярніші товари:')
for i, (product, count) in enumerate(product_counter.most_common(2), 1):
    print(f'{i}. {product}: {count} продажі')

by_category = defaultdict(int)
for sale in sales:
    by_category[sale['category']] += sale['price']

print('Загальна сума за категоріями:')
for category in sorted(by_category.keys()):
    print(f'{category}: {by_category[category]} грн')

sorted_by_date = sorted(sales, key=lambda x: x['date'])
by_date = {}
for date, group in groupby(sorted_by_date, key=lambda x: x['date']):
    by_date[date] = sum(s['price'] for s in group)

@lru_cache(maxsize=128)
def cached_total(total):
    return total

_ = cached_total(sum(s['price'] for s in sales))

with open('sales_report.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['product', 'category', 'price', 'date'])
    writer.writeheader()
    writer.writerows(sales)

print('Дані експортовано у sales_report.csv')`,
      explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    },
    hints: [
      "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
      "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
    ],
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        options: [
          "collections.Counter",
          "itertools.count",
          "functools.reduce",
          "json"
        ],
        correctAnswer: 0,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        options: [
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
        ],
        correctAnswer: 1,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        options: [
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
          "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
        ],
        correctAnswer: 1,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        options: [
          "CSV",
          "JSON",
          "Excel",
          "TXT"
        ],
        correctAnswer: 1,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


