import React, { useState } from 'react';
import type { Resource } from '../../../shared/types';
import './CreateLesson.css';

interface LessonFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  zoomLink?: string;
  resources: Resource[];
}

const CreateLesson: React.FC = () => {
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    zoomLink: '',
    resources: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        zoomLink: '',
        resources: []
      });

      // Show inline success banner
      setSuccessMessage('Lesson created successfully!');
      setTimeout(() => setSuccessMessage(''), 4500);

    } catch (error) {
      console.error('Error creating lesson:', error);
      setErrorMessage('Failed to create lesson. Please try again.');
      setTimeout(() => setErrorMessage(''), 4500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateZoomLink = () => {
    // Mock Zoom link generator (replace with real API integration if needed)
    const meetingId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const passcode = Math.floor(1000 + Math.random() * 9000).toString();
    const link = `https://zoom.us/j/${meetingId}?pwd=${passcode}`;
    setFormData(prev => ({ ...prev, zoomLink: link }));
    setSuccessMessage('Zoom link generated');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const copyZoomLink = async () => {
    if (!formData.zoomLink) return;
    try {
      await navigator.clipboard.writeText(formData.zoomLink);
      setSuccessMessage('Zoom link copied to clipboard');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setErrorMessage('Unable to copy link');
      setTimeout(() => setErrorMessage(''), 2000);
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

      {/* Stepper */}
      <div className="lesson-stepper">
        <div className="step active">1<span>Details</span></div>
        <div className="step">2<span>Schedule</span></div>
        <div className="step">3<span>Resources</span></div>
        <div className="step">4<span>Preview</span></div>
      </div>

      {/* Decorative chips */}
      <div className="header-chips">
        <div className="chip">⏱ {formData.duration} min</div>
        <div className="chip">📎 {formData.resources.length} resources</div>
        <div className="chip">🔗 {formData.zoomLink ? 'Zoom ready' : 'No Zoom'}</div>
      </div>

      {successMessage && (
        <div className="inline-toast success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="inline-toast error">{errorMessage}</div>
      )}

      <div className="lesson-form-container">
        <form onSubmit={handleSubmit} className="lesson-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">📝 Basic Information</h2>
            <p className="section-subtitle">Provide essential details about your lesson to help students understand what they'll learn.</p>

            <div className="form-group">
              <label htmlFor="title" className="form-label">Lesson Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Newton's Laws of Motion"
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
                placeholder="Describe the physics concepts, key principles, and learning objectives students will master..."
                rows={4}
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="form-section">
            <h2 className="section-title">📅 Schedule & Duration</h2>
            <p className="section-subtitle">Set the timing and duration for your lesson session.</p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label emoji-label">📅 Date *</label>
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
                <label htmlFor="time" className="form-label emoji-label">⏰ Time *</label>
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
                <label htmlFor="duration" className="form-label">⏱️ Duration</label>
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
            
            <div className="form-group zoom-row">
              <label htmlFor="zoomLink" className="form-label">🔗 Zoom Meeting Link</label>
              <div className="zoom-input-wrapper">
                <input
                  type="text"
                  id="zoomLink"
                  name="zoomLink"
                  value={formData.zoomLink || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, zoomLink: e.target.value }))}
                  className="form-input zoom-input"
                  placeholder="Paste a Zoom link or generate one"
                />
                <div className="zoom-actions">
                  <button type="button" className="btn-outline" onClick={generateZoomLink}>Generate</button>
                  <button type="button" className="btn-ghost" onClick={copyZoomLink}>Copy</button>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="form-section">
            <h2 className="section-title">📎 Learning Resources</h2>
            <p className="section-subtitle">Upload supplementary materials like documents, images, or videos to enhance your lesson.</p>

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
              <label htmlFor="file-upload" className="file-upload-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Choose Files
              </label>
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
            <div className="actions-left">
              <button type="button" className="btn-ghost" onClick={() => window.history.back()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setSuccessMessage('Preview opened — this is just a demo.')}
              >
                Preview
              </button>
            </div>
            <div className="actions-right">
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {isSubmitting ? 'Creating Lesson...' : 'Create Lesson'}
              </button>
            </div>
          </div>
        </form>

        {/* Right-side preview */}
        <aside className="lesson-preview">
          <div className="preview-card">
            <div className="preview-header">
              <h3 className="preview-title">{formData.title || 'Lesson Title'}</h3>
              <div className="preview-meta">{formData.date && `${formData.date} · ${formData.time}`} {formData.duration ? `· ${formData.duration} min` : ''}</div>
            </div>

            <p className="preview-desc">{formData.description || 'Lesson description preview. Students will see this summary on the lesson card.'}</p>

            {formData.resources.length > 0 && (
              <div className="preview-resources">
                {formData.resources.slice(0,4).map(r => (
                  <div key={r.id} className="preview-resource">
                    {r.type === 'image' ? (
                      <img src={r.url} alt={r.name} />
                    ) : (
                      <div className="resource-placeholder">{r.name.split('.').pop()}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="preview-actions">
              {formData.zoomLink ? (
                <>
                  <a href={formData.zoomLink} target="_blank" rel="noreferrer" className="btn-small">Join</a>
                  <button className="btn-small ghost" onClick={() => { navigator.clipboard?.writeText(formData.zoomLink || ''); setSuccessMessage('Zoom link copied'); setTimeout(() => setSuccessMessage(''), 2000); }}>Copy Link</button>
                </>
              ) : (
                <>
                  <button className="btn-small" onClick={generateZoomLink}>Generate Zoom</button>
                  <button className="btn-small ghost">Share</button>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateLesson;

// Floating FAB submit button to mirror the main submit
// (keeps UX consistent on long forms)
const Fab: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="create-fab" onClick={onClick} title="Create Lesson">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

// Note: To render the FAB we add it near the root of the page. Consumers can mount it where appropriate.
