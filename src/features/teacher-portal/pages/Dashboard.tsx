import React from 'react';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import type { DashboardStats } from '../../../shared/types';
import './Dashboard.css';

// Mock data - in a real app, this would come from an API
const mockStats: DashboardStats = {
  totalLessons: 24,
  totalStudents: 156,
  upcomingLessons: 3,
  totalTests: 8
};

// Additional mock data for enhanced dashboard
const upcomingLessons = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    date: '2024-12-25',
    time: '10:00',
    duration: 60,
    studentCount: 25,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Thermodynamics Fundamentals',
    date: '2024-12-26',
    time: '14:00',
    duration: 45,
    studentCount: 30,
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Electricity and Magnetism',
    date: '2024-12-27',
    time: '11:00',
    duration: 75,
    studentCount: 28,
    status: 'scheduled'
  }
];

const recentSubmissions = [
  {
    id: '1',
    studentId: 'std1',
    studentName: 'John Doe',
    testTitle: 'Mechanics Fundamentals Quiz',
    submittedAt: '2024-12-23T10:30:00Z',
    status: 'graded',
    score: 85
  },
  {
    id: '2',
    studentId: 'std2',
    studentName: 'Jane Smith',
    testTitle: 'Thermodynamics Assessment',
    submittedAt: '2024-12-22T14:15:00Z',
    status: 'pending',
    score: null
  },
  {
    id: '3',
    studentId: 'std3',
    studentName: 'Mike Johnson',
    testTitle: 'Mechanics Fundamentals Quiz',
    submittedAt: '2024-12-23T09:00:00Z',
    status: 'graded',
    score: 92
  }
];

// Added more mock submissions for testing and UI layout
const moreRecentSubmissions = [
  {
    id: '4',
    studentId: 'std4',
    studentName: 'Aisha Khan',
    testTitle: 'Electricity Basics Test',
    submittedAt: '2024-12-24T08:45:00Z',
    status: 'graded',
    score: 78
  },
  {
    id: '5',
    studentId: 'std5',
    studentName: 'Carlos Mendez',
    testTitle: 'Thermodynamics Assessment',
    submittedAt: '2024-12-24T09:10:00Z',
    status: 'pending',
    score: null
  },
  {
    id: '6',
    studentId: 'std6',
    studentName: 'Li Wei',
    testTitle: 'Chemistry Lab Report',
    submittedAt: '2024-12-24T11:20:00Z',
    status: 'late',
    score: null
  },
  {
    id: '7',
    studentId: 'std7',
    studentName: 'Sara Ahmed',
    testTitle: 'Mechanics Fundamentals Quiz',
    submittedAt: '2024-12-24T12:02:00Z',
    status: 'graded',
    score: 91
  },
  {
    id: '8',
    studentId: 'std8',
    studentName: 'Omar Ali',
    testTitle: 'Mechanics Fundamentals Quiz',
    submittedAt: '2024-12-24T12:30:00Z',
    status: 'pending',
    score: null
  }
];

const notifications = [
  {
    id: '1',
    type: 'upcoming',
    title: 'Class in 30 minutes',
    message: 'Newton\'s Laws of Motion class starts at 10:00 AM',
    time: '9:30 AM',
    priority: 'high'
  },
  {
    id: '2',
    type: 'grading',
    title: '3 tests pending grading',
    message: 'Mechanics Fundamentals Quiz has new submissions',
    time: '2 hours ago',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'system',
    title: 'Weekly report available',
    message: 'Your teaching analytics for this week are ready',
    time: '1 day ago',
    priority: 'low'
  }
];

const studentActivity = [
  { day: 'Mon', active: 45, total: 50 },
  { day: 'Tue', active: 48, total: 50 },
  { day: 'Wed', active: 42, total: 50 },
  { day: 'Thu', active: 47, total: 50 },
  { day: 'Fri', active: 44, total: 50 },
  { day: 'Sat', active: 38, total: 50 },
  { day: 'Sun', active: 35, total: 50 }
];


const recentStudentActivity = [
  {
    id: '1',
    studentName: 'John Doe',
    action: 'submitted_test',
    description: 'Completed Mathematics Quiz',
    time: '10 minutes ago'
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    action: 'joined_lesson',
    description: 'Joined Physics Workshop',
    time: '30 minutes ago'
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    action: 'viewed_material',
    description: 'Viewed Thermodynamics Notes',
    time: '1 hour ago'
  },
  {
    id: '4',
    studentName: 'Sarah Wilson',
    action: 'submitted_test',
    description: 'Completed Chemistry Lab Report',
    time: '2 hours ago'
  }
];


const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your teaching overview.</p>
        </div>
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
            <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon lessons">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{mockStats.totalLessons}</h3>
            <p className="stat-label">Total Lessons</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon students">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20v-2a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2m10 0H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2m-10-8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{mockStats.totalStudents}</h3>
            <p className="stat-label">Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon upcoming">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{mockStats.upcomingLessons}</h3>
            <p className="stat-label">Upcoming Lessons</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon tests">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.33 0 2.6.29 3.74.82" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{mockStats.totalTests}</h3>
            <p className="stat-label">Total Tests</p>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Upcoming Lessons & Recent Submissions */}
        <div className="content-row">
          {/* Upcoming Lessons */}
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Today's Schedule</h2>
              <button className="btn-link">View All</button>
            </div>
            <div className="lessons-list">
              {upcomingLessons.map((lesson) => (
                <div key={lesson.id} className="lesson-card">
                  <div className="lesson-info">
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <div className="lesson-meta">
                      <span className="lesson-time">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {lesson.time} ({lesson.duration} min)
                      </span>
                      <span className="lesson-students">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20v-2a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2m10 0H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2m-10-8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {lesson.studentCount} students
                      </span>
                    </div>
                  </div>
                  <div className="lesson-status">
                    <span className={`status-badge ${lesson.status}`}>
                      {lesson.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="content-section submissions-section">
            <div className="section-header">
              <h2 className="section-title">Recent Submissions</h2>
              <button className="btn-link">View All</button>
            </div>
            <div className="submissions-list">
              {[...recentSubmissions, ...moreRecentSubmissions].map((submission) => (
                <div key={submission.id} className="submission-card">
                  <div className="submission-info">
                    <h3 className="submission-student">{submission.studentName}</h3>
                    <p className="submission-test">{submission.testTitle}</p>
                  </div>
                  <div className="submission-score">
                    <button className="btn-outline small">View Grade</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Activity & Notifications */}
        <div className="content-row">
          {/* Student Activity */}
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Student Activity</h2>
              <span className="activity-period">This Week</span>
            </div>
            <div className="activity-chart">
              {studentActivity.map((day) => (
                <div key={day.day} className="activity-bar">
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{ height: `${(day.active / day.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="bar-label">{day.day}</span>
                  <span className="bar-value">{day.active}/{day.total}</span>
                </div>
              ))}
            </div>
            <div className="activity-summary">
              <div className="summary-item">
                <span className="summary-label">Avg. Active Students</span>
                <span className="summary-value">43/50</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Engagement Rate</span>
                <span className="summary-value">86%</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Notifications</h2>
            </div>
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.priority}`}>
                  <div className="notification-icon">
                    {notification.type === 'upcoming' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {notification.type === 'grading' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.33 0 2.6.29 3.74.82" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                    {notification.type === 'system' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="notification-content">
                    <h4 className="notification-title">{notification.title}</h4>
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <div className="dashboard-content">
        {/* Student Activity Feed */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recent Student Activity</h2>
          </div>
          <div className="activity-feed">
            {recentStudentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.action === 'submitted_test' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.33 0 2.6.29 3.74.82" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                  {activity.action === 'joined_lesson' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20v-2a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2m10 0H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2m-10-8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {activity.action === 'viewed_material' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <span className="activity-student">{activity.studentName}</span>
                    {' '}
                    {activity.action === 'submitted_test' && 'submitted'}
                    {activity.action === 'joined_lesson' && 'joined'}
                    {activity.action === 'viewed_material' && 'viewed'}
                    {' '}
                    {activity.description}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
