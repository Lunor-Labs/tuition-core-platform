#!/bin/bash

# Firestore Counters Initialization Script
# This script initializes the required counter documents for sequential IDs

echo "🔥 Tuition Platform - Firestore Counters Initialization"
echo ""

# Check if Firebase CLI is installed and authenticated
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first:"
    echo "   npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged into Firebase. Please login first:"
    echo "   firebase login"
    exit 1
fi

echo "📋 Initializing counters collection..."

# Initialize studentId counter
echo "Setting up studentId counter..."
firebase firestore:delete counters/studentId --project tuition-core-platform-dev 2>/dev/null || true
firebase firestore:add counters/studentId --project tuition-core-platform-dev << EOF
{
  "count": 2024000,
  "description": "Sequential student ID counter"
}
EOF

# Initialize enrollmentId counter
echo "Setting up enrollmentId counter..."
firebase firestore:delete counters/enrollmentId --project tuition-core-platform-dev 2>/dev/null || true
firebase firestore:add counters/enrollmentId --project tuition-core-platform-dev << EOF
{
  "count": 0,
  "description": "Global enrollment ID counter"
}
EOF

# Initialize classId counter
echo "Setting up classId counter..."
firebase firestore:delete counters/classId --project tuition-core-platform-dev 2>/dev/null || true
firebase firestore:add counters/classId --project tuition-core-platform-dev << EOF
{
  "count": 0,
  "description": "Sequential class ID counter"
}
EOF

echo ""
echo "✅ Counters initialized successfully!"
echo ""
echo "🔍 Verifying counters..."
firebase firestore:get counters --project tuition-core-platform-dev

echo ""
echo "🎉 Initialization complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your .env.local file with Firebase configuration"
echo "2. Start your development server: npm run dev"
echo "3. Test user registration and check Firestore collections"
echo ""
echo "📖 For manual setup, see FIRESTORE_INIT.md"
