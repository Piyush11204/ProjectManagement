import { useState } from 'react';
import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from '../Spinner';
import { GET_CLIENTS } from '../../queries/clientQueries';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  // Filter clients based on search term
  const filteredClients = data.clients.filter((client) =>
    new RegExp(searchTerm, 'i').test(client.name)
  );

  return (
    <>
      {/* Search Bar */}
      <div className="mb-3 mt-8">
        <input
          type="text"
          className="form-control border-2 border-gray-300 rounded-md p-2"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '1200px' }}
        />
      </div>

      {!loading && !error && (
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
