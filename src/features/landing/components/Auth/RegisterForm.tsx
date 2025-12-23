import React, { useState } from 'react';
import { registerWithMobile, sendOtpViaApi, verifyOtpViaApi } from '../../../../shared/services/auth';

interface Props {
  onSwitchToLogin: () => void;
  onRegisterSuccess?: () => void;
}

const RegisterForm: React.FC<Props> = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [registerMethod, setRegisterMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobileNumber || !password) {
      setError('Please enter mobile number and password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await registerWithMobile(mobileNumber, password);
      // TODO: save profile fields (firstName, lastName) server-side if needed
      onRegisterSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Mobile number may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber) {
      setError('Please enter your mobile number');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await sendOtpViaApi(mobileNumber);
      setOtpSent(true);
      setRegisterMethod('otp');
    } catch (err: any) {
      setError(err.message || 'Could not send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || !otp) {
      setError('Please enter mobile number and OTP');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await verifyOtpViaApi(mobileNumber, otp);
      // TODO: save profile fields (firstName, lastName) server-side if needed
      onRegisterSuccess?.();
    } catch (err: any) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpSent(false);
    setOtp('');
    await handleSendOtp(new Event('submit') as any);
  };

  return (
    <div>
      <form 
        onSubmit={registerMethod === 'password' ? handlePasswordRegister : handleOtpRegister} 
        className="auth-form"
      >
        <label>First Name</label>
        <input 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder="First Name"
          disabled={loading}
        />
        
        <label>Last Name</label>
        <input 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          placeholder="Last Name"
          disabled={loading}
        />

        <label>Mobile Number (Username)</label>
        <input 
          type="tel"
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} 
          placeholder="+911234567890"
          required
          disabled={loading}
        />

        {registerMethod === 'password' ? (
          <>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Create a password (min 6 characters)"
              required
              disabled={loading}
            />
            <label>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
            <div className="auth-options">
              <button 
                type="button" 
                className="btn-link" 
                onClick={handleSendOtp}
                disabled={loading}
              >
                Register with OTP instead
              </button>
            </div>
          </>
        ) : (
          <>
            {!otpSent ? (
              <>
                <button 
                  type="button" 
                  className="btn-otp" 
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
                <div className="auth-options">
                  <button 
                    type="button" 
                    className="btn-link" 
                    onClick={() => setRegisterMethod('password')}
                    disabled={loading}
                  >
                    Register with Password instead
                  </button>
                </div>
              </>
            ) : (
              <>
                <label>Enter OTP</label>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                  placeholder="123456"
                  maxLength={6}
                  required
                  disabled={loading}
                />
                <div className="auth-options">
                  <button 
                    type="button" 
                    className="btn-link" 
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                  <button 
                    type="button" 
                    className="btn-link" 
                    onClick={() => {
                      setRegisterMethod('password');
                      setOtpSent(false);
                      setOtp('');
                    }}
                    disabled={loading}
                  >
                    Use Password instead
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {error && <div className="auth-error">{error}</div>}

        {(registerMethod === 'password' || otpSent) && (
          <button 
            className="btn-submit" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        )}
      </form>

      <div className="auth-footer">
        <span>Already have an account? <button className="link" onClick={onSwitchToLogin}>Login</button></span>
      </div>
    </div>
  );
};

export default RegisterForm;
