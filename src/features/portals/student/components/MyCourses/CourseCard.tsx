import React from 'react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group h-full">
      <div className={`absolute -right-8 -top-8 size-32 ${course.accentClass} rounded-full group-hover:scale-110 transition-transform duration-500`}></div>
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`size-12 rounded-2xl ${course.iconBgClass} flex items-center justify-center`}>
          <span className="material-symbols-outlined">{course.icon}</span>
        </div>
        <span className={`px-3 py-1 ${course.tagBgClass} text-xs font-semibold rounded-full border`}>
          {course.tag}
        </span>
      </div>
      <h3 className="relative z-10 text-lg font-bold text-slate-800 mb-2">{course.title}</h3>
      <p className="relative z-10 text-sm text-slate-500 mb-6 flex-1 line-clamp-2">{course.description}</p>
      <div className="relative z-10 mt-auto pt-4 border-t border-slate-50">
        <button className={`w-full py-2.5 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm ${course.hoverBtnClass} hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg`}>
          View Course
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
