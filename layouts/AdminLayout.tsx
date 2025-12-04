import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Users,
  Droplets,
  Sun,
  Moon,
  Database
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Services', path: '/admin/services', icon: Droplets },
    { label: 'Projects', path: '/admin/projects', icon: Briefcase },
    { label: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  if (user?.role === 'Super Admin') {
    navItems.push({ label: 'Users', path: '/admin/users', icon: Users });
    navItems.push({ label: 'Database & API', path: '/admin/database', icon: Database });
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-darew-blue border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2">
             <div className="bg-darew-gold p-1.5 rounded-sm">
                <Droplets className="text-darew-blue h-5 w-5" />
              </div>
              <span className="text-lg font-serif font-bold text-gray-900 dark:text-white tracking-wide">
                DAREW <span className="text-xs text-darew-gold">Admin</span>
              </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-darew-gold text-darew-blue font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-darew-blue' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2 mb-4 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

           <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
                 {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{user?.role}</p>
              </div>
           </div>
           <button 
             onClick={logout}
             className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm"
           >
             <LogOut className="h-4 w-4" /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;