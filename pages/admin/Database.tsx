import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Database as DbIcon, Code, Server, Copy, Check } from 'lucide-react';

const Database: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schema' | 'sql' | 'api'>('schema');
  const [copied, setCopied] = useState(false);
  
  const { services, projects, inquiries, logs } = useData();
  const { users } = useAuth();

  // 1. Schema Definition
  const tables = [
    {
      name: 'users',
      description: 'Stores administrator accounts and roles.',
      columns: [
        { name: 'id', type: 'VARCHAR(36)', constraints: 'PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE, NOT NULL' },
        { name: 'role', type: 'ENUM', constraints: "('Super Admin', 'Editor', 'Viewer')" },
        { name: 'password_hash', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      ]
    },
    {
      name: 'services',
      description: 'Corporate services listed on the website.',
      columns: [
        { name: 'id', type: 'VARCHAR(36)', constraints: 'PRIMARY KEY' },
        { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'description', type: 'TEXT', constraints: 'NOT NULL' },
        { name: 'icon_name', type: 'VARCHAR(50)', constraints: 'NOT NULL' },
        { name: 'image_url', type: 'VARCHAR(500)', constraints: '' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      ]
    },
    {
      name: 'projects',
      description: 'Portfolio of past and ongoing projects.',
      columns: [
        { name: 'id', type: 'VARCHAR(36)', constraints: 'PRIMARY KEY' },
        { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'location', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'category', type: 'ENUM', constraints: "('Upstream', 'Downstream', 'Infrastructure')" },
        { name: 'description', type: 'TEXT', constraints: '' },
        { name: 'image_url', type: 'VARCHAR(500)', constraints: '' },
      ]
    },
    {
      name: 'inquiries',
      description: 'Contact form submissions from the public site.',
      columns: [
        { name: 'id', type: 'VARCHAR(36)', constraints: 'PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'email', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'phone', type: 'VARCHAR(50)', constraints: '' },
        { name: 'message', type: 'TEXT', constraints: 'NOT NULL' },
        { name: 'status', type: 'ENUM', constraints: "('New', 'Read', 'Replied') DEFAULT 'New'" },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      ]
    },
    {
      name: 'logs',
      description: 'Audit trail for administrative actions.',
      columns: [
        { name: 'id', type: 'VARCHAR(36)', constraints: 'PRIMARY KEY' },
        { name: 'admin_id', type: 'VARCHAR(36)', constraints: 'NOT NULL' },
        { name: 'admin_name', type: 'VARCHAR(255)', constraints: '' },
        { name: 'action', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'timestamp', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      ]
    }
  ];

  // 2. Generate SQL
  const generateSQL = () => {
    let sql = `-- Darew Venture Limited Database Dump\n`;
    sql += `-- Generated on ${new Date().toISOString()}\n\n`;

    // Create Tables
    tables.forEach(table => {
      sql += `CREATE TABLE IF NOT EXISTS ${table.name} (\n`;
      table.columns.forEach((col, idx) => {
        sql += `  ${col.name} ${col.type} ${col.constraints}`;
        if (idx < table.columns.length - 1) sql += ',';
        sql += '\n';
      });
      sql += `);\n\n`;
    });

    // Seed Data - Users
    if (users.length > 0) {
      sql += `-- Dumping data for table 'users'\n`;
      sql += `INSERT INTO users (id, name, email, role, password_hash) VALUES\n`;
      sql += users.map(u => `('${u.id}', '${u.name.replace(/'/g, "''")}', '${u.email}', '${u.role}', '${u.passwordHash}')`).join(',\n') + ';\n\n';
    }

    // Seed Data - Services
    if (services.length > 0) {
      sql += `-- Dumping data for table 'services'\n`;
      sql += `INSERT INTO services (id, title, description, icon_name, image_url) VALUES\n`;
      sql += services.map(s => `('${s.id}', '${s.title.replace(/'/g, "''")}', '${s.description.replace(/'/g, "''")}', '${s.iconName}', '${s.image}')`).join(',\n') + ';\n\n';
    }

    // Seed Data - Projects
    if (projects.length > 0) {
      sql += `-- Dumping data for table 'projects'\n`;
      sql += `INSERT INTO projects (id, title, location, category, description, image_url) VALUES\n`;
      sql += projects.map(p => `('${p.id}', '${p.title.replace(/'/g, "''")}', '${p.location.replace(/'/g, "''")}', '${p.category}', '${p.description.replace(/'/g, "''")}', '${p.image}')`).join(',\n') + ';\n\n';
    }

    return sql;
  };

  const sqlContent = generateSQL();

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3. API Endpoints
  const endpoints = [
    { method: 'GET', path: '/api/services', desc: 'Retrieve all services', response: 'Array<Service>' },
    { method: 'POST', path: '/api/services', desc: 'Create a new service (Admin)', response: 'Service' },
    { method: 'GET', path: '/api/projects', desc: 'Retrieve all projects', response: 'Array<Project>' },
    { method: 'POST', path: '/api/contact', desc: 'Submit a new inquiry', response: '{ success: true, id: string }' },
    { method: 'GET', path: '/api/admin/stats', desc: 'Get dashboard statistics', response: 'StatsObject' },
    { method: 'POST', path: '/api/auth/login', desc: 'Authenticate admin user', response: '{ token: string, user: User }' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System & Database</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${activeTab === 'schema' ? 'bg-darew-gold text-darew-blue' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
          >
            <DbIcon className="w-4 h-4 inline mr-2" /> Schema
          </button>
          <button 
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${activeTab === 'sql' ? 'bg-darew-gold text-darew-blue' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
          >
            <Code className="w-4 h-4 inline mr-2" /> SQL Export
          </button>
          <button 
            onClick={() => setActiveTab('api')}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${activeTab === 'api' ? 'bg-darew-gold text-darew-blue' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
          >
            <Server className="w-4 h-4 inline mr-2" /> API
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 min-h-[500px] transition-colors">
        {activeTab === 'schema' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tables.map(table => (
              <div key={table.name} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <DbIcon className="w-4 h-4 text-darew-gold" /> {table.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{table.description}</p>
                </div>
                <div className="p-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400">
                        <th className="pb-2">Column</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Constraints</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {table.columns.map(col => (
                        <tr key={col.name} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <td className="py-2 font-mono text-blue-600 dark:text-blue-400">{col.name}</td>
                          <td className="py-2 text-purple-600 dark:text-purple-400">{col.type}</td>
                          <td className="py-2 text-gray-500 italic">{col.constraints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sql' && (
          <div className="relative">
            <div className="absolute top-4 right-4">
              <button 
                onClick={handleCopy}
                className="bg-darew-gold hover:bg-white text-darew-blue hover:text-darew-blue px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'COPIED' : 'COPY SQL'}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto h-[600px] text-sm font-mono border border-gray-700">
              <code>{sqlContent}</code>
            </pre>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-4">
            {endpoints.map((ep, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold w-fit ${
                    ep.method === 'GET' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                    ep.method === 'POST' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {ep.method}
                  </span>
                  <code className="text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                    {ep.path}
                  </code>
                  <span className="text-gray-500 dark:text-gray-400 text-sm flex-grow">
                    {ep.desc}
                  </span>
                  <div className="text-xs text-gray-400 font-mono">
                    Returns: <span className="text-darew-gold">{ep.response}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Database;