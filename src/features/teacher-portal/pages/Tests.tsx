import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Test } from '../../../shared/types';
import './Tests.css';

// Mock data - in a real app, this would come from an API
const mockTests: Test[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals Quiz',
    description: 'Test basic algebraic concepts and problem-solving skills',
    lessonId: '1',
    questions: [],
    totalMarks: 50,
    duration: 30,
    createdAt: '2024-12-20T08:00:00Z',
    submissions: [
      { id: 's1', studentId: 'std1', studentName: 'John Doe', answers: [], totalScore: 45, submittedAt: '2024-12-21T10:00:00Z', status: 'graded' },
      { id: 's2', studentId: 'std2', studentName: 'Jane Smith', answers: [], totalScore: 38, submittedAt: '2024-12-21T11:00:00Z', status: 'graded' },
      { id: 's3', studentId: 'std3', studentName: 'Mike Johnson', answers: [], totalScore: 0, submittedAt: '2024-12-21T09:00:00Z', status: 'pending' }
    ]
  },
  {
    id: '2',
    title: 'Geometry Shapes Test',
    description: 'Identify and calculate properties of geometric shapes',
    lessonId: '3',
    questions: [],
    totalMarks: 40,
    duration: 25,
    createdAt: '2024-12-22T14:15:00Z',
    submissions: [
      { id: 's4', studentId: 'std4', studentName: 'Sarah Wilson', answers: [], totalScore: 35, submittedAt: '2024-12-23T14:00:00Z', status: 'graded' }
    ]
  },
  {
    id: '3',
    title: 'Trigonometry Practice Test',
    description: 'Apply trigonometric functions to solve problems',
    lessonId: '4',
    questions: [],
    totalMarks: 60,
    duration: 45,
    createdAt: '2024-12-23T11:20:00Z',
    submissions: []
  }
];

const Tests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [activeTab, setActiveTab] = useState<'tests' | 'submissions'>('tests');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'reviewed': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const handleDeleteTest = async (testId: string) => {
    if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTests(prev => prev.filter(test => test.id !== testId));
        alert('Test deleted successfully!');
      } catch (error) {
        console.error('Error deleting test:', error);
        alert('Failed to delete test. Please try again.');
      }
    }
  };

  const allSubmissions = tests.flatMap(test =>
    test.submissions.map(submission => ({ ...submission, testTitle: test.title, testId: test.id }))
  );

  return (
    <div className="tests">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Tests & Assessments</h1>
            <p className="page-subtitle">Create and manage tests, view student submissions.</p>
          </div>
          <Link to="/teacher/create-test" className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create New Test
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          Tests ({tests.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          Submissions ({allSubmissions.length})
        </button>
      </div>

      {/* Tests Tab */}
      {activeTab === 'tests' && (
        <div className="tests-grid">
          {tests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.33 0 2.6.29 3.74.82" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="empty-title">No tests created</h3>
              <p className="empty-description">Create your first test to start assessing student knowledge.</p>
              <Link to="/teacher/create-test" className="btn-primary">
                Create Your First Test
              </Link>
            </div>
          ) : (
            tests.map((test) => (
              <div key={test.id} className="test-card">
                <div className="test-header">
                  <h3 className="test-title">{test.title}</h3>
                  <div className="test-actions">
                    <button className="action-btn" title="Edit test">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-btn" title="Duplicate test">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteTest(test.id)}
                      title="Delete test"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="test-description">{test.description}</p>

                <div className="test-meta">
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {test.duration} minutes
                  </div>
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.33 0 2.6.29 3.74.82" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {test.totalMarks} marks
                  </div>
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20v-2a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v2m10 0H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2m-10-8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {test.submissions.length} submissions
                  </div>
                </div>

                <div className="test-footer">
                  <span className="test-date">Created {formatDate(test.createdAt)}</span>
                  <div className="test-buttons">
                    <button className="btn-outline">View Questions</button>
                    <button className="btn-primary">View Submissions</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="submissions-section">
          {allSubmissions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="empty-title">No submissions yet</h3>
              <p className="empty-description">Student submissions will appear here once they complete tests.</p>
            </div>
          ) : (
            <div className="submissions-list">
              {allSubmissions.map((submission) => (
                <div key={submission.id} className="submission-card">
                  <div className="submission-info">
                    <h3 className="submission-student">{submission.studentName}</h3>
                    <p className="submission-test">{submission.testTitle}</p>
                    <span className="submission-date">
                      Submitted {formatDate(submission.submittedAt)}
                    </span>
                  </div>
                  <div className="submission-score">
                    {submission.status === 'graded' ? (
                      <div className="score-display">
                        <span className="score">{submission.totalScore}/100</span>
                        <span className="score-label">Score</span>
                      </div>
                    ) : (
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(submission.status) }}
                      >
                        {submission.status}
                      </span>
                    )}
                  </div>
                  <div className="submission-actions">
                    <button className="btn-outline">View Details</button>
                    {submission.status === 'pending' && (
                      <button className="btn-primary">Grade</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tests;
