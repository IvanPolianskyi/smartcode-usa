import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { checkPracticeOutput } from '../src/lib/practiceValidation.js'

const fullPath = path.join('src/lib/lessonContent/lesson-00-1.js')
let content = fs.readFileSync(fullPath, 'utf8')
content = content.replace(
  /import\s+.*from\s+['"].*['"];?/g,
  "const QUIZ_QUESTION_TYPES = new Proxy({}, { get: () => 'mock' });"
)
const tmpFile = path.join(process.cwd(), 'tmp_lesson-00-1.js')
fs.writeFileSync(tmpFile, content)

const module = await import('file://' + tmpFile)
const lessonObj = Object.values(module)[0]
const code = lessonObj.practiceTask.solution.code
const pyTmpFile = path.join(process.cwd(), 'tmp_test_sol.py')
fs.writeFileSync(pyTmpFile, code, 'utf8')

const output = execSync(`python "${pyTmpFile}"`, { encoding: 'utf-8', stdio: 'pipe' })
const result = checkPracticeOutput(output, lessonObj.practiceTask)

console.log('result:', result)
console.log('output lines:', output.split('\n').map((l, i) => `${i}: ${JSON.stringify(l)}`))
console.log('validation rules:', lessonObj.practiceTask.validation)

fs.unlinkSync(tmpFile)
fs.unlinkSync(pyTmpFile)
