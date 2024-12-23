import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { 
  FolderPlus, 
  AlertCircle, 
  FileText, 
  User, 
  ActivitySquare 
} from 'lucide-react';

const AddProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');
  const [error, setError] = useState('');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error: clientError, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (name === '' || description === '' || status === '') {
      setError('Please fill in all required fields');
      return;
    }

    if (clientId === '') {
      setError('Please select a client');
      return;
    }

    addProject(name, description, clientId, status);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (clientError) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-600 flex items-center space-x-2">
        <AlertCircle />
        <span>Error loading clients</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FolderPlus className="h-6 w-6 text-gray-700" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Create New Project</h2>
        </div>

        {error && (
          <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter project name"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter project description"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ActivitySquare className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select Client</option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;