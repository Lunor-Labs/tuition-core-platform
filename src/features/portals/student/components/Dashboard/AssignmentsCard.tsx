import React from 'react';

export const AssignmentsCard: React.FC = () => {
  return (
    <div className="bg-[#f39578] flex flex-col h-96 justify-center overflow-hidden p-6 rounded-[32px] shadow-soft relative">
      {/* Decorative Circles */}
      <div className="absolute bg-white/10 right-[-48px] rounded-full size-48 top-[-48px]"></div>
      <div className="absolute bg-white/10 bottom-[41.67%] left-[-32px] rounded-full top-[33.33%] w-24 h-24"></div>
      
      <div className="flex flex-1 flex-col justify-between relative z-10">
        {/* Header */}
        <div className="pb-4">
          <h3 className="text-xl font-bold text-white">Assignments</h3>
          <p className="text-xs text-[#ffedd5]">Overview of submission status</p>
        </div>
        
        {/* Center Circle */}
        <div className="flex-1 flex items-center justify-center pb-9 pt-3">
          <div className="bg-white/0 flex items-center justify-center rounded-full shadow-lg size-[140px]">
            <div className="bg-[#f39578] flex flex-col items-center justify-center rounded-[55px] size-[110px]">
              <span className="text-3xl font-bold text-white leading-9">85%</span>
              <span className="text-[10px] text-[#ffedd5] uppercase tracking-[0.5px] leading-[15px]">Completion</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="flex gap-4 justify-center">
          <div className="backdrop-blur-[2px] bg-white/20 flex flex-1 flex-col gap-[3.5px] items-center p-4 rounded-2xl">
            <span className="text-3xl font-bold text-white leading-9">3</span>
            <span className="text-xs font-medium text-[#fff7ed]">Pending Count</span>
          </div>
          <div className="backdrop-blur-[2px] bg-white/20 flex flex-1 flex-col gap-[3.5px] items-center p-4 rounded-2xl">
            <span className="text-3xl font-bold text-white leading-9">12</span>
            <span className="text-xs font-medium text-[#fff7ed]">Submitted (Mo.)</span>
          </div>
        </div>
      </div>
    </div>
  );
};





