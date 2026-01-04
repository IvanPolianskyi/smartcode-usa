/**
 * 00 Guide To Web Scraping
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_1 = {
  lessonId: "lesson-13-1",
  moduleId: "module-11",
  order: 1,
  title: "00 Guide To Web Scraping",
  
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
        title: "Guide to Web Scraping",
        content: `Let's get you started with web scraping and Python. Before we begin, here are some important rules to follow and understand:

1. Always be respectful and try to get premission to scrape, do not bombard a website with scraping requests, otherwise your IP address may be blocked!
2. Be aware that websites change often, meaning your code could go from working to totally broken from one day to the next.
3. Pretty much every web scraping project of interest is a unique and custom job, so try your best to generalize the skills learned here.

OK, let's get started with the basics!

## Basic components of a WebSite

### HTML
HTML stands for  Hypertext Markup Language and every website on the internet uses it to display information. Even the jupyter notebook system uses it to display this information in your browser. If you right click on a website and select \"View Page Source\" you can see the raw HTML of a web page. This is the information that Python will be looking at to grab information from. Let's take a look at a simple webpage's HTML:

      
      
        
            Title on Browser Tab
        
        
             Website Header 
             Some Paragraph

Let's breakdown these components.

Every  indicates a specific block type on the webpage:

    1. HTML documents will always start with this type declaration, letting the browser know its an HTML file.
    2. The component blocks of the HTML document are placed between  and .
    3. Meta data and script connections (like a link to a CSS file or a JS file) are often placed in the  block.
    4. The  tag block defines the title of the webpage (its what shows up in the tab of a website you're visiting).
    5. Is between  and  tags are the blocks that will be visible to the site visitor.
    6. Headings are defined by the  through  tags, where the number represents the size of the heading.
    7. Paragraphs are defined by the  tag, this is essentially just normal text on the website.

    There are many more tags than just these, such as  for hyperlinks,  for tables,  for table rows, and  for table columns, and more!`
      },
      {
        title: "CSS",
        content: `CSS stands for Cascading Style Sheets, this is what gives \"style\" to a website, including colors and fonts, and even some animations! CSS uses tags such as **id** or **class** to connect an HTML element to a CSS feature, such as a particular color. **id** is a unique id for an HTML tag and must be unique within the HTML document, basically a single use connection. **class** defines a general style that can then be linked to multiple HTML tags. Basically if you only want a single html tag to be red, you would use an id tag, if you wanted several HTML tags/blocks to be red, you would create a class in your CSS doc and then link it to the rest of these blocks.`
      },
      {
        title: "Scraping Guidelines",
        content: `Keep in mind you should always have permission for the website you are scraping! Check a websites terms and conditions for more info. Also keep in mind that a computer can send requests to a website very fast, so a website may block your computer's ip address if you send too many requests too quickly. Lastly, websites change all the time! You will most likely need to update your code often for long term web-scraping jobs.`
      },
      {
        title: "Web Scraping with Python",
        content: `There are a few libraries you will need, you can go to your command line and install them with conda install (if you are using anaconda distribution), or pip install for other python distributions.

    conda install requests
    conda install lxml
    conda install bs4
    
if you are not using the Anaconda Installation, you can use **pip install** instead of **conda install**, for example:

    pip install requests
    pip install lxml
    pip install bs4
    
Now let's see what we can do with these libraries.

----`
      },
      {
        title: "Example Task 0 - Grabbing the title of a page",
        content: `Let's start very simple, we will grab the title of a page. Remember that this is the HTML block with the **title** tag. For this task we will use **www.example.com** which is a website specifically made to serve as an example domain. Let's go through the main steps:

This object is a requests.models.Response object and it actually contains the information from the website, for example:

____
Now we use BeautifulSoup to analyze the extracted page. Technically we could use our own custom script to loook for items in the string of **res.text** but the BeautifulSoup library already has lots of built-in tools and methods to grab information from a string of this nature (basically an HTML file). Using BeautifulSoup we can create a \"soup\" object that contains all the \"ingredients\" of the webpage. Don't ask me about the weird library names, I didn't choose them! :)

Now let's use the **.select()** method to grab elements. We are looking for the 'title' tag, so we will pass in 'title'

Notice what is returned here, its actually a list containing all the title elements (along with their tags). You can use indexing or even looping to grab the elements from the list. Since this object it still a specialized tag, we cna use method calls to grab just the text.`
      },
      {
        title: "Example Task 1 - Grabbing all elements of a class",
        content: `Let's try to grab all the section headings of the Wikipedia Article on Grace Hopper from this URL: https://en.wikipedia.org/wiki/Grace_Hopper

Now its time to figure out what we are actually looking for. Inspect the element on the page to see that the section headers have the class \"mw-headline\". Because this is a class and not a straight tag, we need to adhere to some syntax for CSS. In this case

Syntax to pass to the .select() method

Match Results

soup.select('div')

All elements with the &lt;div&gt; tag

soup.select('#some_id')

The HTML element containing the id attribute of some_id

soup.select('.notice')

All the HTML elements with the CSS class named notice

soup.select('div span')

Any elements named &lt;span&gt; that are within an element named &lt;div&gt;

soup.select('div &gt; span')

Any elements named &lt;span&gt; that are directly within an element named &lt;div&gt;, with no other element in between`
      },
      {
        title: "Example Task 3 - Getting an Image from a Website",
        content: `Let's attempt to grab the image of the Deep Blue Computer from this wikipedia article: https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)

You can make dictionary like calls for parts of the Tag, in this case, we are interested in the **src** , or \"source\" of the image, which should be its own .jpg or .png link:

We can actually display it with a markdown cell with the following:

Now that you have the actual src link, you can grab the image with requests and get along with the .content attribute. Note how we had to add https:// before the link, if you don't do this, requests will complain (but it gives you a pretty descriptive error code).

**Let's write this to a file:=, not the 'wb' call to denote a binary writing of the file.**

Now we can display this file right here in the notebook as markdown using:

    
    
Just write the above line in a new markdown cell and it will display the image we just downloaded!`
      },
      {
        title: "Example Project - Working with Multiple Pages and Items",
        content: `Let's show a more realistic example of scraping a full site. The website: http://books.toscrape.com/index.html is specifically designed for people to scrape it. Let's try to get the title of every book that has a 2 star rating and at the end just have a Python list with all their titles.

We will do the following:

1. Figure out the URL structure to go through every page
2. Scrap every page in the catalogue
3. Figure out what tag/class represents the Star rating
4. Filter by that star rating using an if statement
5. Store the results to a list

We can see that the URL structure is the following:

    http://books.toscrape.com/catalogue/page-1.html

We can then fill in the page number with .format()

Now let's grab the products (books) from the get request result:

Now we can see that each book has the product_pod class. We can select any tag with this class, and then further reduce it by its rating.

Now by inspecting the site we can see that the class we want is class='star-rating Two' , if you click on this in your browser, you'll notice it displays the space as a . , so that means we want to search for \".star-rating.Two\"

But we are looking for 2 stars, so it looks like we can just check to see if something was returned

Alternatively, we can just quickly check the text string to see if \"star-rating Two\" is in it. Either approach is fine (there are also many other alternative approaches!)

Now let's see how we can get the title if we have a 2-star match:

Okay, let's give it a shot by combining all the ideas we've talked about! (this should take about 20-60 seconds to complete running. Be aware a firwall may prevent this script from running. Also if you are getting a no response error, maybe try adding a sleep step with time.sleep(1).

** Excellent! You should now have the tools necessary to scrape any websites that interest you! Keep in mind, the more complex the website, the harder it will be to scrape. Always ask for permission! **`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `import requests`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Step 1: Use the requests library to grab the page",
      code: `# Step 1: Use the requests library to grab the page
# Note, this may fail if you have a firewall blocking Python/Jupyter 
# Note sometimes you need to run this twice if it fails the first time
res = requests.get(\"http://www.example.com\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `type(res)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `res.text`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `import bs4`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `soup = bs4.BeautifulSoup(res.text,\"lxml\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `soup`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `soup.select('title')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `title_tag = soup.select('title')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `title_tag[0]`,
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
