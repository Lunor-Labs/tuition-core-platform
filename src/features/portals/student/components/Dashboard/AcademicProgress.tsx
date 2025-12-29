import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 75 },
  { name: 'Feb', value: 82 },
  { name: 'Mar', value: 88 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 92 },
  { name: 'Jun', value: 95 },
  { name: 'Jul', value: 98 },
];

export const AcademicProgress: React.FC = () => {
  const [timeframe, setTimeframe] = React.useState('term');

  return (
    <div className="bg-white h-96 overflow-hidden rounded-[32px] shadow-soft">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Academic Progress</h3>
            <p className="text-xs text-slate-400">Test performance analytics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe('term')}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                timeframe === 'term'
                  ? 'bg-teal-sidebar text-white shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              Term
            </button>
            <button
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                timeframe === 'year'
                  ? 'bg-teal-sidebar text-white shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="w-full" style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 40, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0e7490" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0e7490" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0e7490" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorProgress)" 
                dot={{ r: 6, fill: '#fff', stroke: '#0e7490', strokeWidth: 3 }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};



