import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

const ProjectCharts = ({ stats, monthlyData }) => {
  const barData = [
    { name: 'Completed', value: stats.completed },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Not Started', value: stats.notStarted }
  ];

  const pieData = barData.map(item => ({
    name: item.name,
    value: (item.value / stats.total) * 100
  }));

  const COLORS = ['#22c55e', '#eab308', '#64748b'];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Status Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Project Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Project Status Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clients & Projects Line Chart */}
    
      </div>
    </div>
  );
};

export default ProjectCharts;