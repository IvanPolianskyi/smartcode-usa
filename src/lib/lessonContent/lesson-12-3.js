/**
 * 00 Overview Of Working With Images
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_3 = {
  lessonId: "lesson-10-5",
  moduleId: "module-12",
  order: 1,
  title: "00 Overview Of Working With Images",
  
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
        title: "Overview of Working with Images",
        content: `By leveraging the power of some common libraries that you can install, such as PILLOW, Python gains the ability to work with and manipulate images for simple tasks. You can install Pillow by running:

    pip install pillow
    
In case of any issues, you can refer to their [official documentation](http://pillow.readthedocs.io/en/3.4.x/installation.html) on installation. But for most computers, the simple pip install method should work.

---
____
**Note: When working with images in the jupyter notebook, you may get the following warning:**

    IOPub data rate exceeded.
    The notebook server will temporarily stop sending output
    to the client in order to avoid crashing it.
    To change this limit, set the config variable
    \`--NotebookApp.iopub_data_rate_limit\`.
    
**If you get this warning, try stopping the notebook at the command line, then restarting it with:**

    jupyter notebook --NotebookApp.iopub_data_rate_limit=1.0e10
    
** At the command line. Basically this adds a \"flag\" that the limit should be raised during this session of jupyter notebook that you are running.**

----`
      },
      {
        title: "Working with Pillow Library",
        content: `## Opening Images

You can use Pillow to open image files. For a jupyter notebook, to show the file simply type the variable name holding the image. For other IDEs , the image variable will have a [.show() method.](https://stackoverflow.com/questions/28139637/how-can-i-display-an-image-using-pillow)`
      },
      {
        title: "Cropping Images",
        content: `To crop images (that is grab a sub section) you can use the crop() method on the image object. The crop() method returns a rectangular region from this image. The box is a 4-tuple defining the left, upper, right, and lower pixel coordinate.

Note! If you take a look at the documentation string, it says the tuple you pass in is defined as (x,y,w,h). These variables can be a bit decieving. Its not really a height or width that is being passed, but instead the end coordinates of your width and height.

All the coordinates of box (x, y, w, h) are measured from the top left corner of the image. Again, all 4 of these values are coordinates!

For the mac image this isn't a very useful demonstration. Let's use another image instead:

Now let's attempt to grab some of the top pencils from the corner

Now let's try the pencils from the bottom

Now let's go back to the mac photo and see if we can only grab the computer itself:`
      },
      {
        title: "Copying and Pasting Images",
        content: `We can create copies with the copy() method and paste images on top of others with the paste() method.`
      },
      {
        title: "Resizing",
        content: `You can use the resize() method to resize an image

Can also stretch and squeeze`
      },
      {
        title: "Rotating Images",
        content: `You can rotate images by specifying the amount of degrees to rotate on the rotate() method. The original dimensions will be kept and \"filled\" in with black. You can optionally pass in the expand parameter to fill the new rotated image to the old dimensions.

Notice what happens when we rotate by 120.`
      },
      {
        title: "Transparency",
        content: `We can add an alpha value (RGBA stands for RED,Green,Blue, Alpha) where values can go from 0 to 255. If Alpha is 0 the image is completely transparent, if it is 255 then its completely opaque.

You can create your own color here to check for possible values: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool

We can adjust image alpha values with the putalpha() method:

Transparency and masking can be much more complex than what we've shown here, if you find yourself needing something more, check out the documentation: https://pillow.readthedocs.io/en/stable/`
      },
      {
        title: "Saving Images",
        content: `Let's save this updated \"blue\" image as 'purple.png' in this folder.

Let's check to make sure that worked:

Great job!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `from PIL import Image`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `mac = Image.open('example.jpg')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Note this is a specialized file type from PIL (pillow)",
      code: `# Note this is a specialized file type from PIL (pillow)
type(mac)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Only for jupyter notebook , use mac.show() for other IDEs",
      code: `# Only for jupyter notebook , use mac.show() for other IDEs 
mac`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "(width, height)",
      code: `# (width, height)
mac.size`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `mac.filename`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `mac.format_description`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `mac.crop((0,0,100,100))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `pencils = Image.open(\"pencils.jpg\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `pencils`,
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
