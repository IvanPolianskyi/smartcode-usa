/** 
* Lesson 08-4: Working with JSON 
* Full educational content*/

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_08_4 = {
  lessonId: "lesson-08-4",
  moduleId: "module-08",
  order: 4,
  title: "Working with JSON",
  
  learningObjectives: [
    "Read and write JSON files",
    "Parse JSON data",
    "Serialize Python objects to JSON",
    "Work with nested JSON structures"
  ],
  
  prerequisites: ["lesson-08-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to JSON",
        content: `JSON (JavaScript Object Notation) is a data exchange format that is easily readable by humans and machines. 

**What is JSON?** 

- Text format for data storage and transmission 
- Used for API, configurations, data storage 
- Similar to Python data structures (dict, list) 

**Basic JSON data types:** 

- **Object** (object) - dictionary in Python 
- **Array** (array) - a list in Python 
- **String** (string) - a string in Python 
- **Number** (number) - int or float in Python 
- **Boolean** (boolean) - True/False in Python 
- **null** - None in Python 

**Example JSON:** 

\`\`\`json 
{ 
"name": "Alexander", 
"age": 25, 
"city": "Kyiv", 
"skills": ["Python", "JavaScript"], 
"active": true, 
"salary": null 
} 
\`\`\` 

**Module import:** 

\`\`\`python 
import json 
\`\`\``
      },
      {
        title: "Reading JSON from a string",
        content: `**json.loads()** - parses a JSON string into a Python object. 

\`\`\`python 
import json 

# JSON string 
json_string = '{"name": "Aleksandr", "age": 25}' 

# Parsimo in the dictionary 
data = json.loads(json_string) 
print(data) # {'name': 'Alexander', 'age': 25} 
print(type(data)) # <class 'dict'> 
\`\`\` 

**Example with nested structures:** 

\`\`\`python 
import json 

json_string = ''' 
{ 
"person": { 
"name": "Alexander", 
"age": 25, 
"skills": ["Python", "JavaScript"] 
} 
} 
'''' 

data = json.loads(json_string) 
print(data['person']['name']) # Alexander 
print(data['person']['skills'][0]) # Python 
\`\`\` 

**Error Handling:** 

\`\`\`python 
import json 

json_string = '{"name": "Alexander"' # Bad JSON 

try: 
data = json.loads(json_string) 
except json.JSONDecodeError as e: 
print(f'Parsing error: {e}') 
\`\`\``
      },
      {
        title: "Writing Python objects to JSON",
        content: `**json.dumps()** - converts a Python object into a JSON string. 

\`\`\`python 
import json 

# Python dictionary 
data = { 
'name': 'Alexander', 
'age': 25, 
'city': 'Kyiv', 
'skills': ['Python', 'JavaScript'] 
} 

# Convert to JSON 
json_string = json.dumps(data) 
print(json_string) 
# {"name": "Olexandr", "age": 25, "city": "Kyiv", "skills": ["Python", "JavaScript"]} 
\`\`\` 

**JSON Formatting:** 

\`\`\`python 
import json 

data = {'name': 'Alexander', 'age': 25} 

# Indented for readability 
json_string = json.dumps(data, indent=2, ensure_ascii=False) 
print(json_string) 
# { 
# "name": "Alexander", 
# "age": 25 
# } 
\`\`\` 

**json.dumps() parameters:** 

- **indent** - number of spaces for indentation 
- **ensure_ascii** - whether to escape non-ASCII characters (False for Ukrainian letters) 
- **sort_keys** - whether to sort the keys 

\`\`\`python 
import json 

data = {'z': 3, 'a': 1, 'b': 2}
# With key sorting 
json_string = json.dumps(data, sort_keys=True, indent=2) 
print(json_string) 
# { 
# "a": 1, 
# "b": 2, 
# "z": 3 
# } 
\`\`\``
      },
      {
        title: "Working with JSON files",
        content: `**json.load()** - reads JSON from a file. 

\`\`\`python 
import json 

# Read JSON from the file 
with open('data.json', 'r', encoding='utf-8') as f: 
data = json.load(f) 

print(data) 
\`\`\` 

**json.dump()** - writes a Python object to a JSON file. 

\`\`\`python 
import json 

# Data to save 
data = { 
'name': 'Alexander', 
'age': 25, 
'skills': ['Python', 'JavaScript'] 
} 

# Write to the file 
with open('data.json', 'w', encoding='utf-8') as f: 
json.dump(data, f, indent=2, ensure_ascii=False) 
\`\`\` 

**Full Example: Read and Write:** 

\`\`\`python 
import json 

# We record the data 
data = { 
'students': [ 
{'name': 'Alexander', 'grade': 95}, 
{'name': 'Maria', 'grade': 88} 
] 
} 

with open('students.json', 'w', encoding='utf-8') as f: 
json.dump(data, f, indent=2, ensure_ascii=False) 

# Reading the data 
with open('students.json', 'r', encoding='utf-8') as f:
loaded_data = json.load(f) 

print(loaded_data['students'][0]['name']) # Alexander 
\`\`\``
      },
      {
        title: "Processing of complex data types",
        content: `Not all Python types are supported by JSON. Some types need to be converted. 

**Problem with datetime:** 

\`\`\`python 
import json 
from datetime import datetime 

data = {'date': datetime.now()} 

# Error! datetime is not supported by JSON 
# json.dumps(data) # TypeError 
\`\`\` 

**Solution: Custom encoder:** 

\`\`\`python 
import json 
from datetime import datetime 

class DateTimeEncoder(json.JSONEncoder): 
def default(self, obj): 
if isinstance(obj, datetime): 
return obj.isoformat() 
return super().default(obj) 

data = {'date': datetime.now()} 
json_string = json.dumps(data, cls=DateTimeEncoder) 
print(json_string) 
\`\`\` 

**Conversion back:** 

\`\`\`python 
import json 
from datetime import datetime 

def decode_datetime(dct): 
for key, value in dct.items(): 
if isinstance(value, str) and 'T' in value: 
try:
dct[key] = datetime.fromisoformat(value) 
unless: 
pass 
return dct 

json_string = '{"date": "2024-01-15T10:30:00"}' 
data = json.loads(json_string, object_hook=decode_datetime) 
print(data['date']) # datetime object 
\`\`\` 

**Processing set and tuple:** 

\`\`\`python 
import json 

data = {'numbers': {1, 2, 3}} # set is not supported 

# Convert set to list 
data_serializable = {'numbers': list(data['numbers'])} 
json_string = json.dumps(data_serializable) 
print(json_string) # {"numbers": [1, 2, 3]} 
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Saving the configuration** 

\`\`\`python 
import json 

config = { 
'database': { 
'host': 'localhost', 
'port': 5432, 
'name': 'mydb' 
}, 
'api_key': 'secret_key_123' 
} 

# Save the configuration 
with open('config.json', 'w', encoding='utf-8') as f: 
json.dump(config, f, indent=2) 

# Loading the configuration 
with open('config.json', 'r', encoding='utf-8') as f: 
loaded_config = json.load(f) 
\`\`\` 

**Example 2: API Response Processing** 

\`\`\`python 
import json 

# Simulate the response API 
api_response = ''' 
{ 
"status": "success", 
"data": { 
"users": [ 
{"id": 1, "name": "Aleksandr"}, 
{"id": 2, "name": "Maria"} 
] 
} 
} 
'''' 

# Let's parse the answer 
response_data = json.loads(api_response) 

if response_data['status'] == 'success': 
users = response_data['data']['users'] 
for user in users:
print(f"ID: {user['id']}, Name: {user['name']}") 
\`\`\` 

**Example 3: Saving user data** 

\`\`\`python 
import json 

def save_user_data(user_id, user_data): 
filename = f'user_{user_id}.json' 
with open(filename, 'w', encoding='utf-8') as f: 
json.dump(user_data, f, indent=2, ensure_ascii=False) 

def load_user_data(user_id): 
filename = f'user_{user_id}.json' 
try: 
with open(filename, 'r', encoding='utf-8') as f: 
return json.load(f) 
except FileNotFoundError: 
return None 

# Usage 
user_data = { 
'name': 'Alexander', 
'email': 'alex@example.com', 
'preferences': {'theme': 'dark', 'language': 'uk'} 
} 

save_user_data(1, user_data) 
loaded = load_user_data(1) 
print(loaded) 
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson, we learned how to work with JSON: 

**Key Features:** 

1. **json.loads()** - parses a JSON string into a Python object 
2. **json.dumps()** - converts a Python object into a JSON string 
3. **json.load()** - reads JSON from a file 
4. **json.dump()** - writes a Python object to a JSON file 

**Main types:** 

- JSON object → Python dict 
- JSON array → Python list 
- JSON string → Python str 
- JSON number → Python int/float 
- JSON boolean → Python bool 
- JSON null → Python None 

**Important:** 

- Use ensure_ascii=False for Ukrainian characters 
- Use indent for readability 
- Handle parsing errors 
- Convert non-standard types (datetime, set) 

**Next step:** 

In the next lesson, we will learn how to work with CSV and Excel files.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Parsing a JSON string",
      code: `import json 

json_string = '{"name": "Aleksandr", "age": 25}' 
data = json.loads(json_string) 
print(data['name']) # Alexander`,
      explanation: "We use json.loads() to parse a JSON string into a Python dictionary."
    },
    {
      title: "Example 2: Conversion to JSON",
      code: `import json 

data = {'name': 'Alexander', 'age': 25} 
json_string = json.dumps(data, indent=2, ensure_ascii=False) 
print(json_string)`,
      explanation: "We use json.dumps() to convert a Python object into a formatted JSON string."
    },
    {
      title: "Example 3: Reading from a file",
      code: `import json

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
print(data)`,
      explanation: "We use json.load() to read JSON from a file."
    },
    {
      title: "Example 4: Writing to a file",
      code: `import json 

data = {'name': 'Alexander', 'age': 25} 
with open('data.json', 'w', encoding='utf-8') as f: 
json.dump(data, f, indent=2, ensure_ascii=False)`,
      explanation: "We use json.dump() to write a Python object to a JSON file."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forget ensure_ascii=False for Ukrainian characters",
      explanation: "By default, JSON escapes non-ASCII characters, which corrupts Ukrainian letters.",
      correctApproach: "Always use ensure_ascii=False when working with Ukrainian text."
    },
    {
      mistake: "Attempting to serialize unserializable types",
      explanation: "JSON does not support datetime, set, tuple without conversion.",
      correctApproach: "Convert custom types before serialization or use custom encoders."
    },
    {
      mistake: "Do not handle parsing errors",
      explanation: "Bad JSON raises a JSONDecodeError that needs to be handled.",
      correctApproach: "Use try/except to handle parsing errors."
    }
  ],
  
  summary: `In this lesson, we learned how to work with JSON: 

1. json.loads() - JSON string parsing 
2. json.dumps() - conversion to JSON string 
3. json.load() - reading from a file 
4. json.dump() - writing to a file 

JSON is a standard format for exchanging data and storing configurations!`,
  
  practiceTask: {
    title: "Creation of a task saving system",
    description: "Create a system to save and load a list of tasks in JSON",
    problemStatement: `Create a task management system: 
1. Read n tasks from stdin (title and completed: 0 or 1) 
2. Save in tasks.json 
3. Load back and output the list 

Input format: 
3 
Learn JSON 
0 
Create a project 
0 
Write tests 
1`,
    outputFormat: `Task saved
Loaded 3 tasks:
1. Learn JSON (not completed)
2. Create a project (not completed)
3. Write tests (completed)`,
    examples: [
      {
        input: `1
Task 1
0`,
        output: `Task saved
Loaded 1 tasks:
1. Task 1 (not completed)`,
        explanation: "One unfinished task"
      },
      {
        input: `3
Learn JSON
0
Create a project
0
Write tests
1`,
        output: `Task saved
Loaded 3 tasks:
1. Learn JSON (not completed)
2. Create a project (not completed)
3. Write tests (completed)`,
        explanation: "Three tasks, the last one completed"
      },
      {
        input: `2
A
1
B
0`,
        output: `Task saved
Loaded 2 tasks:
1. A (completed)
2. B (not completed)`,
        explanation: "Two short tasks with different statuses"
      }
    ],
    solution: {
      code: `import json

def save_tasks(tasks, filename='tasks.json'):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, indent=2, ensure_ascii=False)
    print('Task saved')

def load_tasks(filename='tasks.json'):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

n = int(input())
tasks = []
for i in range(1, n + 1):
    title = input().strip()
    completed = input().strip() == '1'
    tasks.append({'id': i, 'title': title, 'completed': completed})

save_tasks(tasks)
loaded_tasks = load_tasks()
print(f'Loaded {len(loaded_tasks)} tasks:')
for task in loaded_tasks:
    status = 'completed' if task['completed'] else 'not completed'
    print(f"{task['id']}. {task['title']} ({status})")`,
      explanation: "We read tasks from stdin, save/read JSON via dump/load."
    },
    hints: [
      "For each task: input() for title, input() for 0/1",
      "json.dump with ensure_ascii=False",
      "Handle FileNotFoundError in load_tasks",
      "Status: 'done' or 'not done'"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does json.loads() do?",
        options: [
          "Parse a JSON string into a Python object",
          "Converts a Python object to a JSON string",
          "Reads JSON from a file",
          "Writes JSON to a file"
        ],
        correctAnswer: 0,
        explanation: "json.loads() parses a JSON string and converts it into a Python object (dict, list, etc.)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What parameter is needed for the correct display of Ukrainian symbols?",
        options: [
          "ensure_ascii=False",
          "indent=2",
          "sort_keys=True",
          "encoding='utf-8'"
        ],
        correctAnswer: 0,
        explanation: "ensure_ascii=False allows storing non-ASCII characters (Ukrainian letters) without escape."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens if you try to serialize datetime without conversion?",
        options: [
          "Will work fine",
          "TypeError",
          "JSONDecodeError",
          "Nothing will happen"
        ],
        correctAnswer: 1,
        explanation: "JSON does not support datetime directly, so a TypeError will occur. Conversion required."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between json.load() and json.loads()?",
        options: [
          "load() works with files, loads() works with strings",
          "loads() works with files, load() with strings",
          "There is no difference",
          "load() is faster"
        ],
        correctAnswer: 0,
        explanation: "json.load() reads from a file, json.loads() parses a string (s = string)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "JSON supports all Python data types.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JSON supports only basic types: dict, list, str, int, float, bool, None. Does not support datetime, set, tuple without conversion."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
