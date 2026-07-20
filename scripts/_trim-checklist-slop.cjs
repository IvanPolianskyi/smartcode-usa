const fs = require("fs");
const path = require("path");

const files = [
  "module07-lessons.js",
  "module08-lessons.js",
  "module09-lessons.js",
  "module10-lessons.js",
  "module11-lessons.js",
  "module12-lessons.js",
];

const NL = String.raw`\r?\n`;

const patterns = [
  new RegExp(`${NL}${NL}Пам\u2019ятай зв\u2019язок уроків:[\\s\\S]*?(?=${NL}${NL}\\*\\*Зроби зараз)`, "u"),
  new RegExp(`${NL}${NL}Ментор за[\\s\\S]*?(?=${NL}${NL}\\*\\*Зроби зараз)`, "u"),
  new RegExp(`${NL}${NL}Це і є LTV[\\s\\S]*?(?=${NL}${NL}\\*\\*Зроби зараз)`, "u"),
  new RegExp(`${NL}${NL}Якщо ментор[\\s\\S]*?(?=${NL}${NL}\\*\\*Зроби зараз)`, "u"),
  new RegExp(`${NL}${NL}Артефакт: \\*\\*[^*]+\\*\\*\\. Кнопка більше не[\\s\\S]*?(?=${NL}${NL}\\*\\*Зроби зараз)`, "u"),
];

let total = 0;
for (const file of files) {
  const fp = path.join("src/lib/robloxLessonContent/uk", file);
  let src = fs.readFileSync(fp, "utf8");
  let n = 0;
  for (const re of patterns) {
    const before = src;
    src = src.replace(re, "");
    if (src !== before) n++;
  }
  // shorten checklist tails before anchor
  src = src.replace(
    new RegExp(`(Save: Lesson [^\\r\\n]+)${NL}${NL}Короткий ритуал здачі:[\\s\\S]*?(?=${NL}${NL}\\*\\*Зроби зараз)`, "gu"),
    "$1",
  );
  fs.writeFileSync(fp, src, "utf8");
  console.log(file, "patterns hit:", n);
  total += n;
}
console.log("done", total);
