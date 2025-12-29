import React from 'react';
import './AuthPage.css';
import AuthPanel from '../components/Auth/AuthPanel';
import studentBg from '../../../assets/register/student-bg.jpg';

const LoginPage: React.FC = () => {
  return (
    <div className="auth-page">
      {/* Left Side - Image */}
      <div className="auth-left">
        <div className="auth-image-container">
          <img src={studentBg} alt="Student" className="auth-image" />
          <div className="auth-image-overlay">
            <h2 className="auth-overlay-title">Welcome Back!</h2>
            <p className="auth-overlay-subtitle">Continue your learning journey</p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Panel */}
      <div className="auth-right">
        <AuthPanel defaultMode="login" />
      </div>
    </div>
  );
};

export default LoginPage;
