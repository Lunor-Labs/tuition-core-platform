import React from 'react';
import './AuthPage.css';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage: React.FC = () => {
  const handleRegisterSuccess = () => {
    // Handle successful registration - redirect to login or dashboard
    window.location.href = '/login';
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <h2>Register</h2>
        <RegisterForm 
          onSwitchToLogin={() => { window.location.href = '/login'; }} 
          onRegisterSuccess={handleRegisterSuccess}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
