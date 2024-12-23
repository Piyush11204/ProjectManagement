import { useState } from 'react';
import Spinner from '../Spinner';
import { useQuery } from '@apollo/client';
import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../../queries/projectQueries';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  // Filter projects based on search term and status
  const filteredProjects = data.projects.filter(
    (project) =>
      new RegExp(searchTerm, 'i').test(project.name) &&
      (statusFilter ? project.status === statusFilter : true)
  );

  return (
    <>
      {/* Search bar and filter */}
      <div className="d-flex justify-content-between mt-6 mb-3">
        {/* Search bar */}
        <input
          type="text"
          className="form-control border-2 border-gray-300 rounded-md p-2"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '1000px' }}
        />
        {/* Status filter */}
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="row mt-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects Found</p>
      )}
    </>
  );
}
