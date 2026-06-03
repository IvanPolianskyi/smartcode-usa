import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'm10-12-quiz-translations.json'), 'utf8'),
);

function translateOptionsBlock(inner) {
  return inner.replace(/"([^"]+)"/g, (full, str) => {
    if (T[str] !== undefined) return `"${T[str]}"`;
    if (!/[\u0400-\u04FF]/.test(str) && /[A-Za-z]/.test(str)) {
      console.warn('Missing translation:', str);
    }
    return full;
  });
}

for (const m of [10, 11, 12]) {
  const file = path.join(
    __dirname,
    '../src/lib/robloxLessonContent/uk',
    `module${String(m).padStart(2, '0')}-lessons.js`,
  );
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/options:\s*\[([\s\S]*?)\]/g, (match, inner) => {
    return `options: [${translateOptionsBlock(inner)}]`;
  });
  fs.writeFileSync(file, content);
  console.log('Updated', file);
}
