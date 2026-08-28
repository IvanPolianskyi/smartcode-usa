import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

function getMonthKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const rawScore = Number(body?.score)
    const rawLevel = Number(body?.level)

    if (isNaN(rawScore) || rawScore < 0 || rawScore > 5000) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 })
    }

    const score = Math.floor(rawScore)
    const level = !isNaN(rawLevel) && rawLevel > 0 ? Math.floor(rawLevel) : 1
    const monthKey = getMonthKey()

    const usersCollection = await getCollection('users')
    const userDoc = await usersCollection.findOne({ _id: new ObjectId(userId) })
    const userName =
      userDoc?.name ||
      (userDoc?.email ? userDoc.email.split('@')[0] : 'Student')

    const collection = await getCollection('arcadeMonthlyScores')
    const userObjId = new ObjectId(userId)

    // Ensure index exists
    try {
      await collection.createIndex(
        { userId: 1, monthKey: 1 },
        { unique: true, name: 'arcade_user_month_unique' }
      )
      await collection.createIndex(
        { monthKey: 1, bestScore: -1 },
        { name: 'arcade_month_score_idx' }
      )
    } catch (idxErr) {
      // index already exists or background creation
    }

    // Atomic upsert with $max for bestScore
    await collection.updateOne(
      { userId: userObjId, monthKey },
      {
        $max: { bestScore: score },
        $set: {
          userName,
          level,
          lastPlayedAt: new Date(),
          updatedAt: new Date(),
        },
        $inc: {
          gamesPlayed: 1,
          totalScoreAccumulated: score,
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )

    const updatedDoc = await collection.findOne({
      userId: userObjId,
      monthKey,
    })

    const currentBest = updatedDoc?.bestScore || score
    const higherCount = await collection.countDocuments({
      monthKey,
      bestScore: { $gt: currentBest },
    })

    const monthlyRank = higherCount + 1
    const totalPlayers = await collection.countDocuments({ monthKey })
    const xpGained = Math.max(1, Math.round(score / 12))

    return NextResponse.json(
      {
        ok: true,
        score,
        bestScore: currentBest,
        monthlyRank,
        totalPlayers: totalPlayers,
        xpGained,
        monthKey,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Arcade score submit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
