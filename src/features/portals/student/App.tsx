import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { StatCard } from './components/Dashboard/StatCard';
import { AcademicProgress } from './components/Dashboard/AcademicProgress';
import { AssignmentsCard } from './components/Dashboard/AssignmentsCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="school"
          value="5"
          label="Courses Enrolled"
          badge="Active"
          variant="purple"
        />
        <StatCard
          icon="check_circle"
          value="92%"
          label="Attendance Rate"
          badge="Overall"
          variant="blue"
        />
        <StatCard
          icon="trending_up"
          value="88%"
          label="Avg Score"
          variant="green"
        />
        <StatCard
          icon="play_circle"
          value="24"
          label="Sessions Watched"
          badge="Total"
          variant="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AcademicProgress />
        </div>
        <div className="xl:col-span-1">
          <AssignmentsCard />
        </div>
      </div>
    </div>
  );

  const renderComingSoon = (section: string) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
      <span className="material-symbols-outlined text-6xl mb-4">construction</span>
      <h2 className="text-xl font-bold text-slate-600">This section is coming soon!</h2>
      <p>We are currently working on the {section} view.</p>
      <button
        onClick={() => setActiveTab('dashboard')}
        className="mt-6 px-6 py-2 bg-teal-sidebar text-white rounded-full font-medium"
      >
        Back to Dashboard
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'courses':
      case 'schedule':
      case 'assignments':
      case 'results':
        return renderComingSoon(activeTab);
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fff7ed]">
        <Header onMobileMenuToggle={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-8 lg:px-[192px] py-8">
          <div className="max-w-[1280px] mx-auto w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

