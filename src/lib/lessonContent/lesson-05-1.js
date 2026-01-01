/**
 * 01 Object Oriented Programming
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_1 = {
  lessonId: "lesson-05-1",
  moduleId: "module-05",
  order: 1,
  title: "01 Object Oriented Programming",
  
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
        title: "Object Oriented Programming",
        content: `Object Oriented Programming (OOP) tends to be one of the major obstacles for beginners when they are first starting to learn Python.

There are many, many tutorials and lessons covering OOP so feel free to Google search other lessons, and I have also put some links to other useful tutorials online at the bottom of this Notebook.

For this lesson we will construct our knowledge of OOP in Python by building on the following topics:

* Objects
* Using the *class* keyword
* Creating class attributes
* Creating methods in a class
* Learning about Inheritance
* Learning about Polymorphism
* Learning about Special Methods for classes

Lets start the lesson by remembering about the Basic Python Objects. For example:

Remember how we could call methods on a list?

What we will basically be doing in this lecture is exploring how we could create an Object type like a list. We've already learned about how to create functions. So let's explore Objects in general:

## Objects
In Python, *everything is an object*. Remember from previous lectures we can use type() to check the type of object something is:

So we know all these things are objects, so how can we create our own Object types? That is where the class keyword comes in.
## class
User defined objects are created using the class keyword. The class is a blueprint that defines the nature of a future object. From classes we can construct instances. An instance is a specific object created from a particular class. For example, above we created the object lst which was an instance of a list object. 

Let see how we can use class:

By convention we give classes a name that starts with a capital letter. Note how x is now the reference to our new instance of a Sample class. In other words, we **instantiate** the Sample class.

Inside of the class we currently just have pass. But we can define class attributes and methods.

An **attribute** is a characteristic of an object.
A **method** is an operation we can perform with the object.

For example, we can create a class called Dog. An attribute of a dog may be its breed or its name, while a method of a dog may be defined by a .bark() method which returns a sound.

Let's get a better understanding of attributes through an example.

## Attributes
The syntax for creating an attribute is:
    
    self.attribute = something
    
There is a special method called:

    __init__()

This method is used to initialize the attributes of an object. For example:

Lets break down what we have above.The special method 

    __init__() 
is called automatically right after the object has been created:

    def __init__(self, breed):
Each attribute in a class definition begins with a reference to the instance object. It is by convention named self. The breed is the argument. The value is passed during the class instantiation.

     self.breed = breed

Now we have created two instances of the Dog class. With two breed types, we can then access these attributes like this:

Note how we don't have any parentheses after breed; this is because it is an attribute and doesn't take any arguments.

In Python there are also *class object attributes*. These Class Object Attributes are the same for any instance of the class. For example, we could create the attribute *species* for the Dog class. Dogs, regardless of their breed, name, or other attributes, will always be mammals. We apply this logic in the following manner:

Note that the Class Object Attribute is defined outside of any methods in the class. Also by convention, we place them first before the init.`
      },
      {
        title: "Methods",
        content: `Methods are functions defined inside the body of a class. They are used to perform operations with the attributes of our objects. Methods are a key concept of the OOP paradigm. They are essential to dividing responsibilities in programming, especially in large applications.

You can basically think of methods as functions acting on an Object that take the Object itself into account through its *self* argument.

Let's go through an example of creating a Circle class:

In the \__init__ method above, in order to calculate the area attribute, we had to call Circle.pi. This is because the object does not yet have its own .pi attribute, so we call the Class Object Attribute pi instead.
In the setRadius method, however, we'll be working with an existing Circle object that does have its own pi attribute. Here we can use either Circle.pi or self.pi.
Now let's change the radius and see how that affects our Circle object:

Great! Notice how we used self. notation to reference attributes of the class within the method calls. Review how the code above works and try creating your own method.

## Inheritance

Inheritance is a way to form new classes using classes that have already been defined. The newly formed classes are called derived classes, the classes that we derive from are called base classes. Important benefits of inheritance are code reuse and reduction of complexity of a program. The derived classes (descendants) override or extend the functionality of base classes (ancestors).

Let's see an example by incorporating our previous work on the Dog class:

In this example, we have two classes: Animal and Dog. The Animal is the base class, the Dog is the derived class. 

The derived class inherits the functionality of the base class. 

* It is shown by the eat() method. 

The derived class modifies existing behavior of the base class.

* shown by the whoAmI() method. 

Finally, the derived class extends the functionality of the base class, by defining a new bark() method.`
      },
      {
        title: "Polymorphism",
        content: `We've learned that while functions can take in different arguments, methods belong to the objects they act on. In Python, *polymorphism* refers to the way in which different object classes can share the same method name, and those methods can be called from the same place even though a variety of different objects might be passed in. The best way to explain this is by example:

Here we have a Dog class and a Cat class, and each has a \`.speak()\` method. When called, each object's \`.speak()\` method returns a result unique to the object.

There a few different ways to demonstrate polymorphism. First, with a for loop:

Another is with functions:

In both cases we were able to pass in different object types, and we obtained object-specific results from the same mechanism.

A more common practice is to use abstract classes and inheritance. An abstract class is one that never expects to be instantiated. For example, we will never have an Animal object, only Dog and Cat objects, although Dogs and Cats are derived from Animals:

Real life examples of polymorphism include:
* opening different file types - different tools are needed to display Word, pdf and Excel files
* adding different objects - the \`+\` operator performs arithmetic and concatenation`
      },
      {
        title: "Special Methods",
        content: `Finally let's go over special methods. Classes in Python can implement certain operations with special method names. These methods are not actually called directly but by Python specific language syntax. For example let's create a Book class:

The __init__(), __str__(), __len__() and __del__() methods
These special methods are defined by their use of underscores. They allow us to use Python specific functions on objects created through our class.

**Great! After this lecture you should have a basic understanding of how to create your own objects with class in Python. You will be utilizing this heavily in your next milestone project!**

For more great resources on this topic, check out:

[Tutorial's Point](http://www.tutorialspoint.com/python/python_classes_objects.htm)

[Official Documentation](https://docs.python.org/3/tutorial/classes.html)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `lst = [1,2,3]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst.count(2)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print(type(1))
print(type([]))
print(type(()))
print(type({}))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Create a new object type called Sample",
      code: `# Create a new object type called Sample
class Sample:
    pass

# Instance of Sample
x = Sample()

print(type(x))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `class Dog:
    def __init__(self,breed):
        self.breed = breed
        
sam = Dog(breed='Lab')
frank = Dog(breed='Huskie')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `sam.breed`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `frank.breed`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `class Dog:
    
    # Class Object Attribute
    species = 'mammal'
    
    def __init__(self,breed,name):
        self.breed = breed
        self.name = name`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `sam = Dog('Lab','Sam')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `sam.name`,
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
