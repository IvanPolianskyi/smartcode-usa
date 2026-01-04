/**
 * 00 Collections Module
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_1 = {
  lessonId: "lesson-12-1",
  moduleId: "module-10",
  order: 1,
  title: "00 Collections Module",
  
  learningObjectives: [
    "Вивчити основні концепції",
    "Застосувати знання на практиці",
    "Розв'язати практичні задачі"
  ],
  
  estimatedTime: 90,
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Collections Module",
        content: `The collections module is a built-in module that implements specialized container data types providing alternatives to Python’s general purpose built-in containers. We've already gone over the basics: dict, list, set, and tuple.

Now we'll learn about the alternatives that the collections module provides.

## Counter

*Counter* is a *dict* subclass which helps count hashable objects. Inside of it elements are stored as dictionary keys and the counts of the objects are stored as the value.

Let's see how it can be used:

**Counter() with lists**

**Counter with strings**

**Counter with words in a sentence**`
      },
      {
        title: "Common patterns when using the Counter() object",
        content: `sum(c.values())                 # total of all counts
    c.clear()                       # reset all counts
    list(c)                         # list unique elements
    set(c)                          # convert to a set
    dict(c)                         # convert to a regular dictionary
    c.items()                       # convert to a list of (elem, cnt) pairs
    Counter(dict(list_of_pairs))    # convert from a list of (elem, cnt) pairs
    c.most_common()[:-n-1:-1]       # n least common elements
    c += Counter()                  # remove zero and negative counts`
      },
      {
        title: "defaultdict",
        content: `defaultdict is a dictionary-like object which provides all methods provided by a dictionary but takes a first argument (default_factory) as a default data type for the dictionary. Using defaultdict is faster than doing the same using dict.set_default method.

**A defaultdict will never raise a KeyError. Any key that does not exist gets the value returned by the default factory.**

Can also initialize with default values:`
      },
      {
        title: "namedtuple",
        content: `The standard tuple uses numerical indexes to access its members, for example:

For simple use cases, this is usually enough. On the other hand, remembering which index should be used for each value can lead to errors, especially if the tuple has a lot of fields and is constructed far from where it is used. A namedtuple assigns names, as well as the numerical index, to each member. 

Each kind of namedtuple is represented by its own class, created by using the namedtuple() factory function. The arguments are the name of the new class and a string containing the names of the elements.

You can basically think of namedtuples as a very quick way of creating a new object/class type with some attribute fields.
For example:

We construct the namedtuple by first passing the object type name (Dog) and then passing a string with the variety of fields as a string with spaces between the field names. We can then call on the various attributes:`
      },
      {
        title: "Conclusion",
        content: `Hopefully you now see how incredibly useful the collections module is in Python and it should be your go-to module for a variety of common tasks!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `from collections import Counter`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst = [1,2,2,2,2,3,3,3,1,2,1,12,3,2,32,1,21,1,223,1]

Counter(lst)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `Counter('aabsbsbsbhshhbbsbs')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `s = 'How many times does each word show up in this sentence word times each each word'

words = s.split()

Counter(words)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Methods with Counter()",
      code: `# Methods with Counter()
c = Counter(words)

c.most_common(2)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `from collections import defaultdict`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d = {}`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d['one']`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d  = defaultdict(object)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d['one']`,
      explanation: "Приклад коду з курсу"
    }
  ],
  
  commonMistakes: [],
  
  summary: "Підсумок уроку",
  
  practiceTask: {
    title: "Практична задача",
    description: "Опишіть задачу",
    problemStatement: "Умова задачі",
    inputFormat: "",
    outputFormat: "",
    examples: [],
    solution: {
      code: "",
      explanation: ""
    },
    hints: [],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [],
    timeLimit: 10,
    passingScore: 70
  }
}
