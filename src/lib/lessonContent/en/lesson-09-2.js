/**
 * Lesson 09-2: Extra tools: BeautifulSoup
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_2 = {
  lessonId: "lesson-09-2",
  moduleId: "module-09",
  order: 2,
  title: "Extra tools: BeautifulSoup",

  learningObjectives: [
    "Learn what BeautifulSoup is and its role in web scraping",
    "Distinguish HTML parsing from working with JSON APIs",
    "Use find and find_all to locate elements",
    "Choose the right tool for the job"
  ],

  prerequisites: ["lesson-09-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is BeautifulSoup?",
        content: `**BeautifulSoup** (package \`beautifulsoup4\`) is a library for parsing HTML and XML in Python. It turns “raw” HTML strings into a convenient DOM tree where you can search by tags, classes, and attributes.

**Why you need it:**

- Sites without a public API often expose data only in HTML
- Real-world HTML can be messy - BeautifulSoup tries to fix it
- The \`find\` / \`find_all\` API is more readable than complex regexes over the whole document

**Installation:**

\`\`\`bash
pip install beautifulsoup4
# optional, faster parser:
pip install lxml
\`\`\`

\`\`\`python
from bs4 import BeautifulSoup
\`\`\`

**In this course:** the main focus is \`requests\` + JSON APIs (simpler and more stable). BeautifulSoup is an extra tool when there is no API or the data lives only on the page.`
      },
      {
        title: "First HTML parse",
        content: `**Minimal example** (HTML from a string or from \`requests\`):

\`\`\`python
from bs4 import BeautifulSoup
import requests

url = "https://example.com"
response = requests.get(url, timeout=10)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")
print(soup.title.string)  # text inside <title>
\`\`\`

**Parsers:**

| Parser | When to use |
|--------|-------------|
| \`html.parser\` | Built-in, no extra packages |
| \`lxml\` | Faster, for large pages |

\`\`\`python
soup = BeautifulSoup(html, "lxml")
\`\`\`

**Tree structure:** each tag is a node; you can walk \`.parent\`, \`.children\`, \`.next_sibling\`.`
      },
      {
        title: "Finding elements: find and find_all",
        content: `**One element** - \`find\` (first match or \`None\`):

\`\`\`python
header = soup.find("h1")
if header:
    print(header.get_text(strip=True))
\`\`\`

**All matches** - \`find_all\` (a list):

\`\`\`python
links = soup.find_all("a", href=True)
for link in links:
    print(link["href"], link.get_text(strip=True))
\`\`\`

**By class or id** (HTML attribute \`class\`, in Python - \`class_\`):

\`\`\`python
cards = soup.find_all("div", class_="product-card")
nav = soup.find(id="main-nav")
\`\`\`

**CSS selectors** via \`select\` / \`select_one\`:

\`\`\`python
prices = soup.select("span.price")
first = soup.select_one("article.post h2")
\`\`\`

**Tip:** open the page in the browser first (DevTools → Elements), find a stable selector, then move it into code.`
      },
      {
        title: "Extracting text and attributes",
        content: `\`\`\`python
# Text of one element (get_text flattens nested tags)
paragraph = soup.find("p", class_="lead")
if paragraph:
    print(paragraph.get_text(strip=True))

# All visible page text (careful - a lot of noise)
all_text = soup.get_text(separator="\\n", strip=True)

# Attributes
img = soup.find("img")
if img and img.get("src"):
    print(img["src"])
\`\`\`

**Tables** are often parsed with \`find("table")\` and \`<tr>\` rows, or with \`pandas.read_html\` for simple tables.

**Encoding:** if \`requests\` returns mojibake, check \`response.encoding\` or \`response.apparent_encoding\`.`
      },
      {
        title: "BeautifulSoup vs JSON API vs regex",
        content: `| Approach | Pros | Cons |
|----------|------|------|
| **JSON API** | Stable contract, fast | Not always available |
| **BeautifulSoup** | Flexible HTML parsing | Breaks when markup changes |
| **regex** | Fine for small fragments | Scales poorly to full HTML |

**Rule:** if there is an official API - use it. BeautifulSoup - when data is only in HTML and the site rules allow it (\`robots.txt\`, ToS).

\`\`\`python
# Bad: parse JSON with BeautifulSoup
# Good:
data = response.json()
\`\`\``
      },
      {
        title: "Ethics and limits",
        content: `Before scraping, check:

1. **robots.txt** - \`https://site.com/robots.txt\`
2. The site’s **terms of use**
3. **Load** - pauses between requests (\`time.sleep\`), not a DDoS
4. **User-Agent** - honestly identify a bot or learning script

\`\`\`python
import time
import requests

headers = {"User-Agent": "SmartCode-Learning-Bot/1.0"}
for url in urls:
    r = requests.get(url, headers=headers, timeout=10)
    # process...
    time.sleep(1)  # pause between requests
\`\`\`

Dynamic pages (content after JavaScript) are **not** executed by BeautifulSoup - you need other tools (Selenium, Playwright); we do not cover them in the basic course.`
      },
      {
        title: "Summary",
        content: `BeautifulSoup complements \`requests\` when you need to extract data from HTML:

- \`BeautifulSoup(html, "html.parser")\` - document tree
- \`find\` / \`find_all\` / \`select\` - finding elements
- \`get_text(strip=True)\` - clean text
- A JSON API remains the priority when available

In the next lessons of module 9 you will use \`requests\` for full scraping and saving data.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Page title",
      code: `from bs4 import BeautifulSoup
import requests

r = requests.get("https://example.com", timeout=10)
soup = BeautifulSoup(r.text, "html.parser")
print(soup.title.string)`,
      explanation: "Fetch HTML and read the title tag content."
    },
    {
      title: "All links",
      code: `links = soup.find_all("a", href=True)
for a in links[:5]:
    print(a["href"])`,
      explanation: "find_all with href=True skips tags without an href attribute."
    },
    {
      title: "CSS selector",
      code: `items = soup.select("ul.menu li a")
for item in items:
    print(item.get_text(strip=True))`,
      explanation: "select works like CSS - handy for nested structures."
    }
  ],

  commonMistakes: [
    {
      mistake: "Parsing a JSON response with BeautifulSoup",
      explanation: "APIs return application/json, not HTML.",
      correctApproach: "Use response.json() for APIs."
    },
    {
      mistake: "Not checking the result of find",
      explanation: "find returns None when nothing matches - AttributeError follows.",
      correctApproach: "if element: ... or element = soup.find(...) or default"
    },
    {
      mistake: "Scraping without pauses or robots.txt checks",
      explanation: "You can overload the server or break site rules.",
      correctApproach: "Read robots.txt and add delays between requests."
    },
    {
      mistake: "Expecting BeautifulSoup to run JavaScript",
      explanation: "The library sees only the static HTML from the requests response.",
      correctApproach: "For SPAs you need browser tools or a ready-made API."
    }
  ],

  summary: `BeautifulSoup is a convenient HTML parser for web scraping when a JSON API is unavailable. In this course the priority is requests + APIs; Soup is an extra tool for understanding the full data-collection stack.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which package do you install for BeautifulSoup?",
        options: [
          "beautifulsoup4",
          "beautifulsoup",
          "bs4-only",
          "html5lib-only without bs4"
        ],
        correctAnswer: 0,
        explanation: "On PyPI the package is beautifulsoup4; the import is from bs4 import BeautifulSoup."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does find() return when the element is not found?",
        options: [
          "None",
          "An empty list",
          "A ValueError exception",
          "An empty string"
        ],
        correctAnswer: 0,
        explanation: "find returns None; find_all returns an empty list."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you search by CSS selector in BeautifulSoup?",
        options: [
          "soup.select('.class')",
          "soup.find(css='.class')",
          "soup.regex('.class')",
          "soup.get_css('.class')"
        ],
        correctAnswer: 0,
        explanation: "select and select_one accept CSS selectors."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is a JSON API better than BeautifulSoup?",
        options: [
          "When the site officially provides a structured API",
          "When the HTML is very large",
          "When you only need the title tag",
          "Never - Soup is always better"
        ],
        correctAnswer: 0,
        explanation: "An API is more stable and easier to maintain than scraping markup."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "BeautifulSoup executes JavaScript on the page before parsing.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Only the HTML returned by the HTTP request (for example via requests) is processed."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
