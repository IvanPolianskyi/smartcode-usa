-- SmartCode Roblox v2 template
-- Module 9 | Lesson 9.5 — Фініш і перемога
-- Source: module-09-obby.md
--
local finished = {} -- userId = true

local function onFinish(player)
	if finished[player.UserId] then return end
	finished[player.UserId] = true
	print(player.Name, "фінішував!")
	-- показати ScreenGui Win (RemoteEvent lite АБО сервер дає підказку через перевірку на клієнті пізніше)
end
