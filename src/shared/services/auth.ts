import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import type { ConfirmationResult, UserCredential } from 'firebase/auth';

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

export async function sendOtpToPhone(phoneNumber: string, containerId = 'recaptcha-container') {
  const verifier = setupRecaptcha(containerId, 'invisible');
  return signInWithPhoneNumber(auth, phoneNumber, verifier) as Promise<ConfirmationResult>;
}

export async function confirmOtp(confirmationResult: ConfirmationResult, code: string): Promise<UserCredential> {
  return confirmationResult.confirm(code);
}
