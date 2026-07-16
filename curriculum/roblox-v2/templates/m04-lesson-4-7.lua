-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.7 — Платформа, що зникає (готовий ефект)
-- Шаблон (простий, без TweenService — стабільніше для М4)
-- Source: module-04-sparks-ready-code.md
--
local platform = script.Parent
local busy = false

platform.Touched:Connect(function(hit)
	local character = hit.Parent
	if not character:FindFirstChild("Humanoid") then return end
	if busy then return end
	busy = true
	task.wait(1.5)
	platform.CanCollide = false
	platform.Transparency = 1
	task.wait(3)
	platform.CanCollide = true
	platform.Transparency = 0
	busy = false
end)
