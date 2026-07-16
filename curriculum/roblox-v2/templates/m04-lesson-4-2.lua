-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.2 — Kill brick (готовий Touched)
-- Шаблон (всередині KillBrick → Script)
-- Source: module-04-sparks-ready-code.md
--
local brick = script.Parent

brick.Touched:Connect(function(hit)
	local character = hit.Parent
	local humanoid = character:FindFirstChild("Humanoid")
	if humanoid then
		humanoid.Health = 0
	end
end)
