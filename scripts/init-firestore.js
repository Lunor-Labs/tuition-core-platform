/**
 * Firestore Initialization Script
 *
 * This script initializes the required collections and documents for the tuition platform.
 * Run this after deploying Firestore rules and before using the application.
 *
 * Usage:
 * 1. Make sure you're logged into Firebase: firebase login
 * 2. Set the correct project: firebase use tuition-core-platform-dev
 * 3. Run: node scripts/init-firestore.js
 */

import admin from 'firebase-admin';

// Initialize Firebase Admin with default credentials
admin.initializeApp({
  projectId: 'tuition-core-platform-dev'
});

const db = admin.firestore();

async function initializeCounters() {
  console.log('🚀 Initializing Firestore counters...');

  try {
    // Initialize counters for sequential IDs
    const counters = [
      {
        id: 'studentId',
        data: {
          count: 2024000,
          description: 'Sequential student ID counter'
        }
      },
      {
        id: 'enrollmentId',
        data: {
          count: 0,
          description: 'Global enrollment ID counter'
        }
      },
      {
        id: 'classId',
        data: {
          count: 0,
          description: 'Sequential class ID counter'
        }
      }
    ];

    // Set counter documents
    for (const counter of counters) {
      await db.collection('counters').doc(counter.id).set(counter.data);
      console.log(`✅ Initialized counter: ${counter.id} with value ${counter.data.count}`);
    }

    console.log('🎉 All counters initialized successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Set up your .env.local file with Firebase configuration');
    console.log('2. Start your development server: npm run dev');
    console.log('3. Test user registration and check Firestore collections');

  } catch (error) {
    console.error('❌ Error initializing counters:', error);
    process.exit(1);
  }
}

async function verifyInitialization() {
  console.log('\n🔍 Verifying initialization...');

  try {
    const countersRef = db.collection('counters');
    const snapshot = await countersRef.get();

    if (snapshot.empty) {
      console.log('❌ No counters found. Initialization may have failed.');
      return false;
    }

    console.log('📊 Found counters:');
    snapshot.forEach((doc) => {
      console.log(`  - ${doc.id}: ${doc.data().count} (${doc.data().description})`);
    });

    return true;
  } catch (error) {
    console.error('❌ Error verifying initialization:', error);
    return false;
  }
}

// Run initialization
async function main() {
  console.log('🔥 Tuition Platform - Firestore Initialization\n');

  await initializeCounters();
  await verifyInitialization();

  console.log('\n✨ Initialization complete!');
  process.exit(0);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('💥 Unhandled error:', error);
  process.exit(1);
});

main();
