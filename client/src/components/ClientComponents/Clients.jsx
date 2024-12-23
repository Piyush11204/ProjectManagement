import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from '../Spinner';
import { GET_CLIENTS } from '../../queries/clientQueries';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">

            <tbody className="text-gray-600">
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
