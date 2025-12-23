import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCustomToken,
} from 'firebase/auth';
import type { ConfirmationResult, UserCredential } from 'firebase/auth';

// Firebase Cloud Functions base URL
// Format: https://{region}-{project-id}.cloudfunctions.net
// Set VITE_FIREBASE_FUNCTIONS_URL in your .env file
const FIREBASE_FUNCTIONS_URL = 
  import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 
  '';

/**
 * Convert mobile number to email format for Firebase Auth (cost-effective - free)
 * Format: +911234567890 -> +911234567890@mobile.local
 */
export function mobileToEmail(mobileNumber: string): string {
  // Ensure mobile number starts with +
  const normalized = mobileNumber.startsWith('+') ? mobileNumber : `+${mobileNumber}`;
  return `${normalized}@mobile.local`;
}

/**
 * Register user with mobile number and password (cost-effective - uses free Firebase email/password)
 */
export async function registerWithMobile(mobileNumber: string, password: string) {
  const email = mobileToEmail(mobileNumber);
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Login with mobile number and password (cost-effective - uses free Firebase email/password)
 */
export async function loginWithMobile(mobileNumber: string, password: string) {
  const email = mobileToEmail(mobileNumber);
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Send OTP via Firebase Cloud Functions (cost-effective - can use cheaper SMS providers)
 * This calls your Firebase Cloud Function which handles OTP generation and SMS sending
 */
export async function sendOtpViaApi(mobileNumber: string): Promise<{ success: boolean; message?: string }> {
  if (!FIREBASE_FUNCTIONS_URL) {
    throw new Error('Firebase Functions URL not configured. Set VITE_FIREBASE_FUNCTIONS_URL in your .env file');
  }

  try {
    const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/sendOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: mobileNumber.startsWith('+') ? mobileNumber : `+${mobileNumber}`,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to send OTP' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send OTP');
  }
}

/**
 * Verify OTP via Firebase Cloud Functions (cost-effective)
 * This calls your Firebase Cloud Function which:
 * 1. Verifies the OTP against stored value
 * 2. Creates/updates user in Firebase using Admin SDK
 * 3. Generates a Firebase custom token
 * 4. Returns { customToken: string }
 */
export async function verifyOtpViaApi(mobileNumber: string, otp: string): Promise<UserCredential> {
  if (!FIREBASE_FUNCTIONS_URL) {
    throw new Error('Firebase Functions URL not configured. Set VITE_FIREBASE_FUNCTIONS_URL in your .env file');
  }

  const normalizedMobile = mobileNumber.startsWith('+') ? mobileNumber : `+${mobileNumber}`;
  
  try {
    const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/verifyOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: normalizedMobile,
        otp,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'OTP verification failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Cloud Function returns customToken - sign in with it
    if (data.customToken) {
      return await signInWithCustomToken(auth, data.customToken);
    }
    
    throw new Error(data.message || 'OTP verification failed - no token received');
  } catch (error: any) {
    if (error.message?.includes('HTTP error') || error.message?.includes('Failed to fetch')) {
      throw new Error('Firebase Functions unavailable. Please check your deployment and VITE_FIREBASE_FUNCTIONS_URL configuration.');
    }
    throw new Error(error.message || 'OTP verification failed');
  }
}

// Legacy functions for backward compatibility
export async function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function setupRecaptcha(containerId = 'recaptcha-container', size: 'invisible' | 'normal' = 'invisible') {
  // If already exists, return existing
  // @ts-ignore
  if ((window as any).recaptchaVerifier) return (window as any).recaptchaVerifier;

  const verifier = new RecaptchaVerifier(auth, containerId, { size });
  // render may be needed by some builds; keep reference
  // @ts-ignore
  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

/**
 * Send OTP using Firebase Phone Auth (more expensive, use as fallback)
 * Consider using sendOtpViaApi for cost-effective solution
 */
export async function sendOtpToPhone(phoneNumber: string, containerId = 'recaptcha-container') {
  const verifier = setupRecaptcha(containerId, 'invisible');
  return signInWithPhoneNumber(auth, phoneNumber, verifier) as Promise<ConfirmationResult>;
}

export async function confirmOtp(confirmationResult: ConfirmationResult, code: string): Promise<UserCredential> {
  return confirmationResult.confirm(code);
}
