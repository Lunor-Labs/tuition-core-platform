import React from 'react';
import type { DashboardStats } from '../../../shared/types';
import './Dashboard.css';

// Mock data - in a real app, this would come from an API
const mockStats: DashboardStats = {
  totalLessons: 24,
  totalStudents: 156,
  upcomingLessons: 3,
  totalTests: 8,
  recentSubmissions: [
    {
      id: '1',
      studentId: 's1',
      studentName: 'John Doe',
      answers: [],
      totalScore: 85,
      submittedAt: '2024-12-23T10:30:00Z',
      status: 'graded'
    },
    {
      id: '2',
      studentId: 's2',
      studentName: 'Jane Smith',
      answers: [],
      totalScore: 92,
      submittedAt: '2024-12-22T14:15:00Z',
      status: 'graded'
    },
    {
      id: '3',
      studentId: 's3',
      studentName: 'Mike Johnson',
      answers: [],
      totalScore: 0,
      submittedAt: '2024-12-23T09:00:00Z',
      status: 'pending'
    }
  ]
};

const upcomingLessons = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    date: '2024-12-25',
    time: '10:00 AM',
    duration: 60,
    studentCount: 25
  },
  {
    id: '2',
    title: 'Quadratic Equations',
    date: '2024-12-26',
    time: '2:00 PM',
    duration: 45,
    studentCount: 30
  },
  {
    id: '3',
    title: 'Geometry Basics',
    date: '2024-12-27',
    time: '11:00 AM',
    duration: 75,
    studentCount: 28
  }
];

const Dashboard: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your teaching overview.</p>
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

      <div className="dashboard-content">
        {/* Upcoming Lessons */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Lessons</h2>
            <button className="btn-link">View All</button>
          </div>

          <div className="lessons-list">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-info">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <div className="lesson-meta">
                    <span className="lesson-date">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {formatDate(lesson.date)} at {lesson.time}
                    </span>
                    <span className="lesson-duration">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {lesson.duration} min
                    </span>
                    <span className="lesson-students">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20v-2a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2m10 0H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2m-10-8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {lesson.studentCount} students
                    </span>
                  </div>
                </div>
                <div className="lesson-actions">
                  <button className="btn-outline">Edit</button>
                  <button className="btn-primary">Start Lesson</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recent Test Submissions</h2>
            <button className="btn-link">View All</button>
          </div>

          <div className="submissions-list">
            {mockStats.recentSubmissions.map((submission) => (
              <div key={submission.id} className="submission-card">
                <div className="submission-info">
                  <h3 className="submission-student">{submission.studentName}</h3>
                  <div className="submission-meta">
                    <span className="submission-date">
                      Submitted {formatDate(submission.submittedAt)} at {formatTime(submission.submittedAt)}
                    </span>
                    <span className={`submission-status ${submission.status}`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
                <div className="submission-score">
                  {submission.status === 'graded' ? (
                    <div className="score-display">
                      <span className="score">{submission.totalScore}/100</span>
                      <span className="score-label">Score</span>
                    </div>
                  ) : (
                    <button className="btn-primary">Grade</button>
                  )}
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
