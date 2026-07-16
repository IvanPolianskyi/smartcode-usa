-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.4 — Монета і leaderstats
-- Шаблон leaderstats (SSS)
-- Source: module-04-sparks-ready-code.md
--
game.Players.PlayerAdded:Connect(function(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local coins = Instance.new("IntValue")
	coins.Name = "Coins"
	coins.Value = 0
	coins.Parent = leaderstats
end)
