/**
 * Lesson 03-10: Practice of writing functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_10 = {
  lessonId: "lesson-03-10",
  moduleId: "module-03",
  order: 10,
  title: "Practice: writing functions",
  
  learningObjectives: [
    "Consolidate all learned concepts about functions",
    "Create complex functions for real-world tasks",
    "Apply various programming techniques",
    "Practice writing clean code",
    "Preparing to create projects"
  ],
  
  prerequisites: ["lesson-03-9"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Review of the studied material",
        content: `In this lesson, we will consolidate all the knowledge about functions that we learned in module 03:

**What we learned:**

1. **Function declaration and call**
   - Syntax \`def\`
   - Function calls
   - Parameters and arguments

2. **Parameters, return, None**
   - Positional and named arguments
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
   - Recursive case8. **Higher-order functions**
   - map(), filter(), reduce()
   - Combining functions

**In this lesson:**
- Practicing writing functions
- Creating more complex functions
- Applying all learned techniques`
      },
      {
        title: "Principles of writing good functions",
        content: `**1. One function - one responsibility**

A function should do one thing and do it well.

\`\`\`python
#  Bad: the function does a lot of things
def process_user_data(user):
    # Validation
    if not user.get("name"):
        return None
    # Processing
    user["name"] = user["name"].capitalize()
    # Preservation
    save_to_database(user)
    # Sending an email
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

A function's name should clearly describe what it does.

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
    # Clearly, it calculates the total price
    pass
\`\`\`

**3. Docstrings**

Add a description of the function.

\`\`\`python
def calculate_discount(price, discount_percent):
    """
    Calculates the discounted price

Args:
    price: Original price
    discount_percent: Discount percentage (0-100)

Returns:
    Discounted price
    """
    return price * (1 - discount_percent / 100)
\`\`\`

**4. Error handling**

Check inputs and handle errors.

\`\`\`python
def divide(a, b):
    """
    Divides a by b
    """
    if b == 0:
        return None  # Or throw an exception
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

greet("Oleksandr")  # "Hello, Oleksandr!"
greet("Oleksandr", "Good morning")  # "Good morning, Oleksandr!"
\`\`\``
      },
      {
        title: "Practical examples of complex functions",
        content: `**Example 1: Order Processing**

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
    # Calculating the total without tax
    subtotal = sum(item["price"] * item["quantity"] for item in items)
    
    # We apply a discount
    if discount > 0:
        subtotal = subtotal * (1 - discount / 100)
    
    # Adding tax
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

**Example 2: Data Validation and Formatting**

\`\`\`python
def validate_and_format_user(user_data):
    """
    Validates and formats user data

Args:
    user_data: Dictionary with user data

Returns:
    Formatted dictionary or None if validation fails
    """
    # Checking mandatory fields
    required_fields = ["name", "email", "age"]
    for field in required_fields:
        if field not in user_data:
            return None
    
    # Age validation
    if not isinstance(user_data["age"], int) or user_data["age"] < 0:
        return None
    
    # Email validation (simple check)
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
    "name": "  Oleksandr  ",
    "email": "  USER@EXAMPLE.COM  ",
    "age": 20
}
formatted_user = validate_and_format_user(user)
\`\`\`

**Example 3: Working with Data Structures**

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
    
    # Calculating total income
    total_revenue = sum(item["quantity"] * item["price"] for item in sales_data)
    
    # Calculating the total amount
    total_quantity = sum(item["quantity"] for item in sales_data)
    
    # Average price
    average_price = total_revenue / total_quantity if total_quantity > 0 else 0
    
    # The most popular product
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
        texts: List of lines
        *processors: Processing functions (applied in series)
    
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
texts = ["  Hello  ", "  world  ", "  python  "]
processed = process_text_pipeline(
    texts,
    clean_text,
    capitalize_text,
    lambda x: x.upper() if x else None
)
# Filtering None
final = list(filter(lambda x: x is not None, processed))
\`\`\`

**Example: Recursive processing of nested structures**

\`\`\`python
def flatten_list(nested_list):
    """
    Expands a nested list into a flat one

Args:
    nested_list: Possibly a nested list

Returns:
    Flat list
    """
    result = []
    for item in nested_list:
        if isinstance(item, list):
            # Recursively process the nested list
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result

# Usage
nested = [1, [2, 3], [4, [5, 6]], 7]
flat = flatten_list(nested)
# [1, 2, 3, 4, 5, 6, 7]
\`\`\`

**Example: Higher-Order Functions with Validation**

\`\`\`python
from functools import reduce

def safe_reduce(func, iterable, initial=None):
    """
    Safe version of reduce with checks

Args:
    func: Function for reduction
    iterable: Iterable object
    initial: Initial value

Returns:
    Result of the reduction or None if there is an error
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
        content: `**1. Start with something simple**

First, write a simple version, then improve it.

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
    Sum of the numbers or None if an error
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
    print(f"5 + 3 = {result}")  # We expect 8
    
    # Test 2: With Zero
    result = add_numbers(5, 0)
    print(f"5 + 0 = {result}")  # Expecting 5
    
    # Test 3: From from'with negative numbers
    result = add_numbers(-5, 3)
    print(f"-5 + 3 = {result}")  # Expecting -2
    
    # Test 4: With incorrect data
    result = add_numbers("5", 3)
    print(f"'5' + 3 = {result}") # Expect None
\`\`\`

**3. Break down complex tasks**

Break a complex task into smaller functions.

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
    # Application of discounts
    pass

def process_order(order):
    if not validate_order(order):
        return None
    calculate_prices(order)
    apply_discounts(order)
    return order
\`\`\`

**4. Use typing (if possible)**

Add type hints for better readability.

\`\`\`python
def calculate_total(items: list, tax_rate: float = 0.2) -> float:
    """
    Calculates the total amount

Args:
    items: List of goods
    tax_rate: Tax rate

Returns:
    Total amount
    """
    subtotal = sum(item["price"] for item in items)
    return subtotal * (1 + tax_rate)
\`\`\`

**5. Think about reuse**

Create features that can be used in different places.

\`\`\`python
#  Good: it can be used in various places
def format_currency(amount, currency="UAH"):
    return f"{amount} {currency}"

#  Bad: tied to a specific context
def print_price_for_product_123(price):
    print(f"Price: {price} UAH")
\`\`\``
      },
      {
        title: "Summary of Module 03",
        content: `We have learned a lot about functions in Python:

Main concepts:

1. Declaring and calling functions
2. Parameters, arguments, return
3. Positional and named arguments
4. *args and **kwargs
5. Object methods
6. Lambda functions
7. Variable scope
8. Recursion
9. Higher-order functions

Skills:

- Creating functions for various tasks
- Using different programming techniques
- Writing clean and readable code
- Combining different concepts

Next steps:

- Practice writing functions
- Create your own projects
- Learn new course modules
- Apply knowledge in practice

Remember:

- One function - one responsibility
- Clear function names
- Documentation (docstrings)
- Function testing
- Code reuseCongratulations on completing Module 03! You now have a solid foundation for working with functions in Python.`
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
        price: Original price
        discount_percent: Percentage Discount (0-100)
        min_price: Minimum price after discount
    
Returns:
        Discounted price or None if there is an error
    """
    # Validation
    if not isinstance(price, (int, float)) or price < 0:
        return None
    if not isinstance(discount_percent, (int, float)):
        return None
    if discount_percent < 0 or discount_percent > 100:
        return None
    
# Computing
    discounted_price = price * (1 - discount_percent / 100)
    
# Minimum Price Check
    if discounted_price < min_price:
        return min_price
    
return round(discounted_price, 2)# Usage
result = calculate_discount(100, 20, min_price=50)
print(result)  # 80.0`,
      explanation: "Demonstrates the creation of a function with input validation, error handling, and documentation."
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
      explanation: "Shows the combination of different techniques: higher-order functions, lambda, map()."
    },
    {
      title: "Recursive processing",
      code: `def count_items(nested_structure):
    """
    Counts the number of items in a nested structure
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
    Formats the report with various options
    
Args:
        data: Data for the report
        title: Report Title
        format_type: Formatting type ('short' or 'full')
        include_summary: Whether to include a summary
    
Returns:
        Formatted report
    """
    report = f"=== {title} ===\\n"
    
if format_type == "full":
        for item in data:
            report += f"  - {item}\\n"
    else:
        report += f" Number of elements: {len(data)}\\n"
    
if include_summary:
        report += f"\\nSummary: {len(data)} items"
    
return report# Usage
data = ["Element 1", "Element 2", "Element 3"]
report = format_report(data, title="My Report", format_type="full")
print(report)`,
      explanation: "Shows a function with many parameters and default values."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "The feature does too many things",
      explanation: "Beginners often create features that perform many different tasks.",
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
      mistake: "Vague function names",
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
    # It's clear that it calculates the total price
    total = sum(item["price"] for item in items)
    return total`
    },
    {
      mistake: "Lack of validation",
      explanation: "Functions should validate input data before processing.",
      correctApproach: `# Incorrect:
def divide(a, b):
    return a / b  # Can cause an error if b = 0

# Correct:
def divide(a, b):
    if b == 0:
        return None  # Or raise an exception
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a / b`
    },
    {
      mistake: "Lack of documentation",
      explanation: "Functions without docstrings are difficult to understand and use.",
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
  
  summary: `In this lesson, we consolidated all knowledge about functions:

Principles of good functions:

1. One function - one responsibility
   - A function should do one thing well

2. Clear names
   - The name should describe the function's purpose

3. Documentation
   - Docstrings help to understand the function

4. Validation
   - Check input data

5. Flexibility
   - Use default values

Practical tips:

- Start with a simple version
- Test functions
- Break down complex tasks
- Think about reusability

Learned concepts:

 Function declaration and call
 Parameters, return, None
 Positional and named arguments
 *args and **kwargs
 Object methods
 Lambda functions
 Scope
 Recursion
 Higher-order functionsCongratulations on completing Module 03! You are now ready to create more complex programs!`,
  
  practiceTask: {
    title: "Library management system",
    description: "Create a library management system using all the studied concepts",
    problemStatement: `Create a system with functions:

1. add_book(library, title, author, year=None, isbn=None)
2. find_books(library, **criteria)
3. calculate_statistics(library)
4. format_book_info(book, format_type="short")
5. get_books_by_author(library, author)
6. remove_book(library, isbn)

Read n books (title;author;year;isbn), an author to search for, an isbn to remove.
Add books, display found books, statistics, formats, author's list, removal result.

Input format:
3
Python for Beginners;Oleksandr Petrenko;2023;978-1234567890
Advanced Python;Oleksandr Petrenko;2024;978-1234567891
Fundamentals of Programming;Maria Ivanenko;2020;978-1234567892
Oleksandr Petrenko
978-1234567890`,
    outputFormat: `Book added: True
Books found by author 'Oleksandr Petrenko': 2
- Python for Beginners (2023)
- Advanced Python (2024)
Library statistics:
Total number of books: 3
Number of authors: 2
Oldest book: 2020
Newest book: 2024
Short formatting: Python for Beginners (2023)
Full formatting:
Title: Python for Beginners
Author: Oleksandr Petrenko
Year: 2023
ISBN: 978-1234567890
Books by author 'Oleksandr Petrenko': ['Python for Beginners', 'Advanced Python']
Book removed: True
Number of books after removal: 2`,
    examples: [
      {
        input: `3
Python for Beginners;Oleksandr Petrenko;2023;978-1234567890
Advanced Python;Oleksandr Petrenko;2024;978-1234567891
Fundamentals of Programming;Maria Ivanenko;2020;978-1234567892
Oleksandr Petrenko
978-1234567890`,
        output: `Book added: True
Books found by author 'Oleksandr Petrenko': 2
- Python for Beginners (2023)
- Advanced Python (2024)
Library statistics:
Total number of books: 3
Number of authors: 2
Oldest book: 2020
Newest book: 2024
Short formatting: Python for Beginners (2023)
Full formatting:
Title: Python for Beginners
Author: Oleksandr Petrenko
Year: 2023
ISBN: 978-1234567890
Books by author 'Oleksandr Petrenko': ['Python for Beginners', 'Advanced Python']
Book removed: True
Number of books after removal: 2`,
        explanation: "Three books, author search, deletion of the first by ISBN"
      },
      {
        input: `2
Book A;Author A;2010;isbn-1
Book B;Author B;2015;isbn-2
Author A
isbn-2`,
        output: `Book added: True
Books found by author 'Author A': 1
- Book A (2010)
Library statistics:
Total number of books: 2
Number of authors: 2
Oldest book: 2010
Newest book: 2015
Short formatting: Book A (2010)
Full formatting:
Title: Book A
Author: Author A
Year: 2010
ISBN: isbn-1
Books by author 'Author A': ['Book A']
Book removed: True
Number of books after removal: 1`,
        explanation: "The second book is being deleted; formatting of the first"
      },
      {
        input: `1
Alone;Solo;1999;x-1
Solo
missing`,
        output: `Book added: True
Books found by author 'Solo': 1
- Alone (1999)
Library statistics:
Total number of books: 1
Number of authors: 1
Oldest book: 1999
Newest book: 1999
Short formatting: Alone (1999)
Full formatting:
Title: Alone
Author: Solo
Year: 1999
ISBN: x-1
Books by author 'Solo': ['Alone']
Book removed: False
Number of books after removal: 1`,
        explanation: "ISBN missing not found - delete False"
      }
    ],
    solution: {
      code: `from functools import reduce

def add_book(library, title, author, year=None, isbn=None):
    """Adds a book to the library"""
    if not title or not author:
        return False
    if year is not None and (not isinstance(year, int) or year < 0):
        return False
    book = {
        "title": title.strip(),
        "author": author.strip(),
        "year": year,
        "isbn": isbn
    }
    if "books" not in library:
        library["books"] = []
    library["books"].append(book)
    return True

def find_books(library, **criteria):
    """Finds books by criteria"""
    if "books" not in library:
        return []
    books = library["books"]
    if "author" in criteria:
        books = list(filter(lambda b: b.get("author", "").lower() == criteria["author"].lower(), books))
    if "year" in criteria:
        books = list(filter(lambda b: b.get("year") == criteria["year"], books))
    if "min_year" in criteria:
        books = list(filter(lambda b: b.get("year") is not None and b.get("year") >= criteria["min_year"], books))
    if "max_year" in criteria:
        books = list(filter(lambda b: b.get("year") is not None and b.get("year") <= criteria["max_year"], books))
    return books

def calculate_statistics(library):
    """Calculates library statistics"""
    if "books" not in library or len(library["books"]) == 0:
        return {"total_books": 0, "total_authors": 0, "oldest_year": None, "newest_year": None}
    books = library["books"]
    authors = set(book.get("author", "") for book in books if book.get("author"))
    years = [book.get("year") for book in books if book.get("year") is not None]
    if years:
        oldest_year = reduce(lambda a, b: a if a < b else b, years)
        newest_year = reduce(lambda a, b: a if a > b else b, years)
    else:
        oldest_year = None
        newest_year = None
    return {
        "total_books": len(books),
        "total_authors": len(authors),
        "oldest_year": oldest_year,
        "newest_year": newest_year
    }

def format_book_info(book, format_type="short"):
    """Formats book information"""
    if format_type == "short":
        return f"{book.get('title', 'Unknown')} ({book.get('year', '?')})"
    title = book.get("title", "Unknown")
    author = book.get("author", "Unknown")
    year = book.get("year", "?")
    isbn = book.get("isbn") if book.get("isbn") else "None"
    return f"Title: {title}\\nAuthor: {author}\\nYear: {year}\\nISBN: {isbn}"

def get_books_by_author(library, author):
    """List of author's book titles"""
    if "books" not in library:
        return []
    author_books = filter(lambda b: b.get("author", "").lower() == author.lower(), library["books"])
    return list(map(lambda b: b.get("title", ""), author_books))

def remove_book(library, isbn):
    """Removes a book by ISBN"""
    if "books" not in library:
        return False
    for i, book in enumerate(library["books"]):
        if book.get("isbn") == isbn:
            library["books"].pop(i)
            return True
    return False

n = int(input())
library = {}
first_result = None
for _ in range(n):
    title, author, year, isbn = input().strip().split(";")
    result = add_book(library, title, author, int(year), isbn)
    if first_result is None:
        first_result = result

search_author = input().strip()
remove_isbn = input().strip()

print(f"Book added: {first_result}")
found = find_books(library, author=search_author)
print(f"Books found by author '{search_author}': {len(found)}")
for book in found:
    print(f"- {format_book_info(book)}")

stats = calculate_statistics(library)
print("Library statistics:")
print(f"Total number of books: {stats['total_books']}")
print(f"Number of authors: {stats['total_authors']}")
print(f"Oldest book: {stats['oldest_year']}")
print(f"Newest book: {stats['newest_year']}")

book = library["books"][0]
print(f"Short formatting: {format_book_info(book, 'short')}")
print("Full formatting:")
for line in format_book_info(book, "full").split("\\n"):
    print(line)

author_books = get_books_by_author(library, search_author)
print(f"Books by author '{search_author}': {author_books}")

removed = remove_book(library, remove_isbn)
print(f"Book removed: {removed}")
print(f"Number of books after removal: {len(library['books'])}")`,
      explanation: "A complete library system on functions; books and operations from stdin."
    },
    hints: [
      "Read n books in the format title;author;year;isbn",
      "Use **criteria in find_books",
      "For full formatting, split the line by \\n",
      "remove_book searches for the ISBN and does pop"
    ],
    difficulty: "advanced"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the most important principle when writing functions?",
        options: [
          "One function - one responsibility",
          "The function should be as long as possible",
          "The function has to do many things",
          "The function does not require documentation"
        ],
        correctAnswer: 0,
        explanation: "One function - one responsibility - is a key principle. A function should do one thing and do it well."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Is input validation needed in functions?",
        options: [
          "Yes, this is important for reliability",
          "No, that is not necessary",
          "Only for complex functions",
          "Only for functions with many parameters"
        ],
        correctAnswer: 0,
        explanation: "Yes, input data validation is important for the reliability of the function. It helps to avoid errors and unexpected behavior."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Which is better: one large function or several small ones?",
        options: [
          "Several small functions with clear responsibility",
          "One big function",
          "It depends on the situation, but usually it's better to break up",
          "Both options are the same"
        ],
        correctAnswer: 2,
        explanation: "It depends on the situation, but usually it is better to break a complex function into several small ones with clear responsibilities. This makes the code more readable and maintainable."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a docstring?",
        options: [
          "Function documentation written in triple quotes",
          "Function Name",
          "Function parameters",
          "Function return type"
        ],
        correctAnswer: 0,
        explanation: "Docstring is the documentation of a function, written in triple quotes (\"\"\"). It describes what the function does, what parameters it takes, and what it returns."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Is it necessary to test functions?",
        options: [
          "Yes, it helps to make sure that the feature is working correctly",
          "No, that is not necessary",
          "Only for complex functions",
          "Only before the release"
        ],
        correctAnswer: 0,
        explanation: "Yes, testing functions is important. It helps to ensure that the function works correctly on different input data and helps to find errors earlier."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How is it better to name functions?",
        options: [
          "Clearly and descriptively, to understand the purpose",
          "In short, to print less",
          "Abbreviations",
          "Anyway, the main thing is short"
        ],
        correctAnswer: 0,
        explanation: "It is better to name functions clearly and descriptively, so that it is clear from the name what the function does. For example, calculate_total_price is better than calc or func."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Is it possible to combine different programming techniques in a single function?",
        options: [
          "Yes, this is often needed for complex tasks",
          "No, it's always bad",
          "Only for simple functions",
          "Only for recursive functions"
        ],
        correctAnswer: 0,
        explanation: "Yes, it is possible and often necessary to combine different techniques (map, filter, reduce, recursion, object methods) in a single function to solve complex problems."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Functions should be as versatile as possible and suitable for reuse.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, functions should be universal and reusable whenever possible. This makes the code more modular and reduces duplication."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
