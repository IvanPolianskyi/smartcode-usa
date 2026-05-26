const fs = require('fs');

function addValidation(filepath, lineRules) {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Only add if not already present
  if (content.includes('validation: {')) return;
  
  const rulesStr = lineRules.map(r => `{ pattern: ${r} }`).join(',\n        ');
  
  const validationObj = `validation: {
      exactLineCount: true,
      lineRules: [
        ${rulesStr}
      ]
    },
    examples`;
    
  content = content.replace('examples', validationObj);
  fs.writeFileSync(filepath, content);
  console.log('Added validation to', filepath);
}

const ukRules = [
  '/=== тест 1: без авторизації ===/',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] викликається get_secret_data/',
  '/потрібна авторизація!/',
  '/результат: none/',
  '/=== тест 2: з авторизацією ===/',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] викликається get_secret_data/',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] get_secret_data завершено/',
  '/результат: секретні дані/',
  '/=== тест 3: публічна функція ===/',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] викликається get_public_data/',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] get_public_data завершено/',
  '/результат: публічні дані/'
];

const enRules = [
  '/=== test 1: without authorization ===/i',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] calling get_secret_data/i',
  '/authorization required!/i',
  '/result: none/i',
  '/=== test 2: with authorization ===/i',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] calling get_secret_data/i',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] get_secret_data completed/i',
  '/result: secret data/i',
  '/=== test 3: public function ===/i',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] calling get_public_data/i',
  '/\\[\\d{2}:\\d{2}:\\d{2}\\] get_public_data completed/i',
  '/result: public data/i'
];

addValidation('src/lib/lessonContent/lesson-06-4.js', ukRules);
addValidation('src/lib/lessonContent/en/lesson-06-4.js', enRules);
