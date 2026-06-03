/**
 * Fix content lines broken by over-aggressive backslash stripping:
 *   content: ``yield from` -> content: `\`yield from\`
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const enDir = path.join(__dirname, '../src/lib/lessonContent/en')

let files = 0
let lines = 0

for (const f of fs.readdirSync(enDir)) {
  if (!/^lesson-.*\.js$/.test(f)) continue
  const fp = path.join(enDir, f)
  let s = fs.readFileSync(fp, 'utf8')
  const re = /content: ``([^`\n]+)`/g
  const next = s.replace(re, (m, ident) => {
    lines++
    return 'content: `\\`' + ident + '\\`'
  })
  if (next !== s) {
    fs.writeFileSync(fp, next)
    files++
    console.log(f, (s.match(re) || []).length)
  }
}

console.log(`fixed ${lines} lines in ${files} files`)
