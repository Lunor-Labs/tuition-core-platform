import React from 'react';
import './AuthPage.css';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <h2>Register</h2>
        <RegisterForm onSwitchToLogin={() => { window.location.href = '/login'; }} onRequestOtp={() => { /* handled inside form */ }} />
      </div>
    </div>
  );
};

export default RegisterPage;
