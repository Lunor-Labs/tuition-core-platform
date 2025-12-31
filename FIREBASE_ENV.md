# Firebase Environment Configuration

Create a `.env.local` file in your project root with the following configuration:

```env
# Firebase Configuration (from Firebase Console → Project Settings → General)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=tuition-core-platform-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tuition-core-platform-dev
VITE_FIREBASE_STORAGE_BUCKET=tuition-core-platform-dev.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=818871815622
VITE_FIREBASE_APP_ID=1:818871815622:web:abcdef123456

# Firebase Functions URL (for teacher portal backend functions)
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-tuition-core-platform-dev.cloudfunctions.net
```

## How to Get Your Firebase Config:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project `tuition-core-platform-dev`
3. Click the gear icon → Project Settings
4. Scroll down to "Your apps" section
5. If no web app exists, click "Add app" → Web app (</>) icon
6. Copy the config values to your `.env.local` file

## Testing the Setup:

1. Create a `.env.local` file with the above configuration
2. Restart your development server
3. Try registering a new user - you should see the user profile created in Firestore
4. Check Firebase Console → Firestore Database to see the collections
