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

function getMonthTitle(monthKey, locale = 'en') {
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

/** Honest monthly leaderboard — Mongo only, no seed bots. */
export async function GET(request) {
  try {
    const currentUserId = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    const monthKey = searchParams.get('month') || getMonthKey()
    const locale = searchParams.get('locale') || 'en'

    const collection = await getCollection('arcadeMonthlyScores')
    const usersCollection = await getCollection('users')

    const [rawScores, totalPlayers] = await Promise.all([
      collection
        .find({ monthKey })
        .sort({ bestScore: -1, updatedAt: 1 })
        .limit(50)
        .toArray(),
      collection.countDocuments({ monthKey }),
    ])

    let currentUserName = ''
    if (currentUserId) {
      try {
        const currentUserDoc = await usersCollection.findOne({
          _id: new ObjectId(currentUserId),
        })
        if (currentUserDoc) {
          currentUserName =
            currentUserDoc.name ||
            (currentUserDoc.email ? currentUserDoc.email.split('@')[0] : 'You')
        }
      } catch (e) {
        console.warn('Could not fetch user details for arcade leaderboard:', e)
      }
    }

    let playerList = rawScores.map((item) => ({
      userId: item.userId ? item.userId.toString() : item._id.toString(),
      name: item.userName || 'Student',
      score: Number(item.bestScore) || 0,
      level: Number(item.level) || 1,
      gamesPlayed: Number(item.gamesPlayed) || 1,
      lastPlayedAt: item.lastPlayedAt || item.updatedAt || null,
      isCurrentUser: Boolean(
        currentUserId && item.userId && item.userId.toString() === currentUserId
      ),
    }))

    playerList = playerList.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }))

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
        const userDbRecord = await collection.findOne({
          userId: new ObjectId(currentUserId),
          monthKey,
        })
        if (userDbRecord) {
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

    return NextResponse.json(
      {
        monthKey,
        seasonTitle: getMonthTitle(monthKey, locale),
        daysRemaining: getDaysRemainingInMonth(),
        totalPlayers,
        leaderboard: playerList.slice(0, 15),
        currentUser: currentUserRank,
        prizes: [
          {
            place: 1,
            tier: 'gold',
            titleEn: 'Monthly Grand Prize',
            rewardEn:
              '1 Month Full Course or 1:1 Live Lesson + "Code Champion" Badge + 500 XP',
          },
          {
            place: 2,
            tier: 'silver',
            titleEn: 'Silver Runner-up',
            rewardEn: 'Free 1:1 Live Lesson + "Arcade Master" Badge + 300 XP',
          },
          {
            place: 3,
            tier: 'bronze',
            titleEn: 'Bronze Runner-up',
            rewardEn: 'Exclusive Discord VIP Role + "Top Scorer" Badge + 200 XP',
          },
          {
            place: '4-10',
            tier: 'top10',
            titleEn: 'Top 10 Finalists',
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
