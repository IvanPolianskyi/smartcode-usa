-- SmartCode Roblox v2 template
-- Module 12 | Lesson 12.2 — Activated: інструмент діє
-- Шаблон (Script або LocalScript у Tool — старт без урану)
-- Source: module-12-tools-gui.md
--
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
