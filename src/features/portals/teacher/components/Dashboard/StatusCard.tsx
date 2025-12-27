
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 70 },
  { name: 'Remaining', value: 30 },
];

const COLORS = ['#ffffff', 'rgba(255, 255, 255, 0.3)'];

export const StatusCard: React.FC = () => {
  return (
    <div className="bg-accent-orange rounded-3xl p-6 shadow-soft flex flex-col relative overflow-hidden h-full min-h-[400px]">
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">Class Status</h3>
          <p className="text-xs text-orange-100">Overview of academic progress</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">70%</span>
              <span className="text-[10px] text-orange-100 uppercase tracking-widest font-bold">Complete</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 transition-transform hover:scale-105">
            <span className="block text-3xl font-bold text-white mb-0.5">80</span>
            <span className="text-[10px] text-orange-50 font-semibold uppercase tracking-wider">Total Classes</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 transition-transform hover:scale-105">
            <span className="block text-3xl font-bold text-white mb-0.5">56</span>
            <span className="text-[10px] text-orange-50 font-semibold uppercase tracking-wider">Completed</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-12 -right-12 size-48 bg-white/10 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-1/3 -left-8 size-24 bg-white/10 rounded-full blur-xl z-0"></div>
    </div>
  );
};
