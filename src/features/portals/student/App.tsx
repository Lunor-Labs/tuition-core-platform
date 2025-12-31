import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { StatCard } from './components/Dashboard/StatCard';
import { AcademicProgress } from './components/Dashboard/AcademicProgress';
import { AssignmentsCard } from './components/Dashboard/AssignmentsCard';
import { CourseCard, MarketCard } from './components/MyCourses';
import { AssignmentsView } from './components/Assignments';
import { StudyPacksView } from './components/StudyPacks';
import type { Course, MarketCourse } from './types';

const ENROLLED_COURSES: Course[] = [
  {
    id: '1',
    title: 'A/L 2025 Chemistry Revision',
    description: 'Intensive revision sessions covering Organic Chemistry and Industrial Chemistry units.',
    tag: 'Ongoing',
    icon: 'science',
    accentClass: 'bg-accent-blue/10',
    iconBgClass: 'bg-accent-blue/20 text-teal-sidebar',
    tagBgClass: 'bg-teal-50 text-teal-700 border-teal-100',
    hoverBtnClass: 'hover:bg-teal-sidebar'
  },
  {
    id: '2',
    title: 'Combined Maths - Pure',
    description: 'Deep dive into Calculus and Trigonometry for the 2025 examination series.',
    tag: 'Ongoing',
    icon: 'functions',
    accentClass: 'bg-accent-purple-bg/30',
    iconBgClass: 'bg-accent-purple-bg/50 text-purple-700',
    tagBgClass: 'bg-purple-50 text-purple-700 border-purple-100',
    hoverBtnClass: 'hover:bg-purple-600'
  },
  {
    id: '3',
    title: 'General English - Advanced',
    description: 'Advanced grammar, composition writing, and effective communication skills.',
    tag: 'New Content',
    icon: 'translate',
    accentClass: 'bg-accent-orange/10',
    iconBgClass: 'bg-accent-orange/20 text-orange-700',
    tagBgClass: 'bg-orange-50 text-orange-700 border-orange-100',
    hoverBtnClass: 'hover:bg-orange-500'
  }
];

const MARKET_COURSES: MarketCourse[] = [
  {
    id: 'm1',
    title: 'Biology 2026 Theory',
    startDate: 'Starts Nov 15th',
    description: 'Complete coverage of the 2026 syllabus including Molecular Biology and Genetics.',
    price: '$25.00',
    icon: 'biotech',
    iconBgClass: 'bg-accent-green-bg',
    iconColorClass: 'text-green-700'
  },
  {
    id: 'm2',
    title: 'Physics 2026 Theory',
    startDate: 'Starts Dec 01st',
    description: 'Fundamental concepts of Mechanics and Measurement for beginners.',
    price: '$22.00',
    icon: 'lightbulb',
    iconBgClass: 'bg-accent-yellow-bg',
    iconColorClass: 'text-yellow-700'
  },
  {
    id: 'm3',
    title: 'ICT for A/L 2026',
    startDate: 'Instant Access',
    description: 'Master Python programming, Database Management, and Networking concepts.',
    price: '$18.00',
    icon: 'terminal',
    iconBgClass: 'bg-blue-100',
    iconColorClass: 'text-blue-700',
    isHot: true
  },
  {
    id: 'm4',
    title: 'History of Arts',
    startDate: 'Starts Jan 2025',
    description: 'An exploration of global art history from ancient civilizations to modern times.',
    price: '$20.00',
    icon: 'history_edu',
    iconBgClass: 'bg-pink-100',
    iconColorClass: 'text-pink-700'
  }
];

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

  const renderMyCourses = () => (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      {/* Enrolled Classes Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-sidebar icon-filled">inventory_2</span>
            My Enrolled Classes
          </h2>
          <span className="text-xs font-medium bg-white px-3 py-1 rounded-full shadow-sm text-slate-500 border border-slate-100">
            {ENROLLED_COURSES.length} Active Courses
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENROLLED_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Available Classes Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-sidebar icon-filled">shopping_bag</span>
            Available Classes to Buy
          </h2>
          <a href="#" className="text-sm font-medium text-teal-sidebar hover:text-teal-dark flex items-center gap-1 group transition-colors">
            View all catalog
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MARKET_COURSES.map(course => (
            <MarketCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderAssignments = () => (
    <AssignmentsView />
  );

  const renderStudyPacks = () => (
    <StudyPacksView searchQuery="" />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'courses':
        return renderMyCourses();
      case 'assignments':
        return renderAssignments();
      case 'studypacks':
        return renderStudyPacks();
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

