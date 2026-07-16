-- SmartCode Roblox v2 template
-- Module 8 | Lesson 8.7 — Словник + діалог NPC
-- Source: module-08-functions-events-tables.md
--
local replies = {
	hello = "Привіт! Ласкаво просимо у двір.",
	bye = "Бувай, заходь ще!",
}

local function talk(key)
	local text = replies[key]
	if text then
		print(text)
	else
		print("...")
	end
end

talk("hello")
