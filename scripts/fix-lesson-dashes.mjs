import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const roots = [
  path.join(__dirname, '../src/lib/lessonContent'),
  path.join(__dirname, '../src/lib/lessonContent/en'),
]

const DASHES = /[\u2014\u2013\u2015\u2212]/g // — – ― −

function isModule10Plus(name) {
  const m = name.match(/^lesson-(\d+)-/)
  if (!m) return false
  return Number(m[1]) >= 10
}

let totalReplacements = 0
const changed = []

for (const root of roots) {
  for (const name of fs.readdirSync(root)) {
    if (!name.endsWith('.js') || !isModule10Plus(name)) continue
    const filePath = path.join(root, name)
    const text = fs.readFileSync(filePath, 'utf8')
    const count = (text.match(DASHES) || []).length
    if (!count) continue
    const next = text.replace(DASHES, '-')
    fs.writeFileSync(filePath, next, 'utf8')
    totalReplacements += count
    changed.push({ filePath, count })
  }
}

console.log(`Replaced ${totalReplacements} dashes in ${changed.length} files`)
for (const { filePath, count } of changed.sort((a, b) => b.count - a.count)) {
  console.log(`  ${count}\t${path.relative(path.join(__dirname, '..'), filePath)}`)
}
