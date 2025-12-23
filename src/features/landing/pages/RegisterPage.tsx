import React from 'react';
import './AuthPage.css';
import RegisterForm from '../components/Auth/RegisterForm';
import studentBg from '../../../assets/register/student-bg.jpg';

const RegisterPage: React.FC = () => {
  const handleRegisterSuccess = () => {
    // Handle successful registration - redirect to login or dashboard
    window.location.href = '/login';
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
          <h2>Register</h2>
          <RegisterForm 
            onSwitchToLogin={() => { window.location.href = '/login'; }} 
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
