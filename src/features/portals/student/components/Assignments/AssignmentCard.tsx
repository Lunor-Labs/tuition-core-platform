import React from 'react';
import type { Assignment } from '../../types';

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const isPending = ['due-today', 'due-tomorrow', 'upcoming'].includes(assignment.status);

  const getStatusConfig = () => {
    switch (assignment.status) {
      case 'due-today':
        return { label: 'Due Today', color: 'red', icon: 'timer', bgClass: 'accent-red' };
      case 'due-tomorrow':
        return { label: 'Due Tomorrow', color: 'orange', icon: 'upload_file', bgClass: 'accent-orange' };
      case 'upcoming':
        return { label: 'Upcoming', color: 'blue', icon: 'edit_document', bgClass: 'accent-blue' };
      case 'graded':
        return { label: 'Graded', color: 'green', icon: 'check_circle', bgClass: 'accent-green-bg' };
      case 'pending-grade':
        return { label: 'Pending Grade', color: 'gray', icon: 'hourglass_top', bgClass: 'bg-gray-100' };
      default:
        return { label: 'Status', color: 'slate', icon: 'help', bgClass: 'bg-slate-100' };
    }
  };

  const config = getStatusConfig();

  if (isPending) {
    const borderClass = {
      red: 'border-l-red-400',
      orange: 'border-l-orange-400',
      blue: 'border-l-blue-400'
    }[config.color as 'red' | 'orange' | 'blue'];

    const iconColorClass = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      blue: 'text-teal-sidebar'
    }[config.color as 'red' | 'orange' | 'blue'];

    const btnClass = assignment.status === 'due-today'
      ? 'bg-teal-sidebar text-white hover:bg-teal-dark shadow-lg shadow-teal-900/10'
      : 'bg-slate-50 text-slate-700 hover:bg-slate-100';

    return (
      <div className={`bg-white rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group h-full border-l-4 ${borderClass}`}>
        <div className={`absolute -right-8 -top-8 size-32 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500`} style={{ backgroundColor: `var(--tw-color-${config.color}-500)` }}></div>

        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className={`size-12 rounded-2xl flex items-center justify-center ${iconColorClass}`} style={{ backgroundColor: `rgba(var(--tw-color-${config.color}-500), 0.2)` }}>
            <span className="material-symbols-outlined">{config.icon}</span>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border bg-${config.color}-50 text-${config.color}-700 border-${config.color}-100`}>
            {config.label}
          </span>
        </div>

        <h3 className="relative z-10 text-lg font-bold text-slate-800 mb-1">{assignment.title}</h3>
        <p className="text-xs text-slate-500 mb-2 font-medium relative z-10">{assignment.course}</p>

        <div className="flex items-center gap-2 mb-6 relative z-10">
          <span className="material-symbols-outlined text-slate-400 text-sm">
            {assignment.timeLeft ? 'schedule' : 'event'}
          </span>
          <span className="text-sm text-slate-500">{assignment.timeLeft || `Due: ${assignment.dueDate}`}</span>
        </div>

        <div className="relative z-10 mt-auto pt-4 border-t border-slate-50">
          <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${btnClass}`}>
            {assignment.type === 'quiz' ? 'Start Quiz' : assignment.type === 'essay' ? 'Submit Assignment' : 'View Details'}
            <span className="material-symbols-outlined text-lg">
              {assignment.type === 'quiz' ? 'play_arrow' : assignment.type === 'essay' ? 'upload' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Completed Card
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-slate-100 relative overflow-hidden">
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`size-12 rounded-2xl flex items-center justify-center ${config.bgClass} ${assignment.status === 'graded' ? 'text-green-700' : 'text-gray-500'}`}>
          <span className="material-symbols-outlined">{config.icon}</span>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
          assignment.status === 'graded'
            ? 'bg-green-50 text-green-700 border-green-100'
            : 'bg-gray-100 text-gray-600 border-gray-200'
        }`}>
          {config.label}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-1 relative z-10">{assignment.title}</h3>
      <p className="text-xs text-slate-400 mb-3 font-medium relative z-10">{assignment.course}</p>

      {assignment.status === 'graded' ? (
        <div className="mb-4 relative z-10">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-500">Score</span>
            <span className="font-bold text-green-600">{assignment.score}/{assignment.maxScore}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(assignment.score! / assignment.maxScore!) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mb-4 relative z-10">
          <p className="text-sm text-slate-500">Submitted on {assignment.dueDate.split(',')[0]}. Waiting for instructor review.</p>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-slate-50 relative z-10">
        <button className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
          {assignment.status === 'graded' ? 'View Results' : 'View Submission'}
          <span className="material-symbols-outlined text-base">
            {assignment.status === 'graded' ? 'visibility' : 'description'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
