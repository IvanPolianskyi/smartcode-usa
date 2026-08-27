/**
 * Lesson 02-7: Practice: algorithmic problems
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_02_7 = {
  lessonId: "lesson-02-7",
  moduleId: "module-02",
  order: 7,
  title: "Practice: algorithmic problems",
  
  learningObjectives: [
    "Solve algorithmic problems",
    "Apply loops and conditions",
    "Analyze algorithm complexity",
    "Practice writing efficient code"
  ],
  
  prerequisites: ["lesson-02-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Approach to solving algorithmic problems",
        content: `**Steps for solving a problem:**

1. **Understand the problem**
   - Read the statement carefully
   - Identify what you need to find
   - Understand the input and output

2. **Plan the solution**
   - Break the problem into subproblems
   - Decide which data structures you need
   - Think about the algorithm

3. **Implement**
   - Write the code step by step
   - Test on simple examples
   - Check edge cases

4. **Optimize**
   - Check whether you can simplify
   - Think about efficiency
   - Make sure the code is readable`
      },
      {
        title: "Problem 1: Finding the maximum",
        content: `**Statement:** Find the maximum number in a list.

**Approach:**
1. Store the first element as the current maximum
2. Walk through all elements
3. If you find a larger one - update the maximum

**Solution:**
\`\`\`python
numbers = [5, 2, 8, 1, 9, 3]
max_number = numbers[0]

for number in numbers:
    if number > max_number:
        max_number = number

print(f"Maximum: {max_number}")
\`\`\`

**Alternative with max():**
\`\`\`python
max_number = max(numbers)
\`\`\`

**But it is important to understand how it works!**`
      },
      {
        title: "Problem 2: Counting elements",
        content: `**Statement:** Count how many times each number appears.

**Approach:**
1. Use a dictionary to store counts
2. Walk through the list
3. Increase the counter for each element

**Solution:**
\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4, 5]
counts = {}

for number in numbers:
    if number in counts:
        counts[number] += 1
    else:
        counts[number] = 1

print(counts)  # {1: 1, 2: 2, 3: 3, 4: 1, 5: 1}
\`\`\`

**Optimization with get():**
\`\`\`python
for number in numbers:
    counts[number] = counts.get(number, 0) + 1
\`\`\``
      },
      {
        title: "Problem 3: Palindrome check",
        content: `**Statement:** Check whether a string is a palindrome (reads the same forwards and backwards).

**Approach:**
1. Compare characters from the start and the end
2. Move toward the center
3. If all pairs match - it is a palindrome

**Solution:**
\`\`\`python
text = "radar"
is_palindrome = True

for i in range(len(text) // 2):
    if text[i] != text[len(text) - 1 - i]:
        is_palindrome = False
        break

if is_palindrome:
    print(f"'{text}' is a palindrome")
else:
    print(f"'{text}' is not a palindrome")
\`\`\`

**Alternative:**
\`\`\`python
is_palindrome = text == text[::-1]
\`\`\``
      },
      {
        title: "Problem 4: Fibonacci",
        content: `**Statement:** Generate the first n Fibonacci numbers.

**Sequence:** 0, 1, 1, 2, 3, 5, 8, 13, ...
**Rule:** Each number = sum of the two previous ones

**Solution:**
\`\`\`python
n = 10
fibonacci = [0, 1]

for i in range(2, n):
    next_number = fibonacci[i-1] + fibonacci[i-2]
    fibonacci.append(next_number)

print(fibonacci)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

**Alternative with while:**
\`\`\`python
fibonacci = [0, 1]
while len(fibonacci) < n:
    fibonacci.append(fibonacci[-1] + fibonacci[-2])
\`\`\``
      },
      {
        title: "Problem 5: Bubble Sort",
        content: `**Statement:** Sort a list in ascending order.

**Algorithm:**
1. Compare neighboring elements
2. If the order is wrong - swap them
3. Repeat until sorted

**Solution:**
\`\`\`python
numbers = [64, 34, 25, 12, 22, 11, 90]
n = len(numbers)

for i in range(n):
    for j in range(0, n - i - 1):
        if numbers[j] > numbers[j + 1]:
            numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

print(numbers)  # [11, 12, 22, 25, 34, 64, 90]
\`\`\`

**Complexity:** O(n²) - not the most efficient, but simple to understand.`
      },
      {
        title: "Practice tips",
        content: `**1. Start simple**
- Solve the problem the simplest way first
- Then optimize if needed

**2. Test on different data**
- Simple cases
- Edge cases (empty list, one element)
- Large data

**3. Analyze complexity**
- How many operations run?
- Can you make it faster?

**4. Read other solutions**
- Learn from other approaches
- Compare different algorithms

**5. Practice regularly**
- Solve problems every day
- Gradually increase difficulty`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Finding the maximum",
      code: `# Finding the maximum manually
numbers = [5, 2, 8, 1, 9, 3]
max_number = numbers[0]

for number in numbers:
    if number > max_number:
        max_number = number

print(f"Maximum: {max_number}")`,
      explanation: "Demonstrates a maximum-finding algorithm without using the built-in function."
    },
    {
      title: "Example 2: Counting elements",
      code: `# Counting element frequency
numbers = [1, 2, 2, 3, 3, 3, 4]
counts = {}

for number in numbers:
    counts[number] = counts.get(number, 0) + 1

print(counts)`,
      explanation: "Shows how to count how many times each element appears."
    },
    {
      title: "Example 3: Palindrome check",
      code: `# Check whether a string is a palindrome
text = "radar"
is_palindrome = True

for i in range(len(text) // 2):
    if text[i] != text[len(text) - 1 - i]:
        is_palindrome = False
        break

print(f"Palindrome: {is_palindrome}")`,
      explanation: "Demonstrates a palindrome-checking algorithm."
    },
    {
      title: "Example 4: Fibonacci numbers",
      code: `# Generating Fibonacci numbers
n = 10
fibonacci = [0, 1]

for i in range(2, n):
    fibonacci.append(fibonacci[i-1] + fibonacci[i-2])

print(fibonacci)`,
      explanation: "Shows how to generate the Fibonacci sequence."
    },
    {
      title: "Example 5: Sorting",
      code: `# Bubble Sort
numbers = [64, 34, 25, 12, 22]
n = len(numbers)

for i in range(n):
    for j in range(0, n - i - 1):
        if numbers[j] > numbers[j + 1]:
            numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

print(numbers)`,
      explanation: "Demonstrates the bubble sort algorithm."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not considering edge cases",
      explanation: "Empty list, one element, identical elements - all need to be checked.",
      correctApproach: "Always test edge cases: [], [1], [1,1,1]"
    },
    {
      mistake: "Overly complex logic",
      explanation: "Sometimes a simpler solution is better than a complex one.",
      correctApproach: "Start simple, then optimize if needed"
    },
    {
      mistake: "Inefficient algorithms",
      explanation: "Large data needs efficient algorithms.",
      correctApproach: "Analyze complexity: O(n) is better than O(n²)"
    },
    {
      mistake: "Not testing code",
      explanation: "Code may work on some data and fail on others.",
      correctApproach: "Always test on different inputs"
    }
  ],
  
  summary: `In this lesson we practiced:

1. Approach to problems - understand, plan, implement, optimize
2. Finding the maximum - algorithm for the largest element
3. Counting elements - using dictionaries for statistics
4. Palindrome check - symmetry-checking algorithm
5. Fibonacci numbers - generating sequences
6. Sorting - basic sorting algorithms
7. Practical tips - how to improve your skills

Practice is the key to success in programming!

Next lesson - more practice problems!`,
  
  practiceTask: {
    title: "Text analysis system",
    description: "Create a program that analyzes text",
    problemStatement: `Write a program that:
1. Reads a line of text
2. Counts the total number of words and the number of unique words
3. Finds the longest word (on a tie - the first from the left)
4. Finds the word that appears most often (on a tie - the first with the maximum frequency in order of appearance; take the first maximum while looping over words in appearance order)
5. Prints the results

Input format:
Python is great Python is fun`,
    outputFormat: `Total words: 6
Unique words: 4
Longest word: Python
Most frequent word: Python (2 times)`,
    examples: [
      {
        input: `Python is great Python is fun`,
        output: `Total words: 6
Unique words: 4
Longest word: Python
Most frequent word: Python (2 times)`,
        explanation: "6 words, 4 unique; Python is longest and most frequent (2)"
      },
      {
        input: `a bb ccc bb`,
        output: `Total words: 4
Unique words: 3
Longest word: ccc
Most frequent word: bb (2 times)`,
        explanation: "ccc has length 3; bb appears twice"
      },
      {
        input: `hello world`,
        output: `Total words: 2
Unique words: 2
Longest word: hello
Most frequent word: hello (1 times)`,
        explanation: "On equal frequency, take the first word with max frequency"
      }
    ],
    solution: {
      code: `text = input().strip()
words = text.split()

total_words = len(words)
print(f"Total words: {total_words}")

unique_words = len(set(words))
print(f"Unique words: {unique_words}")

longest_word = words[0]
for word in words:
    if len(word) > len(longest_word):
        longest_word = word
print(f"Longest word: {longest_word}")

word_counts = {}
for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

most_common = words[0]
max_count = word_counts[most_common]
for word in words:
    if word_counts[word] > max_count:
        most_common = word
        max_count = word_counts[word]

print(f"Most frequent word: {most_common} ({max_count} times)")`,
      explanation: "Read text, split with split(), count unique via set and frequencies via a dictionary."
    },
    hints: [
      "Read text: text = input().strip()",
      "Use text.split() and set(words)",
      "Find the longest word by comparing len()",
      "For frequency use a dictionary and a loop"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the first step in solving an algorithmic problem?",
        options: [
          "Write the code",
          "Understand the problem",
          "Optimize",
          "Test"
        ],
        correctAnswer: 1,
        explanation: "First understand the problem, then plan, implement, and test."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code find?\n\n```python\nnumbers = [5, 2, 8, 1]\nmax_num = numbers[0]\nfor n in numbers:\n    if n > max_num:\n        max_num = n\n```",
        options: [
          "Minimum",
          "Maximum",
          "Average",
          "Sum"
        ],
        correctAnswer: 1,
        explanation: "The code finds the maximum number by comparing each element with the current maximum."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the complexity of Bubble Sort?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(1)"
        ],
        correctAnswer: 2,
        explanation: "Bubble Sort has O(n²) complexity because of nested loops."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code do?\n\n```python\nfib = [0, 1]\nfor i in range(2, 5):\n    fib.append(fib[i-1] + fib[i-2])\n```",
        options: [
          "Creates [0, 1, 1, 2, 3]",
          "Creates [0, 1, 2, 3, 4]",
          "Creates [1, 1, 2, 3, 5]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "Generates Fibonacci numbers: 0, 1, 1(0+1), 2(1+1), 3(1+2)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to test edge cases?",
        options: [
          "So the code works on all data",
          "To find bugs",
          "Both options are correct",
          "It is not important"
        ],
        correctAnswer: 2,
        explanation: "Edge cases often reveal bugs that are not visible on normal data."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
