/**
 * 01 Advanced Numbers
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_4 = {
  lessonId: "lesson-13-6",
  moduleId: "module-15",
  order: 4,
  title: "01 Advanced Numbers",
  
  learningObjectives: [
    "Вивчити основні концепції",
    "Застосувати знання на практиці",
    "Розв'язати практичні задачі"
  ],
  
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Advanced Numbers",
        content: `In this lecture we will learn about a few more representations of numbers in Python.`
      },
      {
        title: "Hexadecimal",
        content: `Using the function hex() you can convert numbers into a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) format:`
      },
      {
        title: "Binary",
        content: `Using the function bin() you can convert numbers into their [binary](https://en.wikipedia.org/wiki/Binary_number) format.`
      },
      {
        title: "Exponentials",
        content: `The function pow() takes two arguments, equivalent to \`\`\`x^y\`\`\`.  With three arguments it is equivalent to \`\`\`(x^y)%z\`\`\`, but may be more efficient for long integers.`
      },
      {
        title: "Absolute Value",
        content: `The function abs() returns the absolute value of a number. The argument may be an integer or a floating point number. If the argument is a complex number, its magnitude is returned.`
      },
      {
        title: "Round",
        content: `The function round() will round a number to a given precision in decimal digits (default 0 digits). It does not convert integers to floats.

Python has a built-in math library that is also useful to play around with in case you are ever in need of some mathematical operations. Explore the documentation [here](https://docs.python.org/3/library/math.html)!`
      },
      {
        title: "Advanced Strings",
        content: `String objects have a variety of methods we can use to save time and add functionality. Let's explore some of them in this lecture:`
      },
      {
        title: "Changing case",
        content: `We can use methods to capitalize the first word of a string, or change the case of the entire string.

Remember, strings are immutable. None of the above methods change the string in place, they only return modified copies of the original string.

To change a string requires reassignment:`
      },
      {
        title: "Formatting",
        content: `The center() method allows you to place your string 'centered' between a provided string with a certain length. Personally, I've never actually used this in code as it seems pretty esoteric...

The expandtabs() method will expand tab notations \t into spaces:`
      },
      {
        title: "is check methods",
        content: `These various methods below check if the string is some case. Let's explore them:

isalnum() will return True if all characters in **s** are alphanumeric

isalpha() will return True if all characters in **s** are alphabetic

islower() will return True if all cased characters in **s** are lowercase and there is
at least one cased character in **s**, False otherwise.

isspace() will return True if all characters in **s** are whitespace.

istitle() will return True if **s** is a title cased string and there is at least one character in **s**, i.e. uppercase characters may only follow uncased characters and lowercase characters only cased ones. It returns False otherwise.

isupper() will return True if all cased characters in **s** are uppercase and there is
at least one cased character in **s**, False otherwise.

Another method is endswith() which is essentially the same as a boolean check on s[-1]`
      },
      {
        title: "Built-in Reg. Expressions",
        content: `Strings have some built-in methods that can resemble regular expression operations.
We can use split() to split the string at a certain element and return a list of the results.
We can use partition() to return a tuple that includes the first occurrence of the separator sandwiched between the first half and the end half.

Great! You should now feel comfortable using the variety of methods that are built-in string objects!`
      },
      {
        title: "Advanced Sets",
        content: `In this lecture we will learn about the various methods for sets that you may not have seen yet. We'll go over the basic ones you already know and then dive a little deeper.`
      },
      {
        title: "add",
        content: `add elements to a set. Remember, a set won't duplicate elements; it will only present them once (that's why it's called a set!)`
      },
      {
        title: "clear",
        content: `removes all elements from the set`
      },
      {
        title: "copy",
        content: `returns a copy of the set. Note it is a copy, so changes to the original don't effect the copy.`
      },
      {
        title: "difference",
        content: `difference returns the difference of two or more sets. The syntax is:

    set1.difference(set2)
For example:`
      },
      {
        title: "difference_update",
        content: `difference_update syntax is:

    set1.difference_update(set2)
the method returns set1 after removing elements found in set2`
      },
      {
        title: "discard",
        content: `Removes an element from a set if it is a member. If the element is not a member, do nothing.`
      },
      {
        title: "intersection and intersection_update",
        content: `Returns the intersection of two or more sets as a new set.(i.e. elements that are common to all of the sets.)

intersection_update will update a set with the intersection of itself and another.`
      },
      {
        title: "isdisjoint",
        content: `This method will return True if two sets have a null intersection.`
      },
      {
        title: "issubset",
        content: `This method reports whether another set contains this set.`
      },
      {
        title: "issuperset",
        content: `This method will report whether this set contains another set.`
      },
      {
        title: "symmetric_difference and symmetric_update",
        content: `Return the symmetric difference of two sets as a new set.(i.e. all elements that are in exactly one of the sets.)`
      },
      {
        title: "union",
        content: `Returns the union of two sets (i.e. all elements that are in either set.)`
      },
      {
        title: "update",
        content: `Update a set with the union of itself and others.

Great! You should now have a complete awareness of all the methods available to you for a set object type. This data structure is extremely useful and is underutilized by beginners, so try to keep it in mind!

Good Job!`
      },
      {
        title: "Advanced Dictionaries",
        content: `Unlike some of the other Data Structures we've worked with, most of the really useful methods available to us in Dictionaries have already been explored throughout this course. Here we will touch on just a few more for good measure:`
      },
      {
        title: "Dictionary Comprehensions",
        content: `Just like List Comprehensions, Dictionary Data Types also support their own version of comprehension for quick creation. It is not as commonly used as List Comprehensions, but the syntax is:

One of the reasons it is not as common is the difficulty in structuring key names that are not based off the values.`
      },
      {
        title: "Iteration over keys, values, and items",
        content: `Dictionaries can be iterated over using the keys(), values() and items() methods. For example:`
      },
      {
        title: "Viewing keys, values and items",
        content: `By themselves the keys(), values() and items() methods return a dictionary *view object*. This is not a separate list of items. Instead, the view is always tied to the original dictionary.

Great! You should now feel very comfortable using the variety of methods available to you in Dictionaries!`
      },
      {
        title: "Advanced Lists",
        content: `In this series of lectures we will be diving a little deeper into all the methods available in a list object. These aren't officially \"advanced\" features, just methods that you wouldn't typically encounter without some additional exploring. It's pretty likely that you've already encountered some of these yourself!

Let's begin!`
      },
      {
        title: "append",
        content: `You will definitely have used this method by now, which merely appends an element to the end of a list:`
      },
      {
        title: "count",
        content: `We discussed this during the methods lectures, but here it is again. count() takes in an element and returns the number of times it occurs in your list:`
      },
      {
        title: "extend",
        content: `Many times people find the difference between extend and append to be unclear. So note:

**append: appends whole object at end:**

**extend: extends list by appending elements from the iterable:**

Note how extend() appends each element from the passed-in list. That is the key difference.`
      },
      {
        title: "index",
        content: `index() will return the index of whatever element is placed as an argument. Note: If the the element is not in the list an error is raised.`
      },
      {
        title: "insert",
        content: `insert() takes in two arguments: insert(index,object) This method places the object at the index supplied. For example:`
      },
      {
        title: "pop",
        content: `You most likely have already seen pop(), which allows us to \"pop\" off the last element of a list. However, by passing an index position you can remove and return a specific element.`
      },
      {
        title: "remove",
        content: `The remove() method removes the first occurrence of a value. For example:`
      },
      {
        title: "reverse",
        content: `As you might have guessed, reverse() reverses a list. Note this occurs in place! Meaning it affects your list permanently.`
      },
      {
        title: "sort",
        content: `The sort() method will sort your list in place:

The sort() method takes an optional argument for reverse sorting. Note this is different than simply reversing the order of items.`
      },
      {
        title: "Be Careful With Assignment!",
        content: `A common programming mistake is to assume you can assign a modified list to a new variable. While this typically works with immutable objects like strings and tuples:

This will NOT work the same way with lists:

What happened? In this case, since list methods like append() affect the list *in-place*, the operation returns a None value. This is what was passed to **y**. In order to retain **x** you would have to assign a *copy* of **x** to **y**, and then modify **y**:

Great! You should now have an understanding of all the methods available for a list in Python!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `hex(246)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `hex(512)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `bin(1234)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `bin(128)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `bin(512)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `pow(3,4)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `pow(3,4,5)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `abs(-3.14)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `abs(3)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `round(3,2)`,
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
