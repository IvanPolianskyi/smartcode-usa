/**
 * Lesson 03-5: Object methods
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_5 = {
  lessonId: "lesson-03-5",
  moduleId: "module-03",
  order: 5,
  title: "Object methods",
  
  learningObjectives: [
    "Understand what object methods are",
    "Use string methods",
    "Use list methods",
    "Use dictionary methods",
    "Understand the difference between methods and functions",
    "Use help() to get documentation about methods"
  ],
  
  prerequisites: ["lesson-03-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are methods?",
        content: `Methods are functions that are "bound" to objects. They perform actions on a specific object.

**Main difference between functions and methods:**

- **Function:** \`function_name(argument)\` — called on its own
- **Method:** \`object.method_name(argument)\` — called through an object

**Method call syntax:**

\`\`\`python
object.method(arg1, arg2, ...)
\`\`\`

**Example:**

\`\`\`python
# Function
result = len("Hello")  # len() is a function

# Method
text = "Hello"
result = text.upper()  # upper() is a string method
\`\`\`

**Important:**

- Methods work on a specific object
- Different object types have different methods
- Methods may change the object or return a new value`
      },
      {
        title: "String methods",
        content: `Strings in Python have many useful methods for working with text.

**Common methods:**

1. **\`upper()\`** — converts to uppercase
\`\`\`python
text = "Hello, world!"
result = text.upper()  # "HELLO, WORLD!"
\`\`\`

2. **\`lower()\`** — converts to lowercase
\`\`\`python
text = "HELLO, WORLD!"
result = text.lower()  # "hello, world!"
\`\`\`

3. **\`capitalize()\`** — makes the first letter uppercase
\`\`\`python
text = "hello, world!"
result = text.capitalize()  # "Hello, world!"
\`\`\`

4. **\`title()\`** — capitalizes the first letter of each word
\`\`\`python
text = "hello world python"
result = text.title()  # "Hello World Python"
\`\`\`

5. **\`strip()\`** — removes leading and trailing whitespace
\`\`\`python
text = "  Hello, world!  "
result = text.strip()  # "Hello, world!"
\`\`\`

6. **\`replace(old, new)\`** — replaces part of the string
\`\`\`python
text = "Hello, world!"
result = text.replace("world", "Python")  # "Hello, Python!"
\`\`\`

7. **\`split(separator)\`** — splits the string into a list
\`\`\`python
text = "Hello, world, Python"
result = text.split(", ")  # ["Hello", "world", "Python"]
\`\`\`

8. **\`join(iterable)\`** — joins list elements into a string
\`\`\`python
words = ["Hello", "world", "Python"]
result = ", ".join(words)  # "Hello, world, Python"
\`\`\`

9. **\`find(substring)\`** — finds substring position (returns -1 if not found)
\`\`\`python
text = "Hello, world!"
position = text.find("world")  # 7
position = text.find("Python")  # -1 (not found)
\`\`\`

10. **\`count(substring)\`** — counts occurrences of a substring
\`\`\`python
text = "Hello, hello, world!"
count = text.count("hello")  # 2
\`\`\`

**Important:** String methods do not change the original string — they return a new one!
\`\`\`python
text = "Hello"
text.upper()  # Does not change text
print(text)  # "Hello" (unchanged)

# To keep the change:
text = text.upper()  # Now text = "HELLO"
\`\`\``
      },
      {
        title: "List methods",
        content: `Lists have methods for adding, removing, and modifying elements.

**Common methods:**

1. **\`append(item)\`** — adds an element at the end
\`\`\`python
numbers = [1, 2, 3]
numbers.append(4)  # [1, 2, 3, 4]
\`\`\`

2. **\`insert(index, item)\`** — inserts at a position
\`\`\`python
numbers = [1, 2, 3]
numbers.insert(1, 10)  # [1, 10, 2, 3]
\`\`\`

3. **\`remove(item)\`** — removes the first occurrence
\`\`\`python
numbers = [1, 2, 3, 2]
numbers.remove(2)  # [1, 3, 2] (first 2 removed)
\`\`\`

4. **\`pop(index)\`** — removes and returns element by index (last by default)
\`\`\`python
numbers = [1, 2, 3, 4]
last = numbers.pop()  # last = 4, numbers = [1, 2, 3]
first = numbers.pop(0)  # first = 1, numbers = [2, 3]
\`\`\`

5. **\`extend(iterable)\`** — adds all elements from another iterable
\`\`\`python
numbers = [1, 2, 3]
numbers.extend([4, 5, 6])  # [1, 2, 3, 4, 5, 6]
\`\`\`

6. **\`count(item)\`** — counts occurrences
\`\`\`python
numbers = [1, 2, 2, 3, 2]
count = numbers.count(2)  # 3
\`\`\`

7. **\`index(item)\`** — index of first occurrence
\`\`\`python
numbers = [10, 20, 30, 20]
index = numbers.index(20)  # 1
\`\`\`

8. **\`sort()\`** — sorts in place (changes the original list)
\`\`\`python
numbers = [3, 1, 4, 1, 5]
numbers.sort()  # [1, 1, 3, 4, 5]
\`\`\`

9. **\`reverse()\`** — reverses order in place
\`\`\`python
numbers = [1, 2, 3, 4]
numbers.reverse()  # [4, 3, 2, 1]
\`\`\`

**Important:** Some list methods change the original list (append, insert, remove, pop, sort, reverse); others return a value (count, index).`
      },
      {
        title: "Dictionary methods",
        content: `Dictionaries have methods for working with keys and values.

**Common methods:**

1. **\`keys()\`** — returns all keys
\`\`\`python
person = {"name": "Alex", "age": 20, "city": "London"}
keys = person.keys()  # dict_keys(['name', 'age', 'city'])
keys_list = list(person.keys())  # ['name', 'age', 'city']
\`\`\`

2. **\`values()\`** — returns all values
\`\`\`python
person = {"name": "Alex", "age": 20, "city": "London"}
values = person.values()  # dict_values(['Alex', 20, 'London'])
\`\`\`

3. **\`items()\`** — returns key-value pairs
\`\`\`python
person = {"name": "Alex", "age": 20, "city": "London"}
items = person.items()  # dict_items([('name', 'Alex'), ('age', 20), ('city', 'London')])
\`\`\`

4. **\`get(key, default)\`** — gets value by key (no error if key missing)
\`\`\`python
person = {"name": "Alex", "age": 20}
name = person.get("name")  # "Alex"
email = person.get("email", "Not specified")  # "Not specified"
\`\`\`

5. **\`pop(key, default)\`** — removes and returns value by key
\`\`\`python
person = {"name": "Alex", "age": 20, "city": "London"}
age = person.pop("age")  # age = 20, person = {"name": "Alex", "city": "London"}
\`\`\`

6. **\`update(other_dict)\`** — updates from another dictionary
\`\`\`python
person = {"name": "Alex", "age": 20}
person.update({"city": "London", "age": 21})
\`\`\`

7. **\`clear()\`** — removes all items
\`\`\`python
person = {"name": "Alex", "age": 20}
person.clear()  # {}
\`\`\`

8. **\`copy()\`** — creates a copy
\`\`\`python
person = {"name": "Alex", "age": 20}
person_copy = person.copy()
\`\`\``
      },
      {
        title: "Method chaining",
        content: `You can call methods one after another if each returns an object that has the next method.

**String example:**

\`\`\`python
text = "  hello, world!  "
result = text.strip().upper().replace("WORLD", "PYTHON")
# strip() → "hello, world!"
# upper() → "HELLO, WORLD!"
# replace() → "HELLO, PYTHON!"
\`\`\`

**Important:** Chaining works when each method returns an object of the same type (or one with the needed method).

**Example:**

\`\`\`python
text = "Hello, world, Python"
words = text.split(", ")
result = ", ".join(words).upper()  # "HELLO, WORLD, PYTHON"
\`\`\`

**Does not work:**

\`\`\`python
numbers = [1, 2, 3]
numbers.append(4).append(5)  # Error! append() returns None
\`\`\``
      },
      {
        title: "Getting help about methods",
        content: `Python offers several ways to learn about object methods:

**1. The help() function:**

\`\`\`python
help(str.upper)
help(list.append)
\`\`\`

**2. The dir() function:**

\`\`\`python
methods = dir("Hello")
methods = dir([1, 2, 3])
\`\`\`

**3. IDE autocomplete:**

Most modern IDEs show available methods when you type a dot after an object.

**Example using help():**

\`\`\`python
help(str.count)
# Then use it:
text = "Hello, world, Python"
words = text.split(", ")
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Text processing**

\`\`\`python
def process_text(text):
    """
    Processes text: strips whitespace, capitalizes first letter
    """
    processed = text.strip().capitalize()
    return processed

result = process_text("  hello, world!  ")  # "Hello, world!"
\`\`\`

**Example 2: Managing a user list**

\`\`\`python
def manage_users():
    users = ["Alex", "Maria"]
    users.append("John")
    users.insert(0, "Anna")
    count = users.count("Alex")
    users.sort()
    return users

users = manage_users()  # ["Alex", "Anna", "John", "Maria"]
\`\`\`

**Example 3: User data**

\`\`\`python
def process_user_data(user_dict):
    keys = list(user_dict.keys())
    user_dict.update({"last_login": "2024-01-15"})
    email = user_dict.get("email", "Not specified")
    return user_dict, email

user = {"name": "Alex", "age": 20}
updated_user, email = process_user_data(user)
\`\`\`

**Example 4: Complex text formatting**

\`\`\`python
def format_text(text):
    words = text.strip().split()
    words = [word.replace("world", "Python") for word in words]
    result = " ".join(words).title()
    return result

text = "  hello world programmer  "
result = format_text(text)  # "Hello Python Programmer"
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned about object methods:

**Key concepts:**

1. **Methods vs functions**
   - Methods: \`object.method()\`
   - Functions: \`function()\`

2. **String methods**
   - Do not change the original string
   - Examples: upper(), lower(), strip(), replace(), split(), join()

3. **List methods**
   - Many change the list in place
   - Examples: append(), insert(), remove(), pop(), sort(), reverse()

4. **Dictionary methods**
   - Work with keys and values
   - Examples: keys(), values(), items(), get(), pop(), update()

5. **Method chaining**
   - Call methods in sequence when each returns a suitable object

6. **Help**
   - \`help()\` — documentation for a method
   - \`dir()\` — list methods on an object

**Next step:**

In the next lesson we will learn about lambda functions — short anonymous functions for quick operations.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "String methods",
      code: `text = "  hello, world!  "

cleaned = text.strip()
upper_text = cleaned.upper()
replaced = cleaned.replace("world", "Python")
words = cleaned.split(", ")`,
      explanation: "Demonstrates strip(), upper(), replace(), and split()."
    },
    {
      title: "List methods",
      code: `numbers = [1, 2, 3]

numbers.append(4)
numbers.insert(0, 0)
numbers.remove(2)
last = numbers.pop()
numbers.sort()`,
      explanation: "Shows append(), insert(), remove(), pop(), and sort()."
    },
    {
      title: "Dictionary methods",
      code: `person = {"name": "Alex", "age": 20}

keys = list(person.keys())
values = list(person.values())
email = person.get("email", "Not specified")
person.update({"city": "London", "age": 21})`,
      explanation: "Demonstrates keys(), values(), get(), and update()."
    },
    {
      title: "Method chaining",
      code: `text = "  hello, world!  "

result = text.strip().upper().replace("WORLD", "PYTHON")`,
      explanation: "Shows chaining string methods."
    },
    {
      title: "Getting help",
      code: `help(str.upper)

methods = dir("Hello")
print(methods)`,
      explanation: "Demonstrates help() and dir()."
    },
    {
      title: "Practical example: formatting input",
      code: `def format_user_input(text):
    """
    Formats user-entered text
    """
    formatted = text.strip().capitalize()
    formatted = formatted.replace("hello", "Welcome")
    return formatted

result = format_user_input("  hello, world!  ")`,
      explanation: "Practical use of string methods for text processing."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Expecting a string method to change the original string",
      explanation: "Beginners often forget that string methods return a new string.",
      correctApproach: `# Wrong:
text = "Hello"
text.upper()
print(text)  # Still "Hello"

# Correct:
text = "Hello"
text = text.upper()
print(text)  # "HELLO"`
    },
    {
      mistake: "Confusing methods and functions",
      explanation: "Mixing up how to call methods versus functions.",
      correctApproach: `length = len("Hello")  # function

text = "Hello"
upper_text = text.upper()  # method`
    },
    {
      mistake: "Chaining methods that return None",
      explanation: "Calling a method after one that returns None or the wrong type.",
      correctApproach: `# Wrong:
numbers = [1, 2, 3]
numbers.append(4).append(5)

# Correct:
numbers = [1, 2, 3]
numbers.append(4)
numbers.append(5)

# Strings work for chaining:
text = "Hello".upper().replace("HELLO", "Hi")`
    },
    {
      mistake: "Using a method on the wrong type",
      explanation: "Calling a method that does not exist for that object type.",
      correctApproach: `# Wrong:
number = 123
number.append(4)

# Correct:
numbers = [123]
numbers.append(4)`
    }
  ],
  
  summary: `In this lesson we learned about object methods:

1. What methods are — functions bound to objects; syntax: \`object.method()\`
2. String methods — return new strings; upper(), lower(), strip(), replace(), split(), join()
3. List methods — many change the list in place; append(), insert(), remove(), pop(), sort(), reverse()
4. Dictionary methods — keys(), values(), items(), get(), pop(), update()
5. Method chaining — when each step returns a suitable object
6. Help — help() and dir()

Methods are a powerful way to work with objects in Python!`,
  
  practiceTask: {
    title: "Text data processing system",
    description: "Create functions to process text using string, list, and dictionary methods",
    problemStatement: `Write a program to process user text data:

1. **clean_text** — cleans text (strip, capitalize), returns cleaned text
2. **process_words** — removes duplicates and sorts a list of words
3. **create_word_count** — splits text into words and returns {word: count}
4. **format_user_data** — capitalizes name, lowercases email, adds default fields

**Important:** Do not use input(). Assign values directly in code.

Create several examples using all functions.`,
    outputFormat: `Example output:
Cleaned text: Hello world hello python
Processed words: ['hello', 'python', 'world']
Word count: {'hello': 2, 'world': 1, 'python': 1}
User data: {'name': 'Alex', 'email': 'user@example.com', 'role': 'user'}`,
    examples: [
      {
        output: `Cleaned text: Hello world hello python
Processed words: ['hello', 'python', 'world']
Word count: {'hello': 2, 'world': 1, 'python': 1}`,
        explanation: "Demonstrates cleaning, deduplication, and word counting."
      }
    ],
    solution: {
      code: `# Text data processing system

def clean_text(text):
    cleaned = text.strip().capitalize()
    return cleaned

def process_words(words):
    unique_words = []
    for word in words:
        if word not in unique_words:
            unique_words.append(word)
    unique_words.sort()
    return unique_words

def create_word_count(text):
    words = text.strip().split()
    word_count = {}
    for word in words:
        if word in word_count:
            word_count[word] += 1
        else:
            word_count[word] = 1
    return word_count

def format_user_data(user_data):
    formatted = user_data.copy()
    if "name" in formatted:
        formatted["name"] = formatted["name"].capitalize()
    if "email" in formatted:
        formatted["email"] = formatted["email"].lower()
    if "role" not in formatted:
        formatted["role"] = "user"
    if "status" not in formatted:
        formatted["status"] = "active"
    return formatted

text = "  hello world hello python  "

cleaned = clean_text(text)
print(f"Cleaned text: {cleaned}")

words = cleaned.split()
processed = process_words(words)
print(f"Processed words: {processed}")

word_count = create_word_count(text)
print(f"Word count: {word_count}")

print()

user_data = {"name": "alex", "email": "USER@EXAMPLE.COM"}
formatted_data = format_user_data(user_data)
print(f"User data: {formatted_data}")

print()

text2 = "Python Python developer developer engineer"
cleaned2 = clean_text(text2)
words2 = cleaned2.split()
processed2 = process_words(words2)
word_count2 = create_word_count(text2)

print(f"Cleaned text: {cleaned2}")
print(f"Processed words: {processed2}")
print(f"Word count: {word_count2}")`,
      explanation: "Uses string methods (strip, capitalize, split, lower), list methods (append, sort), and dictionary methods (copy, get)."
    },
    hints: [
      "Assign values directly in code — do not use input()",
      "Use strip(), capitalize(), split(), lower() on strings",
      "Build a new list to remove duplicates",
      "Use append() and sort() on lists",
      "Use copy() so you do not mutate the original dict",
      "String methods return new strings — assign the result"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "Hello world",
        description: "Checking text cleaning"
      },
      {
        expectedOutput: "['hello', 'world']",
        description: "Checking deduplication and sorting"
      },
      {
        expectedOutput: "{'hello': 2, 'world': 1}",
        description: "Checking word count"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is an object method?",
        options: [
          "A function bound to an object, called through the object",
          "A variable inside an object",
          "A data type",
          "A Python operator"
        ],
        correctAnswer: 0,
        explanation: "A method is a function bound to an object and called with object.method()."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Do string methods change the original string?",
        options: [
          "No, they return a new string",
          "Yes, they change the original string",
          "It depends on the method",
          "Only some methods"
        ],
        correctAnswer: 0,
        explanation: "String methods do not modify the original string because strings are immutable in Python."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ntext = \"  Hello, world!  \"\nresult = text.strip().upper()\nprint(result)\n```",
        options: [
          "HELLO, WORLD!",
          "  HELLO, WORLD!  ",
          "Hello, world!",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "strip() removes spaces → 'Hello, world!', then upper() → 'HELLO, WORLD!'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which list method adds an element at the end?",
        options: [
          "append()",
          "add()",
          "insert()",
          "extend()"
        ],
        correctAnswer: 0,
        explanation: "append() adds at the end. insert() inserts at a position; extend() adds all items from another iterable."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nnumbers = [3, 1, 4, 1, 5]\nnumbers.sort()\nprint(numbers)\n```",
        options: [
          "[1, 1, 3, 4, 5]",
          "[3, 1, 4, 1, 5]",
          "None",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "sort() sorts the list in place, so numbers becomes [1, 1, 3, 4, 5]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which dictionary method returns all keys?",
        options: [
          "keys()",
          "get()",
          "items()",
          "values()"
        ],
        correctAnswer: 0,
        explanation: "keys() returns keys. values() returns values; items() returns pairs; get() fetches a value by key."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nperson = {\"name\": \"Alex\", \"age\": 20}\nemail = person.get(\"email\", \"Not specified\")\nprint(email)\n```",
        options: [
          "Not specified",
          "An error",
          "None",
          "email"
        ],
        correctAnswer: 0,
        explanation: "get() returns the default when the key is missing, so 'Not specified' is printed."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can chain methods when each method returns an object with the next method.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes. For example text.strip().upper() works because both methods return strings."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
