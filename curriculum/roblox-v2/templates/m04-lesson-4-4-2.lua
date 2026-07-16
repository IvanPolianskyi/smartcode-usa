-- SmartCode Roblox v2 template
-- Module 4 | Lesson 4.4 — Монета і leaderstats
-- Шаблон монети (у Part Coin)
-- Source: module-04-sparks-ready-code.md
--
local coin = script.Parent
local DEBOUNCE = false

coin.Touched:Connect(function(hit)
	local character = hit.Parent
	local player = game.Players:GetPlayerFromCharacter(character)
	if player and not DEBOUNCE then
		DEBOUNCE = true
		local coins = player:FindFirstChild("leaderstats")
			and player.leaderstats:FindFirstChild("Coins")
		if coins then
			coins.Value = coins.Value + 1
		end
		coin:Destroy()
	end
end)
