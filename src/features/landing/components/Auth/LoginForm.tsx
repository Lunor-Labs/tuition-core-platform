import React, { useState } from 'react';
import { loginWithMobile, sendOtpViaApi, verifyOtpViaApi } from '../../../../shared/services/auth';

interface Props {
  onSwitchToRegister: () => void;
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<Props> = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || !password) {
      setError('Please enter mobile number and password');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await loginWithMobile(mobileNumber, password);
      onLoginSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your mobile number and password.');
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
      setLoginMethod('otp');
    } catch (err: any) {
      setError(err.message || 'Could not send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || !otp) {
      setError('Please enter mobile number and OTP');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await verifyOtpViaApi(mobileNumber, otp);
      onLoginSuccess?.();
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
        onSubmit={loginMethod === 'password' ? handlePasswordLogin : handleOtpLogin} 
        className="auth-form"
      >
        <label>Mobile Number (Username)</label>
        <input 
          type="tel"
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} 
          placeholder="+911234567890"
          required
          disabled={loading}
        />

        {loginMethod === 'password' ? (
          <>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
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
                Login with OTP instead
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
                    onClick={() => setLoginMethod('password')}
                    disabled={loading}
                  >
                    Login with Password instead
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
                      setLoginMethod('password');
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

        {(loginMethod === 'password' || otpSent) && (
          <button 
            className="btn-submit" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        )}
      </form>

      <div className="auth-footer">
        <span>Don't have an account? <button className="link" onClick={onSwitchToRegister}>Register</button></span>
      </div>
    </div>
  );
};

export default LoginForm;
