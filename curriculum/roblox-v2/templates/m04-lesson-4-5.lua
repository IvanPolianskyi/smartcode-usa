-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.5 — Двері на ClickDetector
-- Шаблон (зсув по осі)
-- Source: module-04-sparks-ready-code.md
--
local door = script.Parent
local click = door:FindFirstChild("ClickDetector")
local open = false

if not click then
	click = Instance.new("ClickDetector")
	click.Parent = door
end

click.MouseClick:Connect(function(player)
	if open then return end
	open = true
	door.Position = door.Position + Vector3.new(0, 0, 4)
	print(player.Name .. " відкрив двері!")
end)
