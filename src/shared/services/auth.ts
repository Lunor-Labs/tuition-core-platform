import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { UserCredential } from 'firebase/auth';

/**
 * Register user with email and password
 * Creates user in Firebase Auth and Firestore
 */
export async function registerWithEmail(
  email: string,
  password: string,
  role: 'student' | 'teacher' = 'student',
  profile?: { firstName: string; lastName: string }
): Promise<UserCredential> {
  try {
    // Generate sequential user ID first
    const userIdResponse = await generateSequentialUserId(role);

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Create user profile in Firestore with sequential ID
    const userProfile = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      role: role,
      userId: userIdResponse.userId,
      displayId: userIdResponse.displayId,
      displayName: profile ? `${profile.firstName} ${profile.lastName}` : userCredential.user.email,
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(role === 'student' && {
        studentProfile: {
          grade: '',
          school: '',
          enrolledCourses: [],
          totalSessions: 0,
          averageScore: 0,
          attendanceRate: 0
        }
      }),
      ...(role === 'teacher' && {
        teacherProfile: {
          specialization: [],
          experience: 0,
          rating: 0,
          totalStudents: 0,
          monthlyEarnings: 0,
          availableBalance: 0,
          totalEarnings: 0
        }
      })
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);

    console.log('User registered successfully:', {
      uid: userCredential.user.uid,
      displayId: userIdResponse.displayId,
      role,
      profile
    });

    return userCredential;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(error.message || 'Registration failed');
  }
}

/**
 * Generate sequential user ID using Firebase Cloud Function
 */
async function generateSequentialUserId(role: 'student' | 'teacher') {
  const functionsUrl = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL;

  if (!functionsUrl) {
    throw new Error('Firebase Functions URL not configured');
  }

  try {
    const response = await fetch(`${functionsUrl}/generateUserId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to generate user ID' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to generate user ID');
    }

    return {
      userId: data.userId,
      displayId: data.displayId
    };
  } catch (error: any) {
    console.error('Error generating sequential user ID:', error);
    // Fallback: generate a temporary ID if function fails
    const timestamp = Date.now();
    const fallbackId = role === 'student'
      ? `STU-${timestamp.toString().slice(-7)}`
      : `TCH-${timestamp.toString().slice(-4)}`;

    console.warn('Using fallback ID:', fallbackId);
    return {
      userId: timestamp,
      displayId: fallbackId
    };
  }
}

/**
 * Login with email and password
 */
export async function loginWithEmail(email: string, password: string): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw new Error(error.message || 'Login failed');
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  try {
    // Clear user cache before signing out
    const currentUser = auth.currentUser;
    if (currentUser) {
      localStorage.removeItem(`user_role_${currentUser.uid}`);
      localStorage.removeItem(`user_display_id_${currentUser.uid}`);
    }

    await auth.signOut();
  } catch (error: any) {
    console.error('Error logging out:', error);
    throw new Error(error.message || 'Logout failed');
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string) {
  try {
    const { doc, getDoc } = await import('firebase/firestore');

    // Add timeout to prevent hanging on Vercel
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Profile fetch timeout')), 8000); // 8 second timeout
    });

    const fetchPromise = getDoc(doc(db, 'users', uid));

    const userDoc = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    const profileData = userDoc.data();
    console.log('Fetched user profile:', { uid, role: profileData.role, displayId: profileData.displayId });

    return profileData;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error(error.message || 'Failed to fetch user profile');
  }
}
