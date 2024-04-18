import React from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

export default function TaskCounts({ data }) {
  const COLORS = { "Completed Tasks": "#00C49F", "Not Completed Tasks": "#FF8042" };

  return (
    <div className="task-counts-container">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="task-counts-button">
        <Link to='/MyTasks' style={{ textDecoration: 'none' }}>
          <button>
            Back to My Tasks
          </button>
        </Link>
      </div>
    </div>
  );
}
