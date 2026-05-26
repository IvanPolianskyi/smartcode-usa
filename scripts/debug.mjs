import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function normalizeLine(line) {
  return String(line ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function splitOutputLines(text) {
  return String(text ?? '').trimEnd().replace(/\r\n/g, '\n').split('\n');
}

function validateExactExample(actualLines, expectedLines) {
  const errors = [];
  const maxLines = Math.max(expectedLines.length, actualLines.length);
  if (actualLines.length !== expectedLines.length) return { isCorrect: false, errors: [999] };
  for (let i = 0; i < maxLines; i++) {
    if (normalizeLine(expectedLines[i] || '') !== normalizeLine(actualLines[i] || '')) errors.push(i);
  }
  return { isCorrect: errors.length === 0, errors };
}

function checkPracticeOutput(output, practiceTask) {
  const actualLines = splitOutputLines(output).map(l => l.trimEnd());
  const expectedOutput = practiceTask.examples[0].output;
  const expectedLines = splitOutputLines(expectedOutput).map(l => l.trimEnd());
  console.log('check length:', actualLines.length, expectedLines.length);
  return validateExactExample(actualLines, expectedLines);
}

async function debugLesson() {
  const contentDir = 'src/lib/lessonContent';
  const file = 'lesson-04-7.js';
  
  const fullPath = path.join(contentDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(/import\s+.*from\s+['"].*['"];?/g, "const QUIZ_QUESTION_TYPES = new Proxy({}, { get: () => 'mock' });");
  const tmpFile = path.join(process.cwd(), `tmp_${file}`);
  fs.writeFileSync(tmpFile, content);

  try {
    const module = await import('file://' + tmpFile);
    const lessonObj = Object.values(module)[0];
    
    const code = lessonObj.practiceTask.solution.code;
    const pyTmpFile = path.join(process.cwd(), 'tmp_test_sol.py');
    fs.writeFileSync(pyTmpFile, code);

    const output = execSync(`python "${pyTmpFile}"`, { encoding: 'utf-8', stdio: 'pipe' });
    const result = checkPracticeOutput(output, lessonObj.practiceTask);
    console.log(result);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    if (fs.existsSync('tmp_test_sol.py')) fs.unlinkSync('tmp_test_sol.py');
  }
}

debugLesson().catch(console.error);
