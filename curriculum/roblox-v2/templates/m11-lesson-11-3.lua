-- SmartCode Roblox v2 template
-- Module 11 | Lesson 11.3 — Collector: гроші з дропу
-- Source: module-11-tycoon.md
--
local function collect(drop, ownerPlayer)
	local value = drop:GetAttribute("Value") or 1
	ownerPlayer.leaderstats.Cash.Value += value
	drop:Destroy()
end
