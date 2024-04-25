import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import "./piechart.css"; // Import the CSS file

export default function DonutChart() {
  const data = [
    { name: "Group A", students: 400 },
    { name: "Group B", students: 300 },
    { name: "Group C", students: 300 },
    { name: "Group D", students: 200 },
  ];

  return (
    <div className="chart-container">
      <h3 className="chart-title">
        React JS example for donut chart using Recharts
      </h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="students"
              outerRadius={100}
              innerRadius={50}
              fill="green"
              label={({ name, students }) => `${name}: ${students}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
