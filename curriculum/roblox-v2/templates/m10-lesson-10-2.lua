-- SmartCode Roblox v2 template
-- Module 10 | Lesson 10.2 — Збір: Touched / Click + Power
-- Source: module-10-simulator.md
--
local function grantReward(player)
	local ls = player:FindFirstChild("leaderstats")
	if not ls then return end
	local coins, power = ls.Coins, ls.Power
	coins.Value += power.Value
end
