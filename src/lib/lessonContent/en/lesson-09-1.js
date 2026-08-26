/**
 * Lesson 09-1: HTTP requests: requests
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_1 = {
  lessonId: "lesson-09-1",
  moduleId: "module-09",
  order: 1,
  title: "HTTP requests: requests",
  
  learningObjectives: [
    "Install and use requests",
    "Perform GET and POST requests",
    "Handle responses",
    "Work with headers and cookies"
  ],
  
  prerequisites: ["lesson-08-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to HTTP requests",
        content: `HTTP (HyperText Transfer Protocol) is a protocol for transferring data between a client and a server.

**What are HTTP requests?**

- **GET** - retrieve data from the server
- **POST** - send data to the server
- **PUT** - update data
- **DELETE** - delete data

**The requests library:**

- The most popular library for HTTP requests in Python
- Simple, convenient API
- Supports all HTTP methods
- Handles cookies, sessions, and headers

**Installation:**

\`\`\`bash
pip install requests
\`\`\`

**Import:**

\`\`\`python
import requests
\`\`\``
      },
      {
        title: "GET requests",
        content: `**requests.get()** performs a GET request to a URL.

\`\`\`python
import requests

# Simple GET request
response = requests.get('https://api.github.com')
print(response.status_code)  # 200
print(response.text)  # HTML or JSON response
\`\`\`

**Status codes:**

- **200** - OK (success)
- **404** - Not Found
- **500** - Server Error
- **403** - Forbidden

\`\`\`python
import requests

response = requests.get('https://httpbin.org/get')
print(response.status_code)  # 200

if response.status_code == 200:
    print('Success!')
    print(response.text)
else:
    print(f'Error: {response.status_code}')
\`\`\`

**Checking success:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

# raise_for_status() raises an exception on error
response.raise_for_status()  # If status is not 2xx, raises HTTPError
\`\`\``
      },
      {
        title: "Request parameters",
        content: `**URL parameters (query parameters):**

\`\`\`python
import requests

# Add parameters to the URL
params = {'key1': 'value1', 'key2': 'value2'}
response = requests.get('https://httpbin.org/get', params=params)

print(response.url)
# https://httpbin.org/get?key1=value1&key2=value2
\`\`\`

**Example with a real API:**

\`\`\`python
import requests

# Search repositories on GitHub
params = {
    'q': 'python',
    'sort': 'stars',
    'order': 'desc'
}

response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()

print(f"Repositories found: {data['total_count']}")
\`\`\``
      },
      {
        title: "POST requests",
        content: `**requests.post()** performs a POST request with data.

\`\`\`python
import requests

# POST with form data
data = {'name': 'Alexander', 'age': 25}
response = requests.post('https://httpbin.org/post', data=data)

print(response.status_code)  # 200
print(response.json())
\`\`\`

**POST with JSON:**

\`\`\`python
import requests

# Send JSON data
json_data = {
    'username': 'user123',
    'email': 'user@example.com'
}

response = requests.post(
    'https://httpbin.org/post',
    json=json_data
)

print(response.json())
\`\`\`

**Difference between data and json:**

- **data** - sends form-data
- **json** - sends JSON (sets Content-Type automatically)

\`\`\`python
import requests

# Form data
response1 = requests.post('https://httpbin.org/post', data={'key': 'value'})

# JSON data
response2 = requests.post('https://httpbin.org/post', json={'key': 'value'})
\`\`\``
      },
      {
        title: "Handling the response",
        content: `**Main Response object methods:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

# Text response
print(response.text)  # str

# JSON response (if the body is JSON)
print(response.json())  # dict or list

# Binary data
print(response.content)  # bytes

# Response headers
print(response.headers)  # dict

# Status code
print(response.status_code)  # int

# Request URL
print(response.url)  # str
\`\`\`

**Working with JSON:**

\`\`\`python
import requests

response = requests.get('https://api.github.com/users/octocat')

if response.status_code == 200:
    user_data = response.json()
    print(f"Name: {user_data['name']}")
    print(f"Location: {user_data['location']}")
    print(f"Public repositories: {user_data['public_repos']}")
\`\`\`

**Error handling:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError

try:
    response = requests.get('https://api.github.com/users/invalid-user-12345')
    response.raise_for_status()  # Raises HTTPError if status is not 2xx
except HTTPError as e:
    print(f'HTTP error: {e}')
except RequestException as e:
    print(f'Request error: {e}')
\`\`\``
      },
      {
        title: "Headers",
        content: `**Sending headers:**

\`\`\`python
import requests

headers = {
    'User-Agent': 'MyApp/1.0',
    'Accept': 'application/json',
    'Authorization': 'Bearer token123'
}

response = requests.get('https://httpbin.org/headers', headers=headers)
print(response.json())
\`\`\`

**User-Agent:**

Some sites block requests without a User-Agent:

\`\`\`python
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

response = requests.get('https://example.com', headers=headers)
\`\`\`

**Reading response headers:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

print(response.headers['Content-Type'])  # application/json; charset=utf-8
print(response.headers.get('Server'))  # GitHub.com
\`\`\``
      },
      {
        title: "Cookies and sessions",
        content: `**Working with cookies:**

\`\`\`python
import requests

# Send cookies
cookies = {'session_id': 'abc123', 'user': 'admin'}
response = requests.get('https://httpbin.org/cookies', cookies=cookies)
print(response.json())

# Read cookies from the response
response = requests.get('https://httpbin.org/cookies/set?name=value')
print(response.cookies)  # <RequestsCookieJar>
print(response.cookies.get('name'))  # value
\`\`\`

**Sessions:**

Sessions keep cookies between requests:

\`\`\`python
import requests

# Create a session
session = requests.Session()

# All requests through the session share cookies
session.get('https://httpbin.org/cookies/set/sessioncookie/123456789')
response = session.get('https://httpbin.org/cookies')
print(response.json())  # {'cookies': {'sessioncookie': '123456789'}}
\`\`\`

**Example: authentication:**

\`\`\`python
import requests

session = requests.Session()

# Login
login_data = {'username': 'user', 'password': 'pass'}
session.post('https://example.com/login', data=login_data)

# Now you can make authenticated requests
response = session.get('https://example.com/profile')
\`\`\``
      },
      {
        title: "Timeouts and error handling",
        content: `**Timeouts:**

\`\`\`python
import requests
from requests.exceptions import Timeout

try:
    # 5-second timeout
    response = requests.get('https://httpbin.org/delay/10', timeout=5)
except Timeout:
    print('Request timed out')
\`\`\`

**Full error handling:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError, Timeout, ConnectionError

def make_request(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        print(f'HTTP error: {e}')
    except Timeout:
        print('Request timeout')
    except ConnectionError:
        print('Connection error')
    except RequestException as e:
        print(f'Request error: {e}')
    return None

data = make_request('https://api.github.com/users/octocat')
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Weather (simulation)**

\`\`\`python
import requests
from requests.exceptions import RequestException

def get_weather(city):
    # Weather API simulation
    url = f'https://wttr.in/{city}?format=j1'
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        current = data['current_condition'][0]
        print(f"Weather in {city}:")
        print(f"Temperature: {current['temp_C']}°C")
        print(f"Description: {current['weatherDesc'][0]['value']}")
    except RequestException as e:
        print(f'Error: {e}')

get_weather('Kyiv')
\`\`\`

**Example 2: Check if a site is up**

\`\`\`python
import requests
from requests.exceptions import RequestException

def check_site(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f'{url} - available')
            return True
        else:
            print(f'{url} - status {response.status_code}')
            return False
    except RequestException as e:
        print(f'{url} - unavailable: {e}')
        return False

check_site('https://google.com')
\`\`\`

**Example 3: Download a file**

\`\`\`python
import requests
from requests.exceptions import RequestException

def download_file(url, filename):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'File saved: {filename}')
    except RequestException as e:
        print(f'Download error: {e}')

# Download an image
download_file('https://example.com/image.jpg', 'image.jpg')
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned how to work with HTTP requests:

**Key methods:**

1. **requests.get()** - GET request
2. **requests.post()** - POST request
3. **response.json()** - parse JSON response
4. **response.text** - text response
5. **response.status_code** - status code

**Core ideas:**

- GET - retrieve data
- POST - send data
- Headers - request metadata
- Cookies - keep state
- Sessions - keep cookies across requests
- Timeouts - limit wait time

**Important:**

- Always handle errors
- Use timeouts
- Respect robots.txt
- Respect server rate limits

**Next step:**

In the next lesson we briefly meet BeautifulSoup for HTML parsing, while the main focus stays on JSON APIs with requests.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Simple GET request",
      code: `import requests

response = requests.get('https://api.github.com')
print(response.status_code)  # 200
print(response.json())`,
      explanation: "Perform a simple GET request to the GitHub API and print the result."
    },
    {
      title: "Example 2: GET with parameters",
      code: `import requests

params = {'q': 'python', 'sort': 'stars'}
response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()
print(f"Found: {data['total_count']} repositories")`,
      explanation: "Perform a GET request with search parameters."
    },
    {
      title: "Example 3: POST request",
      code: `import requests

data = {'name': 'Alexander', 'age': 25}
response = requests.post('https://httpbin.org/post', json=data)
print(response.json())`,
      explanation: "Perform a POST request with JSON data."
    },
    {
      title: "Example 4: Working with sessions",
      code: `import requests

session = requests.Session()
session.get('https://httpbin.org/cookies/set/session/123')
response = session.get('https://httpbin.org/cookies')
print(response.json())`,
      explanation: "Use a session to keep cookies between requests."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not handling request errors",
      explanation: "Requests can fail due to network issues, timeouts, or server errors.",
      correctApproach: "Always use try/except for RequestException and check status_code."
    },
    {
      mistake: "Forgetting timeouts",
      explanation: "Without a timeout, a request can hang for a long time.",
      correctApproach: "Always set timeout: requests.get(url, timeout=5)."
    },
    {
      mistake: "Confusing data and json parameters",
      explanation: "data sends form-data; json sends JSON with the correct headers.",
      correctApproach: "Use json= for JSON data, data= for form-data."
    },
    {
      mistake: "Not checking the status code",
      explanation: "Even on errors (404, 500), requests does not raise by default.",
      correctApproach: "Use response.raise_for_status() or check response.status_code."
    }
  ],
  
  summary: `In this lesson we learned how to work with HTTP requests:

1. requests.get() - retrieve data
2. requests.post() - send data
3. Headers and cookies - configure requests
4. Sessions - keep state
5. Error handling - handle exceptions correctly

The requests library is a powerful tool for working with web APIs!`,
  
  practiceTask: {
    title: "Build an API client",
    description: "Create a simple client for user data (no network)",
    problemStatement: `Create a function get_user_info(username) that:
1. Looks up the user in the USERS dictionary “database”
2. If found - prints name, bio, and repository count
3. If not - prints a message that the user was not found

Read username with input() and call the function.

USERS is already defined in the solution (copy it into your code).`,
    outputFormat: `User information:
Name: The Octocat
Bio: GitHub mascot
Public repositories: 8`,
    examples: [
      {
        input: `octocat`,
        output: `User information:
Name: The Octocat
Bio: GitHub mascot
Public repositories: 8`,
        explanation: "User octocat is in the database"
      },
      {
        input: `torvalds`,
        output: `User information:
Name: Linus Torvalds
Bio: Linux creator
Public repositories: 1`,
        explanation: "User torvalds is in the database"
      },
      {
        input: `unknown_user`,
        output: `User unknown_user not found`,
        explanation: "Missing user"
      }
    ],
    solution: {
      code: `USERS = {
    'octocat': {'name': 'The Octocat', 'bio': 'GitHub mascot', 'public_repos': 8},
    'torvalds': {'name': 'Linus Torvalds', 'bio': 'Linux creator', 'public_repos': 1},
    'gvanrossum': {'name': 'Guido van Rossum', 'bio': 'Python BDFL', 'public_repos': 12},
}

def get_user_info(username):
    user_data = USERS.get(username)
    if user_data is None:
        print(f'User {username} not found')
        return None

    print('User information:')
    print(f"Name: {user_data.get('name', 'Not specified')}")
    print(f"Bio: {user_data.get('bio', 'Not specified')}")
    print(f"Public repositories: {user_data.get('public_repos', 0)}")
    return user_data

username = input().strip()
get_user_info(username)`,
      explanation: "We use a local dictionary instead of a network API - stable tests."
    },
    hints: [
      "Copy the USERS dictionary into your code",
      "Use USERS.get(username)",
      "Read username with input().strip()",
      "For a missing key, print an error message"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which requests method is used to retrieve data?",
        options: [
          "requests.get()",
          "requests.fetch()",
          "requests.retrieve()",
          "requests.download()"
        ],
        correctAnswer: 0,
        explanation: "requests.get() performs HTTP GET requests."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between data and json in requests.post()?",
        options: [
          "data sends form-data; json sends JSON with the correct headers",
          "json sends form-data; data sends JSON",
          "There is no difference",
          "data is faster"
        ],
        correctAnswer: 0,
        explanation: "data sends form-data; json sets Content-Type: application/json and serializes the payload."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does status code 404 mean?",
        options: [
          "Not Found - the resource was not found",
          "OK - success",
          "Server Error - server error",
          "Forbidden - access denied"
        ],
        correctAnswer: 0,
        explanation: "404 means the requested resource was not found on the server."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why use sessions (requests.Session())?",
        options: [
          "To keep cookies between requests",
          "To speed up requests",
          "To encrypt data",
          "To cache responses"
        ],
        correctAnswer: 0,
        explanation: "Sessions keep cookies and other settings across multiple requests - useful for authentication."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "requests automatically raises an exception on status code 404.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. requests does not raise automatically. Use response.raise_for_status() or check response.status_code."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
