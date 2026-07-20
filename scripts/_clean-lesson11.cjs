const fs = require("fs");
const fp = "src/lib/robloxLessonContent/uk/module01-lessons.js";
let src = fs.readFileSync(fp, "utf8");

const start = src.indexOf("export const ukLesson11 =");
const end = src.indexOf("export const ukLesson12 =");
if (start < 0 || end < 0) {
  console.error("bounds not found");
  process.exit(1);
}

let lesson = src.slice(start, end);

// --- 1. Mission: remove artifact / spiral / lua foreshadow, keep closing backtick ---
lesson = lesson.replace(
  /(\*\*Як працювати з уроком:\*\*[\s\S]*?кнопки 1–4 знову «забудуться»\.)\r?\n\r?\n\*\*Що здаємо сьогодні[\s\S]*?«страшною зоною»\./,
  "$1",
);

// --- 2. Rename Model section + remove Lua lookahead subsection ---
lesson = lesson.replace(
  'title: "Model House_01, збереження й погляд уперед (Lua)"',
  'title: "Model House_01 і збереження"',
);
lesson = lesson.replace(
  /\r?\n\r?\n### Погляд уперед: два міні-фрагменти Lua\r?\n[\s\S]*?(?=\r?\n\r?\n### Чекліст перед практикою)/,
  "",
);

// --- 3. Remove entire Play-тест hygiene section (keep surrounding commas valid) ---
lesson = lesson.replace(
  /,?\r?\n\s*\{\s*\r?\n\s*title: "Play-тест, імена й гігієна перед здачею",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\}/,
  "",
);

// --- 4. Rubric: keep table only, drop teacher-look / next-lesson / module-link ---
lesson = lesson.replace(
  /(\| \*\*Відмінно\*\* \|[^\r\n]+\|)\r?\n\r?\n\*\*Що викладач дивиться[\s\S]*?дублюй перед експериментами\./,
  "$1",
);

// tidy commas before ]
lesson = lesson.replace(/,(\s*)\]/g, "$1]");

src = src.slice(0, start) + lesson + src.slice(end);
fs.writeFileSync(fp, src, "utf8");

// verify removals
const out = src.slice(start, src.indexOf("export const ukLesson12 ="));
const shouldGone = [
  "Що здаємо сьогодні",
  "спіралі курсу",
  "міні-фрагменти Lua",
  "Play-тест, імена й гігієна",
  "Що викладач дивиться за 60",
  "Зв’язок з кінцем модуля",
  "страшною зоною",
];
for (const t of shouldGone) {
  console.log(t + ":", out.includes(t) ? "STILL THERE" : "ok");
}

// syntax check
const wrapped =
  "const QUIZ_QUESTION_TYPES={MULTIPLE_CHOICE:'MC'};\n" +
  fs
    .readFileSync(fp, "utf8")
    .replace(/import\s*\{[^}]+\}\s*from\s*[^;\n]+;?/, "");
const tmp = "scripts/_m1_check.js";
fs.writeFileSync(tmp, wrapped);
const { spawnSync } = require("child_process");
const r = spawnSync("node", ["--check", tmp], { encoding: "utf8" });
console.log(r.status === 0 ? "syntax OK" : "syntax FAIL:\n" + r.stderr);
fs.unlinkSync(tmp);
console.log(
  "missions:",
  (fs.readFileSync(fp, "utf8").match(/Сьогоднішня місія/g) || []).length,
);
