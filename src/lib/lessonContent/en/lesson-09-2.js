/**
 * Lesson 09-2: Additional tools: BeautifulSoup
 * Short reference lesson about BeautifulSoup
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_2 = {
  lessonId: "lesson-09-2",
  moduleId: "module-09",
  order: 2,
  title: "Additional tools: BeautifulSoup",
  
  learningObjectives: [
    "Learn about BeautifulSoup",
    "Understand when to use BeautifulSoup",
    "See basic usage examples"
  ],
  
  prerequisites: ["lesson-09-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is BeautifulSoup?",
        content: `BeautifulSoup is a popular Python library for parsing HTML and XML documents.

**Main features:**

- Simple and intuitive HTML navigation API
- Automatic correction of incorrect HTML
- Convenient methods of searching for elements by tags, classes, id
- Support for various parsers (html.parser, lxml)

**When to use BeautifulSoup:**

- When you need to parse complex HTML
- To extract data from web pages
- When flexible navigation through the DOM tree is required
- To handle incorrect or incomplete HTML

**Installation:**

\`\`\`bash
pip install beautifulsoup4
\`\`\`

**Note:** BeautifulSoup requires additional installation on your computer. In this course, we will focus on working with requests and JSON APIs, which do not require additional libraries.`
      },
      {
        title: "Basic use case",
        content: `**A simple HTML parsing example:**

\`\`\`python
from bs4 import BeautifulSoup
import requests

# We get HTML
response = requests.get('https://example.com')
html = response.text

# Create a BeautifulSoup object
soup = BeautifulSoup(html, 'html.parser')

# We find the elements
title = soup.find('title')
print(title.text) # Title text

# We find all links
links = soup.find_all('a')
for link in links:
    print(link.get('href'))
\`\`\`

**Search by class or id:**

\`\`\`python
# Find an element by class
div = soup.find('div', class_='content')

# Find element by id
header = soup.find(id='header')

# Find all elements with class
items = soup.find_all('div', class_='item')
\`\`\`

**Text extraction:**

\`\`\`python
# Get all the text from the element
text = soup.get_text()

# Get the text of a specific element
paragraph = soup.find('p')
if paragraph:
    print(paragraph.get_text())
\`\`\``
      },
      {
        title: "Alternatives to BeautifulSoup",
        content: `**For simple tasks you can use:**

1. **Regular expressions (re)** - for simple patterns
2. **Built-in html.parser** - for basic parsing
3. **JSON API** - if the site provides an API (the best option)

**Recommendation:**

For training purposes in this course, we use **requests** to work with the JSON API, which is simpler and does not require additional libraries. BeautifulSoup is useful for complex HTML parsing tasks, but requests and JSON are sufficient for most practical tasks.`
      }
    ]
  },
  
  codeExamples: [],
  
  practiceTask: null,
  
  quiz: {
    questions: []
  },
  
  commonMistakes: [],
  
  summary: `BeautifulSoup is a powerful HTML parsing tool, but requests and JSON API are sufficient for most tasks in this course.`
}
