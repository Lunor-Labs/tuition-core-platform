import React from 'react';
import type { StudyPack } from '../../types';

interface StudyPackCardProps {
  pack: StudyPack;
}

const StudyPackCard: React.FC<StudyPackCardProps> = ({ pack }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group h-full border border-slate-100">
      {/* Decorative Blob */}
      <div className={`absolute -right-12 -top-12 size-40 rounded-full group-hover:scale-110 transition-transform duration-500 opacity-10 ${pack.iconBgColor}`}></div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`size-12 rounded-2xl ${pack.iconBgColor} flex items-center justify-center ${pack.accentColor}`}>
          <span className="material-symbols-outlined">{pack.icon}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${pack.iconBgColor.replace('bg-', 'bg-').replace('/20', '')} ${pack.accentColor} bg-white/50 border-slate-100`}>
          {pack.category}
        </span>
      </div>

      <h3 className="relative z-10 text-lg font-bold text-slate-800 mb-2 leading-tight">
        {pack.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4 font-normal leading-relaxed">
        {pack.description}
      </p>

      <div className="mt-auto relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {pack.lessonsCount && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">videocam</span> {pack.lessonsCount} Lessons
            </span>
          )}
          {pack.pdfCount && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">description</span> {pack.pdfCount} PDFs
            </span>
          )}
          {pack.videoDuration && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">timer</span> {pack.videoDuration}
            </span>
          )}
          {pack.hasQuiz && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">quiz</span> Quiz
            </span>
          )}
          {pack.hasCode && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">code</span> Code
            </span>
          )}
          {pack.hasDiagrams && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">image</span> Diagrams
            </span>
          )}
          {pack.hasTheory && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">menu_book</span> Theory
            </span>
          )}
          {pack.hasExercises && (
            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">edit_note</span> Exercises
            </span>
          )}
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400 font-medium mb-0.5">Price</p>
            <p className="text-2xl font-bold text-slate-800">
              {pack.currency} {pack.price.toLocaleString()}
            </p>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-teal-sidebar text-white font-semibold text-sm hover:bg-teal-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10">
          Purchase Pack
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
        </button>
      </div>
    </div>
  );
};

export default StudyPackCard;
