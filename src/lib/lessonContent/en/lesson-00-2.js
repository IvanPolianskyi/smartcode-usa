/**
 * Lesson 00-2: Variables and Data Types: int, float, str, bool
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_00_2 = {
  lessonId: "lesson-00-2",
  moduleId: "module-00",
  order: 2,
  title: "Variables and Data Types: int, float, str, bool",
  
  learningObjectives: [
    "Understand the concept of variables",
    "Learn the basic data types: int, float, str, bool",
    "Learn how to convert types",
    "Work with variables in programs"
  ],
  
  prerequisites: ["lesson-00-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "A variable is a labelled box",
        content: `A program that cannot remember anything is just a very short story. Variables are how a program remembers.

A **variable** is a name attached to a value:

\`\`\`python
age = 14
\`\`\`

Read that right to left: take the value \`14\`, and label it \`age\`. From now on, writing \`age\` means "whatever is in that box".

\`\`\`python
age = 14
print(age)        # 14
print(age + 1)    # 15
\`\`\`

The \`=\` here is **not** the equals sign from maths. It does not claim that two things are equal - it is an instruction: *put this value in that box*. That distinction matters the moment you write something like \`count = count + 1\`, which is nonsense in maths and completely normal in code.

Step through this one line by line and watch the boxes appear and change.`,
        interactives: [
          {
            id: 'trace-assign',
            type: 'varTrace',
            prompt: 'Press play, or step through with the arrows.',
            code: 'age = 14\nname = "Sam"\nage = age + 1\nage = "fourteen"',
            steps: [
              {
                line: 1,
                note: 'A box called age is created, holding the whole number 14.',
                vars: { age: { value: '14', type: 'int' } },
              },
              {
                line: 2,
                note: 'A second box, name, holding a string. The two are unrelated.',
                vars: { age: { value: '14', type: 'int' }, name: { value: '"Sam"', type: 'str' } },
              },
              {
                line: 3,
                note: 'The right side runs first: age + 1 is 15. Only then does 15 go back into age. The old 14 is gone.',
                vars: { age: { value: '15', type: 'int' }, name: { value: '"Sam"', type: 'str' } },
              },
              {
                line: 4,
                note: 'A variable can be handed a different type entirely. age is now a string - Python allows it without complaint.',
                vars: {
                  age: { value: '"fourteen"', type: 'str' },
                  name: { value: '"Sam"', type: 'str' },
                },
              },
            ],
          },
        ],
      },
      {
        title: "The four types you need first",
        content: `Every value in Python has a **type**, and the type decides what you are allowed to do with it.

| Type | What it holds | Examples |
|---|---|---|
| \`int\` | Whole numbers | \`0\`, \`14\`, \`-273\` |
| \`float\` | Numbers with a decimal point | \`3.14\`, \`0.5\`, \`-0.001\` |
| \`str\` | Text | \`"hello"\`, \`'A'\`, \`""\` |
| \`bool\` | Truth values | \`True\`, \`False\` |

Two things to note straight away:

- \`14\` and \`14.0\` are **different types**. The first is an int, the second is a float.
- \`True\` and \`False\` are capitalised. \`true\` is not a thing in Python.

The \`type()\` function tells you what you are holding:

\`\`\`python
print(type(14))        # <class 'int'>
print(type("14"))      # <class 'str'>
\`\`\`

That second line is the one that catches people: \`"14"\` in quotes is **text that looks like a number**, and Python treats it as text. Try a few values below.`,
        interactives: [
          {
            id: 'try-types',
            type: 'tryIt',
            prompt: 'Run it, then add your own values - try True, 0.5, and "0.5".',
            starterCode: `print(type(14))
print(type(14.0))
print(type("14"))
print(type(True))`,
            expect: { mustContain: ['class'] },
            hint: 'Wrap each value in type(), and that in print().',
          },
        ],
      },
      {
        title: "Arithmetic, and the division surprise",
        content: `The operators look familiar:

\`\`\`python
print(7 + 2)     # 9   addition
print(7 - 2)     # 5   subtraction
print(7 * 2)     # 14  multiplication
print(7 ** 2)    # 49  power
\`\`\`

Division is where Python differs from what you might expect. There are three of them:

\`\`\`python
print(7 / 2)     # 3.5   true division  - always a float
print(7 // 2)    # 3     floor division - throws away the remainder
print(7 % 2)     # 1     modulo         - keeps only the remainder
\`\`\`

\`/\` **always** produces a float, even when it divides evenly. \`10 / 5\` is \`2.0\`, not \`2\`. If you want a whole number back, use \`//\`.

\`%\` looks obscure but earns its place fast: \`n % 2 == 0\` is how you test whether a number is even.

Commit to an answer before you run this one.`,
        interactives: [
          {
            id: 'guess-division',
            type: 'predictOutput',
            prompt: 'Three divisions of the same numbers. What comes out?',
            code: 'print(10 / 5)\nprint(10 // 3)\nprint(10 % 3)',
            options: [
              '2\n3\n1',
              '2.0\n3\n1',
              '2.0\n3.33\n1',
              '2\n3.33\n0',
            ],
            correctAnswer: 1,
            explanation:
              '/ always returns a float, so 10 / 5 is 2.0. // discards the fraction, giving 3. % keeps only the remainder, giving 1.',
          },
        ],
      },
      {
        title: "The + operator does two different jobs",
        content: `With numbers, \`+\` adds. With strings, it **joins**:

\`\`\`python
print(2 + 3)          # 5
print("2" + "3")      # 23
\`\`\`

Same symbol, completely different behaviour, decided entirely by the types involved. Joining strings like this is called **concatenation**.

Mix the two and Python refuses:

\`\`\`python
print("2" + 3)
# TypeError: can only concatenate str (not "int") to str
\`\`\`

It will not guess what you meant. This is a good thing - silent guessing is how other languages produce bugs you find in production.`,
        interactives: [
          {
            id: 'guess-plus',
            type: 'predictOutput',
            prompt: 'Look at the quotes carefully.',
            code: 'print(5 + 3)\nprint("5" + "3")',
            options: [
              '8\n8',
              '53\n53',
              '8\n53',
              '8\nTypeError',
            ],
            correctAnswer: 2,
            explanation:
              'The first line adds two ints and gives 8. The second joins two strings end to end and gives "53".',
          },
        ],
      },
      {
        title: "Converting between types",
        content: `When you need a different type, ask for one. The type names double as conversion functions:

\`\`\`python
int("42")        # 42      text -> whole number
float("3.14")    # 3.14    text -> decimal number
str(42)          # "42"    number -> text
int(3.9)         # 3       float -> int, and it truncates, it does not round
\`\`\`

That last one is worth remembering: \`int(3.9)\` is \`3\`, not \`4\`. It chops the decimal part off.

Conversion only works when the text actually looks like a number:

\`\`\`python
int("42")        # fine
int("forty")     # ValueError: invalid literal for int() with base 10: 'forty'
\`\`\`

**Why this matters immediately:** \`input()\` always hands you a **string**, no matter what the person typed. Type \`5\` and you get \`"5"\`, text. So this is broken:

\`\`\`python
price = input()      # "100", a string
total = price * 2    # "100100" - repeats the text!
\`\`\`

and this is right:

\`\`\`python
price = float(input())   # 100.0, a number
total = price * 2        # 200.0
\`\`\`

You will need exactly this in the practice task at the end of the lesson.`,
        interactives: [
          {
            id: 'convert-blanks',
            type: 'fillBlank',
            prompt:
              'Read a number typed by the user and store it as a decimal number, ready for arithmetic.',
            template: 'price = {{conv}}({{fn}}())',
            blanks: [
              { id: 'conv', answer: 'float', accept: ['float'], width: 7, placeholder: 'type' },
              { id: 'fn', answer: 'input', accept: ['input'], width: 7, placeholder: 'read' },
            ],
            explanation:
              'input() returns text, so wrap it in float() to get a number you can do maths with.',
            hint: 'The inner function reads what the user typed; the outer one converts it to a decimal number.',
          },
        ],
      },
      {
        title: "Printing values with f-strings",
        content: `You could print a value on its own, but real output mixes text and values. The clean way is an **f-string** - a normal string with an \`f\` in front, where anything in \`{ }\` gets replaced by its value:

\`\`\`python
name = "Sam"
age = 15

print(f"{name} is {age} years old")
# Sam is 15 years old
\`\`\`

Three rules:

1. The \`f\` goes **before** the opening quote: \`f"..."\`, not \`"f..."\`
2. Anything inside \`{ }\` is evaluated as code
3. Without the \`f\`, you get the braces printed literally: \`"{name}"\` prints \`{name}\`

You can put expressions in there too, not just names:

\`\`\`python
print(f"Next year: {age + 1}")     # Next year: 16
print(f"Total: {2 * 3} USD")       # Total: 6 USD
\`\`\`

This is the formatting style you will use for the rest of the course.`,
        interactives: [
          {
            id: 'fstring-blanks',
            type: 'fillBlank',
            prompt: 'Make this print: Subtotal: 225.0 USD',
            template: 'subtotal = 225.0\nprint({{f}}"Subtotal: {{brace}} USD")',
            blanks: [
              { id: 'f', answer: 'f', accept: ['f'], width: 3, placeholder: '?' },
              {
                id: 'brace',
                answer: '{subtotal}',
                accept: ['{subtotal}'],
                width: 12,
                placeholder: '{...}',
              },
            ],
            explanation:
              'The f before the quote turns on substitution; {subtotal} is replaced by the value in that variable.',
            hint: 'One letter goes before the quote, and the variable name goes inside curly braces.',
          },
        ],
      },
      {
        title: "Naming variables",
        content: `The rules Python enforces:

- Letters, digits and underscores only
- Cannot start with a digit: \`2fast\` is a SyntaxError, \`fast2\` is fine
- Case matters: \`age\`, \`Age\` and \`AGE\` are three different variables
- Cannot be a reserved word: \`class\`, \`for\`, \`if\`, \`import\`, \`True\`, \`None\` and friends

The conventions Python programmers enforce on each other:

\`\`\`python
user_name = "Sam"        # snake_case - the Python house style
total_price = 42.50      # readable, lowercase, underscores between words

userName = "Sam"         # camelCase - correct code, wrong language
x = 42.50                # legal, and useless to anyone reading it
\`\`\`

A name is a message to the next person who reads the code, and that person is usually you. \`d\` saves you four keystrokes today and costs you ten minutes in a month. Write \`days_remaining\`.`,
      },
    ]
  },

  codeExamples: [
    {
      title: "Example 1: Assignment and use",
      code: `name = "Alice"
age = 15
height = 1.62
is_student = True

print(name, age, height, is_student)`,
      explanation:
        "Four variables, four different types. print() accepts several values separated by commas and puts spaces between them."
    },
    {
      title: "Example 2: The right side runs first",
      code: `score = 10
score = score + 5
print(score)     # 15

score += 5       # shorthand for the same thing
print(score)     # 20`,
      explanation:
        "score = score + 5 evaluates 10 + 5 first, then stores 15. The += shorthand does exactly the same."
    },
    {
      title: "Example 3: The three divisions",
      code: `print(17 / 5)      # 3.4   float, always
print(17 // 5)     # 3     whole part only
print(17 % 5)      # 2     remainder only
print(17 ** 2)     # 289   power`,
      explanation:
        "Pick / for an exact answer, // when you need a whole number, % when you need what is left over."
    },
    {
      title: "Example 4: Checking and converting types",
      code: `value = "42"
print(type(value))        # <class 'str'>

number = int(value)
print(type(number))       # <class 'int'>
print(number * 2)         # 84
print(value * 2)          # 4242`,
      explanation:
        "The last two lines are the whole lesson in miniature: the same * means multiply for an int and repeat for a str."
    },
    {
      title: "Example 5: f-strings in practice",
      code: `item = "notebook"
price = 12.5
quantity = 3

print(f"{quantity} x {item} = {price * quantity} USD")
# 3 x notebook = 37.5 USD`,
      explanation:
        "Expressions work inside the braces, so the arithmetic can happen right where the value is printed."
    }
  ],

  commonMistakes: [
    {
      mistake: "Doing maths on input() without converting it",
      explanation:
        "input() always returns a string. price * 2 on the string \"100\" gives \"100100\", and price + 10 raises TypeError.",
      correctApproach: "Convert as you read: price = float(input()) or count = int(input())."
    },
    {
      mistake: "Expecting / to give a whole number",
      explanation:
        "True division always produces a float, so 10 / 5 is 2.0, not 2, and printing it shows the .0.",
      correctApproach: "Use // for floor division when you want an int, or wrap the result in int()."
    },
    {
      mistake: "Assuming int() rounds",
      explanation:
        "int(3.9) is 3. It truncates towards zero rather than rounding to the nearest whole number.",
      correctApproach: "Use round(3.9) when you want 4. Use int() only when you actually want truncation."
    },
    {
      mistake: "Reading assignment right to left",
      explanation:
        "x = y copies the value of y into x, not the other way round, and 5 = x is a SyntaxError.",
      correctApproach: "The name being assigned always goes on the left of the =."
    },
    {
      mistake: "Forgetting the f on an f-string",
      explanation:
        "print(\"{name}\") prints the literal text {name}, because without the f there is no substitution.",
      correctApproach: "Put the f immediately before the opening quote: print(f\"{name}\")."
    },
    {
      mistake: "Mixing up case in variable names",
      explanation:
        "Python is case-sensitive, so assigning to userName and reading userame or UserName raises NameError.",
      correctApproach: "Stick to snake_case consistently: user_name everywhere."
    }
  ],

  summary: `What you can do now:

1. Store a value under a name with =, and read it back
2. Tell int, float, str and bool apart, and check with type()
3. Use +, -, *, ** and the three divisions /, // and %
4. Know that + adds numbers but joins strings, and that mixing them is a TypeError
5. Convert with int(), float() and str() - and remember int() truncates
6. Convert input() before doing maths with it
7. Format output with f-strings
8. Name variables in snake_case so the next reader understands them

Point 6 is the one that breaks the practice task if you skip it. Next lesson: lists - holding many values under one name.`,

  practiceTask: {
    title: "Personal expense calculator",
    description: "Create a program to calculate personal expenses",
    problemStatement: `Write a program that:
1. Reads the prices of three items (one number per line)
2. Calculates the total cost
3. Applies a 15% discount
4. Prints the subtotal and the final amount due

Input format:
100
50
75`,
    outputFormat: `Item 1 price: 100.0 USD
Item 2 price: 50.0 USD
Item 3 price: 75.0 USD
Subtotal: 225.0 USD
Discount (15%): 33.75 USD
Amount due: 191.25 USD`,
    examples: [
      {
        input: `100
50
75`,
        output: `Item 1 price: 100.0 USD
Item 2 price: 50.0 USD
Item 3 price: 75.0 USD
Subtotal: 225.0 USD
Discount (15%): 33.75 USD
Amount due: 191.25 USD`,
        explanation: "Subtotal 225.0, discount 15% = 33.75, amount due 191.25"
      },
      {
        input: `200
100
50`,
        output: `Item 1 price: 200.0 USD
Item 2 price: 100.0 USD
Item 3 price: 50.0 USD
Subtotal: 350.0 USD
Discount (15%): 52.5 USD
Amount due: 297.5 USD`,
        explanation: "Subtotal 350.0, discount 52.5, amount due 297.5"
      },
      {
        input: `10
20
30`,
        output: `Item 1 price: 10.0 USD
Item 2 price: 20.0 USD
Item 3 price: 30.0 USD
Subtotal: 60.0 USD
Discount (15%): 9.0 USD
Amount due: 51.0 USD`,
        explanation: "Subtotal 60.0, discount 9.0, amount due 51.0"
      }
    ],
    solution: {
      code: `# Personal expense calculator
price1 = float(input())
price2 = float(input())
price3 = float(input())

subtotal = price1 + price2 + price3
discount_amount = subtotal * 0.15
total = subtotal - discount_amount

print(f"Item 1 price: {price1} USD")
print(f"Item 2 price: {price2} USD")
print(f"Item 3 price: {price3} USD")
print(f"Subtotal: {subtotal} USD")
print(f"Discount (15%): {discount_amount} USD")
print(f"Amount due: {total} USD")`,
      explanation: "The solution reads three prices with input(), calculates the subtotal, applies a 15% discount, and prints the result."
    },
    hints: [
      "Read three prices with float(input())",
      "Use + to calculate the subtotal",
      "Discount = subtotal * 0.15",
      "Final amount = subtotal - discount",
      "Use f-strings for a consistent output format"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of the expression 7 // 4?",
        options: [
          "1.75",
          "1",
          "2",
          "3"
        ],
        correctAnswer: 1,
        explanation: "The // operator performs floor division, so 7 // 4 = 1 (without the decimal part)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of the expression 7 % 4?",
        options: [
          "1.75",
          "1",
          "3",
          "4"
        ],
        correctAnswer: 2,
        explanation: "The % operator returns the remainder of division. 7 divided by 4 is 1 with a remainder of 3."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 5\nx += 3\nprint(x)\n```",
        options: [
          "5",
          "8",
          "53",
          "An error"
        ],
        correctAnswer: 1,
        explanation: "The += operator adds a value to the variable. x += 3 is equivalent to x = x + 3, so the result is 8."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which variable name is valid?",
        options: [
          "user-name",
          "user name",
          "user_name",
          "1user"
        ],
        correctAnswer: 2,
        explanation: "Variable names cannot contain spaces, hyphens, or start with a number. The correct option is: user_name."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What type does the variable x = 3.14 have?",
        options: [
          "int",
          "float",
          "str",
          "bool"
        ],
        correctAnswer: 1,
        explanation: "Numbers with a decimal point have the float type in Python."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: 'What does this code print?\n\n```python\nx = "5"\ny = int(x)\nprint(y + 1)\n```',
        options: [
          "51",
          "6",
          "An error",
          "5"
        ],
        correctAnswer: 1,
        explanation: "First the string '5' is converted to the number 5, then 1 is added, resulting in 6."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of the expression 2 ** 3?",
        options: [
          "5",
          "6",
          "8",
          "9"
        ],
        correctAnswer: 2,
        explanation: "The ** operator performs exponentiation. 2 ** 3 = 2 * 2 * 2 = 8."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
