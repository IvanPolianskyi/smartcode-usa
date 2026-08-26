/** 
* Lesson 08-1: The collections module 
* Full educational content*/

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_08_1 = {
  lessonId: "lesson-08-1",
  moduleId: "module-08",
  order: 1,
  title: "Collections module",
  
  learningObjectives: [
    "Use namedtuple to create named tuples",
    "Apply deque for efficient queues",
    "Use Counter to count elements",
    "Work with defaultdict for dictionaries with default values"
  ],
  
  prerequisites: ["lesson-07-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to the collections module",
        content: `The \`collections\` module provides specialized data containers that are an alternative to standard Python types (list, dict, tuple, set). 

**Why collections?** 

Python's standard data types are great, but sometimes we need more specialized structures for specific tasks. The collections module provides the following structures. 

**Basic types from collections:** 

1. **namedtuple** - tuples with named fields 
2. **deque** - double-ended queue 
3. **Counter** - count of elements 
4. **defaultdict** - a dictionary with default values 
5. **OrderedDict** - a dictionary that stores the order of insertion 

**Module import:** 

\`\`\`python 
from collections import namedtuple, deque, Counter, defaultdict, OrderedDict 
\`\`\``
      },
      {
        title: "namedtuple - named tuples",
        content: `\`namedtuple\` allows you to create a tuple with named fields. This is more convenient than ordinary tuples, where you need to remember indexes. 

**Creating a namedtuple:** 

\`\`\`python 
from collections import namedtuple 

# Create a Point class with x and y fields 
Point = namedtuple('Point', ['x', 'y']) 

# We create an instance 
p1 = Point(1, 2) 
print(p1.x) # 1 
print(p1.y) # 2 
print(p1) # Point(x=1, y=2) 
\`\`\` 

**Advantages of namedtuple:** 

1. **Readability** - you can use names instead of indexes 
2. **Immutability** - like regular tuples, namedtuples are immutable 
3. **Lightness** - take up less memory than classes 
4. **Convenience** - can be used as regular tuples 

**Example: Data structure for a student** 

\`\`\`python 
from collections import namedtuple 

Student = namedtuple('Student', ['name', 'age', 'grade']) 

student1 = Student('Alexander', 20, 95) 
student2 = Student('Maria', 19, 88)
print(student1.name) # Alexander 
print(student1.age) # 20 
print(student1.grade) # 95 

# Can be used as a tuple 
print(student1[0]) # Alexander 
print(student1[1]) # 20 
\`\`\` 

**Namedtuple methods:** 

\`\`\`python 
Point = namedtuple('Point', ['x', 'y']) 
p = Point(3, 4) 

# _asdict() - converts into a dictionary 
print(p._asdict()) # {'x': 3, 'y': 4} 

# _replace() - creates a new namedtuple with replaced values 
p2 = p._replace(x=10) 
print(p2) # Point(x=10, y=4) 
\`\`\``
      },
      {
        title: "deque - two-way queue",
        content: `\`deque\` (double-ended queue) is an optimized queue that allows adding and removing elements from both ends. 

**Why deque instead of list?** 

- **Speed** - adding/removing from ends is O(1) instead of O(n) in the list 
- **Efficiency** - optimized for end operations 

**Create and use:** 

\`\`\`python 
from collections import queue 

# We create a deque 
d = deque([1, 2, 3]) 
print(d) # deque([1, 2, 3]) 

# We add from the left 
d.appendleft(0) 
print(d) # deque([0, 1, 2, 3]) 

# Add to the right 
d.append(4) 
print(d) # deque([0, 1, 2, 3, 4]) 

# Delete from the left 
left = d.popleft() 
print(left) # 0 
print(d) # deque([1, 2, 3, 4]) 

# Delete from the right 
right = d.pop() 
print(right) # 4 
print(d) # deque([1, 2, 3]) 
\`\`\` 

**Useful methods:** 

\`\`\`python 
d = deque([1, 2, 3]) 

# extend() - adds several elements 
d.extend([4, 5]) 
print(d) # deque([1, 2, 3, 4, 5])
# extendleft() - adds from the left (in reverse order!) 
d.extendleft([0, -1]) 
print(d) # deque([-1, 0, 1, 2, 3, 4, 5]) 

# rotate() - rotates the deque 
d.rotate(2) # moves 2 elements from the end to the beginning 
print(d) # deque([4, 5, -1, 0, 1, 2, 3]) 
\`\`\` 

**Practical example: Queue of tasks** 

\`\`\`python 
from collections import queue 

# Task queue 
tasks = queue() 

# Add tasks 
tasks.append('Task 1') 
tasks.append('Task 2') 
tasks.append('Task 3') 

# We process tasks (FIFO - First In First Out) 
while tasks: 
task = tasks.popleft() 
print(f'Processing: {task}') 
\`\`\``
      },
      {
        title: "Counter - count of elements",
        content: `\`Counter\` is a dictionary for counting hashed objects. It automatically counts the number of occurrences of each element. 

**Creating a Counter:** 

\`\`\`python 
from collections import Counter 

# From the list 
words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'] 
counter = Counter(words) 
print(counter) # Counter({'apple': 3, 'banana': 2, 'orange': 1}) 

# From the line 
text = "hello world" 
char_counter = Counter(text) 
print(char_counter) # Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1}) 
\`\`\` 

**Main methods:** 

\`\`\`python 
c = Counter(['a', 'b', 'c', 'a', 'b', 'a']) 

# most_common() - the most frequent elements 
print(c.most_common(2)) # [('a', 3), ('b', 2)] 

# Get the value 
print(c['a']) # 3 
print(c['d']) # 0 (does not cause an error!) 

# Update 
c.update(['a', 'b', 'd']) 
print(c) # Counter({'a': 4, 'b': 3, 'c': 1, 'd': 1}) 

# Removal
c.subtract(['a', 'b']) 
print(c) # Counter({'a': 3, 'b': 2, 'c': 1, 'd': 1}) 
\`\`\` 

**Practical example: Text analysis** 

\`\`\`python 
from collections import Counter 

text = "Python is great. Python is powerful. Python is fun." 

# Break it into words 
words = text.lower().replace('.', '').split() 

# Counting 
word_count = Counter(words) 
print(word_count.most_common(3)) 
# [('python', 3), ('is', 3), ('great', 1)] 
\`\`\` 

**Arithmetic operations:** 

\`\`\`python 
c1 = Counter(['a', 'b', 'c']) 
c2 = Counter(['a', 'b', 'b']) 

# Adding 
print(c1 + c2) # Counter({'b': 3, 'a': 2, 'c': 1}) 

# Subtraction 
print(c1 - c2) # Counter({'c': 1, 'a': 1}) 

# Intersection (minimum) 
print(c1 & c2) # Counter({'a': 1, 'b': 1}) 

# Merge (maximum) 
print(c1 | c2) # Counter({'a': 1, 'b': 2, 'c': 1}) 
\`\`\``
      },
      {
        title: "defaultdict - dictionary with default values",
        content: `\`defaultdict\` is a dictionary that automatically creates new entries with a default value if the key does not exist. 

**Problem with normal dict:** 

\`\`\`python 
# Error if key does not exist 
d = {} 
d['key'] += 1 # KeyError! 
\`\`\` 

**Solution from defaultdict:** 

\`\`\`python 
from collections import defaultdict 

# Create defaultdict from int (default 0) 
d = defaultdict(int) 
d['key'] += 1 # Working! Automatically creates a key with a value of 0 
print(d['key']) # 1 
print(d['new_key']) # 0 (automatically generated) 
\`\`\` 

**Different default types:** 

\`\`\`python 
from collections import defaultdict 

# int is 0 by default 
d1 = defaultdict(int) 
d1['count'] += 1 

# list - default [] 
d2 = defaultdict(list) 
d2['items'].append('apple') 
d2['items'].append('banana') 

# set - default set() 
d3 = defaultdict(set) 
d3['numbers'].add(1) 
d3['numbers'].add(2)
# str - default '' 
d4 = defaultdict(str) 
d4['text'] += 'hello' 
\`\`\` 

**Own default function:** 

\`\`\`python 
from collections import defaultdict 

# A function that returns the default value 
def default_value(): 
return 'Unknown' 

d = defaultdict(default_value) 
print(d['name']) # 'Unknown' 
\`\`\` 

**Practical example: Data grouping** 

\`\`\`python 
from collections import defaultdict 

# We group students by course 
students = [ 
('Alexander', 'Python'), 
('Maria', 'Python'), 
('Ivan', 'JavaScript'), 
('Elena', 'Python'), 
('Petro', 'JavaScript') 
] 

# Create a defaultdict with a list 
courses = defaultdict(list) 

# Grouping 
for name, course in students: 
courses[course].append(name) 

print(dict(courses)) 
# {'Python': ['Alexander', 'Maria', 'Elena'], 
# 'JavaScript': ['Ivan', 'Petro']} 
\`\`\``
      },
      {
        title: "OrderedDict - an ordered dictionary",
        content: `\`OrderedDict\` is a dictionary that stores the order in which elements are inserted. 

**Important:** In Python 3.7+, the regular \`dict\` also preserves order, so the \`OrderedDict\` is less relevant, but still useful for compatibility and extra methods. 

**Create and use:** 

\`\`\`python 
from collections import OrderedDict 

# Create OrderedDict 
od = OrderedDict() 
od['first'] = 1 
od['second'] = 2 
od['third'] = 3 

print(list(od.keys())) # ['first', 'second', 'third'] 

# Move the element to the end 
od.move_to_end('first') 
print(list(od.keys())) # ['second', 'third', 'first'] 
\`\`\` 

**Practical example: Cache with limited capacity** 

\`\`\`python 
from collections import OrderedDict 

class LRUCache: 
def __init__(self, capacity): 
self.cache = OrderedDict() 
self.capacity = capacity 

def get(self, key): 
if key in self.cache:
# Move to the end (newest) 
self.cache.move_to_end(key) 
return self.cache[key] 
return None 

def put(self, key, value): 
if key in self.cache: 
self.cache.move_to_end(key) 
self.cache[key] = value 
if len(self.cache) > self.capacity: 
# Delete the oldest (first) 
self.cache.popitem(last=False) 
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson, we studied the collections module: 

**Key Types:** 

1. **namedtuple** - tuples with named fields for better readability 
2. **deque** - two-way queue for fast operations with ends 
3. **Counter** - automatic counting of elements 
4. **defaultdict** - a dictionary with default values 
5. **OrderedDict** - a dictionary that preserves the order 

**When to use:** 

- **namedtuple** - when you need a lightweight data structure with named fields 
- **deque** - when fast operations are needed from both ends 
- **Counter** - when you need to count the elements 
- **defaultdict** - when you want to avoid checks for the existence of keys 
- **OrderedDict** - when order is important (although in Python 3.7+ dict also preserves order) 

**Next step:** 

In the next lesson, we will learn the itertools module for working with iterators and combinatorics.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: namedtuple for coordinates",
      code: `from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)

print(p.x)  # 3
print(p.y)  # 4
print(p)    # Point(x=3, y=4)`,
      explanation: "We create a namedtuple to represent a point with x and y coordinates."
    },
    {
      title: "Example 2: deque as a queue",
      code: `from collections import queue 

queue = queue() 
queue.append('Task 1') 
queue.append('Task 2') 
queue.append('Task 3') 

# We process in the order of addition 
while queue: 
task = queue.popleft() 
print(f'Processing: {task}')`,
      explanation: "We use deque as a queue (FIFO) for processing tasks."
    },
    {
      title: "Example 3: Counter for counting words",
      code: `from collections import Counter

text = "python is great python is powerful"
words = text.split()

counter = Counter(words)
print(counter.most_common(2))
# [('python', 2), ('is', 2)]`,
      explanation: "We use Counter to count the number of occurrences of words in the text."
    },
    {
      title: "Example 4: defaultdict for grouping",
      code: `from collections import defaultdict

data = [('a', 1), ('b', 2), ('a', 3), ('c', 4)]
grouped = defaultdict(list)

for key, value in data:
    grouped[key].append(value)

print(dict(grouped))
# {'a': [1, 3], 'b': [2], 'c': [4]}`,
      explanation: "We use defaultdict for automatic grouping of data by keys."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusion between namedtuple and class",
      explanation: "namedtuple is not a class, but a function that creates a class. You cannot add methods directly.",
      correctApproach: "Use namedtuple for simple data structures. For more complex logic, use regular classes."
    },
    {
      mistake: "Forget that Counter returns 0 for non-existent keys",
      explanation: "Counter does not raise KeyError for non-existent keys, but returns 0.",
      correctApproach: "Use 'key' in counter to check for existence if 0 can be a valid value."
    },
    {
      mistake: "Incorrect use of extendleft()",
      explanation: "extendleft() adds elements in reverse order, which may not be obvious.",
      correctApproach: "Remember that extendleft([1, 2, 3]) will add [3, 2, 1] to the left."
    }
  ],
  
  summary: `In this lesson, we studied the collections module: 

1. namedtuple - tuples with named fields for better readability 
2. deque - two-way queue for fast operations 
3. Counter - automatic counting of elements 
4. defaultdict - dictionary with default values 
5. OrderedDict - a dictionary that preserves the order 

These data structures help you write more efficient and readable code!`,
  
  practiceTask: {
    title: "Creating a vote counting system",
    description: "Use Counter and defaultdict to count votes in elections",
    problemStatement: `Create a vote counting system: 
1. Count n pairs (candidate, region) 
2. Counter - total count and winner 
3. defaultdict(Counter) - statistics by region 
4. In the regions, display the candidates in alphabetical order 

Input format: 
6 
Ivan Kyiv 
Maria Lviv 
Ivan Kyiv 
Petro Odesa 
Maria Lviv 
Ivan Kyiv`,
    outputFormat: `Winner: Ivan (3 votes) 
Statistics by region: 
Kyiv: {'Ivan': 3} 
Lviv: {'Maria': 2} 
Odesa: {'Petro': 1}`,
    examples: [
      {
        input: `6 
Ivan Kyiv 
Maria Lviv 
Ivan Kyiv 
Petro Odesa 
Maria Lviv 
Ivan Kyiv`,
        output: `Winner: Ivan (3 votes) 
Statistics by region: 
Kyiv: {'Ivan': 3} 
Lviv: {'Maria': 2} 
Odesa: {'Petro': 1}`,
        explanation: "Ivan gets 3 votes and wins"
      },
      {
        input: `3 
Ivan Kyiv 
Maria Lviv 
Ivan Kyiv`,
        output: `Winner: Ivan (2 votes) 
Statistics by region: 
Kyiv: {'Ivan': 2} 
Lviv: {'Maria': 1}`,
        explanation: "A smaller set of votes"
      },
      {
        input: `2 
Olya Kharkiv 
Olya Kharkiv`,
        output: `Winner: Olya (2 votes) 
Statistics by region: 
Kharkiv: {'Olya': 2}`,
        explanation: "One candidate, one region"
      }
    ],
    solution: {
      code: `from collections import Counter, defaultdict

n = int(input())
votes = []
regions = []
for _ in range(n):
    vote, region = input().split()
    votes.append(vote)
    regions.append(region)

vote_counter = Counter(votes)
winner, votes_count = vote_counter.most_common(1)[0]
print(f'Winner: {winner} ({votes_count} votes)')

regional_votes = defaultdict(Counter)
for vote, region in zip(votes, regions):
    regional_votes[region][vote] += 1

print('Statistics by region:')
for region, reg_votes in regional_votes.items():
    items = ', '.join(f"'{k}': {v}" for k, v in sorted(reg_votes.items()))
    print(f'{region}: {{{items}}}')`,
      explanation: "Counter for winner, defaultdict(Counter) for regions; candidates are sorted for stable output."
    },
    hints: [
      "Read n, then n lines: candidate region",
      "most_common(1) returns the winner",
      "defaultdict(Counter) is region-friendly",
      "Sort the candidate names in the region output"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a namedtuple?",
        options: [
          "A tuple with named fields",
          "Dictionary in order",
          "A queue with two ends",
          "Counting elements"
        ],
        correctAnswer: 0,
        explanation: "namedtuple allows you to create a tuple with named fields for better readability."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which operation is faster in deque compared to list?",
        options: [
          "Adding elements from both ends",
          "Access elements by index",
          "Search for an item",
          "Sorting"
        ],
        correctAnswer: 0,
        explanation: "deque is optimized for end operations (append, appendleft, pop, popleft) - O(1)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will Counter(['a', 'b', 'a'])['c'] return?",
        options: [
          "KeyError",
          "0",
          "None",
          "mistake"
        ],
        correctAnswer: 1,
        explanation: "Counter returns 0 for nonexistent keys rather than raising a KeyError."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does defaultdict do?",
        options: [
          "Automatically creates default values for new keys",
          "Preserves the insertion order",
          "Counts elements",
          "Creates named tuples"
        ],
        correctAnswer: 0,
        explanation: "defaultdict automatically creates new entries with the default value if the key does not exist."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "In Python 3.7+, the regular dict also preserves the insertion order.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. As of Python 3.7, a plain dict is guaranteed to preserve insertion order."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
