-- SmartCode Roblox v2 template
-- Module 5 | Lesson 5.3 — Змінна вказує на Part
-- Source: module-05-variables.md
--
local part = workspace:FindFirstChild("Foundation")
if part then
	part.Color = Color3.fromRGB(80, 200, 120)
	print("Перефарбували:", part.Name)
end
