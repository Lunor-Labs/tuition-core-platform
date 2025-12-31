import React from 'react';
import type { Assignment } from '../../types';
import { AssignmentStatus } from '../../types';

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
  const isCompleted = assignment.status === AssignmentStatus.COMPLETED;

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-soft flex flex-col md:flex-row gap-6 relative group transition-transform hover:-translate-y-1 ${isCompleted ? 'opacity-80' : ''}`}>
      <div className={`w-full md:w-32 h-32 md:h-auto ${assignment.accentColor} rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden`}>
        <span className={`material-symbols-outlined text-4xl z-10 ${!isCompleted ? 'icon-filled' : ''}`}>
          {assignment.icon}
        </span>
        <div className="absolute -right-4 -bottom-4 size-16 rounded-full bg-white/40"></div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
              {assignment.subject}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
              assignment.type === 'MCQ' ? 'bg-orange-50 text-orange-600' :
              assignment.type === 'Mock Exam' ? 'bg-blue-50 text-blue-600' :
              'bg-purple-50 text-purple-600'
            }`}>
              {assignment.type}
            </span>
          </div>
          <button className="text-slate-400 hover:text-teal-sidebar transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1">{assignment.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{assignment.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            {assignment.submissions && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                {assignment.submissions} Submitted
              </div>
            )}
            {assignment.duration && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">timer</span>
                {assignment.duration}
              </div>
            )}
            {assignment.date && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                {assignment.date}
              </div>
            )}
            {assignment.time && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {assignment.time}
              </div>
            )}
            {assignment.avgScore && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">analytics</span>
                Avg. Score: {assignment.avgScore}
              </div>
            )}
            {assignment.participants && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">group</span>
                {assignment.participants} Participants
              </div>
            )}
          </div>

          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            assignment.status === AssignmentStatus.ACTIVE ? 'text-green-600 bg-green-50' :
            assignment.status === AssignmentStatus.SCHEDULED ? 'text-blue-600 bg-blue-50' :
            'text-slate-500 bg-slate-100'
          }`}>
            <span className="material-symbols-outlined text-sm icon-filled">
              {assignment.status === AssignmentStatus.ACTIVE ? 'fiber_manual_record' :
               assignment.status === AssignmentStatus.SCHEDULED ? 'event' : 'done_all'}
            </span>
            {assignment.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
