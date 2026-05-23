/**
 * Full Curriculum for "Web Development: From Zero to Confident Junior"
 *
 * 7 Modules, 4-6 lessons each
 * Total: 44 lessons
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const webDevCurriculum = {
  courseId: "web-development",
  title: "Web Development: From Foundations to Advanced Level",

  modules: [
    {
      moduleId: "module-1",
      order: 1,
      title: "HTML and CSS Fundamentals",
      description: "Creating web page structure and styling",
      duration: { weeks: 4, lessons: 6 },
      learningOutcomes: [
        "Understanding HTML document structure",
        "Creating semantic markup",
        "Styling with CSS",
        "Responsive design"
      ],
      lessons: [
        {
          lessonId: "web-lesson-1-1",
          order: 1,
          title: "Introduction to web development and HTML",
          learningObjectives: [
            "Understand what web development is",
            "Create your first HTML page",
            "Learn basic HTML tags",
            "Understand HTML document structure"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "web-lesson-1-2",
          order: 2,
          title: "Semantic HTML5 markup",
          learningObjectives: [
            "Use semantic tags",
            "Create page structure",
            "Understand the difference between div and semantic tags",
            "Create navigation and footer"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-1-1"]
        },
        {
          lessonId: "web-lesson-1-3",
          order: 3,
          title: "CSS basics: selectors and properties",
          learningObjectives: [
            "Use CSS selectors",
            "Apply styles to elements",
            "Understand cascade and specificity",
            "Work with colors and fonts"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-1-2"]
        },
        {
          lessonId: "web-lesson-1-4",
          order: 4,
          title: "CSS Flexbox and Grid",
          learningObjectives: [
            "Use Flexbox for layout",
            "Create grids with CSS Grid",
            "Adapt layouts to different screens",
            "Combine Flexbox and Grid"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-1-3"]
        },
        {
          lessonId: "web-lesson-1-5",
          order: 5,
          title: "Responsive design and media queries",
          learningObjectives: [
            "Create responsive layouts",
            "Use media queries",
            "Understand the mobile-first approach",
            "Test on different devices"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-1-4"]
        },
        {
          lessonId: "web-lesson-1-6",
          order: 6,
          title: "Module 1: Practical project - Personal page",
          learningObjectives: [
            "Create a complete web page",
            "Apply all skills from the module",
            "Make a responsive design",
            "Publish the project"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-1-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-2",
      order: 2,
      title: "Advanced CSS and animations",
      description: "Advanced CSS techniques, animations, and effects",
      duration: { weeks: 3, lessons: 5 },
      learningOutcomes: [
        "Creating animations and transitions",
        "Working with CSS variables",
        "Using preprocessors",
        "Optimizing CSS"
      ],
      lessons: [
        {
          lessonId: "web-lesson-2-1",
          order: 1,
          title: "CSS animations and transitions",
          learningObjectives: [
            "Create smooth transitions",
            "Use keyframes",
            "Animate elements",
            "Optimize animation performance"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-1-6"]
        },
        {
          lessonId: "web-lesson-2-2",
          order: 2,
          title: "CSS variables and custom properties",
          learningObjectives: [
            "Use CSS variables",
            "Create themes",
            "Change styles dynamically",
            "Organize CSS code"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-2-1"]
        },
        {
          lessonId: "web-lesson-2-3",
          order: 3,
          title: "Pseudo-classes and pseudo-elements",
          learningObjectives: [
            "Use pseudo-classes",
            "Create pseudo-elements",
            "Apply complex selectors",
            "Create interactive effects"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-2-2"]
        },
        {
          lessonId: "web-lesson-2-4",
          order: 4,
          title: "CSS preprocessors (SASS/SCSS)",
          learningObjectives: [
            "Understand the benefits of preprocessors",
            "Use variables and mixins",
            "Organize code with partials",
            "Compile SCSS to CSS"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-2-3"]
        },
        {
          lessonId: "web-lesson-2-5",
          order: 5,
          title: "Module 2: Practical project - Animated portfolio",
          learningObjectives: [
            "Create an interactive portfolio",
            "Apply animations",
            "Use CSS variables",
            "Optimize performance"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-2-4"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-3",
      order: 3,
      title: "JavaScript Fundamentals",
      description: "JavaScript programming for web development",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Understanding JavaScript basics",
        "Working with the DOM",
        "Event handling",
        "Asynchronous programming"
      ],
      lessons: [
        {
          lessonId: "web-lesson-3-1",
          order: 1,
          title: "Introduction to JavaScript",
          learningObjectives: [
            "Understand the role of JavaScript in web development",
            "Learn basic data types",
            "Work with variables",
            "Use the developer console"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-2-5"]
        },
        {
          lessonId: "web-lesson-3-2",
          order: 2,
          title: "Functions and objects in JavaScript",
          learningObjectives: [
            "Create and call functions",
            "Work with objects",
            "Use object methods",
            "Understand the this context"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-1"]
        },
        {
          lessonId: "web-lesson-3-3",
          order: 3,
          title: "Working with the DOM",
          learningObjectives: [
            "Access elements",
            "Modify the DOM",
            "Create and remove elements",
            "Manipulate attributes"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-2"]
        },
        {
          lessonId: "web-lesson-3-4",
          order: 4,
          title: "Event handling",
          learningObjectives: [
            "Add event listeners",
            "Understand event bubbling",
            "Work with forms",
            "Validate data"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-3"]
        },
        {
          lessonId: "web-lesson-3-5",
          order: 5,
          title: "Asynchronous JavaScript: Promises and async/await",
          learningObjectives: [
            "Understand asynchrony",
            "Use Promises",
            "Work with async/await",
            "Handle errors"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-3-4"]
        },
        {
          lessonId: "web-lesson-3-6",
          order: 6,
          title: "Module 3: Practical project - Interactive Todo app",
          learningObjectives: [
            "Build a full application",
            "Apply all JavaScript skills",
            "Store data in localStorage",
            "Create an interactive UI"
          ],
          estimatedTime: 150,
          prerequisites: ["web-lesson-3-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-4",
      order: 4,
      title: "React: Modern JavaScript framework",
      description: "Building interactive UIs with React",
      duration: { weeks: 6, lessons: 6 },
      learningOutcomes: [
        "Understanding React concepts",
        "Creating components",
        "Working with state",
        "Routing and navigation"
      ],
      lessons: [
        {
          lessonId: "web-lesson-4-1",
          order: 1,
          title: "Introduction to React and components",
          learningObjectives: [
            "Understand what React is",
            "Create your first component",
            "Use JSX",
            "Set up a React project"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-6"]
        },
        {
          lessonId: "web-lesson-4-2",
          order: 2,
          title: "Props and state",
          learningObjectives: [
            "Pass data through props",
            "Use useState",
            "Manage component state",
            "Understand re-rendering"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-4-1"]
        },
        {
          lessonId: "web-lesson-4-3",
          order: 3,
          title: "Lifecycle and hooks",
          learningObjectives: [
            "Use useEffect",
            "Understand the lifecycle",
            "Apply other hooks",
            "Optimize performance"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-4-2"]
        },
        {
          lessonId: "web-lesson-4-4",
          order: 4,
          title: "Routing with React Router",
          learningObjectives: [
            "Set up React Router",
            "Create routes",
            "Use navigation",
            "Protect routes"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-4-3"]
        },
        {
          lessonId: "web-lesson-4-5",
          order: 5,
          title: "Working with APIs and Context API",
          learningObjectives: [
            "Make HTTP requests",
            "Use Context API",
            "Manage global state",
            "Handle loading and errors"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-4-4"]
        },
        {
          lessonId: "web-lesson-4-6",
          order: 6,
          title: "Module 4: Practical project - React application",
          learningObjectives: [
            "Build a full React application",
            "Use routing",
            "Integrate with an API",
            "Deploy to Vercel/Netlify"
          ],
          estimatedTime: 180,
          prerequisites: ["web-lesson-4-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-5",
      order: 5,
      title: "Backend development with Node.js",
      description: "Building the server side of web applications",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Understanding backend development",
        "Creating REST APIs",
        "Working with databases",
        "Authentication and authorization"
      ],
      lessons: [
        {
          lessonId: "web-lesson-5-1",
          order: 1,
          title: "Introduction to Node.js and Express",
          learningObjectives: [
            "Understand what Node.js is",
            "Create your first server",
            "Use Express",
            "Set up routes"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-4-6"]
        },
        {
          lessonId: "web-lesson-5-2",
          order: 2,
          title: "REST API: GET, POST, PUT, DELETE",
          learningObjectives: [
            "Create a REST API",
            "Handle HTTP methods",
            "Validate data",
            "Handle errors"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-5-1"]
        },
        {
          lessonId: "web-lesson-5-3",
          order: 3,
          title: "Working with databases (MongoDB)",
          learningObjectives: [
            "Connect MongoDB",
            "Create schemas",
            "Perform CRUD operations",
            "Use Mongoose"
          ],
          estimatedTime: 135,
          prerequisites: ["web-lesson-5-2"]
        },
        {
          lessonId: "web-lesson-5-4",
          order: 4,
          title: "Authentication and JWT",
          learningObjectives: [
            "Implement registration",
            "Build a login system",
            "Use JWT tokens",
            "Protect routes"
          ],
          estimatedTime: 135,
          prerequisites: ["web-lesson-5-3"]
        },
        {
          lessonId: "web-lesson-5-5",
          order: 5,
          title: "Files and uploads",
          learningObjectives: [
            "Upload files",
            "Process images",
            "Store files",
            "Optimize uploads"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-5-4"]
        },
        {
          lessonId: "web-lesson-5-6",
          order: 6,
          title: "Module 5: Practical project - Backend API",
          learningObjectives: [
            "Build a full API",
            "Implement authentication",
            "Connect a database",
            "Write documentation"
          ],
          estimatedTime: 180,
          prerequisites: ["web-lesson-5-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-6",
      order: 6,
      title: "Frontend and backend integration",
      description: "Connecting a React app to a backend API",
      duration: { weeks: 4, lessons: 5 },
      learningOutcomes: [
        "Integrate React with an API",
        "Manage application state",
        "Handle errors",
        "Optimize performance"
      ],
      lessons: [
        {
          lessonId: "web-lesson-6-1",
          order: 1,
          title: "Connecting React to an API",
          learningObjectives: [
            "Make HTTP requests from React",
            "Use axios/fetch",
            "Handle responses",
            "Manage loading state"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-5-6"]
        },
        {
          lessonId: "web-lesson-6-2",
          order: 2,
          title: "Frontend authentication",
          learningObjectives: [
            "Store tokens",
            "Create an authentication context",
            "Protect routes",
            "Implement logout"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-6-1"]
        },
        {
          lessonId: "web-lesson-6-3",
          order: 3,
          title: "Error handling and validation",
          learningObjectives: [
            "Handle API errors",
            "Validate forms",
            "Show messages to users",
            "Handle edge cases"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-6-2"]
        },
        {
          lessonId: "web-lesson-6-4",
          order: 4,
          title: "Optimization and performance",
          learningObjectives: [
            "Optimize requests",
            "Use caching",
            "Lazy loading",
            "Minimize re-renders"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-6-3"]
        },
        {
          lessonId: "web-lesson-6-5",
          order: 5,
          title: "Module 6: Practical project - Full-stack web application",
          learningObjectives: [
            "Combine frontend and backend",
            "Implement all features",
            "Test the application",
            "Optimize performance"
          ],
          estimatedTime: 240,
          prerequisites: ["web-lesson-6-4"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-7",
      order: 7,
      title: "Deployment and DevOps basics",
      description: "Publishing projects and DevOps practices",
      duration: { weeks: 3, lessons: 4 },
      learningOutcomes: [
        "Deploy frontend and backend",
        "Use CI/CD",
        "Monitor applications",
        "Optimize for production"
      ],
      lessons: [
        {
          lessonId: "web-lesson-7-1",
          order: 1,
          title: "Frontend deployment (Vercel/Netlify)",
          learningObjectives: [
            "Deploy a React application",
            "Configure environment variables",
            "Optimize the build",
            "Set up a domain"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-6-5"]
        },
        {
          lessonId: "web-lesson-7-2",
          order: 2,
          title: "Backend deployment (Heroku/Railway)",
          learningObjectives: [
            "Deploy a Node.js application",
            "Set up a database",
            "Configure environment variables",
            "Monitor the server"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-7-1"]
        },
        {
          lessonId: "web-lesson-7-3",
          order: 3,
          title: "Git, GitHub, and CI/CD",
          learningObjectives: [
            "Use Git",
            "Work with GitHub",
            "Set up CI/CD",
            "Automate deployment"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-7-2"]
        },
        {
          lessonId: "web-lesson-7-4",
          order: 4,
          title: "Final project - Full-stack web application",
          learningObjectives: [
            "Create the final project",
            "Apply all skills",
            "Deploy the project",
            "Write documentation"
          ],
          estimatedTime: 480,
          prerequisites: ["web-lesson-7-3"],
          isProject: true,
          isFinalProject: true
        }
      ]
    }
  ]
}
