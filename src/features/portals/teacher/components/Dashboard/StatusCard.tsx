
import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 70 },
  { name: 'Remaining', value: 30 },
];

const COLORS = ['#ffffff', 'rgba(255, 255, 255, 0.3)'];

export const StatusCard: React.FC = () => {
  const pieRef = useRef<HTMLDivElement | null>(null);
  const [pieSize, setPieSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const measure = () => {
      if (pieRef.current) {
        const rect = pieRef.current.getBoundingClientRect();
        // eslint-disable-next-line no-console
        console.log('StatusCard pie rect:', rect);
        if (rect.width > 0 && rect.height > 0) {
          setPieSize({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
          window.dispatchEvent(new Event('resize'));
        }
      }
    };

    measure();

    let ro: ResizeObserver | null = null;
    if ((window as any).ResizeObserver && pieRef.current) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          // eslint-disable-next-line no-console
          console.log('StatusCard resize observed:', Math.floor(width), Math.floor(height));
          setPieSize({ width: Math.floor(width), height: Math.floor(height) });
        }
      });
      ro.observe(pieRef.current);
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
    <div className="bg-accent-orange rounded-3xl p-6 shadow-soft flex flex-col relative overflow-hidden h-full min-h-[400px]">
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">Class Status</h3>
          <p className="text-xs text-orange-100">Overview of academic progress</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div ref={pieRef} className="w-48 h-48 relative" style={{ minWidth: 0 }}>
            {pieSize.width > 0 && pieSize.height > 0 ? (
              <ResponsiveContainer width={pieSize.width} height={pieSize.height}>
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
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-orange-100">Loading…</span>
              </div>
            )}

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
