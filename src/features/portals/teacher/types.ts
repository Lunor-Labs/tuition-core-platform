
export const ClassStatus = {
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  COMPLETED: 'Completed'
} as const;

export type ClassStatusType = typeof ClassStatus[keyof typeof ClassStatus];

export interface ClassItem {
  id: string;
  name: string;
  description: string;
  subject: string;
  batch: string;
  studentsCount: number;
  schedule: string;
  status: ClassStatusType;
  icon: string;
  colorScheme: 'purple' | 'blue' | 'gray';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  activeIcon?: string;
}

export const AssignmentStatus = {
  ACTIVE: 'Active',
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed'
} as const;

export type AssignmentStatusType = typeof AssignmentStatus[keyof typeof AssignmentStatus];

export interface Assignment {
  id: string;
  subject: string;
  type: string;
  title: string;
  description: string;
  status: AssignmentStatusType;
  submissions?: string;
  duration?: string;
  date?: string;
  time?: string;
  avgScore?: string;
  participants?: string;
  accentColor: string;
  icon: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  points: number;
  options: QuestionOption[];
}

export type PackStatus = 'Published' | 'Draft' | 'Archived';

export interface VideoContent {
  id: string;
  title: string;
  duration: string;
  size: string;
}

export interface StudyPack {
  id: string;
  title: string;
  subject: string;
  bundleType: string;
  description: string;
  price: number | 'Free';
  videosCount: number;
  salesCount?: number;
  lastEdited?: string;
  status: PackStatus;
  accentColorBg: string;
  accentColorIcon: string;
  icon: string;
}

export const TransactionStatus = {
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  PROCESSED: 'Processed'
} as const;

export type TransactionStatusType = typeof TransactionStatus[keyof typeof TransactionStatus];

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: TransactionStatusType;
  isCredit: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'BANK' | 'VISA' | 'MASTERCARD';
  name: string;
  lastFour: string;
  isPrimary?: boolean;
}

export interface MetricData {
  availableBalance: number;
  pendingClearance: number;
  lifetimeEarnings: number;
}
