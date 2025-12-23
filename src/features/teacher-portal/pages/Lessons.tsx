import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '../../../shared/types';
import './Lessons.css';

// Mock data - in a real app, this would come from an API
const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations',
    date: '2024-12-25',
    time: '10:00',
    duration: 60,
    resources: [
      { id: 'r1', name: 'Algebra Basics.pdf', type: 'document', url: '#' },
      { id: 'r2', name: 'algebra-intro.mp4', type: 'video', url: '#' }
    ],
    createdAt: '2024-12-20T08:00:00Z',
    updatedAt: '2024-12-20T08:00:00Z'
  },
  {
    id: '2',
    title: 'Quadratic Equations',
    description: 'Solving quadratic equations using different methods',
    date: '2024-12-26',
    time: '14:00',
    duration: 45,
    resources: [
      { id: 'r3', name: 'quadratic-formula.pdf', type: 'document', url: '#' }
    ],
    createdAt: '2024-12-21T10:30:00Z',
    updatedAt: '2024-12-21T10:30:00Z'
  },
  {
    id: '3',
    title: 'Geometry Basics',
    description: 'Understanding shapes, angles, and basic geometric principles',
    date: '2024-12-27',
    time: '11:00',
    duration: 75,
    resources: [
      { id: 'r4', name: 'shapes-diagram.png', type: 'image', url: '#' },
      { id: 'r5', name: 'geometry-guide.pdf', type: 'document', url: '#' }
    ],
    createdAt: '2024-12-22T14:15:00Z',
    updatedAt: '2024-12-23T16:45:00Z'
  },
  {
    id: '4',
    title: 'Trigonometry Fundamentals',
    description: 'Introduction to trigonometric functions and their applications',
    date: '2024-12-28',
    time: '09:30',
    duration: 60,
    resources: [],
    createdAt: '2024-12-23T11:20:00Z',
    updatedAt: '2024-12-23T11:20:00Z'
  },
  {
    id: '5',
    title: 'Statistics and Probability',
    description: 'Basic concepts of statistics and probability theory',
    date: '2024-12-29',
    time: '13:00',
    duration: 90,
    resources: [
      { id: 'r6', name: 'probability-examples.pdf', type: 'document', url: '#' },
      { id: 'r7', name: 'stats-interactive.mp4', type: 'video', url: '#' }
    ],
    createdAt: '2024-12-24T09:00:00Z',
    updatedAt: '2024-12-24T09:00:00Z'
  }
];

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past'>('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isLessonUpcoming = (date: string, time: string) => {
    const lessonDateTime = new Date(`${date}T${time}`);
    return lessonDateTime > new Date();
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'upcoming') return matchesSearch && isLessonUpcoming(lesson.date, lesson.time);
    if (filterStatus === 'past') return matchesSearch && !isLessonUpcoming(lesson.date, lesson.time);

    return matchesSearch;
  });

  const handleDeleteLesson = async (lessonId: string) => {
    if (window.confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));

        // Show success message (in a real app, you'd use a toast notification)
        alert('Lesson deleted successfully!');

      } catch (error) {
        console.error('Error deleting lesson:', error);
        alert('Failed to delete lesson. Please try again.');
      }
    }
  };

  const handleDuplicateLesson = async (lesson: Lesson) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newLesson: Lesson = {
        ...lesson,
        id: Date.now().toString(),
        title: `${lesson.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setLessons(prev => [newLesson, ...prev]);

      // Show success message (in a real app, you'd use a toast notification)
      alert('Lesson duplicated successfully!');

    } catch (error) {
      console.error('Error duplicating lesson:', error);
      alert('Failed to duplicate lesson. Please try again.');
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'image':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'video':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div className="lessons">
      <div className="page-header">
        <h1 className="page-title">Lessons</h1>
        <p className="page-subtitle">Manage your lessons and teaching materials.</p>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({lessons.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilterStatus('upcoming')}
          >
            Upcoming ({lessons.filter(l => isLessonUpcoming(l.date, l.time)).length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'past' ? 'active' : ''}`}
            onClick={() => setFilterStatus('past')}
          >
            Past ({lessons.filter(l => !isLessonUpcoming(l.date, l.time)).length})
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="lessons-grid">
        {filteredLessons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="empty-title">No lessons found</h3>
            <p className="empty-description">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Create your first lesson to get started.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link to="/teacher/create-lesson" className="btn-primary">
                Create Your First Lesson
              </Link>
            )}
          </div>
        ) : (
          filteredLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-header">
                <div className="lesson-status">
                  {isLessonUpcoming(lesson.date, lesson.time) ? (
                    <span className="status-badge upcoming">Upcoming</span>
                  ) : (
                    <span className="status-badge past">Past</span>
                  )}
                </div>
                <div className="lesson-actions">
                  <button
                    className="action-btn"
                    onClick={() => handleDuplicateLesson(lesson)}
                    title="Duplicate lesson"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => {/* Handle edit */}}
                    title="Edit lesson"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteLesson(lesson.id)}
                    title="Delete lesson"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="lesson-content">
                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-description">{lesson.description}</p>

                <div className="lesson-meta">
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {formatDate(lesson.date)} at {formatTime(lesson.time)}
                  </div>
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {lesson.duration} minutes
                  </div>
                </div>

                {lesson.resources.length > 0 && (
                  <div className="lesson-resources">
                    <span className="resources-label">
                      {lesson.resources.length} resource{lesson.resources.length !== 1 ? 's' : ''}:
                    </span>
                    <div className="resource-icons">
                      {lesson.resources.slice(0, 3).map((resource) => (
                        <span key={resource.id} className="resource-icon" title={resource.name}>
                          {getResourceIcon(resource.type)}
                        </span>
                      ))}
                      {lesson.resources.length > 3 && (
                        <span className="resource-count">+{lesson.resources.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="lesson-footer">
                <button className="btn-outline">View Details</button>
                <button className="btn-primary">Start Lesson</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lessons;
