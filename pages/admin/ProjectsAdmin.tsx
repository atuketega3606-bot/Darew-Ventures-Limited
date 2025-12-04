import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const ProjectsAdmin: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, addLog } = useData();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProject({ title: '', location: '', description: '', category: 'Upstream', image: 'https://picsum.photos/600/400' });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentProject.title || !currentProject.description) return;

    if (currentProject.id) {
      updateProject(currentProject as Project);
      addLog(`Updated project: ${currentProject.title}`, user?.name || 'Admin');
    } else {
      const newProject = { ...currentProject, id: Date.now().toString() } as Project;
      addProject(newProject);
      addLog(`Created project: ${currentProject.title}`, user?.name || 'Admin');
    }
    setIsEditing(false);
    setCurrentProject({});
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      addLog(`Deleted project: ${title}`, user?.name || 'Admin');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Projects</h1>
        <button 
          onClick={handleAddNew}
          className="bg-darew-gold text-darew-blue px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-2xl w-full border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentProject.id ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><X /></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Project Title</label>
                  <input 
                    type="text" 
                    value={currentProject.title || ''} 
                    onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white focus:outline-none focus:border-darew-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Location</label>
                  <input 
                    type="text" 
                    value={currentProject.location || ''} 
                    onChange={e => setCurrentProject({...currentProject, location: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white focus:outline-none focus:border-darew-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Category</label>
                <select 
                   value={currentProject.category || 'Upstream'}
                   onChange={e => setCurrentProject({...currentProject, category: e.target.value as any})}
                   className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white focus:outline-none focus:border-darew-gold"
                >
                  <option value="Upstream">Upstream</option>
                  <option value="Downstream">Downstream</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Description</label>
                <textarea 
                  value={currentProject.description || ''} 
                  onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white h-32 focus:outline-none focus:border-darew-gold"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={currentProject.image || ''} 
                  onChange={e => setCurrentProject({...currentProject, image: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-white focus:outline-none focus:border-darew-gold"
                />
              </div>

              <button onClick={handleSave} className="w-full bg-darew-gold text-darew-blue font-bold py-3 rounded mt-4">
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden group shadow-sm dark:shadow-none transition-colors">
            <div className="relative h-48">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{project.category}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-xs text-darew-gold mb-2 uppercase">{project.location}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => handleEdit(project)}
                  className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-500/30"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(project.id, project.title)}
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

export default ProjectsAdmin;