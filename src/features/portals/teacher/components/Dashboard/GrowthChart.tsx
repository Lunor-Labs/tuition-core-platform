
import React, { useEffect, useRef } from 'react';
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
  { name: 'Jan', value: 80 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 110 },
  { name: 'Apr', value: 105 },
  { name: 'May', value: 125 },
  { name: 'Jun', value: 145 },
  { name: 'Jul', value: 170 },
  { name: 'Aug', value: 190 },
];

export const GrowthChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  useEffect(() => {
    // Diagnostic: verify component mounts and data and container size
    // Remove or change to proper logging in production
    // eslint-disable-next-line no-console
    console.log('GrowthChart mounted — data length:', data.length, data);

    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // eslint-disable-next-line no-console
        console.log('GrowthChart container rect:', rect);
        if (rect.width > 0) {
          setContainerWidth(Math.floor(rect.width));
          // trigger a resize event so Recharts recalculates if needed
          window.dispatchEvent(new Event('resize'));
        }
      }
    };

    measure();

    let ro: ResizeObserver | null = null;
    if ((window as any).ResizeObserver && containerRef.current) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = Math.floor(entry.contentRect.width);
          // eslint-disable-next-line no-console
          console.log('GrowthChart resize observed width:', w);
          setContainerWidth(w);
        }
      });
      ro.observe(containerRef.current);
    } else {
      const onResize = () => measure();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-soft flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Student Growth</h3>
          <p className="text-xs text-slate-400">Yearly intake analytics</p>
        </div>
        <div className="flex gap-2 bg-slate-50 p-1 rounded-full">
          <button className="px-5 py-1.5 text-xs font-semibold rounded-full bg-teal-sidebar text-white shadow-sm transition-all">Year</button>
          <button className="px-5 py-1.5 text-xs font-semibold rounded-full text-slate-400 hover:bg-white hover:text-slate-600 transition-all">Month</button>
        </div>
      </div>
      
      <div ref={containerRef} className="flex-1 w-full min-h-[300px]" style={{ minHeight: 300, minWidth: 0, border: '1px dashed rgba(14,116,144,0.06)' }}>
        {/* Use an explicit numeric height so Recharts can calculate dimensions reliably */}
        {containerWidth > 0 ? (
          <ResponsiveContainer width={containerWidth} height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0e7490" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0e7490" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={[0, 250]}
              ticks={[0, 50, 100, 150, 200]}
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
              fill="url(#colorValue)" 
              dot={{ r: 6, fill: '#fff', stroke: '#0e7490', strokeWidth: 3 }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        ) : (
          <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="text-slate-400">Loading chart…</span>
          </div>
        )}
      </div>
    </div>
  );
};
