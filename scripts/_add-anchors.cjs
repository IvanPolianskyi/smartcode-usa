const fs = require("fs");
const path = require("path");

const targets = [
  { file: "module03-lessons.js", filter: () => true },
  { file: "module07-lessons.js", filter: (id) => /lesson-roblox-7-[3-8]/.test(id) },
  { file: "module08-lessons.js", filter: () => true },
  { file: "module09-lessons.js", filter: () => true },
  { file: "module10-lessons.js", filter: () => true },
  { file: "module11-lessons.js", filter: () => true },
  { file: "module12-lessons.js", filter: () => true },
];

function makeAnchor(title, content, lessonTitle) {
  const t = title.toLowerCase();
  const lt = (lessonTitle || "").toLowerCase();
  const mins =
    t.includes("чекліст") || t.includes("здачі") || t.includes("контрольний")
      ? 3
      : t.includes("play") || t.includes("тест")
        ? 5
        : t.includes("практика")
          ? 8
          : 4;

  if (t.includes("сьогоднішня місія") || t === "сьогоднішня місія")
    return `**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`;
  if (t.includes("чекліст") || t.includes("здачі") || t.includes("контрольний список"))
    return `**Зроби зараз (${mins} хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`;
  if (t.includes("playtest") || t.includes("play-тест") || (t.includes("тест") && content.includes("|")))
    return `**Зроби зараз (${mins} хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`;
  if (t.includes("типов") || t.includes("дірк") || t.includes("помилк") || t.includes("анти"))
    return `**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`;
  if (t.includes("погляд") || t.includes("міст") || t.includes("далі") || t.includes("зв'язок"))
    return `**Зроби зараз (2 хв):** допиши в Note один рядок, що переносиш у наступний урок.`;
  if (t.includes("межа") || t.includes("не сьогодні") || t.includes("що не") || t.includes("поза межами"))
    return `**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`;

  if (content.includes("tryBuy") || content.includes("canAfford"))
    return `**Зроби зараз (4 хв):** спробуй купівлю з 0 монет і після успішної покупки - перевір TAB/Output.`;
  if (content.includes("leaderstats") || content.includes("Coins"))
    return `**Зроби зараз (4 хв):** у Play відкрий TAB і підтверди, що Coins змінюються після дії на сервері.`;
  if (content.includes("RemoteEvent") || content.includes("RemoteFunction") || content.includes("FireServer"))
    return `**Зроби зараз (4 хв):** зроби один Remote-виклик і зафіксуй, хто приймає рішення - клієнт чи сервер.`;
  if (content.includes("Humanoid") || content.includes("dealDamage") || content.includes("Health = 0"))
    return `**Зроби зараз (4 хв):** один удар/hazard у Play - Health має змінитись на сервері, не в LocalScript.`;
  if (content.includes("waveConfig") || (content.includes("while ") && content.includes("Config")))
    return `**Зроби зараз (5 хв):** зміни одне поле в Config/table і підтверди нову поведінку в Play.`;
  if (content.includes("DataStore") || content.includes("GetAsync") || content.includes("SetAsync"))
    return `**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`;
  if (content.includes("ProximityPrompt") || content.includes("Triggered"))
    return `**Зроби зараз (3 хв):** підійди до Prompt у Play і підтверди Triggered один раз.`;
  if (content.includes("ScreenGui") || content.includes("LocalScript") || content.includes("TextLabel"))
    return `**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`;
  if (content.includes("VehicleSeat") || content.includes("кола") || content.includes("checkpoint"))
    return `**Зроби зараз (5 хв):** пройди один сегмент траси/коло і зафіксуй, що лічильник/time оновився.`;
  if (content.includes("Pathfinding") || content.includes("Waypoint"))
    return `**Зроби зараз (5 хв):** запусти NPC на короткий маршрут і перевір, що він не застряг у першій точці.`;
  if (content.includes("Raycast") || content.includes("Tool"))
    return `**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`;
  if (content.includes("TweenService") || content.includes("ParticleEmitter"))
    return `**Зроби зараз (4 хв):** один hit/ефект у Play - feedback має бути коротким і без спаму.`;
  if (content.includes("table") || content.includes("ipairs") || content.includes("Config"))
    return `**Зроби зараз (4 хв):** зміни одне значення в table/Config і підтверди нову поведінку.`;
  if (lt.includes("explorer") || t.includes("аудит"))
    return `**Зроби зараз (4 хв):** перейменуй 3 об'єкти в Explorer за роллю, не за номером Script.`;
  if (lt.includes("loading") || t.includes("loading"))
    return `**Зроби зараз (4 хв):** запусти Play і підтверди, що loading screen зникає після завантаження.`;
  if (lt.includes("оптиміз") || t.includes("fps") || t.includes("ux"))
    return `**Зроби зараз (4 хв):** знайди один зайвий Part/скрипт і прибери або обґрунтуй, чому лишається.`;
  if (lt.includes("пітч") || t.includes("пітч") || t.includes("mvp"))
    return `**Зроби зараз (5 хв):** запиши пітч одним реченням у Attribute або StringValue на Place.`;
  if (lt.includes("core loop") || t.includes("core loop"))
    return `**Зроби зараз (5 хв):** намалюй 5–7 кроків loop і підпиши, що видно на екрані на кожному.`;
  if (lt.includes("table систем") || t.includes("обов'язково") || t.includes("freeze"))
    return `**Зроби зараз (5 хв):** заповни колонку «обов'язково» і перенеси рядки в MVP_Board/Must.`;
  if (lt.includes("teleport") || t.includes("teleport") || t.includes("збірк"))
    return `**Зроби зараз (8 хв):** з'єднай хаб і головну зону телепортом і пройди золотий шлях один раз.`;
  if (lt.includes("тест-план") || t.includes("p0") || t.includes("баг"))
    return `**Зроби зараз (5 хв):** запиши 3 P0-баги з playtest і постав пріоритет фіксу.`;
  if (lt.includes("publish") || t.includes("badge") || t.includes("gamepass"))
    return `**Зроби зараз (5 хв):** відкрий Game Settings → перевір назву, опис і thumbnail перед Publish.`;
  if (lt.includes("портфоліо") || t.includes("портфоліо") || t.includes("showcase"))
    return `**Зроби зараз (5 хв):** підготуй 3 скріни + 1 речення пітчу для демо.`;
  if (lt.includes("showcase") || t.includes("демо") || t.includes("журі"))
    return `**Зроби зараз (3 хв):** прогони демо за таймером 2 хв і зафіксуй, де втрачаєш час.`;

  return `**Зроби зараз (${mins} хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`;
}

function trimSlop(content) {
  let c = content;
  // cut repetitive mentor/LTV filler tails in checklist sections
  c = c.replace(/\n\nПам['']ятай зв['']язок уроків:[\s\S]*$/u, "");
  c = c.replace(/\n\nЯкщо ментор[\s\S]*$/u, "");
  c = c.replace(/\n\nМентор за[\s\S]*$/u, "");
  c = c.replace(/\n\nЦе і є LTV[\s\S]*$/u, "");
  c = c.replace(/\n\nАртефакт: \*\*[^*]+\*\*\.[\s\S]*?(?=\n\n\*\*Зроби зараз|\s*$)/u, (m) =>
    m.includes("Зроби зараз") ? m : "",
  );
  // collapse triple newlines
  c = c.replace(/\n{3,}/g, "\n\n");
  return c.trimEnd();
}

function processLessonBlock(block) {
  const lessonTitle = (block.match(/\btitle:\s*"([^"]+)"/) || [])[1] || "";
  const theoryStart = block.indexOf("theory:");
  if (theoryStart < 0) return { block, added: 0 };

  const endMarkers = ["commonMistakes:", "summary:"];
  let theoryEnd = block.length;
  for (const m of endMarkers) {
    const i = block.indexOf(m, theoryStart);
    if (i >= 0) theoryEnd = Math.min(theoryEnd, i);
  }

  const before = block.slice(0, theoryStart);
  const theoryPart = block.slice(theoryStart, theoryEnd);
  const after = block.slice(theoryEnd);

  const re = /content:\s*`([\s\S]*?)(?<!\\)`/g;
  let added = 0;
  const newTheory = theoryPart.replace(re, (full, inner) => {
    let content = inner;
    if (content.includes("Зроби зараз")) {
      content = trimSlop(content);
      return `content: \`${content}\``;
    }
    // find nearest title above this content
    const idx = theoryPart.indexOf(full);
    const chunk = theoryPart.slice(Math.max(0, idx - 400), idx);
    const titleMatch = chunk.match(/title:\s*"([^"]+)"/g);
    const title = titleMatch ? titleMatch[titleMatch.length - 1].replace(/^title:\s*"|"$/g, "") : "";
    content = trimSlop(content);
    const anchor = makeAnchor(title, content, lessonTitle);
    added++;
    return `content: \`${content}\n\n${anchor}\``;
  });

  return { block: before + newTheory + after, added };
}

let totalAdded = 0;
for (const { file, filter } of targets) {
  const fp = path.join("src/lib/robloxLessonContent/uk", file);
  let src = fs.readFileSync(fp, "utf8");
  const marks = [...src.matchAll(/^export const (\w+) =/gm)].map((m) => ({
    name: m[1],
    i: m.index,
  }));

  let out = "";
  let cursor = 0;
  let fileAdded = 0;

  for (let n = 0; n < marks.length; n++) {
    const start = marks[n].i;
    const end = n + 1 < marks.length ? marks[n + 1].i : src.length;
    out += src.slice(cursor, start);
    cursor = end;
    let block = src.slice(start, end);
    const id = (block.match(/lessonId:\s*"([^"]+)"/) || [])[1] || "";
    if (filter(id)) {
      const res = processLessonBlock(block);
      block = res.block;
      fileAdded += res.added;
    }
    out += block;
  }
  out += src.slice(cursor);
  fs.writeFileSync(fp, out, "utf8");
  totalAdded += fileAdded;
  console.log(file, "anchors added:", fileAdded);
}
console.log("total anchors added:", totalAdded);
