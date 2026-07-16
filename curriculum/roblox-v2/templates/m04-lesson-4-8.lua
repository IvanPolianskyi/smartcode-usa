-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.8 — Просте меню (ScreenGui ready)
-- Шаблон LocalScript у кнопці
-- Source: module-04-sparks-ready-code.md
--
local button = script.Parent
local menu = button.Parent

button.MouseButton1Click:Connect(function()
	menu.Enabled = false
end)
