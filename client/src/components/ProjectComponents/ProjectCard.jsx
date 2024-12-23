export default function ProjectCard({ project }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h5 className="text-lg font-bold text-gray-800">{project.name}</h5>
            <a
              className="text-green-600 font-medium hover:underline"
              href={`/projects/${project.id}`}
            >
              View
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Status: <strong className="text-gray-800">{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
