/**
 * Lesson 09-4: Practice: web scraping project
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_09_4 = {
  lessonId: "lesson-09-4",
  moduleId: "module-09",
  order: 4,
  title: "Practice: web scraping project",
  
  learningObjectives: [
    "Create a full-fledged scraper",
    "Collect data from a real site",
    "Process and store data",
    "Create a useful tool"
  ],
  
  prerequisites: ["lesson-09-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to the project",
        content: `In this lesson, we will create a full-fledged web scraping project.

**Project goals:**

- Create a functional scraper
- Collect real data
- Process and structure data
- Save data in a convenient format
- Follow ethical practices

**What we will do:**

1. Analysis of the target site
2. Planning the structure of the scraper
3. Implementation of basic functions
4. Processing of errors and edge cases
5. Data storage and analysis

**Project example: Exchange rate scraper**

We will create a scraper to collect currency rates from a public API or website.`
      },
      {
        title: "Stage 1: Analysis and planning",
        content: `**Step 1: Defining Goals**

- What data should be collected?
- How often is the data updated?
- What is the best save format?

**Step 2: Analysis of the site structure**

\`\`\`python
from bs4 import BeautifulSoup
import requests

# We study the structure of the page
url = 'https://example.com/exchange-rates'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# We find the necessary elements
# We use the browser inspector for analysis
print(soup.prettify()[:1000]) # The first 1000 characters
\`\`\`

**Step 3: Planning the Structure**

\`\`\`python
# We plan classes and functions
class ExchangeRateScraper:
    def __init__(self):
        # Initialization
        pass
    
    def fetch_data(self):
        # Loading data
        pass
    
    def parse_data(self, html):
        # HTML parsing
        pass
    
    def save_data(self, data):
        # Saving data
        pass
    
    def run(self):
        # Main logic
        pass
\`\`\``
      },
      {
        title: "Stage 2: Implementation of the basic scraper",
        content: `**Full scraper implementation:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import json
import csv
from datetime import datetime
from requests.exceptions import RequestException
import time

class ExchangeRateScraper:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.rates = []
    
    def fetch_page(self, url):
        """Loads error handling page"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except RequestException as e:
            print(f'Error loading {url}: {e}')
            return None
    
    def parse_rates(self, html):
        """Parses HTML and extracts currency rates"""
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        rates = []
        
        # We find a table with courses (an example of a structure)
        table = soup.find('table', class_='exchange-rates')
        if not table:
            return []
        
        rows = table.find_all('tr')[1:] # Skip the header
        
        for row in rows:
            cells = row.find_all('td')
            if len(cells) >= 3:
                currency = cells[0].text.strip()
                buy_rate = cells[1].text.strip()
                sell_rate = cells[2].text.strip()
                
                rates.append({
                    'currency': currency,
                    'buy_rate': buy_rate,
                    'sell_rate': sell_rate,
                    'timestamp': datetime.now().isoformat()
                })
        
        return rates
    
    def save_to_json(self, filename='exchange_rates.json'):
        """Stores data in JSON"""
        data = {
            'scraped_at': datetime.now().isoformat(),
            'rates': self.rates
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f'Data saved in {filename}')
    
    def save_to_csv(self, filename='exchange_rates.csv'):
        """Saves data to CSV"""
        if not self.rates:
            return
        
        fieldnames = ['currency', 'buy_rate', 'sell_rate', 'timestamp']
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerrows(self.rates)
        
        print(f'Data saved in {filename}')
    
    def run(self):
        """The main function of the scraper"""
        print('Starting scraping...')
        
        html = self.fetch_page(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
            print(f'Collected {len(self.rates)} exchange rates')
            
            if self.rates:
                self.save_to_json()
                self.save_to_csv()
        otherwise:
            print('Failed to load data')

# Usage
scraper = ExchangeRateScraper('https://example.com/exchange-rates')
scraper.run()
\`\`\``
      },
      {
        title: "Stage 3: Expanding functionality",
        content: `**Adding change monitoring:**

\`\`\`python
import json
from datetime import datetime

class ExchangeRateMonitor:
    def __init__(self, scraper):
        self.scraper = scraper
        self.previous_rates = {}
    
    def load_previous_rates(self, filename='exchange_rates.json'):
        """Loads previous courses"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for rate in data.get('rates', []):
                    self.previous_rates[rate['currency']] = rate
        except FileNotFoundError:
            print('No previous data found')
    
    def compare_rates(self, new_rates):
        """Compares new courses with previous ones"""
        changes = []
        
        for rate in new_rates:
            currency = rate['currency']
            new_buy = rate['buy_rate']
            
            if currency in self.previous_rates:
                old_buy = self.previous_rates[currency]['buy_rate']
                if new_buy != old_buy:
                    changes.append({
                        'currency': currency,
                        'old_rate': old_buy,
                        'new_rate': new_buy,
                        'change': f'{float(new_buy) - float(old_buy):.2f}'
                    })
        
        return changes
    
    def monitor(self):
        """Monitors rate changes"""
        self.load_previous_rates()
        
        self.scraper.run()
        new_rates = self.scraper.rates
        
        if self.previous_rates:
            changes = self.compare_rates(new_rates)
            if changes:
                print('\\\\nChanges in courses detected:')
                for change in changes:
                    print(f"{change['currency']}: {change['old_rate']} -> {change['new_rate']}")
            otherwise:
                print('No changes detected')
\`\`\`

**Adding autorun:**

\`\`\`python
import schedule
import time

def job():
    scraper = ExchangeRateScraper('https://example.com/exchange-rates')
    scraper.run()

# Run every hour
schedule.every().hour.do(job)

while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\``
      },
      {
        title: "Stage 4: Processing of edge cases",
        content: `**Processing different data formats:**

\`\`\`python
def parse_rate_value(value_str):
    """Parses exchange rate values from different formats"""
    try:
        # Remove spaces and extra characters
        cleaned = value_str.replace(' ', '').replace(',', '.')
        
        # Remove non-numeric characters (except period)
        import re
        cleaned = re.sub(r'[^0-9.]', '', cleaned)
        
        return float(cleaned)
    except (ValueError, AttributeError):
        return None

# Usage
rate_str = "36.50 UAH"
rate_value = parse_rate_value(rate_str) # 36.50
\`\`\`

**Data validation:**

\`\`\`python
def validate_rate(rate_data):
    """Verifies validity of course data"""
    required_fields = ['currency', 'buy_rate', 'sell_rate']
    
    # Checking the presence of fields
    for field in required_fields:
        if field not in rate_data or not rate_data[field]:
            return False, f'Missing field: {field}'
    
    # Checking formats
    try:
        buy = float(rate_data['buy_rate'])
        sell = float(rate_data['sell_rate'])
        
        if buy <= 0 or sell <= 0:
            return False, 'Rate cannot be negative or zero'
        
        if sell < buy:
            return False, 'The selling rate cannot be lower than the buying rate'
        
        return True, 'OK'
    except ValueError:
        return False, 'Invalid course format'

# Usage
rate = {'currency': 'USD', 'buy_rate': '36.50', 'sell_rate': '37.00'}
is_valid, message = validate_rate(rate)
\`\`\`

**Processing missing data:**

\`\`\`python
def safe_get_text(element, default=''):
    """Safely gets text from element"""
    if element:
        text = element.get_text(strip=True)
        return text if text else default
    return default

# Usage
name_element = soup.find('span', class_='currency-name')
currency_name = safe_get_text(name_element, 'Unknown currency')
\`\`\``
      },
      {
        title: "Stage 5: Data visualization",
        content: `**Creating a report:**

\`\`\`python
def generate_report(rates, filename='report.txt'):
    """Generates a text report"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write('REPORT ON EXCHANGE RATES\\\\n')
        f.write('=' * 50 + '\\\\n')
        f.write(f'Date: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\\\\n')
        f.write(f'Number of currencies: {len(rates)}\\\\n\\\\n')
        
        f.write('Currency rates:\\\\n')
        f.write('-' * 50 + '\\\\n')
        
        for rate in rates:
            f.write(f"Currency: {rate['currency']}\\\\n")
            f.write(f" Buy: {rate['buy_rate']}\\\\n")
            f.write(f" Sell: {rate['sell_rate']}\\\\n")
            f.write('-' * 50 + '\\\\n')
    
    print(f'Report saved in {filename}')

# Usage
generate_report(scraper.rates)
\`\`\`

**Creating an HTML report:**

\`\`\`python
def generate_html_report(rates, filename='report.html'):
    """Generates an HTML report"""
    html = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Exchange rates</title>
        <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; }
        </style>
    </head>
    <body>
        <h1>Exchange rates</h1>
        <p>Date: {date}</p>
        <table>
            <tr>
                <th>Currency</th>
                <th>Purchase</th>
                <th>Sale</th>
            </tr>
    '''.format(date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    
    for rate in rates:
        html += f'''
            <tr>
                <td>{rate['currency']}</td>
                <td>{rate['buy_rate']}</td>
                <td>{rate['sell_rate']}</td>
            </tr>
        ''''
    
    html += '''
        </table>
    </body>
    </html>
    ''''
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f'HTML report saved in {filename}')

# Usage
generate_html_report(scraper.rates)
\`\`\``
      },
      {
        title: "Stage 6: Testing and Optimization",
        content: `**Feature testing:**

\`\`\`python
def test_scraper():
    """Tests the basic functionality of the scraper"""
    scraper = ExchangeRateScraper('https://example.com/exchange-rates')
    
    # Load test
    html = scraper.fetch_page(scraper.base_url)
    assert html is not None, "Failed to load page"
    
    # Parsing test
    rates = scraper.parse_rates(html)
    assert len(rates) > 0, "No exchange rates found"
    
    # Validation test
    for rate in rates:
        is_valid, message = validate_rate(rate)
        assert is_valid, f"Invalid data: {message}"
    
    print("All tests passed successfully!")

# Running tests
test_scraper()
\`\`\`

**Performance Optimization:**

\`\`\`python
import time
from functools import lru_cache

class OptimizedScraper(ExchangeRateScraper):
    @lru_cache(maxsize=1)
    def fetch_page_cached(self, url):
        """Caches the result for a short time"""
        return self.fetch_page(url)
    
    def run_optimized(self):
        """Optimized version with caching"""
        start_time = time.time()
        
        html = self.fetch_page_cached(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
        
        elapsed = time.time() - start_time
        print(f'Scraping completed in {elapsed:.2f} seconds')
        
        return self.rates
\`\`\``
      },
      {
        title: "Complete project example",
        content: `**Full implementation with all features:**

\`\`\`python
from bs4 import BeautifulSoup
import requests
import json
import csv
from datetime import datetime
from requests.exceptions import RequestException
import time
import os

class CompleteExchangeRateScraper:
    def __init__(self, base_url, output_dir='data'):
        self.base_url = base_url
        self.output_dir = output_dir
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.rates = []
        
        # We create a directory for data
        os.makedirs(output_dir, exist_ok=True)
    
    def fetch_page(self, url, retries=3):
        """Loads page with retry logic"""
        for attempt in range(retries):
            try:
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                return response.text
            except RequestException as e:
                if attempt < retries - 1:
                    print(f'{attempt + 1} failed, try again...')
                    time.sleep(2)
                otherwise:
                    print(f'Error loading: {e}')
                    return None
        return None
    
    def parse_rates(self, html):
        """Parsi exchange rates"""
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        rates = []
        
        # Adapt the selectors to a specific site
        table = soup.find('table', class_='exchange-rates')
        if not table:
            return []
        
        rows = table.find_all('tr')[1:]
        
        for row in rows:
            cells = row.find_all('td')
            if len(cells) >= 3:
                currency = cells[0].text.strip()
                buy_rate = cells[1].text.strip()
                sell_rate = cells[2].text.strip()
                
                rates.append({
                    'currency': currency,
                    'buy_rate': buy_rate,
                    'sell_rate': sell_rate,
                    'timestamp': datetime.now().isoformat()
                })
        
        return rates
    
    def save_data(self):
        """Stores data in various formats"""
        if not self.rates:
            print('No data to save')
            return
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # JSON
        json_file = os.path.join(self.output_dir, f'exchange_rates_{timestamp}.json')
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump({
                'scraped_at': datetime.now().isoformat(),
                'rates': self.rates
            }, f, indent=2, ensure_ascii=False)
        
        # CSV
        csv_file = os.path.join(self.output_dir, f'exchange_rates_{timestamp}.csv')
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['currency', 'buy_rate', 'sell_rate', 'timestamp'])
            writer.writeheader()
            writer.writerrows(self.rates)
        
        print(f'Data saved:')
        print(f' JSON: {json_file}')
        print(f' CSV: {csv_file}')
    
    def run(self):
        """Main function"""
        print(f'Starting scraping from {self.base_url}...')
        
        html = self.fetch_page(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
            print(f'Collected {len(self.rates)} exchange rates')
            
            if self.rates:
                self.save_data()
            otherwise:
                print('No exchange rates found')
        otherwise:
            print('Failed to load data')

# Usage
if __name__ == '__main__':
    scraper = CompleteExchangeRateScraper('https://example.com/exchange-rates')
    scraper.run()
\`\`\``
      },
      {
        title: "Summary of the project",
        content: `In this lesson, we created a full-fledged web scraping project:

**What we did:**

1. **Analysis and planning** - defined goals and structure
2. **Basic implementation** - created a basic scraper
3. **Extended functionality** - added monitoring and automation
4. **Processing edge cases** - validation and error processing
5. **Visualization** - creating reports
6. **Testing** - functionality check

**Skills we learned:**

- Planning of scrapping projects
- Code structuring
- Handling errors and edge cases
- Saving data in various formats
- Creation of reports and visualization
- Testing and optimization

**Next steps:**

- Add a database to store history
- Create a web interface for viewing data
- Add change notifications
- Deploy the project on the server

Web scraping is a powerful tool for automating data collection!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Basic scraper",
      code: `from bs4 import BeautifulSoup
import requests

def scrape_rates(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    rates = []
    for row in soup.find_all('tr')[1:]:
        cells = row.find_all('td')
        if len(cells) >= 3:
            rates.append({
                'currency': cells[0].text.strip(),
                'buy': cells[1].text.strip(),
                'sell': cells[2].text.strip()
            })
    return rates`,
      explanation: "A basic scraper for extracting exchange rates from a table."
    },
    {
      title: "Example 2: Saving data",
      code: `import json
import csv

def save_data(rates):
    # JSON
    with open('rates.json', 'w') as f:
        json.dump(rates, f, indent=2)
    
    # CSV
    with open('rates.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['currency', 'buy', 'sell'])
        writer.writeheader()
        writer.writerows(rates)`,
      explanation: "Saving data in JSON and CSV formats."
    },
    {
      title: "Example 3: Data validation",
      code: `def validate_rate(rate):
    if not rate.get('currency'):
        return False
    try:
        float(rate['buy'])
        float(rate['sell'])
        return True
    except:
        return False`,
      explanation: "Checking the validity of exchange rate data."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Don't structure the code",
      explanation: "All the code in one function makes the project difficult to maintain.",
      correctApproach: "Separate your code into classes and methods by responsibility."
    },
    {
      mistake: "Do not process site structure changes",
      explanation: "The structure of the site may change, which will break the scraper.",
      correctApproach: "Add element presence checks and parsing error handling."
    },
    {
      mistake: "Do not save data during scraping",
      explanation: "If the scraper stops, the data will be lost.",
      correctApproach: "Save the data after each successful iteration or use a database."
    },
    {
      mistake: "Do not test on different data",
      explanation: "The scraper can work only on specific data.",
      correctApproach: "Create tests for different scenarios and edge cases."
    }
  ],
  
  summary: `In this lesson, we created a full-fledged web scraping project:

1. Planning - analysis and structure of the project
2. Implementation - creation of a functional scraper
3. Expansion - adding new features
4. Error processing - validation and edge cases
5. Storage - different data formats
6. Testing - functionality check

A hands-on project is the best way to consolidate skills!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main advantage of structuring code into classes?",
        options: [
          "Better code organization and support",
          "Faster execution",
          "Less memory",
          "There are no benefits"
        ],
        correctAnswer: 0,
        explanation: "Structuring code into classes improves readability, organization, and simplifies project maintenance."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to validate data before saving?",
        options: [
          "To avoid saving incorrect data",
          "To speed up scraping",
          "To preserve the memory",
          "No validation required"
        ],
        correctAnswer: 0,
        explanation: "Validation ensures data quality and helps identify problems at an early stage."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is retry logic?",
        options: [
          "Retries to perform the operation in case of an error",
          "Deleting erroneous data",
          "Skipping errors",
          "Saving errors"
        ],
        correctAnswer: 0,
        explanation: "Retry logic allows you to automatically repeat operations in case of temporary errors (network, timeouts)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why should you store data in multiple formats?",
        options: [
          "For various purposes of use (analysis, import, viewing)",
          "To take up more space",
          "To complicate the code",
          "It is not necessary"
        ],
        correctAnswer: 0,
        explanation: "Different formats (JSON, CSV, HTML) are convenient for different tasks: JSON for applications, CSV for Excel, HTML for viewing."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Testing the scraper is not necessary if it runs on a single site.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Testing helps identify problems, verify edge case handling, and ensure reliability."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
