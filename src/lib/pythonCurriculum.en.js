/**
 * Full Curriculum for "Complete Python 3 Bootcamp" (English Version)
 *
 * Structure mirrors Complete Python 3 Bootcamp by Pierian Data
 * Python course: full learning program
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const pythonCurriculum = {
  courseId: "python-developer-zero-to-junior",
  title: "Complete Python Course",

  modules: [
    {
      moduleId: "module-00",
      order: 0,
      title: "00 - Python Objects and Data Structures",
      description: "Fundamentals of objects and data structures: variables, data types, lists, dictionaries, tuples, sets",
      duration: { weeks: 3, lessons: 8 },
      learningOutcomes: [
        "Understanding Python objects and data types",
        "Working with variables and assignment",
        "Creating and manipulating lists, dictionaries, tuples, and sets",
        "Understanding mutability and immutability"
      ],
      lessons: [
        {
          lessonId: "lesson-00-1",
          order: 1,
          title: "Introduction to Python. Installation and your first program",
          learningObjectives: [
            "Install Python on your computer",
            "Set up a development environment",
            "Write your first 'Hello, World!' program",
            "Understand Python code structure"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "lesson-00-2",
          order: 2,
          title: "Variables and data types: int, float, str, bool",
          learningObjectives: [
            "Understand the concept of variables",
            "Learn the basic data types: int, float, str, bool",
            "Convert between types",
            "Work with variables in programs"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-00-1"]
        },
        {
          lessonId: "lesson-00-3",
          order: 3,
          title: "Lists: creation, indexing, methods",
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
          title: "Dictionaries (dict): keys, values, methods",
          learningObjectives: [
            "Create and modify dictionaries",
            "Access values",
            "Use dictionary methods",
            "Iterate over dictionaries"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-00-3"]
        },
        {
          lessonId: "lesson-00-5",
          order: 4,
          title: "Tuples and sets",
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
          order: 4,
          title: "Strings (str): methods, formatting, indexing",
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
          order: 4,
          title: "Nested data structures",
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
          order: 4,
          title: "Practice: problems with objects and data structures",
          learningObjectives: [
            "Solve practical problems with objects",
            "Apply everything you have learned",
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
      description: "Comparison and logical operators for working with conditions",
      duration: { weeks: 1, lessons: 3 },
      learningOutcomes: [
        "Using comparison operators",
        "Understanding logical operators",
        "Working with boolean values",
        "Creating complex conditions"
      ],
      lessons: [
        {
          lessonId: "lesson-01-1",
          order: 1,
          title: "Comparison operators: ==, !=, <, >, <=, >=",
          learningObjectives: [
            "Use comparison operators",
            "Compare different data types",
            "Understand comparison results",
            "Apply them to various data structures"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-00-8"]
        },
        {
          lessonId: "lesson-01-2",
          order: 2,
          title: "Logical operators: and, or, not",
          learningObjectives: [
            "Use the logical operators and, or, not",
            "Create complex conditions",
            "Understand operator precedence",
            "Apply logical operations"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-01-1"]
        },
        {
          lessonId: "lesson-01-3",
          order: 3,
          title: "Practice: problems with comparison operators",
          learningObjectives: [
            "Solve practical comparison problems",
            "Apply logical operators",
            "Create complex conditions",
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
      description: "Conditional if/elif/else statements and for/while loops for flow control",
      duration: { weeks: 3, lessons: 8 },
      learningOutcomes: [
        "Using if/elif/else conditional statements",
        "Working with for and while loops",
        "Controlling loop execution",
        "Solving algorithmic problems"
      ],
      lessons: [
        {
          lessonId: "lesson-02-1",
          order: 1,
          title: "Conditional statements: if / elif / else",
          learningObjectives: [
            "Understand conditional statement logic",
            "Use if, elif, else",
            "Work with nested conditions",
            "Apply the ternary operator"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-01-3"]
        },
        {
          lessonId: "lesson-02-2",
          order: 2,
          title: "The while loop",
          learningObjectives: [
            "Use the while loop",
            "Control loop exit conditions",
            "Avoid infinite loops",
            "Apply while for various tasks"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-1"]
        },
        {
          lessonId: "lesson-02-3",
          order: 3,
          title: "The for loop and range()",
          learningObjectives: [
            "Use the for loop for iteration",
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
          title: "break, continue, else in loops",
          learningObjectives: [
            "Use break to exit a loop",
            "Apply continue to skip an iteration",
            "Understand else in loops",
            "Control loop execution"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-02-3"]
        },
        {
          lessonId: "lesson-02-5",
          order: 4,
          title: "Nested loops and conditions",
          learningObjectives: [
            "Create nested loops",
            "Combine loops with conditions",
            "Understand nested loop complexity",
            "Optimize nested constructs"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-4"]
        },
        {
          lessonId: "lesson-02-6",
          order: 4,
          title: "List comprehensions and generator expressions",
          learningObjectives: [
            "Create list comprehensions",
            "Use conditional comprehensions",
            "Nested list comprehensions",
            "Optimize code with comprehensions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-02-5"]
        },
        {
          lessonId: "lesson-02-7",
          order: 4,
          title: "Practice: algorithmic problems",
          learningObjectives: [
            "Solve algorithmic problems",
            "Apply loops and conditions",
            "Analyze algorithm complexity",
            "Practice writing efficient code"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-02-6"]
        },
        {
          lessonId: "lesson-02-8",
          order: 4,
          title: "Practice: additional problems with statements",
          learningObjectives: [
            "Reinforce knowledge of statements",
            "Solve more challenging problems",
            "Combine different types of statements",
            "Prepare for the first project"
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
      description: "Creating functions, object methods, lambda functions, scope",
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
          title: "Functions: definition and calling",
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
          title: "Parameters, return, None",
          learningObjectives: [
            "Understand the difference between parameters and arguments",
            "Use return to return values",
            "Understand None and its usage",
            "Create functions with different return types"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-1"]
        },
        {
          lessonId: "lesson-03-3",
          order: 3,
          title: "Positional and keyword arguments",
          learningObjectives: [
            "Use positional arguments",
            "Apply keyword arguments",
            "Combine different argument types",
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
          order: 4,
          title: "Object methods: string, list, and dictionary methods",
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
          order: 4,
          title: "Lambda functions",
          learningObjectives: [
            "Create lambda functions",
            "Use lambda with map(), filter(), sorted()",
            "Use functions as objects",
            "Know when to use lambda"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-03-5"]
        },
        {
          lessonId: "lesson-03-7",
          order: 4,
          title: "Variable scope",
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
          order: 4,
          title: "Recursion",
          learningObjectives: [
            "Understand the concept of recursion",
            "Create recursive functions",
            "Solve problems recursively",
            "Avoid infinite recursion"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-7"]
        },
        {
          lessonId: "lesson-03-9",
          order: 4,
          title: "Higher-order functions: map, filter, reduce",
          learningObjectives: [
            "Use map() for transformation",
            "Apply filter() for filtering",
            "Use reduce() for folding",
            "Combine higher-order functions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-03-8"]
        },
        {
          lessonId: "lesson-03-10",
          order: 4,
          title: "Practice: writing functions",
          learningObjectives: [
            "Create complex functions",
            "Apply everything you have learned",
            "Practice writing functions",
            "Prepare for the first project"
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
      description: "Classes, objects, inheritance, polymorphism, encapsulation, magic methods",
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
          title: "OOP basics: classes and objects",
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
          title: "Class attributes and methods",
          learningObjectives: [
            "Create instance methods",
            "Use class methods (@classmethod)",
            "Apply static methods (@staticmethod)",
            "Understand the difference between method types"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-1"]
        },
        {
          lessonId: "lesson-04-3",
          order: 3,
          title: "Encapsulation and access modifiers",
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
          title: "Abstract classes and interfaces",
          learningObjectives: [
            "Use abstract base classes",
            "Implement interfaces",
            "Apply the ABC module",
            "Create contracts for classes"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-04-6"]
        },
        {
          lessonId: "lesson-04-8",
          order: 8,
          title: "Composition vs inheritance",
          learningObjectives: [
            "Understand the difference between composition and inheritance",
            "Choose the right approach",
            "Apply composition",
            "Avoid inheritance pitfalls"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-04-7"]
        }
      ]
    },
    {
      moduleId: "module-05",
      order: 5,
      title: "05 - Error and Exception Handling",
      description: "Try/except blocks, creating custom exceptions, error handling in programs",
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
          title: "Error handling: try / except / finally",
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
          title: "Exception types and error handling",
          learningObjectives: [
            "Understand different exception types",
            "Handle multiple error types",
            "Use except without a type",
            "Log errors"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-1"]
        },
        {
          lessonId: "lesson-05-3",
          order: 3,
          title: "Creating custom exceptions",
          learningObjectives: [
            "Create custom exception classes",
            "Raise exceptions",
            "Build an exception hierarchy",
            "Document exceptions"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-05-2"]
        },
        {
          lessonId: "lesson-05-4",
          order: 4,
          title: "Assert and data validation",
          learningObjectives: [
            "Use assert for checks",
            "Validate input data",
            "Handle validation errors",
            "Write robust code"
          ],
          estimatedTime: 75,
          prerequisites: ["lesson-05-3"]
        },
        {
          lessonId: "lesson-05-5",
          order: 5,
          title: "Practice: error handling in programs",
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
        "Create custom decorators",
        "Use built-in decorators",
        "Apply decorators in practice"
      ],
      lessons: [
        {
          lessonId: "lesson-06-1",
          order: 1,
          title: "Introduction to decorators",
          learningObjectives: [
            "Understand what decorators are",
            "Use simple decorators",
            "Understand @decorator syntax",
            "Apply decorators to functions"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-05-5"]
        },
        {
          lessonId: "lesson-06-2",
          order: 2,
          title: "Creating custom decorators",
          learningObjectives: [
            "Create decorator functions",
            "Use functools.wraps",
            "Create decorators with parameters",
            "Combine decorators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-1"]
        },
        {
          lessonId: "lesson-06-3",
          order: 3,
          title: "Class and method decorators",
          learningObjectives: [
            "Create decorators for classes",
            "Apply decorators to methods",
            "Use @property, @staticmethod, @classmethod",
            "Create complex decorators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-06-2"]
        },
        {
          lessonId: "lesson-06-4",
          order: 4,
          title: "Practice: decorators in action",
          learningObjectives: [
            "Create useful decorators",
            "Apply decorators for logging",
            "Use decorators for caching",
            "Practice creating decorators"
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
      description: "Creating generators, generator expressions, yield, iterators",
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
          title: "Introduction to generators",
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
          title: "Generator expressions and yield",
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
          title: "Iterators and the iteration protocol",
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
          title: "Practice: generators in action",
          learningObjectives: [
            "Create useful generators",
            "Apply generators for data processing",
            "Optimize code with generators",
            "Practice creating generators"
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
      description: "In-depth work with modules: collections, itertools, functools, json, csv",
      duration: { weeks: 3, lessons: 6 },
      learningOutcomes: [
        "Use collections for specialized containers",
        "Apply itertools for iteration",
        "Use functools for functions",
        "Work with JSON and CSV"
      ],
      lessons: [
        {
          lessonId: "lesson-08-1",
          order: 1,
          title: "The collections module",
          learningObjectives: [
            "Use namedtuple, deque, Counter",
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
          title: "The itertools module",
          learningObjectives: [
            "Use itertools for iteration",
            "Apply combinations and permutations",
            "Work with grouping",
            "Create efficient iterators"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-1"]
        },
        {
          lessonId: "lesson-08-3",
          order: 3,
          title: "The functools module",
          learningObjectives: [
            "Use functools for functions",
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
            "Use pandas for tables"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-08-4"]
        },
        {
          lessonId: "lesson-08-6",
          order: 6,
          title: "Practice: data processing with modules",
          learningObjectives: [
            "Apply advanced modules",
            "Build a data processing project",
            "Optimize code with modules",
            "Practice using the tools"
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
        "Process collected data"
      ],
      lessons: [
        {
          lessonId: "lesson-09-1",
          order: 1,
          title: "HTTP requests: requests",
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
          title: "Additional tools: BeautifulSoup",
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
          title: "Scraping websites",
          learningObjectives: [
            "Build a scraper for a website",
            "Handle dynamic pages",
            "Store collected data",
            "Follow robots.txt rules"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-09-1"]
        },
        {
          lessonId: "lesson-09-4",
          order: 4,
          title: "Practice: web scraping project",
          learningObjectives: [
            "Build a full scraper",
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
      description: "Image processing with PIL/Pillow, image manipulation",
      duration: { weeks: 2, lessons: 4 },
      learningOutcomes: [
        "Open and save images",
        "Manipulate images",
        "Apply filters and effects",
        "Build image processing workflows"
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
          title: "Image manipulation",
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
          title: "Working with colors and filters",
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
          title: "Practice: image processing",
          learningObjectives: [
            "Create an image processing script",
            "Implement batch processing",
            "Build a useful tool",
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
      title: "11 - Working with PDF",
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
          title: "Working with PDF: PyPDF2 and reportlab",
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
      description: "Sending email messages, working with SMTP, creating HTML email",
      duration: { weeks: 1, lessons: 3 },
      learningOutcomes: [
        "Send email messages",
        "Work with SMTP",
        "Create HTML email",
        "Add attachments"
      ],
      lessons: [
        {
          lessonId: "lesson-12-1",
          order: 1,
          title: "Introduction to email: smtplib",
          learningObjectives: [
            "Understand the SMTP protocol",
            "Use smtplib",
            "Send simple email",
            "Configure an SMTP server"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-11-1"]
        },
        {
          lessonId: "lesson-12-2",
          order: 2,
          title: "Creating HTML email and attachments",
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
          title: "Practice: email automation",
          learningObjectives: [
            "Create a script to send email",
            "Automate report delivery",
            "Build a notification system",
            "Practice working with email"
          ],
          estimatedTime: 120,
          prerequisites: ["lesson-12-2"]
        }
      ]
    },
    {
      moduleId: "module-13",
      order: 13,
      title: "13 - Bonus: Introduction to Graphical User Interfaces (GUI)",
      description: "Creating graphical user interfaces with Tkinter",
      duration: { weeks: 2, lessons: 5 },
      learningOutcomes: [
        "Create graphical interfaces",
        "Use Tkinter widgets",
        "Handle events",
        "Build full GUI applications"
      ],
      lessons: [
        {
          lessonId: "lesson-13-1",
          order: 1,
          title: "Introduction to GUI. What is Tkinter",
          learningObjectives: [
            "Understand what a GUI is",
            "Get familiar with Tkinter",
            "Understand GUI application architecture",
            "Prepare the environment"
          ],
          estimatedTime: 60,
          prerequisites: ["lesson-12-3"]
        },
        {
          lessonId: "lesson-13-2",
          order: 2,
          title: "Creating your first window. Tk(), mainloop()",
          learningObjectives: [
            "Create your first window",
            "Use Tk() and mainloop()",
            "Set size and title",
            "Close the window"
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
            "Get input via Entry and Text",
            "Configure widgets"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-2"]
        },
        {
          lessonId: "lesson-13-4",
          order: 4,
          title: "Layout: pack, grid, place",
          learningObjectives: [
            "Use pack for layout",
            "Apply grid for tables",
            "Use place for absolute positioning",
            "Choose the right method"
          ],
          estimatedTime: 90,
          prerequisites: ["lesson-13-3"]
        },
        {
          lessonId: "lesson-13-5",
          order: 5,
          title: "Event handling and practice: GUI application",
          learningObjectives: [
            "Handle click events",
            "Create callback functions",
            "Build a full GUI application",
            "Apply everything you have learned"
          ],
          estimatedTime: 150,
          prerequisites: ["lesson-13-4"],
          isProject: true
        }
      ]
    }
  ]
}
