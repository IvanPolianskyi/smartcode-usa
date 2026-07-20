/**
 * Safe cleanup: remove meta blocks analogous to lesson 1.1,
 * without rebuilding section arrays (preserves all sections).
 */
const fs = require("fs");
const path = require("path");

const dir = path.join("src", "lib", "robloxLessonContent", "uk");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("module") && f.endsWith("-lessons.js"))
  .sort();

function clean(src) {
  let out = src;
  let hits = 0;

  function rep(re, label) {
    const before = out;
    out = out.replace(re, "");
    if (out !== before) {
      hits++;
      console.log(" ", label);
    }
  }

  // Drop entire theory sections by title (exact patterns from 1.1 cleanup)
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Play-тест, імена й гігієна перед здачею",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Play-тест hygiene sections",
  );
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Погляд уперед:[^"]*",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Погляд уперед sections",
  );
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Погляд у [^"]*",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Погляд у X sections",
  );
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Погляд на [^"]*",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Погляд на X sections",
  );
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Місток:[^"]*",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Місток: sections",
  );
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Місток до [^"]*",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Місток до sections",
  );
  rep(
    /\r?\n\s*\{\s*\r?\n\s*title: "Підготовка до [^"]*",\s*\r?\n\s*content: `[\s\S]*?`\s*,?\s*\r?\n\s*\},?/g,
    "drop Підготовка до sections",
  );

  // Inline blocks inside content (colon inside bold **text:**)
  rep(
    /\r?\n\r?\n\*\*Що здаємо[^*]*:\*\*\r?\n(?:[-*][^\r\n]*\r?\n|  [^\r\n]*\r?\n)*/g,
    "trim Що здаємо lists",
  );
  rep(
    /\r?\n\r?\n\*\*Де (цей урок|у спіралі)[^*]*:\*\*[^\r\n]*/g,
    "trim spiral lines",
  );
  rep(
    /\r?\n\r?\nКод сьогодні майже не пишемо[^\r\n]*/g,
    "trim lua foreshadow lines",
  );
  rep(
    /\r?\n\r?\n### Погляд уперед:[^\r\n]*\r?\n[\s\S]*?(?=\r?\n\r?\n### )/g,
    "trim ### Погляд уперед subsections",
  );
  rep(
    /\r?\n\r?\n\*\*Що викладач дивиться[^*]*:\*\*\r?\n(?:\d+\.[^\r\n]*\r?\n)*/g,
    "trim teacher look lists",
  );
  rep(
    /\r?\n\r?\n\*\*Що викладач дивиться першим:\*\*[^\r\n]*/g,
    "trim teacher look one-liners",
  );
  rep(
    /\r?\n\r?\n\*\*Зв[\u2019']язок з кінцем модуля:\*\*[^\r\n]*/g,
    "trim module-end links",
  );
  rep(
    /\r?\n\r?\n\*\*Що свідомо відкладаємо[^*]*:\*\*\r?\n(?:[-*][^\r\n]*\r?\n)*/g,
    "trim defer lists",
  );
  rep(/\r?\n\r?\n\*\*Спіраль:\*\*[^\r\n]*/g, "trim Спіраль lines");
  rep(/\r?\n\r?\n\*\*Спіраль важких тем:\*\*[^\r\n]*/g, "trim Спіраль важких");
  rep(
    /\r?\n\r?\n\*\*Чого сьогодні немає[^*]*:\*\*[^\r\n]*/g,
    "trim чого немає lines",
  );

  // Rename titles that still mention lookahead
  out = out.replace(
    /title: "([^"]*?), збереження й погляд уперед \(Lua\)"/g,
    'title: "$1 і збереження"',
  );
  out = out.replace(
    /title: "([^"]*?) й погляд уперед \(Lua\)"/g,
    'title: "$1"',
  );

  out = out.replace(/,(\s*),+/g, ",$1");
  out = out.replace(/,(\s*)\]/g, "$1]");
  out = out.replace(/(?:\r?\n){4,}/g, "\n\n\n");

  return { out, hits };
}

for (const file of files) {
  const fp = path.join(dir, file);
  const src = fs.readFileSync(fp, "utf8");
  console.log(file);
  const { out, hits } = clean(src);
  fs.writeFileSync(fp, out, "utf8");
  const missions = (out.match(/Сьогоднішня місія/g) || []).length;
  console.log("  hits:", hits, "missions:", missions);
}
