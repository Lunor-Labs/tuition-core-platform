import React from 'react';
import type { MarketCourse } from '../../types';

interface MarketCardProps {
  course: MarketCourse;
}

const MarketCard: React.FC<MarketCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`size-12 rounded-2xl ${course.iconBgClass} flex items-center justify-center ${course.iconColorClass}`}>
          <span className="material-symbols-outlined">{course.icon}</span>
        </div>
        {course.isHot && (
          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wide rounded">Hot</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{course.title}</h3>
      <p className="text-xs text-slate-400 mb-3 font-medium">{course.startDate}</p>
      <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-1">{course.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
        <span className="text-lg font-bold text-slate-800">{course.price}</span>
        <button className="px-5 py-2 rounded-xl bg-teal-sidebar text-white font-medium text-sm hover:bg-teal-dark shadow-lg shadow-teal-900/20 transition-all active:scale-95">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default MarketCard;
