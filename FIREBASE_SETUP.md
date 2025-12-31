# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., `tuition-core-platform`)
4. Enable Google Analytics (optional)
5. Choose default account for Firebase
6. Click "Create project"

## 2. Enable Required Services

### Authentication
1. Go to Authentication → Sign-in method
2. Enable "Phone" authentication
3. Configure authorized domains (add your domain)

### Firestore Database
1. Go to Firestore Database → Create database
2. Choose "Start in test mode" (for development)
3. Select a location (e.g., `asia-south1` for India/Sri Lanka)

### Cloud Functions
1. Go to Functions → Get started
2. Upgrade to Blaze plan (required for external API calls)
3. Functions will be deployed from the `functions/` directory

### Storage
1. Go to Storage → Get started
2. Create default bucket for file uploads

## 3. Environment Configuration

Create a `.env.local` file in your project root:

```env
# Firebase Configuration (from Project Settings → General)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Firebase Functions Region
VITE_FIREBASE_FUNCTIONS_REGION=us-central1
```

## 4. Deploy Security Rules

### Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Storage Rules (create firestore.storage.rules)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 5. Deploy Functions

```bash
# Install dependencies
cd functions
npm install

# Deploy functions
firebase deploy --only functions
```

## 6. Initialize Counters Collection

Run this in Firebase Console → Firestore:

```javascript
// Initialize counters for sequential IDs
db.collection('counters').doc('studentId').set({ count: 2024000 });
db.collection('counters').doc('enrollmentId').set({ count: 0 });
db.collection('counters').doc('classId').set({ count: 0 });
```

## 7. Test the Setup

```bash
# Start emulators for development
firebase emulators:start

# Or deploy to production
firebase deploy
```

## 8. SMS Provider Setup (Optional)

For OTP functionality, configure one of these providers:

### Option 1: Twilio
```bash
# Set environment variables in Firebase Functions
firebase functions:config:set twilio.sid="your_twilio_sid"
firebase functions:config:set twilio.auth_token="your_auth_token"
firebase functions:config:set twilio.phone_number="+1234567890"
```

### Option 2: AWS SNS
```bash
firebase functions:config:set aws.access_key_id="your_access_key"
firebase functions:config:set aws.secret_access_key="your_secret_key"
firebase functions:config:set aws.region="us-east-1"
```

### Option 3: Custom SMS Provider
Update `functions/src/utils/sms.ts` with your provider's API.

## 9. File Upload Setup

For study pack content uploads, the Storage is already configured. Files will be stored in:
- `/study-packs/{packId}/videos/`
- `/study-packs/{packId}/pdfs/`
- `/study-packs/{packId}/resources/`

## 10. Monitoring & Analytics

1. **Firebase Console**: Monitor functions, database usage
2. **Error Reporting**: Check for function errors
3. **Performance Monitoring**: Enable in Firebase Console
4. **Analytics**: View user engagement metrics

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure functions have proper CORS setup
2. **Permission Denied**: Check Firestore security rules
3. **Function Timeouts**: Increase timeout in function config
4. **Cold Starts**: Expected for infrequently used functions

### Development Tips:

1. Use Firebase Emulators for local development
2. Test functions locally before deploying
3. Monitor function logs in Firebase Console
4. Use Firestore queries efficiently to avoid costs

## Security Notes

- All functions validate user authentication
- Firestore rules enforce data access control
- Sensitive operations run server-side only
- File uploads are restricted to authenticated users
- Payment operations are secured with proper validation
