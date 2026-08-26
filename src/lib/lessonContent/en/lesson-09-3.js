/**
 * Lesson 09-3: Web Scraping
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_3 = {
  lessonId: "lesson-09-3",
  moduleId: "module-09",
  order: 3,
  title: "Web Scraping",
  
  learningObjectives: [
    "Build a scraper for a website",
    "Handle dynamic pages",
    "Store the collected data",
    "Follow robots.txt rules"
  ],
  
  prerequisites: ["lesson-09-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to web scraping",
        content: `Web scraping is the automated process of collecting data from websites.

**What is web scraping?**

- Automatically extracting data from web pages
- Converting HTML into structured data
- Saving data for later analysis
- Automating routine tasks

**When to use scraping:**

- Collecting data for analysis
- Monitoring prices and products
- Gathering news and articles
- Building datasets
- Integrating with an API (when no API is available)

**Ethical considerations:**

- Follow robots.txt
- Do not overload the server with requests
- Respect copyright
- Use delays between requests
- Check the Terms of Service`
      },
      {
        title: "Scraping tools",
        content: `**BeautifulSoup — a library for parsing HTML**

BeautifulSoup is a powerful Python library for parsing HTML and XML. It makes it easy to find and extract data from HTML pages.

**Main BeautifulSoup methods:**

- \`soup.find('tag')\` — find the first element
- \`soup.find_all('tag')\` — find all matching elements
- \`soup.find('div', class_='content')\` — search by class
- \`element.get_text()\` — get the text from an element

**Note:** BeautifulSoup requires installation (\`pip install beautifulsoup4\`). In this course we show BeautifulSoup examples for demonstration, but for practice tasks we recommend using JSON APIs via requests — it is simpler and needs no extra libraries.`
      },
      {
        title: "Scraper structure",
        content: `**Main components of a scraper:**

1. **Fetching the page** — requests
2. **Parsing HTML** — BeautifulSoup (for complex HTML) or JSON (if an API is available)
3. **Extracting data** — finding elements
4. **Saving data** — JSON, CSV, database
5. **Error handling** — try/except

**Basic scraper template with BeautifulSoup:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import time
import json

def scrape_website(url):
    # 1. Fetch
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    response.raise_for_status()
    
    # 2. Parse HTML (if needed)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 3. Extract data
    data = extract_data(soup)
    
    # 4. Save
    save_data(data)
    
    return data

def extract_data(soup):
    # Extraction logic
    pass

def save_data(data):
    # Save logic
    pass
\`\`\`

**Alternative: using a JSON API (recommended):**

\`\`\`python
import requests
import json

def scrape_with_api(api_url):
    response = requests.get(api_url)
    data = response.json()  # Simply get JSON
    return data
\`\`\``
      },
      {
        title: "Handling multi-page content",
        content: `**Scraping multiple pages:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import time

def scrape_multiple_pages(base_url, num_pages):
    all_data = []
    
    for page in range(1, num_pages + 1):
        url = f'{base_url}?page={page}'
        
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            page_data = extract_data(soup)
            all_data.extend(page_data)
            
            # Delay between requests
            time.sleep(1)
            
            print(f'Processed page {page}')
            
        except Exception as e:
            print(f'Error on page {page}: {e}')
            continue
    
    return all_data
\`\`\`

**Finding links to the next pages:**

\`\`\`python
from bs4 import BeautifulSoup
import requests

def scrape_with_pagination(start_url):
    all_data = []
    current_url = start_url
    
    while current_url:
        response = requests.get(current_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract data
        data = extract_data(soup)
        all_data.extend(data)
        
        # Find the link to the next page
        next_link = soup.find('a', class_='next-page')
        if next_link:
            current_url = next_link['href']
        else:
            current_url = None
        
        time.sleep(1)  # Delay
    
    return all_data
\`\`\``
      },
      {
        title: "Handling dynamic pages",
        content: `**The JavaScript problem:**

Some sites load content with JavaScript, which requests does not execute.

**Solution 1: Analyze AJAX requests**

\`\`\`python
import requests
import json

# Find the API endpoint the site uses
api_url = 'https://example.com/api/data'

# Request the API directly
response = requests.get(api_url, headers={
    'X-Requested-With': 'XMLHttpRequest'
})

data = response.json()
# Work with JSON instead of HTML
\`\`\`

**Solution 2: Selenium (for complex cases)**

\`\`\`python
from selenium import webdriver
from bs4 import BeautifulSoup

# Launch the browser
driver = webdriver.Chrome()
driver.get('https://example.com')

# Wait for JavaScript to load
time.sleep(2)

# Get HTML after JS has run
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

driver.quit()
\`\`\`

**Checking for dynamic content:**

\`\`\`python
import requests

response = requests.get('https://example.com')
html = response.text

# If the needed data is missing from the HTML, it may load via JS
if 'expected-content' not in html:
    print('Content is loaded dynamically')
\`\`\``
      },
      {
        title: "Working with forms and POST requests",
        content: `**Scraping with authentication:**

\`\`\`python
import requests
from bs4 import BeautifulSoup

# Create a session
session = requests.Session()

# Log in
login_url = 'https://example.com/login'
login_data = {
    'username': 'user',
    'password': 'pass'
}

response = session.post(login_url, data=login_data)
response.raise_for_status()

# Now we can make authenticated requests
protected_url = 'https://example.com/profile'
response = session.get(protected_url)
soup = BeautifulSoup(response.text, 'html.parser')
\`\`\`

**Submitting forms:**

\`\`\`python
import requests
from bs4 import BeautifulSoup

# Get the form
response = requests.get('https://example.com/form')
soup = BeautifulSoup(response.text, 'html.parser')

# Find the CSRF token (if present)
csrf_token = soup.find('input', {'name': 'csrf_token'})['value']

# Submit the form
form_data = {
    'csrf_token': csrf_token,
    'field1': 'value1',
    'field2': 'value2'
}

response = requests.post('https://example.com/form', data=form_data)
\`\`\``
      },
      {
        title: "Handling different data formats",
        content: `**Saving to JSON:**

\`\`\`python
import json

def save_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f'Data saved to {filename}')

# Usage
scraped_data = [
    {'title': 'Article 1', 'url': 'https://example.com/1'},
    {'title': 'Article 2', 'url': 'https://example.com/2'}
]

save_to_json(scraped_data, 'articles.json')
\`\`\`

**Saving to CSV:**

\`\`\`python
import csv

def save_to_csv(data, filename):
    if not data:
        return
    
    # Get keys from the first item
    fieldnames = data[0].keys()
    
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    
    print(f'Data saved to {filename}')

# Usage
save_to_csv(scraped_data, 'articles.csv')
\`\`\`

**Saving to a database:**

\`\`\`python
import sqlite3

def save_to_database(data, db_name='scraped_data.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    
    # Create the table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert data
    for item in data:
        cursor.execute(
            'INSERT INTO articles (title, url) VALUES (?, ?)',
            (item['title'], item['url'])
        )
    
    conn.commit()
    conn.close()
    print(f'Data saved to database {db_name}')
\`\`\``
      },
      {
        title: "Error handling and retry logic",
        content: `**Retry mechanism:**

\`\`\`python
import requests
import time
from requests.exceptions import RequestException

def fetch_with_retry(url, max_retries=3, delay=1):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response
        except RequestException as e:
            if attempt < max_retries - 1:
                print(f'Attempt {attempt + 1} failed, retrying in {delay} sec...')
                time.sleep(delay)
            else:
                print(f'All attempts failed: {e}')
                raise
    
    return None

# Usage
response = fetch_with_retry('https://example.com')
\`\`\`

**Handling different error types:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError, Timeout, ConnectionError

def safe_scrape(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response
    except HTTPError as e:
        if e.response.status_code == 404:
            print(f'Page not found: {url}')
        elif e.response.status_code == 403:
            print(f'Access denied: {url}')
        else:
            print(f'HTTP error {e.response.status_code}: {url}')
    except Timeout:
        print(f'Timeout for {url}')
    except ConnectionError:
        print(f'Connection error with {url}')
    except RequestException as e:
        print(f'Request error for {url}: {e}')
    
    return None
\`\`\``
      },
      {
        title: "Robots.txt and ethical scraping",
        content: `**Checking robots.txt:**

\`\`\`python
import requests
from urllib.robotparser import RobotFileParser

def check_robots_txt(base_url, path):
    rp = RobotFileParser()
    rp.set_url(f'{base_url}/robots.txt')
    rp.read()
    
    if rp.can_fetch('*', path):
        print(f'Scraping allowed: {path}')
        return True
    else:
        print(f'Scraping forbidden: {path}')
        return False

# Usage
base_url = 'https://example.com'
path = '/articles'
check_robots_txt(base_url, path)
\`\`\`

**Ethical practices:**

1. **Delays between requests:**
\`\`\`python
import time

for url in urls:
    response = requests.get(url)
    # Delay of 1–2 seconds
    time.sleep(1.5)
\`\`\`

2. **User-Agent:**
\`\`\`python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
response = requests.get(url, headers=headers)
\`\`\`

3. **Rate limiting:**
\`\`\`python
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests, time_window):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def wait_if_needed(self):
        now = time.time()
        # Remove old requests
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        # If we hit the limit, wait
        if len(self.requests) >= self.max_requests:
            sleep_time = self.time_window - (now - self.requests[0])
            time.sleep(sleep_time)
        
        self.requests.append(time.time())

# Usage
limiter = RateLimiter(max_requests=10, time_window=60)  # 10 requests per minute

for url in urls:
    limiter.wait_if_needed()
    response = requests.get(url)
\`\`\``
      },
      {
        title: "Practical example: News scraper",
        content: `**Complete scraper example:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import json
import time
from datetime import datetime

class NewsScraper:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.articles = []
    
    def scrape_page(self, url):
        try:
            response = self.session.get(url, timeout=5)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all articles (example structure)
            article_elements = soup.find_all('article', class_='news-item')
            
            for article in article_elements:
                title = article.find('h2').text.strip()
                link = article.find('a')['href']
                date = article.find('time')['datetime']
                summary = article.find('p', class_='summary').text.strip()
                
                self.articles.append({
                    'title': title,
                    'link': self.base_url + link if link.startswith('/') else link,
                    'date': date,
                    'summary': summary,
                    'scraped_at': datetime.now().isoformat()
                })
            
            return True
            
        except Exception as e:
            print(f'Error scraping {url}: {e}')
            return False
    
    def scrape_all(self, num_pages=5):
        for page in range(1, num_pages + 1):
            url = f'{self.base_url}/news?page={page}'
            print(f'Scraping page {page}...')
            
            if self.scrape_page(url):
                time.sleep(2)  # Delay between pages
            else:
                break
        
        return self.articles
    
    def save(self, filename='news.json'):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.articles, f, indent=2, ensure_ascii=False)
        print(f'Saved {len(self.articles)} articles to {filename}')

# Usage
scraper = NewsScraper('https://example.com')
articles = scraper.scrape_all(num_pages=3)
scraper.save('news.json')
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned how to build web scrapers:

**Key concepts:**

1. **Scraper structure** — fetch, parse, save
2. **Multi-page scraping** — handling several pages
3. **Dynamic content** — working with JavaScript
4. **Saving data** — JSON, CSV, database
5. **Error handling** — retry logic
6. **Ethical scraping** — robots.txt, delays

**Important practices:**

- Use delays between requests
- Follow robots.txt
- Handle all types of errors
- Set a User-Agent
- Limit request frequency
- Respect the Terms of Service

**Next step:**

In the next lesson we will build a complete web scraping project.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Basic scraper",
      code: `from bs4 import BeautifulSoup
import requests

def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    titles = [h2.text for h2 in soup.find_all('h2')]
    return titles

titles = scrape_page('https://example.com')`,
      explanation: "A simple scraper that extracts headings from a page."
    },
    {
      title: "Example 2: Scraping multiple pages",
      code: `from bs4 import BeautifulSoup
import requests
import time

def scrape_multiple(base_url, pages):
    all_data = []
    for page in range(1, pages + 1):
        url = f'{base_url}?page={page}'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        data = extract_data(soup)
        all_data.extend(data)
        time.sleep(1)
    return all_data`,
      explanation: "Scraping multiple pages with a delay between requests."
    },
    {
      title: "Example 3: Saving to JSON",
      code: `import json

data = [{'title': 'Article 1', 'url': 'url1'}]
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)`,
      explanation: "Saving collected data to a JSON file."
    },
    {
      title: "Example 4: Retry logic",
      code: `import requests
import time

def fetch_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            return requests.get(url, timeout=5)
        except:
            if attempt < max_retries - 1:
                time.sleep(1)
            else:
                raise`,
      explanation: "A retry mechanism for failed requests."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not using delays between requests",
      explanation: "Without delays you can overload the server and get blocked.",
      correctApproach: "Always add time.sleep(1-2) between requests to the same domain."
    },
    {
      mistake: "Ignoring robots.txt",
      explanation: "Violating robots.txt can lead to blocking and legal issues.",
      correctApproach: "Check robots.txt before scraping and follow the rules."
    },
    {
      mistake: "Not handling errors",
      explanation: "Websites can be down, change structure, or block requests.",
      correctApproach: "Use try/except and retry logic for reliability."
    },
    {
      mistake: "Not saving data during scraping",
      explanation: "If the scraper stops, all data will be lost.",
      correctApproach: "Save data periodically or after each page."
    }
  ],
  
  summary: `In this lesson we learned how to build web scrapers:

1. Scraper structure — fetch, parse, save
2. Multi-page scraping — handling several pages
3. Saving data — JSON, CSV, database
4. Error handling — retry logic
5. Ethical scraping — robots.txt, delays

Web scraping is a powerful tool for collecting data!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to add delays between requests?",
        options: [
          "To avoid overloading the server and getting blocked",
          "To speed up scraping",
          "To save more memory",
          "Delays are not needed"
        ],
        correctAnswer: 0,
        explanation: "Delays help avoid overloading the server and getting your IP address blocked."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is robots.txt?",
        options: [
          "A file with rules for web scrapers",
          "A file with passwords",
          "A file with browser settings",
          "A file with data"
        ],
        correctAnswer: 0,
        explanation: "robots.txt contains rules that say which parts of a site may be scraped and which may not."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you handle dynamic content loaded via JavaScript?",
        options: [
          "Use Selenium or find an API endpoint",
          "Use only requests",
          "Parse HTML directly",
          "It cannot be handled"
        ],
        correctAnswer: 0,
        explanation: "For dynamic content you need Selenium (which runs JS) or find the API endpoint the site uses."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is retry logic?",
        options: [
          "Retrying a request when an error occurs",
          "Deleting bad data",
          "Skipping failed pages",
          "Saving errors"
        ],
        correctAnswer: 0,
        explanation: "Retry logic automatically repeats requests on temporary failures (timeouts, network issues)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can scrape any website without restrictions.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. You must follow robots.txt and the Terms of Service, add delays, and not overload the server."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
