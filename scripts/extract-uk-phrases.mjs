import fs from 'fs'

const stems = process.argv.slice(2)
const re = /[\u0400-\u04FF][\u0400-\u04FF\s'",.:;!?()\-—–\d]+/g
const counts = new Map()

for (const s of stems) {
  const t = fs.readFileSync(`src/lib/lessonContent/${s}.js`, 'utf8')
  for (const m of t.match(re) || []) {
    const k = m.trim()
    counts.set(k, (counts.get(k) || 0) + 1)
  }
}

const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])
fs.writeFileSync('scripts/uk-phrases-extract.json', JSON.stringify(sorted.map(([p, c]) => ({ p, c })), null, 2))
console.log('Extracted', sorted.length, 'phrases')
