/**
 * Fix EN lesson prose: \\\`code\\\` (triple-escaped) → \`code\` inside template strings.
 * Does NOT touch template delimiters (content: `...`).
 * Run: node scripts/fix-python-en-inline-code.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const enDir = path.join(__dirname, '../src/lib/lessonContent/en')

// Three backslashes + backtick in source file (over-escaped markdown inline code)
const TRIPLE = /\\\\\\`([^`\\]+)\\\\\\`/g

let files = 0
let replacements = 0

for (const file of fs.readdirSync(enDir)) {
  if (!/^lesson-.*\.js$/.test(file)) continue
  const fp = path.join(enDir, file)
  const before = fs.readFileSync(fp, 'utf8')
  const matches = before.match(TRIPLE) || []
  if (!matches.length) continue
  const after = before.replace(TRIPLE, '\\`$1\\`')
  fs.writeFileSync(fp, after, 'utf8')
  files++
  replacements += matches.length
  console.log(`${matches.length}  ${file}`)
}

console.log(`Done. ${replacements} fixes in ${files} files.`)
