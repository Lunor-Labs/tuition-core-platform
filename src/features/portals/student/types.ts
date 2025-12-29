export interface Course {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  accentClass: string;
  iconBgClass: string;
  tagBgClass: string;
  hoverBtnClass: string;
  isNew?: boolean;
}

export interface MarketCourse {
  id: string;
  title: string;
  startDate: string;
  description: string;
  price: string;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  isHot?: boolean;
}

export type AssignmentStatus = 'due-today' | 'due-tomorrow' | 'upcoming' | 'graded' | 'pending-grade';

export interface Assignment {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'essay' | 'practice' | 'project';
  status: AssignmentStatus;
  dueDate: string;
  timeLeft?: string;
  score?: number;
  maxScore?: number;
  submissionDate?: string;
  feedback?: string;
}

export interface StudyPack {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  lessonsCount?: number;
  pdfCount?: number;
  videoDuration?: string;
  hasQuiz?: boolean;
  hasCode?: boolean;
  hasDiagrams?: boolean;
  hasTheory?: boolean;
  hasExercises?: boolean;
  icon: string;
  accentColor: string;
  iconBgColor: string;
}

export type Category = 'All Packs' | 'Physics' | 'Chemistry' | 'Combined Maths' | 'ICT' | 'Biology' | 'English';
