/**
 * Lesson 11-1: Working with PDF: PyPDF2 and reportlab
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_11_1 = {
  lessonId: "lesson-11-1",
  moduleId: "module-11",
  order: 1,
  title: "Working with PDF: PyPDF2 and reportlab",
  
  learningObjectives: [
    "Install PyPDF2 and reportlab",
    "Read PDF files",
    "Create PDF files",
    "Manipulate PDF documents"
  ],
  
  prerequisites: ["lesson-10-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to working with PDF",
        content: `PDF (Portable Document Format) is a popular document format that preserves formatting regardless of platform.

**Libraries for working with PDF:**

- **PyPDF2** - reading and manipulation of existing PDFs
- **reportlab** - creation of new PDF documents
- **pdfplumber** - more powerful reading and parsing

**Main tasks:**

- Reading text from PDF
- Merge multiple PDFs
- Split PDF into separate files
- Creation of new PDF documents
- Adding text, images, tables

**Installation:**

\`\`\`bash
pip install PyPDF2 reportlab
\`\`\`

**Import:**

\`\`\`python
import PyPDF2
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
\`\`\``
      },
      {
        title: "Reading PDFs with PyPDF2",
        content: `**Opening and reading PDF:**

\`\`\`python
import PyPDF2

# Open the PDF file
with open('document.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    
    # Number of pages
    num_pages = len(pdf_reader.pages)
    print(f'Number of pages: {num_pages}')
    
    # Read the first page
    first_page = pdf_reader.pages[0]
    text = first_page.extract_text()
    print(text)
\`\`\`

**Reading all pages:**

\`\`\`python
import PyPDF2

def read_pdf(filepath):
    with open(filepath, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        full_text = ""
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            full_text += f"\\n--- Page {page_num + 1} ---\\n"
            full_text += text
        
        return full_text

# Usage
text = read_pdf('document.pdf')
print(text)
\`\`\`

**Retrieving metadata:**

\`\`\`python
import PyPDF2

with open('document.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    
    # Metadata
    metadata = pdf_reader.metadata
    print(f'Title: {metadata.title}')
    print(f'Author: {metadata.author}')
    print(f'Created: {metadata.creation_date}')
    print(f'Modified by: {metadata.modification_date}')
\`\`\``
      },
      {
        title: "Manipulations with PDF",
        content: `**Merging PDF files:**

\`\`\`python
import PyPDF2

def merge_pdfs(pdf_list, output_path):
    """Merge several PDFs into one"""
    pdf_merger = PyPDF2.PdfMerger()
    
    for pdf_path in pdf_list:
        with open(pdf_path, 'rb') as file:
            pdf_merger.append(file)
    
    # Save the combined PDF
    with open(output_path, 'wb') as output_file:
        pdf_merger.write(output_file)
    
    print(f'Combined {len(pdf_list)} PDF files')

# Usage
merge_pdfs(['file1.pdf', 'file2.pdf', 'file3.pdf'], 'merged.pdf')
\`\`\`

**PDF Split:**

\`\`\`python
import PyPDF2

def split_pdf(input_path, output_dir):
    """Split PDF into separate pages"""
    import os
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    with open(input_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        for page_num in range(len(pdf_reader.pages)):
            pdf_writer = PyPDF2.PdfWriter()
            pdf_writer.add_page(pdf_reader.pages[page_num])
            
            output_path = os.path.join(output_dir, f'page_{page_num + 1}.pdf')
            with open(output_path, 'wb') as output_file:
                pdf_writer.write(output_file)
        
        print(f'Split into {len(pdf_reader.pages)} files')

# Usage
split_pdf('document.pdf', 'pages/')
\`\`\`

**Extraction of specific pages:**

\`\`\`python
import PyPDF2

def extract_pages(input_path, output_path, page_numbers):
    """Extract specific pages from PDF"""
    with open(input_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        pdf_writer = PyPDF2.PdfWriter()
        
        for page_num in page_numbers:
            if 0 <= page_num < len(pdf_reader.pages):
                pdf_writer.add_page(pdf_reader.pages[page_num])
        
        with open(output_path, 'wb') as output_file:
            pdf_writer.write(output_file)
        
        print(f'Extracted {len(page_numbers)} pages')

# Usage
extract_pages('document.pdf', 'extracted.pdf', [0, 2, 4])
\`\`\`

**Turn pages:**

\`\`\`python
import PyPDF2

def rotate_pages(input_path, output_path, page_numbers, rotation):
    """Return PDF pages"""
    # rotation: 90, 180, 270 (degrees clockwise)
    with open(input_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        pdf_writer = PyPDF2.PdfWriter()
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            
            if page_num in page_numbers:
                page.rotate(rotation)
            
            pdf_writer.add_page(page)
        
        with open(output_path, 'wb') as output_file:
            pdf_writer.write(output_file)

# Usage
rotate_pages('document.pdf', 'rotated.pdf', [0, 1], 90)
\`\`\``
      },
      {
        title: "Creating PDF with reportlab",
        content: `**Simple PDF document:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4

# Create PDF
c = canvas.Canvas('simple.pdf', pagesize=letter)

# Add text
c.drawString(100, 750, "Hi, this is my first PDF!")
c.drawString(100, 730, "This is the second line of text.")

# Save the PDF
c.save()
\`\`\`

**Text formatting:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch

c = canvas.Canvas('formatted.pdf', pagesize=A4)

# Font size and style
c.setFont("Helvetica", 16)
c.drawString(100, 750, "Title")

c.setFont("Helvetica", 12)
c.drawString(100, 720, "Plain text")

# Colors
c.setFillColorRGB(1, 0, 0) # Red
c.drawString(100, 690, "Red Text")

c.setFillColorRGB(0, 0, 1) # Blue
c.drawString(100, 660, "Blue Text")

# Return to black
c.setFillColorRGB(0, 0, 0)
c.drawString(100, 630, "Black Text")

c.save()
\`\`\`

**Multi-page document:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

c = canvas.Canvas('multipage.pdf', pagesize=A4)

# First page
c.drawString(100, 750, "Page 1")
c.drawString(100, 730, "This is the first page of the document.")

# Second page
c.showPage()
c.drawString(100, 750, "Page 2")
c.drawString(100, 730, "This is the second page of the document.")

# Third page
c.showPage()
c.drawString(100, 750, "Page 3")
c.drawString(100, 730, "This is the third page of the document.")

c.save()
\`\`\`

**Adding lines and shapes:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

c = canvas.Canvas('shapes.pdf', pagesize=A4)

# Line
c.line(100, 750, 500, 750)

# Rectangle
c.rect(100, 700, 200, 50)

# Circle
c.circle(300, 500, 50)

# Filled rectangle
c.setFillColorRGB(0.8, 0.8, 0.8)
c.rect(100, 400, 200, 50, fill=1)

c.save()
\`\`\``
      },
      {
        title: "Advanced capabilities of reportlab",
        content: `**Adding images:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

c = canvas.Canvas('with_image.pdf', pagesize=A4)

# Add image
# drawImage(image_path, x, y, width, height)
c.drawImage('photo.jpg', 100, 600, width=200, height=150)

# Add text
c.drawString(100, 580, "Image added to PDF")

c.save()
\`\`\`

**Tables from reportlab:**

\`\`\`python
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

# Create a document
doc = SimpleDocTemplate('table.pdf', pagesize=A4)
story = []

# Data for the table
data = [
    ['Name', 'Price', 'Quantity'],
    ['Product 1', '100 UAH', '5'],
    ['Product 2', '200 UAH', '3'],
    ['Product 3', '150 UAH', '7'],
]

# Create a table
table = Table(data)

# Table style
style = TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 14),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ('GRID', (0, 0), (-1, -1), 1, colors.black)
])

table.setStyle(style)
story.append(table)

# Save
doc.build(story)
\`\`\`

**Paragraphs and Styles:**

\`\`\`python
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate('paragraphs.pdf', pagesize=A4)
story = []
styles = getSampleStyleSheet()

# Header
title = Paragraph("Document title", styles['Title'])
story.append(title)
story.append(Spacer(1, 12))

# Subtitle
heading = Paragraph("Subheading", styles['Heading1'])
story.append(heading)
story.append(Spacer(1, 12))

# Plain text
text = Paragraph("This is normal paragraph text. It can contain <b>bold</b> and <i>italic</i> text.", styles['Normal'])
story.append(text)

doc.build(story)
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Creating a report from data**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def create_report(data, output_path):
    """Create PDF report from data"""
    c = canvas.Canvas(output_path, pagesize=A4)
    
    y_position = 750
    
    # Header
    c.setFont("Helvetica-Bold", 20)
    c.drawString(100, y_position, "Sales Report")
    y_position -= 30
    
    # Data
    c.setFont("Helvetica", 12)
    for item in data:
        c.drawString(100, y_position, f"{item['name']}: {item['value']} UAH")
        y_position -= 20
        
        if y_position < 50: # New page
            c.showPage()
            y_position = 750
    
    c.save()

# Usage
data = [
    {'name': 'Product 1', 'value': 1000},
    {'name': 'Product 2', 'value': 2000},
    {'name': 'Product 3', 'value': 1500},
]
create_report(data, 'sales_report.pdf')
\`\`\`

**Example 2: Combining reports**

\`\`\`python
import PyPDF2
import os

def merge_reports(report_dir, output_path):
    """Merge all PDF reports from directory"""
    pdf_files = [f for f in os.listdir(report_dir) if f.endswith('.pdf')]
    pdf_files.sort()
    
    pdf_merger = PyPDF2.PdfMerger()
    
    for pdf_file in pdf_files:
        pdf_path = os.path.join(report_dir, pdf_file)
        with open(pdf_path, 'rb') as file:
            pdf_merger.append(file)
    
    with open(output_path, 'wb') as output_file:
        pdf_merger.write(output_file)
    
    print(f'Combined {len(pdf_files)} reports')

# Usage
merge_reports('reports/', 'all_reports.pdf')
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we learned how to work with PDF files:

**Key Libraries:**

1. **PyPDF2** - PDF reading and manipulation
2. **reportlab** - creation of new PDF documents

**Basic operations:**

- Reading text from PDF
- Merge multiple PDFs
- Split PDF into pages
- Creation of new PDF documents
- Adding text, images, tables
- Formatting of documents

**Important:**

- PyPDF2 works with existing PDFs
- reportlab creates new PDFs from scratch
- Always use 'rb' mode to read PDF
- Use context managers (with) to work with files

**Next step:**

In the next lesson, we will learn how to work with Excel files using openpyxl.

**Note:** If you are already familiar with the material on working with PDFs, you can immediately proceed to the test.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Reading a PDF",
      code: `import PyPDF2

with open('document.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    page = pdf_reader.pages[0]
    text = page.extract_text()
    print(text)`,
      explanation: "Open the PDF file and read the text from the first page."
    },
    {
      title: "Example 2: Merge PDF",
      code: `import PyPDF2

pdf_merger = PyPDF2.PdfMerger()
for pdf_file in ['file1.pdf', 'file2.pdf']:
    with open(pdf_file, 'rb') as file:
        pdf_merger.append(file)

with open('merged.pdf', 'wb') as output:
    pdf_merger.write(output)`,
      explanation: "Combine several PDF files into one."
    },
    {
      title: "Example 3: Creating a PDF",
      code: `from reportlab.pdfgen import canvas

c = canvas.Canvas('document.pdf')
c.drawString(100, 750, "Hello world!")
c.save()`,
      explanation: "We create a simple PDF document with text."
    },
    {
      title: "Example 4: Table in PDF",
      code: `from reportlab.platypus import SimpleDocTemplate, Table
from reportlab.lib import colors

doc = SimpleDocTemplate('table.pdf')
data = [['Name', 'Price'], ['Product', '100 UAH']]
table = Table(data)
doc.build([table])`,
      explanation: "We create a PDF with a table."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not use 'rb' mode to read PDF",
      explanation: "PDF files are binary, so 'rb' mode is required.",
      correctApproach: "Always use 'rb' for reading: open('file.pdf', 'rb')."
    },
    {
      mistake: "Forgetting to close files",
      explanation: "Unclosed files can cause memory problems.",
      correctApproach: "Use context managers: with open('file.pdf', 'rb') as file:."
    },
    {
      mistake: "Do not check the number of pages",
      explanation: "Attempting to access a non-existent page will result in an error.",
      correctApproach: "Check the number of pages: if page_num < len(pdf_reader.pages)."
    },
    {
      mistake: "Do not save PDF after creation",
      explanation: "reportlab does not save the PDF automatically, you need to call save().",
      correctApproach: "Always call c.save() after creating the PDF."
    }
  ],
  
  summary: `In this lesson, we learned how to work with PDF:

1. PyPDF2 - reading and manipulation of PDF
2. reportlab - creation of new PDF documents
3. Reading text - extract_text()
4. Combining PDF - PdfMerger
5. Creation of PDF - canvas and platypus
6. Tables and formatting - styles and tables

PDF - the standard format for documents!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What file mode do I need to read PDF?",
        options: [
          "'rb' (read binary)",
          "'r' (read text)",
          "'wb' (write binary)",
          "'w' (write text)"
        ],
        correctAnswer: 0,
        explanation: "PDF files are binary, so 'rb' mode is required to read them."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What library is used to create new PDF documents?",
        options: [
          "reportlab",
          "PyPDF2",
          "pdfplumber",
          "pdfkit"
        ],
        correctAnswer: 0,
        explanation: "reportlab is used to create new PDF documents from scratch."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to get text from a PDF page in PyPDF2?",
        options: [
          "page.extract_text()",
          "page.get_text()",
          "page.read_text()",
          "page.text()"
        ],
        correctAnswer: 0,
        explanation: "The extract_text() method extracts text from a PDF page."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should be called after creating a PDF in reportlab?",
        options: [
          "c.save()",
          "c.close()",
          "c.finish()",
          "c.write()"
        ],
        correctAnswer: 0,
        explanation: "The save() method saves the PDF document to disk."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "PyPDF2 can create new PDF documents from scratch.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. PyPDF2 works with existing PDFs. Use reportlab to create new PDFs."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


