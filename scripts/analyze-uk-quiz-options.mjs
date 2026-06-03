import fs from 'fs';
import path from 'path';

const ukDir = 'src/lib/robloxLessonContent/uk';
for (let m = 1; m <= 12; m++) {
  const f = path.join(ukDir, `module${String(m).padStart(2, '0')}-lessons.js`);
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  let eng = 0;
  for (const line of lines) {
    const m2 = line.match(/^\s+"([^"]+)",?\s*$/);
    if (!m2) continue;
    const s = m2[1];
    if (!/[\u0400-\u04FF]/.test(s) && /[A-Za-z]/.test(s)) eng++;
  }
  console.log(`module${String(m).padStart(2, '0')}: ${eng} english-only strings`);
}
