
import React from 'react';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-transparent shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
          className="md:hidden size-10 rounded-full bg-white flex items-center justify-center text-slate-500 hover:text-teal-sidebar shadow-sm transition-colors mr-2"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white rounded-full h-10 w-64 px-4 shadow-sm border border-slate-100">
          <input 
            aria-label="Search"
            className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-700 placeholder-slate-400" 
            placeholder="Search course, student..." 
            type="text"
          />
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="size-10 rounded-full bg-white flex items-center justify-center text-slate-500 hover:text-teal-sidebar shadow-sm transition-colors relative group">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-400 rounded-full border border-white"></span>
          </button>
          
          <button aria-label="Messages" className="size-10 rounded-full bg-white flex items-center justify-center text-slate-500 hover:text-teal-sidebar shadow-sm transition-colors">
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          </button>
          
          <div role="button" aria-label="Profile" className="size-10 rounded-full bg-cover bg-center ring-2 ring-white shadow-sm ml-2 cursor-pointer transition-transform hover:scale-105" 
               style={{ backgroundImage: 'url("https://picsum.photos/seed/teacher/100/100")' }}>
          </div>
        </div>
      </div>
    </header>
  );
};


