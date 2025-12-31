import React, { useState, useMemo } from 'react';
import StudyPackCard from './StudyPackCard';
import type { StudyPack } from '../../types';

const STUDY_PACKS: StudyPack[] = [
  {
    id: '1',
    title: 'A/L 2026 Physics Theory - Nov',
    description: 'Comprehensive video lessons covering Thermodynamics and basic Mechanics for November syllabus.',
    category: 'Physics',
    price: 1500,
    currency: 'LKR',
    lessonsCount: 12,
    pdfCount: 3,
    icon: 'bolt',
    accentColor: 'text-red-600',
    iconBgColor: 'bg-accent-red/20'
  },
  {
    id: '2',
    title: 'Pure Maths: Integration Masterclass',
    description: 'Master the fundamentals of Integration with step-by-step video guides and 500+ practice problems.',
    category: 'Combined Maths',
    price: 2500,
    currency: 'LKR',
    lessonsCount: 20,
    hasQuiz: true,
    icon: 'calculate',
    accentColor: 'text-blue-600',
    iconBgColor: 'bg-accent-blue/20'
  },
  {
    id: '3',
    title: 'Organic Chemistry Revision Kit',
    description: 'Complete revision notes and fast-track video summaries for Organic Chemistry conversions.',
    category: 'Chemistry',
    price: 1800,
    currency: 'LKR',
    videoDuration: '5h Video',
    hasTheory: true,
    icon: 'science',
    accentColor: 'text-green-700',
    iconBgColor: 'bg-accent-green-bg'
  },
  {
    id: '4',
    title: 'Python for A/L: Complete Guide',
    description: 'From basic syntax to algorithms. Includes coding exercises and project templates.',
    category: 'ICT',
    price: 2200,
    currency: 'LKR',
    lessonsCount: 15,
    hasCode: true,
    icon: 'terminal',
    accentColor: 'text-purple-700',
    iconBgColor: 'bg-accent-purple-bg'
  },
  {
    id: '5',
    title: 'Genetics & Molecular Bio',
    description: 'Deep dive into genetics with animated diagrams and detailed theory notes.',
    category: 'Biology',
    price: 2000,
    currency: 'LKR',
    hasDiagrams: true,
    hasTheory: true,
    icon: 'biotech',
    accentColor: 'text-yellow-700',
    iconBgColor: 'bg-accent-yellow-bg'
  },
  {
    id: '6',
    title: 'General English: Grammar',
    description: 'Essential grammar rules, tenses, and sentence structures for A/L General English.',
    category: 'English',
    price: 1200,
    currency: 'LKR',
    hasExercises: true,
    icon: 'translate',
    accentColor: 'text-gray-600',
    iconBgColor: 'bg-gray-100'
  }
];

const CATEGORIES: string[] = ['All Packs', 'Physics', 'Chemistry', 'Combined Maths', 'ICT', 'Biology', 'English'];

interface StudyPacksViewProps {
  searchQuery: string;
}

const StudyPacksView: React.FC<StudyPacksViewProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Packs');
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const filteredPacks = useMemo(() => {
    return STUDY_PACKS.filter(pack => {
      const matchesCategory = selectedCategory === 'All Packs' || pack.category === selectedCategory;
      const matchesSearch = pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pack.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAiAsk = async () => {
    const goal = prompt("Tell us your study goal (e.g., 'I want to master Physics' or 'Help me with coding')");
    if (!goal) return;

    setIsAiLoading(true);
    setAiMessage(null);

    try {
      // Simulate AI response - in a real implementation, this would call an AI service
      let message = '';
      let recommendedSubject = '';

      if (goal.toLowerCase().includes('physics') || goal.toLowerCase().includes('mechanics') || goal.toLowerCase().includes('thermodynamics')) {
        message = 'Based on your goal to master Physics, I recommend our "A/L 2026 Physics Theory" pack which covers mechanics and thermodynamics comprehensively.';
        recommendedSubject = 'Physics';
      } else if (goal.toLowerCase().includes('chemistry') || goal.toLowerCase().includes('organic')) {
        message = 'For mastering Chemistry, our "Organic Chemistry Revision Kit" would be perfect for understanding conversions and reactions.';
        recommendedSubject = 'Chemistry';
      } else if (goal.toLowerCase().includes('math') || goal.toLowerCase().includes('calculus') || goal.toLowerCase().includes('integration')) {
        message = 'Your interest in Mathematics aligns perfectly with our "Pure Maths: Integration Masterclass" for advanced calculus concepts.';
        recommendedSubject = 'Combined Maths';
      } else if (goal.toLowerCase().includes('programming') || goal.toLowerCase().includes('coding') || goal.toLowerCase().includes('python')) {
        message = 'For programming skills, our "Python for A/L: Complete Guide" covers everything from basic syntax to advanced algorithms.';
        recommendedSubject = 'ICT';
      } else if (goal.toLowerCase().includes('biology') || goal.toLowerCase().includes('genetics')) {
        message = 'Your interest in Biology matches our "Genetics & Molecular Bio" pack with detailed diagrams and theory.';
        recommendedSubject = 'Biology';
      } else {
        message = 'Based on your study goals, I recommend exploring our comprehensive course catalog to find the perfect fit for your learning objectives.';
      }

      setAiMessage(message);
      if (recommendedSubject && CATEGORIES.includes(recommendedSubject)) {
        setSelectedCategory(recommendedSubject);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Assistant Banner */}
      {aiMessage && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="size-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-teal-800 font-medium">AI Recommendation</p>
            <p className="text-sm text-teal-700">{aiMessage}</p>
          </div>
          <button onClick={() => setAiMessage(null)} className="text-teal-400 hover:text-teal-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-teal-sidebar text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleAiAsk}
            disabled={isAiLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-md disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAiLoading ? 'refresh' : 'auto_awesome'}
            </span>
            <span>{isAiLoading ? 'Thinking...' : 'AI Recommend'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-sidebar">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              <span className="hidden sm:inline">Filter</span>
            </button>
            <div className="h-4 w-px bg-slate-300"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-sidebar">
              <span className="material-symbols-outlined text-[20px]">sort</span>
              <span className="hidden sm:inline">Sort by</span>
            </button>
          </div>
        </div>
      </div>

      {filteredPacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredPacks.map(pack => (
            <StudyPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-20">search_off</span>
          <p className="text-lg font-medium">No study packs found matching your criteria</p>
          <button
            onClick={() => { setSelectedCategory('All Packs'); }}
            className="mt-4 text-teal-sidebar font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyPacksView;
