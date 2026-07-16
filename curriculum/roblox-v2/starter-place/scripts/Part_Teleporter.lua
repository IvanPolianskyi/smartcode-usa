-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.6 — Телепорт
-- Шаблон
-- Source: module-04-sparks-ready-code.md
--
local pad = script.Parent
local target = workspace:FindFirstChild("TeleportTarget")

pad.Touched:Connect(function(hit)
	local character = hit.Parent
	local root = character:FindFirstChild("HumanoidRootPart")
	if root and target then
		root.CFrame = target.CFrame + Vector3.new(0, 3, 0)
	end
end)
