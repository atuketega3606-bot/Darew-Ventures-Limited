import React from 'react';
import { useData } from '../../contexts/DataContext';
import { MessageSquare, Briefcase, Activity, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { inquiries, projects, services, logs } = useData();

  const stats = [
    { label: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-400/10' },
    { label: 'Active Projects', value: projects.length, icon: Briefcase, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-400/10' },
    { label: 'Services Listed', value: services.length, icon: FileText, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-400/10' },
    { label: 'Pending Messages', value: inquiries.filter(i => i.status === 'New').length, icon: Activity, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-400/10' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:shadow-none transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Inquiries</h3>
          <div className="space-y-4">
            {inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-100 dark:border-gray-800 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{inquiry.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-48">{inquiry.message}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded ${
                    inquiry.status === 'New' 
                      ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                      : 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                  }`}>
                    {inquiry.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{new Date(inquiry.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-gray-500">No inquiries yet.</p>}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:shadow-none transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Audit Log</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
             {logs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex gap-4 items-start text-sm border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 transition-colors">
                  <div className="text-gray-500 whitespace-nowrap">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  <div>
                    <span className="font-bold text-darew-gold">{log.adminName}</span>
                    <span className="text-gray-600 dark:text-gray-300"> {log.action}</span>
                  </div>
                </div>
             ))}
             {logs.length === 0 && <p className="text-gray-500">No activity recorded.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;