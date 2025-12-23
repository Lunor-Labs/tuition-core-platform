import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { Request, Response } from 'express';

// Initialize Firebase Admin
admin.initializeApp();

// CORS configuration
const corsHandler = cors({ origin: true });

// In-memory OTP store (for development)
// In production, use Firebase Realtime Database or Firestore
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

/**
 * Generate a 6-digit OTP
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP to mobile number
 * POST /sendOtp
 * Body: { mobileNumber: string }
 */
export const sendOtp = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { mobileNumber } = request.body;

      if (!mobileNumber) {
        response.status(400).json({ success: false, message: 'Mobile number is required' });
        return;
      }

      // Normalize mobile number
      const normalizedMobile = mobileNumber.startsWith('+') 
        ? mobileNumber 
        : `+${mobileNumber}`;

      // Generate OTP
      const otp = generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      // Store OTP (in-memory for now, use Firestore in production)
      otpStore.set(normalizedMobile, { otp, expiresAt });

      // Send SMS via cost-effective provider
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { getSMSProvider } = require('./utils/sms');
        const smsProvider = getSMSProvider();
        
        if (smsProvider) {
          await smsProvider.sendSMS(
            normalizedMobile,
            `Your OTP is ${otp}. Valid for 5 minutes.`
          );
        } else {
          // Fallback: log OTP in development
          console.log(`OTP for ${normalizedMobile}: ${otp}`);
          console.warn('SMS provider not configured. OTP logged to console.');
        }
      } catch (smsError: any) {
        console.error('SMS sending failed:', smsError);
        // Log OTP as fallback
        console.log(`OTP for ${normalizedMobile}: ${otp}`);
      }

      // In production, uncomment and configure one of these:
      /*
      // Twilio example:
      const twilio = require('twilio');
      const twilioClient = twilio(
        functions.config().twilio.sid,
        functions.config().twilio.auth_token
      );
      await twilioClient.messages.create({
        body: `Your OTP is ${otp}. Valid for 5 minutes.`,
        from: functions.config().twilio.phone_number,
        to: normalizedMobile
      });

      // AWS SNS example:
      const AWS = require('aws-sdk');
      const sns = new AWS.SNS({
        accessKeyId: functions.config().aws.access_key_id,
        secretAccessKey: functions.config().aws.secret_access_key,
        region: functions.config().aws.region
      });
      await sns.publish({
        Message: `Your OTP is ${otp}. Valid for 5 minutes.`,
        PhoneNumber: normalizedMobile
      }).promise();
      */

      response.json({
        success: true,
        message: 'OTP sent successfully',
        // Remove this in production - only for development
        ...(process.env.NODE_ENV === 'development' && { otp })
      });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to send OTP'
      });
    }
  });
});

/**
 * Verify OTP and create/authenticate user
 * POST /verifyOtp
 * Body: { mobileNumber: string, otp: string }
 */
export const verifyOtp = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { mobileNumber, otp } = request.body;

      if (!mobileNumber || !otp) {
        response.status(400).json({
          success: false,
          message: 'Mobile number and OTP are required'
        });
        return;
      }

      // Normalize mobile number
      const normalizedMobile = mobileNumber.startsWith('+')
        ? mobileNumber
        : `+${mobileNumber}`;

      // Retrieve stored OTP
      const stored = otpStore.get(normalizedMobile);

      if (!stored) {
        response.status(400).json({
          success: false,
          message: 'OTP not found or expired'
        });
        return;
      }

      // Check expiration
      if (Date.now() > stored.expiresAt) {
        otpStore.delete(normalizedMobile);
        response.status(400).json({
          success: false,
          message: 'OTP has expired'
        });
        return;
      }

      // Verify OTP
      if (stored.otp !== otp) {
        response.status(400).json({
          success: false,
          message: 'Invalid OTP'
        });
        return;
      }

      // Delete OTP after successful verification
      otpStore.delete(normalizedMobile);

      // Format mobile as email for Firebase Auth
      const email = `${normalizedMobile}@mobile.local`;

      // Get or create user using Firebase Admin SDK
      let user;
      try {
        user = await admin.auth().getUserByEmail(email);
      } catch (error: any) {
        // User doesn't exist, create new user
        if (error.code === 'auth/user-not-found') {
          user = await admin.auth().createUser({
            email: email,
            emailVerified: true,
            phoneNumber: normalizedMobile,
            displayName: normalizedMobile
          });
        } else {
          throw error;
        }
      }

      // Generate custom token for client-side authentication
      const customToken = await admin.auth().createCustomToken(user.uid);

      response.json({
        success: true,
        customToken: customToken,
        userId: user.uid
      });
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'OTP verification failed'
      });
    }
  });
});

