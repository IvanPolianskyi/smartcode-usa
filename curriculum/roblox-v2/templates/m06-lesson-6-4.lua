-- SmartCode Roblox v2 template
-- Module 6 | Lesson 6.4 — Touched + if: чорний список зон
-- Source: module-06-conditionals.md
--
local zone = script.Parent
zone.Touched:Connect(function(hit)
	local character = hit.Parent
	local humanoid = character:FindFirstChild("Humanoid")
	if humanoid then
		humanoid.Health = 0
		print("Зона покарала гравця")
	end
end)
