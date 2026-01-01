/**
 * 03 For Loops
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_3 = {
  lessonId: "lesson-02-3",
  moduleId: "module-02",
  order: 3,
  title: "03 For Loops",
  
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
        title: "for Loops",
        content: `A for loop acts as an iterator in Python; it goes through items that are in a *sequence* or any other iterable item. Objects that we've learned about that we can iterate over include strings, lists, tuples, and even built-in iterables for dictionaries, such as keys or values.

We've already seen the for statement a little bit in past lectures but now let's formalize our understanding.

Here's the general format for a for loop in Python:

    for item in object:
        statements to do stuff

The variable name used for the item is completely up to the coder, so use your best judgment for choosing a name that makes sense and you will be able to understand when revisiting your code. This item name can then be referenced inside your loop, for example if you wanted to use if statements to perform checks.

Let's go ahead and work through several example of for loops using a variety of data object types. We'll start simple and build more complexity later on.

## Example 1
Iterating through a list

Great! Hopefully this makes sense. Now let's add an if statement to check for even numbers. We'll first introduce a new concept here--the modulo.
### Modulo
The modulo allows us to get the remainder in a division and uses the % symbol. For example:

This makes sense since 17 divided by 5 is 3 remainder 2. Let's see a few more quick examples:

Notice that if a number is fully divisible with no remainder, the result of the modulo call is 0. We can use this to test for even numbers, since if a number modulo 2 is equal to 0, that means it is an even number!

Back to the for loops!

## Example 2
Let's print only the even numbers from that list!

We could have also put an else statement in there:`
      },
      {
        title: "Example 3",
        content: `Another common idea during a for loop is keeping some sort of running tally during multiple loops. For example, let's create a for loop that sums up the list:

Great! Read over the above cell and make sure you understand fully what is going on. Also we could have implemented a += to perform the addition towards the sum. For example:`
      },
      {
        title: "Example 4",
        content: `We've used for loops with lists, how about with strings? Remember strings are a sequence so when we iterate through them we will be accessing each item in that string.`
      },
      {
        title: "Example 5",
        content: `Let's now look at how a for loop can be used with a tuple:`
      },
      {
        title: "Example 6",
        content: `Tuples have a special quality when it comes to for loops. If you are iterating through a sequence that contains tuples, the item can actually be the tuple itself, this is an example of *tuple unpacking*. During the for loop we will be unpacking the tuple inside of a sequence and we can access the individual items inside that tuple!

Cool! With tuples in a sequence we can access the items inside of them through unpacking! The reason this is important is because many objects will deliver their iterables through tuples. Let's start exploring iterating through Dictionaries to explore this further!`
      },
      {
        title: "Example 7",
        content: `Notice how this produces only the keys. So how can we get the values? Or both the keys and the values? 

We're going to introduce three new Dictionary methods: **.keys()**, **.values()** and **.items()**

In Python each of these methods return a *dictionary view object*. It supports operations like membership test and iteration, but its contents are not independent of the original dictionary – it is only a view. Let's see it in action:

Since the .items() method supports iteration, we can perform *dictionary unpacking* to separate keys and values just as we did in the previous examples.

If you want to obtain a true list of keys, values, or key/value tuples, you can *cast* the view as a list:

Remember that dictionaries are unordered, and that keys and values come back in arbitrary order. You can obtain a sorted list using sorted():`
      },
      {
        title: "Conclusion",
        content: `We've learned how to use for loops to iterate through tuples, lists, strings, and dictionaries. It will be an important tool for us, so make sure you know it well and understood the above examples.

[More resources](http://www.tutorialspoint.com/python/python_for_loop.htm)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "We'll learn how to automate this sort of list in the next lecture",
      code: `# We'll learn how to automate this sort of list in the next lecture
list1 = [1,2,3,4,5,6,7,8,9,10]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `for num in list1:
    print(num)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `17 % 5`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "3 Remainder 1",
      code: `# 3 Remainder 1
10 % 3`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "2 Remainder 4",
      code: `# 2 Remainder 4
18 % 7`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "2 no remainder",
      code: `# 2 no remainder
4 % 2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `for num in list1:
    if num % 2 == 0:
        print(num)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `for num in list1:
    if num % 2 == 0:
        print(num)
    else:
        print('Odd number')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Start sum at zero",
      code: `# Start sum at zero
list_sum = 0 

for num in list1:
    list_sum = list_sum + num

print(list_sum)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Start sum at zero",
      code: `# Start sum at zero
list_sum = 0 

for num in list1:
    list_sum += num

print(list_sum)`,
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
