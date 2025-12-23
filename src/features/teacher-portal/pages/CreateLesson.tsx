import React, { useState } from 'react';
import type { Resource } from '../../../shared/types';
import './CreateLesson.css';

interface LessonFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  resources: Resource[];
}

const CreateLesson: React.FC = () => {
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    resources: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const resource: Resource = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: getResourceType(file.type),
        url: URL.createObjectURL(file),
        size: file.size
      };

      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, resource]
      }));
    });
  };

  const getResourceType = (mimeType: string): Resource['type'] => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document';
    return 'document';
  };

  const removeResource = (resourceId: string) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter(r => r.id !== resourceId)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Lesson created:', formData);

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: 60,
        resources: []
      });

      // Show success message (in a real app, you'd use a toast notification)
      alert('Lesson created successfully!');

    } catch (error) {
      console.error('Error creating lesson:', error);
      alert('Failed to create lesson. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'image':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'video':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'link':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div className="create-lesson">
      <div className="page-header">
        <h1 className="page-title">Create New Lesson</h1>
        <p className="page-subtitle">Set up a new lesson with all the necessary details and resources.</p>
      </div>

      <div className="lesson-form-container">
        <form onSubmit={handleSubmit} className="lesson-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>

            <div className="form-group">
              <label htmlFor="title" className="form-label">Lesson Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter lesson title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Describe what students will learn in this lesson"
                rows={4}
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="form-section">
            <h2 className="section-title">Schedule</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={75}>1 hour 15 minutes</option>
                  <option value={90}>1 hour 30 minutes</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="form-section">
            <h2 className="section-title">Resources</h2>
            <p className="section-subtitle">Upload files, images, or videos to support your lesson.</p>

            {/* File Upload Area */}
            <div
              className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1.643 9.783A4 4 0 0 1 7 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12v6M9 15l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="upload-text">
                <p className="upload-primary">Drop files here or click to upload</p>
                <p className="upload-secondary">Supports images, videos, documents (PDF, DOC, etc.)</p>
              </div>
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-upload-label">Choose Files</label>
            </div>

            {/* Uploaded Resources */}
            {formData.resources.length > 0 && (
              <div className="resources-list">
                <h3 className="resources-title">Uploaded Resources ({formData.resources.length})</h3>
                <div className="resources-grid">
                  {formData.resources.map((resource) => (
                    <div key={resource.id} className="resource-item">
                      <div className="resource-icon">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="resource-info">
                        <span className="resource-name">{resource.name}</span>
                        {resource.size && (
                          <span className="resource-size">{formatFileSize(resource.size)}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeResource(resource.id)}
                        className="resource-remove"
                        aria-label="Remove resource"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Lesson...' : 'Create Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLesson;
