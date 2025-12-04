import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Service } from '../../types';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';

const ServicesAdmin: React.FC = () => {
  const { services, addService, updateService, deleteService, addLog } = useData();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentService({ title: '', description: '', image: 'https://picsum.photos/800/600', iconName: 'Droplets' });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentService.title || !currentService.description) return;

    if (currentService.id) {
      updateService(currentService as Service);
      addLog(`Updated service: ${currentService.title}`, user?.name || 'Admin');
    } else {
      const newService = { ...currentService, id: Date.now().toString() } as Service;
      addService(newService);
      addLog(`Created service: ${currentService.title}`, user?.name || 'Admin');
    }
    setIsEditing(false);
    setCurrentService({});
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      addLog(`Deleted service: ${title}`, user?.name || 'Admin');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Services</h1>
        <button 
          onClick={handleAddNew}
          className="bg-darew-gold text-darew-blue px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-2xl w-full border border-gray-200 dark:border-gray-700 shadow-xl transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentService.id ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><X /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Service Title</label>
                <input 
                  type="text" 
                  value={currentService.title || ''} 
                  onChange={e => setCurrentService({...currentService, title: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white focus:outline-none focus:border-darew-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Description</label>
                <textarea 
                  value={currentService.description || ''} 
                  onChange={e => setCurrentService({...currentService, description: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white h-32 focus:outline-none focus:border-darew-gold"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={currentService.image || ''} 
                  onChange={e => setCurrentService({...currentService, image: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white focus:outline-none focus:border-darew-gold"
                />
              </div>

              <button onClick={handleSave} className="w-full bg-darew-gold text-darew-blue font-bold py-3 rounded mt-4">
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm dark:shadow-none transition-colors">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{service.description}</p>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => handleEdit(service)}
                  className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-500/30"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-500/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesAdmin;