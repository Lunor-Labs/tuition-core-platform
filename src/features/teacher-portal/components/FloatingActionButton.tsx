import React, { useState } from 'react';
import './FloatingActionButton.css';

interface FABAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

interface FloatingActionButtonProps {
  actions: FABAction[];
  mainIcon?: React.ReactNode;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  actions, 
  mainIcon = '+'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (action: FABAction) => {
    action.action();
    setIsOpen(false);
  };

  return (
    <div className={`fab-container ${isOpen ? 'open' : ''}`}>
      {/* FAB Actions */}
      {actions.map((action, index) => (
        <button
          key={action.id}
          className={`fab-action fab-action-${action.color || 'primary'}`}
          onClick={() => handleActionClick(action)}
          title={action.label}
          style={{
            animationDelay: isOpen ? `${index * 50}ms` : 'unset'
          }}
        >
          <span className="fab-action-icon">{action.icon}</span>
        </button>
      ))}

      {/* Main FAB Button */}
      <button
        className="fab-main"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="More actions"
      >
        <span className={`fab-main-icon ${isOpen ? 'rotate' : ''}`}>
          {mainIcon}
        </span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fab-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default FloatingActionButton;
