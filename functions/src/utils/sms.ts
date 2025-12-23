/**
 * SMS Service utilities for cost-effective OTP delivery
 * 
 * Configure your preferred SMS provider by setting environment variables:
 * - For Twilio: TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
 * - For AWS SNS: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
 * - For Vonage: VONAGE_API_KEY, VONAGE_API_SECRET
 */

import * as functions from 'firebase-functions';

export interface SMSProvider {
  sendSMS(phoneNumber: string, message: string): Promise<void>;
}

/**
 * Twilio SMS Provider (Recommended - ~$0.0075 per SMS)
 */
export class TwilioProvider implements SMSProvider {
  private client: any;
  private fromNumber: string;

  constructor() {
    // Dynamic import to avoid build errors if twilio is not installed
    let twilio: any;
    try {
      twilio = require('twilio');
    } catch (e) {
      throw new Error('Twilio package not installed. Run: npm install twilio');
    }
    
    const config = functions.config();
    
    if (!config.twilio?.sid || !config.twilio?.auth_token) {
      throw new Error('Twilio credentials not configured. Set functions.config().twilio');
    }

    this.client = twilio(config.twilio.sid, config.twilio.auth_token);
    this.fromNumber = config.twilio.phone_number || '';
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: this.fromNumber,
      to: phoneNumber
    });
  }
}

/**
 * AWS SNS Provider (Very cost-effective - ~$0.00645 per SMS)
 */
export class AWSSNSProvider implements SMSProvider {
  private sns: any;

  constructor() {
    // Dynamic import to avoid build errors if aws-sdk is not installed
    let AWS: any;
    try {
      AWS = require('aws-sdk');
    } catch (e) {
      throw new Error('AWS SDK not installed. Run: npm install aws-sdk');
    }
    
    const config = functions.config();

    if (!config.aws?.access_key_id || !config.aws?.secret_access_key) {
      throw new Error('AWS credentials not configured. Set functions.config().aws');
    }

    this.sns = new AWS.SNS({
      accessKeyId: config.aws.access_key_id,
      secretAccessKey: config.aws.secret_access_key,
      region: config.aws.region || 'us-east-1'
    });
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    await this.sns.publish({
      Message: message,
      PhoneNumber: phoneNumber
    }).promise();
  }
}

/**
 * Vonage/Nexmo Provider (Cost-effective - ~$0.0055 per SMS)
 */
export class VonageProvider implements SMSProvider {
  private vonage: any;

  constructor() {
    // Dynamic import to avoid build errors if @vonage/server-sdk is not installed
    let Vonage: any;
    try {
      Vonage = require('@vonage/server-sdk');
    } catch (e) {
      throw new Error('Vonage SDK not installed. Run: npm install @vonage/server-sdk');
    }
    
    const config = functions.config();

    if (!config.vonage?.api_key || !config.vonage?.api_secret) {
      throw new Error('Vonage credentials not configured. Set functions.config().vonage');
    }

    this.vonage = new Vonage({
      apiKey: config.vonage.api_key,
      apiSecret: config.vonage.api_secret
    });
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.vonage.sms.send({
        to: phoneNumber,
        from: 'TOTC', // Your brand name or number
        text: message
      }, (err: any, responseData: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

/**
 * Get the configured SMS provider
 * Priority: Twilio > AWS SNS > Vonage
 */
export function getSMSProvider(): SMSProvider | null {
  const config = functions.config();

  try {
    if (config.twilio?.sid) {
      return new TwilioProvider();
    }
  } catch (e) {
    console.warn('Twilio not configured:', e);
  }

  try {
    if (config.aws?.access_key_id) {
      return new AWSSNSProvider();
    }
  } catch (e) {
    console.warn('AWS SNS not configured:', e);
  }

  try {
    if (config.vonage?.api_key) {
      return new VonageProvider();
    }
  } catch (e) {
    console.warn('Vonage not configured:', e);
  }

  return null;
}

