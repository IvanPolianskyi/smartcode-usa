import fs from 'fs'
import path from 'path'

const stems = process.argv.slice(2)
const headerMap = {
  'lesson-10-1': 'Introduction to PIL/Pillow',
  'lesson-10-2': 'Image Manipulation',
  'lesson-10-3': 'Working with Colors and Filters',
  'lesson-10-4': 'Practice: Image Processing',
  'lesson-11-1': 'Working with PDF: PyPDF2 and reportlab',
  'lesson-12-1': 'Introduction to Email: smtplib',
  'lesson-12-2': 'Creating HTML Email and Attachments',
  'lesson-12-3': 'Reading Email: imaplib',
  'lesson-12-5': 'Email Automation and Best Practices',
  'lesson-12-6': 'Practice: Email Automation',
  'lesson-13-1': 'Introduction to GUI. What is Tkinter',
  'lesson-13-2': 'Basic Tkinter Widgets',
  'lesson-13-3': 'Layout Management in Tkinter',
  'lesson-13-4': 'Menus and Dialogs in Tkinter',
  'lesson-13-5': 'Advanced Tkinter Widgets',
  'lesson-15-6': 'Event Handling and Practice: GUI Application',
}

for (const stem of stems) {
  const file = path.join('src/lib/lessonContent/en', `${stem}.js`)
  let content = fs.readFileSync(file, 'utf8')

  // Restore markdown code fences inside template literals
  content = content.replace(/\\\\\\`\\\\\\`\\\\\\`/g, '\\`\\`\\`')

  const title = headerMap[stem]
  if (title) {
    content = content.replace(
      /^\/\*\*[\s\S]*?\*\//,
      `/**\n * Lesson ${stem.replace('lesson-', '')}: ${title}\n * Full educational content\n */`
    )
  }

  // Fix learning objective stray lesson id in lesson-15-6
  if (stem === 'lesson-15-6') {
    content = content.replace(
      /learningObjectives: \[[\s\S]*?\]/,
      `learningObjectives: [
    "Handle click events",
    "Create callback functions",
    "Build a full GUI application",
    "Apply everything you have learned"
  ]`
    )
    content = content.replace('- lesson-19-4\n', '')
    content = content.replace('**Prerequisites:** lesson-19-4', '')
  }

  fs.writeFileSync(file, content)
  console.log(`Fixed ${stem}`)
}
