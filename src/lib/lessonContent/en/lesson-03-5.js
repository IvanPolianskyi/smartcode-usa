/**
 * Lesson 03-5: Object methods
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

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
    "Use help() to get help on methods"
  ],
  
  prerequisites: ["lesson-03-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are methods?",
        content: `Methods are functions that are "bound" to objects. They perform actions on a specific object.

**The main difference between functions and methods:**

- **Function:** \`function_name(argument)\` - called independently
- **Method:** \`object.method_name(argument)\` - called through an object

**Syntax of calling a method:**

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

- Methods work with a specific object
- Different types of objects have different methods
- Methods can modify an object or return a new value`
      },
      {
        title: "String Methods",
        content: `Strings in Python have many useful methods for working with text.

**Main methods:**

1. **\`upper()\`** - converts a string to uppercase
\`\`\`python
text = "Hello, world!"
result = text.upper()  # "HELLO, WORLD!"
\`\`\`

2. **\`lower()\`** - converts a string to lowercase
\`\`\`python
text = "HELLO, WORLD!"
result = text.lower()  # "hello, world!"
\`\`\`

3. **\`capitalize()\`** - makes the first letter uppercase
\`\`\`python
text = "hello, world!"
result = text.capitalize()  # "Hello, world!"
\`\`\`

4. **\`title()\`** - makes the first letter of each word uppercase
\`\`\`python
text = "hello world python"
result = text.title()  # "Hello World Python"
\`\`\`

5. **\`strip()\`** - removes spaces at the beginning and at the end
\`\`\`python
text = "  Hello, world!  "
result = text.strip()  # "Hello, world!"
\`\`\`

6. **\`replace(old, new)\`** - replaces part of the string
\`\`\`python
text = "Hello, world!"
result = text.replace("world", "Python")  # "Hello, Python!"
\`\`\`

7. **\`split(separator)\`** - splits a string into a list
\`\`\`python
text = "Hello, world, Python"
result = text.split(", ")  # ["Hello", "world", "Python"]
\`\`\`

8. **\`join(iterable)\`** - combines list items into a row
\`\`\`python
words = ["Hello", "world", "Python"]
result = ", ".join(words)  # "Hello, world, Python"
\`\`\`

9. **\`find(substring)\`** - finds the position of a substring (returns -1 if not found)
\`\`\`python
text = "Hello, world!"
position = text.find("world")  # 9
position = text.find("Python")  # -1 (not found)
\`\`\`

10. **\`count(substring)\`** - counts the number of substring occurrences
\`\`\`python
text = "Hello, hello, world!"
count = text.count("Hello")  # 2
\`\`\`

**Important:** String methods do not change the original string, they return a new one!
\`\`\`python
text = "Hello"
text.upper()  # Does not change text
print(text)  # "Hello" (unchanged)

# To save changes:
text = text.upper()  # Now text = "HELLO"
\`\`\``
      },
      {
        title: "List Methods",
        content: `Lists have methods for adding, removing, and modifying elements.

**Main methods:**

1. **\`append(item)\`** - adds an element to the end of the list
\`\`\`python
numbers = [1, 2, 3]
numbers.append(4)  # [1, 2, 3, 4]
\`\`\`

2. **\`insert(index, item)\`** - inserts an element at a position
\`\`\`python
numbers = [1, 2, 3]
numbers.insert(1, 10)  # [1, 10, 2, 3]
\`\`\`

3. **\`remove(item)\`** - removes the first occurrence of an element
\`\`\`python
numbers = [1, 2, 3, 2]
numbers.remove(2)  # [1, 3, 2] (first occurrence removed)
\`\`\`

4. **\`pop(index)\`** - removes and returns the element by index (default is the last one)
\`\`\`python
numbers = [1, 2, 3, 4]
last = numbers.pop()  # last = 4, numbers = [1, 2, 3]
first = numbers.pop(0)  # first = 1, numbers = [2, 3]
\`\`\`

5. **\`extend(iterable)\`** - adds all elements from another list
\`\`\`python
numbers = [1, 2, 3]
numbers.extend([4, 5, 6])  # [1, 2, 3, 4, 5, 6]
\`\`\`

6. **\`count(item)\`** - counts the number of occurrences of an element
\`\`\`python
numbers = [1, 2, 2, 3, 2]
count = numbers.count(2)  # 3
\`\`\`

7. **\`index(item)\`** - finds the index of the first occurrence of an element
\`\`\`python
numbers = [10, 20, 30, 20]
index = numbers.index(20)  # 1
\`\`\`

8. **\`sort()\`** - sorts the list in place (modifies the original list)
\`\`\`python
numbers = [3, 1, 4, 1, 5]
numbers.sort()  # [1, 1, 3, 4, 5] (the original list has changed)
\`\`\`

9. **\`reverse()\`** - reverses the order of elements
\`\`\`python
numbers = [1, 2, 3, 4]
numbers.reverse()  # [4, 3, 2, 1] (the original list has changed)
\`\`\`

**Important:** Some list methods modify the original list (append, insert, remove, pop, sort, reverse), while others return a new value (count, index).`
      },
      {
        title: "Dictionary Methods",
        content: `Dictionaries have methods for working with keys and values.

**Main methods:**

1. **\`keys()\`** - returns all keys
\`\`\`python
person = {"name": "Oleksandr", "age": 20, "city": "Kyiv"}
keys = person.keys()  # dict_keys(['name', 'age', 'city'])
# It can be converted into a list:
keys_list = list(person.keys())  # ['name', 'age', 'city']
\`\`\`

2. **\`values()\`** - returns all values
\`\`\`python
person = {"name": "Oleksandr", "age": 20, "city": "Kyiv"}
values = person.values()  # dict_values(['Oleksandr', 20, 'Kyiv'])
\`\`\`

3. **\`items()\`** - returns key-value pairs
\`\`\`python
person = {"name": "Oleksandr", "age": 20, "city": "Kyiv"}
items = person.items()  # dict_items([('name', 'Oleksandr'), ('age', 20), ('city', 'Kyiv')])
\`\`\`

4. **\`get(key, default)\`** - gets the value by key (without error if the key does not exist)
\`\`\`python
person = {"name": "Oleksandr", "age": 20}
name = person.get("name")  # "Oleksandr"
email = person.get("email", "Not specified")  # "Not specified" (if there is no key)
\`\`\`

5. **\`pop(key, default)\`** - deletes and returns the key value
\`\`\`python
person = {"name": "Oleksandr", "age": 20, "city": "Kyiv"}
age = person.pop("age")  # age = 20, person = {"name": "Oleksandr", "city": "Kyiv"}
\`\`\`

6. **\`update(other_dict)\`** - updates the dictionary with values from another dictionary
\`\`\`python
person = {"name": "Oleksandr", "age": 20}
person.update({"city": "Kyiv", "age": 21})  # {"name": "Oleksandr", "age": 21, "city": "Kyiv"}
\`\`\`

7. **\`clear()\`** - deletes all elements
\`\`\`python
person = {"name": "Oleksandr", "age": 20}
person.clear()  # {}
\`\`\`

8. **\`copy()\`** - creates a copy of the dictionary
\`\`\`python
person = {"name": "Oleksandr", "age": 20}
person_copy = person.copy()  # New copy
\`\`\``
      },
      {
        title: "Method chain",
        content: `You can call methods one after another if the previous method returns an object with the next method.

**Example with strings:**

\`\`\`python
text = "  hello, world!  "
result = text.strip().upper().replace("WORLD", "PYTHON")
# First strip() → "hello, world!"
# Then upper() → "HELLO, WORLD!"
# Then replace() → "HELLO, PYTHON!"
\`\`\`

**Important:** A chain works if each method returns an object of the same type or an object with the desired method.

**Example:**

\`\`\`python
# It works because split() returns a list, and join() is a string method
text = "Hello, world, Python"
words = text.split(", ")  # ["Hello", "world", "Python"]
result = ", ".join(words).upper()  # "HELLO, WORLD, PYTHON"
\`\`\`

**Does not work:**

\`\`\`python
# It doesn't work because append() does not return a list
numbers = [1, 2, 3]
numbers.append(4).append(5)  #  Error! append() returns None
\`\`\``
      },
      {
        title: "Obtaining a certificate on methods",
        content: `In Python, there are several ways to find out about an object's methods:

**1. The help() function:**

\`\`\`python
help(str.upper)  # Reference about the upper() method for strings
help(list.append)  # Reference about the append() method for lists
\`\`\`

**2. The dir() function:**

\`\`\`python
# Shows all methods and attributes of an object
methods = dir("Hello")  # List of all string methods
methods = dir([1, 2, 3])  # List of all list methods
\`\`\`

**3. Using Autocomplete in IDEs:**

Most modern IDEs (for example, VS Code, PyCharm) show available methods when typing a dot after an object.

**Example of using help():**

\`\`\`python
# Reference about the count() method for strings
help(str.count)
# Will output:
# count(...)
#     S.count(sub[, start[, end]]) -> int
#     
#     Return the number of non-overlapping occurrences of substring sub in
#     string S[start:end].  Optional arguments start and end are
#     interpreted as in slice notation.
\`\`\`

**Practical example:**

\`\`\`python
# Let's learn about the split() method
help(str.split)
# Then we use it:
text = "Hello, world, Python"
words = text.split(", ")  # ["Hello", "world", "Python"]
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Text processing**

\`\`\`python
def process_text(text):
    """
    Processes text: removes spaces, makes the first letter capital
    """
    processed = text.strip().capitalize()
    return processed

# Usage
result = process_text("  hello, world!  ")  # "Hello, world!"
\`\`\`

**Example 2: Working with a list of users**

\`\`\`python
def manage_users():
    """
    Demonstrates working with list methods
    """
    users = ["Oleksandr", "Maria"]
    
    # Adding users
    users.append("Ivan")
    users.insert(0, "Anna")
    
    # Checking the quantity
    count = users.count("Oleksandr")
    
    # Sorting
    users.sort()
    
    return users

# Usage
users = manage_users()  # ["Anna", "Ivan", "Maria", "Oleksandr"]
\`\`\`

**Example 3: User Data Processing**

\`\`\`python
def process_user_data(user_dict):
    """
    Processes user data
    """
    # We receive the keys
    keys = list(user_dict.keys())
    
    # Updating data
    user_dict.update({"last_login": "2024-01-15"})
    
    # Checking for the presence of the key
    email = user_dict.get("email", "Not specified")
    
    return user_dict, email

# Usage
user = {"name": "Oleksandr", "age": 20}
updated_user, email = process_user_data(user)
\`\`\`

**Example 4: Comprehensive text processing**

\`\`\`python
def format_text(text):
    """
    Formats text: removes spaces, replaces words, merges
    """
    # We remove spaces and convert into a list of words
    words = text.strip().split()
    
    # We replace words
    words = [word.replace("world", "Python") for word in words]
    
    # Combine back
    result = " ".join(words).title()
    
    return result

# Usage
text = "  hello world programmer  "
result = format_text(text)  # "Hello Python Programmer"
\`\`\``
      },
      {
        title: "The bottom line",
        content: `In this lesson, we studied object methods:

**Key Concepts:**

1. **Methods vs Functions**
   - Methods are bound to objects: \`object.method()\`
   - Functions are called independently: \`function()\`

2. **String Methods**
   - Do not change the original string
   - Return a new string
   - Examples: upper(), lower(), strip(), replace(), split(), join()

3. **List Methods**
   - Many methods modify the original list
   - Examples: append(), insert(), remove(), pop(), sort(), reverse()

4. **Dictionary Methods**
   - Work with keys and values
   - Examples: keys(), values(), items(), get(), pop(), update()

5. **Method Chaining**
   - You can call methods one after another
   - Works if each method returns an object with the next method6. **Reference**
   - \`help()\` - get a reference about the method
   - \`dir()\` - see all methods of the object

**Important to remember:**

- Some methods modify the object (in-place), others return a new value
- String methods do not change the original string
- List methods often modify the original list
- Use help() to explore new methods

**Next step:**

In the next lesson, we will learn about lambda functions - short anonymous functions for quick operations.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "String methods",
      code: `text = "  hello, world!  "

# Remove spaces
cleaned = text.strip()  # "hello, world!"

# Convert to uppercase
upper_text = cleaned.upper()  # "HELLO, WORLD!"

# Replace a word
replaced = cleaned.replace("world", "Python")  # "hello, Python!"

# Split into words
words = cleaned.split(", ")  # ["hello", "world!"]`,
      explanation: "Demonstrates the main string methods: strip(), upper(), replace(), split()."
    },
    {
      title: "List methods",
      code: `numbers = [1, 2, 3]

# Adding elements
numbers.append(4)  # [1, 2, 3, 4]
numbers.insert(0, 0)  # [0, 1, 2, 3, 4]

# Removing elements
numbers.remove(2)  # [0, 1, 3, 4]
last = numbers.pop()  # last = 4, numbers = [0, 1, 3]

# Sorting
numbers.sort()  # [0, 1, 3]`,
      explanation: "Shows the main list methods: append(), insert(), remove(), pop(), sort()."
    },
    {
      title: "Dictionary methods",
      code: `person = {"name": "Oleksandr", "age": 20}

# Getting keys and values
keys = list(person.keys())  # ['name', 'age']
values = list(person.values())  # ['Oleksandr', 20]

# Safely getting a value
email = person.get("email", "Not specified")  # "Not specified"

# Updating the dictionary
person.update({"city": "Kyiv", "age": 21})  # {"name": "Oleksandr", "age": 21, "city": "Kyiv"}`,
      explanation: "Demonstrates the main dictionary methods: keys(), values(), get(), update()."
    },
    {
      title: "Method chain",
      code: `text = "  hello, world!  "

# We call the methods one after another
result = text.strip().upper().replace("WORLD", "PYTHON")
# First strip() → "hello, world!"
# Then upper() → "HELLO, WORLD!"
# Then replace() → "HELLO, PYTHON!"`,
      explanation: "Shows how you can call string methods one after another (method chaining)."
    },
    {
      title: "Obtaining a certificate",
      code: `# Method Help
help(str.upper)

# All Object Methods
methods = dir("Hello") # List of all string methods
print(methods)`,
      explanation: "Demonstrates the use of help() and dir() to get information about methods."
    },
    {
      title: "Practical example: text processing",
      code: `def format_user_input(text):
    """
    Formats the text entered by the user
    """
    # Remove spaces and capitalize the first letter
    formatted = text.strip().capitalize()
    
    # Replace words
    formatted = formatted.replace("hello", "Hello")
    
    return formatted

# Usage
result = format_user_input("  hello, world!  ")  # "Hello, world!"`,
      explanation: "A practical example of using string methods for text processing."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Attempt to change a string through a method",
      explanation: "Beginners often forget that string methods do not change the original string.",
      correctApproach: `# Incorrect:
text = "Hello"
text.upper()  # Does not change text
print(text)  # Still "Hello"

# Correct:
text = "Hello"
text = text.upper()  # Now text = "HELLO"
print(text)  # "HELLO"`
    },
    {
      mistake: "Confusion between methods and functions",
      explanation: "Beginners sometimes confuse the syntax of calling methods and functions.",
      correctApproach: `# Function - called independently
length = len("Hello")  # len() - function

# Method - called through an object
text = "Hello"
upper_text = text.upper()  # upper() - string method`
    },
    {
      mistake: "A chain of methods that do not return an object",
      explanation: "Attempt to call a method after a method that returns None or another type.",
      correctApproach: `# Incorrect:
numbers = [1, 2, 3]
numbers.append(4).append(5)  #  append() returns None

# Correct:
numbers = [1, 2, 3]
numbers.append(4)
numbers.append(5)  #  Separate calls

# Or for strings (which return a new string):
text = "Hello".upper().replace("HELLO", "Hi")  #  Works`
    },
    {
      mistake: "Using the method on the wrong type",
      explanation: "Attempt to call a method that does not exist for this type of object.",
      correctApproach: `# Incorrect:
number = 123
number.append(4)  # Numbers do not have the append() method

# Correct:
numbers = [123]  # List
numbers.append(4)  # Works

# Or for strings:
text = "123"
text = text + "4"  # String concatenation`
    }
  ],
  
  summary: `In this lesson, we learned about object methods:

1. What methods are
   - Methods are functions bound to objects
   - Syntax: \`object.method()\`
   - They differ from functions in that they are called through an object

2. String methods
   - Do not change the original string
   - Examples: upper(), lower(), strip(), replace(), split(), join()
   - Return a new string

3. List methods
   - Many methods modify the original list
   - Examples: append(), insert(), remove(), pop(), sort(), reverse()
   - Some return values (count, index)

4. Dictionary methods
   - Work with keys and values
   - Examples: keys(), values(), items(), get(), pop(), update()

5. Method chaining
   - You can call methods one after another
   - Works if each method returns an object with the next method6. Reference
   - help() - get help about the method
   - dir() - see all object methods

Methods are a powerful tool for working with objects in Python!`,
  
  practiceTask: {
    title: "Text data processing system",
    description: "Create functions for processing text data using string, list, and dictionary methods",
    problemStatement: `Write a program with functions:

1. clean_text(text) - strip + capitalize
2. process_words(words) - no duplicates, sorted
3. create_word_count(text) - dictionary {word: count} from the original text (strip + split)
4. format_user_data(user_data) - capitalize name, lower email, add role="user", status="active"

Read a string of text, name, and email. Output the cleaned text, processed words, word count, and user data.

Input format:
  hello world hello python  
Oleksandr
USER@EXAMPLE.COM`,
    outputFormat: `Cleaned text: Hello world hello python
Processed words: ['Hello', 'hello', 'python', 'world']
Word count: {'hello': 2, 'world': 1, 'python': 1}
User data: {'name': 'Oleksandr', 'email': 'user@example.com', 'role': 'user', 'status': 'active'}`,
    examples: [
      {
        input: `  hello world hello python
oleksandr
USER@EXAMPLE.COM`,
        output: `Cleaned text: Hello world hello python
Processed words: ['Hello', 'hello', 'python', 'world']
Word count: {'hello': 2, 'world': 1, 'python': 1}
User data: {'name': 'Oleksandr', 'email': 'user@example.com', 'role': 'user', 'status': 'active'}`,
        explanation: "capitalize changes only the first letter of the entire string; counting from the original words"
      },
      {
        input: `Python Python code
Maria
Maria@Mail.COM`,
        output: `Cleaned text: Python python code
Processed words: ['Python', 'code', 'python']
Word count: {'Python': 2, 'code': 1}
User data: {'name': 'Maria', 'email': 'maria@mail.com', 'role': 'user', 'status': 'active'}`,
        explanation: "Two Pythons in counting; after capitalize the second word becomes python"
      },
      {
        input: `one two
Ivan
IVAN@TEST.UA`,
        output: `Cleaned text: One two
Processed words: ['One', 'two']
Word count: {'one': 1, 'two': 1}
User data: {'name': 'Ivan', 'email': 'ivan@test.ua', 'role': 'user', 'status': 'active'}`,
        explanation: "The count preserves the case of the original words"
      }
    ],
    solution: {
      code: `def clean_text(text):
    """Cleans text: strip and capitalize"""
    return text.strip().capitalize()

def process_words(words):
    """Removes duplicates and sorts words"""
    unique_words = []
    for word in words:
        if word not in unique_words:
            unique_words.append(word)
    unique_words.sort()
    return unique_words

def create_word_count(text):
    """Creates a dictionary with word count"""
    words = text.strip().split()
    word_count = {}
    for word in words:
        word_count[word] = word_count.get(word, 0) + 1
    return word_count

def format_user_data(user_data):
    """Formats user data"""
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

text = input()
name = input().strip()
email = input().strip()

cleaned = clean_text(text)
print(f"Cleaned text: {cleaned}")

processed = process_words(cleaned.split())
print(f"Processed words: {processed}")

word_count = create_word_count(text)
print(f"Word count: {word_count}")
formatted_data = format_user_data({"name": name, "email": email})
print(f"User data: {formatted_data}")`,
      explanation: "String/list/dictionary methods in functions; input data from stdin."
    },
    hints: [
      "Use strip(), capitalize(), split(), lower()",
      "Do the counting from the original text.strip().split()",
      "For unique words, check not in before append",
      "format_user_data should add role and status by default"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is an object method?",
        options: [
          "A function you call on an object with obj.method()",
          "Any variable stored inside the object only",
          "A built-in data type like int or str",
          "A comparison operator such as == or +"
        ],
        correctAnswer: 0,
        explanation: "Methods are functions attached to objects and invoked as obj.method(). Attributes store data; types and operators are different concepts."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Do string methods change the original string?",
        options: [
          "No, they return a new line",
          "Yes, they change the original line",
          "Depends on the method",
          "Only some methods"
        ],
        correctAnswer: 0,
        explanation: "String methods do not modify the original string, they always return a new string. This is because strings in Python are immutable."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ntext = \"  Hello, world!  \"\nresult = text.strip().upper()\nprint(result)\n```",
        options: [
          "HELLO, WORLD!",
          "  HELLO, WORLD!  ",
          "Hello, world!",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "First, strip() removes spaces → 'Hello, world!', then upper() converts to uppercase → 'HELLO, WORLD!'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "You have nums = [1, 2] and want [1, 2, 3]. Which call is correct?",
        options: [
          "nums.append(3)",
          "nums.add(3)",
          "nums.insert(3)",
          "nums.extend(3)"
        ],
        correctAnswer: 0,
        explanation: "append(3) adds one item at the end. lists have no add(); insert needs an index; extend expects an iterable, not a bare int."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nnumbers = [3, 1, 4, 1, 5]\nnumbers.sort()\nprint(numbers)\n```",
        options: [
          "[1, 1, 3, 4, 5]",
          "[3, 1, 4, 1, 5]",
          "None",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "sort() sorts the list in place (modifies the original list), so numbers will become [1, 1, 3, 4, 5]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which dictionary method returns all the keys?",
        options: [
          "keys()",
          "get()",
          "items()",
          "values()"
        ],
        correctAnswer: 0,
        explanation: "keys() returns all the dictionary keys. values() returns the values, items() returns key-value pairs, get() retrieves the value by key."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nperson = {\"name\": \"Alexander\", \"age\": 20}\nemail = person.get(\"email\", \"Not specified\")\nprint(email)\n```",
        options: [
          "Not specified",
          "Error",
          "None",
          "email"
        ],
        correctAnswer: 0,
        explanation: "get() returns the value for a key, or the default value if the key is not present. Since 'email' is not in the dictionary, 'Not specified' is returned."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can call methods one after another (method chaining) if each method returns an object with the next method.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, the method chain works if each method returns an object of the same type or an object with the required method. For example, text.strip().upper() works because both methods return a string."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
