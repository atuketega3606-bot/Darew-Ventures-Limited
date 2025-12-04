import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Changed from LucideIcon component to string name for storage
  image: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  category: 'Upstream' | 'Downstream' | 'Infrastructure';
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export type Role = 'Super Admin' | 'Editor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash?: string; // In a real app, never store plain text
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'New' | 'Read' | 'Replied';
  date: string;
}

export interface Log {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  timestamp: string;
}
