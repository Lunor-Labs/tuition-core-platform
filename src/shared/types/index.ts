// Shared type definitions used across the application

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
  image: string;
  description: string;
}

