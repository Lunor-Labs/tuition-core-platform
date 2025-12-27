
import React from 'react';

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; filled?: boolean }> = ({ icon, label, active, filled }) => (
  <a 
    href="#" 
    className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all group ${
      active 
        ? 'bg-white text-teal-sidebar shadow-md' 
        : 'text-teal-100 hover:bg-white/10 hover:text-white'
    }`}
  >
    <span className={`material-symbols-outlined ${filled ? 'icon-filled' : ''}`}>{icon}</span>
    <span className="font-medium text-sm hidden lg:block">{label}</span>
  </a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-20 lg:w-64 flex-shrink-0 flex flex-col bg-teal-sidebar text-white transition-all duration-300 z-20 shadow-xl">
      <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">local_library</span>
          <div className="hidden lg:flex flex-col leading-tight">
            <span className="text-lg font-bold">EduPortal</span>
            <span className="text-xs text-teal-100 font-light">Academy</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-4 py-4 overflow-y-auto">
        <NavItem icon="dashboard" label="Dashboard" active filled />
        <NavItem icon="school" label="My Classes" />
        <NavItem icon="auto_awesome" label="AI Insights" />
        <NavItem icon="calendar_month" label="Schedule" />
        <NavItem icon="assignment" label="Assignments" />
        <NavItem icon="payments" label="Payroll" />
      </nav>

      <div className="p-6 mt-auto space-y-2">
        <a className="flex items-center gap-4 px-4 py-2 rounded-full text-teal-100 hover:text-white transition-colors text-sm" href="#">
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span className="hidden lg:block">Help</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-2 rounded-full text-teal-100 hover:text-white transition-colors text-sm" href="#">
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="hidden lg:block">Settings</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-2 rounded-full text-teal-100 hover:text-white transition-colors text-sm" href="#">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="hidden lg:block">Log Out</span>
        </a>
      </div>
    </aside>
  );
};
