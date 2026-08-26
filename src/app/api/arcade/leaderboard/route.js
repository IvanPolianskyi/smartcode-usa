import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

function getMonthKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

function getDaysRemainingInMonth(date = new Date()) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const lastDay = new Date(y, m + 1, 0).getDate()
  const currentDay = date.getDate()
  return Math.max(0, lastDay - currentDay)
}

function getMonthTitle(monthKey, locale = 'uk') {
  try {
    const [yearStr, monthStr] = monthKey.split('-')
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10) - 1
    const d = new Date(year, month, 1)
    const monthName = d.toLocaleString(locale === 'uk' ? 'uk-UA' : 'en-US', {
      month: 'long',
    })
    return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`
  } catch {
    return monthKey
  }
}

// Fallback seed competitors to provide an engaging leaderboard if the database is newly initialized.
const SEED_PLAYERS = [
  { id: 'seed-1', name: 'Sofia K.', score: 2840, level: 9, streak: 14 },
  { id: 'seed-2', name: 'Artem B.', score: 2420, level: 8, streak: 11 },
  { id: 'seed-3', name: 'Mark D.', score: 2150, level: 7, streak: 8 },
  { id: 'seed-4', name: 'Daria M.', score: 1890, level: 6, streak: 6 },
  { id: 'seed-5', name: 'Yaroslav N.', score: 1640, level: 5, streak: 5 },
  { id: 'seed-6', name: 'Maxim P.', score: 1420, level: 5, streak: 4 },
  { id: 'seed-7', name: 'Anna V.', score: 1210, level: 4, streak: 3 },
  { id: 'seed-8', name: 'Dmytro S.', score: 980, level: 3, streak: 3 },
  { id: 'seed-9', name: 'Olena T.', score: 820, level: 3, streak: 2 },
  { id: 'seed-10', name: 'Bohdan R.', score: 650, level: 2, streak: 1 },
]

export async function GET(request) {
  try {
    const currentUserId = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    const monthKey = searchParams.get('month') || getMonthKey()
    const locale = searchParams.get('locale') || 'uk'

    const collection = await getCollection('arcadeMonthlyScores')
    const usersCollection = await getCollection('users')

    // Find all records for this month
    const rawScores = await collection
      .find({ monthKey })
      .sort({ bestScore: -1, updatedAt: 1 })
      .limit(50)
      .toArray()

    let currentUserDoc = null
    let currentUserName = ''
    if (currentUserId) {
      try {
        currentUserDoc = await usersCollection.findOne({ _id: new ObjectId(currentUserId) })
        if (currentUserDoc) {
          currentUserName =
            currentUserDoc.name ||
            (currentUserDoc.email ? currentUserDoc.email.split('@')[0] : 'You')
        }
      } catch (e) {
        console.warn('Could not fetch user details for arcade leaderboard:', e)
      }
    }

    // Convert DB scores to leaderboard items
    let playerList = rawScores.map((item) => ({
      userId: item.userId ? item.userId.toString() : item._id.toString(),
      name: item.userName || 'Student',
      score: Number(item.bestScore) || 0,
      level: Number(item.level) || 1,
      gamesPlayed: Number(item.gamesPlayed) || 1,
      lastPlayedAt: item.lastPlayedAt || item.updatedAt || null,
      isCurrentUser: Boolean(currentUserId && item.userId && item.userId.toString() === currentUserId),
    }))

    // If there are few real entries, merge seed players (excluding any collision with real users)
    if (playerList.length < 10) {
      const existingNames = new Set(playerList.map((p) => p.name.toLowerCase()))
      const needed = 10 - playerList.length
      const seedsToAdd = SEED_PLAYERS.filter(
        (sp) => !existingNames.has(sp.name.toLowerCase())
      ).slice(0, needed)

      playerList = [...playerList, ...seedsToAdd.map((s) => ({
        userId: s.id,
        name: s.name,
        score: s.score,
        level: s.level,
        gamesPlayed: Math.max(2, Math.round(s.score / 250)),
        lastPlayedAt: null,
        isCurrentUser: false,
        isSeed: true,
      }))]

      playerList.sort((a, b) => b.score - a.score)
    }

    // Calculate ranks
    playerList = playerList.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }))

    // Find current user's entry and rank
    let currentUserRank = null
    if (currentUserId) {
      const foundInList = playerList.find((p) => p.isCurrentUser)
      if (foundInList) {
        currentUserRank = {
          rank: foundInList.rank,
          score: foundInList.score,
          level: foundInList.level,
          name: currentUserName || foundInList.name,
          played: true,
        }
      } else {
        // Check if user has a score that fell outside the top list
        const userDbRecord = await collection.findOne({
          userId: new ObjectId(currentUserId),
          monthKey,
        })
        if (userDbRecord) {
          // Count higher scores
          const higherCount = await collection.countDocuments({
            monthKey,
            bestScore: { $gt: userDbRecord.bestScore },
          })
          currentUserRank = {
            rank: higherCount + 1,
            score: userDbRecord.bestScore,
            level: userDbRecord.level || 1,
            name: currentUserName || userDbRecord.userName || 'You',
            played: true,
          }
        } else {
          currentUserRank = {
            rank: null,
            score: 0,
            level: 1,
            name: currentUserName || 'You',
            played: false,
          }
        }
      }
    }

    const daysRemaining = getDaysRemainingInMonth()
    const seasonTitle = getMonthTitle(monthKey, locale)

    return NextResponse.json(
      {
        monthKey,
        seasonTitle,
        daysRemaining,
        totalPlayers: Math.max(playerList.length, 12),
        leaderboard: playerList.slice(0, 15),
        currentUser: currentUserRank,
        prizes: [
          {
            place: 1,
            tier: 'gold',
            titleUk: 'Головний приз місяця',
            titleEn: 'Monthly Grand Prize',
            rewardUk: '1 Місяць повного курсу або 1:1 Live Урок + Бейдж «Code Champion» + 500 XP',
            rewardEn: '1 Month Full Course or 1:1 Live Lesson + "Code Champion" Badge + 500 XP',
          },
          {
            place: 2,
            tier: 'silver',
            titleUk: 'Срібний призер',
            titleEn: 'Silver Runner-up',
            rewardUk: 'Безкоштовний 1:1 Live Урок + Бейдж «Arcade Master» + 300 XP',
            rewardEn: 'Free 1:1 Live Lesson + "Arcade Master" Badge + 300 XP',
          },
          {
            place: 3,
            tier: 'bronze',
            titleUk: 'Бронзовий призер',
            titleEn: 'Bronze Runner-up',
            rewardUk: 'Ексклюзивна роль у Discord + Бейдж «Top Scorer» + 200 XP',
            rewardEn: 'Exclusive Discord VIP Role + "Top Scorer" Badge + 200 XP',
          },
          {
            place: '4-10',
            tier: 'top10',
            titleUk: 'Топ-10 фіналісти',
            titleEn: 'Top 10 Finalists',
            rewardUk: 'Особливий бейдж «Top 10 Finisher» + 100 XP',
            rewardEn: 'Special "Top 10 Finisher" Badge + 100 XP',
          },
        ],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
