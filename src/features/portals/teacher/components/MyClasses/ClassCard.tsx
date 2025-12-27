
import React from 'react';
import type { ClassItem } from '../../types';
import { ClassStatus } from '../../types';

interface ClassCardProps {
  item: ClassItem;
}

const ClassCard: React.FC<ClassCardProps> = ({ item }) => {
  const isPaused = item.status === ClassStatus.PAUSED;

  const colorClasses = {
    purple: {
      bg: 'bg-accent-purple-bg',
      icon: 'text-accent-purple-icon',
      tag: 'bg-purple-50 text-purple-600',
    },
    blue: {
      bg: 'bg-accent-blue-bg',
      icon: 'text-accent-blue-icon',
      tag: 'bg-blue-50 text-blue-600',
    },
    gray: {
      bg: 'bg-slate-100',
      icon: 'text-slate-400',
      tag: 'bg-slate-200 text-slate-600',
    },
  } as const;

  const currentColorClass = colorClasses[item.colorScheme];

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-soft flex flex-col md:flex-row gap-6 relative group transition-all hover:-translate-y-1 hover:shadow-lg ${isPaused ? 'opacity-70 grayscale-[30%]' : ''}`}>
      <div className={`w-full md:w-48 h-32 md:h-auto ${currentColorClass.bg} rounded-2xl flex items-center justify-center ${currentColorClass.icon} shrink-0 relative overflow-hidden`}>
        <span className="material-symbols-outlined text-5xl z-10">{item.icon}</span>
        <div className="absolute -right-4 -bottom-4 size-24 rounded-full bg-white/30"></div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full ${currentColorClass.tag} text-[10px] font-bold uppercase tracking-wide`}>
              {item.subject}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wide">
              {item.batch}
            </span>
          </div>
          <button className="text-slate-400 hover:text-teal-sidebar transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">group</span>
              {item.studentsCount} Students
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {item.schedule}
            </div>
          </div>
          
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === ClassStatus.ACTIVE ? 'text-teal-600 bg-teal-50' : 'text-slate-500 bg-slate-100'
          }`}>
            <span className="material-symbols-outlined text-sm icon-filled">
              {item.status === ClassStatus.ACTIVE ? 'check_circle' : 'pause_circle'}
            </span>
            {item.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
