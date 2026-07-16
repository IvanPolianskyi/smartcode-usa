-- SmartCode Roblox v2 template
-- Module 12 | Lesson 12.4 — GUI HP + магазин Tools
-- Шаблон HP (LocalScript у Fill-Frame)
-- Source: module-12-tools-gui.md
--
local player = game.Players.LocalPlayer
local bar = script.Parent -- Frame Fill
local maxWidth = bar.Size.X.Offset
if maxWidth <= 0 then
	maxWidth = 200
	bar.Size = UDim2.new(0, maxWidth, bar.Size.Y.Scale, bar.Size.Y.Offset)
end

local function bind(humanoid)
	local function refresh()
		local ratio = math.clamp(humanoid.Health / humanoid.MaxHealth, 0, 1)
		bar.Size = UDim2.new(0, maxWidth * ratio, bar.Size.Y.Scale, bar.Size.Y.Offset)
		bar.BackgroundColor3 = ratio < 0.3 and Color3.fromRGB(220, 60, 60) or Color3.fromRGB(60, 200, 90)
	end
	humanoid.HealthChanged:Connect(refresh)
	refresh()
end

local function onCharacter(character)
	local humanoid = character:WaitForChild("Humanoid")
	bind(humanoid)
end

if player.Character then
	onCharacter(player.Character)
end
player.CharacterAdded:Connect(onCharacter)
