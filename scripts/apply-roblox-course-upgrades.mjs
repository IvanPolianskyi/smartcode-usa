import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/lib/robloxLessonContent')

// ==========================================
// MODULE 3 DATA (UK & EN)
// ==========================================

const M3_DATA = {
  31: {
    uk: {
      summary: "Ти навчився створювати інтерактивні об'єкти за допомогою ClickDetector та ProximityPrompt, налаштовувати дистанцію активації та керувати станом дверей (відкрито/закрито) за допомогою змінних і умов if/else у серверному скрипті.",
      practiceTask: {
        title: "Практична робота: Інтерактивні двері (InteractDoor_v1)",
        difficulty: "beginner",
        description: `**Мета:** створити двері з логічним перемиканням стану відкрито/закрито за допомогою ProximityPrompt або ClickDetector.

### Частина А: Каркас дверей
1. Біля входу в парк або штаб побудуй коробку \`DoorFrame\` (Anchored = true) та стулку \`DoorLeaf\` (Anchored = true).
2. Згрупуй їх у Model \`InteractDoor_v1\` і признач PrimaryPart = \`DoorFrame\`.
3. Додай над дверима \`BillboardGui\` з \`TextLabel\` для підказки («Підійди та натисни E»).

### Частина Б: Логіка взаємодії
1. Додай \`ProximityPrompt\` у \`DoorLeaf\` (ActionText = «Відкрити», ObjectText = «Хвіртка», HoldDuration = 0).
2. Додай серверний \`Script\` у \`DoorLeaf\`.
3. Оголоси змінну стану \`local isOpen = false\`.
4. У події \`prompt.Triggered\` перемикай стан:
   - якщо \`isOpen == false\`, встанови \`Transparency = 0.8\`, \`CanCollide = false\`, \`prompt.ActionText = "Зачинити"\`, \`isOpen = true\`.
   - якщо \`isOpen == true\`, встанови \`Transparency = 0\`, \`CanCollide = true\`, \`prompt.ActionText = "Відкрити"\`, \`isOpen = false\`.

### Частина В: Тестування та перевірка
1. Запусти Play (F5): підійди до дверей, перевір появу підказки та натисни клавішу E.
2. Пройди крізь відчинений отвір, повернись і зачини двері знову.
3. Переконайся, що в Output немає помилок.
4. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.1 - InteractDoor_v1\`.`,
        hints: [
          "Використовуй звичайний серверний Script, а не LocalScript.",
          "Властивість CanCollide = false дозволяє персонажу вільно пройти крізь стулку.",
          "Налаштуй MaxActivationDistance в межах 8-12 стадів для природного радіусу дії.",
          "Не забувай перемикати прапорець isOpen після кожної дії."
        ],
        optionalChallenge: "Додай плавне відкриття або звук клацання замка при активації дверей."
      }
    },
    en: {
      summary: "You learned how to build interactive world objects using ClickDetector and ProximityPrompt, configure activation distance, and control door state (open/closed) using variables and if/else logic in a server Script.",
      practiceTask: {
        title: "Hands-on Practice: Interactive Door (InteractDoor_v1)",
        difficulty: "beginner",
        description: `**Objective:** Build a toggleable interactive door using ProximityPrompt or ClickDetector with clean server-side state.

### Part A: Door Frame & Model
1. Place a \`DoorFrame\` and a \`DoorLeaf\` part near your base (both Anchored = true).
2. Group them into a Model named \`InteractDoor_v1\` and set PrimaryPart = \`DoorFrame\`.
3. Add a \`BillboardGui\` with a \`TextLabel\` ("Approach and press E").

### Part B: Interaction Logic
1. Insert a \`ProximityPrompt\` inside \`DoorLeaf\` (ActionText = "Open", ObjectText = "Gate", HoldDuration = 0).
2. Insert a regular server \`Script\` inside \`DoorLeaf\`.
3. Declare \`local isOpen = false\`.
4. In \`prompt.Triggered:Connect(function() ... end)\`, toggle state:
   - When \`not isOpen\`: set \`Transparency = 0.8\`, \`CanCollide = false\`, \`prompt.ActionText = "Close"\`, \`isOpen = true\`.
   - When \`isOpen\`: set \`Transparency = 0\`, \`CanCollide = true\`, \`prompt.ActionText = "Open"\`, \`isOpen = false\`.

### Part C: Verification
1. Press Play (F5), walk up to the gate, and press E to open.
2. Walk through the opening, turn around, and close it.
3. Verify zero errors in the Output console.
4. Save Place as \`Lesson 3.1 - InteractDoor_v1\`.`,
        hints: [
          "Use a regular server Script, not a LocalScript.",
          "Setting CanCollide = false allows the player character to walk through.",
          "Keep MaxActivationDistance around 8-12 studs for intuitive interaction.",
          "Remember to flip the isOpen boolean flag on each activation."
        ],
        optionalChallenge: "Add a click sound effect or smooth color transition when the door is opened."
      }
    }
  },
  32: {
    uk: {
      summary: "Ти опанував подію Touched для виявлення фізичного контакту, навчився знаходити Humanoid у моделі персонажа, змінювати його Health та застосовувати патерн debounce із task.wait для запобігання спаму подій.",
      practiceTask: {
        title: "Практична робота: Смуга небезпек (KillLane_v1)",
        difficulty: "beginner",
        description: `**Мета:** створити зону небезпек з неоновими блоками та надійною системою пошкодження/смерті з debounce.

### Частина А: Створення небезпечної зони
1. Створи Folder \`KillLane_v1\` поруч із дверима або входом.
2. Додай 3 небезпечні блоки (\`Kill_01\`, \`Kill_02\`, \`Kill_03\`), зроби їх червоними (Really red) з матеріалом Neon та Anchored = true.

### Частина Б: Скрипт ураження з debounce
1. Додай серверний \`Script\` у блок \`Kill_01\`.
2. Оголоси змінну \`local isDebounced = false\`.
3. Підключи \`script.Parent.Touched:Connect(function(hit) ... end)\`.
4. Знайди персонажа й Humanoid: \`local humanoid = hit.Parent:FindFirstChild("Humanoid")\`.
5. Якщо \`humanoid\` існує і \`not isDebounced\`:
   - встанови \`isDebounced = true\`
   - обнули здоров'я \`humanoid.Health = 0\`
   - почекай \`task.wait(1)\` і скинь \`isDebounced = false\`.

### Частина В: Перевірка та збереження
1. Скопіюй перевірений скрипт на інші блоки смуги \`KillLane_v1\`.
2. Запусти Play: наступи на лавовий блок — персонаж гине один раз, Output залишається чистим без спаму.
3. Кинь незакріплений тестовий блок на лаву — переконайся, що помилок nil не виникає.
4. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.2 - KillLane_v1\`.`,
        hints: [
          "Завжди перевіряй наявність Humanoid через hit.Parent:FindFirstChild(\"Humanoid\").",
          "Debounce запобігає десяткам викликів функції за одну частку секунди.",
          "Встановлюй Anchored = true для всіх лавових плит, щоб вони не провалювалися крізь землю.",
          "Використовуй task.wait замість застарілого wait."
        ],
        optionalChallenge: "Зроби блок, який не вбиває миттєво, а віднімає по 25 Health кожні 0.5 секунди з ефектом спалаху кольору."
      }
    },
    en: {
      summary: "You mastered the Touched event for collision detection, learned to find the Humanoid in character models, change Health safely, and apply debounce with task.wait to avoid event spam.",
      practiceTask: {
        title: "Hands-on Practice: Hazard Lane (KillLane_v1)",
        difficulty: "beginner",
        description: `**Objective:** Create a hazard lane with neon hazard parts and a robust debounce damage script.

### Part A: Hazard Zone
1. Create a Folder named \`KillLane_v1\`.
2. Add 3 hazard parts (\`Kill_01\`, \`Kill_02\`, \`Kill_03\`) with Neon material, Really red color, Anchored = true.

### Part B: Debounce Damage Script
1. Add a server \`Script\` inside \`Kill_01\`.
2. Add debounce logic:
\`\`\`lua
local part = script.Parent
local isDebounced = false

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid and not isDebounced then
        isDebounced = true
        humanoid.Health = 0
        task.wait(1)
        isDebounced = false
    end
end)
\`\`\`

### Part C: Verification
1. Duplicate the script into the other hazard parts.
2. Playtest: step on the lava part — the character dies cleanly once without spamming Output.
3. Drop an unanchored test part onto the hazard — verify no nil indexing errors.
4. Save Place as \`Lesson 3.2 - KillLane_v1\`.`,
        hints: [
          "Always check hit.Parent:FindFirstChild(\"Humanoid\") before reading Health.",
          "Debounce guards your game against multiple rapid triggers on each footstep.",
          "Ensure hazard parts are Anchored = true so they don't fall through the floor.",
          "Use task.wait instead of legacy wait."
        ],
        optionalChallenge: "Create a poison pad that deals 25 damage every 0.5 seconds instead of instant death."
      }
    }
  },
  33: {
    uk: {
      summary: "Ти навчився використовувати числові змінні для відстеження очок і таймерів, оновлювати їхні значення під час ігрових подій та динамічно виводити актуальний рахунок через інтерфейс BillboardGui.",
      practiceTask: {
        title: "Практична робота: Лічильник монет та таймер (Counter_v1)",
        difficulty: "beginner",
        description: `**Мета:** створити інтерактивний об'єкт збору очок із динамічним лічильником на екрані або у світі.

### Частина А: Створення стенду очок
1. Створи блок \`CoinStand\` золотого кольору з матеріалом Neon, Anchored = true.
2. Додай всередину \`BillboardGui\` (AlwaysOnTop = true, ExtentsOffset = Vector3.new(0, 2, 0)).
3. Усередині BillboardGui створи \`TextLabel\` з текстом «Coins: 0», TextScaled = true.

### Частина Б: Логіка підрахунку
1. Додай \`ClickDetector\` або \`ProximityPrompt\` у \`CoinStand\`.
2. Додай серверний \`Script\` зі змінною \`local coinCount = 0\`.
3. При кожній активації збільшуй \`coinCount = coinCount + 1\`.
4. Оновлюй текст: \`textLabel.Text = "Coins: " .. tostring(coinCount)\`.

### Частина В: Тестування
1. Запусти Play: клікни по стенду 5 разів, переконайся, що число на лічильнику збільшується з 0 до 5.
2. Перевір відображення під різними кутами камери.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.3 - Counter_v1\`.`,
        hints: [
          "Для з'єднання рядка і числа у Lua використовуй дві крапки: \"Coins: \" .. coinCount.",
          "AlwaysOnTop у BillboardGui дозволяє бачити текст крізь інші перешкоди.",
          "Зберігай початковий стан змінної coinCount = 0 на початку скрипта."
        ],
        optionalChallenge: "Додай умову: коли гравець набирає 10 монет, стенд змінює колір на зелений і відкриває секретний прохід."
      }
    },
    en: {
      summary: "You learned how to use numeric variables to track score and countdown timers, increment/decrement values on player actions, and display live counts using BillboardGui.",
      practiceTask: {
        title: "Hands-on Practice: Coin Counter & Timer (Counter_v1)",
        difficulty: "beginner",
        description: `**Objective:** Build an interactive score-tracking object with live in-world BillboardGui counter updates.

### Part A: Coin Stand Model
1. Create a neon gold part named \`CoinStand\` (Anchored = true).
2. Insert a \`BillboardGui\` (AlwaysOnTop = true, ExtentsOffset = Vector3.new(0, 2, 0)).
3. Add a \`TextLabel\` inside ("Coins: 0", TextScaled = true).

### Part B: Increment Logic
1. Insert a \`ClickDetector\` or \`ProximityPrompt\` into \`CoinStand\`.
2. Insert a \`Script\` tracking \`local coins = 0\`.
3. On trigger, increment \`coins = coins + 1\` and set \`textLabel.Text = "Coins: " .. coins\`.

### Part C: Playtest
1. Click the stand 5 times in Play mode and confirm the display updates smoothly 0 → 5.
2. Save Place as \`Lesson 3.3 - Counter_v1\`.`,
        hints: [
          "Use Lua string concatenation: \"Coins: \" .. coins.",
          "AlwaysOnTop ensures the score is visible even behind obstacles.",
          "Initialize coins = 0 outside the event handler so it doesn't reset on each click."
        ],
        optionalChallenge: "Add a goal trigger: when coins reach 10, turn the stand green and play a victory chime."
      }
    }
  },
  34: {
    uk: {
      summary: "Ти опанував нескінченні цикли while true do у Roblox Studio, зрозумів критичну важливість task.wait() для захисту від зависання рушія та навчився створювати періодичні рухомі пастки і спавнери об'єктів.",
      practiceTask: {
        title: "Практична робота: Періодичний спавнер (HazardSpawner_v1)",
        difficulty: "intermediate",
        description: `**Мета:** створити спавнер, який періодично генерує падаючі небезпечні блоки за допомогою циклу while.

### Частина А: Платформа спавнера
1. Створи платформу \`SpawnerPlatform\` високо над рівнем (Position Y = 30), Anchored = true.
2. Додай під платформою зону прийому, де гравець має ухилятися від падаючих предметів.

### Частина Б: Цикл спавну з task.wait
1. Додай \`Script\` всередину \`SpawnerPlatform\`.
2. Напиши нескінченний цикл:
\`\`\`lua
while true do
    task.wait(2)
    local hazard = Instance.new("Part")
    hazard.Name = "FallingHazard"
    hazard.Size = Vector3.new(2, 2, 2)
    hazard.Material = Enum.Material.Neon
    hazard.BrickColor = BrickColor.new("Bright red")
    hazard.Position = script.Parent.Position - Vector3.new(0, 3, 0)
    hazard.Anchored = false
    hazard.Parent = workspace
    
    -- Автоматичне видалення через 5 секунд
    game:GetService("Debris"):AddItem(hazard, 5)
end
\`\`\`

### Частина В: Перевірка безпеки
1. Запусти Play: переконайся, що блоки стабільно падають кожні 2 секунди й зникають через 5 секунд.
2. Перевір навантаження: пам'ять не переповнюється, бо старі блоки вчасно знищуються.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.4 - HazardSpawner_v1\`.`,
        hints: [
          "НІКОЛИ не запускай while true без task.wait() всередині — це миттєво зависне Studio.",
          "Використовуй Debris:AddItem(hazard, 5) для безпечного видалення тимчасових об'єктів.",
          "Встановлюй Anchored = false для падаючих об'єктів, щоб на них діяла гравітація."
        ],
        optionalChallenge: "Додай до падаючих блоків скрипт Touched, який наносить шкоду персонажу при прямому влучанні."
      }
    },
    en: {
      summary: "You learned how while true do loops work in Roblox, why task.wait() is mandatory to prevent Studio crashes, and how to create periodic hazard spawners.",
      practiceTask: {
        title: "Hands-on Practice: Hazard Spawner (HazardSpawner_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Build a repeating hazard spawner using a safe while loop and Debris cleanup.

### Part A: Spawner Setup
1. Create a platform part named \`SpawnerPlatform\` elevated high in the air (Anchored = true).

### Part B: While Loop with task.wait
1. Add a server \`Script\` inside the spawner:
\`\`\`lua
local Debris = game:GetService("Debris")

while true do
    task.wait(2)
    local hazard = Instance.new("Part")
    hazard.Name = "FallingHazard"
    hazard.Size = Vector3.new(2, 2, 2)
    hazard.Material = Enum.Material.Neon
    hazard.BrickColor = BrickColor.new("Bright red")
    hazard.Position = script.Parent.Position - Vector3.new(0, 3, 0)
    hazard.Anchored = false
    hazard.Parent = workspace
    
    Debris:AddItem(hazard, 5)
end
\`\`\`

### Part C: Verification
1. Playtest: ensure hazards spawn every 2 seconds and delete after 5 seconds without lagging the game.
2. Save Place as \`Lesson 3.4 - HazardSpawner_v1\`.`,
        hints: [
          "NEVER run a while true loop without task.wait() — it will freeze Studio.",
          "Debris:AddItem automatically removes objects after a lifetime.",
          "Set Anchored = false so the spawned parts fall with gravity."
        ],
        optionalChallenge: "Attach a Touched damage script to spawned hazards so they eliminate players on contact."
      }
    }
  },
  35: {
    uk: {
      summary: "Ти навчився застосовувати числовий цикл for для процедурної генерації сходів, рядів платформ та ітерації колекцій через ipairs, створюючи складну геометрію кількома рядками коду.",
      practiceTask: {
        title: "Практична робота: Генератор сходів (StairBuilder_v1)",
        difficulty: "intermediate",
        description: `**Мета:** автоматично побудувати сходи з 10 сходинок за допомогою числового циклу for.

### Частина А: Створення скрипта генератора
1. Створи Part \`StairBase\` на землі як стартову точку.
2. Додай усередину \`Script\` із назвою \`StairBuilder\`.

### Частина Б: Написання циклу for
1. У скрипті створи цикл від 1 до 10:
\`\`\`lua
local basePos = script.Parent.Position

for i = 1, 10 do
    local step = Instance.new("Part")
    step.Name = "Step_" .. i
    step.Size = Vector3.new(6, 1, 3)
    step.Position = basePos + Vector3.new(0, i * 1.2, i * 3)
    step.Anchored = true
    step.Material = Enum.Material.SmoothPlastic
    step.BrickColor = BrickColor.new(i % 2 == 0 and "Bright blue" or "Bright yellow")
    step.Parent = workspace
end
\`\`\`

### Частина В: Play-тест сходів
1. Запусти Play: сходи миттєво з'являються на старті.
2. Пробіжи персонажем від першої сходинки до десятої — висота та інтервал мають бути зручними для підйому без застрягання.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.5 - StairBuilder_v1\`.`,
        hints: [
          "Числовий цикл for i = 1, 10 do автоматично збільшує лічильник i на 1 на кожному кроці.",
          "Розраховуй позицію сходинки через множення: i * висота та i * глибина.",
          "Переконайся, що для кожної сходинки встановлено Anchored = true."
        ],
        optionalChallenge: "Зроби так, щоб остання 10-та сходинка була вдвічі ширшою і містила фінішний прапорець."
      }
    },
    en: {
      summary: "You mastered numeric for loops to generate staircases, platform rows, and object iterations using ipairs, generating procedural geometry in just a few lines of code.",
      practiceTask: {
        title: "Hands-on Practice: Staircase Builder (StairBuilder_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Procedurally generate a 10-step staircase using a numeric for loop.

### Part A: Generator Anchor
1. Create a \`StairBase\` part on the ground (Anchored = true).
2. Insert a server \`Script\` named \`StairBuilder\`.

### Part B: For Loop Generation
1. Write the generation loop:
\`\`\`lua
local basePos = script.Parent.Position

for i = 1, 10 do
    local step = Instance.new("Part")
    step.Name = "Step_" .. i
    step.Size = Vector3.new(6, 1, 3)
    step.Position = basePos + Vector3.new(0, i * 1.2, i * 3)
    step.Anchored = true
    step.Material = Enum.Material.SmoothPlastic
    step.BrickColor = BrickColor.new(i % 2 == 0 and "Bright blue" or "Bright yellow")
    step.Parent = workspace
end
\`\`\`

### Part C: Verification
1. Press Play: 10 alternating colored stairs appear instantly.
2. Climb from bottom to top to confirm proper step height.
3. Save Place as \`Lesson 3.5 - StairBuilder_v1\`.`,
        hints: [
          "A numeric for i = 1, 10 loop automatically increments i by 1 each step.",
          "Calculate offsets using multiplication: i * height and i * depth.",
          "Ensure step.Anchored = true so steps stay in place."
        ],
        optionalChallenge: "Make the final 10th step twice as wide with a golden trophy platform."
      }
    }
  },
  36: {
    uk: {
      summary: "Ти навчився створювати власні функції з параметрами та значеннями повернення (return), структурувати код за принципом DRY (Don't Repeat Yourself) та повторно використовувати логіку пошкодження й лікування.",
      practiceTask: {
        title: "Практична робота: Модульні функції дій (HelperFunctions_v1)",
        difficulty: "intermediate",
        description: `**Мета:** написати окремі функції для лікування та нанесення шкоди і підключити їх до різних ігрових плит.

### Частина А: Створення платформ
1. Створи дві плити поруч: червону \`TrapPad\` і зелену \`HealPad\`.
2. Обидві плити повинні мати \`Anchored = true\` та знаходитися в окремій Model \`EffectPads\`.

### Частина Б: Скрипт із функціями
1. Додай \`Script\` у \`EffectPads\`.
2. Напиши допоміжні функції:
\`\`\`lua
local function modifyHealth(humanoid, amount)
    if not humanoid or humanoid.Health <= 0 then return false end
    humanoid.Health = math.clamp(humanoid.Health + amount, 0, humanoid.MaxHealth)
    print("Health changed by", amount, "New Health:", humanoid.Health)
    return true
end
\`\`\`
3. Підключи \`TrapPad.Touched\` до виклику \`modifyHealth(humanoid, -25)\` з debounce.
4. Підключи \`HealPad.Touched\` до виклику \`modifyHealth(humanoid, 25)\` з debounce.

### Частина В: Перевірка функцій
1. Запусти Play: наступи на червону плиту (здоров'я зменшується на 25), потім на зелену (здоров'я відновлюється).
2. Перевір Output на вивід коректних значень.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.6 - HelperFunctions_v1\`.`,
        hints: [
          "Використовуй math.clamp для захисту від значень здоров'я менше 0 або більше MaxHealth.",
          "Функції дозволяють змінювати логіку лікування або шкоди в одному місці замість десятків скриптів.",
          "Завжди передавай конкретний Humanoid і числове значення як аргументи функції."
        ],
        optionalChallenge: "Додай третю функцію applySpeedBoost(humanoid, boostAmount, duration), яка тимчасово прискорює гравця."
      }
    },
    en: {
      summary: "You learned how to structure code with reusable functions, parameters, and return values, eliminating code duplication across damage, healing, and effect handlers.",
      practiceTask: {
        title: "Hands-on Practice: Helper Functions (HelperFunctions_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Create modular health-modifying functions and wire them to separate trigger pads.

### Part A: Pad Setup
1. Place a red \`TrapPad\` and a green \`HealPad\` in a Model named \`EffectPads\` (Anchored = true).

### Part B: Shared Function Script
1. Add a server \`Script\` inside \`EffectPads\`:
\`\`\`lua
local function modifyHealth(humanoid, amount)
    if not humanoid or humanoid.Health <= 0 then return false end
    humanoid.Health = math.clamp(humanoid.Health + amount, 0, humanoid.MaxHealth)
    print("Health modified by", amount, "Current:", humanoid.Health)
    return true
end
\`\`\`
2. Connect \`TrapPad.Touched\` to \`modifyHealth(humanoid, -25)\` with debounce.
3. Connect \`HealPad.Touched\` to \`modifyHealth(humanoid, 25)\` with debounce.

### Part C: Verification
1. Step on TrapPad (Health drops by 25), then step on HealPad (Health recovers).
2. Save Place as \`Lesson 3.6 - HelperFunctions_v1\`.`,
        hints: [
          "math.clamp keeps Health cleanly bounded between 0 and MaxHealth.",
          "Functions let you update logic in one central spot instead of duplicating code.",
          "Pass the target Humanoid and numeric amount as explicit parameters."
        ],
        optionalChallenge: "Add a third function applySpeedBoost(humanoid, boostAmount, duration) for temporary sprint boosts."
      }
    }
  },
  37: {
    uk: {
      summary: "Ти зрозумів фундаментальну відмінність між клієнтським LocalScript і серверним Script, навчився створювати інтерфейс у StarterGui та обробляти натискання екранних кнопок без затримок мережі.",
      practiceTask: {
        title: "Практична робота: Інтерактивний HUD (PlayerGui_v1)",
        difficulty: "intermediate",
        description: `**Мета:** створити клієнтський інтерфейс у StarterGui з кнопкою прискорення через LocalScript.

### Частина А: Створення GUI
1. У панелі Explorer знайди папку \`StarterGui\`.
2. Додай \`ScreenGui\` з назвою \`MainHUD\`.
3. Усередині ScreenGui створи \`TextButton\` з назвою \`SprintButton\`.
4. Налаштуй кнопку: розмір (0, 140, 0, 50), позиція внизу праворуч, текст «Sprint: OFF», контрастний фон.

### Частина Б: LocalScript клієнта
1. Додай \`LocalScript\` всередину \`SprintButton\`.
2. Напиши логіку перемикання спринту:
\`\`\`lua
local button = script.Parent
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local isSprinting = false

button.MouseButton1Click:Connect(function()
    isSprinting = not isSprinting
    if isSprinting then
        humanoid.WalkSpeed = 32
        button.Text = "Sprint: ON"
        button.BackgroundColor3 = Color3.fromRGB(46, 204, 113)
    else
        humanoid.WalkSpeed = 16
        button.Text = "Sprint: OFF"
        button.BackgroundColor3 = Color3.fromRGB(52, 152, 219)
    end
end)
\`\`\`

### Частина В: Перевірка клієнтської взаємодії
1. Запусти Play: натисни кнопку мишею на екрані.
2. Переконайся, що швидкість бігу персонажа миттєво подвоюється, а текст кнопки змінюється на «Sprint: ON».
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 3.7 - PlayerGui_v1\`.`,
        hints: [
          "LocalScript працює виключно на клієнті (в StarterGui, StarterPlayerScripts або всередині Character).",
          "Зміна WalkSpeed на клієнті в Roblox автоматично синхронізується з рухом власного персонажа.",
          "Для доступу до гравця на клієнті завжди використовуй game.Players.LocalPlayer."
        ],
        optionalChallenge: "Додай до кнопки шкалу витривалості (Stamina), яка повільно витрачається під час бігу і відновлюється під час ходьби."
      }
    },
    en: {
      summary: "You mastered the difference between client LocalScripts and server Scripts, learned how to build UI in StarterGui, and handle on-screen button clicks.",
      practiceTask: {
        title: "Hands-on Practice: Interactive HUD (PlayerGui_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Build a responsive client-side UI in StarterGui with a sprint toggle button.

### Part A: ScreenGui Setup
1. In \`StarterGui\`, add a \`ScreenGui\` named \`MainHUD\`.
2. Insert a \`TextButton\` named \`SprintButton\` in the bottom-right corner.

### Part B: Client LocalScript
1. Add a \`LocalScript\` inside \`SprintButton\`:
\`\`\`lua
local button = script.Parent
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local isSprinting = false

button.MouseButton1Click:Connect(function()
    isSprinting = not isSprinting
    if isSprinting then
        humanoid.WalkSpeed = 32
        button.Text = "Sprint: ON"
        button.BackgroundColor3 = Color3.fromRGB(46, 204, 113)
    else
        humanoid.WalkSpeed = 16
        button.Text = "Sprint: OFF"
        button.BackgroundColor3 = Color3.fromRGB(52, 152, 219)
    end
end)
\`\`\`

### Part C: Verification
1. Press Play: click the on-screen button and verify instant walk speed toggling between 16 and 32.
2. Save Place as \`Lesson 3.7 - PlayerGui_v1\`.`,
        hints: [
          "LocalScripts run only on the client (StarterGui, StarterPlayerScripts, Character).",
          "WalkSpeed changes on the client automatically replicate character movement.",
          "Use game.Players.LocalPlayer to access the local client player."
        ],
        optionalChallenge: "Add a stamina meter that depletes while sprinting and recharges when walking."
      }
    }
  },
  38: {
    uk: {
      summary: "Ти успішно завершив Модуль 3 і зібрав комплексну інтерактивну арену PlayableArena_v1, об'єднавши двері на ProximityPrompt, лавові блоки з debounce, цикл-спавнер, допоміжні функції та клієнтський HUD.",
      practiceTask: {
        title: "Фінальний проект модуля 3: Ігрова Арена (PlayableArena_v1)",
        difficulty: "intermediate",
        description: `**Мета:** об'єднати всі системи модуля 3 у завершений міні-рівень з проходженням, небезпеками та таймером.

### Частина А: Архітектура арени
1. Побудуй закриту тестову зону \`PlayableArena_v1\` з парканом і вхідними дверима \`InteractDoor\` (3.1).
2. Розмісти смугу перешкод \`KillLane\` (3.2) з лавовими плитами на шляху до фінішу.
3. Додай над ареною \`HazardSpawner\` (3.4), що скидає бонуси або перешкоди.

### Частина Б: Інтеграція логіки та GUI
1. Створи єдиний модуль функцій взаємодії для нарахування очок і лікування (3.6).
2. Додай у \`StarterGui\` інтерфейс з кнопкою спринту (3.7) та лічильником зібраних предметів (3.3).
3. Додай фінішний тригер, який відчиняє вихід після збору 3 монет.

### Частина В: Фінальний тест і здача
1. Пройди весь маршрут від вхідних дверей до фінішного виходу:
   - відкрий двері через ProximityPrompt (E);
   - увімкни спринт через HUD;
   - перестрибни лавові блоки;
   - збери 3 монети зі спавнера та відкрий вихід.
2. Перевір відсутність помилок в Output під час перезапуску та смерті персонажа.
3. Збережи проект: **File → Save to Roblox** під назвою \`Lesson 3.8 - PlayableArena_v1\`.`,
        hints: [
          "Перевір Anchored = true для всіх платформ і стін арени.",
          "Переконайся, що всі скрипти використовують debounce, щоб уникнути подвійних спрацювань.",
          "Якщо персонаж гине, HUD та скрипти мають коректно працювати після респавну."
        ],
        optionalChallenge: "Додай екранний таймер на 45 секунд: якщо гравець не встигає пройти арену, вхідні двері блокуються."
      }
    },
    en: {
      summary: "You completed Module 3 by building the integrated PlayableArena_v1 mini-game, combining ProximityPrompt doors, debounce hazards, spawner loops, helper functions, and client HUD.",
      practiceTask: {
        title: "Module 3 Final Project: Playable Arena (PlayableArena_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Integrate all Module 3 systems into a complete obstacle mini-game arena.

### Part A: Arena Architecture
1. Assemble a walled arena with an \`InteractDoor\` (3.1) entrance.
2. Place a \`KillLane\` (3.2) hazard zone across the middle floor.
3. Add a high-altitude \`HazardSpawner\` (3.4) dropping timed obstacle cubes.

### Part B: Logic & HUD Integration
1. Wire damage/healing helper functions (3.6) into arena pads.
2. Add the sprint toggle button (3.7) and coin counter (3.3) to \`StarterGui\`.
3. Unlock the exit gate when the player collects 3 coin bonuses.

### Part C: Full Playtest
1. Test the full course: open door → sprint past falling hazards → jump over lava → collect 3 coins → reach exit.
2. Confirm clean Output logs on character resets.
3. Save Place as \`Lesson 3.8 - PlayableArena_v1\`.`,
        hints: [
          "Check Anchored = true on all static walls and platforms.",
          "Ensure every damage/collection trigger uses debounce.",
          "Verify the HUD continues functioning after character respawns."
        ],
        optionalChallenge: "Add a 45-second countdown timer: if time expires before reaching the exit, lock the arena."
      }
    }
  }
}

// ==========================================
// MODULE 4 DATA (UK & EN)
// ==========================================

const M4_DATA = {
  41: {
    uk: {
      summary: "Ти навчився створювати та обробляти індексовані таблиці (масиви) у Lua, використовувати функції table.insert та table.remove, визначати довжину масиву через оператор # та перебирати елементи за допомогою ipairs.",
      practiceTask: {
        title: "Практична робота: Масив нагород (RewardsArray_v1)",
        difficulty: "intermediate",
        description: `**Мета:** створити та протестувати список нагород гравця за допомогою методів роботи з масивами.

### Частина А: Створення скрипта менеджера
1. У \`ServerScriptService\` створи новий Script з назвою \`RewardsManager\`.
2. Оголоси початковий масив нагород: \`local rewards = {"WoodSword", "HealthPotion", "IronShield"}\`.

### Частина Б: Робота з елементами масиву
1. Виведи початковий розмір списку: \`print("Кількість нагород:", #rewards)\`.
2. Додай нову нагороду в кінець масиву: \`table.insert(rewards, "GoldBow")\`.
3. Видали перший елемент: \`table.remove(rewards, 1)\`.
4. Виведи всі актуальні нагороди через цикл \`ipairs\`:
\`\`\`lua
for index, itemName in ipairs(rewards) do
    print(string.format("Слот #%d: %s", index, itemName))
end
\`\`\`

### Частина В: Перевірка в Output
1. Запусти Play: перевір журнал Output.
2. Переконайся, що WoodSword видалено, а список містить HealthPotion, IronShield та GoldBow.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.1 - RewardsArray_v1\`.`,
        hints: [
          "Індексація масивів у Lua починається з 1, а не з 0.",
          "Оператор # повертає кількість елементів у суцільному масиві.",
          "Для перебору масивів завжди використовуй ipairs (i = index)."
        ],
        optionalChallenge: "Напиши функцію hasReward(rewardName), яка повертає true, якщо предмет є в масиві, або false, якщо немає."
      }
    },
    en: {
      summary: "You learned how to create indexed arrays in Lua, manipulate elements with table.insert and table.remove, get table length via the # operator, and iterate items with ipairs.",
      practiceTask: {
        title: "Hands-on Practice: Rewards Array (RewardsArray_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Create and manipulate a rewards array using core Lua table methods.

### Part A: Manager Script
1. In \`ServerScriptService\`, create a Script named \`RewardsManager\`.
2. Declare an array: \`local rewards = {"WoodSword", "HealthPotion", "IronShield"}\`.

### Part B: Array Methods
1. Insert a new item: \`table.insert(rewards, "GoldBow")\`.
2. Remove the first item: \`table.remove(rewards, 1)\`.
3. Iterate and print items using \`ipairs\`:
\`\`\`lua
for index, itemName in ipairs(rewards) do
    print("Slot #" .. index .. ": " .. itemName)
end
\`\`\`

### Part C: Verification
1. Press Play: verify Output displays 3 items in order (HealthPotion, IronShield, GoldBow).
2. Save Place as \`Lesson 4.1 - RewardsArray_v1\`.`,
        hints: [
          "Lua arrays are 1-indexed (first element is index 1).",
          "The # operator returns the length of contiguous arrays.",
          "Always use ipairs for indexed array loops."
        ],
        optionalChallenge: "Write a helper function hasReward(rewardName) that returns true if the item exists in the array."
      }
    }
  },
  42: {
    uk: {
      summary: "Ти опанував словники (таблиці «ключ-значення») у Lua, навчився структурувати параметри предметів, виконувати миттєвий пошук за текстовим ключем та перебирати пари за допомогою pairs.",
      practiceTask: {
        title: "Практична робота: База даних предметів (ItemDatabase_v1)",
        difficulty: "intermediate",
        description: `**Мета:** створити словник характеристик предметів з функцією пошуку та розрахунку вартості.

### Частина А: Створення бази предметів
1. У \`ServerScriptService\` створи Script із назвою \`ItemDatabase\`.
2. Оголоси словник предметів із вкладеними таблицями характеристик:
\`\`\`lua
local itemDatabase = {
    Sword = { Damage = 25, Cost = 100, LevelReq = 1 },
    Axe = { Damage = 40, Cost = 250, LevelReq = 3 },
    MagicStaff = { Damage = 65, Cost = 600, LevelReq = 5 }
}
\`\`\`

### Частина Б: Функція пошуку за ключем
1. Напиши функцію \`local function printItemInfo(itemName)\`:
\`\`\`lua
local function printItemInfo(itemName)
    local data = itemDatabase[itemName]
    if data then
        print(string.format("Предмет [%s]: Шкода = %d, Ціна = %d монет, Рівень = %d", 
            itemName, data.Damage, data.Cost, data.LevelReq))
    else
        warn("Предмет не знайдено в базі даних: " .. tostring(itemName))
    end
end
\`\`\`
2. Виклич функцію для "Sword", "Axe" та неіснуючого предмета "DragonArmor".

### Частина В: Перевірка та збереження
1. Запусти Play і перевір Output: характеристики відомих предметів виводяться коректно, а для неіснуючого виводиться попередження warn.
2. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.2 - ItemDatabase_v1\`.`,
      hints: [
        "Для доступу за рядковим ключем використовуй квадратні дужки table[\"Key\"] або крапку table.Key.",
        "Для перебору словників типу ключ-значення завжди використовуй pairs замість ipairs.",
        "Завжди перевіряй if data ~= nil перед зверненням до вкладених полів."
      ],
      optionalChallenge: "Напиши функцію getAffordableItems(playerCoins), яка повертає список усіх предметів, що гравець може купити на свій баланс."
    }
  },
  43: {
    uk: {
      summary: "Ти створив систему інвентарю гравця на основі таблиць, реалізував контроль максимальної місткості, додавання, видалення та пошук предметів у сумці.",
      practiceTask: {
        title: "Практична робота: Система інвентарю (InventorySystem_v1)",
        difficulty: "intermediate",
        description: `**Мета:** розробити скрипт управління інвентарем гравця з лімітом слотів.

### Частина А: Структура інвентарю
1. У \`ServerScriptService\` створи Script із назвою \`InventoryManager\`.
2. Оголоси константу місткості та таблицю інвентарю:
\`\`\`lua
local MAX_CAPACITY = 4
local playerInventory = {}
\`\`\`

### Частина Б: Методи інвентарю
1. Напиши функцію \`addItem(itemName)\`: перевіряє \`#playerInventory < MAX_CAPACITY\`, додає предмет через \`table.insert\` і повертає true, інакше виводить попередження та повертає false.
2. Напиши функцію \`removeItem(itemName)\`: знаходить індекс предмета і видаляє його через \`table.remove\`.
3. Напиши функцію \`printInventory()\`: виводить поточний вміст і зайняті слоти.

### Частина В: Тест на переповнення
1. Додай 4 предмети: "Potion", "Key", "Shield", "Coin".
2. Спробуй додати 5-й предмет "Gem" — скрипт має відхилити додавання з повідомленням «Інвентар переповнений!».
3. Видали "Key" і знову додай "Gem" — предмет успішно займає звільнене місце.
4. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.3 - InventorySystem_v1\`.`,
        hints: [
          "Перевірка #table < MAX_CAPACITY гарантує, що інвентар ніколи не вийде за встановлені межі.",
          "Для пошуку предмета перед видаленням використовуй цикл for index, name in ipairs(inventory) do.",
          "Звертай увагу на повернення логічного результату true/false для сповіщення інтерфейсу."
        ],
        optionalChallenge: "Додай підтримку кількості однакових предметів (стекування: {Name = \"Potion\", Count = 3})."
      }
    },
    en: {
      summary: "You built a table-based player inventory system with max capacity validation, item insertion, item removal, and inventory search.",
      practiceTask: {
        title: "Hands-on Practice: Inventory System (InventorySystem_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Develop a robust slot-capped inventory system using Lua tables and helper methods.

### Part A: Inventory State
1. In \`ServerScriptService\`, create a Script named \`InventoryManager\`.
2. Define:
\`\`\`lua
local MAX_SLOTS = 4
local playerInventory = {}
\`\`\`

### Part B: Add & Remove Operations
1. Write \`addItem(item)\` that guards on \`#playerInventory < MAX_SLOTS\`.
2. Write \`removeItem(itemName)\` that finds and removes the item index.
3. Write \`printInventory()\` to log current slots.

### Part C: Capacity Testing
1. Add 4 items, then attempt to add a 5th item.
2. Confirm the 5th item is safely rejected with "Inventory full".
3. Remove 1 item, re-add, and verify successful placement.
4. Save Place as \`Lesson 4.3 - InventorySystem_v1\`.`,
        hints: [
          "Checking #inventory < MAX_SLOTS prevents array overflow.",
          "Iterate with ipairs to locate items before removal.",
          "Return boolean status from addItem for UI feedback."
        ],
        optionalChallenge: "Implement item stacking for consumables: {Name = \"Potion\", Count = 3}."
      }
    }
  },
  44: {
    uk: {
      summary: "Ти навчився розділяти проєкт на незалежні модулі за допомогою ModuleScript у ReplicatedStorage, підключати їх через require() та повторно використовувати глобальні константи без копіювання коду.",
      practiceTask: {
        title: "Практична робота: Спільний конфіг-модуль (ConfigModule_v1)",
        difficulty: "intermediate",
        description: `**Мета:** створити ModuleScript у ReplicatedStorage та підключити його з кількох серверних скриптів.

### Частина А: Створення ModuleScript
1. У папці \`ReplicatedStorage\` створи \`ModuleScript\` і назви його \`GameConfig\`.
2. Заповни модуль таблицею налаштувань:
\`\`\`lua
local GameConfig = {}

GameConfig.VERSION = "1.0.0"
GameConfig.START_COINS = 100
GameConfig.DEFAULT_WALKSPEED = 16
GameConfig.SPRINT_WALKSPEED = 28
GameConfig.LOBBY_SPAWN = Vector3.new(0, 5, 0)

return GameConfig
\`\`\`

### Частина Б: Підключення через require()
1. У \`ServerScriptService\` створи скрипт \`PlayerSetup\`.
2. Імпортуй конфіг:
\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local GameConfig = require(ReplicatedStorage:WaitForChild("GameConfig"))

game.Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        humanoid.WalkSpeed = GameConfig.DEFAULT_WALKSPEED
        print(player.Name, "підключився до гри версії", GameConfig.VERSION)
    end)
end)
\`\`\`

### Частина В: Перевірка централізації
1. Запусти Play: перевір, що швидкість персонажа та версія беруться з модуля.
2. Зміни \`DEFAULT_WALKSPEED = 24\` у \`GameConfig\` і перезапусти Play — швидкість оновилася без змін у PlayerSetup.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.4 - ConfigModule_v1\`.`,
        hints: [
          "ModuleScript обов'язково повинен закінчуватися рядком return TableName.",
          "Розміщуй модулі в ReplicatedStorage, якщо вони потрібні і серверу, і клієнту.",
          "Використовуй WaitForChild(\"ModuleName\") перед require для надійного завантаження."
        ],
        optionalChallenge: "Додай у модуль функцію GameConfig.calculateReward(level), яка повертає кількість монет за формулою."
      }
    },
    en: {
      summary: "You learned how to structure code with ModuleScripts in ReplicatedStorage, import them using require(), and eliminate duplicate game constants across scripts.",
      practiceTask: {
        title: "Hands-on Practice: Shared Config Module (ConfigModule_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Build a central configuration ModuleScript in ReplicatedStorage and require it from server scripts.

### Part A: ModuleScript
1. In \`ReplicatedStorage\`, insert a \`ModuleScript\` named \`GameConfig\`:
\`\`\`lua
local GameConfig = {}
GameConfig.VERSION = "1.0.0"
GameConfig.START_COINS = 100
GameConfig.DEFAULT_WALKSPEED = 16
GameConfig.SPRINT_WALKSPEED = 28
return GameConfig
\`\`\`

### Part B: Requiring the Module
1. In \`ServerScriptService\`, create a Script:
\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local GameConfig = require(ReplicatedStorage:WaitForChild("GameConfig"))

game.Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        humanoid.WalkSpeed = GameConfig.DEFAULT_WALKSPEED
    end)
end)
\`\`\`

### Part C: Verification
1. Playtest: verify walk speed is applied from the module.
2. Change the module value to 24, retest, and verify instant balance updates without touching the player setup script.
3. Save Place as \`Lesson 4.4 - ConfigModule_v1\`.`,
        hints: [
          "Every ModuleScript must end with return TableName.",
          "Place shared modules in ReplicatedStorage.",
          "Always use WaitForChild before require."
        ],
        optionalChallenge: "Add a helper method GameConfig.getDropChance(rarity) to the module."
      }
    }
  },
  45: {
    uk: {
      summary: "Ти навчився проєктувати централізовані таблиці балансу гри (GameBalance), керувати рівнями складності, множниками нагород та шансами випадіння предметів з єдиного конфігураційного файлу.",
      practiceTask: {
        title: "Практична робота: Модуль балансу гри (GameBalance_v1)",
        difficulty: "intermediate",
        description: `**Мета:** налаштувати баланс ворогів та нагород у ModuleScript і спавнити об'єкти за цим конфігом.

### Частина А: Створення таблиці балансу
1. У \`ReplicatedStorage\` створи \`ModuleScript\` із назвою \`EnemyBalance\`.
2. Опиши характеристики типів ворогів:
\`\`\`lua
local EnemyBalance = {
    Slime = { Health = 50, Damage = 10, CoinReward = 15, Speed = 12, Color = "Bright green" },
    Skeleton = { Health = 100, Damage = 25, CoinReward = 45, Speed = 16, Color = "Medium stone grey" },
    Boss = { Health = 350, Damage = 50, CoinReward = 200, Speed = 10, Color = "Really red" }
}

return EnemyBalance
\`\`\`

### Частина Б: Скрипт генератора ворогів
1. У \`ServerScriptService\` створи скрипт \`EnemySpawner\`.
2. Напиши функцію спавну, яка приймає тип ворога \`spawnEnemy(enemyType, position)\`, зчитує параметри з \`EnemyBalance\` і створює Model із відповідним розміром, кольором і Health.

### Частина В: Перевірка на арені
1. Заспавни по одному Slime, Skeleton та Boss на тестовій арені.
2. Переконайся, що кожен ворог має параметри, зазначені в модулі балансу.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.5 - GameBalance_v1\`.`,
        hints: [
          "Централізація балансу в ModuleScript дозволяє змінювати складність гри за лічені секунди.",
          "Зберігай усі числові константи (швидкість, шкода, нагороди) в конфігу, а не в коді поведінки.",
          "Перевіряй наявність типу ворога в таблиці перед створенням моделі."
        ],
        optionalChallenge: "Додай таблицю ймовірностей випадіння трофеїв (LootTable) з шансами у відсотках."
      }
    },
    en: {
      summary: "You learned how to design centralized game balance tables, manage enemy tiers, reward multipliers, and loot drops from a clean configuration file.",
      practiceTask: {
        title: "Hands-on Practice: Game Balance Module (GameBalance_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Separate game stats into a dedicated balance ModuleScript and spawn enemies procedurally.

### Part A: Balance Module
1. In \`ReplicatedStorage\`, add a \`ModuleScript\` named \`EnemyBalance\`:
\`\`\`lua
local EnemyBalance = {
    Slime = { Health = 50, Damage = 10, CoinReward = 15, Speed = 12, Color = "Bright green" },
    Skeleton = { Health = 100, Damage = 25, CoinReward = 45, Speed = 16, Color = "Medium stone grey" },
    Boss = { Health = 350, Damage = 50, CoinReward = 200, Speed = 10, Color = "Really red" }
}
return EnemyBalance
\`\`\`

### Part B: Data-Driven Spawner
1. In \`ServerScriptService\`, create an \`EnemySpawner\` script that pulls stats directly from \`EnemyBalance\` when instantiating enemies.

### Part C: Verification
1. Spawn each enemy type and verify their stats match the balance table.
2. Save Place as \`Lesson 4.5 - GameBalance_v1\`.`,
        hints: [
          "Never hardcode stats inside gameplay trigger scripts.",
          "Centralized configs allow rapid live-game balancing without breaking logic.",
          "Validate enemy type existence before accessing nested keys."
        ],
        optionalChallenge: "Add a randomized weighted loot table for drops."
      }
    }
  },
  46: {
    uk: {
      summary: "Ти опанував сервіс DataStoreService у Roblox, навчився безпечно зберігати й зчитувати дані за допомогою методів SetAsync і GetAsync та захищати гру від помилок мережі через pcall.",
      practiceTask: {
        title: "Практична робота: Безпечний DataStore (DataStoreTest_v1)",
        difficulty: "intermediate",
        description: `**Мета:** налаштувати збереження та зчитування балансу монет у DataStore з обробкою помилок через pcall.

### Частина А: Налаштування доступу до API
1. Відкрий **Home → Game Settings → Security**.
2. Увімкни опцію **Enable Studio Access to API Services** і збережи зміни.

### Частина Б: Написання функцій DataStore
1. У \`ServerScriptService\` створи Script із назвою \`DataStoreTest\`.
2. Напиши безпечне читання та запис:
\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local coinStore = DataStoreService:GetDataStore("TestCoinStore_v1")

local testKey = "User_12345"
local testCoins = 250

-- Збереження
local success, err = pcall(function()
    coinStore:SetAsync(testKey, testCoins)
end)
if success then
    print("Дані успішно збережено!")
else
    warn("Помилка збереження:", err)
end

-- Зчитування
local loadSuccess, loadedCoins = pcall(function()
    return coinStore:GetAsync(testKey)
end)
if loadSuccess then
    print("Зчитано монет з хмари:", loadedCoins)
end
\`\`\`

### Частина В: Перевірка роботи
1. Запусти Play: в Output має з'явитися повідомлення про успішне збереження та зчитування 250 монет.
2. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.6 - DataStoreTest_v1\`.`,
        hints: [
          "Обов'язково увімкни Enable Studio Access to API Services у налаштуваннях гри.",
          "Завжди загортай виклики SetAsync і GetAsync у pcall, оскільки мережеві запити можуть тимчасово падати.",
          "Унікальним ключем запису зазвичай є UserId гравця (наприклад, \"Player_\" .. player.UserId)."
        ],
        optionalChallenge: "Додай перевірку на nil: якщо гравець заходить уперше і даних немає, встановлювати стартовий баланс 50 монет."
      }
    },
    en: {
      summary: "You mastered Roblox DataStoreService, learned how to save and load data with SetAsync and GetAsync, and protected calls with pcall error handling.",
      practiceTask: {
        title: "Hands-on Practice: Safe DataStore (DataStoreTest_v1)",
        difficulty: "intermediate",
        description: `**Objective:** Set up cloud DataStore persistence with pcall error handling.

### Part A: Game Security Settings
1. Open **Home → Game Settings → Security**.
2. Turn ON **Enable Studio Access to API Services** and save.

### Part B: Pcall DataStore Script
1. In \`ServerScriptService\`, create a Script:
\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local coinStore = DataStoreService:GetDataStore("CoinStore_v1")

local testKey = "Player_9999"
local testValue = 250

local saveSuccess, saveErr = pcall(function()
    coinStore:SetAsync(testKey, testValue)
end)
if saveSuccess then print("Data saved!") else warn(saveErr) end

local loadSuccess, loaded = pcall(function()
    return coinStore:GetAsync(testKey)
end)
if loadSuccess then print("Loaded coins:", loaded) end
\`\`\`

### Part C: Verification
1. Press Play: confirm output shows successful save and load of 250 coins.
2. Save Place as \`Lesson 4.6 - DataStoreTest_v1\`.`,
        hints: [
          "Studio Access to API Services must be enabled in Game Settings.",
          "Always wrap DataStore calls in pcall to protect against network drops.",
          "Use player.UserId for unique player keys."
        ],
        optionalChallenge: "Add fallback default values if GetAsync returns nil for first-time players."
      }
    }
  },
  47: {
    uk: {
      summary: "Ти реалізував повний життєвий цикл збереження даних гравця: завантаження при Players.PlayerAdded, збереження при Players.PlayerRemoving та захист від раптового закриття сервера через game:BindToClose.",
      practiceTask: {
        title: "Практична робота: Автозбереження прогресу (AutoSaveSystem_v1)",
        difficulty: "advanced",
        description: `**Мета:** створити комплексну систему збереження монет і рівня гравця з прив'язкою до leaderstats.

### Частина А: Створення структури leaderstats
1. У \`ServerScriptService\` створи Script \`SaveManager\`.
2. Підключи \`Players.PlayerAdded\`:
   - створи папку \`leaderstats\` всередині гравця;
   - створи \`IntValue\` з назвою \`Coins\` і \`IntValue\` з назвою \`Level\`.

### Частина Б: Логіка завантаження, збереження та BindToClose
1. При вході зчитуй дані з DataStore за ключем \`"Player_" .. player.UserId\` через \`pcall\` і записуй у leaderstats.
2. При виході (\`Players.PlayerRemoving\`) зберігай поточні значення \`Coins.Value\` та \`Level.Value\`.
3. Додай аварійне збереження сервера:
\`\`\`lua
game:BindToClose(function()
    for _, player in ipairs(game.Players:GetPlayers()) do
        savePlayerData(player)
    end
end)
\`\`\`

### Частина В: Повний тест прогресу
1. Запусти Play: зміни кількість Coins через панель Properties або командний рядок.
2. Зупини Play і запусти знову: перевір, що змінена кількість монет відновилася з хмари.
3. Збережи рівень: **File → Save to Roblox** під назвою \`Lesson 4.7 - AutoSaveSystem_v1\`.`,
        hints: [
          "Папка обов'язково повинна називатися leaderstats (малими літерами), щоб відображатися в таблиці лідерів.",
          "BindToClose спрацьовує перед вимкненням сервера і рятує дані гравців при перезавантаженні гри.",
          "Для збереження кількох параметрів упаковуй їх у таблицю: {Coins = 100, Level = 2}."
        ],
        optionalChallenge: "Додай періодичне автозбереження кожні 5 хвилин для всіх активних гравців на сервері."
      }
    },
    en: {
      summary: "You implemented a complete player data lifecycle: loading on Players.PlayerAdded, saving on Players.PlayerRemoving, and shutdown protection via game:BindToClose.",
      practiceTask: {
        title: "Hands-on Practice: Auto-Save System (AutoSaveSystem_v1)",
        difficulty: "advanced",
        description: `**Objective:** Create an end-to-end player progression auto-save system tied to leaderstats.

### Part A: Leaderstats Initialization
1. In \`ServerScriptService\`, create a Script named \`SaveManager\`.
2. On \`Players.PlayerAdded\`, create a \`leaderstats\` folder with \`Coins\` and \`Level\` IntValues.

### Part B: Save, Load, and BindToClose
1. Load player data on join using \`GetAsync\` in a pcall.
2. Save on \`Players.PlayerRemoving\` with \`SetAsync\`.
3. Add \`game:BindToClose\` to iterate all active players on server shutdown.

### Part C: Verification
1. Playtest: change your Coins value in Properties.
2. Stop Play, restart, and confirm your updated Coins persisted from the DataStore.
3. Save Place as \`Lesson 4.7 - AutoSaveSystem_v1\`.`,
        hints: [
          "The folder must be named 'leaderstats' (all lowercase) for the Roblox leaderboard HUD.",
          "BindToClose saves data when game servers restart.",
          "Save multiple stats as a dictionary: {Coins = 100, Level = 2}."
        ],
        optionalChallenge: "Add a periodic background auto-save loop every 5 minutes."
      }
    }
  },
  48: {
    uk: {
      summary: "Ти успішно завершив Модуль 4 і розробив повноцінний конвеєр даних FullDataPipeline_v1, поєднавши конфігурацію в ModuleScript, інвентар на таблицях та надійне збереження прогресу в DataStore.",
      practiceTask: {
        title: "Фінальний проект модуля 4: Повна система даних (FullDataPipeline_v1)",
        difficulty: "advanced",
        description: `**Мета:** об'єднати конфігурацію, інвентар і хмарне збереження у фінальну модульну систему.

### Частина А: Модуль предметів
1. У \`ReplicatedStorage\` створи \`ModuleScript\` \`ItemConfig\` зі списком доступних у грі предметів та їхніх цін.

### Частина Б: Менеджер сесії та збереження
1. У \`ServerScriptService\` створи \`DataManager\`:
   - створює \`leaderstats\` (Coins, Level);
   - веде таблицю активного інвентарю для кожного гравця;
   - зберігає і монети, і список предметів інвентарю в DataStore при виході;
   - використовує \`BindToClose\` для безпечного завершення.

### Частина В: Фінальне тестування
1. Зайди в гру, зароби монети, придбай предмет у тестовому магазині.
2. Перевір вміст інвентарю через Output.
3. Перезапусти гру й переконайся, що після нового входу всі придбані предмети та баланс монет збережені.
4. Збережи проект: **File → Save to Roblox** під назвою \`Lesson 4.8 - FullDataPipeline_v1\`.`,
        hints: [
          "DataStore підтримує збереження таблиць, тому інвентар можна зберігати як масив імен предметів.",
          "Розділяй код на модулі: Config у ReplicatedStorage, логіка збереження у ServerScriptService.",
          "Перевір консоль Output на відсутність помилок DataStore під час тестування."
        ],
        optionalChallenge: "Додай захист від втрати даних: сесійне блокування (session locking), яке перевіряє, чи не завантажений гравець на іншому сервері."
      }
    },
    en: {
      summary: "You completed Module 4 by building the complete FullDataPipeline_v1 system, combining ModuleScript configs, table-based inventory, and reliable DataStore auto-saving.",
      practiceTask: {
        title: "Module 4 Final Project: Full Data Pipeline (FullDataPipeline_v1)",
        difficulty: "advanced",
        description: `**Objective:** Combine configs, player tables, and cloud saving into an integrated production data pipeline.

### Part A: Shared Config
1. Create \`ItemConfig\` in \`ReplicatedStorage\` with item definitions and prices.

### Part B: Session & Save Manager
1. In \`ServerScriptService\`, build \`DataManager\`:
   - Setup leaderstats (Coins, Level);
   - Manage player inventory arrays;
   - Save coin balance + inventory array to DataStore on player leave;
   - Implement \`game:BindToClose\`.

### Part C: Full Pipeline Test
1. Join game, earn coins, buy items.
2. Restart game and verify coins and inventory items reload cleanly.
3. Save Place as \`Lesson 4.8 - FullDataPipeline_v1\`.`,
        hints: [
          "DataStores serialize tables directly into JSON.",
          "Keep configs in ReplicatedStorage and database logic in ServerScriptService.",
          "Check Output for zero DataStore warning logs."
        ],
        optionalChallenge: "Add session locking to prevent data race conditions across multiple server instances."
      }
    }
  }
}

// ==========================================
// MODULE 5 COMMON MISTAKES (UK & EN)
// ==========================================

const M5_MISTAKES = {
  51: {
    uk: [
      {
        mistake: "Платформи падають у прірву одразу після старту Play",
        explanation: "Для платформ біому не було встановлено властивість Anchored = true.",
        correctApproach: "Виділи всі створені частини біомів у папках Biome_1, Biome_2, Biome_3 та встанови Anchored = true."
      },
      {
        mistake: "Перший біом занадто складний, новачки не можуть зробити перші 3 стрибки",
        explanation: "Відстані між платформами у зоні навчання перевищують комфортні 6-8 стадів.",
        correctApproach: "Зроби платформи першого біому ширшими, а дистанції між ними не більше 6-8 стадів для плавного входу в гру."
      },
      {
        mistake: "Усі біоми виглядають однаково, гравець губиться в просторі",
        explanation: "Використано один і той самий матеріал та колір для всіх зон оббі.",
        correctApproach: "Використовуй контрастні палітри та матеріали для кожної з трьох папок (наприклад: Трава/Зелений -> Пісок/Жовтий -> Камінь/Темно-сірий)."
      }
    ],
    en: [
      {
        mistake: "Platforms fall into the abyss immediately after pressing Play",
        explanation: "The Anchored property was not set to true on the biome parts.",
        correctApproach: "Select all platform parts across Biome_1, Biome_2, Biome_3 folders and set Anchored = true."
      },
      {
        mistake: "Biome 1 is too punishing, preventing beginners from completing the first 3 jumps",
        explanation: "Platform gaps in the tutorial zone exceed comfortable 6-8 stud distances.",
        correctApproach: "Make starting platforms wider and keep early gaps between 6-8 studs for a gentle learning curve."
      },
      {
        mistake: "All biomes look identical, making navigation confusing",
        explanation: "The same material and color palette were used throughout the entire obby.",
        correctApproach: "Use distinct color schemes and materials for each folder (e.g., Grass/Green -> Sand/Yellow -> Basalt/Dark Grey)."
      }
    ]
  },
  52: {
    uk: [
      {
        mistake: "Лавовий блок вбиває гравця 20 разів за секунду і спамить помилки в Output",
        explanation: "У скрипті обробника Touched відсутній прапорець debounce.",
        correctApproach: "Додай змінну isDebounced = false, перевіряй її перед нанесенням шкоди і встановлюй коротку паузу task.wait(0.5)."
      },
      {
        mistake: "Скрипт видає помилку 'attempt to index nil with Health' коли на лаву падає інший блок",
        explanation: "Немає перевірки наявності компонента Humanoid у батьківському об'єкті дотику.",
        correctApproach: "Завжди перевіряй local humanoid = hit.Parent:FindFirstChild(\"Humanoid\") і нанось шкоду лише якщо humanoid ~= nil."
      },
      {
        mistake: "Небезпечні зони виглядають як звичайна підлога, гравець гине без попередження",
        explanation: "Порушено принцип чесного ігрового дизайну (fair play).",
        correctApproach: "Завжди виділяй смертельні перешкоди яскравими контрастними кольорами (Really red, Neon) або текстурою лави/кислоти."
      }
    ],
    en: [
      {
        mistake: "Lava block eliminates the player 20 times per second and floods Output logs",
        explanation: "The Touched event handler lacks a debounce guard.",
        correctApproach: "Add a local isDebounced = false variable, verify it before damage, and reset after task.wait(0.5)."
      },
      {
        mistake: "Error 'attempt to index nil with Health' occurs when non-character parts touch lava",
        explanation: "The script attempts to read Health without confirming a Humanoid exists.",
        correctApproach: "Always check local humanoid = hit.Parent:FindFirstChild(\"Humanoid\") and only apply damage if humanoid is not nil."
      },
      {
        mistake: "Hazards look like regular safe platforms, killing players unexpectedly",
        explanation: "Violates fair visual design principles.",
        correctApproach: "Always make fatal hazards unmistakably visible with bright Neon materials or lava textures."
      }
    ]
  },
  53: {
    uk: [
      {
        mistake: "Гравець може перестрибнути одразу на чекпоінт #5 і пропустити весь рівень",
        explanation: "Скрипт чекпоінта не перевіряє порядковий номер попереднього досягнутого чекпоінта.",
        correctApproach: "Дозволяй активацію чекпоінта N лише за умови, що поточний чекпоінт гравця дорівнює N - 1."
      },
      {
        mistake: "Після респавну персонаж застрягає всередині підлоги чекпоінта",
        explanation: "Точка відродження встановлена точно на висоті плити без зміщення по осі Y.",
        correctApproach: "Додавай зміщення вгору: spawnCFrame = checkpoint.CFrame + Vector3.new(0, 3.5, 0)."
      },
      {
        mistake: "Зміна чекпоінта реалізована в LocalScript і не зберігається на сервері",
        explanation: "Клієнтський LocalScript не має авторитету змінювати серверні дані гравця.",
        correctApproach: "Оновлюй активний чекпоінт виключно у серверному Script."
      }
    ],
    en: [
      {
        mistake: "Players can jump directly to checkpoint #5 and bypass the level",
        explanation: "The checkpoint script fails to validate sequential checkpoint order.",
        correctApproach: "Only activate checkpoint N if the player's current checkpoint equals N - 1."
      },
      {
        mistake: "Character spawns stuck inside the floor upon respawning",
        explanation: "Spawn CFrame was set without adding vertical height offset.",
        correctApproach: "Add a vertical offset: spawnCFrame = checkpoint.CFrame + Vector3.new(0, 3.5, 0)."
      },
      {
        mistake: "Checkpoints managed in LocalScript fail to sync on server respawns",
        explanation: "Client LocalScripts lack server authority over respawn logic.",
        correctApproach: "Manage active checkpoint state strictly inside server Scripts."
      }
    ]
  },
  54: {
    uk: [
      {
        mistake: "Студія зависає одразу після запуску Play",
        explanation: "У циклі while true do відсутній виклик task.wait().",
        correctApproach: "Обов'язково додавай task.wait(duration) усередину нескінченного циклу руху платформи."
      },
      {
        mistake: "Персонаж зісковзує або падає з платформи під час її руху",
        explanation: "Платформа рухається через Position замість плавного TweenService або PrismaticConstraint.",
        correctApproach: "Використовуй TweenService для переміщення платформ, щоб фізичний рушій коректно переносив гравця разом з нею."
      },
      {
        mistake: "Платформа зникає миттєво без візуального попередження для гравця",
        explanation: "Зміна прозорості Transparency відбувається різко, гравець не встигає зреагувати.",
        correctApproach: "Додай ефект миготіння або поступової зміни Transparency від 0 до 0.8 перед вимкненням CanCollide."
      }
    ],
    en: [
      {
        mistake: "Studio freezes immediately upon launching Play mode",
        explanation: "The while true loop is missing a task.wait() call.",
        correctApproach: "Always include task.wait(interval) inside repeating platform loops."
      },
      {
        mistake: "Player slips off moving platforms during motion",
        explanation: "Moving platforms by modifying Position directly breaks character physics friction.",
        correctApproach: "Use TweenService or Constraints for smooth kinematic platform movement."
      },
      {
        mistake: "Disappearing platforms vanish abruptly without player warning",
        explanation: "Transparency and collision drop to 0 with zero telegraphing.",
        correctApproach: "Add a 0.5s flash or fade animation before setting CanCollide = false."
      }
    ]
  },
  55: {
    uk: [
      {
        mistake: "Ключ можна підібрати нескінченну кількість разів",
        explanation: "Після підбирання ключ не знищується і не деактивується для цього гравця.",
        correctApproach: "Знищуй ключ через keyPart:Destroy() або позначай атрибутом collected = true."
      },
      {
        mistake: "Секретні двері відчиняються для всіх гравців на сервері, коли ключ знайшов один гравець",
        explanation: "Двері відкриваються глобально на сервері без персональної перевірки прав.",
        correctApproach: "Перевіряй наявність ключа в інвентарі або відкривай секрет локально через LocalScript / перевірку персонажа."
      },
      {
        mistake: "Секретний прохід неможливо знайти без читів або підказок",
        explanation: "Повна відсутність візуальних натяків на існування таємної зони.",
        correctApproach: "Залиш тонкий візуальний натяк: інший колір стіни, ледь помітні частинки або сліди на підлозі."
      }
    ],
    en: [
      {
        mistake: "Key item can be collected infinitely many times",
        explanation: "The key is neither destroyed nor tagged with a collected attribute upon touch.",
        correctApproach: "Call keyPart:Destroy() or set an attribute keyPart:SetAttribute(\"Collected\", true)."
      },
      {
        mistake: "Secret door opens for every server player when only one player finds the key",
        explanation: "Door opens globally on the server without player inventory verification.",
        correctApproach: "Verify key ownership before unlocking or toggle locally on the client."
      },
      {
        mistake: "Secret area is completely undetectable without trial-and-error guessing",
        explanation: "No visual telegraphing is provided to reward observant players.",
        correctApproach: "Add subtle hints such as distinct wall tints, particle sparks, or floor markings."
      }
    ]
  },
  56: {
    uk: [
      {
        mistake: "Тестування гри проводиться лише один раз самостійно",
        explanation: "Автор гри знає всі пастки і не бачить проблем сприйняття новачком.",
        correctApproach: "Проведи плейтест з іншими людьми (або запиши відео проходження) і зафіксуй місця, де гравці найчастіше гинуть."
      },
      {
        mistake: "Ігнорування червоних помилок у панелі Output під час плейтесту",
        explanation: "Помилки у фоні можуть зламати механіки респавну чи підрахунку очок.",
        correctApproach: "Виправ усі помилки та попередження в Output перед переходом до налаштування балансу."
      }
    ],
    en: [
      {
        mistake: "Testing only once by the developer without external blind playtests",
        explanation: "Developers memorize obstacle timings and overlook novice friction points.",
        correctApproach: "Conduct blind playtests with friends or test recordings to identify choke points."
      },
      {
        mistake: "Ignoring red error messages in the Output log during playtesting",
        explanation: "Hidden script errors can silently break respawn or scoring systems.",
        correctApproach: "Resolve all Output warnings and errors before finalizing game balance."
      }
    ]
  },
  57: {
    uk: [
      {
        mistake: "Складність зростає різким стрибком: біом 1 легкий, біом 2 неможливий",
        explanation: "Порушено плавність кривої складності (difficulty curve).",
        correctApproach: "Збільшуй дистанцію стрибків поступово: біом 1 (6-8 стадів), біом 2 (8-11 стадів), біом 3 (11-13 стадів)."
      },
      {
        mistake: "Стрибки вимагають міліметрової точності на 15+ стадів без спідбусту",
        explanation: "Стандартний персонаж Roblox не може подолати відстань понад 13-14 стадів без прискорення чи підсилення стрибка.",
        correctApproach: "Тестуй максимальну довжину стрибка власноруч без чіт-інструментів."
      }
    ],
    en: [
      {
        mistake: "Sudden difficulty spikes between biomes causing early player churn",
        explanation: "Violates smooth difficulty progression principles.",
        correctApproach: "Scale jump distances gradually: Biome 1 (6-8 studs), Biome 2 (8-11 studs), Biome 3 (11-13 studs)."
      },
      {
        mistake: "Placing 15+ stud gap jumps without providing speed boost powerups",
        explanation: "Default Roblox avatar physics cannot clear 14+ stud flat jumps.",
        correctApproach: "Keep standard jumps under 13 studs unless speed or jump modifiers are active."
      }
    ]
  },
  58: {
    uk: [
      {
        mistake: "На рівні є місця «софтлоку», де гравець застрягає без можливості вмерти або вийти",
        explanation: "Між стінами або декораціями утворилися щілини з колізією.",
        correctApproach: "Перевір усі закутки рівня і розмісти в глибоких ямах невидимі kill-блоки, що повертають на чекпоінт."
      },
      {
        mistake: "Камера застрягає в текстурах високих стін під час вузьких проходів",
        explanation: "Стіни мають увімкнену CanCollide для камери без достатнього простору.",
        correctApproach: "Зроби проходи ширшими або встанови CanQuery/CanTouch на декоративні перегородки."
      }
    ],
    en: [
      {
        mistake: "Softlock pits where players get permanently stuck without resetting",
        explanation: "Blind gaps between decorative meshes trap players without triggering death.",
        correctApproach: "Place invisible KillBricks across all dead-end crevices to reset players to checkpoints."
      },
      {
        mistake: "Camera clipping awkwardly inside high narrow walls",
        explanation: "Tight corridors collide aggressively with third-person camera occlusion.",
        correctApproach: "Widen narrow tunnels or set CanCollide = false on camera-blocking decor."
      }
    ]
  },
  59: {
    uk: [
      {
        mistake: "3D-звук чути на весь світ незалежно від відстані до джерела",
        explanation: "Властивість RollOffMaxDistance звуку встановлена на занадто велике значення або Sound знаходиться в SoundService.",
        correctApproach: "Розміщуй 3D-звук усередині конкретного Part і налаштовуй RollOffMaxDistance в межах 20-40 стадів."
      },
      {
        mistake: "Велика кількість частинок ParticleEmitter призводить до падіння FPS",
        explanation: "Встановлено надмірне значення Rate (кількість частинок на секунду).",
        correctApproach: "Тримай параметр Rate у межах 5-15 для фонових ефектів і вимикай емітери, коли вони не потрібні."
      },
      {
        mistake: "Звук підбирання монети оглушливо програється 30 разів за секунду при дотику",
        explanation: "Відсутній debounce перед викликом sound:Play().",
        correctApproach: "Програвай звук лише один раз при зміні стану та успішному зборі предмета."
      }
    ],
    en: [
      {
        mistake: "3D spatial audio heard globally across the entire map",
        explanation: "RollOffMaxDistance is set excessively high or the Sound instance is parented to SoundService.",
        correctApproach: "Parent 3D Sound instances directly inside world Parts and set RollOffMaxDistance between 20-40 studs."
      },
      {
        mistake: "High ParticleEmitter emission rates causing mobile framerate drops",
        explanation: "Rate property set excessively high on multiple simultaneous emitters.",
        correctApproach: "Keep Rate between 5-15 for ambient environmental effects."
      },
      {
        mistake: "Collection SFX plays 30 times in a fraction of a second on touch",
        explanation: "sound:Play() called without debounce filtering.",
        correctApproach: "Trigger audio playback only once upon successful pickup validation."
      }
    ]
  },
  510: {
    uk: [
      {
        mistake: "Спроба видати бейдж через BadgeService у LocalScript на клієнті",
        explanation: "Метод AwardBadge працює виключно на сервері з міркувань безпеки.",
        correctApproach: "Викликай BadgeService:AwardBadge(player.UserId, badgeId) у серверному Script при досягненні фінішної лінії."
      },
      {
        mistake: "Бейдж не видається, бо вказано пустий або тестовий ID бейджа",
        explanation: "Бейдж повинен бути попередньо створений на сайті Roblox у налаштуваннях плейсу.",
        correctApproach: "Створи Badge на вкладці Creations сторінки плейсу та встав справжній числовий BadgeId."
      },
      {
        mistake: "Гра опублікована без налаштування дозволеного типу аватара (R6 або R15)",
        explanation: "Стрибки, розраховані на R6, можуть бути непрохідними або занадто легкими на R15 через різницю в анімаціях.",
        correctApproach: "У Game Settings → Avatar обери чіткий тип аватара (наприклад, R6 або R15) під який калибрувався весь оббі."
      }
    ],
    en: [
      {
        mistake: "Attempting to award badges from a client LocalScript",
        explanation: "BadgeService:AwardBadge is strictly restricted to server Scripts for security.",
        correctApproach: "Call BadgeService:AwardBadge(player.UserId, badgeId) inside a server Script on finish line touch."
      },
      {
        mistake: "Badges fail to award due to empty or unconfigured badge IDs",
        explanation: "Badges must be provisioned in the Roblox Creator dashboard first.",
        correctApproach: "Create a Badge in Creator Hub and paste the numeric ID into your config."
      },
      {
        mistake: "Game published without enforcing Avatar Rig type (R6 vs R15)",
        explanation: "Jump clearances calibrated for R6 can fail on R15 due to animation differences.",
        correctApproach: "In Game Settings → Avatar, lock the avatar type to match your jump tuning (e.g. R6 or R15)."
      }
    ]
  }
}

// ==========================================
// TRANSFORMATION ENGINES
// ==========================================

function updateModule34File(filePath, locale, modNum) {
  let content = fs.readFileSync(filePath, 'utf8')
  const data = modNum === 3 ? M3_DATA : M4_DATA

  for (let lessonNum = 1; lessonNum <= 8; lessonNum++) {
    const key = `${modNum}${lessonNum}`
    const lessonData = data[key]?.[locale]
    if (!lessonData) continue

    const varName = `${locale}Lesson${key}`
    // Find export const varName = { ... }
    const regex = new RegExp(`(export const ${varName} = \\{[\\s\\S]*?)(quiz:\\s*\\{)`, 'm')
    const match = content.match(regex)
    if (match) {
      const summaryStr = JSON.stringify(lessonData.summary, null, 2)
      const practiceStr = JSON.stringify(lessonData.practiceTask, null, 2)
      
      let insertion = `  summary: ${summaryStr},\n  practiceTask: ${practiceStr},\n  `
      
      // If summary already exists in block, remove it first
      let block = match[1]
      if (block.includes('summary:')) {
        block = block.replace(/summary:\s*["'`][\s\S]*?["'`],\s*/g, '')
      }
      if (block.includes('practiceTask:')) {
        block = block.replace(/practiceTask:\s*\{[\s\S]*?\},\s*/g, '')
      }
      
      const newBlock = block + insertion + match[2]
      content = content.replace(match[0], newBlock)
      console.log(`Updated ${varName} in ${path.basename(filePath)}`)
    } else {
      console.warn(`Could not find ${varName} in ${path.basename(filePath)}`)
    }
  }

  fs.writeFileSync(filePath, content, 'utf8')
}

function updateModule5File(filePath, locale) {
  let content = fs.readFileSync(filePath, 'utf8')

  // 1. Inject commonMistakes for lessons 5.1 to 5.10
  for (let lessonNum = 1; lessonNum <= 10; lessonNum++) {
    const key = `5${lessonNum}`
    const mistakes = M5_MISTAKES[key]?.[locale]
    if (!mistakes) continue

    const varName = `${locale}Lesson${key}`
    const regex = new RegExp(`(export const ${varName} = \\{[\\s\\S]*?)(summary:\\s*|practiceTask:\\s*|quiz:\\s*)`, 'm')
    const match = content.match(regex)
    if (match) {
      const mistakesStr = JSON.stringify(mistakes, null, 2)
      let block = match[1]
      if (block.includes('commonMistakes:')) {
        block = block.replace(/commonMistakes:\s*\[[\s\S]*?\],\s*/g, '')
      }
      const insertion = `  commonMistakes: ${mistakesStr},\n  `
      const newBlock = block + insertion + match[2]
      content = content.replace(match[0], newBlock)
      console.log(`Injected commonMistakes for ${varName} in ${path.basename(filePath)}`)
    }
  }

  // 2. Fix duplicate option in lesson 5.4 question 9
  if (locale === 'uk') {
    content = content.replace(
      /options:\s*\[\s*"5\.7 видаляє Config",\s*"Difficulty curve крутитиме waitUp\/waitDown як важіль",\s*"5\.7 видаляє Config",\s*"Платформи більше не потрібні",\s*\]/m,
      `options: [\n          "5.7 видаляє Config",\n          "Difficulty curve крутитиме waitUp/waitDown як важіль",\n          "Платформи рухатимуться випадково без таймінгу",\n          "Платформи більше не потрібні",\n        ]`
    )
  } else {
    content = content.replace(
      /options:\s*\[\s*"5\.7 removes Config",\s*"The difficulty curve will twist waitUp\/waitDown like a lever",\s*"5\.7 removes Config",\s*"Platforms are no longer needed",\s*\]/m,
      `options: [\n          "5.7 removes Config",\n          "The difficulty curve will twist waitUp/waitDown like a lever",\n          "Platforms move randomly without timing",\n          "Platforms are no longer needed",\n        ]`
    )
  }

  fs.writeFileSync(filePath, content, 'utf8')
}

// Apply updates
console.log('\n--- UPGRADING MODULE 3 ---')
updateModule34File(path.join(root, 'uk/module03-lessons.js'), 'uk', 3)
updateModule34File(path.join(root, 'en/module03-lessons.js'), 'en', 3)

console.log('\n--- UPGRADING MODULE 4 ---')
updateModule34File(path.join(root, 'uk/module04-lessons.js'), 'uk', 4)
updateModule34File(path.join(root, 'en/module04-lessons.js'), 'en', 4)

console.log('\n--- UPGRADING MODULE 5 ---')
updateModule5File(path.join(root, 'uk/module05-lessons.js'), 'uk')
updateModule5File(path.join(root, 'en/module05-lessons.js'), 'en')

console.log('\nCourse upgrades applied successfully!')
