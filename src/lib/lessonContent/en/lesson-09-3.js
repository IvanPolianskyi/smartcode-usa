/**
 * Lesson 09-3: Web scraping
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_3 = {
  lessonId: "lesson-09-3",
  moduleId: "module-09",
  order: 3,
  title: "Website scraping",
  
  learningObjectives: [
    "Create a website scraper",
    "Process dynamic pages",
    "Save the received data",
    "Follow robots.txt rules"
  ],
  
  prerequisites: ["lesson-09-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to web scraping",
        content: `Web scraping is an automated process of collecting data from websites.

**What is web scraping?**

- Automatic extraction of data from web pages
- Convert HTML to structured data
- Saving data for further analysis
- Automation of routine tasks

**When to use scraping:**

- Collection of data for analysis
- Monitoring of prices and goods
- Collection of news and articles
- Creation of datasets
- Integration with API (if API is not available)

**Ethical aspects:**

- Comply with robots.txt
- Do not overload the server with requests
- Respect copyright
- Use delays between requests
- Check the Terms of Service`
      },
      {
        title: "Tools for scraping",
        content: `**BeautifulSoup - HTML parsing library**

BeautifulSoup is a powerful Python library for parsing HTML and XML. It allows you to easily find and extract data from HTML pages.

**Main methods of BeautifulSoup:**

- \`soup.find('tag')\` - find the first element
- \`soup.find_all('tag')\` - find all elements
- \`soup.find('div', class_='content')\` - search by class
- \`element.get_text()\` - get the text from the element

**Note:** BeautifulSoup needs to be installed (\`pip install beautifulsoup4\`). In this course, we show examples from BeautifulSoup for demonstration purposes, but for practical tasks we recommend using the JSON API through requests, which is simpler and does not require additional libraries.`
      },
      {
        title: "Scraper structure",
        content: `**The main components of the scraper:**

1. **Loading the page** - requests
2. **Parsing HTML** - BeautifulSoup (for complex HTML) or JSON (if API available)
3. **Retrieving data** - searching for elements
4. **Data storage** - JSON, CSV, database
5. **Error handling** - try/except

**Basic scraper template from BeautifulSoup:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import time
import json

def scrape_website(url):
    # 1. Download
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    response.raise_for_status()
    
    # 2. Parsing HTML (if needed)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 3. Extracting data
    data = extract_data(soup)
    
    # 4. Saving
    save_data(data)
    
    return data

def extract_data(soup):
    # Extraction logic
    pass

def save_data(data):
    # Storage logic
    pass
\`\`\`

**Alternative: Using the JSON API (recommended):**

\`\`\`python
import requests
import json

def scrape_with_api(api_url):
    response = requests.get(api_url)
    data = response.json() # Just get the JSON
    return data
\`\`\``
      },
      {
        title: "Processing of multi-page content",
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

**Find links to the following pages:**

\`\`\`python
from bs4 import BeautifulSoup
import requests

def scrape_with_pagination(start_url):
    all_data = []
    current_url = start_url
    
    while current_url:
        response = requests.get(current_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract the data
        data = extract_data(soup)
        all_data.extend(data)
        
        # We find the link to the next page
        next_link = soup.find('a', class_='next-page')
        if next_link:
            current_url = next_link['href']
        otherwise:
            current_url = None
        
        time.sleep(1) # Delay
    
    return all_data
\`\`\``
      },
      {
        title: "Processing of dynamic pages",
        content: `**JavaScript problem:**

Some sites load content through JavaScript, which does not fulfill requests.

**Solution 1: Analyze AJAX Requests**

\`\`\`python
import requests
import json

# Find the API endpoint that the site uses
api_url = 'https://example.com/api/data'

# We make a request to the API directly
response = requests.get(api_url, headers={
    'X-Requested-With': 'XMLHttpRequest'
})

data = response.json()
# We work with JSON instead of HTML
\`\`\`

**Solution 2: Selenium (for complex cases)**

\`\`\`python
from selenium import webdriver
from bs4 import BeautifulSoup

# Launch the browser
driver = webdriver.Chrome()
driver.get('https://example.com')

# Waiting for JavaScript to load
time.sleep(2)

# We get HTML after executing JS
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

driver.quit()
\`\`\`

**Dynamic Content Check:**

\`\`\`python
import requests

response = requests.get('https://example.com')
html = response.text

# If the required data is not present in the HTML, it may be loaded via JS
if 'expected-content' not in html:
    print('Content loaded dynamically')
\`\`\``
      },
      {
        title: "Working with forms and POST requests",
        content: `**Scraping with authorization:**

\`\`\`python
import requests
from bs4 import BeautifulSoup

# We create a session
session = requests.Session()

# Login
login_url = 'https://example.com/login'
login_data = {
    'username': 'user',
    'password': 'pass'
}

response = session.post(login_url, data=login_data)
response.raise_for_status()

# Now we can make authorized requests
protected_url = 'https://example.com/profile'
response = session.get(protected_url)
soup = BeautifulSoup(response.text, 'html.parser')
\`\`\`

**Sending forms:**

\`\`\`python
import requests
from bs4 import BeautifulSoup

# We get the form
response = requests.get('https://example.com/form')
soup = BeautifulSoup(response.text, 'html.parser')

# Find the CSRF token (if any)
csrf_token = soup.find('input', {'name': 'csrf_token'})['value']

# We send the form
form_data = {
    'csrf_token': csrf_token,
    'field1': 'value1',
    'field2': 'value2'
}

response = requests.post('https://example.com/form', data=form_data)
\`\`\``
      },
      {
        title: "Processing of various data formats",
        content: `**Saving to JSON:**

\`\`\`python
import json

def save_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f'Data saved in {filename}')

# Usage
scraped_data = [
    {'title': 'Article 1', 'url': 'https://example.com/1'},
    {'title': 'Article 2', 'url': 'https://example.com/2'}
]

save_to_json(scraped_data, 'articles.json')
\`\`\`

**Save to CSV:**

\`\`\`python
import csv

def save_to_csv(data, filename):
    if not data:
        return
    
    # We get the keys from the first element
    fieldnames = data[0].keys()
    
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerrows(data)
    
    print(f'Data saved in {filename}')

# Usage
save_to_csv(scraped_data, 'articles.csv')
\`\`\`

**Save to database:**

\`\`\`python
import sqlite3

def save_to_database(data, db_name='scraped_data.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    
    # We create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # We insert the data
    for item in data:
        cursor.execute(
            'INSERT INTO articles (title, url) VALUES (?, ?)',
            (item['title'], item['url'])
        )
    
    conn.commit()
    conn.close()
    print(f'Data saved in database {db_name}')
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
                print(f'{attempt + 1} failed, try again after {delay} sec...')
                time.sleep(delay)
            otherwise:
                print(f'All attempts failed: {e}')
                raise
    
    return None

# Usage
response = fetch_with_retry('https://example.com')
\`\`\`

**Handling different types of errors:**

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
        otherwise:
            print(f'HTTP error {e.response.status_code}: {url}')
    except Timeout:
        print(f'Timeout for {url}')
    except ConnectionError:
        print(f'Error connecting to {url}')
    except RequestException as e:
        print(f'Error requesting {url}: {e}')
    
    return None
\`\`\``
      },
      {
        title: "Robots.txt and ethical scraping",
        content: `**Check robots.txt:**

\`\`\`python
import requests
from urllib.robotparser import RobotFileParser

def check_robots_txt(base_url, path):
    rp = RobotFileParser()
    rp.set_url(f'{base_url}/robots.txt')
    rp.read()
    
    if rp.can_fetch('*', path):
        print(f'Allowed to drop: {path}')
        return True
    otherwise:
        print(f'Forbidden to drop: {path}')
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
    # Delay of 1-2 seconds
    time.sleep(1.5)
\`\`\`

2. **User-Agent:**
\`\`\`python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
response = requests.get(url, headers=headers)
\`\`\`

3. **Frequency limitation:**
\`\`\`python
import time
from collections import queue

class RateLimiter:
    def __init__(self, max_requests, time_window):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def wait_if_needed(self):
        now = time.time()
        # We delete old requests
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        # If we have reached the limit, we wait
        if len(self.requests) >= self.max_requests:
            sleep_time = self.time_window - (now - self.requests[0])
            time.sleep(sleep_time)
        
        self.requests.append(time.time())

# Usage
limiter = RateLimiter(max_requests=10, time_window=60) # 10 requests per minute

for url in urls:
    limiter.wait_if_needed()
    response = requests.get(url)
\`\`\``
      },
      {
        title: "Practical example: News scraper",
        content: `**Full scraper example:**

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
            
            # We find all articles (example structure)
            article_elements = soup.find_all('article', class_='news-item')
            
            for article in article_elements:
                title = article.find('h2').text.strip()
                link = article.find('a')('href']
                date = article.find('time')('datetime']
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
                time.sleep(2) # Delay between pages
            otherwise:
                break
        
        return self.articles
    
    def save(self, filename='news.json'):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.articles, f, indent=2, ensure_ascii=False)
        print(f'Saved {len(self.articles)} articles in {filename}')

# Usage
scraper = NewsScraper('https://example.com')
articles = scraper.scrape_all(num_pages=3)
scraper.save('news.json')
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson we learned how to create web scrapers:

**Key Concepts:**

1. **Scraper structure** - loading, parsing, saving
2. **Multi-page scraping** - processing of several pages
3. **Dynamic content** - work with JavaScript
4. **Data storage** - JSON, CSV, database
5. **Error handling** - retry logic
6. **Ethical scraping** - robots.txt, delays

**Important practices:**

- Use delays between requests
- Comply with robots.txt
- Handle all types of errors
- Use User-Agent
- Limit the frequency of requests
- Respect the Terms of Service

**Next step:**

In the next lesson, we will create a full-fledged web scraping project.`
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
      explanation: "A simple scraper for extracting headlines from a page."
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
      explanation: "Saving the collected data in a JSON file."
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
      explanation: "Mechanism of retries in case of request errors."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not use delays between requests",
      explanation: "You can overload the server and get locked without delay.",
      correctApproach: "Always add time.sleep(1-2) between requests to the same domain."
    },
    {
      mistake: "Ignore robots.txt",
      explanation: "Violating robots.txt can lead to bans and legal issues.",
      correctApproach: "Check robots.txt before scraping and follow the rules."
    },
    {
      mistake: "Do not handle errors",
      explanation: "Websites may be unavailable, change structure, block requests.",
      correctApproach: "Use try/except and retry logic for reliability."
    },
    {
      mistake: "Do not save data during scraping",
      explanation: "If the scraper stops, all data will be lost.",
      correctApproach: "Save data periodically or after each page."
    }
  ],
  
  summary: `In this lesson we learned how to create web scrapers:

1. Scraper structure - download, parsing, saving
2. Multi-page scraping - processing of several pages
3. Data storage - JSON, CSV, database
4. Error handling - retry logic
5. Ethical scraping - robots.txt, delays

Web scraping is a powerful data collection tool!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to add delays between requests?",
        options: [
          "In order not to overload the server and avoid blocking",
          "To speed up scraping",
          "To save more memory",
          "Delays are not required"
        ],
        correctAnswer: 0,
        explanation: "Delays help not to overload the server and avoid IP address blocking."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is robots.txt?",
        options: [
          "File with rules for web scrapers",
          "File with passwords",
          "File with browser settings",
          "Data file"
        ],
        correctAnswer: 0,
        explanation: "robots.txt contains rules that indicate which parts of the site can and cannot be scraped."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to handle dynamic content loaded via JavaScript?",
        options: [
          "Use Selenium or find an API endpoint",
          "Use only requests",
          "Parse HTML directly",
          "Unable to process"
        ],
        correctAnswer: 0,
        explanation: "Dynamic content requires Selenium (executes JS) or a search API endpoint that the site uses."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is retry logic?",
        options: [
          "Request retries on error",
          "Deleting erroneous data",
          "Skipping error pages",
          "Saving errors"
        ],
        correctAnswer: 0,
        explanation: "Retry logic allows you to automatically repeat requests in case of temporary errors (timeouts, network problems)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can hack any site without restrictions.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. You need to follow robots.txt, Terms of Service, add delays and not overload the server."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
