import React from 'react';
import type { StudyPack } from '../../types';

interface StudyPackCardProps {
  pack: StudyPack;
}

const StudyPackCard: React.FC<StudyPackCardProps> = ({ pack }) => {
  const isDraft = pack.status === 'Draft';

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-soft flex flex-col md:flex-row gap-6 relative group transition-transform hover:-translate-y-1 ${isDraft ? 'opacity-80' : ''}`}>
      <div className={`w-full md:w-36 h-36 md:h-auto ${pack.accentColorBg} rounded-2xl flex items-center justify-center ${pack.accentColorIcon} shrink-0 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
        <span className="material-symbols-outlined text-5xl z-10 icon-filled">{pack.icon}</span>
        <div className="absolute -right-4 -bottom-4 size-16 rounded-full bg-white/40"></div>
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
          {typeof pack.price === 'number' ? `$${pack.price.toFixed(2)}` : pack.price}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
              {pack.subject}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
              pack.bundleType === 'Revision' ? 'bg-green-50 text-green-700' :
              pack.bundleType === 'Theory Bundle' ? 'bg-purple-50 text-purple-600' : 'bg-slate-200 text-slate-600'
            }`}>
              {pack.bundleType}
            </span>
          </div>
          <button className="text-slate-400 hover:text-teal-sidebar transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1">{pack.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{pack.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">video_library</span>
              {pack.videosCount} Videos
            </div>
            {pack.salesCount !== undefined ? (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                {pack.salesCount} Sales
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">update</span>
                {pack.lastEdited}
              </div>
            )}
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            isDraft ? 'text-slate-500 bg-slate-100' : 'text-green-600 bg-green-50'
          }`}>
            <span className="material-symbols-outlined text-sm icon-filled">
              {isDraft ? 'edit_note' : 'public'}
            </span>
            {pack.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPackCard;
