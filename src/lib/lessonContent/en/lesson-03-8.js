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
    "Understand the concept of recursion",
    "Create recursive functions with a base case",
    "Solve problems recursively",
    "Avoid infinite recursion",
    "Understand the pros and cons of recursion",
    "Compare recursion with iteration"
  ],
  
  prerequisites: ["lesson-03-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is recursion?",
        content: `Recursion is a programming technique where a function calls itself. It is a powerful tool for solving problems that can be broken down into smaller subproblems of the same type.

**Simple example:**

\`\`\`python
def countdown(n):
    """
    Recursive countdown function
    """
    if n <= 0:  # Base case
        print("Done!")
    else:
        print(n)
        countdown(n - 1)  # Recursive call

countdown(5)
\`\`\`

**Output:**
\`\`\`
5
4
3
2
1
Done!
\`\`\`

**Key components of a recursive function:**

1. **Base case** - a condition that stops the recursion
2. **Recursive case** - the function calls itself with different arguments

**Analogy:**

Imagine nested dolls (matryoshka). To open them all, you need to:
1. Open the current doll (recursive case)
2. If there is another doll inside, repeat the process (recursion)
3. When there are no more dolls, stop (base case)`
      },
      {
        title: "Base case",
        content: `The base case is a condition that stops the recursion. Without a base case, the function will call itself infinitely, which leads to an error.

**Example without a base case (incorrect):**

\`\`\`python
def infinite_recursion(n):
    print(n)
    infinite_recursion(n - 1)  # No stopping condition!

# infinite_recursion(5)  # Raises error: maximum recursion depth
\`\`\`

**Example with a base case (correct):**

\`\`\`python
def countdown(n):
    if n <= 0:  # Base case
        print("Done!")
        return
    else:
        print(n)
        countdown(n - 1)  # Recursive call

countdown(5)  # Works correctly
\`\`\`

**Important points:**

1. **The base case must be reachable:**
\`\`\`python
def example(n):
    if n == 0:  # Base case
        return 0
    return example(n - 1)  # Moving toward the base case

example(5)  # Works: 5 → 4 → 3 → 2 → 1 → 0
\`\`\`

2. **The base case should be simple:**
\`\`\`python
def factorial(n):
    if n == 0 or n == 1:  # Simple base case
        return 1
    return n * factorial(n - 1)
\`\`\`

3. **There can be multiple base cases:**
\`\`\`python
def fibonacci(n):
    if n == 0:  # First base case
        return 0
    if n == 1:  # Second base case
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\``
      },
      {
        title: "Classic recursion examples",
        content: `**1. Factorial**

The factorial of a number n (written n!) is the product of all natural numbers from 1 to n.

\`\`\`python
def factorial(n):
    """
    Computes the factorial of n recursively
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

**2. Fibonacci numbers**

Each Fibonacci number is the sum of the two previous numbers.

\`\`\`python
def fibonacci(n):
    """
    Computes the nth Fibonacci number
    F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
    """
    # Base cases
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
    Computes the sum of numbers from 1 to n
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
    Computes the sum of list elements recursively
    """
    # Base case: empty list
    if len(numbers) == 0:
        return 0
    
    # Recursive case: first element + sum of the rest
    return numbers[0] + sum_list(numbers[1:])

# Usage
print(sum_list([1, 2, 3, 4, 5]))  # 15
\`\`\`

**2. Finding the maximum element**

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
    Reverses a list recursively
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
    Checks whether a list contains an element
    """
    # Base cases
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
    Checks whether a string is a palindrome (reads the same forwards and backwards)
    """
    # Remove spaces and convert to lowercase
    text = text.replace(" ", "").lower()
    
    # Base cases
    if len(text) <= 1:
        return True
    if text[0] != text[-1]:
        return False
    
    # Recursive case
    return is_palindrome(text[1:-1])

# Usage
print(is_palindrome("radar"))  # True
print(is_palindrome("hello"))  # False
print(is_palindrome("A man a plan a canal Panama"))  # True
\`\`\`

**2. Counting characters**

\`\`\`python
def count_char(text, char):
    """
    Counts how many times a character appears in a string
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

**3. Reversing a string**

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
        title: "Recursion depth and limits",
        content: `Python has a limit on recursion depth (by default around 1000 calls).

**Checking recursion depth:**

\`\`\`python
import sys

print(sys.getrecursionlimit())  # Usually 1000
\`\`\`

**Changing the limit (not recommended):**

\`\`\`python
import sys

sys.setrecursionlimit(2000)  # Increase the limit
\`\`\`

**Maximum recursion depth error:**

\`\`\`python
def infinite_like(n):
    if n == 0:
        return 0
    return infinite_like(n - 1)  # Will raise an error for large n

# infinite_like(2000)  # RecursionError: maximum recursion depth exceeded
\`\`\`

**How to avoid problems:**

1. **Make sure the base case is reachable:**
\`\`\`python
def good_recursion(n):
    if n <= 0:  # Base case is always reachable
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
# Regular recursion
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Needs to preserve context

# Tail recursion (more efficient)
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # No need to preserve context
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
- For tasks where readability matters more than performance

 **Better to avoid for:**
- Simple problems that are easy to solve iteratively
- When performance is important
- For very large data (risk of stack overflow)

**Advantages of recursion:**
- More readable code for complex problems
- A natural approach for some algorithms
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
# Correct
def example(n):
    if n <= 0:  # Base case
        return 0
    return example(n - 1)

# Incorrect
def example(n):
    return example(n - 1)  # No base case!
\`\`\`

**2. Make sure you are moving toward the base case**

\`\`\`python
# Correct
def countdown(n):
    if n <= 0:
        return
    countdown(n - 1)  # n decreases

# Incorrect
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

**4. Think of the problem as smaller subproblems**

\`\`\`python
# Problem: find the sum of a list
# Subproblem: first element + sum of the rest
def sum_list(numbers):
    if len(numbers) == 0:
        return 0
    return numbers[0] + sum_list(numbers[1:])
\`\`\`

**5. Test on small data first**

\`\`\`python
# First check with small values
print(factorial(5))  # 120
print(factorial(0))  # 1
print(factorial(1))  # 1

# Then with larger values
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
        content: `In this lesson we learned about recursion:

**Key concepts:**

1. **Recursion**
   - A function calls itself
   - Requires a base case and a recursive case

2. **Base case**
   - A condition that stops the recursion
   - Must be reachable and simple

3. **Recursive case**
   - The function calls itself
   - Must move toward the base case

4. **Classic examples**
   - Factorial
   - Fibonacci numbers
   - Traversing data structures

5. **Limitations**
   - Python has a recursion depth limit (~1000)
   - Can cause stack overflow

6. **Recursion vs Iteration**
   - Many problems can be solved both ways
   - Recursion is more readable for complex problems
   - Iteration is more efficient for simple problems

**Rules:**

- Always have a base case
- Move toward the base case
- Use it for naturally recursive problems
- Test on small data first

**Next step:**

In the next lesson we will learn about higher-order functions - functions that take other functions as arguments or return functions.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Simple recursion example",
      code: `def countdown(n):
    """
    Recursive countdown function
    """
    if n <= 0:  # Base case
        print("Done!")
    else:
        print(n)
        countdown(n - 1)  # Recursive call

countdown(5)`,
      explanation: "Demonstrates the basic structure of a recursive function: a base case and a recursive call."
    },
    {
      title: "Factorial",
      code: `def factorial(n):
    """
    Computes the factorial of n
    """
    if n == 0 or n == 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120`,
      explanation: "A classic recursion example - computing a factorial."
    },
    {
      title: "Fibonacci numbers",
      code: `def fibonacci(n):
    """
    Computes the nth Fibonacci number
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
    Computes the sum of list elements recursively
    """
    if len(numbers) == 0:  # Base case
        return 0
    return numbers[0] + sum_list(numbers[1:])  # Recursive case

print(sum_list([1, 2, 3, 4, 5]))  # 15`,
      explanation: "Shows how to use recursion when working with lists."
    },
    {
      title: "Palindrome check",
      code: `def is_palindrome(text):
    """
    Checks whether a string is a palindrome
    """
    text = text.replace(" ", "").lower()
    if len(text) <= 1:  # Base case
        return True
    if text[0] != text[-1]:  # Base case (not a palindrome)
        return False
    return is_palindrome(text[1:-1])  # Recursive case

print(is_palindrome("radar"))  # True`,
      explanation: "Demonstrates recursive palindrome checking with string processing."
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
      explanation: "Shows an optimized version of recursion using tail recursion."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Missing base case",
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
      mistake: "Unreachable base case",
      explanation: "The base case must be reachable, otherwise the recursion will never stop.",
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
      explanation: "If a function should return a value, you need return before the recursive call.",
      correctApproach: `# Incorrect:
def factorial(n):
    if n <= 1:
        return 1
    n * factorial(n - 1)  # Forgot return!

# Correct:
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Has return`
    },
    {
      mistake: "Inefficient recursion for simple problems",
      explanation: "For simple problems, iteration is often more efficient than recursion.",
      correctApproach: `# Recursion (may be slower)
def sum_recursive(n):
    if n == 0:
        return 0
    return n + sum_recursive(n - 1)

# Iteration (more efficient for simple problems)
def sum_iterative(n):
    result = 0
    for i in range(1, n + 1):
        result += i
    return result  # Faster and safer`
    }
  ],
  
  summary: `In this lesson we learned about recursion:

1. What recursion is
   - A function calls itself
   - Requires a base case and a recursive case

2. Base case
   - A condition that stops the recursion
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
   - Many problems can be solved both ways
   - Recursion is more readable for complex problems
   - Iteration is more efficient for simple problems

Recursion is a powerful tool for solving complex problems!`,
  
  practiceTask: {
    title: "Recursive functions for different tasks",
    description: "Create recursive functions for different types of problems",
    problemStatement: `Write a program with recursive functions:

1. **factorial** - computes the factorial of a number
   - Parameters: n (number)
   - Base case: n == 0 or n == 1 → returns 1
   - Recursive case: n * factorial(n - 1)

2. **sum_digits** - computes the sum of digits in a number
   - Parameters: n (number)
   - Base case: n < 10 → returns n
   - Recursive case: last digit + sum_digits(number without the last digit)

3. **count_occurrences** - counts how many times an element appears in a list
   - Parameters: items (list), target (element)
   - Base case: empty list → returns 0
   - Recursive case: check the first element + count_occurrences(rest of the list)

4. **is_palindrome** - checks whether a string is a palindrome
   - Parameters: text (string)
   - Base cases: length <= 1 → True, first != last → False
   - Recursive case: is_palindrome(string without first and last characters)

5. **power** - raises a number to a power
   - Parameters: base (base), exponent (exponent)
   - Base case: exponent == 0 → returns 1
   - Recursive case: base * power(base, exponent - 1)

**Important:** Do not use the input() function. Enter values directly in the code.

Create usage examples for all functions and print the results.`,
    outputFormat: `Example output:
Factorial of 5: 120
Sum of digits of 12345: 15
Occurrences of 2 in [1,2,3,2,4,2]: 3
"radar" is a palindrome: True
2^5 = 32`,
    examples: [
      {
        output: `Factorial of 5: 120
Sum of digits of 12345: 15
Occurrences of 2 in [1, 2, 3, 2, 4, 2]: 3
"radar" is a palindrome: True
"hello" is a palindrome: False
2^5 = 32`,
        explanation: "Demonstrates computing a factorial, sum of digits, and exponentiation."
      }
    ],
    solution: {
      code: `# Recursive functions for different tasks

def factorial(n):
    """
    Computes the factorial of n recursively
    """
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

def sum_digits(n):
    """
    Computes the sum of digits in a number recursively
    """
    # Base case
    if n < 10:
        return n
    
    # Recursive case: last digit + sum of the rest
    return (n % 10) + sum_digits(n // 10)

def count_occurrences(items, target):
    """
    Counts how many times an element appears in a list recursively
    """
    # Base case
    if len(items) == 0:
        return 0
    
    # Recursive case
    count = 1 if items[0] == target else 0
    return count + count_occurrences(items[1:], target)

def is_palindrome(text):
    """
    Checks whether a string is a palindrome recursively
    """
    # Remove spaces and convert to lowercase
    text = text.replace(" ", "").lower()
    
    # Base cases
    if len(text) <= 1:
        return True
    if text[0] != text[-1]:
        return False
    
    # Recursive case
    return is_palindrome(text[1:-1])

def power(base, exponent):
    """
    Raises a number to a power recursively
    """
    # Base case
    if exponent == 0:
        return 1
    if exponent == 1:
        return base
    
    # Recursive case
    return base * power(base, exponent - 1)

# Enter values directly in the code (do not use input())

# Example 1: Factorial
n = 5
fact_result = factorial(n)
print(f"Factorial of {n}: {fact_result}")

# Example 2: Sum of digits
number = 12345
sum_result = sum_digits(number)
print(f"Sum of digits of {number}: {sum_result}")

# Example 3: Count occurrences
numbers = [1, 2, 3, 2, 4, 2]
target = 2
count_result = count_occurrences(numbers, target)
print(f"Occurrences of {target} in {numbers}: {count_result}")

# Example 4: Palindrome check
text1 = "radar"
text2 = "hello"
palindrome1 = is_palindrome(text1)
palindrome2 = is_palindrome(text2)
print(f'"{text1}" is a palindrome: {palindrome1}')
print(f'"{text2}" is a palindrome: {palindrome2}')

# Example 5: Exponentiation
base = 2
exp = 5
power_result = power(base, exp)
print(f"{base}^{exp} = {power_result}")`,
      explanation: "The solution demonstrates different types of recursive functions: computing a factorial, sum of digits, counting occurrences, checking palindromes, and exponentiation. Each function has a clear base case and recursive case."
    },
    hints: [
      "Enter values directly in the code - do not use input()",
      "Always have a base case that stops the recursion",
      "Make sure the recursive case moves toward the base case",
      "For sum of digits, use n % 10 for the last digit and n // 10 for the rest",
      "For palindromes, remove spaces and convert to lowercase before checking",
      "For counting occurrences, check the first element and recursively process the rest of the list",
      "Remember to use return in recursive calls",
      "Test functions on small values first"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "120",
        description: "Factorial computation check"
      },
      {
        expectedOutput: "15",
        description: "Sum of digits check"
      },
      {
        expectedOutput: "3",
        description: "Occurrence count check"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is recursion?",
        options: [
          "A technique where a function calls itself",
          "A data type in Python",
          "A sorting method",
          "An object method"
        ],
        correctAnswer: 0,
        explanation: "Recursion is a programming technique where a function calls itself to solve a problem."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a base case in recursion?",
        options: [
          "A condition that stops the recursion",
          "The first function call",
          "The last function call",
          "A function parameter"
        ],
        correctAnswer: 0,
        explanation: "The base case is a condition that stops the recursion. Without it, the function will call itself infinitely."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(4))\n```",
        options: [
          "24",
          "10",
          "An error",
          "1"
        ],
        correctAnswer: 0,
        explanation: "factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens if a recursive function has no base case?",
        options: [
          "Infinite recursion and a maximum depth error",
          "The function will work normally",
          "The function will return None",
          "The function will run slower"
        ],
        correctAnswer: 0,
        explanation: "Without a base case, the function will call itself infinitely, leading to RecursionError: maximum recursion depth exceeded."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef countdown(n):\n    if n <= 0:\n        print(\"Done!\")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)\n```",
        options: [
          "3, 2, 1, Done!",
          "Done!, 1, 2, 3",
          "3, 2, 1",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "First 3 is printed, then countdown(2) is called and 2 is printed, then countdown(1) prints 1, then countdown(0) prints 'Done!'."
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
        explanation: "Recursion is better for complex data structures (trees, graphs) and problems that are naturally recursive. For simple problems, iteration is often more efficient."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef sum_list(numbers):\n    if len(numbers) == 0:\n        return 0\n    return numbers[0] + sum_list(numbers[1:])\n\nprint(sum_list([1, 2, 3]))\n```",
        options: [
          "6",
          "0",
          "An error",
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
        explanation: "Yes, a base case is required. Without it, recursion will be infinite and lead to an error."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
