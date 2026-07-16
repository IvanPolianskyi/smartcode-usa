# SmartCode Roblox v2 — огляд курсу

**Формат:** 92 уроки × 60 хв  
**Група:** до 5 учнів (основний формат)  
**Також:** індивідуальні заняття (той самий план, довший челендж)  
**Вік (орієнтир):** 9–13  
**Після кожного уроку:** тест 10 питань (прохід 70%)

## Фази

| Фаза | Модулі | Уроків | Фокус |
|------|--------|--------|-------|
| A. Студія і моделі | M1–M3 | 22 | Parts, Explorer, Models, Union, Terrain |
| B. Іскри | M4 | 10 | Міні-проєкти з готовим кодом |
| C. Серйозний Lua | M5–M8 | 26 | Змінні → if → цикли → функції |
| D. Механіки | M9–M12 | 28 | Obby 8 + Sim 6 + Tycoon 8 + Tools 6 |
| E. Реліз | M13 | 6 | Фіналка, polish, publish, showcase |
| **Разом** | | **92** | |

### Як підрізали з 96

Раніше фаза D+E давала 38 уроків (Tools 8 + Release 8). Злито:
- **М12:** GUI+магазин; збірка+juice → **6** уроків  
- **М13:** Publish+GamePass/Badge; freeze+Showcase → **6** уроків  

## Ритм уроку 60′ (група ≤5)

| Хв | Блок |
|----|------|
| 0–6 | Старт + 1 показ з ДЗ |
| 6–7 | Ціль уроку (1 речення) |
| 7–17 | Демо викладача |
| 17–30 | Робимо разом |
| 30–48 | Самостійно + обхід кожного |
| 48–53 | Челендж або взаємний огляд |
| 53–58 | Тест 10 питань |
| 58–60 | ДЗ |

**Індивідуал:** блоки показу стиснути; челендж 48–55′ і/або полірування до стандарту портфоліо.

## Правило наповненості

Кожен урок = **3 шари практики**: разом → самі за шаблоном → челендж.  
Кожен урок закінчується **артефактом** у place (не «просто послухали»).

## Файли модулів

**Фаза A–B**
- `module-01-studio-builder.md` — 8
- `module-02-models-union.md` — 8
- `module-03-world-atmosphere.md` — 6
- `module-04-sparks-ready-code.md` — 10

**Фаза C**
- `module-05-variables.md` — 6
- `module-06-conditionals.md` — 6
- `module-07-loops.md` — 6
- `module-08-functions-events-tables.md` — 8

**Фаза D–E**
- `module-09-obby.md` — 8
- `module-10-simulator.md` — 6
- `module-11-tycoon.md` — 8
- `module-12-tools-gui.md` — 6
- `module-13-release.md` — 6

## Статус

**Каркас 92/92** у curriculum + LMS (`npm run gen:roblox-v2`).  
**Lua-шаблони:** `curriculum/roblox-v2/templates/` (`npm run extract:roblox-templates`).  
**Starter Place (групи):** `curriculum/roblox-v2/starter-place/` — спека Explorer + скрипти М4; підказка в LMS на М1–М4.  
**Прогрес LMS:** lazy-migrate на `/api/progress` + bulk `npm run migrate:roblox-progress` (`--apply`).  
**Зміст LMS:** generator тягне з md чеклісти «разом», три шари практики, рубрики, типові помилки й starter note.  
**Викладач:** `curriculum/roblox-v2/TEACHER.md`.  
**UX:** у теорії / практиці кнопка «Копіювати» на блоках коду (для вставки в Studio).
