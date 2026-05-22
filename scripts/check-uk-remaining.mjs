import fs from 'fs'

const stems = process.argv.slice(2)
const re = /[\u0400-\u04FF][\u0400-\u04FF\s'",.:;!?()\-—–]+/g
const set = new Set()

for (const s of stems) {
  const t = fs.readFileSync(`src/lib/lessonContent/en/${s}.js`, 'utf8')
  for (const m of t.match(re) || []) set.add(m.trim())
}

console.log('remaining phrases:', set.size)
for (const x of [...set].sort().slice(0, 50)) console.log(JSON.stringify(x))
