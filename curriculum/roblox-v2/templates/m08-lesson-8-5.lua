-- SmartCode Roblox v2 template
-- Module 8 | Lesson 8.5 — ModuleScript: винести функцію «на полицю»
-- ModuleScript `RewardMath` у ReplicatedStorage (або SSS)
-- Source: module-08-functions-events-tables.md
--
local M = {}

function M.double(n)
	return n * 2
end

function M.canAfford(coins, price)
	return coins >= price
end

return M
