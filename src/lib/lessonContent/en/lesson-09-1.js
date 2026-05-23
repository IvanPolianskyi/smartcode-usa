/**
 * Lesson 09-1: HTTP requests with requests
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
    "Execute GET and POST requests",
    "Process responses",
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

- **GET** - receiving data from the server
- **POST** - sending data to the server
- **PUT** - data update
- **DELETE** - data deletion

**Library requests:**

- The most popular library for HTTP requests in Python
- Simple and convenient API
- Supports all types of HTTP requests
- Processing cookies, sessions, headers

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
        content: `**requests.get()** - executes a GET request to a URL.

\`\`\`python
import requests

# A simple GET request
response = requests.get('https://api.github.com')
print(response.status_code) # 200
print(response.text) # HTML or JSON response
\`\`\`

**Code Status:**

- **200** - OK (successful)
- **404** - Not Found
- **500** - Server Error (server error)
- **403** - Forbidden

\`\`\`python
import requests

response = requests.get('https://httpbin.org/get')
print(response.status_code) # 200

if response.status_code == 200:
    print('Successful!')
    print(response.text)
otherwise:
    print(f'Error: {response.status_code}')
\`\`\`

**Performance check:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

# The raise_for_status() method throws an exception on error
response.raise_for_status() # If status is not 200, raise HTTPError
\`\`\``
      },
      {
        title: "Query parameters",
        content: `**URL parameters (query parameters):**

\`\`\`python
import requests

# Adding parameters to the URL
params = {'key1': 'value1', 'key2': 'value2'}
response = requests.get('https://httpbin.org/get', params=params)

print(response.url)
# https://httpbin.org/get?key1=value1&key2=value2
\`\`\`

**Example with real API:**

\`\`\`python
import requests

# Search for repositories on GitHub
params = {
    'q': 'python',
    'sort': 'stars',
    'order': 'desc'
}

response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()

print(f"Found repositories: {data['total_count']}")
\`\`\``
      },
      {
        title: "POST requests",
        content: `**requests.post()** - performs a POST request with data.

\`\`\`python
import requests

# POST with data
data = {'name': 'Alexander', 'age': 25}
response = requests.post('https://httpbin.org/post', data=data)

print(response.status_code) # 200
print(response.json())
\`\`\`

**POST with JSON:**

\`\`\`python
import requests

# Sending JSON data
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

- **data** - sends data as form-data
- **json** - sends data as JSON (automatically sets Content-Type)

\`\`\`python
import requests

# Form data
response1 = requests.post('https://httpbin.org/post', data={'key': 'value'})

# JSON data
response2 = requests.post('https://httpbin.org/post', json={'key': 'value'})
\`\`\``
      },
      {
        title: "Response processing",
        content: `**Main methods of the Response object:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

# Text response
print(response.text) # str

# JSON response (if it's JSON)
print(response.json()) # dict or list

# Binary data
print(response.content) # bytes

# Response headers
print(response.headers) # dict

# Status code
print(response.status_code) # int

# Request URL
print(response.url) # str
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

**Error Handling:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError

try:
    response = requests.get('https://api.github.com/users/invalid-user-12345')
    response.raise_for_status() # Raise HTTPError if status is not 200
except HTTPError as e:
    print(f'HTTP error: {e}')
except RequestException as e:
    print(f'Query error: {e}')
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

Some sites will block requests without a User-Agent:

\`\`\`python
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

response = requests.get('https://example.com', headers=headers)
\`\`\`

**Reading the response headers:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

print(response.headers['Content-Type']) # application/json; charset=utf-8
print(response.headers.get('Server')) # GitHub.com
\`\`\``
      },
      {
        title: "Cookies and sessions",
        content: `**Working with cookies:**

\`\`\`python
import requests

# Sending cookies
cookies = {'session_id': 'abc123', 'user': 'admin'}
response = requests.get('https://httpbin.org/cookies', cookies=cookies)
print(response.json())

# Reading cookies from the response
response = requests.get('https://httpbin.org/cookies/set?name=value')
print(response.cookies) # <RequestsCookieJar>
print(response.cookies.get('name')) # value
\`\`\`

**Sessions:**

Sessions save cookies between requests:

\`\`\`python
import requests

# Creating a session
session = requests.Session()

# All requests through the session use the same cookies
session.get('https://httpbin.org/cookies/set/sessioncookie/123456789')
response = session.get('https://httpbin.org/cookies')
print(response.json()) # {'cookies': {'sessioncookie': '123456789'}}
\`\`\`

**Example: Authorization:**

\`\`\`python
import requests

session = requests.Session()

# Login
login_data = {'username': 'user', 'password': 'pass'}
session.post('https://example.com/login', data=login_data)

# You can now make authorized requests
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
    # Timeout 5 seconds
    response = requests.get('https://httpbin.org/delay/10', timeout=5)
except Timeout:
    print('Request timed out')
\`\`\`

**Full Error Handling:**

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
        print('Request Timeout')
    except ConnectionError:
        print('Connection Error')
    except RequestException as e:
        print(f'Query error: {e}')
    return None

data = make_request('https://api.github.com/users/octocat')
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Obtaining the weather (simulation)**

\`\`\`python
import requests

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

**Example 2: Checking the accessibility of the site**

\`\`\`python
import requests

def check_site(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f'{url} - available')
            return True
        otherwise:
            print(f'{url} - status {response.status_code}')
            return False
    except RequestException as e:
        print(f'{url} - unavailable: {e}')
        return False

check_site('https://google.com')
\`\`\`

**Example 3: Downloading a file**

\`\`\`python
import requests

def download_file(url, filename):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'File saved: {filename}')
    except RequestException as e:
        print(f'Error loading: {e}')

# Loading image
download_file('https://example.com/image.jpg', 'image.jpg')
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we learned how to work with HTTP requests:

**Key Methods:**

1. **requests.get()** - GET request
2. **requests.post()** - POST request
3. **response.json()** - JSON parsing of the response
4. **response.text** - text response
5. **response.status_code** - status code

**Basic concepts:**

- GET - receiving data
- POST - sending data
- Headers - request metadata
- Cookies - state saving
- Sessions - saving cookies between requests
- Timeouts - waiting time limit

**Important:**

- Always handle errors
- Use timeouts
- Follow robots.txt rules
- Respect server restrictions

**Next step:**

In the next lesson, we will briefly get acquainted with BeautifulSoup - a tool for parsing HTML, but we will pay the main attention to working with the JSON API through requests.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: A simple GET request",
      code: `import requests

response = requests.get('https://api.github.com')
print(response.status_code)  # 200
print(response.json())`,
      explanation: "We perform a simple GET request to the GitHub API and display the result."
    },
    {
      title: "Example 2: GET with parameters",
      code: `import requests

params = {'q': 'python', 'sort': 'stars'}
response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()
print(f"Found: {data['total_count']} repositories")`,
      explanation: "We execute a GET request with search parameters."
    },
    {
      title: "Example 3: POST request",
      code: `import requests

data = {'name': 'Alexander', 'age': 25}
response = requests.post('https://httpbin.org/post', json=data)
print(response.json())`,
      explanation: "We execute a POST request with JSON data."
    },
    {
      title: "Example 4: Working with sessions",
      code: `import requests

session = requests.Session()
session.get('https://httpbin.org/cookies/set/session/123')
response = session.get('https://httpbin.org/cookies')
print(response.json())`,
      explanation: "We use a session to save cookies between requests."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not handle query errors",
      explanation: "Requests may fail due to network issues, timeouts, or server errors.",
      correctApproach: "Always use try/except to handle RequestException and check the status_code."
    },
    {
      mistake: "Forget about timeouts",
      explanation: "Without timeouts, the request can wait for a very long time.",
      correctApproach: "Always set the timeout parameter: requests.get(url, timeout=5)."
    },
    {
      mistake: "Confuse data and json parameters",
      explanation: "data sends form-data, json sends JSON with correct headers.",
      correctApproach: "Use json= for JSON data, data= for form-data."
    },
    {
      mistake: "Do not check the status code",
      explanation: "Even with an error (404, 500), requests will not automatically throw an exception.",
      correctApproach: "Use response.raise_for_status() or check response.status_code."
    }
  ],
  
  summary: `In this lesson, we learned how to work with HTTP requests:

1. requests.get() - receiving data
2. requests.post() - sending data
3. Headers and cookies - request settings
4. Sessions - saving state
5. Error handling - correct handling of exceptions

The requests library is a powerful tool for working with web APIs!`,
  
  practiceTask: {
    title: "Creating a client API",
    description: "Create a simple client to work with the public API",
    problemStatement: `Create a function to retrieve information about a GitHub user:
1. The function accepts username
2. Makes a GET request to the GitHub API
3. Returns user information (name, bio, number of repositories)
4. Handles errors (user not found, network errors)

API endpoint: https://api.github.com/users/{username}`,
    outputFormat: `User information:
Name: Oleksandr
Bio: Python Developer
Public repositories: 15`,
    examples: [
      {
        output: `User information:
Name: The Octocat
Bio: None
Public repositories: 8`,
        explanation: "We get data about user octocat from the GitHub API."
      }
    ],
    solution: {
      code: `import requests
from requests.exceptions import RequestException, HTTPError

def get_github_user(username):
    url = f'https://api.github.com/users/{username}'
    
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        
        user_data = response.json()
        
        print(f"User Information:")
        print(f"Name: {user_data.get('name', 'Not Specified')}")
        print(f"Bio: {user_data.get('bio', 'Not Specified')}")
        print(f"Public repositories: {user_data.get('public_repos', 0)}")
        
        return user_data
        
    except HTTPError as e:
        if e.response.status_code == 404:
            print(f'User {username} not found')
        otherwise:
            print(f'HTTP error: {e}')
        return None
    except RequestException as e:
        print(f'Query error: {e}')
        return None

# Usage
get_github_user('octocat')`,
      explanation: "We create a function with error handling to retrieve data about a GitHub user."
    },
    hints: [
      "Use the f-string to form the URL",
      "Use response.raise_for_status() to check the status",
      "Handle HTTPError for 404 errors",
      "Use .get() to safely access dictionary keys"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which requests method is used to get data?",
        options: [
          "requests.get()",
          "requests.fetch()",
          "requests.retrieve()",
          "requests.download()"
        ],
        correctAnswer: 0,
        explanation: "requests.get() is used to perform HTTP GET requests."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between data and json parameters in requests.post()?",
        options: [
          "data sends form-data, json sends JSON with correct headers",
          "json sends form-data, data sends JSON",
          "There is no difference",
          "data is faster"
        ],
        correctAnswer: 0,
        explanation: "data sends the data as form-data and json automatically sets Content-Type: application/json and serializes the data."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does status code 404 mean?",
        options: [
          "Not Found - the resource was not found",
          "OK - successful",
          "Server Error - server error",
          "Forbidden - forbidden"
        ],
        correctAnswer: 0,
        explanation: "404 means that the requested resource was not found on the server."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why use sessions (requests.Session())?",
        options: [
          "To save cookies between requests",
          "To speed up queries",
          "To encrypt data",
          "To cache responses"
        ],
        correctAnswer: 0,
        explanation: "Sessions store cookies and other settings between multiple requests, which is useful for authorization."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "requests automatically throws an exception with a status code of 404.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. requests does not raise an exception automatically. You need to use response.raise_for_status() or check the response.status_code manually."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


