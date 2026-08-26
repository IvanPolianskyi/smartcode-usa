/**
 * Lesson 00-6: Strings (str): methods, formatting, indexing
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_6 = {
  lessonId: "lesson-00-6",
  moduleId: "module-00",
  order: 6,
  title: "Strings (str): methods, formatting, indexing",
  
  learningObjectives: [
    "Manipulate strings",
    "Use string methods",
    "Format strings (f-strings, format)",
    "Work with string indexing and slicing"
  ],
  
  prerequisites: ["lesson-00-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are strings?",
        content: `Strings are used in Python to store text information, such as names. Strings in Python are actually a **sequence**, which means Python tracks every element in the string as a sequence. For example, Python understands the string "hello" as a sequence of letters in a specific order. That means we can use indexing to get individual letters (for example, the first or the last).

**What we will learn:**
1. Creating strings
2. Printing strings
3. String indexing and slicing
4. String properties
5. String methods
6. Output formatting`
      },
      {
        title: "Creating strings",
        content: `To create a string in Python, use single or double quotes:

\`\`\`python
# A single word
'hello'

# A whole phrase
'This is also a string'

# You can use double quotes
"String with double quotes"
\`\`\`

**Important about quotes:**
If the string contains a single quote, use double quotes:
\`\`\`python
# Error - single quote inside
# 'I'm using single quotes, but this will cause an error'

# Correct - double quotes on the outside
"Now I can use single quotes inside the string!"
\`\`\`

**Triple quotes for multiline strings:**
\`\`\`python
multiline = """This
is a multiline
string"""
\`\`\``
      },
      {
        title: "Printing strings",
        content: `**The print() function:**
The correct way to display strings in output is to use the \`print()\` function:

\`\`\`python
# Just declare a string
'Hello World'

# Use print to display it
print('Hello World 1')
print('Hello World 2')
print('Use \\n for a new line')
print('\\n')
print('See what I mean?')
\`\`\`

**Special characters:**
\`\`\`python
# \\n - new line
print('Line 1\\nLine 2')

# \\t - tab
print('Column1\\tColumn2')

# \\\\ - backslash
print('Path: C:\\\\Users\\\\Name')
\`\`\``
      },
      {
        title: "Basic string operations",
        content: `**String length:**
We can use the \`len()\` function to check a string's length:

\`\`\`python
text = 'Hello World'
print(len(text))  # 11
\`\`\`

The built-in \`len()\` function counts all characters in the string, including spaces and punctuation.

**String concatenation (joining):**
\`\`\`python
greeting = 'Hello'
name = 'Alexander'
message = greeting + ', ' + name + '!'
print(message)  # Hello, Alexander!
\`\`\`

**String multiplication:**
\`\`\`python
letter = 'z'
repeated = letter * 10
print(repeated)  # zzzzzzzzzz
\`\`\``
      },
      {
        title: "String indexing",
        content: `We know that strings are sequences, which means Python can use indexes to get parts of a sequence.

**Basic indexing:**
In Python we use square brackets \`[]\` after an object to call its index. Indexing starts at 0:

\`\`\`python
s = 'Hello World'

# First element (first letter)
print(s[0])  # 'H'

# Second element
print(s[1])  # 'e'

# Third element
print(s[2])  # 'l'
\`\`\`

**Slicing:**
We can use \`:\` to perform slices that capture everything up to a certain point:

\`\`\`python
s = 'Hello World'

# Everything after the first element to the end
print(s[1:])  # 'ello World'

# Everything up to index 3 (not including 3)
print(s[:3])  # 'Hel'

# Everything
print(s[:])  # 'Hello World'
\`\`\`

**Important:** Slices do not include the end index! \`s[:3]\` returns the elements at indexes 0, 1, and 2, but not 3.

**Negative indexing:**
\`\`\`python
s = 'Hello World'

# Last letter
print(s[-1])  # 'd'

# Everything except the last letter
print(s[:-1])  # 'Hello Worl'
\`\`\`

**Step in slices:**
\`\`\`python
s = 'Hello World'

# Step 1 (default)
print(s[::1])  # 'Hello World'

# Step 2 (every second character)
print(s[::2])  # 'HloWrd'

# Reverse order
print(s[::-1])  # 'dlroW olleH'
\`\`\``
      },
      {
        title: "String properties",
        content: `**Immutability:**
It is important to note that strings are **immutable**. That means after a string is created, the elements inside it cannot be changed or replaced:

\`\`\`python
s = 'Hello World'

#  You cannot change an element
# s[0] = 'x'  # Error: TypeError

#  You can create a new string
s = s + ' concatenate me!'
print(s)  # 'Hello World concatenate me!'
\`\`\`

**What we CAN do:**
- Concatenate strings
- Multiply strings
- Create new strings based on old ones
- Use string methods (which return new strings)`
      },
      {
        title: "Basic string methods",
        content: `Objects in Python usually have built-in methods. These are functions inside an object that can perform actions or commands on the object itself.

**Method syntax:**
\`\`\`python
object.method(parameters)
\`\`\`

**upper() - convert to uppercase:**
\`\`\`python
s = 'Hello World'
print(s.upper())  # 'HELLO WORLD'
\`\`\`

**lower() - convert to lowercase:**
\`\`\`python
s = 'Hello World'
print(s.lower())  # 'hello world'
\`\`\`

**split() - split a string:**
\`\`\`python
s = 'Hello World'

# Split by space (default)
print(s.split())  # ['Hello', 'World']

# Split by a specific character
print(s.split('W'))  # ['Hello ', 'orld']
\`\`\`

**strip() - remove spaces from the start and end:**
\`\`\`python
s = '  Hello World  '
print(s.strip())  # 'Hello World'
\`\`\`

**replace() - replace a substring:**
\`\`\`python
s = 'Hello World'
print(s.replace('World', 'Python'))  # 'Hello Python'
\`\`\`

**find() - find the position of a substring:**
\`\`\`python
s = 'Hello World'
print(s.find('World'))  # 6
print(s.find('Python'))  # -1 (not found)
\`\`\`

**count() - count occurrences:**
\`\`\`python
s = 'Hello World'
print(s.count('l'))  # 3
\`\`\`

**startswith() and endswith():**
\`\`\`python
s = 'Hello World'
print(s.startswith('Hello'))  # True
print(s.endswith('World'))    # True
\`\`\``
      },
      {
        title: "String formatting",
        content: `String formatting lets you insert elements into a string instead of trying to join them with commas or concatenation.

**Comparison:**
\`\`\`python
player = 'Alexander'
points = 33

# Concatenation (old way)
message1 = 'Yesterday ' + player + ' scored ' + str(points) + ' points.'

# Formatting (new way)
message2 = f'Yesterday {player} scored {points} points.'
\`\`\`

**Three ways to format:**

1. **f-strings (recommended, Python 3.6+):**
\`\`\`python
name = 'Alexander'
age = 16
message = f'My name is {name}, I am {age} years old'
print(message)  # My name is Alexander, I am 16 years old
\`\`\`

2. **.format() method:**
\`\`\`python
name = 'Alexander'
age = 16
message = 'My name is {}, I am {} years old'.format(name, age)
print(message)  # My name is Alexander, I am 16 years old
\`\`\`

3. **% operator (old way):**
\`\`\`python
name = 'Alexander'
age = 16
message = 'My name is %s, I am %d years old' % (name, age)
print(message)  # My name is Alexander, I am 16 years old
\`\`\`

**f-strings with expressions:**
\`\`\`python
x = 5
y = 10
result = f'The sum of {x} and {y} is {x + y}'
print(result)  # The sum of 5 and 10 is 15
\`\`\`

**Formatting numbers:**
\`\`\`python
price = 99.99
print(f'Price: {price:.2f} USD')  # Price: 99.99 USD

percentage = 0.85
print(f'Percentage: {percentage:.1%}')  # Percentage: 85.0%
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Creating and using strings",
      code: `# Creating strings
name = 'Alexander'
greeting = "Hello"
message = f'{greeting}, {name}!'

print(message)
print(f'Name length: {len(name)} characters')`,
      explanation: "Demonstrates creating strings, f-strings, and the len() function."
    },
    {
      title: "Example 2: Indexing and slicing",
      code: `# Indexing and slicing
text = 'Hello World'

print(f'First letter: {text[0]}')
print(f'Last letter: {text[-1]}')
print(f'First 5 characters: {text[:5]}')
print(f'From the 6th to the end: {text[6:]}')
print(f'In reverse order: {text[::-1]}')`,
      explanation: "Shows different ways to index and slice strings."
    },
    {
      title: "Example 3: String methods",
      code: `# String methods
text = '  Hello World  '

print(f'Uppercase: {text.upper()}')
print(f'Lowercase: {text.lower()}')
print(f'Without spaces: {text.strip()}')
print(f'Split: {text.split()}')
print(f'Replaced: {text.replace("World", "Python")}')`,
      explanation: "Demonstrates the main methods for manipulating strings."
    },
    {
      title: "Example 4: String formatting",
      code: `# String formatting
name = 'Alexander'
age = 16
score = 95.5

# f-strings
message1 = f'Student: {name}, Age: {age}, Score: {score:.1f}'
print(message1)

# .format()
message2 = 'Student: {}, Age: {}, Score: {:.1f}'.format(name, age, score)
print(message2)`,
      explanation: "Shows different ways to format strings."
    },
    {
      title: "Example 5: Practical application",
      code: `# Text processing
text = 'Python is a great programming language'

# Find the position of a word
position = text.find('great')
print(f'The word "great" is at position: {position}')

# Check the start and end
print(f'Starts with "Python": {text.startswith("Python")}')
print(f'Ends with "language": {text.endswith("language")}')

# Count occurrences
print(f'Number of spaces: {text.count(" ")}')`,
      explanation: "Demonstrates practical use of string methods for text processing."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Trying to change a character in a string",
      explanation: "Strings are immutable, so you cannot change individual characters.",
      correctApproach: "Create a new string: new_string = old_string[:index] + 'new_char' + old_string[index+1:]"
    },
    {
      mistake: "Confusing single and double quotes",
      explanation: "If the string contains a single quote, use double quotes on the outside.",
      correctApproach: "Use double quotes: \"I'm happy\" or escape: 'I\\'m happy'"
    },
    {
      mistake: "Forgetting that slices do not include the end index",
      explanation: "s[0:3] returns the elements at indexes 0, 1, and 2, but not 3.",
      correctApproach: "Remember: s[0:3] means 'from 0 to 3, not including 3'"
    },
    {
      mistake: "Using concatenation instead of f-strings",
      explanation: "Concatenation can be complicated and error-prone.",
      correctApproach: "Use f-strings: f'Hello {name}' instead of 'Hello ' + name"
    }
  ],
  
  summary: `In this lesson we learned:

1. Creating strings - single, double, and triple quotes
2. Indexing and slicing - accessing characters and parts of a string
3. Immutability - strings cannot be changed, but you can create new ones
4. String methods - upper(), lower(), split(), strip(), replace(), find()
5. Formatting - f-strings (recommended), .format(), % operator

Strings are a powerful tool for working with text! Next lesson - nested data structures.`,
  
  practiceTask: {
    title: "Text processing",
    description: "Create a program for processing and formatting text",
    problemStatement: `Write a program that:
1. Reads a string with a first and last name (for example, "Alexander Petrenko")
2. Splits it into first name and last name
3. Creates a formal greeting: "Dear [Last Name], [First Name]!"
4. Prints the first name in uppercase and the last name in lowercase
5. Counts the total number of characters (without spaces)

Input format:
Alexander Petrenko`,
    outputFormat: `Full name: Alexander Petrenko
Formal greeting: Dear Petrenko, Alexander!
First name (uppercase): ALEXANDER
Last name (lowercase): petrenko
Total number of characters: 17`,
    examples: [
      {
        input: `Alexander Petrenko`,
        output: `Full name: Alexander Petrenko
Formal greeting: Dear Petrenko, Alexander!
First name (uppercase): ALEXANDER
Last name (lowercase): petrenko
Total number of characters: 17`,
        explanation: "Split into first and last name; counted 17 characters without the space"
      },
      {
        input: `Maria Kovalenko`,
        output: `Full name: Maria Kovalenko
Formal greeting: Dear Kovalenko, Maria!
First name (uppercase): MARIA
Last name (lowercase): kovalenko
Total number of characters: 14`,
        explanation: "14 characters without the space"
      },
      {
        input: `Ivan Shevchenko`,
        output: `Full name: Ivan Shevchenko
Formal greeting: Dear Shevchenko, Ivan!
First name (uppercase): IVAN
Last name (lowercase): shevchenko
Total number of characters: 14`,
        explanation: "14 characters without the space"
      }
    ],
    solution: {
      code: `# Text processing
full_name = input().strip()

name_parts = full_name.split()
first_name = name_parts[0]
last_name = name_parts[1]

print(f"Full name: {full_name}")

greeting = f"Dear {last_name}, {first_name}!"
print(f"Formal greeting: {greeting}")

print(f"First name (uppercase): {first_name.upper()}")
print(f"Last name (lowercase): {last_name.lower()}")

total_chars = len(full_name.replace(" ", ""))
print(f"Total number of characters: {total_chars}")`,
      explanation: "The solution reads the full name with input(), uses split(), f-strings, and the upper()/lower() methods."
    },
    hints: [
      "Read the string with input().strip()",
      "Use split() to separate the parts",
      "Use f-strings for formatting",
      "Use upper() and lower()",
      "Remove spaces with replace(' ', '') before counting"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does this code print?\n\n```python\ns = 'Hello'\nprint(s[0])\n```",
        options: [
          "H",
          "e",
          "0",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "Indexing starts at 0, so s[0] returns the first character 'H'."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ns = 'Hello World'\nprint(s[:5])\n```",
        options: [
          "Hello",
          "World",
          "Hello World",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The slice s[:5] returns the characters at indexes 0-4, which is 'Hello'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method converts a string to uppercase?",
        options: [
          "upper()",
          "uppercase()",
          "toUpper()",
          "capitalize()"
        ],
        correctAnswer: 0,
        explanation: "The upper() method converts all characters in a string to uppercase."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ns = 'Hello World'\nprint(s.split())\n```",
        options: [
          "['Hello', 'World']",
          "['H', 'e', 'l', 'l', 'o']",
          "Hello World",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The split() method without parameters splits a string by spaces and returns a list."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you change a character in a string?",
        options: [
          "Yes, always",
          "No, strings are immutable",
          "Only the first character",
          "Only the last character"
        ],
        correctAnswer: 1,
        explanation: "Strings are immutable, so you cannot change individual characters. You need to create a new string."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nname = 'Alexander'\nage = 16\nprint(f'My name is {name}, I am {age} years old')\n```",
        options: [
          "My name is {name}, I am {age} years old",
          "My name is Alexander, I am 16 years old",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "f-strings let you insert variable values into a string."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method removes spaces from the start and end of a string?",
        options: [
          "trim()",
          "strip()",
          "remove()",
          "clean()"
        ],
        correctAnswer: 1,
        explanation: "The strip() method removes spaces (and other whitespace characters) from the start and end of a string."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
