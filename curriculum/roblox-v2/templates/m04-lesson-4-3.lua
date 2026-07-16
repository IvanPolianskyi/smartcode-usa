-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.3 — Checkpoint (збереження точки)
-- Source: module-04-sparks-ready-code.md
--
-- ШАБЛОН: Checkpoint оновлює SpawnLocation
local checkpoint = script.Parent
local spawn = workspace:FindFirstChild("SpawnLocation")

checkpoint.Touched:Connect(function(hit)
	local character = hit.Parent
	local player = game.Players:GetPlayerFromCharacter(character)
	if player and spawn then
		spawn.CFrame = checkpoint.CFrame + Vector3.new(0, 3, 0)
		print(player.Name .. " досяг чекпоінта!")
	end
end)
