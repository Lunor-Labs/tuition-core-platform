import React, { useState } from 'react';
import { loginWithEmail, sendOtpToPhone } from '../../../../shared/services/auth';

interface Props {
  onSwitchToRegister: () => void;
  onRequestOtp: (info: any) => void;
}

const LoginForm: React.FC<Props> = ({ onSwitchToRegister, onRequestOtp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      // redirect or show success
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const confirmation = await sendOtpToPhone(phone);
      onRequestOtp(confirmation);
    } catch (err: any) {
      setError(err.message || 'Could not send OTP');
    }
  };

  return (
    <div>
      <form onSubmit={handleEmailLogin} className="auth-form">
        <label>Mobile Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+911234567890" />
        <button type="button" className="btn-otp" onClick={handleSendOtp}>Send OTP</button>

        <div className="divider">OR</div>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        {error && <div className="auth-error">{error}</div>}

        <button className="btn-submit" type="submit">Login</button>
      </form>

      <div className="auth-footer">
        <span>Don't have an account? <button className="link" onClick={onSwitchToRegister}>Register</button></span>
      </div>
    </div>
  );
};

export default LoginForm;
