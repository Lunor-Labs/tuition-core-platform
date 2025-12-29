import React, { useState } from 'react';
import type { TeacherProfile } from '../../../shared/types';
import './Settings.css';

// Mock data - in a real app, this would come from an API
const mockProfile: TeacherProfile = {
  id: '1',
  name: 'Amila Edirimanna',
  email: 'amila.edirimanna@school.edu',
  phone: '+94 77 123 4567',
  subjects: ['Physics', 'Mechanics', 'Thermodynamics'],
  experience: 8,
  bio: 'Experienced physics teacher with a passion for making complex physical concepts accessible to all students. Specializes in mechanics and thermodynamics.',
  avatar: '',
  preferences: {
    notifications: true,
    emailReminders: true,
    theme: 'light'
  }
};

const Settings: React.FC = () => {
  const [profile, setProfile] = useState<TeacherProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1] as keyof TeacherProfile['preferences'];
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else if (name === 'subjects') {
      setProfile(prev => ({
        ...prev,
        subjects: value.split(',').map(s => s.trim()).filter(s => s)
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Profile updated:', profile);

      setIsEditing(false);

      // Show success message (in a real app, you'd use a toast notification)
      alert('Profile updated successfully!');

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your profile, preferences, and account settings.</p>
      </div>

      <div className="settings-container">
        {/* Settings Navigation */}
        <div className="settings-nav">
          <button
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`nav-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button
            className={`nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="section-header">
                <h2 className="section-title">Profile Information</h2>
                <button
                  type="button"
                  className={`btn-secondary ${isEditing ? 'cancel' : ''}`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {!isEditing && (
                <div className="edit-notice">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Click "Edit Profile" to make changes to your information.
                </div>
              )}

              <form onSubmit={handleSubmit} className="profile-form">
                {/* Avatar Section */}
                <div className="avatar-section">
                  <div className="avatar-container">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Profile" className="avatar-image" />
                    ) : (
                      <div className="avatar-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {isEditing && (
                      <label className="avatar-upload">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          style={{ display: 'none' }}
                        />
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </label>
                    )}
                  </div>
                  <div className="avatar-info">
                    <h3 className="avatar-title">Profile Picture</h3>
                    <p className="avatar-description">Upload a professional photo for your profile.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profile.phone || ''}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience" className="form-label">Years of Experience</label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      value={profile.experience}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={!isEditing}
                      min="0"
                      max="50"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="subjects" className="form-label">Subjects</label>
                    <input
                      type="text"
                      id="subjects"
                      name="subjects"
                      value={profile.subjects.join(', ')}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={!isEditing}
                      placeholder="Physics, Mechanics, Thermodynamics"
                    />
                    <p className="form-help">Separate subjects with commas</p>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={profile.bio || ''}
                      onChange={handleInputChange}
                      className="form-textarea"
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell students about yourself and your teaching experience..."
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="preferences-section">
              <h2 className="section-title">Preferences</h2>

              <div className="preferences-form">
                <div className="preference-group">
                  <h3 className="preference-title">Notifications</h3>
                  <p className="preference-description">Choose how you want to be notified about important updates.</p>

                  <div className="preference-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="preferences.notifications"
                        checked={profile.preferences.notifications}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-mark"></span>
                      <div className="checkbox-content">
                        <span className="checkbox-title">Push Notifications</span>
                        <span className="checkbox-description">Receive notifications about lesson updates and student activities</span>
                      </div>
                    </label>
                  </div>

                  <div className="preference-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="preferences.emailReminders"
                        checked={profile.preferences.emailReminders}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-mark"></span>
                      <div className="checkbox-content">
                        <span className="checkbox-title">Email Reminders</span>
                        <span className="checkbox-description">Get email reminders for upcoming lessons and deadlines</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="preference-group">
                  <h3 className="preference-title">Appearance</h3>
                  <p className="preference-description">Customize the look and feel of your dashboard.</p>

                  <div className="preference-item">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="preferences.theme"
                        value="light"
                        checked={profile.preferences.theme === 'light'}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-mark"></span>
                      <div className="radio-content">
                        <span className="radio-title">Light Theme</span>
                        <span className="radio-description">Clean and bright interface</span>
                      </div>
                    </label>
                  </div>

                  <div className="preference-item">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="preferences.theme"
                        value="dark"
                        checked={profile.preferences.theme === 'dark'}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-mark"></span>
                      <div className="radio-content">
                        <span className="radio-title">Dark Theme</span>
                        <span className="radio-description">Easy on the eyes for extended use</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="security-section">
              <h2 className="section-title">Security Settings</h2>

              <div className="security-form">
                <div className="security-group">
                  <h3 className="security-title">Change Password</h3>
                  <p className="security-description">Update your password to keep your account secure.</p>

                  <form className="password-form">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="form-input"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-input"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-input"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="security-group">
                  <h3 className="security-title">Two-Factor Authentication</h3>
                  <p className="security-description">Add an extra layer of security to your account.</p>

                  <div className="security-status">
                    <div className="status-indicator disabled"></div>
                    <span className="status-text">Two-factor authentication is not enabled</span>
                    <button className="btn-outline">Enable 2FA</button>
                  </div>
                </div>

                <div className="security-group danger">
                  <h3 className="security-title">Danger Zone</h3>
                  <p className="security-description">Irreversible actions that will affect your account.</p>

                  <button className="btn-danger">
                    Delete Account
                  </button>
                  <p className="danger-description">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
