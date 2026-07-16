# SmartCode Roblox v2 — Starter Place (для груп)

Єдиний стартовий Place для М1–М4, щоб група ≤5 не розʼїжджалась по 5 різних baseplate.

> `.rbxl` — бінарний файл Studio. У репо лежить **спека + скрипти**; викладач збирає Place **один раз** і дає учням Team Create / копію за політикою школи.

## Як зібрати (викладач, ~20–30 хв)

1. Roblox Studio → **Baseplate** → Save as `SmartCode_Roblox_v2_Starter_ІмʼяГрупи`.
2. Збери структуру Explorer за `STRUCTURE.md`.
3. (Опційно з М4) поклади скрипти з `scripts/` у вказані місця — або роздавай з `../templates/` на уроці.
4. File → **Save to Roblox** (private / school group).
5. Кожному учню: **File → Download a Copy** або invite у Team Create (одне місце = конфлікти; краще копії).

## Правила групи

- Один затверджений starter; не імпровізуй 5 версій KillBrick.
- Імена Parts — латиниця / PascalCase (`KillBrick`, `Checkpoint_1`).
- До М5 учні **міняють параметри**, не переписують шаблони з нуля.
- Шаблони коду: `curriculum/roblox-v2/templates/` + блок у LMS.

## Фази starter-а

| Фаза курсу | Що має бути в Place |
|------------|---------------------|
| A (М1–М3) | `Yard`, Spawn, сітка, папки Storage; без обовʼязкових скриптів |
| B (М4) | Path + слоти під Kill/CP/Coin/Door/Teleport/Fade + SSS hooks |
| C+ | Учні клонують starter або відкривають свій Place з М4 |

## Чекліст здачі Place для школи

- [ ] SpawnLocation на Foundation  
- [ ] Folder `Yard` / `House` / `Biome`  
- [ ] `ServerStorage/Backup` (порожньо ок)  
- [ ] Lighting не «нічний чорний екран»  
- [ ] Імена без `Part1`/`Part2` у ключовій зоні  
- [ ] (М4+) Output показує HelloStudio після Play  
