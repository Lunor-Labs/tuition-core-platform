import React from 'react';
import './AuthPage.css';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  const handleLoginSuccess = () => {
    // Handle successful login - redirect to dashboard or home
    window.location.href = '/';
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <h2>Login</h2>
        <LoginForm 
          onSwitchToRegister={() => { window.location.href = '/register'; }} 
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
};

export default LoginPage;
