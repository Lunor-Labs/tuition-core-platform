# Firestore Database Initialization

After setting up Firebase and deploying functions, you need to initialize the counters collection for sequential IDs.

## Initialize Counters

Run this JavaScript code in Firebase Console → Firestore Database → Start collection:

```javascript
// Initialize counters for sequential IDs
db.collection('counters').doc('studentId').set({
  count: 2024000,
  description: 'Sequential student ID counter'
});

db.collection('counters').doc('enrollmentId').set({
  count: 0,
  description: 'Global enrollment ID counter'
});

db.collection('counters').doc('classId').set({
  count: 0,
  description: 'Sequential class ID counter'
});
```

## Expected Collections Structure

After users start registering, you should see these collections:

### `/users/{userId}`
```javascript
{
  uid: "firebase-user-id",
  email: "user@mobile.local",
  role: "student", // or "teacher"
  phoneNumber: "+1234567890",
  displayName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  createdAt: timestamp,
  updatedAt: timestamp,

  // For students
  studentProfile: {
    grade: "",
    school: "",
    enrolledCourses: [],
    totalSessions: 0,
    averageScore: 0,
    attendanceRate: 0
  },

  // For teachers
  teacherProfile: {
    specialization: [],
    experience: 0,
    rating: 0,
    totalStudents: 0,
    monthlyEarnings: 0,
    availableBalance: 0,
    totalEarnings: 0
  }
}
```

### `/counters/{counterName}`
```javascript
{
  count: 2024001,  // Current counter value
  description: "Sequential student ID counter"
}
```

## Testing User Registration

1. Open your app and go to registration
2. Register as a student or teacher
3. Check Firebase Console → Authentication → Users (should show the user)
4. Check Firebase Console → Firestore Database → users collection (should show the user profile)

## Troubleshooting

### If users appear in Auth but not in Firestore:

1. Check Firebase Functions logs in Console
2. Verify `.env.local` has correct `VITE_FIREBASE_FUNCTIONS_URL`
3. Check browser network tab for function call errors
4. Verify Firestore security rules allow writes

### Common Issues:

1. **Functions not called**: Check if `VITE_FIREBASE_FUNCTIONS_URL` is set correctly
2. **CORS errors**: Functions should handle CORS properly
3. **Permission denied**: Check Firestore security rules
4. **Function timeouts**: Functions should complete within timeout limits

## Next Steps

Once user registration works and profiles appear in Firestore:

1. Test teacher portal functions (createClass, etc.)
2. Test student enrollment
3. Set up payment integration
4. Implement real-time data synchronization
