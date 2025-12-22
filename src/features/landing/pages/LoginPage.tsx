import React from 'react';
import './AuthPage.css';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <h2>Login</h2>
        <LoginForm onSwitchToRegister={() => { window.location.href = '/register'; }} onRequestOtp={() => { /* handled inside form */ }} />
      </div>
    </div>
  );
};

export default LoginPage;
