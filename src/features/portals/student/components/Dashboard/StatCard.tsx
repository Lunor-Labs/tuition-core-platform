import React from 'react';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  badge?: string;
  variant: 'purple' | 'blue' | 'green' | 'yellow';
}

const variants = {
  purple: 'bg-[#dcd6f7]',
  blue: 'bg-[#dbeafe]',
  green: 'bg-[#d4e4d8]',
  yellow: 'bg-[#fbeeb8]',
};

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, badge, variant }) => {
  return (
    <div className={`${variants[variant]} flex flex-col h-36 justify-between overflow-hidden p-6 rounded-3xl shadow-soft relative`}>
      {/* Decorative Circle */}
      <div className="absolute bg-white/20 bottom-[-16px] right-[-16px] rounded-full size-24"></div>
      
      {/* Top Section */}
      <div className="flex items-start justify-between relative z-10">
        <div className="bg-white/40 flex items-center justify-center rounded-full size-10">
          <span className="material-symbols-outlined text-[20px] text-slate-700">{icon}</span>
        </div>
        {badge && (
          <div className="bg-white/30 px-2 py-1 rounded-full">
            <span className="text-xs font-semibold text-slate-700">{badge}</span>
          </div>
        )}
      </div>
      
      {/* Bottom Section */}
      <div className="flex flex-col relative z-10">
        <h3 className="text-3xl font-bold text-slate-800 leading-9">{value}</h3>
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
    </div>
  );
};






