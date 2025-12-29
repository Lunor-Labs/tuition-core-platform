import React from 'react';
import './AuthPage.css';
import AuthPanel from '../components/Auth/AuthPanel';
import studentBg from '../../../assets/register/student-bg.jpg';

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page">
      {/* Left Side - Image */}
      <div className="auth-left">
        <div className="auth-image-container">
          <img src={studentBg} alt="Student" className="auth-image" />
          <div className="auth-image-overlay">
            <h2 className="auth-overlay-title">Join Our Learning Community</h2>
            <p className="auth-overlay-subtitle">Start your educational journey today</p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Panel */}
      <div className="auth-right">
        <AuthPanel defaultMode="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
