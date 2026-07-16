-- SmartCode Roblox v2 template
-- Module 12 | Lesson 12.1 — Що таке Tool
-- Шаблон (LocalScript у Tool)
-- Source: module-12-tools-gui.md
--
local tool = script.Parent

tool.Equipped:Connect(function()
	print(tool.Name .. " equipped")
end)

tool.Unequipped:Connect(function()
	print(tool.Name .. " unequipped")
end)
