import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Phone, Clock, CheckCircle } from 'lucide-react';

const InquiriesAdmin: React.FC = () => {
  const { inquiries, updateInquiryStatus, addLog } = useData();
  const { user } = useAuth();

  const handleMarkAsRead = (id: string) => {
    updateInquiryStatus(id, 'Read');
    addLog('Marked inquiry as read', user?.name || 'Admin');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inquiries</h1>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
           Total: <span className="text-gray-900 dark:text-white font-bold">{inquiries.length}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm dark:shadow-none transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm uppercase transition-colors">
              <th className="p-4 border-b border-gray-200 dark:border-gray-700">Status</th>
              <th className="p-4 border-b border-gray-200 dark:border-gray-700">Contact Info</th>
              <th className="p-4 border-b border-gray-200 dark:border-gray-700">Message</th>
              <th className="p-4 border-b border-gray-200 dark:border-gray-700">Date</th>
              <th className="p-4 border-b border-gray-200 dark:border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
               <tr>
                 <td colSpan={5} className="p-8 text-center text-gray-500">No inquiries found.</td>
               </tr>
            ) : (
              inquiries.map(inquiry => (
                <tr key={inquiry.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      inquiry.status === 'New' 
                        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-600/20 text-gray-600 dark:text-gray-400'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 dark:text-white">{inquiry.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Mail className="h-3 w-3" /> {inquiry.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Phone className="h-3 w-3" /> {inquiry.phone || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 max-w-xs">{inquiry.message}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(inquiry.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    {inquiry.status === 'New' && (
                      <button 
                        onClick={() => handleMarkAsRead(inquiry.id)}
                        className="text-darew-gold hover:text-darew-goldHover text-sm flex items-center gap-1 font-semibold"
                        title="Mark as Read"
                      >
                        <CheckCircle className="h-4 w-4" /> Read
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiriesAdmin;