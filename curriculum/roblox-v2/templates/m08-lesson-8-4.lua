-- SmartCode Roblox v2 template
-- Module 8 | Lesson 8.4 — Події: функція як реакція
-- Source: module-08-functions-events-tables.md
--
local brick = script.Parent

local function onTouched(hit)
	local humanoid = hit.Parent:FindFirstChild("Humanoid")
	if humanoid then
		print("Торкання гравця!")
	end
end

brick.Touched:Connect(onTouched)
