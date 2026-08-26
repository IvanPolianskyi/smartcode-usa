import { MongoClient } from 'mongodb'

let cachedClient = globalThis._smartcode_mongo_client || null
let cachedDb = globalThis._smartcode_mongo_db || null
let userIndexesPromise = null

async function connectToMongo() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const mongoUri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB || 'SmartCodeLogs'

  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI environment variable')
  }

  const client = new MongoClient(mongoUri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    // Atlas needs room for SRV lookup + TLS handshake on a cold connection;
    // 3s was tuned for a local mongod and times out against a shared cluster.
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 20000,
    // Prefer IPv4 first to reduce SRV DNS issues on some networks.
    family: 4,
  })

  await client.connect()
  const db = client.db(databaseName)

  // Cache for hot-reload in dev
  globalThis._smartcode_mongo_client = client
  globalThis._smartcode_mongo_db = db
  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getDb() {
  const { db } = await connectToMongo()
  return db
}

export async function getCollection(collectionName) {
  const db = await getDb()
  return db.collection(collectionName)
}

/**
 * Unique sparse indexes for account identity (idempotent).
 *
 * email is the login key, so its uniqueness has to be the database's job:
 * the findOne check in the register route is a friendly error message, not
 * a guarantee - two simultaneous signups both pass it and both insert.
 */
export async function ensureUserIndexes() {
  if (userIndexesPromise) return userIndexesPromise
  userIndexesPromise = (async () => {
    const users = await getCollection('users')
    const ops = [
      users.createIndex(
        { email: 1 },
        {
          unique: true,
          name: 'users_email_unique',
          partialFilterExpression: {
            email: { $type: 'string', $gt: '' },
          },
        }
      ),
      users.createIndex(
        { telegramUserId: 1 },
        {
          unique: true,
          name: 'users_telegramUserId_unique',
          partialFilterExpression: {
            telegramUserId: { $type: 'string', $gt: '' },
          },
        }
      ),
      users.createIndex(
        { 'studentProfile.crmStudentId': 1 },
        {
          unique: true,
          name: 'users_crmStudentId_unique',
          partialFilterExpression: {
            'studentProfile.crmStudentId': { $type: 'string', $gt: '' },
          },
        }
      ),
    ]
    const results = await Promise.allSettled(ops)
    for (const r of results) {
      if (r.status === 'rejected') {
        console.warn('ensureUserIndexes:', r.reason?.message || r.reason)
      }
    }
  })()
  try {
    await userIndexesPromise
  } catch (e) {
    userIndexesPromise = null
    throw e
  }
}
