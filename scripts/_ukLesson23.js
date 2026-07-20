export const ukLesson23 = {
  lessonId: "lesson-roblox-4-3",
  moduleId: "module-04",
  order: 3,
  title: "4.3 - insert / remove - інвентар",
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    "Додати елемент у список через table.insert і прибрати через table.remove",
    "Побудувати серверний інвентар як масив id з показом вмісту",
    "Знайти індекс елемента перед remove і обробити відсутній предмет",
    "Захистити зміни інвентаря від клієнтської «правди» і від спаму Touched",
    "Підготувати bag ids до каталогу записів у 4.4 без кнопки Tycoon-покупки як теми",
  ],
  theory: {
    sections: [
      {
        title: "Сьогоднішня місія (урок 23 з 92)",
        content: `У **4.2** словник-прайс уже вміє відповісти «скільки коштує». Сьогодні список вчиться **рости й коротшати**: \`table.insert\` / \`table.remove\`. Тема - **інвентар**, не «кнопка покупки Dropper_02».

Покупка може бути одним зі способів отримати предмет. Але здаєш ти живий bag: додати, показати, прибрати, не впасти на nil.

Артефакт уроку:
1. Серверна table \`bag\` (масив id) на гравця або демо-гравця Studio.
2. Дія Add: insert id.
3. Дія Remove: знайти індекс → remove.
4. Показ вмісту: print / Billboard / простий GUI.
5. Debounce на Prompt/Touched.
6. Save **Lesson 4.3 - Inventory Insert Remove**.

| Старий слот | Тема prod-92 |
|-------------|--------------|
| Кнопка покупки дропера | insert / remove інвентар |
| Unlock Dropper_02 | Живий список id |
| Hide machine до покупки | Показ bag після змін |

Метафора: прайс - цінник у вітрині. Інвентар - кошик у руках. Сьогодні вчишся класти й діставати з кошика, а не будувати другу машину на ділянці.

**Зроби зараз (2 хв):** Save як Lesson 4.3 - Inventory Insert Remove і створи Script \`InventoryLab\`.`,
      },
      {
        title: "insert і remove на пальцях",
        content: `Масив-список:

\`local bag = { "apple" }\`

Додати в кінець:

\`table.insert(bag, "gem")\`  -- { "apple", "gem" }

Додати на позицію:

\`table.insert(bag, 1, "potion")\`  -- potion стає першим

Прибрати за індексом:

\`table.remove(bag, 2)\`  -- прибирає елемент №2, зсуває хвіст

Важливо: \`remove\` хоче **індекс**, не обов'язково рядок id. Тому спочатку шукаєш, де саме лежить "gem".

\`#bag\` після змін показує нову довжину - зручний швидкий тест.

**Зроби зараз (4 хв):** у Output вручну insert два id і remove один; надрукуй bag після кожної дії.`,
      },
      {
        title: "Знайти індекс перед remove",
        content: `Хелпер:

\`local function indexOf(list, value)
  for i, v in ipairs(list) do
    if v == value then
      return i
    end
  end
  return nil
end\`

Використання:

\`local i = indexOf(bag, "gem")
if i then
  table.remove(bag, i)
else
  print("немає gem")
end\`

Без перевірки \`remove\` неіснуючого індексу або сліпий remove(1) «аби щось зникло» ламає довіру до інвентаря.

Політика дублікатів (обери й зафіксуй):
- дозволяти кілька однакових id
- або insert лише якщо indexOf == nil

Напиши правило в коментарі - інакше завтра сам заплутаєшся.

**Зроби зараз (5 хв):** реалізуй indexOf + removeById; перевір успіх і «немає предмета».`,
      },
      {
        title: "Серверний bag на гравця",
        content: `Мінімальна пам'ять:

\`local bags = {}  -- [player] = { "apple", ... }\`

На PlayerAdded: \`bags[player] = {}\`
На PlayerRemoving: \`bags[player] = nil\`

Усі Add/Remove чіпають \`bags[player]\` на **сервері**. LocalScript може просити «додай apple», але сервер вирішує.

Чому не тримати правду лише в GUI TextLabel? Бо GUI легко підробити й легко розсинхронити. GUI - відображення. bag table - правда (до DataStore в 4.6).

Для соло-демо в Studio можна мати один \`bag = {}\` без словника гравців. Але звичка \`bags[player]\` дешевша саме зараз.

**Зроби зараз (5 хв):** зроби bags[player] (або чіткий solo bag) і Add через ProximityPrompt на сервері.`,
      },
      {
        title: "Показ інвентаря",
        content: `Після кожної зміни покажи стан. Варіанти від простого до кращого:

1. \`print(table.concat(bag, ", "))\` (якщо всі рядки)
2. Цикл ipairs → один рядок підпису
3. ScreenGui список
4. Billboard над гравцем / панеллю

На 4.3 достатньо print + один видимий TextLabel. Головне - **бачити insert/remove**, не намалювати AAA-рюкзак.

Оновлення показу винеси у функцію \`renderBag(player)\`, щоб Add і Remove не дублювали GUI-код.

**Зроби зараз (5 хв):** після insert і remove викликай render; підтвердь очима обидві зміни.`,
      },
      {
        title: "Покупка як один із входів (не тема Tycoon)",
        content: `Можеш зв'язати з прайсом 4.2:

1. Гравець просить купити id
2. Сервер дивиться Prices[id] / canAfford
3. Списує монети
4. \`table.insert(bag, id)\`

Це валідний сценарій. Але артефакт дня - **insert/remove**, не «друга машина дропера з'явилась».

Анти-здача:
- Hide Dropper_02 як головний результат
- Кнопка покупки без видимого bag
- Немає remove взагалі

Мінімум на чеклісті: одна дія add, одна дія remove, обидві видно в показі.

**Зроби зараз (4 хв):** якщо є прайс - зроби buy→insert; окремо зроби кнопку/prompt Drop для remove.`,
      },
      {
        title: "Debounce і безпека",
        content: `Touched/Prompt без захисту може insert 30 разів за секунду.

\`local busy = {}\`
\`if busy[player] then return end\`
\`busy[player] = true\`
\`...\`
\`task.delay(0.35, function() busy[player] = nil end)\`

Безпека:
- не довіряй клієнту «в мене вже є / немає немає» без серверної перевірки
- limit розміру bag (наприклад 20) - захист від безкінечного insert
- валідуй, що id з дозволеного набору (білий список), якщо add приходить з Remote

На 4.3 білий список може бути маленьким масивом \`{"apple","gem","potion"}\`.

**Зроби зараз (4 хв):** додай debounce і MaxBagSize; спробуй заспамити Prompt.`,
      },
      {
        title: "remove не лише з кінця",
        content: `Новачки часто роблять лише \`table.remove(bag)\` без індексу - це прибирає останній. Інколи ок для стеку. Для інвентаря майже завжди треба remove конкретного id.

Сценарії:
- викинути gem, навіть якщо він посередині
- використати potion (remove після ефекту)
- зняти дублікат

Перевір порядок після remove: елементи після індексу зсуваються. Не кешуй старі індекси після змін.

\`local i = indexOf(bag, "gem")
-- ... щось інше insert ...
-- i може вже бути невірним!\`
Завжди шукай індекс безпосередньо перед remove.

**Зроби зараз (3 хв):** зроби bag з 3 елементів, прибери середній, надрукуй новий порядок.`,
      },
      {
        title: "Зв'язок з 4.2 і погляд у 4.4",
        content: `| Урок | Роль |
|------|------|
| 4.2 | Скільки коштує id |
| 4.3 | Чи є id в bag / додати / прибрати |
| 4.4 | Які поля має id у каталозі записів |

Сьогодні bag бажано тримати як **масив рядків-id**, не як повні словники товарів. У 4.4 з'явиться catalog з price/power; інвентар лишиться легким.

Якщо вже insert-иш цілі \`{id=,price=}\` - ок для експерименту, але в коментарі познач, що в 4.4 спростиш до id.

**Зроби зараз (2 хв):** переконайся, що елементи bag - рядки id (або явно задокументуй інший вибір).`,
      },
      {
        title: "Типові дірки інвентаря",
        content: `| Дірка | Симптом | Фікс |
|-------|---------|------|
| remove без пошуку | Зникає не той предмет | indexOf → remove |
| Правда в LocalScript | Легкий «читерський» bag | Сервер bags[player] |
| Немає показу | «Ніби додалось» | render після змін |
| Немає remove на здачі | Лише half-skill | Окремий Drop/Use |
| Спам insert | Bag з 200 apple | Debounce + MaxBagSize |
| Тема = Dropper_02 | Немає bag | Поверни фокус на інвентар |

**Зроби зараз (3 хв):** виправ першу червону дірку зі списку.`,
      },
      {
        title: "Демо для викладача",
        content: `Сценарій ~90 секунд:

1. Покажи порожній bag
2. Add apple → видно apple
3. Add gem → видно обидва
4. Remove apple → лишається gem
5. Спроба remove potion → повідомлення «немає»
6. (Опційно) buy через прайс

Говори термінами insert/remove/indexOf, не «я купив другу машину».

**Зроби зараз (4 хв):** прожени сценарій без затинань у Explorer.`,
      },
      {
        title: "Що не входить у 4.3",
        content: `| Не тема | Куди |
|---------|------|
| Повний масив записів catalog | 4.4 |
| ModuleScript Config | 4.5 |
| DataStore bag | 4.6 |
| Кнопка Unlock Dropper як головний артефакт | Застарілий слот |

Можеш лишити кнопку покупки як UX. Не можеш замінити нею відсутність remove і показу bag.

**Зроби зараз (2 хв):** прибери з маршруту демо все, що не показує insert/remove за хвилину.`,
      },
      {
        title: "Чекліст здачі 4.3",
        content: `- [ ] Є table.insert у реальному сценарії
- [ ] Є table.remove за знайденим індексом
- [ ] indexOf / еквівалент обробляє «немає предмета»
- [ ] bag на сервері (solo або bags[player])
- [ ] render показує зміни
- [ ] Debounce і/або MaxBagSize
- [ ] Елементи = id (рекомендовано)
- [ ] Немає обов'язкової здачі Unlock Dropper_02
- [ ] Save: **Lesson 4.3 - Inventory Insert Remove**

Кошик уміє рости й коротшати. Далі - анкети товарів у каталозі.

**Зроби зараз (3 хв):** галочки + фінальний Save Place.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: "table.remove без пошуку індексу",
      solution: "Знайди indexOf(id), перевір nil, тоді remove.",
    },
    {
      mistake: "Інвентар лише в LocalScript",
      solution: "Тримай bags[player] на сервері; GUI тільки показує.",
    },
    {
      mistake: "Здавати Unlock Dropper_02 замість bag",
      solution: "Артефакт дня - insert/remove інвентар з показом.",
    },
    {
      mistake: "Немає дії remove на демо",
      solution: "Окремий Drop/Use обов'язковий на чеклісті.",
    },
    {
      mistake: "Спам Touched плодить сотні insert",
      solution: "Debounce + ліміт розміру bag.",
    },
    {
      mistake: "Кешувати індекс і remove пізніше після інших змін",
      solution: "Шукай індекс безпосередньо перед remove.",
    },
  ],
  keyTakeaways: [
    "insert додає, remove прибирає за індексом",
    "Спочатку indexOf, потім remove; обробляй nil",
    "Правда інвентаря на сервері, GUI - відображення",
    "Показ після кожної зміни доводить, що list живий",
    "Покупка з прайсу - опційний вхід, не заміна теми інвентаря",
    "Далі 4.4 дасть catalog записів для цих самих id",
  ],
  summary: "Ти зібрав серверний інвентар на table.insert/remove з пошуком індексу, показом bag, debounce і відхиленням старого слоту кнопки дропера. Список id готовий стикуватись з каталогом записів у 4.4.",
  practiceTask: {
    title: "Inventory Insert Remove (~35 хв)",
    difficulty: "intermediate",
    description: `**Мета:** живий bag з add і remove.

### Part A - Каркас (8 хв)
1. bags[player] або solo bag.
2. indexOf + insert/removeById.
3. Save: Lesson 4.3 - Inventory Insert Remove.

### Part B - Дії (18 хв)
1. Prompt Add id.
2. Prompt Drop id.
3. render після змін.
4. Debounce + MaxBagSize.
5. (Опційно) buy через прайс 4.2.

### Part C - Демо (9 хв)
1. Add → Add → Remove → missing remove.
2. Прибери фокус з Unlock Dropper.
3. Фінальний Save.`,
    hints: [
      "Спочатку print bag, потім GUI",
      "remove завжди після свіжого indexOf",
      "Не замінюй урок кнопкою дропера",
    ],
    optionalChallenge: "Додай Use: remove potion лише якщо він є, і дай тимчасовий ефект (швидкість/щит) на 5 секунд.",
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: MC,
        question: "Яка тема уроку 4.3 у prod-92?",
        options: [
          "Кнопка покупки Dropper_02",
          "insert / remove інвентар",
          "Obby checkpoints",
          "DataStore lite",
        ],
        correctAnswer: 1,
        explanation: "Curriculum: insert/remove - інвентар.",
      },
      {
        id: "q2",
        type: MC,
        question: "Що робить table.insert(bag, \"gem\")?",
        options: [
          "Видаляє gem",
          "Додає gem у список",
          "Створює DataStore",
          "Вимикає Anchored",
        ],
        correctAnswer: 1,
        explanation: "Insert додає елемент.",
      },
      {
        id: "q3",
        type: MC,
        question: "Чого потребує точковий table.remove для інвентаря?",
        options: [
          "Індексу елемента (часто після пошуку id)",
          "Лише DisplayName гравця",
          "Обов'язково Skybox",
          "Видалення Workspace",
        ],
        correctAnswer: 0,
        explanation: "remove працює за індексом.",
      },
      {
        id: "q4",
        type: MC,
        question: "Навіщо indexOf перед remove?",
        options: [
          "Щоб знати позицію id і не прибрати чужий елемент",
          "Щоб намалювати Terrain",
          "Щоб створити Team",
          "Щоб вимкнути камеру",
        ],
        correctAnswer: 0,
        explanation: "Спочатку знайти, потім прибрати.",
      },
      {
        id: "q5",
        type: MC,
        question: "Де тримати правду bag?",
        options: [
          "Лише в LocalScript TextLabel",
          "На сервері в table bags[player]",
          "У назві Part",
          "У Lighting",
        ],
        correctAnswer: 1,
        explanation: "Серверна правда інвентаря.",
      },
      {
        id: "q6",
        type: MC,
        question: "Що має бути на здачі обов'язково?",
        options: [
          "Unlock другої машини дропера",
          "Лише покупка без bag",
          "Повний Obby",
          "І add, і remove з видимим показом bag",
        ],
        correctAnswer: 3,
        explanation: "Обидві операції зі списком.",
      },
      {
        id: "q7",
        type: MC,
        question: "Навіщо debounce на Prompt?",
        options: [
          "Щоб не заспамити insert десятками викликів",
          "Щоб видалити Config",
          "Щоб змінити UserId",
          "Щоб вимкнути print",
        ],
        correctAnswer: 0,
        explanation: "Захист від повторів.",
      },
      {
        id: "q8",
        type: MC,
        question: "Який тип елементів bag рекомендований перед 4.4?",
        options: [
          "Рядки id",
          "Цілі копії Workspace",
          "Функції",
          "Лише Color3 без id",
        ],
        correctAnswer: 0,
        explanation: "Легкий список id стикується з catalog.",
      },
      {
        id: "q9",
        type: MC,
        question: "Яка точна назва Save?",
        options: [
          "Lesson 4.2 - Dictionary Price",
          "Lesson 4.4 - Array of Records",
          "Buy Dropper Button",
          "Lesson 4.3 - Inventory Insert Remove",
        ],
        correctAnswer: 3,
        explanation: "Чекліст 4.3.",
      },
      {
        id: "q10",
        type: MC,
        question: "Що робити, якщо id немає в bag?",
        options: [
          "Мовчки викликати remove(1)",
          "Обробити nil і повідомити гравця",
          "Видалити весь bags",
          "Крашити Studio",
        ],
        correctAnswer: 1,
        explanation: "Безпечна гілка «немає предмета».",
      },
      {
        id: "q11",
        type: MC,
        question: "Який наступний урок після 4.3?",
        options: [
          "4.4 Масив записів",
          "5.1 Three Biomes",
          "4.1 Масиви",
          "6.7 DataStore",
        ],
        correctAnswer: 0,
        explanation: "Далі catalog records.",
      },
      {
        id: "q12",
        type: MC,
        question: "Чому погано кешувати індекс надовго?",
        options: [
          "Після інших insert/remove індекс може зіпсуватись",
          "Бо ipairs тоді заборонений",
          "Бо #bag завжди 0",
          "Бо сервер не бачить числа",
        ],
        correctAnswer: 0,
        explanation: "Шукай індекс безпосередньо перед remove.",
      },
      {
        id: "q13",
        type: MC,
        question: "Чи може покупка з прайсу бути входом у інвентар?",
        options: [
          "Так, як опційний сценарій add після canAfford",
          "Ні, прайс і bag ніколи не стикуються",
          "Лише через Terrain",
          "Лише в LocalScript без сервера",
        ],
        correctAnswer: 0,
        explanation: "Buy→insert ок; тема все одно інвентар.",
      },
      {
        id: "q14",
        type: MC,
        question: "Навіщо MaxBagSize?",
        options: [
          "Щоб обмежити ріст списку від спаму/помилок",
          "Щоб збільшити FPS обов'язково вдвічі",
          "Щоб замінити remove",
          "Щоб вимкнути Prompt",
        ],
        correctAnswer: 0,
        explanation: "Ліміт захисту інвентаря.",
      },
      {
        id: "q15",
        type: MC,
        question: "Що НЕ є метою 4.3?",
        options: [
          "Навчити insert/remove",
          "Показати живий bag",
          "Зробити Unlock Dropper_02 головним артефактом уроку",
          "Підготувати id до каталогу 4.4",
        ],
        correctAnswer: 2,
        explanation: "Старий Tycoon-слот відхилено.",
      },
    ],
  },
};
