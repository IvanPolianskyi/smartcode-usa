/**
 * Insert missing closing backticks before theory section ends.
 * Only matches real section terminators: " }," followed by " {" or " ]"
 * — never bare "}" inside Lua/markdown examples.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const dir = path.join("src", "lib", "robloxLessonContent", "uk");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("module") && f.endsWith("-lessons.js"))
  .sort();

function repairClean(src) {
  const marker = "content: `";
  let out = "";
  let i = 0;
  let fixes = 0;

  while (i < src.length) {
    const idx = src.indexOf(marker, i);
    if (idx < 0) {
      out += src.slice(i);
      break;
    }

    out += src.slice(i, idx + marker.length);
    let j = idx + marker.length;

    while (j < src.length) {
      const ch = src[j];
      if (ch === "\\") {
        j += 2;
        continue;
      }
      if (ch === "`") {
        out += src.slice(idx + marker.length, j + 1);
        i = j + 1;
        break;
      }

      if (ch === "\r" || ch === "\n") {
        // Real section end: \n },\n {  OR  \n },\n ]
        const m = src
          .slice(j)
          .match(/^(\r?\n)([ \t]*\},)(\r?\n)([ \t]*\{|[ \t]*\])/);
        if (m) {
          out += src.slice(idx + marker.length, j) + "`";
          fixes++;
          i = j;
          break;
        }
      }
      j += 1;

      if (j >= src.length) {
        out += src.slice(idx + marker.length) + "`";
        fixes++;
        i = src.length;
        break;
      }
    }
  }

  return { out, fixes };
}

for (const file of files) {
  const fp = path.join(dir, file);
  const src = fs.readFileSync(fp, "utf8");
  const { out, fixes } = repairClean(src);
  if (fixes > 0) fs.writeFileSync(fp, out, "utf8");
  console.log(file, "fixes:", fixes);
}

// Build-style parse: use node's module compile after stripping import
for (const file of files) {
  const fp = path.join(dir, file);
  const s = fs.readFileSync(fp, "utf8");
  const w =
    "const QUIZ_QUESTION_TYPES={MULTIPLE_CHOICE:'MC'};\n" +
    s.replace(/import\s*\{[^}]+\}\s*from\s*[^;\n]+;?/, "");
  const t = "scripts/_chk_tmp.js";
  fs.writeFileSync(t, w);
  const r = spawnSync("node", ["--check", t], { encoding: "utf8" });
  if (r.status !== 0) {
    console.log(file, "FAIL", (r.stderr || "").split("\n")[0]);
  }
  fs.unlinkSync(t);
}
console.log("node --check done");
