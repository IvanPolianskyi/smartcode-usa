import json
import os
import re

ROOT = r"e:\smartcode_workspace\smartcode-us\src\lib\robloxLessonContent"

# ==========================================
# MODULE 3 DATA (UK & EN)
# ==========================================

M3_DATA = {
    31: {
        "uk": {
            "summary": "Ти навчився створювати інтерактивні об'єкти за допомогою ClickDetector та ProximityPrompt, налаштовувати дистанцію активації та керувати станом дверей (відкрито/закрито) за допомогою змінних і умов if/else у серверному скрипті.",
            "practiceTask": {
                "title": "Практична робота: Інтерактивні двері (InteractDoor_v1)",
                "difficulty": "beginner",
                "description": "**Мета:** створити двері з логічним перемиканням стану відкрито/закрито за допомогою ProximityPrompt або ClickDetector.\n\n### Частина А: Каркас дверей\n1. Біля входу в парк або штаб побудуй коробку `DoorFrame` (Anchored = true) та стулку `DoorLeaf` (Anchored = true).\n2. Згрупуй їх у Model `InteractDoor_v1` і признач PrimaryPart = `DoorFrame`.\n3. Додай над дверима `BillboardGui` з `TextLabel` для підказки («Підійди та натисни E»).\n\n### Частина Б: Логіка взаємодії\n1. Додай `ProximityPrompt` у `DoorLeaf` (ActionText = «Відкрити», ObjectText = «Хвіртка», HoldDuration = 0).\n2. Додай серверний `Script` у `DoorLeaf`.\n3. Оголоси змінну стану `local isOpen = false`.\n4. У події `prompt.Triggered` перемикай стан:\n   - якщо `isOpen == false`, встанови `Transparency = 0.8`, `CanCollide = false`, `prompt.ActionText = \"Зачинити\"`, `isOpen = true`.\n   - якщо `isOpen == true`, встанови `Transparency = 0`, `CanCollide = true`, `prompt.ActionText = \"Відкрити\"`, `isOpen = false`.\n\n### Частина В: Тестування та перевірка\n1. Запусти Play (F5): підійди до дверей, перевір появу підказки та натисни клавішу E.\n2. Пройди крізь відчинений отвір, повернись і зачини двері знову.\n3. Переконайся, що в Output немає помилок.\n4. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.1 - InteractDoor_v1`.",
                "hints": [
                    "Використовуй звичайний серверний Script, а не LocalScript.",
                    "Властивість CanCollide = false дозволяє персонажу вільно пройти крізь стулку.",
                    "Налаштуй MaxActivationDistance в межах 8-12 стадів для природного радіусу дії.",
                    "Не забувай перемикати прапорець isOpen після кожної дії."
                ],
                "optionalChallenge": "Додай плавне відкриття або звук клацання замка при активації дверей."
            }
        },
        "en": {
            "summary": "You learned how to build interactive world objects using ClickDetector and ProximityPrompt, configure activation distance, and control door state (open/closed) using variables and if/else logic in a server Script.",
            "practiceTask": {
                "title": "Hands-on Practice: Interactive Door (InteractDoor_v1)",
                "difficulty": "beginner",
                "description": "**Objective:** Build a toggleable interactive door using ProximityPrompt or ClickDetector with clean server-side state.\n\n### Part A: Door Frame & Model\n1. Place a `DoorFrame` and a `DoorLeaf` part near your base (both Anchored = true).\n2. Group them into a Model named `InteractDoor_v1` and set PrimaryPart = `DoorFrame`.\n3. Add a `BillboardGui` with a `TextLabel` (\"Approach and press E\").\n\n### Part B: Interaction Logic\n1. Insert a `ProximityPrompt` inside `DoorLeaf` (ActionText = \"Open\", ObjectText = \"Gate\", HoldDuration = 0).\n2. Insert a regular server `Script` inside `DoorLeaf`.\n3. Declare `local isOpen = false`.\n4. In `prompt.Triggered:Connect(function() ... end)`, toggle state:\n   - When `not isOpen`: set `Transparency = 0.8`, `CanCollide = false`, `prompt.ActionText = \"Close\"`, `isOpen = true`.\n   - When `isOpen`: set `Transparency = 0`, `CanCollide = true`, `prompt.ActionText = \"Open\"`, `isOpen = false`.\n\n### Part C: Verification\n1. Press Play (F5), walk up to the gate, and press E to open.\n2. Walk through the opening, turn around, and close it.\n3. Verify zero errors in the Output console.\n4. Save Place as `Lesson 3.1 - InteractDoor_v1`.",
                "hints": [
                    "Use a regular server Script, not a LocalScript.",
                    "Setting CanCollide = false allows the player character to walk through.",
                    "Keep MaxActivationDistance around 8-12 studs for intuitive interaction.",
                    "Remember to flip the isOpen boolean flag on each activation."
                ],
                "optionalChallenge": "Add a click sound effect or smooth color transition when the door is opened."
            }
        }
    },
    32: {
        "uk": {
            "summary": "Ти опанував подію Touched для виявлення фізичного контакту, навчився знаходити Humanoid у моделі персонажа, змінювати його Health та застосовувати патерн debounce із task.wait для запобігання спаму подій.",
            "practiceTask": {
                "title": "Практична робота: Смуга небезпек (KillLane_v1)",
                "difficulty": "beginner",
                "description": "**Мета:** створити зону небезпек з неоновими блоками та надійною системою пошкодження/смерті з debounce.\n\n### Частина А: Створення небезпечної зони\n1. Створи Folder `KillLane_v1` поруч із дверима або входом.\n2. Додай 3 небезпечні блоки (`Kill_01`, `Kill_02`, `Kill_03`), зроби їх червоними (Really red) з матеріалом Neon та Anchored = true.\n\n### Частина Б: Скрипт ураження з debounce\n1. Додай серверний `Script` у блок `Kill_01`.\n2. Оголоси змінну `local isDebounced = false`.\n3. Підключи `script.Parent.Touched:Connect(function(hit) ... end)`.\n4. Знайди персонажа й Humanoid: `local humanoid = hit.Parent:FindFirstChild(\"Humanoid\")`.\n5. Якщо `humanoid` існує і `not isDebounced`:\n   - встанови `isDebounced = true`\n   - обнули здоров'я `humanoid.Health = 0`\n   - почекай `task.wait(1)` і скинь `isDebounced = false`.\n\n### Частина В: Перевірка та збереження\n1. Скопіюй перевірений скрипт на інші блоки смуги `KillLane_v1`.\n2. Запусти Play: наступи на лавовий блок — персонаж гине один раз, Output залишається чистим без спаму.\n3. Кинь незакріплений тестовий блок на лаву — переконайся, що помилок nil не виникає.\n4. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.2 - KillLane_v1`.",
                "hints": [
                    "Завжди перевіряй наявність Humanoid через hit.Parent:FindFirstChild(\"Humanoid\").",
                    "Debounce запобігає десяткам викликів функції за одну частку секунди.",
                    "Встановлюй Anchored = true для всіх лавових плит, щоб вони не провалювалися крізь землю.",
                    "Використовуй task.wait замість застарілого wait."
                ],
                "optionalChallenge": "Зроби блок, який не вбиває миттєво, а віднімає по 25 Health кожні 0.5 секунди з ефектом спалаху кольору."
            }
        },
        "en": {
            "summary": "You mastered the Touched event for collision detection, learned to find the Humanoid in character models, change Health safely, and apply debounce with task.wait to avoid event spam.",
            "practiceTask": {
                "title": "Hands-on Practice: Hazard Lane (KillLane_v1)",
                "difficulty": "beginner",
                "description": "**Objective:** Create a hazard lane with neon hazard parts and a robust debounce damage script.\n\n### Part A: Hazard Zone\n1. Create a Folder named `KillLane_v1`.\n2. Add 3 hazard parts (`Kill_01`, `Kill_02`, `Kill_03`) with Neon material, Really red color, Anchored = true.\n\n### Part B: Debounce Damage Script\n1. Add a server `Script` inside `Kill_01`.\n2. Add debounce logic:\n```lua\nlocal part = script.Parent\nlocal isDebounced = false\n\npart.Touched:Connect(function(hit)\n    local humanoid = hit.Parent:FindFirstChild(\"Humanoid\")\n    if humanoid and not isDebounced then\n        isDebounced = true\n        humanoid.Health = 0\n        task.wait(1)\n        isDebounced = false\n    end\nend)\n```\n\n### Part C: Verification\n1. Duplicate the script into the other hazard parts.\n2. Playtest: step on the lava part — the character dies cleanly once without spamming Output.\n3. Drop an unanchored test part onto the hazard — verify no nil indexing errors.\n4. Save Place as `Lesson 3.2 - KillLane_v1`.",
                "hints": [
                    "Always check hit.Parent:FindFirstChild(\"Humanoid\") before reading Health.",
                    "Debounce guards your game against multiple rapid triggers on each footstep.",
                    "Ensure hazard parts are Anchored = true so they don't fall through the floor.",
                    "Use task.wait instead of legacy wait."
                ],
                "optionalChallenge": "Create a poison pad that deals 25 damage every 0.5 seconds instead of instant death."
            }
        }
    },
    33: {
        "uk": {
            "summary": "Ти навчився використовувати числові змінні для відстеження очок і таймерів, оновлювати їхні значення під час ігрових подій та динамічно виводити актуальний рахунок через інтерфейс BillboardGui.",
            "practiceTask": {
                "title": "Практична робота: Лічильник монет та таймер (Counter_v1)",
                "difficulty": "beginner",
                "description": "**Мета:** створити інтерактивний об'єкт збору очок із динамічним лічильником на екрані або у світі.\n\n### Частина А: Створення стенду очок\n1. Створи блок `CoinStand` золотого кольору з матеріалом Neon, Anchored = true.\n2. Додай всередину `BillboardGui` (AlwaysOnTop = true, ExtentsOffset = Vector3.new(0, 2, 0)).\n3. Усередині BillboardGui створи `TextLabel` з текстом «Coins: 0», TextScaled = true.\n\n### Частина Б: Логіка підрахунку\n1. Додай `ClickDetector` або `ProximityPrompt` у `CoinStand`.\n2. Додай серверний `Script` зі змінною `local coinCount = 0`.\n3. При кожній активації збільшуй `coinCount = coinCount + 1`.\n4. Оновлюй текст: `textLabel.Text = \"Coins: \" .. tostring(coinCount)`.\n\n### Частина В: Тестування\n1. Запусти Play: клікни по стенду 5 разів, переконайся, що число на лічильнику збільшується з 0 до 5.\n2. Перевір відображення під різними кутами камери.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.3 - Counter_v1`.",
                "hints": [
                    "Для з'єднання рядка і числа у Lua використовуй дві крапки: \"Coins: \" .. coinCount.",
                    "AlwaysOnTop у BillboardGui дозволяє бачити текст крізь інші перешкоди.",
                    "Зберігай початковий стан змінної coinCount = 0 на початку скрипта."
                ],
                "optionalChallenge": "Додай умову: коли гравець набирає 10 монет, стенд змінює колір на зелений і відкриває секретний прохід."
            }
        },
        "en": {
            "summary": "You learned how to use numeric variables to track score and countdown timers, increment/decrement values on player actions, and display live counts using BillboardGui.",
            "practiceTask": {
                "title": "Hands-on Practice: Coin Counter & Timer (Counter_v1)",
                "difficulty": "beginner",
                "description": "**Objective:** Build an interactive score-tracking object with live in-world BillboardGui counter updates.\n\n### Part A: Coin Stand Model\n1. Create a neon gold part named `CoinStand` (Anchored = true).\n2. Insert a `BillboardGui` (AlwaysOnTop = true, ExtentsOffset = Vector3.new(0, 2, 0)).\n3. Add a `TextLabel` inside (\"Coins: 0\", TextScaled = true).\n\n### Part B: Increment Logic\n1. Insert a `ClickDetector` or `ProximityPrompt` into `CoinStand`.\n2. Insert a `Script` tracking `local coins = 0`.\n3. On trigger, increment `coins = coins + 1` and set `textLabel.Text = \"Coins: \" .. coins`.\n\n### Part C: Playtest\n1. Click the stand 5 times in Play mode and confirm the display updates smoothly 0 → 5.\n2. Save Place as `Lesson 3.3 - Counter_v1`.",
                "hints": [
                    "Use Lua string concatenation: \"Coins: \" .. coins.",
                    "AlwaysOnTop ensures the score is visible even behind obstacles.",
                    "Initialize coins = 0 outside the event handler so it doesn't reset on each click."
                ],
                "optionalChallenge": "Add a goal trigger: when coins reach 10, turn the stand green and play a victory chime."
            }
        }
    },
    34: {
        "uk": {
            "summary": "Ти опанував нескінченні цикли while true do у Roblox Studio, зрозумів критичну важливість task.wait() для захисту від зависання рушія та навчився створювати періодичні рухомі пастки і спавнери об'єктів.",
            "practiceTask": {
                "title": "Практична робота: Періодичний спавнер (HazardSpawner_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** створити спавнер, який періодично генерує падаючі небезпечні блоки за допомогою циклу while.\n\n### Частина А: Платформа спавнера\n1. Створи платформу `SpawnerPlatform` високо над рівнем (Position Y = 30), Anchored = true.\n2. Додай під платформою зону прийому, де гравець має ухилятися від падаючих предметів.\n\n### Частина Б: Цикл спавну з task.wait\n1. Додай `Script` всередину `SpawnerPlatform`.\n2. Напиши нескінченний цикл:\n```lua\nwhile true do\n    task.wait(2)\n    local hazard = Instance.new(\"Part\")\n    hazard.Name = \"FallingHazard\"\n    hazard.Size = Vector3.new(2, 2, 2)\n    hazard.Material = Enum.Material.Neon\n    hazard.BrickColor = BrickColor.new(\"Bright red\")\n    hazard.Position = script.Parent.Position - Vector3.new(0, 3, 0)\n    hazard.Anchored = false\n    hazard.Parent = workspace\n    \n    game:GetService(\"Debris\"):AddItem(hazard, 5)\nend\n```\n\n### Частина В: Перевірка безпеки\n1. Запусти Play: переконайся, що блоки стабільно падають кожні 2 секунди й зникають через 5 секунд.\n2. Перевір навантаження: пам'ять не переповнюється, бо старі блоки вчасно знищуються.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.4 - HazardSpawner_v1`.",
                "hints": [
                    "НІКОЛИ не запускай while true без task.wait() всередині — це миттєво зависне Studio.",
                    "Використовуй Debris:AddItem(hazard, 5) для безпечного видалення тимчасових об'єктів.",
                    "Встановлюй Anchored = false для падаючих об'єктів, щоб на них діяла гравітація."
                ],
                "optionalChallenge": "Додай до падаючих блоків скрипт Touched, який наносить шкоду персонажу при прямому влучанні."
            }
        },
        "en": {
            "summary": "You learned how while true do loops work in Roblox, why task.wait() is mandatory to prevent Studio crashes, and how to create periodic hazard spawners.",
            "practiceTask": {
                "title": "Hands-on Practice: Hazard Spawner (HazardSpawner_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Build a repeating hazard spawner using a safe while loop and Debris cleanup.\n\n### Part A: Spawner Setup\n1. Create a platform part named `SpawnerPlatform` elevated high in the air (Anchored = true).\n\n### Part B: While Loop with task.wait\n1. Add a server `Script` inside the spawner:\n```lua\nlocal Debris = game:GetService(\"Debris\")\n\nwhile true do\n    task.wait(2)\n    local hazard = Instance.new(\"Part\")\n    hazard.Name = \"FallingHazard\"\n    hazard.Size = Vector3.new(2, 2, 2)\n    hazard.Material = Enum.Material.Neon\n    hazard.BrickColor = BrickColor.new(\"Bright red\")\n    hazard.Position = script.Parent.Position - Vector3.new(0, 3, 0)\n    hazard.Anchored = false\n    hazard.Parent = workspace\n    \n    Debris:AddItem(hazard, 5)\nend\n```\n\n### Part C: Verification\n1. Playtest: ensure hazards spawn every 2 seconds and delete after 5 seconds without lagging the game.\n2. Save Place as `Lesson 3.4 - HazardSpawner_v1`.",
                "hints": [
                    "NEVER run a while true loop without task.wait() — it will freeze Studio.",
                    "Debris:AddItem automatically removes objects after a lifetime.",
                    "Set Anchored = false so the spawned parts fall with gravity."
                ],
                "optionalChallenge": "Attach a Touched damage script to spawned hazards so they eliminate players on contact."
            }
        }
    },
    35: {
        "uk": {
            "summary": "Ти навчився застосовувати числовий цикл for для процедурної генерації сходів, рядів платформ та ітерації колекцій через ipairs, створюючи складну геометрію кількома рядками коду.",
            "practiceTask": {
                "title": "Практична робота: Генератор сходів (StairBuilder_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** автоматично побудувати сходи з 10 сходинок за допомогою числового циклу for.\n\n### Частина А: Створення скрипта генератора\n1. Створи Part `StairBase` на землі як стартову точку.\n2. Додай усередину `Script` із назвою `StairBuilder`.\n\n### Частина Б: Написання циклу for\n1. У скрипті створи цикл від 1 до 10:\n```lua\nlocal basePos = script.Parent.Position\n\nfor i = 1, 10 do\n    local step = Instance.new(\"Part\")\n    step.Name = \"Step_\" .. i\n    step.Size = Vector3.new(6, 1, 3)\n    step.Position = basePos + Vector3.new(0, i * 1.2, i * 3)\n    step.Anchored = true\n    step.Material = Enum.Material.SmoothPlastic\n    step.BrickColor = BrickColor.new(i % 2 == 0 and \"Bright blue\" or \"Bright yellow\")\n    step.Parent = workspace\nend\n```\n\n### Частина В: Play-тест сходів\n1. Запусти Play: сходи миттєво з'являються на старті.\n2. Пробіжи персонажем від першої сходинки до десятої — висота та інтервал мають бути зручними для підйому без застрягання.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.5 - StairBuilder_v1`.",
                "hints": [
                    "Числовий цикл for i = 1, 10 do автоматично збільшує лічильник i на 1 на кожному кроці.",
                    "Розраховуй позицію сходинки через множення: i * висота та i * глибина.",
                    "Переконайся, що для кожної сходинки встановлено Anchored = true."
                ],
                "optionalChallenge": "Зроби так, щоб остання 10-та сходинка була вдвічі ширшою і містила фінішний прапорець."
            }
        },
        "en": {
            "summary": "You mastered numeric for loops to generate staircases, platform rows, and object iterations using ipairs, generating procedural geometry in just a few lines of code.",
            "practiceTask": {
                "title": "Hands-on Practice: Staircase Builder (StairBuilder_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Procedurally generate a 10-step staircase using a numeric for loop.\n\n### Part A: Generator Anchor\n1. Create a `StairBase` part on the ground (Anchored = true).\n2. Insert a server `Script` named `StairBuilder`.\n\n### Part B: For Loop Generation\n1. Write the generation loop:\n```lua\nlocal basePos = script.Parent.Position\n\nfor i = 1, 10 do\n    local step = Instance.new(\"Part\")\n    step.Name = \"Step_\" .. i\n    step.Size = Vector3.new(6, 1, 3)\n    step.Position = basePos + Vector3.new(0, i * 1.2, i * 3)\n    step.Anchored = true\n    step.Material = Enum.Material.SmoothPlastic\n    step.BrickColor = BrickColor.new(i % 2 == 0 and \"Bright blue\" or \"Bright yellow\")\n    step.Parent = workspace\nend\n```\n\n### Part C: Verification\n1. Press Play: 10 alternating colored stairs appear instantly.\n2. Climb from bottom to top to confirm proper step height.\n3. Save Place as `Lesson 3.5 - StairBuilder_v1`.",
                "hints": [
                    "A numeric for i = 1, 10 loop automatically increments i by 1 each step.",
                    "Calculate offsets using multiplication: i * height and i * depth.",
                    "Ensure step.Anchored = true so steps stay in place."
                ],
                "optionalChallenge": "Make the final 10th step twice as wide with a golden trophy platform."
            }
        }
    },
    36: {
        "uk": {
            "summary": "Ти навчився створювати власні функції з параметрами та значеннями повернення (return), структурувати код за принципом DRY (Don't Repeat Yourself) та повторно використовувати логіку пошкодження й лікування.",
            "practiceTask": {
                "title": "Практична робота: Модульні функції дій (HelperFunctions_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** написати окремі функції для лікування та нанесення шкоди і підключити їх до різних ігрових плит.\n\n### Частина А: Створення платформ\n1. Створи дві плити поруч: червону `TrapPad` і зелену `HealPad`.\n2. Обидві плити повинні мати `Anchored = true` та знаходитися в окремій Model `EffectPads`.\n\n### Частина Б: Скрипт із функціями\n1. Додай `Script` у `EffectPads`.\n2. Напиши допоміжні функції:\n```lua\nlocal function modifyHealth(humanoid, amount)\n    if not humanoid or humanoid.Health <= 0 then return false end\n    humanoid.Health = math.clamp(humanoid.Health + amount, 0, humanoid.MaxHealth)\n    print(\"Health changed by\", amount, \"New Health:\", humanoid.Health)\n    return true\nend\n```\n3. Підключи `TrapPad.Touched` до виклику `modifyHealth(humanoid, -25)` з debounce.\n4. Підключи `HealPad.Touched` до виклику `modifyHealth(humanoid, 25)` з debounce.\n\n### Частина В: Перевірка функцій\n1. Запусти Play: наступи на червону плиту (здоров'я зменшується на 25), потім на зелену (здоров'я відновлюється).\n2. Перевір Output на вивід коректних значень.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.6 - HelperFunctions_v1`.",
                "hints": [
                    "Використовуй math.clamp для захисту від значень здоров'я менше 0 або більше MaxHealth.",
                    "Функції дозволяють змінювати логіку лікування або шкоди в одному місці замість десятків скриптів.",
                    "Завжди передавай конкретний Humanoid і числове значення як аргументи функції."
                ],
                "optionalChallenge": "Додай третю функцію applySpeedBoost(humanoid, boostAmount, duration), яка тимчасово прискорює гравця."
            }
        },
        "en": {
            "summary": "You learned how to structure code with reusable functions, parameters, and return values, eliminating code duplication across damage, healing, and effect handlers.",
            "practiceTask": {
                "title": "Hands-on Practice: Helper Functions (HelperFunctions_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Create modular health-modifying functions and wire them to separate trigger pads.\n\n### Part A: Pad Setup\n1. Place a red `TrapPad` and a green `HealPad` in a Model named `EffectPads` (Anchored = true).\n\n### Part B: Shared Function Script\n1. Add a server `Script` inside `EffectPads`:\n```lua\nlocal function modifyHealth(humanoid, amount)\n    if not humanoid or humanoid.Health <= 0 then return false end\n    humanoid.Health = math.clamp(humanoid.Health + amount, 0, humanoid.MaxHealth)\n    print(\"Health modified by\", amount, \"Current:\", humanoid.Health)\n    return true\nend\n```\n2. Connect `TrapPad.Touched` to `modifyHealth(humanoid, -25)` with debounce.\n3. Connect `HealPad.Touched` to `modifyHealth(humanoid, 25)` with debounce.\n\n### Part C: Verification\n1. Step on TrapPad (Health drops by 25), then step on HealPad (Health recovers).\n2. Save Place as `Lesson 3.6 - HelperFunctions_v1`.",
                "hints": [
                    "math.clamp keeps Health cleanly bounded between 0 and MaxHealth.",
                    "Functions let you update logic in one central spot instead of duplicating code.",
                    "Pass the target Humanoid and numeric amount as explicit parameters."
                ],
                "optionalChallenge": "Add a third function applySpeedBoost(humanoid, boostAmount, duration) for temporary sprint boosts."
            }
        }
    },
    37: {
        "uk": {
            "summary": "Ти зрозумів фундаментальну відмінність між клієнтським LocalScript і серверним Script, навчився створювати інтерфейс у StarterGui та обробляти натискання екранних кнопок без затримок мережі.",
            "practiceTask": {
                "title": "Практична робота: Інтерактивний HUD (PlayerGui_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** створити клієнтський інтерфейс у StarterGui з кнопкою прискорення через LocalScript.\n\n### Частина А: Створення GUI\n1. У панелі Explorer знайди папку `StarterGui`.\n2. Додай `ScreenGui` з назвою `MainHUD`.\n3. Усередині ScreenGui створи `TextButton` з назвою `SprintButton`.\n4. Налаштуй кнопку: розмір (0, 140, 0, 50), позиція внизу праворуч, текст «Sprint: OFF», контрастний фон.\n\n### Частина Б: LocalScript клієнта\n1. Додай `LocalScript` всередину `SprintButton`.\n2. Напиши логіку перемикання спринту:\n```lua\nlocal button = script.Parent\nlocal player = game.Players.LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild(\"Humanoid\")\n\nlocal isSprinting = false\n\nbutton.MouseButton1Click:Connect(function()\n    isSprinting = not isSprinting\n    if isSprinting then\n        humanoid.WalkSpeed = 32\n        button.Text = \"Sprint: ON\"\n        button.BackgroundColor3 = Color3.fromRGB(46, 204, 113)\n    else\n        humanoid.WalkSpeed = 16\n        button.Text = \"Sprint: OFF\"\n        button.BackgroundColor3 = Color3.fromRGB(52, 152, 219)\n    end\nend)\n```\n\n### Частина В: Перевірка клієнтської взаємодії\n1. Запусти Play: натисни кнопку мишею на екрані.\n2. Переконайся, що швидкість бігу персонажа миттєво подвоюється, а текст кнопки змінюється на «Sprint: ON».\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 3.7 - PlayerGui_v1`.",
                "hints": [
                    "LocalScript працює виключно на клієнті (в StarterGui, StarterPlayerScripts або всередині Character).",
                    "Зміна WalkSpeed на клієнті в Roblox автоматично синхронізується з рухом власного персонажа.",
                    "Для доступу до гравця на клієнті завжди використовуй game.Players.LocalPlayer."
                ],
                "optionalChallenge": "Додай до кнопки шкалу витривалості (Stamina), яка повільно витрачається під час бігу і відновлюється під час ходьби."
            }
        },
        "en": {
            "summary": "You mastered the difference between client LocalScripts and server Scripts, learned how to build UI in StarterGui, and handle on-screen button clicks.",
            "practiceTask": {
                "title": "Hands-on Practice: Interactive HUD (PlayerGui_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Build a responsive client-side UI in StarterGui with a sprint toggle button.\n\n### Part A: ScreenGui Setup\n1. In `StarterGui`, add a `ScreenGui` named `MainHUD`.\n2. Insert a `TextButton` named `SprintButton` in the bottom-right corner.\n\n### Part B: Client LocalScript\n1. Add a `LocalScript` inside `SprintButton`:\n```lua\nlocal button = script.Parent\nlocal player = game.Players.LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild(\"Humanoid\")\n\nlocal isSprinting = false\n\nbutton.MouseButton1Click:Connect(function()\n    isSprinting = not isSprinting\n    if isSprinting then\n        humanoid.WalkSpeed = 32\n        button.Text = \"Sprint: ON\"\n        button.BackgroundColor3 = Color3.fromRGB(46, 204, 113)\n    else\n        humanoid.WalkSpeed = 16\n        button.Text = \"Sprint: OFF\"\n        button.BackgroundColor3 = Color3.fromRGB(52, 152, 219)\n    end\nend)\n```\n\n### Part C: Verification\n1. Press Play: click the on-screen button and verify instant walk speed toggling between 16 and 32.\n2. Save Place as `Lesson 3.7 - PlayerGui_v1`.",
                "hints": [
                    "LocalScripts run only on the client (StarterGui, StarterPlayerScripts, Character).",
                    "WalkSpeed changes on the client automatically replicate character movement.",
                    "Use game.Players.LocalPlayer to access the local client player."
                ],
                "optionalChallenge": "Add a stamina meter that depletes while sprinting and recharges when walking."
            }
        }
    },
    38: {
        "uk": {
            "summary": "Ти успішно завершив Модуль 3 і зібрав комплексну інтерактивну арену PlayableArena_v1, об'єднавши двері на ProximityPrompt, лавові блоки з debounce, цикл-спавнер, допоміжні функції та клієнтський HUD.",
            "practiceTask": {
                "title": "Фінальний проект модуля 3: Ігрова Арена (PlayableArena_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** об'єднати всі системи модуля 3 у завершений міні-рівень з проходженням, небезпеками та таймером.\n\n### Частина А: Архітектура арени\n1. Побудуй закриту тестову зону `PlayableArena_v1` з парканом і вхідними дверима `InteractDoor` (3.1).\n2. Розмісти смугу перешкод `KillLane` (3.2) з лавовими плитами на шляху до фінішу.\n3. Додай над ареною `HazardSpawner` (3.4), що скидає бонуси або перешкоди.\n\n### Частина Б: Інтеграція логіки та GUI\n1. Створи єдиний модуль функцій взаємодії для нарахування очок і лікування (3.6).\n2. Додай у `StarterGui` інтерфейс з кнопкою спринту (3.7) та лічильником зібраних предметів (3.3).\n3. Додай фінішний тригер, який відчиняє вихід після збору 3 монет.\n\n### Частина В: Фінальний тест і здача\n1. Пройди весь маршрут від вхідних дверей до фінішного виходу:\n   - відкрий двері через ProximityPrompt (E);\n   - увімкни спринт через HUD;\n   - перестрибни лавові блоки;\n   - збери 3 монети зі спавнера та відкрий вихід.\n2. Перевір відсутність помилок в Output під час перезапуску та смерті персонажа.\n3. Збережи проект: **File → Save to Roblox** під назвою `Lesson 3.8 - PlayableArena_v1`.",
                "hints": [
                    "Перевір Anchored = true для всіх платформ і стін арени.",
                    "Переконайся, що всі скрипти використовують debounce, щоб уникнути подвійних спрацювань.",
                    "Якщо персонаж гине, HUD та скрипти мають коректно працювати після респавну."
                ],
                "optionalChallenge": "Додай екранний таймер на 45 секунд: якщо гравець не встигає пройти арену, вхідні двері блокуються."
            }
        },
        "en": {
            "summary": "You completed Module 3 by building the integrated PlayableArena_v1 mini-game, combining ProximityPrompt doors, debounce hazards, spawner loops, helper functions, and client HUD.",
            "practiceTask": {
                "title": "Module 3 Final Project: Playable Arena (PlayableArena_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Integrate all Module 3 systems into a complete obstacle mini-game arena.\n\n### Part A: Arena Architecture\n1. Assemble a walled arena with an `InteractDoor` (3.1) entrance.\n2. Place a `KillLane` (3.2) hazard zone across the middle floor.\n3. Add a high-altitude `HazardSpawner` (3.4) dropping timed obstacle cubes.\n\n### Part B: Logic & HUD Integration\n1. Wire damage/healing helper functions (3.6) into arena pads.\n2. Add the sprint toggle button (3.7) and coin counter (3.3) to `StarterGui`.\n3. Unlock the exit gate when the player collects 3 coin bonuses.\n\n### Part C: Full Playtest\n1. Test the full course: open door → sprint past falling hazards → jump over lava → collect 3 coins → reach exit.\n2. Confirm clean Output logs on character resets.\n3. Save Place as `Lesson 3.8 - PlayableArena_v1`.",
                "hints": [
                    "Check Anchored = true on all static walls and platforms.",
                    "Ensure every damage/collection trigger uses debounce.",
                    "Verify the HUD continues functioning after character respawns."
                ],
                "optionalChallenge": "Add a 45-second countdown timer: if time expires before reaching the exit, lock the arena."
            }
        }
    }
}

# ==========================================
# MODULE 4 DATA (UK & EN)
# ==========================================

M4_DATA = {
    41: {
        "uk": {
            "summary": "Ти навчився створювати та обробляти індексовані таблиці (масиви) у Lua, використовувати функції table.insert та table.remove, визначати довжину масиву через оператор # та перебирати елементи за допомогою ipairs.",
            "practiceTask": {
                "title": "Практична робота: Масив нагород (RewardsArray_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** створити та протестувати список нагород гравця за допомогою методів роботи з масивами.\n\n### Частина А: Створення скрипта менеджера\n1. У `ServerScriptService` створи новий Script з назвою `RewardsManager`.\n2. Оголоси початковий масив нагород: `local rewards = {\"WoodSword\", \"HealthPotion\", \"IronShield\"}`.\n\n### Частина Б: Робота з елементами масиву\n1. Виведи початковий розмір списку: `print(\"Кількість нагород:\", #rewards)`.\n2. Додай нову нагороду в кінець масиву: `table.insert(rewards, \"GoldBow\")`.\n3. Видали перший елемент: `table.remove(rewards, 1)`.\n4. Виведи всі актуальні нагороди через цикл `ipairs`:\n```lua\nfor index, itemName in ipairs(rewards) do\n    print(string.format(\"Слот #%d: %s\", index, itemName))\nend\n```\n\n### Частина В: Перевірка в Output\n1. Запусти Play: перевір журнал Output.\n2. Переконайся, що WoodSword видалено, а список містить HealthPotion, IronShield та GoldBow.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.1 - RewardsArray_v1`.",
                "hints": [
                    "Індексація масивів у Lua починається з 1, а не з 0.",
                    "Оператор # повертає кількість елементів у суцільному масиві.",
                    "Для перебору масивів завжди використовуй ipairs (i = index)."
                ],
                "optionalChallenge": "Напиши функцію hasReward(rewardName), яка повертає true, якщо предмет є в масиві, або false, якщо немає."
            }
        },
        "en": {
            "summary": "You learned how to create indexed arrays in Lua, manipulate elements with table.insert and table.remove, get table length via the # operator, and iterate items with ipairs.",
            "practiceTask": {
                "title": "Hands-on Practice: Rewards Array (RewardsArray_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Create and manipulate a rewards array using core Lua table methods.\n\n### Part A: Manager Script\n1. In `ServerScriptService`, create a Script named `RewardsManager`.\n2. Declare an array: `local rewards = {\"WoodSword\", \"HealthPotion\", \"IronShield\"}`.\n\n### Part B: Array Methods\n1. Insert a new item: `table.insert(rewards, \"GoldBow\")`.\n2. Remove the first item: `table.remove(rewards, 1)`.\n3. Iterate and print items using `ipairs`:\n```lua\nfor index, itemName in ipairs(rewards) do\n    print(\"Slot #\" .. index .. \": \" .. itemName)\nend\n```\n\n### Part C: Verification\n1. Press Play: verify Output displays 3 items in order (HealthPotion, IronShield, GoldBow).\n2. Save Place as `Lesson 4.1 - RewardsArray_v1`.",
                "hints": [
                    "Lua arrays are 1-indexed (first element is index 1).",
                    "The # operator returns the length of contiguous arrays.",
                    "Always use ipairs for indexed array loops."
                ],
                "optionalChallenge": "Write a helper function hasReward(rewardName) that returns true if the item exists in the array."
            }
        }
    },
    42: {
        "uk": {
            "summary": "Ти опанував словники (таблиці «ключ-значення») у Lua, навчився структурувати параметри предметів, виконувати миттєвий пошук за текстовим ключем та перебирати пари за допомогою pairs.",
            "practiceTask": {
                "title": "Практична робота: База даних предметів (ItemDatabase_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** створити словник характеристик предметів з функцією пошуку та розрахунку вартості.\n\n### Частина А: Створення бази предметів\n1. У `ServerScriptService` створи Script із назвою `ItemDatabase`.\n2. Оголоси словник предметів із вкладеними таблицями характеристик:\n```lua\nlocal itemDatabase = {\n    Sword = { Damage = 25, Cost = 100, LevelReq = 1 },\n    Axe = { Damage = 40, Cost = 250, LevelReq = 3 },\n    MagicStaff = { Damage = 65, Cost = 600, LevelReq = 5 }\n}\n```\n\n### Частина Б: Функція пошуку за ключем\n1. Напиши функцію `local function printItemInfo(itemName)`:\n```lua\nlocal function printItemInfo(itemName)\n    local data = itemDatabase[itemName]\n    if data then\n        print(string.format(\"Предмет [%s]: Шкода = %d, Ціна = %d монет, Рівень = %d\", \n            itemName, data.Damage, data.Cost, data.LevelReq))\n    else\n        warn(\"Предмет не знайдено в базі даних: \" .. tostring(itemName))\n    end\nend\n```\n2. Виклич функцію для \"Sword\", \"Axe\" та неіснуючого предмета \"DragonArmor\".\n\n### Частина В: Перевірка та збереження\n1. Запусти Play і перевір Output: характеристики відомих предметів виводяться коректно, а для неіснуючого виводиться попередження warn.\n2. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.2 - ItemDatabase_v1`.",
                "hints": [
                    "Для доступу за рядковим ключем використовуй квадратні дужки table[\"Key\"] або крапку table.Key.",
                    "Для перебору словників типу ключ-значення завжди використовуй pairs замість ipairs.",
                    "Завжди перевіряй if data ~= nil перед зверненням до вкладених полів."
                ],
                "optionalChallenge": "Напиши функцію getAffordableItems(playerCoins), яка повертає список усіх предметів, що гравець може купити на свій баланс."
            }
        },
        "en": {
            "summary": "You mastered key-value tables (dictionaries) in Lua, structured item parameters, implemented instant lookups by string key, and iterated entries using pairs.",
            "practiceTask": {
                "title": "Hands-on Practice: Item Stats Database (ItemStats_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Build a dictionary of item stats with lookup functions and missing-key error handling.\n\n### Part A: Dictionary Structure\n1. In `ServerScriptService`, create a Script named `ItemDatabase`:\n```lua\nlocal itemDatabase = {\n    Sword = { Damage = 25, Cost = 100, LevelReq = 1 },\n    Axe = { Damage = 40, Cost = 250, LevelReq = 3 },\n    MagicStaff = { Damage = 65, Cost = 600, LevelReq = 5 }\n}\n```\n\n### Part B: Lookup Function\n1. Implement `printItemInfo(itemName)` to safely check `if itemDatabase[itemName] then ... else warn() end`.\n\n### Part C: Verification\n1. Test with existing and non-existent item keys.\n2. Save Place as `Lesson 4.2 - ItemDatabase_v1`.",
                "hints": [
                    "Access keys using dictionary[key] or dictionary.key syntax.",
                    "Always use pairs() when iterating key-value dictionaries.",
                    "Verify non-nil values before indexing nested properties."
                ],
                "optionalChallenge": "Write getAffordableItems(coins) returning an array of items the player can afford."
            }
        }
    },
    43: {
        "uk": {
            "summary": "Ти створив систему інвентарю гравця на основі таблиць, реалізував контроль максимальної місткості, додавання, видалення та пошук предметів у сумці.",
            "practiceTask": {
                "title": "Практична робота: Система інвентарю (InventorySystem_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** розробити скрипт управління інвентарем гравця з лімітом слотів.\n\n### Частина А: Структура інвентарю\n1. У `ServerScriptService` створи Script із назвою `InventoryManager`.\n2. Оголоси константу місткості та таблицю інвентарю:\n```lua\nlocal MAX_CAPACITY = 4\nlocal playerInventory = {}\n```\n\n### Частина Б: Методи інвентарю\n1. Напиши функцію `addItem(itemName)`: перевіряє `#playerInventory < MAX_CAPACITY`, додає предмет через `table.insert` і повертає true, інакше виводить попередження та повертає false.\n2. Напиши функцію `removeItem(itemName)`: знаходить індекс предмета і видаляє його через `table.remove`.\n3. Напиши функцію `printInventory()`: виводить поточний вміст і зайняті слоти.\n\n### Частина В: Тест на переповнення\n1. Додай 4 предмети: \"Potion\", \"Key\", \"Shield\", \"Coin\".\n2. Спробуй додати 5-й предмет \"Gem\" — скрипт має відхилити додавання з повідомленням «Інвентар переповнений!».\n3. Видали \"Key\" і знову додай \"Gem\" — предмет успішно займає звільнене місце.\n4. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.3 - InventorySystem_v1`.",
                "hints": [
                    "Перевірка #table < MAX_CAPACITY гарантує, що інвентар ніколи не вийде за встановлені межі.",
                    "Для пошуку предмета перед видаленням використовуй цикл for index, name in ipairs(inventory) do.",
                    "Звертай увагу на повернення логічного результату true/false для сповіщення інтерфейсу."
                ],
                "optionalChallenge": "Додай підтримку кількості однакових предметів (стекування: {Name = \"Potion\", Count = 3})."
            }
        },
        "en": {
            "summary": "You built a table-based player inventory system with max capacity validation, item insertion, item removal, and inventory search.",
            "practiceTask": {
                "title": "Hands-on Practice: Inventory System (InventorySystem_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Develop a robust slot-capped inventory system using Lua tables and helper methods.\n\n### Part A: Inventory State\n1. In `ServerScriptService`, create a Script named `InventoryManager`.\n2. Define:\n```lua\nlocal MAX_SLOTS = 4\nlocal playerInventory = {}\n```\n\n### Part B: Add & Remove Operations\n1. Write `addItem(item)` that guards on `#playerInventory < MAX_SLOTS`.\n2. Write `removeItem(itemName)` that finds and removes the item index.\n3. Write `printInventory()` to log current slots.\n\n### Part C: Capacity Testing\n1. Add 4 items, then attempt to add a 5th item.\n2. Confirm the 5th item is safely rejected with \"Inventory full\".\n3. Remove 1 item, re-add, and verify successful placement.\n4. Save Place as `Lesson 4.3 - InventorySystem_v1`.",
                "hints": [
                    "Checking #inventory < MAX_SLOTS prevents array overflow.",
                    "Iterate with ipairs to locate items before removal.",
                    "Return boolean status from addItem for UI feedback."
                ],
                "optionalChallenge": "Implement item stacking for consumables: {Name = \"Potion\", Count = 3}."
            }
        }
    },
    44: {
        "uk": {
            "summary": "Ти навчився розділяти проєкт на незалежні модулі за допомогою ModuleScript у ReplicatedStorage, підключати їх через require() та повторно використовувати глобальні константи без копіювання коду.",
            "practiceTask": {
                "title": "Практична робота: Спільний конфіг-модуль (ConfigModule_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** створити ModuleScript у ReplicatedStorage та підключити його з кількох серверних скриптів.\n\n### Частина А: Створення ModuleScript\n1. У папці `ReplicatedStorage` створи `ModuleScript` і назви його `GameConfig`.\n2. Заповни модуль таблицею налаштувань:\n```lua\nlocal GameConfig = {}\n\nGameConfig.VERSION = \"1.0.0\"\nGameConfig.START_COINS = 100\nGameConfig.DEFAULT_WALKSPEED = 16\nGameConfig.SPRINT_WALKSPEED = 28\nGameConfig.LOBBY_SPAWN = Vector3.new(0, 5, 0)\n\nreturn GameConfig\n```\n\n### Частина Б: Підключення через require()\n1. У `ServerScriptService` створи скрипт `PlayerSetup`.\n2. Імпортуй конфіг:\n```lua\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\")\nlocal GameConfig = require(ReplicatedStorage:WaitForChild(\"GameConfig\"))\n\ngame.Players.PlayerAdded:Connect(function(player)\n    player.CharacterAdded:Connect(function(character)\n        local humanoid = character:WaitForChild(\"Humanoid\")\n        humanoid.WalkSpeed = GameConfig.DEFAULT_WALKSPEED\n        print(player.Name, \"підключився до гри версії\", GameConfig.VERSION)\n    end)\nend)\n```\n\n### Частина В: Перевірка централізації\n1. Запусти Play: перевір, що швидкість персонажа та версія беруться з модуля.\n2. Зміни `DEFAULT_WALKSPEED = 24` у `GameConfig` і перезапусти Play — швидкість оновилася без змін у PlayerSetup.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.4 - ConfigModule_v1`.",
                "hints": [
                    "ModuleScript обов'язково повинен закінчуватися рядком return TableName.",
                    "Розміщуй модулі в ReplicatedStorage, якщо вони потрібні і серверу, і клієнту.",
                    "Використовуй WaitForChild(\"ModuleName\") перед require для надійного завантаження."
                ],
                "optionalChallenge": "Додай у модуль функцію GameConfig.calculateReward(level), яка повертає кількість монет за формулою."
            }
        },
        "en": {
            "summary": "You learned how to structure code with ModuleScripts in ReplicatedStorage, import them using require(), and eliminate duplicate game constants across scripts.",
            "practiceTask": {
                "title": "Hands-on Practice: Shared Config Module (ConfigModule_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Build a central configuration ModuleScript in ReplicatedStorage and require it from server scripts.\n\n### Part A: ModuleScript\n1. In `ReplicatedStorage`, insert a `ModuleScript` named `GameConfig`:\n```lua\nlocal GameConfig = {}\nGameConfig.VERSION = \"1.0.0\"\nGameConfig.START_COINS = 100\nGameConfig.DEFAULT_WALKSPEED = 16\nGameConfig.SPRINT_WALKSPEED = 28\nreturn GameConfig\n```\n\n### Part B: Requiring the Module\n1. In `ServerScriptService`, create a Script:\n```lua\nlocal ReplicatedStorage = game:GetService(\"ReplicatedStorage\")\nlocal GameConfig = require(ReplicatedStorage:WaitForChild(\"GameConfig\"))\n\ngame.Players.PlayerAdded:Connect(function(player)\n    player.CharacterAdded:Connect(function(character)\n        local humanoid = character:WaitForChild(\"Humanoid\")\n        humanoid.WalkSpeed = GameConfig.DEFAULT_WALKSPEED\n    end)\nend)\n```\n\n### Part C: Verification\n1. Playtest: verify walk speed is applied from the module.\n2. Change the module value to 24, retest, and verify instant balance updates without touching the player setup script.\n3. Save Place as `Lesson 4.4 - ConfigModule_v1`.",
                "hints": [
                    "Every ModuleScript must end with return TableName.",
                    "Place shared modules in ReplicatedStorage.",
                    "Always use WaitForChild before require."
                ],
                "optionalChallenge": "Add a helper method GameConfig.getDropChance(rarity) to the module."
            }
        }
    },
    45: {
        "uk": {
            "summary": "Ти навчився проєктувати централізовані таблиці балансу гри (GameBalance), керувати рівнями складності, множниками нагород та шансами випадіння предметів з єдиного конфігураційного файлу.",
            "practiceTask": {
                "title": "Практична робота: Модуль балансу гри (GameBalance_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** налаштувати баланс ворогів та нагород у ModuleScript і спавнити об'єкти за цим конфігом.\n\n### Частина А: Створення таблиці балансу\n1. У `ReplicatedStorage` створи `ModuleScript` із назвою `EnemyBalance`.\n2. Опиши характеристики типів ворогів:\n```lua\nlocal EnemyBalance = {\n    Slime = { Health = 50, Damage = 10, CoinReward = 15, Speed = 12, Color = \"Bright green\" },\n    Skeleton = { Health = 100, Damage = 25, CoinReward = 45, Speed = 16, Color = \"Medium stone grey\" },\n    Boss = { Health = 350, Damage = 50, CoinReward = 200, Speed = 10, Color = \"Really red\" }\n}\n\nreturn EnemyBalance\n```\n\n### Частина Б: Скрипт генератора ворогів\n1. У `ServerScriptService` створи скрипт `EnemySpawner`.\n2. Напиши функцію спавну, яка приймає тип ворога `spawnEnemy(enemyType, position)`, зчитує параметри з `EnemyBalance` і створює Model із відповідним розміром, кольором і Health.\n\n### Частина В: Перевірка на арені\n1. Заспавни по одному Slime, Skeleton та Boss на тестовій арені.\n2. Переконайся, що кожен ворог має параметри, зазначені в модулі балансу.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.5 - GameBalance_v1`.",
                "hints": [
                    "Централізація балансу в ModuleScript дозволяє змінювати складність гри за лічені секунди.",
                    "Зберігай усі числові константи (швидкість, шкода, нагороди) в конфігу, а не в коді поведінки.",
                    "Перевіряй наявність типу ворога в таблиці перед створенням моделі."
                ],
                "optionalChallenge": "Додай таблицю ймовірностей випадіння трофеїв (LootTable) з шансами у відсотках."
            }
        },
        "en": {
            "summary": "You learned how to design centralized game balance tables, manage enemy tiers, reward multipliers, and loot drops from a clean configuration file.",
            "practiceTask": {
                "title": "Hands-on Practice: Game Balance Module (GameBalance_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Separate game stats into a dedicated balance ModuleScript and spawn enemies procedurally.\n\n### Part A: Balance Module\n1. In `ReplicatedStorage`, add a `ModuleScript` named `EnemyBalance`:\n```lua\nlocal EnemyBalance = {\n    Slime = { Health = 50, Damage = 10, CoinReward = 15, Speed = 12, Color = \"Bright green\" },\n    Skeleton = { Health = 100, Damage = 25, CoinReward = 45, Speed = 16, Color = \"Medium stone grey\" },\n    Boss = { Health = 350, Damage = 50, CoinReward = 200, Speed = 10, Color = \"Really red\" }\n}\nreturn EnemyBalance\n```\n\n### Part B: Data-Driven Spawner\n1. In `ServerScriptService`, create an `EnemySpawner` script that pulls stats directly from `EnemyBalance` when instantiating enemies.\n\n### Part C: Verification\n1. Spawn each enemy type and verify their stats match the balance table.\n2. Save Place as `Lesson 4.5 - GameBalance_v1`.",
                "hints": [
                    "Never hardcode stats inside gameplay trigger scripts.",
                    "Centralized configs allow rapid live-game balancing without breaking logic.",
                    "Validate enemy type existence before accessing nested keys."
                ],
                "optionalChallenge": "Add a randomized weighted loot table for drops."
            }
        }
    },
    46: {
        "uk": {
            "summary": "Ти опанував сервіс DataStoreService у Roblox, навчився безпечно зберігати й зчитувати дані за допомогою методів SetAsync і GetAsync та захищати гру від помилок мережі через pcall.",
            "practiceTask": {
                "title": "Практична робота: Безпечний DataStore (DataStoreTest_v1)",
                "difficulty": "intermediate",
                "description": "**Мета:** налаштувати збереження та зчитування балансу монет у DataStore з обробкою помилок через pcall.\n\n### Частина А: Налаштування доступу до API\n1. Відкрий **Home → Game Settings → Security**.\n2. Увімкни опцію **Enable Studio Access to API Services** і збережи зміни.\n\n### Частина Б: Написання функцій DataStore\n1. У `ServerScriptService` створи Script із назвою `DataStoreTest`.\n2. Напиши безпечне читання та запис:\n```lua\nlocal DataStoreService = game:GetService(\"DataStoreService\")\nlocal coinStore = DataStoreService:GetDataStore(\"TestCoinStore_v1\")\n\nlocal testKey = \"User_12345\"\nlocal testCoins = 250\n\n-- Збереження\nlocal success, err = pcall(function()\n    coinStore:SetAsync(testKey, testCoins)\nend)\nif success then\n    print(\"Дані успішно збережено!\")\nelse\n    warn(\"Помилка збереження:\", err)\nend\n\n-- Зчитування\nlocal loadSuccess, loadedCoins = pcall(function()\n    return coinStore:GetAsync(testKey)\nend)\nif loadSuccess then\n    print(\"Зчитано монет з хмари:\", loadedCoins)\nend\n```\n\n### Частина В: Перевірка роботи\n1. Запусти Play: в Output має з'явитися повідомлення про успішне збереження та зчитування 250 монет.\n2. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.6 - DataStoreTest_v1`.",
                "hints": [
                    "Обов'язково увімкни Enable Studio Access to API Services у налаштуваннях гри.",
                    "Завжди загортай виклики SetAsync і GetAsync у pcall, оскільки мережеві запити можуть тимчасово падати.",
                    "Унікальним ключем запису зазвичай є UserId гравця (наприклад, \"Player_\" .. player.UserId)."
                ],
                "optionalChallenge": "Додай перевірку на nil: якщо гравець заходить уперше і даних немає, встановлювати стартовий баланс 50 монет."
            }
        },
        "en": {
            "summary": "You mastered Roblox DataStoreService, learned how to save and load data with SetAsync and GetAsync, and protected calls with pcall error handling.",
            "practiceTask": {
                "title": "Hands-on Practice: Safe DataStore (DataStoreTest_v1)",
                "difficulty": "intermediate",
                "description": "**Objective:** Set up cloud DataStore persistence with pcall error handling.\n\n### Part A: Game Security Settings\n1. Open **Home → Game Settings → Security**.\n2. Turn ON **Enable Studio Access to API Services** and save.\n\n### Part B: Pcall DataStore Script\n1. In `ServerScriptService`, create a Script:\n```lua\nlocal DataStoreService = game:GetService(\"DataStoreService\")\nlocal coinStore = DataStoreService:GetDataStore(\"CoinStore_v1\")\n\nlocal testKey = \"Player_9999\"\nlocal testValue = 250\n\nlocal saveSuccess, saveErr = pcall(function()\n    coinStore:SetAsync(testKey, testValue)\nend)\nif saveSuccess then print(\"Data saved!\") else warn(saveErr) end\n\nlocal loadSuccess, loaded = pcall(function()\n    return coinStore:GetAsync(testKey)\nend)\nif loadSuccess then print(\"Loaded coins:\", loaded) end\n```\n\n### Part C: Verification\n1. Press Play: confirm output shows successful save and load of 250 coins.\n2. Save Place as `Lesson 4.6 - DataStoreTest_v1`.",
                "hints": [
                    "Studio Access to API Services must be enabled in Game Settings.",
                    "Always wrap DataStore calls in pcall to protect against network drops.",
                    "Use player.UserId for unique player keys."
                ],
                "optionalChallenge": "Add fallback default values if GetAsync returns nil for first-time players."
            }
        }
    },
    47: {
        "uk": {
            "summary": "Ти реалізував повний життєвий цикл збереження даних гравця: завантаження при Players.PlayerAdded, збереження при Players.PlayerRemoving та захист від раптового закриття сервера через game:BindToClose.",
            "practiceTask": {
                "title": "Практична робота: Автозбереження прогресу (AutoSaveSystem_v1)",
                "difficulty": "advanced",
                "description": "**Мета:** створити комплексну систему збереження монет і рівня гравця з прив'язкою до leaderstats.\n\n### Частина А: Створення структури leaderstats\n1. У `ServerScriptService` створи Script `SaveManager`.\n2. Підключи `Players.PlayerAdded`:\n   - створи папку `leaderstats` всередині гравця;\n   - створи `IntValue` з назвою `Coins` і `IntValue` з назвою `Level`.\n\n### Частина Б: Логіка завантаження, збереження та BindToClose\n1. При вході зчитуй дані з DataStore за ключем `\"Player_\" .. player.UserId` через `pcall` і записуй у leaderstats.\n2. При виході (`Players.PlayerRemoving`) зберігай поточні значення `Coins.Value` та `Level.Value`.\n3. Додай аварійне збереження сервера:\n```lua\ngame:BindToClose(function()\n    for _, player in ipairs(game.Players:GetPlayers()) do\n        savePlayerData(player)\n    end\nend)\n```\n\n### Частина В: Повний тест прогресу\n1. Запусти Play: зміни кількість Coins через панель Properties або командний рядок.\n2. Зупини Play і запусти знову: перевір, що змінена кількість монет відновилася з хмари.\n3. Збережи рівень: **File → Save to Roblox** під назвою `Lesson 4.7 - AutoSaveSystem_v1`.",
                "hints": [
                    "Папка обов'язково повинна називатися leaderstats (малими літерами), щоб відображатися в таблиці лідерів.",
                    "BindToClose спрацьовує перед вимкненням сервера і рятує дані гравців при перезавантаженні гри.",
                    "Для збереження кількох параметрів упаковуй їх у таблицю: {Coins = 100, Level = 2}."
                ],
                "optionalChallenge": "Додай періодичне автозбереження кожні 5 хвилин для всіх активних гравців на сервері."
            }
        },
        "en": {
            "summary": "You implemented a complete player data lifecycle: loading on Players.PlayerAdded, saving on Players.PlayerRemoving, and shutdown protection via game:BindToClose.",
            "practiceTask": {
                "title": "Hands-on Practice: Auto-Save System (AutoSaveSystem_v1)",
                "difficulty": "advanced",
                "description": "**Objective:** Create an end-to-end player progression auto-save system tied to leaderstats.\n\n### Part A: Leaderstats Initialization\n1. In `ServerScriptService`, create a Script named `SaveManager`.\n2. On `Players.PlayerAdded`, create a `leaderstats` folder with `Coins` and `Level` IntValues.\n\n### Part B: Save, Load, and BindToClose\n1. Load player data on join using `GetAsync` in a pcall.\n2. Save on `Players.PlayerRemoving` with `SetAsync`.\n3. Add `game:BindToClose` to iterate all active players on server shutdown.\n\n### Part C: Verification\n1. Playtest: change your Coins value in Properties.\n2. Stop Play, restart, and confirm your updated Coins persisted from the DataStore.\n3. Save Place as `Lesson 4.7 - AutoSaveSystem_v1`.",
                "hints": [
                    "The folder must be named 'leaderstats' (all lowercase) for the Roblox leaderboard HUD.",
                    "BindToClose saves data when game servers restart.",
                    "Save multiple stats as a dictionary: {Coins = 100, Level = 2}."
                ],
                "optionalChallenge": "Add a periodic background auto-save loop every 5 minutes."
            }
        }
    },
    48: {
        "uk": {
            "summary": "Ти успішно завершив Модуль 4 і розробив повноцінний конвеєр даних FullDataPipeline_v1, поєднавши конфігурацію в ModuleScript, інвентар на таблицях та надійне збереження прогресу в DataStore.",
            "practiceTask": {
                "title": "Фінальний проект модуля 4: Повна система даних (FullDataPipeline_v1)",
                "difficulty": "advanced",
                "description": "**Мета:** об'єднати конфігурацію, інвентар і хмарне збереження у фінальну модульну систему.\n\n### Частина А: Модуль предметів\n1. У `ReplicatedStorage` створи `ModuleScript` `ItemConfig` зі списком доступних у грі предметів та їхніх цін.\n\n### Частина Б: Менеджер сесії та збереження\n1. У `ServerScriptService` створи `DataManager`:\n   - створює `leaderstats` (Coins, Level);\n   - веде таблицю активного інвентарю для кожного гравця;\n   - зберігає і монети, і список предметів інвентарю в DataStore при виході;\n   - використовує `BindToClose` для безпечного завершення.\n\n### Частина В: Фінальне тестування\n1. Зайди в гру, зароби монети, придбай предмет у тестовому магазині.\n2. Перевір вміст інвентарю через Output.\n3. Перезапусти гру й переконайся, що після нового входу всі придбані предмети та баланс монет збережені.\n4. Збережи проект: **File → Save to Roblox** під назвою `Lesson 4.8 - FullDataPipeline_v1`.",
                "hints": [
                    "DataStore підтримує збереження таблиць, тому інвентар можна зберігати як масив імен предметів.",
                    "Розділяй код на модулі: Config у ReplicatedStorage, логіка збереження у ServerScriptService.",
                    "Перевір консоль Output на відсутність помилок DataStore під час тестування."
                ],
                "optionalChallenge": "Додай захист від втрати даних: сесійне блокування (session locking), яке перевіряє, чи не завантажений гравець на іншому сервері."
            }
        },
        "en": {
            "summary": "You completed Module 4 by building the complete FullDataPipeline_v1 system, combining ModuleScript configs, table-based inventory, and reliable DataStore auto-saving.",
            "practiceTask": {
                "title": "Module 4 Final Project: Full Data Pipeline (FullDataPipeline_v1)",
                "difficulty": "advanced",
                "description": "**Objective:** Combine configs, player tables, and cloud saving into an integrated production data pipeline.\n\n### Part A: Shared Config\n1. Create `ItemConfig` in `ReplicatedStorage` with item definitions and prices.\n\n### Part B: Session & Save Manager\n1. In `ServerScriptService`, build `DataManager`:\n   - Setup leaderstats (Coins, Level);\n   - Manage player inventory arrays;\n   - Save coin balance + inventory array to DataStore on player leave;\n   - Implement `game:BindToClose`.\n\n### Part C: Full Pipeline Test\n1. Join game, earn coins, buy items.\n2. Restart game and verify coins and inventory items reload cleanly.\n3. Save Place as `Lesson 4.8 - FullDataPipeline_v1`.",
                "hints": [
                    "DataStores serialize tables directly into JSON.",
                    "Keep configs in ReplicatedStorage and database logic in ServerScriptService.",
                    "Check Output for zero DataStore warning logs."
                ],
                "optionalChallenge": "Add session locking to prevent data race conditions across multiple server instances."
            }
        }
    }
}

# ==========================================
# MODULE 5 COMMON MISTAKES (UK & EN)
# ==========================================

M5_MISTAKES = {
    51: {
        "uk": [
            {
                "mistake": "Платформи падають у прірву одразу після старту Play",
                "explanation": "Для платформ біому не було встановлено властивість Anchored = true.",
                "correctApproach": "Виділи всі створені частини біомів у папках Biome_1, Biome_2, Biome_3 та встанови Anchored = true."
            },
            {
                "mistake": "Перший біом занадто складний, новачки не можуть зробити перші 3 стрибки",
                "explanation": "Відстані між платформами у зоні навчання перевищують комфортні 6-8 стадів.",
                "correctApproach": "Зроби платформи першого біому ширшими, а дистанції між ними не більше 6-8 стадів для плавного входу в гру."
            },
            {
                "mistake": "Усі біоми виглядають однаково, гравець губиться в просторі",
                "explanation": "Використано один і той самий матеріал та колір для всіх зон оббі.",
                "correctApproach": "Використовуй контрастні палітри та матеріали для кожної з трьох папок (наприклад: Трава/Зелений -> Пісок/Жовтий -> Камінь/Темно-сірий)."
            }
        ],
        "en": [
            {
                "mistake": "Platforms fall into the abyss immediately after pressing Play",
                "explanation": "The Anchored property was not set to true on the biome parts.",
                "correctApproach": "Select all platform parts across Biome_1, Biome_2, Biome_3 folders and set Anchored = true."
            },
            {
                "mistake": "Biome 1 is too punishing, preventing beginners from completing the first 3 jumps",
                "explanation": "Platform gaps in the tutorial zone exceed comfortable 6-8 stud distances.",
                "correctApproach": "Make starting platforms wider and keep early gaps between 6-8 studs for a gentle learning curve."
            },
            {
                "mistake": "All biomes look identical, making navigation confusing",
                "explanation": "The same material and color palette were used throughout the entire obby.",
                "correctApproach": "Use distinct color schemes and materials for each folder (e.g., Grass/Green -> Sand/Yellow -> Basalt/Dark Grey)."
            }
        ]
    },
    52: {
        "uk": [
            {
                "mistake": "Лавовий блок вбиває гравця 20 разів за секунду і спамить помилки в Output",
                "explanation": "У скрипті обробника Touched відсутній прапорець debounce.",
                "correctApproach": "Додай змінну isDebounced = false, перевіряй її перед нанесенням шкоди і встановлюй коротку паузу task.wait(0.5)."
            },
            {
                "mistake": "Скрипт видає помилку 'attempt to index nil with Health' коли на лаву падає інший блок",
                "explanation": "Немає перевірки наявності компонента Humanoid у батьківському об'єкті дотику.",
                "correctApproach": "Завжди перевіряй local humanoid = hit.Parent:FindFirstChild(\"Humanoid\") і нанось шкоду лише якщо humanoid ~= nil."
            },
            {
                "mistake": "Небезпечні зони виглядають як звичайна підлога, гравець гине без попередження",
                "explanation": "Порушено принцип чесного ігрового дизайну (fair play).",
                "correctApproach": "Завжди виділяй смертельні перешкоди яскравими контрастними кольорами (Really red, Neon) або текстурою лави/кислоти."
            }
        ],
        "en": [
            {
                "mistake": "Lava block eliminates the player 20 times per second and floods Output logs",
                "explanation": "The Touched event handler lacks a debounce guard.",
                "correctApproach": "Add a local isDebounced = false variable, verify it before damage, and reset after task.wait(0.5)."
            },
            {
                "mistake": "Error 'attempt to index nil with Health' occurs when non-character parts touch lava",
                "explanation": "The script attempts to read Health without confirming a Humanoid exists.",
                "correctApproach": "Always check local humanoid = hit.Parent:FindFirstChild(\"Humanoid\") and only apply damage if humanoid is not nil."
            },
            {
                "mistake": "Hazards look like regular safe platforms, killing players unexpectedly",
                "explanation": "Violates fair visual design principles.",
                "correctApproach": "Always make fatal hazards unmistakably visible with bright Neon materials or lava textures."
            }
        ]
    },
    53: {
        "uk": [
            {
                "mistake": "Гравець може перестрибнути одразу на чекпоінт #5 і пропустити весь рівень",
                "explanation": "Скрипт чекпоінта не перевіряє порядковий номер попереднього досягнутого чекпоінта.",
                "correctApproach": "Дозволяй активацію чекпоінта N лише за умови, що поточний чекпоінт гравця дорівнює N - 1."
            },
            {
                "mistake": "Після респавну персонаж застрягає всередині підлоги чекпоінта",
                "explanation": "Точка відродження встановлена точно на висоті плити без зміщення по осі Y.",
                "correctApproach": "Додавай зміщення вгору: spawnCFrame = checkpoint.CFrame + Vector3.new(0, 3.5, 0)."
            },
            {
                "mistake": "Зміна чекпоінта реалізована в LocalScript і не зберігається на сервері",
                "explanation": "Клієнтський LocalScript не має авторитету змінювати серверні дані гравця.",
                "correctApproach": "Оновлюй активний чекпоінт виключно у серверному Script."
            }
        ],
        "en": [
            {
                "mistake": "Players can jump directly to checkpoint #5 and bypass the level",
                "explanation": "The checkpoint script fails to validate sequential checkpoint order.",
                "correctApproach": "Only activate checkpoint N if the player's current checkpoint equals N - 1."
            },
            {
                "mistake": "Character spawns stuck inside the floor upon respawning",
                "explanation": "Spawn CFrame was set without adding vertical height offset.",
                "correctApproach": "Add a vertical offset: spawnCFrame = checkpoint.CFrame + Vector3.new(0, 3.5, 0)."
            },
            {
                "mistake": "Checkpoints managed in LocalScript fail to sync on server respawns",
                "explanation": "Client LocalScripts lack server authority over respawn logic.",
                "correctApproach": "Manage active checkpoint state strictly inside server Scripts."
            }
        ]
    },
    54: {
        "uk": [
            {
                "mistake": "Студія зависає одразу після запуску Play",
                "explanation": "У циклі while true do відсутній виклик task.wait().",
                "correctApproach": "Обов'язково додавай task.wait(duration) усередину нескінченного циклу руху платформи."
            },
            {
                "mistake": "Персонаж зісковзує або падає з платформи під час її руху",
                "explanation": "Платформа рухається через Position замість плавного TweenService або PrismaticConstraint.",
                "correctApproach": "Використовуй TweenService для переміщення платформ, щоб фізичний рушій коректно переносив гравця разом з нею."
            },
            {
                "mistake": "Платформа зникає миттєво без візуального попередження для гравця",
                "explanation": "Зміна прозорості Transparency відбувається різко, гравець не встигає зреагувати.",
                "correctApproach": "Додай ефект миготіння або поступової зміни Transparency від 0 до 0.8 перед вимкненням CanCollide."
            }
        ],
        "en": [
            {
                "mistake": "Studio freezes immediately upon launching Play mode",
                "explanation": "The while true loop is missing a task.wait() call.",
                "correctApproach": "Always include task.wait(interval) inside repeating platform loops."
            },
            {
                "mistake": "Player slips off moving platforms during motion",
                "explanation": "Moving platforms by modifying Position directly breaks character physics friction.",
                "correctApproach": "Use TweenService or Constraints for smooth kinematic platform movement."
            },
            {
                "mistake": "Disappearing platforms vanish abruptly without player warning",
                "explanation": "Transparency and collision drop to 0 with zero telegraphing.",
                "correctApproach": "Add a 0.5s flash or fade animation before setting CanCollide = false."
            }
        ]
    },
    55: {
        "uk": [
            {
                "mistake": "Ключ можна підібрати нескінченну кількість разів",
                "explanation": "Після підбирання ключ не знищується і не деактивується для цього гравця.",
                "correctApproach": "Знищуй ключ через keyPart:Destroy() або позначай атрибутом collected = true."
            },
            {
                "mistake": "Секретні двері відчиняються для всіх гравців на сервері, коли ключ знайшов один гравець",
                "explanation": "Двері відкриваються глобально на сервері без персональної перевірки прав.",
                "correctApproach": "Перевіряй наявність ключа в інвентарі або відкривай секрет локально через LocalScript / перевірку персонажа."
            },
            {
                "mistake": "Секретний прохід неможливо знайти без читів або підказок",
                "explanation": "Повна відсутність візуальних натяків на існування таємної зони.",
                "correctApproach": "Залиш тонкий візуальний натяк: інший колір стіни, ледь помітні частинки або сліди на підлозі."
            }
        ],
        "en": [
            {
                "mistake": "Key item can be collected infinitely many times",
                "explanation": "The key is neither destroyed nor tagged with a collected attribute upon touch.",
                "correctApproach": "Call keyPart:Destroy() or set an attribute keyPart:SetAttribute(\"Collected\", true)."
            },
            {
                "mistake": "Secret door opens for every server player when only one player finds the key",
                "explanation": "Door opens globally on the server without player inventory verification.",
                "correctApproach": "Verify key ownership before unlocking or toggle locally on the client."
            },
            {
                "mistake": "Secret area is completely undetectable without trial-and-error guessing",
                "explanation": "No visual telegraphing is provided to reward observant players.",
                "correctApproach": "Add subtle hints such as distinct wall tints, particle sparks, or floor markings."
            }
        ]
    },
    56: {
        "uk": [
            {
                "mistake": "Тестування гри проводиться лише один раз самостійно",
                "explanation": "Автор гри знає всі пастки і не бачить проблем сприйняття новачком.",
                "correctApproach": "Проведи плейтест з іншими людьми (або запиши відео проходження) і зафіксуй місця, де гравці найчастіше гинуть."
            },
            {
                "mistake": "Ігнорування червоних помилок у панелі Output під час плейтесту",
                "explanation": "Помилки у фоні можуть зламати механіки респавну чи підрахунку очок.",
                "correctApproach": "Виправ усі помилки та попередження в Output перед переходом до налаштування балансу."
            }
        ],
        "en": [
            {
                "mistake": "Testing only once by the developer without external blind playtests",
                "explanation": "Developers memorize obstacle timings and overlook novice friction points.",
                "correctApproach": "Conduct blind playtests with friends or test recordings to identify choke points."
            },
            {
                "mistake": "Ignoring red error messages in the Output log during playtesting",
                "explanation": "Hidden script errors can silently break respawn or scoring systems.",
                "correctApproach": "Resolve all Output warnings and errors before finalizing game balance."
            }
        ]
    },
    57: {
        "uk": [
            {
                "mistake": "Складність зростає різким стрибком: біом 1 легкий, біом 2 неможливий",
                "explanation": "Порушено плавність кривої складності (difficulty curve).",
                "correctApproach": "Збільшуй дистанцію стрибків поступово: біом 1 (6-8 стадів), біом 2 (8-11 стадів), біом 3 (11-13 стадів)."
            },
            {
                "mistake": "Стрибки вимагають міліметрової точності на 15+ стадів без спідбусту",
                "explanation": "Стандартний персонаж Roblox не може подолати відстань понад 13-14 стадів без прискорення чи підсилення стрибка.",
                "correctApproach": "Тестуй максимальну довжину стрибка власноруч без чіт-інструментів."
            }
        ],
        "en": [
            {
                "mistake": "Sudden difficulty spikes between biomes causing early player churn",
                "explanation": "Violates smooth difficulty progression principles.",
                "correctApproach": "Scale jump distances gradually: Biome 1 (6-8 studs), Biome 2 (8-11 studs), Biome 3 (11-13 studs)."
            },
            {
                "mistake": "Placing 15+ stud gap jumps without providing speed boost powerups",
                "explanation": "Default Roblox avatar physics cannot clear 14+ stud flat jumps.",
                "correctApproach": "Keep standard jumps under 13 studs unless speed or jump modifiers are active."
            }
        ]
    },
    58: {
        "uk": [
            {
                "mistake": "На рівні є місця «софтлоку», де гравець застрягає без можливості вмерти або вийти",
                "explanation": "Між стінами або декораціями утворилися щілини з колізією.",
                "correctApproach": "Перевір усі закутки рівня і розмісти в глибоких ямах невидимі kill-блоки, що повертають на чекпоінт."
            },
            {
                "mistake": "Камера застрягає в текстурах високих стін під час вузьких проходів",
                "explanation": "Стіни мають увімкнену CanCollide для камери без достатнього простору.",
                "correctApproach": "Зроби проходи ширшими або встанови CanQuery/CanTouch на декоративні перегородки."
            }
        ],
        "en": [
            {
                "mistake": "Softlock pits where players get permanently stuck without resetting",
                "explanation": "Blind gaps between decorative meshes trap players without triggering death.",
                "correctApproach": "Place invisible KillBricks across all dead-end crevices to reset players to checkpoints."
            },
            {
                "mistake": "Camera clipping awkwardly inside high narrow walls",
                "explanation": "Tight corridors collide aggressively with third-person camera occlusion.",
                "correctApproach": "Widen narrow tunnels or set CanCollide = false on camera-blocking decor."
            }
        ]
    },
    59: {
        "uk": [
            {
                "mistake": "3D-звук чути на весь світ незалежно від відстані до джерела",
                "explanation": "Властивість RollOffMaxDistance звуку встановлена на занадто велике значення або Sound знаходиться в SoundService.",
                "correctApproach": "Розміщуй 3D-звук усередині конкретного Part і налаштовуй RollOffMaxDistance в межах 20-40 стадів."
            },
            {
                "mistake": "Велика кількість частинок ParticleEmitter призводить до падіння FPS",
                "explanation": "Встановлено надмірне значення Rate (кількість частинок на секунду).",
                "correctApproach": "Тримай параметр Rate у межах 5-15 для фонових ефектів і вимикай емітери, коли вони не потрібні."
            },
            {
                "mistake": "Звук підбирання монети оглушливо програється 30 разів за секунду при дотику",
                "explanation": "Відсутній debounce перед викликом sound:Play().",
                "correctApproach": "Програвай звук лише один раз при зміні стану та успішному зборі предмета."
            }
        ],
        "en": [
            {
                "mistake": "3D spatial audio heard globally across the entire map",
                "explanation": "RollOffMaxDistance is set excessively high or the Sound instance is parented to SoundService.",
                "correctApproach": "Parent 3D Sound instances directly inside world Parts and set RollOffMaxDistance between 20-40 studs."
            },
            {
                "mistake": "High ParticleEmitter emission rates causing mobile framerate drops",
                "explanation": "Rate property set excessively high on multiple simultaneous emitters.",
                "correctApproach": "Keep Rate between 5-15 for ambient environmental effects."
            },
            {
                "mistake": "Collection SFX plays 30 times in a fraction of a second on touch",
                "explanation": "sound:Play() called without debounce filtering.",
                "correctApproach": "Trigger audio playback only once upon successful pickup validation."
            }
        ]
    },
    510: {
        "uk": [
            {
                "mistake": "Спроба видати бейдж через BadgeService у LocalScript на клієнті",
                "explanation": "Метод AwardBadge працює виключно на сервері з міркувань безпеки.",
                "correctApproach": "Викликай BadgeService:AwardBadge(player.UserId, badgeId) у серверному Script при досягненні фінішної лінії."
            },
            {
                "mistake": "Бейдж не видається, бо вказано пустий або тестовий ID бейджа",
                "explanation": "Бейдж повинен бути попередньо створений на сайті Roblox у налаштуваннях плейсу.",
                "correctApproach": "Створи Badge на вкладці Creations сторінки плейсу та встав справжній числовий BadgeId."
            },
            {
                "mistake": "Гра опублікована без налаштування дозволеного типу аватара (R6 або R15)",
                "explanation": "Стрибки, розраховані на R6, можуть бути непрохідними або занадто легкими на R15 через різницю в анімаціях.",
                "correctApproach": "У Game Settings → Avatar обери чіткий тип аватара (наприклад, R6 або R15) під який калибрувався весь оббі."
            }
        ],
        "en": [
            {
                "mistake": "Attempting to award badges from a client LocalScript",
                "explanation": "BadgeService:AwardBadge is strictly restricted to server Scripts for security.",
                "correctApproach": "Call BadgeService:AwardBadge(player.UserId, badgeId) inside a server Script on finish line touch."
            },
            {
                "mistake": "Badges fail to award due to empty or unconfigured badge IDs",
                "explanation": "Badges must be provisioned in the Roblox Creator dashboard first.",
                "correctApproach": "Create a Badge in Creator Hub and paste the numeric ID into your config."
            },
            {
                "mistake": "Game published without enforcing Avatar Rig type (R6 vs R15)",
                "explanation": "Jump clearances calibrated for R6 can fail on R15 due to animation differences.",
                "correctApproach": "In Game Settings → Avatar, lock the avatar type to match your jump tuning (e.g. R6 or R15)."
            }
        ]
    }
}

# ==========================================
# FILE UPDATE UTILITIES
# ==========================================

def update_module_34(file_path, locale, mod_num):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    data = M3_DATA if mod_num == 3 else M4_DATA

    for lesson_num in range(1, 9):
        key = int(f"{mod_num}{lesson_num}")
        lesson_data = data.get(key, {}).get(locale)
        if not lesson_data:
            continue

        var_name = f"{locale}Lesson{key}"
        pattern = rf"(export const {var_name} = \{{[\s\S]*?)(quiz:\s*\{{)"
        match = re.search(pattern, content)
        if match:
            block = match.group(1)
            # Remove any pre-existing summary or practiceTask in block
            block = re.sub(r'summary:\s*["`][\s\S]*?["`],\s*', '', block)
            block = re.sub(r'practiceTask:\s*\{[\s\S]*?\},\s*', '', block)

            summary_json = json.dumps(lesson_data["summary"], ensure_ascii=False)
            practice_json = json.dumps(lesson_data["practiceTask"], ensure_ascii=False, indent=2)

            # Indent practice_json cleanly
            practice_indented = "\n".join("  " + line if i > 0 else line for i, line in enumerate(practice_json.split("\n")))

            insertion = f"  summary: {summary_json},\n  practiceTask: {practice_indented},\n  "
            new_block = block + insertion + match.group(2)
            content = content[:match.start()] + new_block + content[match.end():]
            print(f"Updated {var_name} in {os.path.basename(file_path)}")
        else:
            print(f"WARNING: Could not find {var_name} in {os.path.basename(file_path)}")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)


def update_module_5(file_path, locale):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    for lesson_num in range(1, 11):
        key = int(f"5{lesson_num}")
        mistakes = M5_MISTAKES.get(key, {}).get(locale)
        if not mistakes:
            continue

        var_name = f"{locale}Lesson{key}"
        pattern = rf"(export const {var_name} = \{{[\s\S]*?)(summary:\s*|practiceTask:\s*|quiz:\s*\{{)"
        match = re.search(pattern, content)
        if match:
            block = match.group(1)
            block = re.sub(r'commonMistakes:\s*\[[\s\S]*?\],\s*', '', block)

            mistakes_json = json.dumps(mistakes, ensure_ascii=False, indent=2)
            mistakes_indented = "\n".join("  " + line if i > 0 else line for i, line in enumerate(mistakes_json.split("\n")))

            insertion = f"  commonMistakes: {mistakes_indented},\n  "
            new_block = block + insertion + match.group(2)
            content = content[:match.start()] + new_block + content[match.end():]
            print(f"Injected commonMistakes for {var_name} in {os.path.basename(file_path)}")
        else:
            print(f"WARNING: Could not find {var_name} in {os.path.basename(file_path)}")

    # Fix question 9 duplicate option in 5.4
    if locale == "uk":
        content = re.sub(
            r'options:\s*\[\s*"5\.7 видаляє Config",\s*"Difficulty curve крутитиме waitUp/waitDown як важіль",\s*"5\.7 видаляє Config",\s*"Платформи більше не потрібні",\s*\]',
            'options: [\n          "5.7 видаляє Config",\n          "Difficulty curve крутитиме waitUp/waitDown як важіль",\n          "Платформи рухатимуться випадково без таймінгу",\n          "Платформи більше не потрібні",\n        ]',
            content
        )
    else:
        content = re.sub(
            r'options:\s*\[\s*"5\.7 removes Config",\s*"The difficulty curve will twist waitUp/waitDown like a lever",\s*"5\.7 removes Config",\s*"Platforms are no longer needed",\s*\]',
            'options: [\n          "5.7 removes Config",\n          "The difficulty curve will twist waitUp/waitDown like a lever",\n          "Platforms move randomly without timing",\n          "Platforms are no longer needed",\n        ]',
            content
        )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)


print("\n--- UPGRADING MODULE 3 ---")
update_module_34(os.path.join(ROOT, "uk", "module03-lessons.js"), "uk", 3)
update_module_34(os.path.join(ROOT, "en", "module03-lessons.js"), "en", 3)

print("\n--- UPGRADING MODULE 4 ---")
update_module_34(os.path.join(ROOT, "uk", "module04-lessons.js"), "uk", 4)
update_module_34(os.path.join(ROOT, "en", "module04-lessons.js"), "en", 4)

print("\n--- UPGRADING MODULE 5 ---")
update_module_5(os.path.join(ROOT, "uk", "module05-lessons.js"), "uk")
update_module_5(os.path.join(ROOT, "en", "module05-lessons.js"), "en")

print("\nAll upgrades applied successfully!")
