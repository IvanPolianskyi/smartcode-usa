/**
 * Lesson 06-4: Practice: decorator exercises
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_06_4 = {
  lessonId: "lesson-06-4",
  moduleId: "module-06",
  order: 4,
  title: "Practice: problems with decorators",
  
  learningObjectives: [
    "Consolidate knowledge about decorators",
    "Create complex decorators",
    "Combine different decorators",
    "Solve practical problems"
  ],
  
  prerequisites: ["lesson-06-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Overview of the studied",
        content: `In this lesson, we will consolidate all the knowledge from module 06 about decorators:

What we learned:
1. Introduction to decorators - what are decorators and how to use them
2. Creating your own decorators - functools.wraps, decorators with parameters
3. Decorators of classes and methods - @property, @staticmethod, @classmethod
4. Practical validation: {
      exactLineCount: true,
      lineRules: [
        { pattern: /=== test 1: without authorization ===/i },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] calling get_secret_data/i },
        { pattern: /authorization required!/i },
        { pattern: /result: none/i },
        { pattern: /=== test 2: with authorization ===/i },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] calling get_secret_data/i },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] get_secret_data completed/i },
        { pattern: /result: secret data/i },
        { pattern: /=== test 3: public function ===/i },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] calling get_public_data/i },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] get_public_data completed/i },
        { pattern: /result: public data/i }
      ]
    },
    examples - logging, time measurement, validation

The purpose of this lesson:
- Combine all concepts
- Create more complex decorators
- Solve practical problems
- Improve programming skills`
      },
      {
        title: "Task 1: Decorator to repeat execution",
        content: `**Task:** Create a decorator that repeats the execution of a function a specified number of times.

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
            return results[-1] # Return the last result
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

**Improved version with ability to return all results:**

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
        title: "Task 2: Decorator for error handling",
        content: `**Task:** Create a decorator that handles errors and reruns on failure.

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
                        print(f'The {attempt} failed: {e}. Retry after {delay}s...')
                        time.sleep(delay)
                    otherwise:
                        print(f'All {max_attempts} attempts failed')
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
def risky_function():
    import random
    if random.random() < 0.7: # 70% chance of error
        raise ValueError('Random error!')
    return 'Success!'

result = risky_function()
print(result)
\`\`\``
      },
      {
        title: "Task 3: A decorator for caching results",
        content: `**Task:** Create a decorator to cache function results (memoization).

**Solution:**

\`\`\`python
from functools import wraps

def cache(func):
    cache_dict = {}
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        # We create a key from the arguments
        key = str(args) + str(sorted(kwargs.items()))
        
        if key in cache_dict:
            print(f'Using cache for {func.__name__}')
            return cache_dict[key]
        
        result = func(*args, **kwargs)
        cache_dict[key] = result
        print(f'Computed and cached for {func.__name__}')
        return result
    
    # Add a method to clear the cache
    wrapper.clear_cache = lambda: cache_dict.clear()
    wrapper.cache_info = lambda: {
        'size': len(cache_dict),
        'keys': list(cache_dict.keys())
    }
    
    return wrapper

@cache
def fibonacci(n):
    """Computes the nth Fibonacci number"""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10)) # Calculates
print(fibonacci(10)) # Uses the cache
print(fibonacci.cache_info()) # Cache info
\`\`\``
      },
      {
        title: "Task 4: A decorator to limit the rate of calls",
        content: `**Task:** Create a decorator that limits the number of function calls per time.

**Solution:**

\`\`\`python
from functools import wraps
import time
from collections import queue

def rate_limit(max_calls, period):
    """Limits the number of calls per time period"""
    def decorator(func):
        calls = queue()
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # We delete old calls
            while calls and calls[0] < now - period:
                calls.popleft()
            
            if len(calls) >= max_calls:
                wait_time = period - (now - calls[0])
                raise Exception(f'Limit exceeded. Please wait {wait_time:.2f} seconds')
            
            calls.append(now)
            return func(*args, **kwargs)
        
        return wrapper
    return decorator

@rate_limit(max_calls=3, period=10)
def api_call():
    print('API call completed')
    return 'Success'

# The first 3 calls work
for i in range(3):
    api_call()

# 4th call will throw an error
try:
    api_call()
except Exception as e:
    print
\`\`\``
      },
      {
        title: "Task 5: Combining decorators",
        content: `**Task:** Create a function with multiple decorators for complex processing.

**Solution:**

\`\`\`python
from functools import wraps
import time
import datetime

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f'[{timestamp}] Called by {func.__name__}')
        result = func(*args, **kwargs)
        print(f'[{timestamp}] {func.__name__} completed')
        return result
    return wrapper

def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'{func.__name__} completed in {end - start:.4f} seconds')
        return result
    return wrapper

def cache(func):
    cache_dict = {}
    @wraps(func)
    def wrapper(*args, **kwargs):
        key = str(args) + str(sorted(kwargs.items()))
        if key in cache_dict:
            print(f'Cache in use for {func.__name__}')
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

result1 = expensive_calculation(1000000) # Calculates, logs, measures
result2 = expensive_calculation(1000000) # Uses cache, logs
\`\`\`

**Performance procedure:**
1. @cache (closest to the function) is used first
2. Then @measure_time
3. Then @log_calls (farthest)
4. When called: first log, then measure, then cache, then function`
      },
      {
        title: "Practical advice",
        content: `**When to use decorators:**

1. **Logging** - when you need to track function calls
2. **Performance measurement** - to optimize the code
3. **Caching** - for expensive calculations
4. **Validation** - for checking input data
5. **Error processing** - for centralized processing
6. **Authorization** - to check access rights
7. **Speed limits** - for API and web applications

**Best practices:**

 Always use \`@wraps(func)\` to save metadata
 Document decorators
 Handle errors in decorators
 Use *args and **kwargs for flexibility
 Test decorators separately
 Don't make decorators too complex

**Avoid:**

 Decorators that change the signature of a function
 Decorators with side effects (if not needed)
 Too many nested decorators
 Decorators without documentation`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Complex decorator",
      code: `from functools import wraps
import time

def smart_decorator(log=True, measure=True):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if log:
                print(f'Called by {func.__name__}')
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
      explanation: "Demonstrates a decorator with options for flexible behavior customization."
    },
    {
      title: "Example 2: Decorator with error handling",
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

print(divide(10, 2)) # 5.0
print(divide(10, 0)) # 0 (returns default_value)`,
      explanation: "Shows a decorator for error handling with a default value."
    },
    {
      title: "Example 3: Decorator for the class",
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
print(p) # Person(name=Aleksandr, age=15)`,
      explanation: "Demonstrates a decorator that adds a __repr__ method to a class."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not use @wraps in complex decorators",
      explanation: "Without @wraps, the function loses metadata, making debugging difficult.",
      correctApproach: "Always use @wraps(func) in all decorators."
    },
    {
      mistake: "Forgetting to return the result to the wrapper",
      explanation: "If the wrapper does not return the result of func(), the function will return None.",
      correctApproach: "Always return the result: return func(*args, **kwargs)"
    },
    {
      mistake: "Do not handle errors in decorators",
      explanation: "Errors in decorators can hide real function errors.",
      correctApproach: "Handle errors carefully without hiding important exceptions."
    },
    {
      mistake: "Too complicated decorators",
      explanation: "Complex decorators are difficult to test and maintain.",
      correctApproach: "Break complex decorators into simpler ones or use a composition."
    }
  ],
  
  summary: `In this practical lesson we will:

1. Consolidated knowledge - repeated all concepts of decorators
2. We created complex decorators - repeat, retry, cache, rate_limit
3. Combined decorators - logging, measurement, caching
4. Solved practical problems - real scenarios of use
5. Learned best practices - when and how to use decorators

Now you can confidently create and use decorators in your projects!`,
  
  practiceTask: {
    title: "Creating simple decorators",
    description: "Create two simple decorators for login and authorization",
    problemStatement: `Create two simple decorators:

1. **@log_function** - logs the function call with its name and time
2. **@require_auth** - checks whether the user is authorized (simulation)

**Step 1:** Create a @log_function decorator that:
- Prints a message before calling the function
- Outputs a message after calling the function
- Shows function name and time

**Step 2:** Create a @require_auth decorator that:
- Checks the is_authenticated global variable
- If False, displays the message "Authorization required!" and does not call the function
- If True, calls the function normally

**Step 3:** Create two functions:
- get_secret_data() - requires authorization, returns "Secret Data"
- get_public_data() - public, returns "Public Data"

**Step 4:** Test:
- Call get_secret_data() without authorization (should output a message)
- Set is_authenticated = True
- Call get_secret_data() again (should work)
- Call get_public_data() (should always work)`,
    outputFormat: `Example of program output:
=== Test 1: No authorization ===
[10:30:45] Get_secret_data is called
Authorization required!
Result: None

=== Test 2: With authorization ===
[10:30:46] Calling get_secret_data
[10:30:46] get_secret_data completed
Result: Secret data

=== Test 3: Public function ===
[10:30:47] Calling get_public_data
[10:30:47] get_public_data completed
Result: Public data`,
    examples: [
      {
        output: `=== Test 1: No authorization ===
[10:30:45] Get_secret_data is called
Authorization required!
Result: None

=== Test 2: With authorization ===
[10:30:46] Calling get_secret_data
[10:30:46] get_secret_data completed
Result: Secret data

=== Test 3: Public function ===
[10:30:47] Calling get_public_data
[10:30:47] get_public_data completed
Result: Public data`,
        explanation: "Full output of the program with all tests. Please note: when a function is blocked due to lack of authorization, the 'completed' message is not displayed."
      }
    ],
    solution: {
      code: `from functools import wraps
import datetime

# Global variable for authorization
is_authenticated = False

def require_auth(func):
    """Checking authorization"""
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
        # We get the current time
        time_str = datetime.datetime.now().strftime("%H:%M:%S")
        
        # Log in before the call
        print(f"[{time_str}] Called by {func.__name__}")
        
        # Call the function
        result = func(*args, **kwargs)
        
        # We log in after the call only if the function was actually executed
        # (if result is not None, then the function has been executed)
        if result is not None:
            time_str = datetime.datetime.now().strftime("%H:%M:%S")
            print(f"[{time_str}] {func.__name__} completed")
        
        return result
    return wrapper

# We create functions with decorators
# Important: require_auth must be inside log_function
@log_function
@require_auth
def get_secret_data():
    return "Secret Data"

@log_function
def get_public_data():
    return "Public Data"

# Testing
print("=== Test 1: No authorization ===")
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
      explanation: "A simple example of two decorators: one for logging in, one for checking authorization. The order of the decorators is important: @log_function outside, @require_auth inside. We use @wraps to save function metadata."
    },
    hints: [
      "Start with a simple @log_function decorator - it just outputs a message before and after the call",
      "For @require_auth use global is_authenticated to access the global variable",
      "If authentication fails, just output a message and return None",
      "Don't forget to use @wraps(func) in both decorators",
      "You can apply both decorators to the same function: @log_function @require_auth"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main purpose of using decorators?",
        options: [
          "Increase speed",
          "Add functionality without changing code",
          "Reduce code size",
          "Remove features"
        ],
        correctAnswer: 1,
        explanation: "The main purpose of decorators is to add functionality to functions without changing their original code."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does @wraps do in the decorator?",
        options: [
          "Speeds up the function",
          "Preserves the metadata of the original function",
          "Deletes a function",
          "Caches the results"
        ],
        correctAnswer: 1,
        explanation: "@wraps preserves the name, documentation, and other metadata of the original function."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to create a decorator that takes parameters?",
        options: [
          "def decorator(param): return func",
          "An additional wrapper is required",
          "Impossible",
          "Use lambda"
        ],
        correctAnswer: 1,
        explanation: "An additional wrapper is required: a function that takes parameters and returns a decorator."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "In what order are decorators @decorator1 @decorator2 executed?",
        options: [
          "decorator1, then decorator2, then function",
          "decorator2, then decorator1, then function",
          "Simultaneously",
          "Random"
        ],
        correctAnswer: 0,
        explanation: "Decorators are executed from top to bottom: first decorator1, then decorator2, then function."
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
        explanation: "Memoization is a technique of caching function results to avoid repeated computations."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Decorators can only be applied to functions.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Decorators can be applied to functions, methods, and classes."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
