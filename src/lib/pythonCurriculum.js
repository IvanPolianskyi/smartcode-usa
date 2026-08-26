/**
 * Full Curriculum for "Complete Python 3 Bootcamp" (English Version)
 *
 * Structure aligned with Pierian Data's Complete Python 3 Bootcamp.
 * Python course: complete learning program.
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const pythonCurriculum = {
  courseId: "python-developer-zero-to-junior",
  title: "Python: From Your First Program to Real Projects",
  
  modules: [
    {
      moduleId: "module-00",
      order: 0,
      title: "00 - Python Objects and Data Structures",
      description: "Foundations of objects and data structures: variables, data types, lists, dictionaries, tuples, and sets",
      duration: { weeks: 3, lessons: 8 },
      learningOutcomes: [
        "Understand Python objects and data types",
        "Work with variables and assignment",
        "Create and manipulate lists, dictionaries, tuples, and sets",
        "Understand mutability and immutability"
      ],
      lessons: [
        {
          lessonId: "lesson-00-1",
          order: 1,
          title: "Introduction to Python. Setup and Your First Program",
          learningObjectives: [
            "Install Python on your computer",
            "Set up a development environment",
            "Write your first 'Hello, World!' program",
            "Understand the structure of Python code"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "lesson-00-2",
          order: 2,
          title: "Variables and Data Types: int, float, str, bool",
          learningObjectives: [
            "Understand the concept of variables",
            "Learn the core data types: int, float, str, bool",
            "Convert between types",
            "Use variables in programs"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-00-1"]
        },
        {
          lessonId: "lesson-00-3",
          order: 3,
          title: "Lists: Creating, Indexing, and Methods",
          learningObjectives: [
            "Create and modify lists",
            "Use indexing and slicing",
            "Apply list methods",
            "Work with list comprehensions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-2"]
        },
        {
          lessonId: "lesson-00-4",
          order: 4,
          title: "Dictionaries (dict): Keys, Values, and Methods",
          learningObjectives: [
            "Create and modify dictionaries",
            "Access values by key",
            "Use dictionary methods",
            "Iterate over dictionaries"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-3"]
        },
        {
          lessonId: "lesson-00-5",
          order: 5,
          title: "Tuples and Sets",
          learningObjectives: [
            "Understand the difference between lists and tuples",
            "Create and use tuples",
            "Understand the difference between sets and lists",
            "Use set operations"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-4"]
        },
        {
          lessonId: "lesson-00-6",
          order: 6,
          title: "Strings (str): Methods, Formatting, and Indexing",
          learningObjectives: [
            "Manipulate strings",
            "Use string methods",
            "Format strings (f-strings, format)",
            "Work with string indexing and slicing"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-5"]
        },
        {
          lessonId: "lesson-00-7",
          order: 7,
          title: "Nested Data Structures",
          learningObjectives: [
            "Create nested lists and dictionaries",
            "Access nested data",
            "Manipulate complex structures",
            "Apply them to real-world tasks"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-6"]
        },
        {
          lessonId: "lesson-00-8",
          order: 8,
          title: "Practice: Objects and Data Structures Exercises",
          learningObjectives: [
            "Solve practical problems with objects",
            "Apply everything you've learned so far",
            "Analyze and optimize solutions",
            "Practice working with data"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-00-7"]
        }
      ]
    },
    {
      moduleId: "module-01",
      order: 1,
      title: "01 - Python Comparison Operators",
      description: "Comparison and logical operators for building conditions",
      duration: { weeks: 1, lessons: 3 },
      learningOutcomes: [
        "Use comparison operators",
        "Understand logical operators",
        "Work with boolean values",
        "Build complex conditions"
      ],
      lessons: [
        {
          lessonId: "lesson-01-1",
          order: 1,
          title: "Comparison Operators: ==, !=, <, >, <=, >=",
          learningObjectives: [
            "Use comparison operators",
            "Compare different data types",
            "Understand comparison results",
            "Apply comparisons across data structures"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-00-8"]
        },
        {
          lessonId: "lesson-01-2",
          order: 2,
          title: "Logical Operators: and, or, not",
          learningObjectives: [
            "Use the logical operators and, or, not",
            "Build complex conditions",
            "Understand operator precedence",
            "Apply logical operations"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-01-1"]
        },
        {
          lessonId: "lesson-01-3",
          order: 3,
          title: "Practice: Comparison Operator Exercises",
          learningObjectives: [
            "Solve practical comparison problems",
            "Apply logical operators",
            "Build complex conditions",
            "Practice writing conditional expressions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-01-2"]
        }
      ]
    },
    {
      moduleId: "module-02",
      order: 2,
      title: "02 - Python Statements",
      description: "Conditional statements if/elif/else and for/while loops for controlling program flow",
      duration: { weeks: 3, lessons: 8 },
      learningOutcomes: [
        "Use if/elif/else conditionals",
        "Work with for and while loops",
        "Control loop execution",
        "Solve algorithmic problems"
      ],
      lessons: [
        {
          lessonId: "lesson-02-1",
          order: 1,
          title: "Conditionals: if / elif / else",
          learningObjectives: [
            "Understand conditional logic",
            "Use if, elif, and else",
            "Work with nested conditions",
            "Apply the ternary operator"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-01-3"]
        },
        {
          lessonId: "lesson-02-2",
          order: 2,
          title: "The while Loop",
          learningObjectives: [
            "Use the while loop",
            "Control loop exit conditions",
            "Avoid infinite loops",
            "Apply while to different problems"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-1"]
        },
        {
          lessonId: "lesson-02-3",
          order: 3,
          title: "The for Loop and range()",
          learningObjectives: [
            "Use for loops for iteration",
            "Apply the range() function",
            "Iterate over sequences",
            "Work with enumerate() and zip()"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-2"]
        },
        {
          lessonId: "lesson-02-4",
          order: 4,
          title: "break, continue, and else in Loops",
          learningObjectives: [
            "Use break to exit a loop",
            "Apply continue to skip an iteration",
            "Understand else on loops",
            "Control loop execution"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-02-3"]
        },
        {
          lessonId: "lesson-02-5",
          order: 5,
          title: "Nested Loops and Conditionals",
          learningObjectives: [
            "Create nested loops",
            "Combine loops with conditionals",
            "Understand the complexity of nested loops",
            "Optimize nested constructs"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-4"]
        },
        {
          lessonId: "lesson-02-6",
          order: 6,
          title: "List Comprehensions",
          learningObjectives: [
            "Create list comprehensions",
            "Use conditional comprehensions",
            "Write nested list comprehensions",
            "Optimize code with comprehensions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-5"]
        },
        {
          lessonId: "lesson-02-7",
          order: 7,
          title: "Practice: Algorithmic Problems",
          learningObjectives: [
            "Solve algorithmic problems",
            "Apply loops and conditionals",
            "Analyze algorithm complexity",
            "Practice writing efficient code"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-02-6"]
        },
        {
          lessonId: "lesson-02-8",
          order: 8,
          title: "Practice: Extra Statement Exercises",
          learningObjectives: [
            "Reinforce your knowledge of statements",
            "Solve more challenging problems",
            "Combine different kinds of statements",
            "Prepare for your first project"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-02-7"]
        }
      ]
    },
    {
      moduleId: "module-03",
      order: 3,
      title: "03 - Methods and Functions",
      description: "Writing functions, object methods, lambda functions, and scope",
      duration: { weeks: 4, lessons: 10 },
      learningOutcomes: [
        "Create and use functions",
        "Understand object methods",
        "Use lambda functions",
        "Understand variable scope"
      ],
      lessons: [
        {
          lessonId: "lesson-03-1",
          order: 1,
          title: "Functions: Definition and Calls",
          learningObjectives: [
            "Define and call functions",
            "Pass arguments",
            "Return values",
            "Understand default parameters"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-8"]
        },
        {
          lessonId: "lesson-03-2",
          order: 2,
          title: "Parameters, return, and None",
          learningObjectives: [
            "Understand the difference between parameters and arguments",
            "Use return to send values back",
            "Understand None and when it appears",
            "Write functions with different return types"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-1"]
        },
        {
          lessonId: "lesson-03-3",
          order: 3,
          title: "Positional and Keyword Arguments",
          learningObjectives: [
            "Use positional arguments",
            "Apply keyword arguments",
            "Combine different argument styles",
            "Understand argument order"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-2"]
        },
        {
          lessonId: "lesson-03-4",
          order: 4,
          title: "*args and **kwargs",
          learningObjectives: [
            "Use *args for a variable number of arguments",
            "Apply **kwargs for keyword arguments",
            "Combine different argument types",
            "Unpack arguments"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-3"]
        },
        {
          lessonId: "lesson-03-5",
          order: 5,
          title: "Object Methods: Strings, Lists, and Dictionaries",
          learningObjectives: [
            "Use string methods",
            "Apply list methods",
            "Work with dictionary methods",
            "Understand the difference between functions and methods"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-4"]
        },
        {
          lessonId: "lesson-03-6",
          order: 6,
          title: "Lambda Functions",
          learningObjectives: [
            "Create lambda functions",
            "Use lambda with map(), filter(), and sorted()",
            "Treat functions as objects",
            "Know when to use lambda"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-5"]
        },
        {
          lessonId: "lesson-03-7",
          order: 7,
          title: "Variable Scope",
          learningObjectives: [
            "Understand local and global scope",
            "Use the global keyword",
            "Avoid name conflicts",
            "Work with nonlocal"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-6"]
        },
        {
          lessonId: "lesson-03-8",
          order: 8,
          title: "Recursion",
          learningObjectives: [
            "Understand the concept of recursion",
            "Write recursive functions",
            "Solve problems recursively",
            "Avoid infinite recursion"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-7"]
        },
        {
          lessonId: "lesson-03-9",
          order: 9,
          title: "Higher-Order Functions: map, filter, reduce",
          learningObjectives: [
            "Use map() for transformations",
            "Apply filter() for filtering",
            "Use reduce() for reduction",
            "Combine higher-order functions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-8"]
        },
        {
          lessonId: "lesson-03-10",
          order: 10,
          title: "Practice: Writing Functions",
          learningObjectives: [
            "Write more complex functions",
            "Apply everything you've learned so far",
            "Practice writing functions",
            "Prepare for your first project"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-03-9"]
        }
      ]
    },
    {
      moduleId: "module-04",
      order: 4,
      title: "04 - Object-Oriented Programming",
      description: "Classes, objects, inheritance, polymorphism, encapsulation, and magic methods",
      duration: { weeks: 5, lessons: 8 },
      learningOutcomes: [
        "Create classes and objects",
        "Use inheritance",
        "Apply polymorphism",
        "Understand encapsulation and abstraction"
      ],
      lessons: [
        {
          lessonId: "lesson-04-1",
          order: 1,
          title: "OOP Basics: Classes and Objects",
          learningObjectives: [
            "Create classes",
            "Create objects (instances)",
            "Understand attributes and methods",
            "Use the __init__ constructor"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-10"]
        },
        {
          lessonId: "lesson-04-2",
          order: 2,
          title: "Class Attributes and Methods",
          learningObjectives: [
            "Create instance methods",
            "Use class methods (@classmethod)",
            "Apply static methods (@staticmethod)",
            "Understand the differences between method types"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-1"]
        },
        {
          lessonId: "lesson-04-3",
          order: 3,
          title: "Encapsulation and Access Modifiers",
          learningObjectives: [
            "Understand encapsulation",
            "Use public and private attributes",
            "Apply the property decorator",
            "Control access to data"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-2"]
        },
        {
          lessonId: "lesson-04-4",
          order: 4,
          title: "Inheritance",
          learningObjectives: [
            "Create child classes",
            "Override methods",
            "Use super()",
            "Understand MRO (Method Resolution Order)"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-3"]
        },
        {
          lessonId: "lesson-04-5",
          order: 5,
          title: "Polymorphism",
          learningObjectives: [
            "Understand polymorphism",
            "Implement polymorphism in Python",
            "Apply duck typing",
            "Use polymorphism in practice"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-4"]
        },
        {
          lessonId: "lesson-04-6",
          order: 6,
          title: "Dataclasses",
          learningObjectives: [
            "Use dataclasses to simplify classes",
            "Auto-generate methods",
            "Apply dataclass decorators",
            "Work with fields and default values"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-04-5"]
        },
        {
          lessonId: "lesson-04-7",
          order: 7,
          title: "Abstract Classes and Interfaces",
          learningObjectives: [
            "Use abstract base classes",
            "Implement interfaces",
            "Apply the ABC module",
            "Define contracts for classes"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-6"]
        },
        {
          lessonId: "lesson-04-8",
          order: 8,
          title: "Composition vs Inheritance",
          learningObjectives: [
            "Understand the difference between composition and inheritance",
            "Choose the right approach",
            "Apply composition",
            "Avoid common inheritance pitfalls"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-04-7"]
        }
      ]
    },
    {
      moduleId: "module-05",
      order: 5,
      title: "05 - Errors and Exception Handling",
      description: "Try/except blocks, custom exceptions, and handling errors in programs",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Handle exceptions",
        "Create custom exceptions",
        "Use try/except/finally",
        "Work with different error types"
      ],
      lessons: [
        {
          lessonId: "lesson-05-1",
          order: 1,
          title: "Error Handling: try / except / finally",
          learningObjectives: [
            "Understand the concept of exceptions",
            "Use try/except blocks",
            "Handle specific error types",
            "Use finally and else"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-8"]
        },
        {
          lessonId: "lesson-05-2",
          order: 2,
          title: "Exception Types and Error Handling",
          learningObjectives: [
            "Understand different exception types",
            "Handle multiple error types",
            "Use a bare except when appropriate",
            "Log errors"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-1"]
        },
        {
          lessonId: "lesson-05-3",
          order: 3,
          title: "Creating Custom Exceptions",
          learningObjectives: [
            "Create custom exception classes",
            "Raise exceptions (raise)",
            "Build an exception hierarchy",
            "Document exceptions"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-05-2"]
        },
        {
          lessonId: "lesson-05-4",
          order: 4,
          title: "Assert and Data Validation",
          learningObjectives: [
            "Use assert for checks",
            "Validate input data",
            "Handle validation errors",
            "Write more reliable code"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-05-3"]
        },
        {
          lessonId: "lesson-05-5",
          order: 5,
          title: "Practice: Error Handling in Programs",
          learningObjectives: [
            "Build a program with error handling",
            "Implement data validation",
            "Handle different error types",
            "Create a reliable program"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-05-4"]
        }
      ]
    },
    {
      moduleId: "module-06",
      order: 6,
      title: "06 - Python Decorators",
      description: "Creating and using decorators to extend function behavior",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Understand the concept of decorators",
        "Create your own decorators",
        "Use built-in decorators",
        "Apply decorators in practice"
      ],
      lessons: [
        {
          lessonId: "lesson-06-1",
          order: 1,
          title: "Introduction to Decorators",
          learningObjectives: [
            "Understand what decorators are",
            "Use simple decorators",
            "Understand the @decorator syntax",
            "Apply decorators to functions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-5"]
        },
        {
          lessonId: "lesson-06-2",
          order: 2,
          title: "Creating Custom Decorators",
          learningObjectives: [
            "Write decorator functions",
            "Use functools.wraps",
            "Create decorators with parameters",
            "Stack multiple decorators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-1"]
        },
        {
          lessonId: "lesson-06-3",
          order: 3,
          title: "Class and Method Decorators",
          learningObjectives: [
            "Create decorators for classes",
            "Apply decorators to methods",
            "Use @property, @staticmethod, and @classmethod",
            "Build more advanced decorators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-2"]
        },
        {
          lessonId: "lesson-06-4",
          order: 4,
          title: "Practice: Decorators in Action",
          learningObjectives: [
            "Create useful decorators",
            "Apply decorators for logging",
            "Use decorators for caching",
            "Practice writing decorators"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-06-3"]
        }
      ]
    },
    {
      moduleId: "module-07",
      order: 7,
      title: "07 - Python Generators",
      description: "Creating generators, generator expressions, yield, and iterators",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Understand the concept of generators",
        "Create generators",
        "Use yield",
        "Work with iterators"
      ],
      lessons: [
        {
          lessonId: "lesson-07-1",
          order: 1,
          title: "Introduction to Generators",
          learningObjectives: [
            "Understand what generators are",
            "Create generator functions",
            "Use yield",
            "Understand the benefits of generators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-4"]
        },
        {
          lessonId: "lesson-07-2",
          order: 2,
          title: "Generator Expressions and yield",
          learningObjectives: [
            "Create generator expressions",
            "Use yield from",
            "Work with infinite generators",
            "Optimize memory with generators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-07-1"]
        },
        {
          lessonId: "lesson-07-3",
          order: 3,
          title: "Iterators and the Iteration Protocol",
          learningObjectives: [
            "Understand the iteration protocol",
            "Create custom iterators",
            "Use __iter__ and __next__",
            "Work with iterable objects"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-07-2"]
        },
        {
          lessonId: "lesson-07-4",
          order: 4,
          title: "Practice: Generators in Action",
          learningObjectives: [
            "Create useful generators",
            "Apply generators to data processing",
            "Optimize code with generators",
            "Practice writing generators"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-07-3"]
        }
      ]
    },
    {
      moduleId: "module-08",
      order: 8,
      title: "08 - Advanced Python Modules",
      description: "Deeper work with modules: collections, itertools, functools, json, and csv",
      duration: { weeks: 3, lessons: 6 },
      learningOutcomes: [
        "Use collections for specialized containers",
        "Apply itertools for iteration",
        "Use functools for function tools",
        "Work with JSON and CSV"
      ],
      lessons: [
        {
          lessonId: "lesson-08-1",
          order: 1,
          title: "The collections Module",
          learningObjectives: [
            "Use namedtuple, deque, and Counter",
            "Apply defaultdict",
            "Work with OrderedDict",
            "Use specialized containers"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-07-4"]
        },
        {
          lessonId: "lesson-08-2",
          order: 2,
          title: "The itertools Module",
          learningObjectives: [
            "Use itertools for iteration",
            "Apply combinations and permutations",
            "Work with grouping",
            "Build efficient iterators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-1"]
        },
        {
          lessonId: "lesson-08-3",
          order: 3,
          title: "The functools Module",
          learningObjectives: [
            "Use functools for function tools",
            "Apply decorators",
            "Use partial and reduce",
            "Cache function results"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-08-2"]
        },
        {
          lessonId: "lesson-08-4",
          order: 4,
          title: "Working with JSON",
          learningObjectives: [
            "Read and write JSON files",
            "Parse JSON data",
            "Serialize objects",
            "Work with nested structures"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-3"]
        },
        {
          lessonId: "lesson-08-5",
          order: 5,
          title: "Working with CSV and Excel",
          learningObjectives: [
            "Read and write CSV files",
            "Work with Excel files",
            "Process structured data",
            "Use pandas for tabular data"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-4"]
        },
        {
          lessonId: "lesson-08-6",
          order: 6,
          title: "Practice: Data Processing with Modules",
          learningObjectives: [
            "Apply advanced modules",
            "Build a data-processing project",
            "Optimize code with modules",
            "Practice using these tools"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-08-5"]
        }
      ]
    },
    {
      moduleId: "module-09",
      order: 9,
      title: "09 - Web Scraping",
      description: "Collecting data from web pages with BeautifulSoup and requests",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Make HTTP requests",
        "Parse HTML pages",
        "Collect data from websites",
        "Process the data you collect"
      ],
      lessons: [
        {
          lessonId: "lesson-09-1",
          order: 1,
          title: "HTTP Requests: requests",
          learningObjectives: [
            "Install and use requests",
            "Make GET and POST requests",
            "Handle responses",
            "Work with headers and cookies"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-6"]
        },
        {
          lessonId: "lesson-09-2",
          order: 2,
          title: "Extra Tools: BeautifulSoup",
          learningObjectives: [
            "Learn about BeautifulSoup",
            "Understand when to use BeautifulSoup",
            "See basic usage examples"
          ],
          estimatedTime: 30,
          prerequisites: ["lesson-09-1"]
        },
        {
          lessonId: "lesson-09-3",
          order: 3,
          title: "Scraping Websites",
          learningObjectives: [
            "Build a scraper for a website",
            "Handle dynamic pages",
            "Store the data you collect",
            "Follow robots.txt rules"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-09-1"]
        },
        {
          lessonId: "lesson-09-4",
          order: 4,
          title: "Practice: Web Scraping Project",
          learningObjectives: [
            "Build a complete scraper",
            "Collect data from a real site",
            "Process and store data",
            "Create a useful tool"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-09-3"]
        }
      ]
    },
    {
      moduleId: "module-10",
      order: 10,
      title: "10 - Working with Images",
      description: "Image processing with PIL/Pillow and image manipulations",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Open and save images",
        "Manipulate images",
        "Apply filters and effects",
        "Build image-processing workflows"
      ],
      lessons: [
        {
          lessonId: "lesson-10-1",
          order: 1,
          title: "Introduction to PIL/Pillow",
          learningObjectives: [
            "Install Pillow",
            "Open and save images",
            "Get image information",
            "Convert formats"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-09-4"]
        },
        {
          lessonId: "lesson-10-2",
          order: 2,
          title: "Image Manipulations",
          learningObjectives: [
            "Resize images",
            "Crop and rotate images",
            "Adjust brightness and contrast",
            "Apply basic filters"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-1"]
        },
        {
          lessonId: "lesson-10-3",
          order: 3,
          title: "Colors and Filters",
          learningObjectives: [
            "Convert color spaces",
            "Apply filters",
            "Create effects",
            "Work with the alpha channel"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-2"]
        },
        {
          lessonId: "lesson-10-4",
          order: 4,
          title: "Practice: Image Processing",
          learningObjectives: [
            "Build an image-processing script",
            "Implement batch processing",
            "Create a useful tool",
            "Practice working with images"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-10-3"]
        }
      ]
    },
    {
      moduleId: "module-11",
      order: 11,
      title: "11 - Working with PDFs",
      description: "Working with PDF files",
      duration: { weeks: 1, lessons: 1 },
      learningOutcomes: [
        "Read and create PDF files",
        "Manipulate PDF documents"
      ],
      lessons: [
        {
          lessonId: "lesson-11-1",
          order: 1,
          title: "Working with PDFs: PyPDF2 and reportlab",
          learningObjectives: [
            "Install PyPDF2 and reportlab",
            "Read PDF files",
            "Create PDF files",
            "Manipulate PDF documents"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-10-4"]
        }
      ]
    },
    {
      moduleId: "module-12",
      order: 12,
      title: "12 - Sending Email with Python",
      description: "Sending email messages, working with SMTP, and creating HTML email",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Send email messages",
        "Work with SMTP",
        "Create HTML email",
        "Work with CSV for reports",
        "Combine data, PDFs, and email in one workflow"
      ],
      lessons: [
        {
          lessonId: "lesson-12-1",
          order: 1,
          title: "Introduction to Email: smtplib",
          learningObjectives: [
            "Understand the SMTP protocol",
            "Use smtplib",
            "Send simple emails",
            "Configure an SMTP server"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-11-1"]
        },
        {
          lessonId: "lesson-12-2",
          order: 2,
          title: "HTML Email and Attachments",
          learningObjectives: [
            "Create HTML email",
            "Add attachments",
            "Format messages",
            "Use the email module"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-1"]
        },
        {
          lessonId: "lesson-12-3",
          order: 3,
          title: "Practice: Email Automation",
          learningObjectives: [
            "Build a script for sending email",
            "Automate report delivery",
            "Create a notification system",
            "Practice working with email"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-12-2"]
        },
        {
          lessonId: "lesson-12-5",
          order: 4,
          title: "Working with CSV Files",
          learningObjectives: [
            "Understand the CSV format",
            "Read and write CSV with the csv module",
            "Handle utf-8 encoding",
            "Prepare data for email and PDF reports"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-3"]
        },
        {
          lessonId: "lesson-12-6",
          order: 5,
          title: "Automation Wrap-Up: Reports and Email",
          learningObjectives: [
            "Combine CSV, PDF, and email in one workflow",
            "Plan a reporting pipeline",
            "Avoid common automation mistakes",
            "Prepare for the GUI module"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-12-5"]
        }
      ]
    },
    {
      moduleId: "module-13",
      order: 13,
      title: "13 - Bonus: Introduction to GUIs",
      description: "Building graphical user interfaces with Tkinter",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Create graphical interfaces",
        "Use Tkinter widgets",
        "Handle events",
        "Build complete GUI applications"
      ],
      lessons: [
        {
          lessonId: "lesson-13-1",
          order: 1,
          title: "Introduction to GUIs. What Is Tkinter?",
          learningObjectives: [
            "Understand what a GUI is",
            "Get familiar with Tkinter",
            "Understand GUI app architecture",
            "Set up your environment"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-12-6"]
        },
        {
          lessonId: "lesson-13-2",
          order: 2,
          title: "Creating Your First Window. Tk() and mainloop()",
          learningObjectives: [
            "Create your first window",
            "Use Tk() and mainloop()",
            "Set size and title",
            "Close a window"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-13-1"]
        },
        {
          lessonId: "lesson-13-3",
          order: 3,
          title: "Widgets: Label, Button, Entry, Text",
          learningObjectives: [
            "Use Label for text",
            "Create buttons with Button",
            "Get input with Entry and Text",
            "Configure widgets"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-2"]
        },
        {
          lessonId: "lesson-13-4",
          order: 4,
          title: "Layout: pack, grid, and place",
          learningObjectives: [
            "Use pack for layout",
            "Apply grid for table layouts",
            "Use place for precise positioning",
            "Choose the right layout method"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-3"]
        },
        {
          lessonId: "lesson-13-5",
          order: 5,
          title: "Event Handling and Practice: GUI App",
          learningObjectives: [
            "Handle click events",
            "Create callback functions",
            "Build a complete GUI app",
            "Apply everything you've learned"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-13-4"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-14",
      order: 14,
      title: "14 - Telegram Bots",
      description: "Building bots: Bot API, python-telegram-bot, commands, and a practical project",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Create a bot with BotFather",
        "Work with the Telegram Bot API",
        "Build a bot with python-telegram-bot",
        "Ship a useful assistant bot"
      ],
      lessons: [
        {
          lessonId: "lesson-14-1",
          order: 1,
          title: "Telegram Bot API: Token and First Requests",
          learningObjectives: [
            "Create a bot with @BotFather",
            "Store the token in environment variables",
            "Send messages via the HTTP API",
            "Fetch updates with getUpdates"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-5"]
        },
        {
          lessonId: "lesson-14-2",
          order: 2,
          title: "python-telegram-bot: Echo Bot",
          learningObjectives: [
            "Install python-telegram-bot",
            "Set up Application and polling",
            "Handle the /start command",
            "Echo the user's text"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-14-1"]
        },
        {
          lessonId: "lesson-14-3",
          order: 3,
          title: "Commands, Keyboards, and Conversation State",
          learningObjectives: [
            "Add custom commands like /help and /menu",
            "Create ReplyKeyboardMarkup",
            "Store data in context.user_data",
            "Handle button presses"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-14-2"]
        },
        {
          lessonId: "lesson-14-4",
          order: 4,
          title: "Practice: A Useful Telegram Bot",
          learningObjectives: [
            "Assemble a bot with multiple commands",
            "Connect an external API",
            "Log errors",
            "Write a README with run instructions"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-14-3"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-15",
      order: 15,
      title: "15 - FastAPI and REST APIs",
      description: "Modern web APIs with FastAPI: routes, Pydantic, CRUD, and a Telegram webhook",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Build REST APIs with FastAPI",
        "Validate data with Pydantic",
        "Return correct HTTP status codes",
        "Connect an API to a Telegram webhook",
        "Prepare an API for deployment"
      ],
      lessons: [
        {
          lessonId: "lesson-15-1",
          order: 1,
          title: "FastAPI: Your First REST Endpoint",
          learningObjectives: [
            "Install fastapi and uvicorn",
            "Create an app and a GET / route",
            "Run the server locally",
            "Explore auto-generated docs at /docs"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-14-4"]
        },
        {
          lessonId: "lesson-15-2",
          order: 2,
          title: "Path Parameters, Query Params, and Pydantic Models",
          learningObjectives: [
            "Use path parameters",
            "Add query parameters",
            "Define BaseModel models",
            "Return typed responses"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-15-1"]
        },
        {
          lessonId: "lesson-15-3",
          order: 3,
          title: "POST, HTTP Errors, and Status Codes",
          learningObjectives: [
            "Create POST endpoints with a JSON body",
            "Return status 201 Created",
            "Use HTTPException",
            "Update and delete resources"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-15-2"]
        },
        {
          lessonId: "lesson-15-4",
          order: 4,
          title: "Practice: REST API + Telegram Webhook",
          learningObjectives: [
            "Build a CRUD API for a task list",
            "Add a Telegram webhook endpoint",
            "Connect FastAPI to bot logic",
            "Document API deployment"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-15-3"],
          isProject: true
        },
        {
          lessonId: "lesson-15-6",
          order: 5,
          title: "Deploying Your API and Next Steps",
          learningObjectives: [
            "Review FastAPI hosting options",
            "Understand environment variables on the server",
            "Build a pre-launch checklist for your API",
            "Know where to go next in your learning"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-15-4"]
        }
      ]
    }
  ]
}
