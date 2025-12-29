# 📚 Implementation Examples & Code Snippets

## Table of Contents
1. [Toast Notifications](#toast-notifications)
2. [Floating Action Button](#floating-action-button)
3. [Header Components](#header-components)
4. [Advanced Usage](#advanced-usage)

---

## Toast Notifications

### Basic Example
```typescript
import { useToast } from '../components/ToastProvider';

function MyComponent() {
  const { showToast } = useToast();

  return (
    <button onClick={() => showToast('Saved!', 'success')}>
      Save
    </button>
  );
}
```

### All Toast Types
```typescript
const { showToast } = useToast();

// Success - Green
showToast('Operation completed successfully!', 'success');

// Error - Red
showToast('An error occurred. Please try again.', 'error');

// Warning - Orange
showToast('This action cannot be undone.', 'warning');

// Info - Blue
showToast('New update available for download.', 'info');
```

### Custom Duration
```typescript
// Quick notification (2 seconds)
showToast('Quick message', 'info', 2000);

// Standard (default 4 seconds)
showToast('Standard message', 'success');

// Long message (6 seconds)
showToast('Long message that needs more time to read', 'warning', 6000);

// Very long message (8 seconds)
showToast('This is a detailed message that contains important information...', 'error', 8000);
```

### Use Cases

#### Lesson Creation
```typescript
function CreateLessonForm() {
  const { showToast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast('Lesson created successfully!', 'success');
        // Clear form, redirect, etc.
      } else {
        showToast('Failed to create lesson', 'error');
      }
    } catch (error) {
      showToast('Network error. Please check your connection.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

#### Form Validation
```typescript
function StudentForm() {
  const { showToast } = useToast();

  const validateForm = (data) => {
    if (!data.name) {
      showToast('Name is required', 'warning');
      return false;
    }
    if (!data.email) {
      showToast('Email is required', 'warning');
      return false;
    }
    if (!isValidEmail(data.email)) {
      showToast('Invalid email format', 'error');
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      validateForm(data);
    }}>
      {/* Form fields */}
    </form>
  );
}
```

#### Data Import
```typescript
function ImportStudents() {
  const { showToast } = useToast();

  const handleImport = async (file) => {
    try {
      showToast('Importing students...', 'info');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/import/students', {
        method: 'POST',
        body: formData
      });

      const { success, count, errors } = await response.json();

      if (success) {
        showToast(`Successfully imported ${count} students!`, 'success');
      } else {
        showToast(`Import failed: ${errors[0]}`, 'error');
      }
    } catch (error) {
      showToast('Import failed. Please try again.', 'error');
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => handleImport(e.target.files[0])}
    />
  );
}
```

#### Delete Confirmation
```typescript
function DeleteButton({ itemId, onDelete }) {
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showToast('Item deleted successfully', 'success');
        onDelete(itemId);
      } else {
        showToast('Failed to delete item', 'error');
      }
    } catch (error) {
      showToast('Error deleting item', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

---

## Floating Action Button

### Basic Setup (Already in Dashboard)
```typescript
import FloatingActionButton from '../components/FloatingActionButton';
import { useToast } from '../components/ToastProvider';

function Dashboard() {
  const { showToast } = useToast();

  const fabActions = [
    {
      id: 'lesson',
      label: 'Create Lesson',
      icon: '✏️',
      color: 'primary' as const,
      action: () => {
        // Handle action
        showToast('Create Lesson feature coming soon', 'info');
      }
    },
    // More actions...
  ];

  return (
    <div>
      <FloatingActionButton actions={fabActions} />
    </div>
  );
}
```

### Custom FAB in Different Pages

#### In Lessons Page
```typescript
import FloatingActionButton from '../components/FloatingActionButton';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';

function LessonsPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fabActions = [
    {
      id: 'create',
      label: 'Create Lesson',
      icon: '📝',
      color: 'primary' as const,
      action: () => {
        navigate('/teacher/create-lesson');
        showToast('Create a new lesson', 'info');
      }
    },
    {
      id: 'upload',
      label: 'Upload Material',
      icon: '📤',
      color: 'secondary' as const,
      action: () => {
        // Open upload dialog
        showToast('Upload feature coming soon', 'info');
      }
    },
    {
      id: 'duplicate',
      label: 'Duplicate Lesson',
      icon: '📋',
      color: 'success' as const,
      action: () => {
        showToast('Select a lesson to duplicate', 'warning');
      }
    },
    {
      id: 'filter',
      label: 'Filter Lessons',
      icon: '🔍',
      color: 'warning' as const,
      action: () => {
        // Open filter menu
        showToast('Filter menu opening', 'info');
      }
    }
  ];

  return (
    <div>
      <h1>Lessons</h1>
      {/* Lessons list */}
      <FloatingActionButton actions={fabActions} />
    </div>
  );
}
```

#### In Tests Page
```typescript
function TestsPage() {
  const { showToast } = useToast();
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const fabActions = [
    {
      id: 'create',
      label: 'Create Test',
      icon: '✏️',
      color: 'primary' as const,
      action: () => showToast('Create test dialog opening', 'info')
    },
    {
      id: 'grade',
      label: 'Grade Tests',
      icon: '⭐',
      color: 'success' as const,
      action: () => {
        if (selectedTest) {
          showToast('Opening grading interface', 'info');
        } else {
          showToast('Select a test to grade', 'warning');
        }
      }
    },
    {
      id: 'analyze',
      label: 'View Analytics',
      icon: '📊',
      color: 'secondary' as const,
      action: () => showToast('Analytics page loading', 'info')
    },
    {
      id: 'export',
      label: 'Export Results',
      icon: '📥',
      color: 'warning' as const,
      action: () => showToast('Exporting test results...', 'info')
    }
  ];

  return (
    <div>
      <h1>Tests</h1>
      {/* Tests list with selection */}
      <FloatingActionButton actions={fabActions} />
    </div>
  );
}
```

### Dynamic FAB Actions
```typescript
function AdaptiveComponent() {
  const { showToast } = useToast();
  const [mode, setMode] = useState('view'); // view, edit

  const fabActions = mode === 'view' 
    ? [
        {
          id: 'edit',
          label: 'Edit',
          icon: '✏️',
          color: 'primary' as const,
          action: () => setMode('edit')
        },
        {
          id: 'delete',
          label: 'Delete',
          icon: '🗑️',
          color: 'warning' as const,
          action: () => showToast('Delete confirmation needed', 'warning')
        }
      ]
    : [
        {
          id: 'save',
          label: 'Save',
          icon: '💾',
          color: 'success' as const,
          action: () => {
            setMode('view');
            showToast('Changes saved!', 'success');
          }
        },
        {
          id: 'cancel',
          label: 'Cancel',
          icon: '❌',
          color: 'error' as const,
          action: () => setMode('view')
        }
      ];

  return (
    <div>
      <FloatingActionButton actions={fabActions} />
    </div>
  );
}
```

---

## Header Components

### Using Header (Already Integrated)
The Header component is automatically included in the Layout:

```typescript
// In Layout.tsx - Already implemented
import Header from './Header';

<Header onMenuToggle={toggleSidebar} />
```

### Search Integration
```typescript
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Search is handled in Header component
  // You can listen for search changes via custom hook
  
  useEffect(() => {
    if (query.length > 2) {
      // Perform search
      searchAPI(query).then(setResults);
    }
  }, [query]);

  return (
    <div>
      {results.map(result => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
}
```

---

## Advanced Usage

### Chaining Notifications
```typescript
async function processMultipleItems(items) {
  const { showToast } = useToast();

  for (const item of items) {
    try {
      await processItem(item);
      showToast(`Processed: ${item.name}`, 'success', 2000);
    } catch (error) {
      showToast(`Failed: ${item.name}`, 'error', 3000);
      break; // Stop on first error
    }
  }

  showToast('All items processed!', 'success');
}
```

### Async Operation with Toast
```typescript
async function downloadReport() {
  const { showToast } = useToast();

  showToast('Preparing report...', 'info');

  try {
    const response = await fetch('/api/report/generate', {
      method: 'POST'
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.pdf';
      link.click();

      showToast('Report downloaded successfully!', 'success');
    } else {
      showToast('Failed to generate report', 'error');
    }
  } catch (error) {
    showToast('Error downloading report', 'error');
  }
}
```

### Conditional Actions
```typescript
function ActionButton() {
  const { showToast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);

  const handleAction = () => {
    if (!hasChanges) {
      showToast('No changes to save', 'info');
      return;
    }

    // Perform action
    showToast('Changes saved!', 'success');
    setHasChanges(false);
  };

  return (
    <button onClick={handleAction}>
      Save
    </button>
  );
}
```

### Toast with Loading
```typescript
function UploadFile() {
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    setIsUploading(true);
    showToast('Uploading file...', 'info');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showToast('File uploaded successfully!', 'success');
      } else {
        showToast('Upload failed', 'error');
      }
    } catch (error) {
      showToast('Upload error: ' + error.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => handleUpload(e.target.files[0])}
      disabled={isUploading}
    />
  );
}
```

### Bulk Operations with Progress
```typescript
function BulkGradeTests() {
  const { showToast } = useToast();
  const [progress, setProgress] = useState(0);

  const gradeAllTests = async (tests) => {
    const total = tests.length;

    for (let i = 0; i < total; i++) {
      try {
        await gradeTest(tests[i]);
        const percent = Math.round(((i + 1) / total) * 100);
        setProgress(percent);

        if ((i + 1) % 5 === 0) {
          showToast(`Graded ${i + 1}/${total} tests`, 'info');
        }
      } catch (error) {
        showToast(`Error grading test ${i + 1}`, 'error');
        break;
      }
    }

    showToast('All tests graded successfully!', 'success');
  };

  return (
    <div>
      <button onClick={() => gradeAllTests(tests)}>
        Grade All
      </button>
      {progress > 0 && <progress value={progress} max={100} />}
    </div>
  );
}
```

---

## Best Practices

### DO ✅
- Use clear, concise messages
- Choose the right toast type
- Provide actionable feedback
- Clean up on unmount
- Use keyboard shortcuts where possible

### DON'T ❌
- Show multiple toasts at once (max 3)
- Use overly long messages
- Make toasts too brief for long content
- Interrupt user with notifications
- Show the same toast repeatedly

---

**Implementation Guide Version**: 1.0.0
**Last Updated**: December 27, 2025
