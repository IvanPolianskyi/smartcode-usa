/**
 * Lesson 07-3: Iterators and the iteration protocol
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_07_3 = {
  lessonId: "lesson-07-3",
  moduleId: "module-07",
  order: 3,
  title: "Iterators and the iteration protocol",
  
  learningObjectives: [
    "Understand the iteration protocol in Python",
    "Create your own iterators",
    "Use __iter__ and __next__",
    "Understand the difference between iterable objects and iterators"
  ],
  
  prerequisites: ["lesson-07-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are iterators?",
        content: `An iterator is an object that allows you to iterate through the elements of a sequence one at a time.

**Key concepts:**

1. **Iterable object (Iterable)** - an object that can be iterated over (list, string, dictionary)
2. **Iterator** - an object that actually performs iteration
3. **Iteration protocol** - rules that allow an object to be iterable

**How it works:**

\`\`\`python
# The list is an iterable object
numbers = [1, 2, 3]

# We get an iterator
iterator = iter(numbers)

# We use an iterator
print(next(iterator)) # 1
print(next(iterator)) # 2
print(next(iterator)) # 3
print(next(iterator)) # StopIteration
\`\`\`

**Built-in iterable objects:**

- Lists: \`[1, 2, 3]\`
- Strings: \`"hello"\`
- Dictionaries: \`{'a': 1, 'b': 2}\`
- range: \`range(10)\`
- Files: \`open('file.txt')\`

**For loop automatically:**

1. Calls \`iter()\` to get an iterator
2. Calls \`next()\` to get the values
3. Handles \`StopIteration\` to terminate`
      },
      {
        title: "Iteration protocol",
        content: `An iteration protocol is a set of methods that an object must implement in order to be iterable.

**Two protocol methods:**

1. **__iter__()** - returns an iterator
2. **__next__()** - returns the next value or calls StopIteration

**Simple iterator:**

\`\`\`python
class CountDown:
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self # An iterator is itself an iterator
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Usage
counter = CountDown(5)
for num in counter:
    print(num)
# Outputs: 5, 4, 3, 2, 1
\`\`\`

**How it works:**

1. \`for num in counter:\` calls \`iter(counter)\`
2. \`iter(counter)\` calls \`counter.__iter__()\`
3. Each iteration calls \`next(counter)\`
4. \`next(counter)\` calls \`counter.__next__()\`
5. When \`__next__()\` calls \`StopIteration\`, the loop ends`
      },
      {
        title: "Creating your own iterator",
        content: `Let's create some examples of custom iterators:

**Example 1: Iterator for Fibonacci numbers**

\`\`\`python
class Fibonacci:
    def __init__(self, limit):
        self.limit = limit
        self.a, self.b = 0, 1
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return result

# Usage
fib = Fibonacci(10)
for num in fib:
    print(num)
# Outputs: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Example 2: An Iterator for a Stepped Range**

\`\`\`python
class Range:
    def __init__(self, start, stop, step=1):
        self.start = start
        self.stop = stop
        self.step = step
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if (self.step > 0 and self.current >= self.stop) or \\
           (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        result = self.current
        self.current += self.step
        return result

# Usage
my_range = Range(0, 10, 2)
for num in my_range:
    print(num)
# Outputs: 0, 2, 4, 6, 8
\`\`\`

**Example 3: An iterator for traversing a list in reverse order**

\`\`\`python
class ReverseList:
    def __init__(self, items):
        self.items = items
        self.index = len(items) - 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index < 0:
            raise StopIteration
        result = self.items[self.index]
        self.index -= 1
        return result

# Usage
rev = ReverseList([1, 2, 3, 4, 5])
for num in rev:
    print(num)
# Outputs: 5, 4, 3, 2, 1
\`\`\``
      },
      {
        title: "The difference between an iterable object and an iterator",
        content: `It is important to understand the difference between an iterable object and an iterator:

**Iterable object (Iterable):**

- Has the \`__iter__()\` method
- Can create many iterators
- Can be used in a for loop many times

\`\`\`python
# The list is an iterable object
numbers = [1, 2, 3]

# Many iterators can be created
iter1 = iter(numbers)
iter2 = iter(numbers)

# Can be used many times
for number in numbers:
    print(num) # First time
for number in numbers:
    print(num) # Second time
\`\`\`

**Iterator:**

- Has methods \`__iter__()\` and \`__next__()\`
- Usually runs out after one use
- Stores iteration state

\`\`\`python
# An iterator
iterator = iter([1, 2, 3])

# We use it once
for num in iterator:
    print(num) # 1, 2, 3

# The second time is empty
for num in iterator:
    print(num) # Print nothing
\`\`\`

**Generators are iterators:**

\`\`\`python
def generator():
    yield 1
    yield 2
    yield 3

gen = generator()
print(hasattr(gen, '__iter__')) # True
print(hasattr(gen, '__next__')) # True

# The generator is running out
for num in gen:
    print(num) # 1, 2, 3
for num in gen:
    print(num) # Nothing
\`\`\``
      },
      {
        title: "iter() and next() functions",
        content: `Python provides built-in functions for working with iterators:

**iter() - getting an iterator:**

\`\`\`python
# From an iterable object
numbers = [1, 2, 3]
iterator = iter(numbers)

# From a function (creates a generator)
def gen():
    yield 1
    yield 2

iterator = iter(gen())

# From the line
text = "hello"
iterator = iter(text)
\`\`\`

**next() - getting the next value:**

\`\`\`python
numbers = [1, 2, 3]
iterator = iter(numbers)

print(next(iterator)) # 1
print(next(iterator)) # 2
print(next(iterator)) # 3
print(next(iterator)) # StopIteration
\`\`\`

**next() with default value:**

\`\`\`python
iterator = iter([1, 2, 3])

# We use all values
print(next(iterator)) # 1
print(next(iterator)) # 2
print(next(iterator)) # 3

# The next call will call StopIteration
# But you can specify a default value
print(next(iterator, 'End')) # 'End'
\`\`\`

**Checking if an object is iterable:**

\`\`\`python
def is_iterable(obj):
    try:
        iter(obj)
        return True
    except TypeError:
        return False

print(is_iterable([1, 2, 3])) # True
print(is_iterable("hello")) # True
print(is_iterable(123)) # False
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Iterator for even numbers**

\`\`\`python
class EvenNumbers:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        result = self.current
        self.current += 2
        return result

# Usage
evens = EvenNumbers(10)
for num in evens:
    print(num)
# Outputs: 0, 2, 4, 6, 8
\`\`\`

**Example 2: An Iterator for Squares**

\`\`\`python
class Squares:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        result = self.current ** 2
        self.current += 1
        return result

# Usage
squares = Squares(5)
for square in squares:
    print(square)
# Outputs: 1, 4, 9, 16, 25
\`\`\`

**Example 3: An iterator with a condition**

\`\`\`python
class FilteredNumbers:
    def __init__(self, limit, condition):
        self.limit = limit
        self.condition = condition
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        while self.current < self.limit:
            if self.condition(self.current):
                result = self.current
                self.current += 1
                return result
            self.current += 1
        raise StopIteration

# Usage
# Only numbers divisible by 3
filtered = FilteredNumbers(20, lambda x: x % 3 == 0)
for num in filtered:
    print(num)
# Outputs: 0, 3, 6, 9, 12, 15, 18
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we studied iterators and the iteration protocol:

**Key Concepts:**

1. **Iterable object** - an object that can be iterated over (has __iter__)
2. **Iterator** - an object that performs iteration (has __iter__ and __next__)
3. **Iteration protocol** - __iter__() and __next__() methods
4. **StopIteration** - an exception that signals the end of iteration

**Creating a custom iterator:**

\`\`\`python
class MyIterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        # Value generation logic
        if completion_condition:
            raise StopIteration
        return value
\`\`\`

**Features:**

- \`iter(obj)\` - get an iterator
- \`next(iterator)\` - get the next value

**Next step:**

In the next lesson, we will consolidate all knowledge about generators and iterators in practice.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "A simple iterator",
      code: `class CountDown:
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        result = self.current
        self.current -= 1
        return result

# Usage
counter = CountDown(5)
for num in counter:
    print(num)
# Outputs: 5, 4, 3, 2, 1`,
      explanation: "The simplest example of a custom iterator that counts down from start to 1."
    },
    {
      title: "Fibonacci number iterator",
      code: `class Fibonacci:
    def __init__(self, limit):
        self.limit = limit
        self.a, self.b = 0, 1
        self.count = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return result

# Usage
fib = Fibonacci(10)
for num in fib:
    print(num)
# Outputs: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34`,
      explanation: "An iterator that generates Fibonacci numbers up to a given limit."
    },
    {
      title: "Using iter() and next()",
      code: `numbers = [1, 2, 3]
iterator = iter(numbers)

print(next(iterator)) # 1
print(next(iterator)) # 2
print(next(iterator)) # 3
# print(next(iterator)) # StopIteration

# With default value
iterator = iter([1, 2])
print(next(iterator)) # 1
print(next(iterator)) # 2
print(next(iterator, 'End')) # 'End'`,
      explanation: "Demonstrates the use of the iter() and next() functions to work with iterators."
    },
    {
      title: "Difference between iterable and iterator",
      code: `# Iterable object (can be used many times)
numbers = [1, 2, 3]

for number in numbers:
    print(num) # 1, 2, 3
for number in numbers:
    print(num) # 1, 2, 3 (again)

# Iterator (exhaustible)
iterator = iter([1, 2, 3])
for num in iterator:
    print(num) # 1, 2, 3
for num in iterator:
    print(num) # Nothing (exhausted)`,
      explanation: "Shows the difference between an iterable object (can be used many times) and an iterator (exhaustible)."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call StopIteration",
      explanation: "If StopIteration is not called, the iterator will continue to return values.",
      correctApproach: `# Incorrect:
def __next__(self):
    return self.current # Always returns a single value

# Correct:
def __next__(self):
    if self.current > self.limit:
        raise StopIteration
    return self.current`
    },
    {
      mistake: "Attempting to use an iterator multiple times",
      explanation: "The iterator is exhausted after the first use.",
      correctApproach: `# Incorrect:
iterator = iter([1, 2, 3])
list1 = list(iterator) # Uses an iterator
list2 = list(iterator) # Empty! Iterator exhausted

# Correct:
numbers = [1, 2, 3]
list1 = list(iter(numbers)) # Create a new iterator
list2 = list(iter(numbers)) # Create a new iterator`
    },
    {
      mistake: "Do not implement __iter__()",
      explanation: "Without __iter__(), the object cannot be used in a for loop.",
      correctApproach: `# Incorrect:
class MyIterator:
    def __next__(self):
        return 1

# Correct:
class MyIterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        return 1`
    },
    {
      mistake: "Confusion between an iterable object and an iterator",
      explanation: "An iterable object has __iter__(), an iterator has __iter__() and __next__().",
      correctApproach: `# Iterable object (creates a new iterator each time)
class Iterable:
    def __iter__(self):
        return Iterator()

# Iterator (keeps state)
class Iterator:
    def __iter__(self):
        return self
    
    def __next__(self):
        # Generates a value
        pass`
    }
  ],
  
  summary: `In this lesson, we studied iterators and the iteration protocol:

1. Iterable objects and iterators - difference and use
2. Iteration protocol - methods __iter__() and __next__()
3. Creation of own iterators - classes with protocol implementation
4. Functions iter() and next() - work with iterators
5. StopIteration - signaling the end of iteration

Iterators are the basis of working with sequences in Python. Understanding the iteration protocol allows you to create powerful and efficient objects.`,
  
  practiceTask: {
    title: "Creating custom iterators",
    description: "Create multiple custom iterators with iteration protocol implementations",
    problemStatement: `Create three iterator classes:

1. **SquareIterator(limit)** - an iterator that generates squares of numbers from 1 to limit
   - Example: for limit=5 should generate: 1, 4, 9, 16, 25

2. **EvenIterator(limit)** - an iterator that generates even numbers from 0 to limit
   - Example: for limit=10 should generate: 0, 2, 4, 6, 8, 10

3. **ReverseIterator(items)** - an iterator that goes around the list in reverse order
   - Example: for [1, 2, 3, 4] should generate: 4, 3, 2, 1

**Requirements:**
- Each class must implement __iter__() and __next__() methods
- __next__() should call StopIteration when values have run out
- Test each iterator using a for loop
- Enter values directly in code (don't use input())`,
    outputFormat: `Output example:

=== Squares of numbers ===
1
4
9
16
25

=== Even numbers ===
0
2
4
6
8
10

=== Reverse order ===
4
3
2
1`,
    examples: [
      {
        output: `=== Squares of numbers ===
1
4
9
16
25

=== Even numbers ===
0
2
4
6
8
10

=== Reverse order ===
4
3
2
1`,
        explanation: "Demonstrates the operation of all three iterators with different parameters."
      }
    ],
    solution: {
      code: `# 1. Iterator of squares
class SquareIterator:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        result = self.current ** 2
        self.current += 1
        return result

# 2. Iterator of even numbers
class EvenIterator:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        result = self.current
        self.current += 2
        return result

# 3. Reverse iterator
class ReverseIterator:
    def __init__(self, items):
        self.items = items
        self.index = len(items) - 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index < 0:
            raise StopIteration
        result = self.items[self.index]
        self.index -= 1
        return result

# Testing
print("=== Squares of numbers ===")
squares = SquareIterator(5)
for square in squares:
    print(square)

print()
print("=== Even numbers ===")
evens = EvenIterator(10)
for num in evens:
    print(num)

print()
print("=== Reverse order ===")
reverse = ReverseIterator([1, 2, 3, 4])
for num in reverse:
    print(num)`,
      explanation: "The solution creates three iterator classes, each of which implements the iteration protocol through the __iter__() and __next__() methods. Each iterator saves its state and calls StopIteration when it runs out of values."
    },
    hints: [
      "Every class must have __init__ to initialize state",
      "The __iter__() method must return self (an iterator is itself an iterator)",
      "The __next__() method should check the termination condition and call raise StopIteration",
      "For SquareIterator, store the current number and increment it",
      "For EvenIterator, increase current by 2",
      "For ReverseIterator, keep the index and decrement it"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is an iterator?",
        options: [
          "An object that allows you to iterate through elements one at a time",
          "List of values",
          "Function for loops",
          "Data type"
        ],
        correctAnswer: 0,
        explanation: "An iterator is an object that allows you to iterate through the elements of a sequence one by one through the iteration protocol."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What methods should an iterator implement?",
        options: [
          "__iter__() and __next__()",
          "Only __iter__()",
          "Only __next__()",
          "iter() and next()"
        ],
        correctAnswer: 0,
        explanation: "An iterator must implement both methods: __iter__() (returns an iterator) and __next__() (returns the next value)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\\n\\n```python\\niterator = iter([1, 2, 3])\\nfor x in iterator:\\n print(x)\\nfor x in iterator:\\n print(x)\\n```",
        options: [
          "1, 2, 3 (the second cycle will not output anything)",
          "1, 2, 3, 1, 2, 3",
          "mistake",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "The iterator is exhausted after the first use. The second loop will not output anything because the iterator is already exhausted."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is StopIteration?",
        options: [
          "An exception that signals the end of an iteration",
          "Iterator method",
          "Stop function",
          "Data type"
        ],
        correctAnswer: 0,
        explanation: "StopIteration is an exception that is thrown when an iterator has no more values to return."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does the iter() function do?",
        options: [
          "Gets an iterator from an iterable object",
          "Creates a list",
          "Causes an error",
          "Stops the iteration"
        ],
        correctAnswer: 0,
        explanation: "The iter() function gets an iterator from an iterable object by calling its __iter__() method."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between an iterable object and an iterator?",
        options: [
          "An iterable object has __iter__(), an iterator has __iter__() and __next__()",
          "There is no difference",
          "An iterator has __iter__(), an iterable object has __next__()",
          "An iterable object cannot be used in a for loop"
        ],
        correctAnswer: 0,
        explanation: "An iterable object has a __iter__() method and can create an iterator. An iterator has both __iter__() and __next__() methods and stores the iteration state."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A generator is an iterator.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "True. The generator implements the iteration protocol (has __iter__() and __next__()), so it is an iterator."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens if you don't call StopIteration in __next__()?",
        options: [
          "The iterator will continue to return values",
          "An error will occur",
          "The iterator will stop automatically",
          "Nothing will happen"
        ],
        correctAnswer: 0,
        explanation: "If you don't call StopIteration, the iterator will continue to return values, which can lead to an infinite loop."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

