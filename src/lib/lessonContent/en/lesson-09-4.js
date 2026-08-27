/**
 * Lesson 09-4: Practice: Web Scraping Project
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_09_4 = {
  lessonId: "lesson-09-4",
  moduleId: "module-09",
  order: 4,
  title: "Practice: Web Scraping Project",
  
  learningObjectives: [
    "Build a complete scraper",
    "Collect data from a real site",
    "Process and store data",
    "Create a useful tool"
  ],
  
  prerequisites: ["lesson-09-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Project introduction",
        content: `In this lesson we will build a complete web scraping project.

**Project goals:**

- Build a working scraper
- Collect real data
- Process and structure the data
- Save data in a convenient format
- Follow ethical practices

**What we will do:**

1. Analyze the target site
2. Plan the scraper structure
3. Implement the core functions
4. Handle errors and edge cases
5. Save and analyze the data

**Example project: Exchange rate scraper**

We will build a scraper that collects exchange rates from a public API or website.`
      },
      {
        title: "Stage 1: Analysis and planning",
        content: `**Step 1: Define the goals**

- What data do we need to collect?
- How often is the data updated?
- Which storage format is best?

**Step 2: Analyze the site structure**

\`\`\`python
from bs4 import BeautifulSoup
import requests

# Explore the page structure
url = 'https://example.com/exchange-rates'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find the needed elements
# Use the browser inspector for analysis
print(soup.prettify()[:1000])  # First 1000 characters
\`\`\`

**Step 3: Plan the structure**

\`\`\`python
# Plan classes and functions
class ExchangeRateScraper:
    def __init__(self):
        # Initialization
        pass
    
    def fetch_data(self):
        # Fetch data
        pass
    
    def parse_data(self, html):
        # Parse HTML
        pass
    
    def save_data(self, data):
        # Save data
        pass
    
    def run(self):
        # Main logic
        pass
\`\`\``
      },
      {
        title: "Stage 2: Implementing a basic scraper",
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
        """Fetches a page with error handling"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except RequestException as e:
            print(f'Error fetching {url}: {e}')
            return None
    
    def parse_rates(self, html):
        """Parses HTML and extracts exchange rates"""
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        rates = []
        
        # Find the rates table (example structure)
        table = soup.find('table', class_='exchange-rates')
        if not table:
            return []
        
        rows = table.find_all('tr')[1:]  # Skip the header
        
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
        """Saves data to JSON"""
        data = {
            'scraped_at': datetime.now().isoformat(),
            'rates': self.rates
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f'Data saved to {filename}')
    
    def save_to_csv(self, filename='exchange_rates.csv'):
        """Saves data to CSV"""
        if not self.rates:
            return
        
        fieldnames = ['currency', 'buy_rate', 'sell_rate', 'timestamp']
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(self.rates)
        
        print(f'Data saved to {filename}')
    
    def run(self):
        """Main scraper function"""
        print('Starting scrape...')
        
        html = self.fetch_page(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
            print(f'Collected {len(self.rates)} exchange rates')
            
            if self.rates:
                self.save_to_json()
                self.save_to_csv()
        else:
            print('Failed to load data')

# Usage
scraper = ExchangeRateScraper('https://example.com/exchange-rates')
scraper.run()
\`\`\``
      },
      {
        title: "Stage 3: Extending functionality",
        content: `**Adding change monitoring:**

\`\`\`python
import json
from datetime import datetime

class ExchangeRateMonitor:
    def __init__(self, scraper):
        self.scraper = scraper
        self.previous_rates = {}
    
    def load_previous_rates(self, filename='exchange_rates.json'):
        """Loads previous rates"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for rate in data.get('rates', []):
                    self.previous_rates[rate['currency']] = rate
        except FileNotFoundError:
            print('Previous data not found')
    
    def compare_rates(self, new_rates):
        """Compares new rates with previous ones"""
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
                print('\\nRate changes detected:')
                for change in changes:
                    print(f"{change['currency']}: {change['old_rate']} -> {change['new_rate']}")
            else:
                print('No changes detected')
\`\`\`

**Adding automatic scheduling:**

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
        title: "Stage 4: Handling edge cases",
        content: `**Parsing different data formats:**

\`\`\`python
def parse_rate_value(value_str):
    """Parses a rate value from different formats"""
    try:
        # Remove spaces and extra characters
        cleaned = value_str.replace(' ', '').replace(',', '.')
        
        # Remove non-numeric characters (except the decimal point)
        import re
        cleaned = re.sub(r'[^0-9.]', '', cleaned)
        
        return float(cleaned)
    except (ValueError, AttributeError):
        return None

# Usage
rate_str = "36.50 UAH"
rate_value = parse_rate_value(rate_str)  # 36.50
\`\`\`

**Data validation:**

\`\`\`python
def validate_rate(rate_data):
    """Checks whether rate data is valid"""
    required_fields = ['currency', 'buy_rate', 'sell_rate']
    
    # Check that fields exist
    for field in required_fields:
        if field not in rate_data or not rate_data[field]:
            return False, f'Missing field: {field}'
    
    # Check formats
    try:
        buy = float(rate_data['buy_rate'])
        sell = float(rate_data['sell_rate'])
        
        if buy <= 0 or sell <= 0:
            return False, 'Rate cannot be negative or zero'
        
        if sell < buy:
            return False, 'Sell rate cannot be lower than buy rate'
        
        return True, 'OK'
    except ValueError:
        return False, 'Invalid rate format'

# Usage
rate = {'currency': 'USD', 'buy_rate': '36.50', 'sell_rate': '37.00'}
is_valid, message = validate_rate(rate)
\`\`\`

**Handling missing data:**

\`\`\`python
def safe_get_text(element, default=''):
    """Safely gets text from an element"""
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
        f.write('EXCHANGE RATE REPORT\\n')
        f.write('=' * 50 + '\\n')
        f.write(f'Date: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\\n')
        f.write(f'Number of currencies: {len(rates)}\\n\\n')
        
        f.write('Exchange rates:\\n')
        f.write('-' * 50 + '\\n')
        
        for rate in rates:
            f.write(f"Currency: {rate['currency']}\\n")
            f.write(f"  Buy: {rate['buy_rate']}\\n")
            f.write(f"  Sell: {rate['sell_rate']}\\n")
            f.write('-' * 50 + '\\n')
    
    print(f'Report saved to {filename}')

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
        <title>Exchange Rates</title>
        <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; }
        </style>
    </head>
    <body>
        <h1>Exchange Rates</h1>
        <p>Date: {date}</p>
        <table>
            <tr>
                <th>Currency</th>
                <th>Buy</th>
                <th>Sell</th>
            </tr>
    '''.format(date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    
    for rate in rates:
        html += f'''
            <tr>
                <td>{rate['currency']}</td>
                <td>{rate['buy_rate']}</td>
                <td>{rate['sell_rate']}</td>
            </tr>
        '''
    
    html += '''
        </table>
    </body>
    </html>
    '''
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f'HTML report saved to {filename}')

# Usage
generate_html_report(scraper.rates)
\`\`\``
      },
      {
        title: "Stage 6: Testing and optimization",
        content: `**Testing functions:**

\`\`\`python
def test_scraper():
    """Tests the scraper's core functionality"""
    scraper = ExchangeRateScraper('https://example.com/exchange-rates')
    
    # Fetch test
    html = scraper.fetch_page(scraper.base_url)
    assert html is not None, "Failed to load the page"
    
    # Parse test
    rates = scraper.parse_rates(html)
    assert len(rates) > 0, "No exchange rates found"
    
    # Validation test
    for rate in rates:
        is_valid, message = validate_rate(rate)
        assert is_valid, f"Invalid data: {message}"
    
    print("All tests passed successfully!")

# Run tests
test_scraper()
\`\`\`

**Performance optimization:**

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
        print(f'Scrape finished in {elapsed:.2f} seconds')
        
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
        
        # Create the data directory
        os.makedirs(output_dir, exist_ok=True)
    
    def fetch_page(self, url, retries=3):
        """Fetches a page with retry logic"""
        for attempt in range(retries):
            try:
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                return response.text
            except RequestException as e:
                if attempt < retries - 1:
                    print(f'Attempt {attempt + 1} failed, retrying...')
                    time.sleep(2)
                else:
                    print(f'Fetch error: {e}')
                    return None
        return None
    
    def parse_rates(self, html):
        """Parses exchange rates"""
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        rates = []
        
        # Adapt selectors to the specific site
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
        """Saves data in different formats"""
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
            writer.writerows(self.rates)
        
        print(f'Data saved:')
        print(f'  JSON: {json_file}')
        print(f'  CSV: {csv_file}')
    
    def run(self):
        """Main function"""
        print(f'Starting scrape from {self.base_url}...')
        
        html = self.fetch_page(self.base_url)
        if html:
            self.rates = self.parse_rates(html)
            print(f'Collected {len(self.rates)} exchange rates')
            
            if self.rates:
                self.save_data()
            else:
                print('No exchange rates found')
        else:
            print('Failed to load data')

# Usage
if __name__ == '__main__':
    scraper = CompleteExchangeRateScraper('https://example.com/exchange-rates')
    scraper.run()
\`\`\``
      },
      {
        title: "Project summary",
        content: `In this lesson we built a complete web scraping project:

**What we did:**

1. **Analysis and planning** - defined goals and structure
2. **Basic implementation** - built the core scraper
3. **Extended functionality** - added monitoring and automation
4. **Edge cases** - validation and error handling
5. **Visualization** - generating reports
6. **Testing** - verifying functionality

**Skills we gained:**

- Planning scraping projects
- Structuring code
- Handling errors and edge cases
- Saving data in different formats
- Creating reports and visualization
- Testing and optimization

**Next steps:**

- Add a database for storing history
- Build a web interface to view the data
- Add change notifications
- Deploy the project on a server

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
      explanation: "A basic scraper that extracts exchange rates from a table."
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
      explanation: "Saving data to JSON and CSV formats."
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
      explanation: "Checking that exchange rate data is valid."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not structuring the code",
      explanation: "Putting everything in one function makes the project hard to maintain.",
      correctApproach: "Split the code into classes and methods by responsibility."
    },
    {
      mistake: "Not handling site structure changes",
      explanation: "The site structure can change and break the scraper.",
      correctApproach: "Add checks that elements exist and handle parse errors."
    },
    {
      mistake: "Not saving data during scraping",
      explanation: "If the scraper stops, the data will be lost.",
      correctApproach: "Save data after each successful iteration or use a database."
    },
    {
      mistake: "Not testing on different data",
      explanation: "The scraper may work only on specific data.",
      correctApproach: "Create tests for different scenarios and edge cases."
    }
  ],
  
  summary: `In this lesson we built a complete web scraping project:

1. Planning - analysis and project structure
2. Implementation - building a working scraper
3. Extension - adding new capabilities
4. Error handling - validation and edge cases
5. Storage - different data formats
6. Testing - verifying functionality

A practical project is the best way to reinforce your skills!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main benefit of structuring code into classes?",
        options: [
          "Better organization and maintainability",
          "Faster execution",
          "Less memory usage",
          "There are no benefits"
        ],
        correctAnswer: 0,
        explanation: "Structuring code into classes improves readability, organization, and makes the project easier to maintain."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to validate data before saving?",
        options: [
          "To avoid saving incorrect data",
          "To speed up scraping",
          "To save memory",
          "Validation is not needed"
        ],
        correctAnswer: 0,
        explanation: "Validation ensures data quality and helps catch problems early."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is retry logic?",
        options: [
          "Retrying an operation when an error occurs",
          "Deleting bad data",
          "Skipping errors",
          "Saving errors"
        ],
        correctAnswer: 0,
        explanation: "Retry logic automatically repeats operations on temporary failures (network issues, timeouts)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why save data in multiple formats?",
        options: [
          "For different use cases (analysis, import, viewing)",
          "To use more disk space",
          "To make the code more complex",
          "It is not necessary"
        ],
        correctAnswer: 0,
        explanation: "Different formats (JSON, CSV, HTML) suit different tasks: JSON for programs, CSV for Excel, HTML for viewing."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Testing a scraper is unnecessary if it works on one site.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Testing helps find problems, verify edge-case handling, and ensure reliability."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
