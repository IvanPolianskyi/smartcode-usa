/**
 * Lesson 08-6: Practice: data processing with modules
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_08_6 = {
  lessonId: "lesson-08-6",
  moduleId: "module-08",
  order: 6,
  title: "Practice: data processing with modules",
  
  learningObjectives: [
    "Apply all studied modules in practice",
    "Create a data processing project",
    "Optimize your code with modules",
    "Combine different techniques for working with data"
  ],
  
  prerequisites: ["lesson-08-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Overview of the studied",
        content: `In this lesson, we will consolidate all knowledge from module 08:

**What we learned:**

1. **Collections module** - namedtuple, deque, Counter, defaultdict
2. **Itertools module** - combinations, permutations, grouping
3. **functools module** - partial, reduce, lru_cache
4. **Working with JSON** - reading, writing, parsing
5. **Working with CSV and Excel** - tabular data processing

**Objective of this lesson:**

- Combine all concepts
- Create a practical project
- Optimize the code
- Improve programming skills`
      },
      {
        title: "Task 1: Analysis of sales",
        content: `**Task:** Create a sales analysis system using collections and itertools.

**Solution:**

\`\`\`python
from collections import Counter, defaultdict
from itertools import groupby

# Sales data
sales = [
    {'product': 'Laptop', 'category': 'Electronics', 'price': 25000},
    {'product': 'Mouse', 'category': 'Electronics', 'price': 500},
    {'product': 'Table', 'category': 'Furniture', 'price': 3000},
    {'product': 'Laptop', 'category': 'Electronics', 'price': 25000},
    {'product': 'Armchair', 'category': 'Furniture', 'price': 2000}
]

# Counting sales by product
product_counter = Counter(s['product'] for s in sales)
print('Most popular products:')
for product, count in product_counter.most_common(3):
    print(f'{product}: {count} sales')

# Grouping by category
sales_sorted = sorted(sales, key=lambda x: x['category'])
total_by_category = defaultdict(int)

for category, group in groupby(sales_sorted, key=lambda x: x['category']):
    total = sum(item['price'] for item in group)
    total_by_category[category] += total

print('\\\\nTotal amount by categories:')
for category, total in total_by_category.items():
    print(f'{category}: {total} UAH')
\`\`\``
      },
      {
        title: "Task 2: Processing data from JSON and CSV",
        content: `**Task:** Create a system to process data from JSON and export to CSV.

**Solution:**

\`\`\`python
import json
import csv
from collections import defaultdict

# Read data from JSON
def load_data_from_json(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

# We process the data
def process_students(students_data):
    from collections import Counter
    
    # Calculation by courses
    courses = Counter(s['course'] for s in students_data)
    
    # Grouping by city
    by_city = defaultdict(list)
    for student in students_data:
        by_city[student['city']].append(student)
    
    return courses, by_city

# Export to CSV
def export_to_csv(data, filename):
    with open(filename, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['name', 'course', 'grade', 'city'])
        writer.writeheader()
        writer.writerrows(data)

# Usage
students = load_data_from_json('students.json')
courses, by_city = process_students(students)

# We export
export_to_csv(students, 'students_export.csv')
\`\`\``
      },
      {
        title: "Task 3: Optimization with functools",
        content: `**Task:** Create a caching and partial application computing system.

**Solution:**

\`\`\`python
from functools import lru_cache, partial, reduce
from collections import Counter

# Cached calculation function
@lru_cache(maxsize=128)
def calculate_total(items_tuple):
    """Calculates the total"""
    return sum(items_tuple)

# Partial application for discounts
def apply_discount(price, discount_percent):
    return price * (1 - discount_percent / 100)

# We create functions for various discounts
apply_10_discount = partial(apply_discount, discount_percent=10)
apply_20_discount = partial(apply_discount, discount_percent=20)

# Usage
prices = [1000, 2000, 3000]
discounted_10 = [apply_10_discount(p) for p in prices]
discounted_20 = [apply_20_discount(p) for p in prices]

# We calculate the total amount with reduce
total = reduce(lambda x, y: x + y, discounted_10)
print(f'Total amount with 10% discount: {total}')
\`\`\``
      },
      {
        title: "Task 4: Comprehensive data processing system",
        content: `**Task:** Create a complete system for data processing and analysis.

**Solution:**

\`\`\`python
import json
import csv
from collections import Counter, defaultdict, namedtuple
from itertools import groupby, chain
from functools import lru_cache

# We use namedtuple for the data structure
Student = namedtuple('Student', ['name', 'course', 'grade', 'city'])

class DataProcessor:
    def __init__(self):
        self.students = []
    
    def load_from_json(self, filename):
        """Loads data from JSON"""
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            self.students = [Student(**s) for s in data]
        return self
    
    def analyze_by_course(self):
        """Analyzes data by courses"""
        from collections import Counter
        courses = Counter(s.course for s in self.students)
        return courses
    
    def analyze_by_city(self):
        """Analyzes data by city"""
        by_city = defaultdict(list)
        for student in self.students:
            by_city[student.city].append(student)
        return by_city
    
    @lru_cache(maxsize=128)
    def calculate_average_grade(self, course):
        """Calculates the grade point average for the course"""
        course_students = [s for s in self.students if s.course == course]
        if not course_students:
            return 0
        total = sum(s.grade for s in course_students)
        return total / len(course_students)
    
    def export_to_csv(self, filename):
        """Exports data to CSV"""
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['MyName', 'Course', 'Grade', 'City'])
            for student in self.students:
                writer.writerow([student.name, student.course, 
                               student.grade, student.city])
    
    def generate_report(self):
        """Generating report"""
        courses = self.analyze_by_course()
        by_city = self.analyze_by_city()
        
        print('=== Student Report ===')
        print(f'\\\\nTotal number: {len(self.students)}')
        
        print('\\\\nBy courses:')
        for course, count in courses.most_common():
            avg = self.calculate_average_grade(course)
            print(f'{course}: {count} students, average grade: {avg:.2f}')
        
        print('\\\\nBy cities:')
        for city, students in by_city.items():
            print(f'{city}: {len(students)} students')

# Usage
processor = DataProcessor()
processor.load_from_json('students.json')
processor.generate_report()
processor.export_to_csv('report.csv')
\`\`\``
      },
      {
        title: "Practical advice",
        content: `**When to use which module:**

1. **collections** - when specialized data structures are needed
   - Counter - for counting
   - defaultdict - for grouping
   - namedtuple - for structured data

2. **itertools** - when you need to work with iterators
   - combinations/permutations - for combinatorics
   - groupby - for grouping
   - chain - for joining

3. **functools** - when optimization of functions is required
   - lru_cache - for caching
   - partial - for specialization
   - reduce - for convolution

4. **json** - for exchanging data and configurations
5. **csv/Excel** - for tabular data

**Code Optimization:**

- Use generators instead of lists for big data
- Cache the results of heavy calculations
- Group data using defaultdict and groupby
- Use namedtuple for structured data`
      },
      {
        title: "Summary of module 8",
        content: `We have completed Module 08 - Advanced Python Modules!

**What we learned:**

1. **collections** - specialized data containers
2. **itertools** - powerful tools for iterators
3. **functools** - functions for working with functions
4. **json** - data exchange and storage
5. **csv/Excel** - work with tabular data

**Skills:**

- Effective data processing
- Code optimization
- Work with different formats
- Creation of complex systems

**Next steps:**

Keep practicing and applying these tools to your projects!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Complex data analysis",
      code: `from collections import Counter, defaultdict
from itertools import groupby

data = [
    {'category': 'A', 'value': 10},
    {'category': 'B', 'value': 20},
    {'category': 'A', 'value': 15}
]

# Counting
counter = Counter(d['category'] for d in data)

# Grouping
sorted_data = sorted(data, key=lambda x: x['category'])
for key, group in groupby(sorted_data, key=lambda x: x['category']):
    total = sum(item['value'] for item in group)
    print(f'{key}: {total}')`,
      explanation: "We combine Counter and groupby for comprehensive data analysis."
    },
    {
      title: "Example 2: Processing JSON and CSV",
      code: `import json
import csv

# Read JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Export to CSV
with open('output.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerrows(data)`,
      explanation: "We use json for reading and csv for data export."
    },
    {
      title: "Example 3: Optimization with functools",
      code: `from functools import lru_cache, partial

@lru_cache(maxsize=128)
def expensive_calculation(n):
    # Simulation of heavy computation
    return sum(i**2 for i in range(n))

# Partial application
calculate_squares = partial(expensive_calculation, 1000)
result = calculate_squares()`,
      explanation: "We use lru_cache for caching and partial for specialization."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not use appropriate modules for tasks",
      explanation: "Sometimes it is easier to use ready-made modules instead of writing your own code.",
      correctApproach: "Explore the capabilities of standard modules and use them."
    },
    {
      mistake: "Forget about caching heavy calculations",
      explanation: "Without caching, the same calculations are performed many times.",
      correctApproach: "Use lru_cache for functions that are called with the same arguments."
    },
    {
      mistake: "Do not handle errors when working with files",
      explanation: "The files may not exist or may be corrupted.",
      correctApproach: "Always use try/except when working with files."
    }
  ],
  
  summary: `In this lesson, we consolidated all the knowledge of module 08:

1. collections - specialized data structures
2. itertools - powerful tools for iterators
3. functools - optimization of functions
4. json - data exchange
5. csv/Excel - tabular data

Now you know how to process data efficiently and optimize your code!

This concludes Module 08 - Advanced Python Modules!`,
  
  practiceTask: {
    title: "Creation of a sales analysis system",
    description: "Create a comprehensive system for sales analysis using all the studied modules",
    problemStatement: `Create a sales analysis system:
1. Download sales data from a JSON file
2. Use Counter to count sales by products
3. Use defaultdict to group by categories
4. Use groupby to analyze by dates
5. Export the results to CSV and Excel
6. Use lru_cache to cache calculations

Data structure:
{
  "sales": [
    {"product": "Laptop", "category": "Electronics", "price": 25000, "date": "2024-01-15"},
    ...
  ]
}`,
    outputFormat: `10 sales uploaded
The most popular products:
1. Laptop: 3 sales
2. Mouse: 2 sales

Total amount by category:
Electronics: UAH 50,000
Furniture: UAH 5,000

Data exported to sales_report.csv and sales_report.xlsx`,
    examples: [
      {
        output: `Loaded 5 sales
\\nMost popular products:
1. Laptop: 2 sales
\\nTotal amount: 50000 UAH`,
        explanation: "We use all studied modules for comprehensive analysis."
      }
    ],
    solution: {
      code: `import json
import csv
from collections import Counter, defaultdict
from itertools import groupby
from functools import lru_cache

# Sales data (instead of downloading from a file) - 5 sales, a total of 50,000
sales_data = {
    "sales": [
        {"product": "Laptop", "category": "Electronics", "price": 25000, "date": "2024-01-15"},
        {"product": "Laptop", "category": "Electronics", "price": 25000, "date": "2024-01-15"},
        {"product": "Mouse", "category": "Electronics", "price": 0, "date": "2024-01-16"},
        {"product": "Table", "category": "Furniture", "price": 0, "date": "2024-01-16"},
        {"product": "Armchair", "category": "Furniture", "price": 0, "date": "2024-01-17"}
    ]
}

sales = sales_data['sales']
print(f'Loaded {len(sales)} sales')

# Counting by products
product_counter = Counter(s['product'] for s in sales)

print('\\\\nMost popular products:')
for i, (product, count) in enumerate(product_counter.most_common(1), 1):
    print(f'{i}. {product}: {count} sales')

# Calculation of the total amount
total_sum = sum(sale['price'] for sale in sales)
print(f'\\\\nTotal amount: {total_sum} UAH')

# Grouping by dates
sorted_by_date = sorted(sales, key=lambda x: x['date'])
by_date = {}
for date, group in groupby(sorted_by_date, key=lambda x: x['date']):
    by_date[date] = sum(s['price'] for s in group)

# Caching calculations
@lru_cache(maxsize=128)
def calculate_total(sales_tuple):
    return sum(s['price'] for s in sales_tuple)

# Export to CSV
def export_to_csv(sales, filename):
    try:
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['product', 'category', 'price', 'date'])
            writer.writeheader()
            writer.writerrows(sales)
    except Exception:
        pass

# Export to Excel
def export_to_excel(sales, filename):
    try:
        from openpyxl import Workbook
        wb = Workbook()
        ws = wb.active
        
        # Headers
        ws['A1'] = 'Product'
        ws['B1'] = 'Category'
        ws['C1'] = 'Price'
        ws['D1'] = 'Date'
        
        # Data
        for row_num, sale in enumerate(sales, start=2):
            ws[f'A{row_num}'] = sale['product']
            ws[f'B{row_num}'] = sale['category']
            ws[f'C{row_num}'] = sale['price']
            ws[f'D{row_num}'] = sale['date']
        
        wb.save(filename)
    except ImportError:
        pass
    except Exception:
        pass

export_to_csv(sales, 'sales_report.csv')
export_to_excel(sales, 'sales_report.xlsx')`,
      explanation: "We use all the studied modules: json for reading, Counter for counting, defaultdict for grouping, groupby for analysis, csv/Excel for export."
    },
    hints: [
      "Use json.load() to read",
      "Use Counter to count",
      "Use defaultdict for grouping",
      "Use groupby to analyze by dates",
      "Use csv and openpyxl to export"
    ],
    difficulty: "advanced"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the best module to use to count items?",
        options: [
          "collections.Counter",
          "itertools.count",
          "functools.reduce",
          "json"
        ],
        correctAnswer: 0,
        explanation: "collections.Counter is specially designed for counting hashed objects."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What do you need to do before using groupby?",
        options: [
          "Nothing",
          "Sort the data",
          "Convert to list",
          "Filter data"
        ],
        correctAnswer: 1,
        explanation: "groupby only works with consecutive elements, so the data must be sorted."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is lru_cache used for?",
        options: [
          "For convolution of sequences",
          "To cache function results",
          "For partial use",
          "To group data"
        ],
        correctAnswer: 1,
        explanation: "lru_cache caches function results to avoid repeated calculations with the same arguments."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the best format to use for exchanging data between systems?",
        options: [
          "CSV",
          "JSON",
          "Excel",
          "TXT"
        ],
        correctAnswer: 1,
        explanation: "JSON is a standard format for exchanging data between different systems and programming languages."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can combine different modules to solve complex problems.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Different modules complement each other and can be used together for complex tasks."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


