import React, { useState } from 'react';
import './Auth.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import VerifyOtp from './VerifyOtp';

const AuthPanel: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
  const [otpInfo, setOtpInfo] = useState<any>(null);

  return (
    <div className="auth-panel">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="logo">TOTC</div>
        </div>

        <div className="auth-toggle">
          <button onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>Login</button>
          <button onClick={() => setMode('register')} className={mode === 'register' ? 'active' : ''}>Register</button>
        </div>

        <div className="auth-body">
          {mode === 'login' && <LoginForm onSwitchToRegister={() => setMode('register')} onRequestOtp={(info: any) => { setOtpInfo(info); setMode('verify'); }} />}
          {mode === 'register' && <RegisterForm onSwitchToLogin={() => setMode('login')} onRequestOtp={(info: any) => { setOtpInfo(info); setMode('verify'); }} />}
          {mode === 'verify' && <VerifyOtp otpInfo={otpInfo} onDone={() => setMode('login')} />}
        </div>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
};

export default AuthPanel;
