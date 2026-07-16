-- SmartCode Roblox v2 template
-- Module 9 | Lesson 9.2 — Пастки: функція applyDamage / kill
-- Source: module-09-obby.md
--
local function killCharacter(character)
	local humanoid = character:FindFirstChild("Humanoid")
	if humanoid then
		humanoid.Health = 0
	end
end

local function hookHazard(part)
	part.Touched:Connect(function(hit)
		local character = hit.Parent
		if character:FindFirstChild("Humanoid") then
			killCharacter(character)
		end
	end)
end

for _, part in ipairs(workspace.Obby.Hazards:GetChildren()) do
	if part:IsA("BasePart") then
		hookHazard(part)
	end
end
