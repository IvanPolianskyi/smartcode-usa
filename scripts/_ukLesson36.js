export const ukLesson36 = {
  lessonId: "lesson-roblox-5-8",
  moduleId: "module-05",
  order: 8,
  title: "5.8 - Checkpoint: повний прохід",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Провести контрольний повний прохід Obby як product gate перед juice і Ship",
    "Розподілити ролі гравець і спостерігач без підказок під час run",
    "Оцінити Place за 6-категорійною рубрикою під час одного прогону",
    "Продовжити багліст 5.6, записуючи баги без зупинки Play",
    "Підтвердити curve 5.7, зробити один fix pass лише blockers і зберегти Full Playthrough",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 36 з 92)",
        content: `У **5.6** ти зібрав перший багліст. У **5.7** вирівняв difficulty curve важелями gap, width, timing і CP density. Сьогодні - **product gate**: повний прохід Obby **іншою людиною** (peer), який перевіряє, чи рівень готовий до polish у **5.9** і Ship у **5.10**.

Це не ще один «авторський пробіг». Peer не знає, де ключ, який \`waitUp\` ти крутив і де unfair spike був учора. Якщо він проходить без blockers - curve і Progress тримаються на чужих очах.

Артефакт уроку:
1. Build **5.8-A** заморожений до peer run.
2. Один повний прогін: гравець грає, ти спостерігаєш.
3. Рубрика 6 категорій заповнена під час run.
4. Багліст 5.6 **продовжений** - запис без зупинки гри.
5. Перевірка curve 5.7 (смерті, паузи, exam).
6. Один fix pass **лише P0/P1 blockers**.
7. Окремий список juice-ідей (не реалізований).
8. Save **Lesson 5.8 - Full Playthrough**.

| Було в 5.7 | Стає в 5.8 |
|------------|------------|
| Self-retest curve | Peer run на Build після curve |
| Changelog ітерацій | Рубрика + оновлений багліст |
| Очікування «краще» | Pass/fail product gate |

**5.9** додасть Sound і Particles. **5.10** - Game Settings, Badge, демо 60-90 с. Сьогодні juice **не** чіпаємо - лише фіксуємо ідеї окремим списком.

**Зроби зараз (2 хв):** відкрий Save **Lesson 5.7 - Difficulty Curve**, створи Build 5.8-A і запиши changelog 5.7 одним рядком у Notes.`,
      },
      {
        title: "Product gate: навіщо 5.8 перед juice і Ship",
        content: `**Product gate** - контрольна точка: «чи можна показати цей Obby незнайомій людині без вибачень?». Не «чи красиво», не «чи є Badge» - чи **проходиться чесно** від Spawn до Finish.

| Gate pass | Gate fail |
|-----------|-----------|
| Peer дійшов до Finish без P0 | Softlock, зламаний respawn, blocked main path |
| Exam відчувається складнішим за teach | Unfair spike лишився після 5.7 |
| Секрет опційний (**5.5**) | Без ключа неможливо фініш |
| Output без червоних помилок на run | Script падає mid-run |

Якщо gate fail - **не** переходь до **5.9**. Juice на зламаному checkpoint лише прикрасить баг. Ship у **5.10** з червоним Output - це rework під дедлайн.

Gate pass не означає «ідеально». Допустимі P2/P3 у баглісті й ідеї juice. Недопустимі P0/P1 на основному маршруті після fix pass.

Порівняй з **5.6**: там перший playtest збирав дані. Тут **контроль** після curve - менше рядків, але жорсткіший критерій «готовий до polish».

**Зроби зараз (3 хв):** напиши три речення «що має бути true після peer run, щоб я відкрив 5.9».`,
      },
      {
        title: "Ролі: гравець (peer) і спостерігач (ти)",
        content: `Схема та сама, що в **5.6**, але мета інша: не перший збір багів, а **gate** після 5.7.

**Peer (гравець):**
- стартує з Spawn на Build 5.8-A;
- проходить до Finish без телепортів і підказок;
- коментує вголос очікування на незнайомих ділянках;
- не зobов'язаний знаходити секрет - main path обов'язковий.

**Ти (спостерігач):**
- записуєш час, смерті, паузи 5+ секунд;
- заповнюєш рубрику (наступна секція);
- **не** підказуєш маршрут, timing чи ключ;
- після сегмента ставиш уточнення, не під час стрибка.

Якщо peer застряг - фіксуєш це як дані. Якщо просить «куди?» - «Запишу як navigation; продовжуй пробувати» - не «направо там».

Self-gate (якщо немає peer): новий сервер, без Explorer, запис екрана, коментарі вголос. Слабше за peer, але краще за авторський пробіг напам'ять. Познач у баглісті **Tester: self-gate**.

Після run одразу **не** фіксиш у Play Mode. Завершити нотатки, потім Build 5.8-B для blockers.

**Зроби зараз (3 хв):** передай peer інструкцію: «Full run, говори очікування, я мовчу про маршрут».`,
      },
      {
        title: "6-категорійна рубрика peer review",
        content: `Під час одного прогону заповнюй рубрику. Шкала: **так / майже / ні** + коротка нотатка.

| # | Категорія | Що перевіряєш |
|---|-----------|---------------|
| 1 | **Gameplay** | gap, hazards, while, collision - чи чесно |
| 2 | **Progress** | CP, respawn, Finish, timer (**5.3**) |
| 3 | **Navigation** | напрямок, видимість цілі, біоми |
| 4 | **Secret** | ключ-двері опційні (**5.5**) |
| 5 | **Curve** | teach→train→exam, без unfair spike (**5.7**) |
| 6 | **Stability** | Output чистий, немає softlock |

Приклад рядка:
\`Curve | майже | біом 3 exam OK, одна пауза 6с перед Gap_12\`

**Gameplay + Progress** - blockers gate. **Curve** - підтвердження 5.7: peer має смерті в exam, але не rage на train. **Secret** - «ні», якщо без ключа не фініш.

Не плутай **Stability** з juice: відсутність Sound - не fail сьогодні (**5.9**). Fail - Script error або зависання Character.

Після run порахуй: скільки **ні** в категоріях 1-2 і 6? Якщо ≥1 - fix pass обов'язковий перед 5.9.

Рубрику зберігай поруч із баглістом - peer review table для ментора.

**Зроби зараз (4 хв):** створи таблицю 6 категорій з колонками так/майже/ні і Notes.`,
      },
      {
        title: "Сценарій повного проходу (без скорочень)",
        content: `Peer проходить **весь** маршрут - той самий каркас, що в **5.6**:

| Крок | Перевірка |
|------|-----------|
| 1. Spawn | Напрямок у teach-біом |
| 2. Біом 1 hazards | Читабельність до смерті |
| 3. CP + respawn | Збереження прогресу |
| 4. While-платформи | Config timing з 5.7 |
| 5. Біом 2 train | Смерті vs curve changelog |
| 6. Key-door (опційно) | Main path без ключа |
| 7. Біом 3 exam | Найважчий блок перед Finish |
| 8. Finish | Timer зупинка, досяжність |

Не телепортуй peer до «проблемного місця» - gate перевіряє **накопичення** fatigue і curve по всій довжині.

Зафіксуй числа для порівняння з 5.6:
- загальний час;
- смерті за біомами;
- найдовша пауза;
- чи був blockers stop (так/ні).

Якщо peer кидає на біомі 2 - curve 5.7 або navigation ще не gate-ready. Запиши точне місце в багліст, не перебудовуй біом у Play.

**Зроби зараз (2 хв):** скопіюй вісім кроків і залиш місце для чисел 5.6 vs 5.8.`,
      },
      {
        title: "Баг-нотатки без зупинки гри",
        content: `Під час peer run **не зупиняй** Play, щоб правити Parts. Як якщо глядач уже сидить у залі - виступ не ставлять на паузу для ремонту сцени.

Правила запису:
- короткі shorthand в блокноті або другому моніторі;
- часова мітка: \`04:12 CP_03 respawn fail\`;
- після run розгорни в повні рядки багліста;
- якщо P0 блокує peer - дозволь **завершити** до найближчого відтворюваного моменту або зафіксуй stop з steps.

| Під час run | Після run |
|-------------|-----------|
| «3 deaths Gap_09» | OBBY-14: Expected land, Actual fall, Steps... |
| «Output red line 6:01» | OBBY-15: Category Stability, P0 |
| «? direction biome2» | OBBY-16: Navigation, P2 |

Продовжуй нумерацію ID з **5.6** (OBBY-08, OBBY-09...). Один peer run може дати 3-8 нових рядків - нормально.

Не проси peer «зачекай, я швидко поправлю» - це змішує Build 5.8-A з B і псує gate.

Якщо peer знайшов те саме, що в 5.6 зі статусом Fixed - познач **Reopen** з посиланням на Build.

**Зроби зараз (2 хв):** підготуй шаблон shorthand-колонок: Time / Place / Symptom.`,
      },
      {
        title: "Продовження багліста 5.6",
        content: `Багліст - **живий документ** через 5.6 → 5.7 → 5.8 → 5.9 → 5.10. Не створюй нову таблицю з нуля.

Колонки (як у 5.6):
ID | Place | Expected | Actual | Steps | Category | Priority | Status | Build | Evidence

Після peer run 5.8:
1. Додай нові рядки з gate run.
2. Онови Status старих (Fixed → Reopen, якщо регресія).
3. Познач Build 5.8-A для всіх спостережень цього run.
4. Відокрем **blockers** (P0/P1) від polish (P2/P3).

| Тип знахідки | Priority | Fix сьогодні? |
|--------------|----------|---------------|
| Неможливий Finish | P0 | Так - fix pass |
| Respawn не на CP | P1 | Так |
| Exam важкий, але fair | P2 | Ні - можливо 5.7 revisit |
| Хочу звук на CP | P3 | Ні - список juice |

Порівняй **кількість** P0/P1 з 5.6: gate очікує **не більше** blockers, часто менше. Якщо більше - curve-правки могли зламати Progress (regression).

Difficulty-спостереження без blockers: Category Curve або Gameplay P2 - передай назад у notes для 5.7-style tweak **після** gate, не під час fix pass.

**Зроби зараз (5 хв):** відкрий багліст 5.6 і додай колонку Build, якщо її ще немає.`,
      },
      {
        title: "Перевірка difficulty curve 5.7",
        content: `Gate run - тест твоєї роботи в **5.7**. Питання не «чи легко», а «чи curve **передбачувана** для незнайомого гравця».

Метрики порівняння:

| Метрика | 5.6 playtest | 5.8 peer | Очікування |
|---------|--------------|----------|------------|
| Смерті біом 2 | напр. 8 | ? | ≤ або fairer |
| Пауза max | напр. 12с | ? | без blind stop |
| Exam смерті | ? | ? | ≥ teach, без unfair |
| Quit mid-run | ні/так | ні | ні |

Перевір changelog 5.7: peer має пройти місця, де ти ставив **Better**. Якщо там знову три смерті - retest 5.7 був self-biased або регресія.

Ознаки curve pass:
- peer називає біом 3 «важкий», але не «неможливий»;
- train смерті з поясненням «прогавив timing»;
- немає смерті «я не бачив hazard» (unfair).

Ознаки curve fail:
- peer просить зупинити run;
- смерті кластером на одному gap після 5.7 fix;
- exam легший за train (перевернута крива).

Curve fail без P0 - **не** blockers для 5.9, але запиши P2 і optional revisit 5.7 після 5.8 Save. Blockers Progress - fix pass спочатку.

**Зроби зараз (4 хв):** після peer (або з даних 5.6) заповни таблицю порівняння метрик.`,
      },
      {
        title: "Один fix pass: лише blockers",
        content: `Після peer run - **один** цикл виправлення. Не другий curve sweep, не juice, не новий біом.

Fix pass protocol:
1. Відсортуй багліст P0 → P1.
2. Обери **найвищий blocker** один (як triage 5.6).
3. Build **5.8-B** - Save перед зміною.
4. Мінімальний фікс однієї причини.
5. Regression: steps бага + сусідній CP/hazard.
6. Короткий self-run Spawn → Finish - лише підтвердити blocker знятий.

| Fix pass | Не fix pass |
|----------|-------------|
| Respawn на CP | Переставити exam-gap «бо красиво» |
| Script error на Finish | Sound на lava |
| Door блокує main | Particle на GUI |
| Debounce hazard | Новий секрет |

Максимум **один** blocker fix у рамках 5.8 уроку. Якщо P0 залишилось два - другий у Reopen з планом, або другий мінімальний fix якщо час дозволяє - але не перетворюй 5.8 на другий 5.7.

Після fix **не** роби повторний peer у цьому уроці - достатньо regression retest. Повторний peer - optionalChallenge.

Save **Lesson 5.8 - Full Playthrough** на Build після fix pass (5.8-B або C).

**Зроби зараз (6 хв):** якщо є P0/P1 з peer - зроби один мінімальний фікс і regression.`,
      },
      {
        title: "Список juice-ідей (окремо від фіксів)",
        content: `Під час run peer (і ти) побачите моменти «тут не вистачає відгуку». **Не реалізуй** їх сьогодні - **5.9** саме для Sound і ParticleEmitter.

Окремий файл або секція Notes: **Juice backlog (post-5.8)**

| Подія | Ідея juice | Пріоритет polish |
|-------|------------|------------------|
| Hazard kill | короткий sizzle + дим | високий |
| Checkpoint touch | ding + іскри | високий |
| Finish | confetti burst | середній |
| Key pickup | click + flash | низький |

Правила backlog:
- не плутати з баглістом - juice не виправляє P1 respawn;
- не додавати Sound у fix pass 5.8;
- кожна ідея прив'язана до **існуючого** хука з 5.2/5.3 (**5.9** вбудує туди).

Якщо peer каже «не чув, що помер» - запиши в juice backlog, **не** gate fail, якщо hazard працює серверно.

Gate pass з порожнім juice backlog - нормально. Gate pass з реалізованим juice але зламаним CP - fail.

У **5.10** ship-рубрика включить juice з 5.9 - backlog сьогодні лише планування.

**Зроби зараз (3 хв):** додай мінімум 3 рядки juice backlog без змін у Scripts.`,
      },
      {
        title: "Playtest #1 (5.6) vs gate (5.8)",
        content: `Два run - різні jobs:

| | 5.6 Playtest #1 | 5.8 Full Playthrough |
|---|-----------------|----------------------|
| Мета | Зібрати баги | Підтвердити product gate |
| Build | 5.6-A | 5.8-A після 5.7 |
| Хто | Перший незнайомий тест | Peer після curve |
| Фікси | Один P0/P1 + retest | Один blocker fix pass |
| Артефакт | Buglist | Buglist + rubric + juice backlog |
| Далі | 5.7 curve | 5.9 juice |

5.6 міг мати 12 смертей і 8 рядків багліста - це успіх збору даних. 5.8 з двома P2 і нулем P0 - успіх gate.

Якщо 5.8 peer знайшов **той самий** P1, що Fixed у 5.6 - regression, не «peer поганий». Reopen з Build evidence.

Якщо 5.8 має **менше** смертей на curve-точках з changelog 5.7 - curve працює.

Не порівнюй «fun» - порівнюй blockers, curve metrics і rubric **ні** в Progress/Gameplay.

**Зроби зараз (3 хв):** одне речення: «5.6 навчив ___, 5.8 підтвердив ___».`,
      },
      {
        title: "Чекліст product gate",
        content: `Перед Save **Lesson 5.8 - Full Playthrough**:

- [ ] Build 5.8-A заморожений до peer run
- [ ] Peer (або self-gate) пройшов Spawn → Finish
- [ ] Рубрика 6 категорій заповнена
- [ ] Багліст 5.6 продовжений новими ID
- [ ] Запис без зупинки Play під час run
- [ ] Метрики curve порівняно з 5.6 / changelog 5.7
- [ ] Один fix pass на P0/P1 (якщо були) на Build 5.8-B
- [ ] Regression retest blocker пройдено
- [ ] Juice backlog окремо, Sound **не** додано
- [ ] Output чистий на короткому self-run після fix
- [ ] Save: **Lesson 5.8 - Full Playthrough**

Gate pass → **5.9 Juice**. Gate fail з лишковим P0 → Reopen, другий fix не в 5.9.

**5.10** Ship вимагатиме те, що ти підтвердив сьогодні: прохідність, curve, стабільність - плюс juice після 5.9.

**Зроби зараз (5 хв):** простав галочки і зроби фінальний self-run 3 хвилини.`,
      },
      {
        title: "Міст до 5.9 і 5.10",
        content: `Після Save 5.8 Place має бути **тихим продуктом**: логіка працює, curve перевірена peer, blockers зняті fix pass, juice - лише в backlog.

**5.9 - Juice:**
- Sound на hazard і checkpoint у **існуючих** Touched-хуках;
- ParticleEmitter через \`Emit()\`, не другий Touched;
- повний прохід з увімкненим звуком у Roblox settings.

**5.10 - Ship + Badge:**
- Game Settings Name, Description, Icon;
- Badge на FinishLine, \`AwardBadge\` на сервері;
- ship-рубрика ~15 пунктів по 5.1-5.9;
- демо 60-90 с.

Якщо ти пропустив gate і додав juice раніше - у 5.9 доведеться відділяти «новий баг CP» від «гучний hazard». Роби в порядку: **5.8 gate → 5.9 polish → 5.10 ship**.

Артефакт 5.8: **peer rubric + оновлений багліст + juice backlog + blocker fix**, а не «мы пограли ще раз».

**Зроби зараз (2 хв):** Save Lesson 5.8 - Full Playthrough і одним рядком запиши «Ready for 5.9: так/ні».`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "Peer run з підказками автора",
      explanation: "Gate не перевіряє navigation і curve для незнайомого гравця.",
      correctApproach: "Спостерігати мовчки про маршрут, питання після сегмента",
    },
    {
      mistake: "Зупинка Play для правок під час run",
      explanation: "Змішує Build і псує reproducibility gate.",
      correctApproach: "Shorthand notes під час run, повні рядки після",
    },
    {
      mistake: "Fix pass перетворюється на другий 5.7 curve sweep",
      explanation: "Gate затягується, juice і Ship відкладаються без причини.",
      correctApproach: "Один P0/P1 fix + regression, curve P2 - в backlog",
    },
    {
      mistake: "Додавання Sound у fix pass 5.8",
      explanation: "Juice маскує blockers і належить 5.9.",
      correctApproach: "Juice backlog окремо, Scripts логіки без Sound",
    },
    {
      mistake: "Новий багліст замість продовження 5.6",
      explanation: "Втрачається історія Fixed/Reopen і Build trace.",
      correctApproach: "Ті самі колонки, нові ID, колонка Build",
    },
    {
      mistake: "Gate pass при P0 на main path",
      explanation: "5.9 і 5.10 побудуються на зламаному фундаменті.",
      correctApproach: "Blocker fix pass або Reopen до проходження gate",
    },
  ],
  keyTakeaways: [
    "5.8 - product gate після curve 5.7, перед juice 5.9 і Ship 5.10",
    "Peer грає, автор спостерігає - без підказок під час run",
    "6 категорій рубрики: Gameplay, Progress, Navigation, Secret, Curve, Stability",
    "Багліст 5.6 продовжується; запис без зупинки Play",
    "Один fix pass лише P0/P1 blockers; juice - окремий backlog",
    "Save Lesson 5.8 - Full Playthrough відкриває 5.9",
  ],
  summary: "Ти провів контрольний peer run як product gate, заповнив 6-категорійну рубрику, продовжив багліст 5.6 без зупинки гри, перевірив curve 5.7 за метриками, зробив один blocker fix pass і виніс juice-ідеї в окремий backlog. Place готовий до Sound і Particles у 5.9.",
  practiceTask: {
    title: "Full Playthrough gate (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** product gate peer run після 5.7 з rubric, баглістом і blocker fix.

### Part A - Підготовка (5 хв)
1. Save Build 5.8-A з Lesson 5.7 - Difficulty Curve.
2. Таблиця рубрики 6 категорій + shorthand notes.
3. Інструкція peer без підказок.

### Part B - Peer run (15 хв)
1. Spawn → Finish, запис часу/смертей/пауз.
2. Рубрика так/майже/ні під час run.
3. Shorthand багів без зупинки Play.

### Part C - Gate close (15 хв)
1. Розгорни shorthand у багліст 5.6 (нові ID).
2. Порівняй метрики curve з 5.6/5.7.
3. Один P0/P1 fix на Build 5.8-B + regression.
4. Juice backlog (≥3 ідеї, без Scripts).
5. **Save:** Lesson 5.8 - Full Playthrough`,
    hints: [
      "P2 curve без blockers - gate pass, fix не обов'язковий",
      "Regression після fix: steps бага + сусідній CP",
      "Sound додаси в 5.9 - сьогодні лише backlog",
    ],
    optionalChallenge: "Другий peer на Build після fix pass - порівняй rubric до/після.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Головна мета уроку 5.8?",
        options: [
          "Product gate peer run перед juice і Ship",
          "Додати Badge і Game Settings",
          "Перебудувати всі три біоми",
          "Видалити багліст 5.6",
        ],
        correctAnswer: 0,
        explanation: "5.8 підтверджує готовність до 5.9/5.10.",
      },
      {
        id: "q2",
        type: MC,
        question: "Що робить спостерігач під час peer run?",
        options: [
          "Підказує timing while-платформ",
          "Рухає Parts у Play Mode",
          "Видає Badge на половині маршруту",
          "Записує rubric і баги без підказок маршруту",
        ],
        correctAnswer: 3,
        explanation: "Роль як у 5.6, мета - gate після 5.7.",
      },
      {
        id: "q3",
        type: MC,
        question: "Скільки категорій у rubric 5.8?",
        options: [
          "3",
          "6",
          "15",
          "92",
        ],
        correctAnswer: 1,
        explanation: "Gameplay, Progress, Navigation, Secret, Curve, Stability.",
      },
      {
        id: "q4",
        type: MC,
        question: "Gate fail - типовий приклад?",
        options: [
          "Немає Sound на hazard",
          "P3 зміщений текст GUI",
          "P0 softlock на main path",
          "Peer не знайшов секрет",
        ],
        correctAnswer: 2,
        explanation: "Blockers Progress/Gameplay = fail gate.",
      },
      {
        id: "q5",
        type: MC,
        question: "Під час peer run баги записують?",
        options: [
          "Shorthand без зупинки, повні рядки після",
          "Після зупинки Play і правки Parts",
          "Не записують - лише rubric",
          "Тільки в Output",
        ],
        correctAnswer: 0,
        explanation: "Run не переривають для fix.",
      },
      {
        id: "q6",
        type: MC,
        question: "Fix pass у 5.8 обмежений?",
        options: [
          "Необмежено всіма P2",
          "Лише P0/P1 blockers, один цикл",
          "Тільки косметикою",
          "Повним redesign exam",
        ],
        correctAnswer: 1,
        explanation: "Один blocker fix + regression.",
      },
      {
        id: "q7",
        type: MC,
        question: "Juice-ідеї в 5.8?",
        options: [
          "Реалізують у hazard Script",
          "Замінюють багліст",
          "Окремий backlog без Sound сьогодні",
          "Видаляють curve 5.7",
        ],
        correctAnswer: 2,
        explanation: "5.9 реалізує juice на готових хуках.",
      },
      {
        id: "q8",
        type: MC,
        question: "Багліст 5.8 і 5.6?",
        options: [
          "Новий файл без історії",
          "5.6 видаляють",
          "Тільки для juice",
          "Продовження з новими ID і Build",
        ],
        correctAnswer: 3,
        explanation: "Живий документ через модуль.",
      },
      {
        id: "q9",
        type: MC,
        question: "Категорія Curve у rubric перевіряє?",
        options: [
          "Teach→train→exam після змін 5.7",
          "Badge ID",
          "Icon 512×512",
          "Team Create",
        ],
        correctAnswer: 0,
        explanation: "Peer підтверджує curve на чужих очах.",
      },
      {
        id: "q10",
        type: MC,
        question: "Після gate pass логічний наступний урок?",
        options: [
          "5.9 Juice: Sound + Particles",
          "5.1 Three Biomes з нуля",
          "6.10 Ship Sim",
          "Пропустити до 5.10 без juice",
        ],
        correctAnswer: 0,
        explanation: "Polish після gate, ship після juice.",
      },
      {
        id: "q11",
        type: MC,
        question: "Чим 5.8 відрізняється від 5.6?",
        options: [
          "5.8 не потребує peer",
          "5.6 після Ship",
          "5.8 - gate після curve, не перший збір багів",
          "5.8 без rubric",
        ],
        correctAnswer: 2,
        explanation: "5.6 збирає дані, 5.8 підтверджує продукт.",
      },
      {
        id: "q12",
        type: MC,
        question: "Self-gate якщо немає peer?",
        options: [
          "Заборонено",
          "Замінює Save",
          "Не потребує rubric",
          "Допустимо з позначкою Tester: self-gate",
        ],
        correctAnswer: 3,
        explanation: "Слабше за peer, але краще за авторський пробіг.",
      },
      {
        id: "q13",
        type: MC,
        question: "Regression після blocker fix?",
        options: [
          "Steps бага + сусідній сценарій Progress",
          "Не потрібен",
          "Лише Edit Mode колір",
          "Publish Public",
        ],
        correctAnswer: 0,
        explanation: "Як у 5.6 - короткий regression набір.",
      },
      {
        id: "q14",
        type: MC,
        question: "Stability у rubric - це?",
        options: [
          "Наявність ParticleEmitter",
          "Кількість біомів",
          "Output без помилок, немає softlock",
          "Опис у Game Settings",
        ],
        correctAnswer: 2,
        explanation: "Stability ≠ juice.",
      },
      {
        id: "q15",
        type: MC,
        question: "Точна назва Save уроку 5.8?",
        options: [
          "Lesson 5.7 - Difficulty Curve",
          "Lesson 5.6 - Playtest 1 Buglist",
          "Lesson 5.9 - Juice Pass",
          "Lesson 5.8 - Full Playthrough",
        ],
        correctAnswer: 3,
        explanation: "Save фіксує gate peer run перед 5.9.",
      },
    ],
  },
};
