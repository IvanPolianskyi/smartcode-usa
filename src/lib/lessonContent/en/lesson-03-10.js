/**
 * Lesson 03-10: Practice writing functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_10 = {
  lessonId: "lesson-03-10",
  moduleId: "module-03",
  order: 10,
  title: "Practice: writing functions",
  
  learningObjectives: [
    "Reinforce all concepts learned about functions",
    "Create complex functions for real-world tasks",
    "Apply various programming techniques",
    "Practice writing clean code",
    "Prepare for building projects"
  ],
  
  prerequisites: ["lesson-03-9"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Review of what we learned",
        content: `In this lesson we will reinforce all the knowledge about functions we studied in module 03:

**What we learned:**

1. **Declaring and calling functions**
   - \`def\` syntax
   - Calling functions
   - Parameters and arguments

2. **Parameters, return, None**
   - Positional and keyword arguments
   - Default values
   - Returning values

3. ***args and **kwargs**
   - Arbitrary number of arguments
   - Unpacking

4. **Object methods**
   - Working with strings, lists, dictionaries
   - Method chaining

5. **Lambda functions**
   - Anonymous functions
   - Using with map(), filter()

6. **Scope**
   - Local and global variables
   - LEGB rule
   - Closures

7. **Recursion**
   - Base case
   - Recursive case

8. **Higher-order functions**
   - map(), filter(), reduce()
   - Combining functions

**In this lesson:**
- We practice writing functions
- We create more complex functions
- We apply all the techniques we learned`
      },
      {
        title: "Principles of writing good functions",
        content: `**1. One function — one responsibility**

A function should do one thing and do it well.

\`\`\`python
#  Bad: function does many things
def process_user_data(user):
    # Validation
    if not user.get("name"):
        return None
    # Processing
    user["name"] = user["name"].capitalize()
    # Saving
    save_to_database(user)
    # Sending email
    send_email(user["email"])

#  Good: each function does one thing
def validate_user(user):
    return user.get("name") is not None

def format_user_name(user):
    user["name"] = user["name"].capitalize()
    return user

def save_user(user):
    save_to_database(user)

def notify_user(user):
    send_email(user["email"])
\`\`\`

**2. Clear function names**

The function name should clearly describe what it does.

\`\`\`python
#  Bad
def func(x):
    return x * 2

def process(data):
    # What exactly does it process?
    pass

#  Good
def double_number(x):
    return x * 2

def calculate_total_price(items):
    # Clear that it calculates the total price
    pass
\`\`\`

**3. Docstrings**

Add a description of the function.

\`\`\`python
def calculate_discount(price, discount_percent):
    """
    Calculates the discounted price
    
    Args:
        price: Initial price
        discount_percent: Discount percentage (0-100)
    
    Returns:
        Discounted price
    """
    return price * (1 - discount_percent / 100)
\`\`\`

**4. Error handling**

Validate input data and handle errors.

\`\`\`python
def divide(a, b):
    """
    Divides a by b
    """
    if b == 0:
        return None  # Or raise an exception
    return a / b
\`\`\`

**5. Use default values**

Make functions more flexible.

\`\`\`python
def greet(name, greeting="Hello"):
    """
    Greets the user
    """
    return f"{greeting}, {name}!"

greet("Alex")  # "Hello, Alex!"
greet("Alex", "Good morning")  # "Good morning, Alex!"
\`\`\``
      },
      {
        title: "Practical examples of complex functions",
        content: `**Example 1: Processing orders**

\`\`\`python
def calculate_order_total(items, tax_rate=0.2, discount=0):
    """
    Calculates the total order amount
    
    Args:
        items: List of products, each with 'price' and 'quantity'
        tax_rate: Tax rate (default 20%)
        discount: Discount in percent (0-100)
    
    Returns:
        Total order amount
    """
    # Calculate subtotal without tax
    subtotal = sum(item["price"] * item["quantity"] for item in items)
    
    # Apply discount
    if discount > 0:
        subtotal = subtotal * (1 - discount / 100)
    
    # Add tax
    total = subtotal * (1 + tax_rate)
    
    return round(total, 2)

# Usage
items = [
    {"price": 100, "quantity": 2},
    {"price": 50, "quantity": 3}
]
total = calculate_order_total(items, tax_rate=0.2, discount=10)
print(f"Total amount: {total}")
\`\`\`

**Example 2: Validating and formatting data**

\`\`\`python
def validate_and_format_user(user_data):
    """
    Validates and formats user data
    
    Args:
        user_data: Dictionary with user data
    
    Returns:
        Formatted dictionary or None if validation fails
    """
    # Check required fields
    required_fields = ["name", "email", "age"]
    for field in required_fields:
        if field not in user_data:
            return None
    
    # Validate age
    if not isinstance(user_data["age"], int) or user_data["age"] < 0:
        return None
    
    # Validate email (simple check)
    if "@" not in user_data["email"]:
        return None
    
    # Formatting
    formatted = {
        "name": user_data["name"].strip().capitalize(),
        "email": user_data["email"].strip().lower(),
        "age": user_data["age"]
    }
    
    return formatted

# Usage
user = {
    "name": "  alex  ",
    "email": "  USER@EXAMPLE.COM  ",
    "age": 20
}
formatted_user = validate_and_format_user(user)
\`\`\`

**Example 3: Working with data structures**

\`\`\`python
def analyze_sales(sales_data):
    """
    Analyzes sales data
    
    Args:
        sales_data: List of dictionaries with 'product', 'quantity', 'price'
    
    Returns:
        Dictionary with statistics
    """
    if not sales_data:
        return {
            "total_revenue": 0,
            "total_quantity": 0,
            "average_price": 0,
            "top_product": None
        }
    
    # Calculate total revenue
    total_revenue = sum(item["quantity"] * item["price"] for item in sales_data)
    
    # Calculate total quantity
    total_quantity = sum(item["quantity"] for item in sales_data)
    
    # Average price
    average_price = total_revenue / total_quantity if total_quantity > 0 else 0
    
    # Most popular product
    product_quantities = {}
    for item in sales_data:
        product = item["product"]
        product_quantities[product] = product_quantities.get(product, 0) + item["quantity"]
    
    top_product = max(product_quantities.items(), key=lambda x: x[1])[0] if product_quantities else None
    
    return {
        "total_revenue": round(total_revenue, 2),
        "total_quantity": total_quantity,
        "average_price": round(average_price, 2),
        "top_product": top_product
    }
\`\`\``
      },
      {
        title: "Combining techniques",
        content: `**Example: Text processing system**

\`\`\`python
from functools import reduce

def process_text_pipeline(texts, *processors):
    """
    Processes texts through a sequence of functions
    
    Args:
        texts: List of strings
        *processors: Processing functions (applied in sequence)
    
    Returns:
        Processed texts
    """
    result = texts
    for processor in processors:
        result = list(map(processor, result))
    return result

# Processing functions
def clean_text(text):
    return text.strip()

def capitalize_text(text):
    return text.capitalize()

def remove_short(text):
    return text if len(text) > 3 else None

# Usage
texts = ["  hello  ", "  world  ", "  python  "]
processed = process_text_pipeline(
    texts,
    clean_text,
    capitalize_text,
    lambda x: x.upper() if x else None
)
# Filter out None
final = list(filter(lambda x: x is not None, processed))
\`\`\`

**Example: Recursive processing of nested structures**

\`\`\`python
def flatten_list(nested_list):
    """
    Flattens a nested list into a flat list
    
    Args:
        nested_list: Possibly nested list
    
    Returns:
        Flat list
    """
    result = []
    for item in nested_list:
        if isinstance(item, list):
            # Recursively process nested list
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result

# Usage
nested = [1, [2, 3], [4, [5, 6]], 7]
flat = flatten_list(nested)
# [1, 2, 3, 4, 5, 6, 7]
\`\`\`

**Example: Higher-order functions with validation**

\`\`\`python
from functools import reduce

def safe_reduce(func, iterable, initial=None):
    """
    Safe version of reduce with checks
    
    Args:
        func: Folding function
        iterable: Iterable object
        initial: Initial value
    
    Returns:
        Fold result or None if an error
    """
    if not iterable:
        return initial
    
    try:
        if initial is not None:
            return reduce(func, iterable, initial)
        else:
            return reduce(func, iterable)
    except Exception:
        return None

# Usage
numbers = [1, 2, 3, 4, 5]
total = safe_reduce(lambda x, y: x + y, numbers)
# 15
\`\`\``
      },
      {
        title: "Tips for practice",
        content: `**1. Start simple**

First write a simple version, then improve it.

\`\`\`python
# Version 1: Simple
def add_numbers(a, b):
    return a + b

# Version 2: With validation
def add_numbers(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a + b

# Version 3: With documentation
def add_numbers(a, b):
    """
    Adds two numbers
    
    Args:
        a: First number
        b: Second number
    
    Returns:
        Sum of numbers or None if an error
    """
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a + b
\`\`\`

**2. Test functions**

Check functions with different input data.

\`\`\`python
def test_function():
    # Test 1: Normal case
    result = add_numbers(5, 3)
    print(f"5 + 3 = {result}")  # Expect 8
    
    # Test 2: With zero
    result = add_numbers(5, 0)
    print(f"5 + 0 = {result}")  # Expect 5
    
    # Test 3: With negative numbers
    result = add_numbers(-5, 3)
    print(f"-5 + 3 = {result}")  # Expect -2
    
    # Test 4: With invalid data
    result = add_numbers("5", 3)
    print(f"'5' + 3 = {result}")  # Expect None
\`\`\`

**3. Break down complex tasks**

Split a complex task into smaller functions.

\`\`\`python
# Instead of one large function
def process_order(order):
    # 100 lines of code...
    pass

# Better: several small functions
def validate_order(order):
    # Validation
    pass

def calculate_prices(order):
    # Price calculation
    pass

def apply_discounts(order):
    # Applying discounts
    pass

def process_order(order):
    if not validate_order(order):
        return None
    calculate_prices(order)
    apply_discounts(order)
    return order
\`\`\`

**4. Use type hints (when possible)**

Add type hints for better readability.

\`\`\`python
def calculate_total(items: list, tax_rate: float = 0.2) -> float:
    """
    Calculates the total amount
    
    Args:
        items: List of products
        tax_rate: Tax rate
    
    Returns:
        Total amount
    """
    subtotal = sum(item["price"] for item in items)
    return subtotal * (1 + tax_rate)
\`\`\`

**5. Think about reuse**

Create functions that can be used in different places.

\`\`\`python
#  Good: can be used in different places
def format_currency(amount, currency="USD"):
    return f"{amount} {currency}"

#  Bad: tied to a specific context
def print_price_for_product_123(price):
    print(f"Price: {price} USD")
\`\`\``
      },
      {
        title: "Module 03 summary",
        content: `We learned a lot about functions in Python:

Core concepts:

1. Declaring and calling functions
2. Parameters, arguments, return
3. Positional and keyword arguments
4. *args and **kwargs
5. Object methods
6. Lambda functions
7. Variable scope
8. Recursion
9. Higher-order functions

Skills:

- Creating functions for different tasks
- Using various programming techniques
- Writing clean and readable code
- Combining different concepts

Next steps:

- Practice writing functions
- Build your own projects
- Study new course modules
- Apply knowledge in practice

Remember:

- One function — one responsibility
- Clear function names
- Documentation (docstrings)
- Testing functions
- Code reuse

Congratulations on completing module 03! You now have a solid foundation for working with functions in Python.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Complex function with validation",
      code: `def calculate_discount(price, discount_percent, min_price=0):
    """
    Calculates discounted price with validation
    
    Args:
        price: Initial price
        discount_percent: Discount percentage (0-100)
        min_price: Minimum price after discount
    
    Returns:
        Discounted price or None if an error
    """
    # Validation
    if not isinstance(price, (int, float)) or price < 0:
        return None
    if not isinstance(discount_percent, (int, float)):
        return None
    if discount_percent < 0 or discount_percent > 100:
        return None
    
    # Calculation
    discounted_price = price * (1 - discount_percent / 100)
    
    # Check minimum price
    if discounted_price < min_price:
        return min_price
    
    return round(discounted_price, 2)

# Usage
result = calculate_discount(100, 20, min_price=50)
print(result)  # 80.0`,
      explanation: "Demonstrates creating a function with input validation, error handling, and documentation."
    },
    {
      title: "Combining techniques",
      code: `from functools import reduce

def process_numbers(numbers, operations):
    """
    Processes numbers through a sequence of operations
    
    Args:
        numbers: List of numbers
        operations: List of processing functions
    
    Returns:
        Processed numbers
    """
    result = numbers
    for operation in operations:
        result = list(map(operation, result))
    return result

# Usage
numbers = [1, 2, 3, 4, 5]
processed = process_numbers(
    numbers,
    [lambda x: x * 2, lambda x: x + 1, lambda x: x ** 2]
)
print(processed)  # [9, 25, 49, 81, 121]`,
      explanation: "Shows combining different techniques: higher-order functions, lambda, map()."
    },
    {
      title: "Recursive processing",
      code: `def count_items(nested_structure):
    """
    Counts the number of elements in a nested structure
    """
    if isinstance(nested_structure, list):
        return sum(count_items(item) for item in nested_structure)
    else:
        return 1

# Usage
nested = [1, [2, 3], [4, [5, 6]], 7]
count = count_items(nested)
print(count)  # 7`,
      explanation: "Demonstrates recursive processing of nested data structures."
    },
    {
      title: "Function with multiple parameters",
      code: `def format_report(data, title="Report", format_type="short", include_summary=True):
    """
    Formats a report with various options
    
    Args:
        data: Data for the report
        title: Report title
        format_type: Format type ('short' or 'full')
        include_summary: Whether to include a summary
    
    Returns:
        Formatted report
    """
    report = f"=== {title} ===\\n"
    
    if format_type == "full":
        for item in data:
            report += f"  - {item}\\n"
    else:
        report += f"  Number of items: {len(data)}\\n"
    
    if include_summary:
        report += f"\\nSummary: {len(data)} items"
    
    return report

# Usage
data = ["Item 1", "Item 2", "Item 3"]
report = format_report(data, title="My Report", format_type="full")
print(report)`,
      explanation: "Shows a function with many parameters and default values."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Function does too many things",
      explanation: "Beginners often create functions that perform many different tasks.",
      correctApproach: `# Incorrect:
def process_user(user):
    # Validation
    if not user.get("name"):
        return None
    # Formatting
    user["name"] = user["name"].capitalize()
    # Saving
    save_to_db(user)
    # Sending email
    send_email(user["email"])

# Correct: split into separate functions
def validate_user(user):
    return user.get("name") is not None

def format_user(user):
    user["name"] = user["name"].capitalize()
    return user

def process_user(user):
    if not validate_user(user):
        return None
    formatted = format_user(user)
    save_to_db(formatted)
    send_email(formatted["email"])`
    },
    {
      mistake: "Unclear function names",
      explanation: "Function names should clearly describe what they do.",
      correctApproach: `# Incorrect:
def func(x):
    return x * 2

def process(data):
    # What exactly does it process?
    pass

# Correct:
def double_number(x):
    return x * 2

def calculate_total_price(items):
    # Clear that it calculates the total price
    total = sum(item["price"] for item in items)
    return total`
    },
    {
      mistake: "Missing validation",
      explanation: "Functions should validate input data before processing.",
      correctApproach: `# Incorrect:
def divide(a, b):
    return a / b  # May cause an error if b = 0

# Correct:
def divide(a, b):
    if b == 0:
        return None  # Or raise an exception
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a / b`
    },
    {
      mistake: "Missing documentation",
      explanation: "Functions without docstrings are hard to understand and use.",
      correctApproach: `# Incorrect:
def calculate(x, y, z):
    return x * y + z

# Correct:
def calculate_total_with_tax(price, quantity, tax_rate):
    """
    Calculates the total amount with tax
    
    Args:
        price: Price per unit
        quantity: Quantity
        tax_rate: Tax rate (0-1)
    
    Returns:
        Total amount with tax
    """
    subtotal = price * quantity
    return subtotal * (1 + tax_rate)`
    }
  ],
  
  summary: `In this lesson we reinforced all knowledge about functions:

Principles of good functions:

1. One function — one responsibility
   - A function should do one thing well

2. Clear names
   - The name should describe the function's purpose

3. Documentation
   - Docstrings help understand the function

4. Validation
   - Check input data

5. Flexibility
   - Use default values

Practical tips:

- Start with a simple version
- Test functions
- Break down complex tasks
- Think about reuse

Concepts covered:

 Declaring and calling functions
 Parameters, return, None
 Positional and keyword arguments
 *args and kwargs
 Object methods
 Lambda functions
 Scope
 Recursion
 Higher-order functions

Congratulations on completing module 03! You are now ready to build more complex programs!`,
  
  practiceTask: {
    title: "Library management system",
    description: "Create a library management system using all the concepts you learned",
    problemStatement: `Create a library management system with the following functions:

1. **add_book** — adds a book to the library
   - Parameters: library (dictionary), title, author, year, isbn
   - Validates data (title and author are required, year must be a number)
   - Adds the book to the library
   - Returns True if successful, False if an error

2. **find_books** — finds books by criteria
   - Parameters: library, **criteria (keyword arguments: author, year, min_year, max_year)
   - Uses filter() for search
   - Returns a list of found books

3. **calculate_statistics** — calculates library statistics
   - Parameters: library
   - Uses reduce() or other methods
   - Returns a dictionary: total number of books, number of authors, oldest book, newest book

4. **format_book_info** — formats book information
   - Parameters: book (dictionary), format_type="short" (can be "short" or "full")
   - Uses string methods
   - Returns a formatted string

5. **get_books_by_author** — gets books by author
   - Parameters: library, author
   - Uses filter() and map()
   - Returns a list of book titles by the author

6. **remove_book** — removes a book
   - Parameters: library, isbn
   - Finds and removes the book by ISBN
   - Returns True if found and removed, False otherwise

**Important:** Do not use the input() function. Enter values directly in the code.

Create usage examples for all functions and print the results.`,
    outputFormat: `Example output:
Book added: True
Found books: [{'title': 'Python for Beginners', 'author': 'Alex', 'year': 2023}]
Statistics: {'total_books': 3, 'total_authors': 2, 'oldest_year': 2020, 'newest_year': 2023}
Formatting: Python for Beginners (2023)
Author's books: ['Python for Beginners', 'Advanced Python']
Book removed: True`,
    examples: [
      {
        output: `Book added: True
Found books: [{'title': 'Python for Beginners', 'author': 'Alex', 'year': 2023}]
Statistics: {'total_books': 1, 'total_authors': 1, 'oldest_year': 2023, 'newest_year': 2023}
Formatting: Python for Beginners (2023)`,
        explanation: "Demonstrates adding a book, search, statistics calculation, and formatting."
      }
    ],
    solution: {
      code: `# Library management system

from functools import reduce

def add_book(library, title, author, year=None, isbn=None):
    """
    Adds a book to the library
    
    Args:
        library: Library dictionary
        title: Book title (required)
        author: Author (required)
        year: Publication year (optional)
        isbn: ISBN (optional)
    
    Returns:
        True if successful, False if an error
    """
    # Validation
    if not title or not author:
        return False
    if year is not None and (not isinstance(year, int) or year < 0):
        return False
    
    # Create book
    book = {
        "title": title.strip(),
        "author": author.strip(),
        "year": year,
        "isbn": isbn
    }
    
    # Add to library
    if "books" not in library:
        library["books"] = []
    
    library["books"].append(book)
    return True

def find_books(library, **criteria):
    """
    Finds books by criteria
    
    Args:
        library: Library dictionary
        **criteria: Search criteria (author, year, min_year, max_year)
    
    Returns:
        List of found books
    """
    if "books" not in library:
        return []
    
    books = library["books"]
    
    # Filter by author
    if "author" in criteria:
        books = list(filter(lambda b: b.get("author", "").lower() == criteria["author"].lower(), books))
    
    # Filter by year
    if "year" in criteria:
        books = list(filter(lambda b: b.get("year") == criteria["year"], books))
    
    # Filter by year range
    if "min_year" in criteria:
        books = list(filter(lambda b: b.get("year") is not None and b.get("year") >= criteria["min_year"], books))
    
    if "max_year" in criteria:
        books = list(filter(lambda b: b.get("year") is not None and b.get("year") <= criteria["max_year"], books))
    
    return books

def calculate_statistics(library):
    """
    Calculates library statistics
    
    Args:
        library: Library dictionary
    
    Returns:
        Dictionary with statistics
    """
    if "books" not in library or len(library["books"]) == 0:
        return {
            "total_books": 0,
            "total_authors": 0,
            "oldest_year": None,
            "newest_year": None
        }
    
    books = library["books"]
    
    # Total number of books
    total_books = len(books)
    
    # Number of unique authors
    authors = set(book.get("author", "") for book in books if book.get("author"))
    total_authors = len(authors)
    
    # Oldest and newest book
    years = [book.get("year") for book in books if book.get("year") is not None]
    
    if years:
        oldest_year = reduce(lambda x, y: x if x < y else y, years)
        newest_year = reduce(lambda x, y: x if x > y else y, years)
    else:
        oldest_year = None
        newest_year = None
    
    return {
        "total_books": total_books,
        "total_authors": total_authors,
        "oldest_year": oldest_year,
        "newest_year": newest_year
    }

def format_book_info(book, format_type="short"):
    """
    Formats book information
    
    Args:
        book: Dictionary with book information
        format_type: Format type ('short' or 'full')
    
    Returns:
        Formatted string
    """
    if format_type == "short":
        title = book.get("title", "Unknown")
        year = book.get("year", "?")
        return f"{title} ({year})"
    else:  # full
        title = book.get("title", "Unknown")
        author = book.get("author", "Unknown")
        year = book.get("year", "?")
        isbn = book.get("isbn") if book.get("isbn") else "None"
        return f"Title: {title}\\nAuthor: {author}\\nYear: {year}\\nISBN: {isbn}"

def get_books_by_author(library, author):
    """
    Gets a list of book titles by author
    
    Args:
        library: Library dictionary
        author: Author name
    
    Returns:
        List of book titles
    """
    if "books" not in library:
        return []
    
    # Filter author's books, then get titles
    author_books = filter(lambda b: b.get("author", "").lower() == author.lower(), library["books"])
    titles = map(lambda b: b.get("title", ""), author_books)
    return list(titles)

def remove_book(library, isbn):
    """
    Removes a book by ISBN
    
    Args:
        library: Library dictionary
        isbn: Book ISBN
    
    Returns:
        True if found and removed, False otherwise
    """
    if "books" not in library:
        return False
    
    # Find book index
    for i, book in enumerate(library["books"]):
        if book.get("isbn") == isbn:
            library["books"].pop(i)
            return True
    
    return False

# Enter values directly in code (do not use input())

# Create library
library = {}

# Add books
result = add_book(library, "Python for Beginners", "Alex", 2023, "978-1234567890")
add_book(library, "Advanced Python", "Alex", 2024, "978-1234567891")
add_book(library, "Programming Basics", "Maria", 2020, "978-1234567892")

print(f"Book added: {result}")
# Search books
found = find_books(library, author="Alex")
print(f"Books found by author 'Alex': {len(found)}")
for book in found:
    print(f"- {format_book_info(book)}")
# Statistics
stats = calculate_statistics(library)
print("Library statistics:")
print(f"Total books: {stats['total_books']}")
print(f"Number of authors: {stats['total_authors']}")
print(f"Oldest book: {stats['oldest_year']}")
print(f"Newest book: {stats['newest_year']}")
# Formatting
book = library["books"][0]
print(f"Short format: {format_book_info(book, 'short')}")
print("Full format:")
full_info = format_book_info(book, 'full')
for line in full_info.split('\\n'):
    print(line)
# Author's books
author_books = get_books_by_author(library, "Alex")
print(f"Alex's books: {author_books}")
# Remove book
removed = remove_book(library, "978-1234567890")
print(f"Book removed: {removed}")
print(f"Number of books after removal: {len(library['books'])}")`,
      explanation: "The solution demonstrates comprehensive use of all learned concepts: validation, keyword arguments, **kwargs, object methods, filter(), map(), reduce(), string formatting. The library management system shows practical application of functions in a real project."
    },
    hints: [
      "Enter values directly in code — do not use input()",
      "Use **criteria for flexible search by different criteria",
      "For validation, check required fields and data types",
      "Use filter() to search for books by criteria",
      "Use reduce() to calculate minimum and maximum years",
      "Use set() to get unique authors",
      "Use string methods (strip(), lower()) to normalize data",
      "Check for the 'books' key in the library before working with it",
      "To remove, find the element index, then use pop()"
    ],
    difficulty: "advanced",
    testCases: [
      {
        expectedOutput: "True",
        description: "Check adding a book"
      },
      {
        expectedOutput: "Found books",
        description: "Check book search"
      },
      {
        expectedOutput: "total_books",
        description: "Check statistics calculation"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which principle is most important when writing functions?",
        options: [
          "One function — one responsibility",
          "A function should be as long as possible",
          "A function should do many things",
          "A function does not need documentation"
        ],
        correctAnswer: 0,
        explanation: "One function — one responsibility is a key principle. A function should do one thing and do it well."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Is input validation needed in functions?",
        options: [
          "Yes, it is important for reliability",
          "No, it is not needed",
          "Only for complex functions",
          "Only for functions with many parameters"
        ],
        correctAnswer: 0,
        explanation: "Yes, input validation is important for function reliability. It helps avoid errors and unexpected behavior."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is better: one large function or several small ones?",
        options: [
          "Several small functions with clear responsibility",
          "One large function",
          "Depends on the situation, but usually better to split",
          "Both options are the same"
        ],
        correctAnswer: 2,
        explanation: "It depends on the situation, but usually it is better to split a complex function into several small ones with clear responsibility. This makes code more readable and maintainable."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a docstring?",
        options: [
          "Function documentation written in triple quotes",
          "Function name",
          "Function parameters",
          "Function return type"
        ],
        correctAnswer: 0,
        explanation: "A docstring is function documentation written in triple quotes (\"\"\"). It describes what the function does, what parameters it accepts, and what it returns."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Should functions be tested?",
        options: [
          "Yes, it helps ensure the function works correctly",
          "No, it is not needed",
          "Only for complex functions",
          "Only before release"
        ],
        correctAnswer: 0,
        explanation: "Yes, testing functions is important. It helps ensure the function works correctly with different input data and helps find errors earlier."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How should functions be named?",
        options: [
          "Clearly and descriptively, so the purpose is understandable",
          "Briefly, to type less",
          "With abbreviations",
          "Any way, as long as it is short"
        ],
        correctAnswer: 0,
        explanation: "Functions are best named clearly and descriptively, so the name makes it obvious what the function does. For example, calculate_total_price is better than calc or func."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Can different programming techniques be combined in one function?",
        options: [
          "Yes, it is often needed for complex tasks",
          "No, it is always bad",
          "Only for simple functions",
          "Only for recursive functions"
        ],
        correctAnswer: 0,
        explanation: "Yes, you can and often need to combine different techniques (map, filter, reduce, recursion, object methods) in one function to solve complex tasks."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Functions should be as universal and reusable as possible.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, functions should be universal and reusable when possible. This makes code more modular and reduces duplication."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
