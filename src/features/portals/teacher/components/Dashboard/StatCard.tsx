
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  badge?: string;
  icon: string;
  variant: 'purple' | 'blue' | 'green' | 'yellow';
}

const variants = {
  purple: 'bg-accent-purple-bg text-accent-purple-icon',
  blue: 'bg-accent-blue-bg text-accent-blue-icon',
  green: 'bg-accent-green-bg text-accent-green-icon',
  yellow: 'bg-accent-yellow-bg text-accent-yellow-icon',
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, badge, icon, variant }) => {
  return (
    <div className={`${variants[variant].split(' ')[0]} rounded-2xl p-6 flex flex-col justify-between h-40 relative overflow-hidden shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg group`}>
      <div className="flex items-start justify-between z-10">
        <div className="size-10 rounded-full bg-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className={`material-symbols-outlined text-xl ${variants[variant].split(' ')[1]}`}>{icon}</span>
        </div>
        {badge && (
          <span className="text-[10px] font-bold px-2.5 py-1 bg-white/40 rounded-full text-slate-700 uppercase tracking-wide">
            {badge}
          </span>
        )}
      </div>
      
      <div className="z-10 mt-auto">
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-slate-600/80">{title}</p>
      </div>
      
      <div className="absolute -right-6 -bottom-6 size-28 rounded-full bg-white/20 group-hover:scale-110 transition-transform"></div>
    </div>
  );
};
