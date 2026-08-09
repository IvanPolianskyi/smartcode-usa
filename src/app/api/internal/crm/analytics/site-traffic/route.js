import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCollection } from '@/lib/mongodb'

const KYIV_TZ = 'Europe/Kyiv'

function parseDateParam(value, fallback) {
  if (!value) return fallback
  const d = new Date(String(value))
  return Number.isNaN(d.getTime()) ? fallback : d
}

function daysBetween(start, end) {
  return Math.max(1, (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
}

function pickGranularity(daySpan) {
  if (daySpan <= 45) return 'day'
  if (daySpan <= 180) return 'week'
  return 'month'
}

function dateFormatForGranularity(granularity) {
  if (granularity === 'month') return '%Y-%m'
  if (granularity === 'week') return '%G-W%V'
  return '%Y-%m-%d'
}

/**
 * Site traffic time series for CRM analytics dashboard.
 * Source: MongoDB `logs` where type=visit (session starts from the public site).
 *
 * Query: ?start=ISO&end=ISO
 */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const now = new Date()
    const defaultStart = new Date(now)
    defaultStart.setUTCDate(defaultStart.getUTCDate() - 30)

    const start = parseDateParam(searchParams.get('start'), defaultStart)
    const end = parseDateParam(searchParams.get('end'), now)

    if (end <= start) {
      return NextResponse.json(
        { error: 'end must be after start' },
        { status: 400 }
      )
    }

    // Guard against huge scans
    const spanDays = daysBetween(start, end)
    if (spanDays > 3700) {
      return NextResponse.json(
        { error: 'Period too large (max ~10 years)' },
        { status: 400 }
      )
    }

    const granularity = pickGranularity(spanDays)
    const dateFormat = dateFormatForGranularity(granularity)

    const logs = await getCollection('logs')
    const rows = await logs
      .aggregate([
        {
          $match: {
            type: 'visit',
            createdAt: { $gte: start, $lt: end },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: dateFormat,
                date: '$createdAt',
                timezone: KYIV_TZ,
              },
            },
            visits: { $sum: 1 },
            ips: { $addToSet: '$ip' },
          },
        },
        {
          $project: {
            _id: 0,
            date_key: '$_id',
            visits: 1,
            unique_ips: {
              $size: {
                $filter: {
                  input: '$ips',
                  as: 'ip',
                  cond: {
                    $and: [
                      { $ne: ['$$ip', null] },
                      { $ne: ['$$ip', ''] },
                    ],
                  },
                },
              },
            },
          },
        },
        { $sort: { date_key: 1 } },
      ])
      .toArray()

    const points = rows.map((r) => ({
      date_key: String(r.date_key),
      visits: Number(r.visits) || 0,
      unique_ips: Number(r.unique_ips) || 0,
    }))

    const total_visits = points.reduce((s, p) => s + p.visits, 0)
    const total_unique_ips = points.reduce((s, p) => s + p.unique_ips, 0)

    // Fill missing day buckets for short ranges so the chart is continuous
    let filled = points
    if (granularity === 'day' && spanDays <= 45) {
      filled = fillDailyBuckets(start, end, points)
    }

    return NextResponse.json({
      start: start.toISOString(),
      end: end.toISOString(),
      tz: KYIV_TZ,
      granularity,
      total_visits,
      // Sum of daily unique IPs (not global unique across period — cheap & useful)
      unique_ips_sum: total_unique_ips,
      points: filled,
      note:
        'Візити = старти сесії з публічного сайту (один раз на браузерну сесію).',
    })
  } catch (error) {
    console.error('CRM site-traffic analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to compute site traffic analytics' },
      { status: 500 }
    )
  }
}

function fillDailyBuckets(start, end, points) {
  const byKey = new Map(points.map((p) => [p.date_key, p]))
  const filled = []
  // Iterate calendar days in Kyiv by stepping UTC noon and formatting
  const cursor = new Date(start.getTime())
  const endMs = end.getTime()
  // Cap iterations
  for (let i = 0; i < 50 && cursor.getTime() < endMs; i++) {
    const key = formatKyivDayKey(cursor)
    const existing = byKey.get(key)
    filled.push(
      existing || { date_key: key, visits: 0, unique_ips: 0 }
    )
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  // Dedupe if timezone edge caused duplicates
  const seen = new Set()
  return filled.filter((p) => {
    if (seen.has(p.date_key)) return false
    seen.add(p.date_key)
    return true
  })
}

function formatKyivDayKey(date) {
  // en-CA → YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: KYIV_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
