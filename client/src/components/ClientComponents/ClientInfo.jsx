import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }) {
  return (
    <div className="mt-6">
      <h5 className="text-xl font-semibold text-gray-800 mb-4">Client Information</h5>
      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <li className="flex items-center p-4">
          <FaIdBadge className="text-green-600 mr-3" />
          <span className="text-gray-700">{client.name}</span>
        </li>
        <li className="flex items-center p-4">
          <FaEnvelope className="text-blue-600 mr-3" />
          <span className="text-gray-700">{client.email}</span>
        </li>
        <li className="flex items-center p-4">
          <FaPhone className="text-teal-600 mr-3" />
          <span className="text-gray-700">{client.phone}</span>
        </li>
      </ul>
    </div>
  );
}
