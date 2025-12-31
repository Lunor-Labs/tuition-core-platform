import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUserProfile } from '../../../../shared/services/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Auth.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthPanelProps {
  defaultMode?: 'login' | 'register';
}

const AuthPanel: React.FC<AuthPanelProps> = ({ defaultMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleBasedNavigation = async (user: any) => {
    try {
      setLoading(true);

      // Fetch user profile from Firestore
      const userProfile = await getUserProfile(user.uid);

      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Navigate based on role
      if (userProfile.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (userProfile.role === 'student') {
        navigate('/student/dashboard');
      } else {
        console.error('Unknown user role:', userProfile.role);
        // Default to student portal if role is unknown
        navigate('/student/dashboard');
      }

    } catch (error: any) {
      console.error('Error during role-based navigation:', error);
      // Default to student portal if everything fails
      navigate('/student/dashboard');
    } finally {
      setLoading(false);
    }
  };


  const handleLoginSuccess = async () => {
    console.log('Login successful');

    // Listen for auth state change to get the user
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await handleRoleBasedNavigation(user);
      }
      unsubscribe(); // Clean up listener
    });
  };

  const handleRegisterSuccess = () => {
    console.log('Registration successful');
    setMode('login');
  };

  return (
    <div className="auth-panel">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="back-to-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="auth-brand">
          <div className="logo">TOTC</div>
        </div>

        <div className="auth-toggle">
          <button onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>Login</button>
          <button onClick={() => setMode('register')} className={mode === 'register' ? 'active' : ''}>Register</button>
        </div>

        <div className="auth-body">
          {loading ? (
            <div className="auth-loading">
              <div className="loading-spinner"></div>
              <div>Preparing your dashboard...</div>
              <div className="loading-subtitle">This may take a moment on first login</div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
};

export default AuthPanel;
