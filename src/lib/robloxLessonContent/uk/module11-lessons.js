/** Roblox Module 11 UK - 6 уроків (prod-92), фінал 11.6 сліпий playtest */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson111 = {
 lessonId: "lesson-roblox-11-1",
 moduleId: "module-11",
 order: 1,
 title: "11.1 - Аудит Explorer",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Провести аудит Explorer і знайти сміття: Part, Script, дублікати",
 "Ввести стандарт імен і префіксів для Parts, UI, NPC, Scripts, Audio",
 "Розкласти об’єкти по Folders у Workspace, RS, SSS, StarterGui",
 "Прибрати або вимкнути небезпечні/зайві Scripts з Free Models",
 "Зберегти чистий Place як базу для loading, juice і Demo Ready",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 81 з 92)",
 content: `Це **старт модуля Polish**. Далі будуть loading, звук/VFX, оптимізація, Demo Ready і сліпий тест. Усе це розсиплеться, якщо в Explorer хаос.

Сьогодні ти робиш **аудит і прибирання** - але з **швидким вау**, не «прибирання заради ідеалу»:
1. Відкриваєш свій найбільший / найкращий Place.
2. Робиш **замір до**: скільки \`Part\`/\`Script\` без імені + скільки секунд шукаєш головний Script системи.
3. Папки, імена, сміття Toolbox.
4. **Замір після** + маленький вау на Save (Neon-вивіска \`Polish_Ready\` або короткий SFX).

Швидкість: коли завтра зламається магазин, ти за 10 с знайдеш \`Srv_Shop\` у \`ServerScriptService/Systems\`, а не серед 80 штук \`Script\`.

**Зроби зараз (3 хв) - замір «до»:**
1. Порахуй безіменні \`Part\` + \`Script\` → число A.
2. Увімкни таймер: знайди в Explorer свій головний серверний Script магазину/циклу (або найважливіший Script). Запиши секунди T1.
3. Це твій «борг хаосу». В кінці уроку A і T1 мають стати меншими.`,
 },
 {
 title: "Навіщо чистий Explorer (для 9–13 і для викладача)",
 content: `| Брудний Explorer | Чистий Explorer |
|------------------|-----------------|
| Баг шукаєш 20 хв | Баг шукаєш 2 хв |
| Друг/викладач губиться | Можна показати структуру за 30 с |
| Дублікати логіки | Одна правда в одній папці |
| Страшно щось видалити | Сміття видно одразу |

На SHOWCASE інколи питають: «покажи, як організовано». Чисті папки виглядають як робота розробника, не як випадковий склад кубиків.

Також: оптимізація (11.4) і juice (11.3) легші, коли ефекти й звуки лежать у зрозумілих місцях.

**Зроби зараз (4 хв):** перейменуй 3 об'єкти в Explorer за роллю, не за номером Script.`,
 },
 {
 title: "Стандарт імен (простий і жорсткий)",
 content: `| Було | Стало |
|------|-------|
| Part | Wall_North / Floor_Hub |
| Script | Srv_CoinService / Cli_HUD |
| Frame | UI_ShopPanel |
| Model | NPC_Guide_Maya |
| Sound | SFX_Reward / AMB_Hub |

Правила:
1. **Англійською латиницею** для імен об’єктів (українською - підписи в UI Text).
2. **PascalCase або Prefix_Name** - без пробілів і emoji в Name.
3. Назва каже **що це**, не \`fff\`, \`new\`, \`copy2\`.
4. Однакова схема в усьому Place.

Префікси, які зручно тримати в курсі:
- \`NPC_\` - персонажі
- \`UI_\` - елементи інтерфейсу
- \`SFX_\` / \`AMB_\` - звуки
- \`FX_\` - ефекти
- \`Srv_\` - серверні Scripts
- \`Cli_\` - LocalScripts

**Зроби зараз (8 хв):** перейменуй 10 найгірших імен у Workspace. Не чіпай ще логіку - лише Name.`,
 },
 {
 title: "Карта папок «стандарт курсу»",
 content: `Приведи Place ближче до такого вигляду (адаптуй під свій жанр):

Workspace:
- Hub/
- PlayZone/ (або Obby / Arena / Farm)
- NPCs/
- Props/

ReplicatedStorage:
- Remotes/
- Config/
- Audio/ (опційно)

ServerScriptService:
- Systems/

StarterGui:
- HUD/
- (пізніше LoadingGui у 11.2)

ServerStorage:
- Tools/ / Templates/ (якщо є)

Не обов’язково ідеальна копія цієї схеми. Обов’язково: **логічні купи**, а не все в корені Workspace.

Як перенести: виділи об’єкти → перетягни в Folder. Якщо Model важливий - спочатку згрупуй, потім поклади в папку.

**Зроби зараз (4 хв):** зроби одну дію pick/use і підтверди результат у Output або інвентарі.`,
 },
 {
 title: "Аудит-чекліст (пройти зверху вниз)",
 content: `| # | Питання | Якщо «ні» |
|---|---------|-----------|
| 1 | У корені Workspace менше сміття? | Створи Folders, розклади |
| 2 | Немає купи \`Part\` / \`Script\` без імені? | Перейменуй |
| 3 | Remotes в одному місці? | Збери в ReplicatedStorage/Remotes |
| 4 | Немає двох однакових ShopGui? | Залиш один, інший Disable/Delete |
| 5 | Free Model Scripts переглянуті? | Видали підозрілі / невідомі |
| 6 | Anchored на статиці, де треба? | Увімкни, щоб не падало |
| 7 | Немає тестових Part «DeleteMe»? | Видали |
| 8 | Можна за 20 с пояснити структуру викладачу? | Спрости ще |

Йди чеклістом як тестом. Кожен «ні» = задача на Part B практики.

**Зроби зараз (5 хв):** простав так/ні по таблиці для свого Place.`,
 },
 {
 title: "Сміття з Toolbox: як не підірвати Place",
 content: `Free Models часто тягнуть:
- приховані Scripts;
- require на зовнішні модулі;
- спам Sounds / ParticleEmitter;
- дублікати вже твоїх систем.

Правило аудиту:
1. Якщо вставив модель - одразу розкрий у Explorer.
2. Знайди всі Scripts / LocalScripts.
3. Якщо не розумієш код і він не потрібен для меші - **видали Script**, лиши геометрію.
4. Ніколи не лишай «магічний» Script «бо модель інакше не стоїть», якщо не перевірив.

Для курсу безпечніше: свої Parts + свої Scripts. Модель - лише як декор без логіки.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Дублікати - тихий вбивця",
 content: `| Симптом | Ймовірна причина |
|---------|------------------|
| Монети нараховуються двічі | Два Scripts на Touched |
| Два HUD | Два ScreenGui в StarterGui |
| Remote not found / wrong one | Два Remotes з різними шляхами |
| Loading + старий GUI | Зайвий екран з минулого тесту |

Як шукати дублікати:
1. У пошуку Explorer введи \`Shop\`, \`HUD\`, \`Coin\`, \`Remote\`.
2. Якщо бачиш 2+ схожих - виріши, який головний.
3. Зайвий: Disabled = true спочатку, перевір Play, потім Delete.

Не видаляй обидва «на всяк випадок». Залиш один робочий шлях.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Сервер / клієнт / спільне - хто де лежить",
 content: `| Місце | Що класти |
|-------|-----------|
| ServerScriptService | Логіка нагород, магазин на сервері, DataStore |
| StarterGui / StarterPlayerScripts | LocalScripts UI, камера, локальні ефекти |
| ReplicatedStorage | Remotes, Config ModuleScript, спільні шаблони |
| Workspace | Світ, тригери, NPC-моделі |
| ServerStorage | Те, що гравець не має бачити напряму (шаблони Tools) |

Типова помилка: покласти важливий серверний Script у Workspace Part і забути. Або LocalScript у SSS - він не працюватиме як очікуєш.

Під час аудиту просто перевір: чи немає LocalScript там, де має бути сервер, і навпаки.

**Зроби зараз (4 хв):** зроби save/load або чесно задокументуй mock-режим у Output.`,
 },
 {
 title: "Міні-стандарт Config і Remotes",
 content: `Навіть якщо Config ще тонкий:
- один ModuleScript \`GameConfig\` або \`EconomyConfig\` у ReplicatedStorage/Config;
- не три копії таблиць цін у різних Scripts.

Remotes:
- папка ReplicatedStorage/Remotes;
- імена \`BuyItem\`, \`QuestFinished\` - без \`RemoteEvent1\`.

Якщо сьогодні немає часу переписувати логіку - хоча б **перенеси і перейменуй**, щоб завтра 11.2–11.5 не шукали голку.

**Зроби зараз (7 хв):** створи папки Remotes і Systems (якщо немає) і поклади туди те, що вже існує.`,
 },
 {
 title: "Порядок спринту прибирання на 60′",
 content: `| Хв | Дія |
|----|-----|
| 0–5 | Чекліст так/ні + скрін «до» (опційно) |
| 5–20 | Folders + перенос з кореня Workspace |
| 20–35 | Перейменування Part/Script/UI |
| 35–45 | Дублікати + аудит Scripts з моделей |
| 45–50 | Швидкий Play: світ не розсипався |
| 50–55 | Дрібні фікси Anchored / видимість |
| 55–60 | Save |

Не починай з ідеального префікса на 200 об’єктах, якщо корінь ще звалище. Спочатку **структура**, потім імена.

**Зроби зараз (4 хв):** перейменуй 3 об'єкти в Explorer за роллю, не за номером Script.`,
 },
 {
 title: "Як здати «аудит» викладачу за 40 с",
 content: `Покажи:
1. Корінь Workspace з папками Hub / PlayZone / NPCs.
2. ReplicatedStorage/Remotes (або скажи, що Remotes ще будуть - але місце готове).
3. Один приклад перейменування: було \`Script\`, стало \`Srv_...\`.
4. Скажи число: «було N безіменних Part, лишилось M».

Це і є доказ уроку. Не «я трохи прибрав», а **вимірювана чистота**.

**Вау на Save (2–3 хв, обов’язково):** після чистоти постав у хабі/спавні Part \`Polish_Ready\` (Neon + Billboard «Polish base») **або** Sound \`SFX_SaveReady\` на 1 клік кнопки/Part. Це не декор на рік - це сигнал «база готова, можна juice». Завтра loading сяде на цей Place приємніше.

Save: \`Lesson 11.1 - Explorer Audit\`.

**Зроби зараз (4 хв):** перейменуй 3 об'єкти в Explorer за роллю, не за номером Script.`,
 },
 {
 title: "Чекліст здачі уроку 81",
 content: `- [ ] Є заміри «до/після»: число безіменних + секунди пошуку Script
- [ ] Є основні Folders у Workspace
- [ ] Безіменних Part/Script стало помітно менше (A_після < A_до)
- [ ] Remotes/Systems/Audio мають логічне місце (або заготовки папок)
- [ ] Підозрілі Scripts з Free Models перевірені/прибрані
- [ ] Дублікати GUI/логіки знайдені й знешкоджені
- [ ] Play: світ не розвалився після переносів
- [ ] Є вау-якір \`Polish_Ready\` (Neon/Billboard) або короткий SFX на Save
- [ ] Можеш за 40 с пояснити структуру
- [ ] Save: \`Lesson 11.1 - Explorer Audit\`

Далі **11.2** поставить LoadingGui у вже чистий StarterGui - і це буде приємно.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Перейменовуєш усе підряд, але лишаєш звалище в корені",
 explanation: "Імена є, структури немає - шукати все одно важко.",
 correctApproach: "Спочатку Folders, потім імена.",
 },
 {
 mistake: "Видаляєш Script з моделі навмання під час Play-тесту чужої логіки без бекапу",
 explanation: "Можна зламати єдину робочу систему.",
 correctApproach: "Disabled спочатку → Play → потім Delete.",
 },
 {
 mistake: "Лишаєш два HUD «на всяк випадок»",
 explanation: "Дублікати UI і подвійні події.",
 correctApproach: "Один головний ScreenGui.",
 },
 {
 mistake: "Імена з пробілами, emoji і \`copy copy\`",
 explanation: "WaitForChild і командна робота страждають.",
 correctApproach: "Латиниця, префікси, без сміття в Name.",
 },
 {
 mistake: "Не перевіряєш Play після масового переносу",
 explanation: "Зламані шляхи Remotes/скриптів виявляються пізно.",
 correctApproach: "Короткий Play після хвилі прибирання.",
 },
 ],
 summary:
 "Ти провів аудит Explorer з заміром до/після: папки, імена, дублікати, безпека Scripts і вау-якір Polish_Ready. Урок 81 дає чисту базу для всього модуля Polish.",
 practiceTask: {
 title: "Практика: аудит Explorer (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** чистіший Place + доказ до/після + вау на Save.

### Part A - Замір «до» (5 хв)
1. Число A: безіменні Part/Script.
2. Таймер T1: знайди головний Script системи (магазин/цикл).
3. Чекліст так/ні + (опційно) скрін Explorer «до».

### Part B - Прибирання (18 хв)
1. Folders і розклад Workspace.
2. Перейменуй найгірші 15–30 об’єктів.
3. Дублікати GUI/Scripts + Free Model Scripts.
4. Короткий Play.

### Part C - Замір «після» + вау (7 хв)
1. Числа A2 і T2 (має бути краще за A/T1).
2. Постав \`Polish_Ready\` (Neon/Billboard) або короткий SFX.
3. **Save** → \`Lesson 11.1 - Explorer Audit\`.
4. Покажи викладачу за 40 с: «було A за T1 с → стало A2 за T2 с».

### Критерій «зараховано»
- Папки + менше хаосу імен
- Є числа до/після
- Є Polish_Ready або SFX
- Play не розвалений
- Place збережено`,
 hints: [
 "Не ідеал на рік - видимий стрибок чистоти за одну годину",
 "Disabled перед Delete рятує від паніки",
 "Вау-якір = 1 Part або 1 Sound, не новий жанр",
 ],
 optionalChallenge:
 "Напиши 8–10 рядків «стандарт імен команди» і застосуй його до StarterGui повністю.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який номер уроку 11.1 у новій сітці?",
 options: [
          "81-й з 92",
          "96-й",
          "1-й",
          "11-й без номера курсу",
        ],
 correctAnswer: 0,
 explanation: "11.1 відкриває модуль Polish як урок 81.",
 },
 {
 id: "q2",
 type: MC,
 question: "Навіщо чистий Explorer у polish-модулі?",
 options: [
          "Щоб вимкнути Play назавжди",
          "Щоб швидше знаходити баги і показувати структуру",
          "Це потрібно лише для Terrain Material",
          "Щоб замінити DataStore",
        ],
 correctAnswer: 1,
 explanation: "Швидкість і ясність команди.",
 },
 {
 id: "q3",
 type: MC,
 question: "Яке ім’я краще для серверного скрипта магазину?",
 options: [
          "Script",
          "fff",
          "Srv_Shop",
          "Script (1) copy",
        ],
 correctAnswer: 2,
 explanation: "Префікс + сенс.",
 },
 {
 id: "q4",
 type: MC,
 question: "З чого логічно починати спринт прибирання?",
 options: [
          "З ідеального префікса на 500 об’єктах при звалищі в корені",
          "З Publish Public",
          "З видалення всього Workspace",
          "З Folders і розкладки кореня, потім імена",
        ],
 correctAnswer: 3,
 explanation: "Структура перша.",
 },
 {
 id: "q5",
 type: MC,
 question: "Де логічно тримати Remotes?",
 options: [
          "Випадково по різних Parts без системи",
          "ReplicatedStorage/Remotes",
          "Лише в Lighting",
          "У SoundService обов’язково",
        ],
 correctAnswer: 1,
 explanation: "Одне місце для мережевих точок.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що робити з підозрілим Script у Free Model?",
 options: [
          "Завжди лишати «на магію»",
          "Копіювати ще 10 разів",
          "Перевірити; якщо не потрібен - Disabled, потім Delete",
          "Перейменувати в Part",
        ],
 correctAnswer: 2,
 explanation: "Безпека важливіша за лінь.",
 },
 {
 id: "q7",
 type: MC,
 question: "Який симптом часто дає два однакові Scripts нагороди?",
 options: [
          "Подвійне нарахування монет / подвійні події",
          "Красивіший Terrain",
          "Швидший loading завжди",
          "Автоматичний Badge",
        ],
 correctAnswer: 0,
 explanation: "Дублікати логіки.",
 },
 {
 id: "q8",
 type: MC,
 question: "Який наступний урок після 11.1?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (немає)",
          "Модуль 1",
          "11.2 - Loading Screen",
        ],
 correctAnswer: 3,
 explanation: "Спочатку порядок, потім loading.",
 },
 {
 id: "q9",
 type: MC,
 question: "Яку назву Save пропонує урок?",
 options: [
          "Juice Pass",
          "Demo Ready",
          "Lesson 11.1 - Explorer Audit",
          "Final GDD",
        ],
 correctAnswer: 2,
 explanation: "Здача аудиту Explorer.",
 },
 {
 id: "q10",
 type: MC,
 question: "Де зазвичай лежить серверна логіка систем?",
 options: [
          "Тільки StarterGui",
          "ServerScriptService (наприклад Systems)",
          "Тільки Atmosphere",
          "У назві Place",
        ],
 correctAnswer: 1,
 explanation: "SSS для серверних Scripts.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чому імена з emoji/пробілами погані для об’єктів?",
 options: [
          "Roblox їх фізично не відображає ніколи",
          "Вони підвищують FPS",
          "Вони замінюють Folders",
          "Важко і крихко шукати в коді через WaitForChild",
        ],
 correctAnswer: 3,
 explanation: "Чисті технічні імена.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що зробити перед остаточним Delete підозрілого Script?",
 options: [
          "Disabled + короткий Play-тест",
          "Одразу Publish",
          "Нічого не перевіряти",
          "Дублікувати ще раз",
        ],
 correctAnswer: 0,
 explanation: "Безпечний порядок.",
 },
 {
 id: "q13",
 type: MC,
 question: "Навіщо один Config замість трьох копій цін?",
 options: [
          "Config забороняє UI",
          "Це лише для іконки",
          "Одна правда балансу, менше роз’їзду систем",
          "Щоб вимкнути Explorer",
        ],
 correctAnswer: 2,
 explanation: "Єдине джерело правди.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що показати викладачу як доказ аудиту?",
 options: [
          "Лише порожній чат",
          "Тільки небо",
          "Чужий Place без змін",
          "Числа до/після + папки + приклад перейменування (+ Polish_Ready)",
        ],
 correctAnswer: 3,
 explanation: "Вимірюваний результат + вау-якір.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 11.1?",
 options: [
          "Лише теорія без змін",
          "Place з папками, заміром до/після, вау-якорем і Save",
          "Public Publish без структури",
          "Видалений увесь StarterGui без потреби",
        ],
 correctAnswer: 1,
 explanation: "Аудит = чистота + доказ + Polish_Ready.",
 },
 ],
 },
}

export const ukLesson112 = {
 lessonId: "lesson-roblox-11-2",
 moduleId: "module-11",
 order: 2,
 title: "11.2 - Loading Screen",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Зібрати LoadingGui в StarterGui з фоном, назвою гри і статусом",
 "Керувати екраном через LocalScript (показати → етапи → сховати)",
 "Зробити плавне зникнення через TweenService (або простий Transparency)",
 "Знати навіщо ContentProvider / попереднє завантаження (lite)",
 "Не залишити гравця навічно на екрані завантаження",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 82 з 92)",
 content: `Перше, що бачить гравець після входу - не твій крутий obby, а **момент очікування**. Якщо там чорний екран або хаос UI - враження вже зіпсоване.

Сьогодні ти робиш **Loading Screen**:
1. Повноекранна панель з назвою гри.
2. Текст статусу («Готуємо світ…»).
3. LocalScript, який показує екран, імітує/робить етапи, потім ховає.
4. Плавне зникнення (Tween).

Працюй на Place після **11.1** (чистий Explorer допомагає). LoadingGui поклади в **StarterGui**. Після hide одразу глянь, чи не перекриває щось спавн і чи Output без червоного на LocalScript.

**Зроби зараз (2 хв):** напиши назву гри одним рядком - вона з’явиться на екрані завантаження. Тримай цю назву короткою: на loading довгий заголовок погано читається.`,
 },
 {
 title: "Навіщо loading, якщо гра й так відкривається",
 content: `| Без екрану | З екраном |
|------------|-----------|
| Гравець клікає в порожнечу | Розуміє: «ще вантажиться» |
| HUD/кнопки з’являються рвано | Спочатку бренд, потім гра |
| Телепорт «німа пауза» | Є статус «Перехід у зону…» |

Loading - це не «доросла фіча AAA». Це ввічливість: скажи гравцеві, що відбувається.

Для Demo Ready і SHOWCASE 3 секунди з назвою виглядають набагато дорожче, ніж миттєвий спавн у недогруженому хабі.

**Зроби зараз (4 хв):** запусти Play і підтверди, що loading screen зникає після завантаження.`,
 },
 {
 title: "Де живе LoadingGui (карта)",
 content: `\`\`\`
StarterGui/
  LoadingGui/          -- ScreenGui
    Background/        -- Frame на весь екран
    Title/             -- TextLabel назва
    Status/            -- TextLabel статус
    Tip/               -- TextLabel підказка (опційно)
    LocalScript        -- логіка показати/сховати
\`\`\`

Важливо:
- це **LocalScript** (клієнт бачить свій UI);
- \`ScreenGui.IgnoreGuiInset = true\` часто зручно для повного екрана;
- \`DisplayOrder\` постав високий (наприклад 100), щоб loading був зверху інших панелей;
- після кінця: \`LoadingGui.Enabled = false\` або знищ/сховай Background.

Не клади логіку loading у Server Script «для всіх» як єдиний екран без LocalScript - у кожного гравця свій клієнтський UI.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Збери UI за 10–12 хвилин (кроки)",
 content: `1. StarterGui → Insert **ScreenGui** → назви \`LoadingGui\`.
2. Додай **Frame** \`Background\`: Size \`{1,0},{1,0}\`, колір темний, AnchorPoint 0.5 / Position центр якщо треба.
3. **TextLabel** \`Title\`: велика назва гри, білий/яскравий текст, центр зверху.
4. **TextLabel** \`Status\`: «Завантаження…», менший шрифт під назвою.
5. (Опційно) \`Tip\`: одна коротка підказка керування.
6. Перевір у Play: чи видно панель одразу. Якщо ні - \`Enabled = true\`, DisplayOrder вище.

Дизайн lite:
- 1 фон + 2 тексти достатньо;
- не ліпи 10 кнопок на loading;
- контраст: світлий текст на темному фоні.

**Зроби зараз:** збері UI до появи Title і Status на екрані.`,
 },
 {
 title: "Етапи завантаження (що писати в Status)",
 content: `Гравцю приємно бачити прогрес словами, навіть якщо ти ще не рахуєш реальні %:

| Етап | Текст Status (приклад) | Що робиш у коді |
|------|------------------------|-----------------|
| 1 | «Готуємо інтерфейс…» | Коротка пауза / ініт UI |
| 2 | «Завантажуємо ресурси…» | ContentProvider lite або wait |
| 3 | «Майже готово…» | Фінальна пауза |
| 4 | «Заходь!» | Ховаєш екран |

Для шкільного MVP можна зробити **чесні етапи з \`task.wait\`** + зміна тексту. Це вже виглядає професійно на демо.

Пізніше (якщо встигнеш) підв’яжеш реальне очікування асетів. Але **ніколи** не залишай екран без таймауту «на всяк випадок».

**Зроби зараз (4 хв):** запусти Play і підтверди, що loading screen зникає після завантаження.`,
 },
 {
 title: "LocalScript: скелет логіки",
 content: `Ідея (піджени імена під свій UI):

\`\`\`lua
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local ContentProvider = game:GetService("ContentProvider")

local player = Players.LocalPlayer
local gui = script.Parent
local background = gui:WaitForChild("Background")
local status = background:WaitForChild("Status")

local function setStatus(text)
	status.Text = text
end

local function hideLoading()
	local tween = TweenService:Create(
		background,
		TweenInfo.new(0.6),
		{ BackgroundTransparency = 1 }
	)
	-- якщо Title/Status теж треба згаснути - твінь і їх TextTransparency
	tween:Play()
	tween.Completed:Wait()
	gui.Enabled = false
end

-- старт
gui.Enabled = true
setStatus("Готуємо інтерфейс...")
task.wait(0.4)
setStatus("Завантажуємо ресурси...")
-- тут можна PreloadAsync (див. далі)
task.wait(0.6)
setStatus("Майже готово...")
task.wait(0.3)
hideLoading()
\`\`\`

Це навчальний скелет: головне - **показали → етапи → сховали**.

**Зроби зараз (4 хв):** один hit/ефект у Play - feedback має бути коротким і без спаму.`,
 },
 {
 title: "ContentProvider lite (попереднє завантаження)",
 content: `**ContentProvider:PreloadAsync(list)** просить клієнт підвантажити асети (картинки, звуки…) заздалегідь.

Навіщо:
- іконки UI не «моргають» порожнім;
- звук нагороди встигає підтягнутись до першого кліку.

Як користуватись обережно:
1. Збери масив екземплярів (ImageLabel, Sound…) які критичні на старті.
2. Виклич PreloadAsync у pcall.
3. Обов’язково monai timeout: якщо асет зависне - екран не має висіти вічно.

\`\`\`lua
local ok, err = pcall(function()
	ContentProvider:PreloadAsync({ /* твої інстанси */ })
end)
if not ok then
	warn("Preload failed:", err)
end
\`\`\`

Якщо список порожній / складно - для здачі уроку достатньо етапів з \`task.wait\` + гарний UI. Preload - бонус «майже як у великих іграх».

**Зроби зараз (4 хв):** запусти Play і підтверди, що loading screen зникає після завантаження.`,
 },
 {
 title: "TweenService: зникнення без різкого кліку",
 content: `Різко вимкнути Frame (\`Visible = false\`) можна, але твін виглядає м’якше.

Мінімум:
- твінь \`BackgroundTransparency\` 0 → 1;
- паралельно \`TextTransparency\` у Title/Status;
- \`TweenInfo.new(0.5–0.8)\`.

Після Completed → \`gui.Enabled = false\`.

Не роби твін на 5 секунд - гравець думає, що зависло. 0.4–0.8 с - солодка зона.

**Зроби зараз (8 хв):** підключи hideLoading з твіном і перевір Stop→Play двічі.`,
 },
 {
 title: "Безпека: екран не може «застрягти»",
 content: `| Ризик | Захист |
|-------|--------|
| Preload висить | pcall + максимальний час очікування |
| Помилка в LocalScript | \`warn\` + усе одно сховати GUI через N секунд |
| ResetOnSpawn знову показує loading | Налаштуй ScreenGui.ResetOnSpawn = false (часто так і треба) |
| Loading під іншими панелями | DisplayOrder вище |

Обов’язковий «аварійний вихід» у голові:

\`\`\`lua
task.delay(8, function()
	if gui.Enabled then
		gui.Enabled = false
		warn("Loading force-closed")
	end
end)
\`\`\`

8 секунд - приклад. Краще коротший максимум, ніж вічний чорний екран на SHOWCASE.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Підказки на екрані (Tip)",
 content: `Один рядок Tip змінює відчуття:

- «Підійди до жовтої зони і натисни E»
- «Монети збирай у парку за хабом»
- «Не стрибай у лаву - там боляче :)»

Міняти tip кожні 10 с на loading - опційно. Для MVP досить **одного** статичного речення.

Не пиши роман. Не пиши спойлери всього сюжету. Одна дія для перших 30 с гри.

**Зроби зараз (4 хв):** запусти Play і підтверди, що loading screen зникає після завантаження.`,
 },
 {
 title: "Зв’язок з телепортом і модулем 12",
 content: `Якщо в фіналці буде телепорт хаб → зона:
- короткий loading/статус «Переходимо…» знову стане в пригоді;
- той самий патерн LocalScript + статус.

Сьогодні заклади звичку: **будь-яка пауза пояснюється текстом**.

Після loading одразу перевір: спавн + онбординг видимі. Loading не замінює табличку в світі.

Save: \`Lesson 11.2 - Loading Screen\`.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Чекліст здачі уроку 82",
 content: `- [ ] LoadingGui в StarterGui з фоном, Title, Status
- [ ] LocalScript показує етапи і ховає екран
- [ ] Є плавне зникнення (Tween) або акуратно просте hide
- [ ] ResetOnSpawn налаштований свідомо
- [ ] Є захист від вічного екрана (таймаут)
- [ ] Після hide видно спавн / гру
- [ ] (Бонус) PreloadAsync хоча б на 1–2 асети
- [ ] Save: \`Lesson 11.2 - Loading Screen\`

Далі **11.3** додасть juice; **11.5** перевірить, чи loading не заважає демо.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Екран зависає назавжди через помилку або Preload",
 explanation: "Гравець думає, що гра зламалась.",
 correctApproach: "Таймаут force-close + pcall.",
 },
 {
 mistake: "Loading знову з’являється після смерті через ResetOnSpawn",
 explanation: "Дратує на кожному респавні.",
 correctApproach: "ResetOnSpawn = false для LoadingGui (зазвичай).",
 },
 {
 mistake: "Немає статусу - просто чорний квадрат",
 explanation: "Не зрозуміло, чи щось відбувається.",
 correctApproach: "Title + Status з етапами.",
 },
 {
 mistake: "Твін на 5+ секунд",
 explanation: "Виглядає як фриз.",
 correctApproach: "0.4–0.8 с на fade-out.",
 },
 {
 mistake: "Логіка loading у неправильному місці без LocalScript",
 explanation: "UI гравця не керується як треба.",
 correctApproach: "LocalScript у StarterGui/LoadingGui.",
 },
 ],
 summary:
 "Ти зібрав Loading Screen на LocalScript з етапами статусу, плавним зникненням і захистом від зависання. Урок 82 дає перше «доросле» враження перед juice і Demo Ready.",
 practiceTask: {
 title: "Практика: Loading Screen (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** робочий LoadingGui з етапами і fade-out.

### Part A - UI (10 хв)
1. ScreenGui LoadingGui + Background + Title + Status (+ Tip).
2. DisplayOrder високий, контрастний текст.
3. Перевір видимість у Play.

### Part B - Логіка (15 хв)
1. LocalScript: етапи Status + wait.
2. Tween hide + Enabled = false.
3. Таймаут force-close.
4. ResetOnSpawn свідомо.
5. (Бонус) PreloadAsync на 1–2 асети.

### Part C - Здача (5 хв)
1. Stop→Play двічі: екран з’являється і зникає.
2. **File → Save to Roblox** → \`Lesson 11.2 - Loading Screen\`.
3. У LMS познач практику завершеною.

### Критерій «зараховано»
- Є Title і змінний Status
- Екран ховається сам
- Немає вічного зависання
- Після hide гра доступна
- Place збережено`,
 hints: [
 "Спочатку UI і прості wait-етапи, потім Preload",
 "Якщо текст не видно - перевір Z-order і колір",
 "Force-close на 6–8 с рятує демо навіть при багу",
 ],
 optionalChallenge:
 "Додай смужку прогресу (Frame-grow по Width) синхронно з етапами статусу.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який номер уроку 11.2 у новій сітці?",
 options: [
          "82-й з 92",
          "96-й",
          "1-й",
          "40-й",
        ],
 correctAnswer: 0,
 explanation: "11.2 = урок 82.",
 },
 {
 id: "q2",
 type: MC,
 question: "Де логічно тримати LoadingGui?",
 options: [
          "У ServerStorage як єдиний варіант",
          "У StarterGui як ScreenGui",
          "У Terrain",
          "У DataStoreService",
        ],
 correctAnswer: 1,
 explanation: "Клієнтський UI зі StarterGui.",
 },
 {
 id: "q3",
 type: MC,
 question: "Який скрипт керує екраном завантаження гравця?",
 options: [
          "Лише ModuleScript у SSS без UI",
          "Тільки команда в Output",
          "LocalScript",
          "SoundService",
        ],
 correctAnswer: 2,
 explanation: "UI гравця = клієнт.",
 },
 {
 id: "q4",
 type: MC,
 question: "Навіщо текст Status з етапами?",
 options: [
          "Щоб замінити всю гру",
          "Це потрібно лише для Terrain",
          "Status заборонений у ScreenGui",
          "Щоб гравець розумів, що гра готується, а не зависла",
        ],
 correctAnswer: 3,
 explanation: "Пояснена пауза = кращий UX.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо TweenService при хованні loading?",
 options: [
          "Щоб збільшити Volume звуку",
          "М’яке зникнення замість різкого кліку",
          "Щоб створити RemoteEvent",
          "Це замінює Title",
        ],
 correctAnswer: 1,
 explanation: "Fade виглядає професійніше.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що робить ContentProvider:PreloadAsync?",
 options: [
          "Публікує гру в Public",
          "Чистить Explorer",
          "Просить клієнт заздалегідь підвантажити асети",
          "Створює Badge",
        ],
 correctAnswer: 2,
 explanation: "Попереднє завантаження ресурсів.",
 },
 {
 id: "q7",
 type: MC,
 question: "Чому потрібен таймаут force-close?",
 options: [
          "Щоб екран не завис навічно при помилці",
          "Щоб вимкнути Anchored",
          "Це обов’язок лише для Atmosphere",
          "Таймаут заборонений",
        ],
 correctAnswer: 0,
 explanation: "Безпека демо і гравця.",
 },
 {
 id: "q8",
 type: MC,
 question: "Який ResetOnSpawn часто логічний для LoadingGui?",
 options: [
          "Завжди true обов’язково",
          "Немає такої властивості",
          "Лише для Parts",
          "false - щоб не показувати loading на кожному респавні",
        ],
 correctAnswer: 3,
 explanation: "Інакше loading дратує після смерті.",
 },
 {
 id: "q9",
 type: MC,
 question: "Який наступний урок після 11.2?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (немає)",
          "11.3 - Sound + Particles + Atmosphere",
          "Модуль 1",
        ],
 correctAnswer: 2,
 explanation: "Loading → juice → opt/UX.",
 },
 {
 id: "q10",
 type: MC,
 question: "Яку назву Save пропонує урок?",
 options: [
          "Juice Pass",
          "Lesson 11.2 - Loading Screen",
          "Demo Ready",
          "Final GDD",
        ],
 correctAnswer: 1,
 explanation: "Здача loading-дня.",
 },
 {
 id: "q11",
 type: MC,
 question: "Чому DisplayOrder для LoadingGui ставлять високим?",
 options: [
          "Щоб прискорити DataStore",
          "Щоб вимкнути Lighting",
          "Це лише для Trail",
          "Щоб екран був поверх інших панелей",
        ],
 correctAnswer: 3,
 explanation: "Loading має перекрити HUD на старті.",
 },
 {
 id: "q12",
 type: MC,
 question: "Який орієнтир тривалості fade-out?",
 options: [
          "Близько 0.4–0.8 секунди",
          "Мінімум 10 секунд завжди",
          "0 секунд і тільки destroy світу",
          "Рівно 1 година",
        ],
 correctAnswer: 0,
 explanation: "Досить м’яко, не як фриз.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що покласти в Tip на loading?",
 options: [
          "Повний код усіх Scripts",
          "Нічого ніколи",
          "Одну коротку підказку першої дії",
          "Список усіх GamePass",
        ],
 correctAnswer: 2,
 explanation: "Короткий онбординг під час очікування.",
 },
 {
 id: "q14",
 type: MC,
 question: "Чи достатньо етапів з task.wait без Preload для здачі MVP?",
 options: [
          "Ні, без Preload урок неможливий",
          "Потрібен лише Publish",
          "Потрібен лише Terrain",
          "Так, якщо UI і hide працюють; Preload - бонус",
        ],
 correctAnswer: 3,
 explanation: "Спочатку надійний екран, потім ускладнення.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 11.2?",
 options: [
          "Порожній Baseplate",
          "LoadingGui з етапами, hide/tween, без вічного зависання + Save",
          "Лише теорія",
          "Public Publish без UI",
        ],
 correctAnswer: 1,
 explanation: "Потрібен робочий екран завантаження.",
 },
 ],
 },
}

export const ukLesson113 = {
 lessonId: "lesson-roblox-11-3",
 moduleId: "module-11",
 order: 3,
 title: "11.3 - Sound + Particles + Atmosphere",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Додати звукові шари: ambient, UI, ігровий процес на золотому шляху",
 "Підключити SFX до реальних подій (нагорода, клік, Prompt)",
 "Поставити точковий ParticleEmitter / Trail на вау-моменти",
 "Налаштувати Lighting/Atmosphere (і Bloom lite) під настрій сцени",
 "Не перевантажити шлях шумом і постійними ефектами",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 83 з 92)",
 content: `Сьогодні Place має **звучати і відчуватися**, не лише виглядати кубиками.

Три інструменти polish:
1. **Sound** - що чути на старті, кліку, нагороді.
2. **Particles / Trail** - короткий візуальний вау.
3. **Atmosphere / Lighting** - настрій світу (ранок, ніч, туман).

Працюй на своєму Place з модуля 11 (після чистого Explorer з 11.1 і loading з 11.2, якщо вже є). Усе чіпляй на **золотий шлях**: спавн → дія → нагорода.

**Правило дня:** краще 4 влучні ефекти, ніж 40 постійних шумових «прикрас».

**Зроби зараз (2 хв):** пройди шлях мовчки і запиши 3 моменти, де хочеться звуку або іскор.

Якщо здається, що «і так красиво» - усе одно додай feedback на нагороду. Без нього демо виглядає німим навіть при гарному Terrain. Запиши ці 3 моменти в нотатку - по них звірятимеш чекліст у кінці уроку.`,
 },
 {
 title: "Навіщо juice саме на події",
 content: `| Постійний шум/дим усюди | Точковий juice на події |
|-------------------------|-------------------------|
| Втомлює за хвилину | Запам’ятовується |
| Лагає слабкі ПК | Дешевше для FPS |
| Не зрозуміло, що важливо | Нагорода «клікає» в голові |

Juice = зворотний зв’язок. Гравець зробив дію → світ **відповів** звуком і короткою іскрою.

Якщо музика оркестру грає завжди на 1.0, а монета без звуку - пріоритети навпаки.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Три шари звуку",
 content: `| Шар | Гучність (орієнтир) | Приклади | Де живе |
|-----|---------------------|----------|---------|
| **Ambient** | 0.2–0.4 | Вітер, тихий гул хабу | SoundService або Part у хабі, Looped |
| **UI** | 0.45–0.7 | Клік кнопки, відкриття панелі | LocalScript біля GUI |
| **Gameplay** | 0.7–1.0 | Монета, квест done, фініш, удар | Script/LocalScript на подію |

Критичні сигнали (нагорода, помилка покупки) мають бути **голосніше** за ambient.

Папка для порядку (якщо ще немає):
\`ReplicatedStorage/Audio/\` або \`SoundService\` з іменами \`SFX_Coin\`, \`SFX_Click\`, \`AMB_Hub\`.

**Зроби зараз (4 хв):** онови HUD після зміни серверного значення без ручного підроблення на клієнті.`,
 },
 {
 title: "Як додати Sound у Studio (кроки)",
 content: `1. Вибери об’єкт (Part / SoundService) → Insert Object → **Sound**.
2. У Properties:
   - **SoundId** - rbxassetid з Toolbox (офіційні / дозволені звуки) або свій асет;
   - **Volume** - почни з 0.5 і крути;
   - **Looped** - true лише для ambient;
   - **RollOff** / MaxDistance - якщо звук у світі (3D).
3. Для UI-кліку часто зручніше Sound у \`SoundService\` і \`Play()\` з LocalScript.
4. Для нагороди на сервері - грай з Script після перевірки дії (або через Remote, якщо UI на клієнті).

Міні-приклад ідеї (локальний клік):
\`\`\`lua
local sound = game:GetService("SoundService"):WaitForChild("SFX_Click")
button.MouseButton1Click:Connect(function()
	sound:Play()
end)
\`\`\`

**Зроби зараз (10 хв):** постав 1 ambient (тихо) + 1 UI-клік + 1 SFX нагороди. Перевір у Play з нормальною гучністю Windows.`,
 },
 {
 title: "Баланс гучності і втома вух",
 content: `| Проблема | Фікс |
|----------|------|
| Усе на Volume 1 | Знизь ambient, лиш нагороду голосніше |
| Один і той самий звук 20 разів підряд | Інший Pitch трохи (0.95–1.05) або рідший тригер |
| Звук грає крізь усю карту | Зменши MaxDistance / RollOffMode |
| Страшний скрімер у дитячій грі | Заміни на м’який « ding / whoosh » |

Правило демо: викладач і батьки не мають здригатися від першого кліку.

Перевірка: навушники на середній гучності + 1 хвилина шляху. Якщо хочеться зняти навушники - ріж Volume.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "ParticleEmitter: коротко і по ділу",
 content: `**ParticleEmitter** - іскри / дим / блиск з Part.

Базові Properties, які чіпаєш сьогодні:
- **Rate** - скільки частинок (почни низько: 5–20);
- **Lifetime** - як довго живуть;
- **Speed / SpreadAngle** - напрямок;
- **Color / Size / Transparency** - вигляд;
- **Enabled** - увімк/вимк.

Для Demo Ready краще:
1. Emitter **вимкнений** за замовчуванням.
2. На події: \`Enabled = true\` на 0.4–1.5 с → знову false.
3. Або \`Emit(20)\` один раз (якщо вмієш цей метод у своїй версії API) / короткий імпульс.

Не став 5 Emitter з Rate 200 на весь хаб «для краси». Завтрашня оптимізація (11.4) тоді буде болем, і зараз уже лагатиме.

**Зроби зараз (8 хв):** один Part біля місця нагороди + ParticleEmitter, який спалахує лише коли гравець отримує нагороду (або тестова кнопка).`,
 },
 {
 title: "Trail (lite)",
 content: `**Trail** малює слід за рухомим об’єктом (часто Attachment0 / Attachment1 на Parts персонажа або снаряду).

Коли доречно:
- фінішна стрічка;
- слід меча / снаряду;
- «вау» після апгрейду на 1–2 с.

Коли не треба:
- постійний райдужний шлейф на кожному NPC у хабі;
- Trail на статичній підлозі (немає сенсу).

Якщо часу мало - **пропусти Trail**, зроби якісний Particle на нагороді. Краще один сильний момент, ніж три слабкі системи.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Atmosphere і Lighting під настрій",
 content: `Відкрий **Lighting** у Explorer.

Корисне на сьогодні:
| Властивість / об’єкт | Навіщо |
|----------------------|--------|
| **ClockTime** | День / вечір / ніч |
| **Ambient / OutdoorAmbient** | Загальний відтінок тіней |
| **Brightness** | Наскільки світло |
| **Atmosphere** (дочірній) | Туман, колір горизонту, щільність |
| **Bloom** (пост-ефект lite) | Легке світіння Neon (обережно з силою) |

Ідеї пресетів:
- **Яскравий аркадний хаб:** день, вищий Brightness, легкий Bloom.
- **Нічна вечірка:** ClockTime ~20–22, трохи Neon, не викручуй Bloom на максимум.
- **Туманний острів:** Atmosphere Density трохи вище, не «біла каша».

**Зроби зараз (7 хв):** зроби 2 пресети (день / настрій) і вмій перемкнути ClockTime вручну. Якщо вже є Party Mode з M1 - можеш підв’язати пізніше; сьогодні достатньо ручного пресета.`,
 },
 {
 title: "Золотий шлях: карта juice",
 content: `Заповни для свого Place:

| Крок шляху | Sound | Particle/Trail | Atmosphere/світло |
|------------|-------|----------------|-------------------|
| Спавн | тихий ambient | - | базовий пресет |
| Перша підказка / Prompt | UI click (опційно) | - | - |
| Головна дія | SFX дії | короткий імпульс (опційно) | - |
| Нагорода | гучний позитивний SFX | іскри 0.5–1 с | (опційно) спалах Neon |
| Помилка (немає монет) | короткий «ні» / soft buzz | - | - |

Мінімум для здачі уроку:
- ambient;
- 1 UI або gameplay click;
- 1 SFX нагороди;
- 1 particle-імпульс на нагороді;
- 1 свідомий Lighting/Atmosphere пресет.

**Зроби зараз (5 хв):** постав галочки в цій таблиці для свого шляху.`,
 },
 {
 title: "Організація і типові глюки",
 content: `| Глюк | Ймовірна причина | Фікс |
|------|------------------|------|
| Звуку не чути | Порожній SoundId / Volume 0 / не Play() | Перевір Id і виклик Play |
| Звук лише в Edit | Граєш не той режим / muted Windows | Play (F5), гучність ОС |
| Частинки завжди | Enabled = true постійно | Увімкни лише на подію |
| Мильна картинка | Bloom занадто сильний | Знизь Intensity/Size |
| Лаг біля ефекту | Rate завеликий | Rate ↓ або коротший час |

Імена: \`SFX_Reward\`, \`AMB_Hub\`, \`FX_RewardSpark\` - щоб у 11.4 / 11.5 швидко знаходити.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Зв’язок з 11.4 і 11.5",
 content: `| Сьогодні | Далі |
|----------|------|
| Точковий juice | 11.4 прибере зайве, якщо переборщив |
| Звуки на подіях | Demo Ready рубрика «є feedback» |
| Atmosphere пресет | Демо виглядає «як гра», не сірий Baseplate |

Якщо поставиш 20 Looped-звуків - завтра оптимізація з’їсть пів уроку. Став мало, але влучно.

Save: \`Lesson 11.3 - Juice Pass\`.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Чекліст здачі уроку 83",
 content: `- [ ] Є тихий ambient на хабі/старті
- [ ] Є SFX на UI або дії
- [ ] Є гучніший SFX нагороди
- [ ] Є particle-імпульс (не вічний фонтан)
- [ ] Lighting/Atmosphere свідомо налаштовані (не дефолт «як вийшло»)
- [ ] На золотому шляху ефекти не ріжуть вуха і не січуть FPS сильно
- [ ] Імена звуків/FX читабельні в Explorer
- [ ] Save: \`Lesson 11.3 - Juice Pass\`

Далі **11.4** підчистить лаги й UX; **11.5** збере все в Demo Ready.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Усі звуки Volume = 1 і Looped",
 explanation: "Вуха і увага вмирають за хвилину.",
 correctApproach: "Ambient тихо, нагорода голосніше, Looped лише де треба.",
 },
 {
 mistake: "ParticleEmitter завжди Enabled на всьому хабі",
 explanation: "Лаг + візуальний шум.",
 correctApproach: "Короткий імпульс на подію нагороди.",
 },
 {
 mistake: "Bloom на максимумі «бо кіно»",
 explanation: "Мильна картинка, важко читати UI.",
 correctApproach: "Легкий Bloom або без нього.",
 },
 {
 mistake: "Звук є в Toolbox, але Play() ніде не викликається",
 explanation: "У грі тиша.",
 correctApproach: "Підвісь Play() на клік / нагороду / Prompt.",
 },
 {
 mistake: "Страшні/різкі звуки в дитячій грі",
 explanation: "Ламкий досвід на демо з батьками.",
 correctApproach: "М’які позитивні SFX.",
 },
 ],
 summary:
 "Ти зібрав juice-прохід: шари звуку, точкову частинку на нагороді та Atmosphere/Lighting під настрій. Урок 83 робить золотий шлях відчутним перед оптимізацією й Demo Ready.",
 practiceTask: {
 title: "Практика: juice на золотому шляху (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** шлях зі звуком, коротким VFX і настроєм освітлення.

### Part A - Sound (12 хв)
1. Ambient тихо (Looped).
2. UI/дії click.
3. SFX нагороди голосніше.
4. Перевір гучність у Play.

### Part B - Particles + Atmosphere (12 хв)
1. Particle імпульс на нагороді (не вічний).
2. (Опційно) короткий Trail на один об’єкт.
3. Налаштуй ClockTime + Atmosphere (і Bloom lite обережно).

### Part C - Здача (6 хв)
1. Пройди золотий шлях 2 рази.
2. Заповни таблицю «крок → ефект».
3. **File → Save to Roblox** → \`Lesson 11.3 - Juice Pass\`.
4. У LMS познач практику завершеною.

### Критерій «зараховано»
- ≥3 звукові ролі (ambient/UI/reward)
- ≥1 particle на події
- ≥1 свідомий Lighting/Atmosphere пресет
- Шлях не ріже вуха
- Place збережено`,
 hints: [
 "Спочатку нагорода, потім прикраси хабу",
 "Якщо лагає біля ефекту - ріж Rate, не додавай ще Emitter",
 "Імена SFX_/AMB_/FX_ допоможуть завтра в 11.4",
 ],
 optionalChallenge:
 "Зроби перемикач день/ніч (кнопка або Part) зі зміною ClockTime + інший ambient.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який номер уроку 11.3 у новій сітці?",
 options: [
          "83-й з 92",
          "96-й",
          "1-й",
          "50-й",
        ],
 correctAnswer: 0,
 explanation: "11.3 = урок 83.",
 },
 {
 id: "q2",
 type: MC,
 question: "Який звук логічно робити найгучнішим?",
 options: [
          "Завжди лише ambient на 1.0",
          "Сигнал нагороди / важливої події",
          "Тиша замість усіх SFX",
          "Тільки звук у Edit без Play",
        ],
 correctAnswer: 1,
 explanation: "Критичні сигнали голосніші за атмосферу.",
 },
 {
 id: "q3",
 type: MC,
 question: "Для чого Looped найчастіше?",
 options: [
          "Обов’язково кожен клік UI",
          "Лише для ParticleEmitter",
          "Ambient / фоновий гул",
          "Замість SoundId",
        ],
 correctAnswer: 2,
 explanation: "Луп для фону, не для кожної нагороди.",
 },
 {
 id: "q4",
 type: MC,
 question: "Чому particle краще вмикати коротко на події?",
 options: [
          "Бо ParticleEmitter інакше не існує",
          "Бо Atmosphere тоді ламається",
          "Бо SoundId так вимагає",
          "Менше лагу і сильніший вау",
        ],
 correctAnswer: 3,
 explanation: "Точковий juice > вічний фонтан.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що налаштовує ClockTime?",
 options: [
          "Ціну GamePass",
          "Час доби в освітленні сцени",
          "Розмір Baseplate Part",
          "Ім’я RemoteEvent",
        ],
 correctAnswer: 1,
 explanation: "День/ніч через Lighting.",
 },
 {
 id: "q6",
 type: MC,
 question: "Навіщо Atmosphere в Lighting?",
 options: [
          "Збереження DataStore",
          "Створення Script",
          "Туман / колір повітря / глибина горизонту",
          "Видалення UI",
        ],
 correctAnswer: 2,
 explanation: "Настрій повітря сцени.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що небезпечного в сильному Bloom?",
 options: [
          "Мильна картинка і гірша читабельність UI",
          "Він завжди підвищує FPS",
          "Він вимикає Sound",
          "Він обов’язковий для Publish",
        ],
 correctAnswer: 0,
 explanation: "Легкий Bloom або без нього.",
 },
 {
 id: "q8",
 type: MC,
 question: "Який наступний урок після 11.3?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (немає)",
          "Модуль 1",
          "11.4 - Оптимізація + UX",
        ],
 correctAnswer: 3,
 explanation: "Juice → opt/UX → Demo Ready.",
 },
 {
 id: "q9",
 type: MC,
 question: "Де логічно тримати набір SFX?",
 options: [
          "Випадково в ServerStorage без імен",
          "Тільки в описі гри",
          "SoundService або ReplicatedStorage/Audio з ясними іменами",
          "У Terrain Material",
        ],
 correctAnswer: 2,
 explanation: "Порядок = швидший polish далі.",
 },
 {
 id: "q10",
 type: MC,
 question: "Яку назву Save пропонує урок?",
 options: [
          "Demo Ready",
          "Lesson 11.3 - Juice Pass",
          "Final GDD",
          "SHOWCASE DAY",
        ],
 correctAnswer: 1,
 explanation: "Здача juice-проходу.",
 },
 {
 id: "q11",
 type: MC,
 question: "Що робити, якщо звуку не чути в Play?",
 options: [
          "Одразу видалити Lighting",
          "Увімкнути Streaming як єдиний фікс",
          "Ігнорувати до модуля 12",
          "Перевірити SoundId, Volume і чи викликається Play()",
        ],
 correctAnswer: 3,
 explanation: "Типова діагностика Sound.",
 },
 {
 id: "q12",
 type: MC,
 question: "Навіщо трохи міняти Pitch повторюваного SFX?",
 options: [
          "Щоб вухо менше втомлювалось від копіпасти",
          "Щоб вимкнути Anchored",
          "Це замінює ParticleEmitter",
          "Pitch заборонений у Roblox",
        ],
 correctAnswer: 0,
 explanation: "Анти-втома від повтору.",
 },
 {
 id: "q13",
 type: MC,
 question: "Коли Trail доречний у цьому уроці?",
 options: [
          "Обов’язково на кожній підлозі",
          "Замість усіх Sound",
          "Короткий слід на рухомому вау-об’єкті, не на всьому хабі",
          "Лише в DataStore",
        ],
 correctAnswer: 2,
 explanation: "Lite-опція, не обов’язок.",
 },
 {
 id: "q14",
 type: MC,
 question: "Який мінімум juice для здачі?",
 options: [
          "Лише одне небо без звуку",
          "20 Looped треків",
          "Тільки Bloom на максимумі",
          "Ambient + UI/дії SFX + reward SFX + particle імпульс + Lighting пресет",
        ],
 correctAnswer: 3,
 explanation: "Баланс шарів і точковий VFX.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 11.3?",
 options: [
          "Порожній Baseplate",
          "Золотий шлях зі звуками, точковим VFX, настроєм освітлення і Save Juice Pass",
          "Лише теорія без Studio",
          "Publish Public без ефектів",
        ],
 correctAnswer: 1,
 explanation: "Потрібен відчутний juice на маршруті.",
 },
 ],
 },
}

export const ukLesson114 = {
 lessonId: "lesson-roblox-11-4",
 moduleId: "module-11",
 order: 4,
 title: "11.4 - Оптимізація + UX",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Знайти типові причини лагів: зайві Parts, VFX-спам, важкі цикли",
 "Зробити простий прохід оптимізації на золотому шляху",
 "Покращити UX: читабельний UI, контраст, зрозумілий старт",
 "Знати, що таке StreamingEnabled і коли про нього згадати",
 "Підготувати Place до Demo Ready (11.5) без «красиво, але гальмує»",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 84 з 92)",
 content: `Сьогодні два боки однієї медалі:

1. **Оптимізація** - гра не заїкається на золотому шляху.
2. **UX** - гравець розуміє, що робити, і читає UI.

Красиві частинки з 11.3 марні, якщо телефон гріється і кнопка мікроскопічна. І навпаки: ідеальний FPS з порожнім онбордингом теж не Demo Ready.

Працюй на **своєму** Place (той, що піде в 11.5–11.6). Не починай новий світ.

**Зроби зараз (2 хв):** увімкни Play, пройди 60 с золотого шляху й чесно напиши: «лагає? де? / незрозуміло? де?»

Якщо здається, що «і так норм» - все одно знайди хоч одну дрібницю: зайвий Looped-звук, дрібний текст, зайвий Emitter. Урок зараховується за конкретну зміну, не за відчуття «нічого робити».`,
 },
 {
 title: "Чому оптимізація і UX разом",
 content: `| Тільки FPS | Тільки «гарний UI» | Разом |
|------------|--------------------|-------|
| Швидко, але гравець застряг | Гарно, але лаг | Швидко і зрозуміло |
| «Технічно ок» | «Виглядає ок» | Готово до демо |

Гравці рідко кажуть «у тебе 12 draw calls». Вони кажуть «тормозить» або «не зрозумів». Обидва вердикти = вихід з гри.

Сьогоднішній стандарт: на золотому шляху **немає сильного лагу** і **є зрозумілий наступний крок**.

**Зроби зараз (4 хв):** знайди один зайвий Part/скрипт і прибери або обґрунтуй, чому лишається.`,
 },
 {
 title: "Де шукати лаги (чесний чекліст)",
 content: `| Підозра | Як перевірити | Що часто допомагає |
|---------|----------------|--------------------|
| Тисячі дрібних Parts-декору | Політай камерою, глянь Explorer | З’єднати в Model / менше деталей / Mesh |
| Купа ParticleEmitter завжди On | Підійди до зони ефектів | Еміт лише на подію, коротко |
| Багато звуків Looped на повну | Послухай + гучність | Менше лупів, тихіше |
| \`while true\` без wait / кожен кадр важка робота | Output + відчуття FPS | Події (Touched/Changed), \`task.wait\` |
| Величезний світ одразу | Далеко від спавну все «важке» | Streaming (див. далі), ділити зони |

Не оптимізуй наосліп увесь Place годину. Спочатку знайди **одне** вузьке місце на золотому шляху.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Прохід оптимізації на 20–25 хвилин",
 content: `1. **Зафіксуй маршрут:** спавн → дія → нагорода (той самий, що для демо).
2. **Програй 2 рази** і познач місця «тупить».
3. У зоні лагу відкрий Explorer: скільки Emitter / Parts / Lights?
4. Зменши або вимкни зайве (Disabled / менший Rate / прибери дублікати).
5. Знайди підозрілі Scripts з циклами; додай \`task.wait\` або перенеси на подію.
6. Програй маршрут знову. Стало краще? Запиши «до/після» одним рядком.

Правило: **оптимізуй те, що гравець відчуває**, не абстрактну «ідеальну архітектуру».

**Зроби зараз (12 хв):** зроби один такий прохід. Мінімум одна конкретна зміна з вимірюваним ефектом («було січення біля фонтана → прибрав 3 Emitter»).

Додаткові швидкі перемоги:
- вимкни \`CastShadow\` на дрібному декорі, який ніхто не помічає;
- зменши \`Rate\` у ParticleEmitter у 2–3 рази замість повного видалення;
- перевір, чи немає дублікатів одного й того ж Script у двох папках (подвійна логіка = подвійне навантаження).
- у Lighting прибери зайві Bloom/Blur на максимумі, якщо картинка «мильна» і важка.

Не треба заміряти FPS професійним софтом. Достатньо відчуття: «було січе → стало їхати» + нотатка що змінив.`,
 },
 {
 title: "StreamingEnabled - коротко і по суті",
 content: `**StreamingEnabled** (у Workspace / налаштуваннях досвіду) каже Roblox підвантажувати світ **поблизу гравця**, а не весь Remodel одразу.

Коли згадувати:
- велика карта, багато зон;
- слабкі пристрої;
- далекий декор «на горизонті».

Коли не панікувати:
- маленький хаб / одна арена;
- ти ще не розумієш баги стрімінгу (об’єкти з’являються пізніше).

Для уроку достатньо:
1. Знати назву і навіщо.
2. Якщо карта велика - спробувати увімкнути й перевірити золотий шлях.
3. Якщо щось «зникає / з’являється дивно» - записати в нотатки й узгодити з викладачем.

Не роби Streaming «магічною кнопкою замість прибрати 5000 Parts».

**Зроби зараз (4 хв):** знайди один зайвий Part/скрипт і прибери або обґрунтуй, чому лишається.`,
 },
 {
 title: "Скрипти: дорогі звички",
 content: `| Погано | Краще |
|--------|--------|
| \`while true do\` важка робота без паузи | \`task.wait(0.1)\` або рідше |
| Копія логіки на кожній монеті окремим Script | Один скрипт + CollectionService / папка |
| Перевірка кожної Part у Workspace щосекунди | Подія Touched / Prompt / Changed |
| Нескінченний спавн ефектів | Один ефект на подію + Destroy/після часу |

Ти не мусиш сьогодні переписувати весь курс. Знайди **1** явний важкий цикл або спам Clone і полегши його.

Якщо не вмієш безпечно чіпати чужий код - спочатку ріж VFX/Parts. Це теж оптимізація.

**Зроби зараз (4 хв):** знайди один зайвий Part/скрипт і прибери або обґрунтуй, чому лишається.`,
 },
 {
 title: "UX: гравець завжди має наступний крок",
 content: `UX тут = **зрозумілість**, не «модний дизайн».

Запитання кожні 10–15 с шляху:
1. Чи я розумію, що робити зараз?
2. Чи бачу ціль (маркер/табличка/Prompt)?
3. Чи отримав зворотний зв’язок на дію (звук/UI/ефект)?

Якщо на будь-яке «ні» довше ~30 с - це UX-дірка. Її треба закрити **до** Demo Ready.

Мінімальні фікси:
- табличка на спавні (1–2 речення);
- ActionText на ProximityPrompt;
- підсвітка першої зони (Neon / Highlight);
- повідомлення «+монети» / «куплено».

**Зроби зараз (3 хв):** підійди до Prompt у Play і підтверди Triggered один раз.`,
 },
 {
 title: "UI: читабельність і контроль",
 content: `| Перевір | Ціль |
|---------|------|
| Розмір тексту | Не мікроскопічний на основних підписах |
| Контраст | Світлий текст на темній панелі (або навпаки) |
| Кнопки | Достатньо великі, щоб влучити мишею/пальцем |
| Колір | Не лише червоний/зелений без іконки/тексту |
| Спам панелей | 1–2 головні елементи на демо, не 8 вікон |

**Зроби зараз (8 хв):** зменш вікно Studio (імітація малого екрана) і пройди HUD. Якщо не читається - збільш текст / спростіть панель.

Додатково (lite): якщо є сильне тремтіння камери / спалахи - зроби слабшими або вимкни на демо. Це теж UX для чутливих гравців.

Типові UX-помилки на цьому етапі курсу:
1. Кнопка є, але зливається з фоном.
2. Prompt є, але ActionText порожній або англійською без сенсу для класу.
3. Підказка є, але стоїть спиною до спавну - гравець її не бачить.
4. Після покупки тиша: не зрозуміло, чи спрацювало.

Кожну з цих дір можна закрити за 5–10 хвилин. Саме такі фікси завтра полюблять пункти рубрики Demo Ready.`,
 },
 {
 title: "Онбординг за 60 секунд (зв’язок з оптимізацією)",
 content: `Поганий онбординг змушує гравця блукати всією картою → більше промальовки → більше лагу + більше злості.

Тому UX і FPS дружать:
1. Ясна ціль біля спавну.
2. Короткий шлях до першої нагороди.
3. Важкі ефекти - **на нагороді**, не на порожньому блуканні.

Приклад: не вмикай 10 Emitter на всьому хабі завжди. Увімкни феєрверк на «квест виконано» на 1–2 с.

**Зроби зараз (6 хв):** скороти шлях до першої нагороди (ближчий збір / слабший перший етап / яскравіша стрілка).`,
 },
 {
 title: "Міні-рубрика уроку (самоперевірка)",
 content: `| # | Питання | Так/ні |
|---|---------|--------|
| 1 | На золотому шляху немає сильного січення | |
| 2 | Прибрав хоч один явний важкий ефект/декор/цикл | |
| 3 | Знаю, що таке StreamingEnabled | |
| 4 | На спавні зрозуміло, що робити | |
| 5 | UI основних підписів читається | |
| 6 | Нагорода дає зворотний зв’язок | |
| 7 | Output без червоного на маршруті | |
| 8 | Готовий нести цей Place в 11.5 | |

Мета: якомога більше **так**. Усе «ні» - список фіксів до кінця практики.

**Зроби зараз (4 хв):** знайди один зайвий Part/скрипт і прибери або обґрунтуй, чому лишається.`,
 },
 {
 title: "Що НЕ робити сьогодні",
 content: `- Переписувати всю архітектуру «ідеально».
- Вмикати Streaming і ігнорувати нові баги без нотатки.
- Додавати ще 50 декоративних Parts «для краси».
- Робити повний редизайн UI з нуля на 3 години.
- Publish Public.

Сьогодні = **полегшити + прояснити** золотий шлях. Глибший Demo Ready - завтра (11.5), сліпий тест - після нього.

**Зроби зараз (2 хв):** прибери з маршруту здачі все, що виходить за межі цього уроку.`,
 },
 {
 title: "Чекліст здачі уроку 84",
 content: `- [ ] Є нотатка «де лагало / що змінив»
- [ ] Золотий шлях грається плавніше або без явного січення
- [ ] Є мінімум 1 UX-фікс старту або UI
- [ ] Нагорода має зворотний зв’язок
- [ ] Розумієш StreamingEnabled на рівні «навіщо»
- [ ] Output чистий на маршруті
- [ ] Save: \`Lesson 11.4 - Opt and UX\`

Далі **11.5 Demo Ready** збере це в рубрику з 15 пунктів.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 {
 title: "Приклад короткого звіту викладачу (30–40 с)",
 content: `На кінець пари вмій сказати так:

*«На шляху біля фонтана сікло - прибрав 3 постійні Emitter, ефект лишив лише на нагороді. На спавні додав табличку і збільшив текст HUD. Streaming знаю: для великої карти можна вмикати, у мене хаб малий - не чіпав. Output на маршруті чистий.»*

Це і є доказ уроку: не «я подумав про оптимізацію», а **що змінив**.

Якщо викладач спитає «що з UX?» - відповідай конкретно: який текст збільшив, яку табличку додав, який Prompt підписав. Загальні слова «покращив інтерфейс» без прикладу не рахуються.

**Зроби зараз (4 хв):** знайди один зайвий Part/скрипт і прибери або обґрунтуй, чому лишається.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Додаєш ще більше VFX, щоб «вилікувати» лаг красою",
 explanation: "Стає гірше.",
 correctApproach: "Спочатку прибери/скороти ефекти, потім точковий вау на нагороді.",
 },
 {
 mistake: "Оптимізуєш далекий декор, ігноруючи лаг на спавні",
 explanation: "Гравець страждає саме на золотому шляху.",
 correctApproach: "Оптимізуй маршрут демо першим.",
 },
 {
 mistake: "Мікроскопічний UI «бо мені видно»",
 explanation: "На демо/телефоні нічого не читається.",
 correctApproach: "Перевір у малому вікні, збільш ключовий текст.",
 },
 {
 mistake: "Немає онбордингу, зате ідеальний FPS",
 explanation: "Швидка гра, у якій неясно що робити.",
 correctApproach: "Табличка/Prompt + орієнтир обов’язкові.",
 },
 {
 mistake: "while-true важкий цикл без паузи",
 explanation: "Класичний вбивця FPS.",
 correctApproach: "task.wait або події замість постійного опитування.",
 },
 ],
 summary:
 "Ти полегшив золотий шлях (оптимізація) і прояснив його для гравця (UX): менше лагу, зрозуміліший старт і читабельний UI. Урок 84 готовий до Demo Ready в 11.5.",
 practiceTask: {
 title: "Практика: opt + UX прохід (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** золотий шлях без сильного лагу + зрозумілий старт/UI + **вимірюваний** до/після.

### Part A - Оптимізація з заміром (12 хв)
1. Пройди шлях на «слабому» режимі: звузь вікно Studio або (краще) глянь на телефоні/планшеті викладача / Device Emulator.
2. Запиши 1 рядок «до»: де січе / що дратує.
3. Прибери/послаб 1–3 важкі речі (Emitter, Looped Sound, декор, цикл).
4. Той самий шлях «після» - 1 рядок у нотатці (має відрізнятись).

### Part B - UX (12 хв)
1. Онбординг на спавні.
2. UI в малому вікні.
3. Feedback нагороди (звук/текст/ефект).

### Part C - Здача (6 хв)
1. Саморубрика 8 пунктів.
2. Покажи викладачу пару речень до/після вголос (30 с).
3. Save \`Lesson 11.4 - Opt and UX\`.

### Критерій «зараховано»
- Є конкретна opt-зміна + рядок до/після
- Є UX-фікс
- Золотий шлях стабільніший/ясніший
- Place збережено`,
 hints: [
 "Починай з місця, де гравець реально ходить",
 "Один гучний Looped Sound часто ламає і вуха, і увагу",
 "Якщо «і так норм» - все одно знайди 1 дрібницю й виміряй",
 ],
 optionalChallenge:
 "Увімкни StreamingEnabled на великій карті, пройди шлях і запиши 2 спостереження (що покращилось / що дивне).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який номер уроку 11.4 у новій сітці?",
 options: [
          "84-й з 92",
          "96-й",
          "1-й",
          "40-й",
        ],
 correctAnswer: 0,
 explanation: "11.4 = урок 84.",
 },
 {
 id: "q2",
 type: MC,
 question: "Чому оптимізація і UX на одному уроці?",
 options: [
          "UX замінює Scripts",
          "Гра має бути і плавною, і зрозумілою на одному шляху",
          "Оптимізація потрібна лише для іконок",
          "Це випадковість",
        ],
 correctAnswer: 1,
 explanation: "Обидва впливають на те, чи залишаться гравці.",
 },
 {
 id: "q3",
 type: MC,
 question: "З чого починати оптимізацію?",
 options: [
          "З випадкового далекого декору без перевірки",
          "З Publish Public",
          "З місць лагу на золотому шляху",
          "З видалення всього UI",
        ],
 correctAnswer: 2,
 explanation: "Спочатку те, що відчуває гравець.",
 },
 {
 id: "q4",
 type: MC,
 question: "Що часто дає лаг у красивих сценах?",
 options: [
          "Один Anchored Part",
          "Один print у Output",
          "Назва Place",
          "Багато постійних ParticleEmitter / важкий декор / важкі цикли",
        ],
 correctAnswer: 3,
 explanation: "Спам ефектів і важка логіка.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо StreamingEnabled?",
 options: [
          "Замінити DataStore",
          "Підвантажувати світ біля гравця на великих картах",
          "Вимкнути звук",
          "Створити Badge",
        ],
 correctAnswer: 1,
 explanation: "Стрімінг карти, не магія для всього.",
 },
 {
 id: "q6",
 type: MC,
 question: "Що краще за важкий while true без паузи?",
 options: [
          "Ще швидший while без wait",
          "Видалити Workspace",
          "Події або цикл з task.wait",
          "Тільки LocalScript на кожному кадрі з важкою роботою без сенсу",
        ],
 correctAnswer: 2,
 explanation: "Не їж CPU постійно.",
 },
 {
 id: "q7",
 type: MC,
 question: "Який мінімальний UX на спавні?",
 options: [
          "Зрозумілий наступний крок: табличка / маркер / Prompt",
          "Повна відсутність підказок завжди краща",
          "Лише 10 панелей налаштувань",
          "Тільки Atmosphere без світу",
        ],
 correctAnswer: 0,
 explanation: "Онбординг = частина UX.",
 },
 {
 id: "q8",
 type: MC,
 question: "Як перевірити читабельність UI швидко?",
 options: [
          "Ніколи не дивитись на UI",
          "Видалити весь текст",
          "Писати лише білим по білому",
          "Зменшити вікно / глянути як на малому екрані",
        ],
 correctAnswer: 3,
 explanation: "Маленький екран одразу показує проблеми.",
 },
 {
 id: "q9",
 type: MC,
 question: "Який наступний урок після 11.4?",
 options: [
          "12.6 SHOWCASE",
          "11.7 (немає в новій сітці)",
          "11.5 - Demo Ready",
          "Модуль 1",
        ],
 correctAnswer: 2,
 explanation: "Opt/UX → Demo Ready → сліпий тест.",
 },
 {
 id: "q10",
 type: MC,
 question: "Чому важкі ефекти краще на нагороді, а не на всьому хабі?",
 options: [
          "Бо Roblox забороняє ефекти в хабі",
          "Менше лагу в блуканні + сильніший вау в моменті",
          "Бо ParticleEmitter не працює на подіях",
          "Це лише для іконки",
        ],
 correctAnswer: 1,
 explanation: "Точковий juice дешевший і ефективніший.",
 },
 {
 id: "q11",
 type: MC,
 question: "Яку назву Save пропонує урок?",
 options: [
          "Demo Ready",
          "SHOWCASE DAY",
          "Final GDD",
          "Lesson 11.4 - Opt and UX",
        ],
 correctAnswer: 3,
 explanation: "Здача саме цього дня.",
 },
 {
 id: "q12",
 type: MC,
 question: "Що не варто робити сьогодні?",
 options: [
          "Повний редизайн усього UI на 3 години замість шляху",
          "Прибрати зайвий Emitter",
          "Додати табличку на спавні",
          "Перевірити Output",
        ],
 correctAnswer: 0,
 explanation: "Фокус на золотому шляху.",
 },
 {
 id: "q13",
 type: MC,
 question: "Навіщо зворотний зв’язок на нагороду?",
 options: [
          "Це замінює оптимізацію",
          "Це вимикає Streaming",
          "Гравець розуміє, що дія спрацювала",
          "Потрібно лише для Terrain",
        ],
 correctAnswer: 2,
 explanation: "UX-feedback обов’язковий.",
 },
 {
 id: "q14",
 type: MC,
 question: "Якщо карта маленька, StreamingEnabled…",
 options: [
          "Обов’язковий завжди інакше гра не стартує",
          "Замінює всі Scripts",
          "Видаляє UI",
          "Не завжди критичний; спочатку прибери сміття на шляху",
        ],
 correctAnswer: 3,
 explanation: "Інструмент за потребою.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 11.4?",
 options: [
          "Лише теорія без змін у Studio",
          "Place з помітною opt-зміною + UX-фіксом на шляху і Save",
          "Порожній Baseplate",
          "Publish без перевірки",
        ],
 correctAnswer: 1,
 explanation: "Потрібні конкретні правки в білді.",
 },
 ],
 },
}

export const ukLesson115 = {
 lessonId: "lesson-roblox-11-5",
 moduleId: "module-11",
 order: 5,
 title: "11.5 - Demo Ready",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Обрати один жанровий Place і довести його до стану Demo Ready",
 "Пройти рубрику з ~15 пунктів по золотому шляху",
 "Закрити дірки онбордингу, UI, звуку й стабільності перед сліпим тестом",
 "Підготувати 60–90 с демо-маршрут для показу",
 "Зберегти Place як базу для завтрашнього сліпого playtest (11.6)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 85 з 92)",
 content: `**Demo Ready** = гру вже можна показати за 1–2 хвилини без виправдань «зараз підкажу».

Ти вже робив у модулі 11:
- **11.1** порядок у Explorer;
- **11.2** loading (якщо є);
- **11.3** звук / частинки / атмосфера;
- **11.4** оптимізація + UX-база.

Сьогодні не починаєш новий жанр з нуля. Сьогодні береш **один** свій найкращий Place (obby / sim / хаб / арена / тайкун-шматок…) і доводиш його рубрикою з **~15 пунктів**.

Завтра (**11.6**) цей самий Place піде на сліпий playtest. Якщо сьогодні «майже» - завтра тестер потоне.

Відкрий обраний Place і тримай аркуш рубрики поруч.

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Що означає Demo Ready (і що ні)",
 content: `| Demo Ready | Ще НЕ Demo Ready |
|------------|------------------|
| Золотий шлях проходить без суфлера | «Я знаю куди бігти, новачок - ні» |
| Є старт, дія, нагорода | Красивий хаб без циклу |
| Output чистий на маршруті | Червоні помилки «ігноруємо» |
| 60–90 с демо можна провести | 10 хв пояснень замість гри |
| Чесний обсяг | Обіцянки фіч, яких немає |

Demo Ready **не** означає «ідеальна гра на рік». Означає: **короткий повний досвід** уже зібраний і виглядає свідомо.

**Зроби зараз (3 хв):** напиши одним реченням, який Place обираєш і який у нього золотий шлях (спавн → … → нагорода).`,
 },
 {
 title: "Обери один Place - не три «майже»",
 content: `Правило уроку: **один** кандидат.

Як вибрати:
1. У якому Place найстабільніший основний цикл?
2. Де вже є хоч якийсь polish з 11.1–11.4?
3. Що реально показати за 90 с?

Не клеїй сьогодні obby + sim + арену «бо прикольно». Це робота модуля 12 (збірка фіналки). Сьогодні - **глибина одного жанру**.

Якщо сумніваєшся між двома - бери той, де менше P0. Красу можна додати; блокер - ні.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Золотий шлях Demo Ready (зафіксуй на папері)",
 content: `Запиши 5–7 кроків **до** правок:

1. Спавн / після loading.
2. Гравець розуміє ціль (табличка / маркер / Prompt).
3. Йде до головної дії.
4. Робить дію.
5. Бачить/чує нагороду.
6. (Опційно) повтор або наступний крок.
7. Немає soft-lock.

Цей список = і рубрика, і завтрашній маршрут для тестера, і заготовка демо.

**Зроби зараз (5 хв):** намалюй стрілки. Якщо не можеш - Place ще не готовий до рубрики, спочатку допиши цикл.`,
 },
 {
 title: "Рубрика Demo Ready (~15 пунктів)",
 content: `Став **так / ні / майже**. Мета сьогодні: якомога більше **так** на золотому шляху. «Майже» = конкретний фікс у баг-нотатці.

### A. Старт і зрозумілість (1–4)
| # | Пункт | Так? |
|---|-------|------|
| 1 | Спавн працює, персонаж не падає в пустоту | |
| 2 | За ≤30–60 с зрозуміло, що робити | |
| 3 | Є видимий орієнтир (табличка / світло / NPC / стрілка) | |
| 4 | Перша дія очевидна (Prompt / кнопка / зона) | |

### B. Цикл і нагорода (5–8)
| # | Пункт | Так? |
|---|-------|------|
| 5 | Головна дія дає результат | |
| 6 | Нагорода помітна (UI / звук / ефект / предмет) | |
| 7 | Можна повторити цикл або піти далі | |
| 8 | Поразка/смерть (якщо є) не ламає гру назавжди | |

### C. Polish модуля 11 (9–12)
| # | Пункт | Так? |
|---|-------|------|
| 9 | Explorer читається (папки/імена з 11.1) | |
| 10 | Loading не блокує вічно / або його свідомо немає | |
| 11 | На шляху є ≥1 осмислений SFX або VFX (11.3) | |
| 12 | Немає жахливого лагу / спаму звуком на маршруті (11.4) | |

### D. Стабільність і демо (13–15)
| # | Пункт | Так? |
|---|-------|------|
| 13 | Output без червоного на золотому шляху | |
| 14 | UI читається (контраст, розмір) | |
| 15 | Можу провести демо 60–90 с без «зараз поясню» | |

**Зроби зараз (8 хв):** простав галочки чесно в Play. Усе «ні» = список фіксів на Part B практики.`,
 },
 {
 title: "Як закривати пункти швидко (типові фікси)",
 content: `| Пункт червоний | Швидкий хід |
|----------------|-------------|
| 2–4 онбординг | Табличка + Neon-орієнтир + ActionText на Prompt |
| 5–6 нагорода | Звук успіху + TextLabel «+10» / частинка |
| 8 респавн | Перевір SpawnLocation / checkpoint |
| 9 Explorer | 10 хв імен і Folders, не ідеал на рік |
| 11 juice | 1 Sound на нагороду + 1 ParticleEmitter |
| 13 Output | Відкрий Output, відтвори шлях, лагодь перший червоний |
| 14 UI | Більший текст, темна панель / світлий текст |
| 15 демо | Вирежи зайві зупинки; лиши 1 вау-момент |

Не починай новий квест на 20 етапів. Demo Ready любить **короткі перемоги**.

**Зроби зараз (3 хв):** знайди в Place один симптом з таблиці і виправ або підтверди, що його немає.`,
 },
 {
 title: "Чекліст онбордингу на спавні (обов’язковий мінімум)",
 content: `Після спавну гравець має побачити хоча б одне з:
- табличку з 1–2 реченнями;
- яскравий маркер цілі;
- NPC з ProximityPrompt і зрозумілим ActionText;
- стрілку / Highlight на перший об’єкт.

Текст таблички - як для друга:
*«1) Підійди до жовтої зони. 2) Натисни E. 3) Збери 3 монети.»*

Уникай роману на 15 рядків. Уникай сленгу без пояснення («прокинь івент»).

**Зроби зараз (6 хв):** постав/онови табличку й перевір з камери новачка (відійди від спавну і підійди знову очима).`,
 },
 {
 title: "UI на демо: що має читатись",
 content: `| Елемент | Мінімум |
|---------|---------|
| Монети / рахунок | Видно завжди або після першої нагороди |
| Кнопка магазину / квесту | Достатньо велика, щоб влучити |
| Повідомлення помилки | «Недостатньо монет», не тиша |
| Мобільний/маленьке вікно | Хоча б зменш Studio-вікно і глянь |

Якщо HUD порожній весь демо - глядач не розуміє прогресу. Якщо HUD кричить 8 панелей одразу - теж погано. Для Demo Ready достатньо **1–2 головних числа/кнопки**.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Підготуй сценарій демо 60–90 секунд",
 content: `Запиши на шпаргалку:

| Сек | Що робиш / кажеш |
|-----|------------------|
| 0–10 | «Це [жанр]: гравець [дія], щоб [нагорода].» |
| 10–20 | Спавн + показати табличку |
| 20–50 | Головна дія live |
| 50–70 | Нагорода + 1 polish (звук/VFX) |
| 70–90 | «Далі на 11.6 - сліпий тест» / коротка пауза |

Репетиція: **2 рази** з таймером. Якщо не вкладаєшся - ріж слова, не ріж дію.

Це м’яз для SHOWCASE в модулі 12, тільки коротший формат.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Що свідомо НЕ робити сьогодні",
 content: `- Новий жанр «з нуля за годину».
- Три Place паралельно.
- Повний рефактор усіх Scripts «бо красиво».
- Publish Public (це модуль 12).
- Довгий трейлер замість робочого шляху.

Сьогоднішнє завдання вузьке: **рубрика → фікси → демо-маршрут → Save**.

Все «потім» запиши в нотатку для 11.6 / 12.1, але не клей у білд зараз.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Зв’язок з 11.6 і модулем 12",
 content: `| Сьогодні | Далі |
|----------|------|
| Place з максимальною кількістю «так» у рубриці | Сліпий playtest 11.6 |
| Список «ні/майже» | Багліст завтра |
| Демо 60–90 с | Заготовка до портфоліо/SHOWCASE |
| Чесний обсяг | Пітч MVP у 12.1 легше писати |

Якщо рубрика має багато «ні» в блоці A (старт) - не йди в 11.6 «на удачу». Добій онбординг сьогодні: це найдешевший фікс.

Save: \`Lesson 11.5 - Demo Ready\`.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Чекліст здачі уроку 85",
 content: `- [ ] Обрано один Place
- [ ] Золотий шлях записаний
- [ ] Рубрика ~15 пунктів проставлена
- [ ] Критичні «ні» (особливо 1–8 і 13–15) закриті або майже
- [ ] Є шпаргалка демо 60–90 с
- [ ] Один прогін демо з таймером пройдено
- [ ] Output чистий на маршруті
- [ ] Save: \`Lesson 11.5 - Demo Ready\`

Після цього Place вважається готовим до жорсткої перевірки чужими очима.

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Поліруєш три Place одночасно",
 explanation: "Жоден не доходить до Demo Ready.",
 correctApproach: "Один кандидат на урок.",
 },
 {
 mistake: "Красивий світ без нагороди на шляху",
 explanation: "Демо розвалюється: «і що далі?»",
 correctApproach: "Спочатку пункти 5–6 рубрики.",
 },
 {
 mistake: "Немає таблички/орієнтира на спавні",
 explanation: "Завтрашній сліпий тест одразу червоний.",
 correctApproach: "Онбординг-мінімум сьогодні.",
 },
 {
 mistake: "Демо 5 хвилин пояснень без гри",
 explanation: "Це не Demo Ready, це лекція.",
 correctApproach: "60–90 с з живою дією.",
 },
 {
 mistake: "Ігноруєш червоний Output «бо гра йде»",
 explanation: "На показі/тестi вилізе в гірший момент.",
 correctApproach: "Пункт 13 рубрики - обов’язковий.",
 },
 ],
 summary:
 "Ти довів один Place до Demo Ready за рубрикою ~15 пунктів: зрозумілий старт, цикл з нагородою, базовий polish і короткий демо-маршрут. Урок 85 готовий до сліпого playtest у 11.6.",
 practiceTask: {
 title: "Практика: Demo Ready рубрика (~30 хв)",
 difficulty: "beginner",
 description: `**Мета:** один Place з максимальною кількістю «так» і готовим демо 60–90 с.

### Part A - Рубрика (10 хв)
1. Обери Place і запиши золотий шлях.
2. Пройди Play і простав 15 пунктів: так / ні / майже.

### Part B - Фікси (15 хв)
1. Закрий найболючіші «ні» (старт, нагорода, Output, UI).
2. Додай мінімум онбордингу на спавні.
3. Підготуй шпаргалку демо і прожени таймер 1–2 рази.

### Part C - Здача (5 хв)
1. Фінальний прогін золотого шляху.
2. **File → Save to Roblox** → \`Lesson 11.5 - Demo Ready\`.
3. У LMS познач практику завершеною.

### Критерій «зараховано»
- Є заповнена рубрика
- Золотий шлях проходить
- Є демо-сценарій 60–90 с
- Критичні пункти старту/циклу/стабільності не всі «ні»
- Place збережено`,
 hints: [
 "Почни фікси з пунктів 1–6 - вони дають найбільший ефект на демо",
 "Один хороший SFX нагороди часто закриває і polish, і зрозумілість",
 "Запиши «ні» окремо - завтра це майже готовий багліст для 11.6",
 ],
 optionalChallenge:
 "Зроби скрін «до/після» спавну (без таблички → з табличкою/маркером) для портфоліо.",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який номер уроку 11.5 у новій сітці?",
 options: [
          "85-й з 92",
          "96-й",
          "1-й",
          "50-й",
        ],
 correctAnswer: 0,
 explanation: "11.5 = урок 85; далі 11.6 = 86.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що означає Demo Ready у цьому уроці?",
 options: [
          "Гра ідеальна назавжди",
          "Короткий повний досвід можна показати без суфлера",
          "Обов’язково Publish Public сьогодні",
          "Порожній Baseplate",
        ],
 correctAnswer: 1,
 explanation: "Готовність до показу, не вічний polish.",
 },
 {
 id: "q3",
 type: MC,
 question: "Скільки Place варто полірувати на цьому уроці?",
 options: [
          "Обов’язково десять",
          "Нуль",
          "Один головний",
          "Усі одночасно без пріоритету",
        ],
 correctAnswer: 2,
 explanation: "Глибина одного кандидата.",
 },
 {
 id: "q4",
 type: MC,
 question: "Скільки приблизно пунктів у рубриці Demo Ready?",
 options: [
          "Рівно 2",
          "100 обов’язково",
          "Рубрика не потрібна",
          "Близько 15",
        ],
 correctAnswer: 3,
 explanation: "Урок побудований навколо ~15 чекпоінтів якості.",
 },
 {
 id: "q5",
 type: MC,
 question: "Що має бути на спавні для онбордингу?",
 options: [
          "Нічого - гравець сам здогадається завжди",
          "Підказка: табличка / маркер / Prompt зі зрозумілим текстом",
          "Лише 20 екранів налаштувань",
          "Тільки небо без світу",
        ],
 correctAnswer: 1,
 explanation: "Без орієнтира демо і сліпий тест страждають.",
 },
 {
 id: "q6",
 type: MC,
 question: "Який наступний урок після 11.5?",
 options: [
          "12.6 SHOWCASE одразу",
          "Модуль 1",
          "11.6 - Сліпий playtest + фікси",
          "11.7 (у новій сітці немає)",
        ],
 correctAnswer: 2,
 explanation: "Спочатку Demo Ready, потім сліпий тест.",
 },
 {
 id: "q7",
 type: MC,
 question: "Скільки триває демо-сценарій цього уроку?",
 options: [
          "Приблизно 60–90 секунд",
          "30 хвилин лекції",
          "0 секунд",
          "Рівно 1 кадр",
        ],
 correctAnswer: 0,
 explanation: "Короткий живий показ.",
 },
 {
 id: "q8",
 type: MC,
 question: "Чому важливий пункт про Output на золотому шляху?",
 options: [
          "Output потрібен лише для Terrain",
          "Помилки завжди корисні на демо",
          "Output замінює UI",
          "Червоні помилки на маршруті показу вилізуть у найгірший момент",
        ],
 correctAnswer: 3,
 explanation: "Стабільність - частина Demo Ready.",
 },
 {
 id: "q9",
 type: MC,
 question: "Що робити з пунктами рубрики «ні»?",
 options: [
          "Ігнорувати до SHOWCASE",
          "Видалити рубрику",
          "Перетворити на список фіксів і закрити найкритичніші сьогодні",
          "Одразу Public Publish",
        ],
 correctAnswer: 2,
 explanation: "Рубрика без фіксів марна.",
 },
 {
 id: "q10",
 type: MC,
 question: "Яку назву Save пропонує урок?",
 options: [
          "SHOWCASE DAY",
          "Lesson 11.5 - Demo Ready",
          "Final GDD",
          "Module 11 - Game Polished",
        ],
 correctAnswer: 1,
 explanation: "Окрема назва дня Demo Ready; Game Polished - після 11.6.",
 },
 {
 id: "q11",
 type: MC,
 question: "Що важливіше для Demo Ready сьогодні?",
 options: [
          "Новий жанр з нуля за годину",
          "10 GamePass одразу",
          "Тільки атмосфера без геймплею",
          "Повний короткий цикл з нагородою",
        ],
 correctAnswer: 3,
 explanation: "Цикл > декоративна купа.",
 },
 {
 id: "q12",
 type: MC,
 question: "Навіщо репетирувати демо з таймером?",
 options: [
          "Щоб вкластись у 60–90 с і не замінити гру лекцією",
          "Щоб вимкнути Explorer",
          "Таймер заборонений",
          "Лише для музики",
        ],
 correctAnswer: 0,
 explanation: "Дисципліна показу.",
 },
 {
 id: "q13",
 type: MC,
 question: "Які уроки модуля 11 прямо підтримують пункти polish у рубриці?",
 options: [
          "Лише модуль 1",
          "Лише Publish",
          "11.1–11.4 (Explorer, loading, juice, UX/opt)",
          "Жодні",
        ],
 correctAnswer: 2,
 explanation: "Demo Ready зводить попередній polish докупи.",
 },
 {
 id: "q14",
 type: MC,
 question: "Що свідомо не робимо на 11.5?",
 options: [
          "Заповнення рубрики",
          "Онбординг на спавні",
          "Коротке демо",
          "Publish Public і роздування трьох Place одразу",
        ],
 correctAnswer: 3,
 explanation: "Фокус вузький: готовність до показу/тесту.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 11.5?",
 options: [
          "Порожній чекліст",
          "Один Place з рубрикою, золотим шляхом, демо-сценарієм і Save Demo Ready",
          "Лише іконка без гри",
          "Три недописані Place",
        ],
 correctAnswer: 1,
 explanation: "Demo Ready = вимірювана готовність одного білду.",
 },
 ],
 },
}

export const ukLesson116 = {
 lessonId: "lesson-roblox-11-6",
 moduleId: "module-11",
 order: 6,
 title: "11.6 - Сліпий playtest + фікси",
 theoryMinutes: 35,
 quizMinutes: 15,
 estimatedTime: 60,
 learningObjectives: [
 "Провести сліпий playtest без підказок перші хвилини",
 "Записати плутанину словами тестера і скласти багліст",
 "Пріоритизувати фікси: P0 блокери → P1 UX → далі polish",
 "Перевірити золотий шлях після виправлень без червоного Output",
 "Зберегти Place як підсумок модуля 11 перед релізом (модуль 12)",
 ],
 theory: {
 sections: [
 {
 title: "Сьогоднішня місія (урок 86 з 92)",
 content: `Це **останній урок модуля Polish**. Ти вже робив Explorer, loading, звук/VFX, оптимізацію/UX і Demo Ready (11.1–11.5). Сьогодні перевірка жорстким способом:

**Сліпий playtest** = хтось (або ти «в ролі новачка») грає **без підказок**, а ти лише дивишся і записуєш.

Потім:
1. Багліст з пріоритетами.
2. Фікси топ-проблем.
3. Повторний золотий шлях.
4. Save: \`Module 11 - Game Polished\`.

Далі модуль **12** - план, збірка, тест, Publish, портфоліо, SHOWCASE. Сьогоднішня якість напряму вплине на те, наскільки боляче буде 12.2–12.3.

Відкрий свій найкращий Place після 11.5 (або головний проєкт курсу).

**Зроби зараз (2 хв):** відкрий Place після попереднього уроку і підготуй робочу зону для артефакту цього заняття.`,
 },
 {
 title: "Чим сліпий тест відрізняється від «я сам пограв»",
 content: `| Ти сам | Сліпий тест |
|--------|-------------|
| Знаєш, куди бігти | Тестер шукає кнопку 40 с |
| «Очевидно» | Виявляється неочевидно |
| Прощаєш свої баги | Чужа людина зупиняється |
| Пам’ятаєш секретний обхід | Секрету немає в голові |

Сліпий тест ловить **онбординг і UX**, які творець не бачить.

Хто може бути тестером:
- одногрупник / друг / брат / сестра;
- викладач у ролі «тихого гравця»;
- ти сам, але з правилом: **не чіпати те, що «і так знаєш»** - грай так, ніби вперше відкрив гру (складніше, але краще ніж нічого).

**Зроби зараз (2 хв):** домовся хто тестер і підготуй аркуш для нотаток.`,
 },
 {
 title: "Протокол сесії (10–12 хвилин)",
 content: `1. Тестер сідає / бере керування. Ти **мовчиш мінімум 5 хвилин**.
2. Просиш думати вголос: «шукаю магазин… не бачу…».
3. Пишеш час + факт: \`02:15 - стоїть біля стіни, шукає квест\`.
4. Не виправляй баги під час сесії (крім повного крашу).
5. Після гри три питання:
   - Що було найясніше?
   - Де заплутався найбільше?
   - Що зламалось / бісило?
6. Якщо є другий тестер - повтори. Патерн з двох людей цінніший за одну думку.

Заборонено на сесії:
- «Натисни E он там»;
- «Ні, біжи ліворуч»;
- «Це ж очевидно».

Твоя робота - **камера спостереження**, не суфлер.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Що саме записувати (щоб потім лагодити)",
 content: `Не пиши «йому не зайшло». Пиши відтворювано:

| Поле | Приклад |
|------|---------|
| Час | 03:40 |
| Що робив | Шукав Prompt біля NPC |
| Що очікував | Підказку «натисни E» |
| Що сталось | Підійшов - нічого |
| Настрій | Злиться / нудиться / сміється |

Збери **топ-3 плутанини** обов’язково - навіть якщо гра «в цілому ок». Саме їх закриєш сьогодні.

Додатково глянь Output під час його гри. Червоний рядок на золотому шляху = кандидат у P0.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Пріоритети фіксів після сліпого тесту",
 content: `| Код | Що це | Приклади | Сьогодні |
|-----|-------|----------|----------|
| **P0** | Блокер | Soft-lock, краш, втрата прогресу, кнопка не працює | Лагодити першим |
| **P1** | Сильний UX | Не зрозуміло що робити, невидимий Prompt, крихітний текст | Лагодити далі |
| **P2** | Баланс / темп | Довго до першої нагороди | Якщо лишиться час |
| **P3** | Косметика | Крива табличка, дрібний декор | Після P0/P1 |

Правило модуля 11 фіналу: **не фарбуй небо, поки тестер не може почати квест.**

Якщо 2 тестери застрягли в одному місці - це майже завжди P1, навіть якщо тобі «все ясно».

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Шаблон багліста на сьогодні",
 content: `Скопіюй:

| ID | Проблема | Час/нотатка | P | Статус |
|----|----------|-------------|---|--------|
| 1 | Не видно, що робити на спавні | 0:40 | P1 | відкрито |
| 2 | Магазин списує двічі | 6:10 | P0 | відкрито |
| 3 | Гучна музика | 1:00 | P2 | потім |

Після фіксу:
1. Статус → **виправлено**.
2. Попроси тестера (або себе наосліп) пройти **лише це місце** ще раз.
3. Потім повний золотий шлях.

Багліст збережи - у модулі 12 він стане історією виклику для портфоліо.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Рубрика «відчувається готово» (1–5)",
 content: `Після фіксів оціни чесно. Мета: **усі ≥4**, або план що саме лишається P2/P3.

| Область | 1 = погано | 5 = супер | Твоя оцінка |
|---------|------------|-----------|-------------|
| Зрозумілість старту | Не знаю що робити | За 30 с ясно | |
| Відгук на дії | Клік «німий» | Є SFX/UI/нагорода | |
| Стабільність | Червоний Output | 8–10 хв без падінь | |
| Темп | Нудно / занадто жорстко | Хочеться ще раз | |
| Охайність | Хаос Explorer/UI | Читається як продукт | |

Це не оцінки школи в журнал. Це твій чесний зріз перед модулем 12.

**Зроби зараз (4 хв):** постав цифри. Усе ≤3 має рядок у баглісті.`,
 },
 {
 title: "Швидкі фікси, які часто рятують сліпий тест",
 content: `| Проблема тестера | Швидкий фікс |
|------------------|--------------|
| «Не знаю куди йти» | Яскрава стрілка / Neon Part / табличка на спавні |
| «Не бачу кнопку» | Більший TextButton, контраст, UIScale |
| «Підійшов до NPC - тиша» | ProximityPrompt з ActionText, MaxActivationDistance |
| «Застряг у стіні» | CanCollide / дірка в геометрії / Anchored |
| «Звук ріже» | Volume 0.3–0.5, не 1 на всьому |
| «Довго нічого не відбувається» | Перша нагорода раніше (ближчий збір / слабший перший етап) |
| «Не розумію що купив» | Print/UI «Куплено X», звук успіху |

Не обов’язково переписувати архітектуру. Часто рятує **1 табличка + 1 Prompt + 1 звук**.

**Зроби зараз (5 хв):** пройди таблицю тестів один раз і запиши pass/fail для кожного рядка.`,
 },
 {
 title: "Повторний прогін після фіксів (регресія)",
 content: `Виправив три баги - і зламав четвертий. Тому:

1. Пройди золотий шлях: спавн → головна дія → нагорода.
2. Перевір саме місця з багліста (де були P0/P1).
3. Глянь Output ще раз.
4. Якщо є loading з 11.2 - один холодний захід (Stop → Play).

Мінімум часу на регресію: **5–7 хвилин**. Без неї «фікси» інколи гірші за баги.

Якщо тестер ще доступний - дай йому 3 хвилини тільки на раніше проблемне місце. Це найдешевший спосіб перевірити, що UX справді став яснішим.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "60-секундне міні-демо для себе / викладача",
 content: `На кінець пари вмій показати:

1. Старт (loading, якщо є) + спавн.
2. Зрозуміла перша дія.
3. Одна нагорода / один «вау» (звук, частинка, апгрейд).
4. (Опційно) чистий фрагмент Explorer для викладача.

Це репетиція м’язів для модуля 12 SHOWCASE, тільки коротша.

Не розказуй 10 хвилин теорії. Покажи гру. Якщо за 60 с не ясно - повертайся до P1 онбордингу.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Зв’язок з модулем 12",
 content: `| Сьогодні | У модулі 12 |
|----------|-------------|
| Багліст | Історія виклику в портфоліо (12.5) |
| Сліпий протокол | Майже той самий, що тест-план 12.3 |
| Game Polished Place | База для збірки / фіналки |
| Оцінки рубрики | Підказка, що брати в MVP 12.1 |

Не починай модуль 12 з місця, де тестер «не зрозумів що робити 5 хвилин». Спочатку добій онбординг сьогодні.

Save окремо: навіть якщо далі зробиш нову фіналку, \`Module 11 - Game Polished\` лишається контрольним знімком polish-навичок.

**Зроби зараз (4 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Якщо тестера немає: само-сліпий режим",
 content: `Не ідеально, але працює:

1. Постав таймер на 10 хв.
2. Заборона: не користуватись «секретним знанням» (не біжи одразу до схованого Prompt).
3. Уяви, що бачиш гру вперше: читай лише те, що є на екрані й у світі.
4. Кожні 2 хв записуй: «зараз я думаю, що треба…».
5. Якщо за 3 хв не зрозумів наступний крок - це вже P1, навіть без друга.

Потім вийди з ролі тестера і лагодь як творець. Два капелюхи по черзі краще, ніж нуль тестів.

**Зроби зараз (5 хв):** зроби одну перевірку з цього розділу в Play і запиши результат у Note.`,
 },
 {
 title: "Чекліст здачі уроку 86",
 content: `- [ ] Була сліпа сесія ≥10 хв (або 2 коротші наосліп-прогони)
- [ ] Є топ-3 плутанини словами тестера
- [ ] Багліст з P0–P3
- [ ] P0 закриті; ключові P1 закриті або з тимчасовою підказкою в світі
- [ ] Золотий шлях пройдено після фіксів
- [ ] Output чистий на цьому маршруті
- [ ] Рубрика 1–5 заповнена
- [ ] Save: \`Module 11 - Game Polished\`

Модуль 11 після цього вважається зданим по суті: не «є ефекти», а «гравець може пройти без суфлера».

**Зроби зараз (3 хв):** пройди чекліст і постав галочки лише на реально виконані пункти.`,
 },
 ],
 },
 commonMistakes: [
 {
 mistake: "Підказуєш тестеру з першої секунди",
 explanation: "Ти тестуєш свою пам’ять, а не гру.",
 correctApproach: "Мовчи ≥5 хв, пиши факти з часом.",
 },
 {
 mistake: "Лагодиш лише колір, поки квест не стартує",
 explanation: "P3 замість P0/P1.",
 correctApproach: "Спочатку блокери й онбординг.",
 },
 {
 mistake: "Немає письмового багліста",
 explanation: "Забуваєш проблеми за годину.",
 correctApproach: "Таблиця ID / проблема / P / статус.",
 },
 {
 mistake: "Немає повторного прогону після фіксів",
 explanation: "Фікс ламає сусідню систему непомітно.",
 correctApproach: "Регресія золотого шляху 5–7 хв.",
 },
 {
 mistake: "Пишеш «йому просто не сподобалось»",
 explanation: "Немає що лагодити конкретно.",
 correctApproach: "Час + очікування + факт поведінки гри.",
 },
 ],
 summary:
 "Ти провів сліпий playtest, зібрав багліст, закрив критичні UX/блокери й підтвердив золотий шлях. Урок 86 завершує модуль 11 - Place готовий як база до релізного модуля 12.",
 practiceTask: {
 title: "Практика: сліпий тест + фікси (~35 хв)",
 difficulty: "beginner",
 description: `**Мета:** Game Polished після сліпого тесту з закритими P0/P1.

### Part A - Сліпа сесія (12 хв)
1. Підготуй аркуш нотаток.
2. Тестер грає 10 хв; ти мовчиш перші 5+.
3. Запиши топ-3 плутанини + Output-помітки.

### Part B - Багліст і фікси (18 хв)
1. Заповни таблицю P0–P3.
2. Закрий усі P0 і найболючіші P1 (табличка/Prompt/кнопка/гучність…).
3. Пройди золотий шлях + проблемні місця ще раз.

### Part C - Рубрика і Save (5 хв)
1. Оціни 5 областей 1–5.
2. **File → Save to Roblox** → \`Module 11 - Game Polished\`.
3. У LMS познач практику завершеною.

### Критерій «зараховано»
- Є сліпі нотатки / топ-3
- Є багліст
- P0 закриті
- Золотий шлях після фіксів ок
- Place збережено з фінальною назвою модуля 11`,
 hints: [
 "Одна яскрава табличка на спавні часто знімає пів P1",
 "Якщо тестера немає - два наосліп-прогони сам з таймером і забороною підказок собі вголос",
 "Багліст сфотографуй/збережи - знадобиться в 12.5",
 ],
 optionalChallenge:
 "Запиши 60–90 с екранного відео «до/після» одного UX-фіксу (наприклад онбординг на спавні).",
 },
 quiz: {
 passingScore: 70,
 timeLimit: 15,
 questions: [
 {
 id: "q1",
 type: MC,
 question: "Який номер уроку 11.6 у новій сітці?",
 options: [
          "86-й з 92",
          "96-й",
          "11-й лише в модулі без номера курсу",
          "1-й",
        ],
 correctAnswer: 0,
 explanation: "11.6 = урок 86; далі модуль 12 починається з 87.",
 },
 {
 id: "q2",
 type: MC,
 question: "Що таке сліпий playtest?",
 options: [
          "Тест лише з вимкненим монітором",
          "Гра без підказок творця, щоб зловити справжню плутанину",
          "Publish без опису",
          "Видалення всіх Scripts",
        ],
 correctAnswer: 1,
 explanation: "Свіжі очі без суфлера.",
 },
 {
 id: "q3",
 type: MC,
 question: "Скільки мінімум варто мовчати на старті сесії?",
 options: [
          "0 секунд - одразу підказуй",
          "Рівно 1 година",
          "Близько 5 хвилин",
          "Мовчати заборонено",
        ],
 correctAnswer: 2,
 explanation: "Інакше ховаєш онбординг.",
 },
 {
 id: "q4",
 type: MC,
 question: "Що лагодити першим після тесту?",
 options: [
          "Спочатку колір неба",
          "Спочатку новий жанр з нуля",
          "Нічого не лагодити",
          "P0 блокери, потім сильний UX (P1)",
        ],
 correctAnswer: 3,
 explanation: "Пріоритет перед polish-дрібницями.",
 },
 {
 id: "q5",
 type: MC,
 question: "Навіщо повторний золотий шлях після фіксів?",
 options: [
          "Щоб видалити багліст",
          "Перевірити, що фікс не зламав маршрут",
          "Це замінює модуль 12",
          "Лише для іконки гри",
        ],
 correctAnswer: 1,
 explanation: "Регресія обов’язкова.",
 },
 {
 id: "q6",
 type: MC,
 question: "Яку назву Save пропонує фінал модуля 11?",
 options: [
          "SHOWCASE DAY",
          "Final GDD",
          "Module 11 - Game Polished",
          "Lesson 1.1 - House",
        ],
 correctAnswer: 2,
 explanation: "Контрольний знімок polish.",
 },
 {
 id: "q7",
 type: MC,
 question: "Що писати в нотатках замість «йому не зайшло»?",
 options: [
          "Час, що очікував, що сталось",
          "Тільки емодзі",
          "Нічого",
          "Лише «погано»",
        ],
 correctAnswer: 0,
 explanation: "Відтворюваний факт.",
 },
 {
 id: "q8",
 type: MC,
 question: "Якщо два тестери застрягли в одному місці, це…",
 options: [
          "Випадковість, можна ігнорувати",
          "Привід видалити курс",
          "Ознака що Publish уже зроблено",
          "Сильний сигнал P1, який треба лагодити",
        ],
 correctAnswer: 3,
 explanation: "Патерн > одна думка.",
 },
 {
 id: "q9",
 type: MC,
 question: "Який наступний модуль після 11.6?",
 options: [
          "Модуль 1 з нуля",
          "Модуль 11.7 (у новій сітці немає)",
          "Модуль 12 - Реліз",
          "Тільки Terrain окремо",
        ],
 correctAnswer: 2,
 explanation: "Далі план/збірка/Publish/SHOWCASE.",
 },
 {
 id: "q10",
 type: MC,
 question: "Навіщо рубрика оцінок 1–5?",
 options: [
          "Замінити playtest",
          "Чесно побачити слабкі зони перед модулем 12",
          "Вимкнути Output",
          "Це оцінка Roblox автоматично",
        ],
 correctAnswer: 1,
 explanation: "Самоаудит якості.",
 },
 {
 id: "q11",
 type: MC,
 question: "Який швидкий фікс часто рятує «не знаю куди йти»?",
 options: [
          "Видалити спавн",
          "Додати 10 GamePass одразу",
          "Вимкнути UI назавжди",
          "Табличка / стрілка / яскравий орієнтир на спавні",
        ],
 correctAnswer: 3,
 explanation: "Онбординг-декор працює.",
 },
 {
 id: "q12",
 type: MC,
 question: "Чому багліст з модуля 11 корисний у 12.5?",
 options: [
          "З нього береться історія виклику для портфоліо",
          "Він замінює Publish",
          "Він потрібен лише для Terrain",
          "Його завжди видаляють",
        ],
 correctAnswer: 0,
 explanation: "Реальний процес > порожній текст.",
 },
 {
 id: "q13",
 type: MC,
 question: "Що таке soft-lock у контексті цього уроку?",
 options: [
          "Гарна анімація дверей",
          "Назва Badge",
          "Гравець застряг і не може нормально продовжити",
          "Тип Lighting",
        ],
 correctAnswer: 2,
 explanation: "Типовий P0.",
 },
 {
 id: "q14",
 type: MC,
 question: "Скільки топ-плутанин мінімум треба виписати?",
 options: [
          "Нуль",
          "Обов’язково сто",
          "Лише одну без деталей",
          "Приблизно три",
        ],
 correctAnswer: 3,
 explanation: "Три конкретні UX-сигнали.",
 },
 {
 id: "q15",
 type: MC,
 question: "Що вважається зданим артефактом уроку 11.6?",
 options: [
          "Лише новий Decal",
          "Сліпі нотатки + багліст + фікси P0/P1 + Game Polished Save",
          "Порожній чекліст",
          "Publish Public без тесту",
        ],
 correctAnswer: 1,
 explanation: "Фінал polish = перевірена грабельність.",
 },
 ],
 },
}
