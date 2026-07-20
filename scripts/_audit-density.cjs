const fs = require("fs");
const path = require("path");
const dir = "src/lib/robloxLessonContent/uk";
const files = fs.readdirSync(dir).filter((f) => f.startsWith("module") && f.endsWith("-lessons.js"));

for (const file of files.sort()) {
  const src = fs.readFileSync(path.join(dir, file), "utf8");
  const marks = [...src.matchAll(/^export const (\w+) =/gm)];
  for (let n = 0; n < marks.length; n++) {
    const start = marks[n].index;
    const end = n + 1 < marks.length ? marks[n + 1].index : src.length;
    const block = src.slice(start, end);
    const title = (block.match(/title:\s*"([^"]+)"/) || [])[1] || marks[n][1];
    const theory = block.match(/theory:\s*\{[\s\S]*?sections:\s*\[([\s\S]*?)\]\s*,?\s*\}/);
    if (!theory) continue;
    const sections = [...theory[1].matchAll(/content:\s*`([\s\S]*?)(?<!\\)`/g)];
    const anchors = sections.filter((s) => s[1].includes("Зроби зараз")).length;
    const words = sections.reduce((a, s) => a + s[1].replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean).length, 0);
    const gap = sections.length - anchors;
    if (gap > 0 || words < 1000) {
      console.log(`${file} | ${title} | sec=${sections.length} anchors=${anchors} gap=${gap} words=${words}`);
    }
  }
}
