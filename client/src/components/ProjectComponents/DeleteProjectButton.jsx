import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { Trash2, X } from 'lucide-react';

const DeleteProjectButton = ({ projectId, projectName = 'this project' }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate('/');
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    deleteProject();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="flex mt-5 ml-auto">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-300 flex items-center"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Project
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Project</h3>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {projectName}? This action cannot be undone
              and will remove all project data.
            </p>
            
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProjectButton;