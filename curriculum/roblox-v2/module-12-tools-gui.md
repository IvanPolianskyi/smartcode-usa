# Модуль 12 — Tools, взаємодія, GUI

**Уроків:** 6 × 60′  
**Артефакт модуля:** міні-арена або «майстерня»: Tool (зброя/інструмент) → урон/дія → GUI HP/патрони або статус → простий магазин Tool → безпечний Remote  
**Після М12:** Tool lifecycle, базова бойова/інструментальна механіка, міцніший GUI

---

## Урок 12.1 — Що таке Tool

**Ціль:** створити Tool з Handle; покласти в StarterPack; зрозуміти Equipped/Unequipped.

### Артефакт
Tool `Hammer` або `Sword` (Part Handle + модель); зʼявляється в хотбарі.

### Шаблон (LocalScript у Tool)
```lua
local tool = script.Parent

tool.Equipped:Connect(function()
	print(tool.Name .. " equipped")
end)

tool.Unequipped:Connect(function()
	print(tool.Name .. " unequipped")
end)
```

### Таймінг 60′
Демо структура Tool → разом Handle → самі свій скін інструмента → Equipped print → тест → ДЗ.

### Тест 12.1

1. Tool у Roblox — це…  
   a) Предмет який гравець тримає в хотбарі/руці  
   b) Тип Sky  
   c) NegatePart  
   d) Terrain brush  
   **Відповідь: a**

2. Handle потрібен щоб…  
   a) Tool коректно еквіпився (база)  
   b) Видалити Workspace  
   c) Вимкнути Output  
   d) Зробити DataStore  
   **Відповідь: a**

3. StarterPack…  
   a) Дає Tool гравцю при старті  
   b) Малює небо  
   c) Робіть Union  
   d) Відкриває Avatar Editor обовʼязково  
   **Відповідь: a**

4. Equipped подія…  
   a) Коли взяли Tool у руки  
   b) Коли купили Robux  
   c) Коли видалили Place  
   d) Коли змінили біом словами  
   **Відповідь: a**

5. Артефакт?  
   a) Свій Tool у хотбарі  
   b) Повний Tycoon  
   c) Blender face  
   d) Відеомонтаж  
   **Відповідь: a**

6. Без Handle типові проблеми…  
   a) Tool може некоректно працювати  
   b) Завжди ідеально  
   c) Дає Badge  
   d) Зберігає Cash  
   **Відповідь: a**

7. Unequipped…  
   a) Сховали/прибрали Tool  
   b) Видалили акаунт  
   c) Вимкнули Wi-Fi  
   d) Зробили Negate  
   **Відповідь: a**

8. Tool vs звичайний Part у Workspace…  
   a) Tool має lifecycle екіпірування  
   b) Немає різниці ніколи  
   c) Part завжди в хотбарі  
   d) Tool невидимо завжди  
   **Відповідь: a**

9. ДЗ прикрасити Tool…  
   a) Колір/декор без поломки Handle  
   b) Видалити Handle  
   c) Видалити StarterPack  
   d) Скасувати print  
   **Відповідь: a**

10. Далі…  
    a) Активація Tool (клік)  
    b) Тільки Ambient  
    c) Тільки Decal  
    d) НМТ  
    **Відповідь: a**

---

---

## Урок 12.2 — Activated: інструмент діє

**Ціль:** `Tool.Activated` → функція дії (хитання: print + короткий debounce + опційно анімація пізніше).

### Артефакт
Hammer «бʼє»: якщо Raycast/ Touched під час удару по Part з тегом Breakable — Part Destroy або HP--. Для простоти: **клік Activated → print + звук + cooldown**.

### Шаблон (Script або LocalScript у Tool — старт без урану)
```lua
local tool = script.Parent
local cooldown = false
local COOLDOWN_SEC = 0.6

tool.Activated:Connect(function()
	if cooldown then
		return
	end
	cooldown = true
	print(tool.Name .. " swing!")
	-- TODO 12.3: тут викликати серверний урон
	task.wait(COOLDOWN_SEC)
	cooldown = false
end)
```

### Таймінг 60′
Демо Activated → разом cooldown → самі звук/колір спалах → тест → ДЗ підготовка Breakable Parts.

### Тест 12.2

1. Activated спрацьовує коли…  
   a) Гравець клікає з екіпованим Tool  
   b) Відкриває Toolbox  
   c) Міняє Sky  
   d) Робить Negate сам по собі  
   **Відповідь: a**

2. Cooldown потрібен щоб…  
   a) Не спамити дію  
   b) Видалити Tool  
   c) Вимкнути Play  
   d) Зберегти PDF  
   **Відповідь: a**

3. Артефакт?  
   a) Tool з дією Activated  
   b) Повний DataStore galaxy  
   c) Blender  
   d) Clipchamp  
   **Відповідь: a**

4. Звук удару…  
   a) Фідбек  
   b) Заміна Handle  
   c) Заміна StarterPack  
   d) DataStore  
   **Відповідь: a**

5. LocalScript vs Script на Tool…  
   a) Обережно: урон краще підтверджувати на сервері (далі)  
   b) Все завжди лише локально й нараховувати HP всім світом без сервера  
   c) Script заборонений у Tool назавжди  
   d) LocalScript видаляє Tool  
   **Відповідь: a**

6. Без debounce Activated…  
   a) Спам подій  
   b) Кращий DPS всегда етичний  
   c) Дає Robux  
   d) Відкриває Badge  
   **Відповідь: a**

7. ДЗ Breakable…  
   a) Parts для наступного уроку урону  
   b) Видалити Tool  
   c) Видалити Handle  
   d) Скасувати Activated  
   **Відповідь: a**

8. print на Activated на старті…  
   a) Доводить що подія жива  
   b) Заборонений  
   c) Ламає хотбар  
   d) Вимикає камеру  
   **Відповідь: a**

9. М12 будує на подіях М8…  
   a) Так  
   b) Ні  
   c) Лише на Negate  
   d) Лише на Atmosphere  
   **Відповідь: a**

10. Далі…  
    a) Урон / ламання з серверною перевіркою  
    b) Тільки Sky  
    c) Тільки паркан  
    d) НМТ  
    **Відповідь: a**

---

---

## Урок 12.3 — Урон і Humanoid

**Ціль:** сервер обробляє удар: зменшує Humanoid.Health або HP Attribute на NPC/манекені.

### Артефакт
Манекен `TrainingDummy` з Humanoid; Tool завдає 10 HP з cooldown; смерть dummy reset HP через 3 сек.

### Шаблон (Script у ServerScriptService — серверний урон по dummy)
```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local dealDamage = Instance.new("RemoteEvent")
dealDamage.Name = "DealDummyDamage"
dealDamage.Parent = ReplicatedStorage

local DAMAGE = 10
local RANGE = 12

dealDamage.OnServerEvent:Connect(function(player)
	local character = player.Character
	if not character then
		return
	end
	local root = character:FindFirstChild("HumanoidRootPart")
	local dummy = workspace:FindFirstChild("TrainingDummy")
	if not root or not dummy then
		return
	end
	local humanoid = dummy:FindFirstChildOfClass("Humanoid")
	local torso = dummy.PrimaryPart or dummy:FindFirstChild("HumanoidRootPart") or dummy:FindFirstChildWhichIsA("BasePart")
	if not humanoid or not torso then
		return
	end
	if (root.Position - torso.Position).Magnitude > RANGE then
		return
	end
	humanoid.Health = math.max(0, humanoid.Health - DAMAGE)
	if humanoid.Health <= 0 then
		task.delay(3, function()
			if humanoid then
				humanoid.Health = humanoid.MaxHealth
			end
		end)
	end
end)
```

### Таймінг 60′
Безпека: не робити PvP без правил → PvE dummy → Remote/сервер touch логіка за шаблоном школи → тест → ДЗ.

### Тест 12.3

1. Humanoid.Health…  
   a) Здоровʼя персонажа/манекена  
   b) Ціна Tool  
   c) Volume  
   d) ClockTime  
   **Відповідь: a**

2. Урон на сервері…  
   a) Базова чесність  
   b) Гірше завжди  
   c) Видаляє Tool  
   d) Вимикає Output  
   **Відповідь: a**

3. TrainingDummy…  
   a) Безпечна мішень для навчання  
   b) Обовʼязковий реальний PvP без згоди  
   c) NegatePart  
   d) Sky  
   **Відповідь: a**

4. Артефакт?  
   a) Tool що бʼє dummy  
   b) Повний MMO  
   c) Blender face  
   d) Відеомонтаж  
   **Відповідь: a**

5. Reset HP dummy…  
   a) Можна тренуватись знову  
   b) Заборонено  
   c) Видаляє Place  
   d) Дає Robux  
   **Відповідь: a**

6. Hit detection просто…  
   a) Touched під час удару / короткий Hitbox Part  
   b) Обовʼязковий AAA ray за 1 урок  
   c) Обовʼязковий ML AI  
   d) Обовʼязковий Blender cloth  
   **Відповідь: a**

7. Якщо урон іде крізь пів карти…  
   a) Звужений hitbox / перевірка дистанції  
   b) Ідеал  
   c) Дає Badge  
   d) Зберігає DataStore  
   **Відповідь: a**

8. PvP у групі дітей…  
   a) Лише з правилами викладача / краще PvE  
   b) Завжди вмикати без розмов  
   c) Єдина мета курсу  
   d) Заміна всіх модулів  
   **Відповідь: a**

9. ДЗ другий tool зі слабшим уроном…  
   a) Порівняння балансу  
   b) Видалити dummy  
   c) Видалити Health  
   d) Скасувати cooldown  
   **Відповідь: a**

10. Далі…  
    a) GUI HP / статус  
    b) Тільки Ambient  
    c) Тільки Decal  
    d) НМТ  
    **Відповідь: a**

---

---

## Урок 12.4 — GUI HP + магазин Tools

**Ціль:** ScreenGui з Frame HP + магазин Tool за валюту (whitelist на сервері). Не довіряти клієнту імʼя «AdminSword».

### Артефакт
HP bar для гравця + whitelist `ToolsForSale` + Remote BuyTool → Tool у Backpack після покупки.

### Шаблон HP (LocalScript у Fill-Frame)
```lua
local player = game.Players.LocalPlayer
local bar = script.Parent -- Frame Fill
local maxWidth = bar.Size.X.Offset
if maxWidth <= 0 then
	maxWidth = 200
	bar.Size = UDim2.new(0, maxWidth, bar.Size.Y.Scale, bar.Size.Y.Offset)
end

local function bind(humanoid)
	local function refresh()
		local ratio = math.clamp(humanoid.Health / humanoid.MaxHealth, 0, 1)
		bar.Size = UDim2.new(0, maxWidth * ratio, bar.Size.Y.Scale, bar.Size.Y.Offset)
		bar.BackgroundColor3 = ratio < 0.3 and Color3.fromRGB(220, 60, 60) or Color3.fromRGB(60, 200, 90)
	end
	humanoid.HealthChanged:Connect(refresh)
	refresh()
end

local function onCharacter(character)
	local humanoid = character:WaitForChild("Humanoid")
	bind(humanoid)
end

if player.Character then
	onCharacter(player.Character)
end
player.CharacterAdded:Connect(onCharacter)
```

### Магазин (ідея сервера)
Whitelist таблиці імен + ціна; `OnServerEvent` перевіряє імʼя і гроші → `Clone` у Backpack. Неправильний ID з клієнта = відмова.

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

---

## Урок 12.5 — Збірка арени + juice

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

---

## Урок 12.6 — Чекпоінт: презентація Tools/GUI

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

---

## Нотатки М12
- Жодних реалістичних збройових референсів насильства понад cartoon dummy.  
- Raycast — бонус після Touched-hitbox.  
- Не змішувати з повним FPS курсом.
