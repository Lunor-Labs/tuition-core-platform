import React, { useState } from 'react';
import './Auth.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPanel: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleLoginSuccess = () => {
    // Handle successful login - redirect or update app state
    console.log('Login successful');
    // You can add navigation logic here, e.g., window.location.href = '/dashboard'
  };

  const handleRegisterSuccess = () => {
    // Handle successful registration - redirect or update app state
    console.log('Registration successful');
    // You can add navigation logic here, e.g., setMode('login')
    setMode('login');
  };

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
          {mode === 'login' && (
            <LoginForm 
              onSwitchToRegister={() => setMode('register')} 
              onLoginSuccess={handleLoginSuccess}
            />
          )}
          {mode === 'register' && (
            <RegisterForm 
              onSwitchToLogin={() => setMode('login')} 
              onRegisterSuccess={handleRegisterSuccess}
            />
          )}
        </div>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
};

export default AuthPanel;
