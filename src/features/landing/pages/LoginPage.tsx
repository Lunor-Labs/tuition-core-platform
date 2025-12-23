import React from 'react';
import './AuthPage.css';
import LoginForm from '../components/Auth/LoginForm';
import studentBg from '../../../assets/register/student-bg.jpg';

const LoginPage: React.FC = () => {
  const handleLoginSuccess = () => {
    // Handle successful login - redirect to dashboard or home
    window.location.href = '/';
  };

  return (
    <div className="auth-page">
      {/* Left Side - Image */}
      <div className="auth-left">
        <div className="auth-image-container">
          <img src={studentBg} alt="Student" className="auth-image" />
          <div className="auth-image-overlay">
            <h2 className="auth-overlay-title">Lorem Ipsum is simply</h2>
            <p className="auth-overlay-subtitle">Lorem Ipsum is simply</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-wrapper">
          <h2>Login</h2>
          <LoginForm 
            onSwitchToRegister={() => { window.location.href = '/register'; }} 
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
