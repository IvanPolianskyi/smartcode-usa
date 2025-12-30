/**
 * Script to create admin account
 * Run: node scripts/create-admin.js
 * Make sure MONGODB_URI and MONGODB_DB environment variables are set
 */

try {
  require('dotenv').config()
} catch (e) {
  // dotenv is optional if env vars are already set
}

const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')

async function createAdmin() {
  const mongoUri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB || 'SmartCodeLogs'

  if (!mongoUri) {
    console.error('Missing MONGODB_URI environment variable')
    process.exit(1)
  }

  const client = new MongoClient(mongoUri)

  try {
    await client.connect()
    const db = client.db(databaseName)
    const usersCollection = db.collection('users')

    const adminEmail = 'smartcodeacademy' // Username used as email
    const adminPassword = 'CodeSmartAcademy24'
    const adminName = 'SmartCode Academy Admin'

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ 
      email: adminEmail.toLowerCase() 
    })

    if (existingAdmin) {
      // Update existing admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      await usersCollection.updateOne(
        { email: adminEmail.toLowerCase() },
        {
          $set: {
            password: hashedPassword,
            role: 'admin',
            name: adminName,
            updatedAt: new Date()
          }
        }
      )
      console.log('✅ Admin account updated successfully!')
      console.log(`   Email: ${adminEmail}`)
      console.log(`   Password: ${adminPassword}`)
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      await usersCollection.insertOne({
        email: adminEmail.toLowerCase(),
        password: hashedPassword,
        name: adminName,
        role: 'admin',
        purchasedCourses: [], // Admin has access to all courses
        enrolledCourses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      })
      console.log('✅ Admin account created successfully!')
      console.log(`   Email: ${adminEmail}`)
      console.log(`   Password: ${adminPassword}`)
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

createAdmin()

