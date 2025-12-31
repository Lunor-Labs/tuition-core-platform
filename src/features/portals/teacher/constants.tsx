
import type { ClassItem, NavItem } from './types';
import { ClassStatus } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'classes', label: 'My Classes', icon: 'school' },
  { id: 'schedule', label: 'Schedule', icon: 'calendar_month' },
  { id: 'assignments', label: 'Assignments', icon: 'assignment' },
  { id: 'payroll', label: 'Payroll', icon: 'payments' },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { id: 'help', label: 'Help', icon: 'help' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'logout', label: 'Log Out', icon: 'logout' },
];

export const INITIAL_CLASSES: ClassItem[] = [
  {
    id: '1',
    name: 'A/L 2026 Physics Theory - Nov',
    description: 'Comprehensive coverage of mechanics and thermodynamics. Includes weekly papers and discussion sessions.',
    subject: 'Physics',
    batch: 'A/L 2026',
    studentsCount: 142,
    schedule: 'Thu, 4:00 PM',
    status: ClassStatus.ACTIVE,
    icon: 'science',
    colorScheme: 'purple'
  },
  {
    id: '2',
    name: 'Chemistry Organic Masterclass',
    description: 'Focused revision on Organic Chemistry conversions and reaction mechanisms for upcoming exams.',
    subject: 'Chemistry',
    batch: 'Revision',
    studentsCount: 89,
    schedule: 'Sat, 8:00 AM',
    status: ClassStatus.ACTIVE,
    icon: 'biotech',
    colorScheme: 'blue'
  },
  {
    id: '3',
    name: 'Combined Maths - Past Papers',
    description: 'Past paper discussion series covering the last 10 years of A/L examinations.',
    subject: 'Maths',
    batch: '2024',
    studentsCount: 210,
    schedule: 'Fri, 6:00 PM',
    status: ClassStatus.PAUSED,
    icon: 'functions',
    colorScheme: 'gray'
  }
];
