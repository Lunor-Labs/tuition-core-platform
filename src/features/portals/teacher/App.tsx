
import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { StatCard } from './components/Dashboard/StatCard';
import { GrowthChart } from './components/Dashboard/GrowthChart';
import { StatusCard } from './components/Dashboard/StatusCard';
import { ActionGrid } from './components/Dashboard/ActionGrid';
import ClassCard from './components/MyClasses/ClassCard';
import CreateClassForm from './components/MyClasses/CreateClassForm';
import { INITIAL_CLASSES } from './constants';
import type { ClassItem } from './types';
import { ClassStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [sortBy, setSortBy] = useState('Newest First');

  const handlePublishClass = (formData: any) => {
    const newClass: ClassItem = {
      id: Date.now().toString(),
      name: formData.name || 'New Class',
      description: formData.description || 'No description provided.',
      subject: 'New Subject',
      batch: '2025',
      studentsCount: 0,
      schedule: 'TBD',
      status: ClassStatus.ACTIVE,
      icon: 'school',
      colorScheme: 'purple'
    };
    setClasses(prev => [newClass, ...prev]);
    alert(`Class "${newClass.name}" published successfully!`);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="142"
          badge="+12%"
          icon="groups"
          variant="purple"
        />
        <StatCard
          title="New Comers"
          value="18"
          badge="This Month"
          icon="person_add"
          variant="blue"
        />
        <StatCard
          title="Total Fee Collection"
          value="LKR 45,231"
          icon="account_balance"
          variant="green"
        />
        <StatCard
          title="Month Collection"
          value="LKR 3,405"
          badge="Feb"
          icon="payments"
          variant="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <GrowthChart />
        </div>
        <div className="xl:col-span-1">
          <StatusCard />
        </div>
      </div>

      {/* Action Section */}
      <ActionGrid />
    </div>
  );

  const renderMyClasses = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      {/* Classes List */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Active Classes</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border-none bg-white rounded-lg py-1 pl-3 pr-8 shadow-sm focus:ring-2 focus:ring-teal-sidebar/20 text-slate-700 font-medium cursor-pointer"
            >
              <option>Newest First</option>
              <option>Name A-Z</option>
              <option>Most Students</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {classes.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
          {classes.length === 0 && (
            <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center text-center text-slate-400 border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <p>No classes found. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Form - Sidebar Right */}
      <div className="xl:col-span-1">
        <CreateClassForm onPublish={handlePublishClass} />
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
      case 'classes':
        return renderMyClasses();
      case 'schedule':
      case 'assignments':
      case 'payroll':
        return renderComingSoon(activeTab);
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
