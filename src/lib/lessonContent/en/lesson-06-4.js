/**
 * Lesson 06-4: Practice: decorator problems
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_06_4 = {
  lessonId: "lesson-06-4",
  moduleId: "module-06",
  order: 4,
  title: "Practice: decorator problems",

  learningObjectives: [
    "Consolidate understanding of decorator function mechanisms",
    "Create complex decorators with parameters and functools.wraps",
    "Combine stacked decorators for caching, timing, and validation",
    "Solve real-world practical challenges with decorators"
  ],

  prerequisites: ["lesson-06-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What we have learned",
        content: `In this lesson we will reinforce everything from module 06 about decorators:

What we covered:
1. Introduction to decorators - what they are and how to use them
2. Creating your own decorators - functools.wraps, parameterized decorators
3. Class and method decorators - @property, @staticmethod, @classmethod
4. Practical examples - logging, timing, validation

Goals for this lesson:
- Combine all concepts
- Build more advanced decorators
- Solve practical problems
- Strengthen programming skills`
      },
      {
        title: "Task 1: Repeat-execution decorator",
        content: `**Task:** Create a decorator that repeats a function call a given number of times.

**Solution:**

\`\`\`python
from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                result = func(*args, **kwargs)
                results.append(result)
            return results[-1]  # Return the last result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f'Hello, {name}!')
    return f'Hello, {name}!'

greet('Alexander')
# Hello, Alexander!
# Hello, Alexander!
# Hello, Alexander!
\`\`\`

**Improved version that can return all results:**

\`\`\`python
def repeat(times, return_all=False):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                result = func(*args, **kwargs)
                results.append(result)
            return results if return_all else results[-1]
        return wrapper
    return decorator
\`\`\``
      },
      {
        title: "Task 2: Error-handling decorator",
        content: `**Task:** Create a decorator that handles errors and retries on failure.

**Solution:**

\`\`\`python
from functools import wraps
import time

def retry(max_attempts=3, delay=1, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts:
                        print(f'Attempt {attempt} failed: {e}. Retrying in {delay}s...')
                        time.sleep(delay)
                    else:
                        print(f'All {max_attempts} attempts failed')
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
def risky_function():
    import random
    if random.random() < 0.7:  # 70% chance of error
        raise ValueError('Random error!')
    return 'Success!'

result = risky_function()
print(result)
\`\`\``
      },
      {
        title: "Task 3: Result-caching decorator",
        content: `**Task:** Create a decorator that caches function results (memoization).

**Solution:**

\`\`\`python
from functools import wraps

def cache(func):
    cache_dict = {}

    @wraps(func)
    def wrapper(*args, **kwargs):
        # Build a key from the arguments
        key = str(args) + str(sorted(kwargs.items()))

        if key in cache_dict:
            print(f'Using cache for {func.__name__}')
            return cache_dict[key]

        result = func(*args, **kwargs)
        cache_dict[key] = result
        print(f'Computed and stored in cache for {func.__name__}')
        return result

    # Add helpers to clear / inspect the cache
    wrapper.clear_cache = lambda: cache_dict.clear()
    wrapper.cache_info = lambda: {
        'size': len(cache_dict),
        'keys': list(cache_dict.keys())
    }

    return wrapper

@cache
def fibonacci(n):
    """Computes the n-th Fibonacci number"""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # Computes
print(fibonacci(10))  # Uses cache
print(fibonacci.cache_info())  # Cache info
\`\`\``
      },
      {
        title: "Task 4: Rate-limiting decorator",
        content: `**Task:** Create a decorator that limits how many times a function can be called in a given period.

**Solution:**

\`\`\`python
from functools import wraps
import time
from collections import deque

def rate_limit(max_calls, period):
    """Limits the number of calls within a time period"""
    def decorator(func):
        calls = deque()

        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Drop old calls
            while calls and calls[0] < now - period:
                calls.popleft()

            if len(calls) >= max_calls:
                wait_time = period - (now - calls[0])
                raise Exception(f'Rate limit exceeded. Wait {wait_time:.2f} seconds')

            calls.append(now)
            return func(*args, **kwargs)

        return wrapper
    return decorator

@rate_limit(max_calls=3, period=10)
def api_call():
    print('API call completed')
    return 'Success'

# First 3 calls work
for i in range(3):
    api_call()

# The 4th call raises an error
try:
    api_call()
except Exception as e:
    print(e)
\`\`\``
      },
      {
        title: "Task 5: Combining decorators",
        content: `**Task:** Create a function with several decorators for combined processing.

**Solution:**

\`\`\`python
from functools import wraps
import time
import datetime

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f'[{timestamp}] Calling {func.__name__}')
        result = func(*args, **kwargs)
        print(f'[{timestamp}] {func.__name__} finished')
        return result
    return wrapper

def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'{func.__name__} ran in {end - start:.4f} seconds')
        return result
    return wrapper

def cache(func):
    cache_dict = {}
    @wraps(func)
    def wrapper(*args, **kwargs):
        key = str(args) + str(sorted(kwargs.items()))
        if key in cache_dict:
            print(f'Using cache for {func.__name__}')
            return cache_dict[key]
        result = func(*args, **kwargs)
        cache_dict[key] = result
        return result
    return wrapper

@log_calls
@measure_time
@cache
def expensive_calculation(n):
    """Computes the sum of squares"""
    return sum(i ** 2 for i in range(n))

result1 = expensive_calculation(1000000)  # Computes, logs, measures
result2 = expensive_calculation(1000000)  # Uses cache, logs
\`\`\`

**Execution order:**
1. First @cache is applied (closest to the function)
2. Then @measure_time
3. Then @log_calls (outermost)
4. On call: log first, then measure, then cache, then the function`
      },
      {
        title: "Practical tips",
        content: `**When to use decorators:**

1. **Logging** - when you need to track function calls
2. **Performance measurement** - for optimizing code
3. **Caching** - for expensive computations
4. **Validation** - for checking input data
5. **Error handling** - for centralized handling
6. **Authorization** - for access checks
7. **Rate limiting** - for APIs and web apps

**Best practices:**

 Always use \`@wraps(func)\` to preserve metadata
 Document your decorators
 Handle errors inside decorators carefully
 Use *args and **kwargs for flexibility
 Test decorators separately
 Do not make decorators overly complex

**Avoid:**

 Decorators that change the function signature
 Decorators with side effects (unless needed)
 Too many nested decorators
 Undocumented decorators`
      }
    ]
  },

  codeExamples: [
    {
      title: "Example 1: Combined decorator",
      code: `from functools import wraps
import time

def smart_decorator(log=True, measure=True):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if log:
                print(f'Calling {func.__name__}')
            if measure:
                start = time.time()

            result = func(*args, **kwargs)

            if measure:
                end = time.time()
                print(f'Done in {end - start:.4f}s')
            return result
        return wrapper
    return decorator

@smart_decorator(log=True, measure=True)
def calculate(n):
    return sum(range(n))

calculate(1000000)`,
      explanation: "Shows a parameterized decorator for flexible behavior."
    },
    {
      title: "Example 2: Error-handling decorator",
      code: `from functools import wraps

def handle_errors(default_value=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                print(f'Error in {func.__name__}: {e}')
                return default_value
        return wrapper
    return decorator

@handle_errors(default_value=0)
def divide(a, b):
    return a / b

print(divide(10, 2))  # 5.0
print(divide(10, 0))   # 0 (returns default_value)`,
      explanation: "Shows an error-handling decorator with a default return value."
    },
    {
      title: "Example 3: Class decorator",
      code: `def add_repr(cls):
    def __repr__(self):
        attrs = ', '.join(f'{k}={v}' for k, v in self.__dict__.items())
        return f'{self.__class__.__name__}({attrs})'

    cls.__repr__ = __repr__
    return cls

@add_repr
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person('Alexander', 15)
print(p)  # Person(name=Alexander, age=15)`,
      explanation: "Shows a decorator that adds __repr__ to a class."
    }
  ],

  commonMistakes: [
    {
      mistake: "Not using @wraps in complex decorators",
      explanation: "Without @wraps the function loses metadata, which makes debugging harder.",
      correctApproach: "Always use @wraps(func) in every decorator."
    },
    {
      mistake: "Forgetting to return the result from wrapper",
      explanation: "If wrapper does not return func()'s result, the function yields None.",
      correctApproach: "Always return the result: return func(*args, **kwargs)"
    },
    {
      mistake: "Not handling errors in decorators",
      explanation: "Errors in decorators can hide the real function errors.",
      correctApproach: "Handle errors carefully without swallowing important exceptions."
    },
    {
      mistake: "Overly complex decorators",
      explanation: "Complex decorators are hard to test and maintain.",
      correctApproach: "Split complex decorators into simpler ones or use composition."
    }
  ],

  summary: `In this practice lesson we:

1. Reinforced knowledge - reviewed all decorator concepts
2. Built advanced decorators - repeat, retry, cache, rate_limit
3. Combined decorators - logging, timing, caching
4. Solved practical problems - real usage scenarios
5. Learned best practices - when and how to use decorators

You can now confidently create and use decorators in your projects!`,

  practiceTask: {
    title: "Creating simple decorators",
    description: "Create two simple decorators for logging and authorization",
    problemStatement: `Create two simple decorators:

1. **@log_function** - logs a function call with its name and time
2. **@require_auth** - checks the global is_authenticated flag

Read a time from stdin in HH:MM:SS format and use it in logs (instead of datetime.now()).

Then run three tests:
1. get_secret_data() without authorization
2. is_authenticated = True, then get_secret_data() again
3. get_public_data()

Input format:
10:30:45`,
    outputFormat: `=== Test 1: Without authorization ===
[10:30:45] Calling get_secret_data
Authorization required!
Result: None

=== Test 2: With authorization ===
[10:30:45] Calling get_secret_data
[10:30:45] get_secret_data finished
Result: Secret data

=== Test 3: Public function ===
[10:30:45] Calling get_public_data
[10:30:45] get_public_data finished
Result: Public data`,
    examples: [
      {
        input: `10:30:45`,
        output: `=== Test 1: Without authorization ===
[10:30:45] Calling get_secret_data
Authorization required!
Result: None

=== Test 2: With authorization ===
[10:30:45] Calling get_secret_data
[10:30:45] get_secret_data finished
Result: Secret data

=== Test 3: Public function ===
[10:30:45] Calling get_public_data
[10:30:45] get_public_data finished
Result: Public data`,
        explanation: "The stdin time is used in all logs; without auth the 'finished' line is not printed"
      },
      {
        input: `12:00:00`,
        output: `=== Test 1: Without authorization ===
[12:00:00] Calling get_secret_data
Authorization required!
Result: None

=== Test 2: With authorization ===
[12:00:00] Calling get_secret_data
[12:00:00] get_secret_data finished
Result: Secret data

=== Test 3: Public function ===
[12:00:00] Calling get_public_data
[12:00:00] get_public_data finished
Result: Public data`,
        explanation: "Same scenario with a different log timestamp"
      },
      {
        input: `09:15:30`,
        output: `=== Test 1: Without authorization ===
[09:15:30] Calling get_secret_data
Authorization required!
Result: None

=== Test 2: With authorization ===
[09:15:30] Calling get_secret_data
[09:15:30] get_secret_data finished
Result: Secret data

=== Test 3: Public function ===
[09:15:30] Calling get_public_data
[09:15:30] get_public_data finished
Result: Public data`,
        explanation: "Check with morning time 09:15:30"
      }
    ],
    solution: {
      code: `from functools import wraps

time_str = input().strip()
is_authenticated = False

def require_auth(func):
    """Checks authorization"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        global is_authenticated
        if not is_authenticated:
            print("Authorization required!")
            return None
        return func(*args, **kwargs)
    return wrapper

def log_function(func):
    """Logs a function call"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[{time_str}] Calling {func.__name__}")
        result = func(*args, **kwargs)
        if result is not None:
            print(f"[{time_str}] {func.__name__} finished")
        return result
    return wrapper

@log_function
@require_auth
def get_secret_data():
    return "Secret data"

@log_function
def get_public_data():
    return "Public data"

print("=== Test 1: Without authorization ===")
result = get_secret_data()
print(f"Result: {result}")
print()
print("=== Test 2: With authorization ===")
is_authenticated = True
result = get_secret_data()
print(f"Result: {result}")
print()
print("=== Test 3: Public function ===")
result = get_public_data()
print(f"Result: {result}")`,
      explanation: "Read the log time from stdin; @log_function and @require_auth work as before. validation.lineRules allow any HH:MM:SS."
    },
    hints: [
      "First read the time: time_str = input().strip()",
      "For @require_auth use global is_authenticated",
      "If authorization fails - print a message and return None",
      "Order: @log_function outside, @require_auth inside"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main purpose of decorators?",
        options: [
          "Increase speed",
          "Add functionality without changing the original code",
          "Reduce code size",
          "Delete functions"
        ],
        correctAnswer: 1,
        explanation: "The main goal of decorators is to add functionality to functions without changing their original code."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does @wraps do in a decorator?",
        options: [
          "Speeds up the function",
          "Preserves the original function's metadata",
          "Deletes the function",
          "Caches results"
        ],
        correctAnswer: 1,
        explanation: "@wraps preserves the name, documentation, and other metadata of the original function."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you create a decorator that takes parameters?",
        options: [
          "def decorator(param): return func",
          "You need an extra wrapper (factory)",
          "It is impossible",
          "Use lambda"
        ],
        correctAnswer: 1,
        explanation: "You need an extra wrapper: a function that takes parameters and returns a decorator."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "In what order do decorators @decorator1 @decorator2 run on a call?",
        options: [
          "decorator1, then decorator2, then the function",
          "decorator2, then decorator1, then the function",
          "Simultaneously",
          "Random"
        ],
        correctAnswer: 0,
        explanation: "Decorators run top-down on a call: first decorator1, then decorator2, then the function."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is memoization?",
        options: [
          "Caching function results",
          "Deleting functions",
          "Memory optimization",
          "Encryption"
        ],
        correctAnswer: 0,
        explanation: "Memoization is caching function results to avoid repeated computations."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Decorators can be applied only to functions.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Decorators can be applied to functions, methods, and classes."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
