import React from 'react';
import AssignmentCard from './AssignmentCard';
import type { Assignment } from '../../types';

const pendingAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Thermodynamics Quiz',
    course: 'A/L 2026 Physics Theory',
    type: 'quiz',
    status: 'due-today',
    dueDate: 'Oct 24, 2024',
    timeLeft: 'Expires in 4 hours'
  },
  {
    id: '2',
    title: 'Organic Chemistry Essay',
    course: 'A/L 2025 Chemistry Revision',
    type: 'essay',
    status: 'due-tomorrow',
    dueDate: 'Oct 25, 11:59 PM'
  },
  {
    id: '3',
    title: 'Calculus Practice Set 3',
    course: 'Combined Maths - Pure',
    type: 'practice',
    status: 'upcoming',
    dueDate: 'Oct 28, 2024'
  }
];

const completedAssignments: Assignment[] = [
  {
    id: 'c1',
    title: 'Weekly Biology Quiz',
    course: 'Biology 2026 Theory',
    type: 'quiz',
    status: 'graded',
    dueDate: 'Oct 20, 2024',
    score: 92,
    maxScore: 100
  },
  {
    id: 'c2',
    title: 'Python Basics Project',
    course: 'ICT for A/L 2026',
    type: 'project',
    status: 'graded',
    dueDate: 'Oct 18, 2024',
    score: 85,
    maxScore: 100
  },
  {
    id: 'c3',
    title: 'Modern History Essay',
    course: 'History of Arts',
    type: 'essay',
    status: 'pending-grade',
    dueDate: 'Oct 15, 2024'
  },
  {
    id: 'c4',
    title: 'Physics Mechanics Quiz',
    course: 'Physics 2026 Theory',
    type: 'quiz',
    status: 'graded',
    dueDate: 'Oct 10, 2024',
    score: 100,
    maxScore: 100
  }
];

const AssignmentsView: React.FC = () => {
  return (
    <div className="space-y-10 pb-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-sidebar icon-filled">pending_actions</span>
            Pending & Upcoming
          </h2>
          <span className="text-xs font-medium bg-red-50 text-red-600 px-3 py-1 rounded-full shadow-sm border border-red-100">2 Due Soon</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingAssignments.map(a => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-sidebar icon-filled">task_alt</span>
            Completed Assignments
          </h2>
          <button className="text-sm font-medium text-teal-sidebar hover:text-teal-dark flex items-center gap-1">
            View all history
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {completedAssignments.map(a => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AssignmentsView;
