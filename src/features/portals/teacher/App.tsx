
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { StatCard } from './components/Dashboard/StatCard';
import { GrowthChart } from './components/Dashboard/GrowthChart';
import { StatusCard } from './components/Dashboard/StatusCard';
// import { ActionGrid } from './components/Dashboard/ActionGrid';
import ClassCard from './components/MyClasses/ClassCard';
import CreateClassForm from './components/MyClasses/CreateClassForm';
import { AssignmentCard, ExamBuilder } from './components/Exams';
import { StudyPackCard, CreatePackForm } from './components/StudyPacks';
import { DashboardContent, WithdrawPanel } from './components/Payrolls';
import { INITIAL_CLASSES } from './constants';
import type { ClassItem, Assignment, StudyPack, MetricData, Transaction, PaymentMethod } from './types';
import { ClassStatus, AssignmentStatus, TransactionStatus } from './types';

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    subject: 'Physics',
    type: 'MCQ',
    title: 'Unit 4: Thermodynamics MCQ',
    description: '25 Questions covering heat engines and entropy. Students have 45 minutes to complete.',
    status: AssignmentStatus.ACTIVE,
    submissions: '45/142',
    duration: '45 mins',
    accentColor: 'bg-accent-orange/20 text-accent-orange',
    icon: 'quiz'
  },
  {
    id: '2',
    subject: 'Chemistry',
    type: 'Mock Exam',
    title: 'Organic Chemistry Periodical Test',
    description: 'Comprehensive test on organic conversions. Scheduled for next week\'s session.',
    status: AssignmentStatus.SCHEDULED,
    date: 'Oct 24, 2023',
    time: '10:00 AM',
    accentColor: 'bg-accent-blue/20 text-accent-blue',
    icon: 'history_edu'
  },
  {
    id: '3',
    subject: 'Maths',
    type: 'Pop Quiz',
    title: 'Complex Numbers Review',
    description: 'Quick review quiz to assess understanding of Argand diagrams.',
    status: AssignmentStatus.COMPLETED,
    avgScore: '78%',
    participants: '210',
    accentColor: 'bg-accent-purple-bg/50 text-accent-purple-icon',
    icon: 'fact_check'
  }
];

const INITIAL_PACKS: StudyPack[] = [
  {
    id: '1',
    title: 'Advanced Electronics Masterclass',
    subject: 'Physics',
    bundleType: 'Theory Bundle',
    description: 'Complete coverage of semiconductors, logic gates, and transistor circuits. Includes 15 hours of video content and downloadable notes.',
    price: 25.0,
    videosCount: 12,
    salesCount: 86,
    status: 'Published',
    accentColorBg: 'bg-accent-purple-bg/50',
    accentColorIcon: 'text-accent-purple-icon',
    icon: 'smart_display'
  },
  {
    id: '2',
    title: 'Organic Chemistry: Reaction Mechanisms',
    subject: 'Chemistry',
    bundleType: 'Revision',
    description: 'Focused study pack on SN1/SN2 reactions and electrophilic substitution. Perfect for exam prep.',
    price: 15.0,
    videosCount: 8,
    salesCount: 214,
    status: 'Published',
    accentColorBg: 'bg-accent-green-bg/50',
    accentColorIcon: 'text-accent-green-icon',
    icon: 'science'
  },
  {
    id: '3',
    title: 'Calculus: Limits & Derivatives',
    subject: 'Maths',
    bundleType: 'Intro',
    description: 'A free introductory course to the fundamentals of calculus. Work in progress.',
    price: 'Free',
    videosCount: 3,
    lastEdited: 'Edited 2h ago',
    status: 'Draft',
    accentColorBg: 'bg-slate-100',
    accentColorIcon: 'text-slate-400',
    icon: 'construction'
  }
];

const INITIAL_METRICS: MetricData = {
  availableBalance: 2450.50,
  pendingClearance: 340.00,
  lifetimeEarnings: 18290.00,
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#TRX-8829',
    date: 'Oct 24, 2023',
    description: 'Sale: Physics Bundle',
    category: 'Study Pack purchase',
    amount: 25.00,
    status: TransactionStatus.COMPLETED,
    isCredit: true,
  },
  {
    id: '#TRX-8810',
    date: 'Oct 22, 2023',
    description: 'Withdrawal to Bank',
    category: 'To: **** 4582',
    amount: 450.00,
    status: TransactionStatus.PROCESSED,
    isCredit: false,
  },
  {
    id: '#TRX-8755',
    date: 'Oct 21, 2023',
    description: 'Sale: Organic Chem',
    category: 'Study Pack purchase',
    amount: 15.00,
    status: TransactionStatus.PENDING,
    isCredit: true,
  },
  {
    id: '#TRX-8642',
    date: 'Oct 18, 2023',
    description: 'Class Fees: Grade 10',
    category: 'Recurring monthly',
    amount: 120.00,
    status: TransactionStatus.COMPLETED,
    isCredit: true,
  },
];

const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  { id: '1', type: 'BANK', name: 'CitiBank', lastFour: '4582', isPrimary: true },
  { id: '2', type: 'VISA', name: 'Visa Debit', lastFour: '9921' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [sortBy, setSortBy] = useState('Newest First');
  const [assignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [assignmentFilter, setAssignmentFilter] = useState('All Status');
  const [packs] = useState<StudyPack[]>(INITIAL_PACKS);
  const [packFilter, setPackFilter] = useState('All Packs');
  const [metrics] = useState<MetricData>(INITIAL_METRICS);
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [paymentMethods] = useState<PaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  const [financialInsight, setFinancialInsight] = useState<string>('Generating your financial insight...');

  useEffect(() => {
    // Simulate AI financial insight generation
    const generateInsight = () => {
      let insight = '';

      if (metrics.availableBalance > 2000) {
        insight = 'Excellent cash flow! Consider reinvesting in premium content creation to boost earnings.';
      } else if (metrics.availableBalance > 1000) {
        insight = 'Strong balance maintained. Focus on consistent withdrawals while building emergency reserves.';
      } else {
        insight = 'Monitor spending closely. Consider reducing withdrawal frequency to build reserves.';
      }

      setFinancialInsight(insight);
    };

    generateInsight();
  }, [metrics.availableBalance]);

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
      {/* <ActionGrid /> */}
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

  const renderExams = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      {/* Left Column: List of Assignments */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Recent Assignments</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter by:</span>
            <select
              value={assignmentFilter}
              onChange={(e) => setAssignmentFilter(e.target.value)}
              className="text-xs border-none bg-white rounded-lg py-1 pl-3 pr-8 shadow-sm focus:ring-2 focus:ring-teal-sidebar/20 text-slate-700 font-medium cursor-pointer"
            >
              <option>All Status</option>
              <option value={AssignmentStatus.ACTIVE}>Active</option>
              <option value={AssignmentStatus.SCHEDULED}>Scheduled</option>
              <option value={AssignmentStatus.COMPLETED}>Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {assignments
            .filter(a => assignmentFilter === 'All Status' || a.status === assignmentFilter)
            .map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          {assignments.filter(a => assignmentFilter === 'All Status' || a.status === assignmentFilter).length === 0 && (
            <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center text-center text-slate-400 border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <p>No assignments found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Exam Builder */}
      <div className="xl:col-span-1">
        <ExamBuilder />
      </div>
    </div>
  );

  const renderStudyPacks = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      {/* Left Column: Study Packs List */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Your Study Packs</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter by:</span>
            <select
              className="text-xs border-none bg-white rounded-lg py-1 pl-3 pr-8 shadow-sm focus:ring-2 focus:ring-teal-sidebar/20 text-slate-700 font-medium cursor-pointer"
              value={packFilter}
              onChange={(e) => setPackFilter(e.target.value)}
            >
              <option>All Packs</option>
              <option>Published</option>
              <option>Drafts</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {packs
            .filter(pack => {
              if (packFilter === 'All Packs') return true;
              if (packFilter === 'Drafts') return pack.status === 'Draft';
              if (packFilter === 'Published') return pack.status === 'Published';
              if (packFilter === 'Archived') return pack.status === 'Archived';
              return true;
            })
            .map((pack) => (
              <StudyPackCard key={pack.id} pack={pack} />
            ))}
          {packs.filter(pack => {
            if (packFilter === 'All Packs') return true;
            if (packFilter === 'Drafts') return pack.status === 'Draft';
            if (packFilter === 'Published') return pack.status === 'Published';
            if (packFilter === 'Archived') return pack.status === 'Archived';
            return true;
          }).length === 0 && (
            <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center text-center text-slate-400 border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-6xl mb-4">inventory_2</span>
              <p>No study packs found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Creation Form */}
      <div className="xl:col-span-1">
        <CreatePackForm />
      </div>
    </div>
  );

  const renderPayrolls = () => (
    <div className="space-y-6">
      {/* AI Insight Banner */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-center gap-3">
        <div className="size-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
        </div>
        <p className="text-sm font-medium text-teal-800">{financialInsight}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 space-y-8">
          <DashboardContent metrics={metrics} transactions={transactions} />
        </div>
        <div className="xl:col-span-1 space-y-6">
          <WithdrawPanel balance={metrics.availableBalance} paymentMethods={paymentMethods} />
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
      case 'classes':
        return renderMyClasses();
      case 'exams':
        return renderExams();
      case 'study-packs':
        return renderStudyPacks();
      case 'payroll':
        return renderPayrolls();
      default:
        return renderComingSoon(activeTab);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMobileMenuToggle={() => setIsSidebarOpen(true)} />
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
