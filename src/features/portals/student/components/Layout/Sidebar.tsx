import React from 'react';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-[10px] rounded-full transition-all group w-full text-left focus:outline-none ${
      active 
        ? 'bg-white text-teal-sidebar shadow-md' 
        : 'text-teal-100 bg-white/10 hover:text-white'
    }`}
  >
    <span className="material-symbols-outlined text-[28px]">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen = false, onClose }) => {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'courses', icon: 'menu_book', label: 'My Courses' },
    { id: 'schedule', icon: 'calendar_month', label: 'Schedule' },
    { id: 'assignments', icon: 'assignment', label: 'Assignments' },
    { id: 'results', icon: 'show_chart', label: 'Results' },
  ];

  return (
    <>
      {/* Overlay for mobile when open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={onClose} aria-hidden="true"></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:static md:translate-x-0 md:z-20 bg-teal-sidebar text-white shadow-xl h-full`}
        aria-hidden={!isOpen && typeof window !== 'undefined' && window.innerWidth < 768}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-4 md:px-8 justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl scale-y-[-1]">local_library</span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold">EduPortal</span>
              <span className="text-xs text-teal-100 font-light">Student</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="md:hidden size-10 rounded-full bg-white/20 text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4 px-4 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => {
                onTabChange(item.id);
                if (onClose) onClose();
              }}
            />
          ))}
        </nav>

        {/* Bottom Actions */}
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
    </>
  );
};



