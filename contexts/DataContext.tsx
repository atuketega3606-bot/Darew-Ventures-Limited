import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, Project, Inquiry, StatItem, Log } from '../types';
import { SERVICES, PROJECTS, COMPANY_STATS } from '../constants';

// Helper to convert Icon component to string name for initial data
// In a real app, you might map these differently. 
// For this demo, we will assume the initial data in `constants` is transformed or we handle the mismatch.
// To keep it simple, we will use the constants as initial state but map the icon object to a string name if needed, 
// or just modify the Service type in types.ts (done).

interface DataContextType {
  services: Service[];
  projects: Project[];
  inquiries: Inquiry[];
  stats: StatItem[];
  logs: Log[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'date'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  updateStats: (stats: StatItem[]) => void;
  addLog: (action: string, adminName: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// We'll map the Lucide icons dynamically in the UI components based on this string.
// For the sake of the demo, let's just stick to a simple set of icon names available.

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to constants
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('darew_services');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('darew_projects');
    return saved ? JSON.parse(saved) : PROJECTS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('darew_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState<StatItem[]>(() => {
    const saved = localStorage.getItem('darew_stats');
    return saved ? JSON.parse(saved) : COMPANY_STATS;
  });

  const [logs, setLogs] = useState<Log[]>(() => {
    const saved = localStorage.getItem('darew_logs');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('darew_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('darew_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('darew_inquiries', JSON.stringify(inquiries)), [inquiries]);
  useEffect(() => localStorage.setItem('darew_stats', JSON.stringify(stats)), [stats]);
  useEffect(() => localStorage.setItem('darew_logs', JSON.stringify(logs)), [logs]);

  // Actions
  const addService = (service: Service) => {
    setServices([...services, service]);
  };

  const updateService = (updatedService: Service) => {
    setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addInquiry = (data: Omit<Inquiry, 'id' | 'status' | 'date'>) => {
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      date: new Date().toISOString(),
    };
    setInquiries([newInquiry, ...inquiries]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
  };

  const updateStats = (newStats: StatItem[]) => {
    setStats(newStats);
  };

  const addLog = (action: string, adminName: string) => {
    const newLog: Log = {
      id: Math.random().toString(36).substr(2, 9),
      adminId: '1', // simplified
      adminName,
      action,
      timestamp: new Date().toISOString()
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <DataContext.Provider value={{
      services,
      projects,
      inquiries,
      stats,
      logs,
      addService,
      updateService,
      deleteService,
      addProject,
      updateProject,
      deleteProject,
      addInquiry,
      updateInquiryStatus,
      updateStats,
      addLog
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};