import React, { useState } from 'react';
import { registerWithEmail, sendOtpToPhone } from '../../../../shared/services/auth';

interface Props {
  onSwitchToLogin: () => void;
  onRequestOtp: (info: any) => void;
}

const RegisterForm: React.FC<Props> = ({ onSwitchToLogin, onRequestOtp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      // TODO: save profile fields server-side if needed
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
      <form onSubmit={handleRegister} className="auth-form">
        <label>First Name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label>Last Name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label>Mobile Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+911234567890" />
        <button type="button" className="btn-otp" onClick={handleSendOtp}>Send OTP</button>

        <div className="divider">OR</div>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        {error && <div className="auth-error">{error}</div>}

        <button className="btn-submit" type="submit">Register</button>
      </form>

      <div className="auth-footer">
        <span>Already have an account? <button className="link" onClick={onSwitchToLogin}>Login</button></span>
      </div>
    </div>
  );
};

export default RegisterForm;
