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
      console.log('Starting role-based navigation for user:', user.uid);

      // Check localStorage first for cached role (faster than Firestore query)
      const cachedRole = localStorage.getItem(`user_role_${user.uid}`);

      if (cachedRole) {
        console.log('Using cached role:', cachedRole);
        navigateRole(cachedRole);
        // Update cache in background (don't wait for it)
        updateUserCache(user.uid);
        return;
      }

      // Fallback to Firestore query
      console.log('Fetching user profile from Firestore...');
      const userProfile = await getUserProfile(user.uid);

      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Cache the role for future logins
      localStorage.setItem(`user_role_${user.uid}`, userProfile.role);
      if (userProfile.displayId) {
        localStorage.setItem(`user_display_id_${user.uid}`, userProfile.displayId);
      }

      navigateRole(userProfile.role);

    } catch (error: any) {
      console.error('Error during role-based navigation:', error);
      // Default to student portal if everything fails
      navigate('/student/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const navigateRole = (role: string) => {
    if (role === 'teacher') {
      navigate('/teacher/dashboard');
    } else if (role === 'student') {
      navigate('/student/dashboard');
    } else {
      console.error('Unknown user role:', role);
      navigate('/student/dashboard');
    }
  };

  const updateUserCache = async (uid: string) => {
    try {
      const userProfile = await getUserProfile(uid);
      if (userProfile) {
        localStorage.setItem(`user_role_${uid}`, userProfile.role);
        if (userProfile.displayId) {
          localStorage.setItem(`user_display_id_${uid}`, userProfile.displayId);
        }
      }
    } catch (error) {
      console.log('Cache update failed, will use old cache:', error);
    }
  };

  const handleLoginSuccess = async () => {
    console.log('Login successful - starting navigation process');
    const startTime = Date.now();

    // Listen for auth state change to get the user
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(`Auth state received in ${Date.now() - startTime}ms`);
        await handleRoleBasedNavigation(user);
        console.log(`Total navigation time: ${Date.now() - startTime}ms`);
      } else {
        console.log('No user received from auth state change');
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
