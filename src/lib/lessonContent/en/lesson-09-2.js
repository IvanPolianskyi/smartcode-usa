/**
 * Lesson 09-2: Additional tools: BeautifulSoup
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_2 = {
  lessonId: "lesson-09-2",
  moduleId: "module-09",
  order: 2,
  title: "Additional tools: BeautifulSoup",

  learningObjectives: [
    "Understand BeautifulSoup and its role in web scraping",
    "Tell HTML parsing apart from JSON API workflows",
    "Use find and find_all to locate elements",
    "Pick the right tool for the job"
  ],

  prerequisites: ["lesson-09-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is BeautifulSoup?",
        content: `**BeautifulSoup** (package \`beautifulsoup4\`) parses HTML and XML in Python. It turns raw HTML strings into a navigable DOM tree.

**Why use it:**

- Many sites expose data only in HTML, not via a public API
- Real-world HTML is often messy — BeautifulSoup tries to fix it
- \`find\` / \`find_all\` are easier to maintain than huge regex patterns

**Install:**

\`\`\`bash
pip install beautifulsoup4
pip install lxml  # optional, faster parser
\`\`\`

\`\`\`python
from bs4 import BeautifulSoup
\`\`\`

**In this course:** we focus on \`requests\` + JSON APIs. BeautifulSoup is an extra tool when no API exists or data lives only on the page.`
      },
      {
        title: "First HTML parse",
        content: `\`\`\`python
from bs4 import BeautifulSoup
import requests

url = "https://example.com"
response = requests.get(url, timeout=10)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")
print(soup.title.string)
\`\`\`

| Parser | When |
|--------|------|
| \`html.parser\` | Built-in, no extra install |
| \`lxml\` | Faster on large pages |

Each tag is a node; use \`.parent\`, \`.children\`, \`.next_sibling\` to walk the tree.`
      },
      {
        title: "Finding elements: find and find_all",
        content: `\`\`\`python
header = soup.find("h1")
links = soup.find_all("a", href=True)
cards = soup.find_all("div", class_="product-card")
nav = soup.find(id="main-nav")

prices = soup.select("span.price")
first = soup.select_one("article.post h2")
\`\`\`

Inspect the page in browser DevTools first, then copy a stable selector into code.`
      },
      {
        title: "Text and attributes",
        content: `\`\`\`python
p = soup.find("p", class_="lead")
if p:
    print(p.get_text(strip=True))

all_text = soup.get_text(separator="\\n", strip=True)

img = soup.find("img")
if img and img.get("src"):
    print(img["src"])
\`\`\`

If text looks wrong, check \`response.encoding\` or \`response.apparent_encoding\`.`
      },
      {
        title: "BeautifulSoup vs JSON API vs regex",
        content: `Prefer **JSON API** when available. Use **BeautifulSoup** when data is only in HTML and scraping is allowed (\`robots.txt\`, terms of service). Use **regex** only for tiny, stable snippets — not whole pages.

\`\`\`python
data = response.json()  # not BeautifulSoup for JSON APIs
\`\`\``
      },
      {
        title: "Ethics and limits",
        content: `Check robots.txt, terms of use, rate limits, and use an honest User-Agent. BeautifulSoup does **not** run JavaScript — dynamic SPAs need browser tools or an API.

\`\`\`python
import time
headers = {"User-Agent": "SmartCode-Learning-Bot/1.0"}
time.sleep(1)  # pause between requests
\`\`\``
      },
      {
        title: "Summary",
        content: `BeautifulSoup complements requests when you must read HTML. In module 9 you will keep using requests for full scraping workflows; Soup fills the gap when no API exists.`
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
      explanation: "Fetch HTML and read the title tag."
    },
    {
      title: "All links",
      code: `for a in soup.find_all("a", href=True)[:5]:
    print(a["href"])`,
      explanation: "href=True skips anchors without href."
    },
    {
      title: "CSS selector",
      code: `for item in soup.select("ul.menu li a"):
    print(item.get_text(strip=True))`,
      explanation: "select() accepts CSS selectors."
    }
  ],

  commonMistakes: [
    {
      mistake: "Parsing JSON with BeautifulSoup",
      explanation: "APIs return application/json.",
      correctApproach: "Use response.json()."
    },
    {
      mistake: "Not checking find() result",
      explanation: "find returns None if missing.",
      correctApproach: "if element: ... before calling methods."
    },
    {
      mistake: "Scraping without delays or robots.txt check",
      explanation: "Can overload servers or break rules.",
      correctApproach: "Read robots.txt and sleep between requests."
    },
    {
      mistake: "Expecting JavaScript execution",
      explanation: "Only static HTML from the HTTP response is parsed.",
      correctApproach: "Use browser automation or an API for SPAs."
    }
  ],

  summary: `BeautifulSoup is a handy HTML parser when no JSON API exists. This course prioritizes requests + APIs; Soup completes the picture of how data is collected from the web.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which package do you install for BeautifulSoup?",
        options: ["beautifulsoup4", "beautifulsoup", "bs4-only", "html5lib-only without bs4"],
        correctAnswer: 0,
        explanation: "PyPI package name is beautifulsoup4; import is from bs4 import BeautifulSoup."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does find() return if nothing matches?",
        options: ["None", "Empty list", "ValueError", "Empty string"],
        correctAnswer: 0,
        explanation: "find → None; find_all → []."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you search by CSS selector?",
        options: ["soup.select('.class')", "soup.find(css='.class')", "soup.regex('.class')", "soup.get_css('.class')"],
        correctAnswer: 0,
        explanation: "Use select() or select_one()."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is a JSON API better than BeautifulSoup?",
        options: [
          "When the site offers a stable structured API",
          "When HTML is very large",
          "When you only need the title",
          "Never — Soup is always better"
        ],
        correctAnswer: 0,
        explanation: "APIs are easier to maintain than layout parsing."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "BeautifulSoup runs JavaScript on the page before parsing.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False — only the HTML returned by HTTP (e.g. requests) is parsed."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
