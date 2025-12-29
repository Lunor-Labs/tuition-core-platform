import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

      // Get user profile from Firestore
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
      // If profile fetch fails, try to determine role from local storage or default
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
              <div>Loading your portal...</div>
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
