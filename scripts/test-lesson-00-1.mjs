import { execSync } from 'child_process'
import { checkPracticeOutput } from '../src/lib/practiceValidation.js'

const code = `# my_first_program.py
print("Привіт!")
print("Мене звати Олександр")
print("Я вивчаю Python")
print("До побачення!")`

const output = execSync('python -c ""', { encoding: 'utf-8' }) // noop
import { writeFileSync, unlinkSync } from 'fs'
writeFileSync('tmp_test.py', code)
const out = execSync('python tmp_test.py', { encoding: 'utf-8' })
unlinkSync('tmp_test.py')

const practiceTask = {
  examples: [{ output: `Привіт!
Мене звати Олександр
Я вивчаю Python
До побачення!` }],
  validation: {
    minLines: 4,
    exactLineCount: true,
    lineRules: [
      { pattern: '^(привіт|вітаю|hello|hi)', flags: 'i' },
      { minLength: 3 },
      { pattern: 'python', flags: 'i' },
      { pattern: '(до побачення|бувай|goodbye|bye)', flags: 'i' },
    ],
  },
}

console.log('output:', JSON.stringify(out))
console.log('result:', checkPracticeOutput(out, practiceTask))
