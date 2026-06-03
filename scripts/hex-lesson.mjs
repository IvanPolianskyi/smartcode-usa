import fs from 'fs'

const c = fs.readFileSync('src/lib/lessonContent/lesson-00-1.js', 'utf8')
const re = /print\("([^"]+)"\)/g
let m
while ((m = re.exec(c)) !== null) {
  console.log(m[1], [...m[1]].map((ch) => ch.codePointAt(0).toString(16)).join(' '))
}
