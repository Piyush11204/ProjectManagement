import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { GET_CLIENTS } from '../../queries/clientQueries';
import Projects from '../../components/ProjectComponents/Projects';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  PieChart,
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Clock
} from 'lucide-react';
import ProjectCharts from './ProjectCharts';

const Home = () => {
  const { data: projectsData } = useQuery(GET_PROJECTS);
  const { data: clientsData } = useQuery(GET_CLIENTS);

  const getProjectStats = () => {
    if (!projectsData) return { total: 0, completed: 0, inProgress: 0, notStarted: 0 };
    
    return projectsData.projects.reduce((acc, project) => {
      acc.total++;
      if (project.status === 'Completed') acc.completed++;
      else if (project.status === 'In Progress') acc.inProgress++;
      else acc.notStarted++;
      return acc;
    }, { total: 0, completed: 0, inProgress: 0, notStarted: 0 });
  };

  const stats = getProjectStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Project Management Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {clientsData ? clientsData.clients.length : 0}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => window.location.href = '/addproject'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FolderKanban className="h-5 w-5 mr-2" />
            New Project
          </button>
          <button 
            onClick={() => window.location.href = '/addclient'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Users className="h-5 w-5 mr-2" />
            New Client
          </button>
        </div>

        {/* Charts for status */}
        <div className="flex w-full flex-wrap gap-4 mb-8">
          <ProjectCharts stats={stats} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <PieChart className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Projects Overview</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span>Click on a project to see details</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <Projects />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;