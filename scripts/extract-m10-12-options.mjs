import fs from 'fs';
import path from 'path';

const set = new Set();
for (const m of [10, 11, 12]) {
  const f = path.join('src/lib/robloxLessonContent/uk', `module${String(m).padStart(2, '0')}-lessons.js`);
  const text = fs.readFileSync(f, 'utf8');
  const re = /options:\s*\[([\s\S]*?)\]/g;
  let match;
  while ((match = re.exec(text))) {
    for (const o of [...match[1].matchAll(/"([^"]+)"/g)]) {
      set.add(o[1]);
    }
  }
}
const sorted = [...set].sort();
console.log('count', sorted.length);
fs.writeFileSync('scripts/m10-12-uk-quiz-options.txt', sorted.join('\n'), 'utf8');
