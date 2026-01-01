/**
 * 02 Datetime Module
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_2 = {
  lessonId: "lesson-12-2",
  moduleId: "module-12",
  order: 2,
  title: "02 Datetime Module",
  
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
        title: "datetime module",
        content: `Python has the datetime module to help deal with timestamps in your code. Time values are represented with the time class. Times have attributes for hour, minute, second, and microsecond. They can also include time zone information. The arguments to initialize a time instance are optional, but the default of 0 is unlikely to be what you want.

## time
Let's take a look at how we can extract time information from the datetime module. We can create a timestamp by specifying datetime.time(hour,minute,second,microsecond)

Note: A time instance only holds values of time, and not a date associated with the time. 

We can also check the min and max values a time of day can have in the module:

The min and max class attributes reflect the valid range of times in a single day.`
      },
      {
        title: "Dates",
        content: `datetime (as you might suspect) also allows us to work with date timestamps. Calendar date values are represented with the date class. Instances have attributes for year, month, and day. It is easy to create a date representing today’s date using the today() class method.

Let's see some examples:

As with time, the range of date values supported can be determined using the min and max attributes.

Another way to create new date instances uses the replace() method of an existing date. For example, you can change the year, leaving the day and month alone.`
      },
      {
        title: "Arithmetic",
        content: `We can perform arithmetic on date objects to check for time differences. For example:

This gives us the difference in days between the two dates. You can use the timedelta method to specify various units of times (days, minutes, hours, etc.)

Great! You should now have a basic understanding of how to use datetime with Python to work with timestamps in your code!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `import datetime

t = datetime.time(4, 20, 1)

# Let's show the different components
print(t)
print('hour  :', t.hour)
print('minute:', t.minute)
print('second:', t.second)
print('microsecond:', t.microsecond)
print('tzinfo:', t.tzinfo)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print('Earliest  :', datetime.time.min)
print('Latest    :', datetime.time.max)
print('Resolution:', datetime.time.resolution)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `today = datetime.date.today()
print(today)
print('ctime:', today.ctime())
print('tuple:', today.timetuple())
print('ordinal:', today.toordinal())
print('Year :', today.year)
print('Month:', today.month)
print('Day  :', today.day)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print('Earliest  :', datetime.date.min)
print('Latest    :', datetime.date.max)
print('Resolution:', datetime.date.resolution)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d1 = datetime.date(2015, 3, 11)
print('d1:', d1)

d2 = d1.replace(year=1990)
print('d2:', d2)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `d1-d2`,
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
