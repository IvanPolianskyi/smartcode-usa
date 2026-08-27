import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function normalizeLine(line) {
  return String(line ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function splitOutputLines(text) {
  return String(text ?? '').trimEnd().replace(/\r\n/g, '\n').split('\n');
}

function parsePracticeStdin(input) {
  if (!input) return '';
  if (Array.isArray(input)) return input.join('\n') + '\n';
  if (typeof input === 'string') {
    const lines = String(input).replace(/\r\n/g, '\n').split('\n');
    while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
    const nonEmpty = lines.filter((line) => line.trim());
    const hasLabeledLines = nonEmpty.some((line) => /^[^:\n]+:\s+\S/.test(line.trim()));
    if (hasLabeledLines) {
      return (
        nonEmpty
          .map((line) => {
            const colonMatch = line.match(/^[^:]+:\s+(.+)$/);
            if (colonMatch) return colonMatch[1].trim();
            return line.trim();
          })
          .join('\n') + '\n'
      );
    }
    return lines.join('\n') + '\n';
  }
  return '';
}

function validateWithLineRules(actualLines, lineRules) {
  const errors = [];
  const normalizedActual = actualLines.map(normalizeLine);

  if (normalizedActual.length < lineRules.length) return { isCorrect: false, errors: [999] };

  for (let i = 0; i < lineRules.length; i++) {
    const rule = lineRules[i];
    const line = normalizedActual[i] || '';

    if (rule.pattern) {
      const pattern = rule.pattern instanceof RegExp ? rule.pattern : new RegExp(rule.pattern, rule.flags || 'i');
      if (!pattern.test(line)) errors.push(i);
      continue;
    }

    if (rule.minLength != null && line.length < rule.minLength) {
      errors.push(i);
      continue;
    }

    if (rule.contains) {
      const needle = normalizeLine(rule.contains);
      if (!line.includes(needle)) errors.push(i);
    }
  }

  return { isCorrect: errors.length === 0, errors };
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

function checkAgainstExample(output, example, validation) {
  const actualLines = splitOutputLines(output).map((l) => l.trimEnd());
  const nonEmptyLines = actualLines.filter((line) => normalizeLine(line).length > 0);

  if (validation?.lineRules?.length) {
    const minLines = validation.minLines ?? validation.lineRules.length;
    if (nonEmptyLines.length < minLines) return { isCorrect: false, errors: [999] };
    if (validation.exactLineCount && nonEmptyLines.length !== validation.lineRules.length) {
      return { isCorrect: false, errors: [999] };
    }
    const lineResult = validateWithLineRules(
      nonEmptyLines.slice(0, validation.lineRules.length),
      validation.lineRules
    );
    if (lineResult.isCorrect) return lineResult;
    if (example?.output) {
      const expectedLines = splitOutputLines(example.output).map((l) => l.trimEnd());
      const exact = validateExactExample(nonEmptyLines, expectedLines);
      if (exact.isCorrect) return exact;
    }
    return lineResult;
  }

  if (!example?.output && example?.output !== '') return { isCorrect: false, errors: [999] };
  const expectedLines = splitOutputLines(example.output)
    .map((l) => l.trimEnd())
    .filter((line) => normalizeLine(line).length > 0);
  return validateExactExample(nonEmptyLines, expectedLines);
}

function runPython(code, stdin) {
  const pyTmpFile = path.join(root, 'tmp_test_sol.py');
  fs.writeFileSync(pyTmpFile, code);
  try {
    return execFileSync('python', [pyTmpFile], {
      encoding: 'utf-8',
      input: stdin || '',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 15000,
    });
  } finally {
    if (fs.existsSync(pyTmpFile)) fs.unlinkSync(pyTmpFile);
  }
}

async function runTest() {
  // EN content only (UK root lessonContent/*.js removed in the platform pivot).
  const dirs = ['src/lib/lessonContent/en'];
  let failedCount = 0;
  let checkedCount = 0;
  let exampleCount = 0;

  for (const contentDir of dirs) {
    const absDir = path.join(root, contentDir);
    if (!fs.existsSync(absDir)) continue;
    const files = fs.readdirSync(absDir).filter((f) => f.endsWith('.js'));

    for (const file of files) {
      const fullPath = path.join(absDir, file);
      let content = fs.readFileSync(fullPath, 'utf8');

      content = content.replace(
        /import\s+.*from\s+['"].*['"];?/g,
        "const QUIZ_QUESTION_TYPES = new Proxy({}, { get: () => 'mock' });"
      );

      const tmpFile = path.join(root, `tmp_${file}`);
      fs.writeFileSync(tmpFile, content);

      try {
        const module = await import('file://' + tmpFile + '?t=' + Date.now());
        const lessonObj = Object.values(module)[0];

        if (
          lessonObj &&
          lessonObj.practiceTask &&
          lessonObj.practiceTask.solution &&
          lessonObj.practiceTask.solution.code
        ) {
          const code = lessonObj.practiceTask.solution.code;
          const examples = lessonObj.practiceTask.examples || [];
          const validation = lessonObj.practiceTask.validation;

          if (!examples.length && !validation?.lineRules?.length) {
            console.log(`⚠️  SKIP (no examples): ${lessonObj.lessonId} (${fullPath})`);
            continue;
          }

          checkedCount++;
          const cases = examples.length ? examples : [{ output: '' }];

          for (let i = 0; i < cases.length; i++) {
            const example = cases[i];
            exampleCount++;
            try {
              const stdin = parsePracticeStdin(example.input);
              const output = runPython(code, stdin);
              const result = checkAgainstExample(output, example, validation);

              if (result.isCorrect === false) {
                console.log(
                  `❌ FAILED: ${lessonObj.lessonId} example[${i}] (${fullPath})`
                );
                console.log(`--- Output ---\n${String(output).trim()}`);
                console.log(`--- Expected ---\n${example.output || 'Line Rules'}`);
                console.log(`-----------------------------------`);
                failedCount++;
                break;
              }
            } catch (err) {
              console.log(
                `💥 ERROR in ${lessonObj.lessonId} example[${i}] (${fullPath}):\n${err.message}`
              );
              failedCount++;
              break;
            }
          }
        }
      } catch (err) {
        console.log(`💥 LOAD ERROR ${fullPath}: ${err.message}`);
        failedCount++;
      } finally {
        if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      }
    }
  }

  console.log(
    `\nChecked ${checkedCount} practice solutions (${exampleCount} examples). Failed: ${failedCount}`
  );
  process.exit(failedCount > 0 ? 1 : 0);
}

runTest();
