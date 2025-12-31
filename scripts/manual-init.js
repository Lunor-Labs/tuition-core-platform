/**
 * Manual Firestore Initialization Guide
 *
 * Since Firebase CLI doesn't have direct firestore commands,
 * this script provides the exact steps and data to initialize manually.
 */

console.log('🔥 Tuition Platform - Manual Firestore Initialization\n');

// Counter documents to create
const counters = [
  {
    collection: 'counters',
    documentId: 'studentId',
    data: {
      count: 2024000,
      description: 'Sequential student ID counter'
    }
  },
  {
    collection: 'counters',
    documentId: 'teacherId',
    data: {
      count: 0,
      description: 'Sequential teacher ID counter'
    }
  },
  {
    collection: 'counters',
    documentId: 'enrollmentId',
    data: {
      count: 0,
      description: 'Global enrollment ID counter'
    }
  },
  {
    collection: 'counters',
    documentId: 'classId',
    data: {
      count: 0,
      description: 'Sequential class ID counter'
    }
  }
];

console.log('📋 MANUAL STEPS TO INITIALIZE FIRESTORE:\n');

console.log('1️⃣ Open Firebase Console:');
console.log('   https://console.firebase.google.com/project/tuition-core-platform-dev/firestore\n');

console.log('2️⃣ For each counter document, click "Start collection" and enter:\n');

counters.forEach((counter, index) => {
  console.log(`${index + 1}. Create collection: "${counter.collection}"`);
  console.log(`   Document ID: "${counter.documentId}"`);
  console.log(`   Data: ${JSON.stringify(counter.data, null, 2)}\n`);
});

console.log('3️⃣ Alternative: Run this JavaScript in Firebase Console:\n');

console.log(`// Copy and paste this into Firebase Console → Firestore Database
${counters.map(counter =>
  `db.collection('${counter.collection}').doc('${counter.documentId}').set(${JSON.stringify(counter.data, null, 2)});`
).join('\n')}

console.log('✅ Counters initialized!');`);

console.log('\n🎯 VERIFICATION:');
console.log('After setup, you should see these documents in Firestore:');
console.log('📁 counters/');
console.log('  ├── studentId (count: 2024000)');
console.log('  ├── enrollmentId (count: 0)');
console.log('  └── classId (count: 0)');

console.log('\n🚀 NEXT STEPS:');
console.log('1. Create .env.local with Firebase config');
console.log('2. Run: npm run dev');
console.log('3. Register a user and check if profile appears in Firestore');

console.log('\n📖 See FIRESTORE_INIT.md for detailed documentation.');
