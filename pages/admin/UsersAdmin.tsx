import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { User, Role } from '../../types';
import { Trash2, UserPlus, Shield } from 'lucide-react';

const UsersAdmin: React.FC = () => {
  const { users, addUser, deleteUser } = useAuth();
  const { addLog } = useData();
  const [newUser, setNewUser] = useState<Partial<User>>({ role: 'Viewer' });
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.passwordHash) return;

    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    } as User;

    addUser(user);
    addLog(`Added new user: ${user.name}`, 'Super Admin');
    setNewUser({ role: 'Viewer', name: '', email: '', passwordHash: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove user ${name}?`)) {
      deleteUser(id);
      addLog(`Deleted user: ${name}`, 'Super Admin');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-darew-gold text-darew-blue px-4 py-2 rounded font-bold flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" /> Add User
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8 max-w-2xl shadow-sm dark:shadow-none transition-colors">
          <h3 className="text-gray-900 dark:text-white font-bold mb-4">Add New Administrator</h3>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Name</label>
                 <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-darew-gold" required 
                   value={newUser.name || ''} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              </div>
              <div>
                 <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Email</label>
                 <input type="email" className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-darew-gold" required
                   value={newUser.email || ''} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Password</label>
                 <input type="password" className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-darew-gold" required
                   value={newUser.passwordHash || ''} onChange={e => setNewUser({...newUser, passwordHash: e.target.value})} />
              </div>
              <div>
                 <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Role</label>
                 <select className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-darew-gold"
                   value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as Role})}>
                   <option value="Viewer">Viewer</option>
                   <option value="Editor">Editor</option>
                   <option value="Super Admin">Super Admin</option>
                 </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-bold transition-colors">Create User</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm dark:shadow-none transition-colors">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-xl text-darew-gold">
                 {user.name.charAt(0)}
               </div>
               <div>
                 <h4 className="text-gray-900 dark:text-white font-bold">{user.name}</h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                 <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-darew-gold mt-1 inline-block flex items-center gap-1 w-fit">
                    <Shield className="h-3 w-3" /> {user.role}
                 </span>
               </div>
             </div>
             {user.id !== '1' && (
                <button 
                  onClick={() => handleDelete(user.id, user.name)}
                  className="p-2 text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 rounded"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
             )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersAdmin;