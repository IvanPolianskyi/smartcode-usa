import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function normalizeLine(line) {
  return String(line ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function splitOutputLines(text) {
  return String(text ?? '').trimEnd().replace(/\r\n/g, '\n').split('\n');
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

function checkPracticeOutput(output, practiceTask) {
  if (!practiceTask?.examples?.length && !practiceTask?.validation) return { isCorrect: null, errors: [] };

  const actualLines = splitOutputLines(output).map(l => l.trimEnd());
  const validation = practiceTask.validation;

  if (validation?.lineRules?.length) {
    const minLines = validation.minLines ?? validation.lineRules.length;
    const nonEmptyLines = actualLines.filter(line => normalizeLine(line).length > 0);
    if (nonEmptyLines.length < minLines) return { isCorrect: false, errors: [999] };
    if (validation.exactLineCount && nonEmptyLines.length !== validation.lineRules.length) return { isCorrect: false, errors: [999] };
    return validateWithLineRules(nonEmptyLines.slice(0, validation.lineRules.length), validation.lineRules);
  }

  if (practiceTask.examples?.length > 0) {
    const expectedOutput = practiceTask.examples[0].output;
    const expectedLines = splitOutputLines(expectedOutput).map(l => l.trimEnd());
    return validateExactExample(actualLines, expectedLines);
  }
  
  return { isCorrect: null, errors: [] };
}

async function runTest() {
  const dirs = ['src/lib/lessonContent', 'src/lib/lessonContent/en'];
  let failedCount = 0;

  for (const contentDir of dirs) {
    if (!fs.existsSync(contentDir)) continue;
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.js'));
    
    for (const file of files) {
      const fullPath = path.join(contentDir, file);
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/import\s+.*from\s+['"].*['"];?/g, "const QUIZ_QUESTION_TYPES = new Proxy({}, { get: () => 'mock' });");
      
      const tmpFile = path.join(process.cwd(), `tmp_${file}`);
      fs.writeFileSync(tmpFile, content);

      try {
        const module = await import('file://' + tmpFile);
        const lessonObj = Object.values(module)[0];
        
        if (lessonObj && lessonObj.practiceTask && lessonObj.practiceTask.solution && lessonObj.practiceTask.solution.code) {
          const code = lessonObj.practiceTask.solution.code;
          const pyTmpFile = path.join(process.cwd(), 'tmp_test_sol.py');
          fs.writeFileSync(pyTmpFile, code);

          try {
            const output = execSync(`python "${pyTmpFile}"`, { encoding: 'utf-8', stdio: 'pipe' });
            const result = checkPracticeOutput(output, lessonObj.practiceTask);
            
            if (result.isCorrect === false) {
                console.log(`❌ FAILED: ${lessonObj.lessonId} (${fullPath})`);
                console.log(`--- Output ---\n${output.trim()}`);
                console.log(`--- Expected ---\n${lessonObj.practiceTask.examples?.[0]?.output || 'Line Rules'}`);
                console.log(`-----------------------------------`);
                failedCount++;
            }
          } catch (err) {
            console.log(`💥 ERROR in ${lessonObj.lessonId} (${fullPath}):\n${err.message}`);
            failedCount++;
          } finally {
            if (fs.existsSync(pyTmpFile)) fs.unlinkSync(pyTmpFile);
          }
        }
      } catch (err) {
        // ignore
      } finally {
        if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      }
    }
  }

  console.log(`\nFinished. Failed: ${failedCount}`);
}

runTest().catch(console.error);
