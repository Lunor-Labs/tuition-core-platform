
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-transparent shrink-0">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, Mr. Amila C 👋</h1>
        <p className="text-xs text-slate-400">Here's your improved dashboard overview</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white rounded-full h-10 w-64 px-4 shadow-sm border border-slate-100">
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-700 placeholder-slate-400" 
            placeholder="Search course, student..." 
            type="text"
          />
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-full bg-white flex items-center justify-center text-slate-500 hover:text-teal-sidebar shadow-sm transition-colors relative group">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-400 rounded-full border border-white"></span>
          </button>
          
          <button className="size-10 rounded-full bg-white flex items-center justify-center text-slate-500 hover:text-teal-sidebar shadow-sm transition-colors">
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          </button>
          
          <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-white shadow-sm ml-2 cursor-pointer transition-transform hover:scale-105" 
               style={{ backgroundImage: 'url("https://picsum.photos/seed/teacher/100/100")' }}>
          </div>
        </div>
      </div>
    </header>
  );
};
