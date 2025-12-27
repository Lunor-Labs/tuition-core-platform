
import React from 'react';

const ActionButton: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 hover:border-teal-sidebar hover:text-teal-sidebar hover:bg-white transition-all group gap-3 bg-slate-50/50">
    <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-2xl">{icon}</span>
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </button>
);

export const ActionGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
      <ActionButton icon="add_circle" label="Create New Class" />
      <ActionButton icon="upload_file" label="Upload Student Data" />
    </div>
  );
};
