// Shared type definitions used across the application

export type Theme = 'light' | 'dark';

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface Review {
  id: number;
  text: string;
  name: string;
  image: string;
}

export interface Student {
  name: string;
  year: string;
  district: string;
  subject: string;
  grade: string;
}

export interface TopStudent {
  rank: number;
  name: string;
  school: string;
  marks: number;
  image?: string;
}

export interface ClassCenter {
  title: string;
  buttonText: string;
  image: string;
}

export interface Channel {
  id: number;
  year: string;
  subject: string;
  link: string;
}

// Teacher Portal Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'document' | 'video' | 'image' | 'link';
  url: string;
  size?: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  lessonId?: string;
  questions: Question[];
  totalMarks: number;
  duration: number; // in minutes
  createdAt: string;
  submissions: Submission[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string;
  marks: number;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  answers: Answer[];
  totalScore: number;
  submittedAt: string;
  status: 'pending' | 'graded' | 'reviewed';
}

export interface Answer {
  questionId: string;
  answer: string;
  score?: number;
}

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subjects: string[];
  experience: number;
  bio?: string;
  avatar?: string;
  preferences: {
    notifications: boolean;
    emailReminders: boolean;
    theme: 'light' | 'dark';
  };
}

export interface DashboardStats {
  totalLessons: number;
  totalStudents: number;
  upcomingLessons: number;
  totalTests: number;
}

