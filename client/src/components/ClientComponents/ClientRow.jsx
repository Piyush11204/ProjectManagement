import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { Trash2, Phone, Mail, User, X } from 'lucide-react';

const ClientRow = ({ client }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    deleteClient();
    setShowDeleteDialog(false);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-900">{client.name}</span>
          </div>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
              {client.email}
            </a>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
              {client.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <tr className="hidden md:table-row border-b hover:bg-gray-50">
        <td className="py-4 px-6 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-900">{client.name}</span>
          </div>
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
              {client.email}
            </a>
          </div>
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
              {client.phone}
            </a>
          </div>
        </td>
        <td className="py-4 px-6 text-right">
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </td>
      </tr>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Client</h3>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {client.name}? This action cannot be undone
              and will remove all associated project data.
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

export default ClientRow;