/** 
* Lesson 08-5: Working with CSV and Excel 
* Full educational content*/

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_08_5 = {
  lessonId: "lesson-08-5",
  moduleId: "module-08",
  order: 5,
  title: "Work with CSV and Excel",
  
  learningObjectives: [
    "Read and write CSV files",
    "Work with Excel files using openpyxl",
    "Process structured data",
    "Use pandas to work with tables"
  ],
  
  prerequisites: ["lesson-08-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to CSV",
        content: `CSV (Comma-Separated Values) is a text format for storing tabular data. 

**What is CSV?** 

- Simple format where data is separated by commas (or other separators) 
- Each line is a record 
- The first row often contains column headings 
- Easy to read and edit 

**Example CSV file:** 

\`\`\`csv 
Name, Age, City 
Oleksandr, 25, Kyiv 
Maria, 23, Lviv 
Ivan, 30, Odesa 
\`\`\` 

**Import csv module:** 

\`\`\`python 
import csv 
\`\`\``
      },
      {
        title: "Reading CSV files",
        content: `**csv.reader()** - reads a CSV file line by line. 

\`\`\`python 
import csv 

# Reading a CSV file 
with open('data.csv', 'r', encoding='utf-8') as f: 
reader = csv.reader(f) 
for row in reader: 
print(row) 
# ['Name', 'Age', 'City'] 
# ['Aleksandr', '25', 'Kyiv'] 
# ['Maria', '23', 'Lviv'] 
\`\`\` 

**csv.DictReader()** - reads CSV as dictionaries (with headers). 

\`\`\`python 
import csv 

# Reading like dictionaries 
with open('data.csv', 'r', encoding='utf-8') as f: 
reader = csv.DictReader(f) 
for row in reader: 
print(row['FirstName'], row['Age']) 
# Oleksandr 25 
# Maria 23 
\`\`\` 

**Data processing:** 

\`\`\`python 
import csv 

students = [] 

with open('students.csv', 'r', encoding='utf-8') as f: 
reader = csv.DictReader(f) 
for row in reader: 
students.append({ 
'name': row['My name'], 
'age': int(row['Age']),
'grade': float(row['Grade']) 
}) 

print(students) 
\`\`\``
      },
      {
        title: "Recording in CSV files",
        content: `**csv.writer()** - writes data to a CSV file. 

\`\`\`python 
import csv 

data = [ 
['Name', 'Age', 'City'], 
['Alexander', '25', 'Kyiv'], 
['Maria', '23', 'Lviv'] 
] 

# Record in CSV 
with open('output.csv', 'w', encoding='utf-8', newline='') as f: 
writer = csv.writer(f) 
writer.writerrows(data) 
\`\`\` 

**csv.DictWriter()** - writes dictionaries to CSV. 

\`\`\`python 
import csv 

data = [ 
{'Name': 'Aleksandr', 'Age': '25', 'City': 'Kyiv'}, 
{'Name': 'Maria', 'Age': '23', 'City': 'Lviv'} 
] 

# Record dictionaries 
with open('output.csv', 'w', encoding='utf-8', newline='') as f: 
fieldnames = ['Firstname', 'Age', 'City'] 
writer = csv.DictWriter(f, fieldnames=fieldnames) 
writer.writeheader() # Write the headers 
writer.writerrows(data) 
\`\`\` 

**Important:** Use \`newline=''\` when opening a file for writing to avoid empty lines.
**Different separators:** 

\`\`\`python 
import csv 

# Using a semicolon as a delimiter 
with open('data.csv', 'w', encoding='utf-8', newline='') as f: 
writer = csv.writer(f, delimiter=';') 
writer.writerow(['Firstname', 'Age']) 
writer.writerow(['Alexander', '25']) 
\`\`\``
      },
      {
        title: "Working with Excel files (openpyxl)",
        content: `To work with Excel files, we use the \`openpyxl\` library. 

**Installation:** 

\`\`\`bash 
pip install openpyxl 
\`\`\` 

**Reading Excel files:** 

\`\`\`python 
from openpyxl import load_workbook 

# Download the Excel file 
wb = load_workbook('data.xlsx') 
ws = wb.active # Active sheet 

# We read the value of the cell 
print(ws['A1'].value) # Value of cell A1 

# We read the line 
for row in ws.iter_rows(min_row=1, max_row=3, values_only=True): 
print(row) 
\`\`\` 

**Recording to Excel files:** 

\`\`\`python 
from openpyxl import Workbook 

# We create a new book 
wb = Workbook() 
ws = wb.active 

# We record the data 
ws['A1'] = 'My Name' 
ws['B1'] = 'Age' 
ws['A2'] = 'Alexander' 
ws['B2'] = 25 

# We save 
wb.save('output.xlsx') 
\`\`\` 

**Working with several sheets:** 

\`\`\`python 
from openpyxl import Workbook 

wb = Workbook() 

# We create a new letter 
ws1 = wb.create_sheet('Students')
ws2 = wb.create_sheet('Ratings') 

# We record the data 
ws1['A1'] = 'My Name' 
ws2['A1'] = 'Item' 

wb.save('data.xlsx') 
\`\`\` 

**Reading from a specific letter:** 

\`\`\`python 
from openpyxl import load_workbook 

wb = load_workbook('data.xlsx') 
ws = wb['Students'] # Selecting a specific letter 

for row in ws.iter_rows(values_only=True): 
print(row) 
\`\`\``
      },
      {
        title: "Working with pandas for tables",
        content: `\`pandas\` is a powerful library for working with data. It simplifies work with CSV and Excel. 

**Installation:** 

\`\`\`bash 
pip install pandas openpyxl 
\`\`\` 

**Reading CSV with pandas:** 

\`\`\`python 
import pandas as pd 

# Reading CSV 
df = pd.read_csv('data.csv', encoding='utf-8') 
print(df) 

# Access to columns 
print(df['MyName']) 
print(df['Age'].mean()) # Average value 
\`\`\` 

**Reading Excel with pandas:** 

\`\`\`python 
import pandas as pd 

# Reading Excel 
df = pd.read_excel('data.xlsx', sheet_name='Students') 
print(df) 
\`\`\` 

**Recording in CSV and Excel:** 

\`\`\`python 
import pandas as pd 

# Create a DataFrame 
data = { 
'Name': ['Alexander', 'Maria'], 
'Age': [25, 23], 
'City': ['Kyiv', 'Lviv'] 
} 
df = pd.DataFrame(data) 

# Write to CSV 
df.to_csv('output.csv', index=False, encoding='utf-8') 

# Record in Excel 
df.to_excel('output.xlsx', index=False, sheet_name='Students')
\`\`\` 

**Data processing:** 

\`\`\`python 
import pandas as pd 

df = pd.read_csv('students.csv', encoding='utf-8') 

# Filtering 
high_grades = df[df['Grade'] > 90] 

# Grouping 
by_city = df.groupby('City')['Score'].mean() 

# Sorting 
sorted_df = df.sort_values('Evaluation', ascending=False) 
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Export data to CSV** 

\`\`\`python 
import csv 

students = [ 
{'name': 'Alexander', 'grade': 95}, 
{'name': 'Maria', 'grade': 88}, 
{'name': 'Ivan', 'grade': 92} 
] 

with open('grades.csv', 'w', encoding='utf-8', newline='') as f: 
writer = csv.DictWriter(f, fieldnames=['name', 'grade']) 
writer.writeheader() 
writer.writerrows(students) 
\`\`\` 

**Example 2: Analysis of CSV data** 

\`\`\`python 
import csv 

total = 0 
count = 0 

with open('grades.csv', 'r', encoding='utf-8') as f: 
reader = csv.DictReader(f) 
for row in reader: 
total += int(row['grade']) 
count += 1 

average = total / count if count > 0 else 0 
print(f'Average score: {average:.2f}') 
\`\`\` 

**Example 3: CSV to Excel conversion** 

\`\`\`python 
import csv 
from openpyxl import Workbook 

wb = Workbook() 
ws = wb.active 

# Reading CSV
with open('data.csv', 'r', encoding='utf-8') as f: 
reader = csv.reader(f) 
for row_num, row in enumerate(reader, start=1): 
for col_num, value in enumerate(row, start=1): 
ws.cell(row=row_num, column=col_num, value=value) 

wb.save('data.xlsx') 
\`\`\` 

**Example 4: Processing large files** 

\`\`\`python 
import csv 

# Processing a large CSV file in parts 
def process_large_csv(filename, chunk_size=1000): 
with open(filename, 'r', encoding='utf-8') as f: 
reader = csv.DictReader(f) 
chunk = [] 
for row in reader: 
chunk.append(row) 
if len(chunk) >= chunk_size: 
# We process the chunk 
process_chunk(chunk) 
chunk = [] 
# We process the last chunk 
if chunk: 
process_chunk(chunk) 

def process_chunk(chunk): 
# Your processing logic
print(f'Processed {len(chunk)} records') 
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson, we learned how to work with CSV and Excel: 

**CSV (csv module):** 

1. **csv.reader()** - reading CSV lines 
2. **csv.DictReader()** - reading as dictionaries 
3. **csv.writer()** - record with lines 
4. **csv.DictWriter()** - recording with dictionaries 

**Excel (openpyxl):** 

1. **load_workbook()** - loading an Excel file 
2. **Workbook()** - creation of a new workbook 
3. **Working with letters** - creation and selection of letters 
4. **Access to cells** - reading and writing 

**Pandas:** 

1. **pd.read_csv()** - CSV reading 
2. **pd.read_excel()** - reading Excel 
3. **df.to_csv()** - recording in CSV 
4. **df.to_excel()** - record in Excel 
5. **Data processing** - filtering, grouping, sorting 

**Important:** 

- Use \`encoding='utf-8'\` for Ukrainian text 
- Use \`newline=''\` when writing CSV 
- Pandas simplifies working with big data 

**Next step:**
In the next lesson, we will consolidate all the knowledge of module 8 with practical tasks.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Reading CSV",
      code: `import csv 

with open('data.csv', 'r', encoding='utf-8') as f: 
reader = csv.DictReader(f) 
for row in reader: 
print(row['FirstName'], row['Age'])`,
      explanation: "We use csv.DictReader to read CSV as dictionaries."
    },
    {
      title: "Example 2: Writing to CSV",
      code: `import csv 

data = [{'Name': 'Alexander', 'Age': '25'}] 
with open('output.csv', 'w', encoding='utf-8', newline='') as f: 
writer = csv.DictWriter(f, fieldnames=['Firstname', 'Age']) 
writer.writeheader() 
writer.writerrows(data)`,
      explanation: "We use csv.DictWriter to write dictionaries to CSV."
    },
    {
      title: "Example 3: Working with Excel",
      code: `from openpyxl import Workbook 

wb = Workbook() 
ws = wb.active 
ws['A1'] = 'My Name' 
ws['B1'] = 'Age' 
wb.save('data.xlsx')`,
      explanation: "We create an Excel file and record the data."
    },
    {
      title: "Example 4: Pandas for CSV",
      code: `import pandas as pd 

df = pd.read_csv('data.csv', encoding='utf-8') 
print(df['Age'].mean()) # Average value`,
      explanation: "We use pandas to read and process CSV data."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forget newline='' when writing CSV",
      explanation: "Without newline='' empty lines may appear between entries.",
      correctApproach: "Always use newline='' when opening a CSV file for writing."
    },
    {
      mistake: "Do not specify encoding='utf-8'",
      explanation: "Without encoding='utf-8', Ukrainian characters may be displayed incorrectly.",
      correctApproach: "Always use encoding='utf-8' to work with Ukrainian text."
    },
    {
      mistake: "Trying to read Excel without openpyxl",
      explanation: "To work with Excel, you need the openpyxl library.",
      correctApproach: "Install openpyxl: pip install openpyxl"
    }
  ],
  
  summary: `In this lesson, we learned how to work with CSV and Excel: 

1. CSV - csv.reader, csv.DictReader, csv.writer, csv.DictWriter 
2. Excel - openpyxl for reading and writing 
3. Pandas - simplified work with tabular data 

CSV and Excel - standard formats for storing and exchanging structured data!`,
  
  practiceTask: {
    title: "Creation of a student registration system",
    description: "Create a system to store and process student data in CSV",
    problemStatement: `Create a student accounting system: 
1. Count the number of students n 
2. Then read n lines: name, age, course, grade (through a space) 
3. Save the data to the CSV file students.csv 
4. Load the data back and output the number of students and the average grade (1 decimal place) 

Input format: 
3 
Alexander 25 Python 95 
Maria 23 JavaScript 88 
Ivan 30 Python 92`,
    outputFormat: `Data saved
3 students loaded
Average grade: 91.7`,
    examples: [
      {
        input: `3
Alexander 25 Python 95
Maria 23 JavaScript 88
Ivan 30 Python 92`,
        output: `Data saved
3 students loaded
Average grade: 91.7`,
        explanation: "Three students, average (95+88+92)/3 = 91.7"
      },
      {
        input: `1
Elena 20 Python 100`,
        output: `Data saved
1 students loaded
Average grade: 100.0`,
        explanation: "One student with a score of 100"
      },
      {
        input: `2
Anya 22 Java 80
Bohdan 24 Python 90`,
        output: `Data saved
2 students loaded
Average grade: 85.0`,
        explanation: "Average (80+90)/2 = 85.0"
      }
    ],
    solution: {
      code: `import csv

def save_students_csv(students, filename='students.csv'):
    with open(filename, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['name', 'age', 'course', 'grade'])
        writer.writeheader()
        writer.writerows(students)
    print('Data saved')

def load_students_csv(filename='students.csv'):
    students = []
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                students.append({
                    'name': row['name'],
                    'age': int(row['age']),
                    'course': row['course'],
                    'grade': float(row['grade'])
                })
    except FileNotFoundError:
        pass
    return students

def calculate_average_grade(students):
    if not students:
        return 0
    total = sum(s['grade'] for s in students)
    return total / len(students)

n = int(input())
students = []
for _ in range(n):
    parts = input().split()
    name = parts[0]
    age = int(parts[1])
    course = parts[2]
    grade = float(parts[3])
    students.append({'name': name, 'age': age, 'course': course, 'grade': grade})

save_students_csv(students)
loaded = load_students_csv()
print(f'{len(loaded)} students loaded')
avg = calculate_average_grade(loaded)
print(f'Average grade: {avg:.1f}')`,
      explanation: "We read data from stdin, save/read CSV and calculate the average score."
    },
    hints: [
      "First read n = int(input())",
      "Use csv.DictWriter / DictReader",
      "Average: sum(grades) / len(students)",
      "Format average via f'{avg:.1f}'"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does CSV mean?",
        options: [
          "Comma-Separated Values",
          "Column-Separated Values",
          "Computer-Structured Values",
          "Code-Separated Values"
        ],
        correctAnswer: 0,
        explanation: "CSV stands for Comma-Separated Values - values separated by commas."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What parameter is required when opening CSV for writing?",
        options: [
          "encoding='utf-8'",
          "newline=''",
          "mode='w'",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "All parameters are required: encoding for Ukrainian text, newline for correct format, mode for recording."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is the difference between csv.reader() and csv.DictReader()?",
        options: [
          "reader returns lists, DictReader - dictionaries",
          "DictReader is faster",
          "reader works only with files",
          "There is no difference"
        ],
        correctAnswer: 0,
        explanation: "csv.reader() returns strings as lists, csv.DictReader() - as dictionaries with keys from headers."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What library is needed to work with Excel files?",
        options: [
          "csv",
          "openpyxl",
          "pandas",
          "json"
        ],
        correctAnswer: 1,
        explanation: "openpyxl - a library for working with Excel files (.xlsx)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Pandas can read and write both CSV and Excel files.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Pandas supports both formats via pd.read_csv(), pd.read_excel(), df.to_csv(), df.to_excel()."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


