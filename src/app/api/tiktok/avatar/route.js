import { NextResponse } from 'next/server'
import { TIKTOK_AVATARS } from '@/config/tiktokAvatars'

// Використовуємо конфігурацію з окремого файлу для зручності редагування
const TIKTOK_AVATARS_MANUAL = TIKTOK_AVATARS

// Функція для отримання аватарки через TikTok oEmbed або альтернативні методи
async function getTikTokAvatar(username) {
	try {
		// Метод 0: Перевірка ручних посилань
		if (TIKTOK_AVATARS_MANUAL[username]) {
			return TIKTOK_AVATARS_MANUAL[username]
		}

		// Метод 1: Використання TikTok oEmbed (якщо доступний)
		const oembedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${username}`
		
		try {
			const response = await fetch(oembedUrl, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
				},
			})
			
			if (response.ok) {
				const data = await response.json()
				// oEmbed може містити thumbnail_url
				if (data.thumbnail_url) {
					return data.thumbnail_url
				}
			}
		} catch (e) {
			console.log(`oEmbed failed for ${username}:`, e.message)
		}

		// Метод 2: Пряме отримання з TikTok сторінки (через скрапінг HTML)
		try {
			const profileUrl = `https://www.tiktok.com/@${username}`
			const response = await fetch(profileUrl, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				},
			})
			
			if (response.ok) {
				const html = await response.text()
				// Шукаємо JSON-LD або meta теги з аватаркою
				const jsonMatch = html.match(/<script[^>]*id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/s)
				if (jsonMatch) {
					try {
						const data = JSON.parse(jsonMatch[1])
						// Шукаємо avatar в структурі даних
						const avatar = extractAvatarFromData(data)
						if (avatar) return avatar
					} catch (e) {
						console.log('Failed to parse TikTok data:', e.message)
					}
				}
				
				// Альтернативний метод: пошук в meta тегах
				const metaMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)
				if (metaMatch) {
					return metaMatch[1]
				}
			}
		} catch (e) {
			console.log(`Scraping failed for ${username}:`, e.message)
		}

		// Fallback: повертаємо null, компонент покаже дефолтну іконку
		return null
	} catch (error) {
		console.error(`Error getting avatar for ${username}:`, error)
		return null
	}
}

// Допоміжна функція для витягування аватарки з даних TikTok
function extractAvatarFromData(data) {
	try {
		// TikTok зберігає дані в складній структурі
		// Шукаємо в різних можливих місцях
		const searchPaths = [
			['defaultScope', 'webapp.user-detail', 'userInfo', 'user', 'avatarMedium'],
			['defaultScope', 'webapp.user-detail', 'userInfo', 'user', 'avatarLarger'],
			['defaultScope', 'webapp.user-detail', 'userInfo', 'user', 'avatarThumb'],
		]
		
		for (const path of searchPaths) {
			let value = data
			for (const key of path) {
				if (value && typeof value === 'object' && key in value) {
					value = value[key]
				} else {
					value = null
					break
				}
			}
			if (value && typeof value === 'string' && value.startsWith('http')) {
				return value
			}
		}
	} catch (e) {
		// Ігноруємо помилки парсингу
	}
	return null
}

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const username = searchParams.get('username')
		
		if (!username) {
			return NextResponse.json(
				{ error: 'Username parameter is required' },
				{ status: 400 }
			)
		}

		const cleanUsername = username.replace('@', '').trim()
		if (!/^[a-zA-Z0-9._]{1,64}$/.test(cleanUsername)) {
			return NextResponse.json(
				{ error: 'Invalid username' },
				{ status: 400 }
			)
		}
		
		// Отримуємо аватарку
		const avatarUrl = await getTikTokAvatar(cleanUsername)
		
		return NextResponse.json({
			success: true,
			username: cleanUsername,
			avatarUrl: avatarUrl,
		})
	} catch (error) {
		console.error('Error in TikTok avatar API:', error)
		return NextResponse.json(
			{ 
				success: false, 
				error: 'Failed to fetch TikTok avatar',
				avatarUrl: null 
			},
			{ status: 500 }
		)
	}
}

