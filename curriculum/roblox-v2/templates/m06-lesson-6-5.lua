-- SmartCode Roblox v2 template
-- Module 6 | Lesson 6.5 — Прапорці і ClickDetector + if
-- Source: module-06-conditionals.md
--
local door = script.Parent
local click = door:WaitForChild("ClickDetector")
local open = false

click.MouseClick:Connect(function(player)
	if open == false then
		door.Transparency = 0.8
		door.CanCollide = false
		open = true
		print(player.Name, "відкрив")
	else
		door.Transparency = 0
		door.CanCollide = true
		open = false
		print(player.Name, "закрив")
	end
end)
