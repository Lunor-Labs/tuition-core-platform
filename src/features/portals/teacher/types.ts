
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
