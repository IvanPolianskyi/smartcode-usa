import fs from 'fs';
import { execSync } from 'child_process';

function fixLesson(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Extract python code from the solution block
  // We look for: solution: { ... code: `...`, ... explanation: "..." }
  const codeMatch = content.match(/solution:\s*\{\s*code:\s*`([\s\S]*?)`,\s*explanation/);
  if (!codeMatch) {
    console.log('Could not find code in', filepath);
    return;
  }
  const pyCode = codeMatch[1];
  fs.writeFileSync('tmp_fix.py', pyCode);
  
  // Run python code
  const output = execSync('python tmp_fix.py', {encoding: 'utf-8'}).replace(/\r\n/g, '\n').trimEnd();
  
  // Replace output string in examples block
  // We look for: examples: [ { output: `...`, explanation
  const replaced = content.replace(/(examples:\s*\[\s*\{\s*output:\s*)`[\s\S]*?`(,\s*explanation)/, (match, p1, p2) => {
    return p1 + '`' + output + '`' + p2;
  });
  
  if (replaced !== content) {
    fs.writeFileSync(filepath, replaced);
    console.log('Fixed', filepath);
  } else {
    console.log('Could not replace output in', filepath);
  }
}

const lessons = [
  '03-3', '03-4', '03-5', '03-6', '03-7', '03-8', '03-9', '08-6', '02-3', '03-10'
];

for (const lesson of lessons) {
  fixLesson(`src/lib/lessonContent/lesson-${lesson}.js`);
  fixLesson(`src/lib/lessonContent/en/lesson-${lesson}.js`);
}

if (fs.existsSync('tmp_fix.py')) fs.unlinkSync('tmp_fix.py');
