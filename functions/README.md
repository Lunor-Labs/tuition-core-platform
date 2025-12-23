# Firebase Cloud Functions - OTP Backend

This folder contains Firebase Cloud Functions for cost-effective OTP authentication.

## Setup

1. **Install dependencies:**
   ```bash
   cd functions
   npm install
   ```

2. **Configure Firebase project:**
   ```bash
   firebase login
   firebase use --add  # Select your Firebase project
   ```

3. **Set up SMS provider (choose one):**

   **Option 1: Twilio (Recommended)**
   ```bash
   firebase functions:config:set twilio.sid="YOUR_TWILIO_SID"
   firebase functions:config:set twilio.auth_token="YOUR_TWILIO_AUTH_TOKEN"
   firebase functions:config:set twilio.phone_number="+1234567890"
   ```

   **Option 2: AWS SNS**
   ```bash
   firebase functions:config:set aws.access_key_id="YOUR_AWS_ACCESS_KEY"
   firebase functions:config:set aws.secret_access_key="YOUR_AWS_SECRET_KEY"
   firebase functions:config:set aws.region="us-east-1"
   ```

   **Option 3: Vonage**
   ```bash
   firebase functions:config:set vonage.api_key="YOUR_VONAGE_API_KEY"
   firebase functions:config:set vonage.api_secret="YOUR_VONAGE_API_SECRET"
   ```

4. **Install SMS provider SDK (choose one):**
   ```bash
   # For Twilio
   npm install twilio

   # For AWS SNS
   npm install aws-sdk

   # For Vonage
   npm install @vonage/server-sdk
   ```

## Development

1. **Build the functions:**
   ```bash
   npm run build
   ```

2. **Run locally with emulator:**
   ```bash
   npm run serve
   ```

3. **Test endpoints:**
   - Send OTP: `POST http://localhost:5001/{project-id}/{region}/sendOtp`
   - Verify OTP: `POST http://localhost:5001/{project-id}/{region}/verifyOtp`

## Deployment

1. **Build functions:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   npm run deploy
   # Or from project root:
   firebase deploy --only functions
   ```

3. **Get your Functions URL:**
   After deployment, you'll get URLs like:
   - `https://{region}-{project-id}.cloudfunctions.net/sendOtp`
   - `https://{region}-{project-id}.cloudfunctions.net/verifyOtp`

4. **Update frontend .env:**
   ```env
   VITE_FIREBASE_FUNCTIONS_URL=https://{region}-{project-id}.cloudfunctions.net
   ```

## Endpoints

### POST /sendOtp
Sends OTP to mobile number.

**Request:**
```json
{
  "mobileNumber": "+911234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### POST /verifyOtp
Verifies OTP and returns Firebase custom token.

**Request:**
```json
{
  "mobileNumber": "+911234567890",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "customToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "user-id"
}
```

## Production Considerations

1. **Use Firestore for OTP storage** (instead of in-memory):
   - More reliable
   - Survives function restarts
   - Better for scaling

2. **Add rate limiting** to prevent abuse

3. **Add IP-based restrictions** if needed

4. **Monitor costs** for SMS sending

## Cost Comparison

- **Firebase Phone Auth**: ~$0.06 per verification
- **Twilio**: ~$0.0075 per SMS (8x cheaper)
- **AWS SNS**: ~$0.00645 per SMS (9x cheaper)
- **Vonage**: ~$0.0055 per SMS (11x cheaper)

