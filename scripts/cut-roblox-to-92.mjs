/**
 * One-shot: merge M12 (8→6) and M13 (8→6) in curriculum markdown.
 * Run: node scripts/cut-roblox-to-92.mjs
 */
import fs from 'fs'
import path from 'path'

function splitLessons(text) {
  const head = text.split(/^## Урок /m)[0]
  const parts = text.split(/^## Урок /m).slice(1)
  const lessons = parts.map((part) => {
    const m = part.match(/^(\d+)\.(\d+)\s+[—–-]\s+(.+)\r?\n/)
    if (!m) throw new Error('Bad lesson header: ' + part.slice(0, 80))
    return {
      mod: Number(m[1]),
      num: Number(m[2]),
      title: m[3].trim(),
      body: part.slice(m[0].length),
    }
  })
  return { head, lessons }
}

function renum(lesson, newNum) {
  let body = lesson.body
  body = body.replace(/\r?\n## Нотатки[\s\S]*$/, '\n')
  body = body.replace(/\r?\n## Статус[\s\S]*$/, '\n')
  body = body.replace(/### Тест \d+\.\d+/g, `### Тест ${lesson.mod}.${newNum}`)
  return `## Урок ${lesson.mod}.${newNum} — ${lesson.title}\n\n${body.trim()}\n`
}

function extractLua(body) {
  const m = body.match(/```lua\r?\n([\s\S]*?)```/)
  return m ? m[1].trim() : '-- see curriculum templates'
}

{
  const file = path.join('curriculum', 'roblox-v2', 'module-12-tools-gui.md')
  const text = fs.readFileSync(file, 'utf8')
  const { head, lessons } = splitLessons(text)
  const by = Object.fromEntries(lessons.map((l) => [l.num, l]))
  const hpLua = extractLua(by[4].body)

  const lesson4 = `## Урок 12.4 — GUI HP + магазин Tools

**Ціль:** ScreenGui з Frame HP + магазин Tool за валюту (whitelist на сервері). Не довіряти клієнту імʼя «AdminSword».

### Артефакт
HP bar для гравця + whitelist \`ToolsForSale\` + Remote BuyTool → Tool у Backpack після покупки.

### Шаблон HP (LocalScript у Fill-Frame)
\`\`\`lua
${hpLua}
\`\`\`

### Магазин (ідея сервера)
Whitelist таблиці імен + ціна; \`OnServerEvent\` перевіряє імʼя і гроші → \`Clone\` у Backpack. Неправильний ID з клієнта = відмова.

### Таймінг 60′
| Хв | Дія |
|----|-----|
| 0–7 | Повтор HealthChanged + демо whitelist |
| 7–25 | Разом: HP bar + 1 tool у магазині |
| 25–45 | Самі: колір low HP + 2-й tool / чит-тест |
| 45–53 | Playtest loop «бʼєш → бачиш HP → купуєш» |
| 53–58 | Тест |
| 58–60 | ДЗ: третій tool у whitelist + підпис «67/100» |

### Тест 12.4

1. HealthChanged…  
   a) Подія зміни HP  
   b) Подія Negate  
   c) Подія Publish  
   d) Подія Terrain  
   **Відповідь: a**

2. Ширина бара пропорційна…  
   a) hp/maxHp  
   b) Кількості друзів  
   c) Ціні Robux  
   d) Номеру уроку  
   **Відповідь: a**

3. Whitelist імен Tool…  
   a) Античит-гігієна магазину  
   b) Даремна  
   c) Малює Sky  
   d) Робить Negate  
   **Відповідь: a**

4. Неправильна назва з клієнта…  
   a) Сервер відмовляє  
   b) Обовʼязково видає Admin  
   c) Видаляє Place  
   d) Дає Robux  
   **Відповідь: a**

5. LocalScript для HP bar…  
   a) Типово на клієнті  
   b) Заборонений  
   c) Замінює ServerStorage  
   d) Робіть Union  
   **Відповідь: a**

6. Backpack vs StarterPack…  
   a) StarterPack — старт; Backpack — поточні інструменти  
   b) Немає різниці ніколи  
   c) Backpack лише для неба  
   d) StarterPack лише для Negate  
   **Відповідь: a**

7. Артефакт?  
   a) HP GUI + ≥1 покупка Tool  
   b) Повний MMO  
   c) Blender  
   d) Clipchamp  
   **Відповідь: a**

8. Low HP червоний…  
   a) UX фідбек  
   b) Ламає Humanoid  
   c) Видаляє Tool  
   d) Вимикає Play  
   **Відповідь: a**

9. Звʼязок Remote з М10…  
   a) Той самий патерн покупок  
   b) Перший раз Remote у курсі  
   c) Remote скасовано  
   d) Remote лише для Lighting  
   **Відповідь: a**

10. Далі…  
    a) Збірка арени/майстерні з juice  
    b) Тільки Ambient  
    c) Тільки паркан  
    d) НМТ  
    **Відповідь: a**
`

  const lesson5 = `## Урок 12.5 — Збірка арени + juice

**Ціль:** playable loop 3–5 хв (tool → dummy/ящики → GUI → кращий tool) + 3 «соки» фідбеку (звук, спалах, легкий Tween).

### Варіанти
- A: Arena PvE dummies  
- B: Workshop ламає ящики за монети

### Артефакт
Playable арена/майстерня + ≥3 juice-ефекти (звук хіту, колір dummy, Tween UI).

### Таймінг 60′
| Хв | Дія |
|----|-----|
| 0–5 | До/після: гра без juice vs з фідбеком |
| 5–35 | Збірка loop |
| 35–48 | Juice ×3 |
| 48–53 | Парний playtest |
| 53–58 | Тест |
| 58–60 | ДЗ: polish list + 1 хв демо |

### Тест 12.5

1. Мета збірки…  
   a) Цілісний loop інструмента  
   b) Лише один print  
   c) Лише Baseplate  
   d) Лише PDF  
   **Відповідь: a**

2. Juice у геймдева…  
   a) Відчуття відгуку на дію  
   b) Видалення ігрової логіки  
   c) Negate only  
   d) PDF only  
   **Відповідь: a**

3. Звук хіту…  
   a) Миттєвий фідбек  
   b) Заміна урону числами завжди  
   c) Вимкнення Tool  
   d) Вимкнення GUI  
   **Відповідь: a**

4. Артефакт?  
   a) Playable loop + ≥3 juice  
   b) Порожній Baseplate  
   c) Blender cloth  
   d) НМТ  
   **Відповідь: a**

5. Не переборщити juice…  
   a) 3 чіткі ефекти краще 30 хаосу  
   b) Чим більше спалахів тим завжди краще  
   c) Volume завжди 10  
   d) Tween 5 хв на клік  
   **Відповідь: a**

6. М12 зʼєднує…  
   a) Tools + GUI + серверні покупки  
   b) Лише Negate  
   c) Лише Atmosphere  
   d) Лише відео  
   **Відповідь: a**

7. Парний playtest…  
   a) Знайти баги UI/урону  
   b) Видалити чужий Place  
   c) Вимкнути мікрофон назавжди  
   d) Забрати Tool ІРЛ  
   **Відповідь: a**

8. Якщо loop «порожній»…  
   a) Додати мету / монети / кращий tool / juice  
   b) Видалити Tool  
   c) Видалити GUI  
   d) Вимкнути сервер  
   **Відповідь: a**

9. PvP…  
   a) Не обовʼязок М12  
   b) Єдиний критерій  
   c) Без правил завжди  
   d) Заміна dummy забороною  
   **Відповідь: a**

10. Далі…  
    a) Чекпоінт-презентація М12  
    b) Тільки Negate  
    c) Тільки Ambient  
    d) НМТ  
    **Відповідь: a**
`

  const lesson6 = `## Урок 12.6 — Чекпоінт: презентація Tools/GUI

**Рубрика 10:** Tool+Activated (2) · урон/дія по цілі (2) · HP/статус GUI (2) · магазин whitelist (2) · juice/loop (2)

### Таймінг 60′
Презентації → тест → тізер релізного модуля.

### Тест 12.6

1. М12 результат…  
   a) Інструмент + UI + безпечніша покупка в loop  
   b) Лише Baseplate  
   c) Лише PDF  
   d) Лише нік  
   **Відповідь: a**

2. Далі М13…  
   a) Фіналка, polish, publish, showcase  
   b) Скасування всіх місць  
   c) Тільки Negate  
   d) Тільки НМТ  
   **Відповідь: a**

3. Whitelist…  
   a) Ключовий safety skill  
   b) Непотрібний  
   c) Лише для Terrain  
   d) Лише для Decal  
   **Відповідь: a**

4. Dummy PvE…  
   a) Достатньо для здачі  
   b) Не зараховується ніколи  
   c) Заміна всього GUI  
   d) Заміна Tool Handle  
   **Відповідь: a**

5. Пояснити Equipped/Activated…  
   a) Критерій розуміння  
   b) Заборонено  
   c) Заміна Place  
   d) Дає Robux  
   **Відповідь: a**

6. Фаза D майже завершена…  
   a) Жанри+інструменти зібрані  
   b) Lua не починали  
   c) Моделювання не починали  
   d) Тестів не було  
   **Відповідь: a**

7. Фіналка М13 дозволить…  
   a) Обрати жанр і допиляти гру  
   b) Видалити всі навички  
   c) Лише дивитись відео  
   d) Лише писати есе без Studio  
   **Відповідь: a**

8. Juice на здачі…  
   a) Плюс до відчуття якості  
   b) Єдина вимога без Tool  
   c) Заміна урону  
   d) Заміна GUI без бару  
   **Відповідь: a**

9. Найкращий доказ…  
   a) Інший учень пограв loop  
   b) Лише скрін хотбара  
   c) Лише Word  
   d) Лише стікер  
   **Відповідь: a**

10. Тізер релізу…  
    a) Баги, UX, publish, презентація  
    b) Видалення Publish з Roblox  
    c) Скасування Showcase  
    d) Скасування сертифіката  
    **Відповідь: a**
`

  const notes = `---

## Нотатки М12
- Жодних реалістичних збройових референсів насильства понад cartoon dummy.  
- Raycast — бонус після Touched-hitbox.  
- Не змішувати з повним FPS курсом.
`

  const newHead = head.replace(/\*\*Уроків:\*\* 8 × 60′/, '**Уроків:** 6 × 60′')
  const out = [
    newHead.trimEnd(),
    '',
    renum(by[1], 1).trimEnd(),
    '',
    '---',
    '',
    renum(by[2], 2).trimEnd(),
    '',
    '---',
    '',
    renum(by[3], 3).trimEnd(),
    '',
    '---',
    '',
    lesson4.trimEnd(),
    '',
    '---',
    '',
    lesson5.trimEnd(),
    '',
    '---',
    '',
    lesson6.trimEnd(),
    '',
    notes,
  ].join('\n')

  fs.writeFileSync(file, out)
  console.log('M12:', [...out.matchAll(/^## Урок /gm)].length, 'lessons')
}

{
  const file = path.join('curriculum', 'roblox-v2', 'module-13-release.md')
  const text = fs.readFileSync(file, 'utf8')
  const { head, lessons } = splitLessons(text)
  const by = Object.fromEntries(lessons.map((l) => [l.num, l]))

  const lesson5 = `## Урок 13.5 — Publish + GamePass/Badge lite

**Ціль:** підготувати Place до публікації (назва, опис, іконка); Publish за політикою; зовнішня тест-сесія; опційно ігровий Premium-буст / Badge (без тиску на донати).

### Артефакт
1) Опублікований або ready-to-publish чекліст + 5 відповідей фідбеку.  
2) Ігровий буст/бейдж **АБО** справжній Badge/GamePass за політикою школи + короткий етичний текст у грі.

### Таймінг 60′
| Хв | Дія |
|----|-----|
| 0–8 | Етика монетизації + чекліст publish |
| 8–28 | Назва/опис/іконка + publish або private ready |
| 28–45 | Буст/Badge lite + форма фідбеку 5 питань |
| 45–53 | Швидка тест-сесія / фіксація |
| 53–58 | Тест |
| 58–60 | ДЗ: топ-3 баги + напис «навчальний буст» |

### Тест 13.5

1. Навчальна монетизація…  
   a) Спочатку ігрова економіка; реальні покупки — обережно за політикою  
   b) Одразу вимагати батьківські картки  
   c) Ігнорувати етику  
   d) Видалити всі нагороди  
   **Відповідь: a**

2. Назва і опис Place…  
   a) Частина продукту  
   b) Непотрібні  
   c) Лише для Negate  
   d) Лише для Ambient  
   **Відповідь: a**

3. Фейк-Premium за ігрову валюту…  
   a) Вчить систему бустів без ризику  
   b) Заборонений як ідея назавжди  
   c) Заміна DataStore  
   d) Заміна Spawn  
   **Відповідь: a**

4. Артефакт?  
   a) Publish readiness + фідбек + одна нагорода/буст  
   b) 50 GamePass  
   c) Blender film  
   d) НМТ  
   **Відповідь: a**

5. Зовнішній тести…  
   a) Бачить те що автор сліпий  
   b) Даремний  
   c) Заміна рубрики без викладача  
   d) Обовʼязок образити автора  
   **Відповідь: a**

6. Тиск «купи або програв»…  
   a) Погана практика для дитячого курсу  
   b) Єдиний спосіб здати М13  
   c) Обовʼязок курсу  
   d) Заміна publish  
   **Відповідь: a**

7. Якщо Publish неможливий політикою…  
   a) Здаємо private + відео/демо  
   b) Курс не здається ніколи  
   c) Видаляємо проєкт  
   d) Видаляємо учня  
   **Відповідь: a**

8. Якщо школа забороняє Badge API…  
   a) Робимо ігровий еквівалент  
   b) Кидаємо модуль  
   c) Видаляємо фіналку  
   d) Видаляємо учня з групи  
   **Відповідь: a**

9. Баги від тестерів…  
   a) У список на feature freeze  
   b) Ігнор  
   c) Образи  
   d) Видалення тестера  
   **Відповідь: a**

10. Далі…  
    a) Freeze, polish і Showcase Day  
    b) Тільки Sky  
    c) Тільки паркан  
    d) НМТ  
    **Відповідь: a**
`

  const lesson6 = `## Урок 13.6 — Feature freeze + Showcase Day

**Ціль:** stop новим фічам; Final_v1; презентації групи; рефлексія курсу; сертифікат школи.

### Артефакт
Стабільна \`Final_v1\` + changelog 5 пунктів + жива презентація на Showcase.

### Формат презентації (≤5 учнів)
~7–8 хв: 1′ пітч → 3′ live demo → 1′ «що вивчив» → 1′ фідбек → буфер.

### Рубрика фіналу
Пітч (2) · Demo без крашу Must (3) · UX база (2) · Код/системи (2) · Рефлексія (1)

### Таймінг 60′
| Хв | Дія |
|----|-----|
| 0–5 | Freeze оголошення + прогін демо |
| 5–20 | Швидкі багфікси / тексти (без нових фіч) |
| 20–50 | Showcase презентації |
| 50–55 | Рефлексія «що далі» |
| 55–58 | Тест-підсумок |
| 58–60 | Святкування / сертифікат |

### Тест 13.6 (підсумок курсу)

1. Feature freeze…  
   a) Стоп новим фічам перед здачею  
   b) Старт 100 нових фіч  
   c) Видалення гри  
   d) Вимкнення Save  
   **Відповідь: a**

2. Курс v2 логіка була…  
   a) Моделі → іскри → Lua → жанри → реліз  
   b) Реліз → Lua → моделі  
   c) Лише відео  
   d) Лише тести без практики  
   **Відповідь: a**

3. Найважливіший продукт М13…  
   a) Доведена до кінця гра  
   b) Нескінченний список Could  
   c) Порожній Baseplate  
   d) Лише сертифікат без гри  
   **Відповідь: a**

4. Showcase потрібен щоб…  
   a) Показати результат і отримати фідбек  
   b) Замінити навчання  
   c) Образити слабших  
   d) Сховати баги брехнею  
   **Відповідь: a**

5. v1 означає…  
   a) Достатньо для здачі курсу  
   b) Вічний недореліз  
   c) Видалення прогресу  
   d) Скасування сертифіката  
   **Відповідь: a**

6. Фаза A дала…  
   a) Міцний світ і Studio навички  
   b) Тільки RemoteEvent  
   c) Тільки DataStore  
   d) Тільки PvP  
   **Відповідь: a**

7. Фаза C дала…  
   a) Змінні if цикли функції таблиці  
   b) Тільки Negate  
   c) Тільки Sky  
   d) Тільки Decal  
   **Відповідь: a**

8. Tycoon/obby/sim/tools…  
   a) Жанрові застосування Lua  
   b) Випадкові теми без звʼязку  
   c) Заміна моделювання  
   d) Заміна тестів  
   **Відповідь: a**

9. Наступний крок…  
   a) Глибший GameDev або інший курс школи  
   b) Видалити Roblox  
   c) Нічого не робити ніколи  
   d) Забути Output  
   **Відповідь: a**

10. Доказ завершення SmartCode Roblox v2…  
    a) Фінальна гра + презентація  
    b) Лише присутність на 1 уроці  
    c) Лише підписка на чат  
    d) Лише скрін аватара  
    **Відповідь: a**
`

  const notes = `---

## Нотатки М13
- Індивідуал: більше часу на polish, презентація викладачу + короткий Loom/відео.  
- Не вимагати публічний Place якщо батьки/школа проти — private demo ок.  
- Сертифікат — процес школи (CRM/PDF), не блокує навчальний зміст.

## Статус усього курсу v2

| Фаза | Модулі | Уроків | Статус |
|------|--------|--------|--------|
| A Моделі | M1–M3 | 22 | done |
| B Іскри | M4 | 10 | done |
| C Lua | M5–M8 | 26 | done |
| D Механіки | M9–M12 | 28 | done |
| E Реліз | M13 | 6 | done |
| **Разом** | **M1–M13** | **92** | **done** |
`

  const newHead = head.replace(/\*\*Уроків:\*\* 8 × 60′/, '**Уроків:** 6 × 60′')
  const out = [
    newHead.trimEnd(),
    '',
    renum(by[1], 1).trimEnd(),
    '',
    '---',
    '',
    renum(by[2], 2).trimEnd(),
    '',
    '---',
    '',
    renum(by[3], 3).trimEnd(),
    '',
    '---',
    '',
    renum(by[4], 4).trimEnd(),
    '',
    '---',
    '',
    lesson5.trimEnd(),
    '',
    '---',
    '',
    lesson6.trimEnd(),
    '',
    notes,
  ].join('\n')

  fs.writeFileSync(file, out)
  console.log('M13:', [...out.matchAll(/^## Урок /gm)].length, 'lessons')
}

console.log('Cut curriculum markdown to 92 (M12+M13 = 6 each).')
