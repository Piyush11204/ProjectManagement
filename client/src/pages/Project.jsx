import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { 
  ArrowLeft, 
  Folder, 
  Calendar, 
  User, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientComponents/ClientInfo';
import DeleteProjectButton from '../components/ProjectComponents/DeleteProjectButton';
import EditProjectForm from '../components/ProjectComponents/EditProjectForm';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500 text-xl">Something Went Wrong</p>
    </div>
  );

  const { project } = data;

  const getStatusColor = (status) => {
    const colors = {
      'Not Started': 'bg-red-100 text-red-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex justify-between items-center">
              <Link 
                to="/" 
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                {project.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:px-6">
            <div className="space-y-6">
              {/* Project Details */}
              <div>
                <div className="flex items-center space-x-3">
                  <Folder className="h-6 w-6 text-blue-500" />
                  <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                </div>
                <p className="mt-4 text-gray-600">{project.description}</p>
              </div>

              {/* Timeline Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Calendar className="h-5 w-5" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="h-5 w-5" />
                  <span>Last Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-900">Client Information</h2>
                </div>
                <ClientInfo client={project.client} />
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <EditProjectForm project={project} />
                <DeleteProjectButton projectId={project.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;