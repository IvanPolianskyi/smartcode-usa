/**
 * Lesson 03-8: Recursion
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_8 = {
  lessonId: "lesson-03-8",
  moduleId: "module-03",
  order: 8,
  title: "Recursion",
  
  learningObjectives: [
    "To understand the concept of recursion",
    "Create recursive functions with a base case",
    "Solve problems recursively",
    "Avoid infinite recursion",
    "Understand the advantages and disadvantages of recursion",
    "Compare recursion with iteration"
  ],
  
  prerequisites: ["lesson-03-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is recursion?",
        content: `Recursion is a programming technique in which a function calls itself. It is a powerful tool for solving problems that can be broken down into smaller subproblems of the same type.

**Simple example:**

\`\`\`python
def countdown(n):
    """
    Recursive function for countdown
    """
    if n <= 0:  # Base case
        print("Done!")
    else:
        print(n)
        countdown(n - 1)  # Recursive call

countdown(5)
\`\`\`

**Conclusion:**
\`\`\`
5
4
3
2
1
Done!
\`\`\`

**Key Components of a Recursive Function:**

1. **Base Case** - a condition that stops the recursion
2. **Recursive Case** - the function calls itself with different arguments

**Analogy:**

Imagine a matryoshka (nested dolls). To open them all, you need to:
1. Open the current doll (recursive case)
2. If there is another doll inside, repeat the process (recursion)
3. When there are no more dolls, stop (base case)`
      },
      {
        title: "Base Case",
        content: `The base case is the condition that stops recursion. Without a base case, the function will call itself infinitely, leading to an error.

**Example without a base case (incorrect):**

\`\`\`python
def infinite_recursion(n):
    print(n)
    infinite_recursion(n - 1)  #  No stopping condition!

# infinite_recursion(5)  # Will cause an error: maximum recursion depth
\`\`\`

**Example with the basic case (correct):**

\`\`\`python
def countdown(n):
    if n <= 0:  #  Base case
        print("Done!")
        return
    else:
        print(n)
        countdown(n - 1)  # Recursive call

countdown(5)  # Works correctly
\`\`\`

**Important points:**

1. **The base case must be achievable:**
\`\`\`python
def example(n):
    if n == 0:  # Base case
        return 0
    return example(n - 1)  # Approaching the base case

example(5)  #  Works: 5 → 4 → 3 → 2 → 1 → 0
\`\`\`

2. **The base case should be simple:**
\`\`\`python
def factorial(n):
    if n == 0 or n == 1:  #  A simple basic case
        return 1
    return n * factorial(n - 1)
\`\`\`

3. **There may be several basic cases:**
\`\`\`python
def fibonacci(n):
    if n == 0:  # The first basic case
        return 0
    if n == 1:  # Second base case
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\``
      },
      {
        title: "Classic examples of recursion",
        content: `**1. Factorial**

The factorial of a number n (denoted n!) is the product of all natural numbers from 1 to n.

\`\`\`python
def factorial(n):
    """
    Calculates the factorial of the number n recursively
    n! = n * (n-1) * (n-2) * ... * 1
    """
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

# Usage
print(factorial(5))  # 120 (5! = 5 * 4 * 3 * 2 * 1)
print(factorial(0))  # 1
\`\`\`

**How it works:**
- factorial(5) = 5 * factorial(4)
- factorial(4) = 4 * factorial(3)
- factorial(3) = 3 * factorial(2)
- factorial(2) = 2 * factorial(1)
- factorial(1) = 1 (base case)

**2. Fibonacci Numbers**

Each Fibonacci number is the sum of the two previous numbers.

\`\`\`python
def fibonacci(n):
    """
    Calculates the n-th Fibonacci number
    F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
    """
    # Basic cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

# Usage
print(fibonacci(6))  # 8 (0, 1, 1, 2, 3, 5, 8)
\`\`\`

**3. Sum of numbers**

\`\`\`python
def sum_numbers(n):
    """
    Calculates the sum of numbers from 1 to n
    """
    # Base case
    if n == 0:
        return 0
    
    # Recursive case
    return n + sum_numbers(n - 1)

# Usage
print(sum_numbers(5))  # 15 (1 + 2 + 3 + 4 + 5)
\`\`\`

**4. Exponentiation**

\`\`\`python
def power(base, exponent):
    """
    Raises base to the power of exponent
    """
    # Base case
    if exponent == 0:
        return 1
    if exponent == 1:
        return base
    
    # Recursive case
    return base * power(base, exponent - 1)

# Usage
print(power(2, 5))  # 32 (2^5)
\`\`\``
      },
      {
        title: "Recursion with lists",
        content: `Recursion is very useful for working with lists and other data structures.

**1. Sum of list elements**

\`\`\`python
def sum_list(numbers):
    """
    Calculates the sum of the elements of a list recursively
    """
    # Base case: empty list
    if len(numbers) == 0:
        return 0
    
    # Recursive case: first element + sum of the rest
    return numbers[0] + sum_list(numbers[1:])

# Usage
print(sum_list([1, 2, 3, 4, 5]))  # 15
\`\`\`

**2. Search for the maximum element**

\`\`\`python
def find_max(numbers):
    """
    Finds the maximum element in a list
    """
    # Base case: one element
    if len(numbers) == 1:
        return numbers[0]
    
    # Recursive case
    max_rest = find_max(numbers[1:])
    return numbers[0] if numbers[0] > max_rest else max_rest

# Usage
print(find_max([3, 7, 2, 9, 1]))  # 9
\`\`\`

**3. Reversing a list**

\`\`\`python
def reverse_list(items):
    """
    Reverses the list recursively
    """
    # Base case
    if len(items) <= 1:
        return items
    
    # Recursive case
    return [items[-1]] + reverse_list(items[:-1])

# Usage
print(reverse_list([1, 2, 3, 4, 5]))  # [5, 4, 3, 2, 1]
\`\`\`

**4. Checking if an element is in a list**

\`\`\`python
def contains(items, target):
    """
    Checks if the list contains an element
    """
    # Basic cases
    if len(items) == 0:
        return False
    if items[0] == target:
        return True
    
    # Recursive case
    return contains(items[1:], target)

# Usage
print(contains([1, 2, 3, 4, 5], 3))  # True
print(contains([1, 2, 3, 4, 5], 6))  # False
\`\`\``
      },
      {
        title: "Recursion with strings",
        content: `Recursion is also useful for working with strings.

**1. Checking if a string is a palindrome**

\`\`\`python
def is_palindrome(text):
    """
    Checks if the string is a palindrome (read equally on both sides)
    """
    # Remove spaces and convert to lowercase
    text = text.replace(" ", "").lower()
    
    # Basic cases
    if len(text) <= 1:
        return True
    if text[0] != text[-1]:
        return False
    
    # Recursive case
    return is_palindrome(text[1:-1])

# Usage
print(is_palindrome("radar"))  # True
print(is_palindrome("hello"))  # False
print(is_palindrome("And the rose fell on Azor's paw"))  # True
\`\`\`

**2. Character count**

\`\`\`python
def count_char(text, char):
    """
    Counts the number of occurrences of a character in a string
    """
    # Base case
    if len(text) == 0:
        return 0
    
    # Recursive case
    count = 1 if text[0] == char else 0
    return count + count_char(text[1:], char)

# Usage
print(count_char("programmer", "r"))  # 2
\`\`\`

**3. String Reversal**

\`\`\`python
def reverse_string(text):
    """
    Reverses a string recursively
    """
    # Base case
    if len(text) <= 1:
        return text
    
    # Recursive case
    return text[-1] + reverse_string(text[:-1])

# Usage
print(reverse_string("Python"))  # "nohtyP"
\`\`\``
      },
      {
        title: "Recursion depth and limitation",
        content: `Python has a limitation on recursion depth (by default about 1000 calls).

**Checking recursion depth:**

\`\`\`python
import sys

print(sys.getrecursionlimit())  # Usually 1000
\`\`\`

**Change of restriction (not recommended):**

\`\`\`python
import sys

sys.setrecursionlimit(2000)  # Increasing the restrictions
\`\`\`

**Maximum recursion depth error:**

\`\`\`python
def infinite_like(n):
    if n == 0:
        return 0
    return infinite_like(n - 1)  # Will cause an error for large n

# infinite_like(2000)  # RecursionError: maximum recursion depth exceeded
\`\`\`

**How to avoid problems:**

1. **Make sure the base case is reachable:**
\`\`\`python
def good_recursion(n):
    if n <= 0:  #  The base case is always achievable
        return 0
    return good_recursion(n - 1)
\`\`\`

2. **Use iteration for large tasks:**
\`\`\`python
# Recursion (may cause problems for large n)
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

# Iteration (safer for large n)
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
\`\`\`

3. **Recursion optimization (tail recursion):**
\`\`\`python
# Ordinary recursion
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # It is necessary to maintain context

# Tail recursion (more efficient)
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # There is no need to keep the context
\`\`\``
      },
      {
        title: "Recursion vs Iteration",
        content: `Many problems can be solved both recursively and iteratively (using loops).

**Comparison:**

**1. Factorial**

Recursively:

\`\`\`python
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)
\`\`\`

Iteratively:

\`\`\`python
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
\`\`\`

**2. Sum of numbers**

Recursively:

\`\`\`python
def sum_recursive(n):
    if n == 0:
        return 0
    return n + sum_recursive(n - 1)
\`\`\`

Iteratively:

\`\`\`python
def sum_iterative(n):
    result = 0
    for i in range(1, n + 1):
        result += i
    return result
\`\`\`

**When to use recursion:**

**Useful for:**
- Problems that are naturally recursive (trees, graphs)
- When code becomes more readable
- For complex data structures
- For problems where readability is more important than performance

**Better to avoid for:**
- Simple problems that can be easily solved iteratively
- When performance is important
- For very large data sets (risk of stack overflow)

**Advantages of recursion:**
- More readable code for complex problems
- A natural approach for certain algorithms
- Less code for complex structures

**Disadvantages of recursion:**
- Can be slower
- Uses more memory (call stack)
- Risk of stack overflow
- Can be harder to debug`
      },
      {
        title: "Practical tips",
        content: `**1. Always have a base case**

\`\`\`python
#  Correct
def example(n):
    if n <= 0:  # Base case
        return 0
    return example(n - 1)

#  Incorrect
def example(n):
    return example(n - 1)  # There is no base case!
\`\`\`

**2. Make sure that you are approaching the base case**

\`\`\`python
#  Correct
def countdown(n):
    if n <= 0:
        return
    countdown(n - 1)  # n decreases

#  Incorrect
def countdown(n):
    if n <= 0:
        return
    countdown(n + 1)  # n increases - infinite recursion!
\`\`\`

**3. Use recursion for naturally recursive problems**

\`\`\`python
# Tree traversal (naturally recursive problem)
def traverse_tree(node):
    if node is None:
        return
    print(node.value)
    traverse_tree(node.left)
    traverse_tree(node.right)
\`\`\`

**4. Think of the problem as smaller subtasks**

\`\`\`python
# Task: find the sum of a list
# Subtask: first element + sum of the rest
def sum_list(numbers):
    if len(numbers) == 0:
        return 0
    return numbers[0] + sum_list(numbers[1:])
\`\`\`

**5. Test on small data first**

\`\`\`python
# Check on small values first
print(factorial(5))  # 120
print(factorial(0))  # 1
print(factorial(1))  # 1

# Then on the bigger ones
print(factorial(10))  # 3628800
\`\`\`

**6. Add comments for complex recursive functions**

\`\`\`python
def complex_recursion(data):
    """
    Complex recursive function

Base case: ...
Recursive case: ...
    """
    # Function code
    pass
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson, we studied recursion:

**Key Concepts:**

1. **Recursion**
   - A function calls itself
   - A base case and a recursive case are needed

2. **Base Case**
   - A condition that stops the recursion
   - Must be reachable and simple

3. **Recursive Case**
   - The function calls itself
   - Must approach the base case

4. **Classic Examples**
   - Factorial
   - Fibonacci numbers
   - Traversing data structures

5. **Limitations**
   - Python has a recursion depth limit (~1000)
   - May cause stack overflow

6. **Recursion vs Iteration**
   - Many tasks can be solved by both methods
   - Recursion is more readable for complex tasks
   - Iteration is more efficient for simple tasks

**Rules:**- Always have a base case
- Approach the base case
- Use for naturally recursive problems
- Test on small data

**Next step:**

In the next lesson, we will learn about higher-order functions - functions that take other functions as arguments or return functions.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "A simple example of recursion",
      code: `def countdown(n):
    """
    Recursive function for counting down
    """
    if n <= 0:  # Base case
        print("Done!")
    else:
        print(n)
        countdown(n - 1)  # Recursive call

countdown(5)`,
      explanation: "Demonstrates the basic structure of a recursive function: the base case and the recursive call."
    },
    {
      title: "Factorial",
      code: `def factorial(n):
    """
    Calculates the factorial of number n
    """
    if n == 0 or n == 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120`,
      explanation: "A classic example of recursion is calculating the factorial."
    },
    {
      title: "Fibonacci numbers",
      code: `def fibonacci(n):
    """
    Calculates the n-th Fibonacci number
    """
    if n == 0:  # Base case 1
        return 0
    if n == 1:  # Base case 2
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)  # Recursive case

print(fibonacci(6))  # 8`,
      explanation: "Demonstrates recursion with two base cases and two recursive calls."
    },
    {
      title: "Sum of list elements",
      code: `def sum_list(numbers):
    """
    Calculates the sum of the list elements recursively
    """
    if len(numbers) == 0:  # Base case
        return 0
    return numbers[0] + sum_list(numbers[1:])  # Recursive case

print(sum_list([1, 2, 3, 4, 5]))  # 15`,
      explanation: "Shows the use of recursion for working with lists."
    },
    {
      title: "Palindrome check",
      code: `def is_palindrome(text):
    """
    Checks if the string is a palindrome
    """
    text = text.replace(" ", "").lower()
    if len(text) <= 1:  # Base case
        return True
    if text[0] != text[-1]:  # Base case (not a palindrome)
        return False
    return is_palindrome(text[1:-1])  # Recursive case

print(is_palindrome("radar"))  # True`,
      explanation: "Demonstrates recursive palindrome checking with string handling."
    },
    {
      title: "Tail recursion",
      code: `def factorial_tail(n, accumulator=1):
    """
    Factorial with tail recursion
    """
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # Tail recursion

print(factorial_tail(5))  # 120`,
      explanation: "Shows an optimized version of recursion with tail recursion."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Lack of a base case",
      explanation: "The most common mistake is forgetting the base case, which leads to infinite recursion.",
      correctApproach: `# Incorrect:
def countdown(n):
    print(n)
    countdown(n - 1)  # No base case!

# Correct:
def countdown(n):
    if n <= 0:  # Base case
        return
    print(n)
    countdown(n - 1)`
    },
    {
      mistake: "Base case unreachable",
      explanation: "The base case must be reachable, otherwise the recursion will not stop.",
      correctApproach: `# Incorrect:
def example(n):
    if n == 0:  # Base case
        return 0
    return example(n + 1)  # n increases, will never reach 0!

# Correct:
def example(n):
    if n <= 0:  # Base case
        return 0
    return example(n - 1)  # n decreases, will reach 0`
    },
    {
      mistake: "Forgetting return in a recursive call",
      explanation: "If a function is supposed to return a value, you need to return before the recursive call.",
      correctApproach: `# Incorrect:
def factorial(n):
    if n <= 1:
        return 1
    n * factorial(n - 1)  # Forgot return!

# Correct:
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # There is return`
    },
    {
      mistake: "Inefficient recursion for simple tasks",
      explanation: "For simple tasks, iteration is often more efficient than recursion.",
      correctApproach: `# Recursion (may be slower)
def sum_recursive(n):
    if n == 0:
        return 0
    return n + sum_recursive(n - 1)

# Iteration (more efficient for simple tasks)
def sum_iterative(n):
    result = 0
    for i in range(1, n + 1):
        result += i
    return result  # Faster and safer`
    }
  ],
  
  summary: `In this lesson, we studied recursion:

1. What recursion is
   - A function calls itself
   - A base case and a recursive case are needed

2. Base case
   - The condition that stops the recursion
   - Must be reachable and simple

3. Classic examples
   - Factorial: n! = n * (n-1)!
   - Fibonacci numbers: F(n) = F(n-1) + F(n-2)
   - Traversing data structures

4. Working with structures
   - Recursion for lists and strings
   - Traversing nested structures

5. Limitations
   - Python has a recursion depth limit (~1000)
   - Risk of stack overflow

6. Recursion vs Iteration
   - Many tasks can be solved in both ways
   - Recursion is more readable for complex tasks
   - Iteration is more efficient for simple tasks

Recursion is a powerful tool for solving complex problems!`,
  
  practiceTask: {
    title: "Recursive functions for different tasks",
    description: "Create recursive functions for different types of tasks",
    problemStatement: `Write recursive functions:

1. factorial(n)
2. sum_digits(n)
3. count_occurrences(items, target)
4. is_palindrome(text)
5. power(base, exponent)

Read: n for factorial; number for sum of digits; a string of numbers and target; two texts; base and exponent.

Input format:
5
12345
1 2 3 2 4 2
2
radar
hello
2
5`,
    outputFormat: `Factorial of 5: 120
Sum of the digits of 12345: 15
Number of occurrences of 2 in [1, 2, 3, 2, 4, 2]: 3
"radar" is a palindrome: True
"hello" is a palindrome: False
2^5 = 32`,
    examples: [
      {
        input: `5
12345
1 2 3 2 4 2
2
radar
hello
2
5`,
        output: `Factorial of 5: 120
Sum of the digits of 12345: 15
Number of occurrences of 2 in [1, 2, 3, 2, 4, 2]: 3
"radar" is a palindrome: True
"hello" is a palindrome: False
2^5 = 32`,
        explanation: "A classic set of recursive problems"
      },
      {
        input: `4
99
5 5 5
5
Cossack
abc
3
3`,
        output: `Factorial of 4: 24
Sum of digits of 99: 18
Number of occurrences of 5 in [5, 5, 5]: 3
"kazak" is a palindrome: True
"abc" is a palindrome: False
3^3 = 27`,
        explanation: "4! = 24, 9+9=18, three fives"
      },
      {
        input: `1
7
7
7
a
ab
10
0`,
        output: `Factorial 1: 1
Sum of digits 7: 7
Number of occurrences of 7 in [7]: 1
"a" is a palindrome: True
"ab" is a palindrome: False
10^0 = 1`,
        explanation: "Basic cases of recursion"
      }
    ],
    solution: {
      code: `def factorial(n):
    """Calculates factorial recursively"""
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

def sum_digits(n):
    """Sum of the digits of a number recursively"""
    if n < 10:
        return n
    return (n % 10) + sum_digits(n // 10)

def count_occurrences(items, target):
    """Number of occurrences of an element recursively"""
    if len(items) == 0:
        return 0
    count = 1 if items[0] == target else 0
    return count + count_occurrences(items[1:], target)

def is_palindrome(text):
    """Checks palindrome recursively"""
    text = text.replace(" ", "").lower()
    if len(text) <= 1:
        return True
    if text[0] != text[-1]:
        return False
    return is_palindrome(text[1:-1])def power(base, exponent):
    """Raises to a power recursively"""
    if exponent == 0:
        return 1
    if exponent == 1:
        return base
    return base * power(base, exponent - 1)

n = int(input())
number = int(input())
items = list(map(int, input().split()))
target = int(input())
text1 = input().strip()
text2 = input().strip()
base = int(input())
exp = int(input())

print(f"Factorial {n}: {factorial(n)}")
print(f"Sum of digits {number}: {sum_digits(number)}")
print(f"Number of occurrences of {target} in {items}: {count_occurrences(items, target)}")
print(f'"{text1}" is a palindrome: {is_palindrome(text1)}')
print(f'"{text2}" is a palindrome: {is_palindrome(text2)}')
print(f"{base}^{exp} = {power(base, exp)}")`,
      explanation: "Recursive functions with base cases; all arguments from stdin."
    },
    hints: [
      "Always define the base case",
      "For the sum of digits: n % 10 and n // 10",
      "For the list, recursion over items[1:]",
      "Read all values using input() after defining the functions"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is recursion?",
        options: [
          "Technique when a function causes itself",
          "Data type in Python",
          "Sorting method",
          "Object method"
        ],
        correctAnswer: 0,
        explanation: "Recursion is a programming technique where a function calls itself to solve a problem."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the base case in recursion?",
        options: [
          "The condition that stops the recursion",
          "The first call of the function",
          "The last function call",
          "Function parameter"
        ],
        correctAnswer: 0,
        explanation: "The base case is a condition that stops the recursion. Without it, the function will be called infinitely."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(4))\n```",
        options: [
          "24",
          "10",
          "Error",
          "1"
        ],
        correctAnswer: 0,
        explanation: "factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What will happen if a recursive function does not have a base case?",
        options: [
          "Infinite recursion and maximum depth error",
          "The function will work normally",
          "The function will return None",
          "The function will work slower"
        ],
        correctAnswer: 0,
        explanation: "Without the base case, the function will be called indefinitely, resulting in RecursionError: maximum recursion depth exceeded."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef countdown(n):\n    if n <= 0:\n        print(\"Done!\")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)\n```",
        options: [
          "3, 2, 1, Ready!",
          "Done!, 1, 2, 3",
          "3, 2, 1",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "First 3 is printed, then countdown(2) is called, 2 is printed, then countdown(1), 1 is printed, then countdown(0) prints 'Done!'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is it better to use recursion instead of iteration?",
        options: [
          "For complex data structures and naturally recursive problems",
          "Always, recursion is always better",
          "Never, iteration is always better",
          "Only for mathematical problems"
        ],
        correctAnswer: 0,
        explanation: "Recursion is better for complex data structures (trees, graphs) and tasks that are naturally recursive. For simple tasks, iteration is often more efficient."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef sum_list(numbers):\n    if len(numbers) == 0:\n        return 0\n    return numbers[0] + sum_list(numbers[1:])\n\nprint(sum_list([1, 2, 3]))\n```",
        options: [
          "6",
          "0",
          "Error",
          "[1, 2, 3]"
        ],
        correctAnswer: 0,
        explanation: "sum_list([1,2,3]) = 1 + sum_list([2,3]) = 1 + 2 + sum_list([3]) = 1 + 2 + 3 + sum_list([]) = 1 + 2 + 3 + 0 = 6."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A recursive function must always have a base case.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, the base case is mandatory. Without it, recursion will be infinite and will lead to an error."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
