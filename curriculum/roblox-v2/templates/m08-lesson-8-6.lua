-- SmartCode Roblox v2 template
-- Module 8 | Lesson 8.6 — Таблиці: список значень
-- Source: module-08-functions-events-tables.md
--
local fruits = {"яблуко", "банан", "вишня"}
print(fruits[1])

for index, value in ipairs(fruits) do
	print(index, value)
end
