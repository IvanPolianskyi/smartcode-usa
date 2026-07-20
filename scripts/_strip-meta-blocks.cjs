/**
 * Safe in-place strip of meta blocks from UK Roblox lessons.
 * Does NOT rebuild section arrays (avoids dropping unmatched sections).
 */
const fs = require("fs");
const path = require("path");

const dir = path.join("src", "lib", "robloxLessonContent", "uk");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("module") && f.endsWith("-lessons.js"))
  .sort();

function stripFullSections(src) {
  // Remove entire section objects whose title matches drop patterns
  const dropTitle =
    /погляд уперед|погляд у |погляд на |імена й гігієна|гігієна перед здачею|^підготовка до|^міст/i;

  const re =
    /(\r?\n)\s*\{\s*\r?\n\s*title:\s*"([^"]+)"\s*,\s*\r?\n\s*content:\s*`([\s\S]*?)(?<!\\)`\s*,?\s*\r?\n\s*\},?/g;

  let dropped = 0;
  const out = src.replace(re, (full, nl, title, content) => {
    if (dropTitle.test(title)) {
      dropped++;
      return "";
    }
    return full;
  });

  // Clean double commas / trailing commas before ]
  let cleaned = out
    .replace(/,(\s*),+/g, ",$1")
    .replace(/,(\s*)\]/g, "$1]");

  return { src: cleaned, dropped };
}

function stripInline(src) {
  let out = src;
  let trimmed = 0;
  const before = out;

  const reps = [
    // Bold headers with colon INSIDE **...:**
    /(?:\r?\n)+\*\*Що здаємо[^*]*:\*\*\r?\n(?:[^\r\n`][^\r\n]*\r?\n)*/gu,
    /(?:\r?\n)+\*\*Артефакт:\*\*\r?\n(?:[^\r\n`][^\r\n]*\r?\n)*/gu,
    /(?:\r?\n)+\*\*Артефакт здачі:\*\*\r?\n(?:[-\d*][^\r\n]*\r?\n)*/gu,
    /(?:\r?\n)+\*\*Артефакт:\*\*[^\r\n]*/gu,
    /(?:\r?\n)+Артефакт:[^\r\n]*/gu,
    /(?:\r?\n)+Артефакт уроку:\r?\n(?:\d+\.[^\r\n]*\r?\n)+/gu,
    /(?:\r?\n)+\*\*Де (цей урок|у спіралі)[^*]*:\*\*[^\r\n]*/gu,
    /(?:\r?\n)+\*\*Спіраль:\*\*[^\r\n]*/gu,
    /(?:\r?\n)+\*\*Спіраль важких тем:\*\*[^\r\n]*/gu,
    /(?:\r?\n)+Код сьогодні майже не пишемо[^\r\n]*/gu,
    /(?:\r?\n)+### Погляд уперед:[\s\S]*?(?=(?:\r?\n)+### |(?:\r?\n)+\*\*Зроби зараз|$)/gu,
    /(?:\r?\n)+\*\*Що викладач дивиться[^*]*:\*\*\r?\n(?:\d+\.[^\r\n]*\r?\n)*/gu,
    /(?:\r?\n)+\*\*Що викладач дивиться першим:\*\*[^\r\n]*/gu,
    /(?:\r?\n)+\*\*Зв[\u2019']язок з кінцем модуля:\*\*[^\r\n]*/gu,
    /(?:\r?\n)+Наступний урок[^\r\n]*/gu,
    /(?:\r?\n)+\*\*Що свідомо відкладаємо[^*]*:\*\*\r?\n(?:[^\r\n*][^\r\n]*\r?\n)*/gu,
    /(?:\r?\n)+\*\*Чого сьогодні немає[^*]*:\*\*[^\r\n]*/gu,
  ];

  for (const re of reps) {
    const prev = out;
    out = out.replace(re, "");
    if (out !== prev) trimmed++;
  }

  out = out.replace(/(?:\r?\n){3,}/g, "\n\n");
  return { src: out, trimmed };
}

let totalDropped = 0;
let totalTrimmed = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, "utf8");

  const a = stripFullSections(src);
  src = a.src;
  const b = stripInline(src);
  src = b.src;

  fs.writeFileSync(fp, src, "utf8");
  console.log(file, "dropped sections:", a.dropped, "trim hits:", b.trimmed);
  totalDropped += a.dropped;
  totalTrimmed += b.trimmed;
}

console.log("TOTAL dropped:", totalDropped, "trim hits:", totalTrimmed);
