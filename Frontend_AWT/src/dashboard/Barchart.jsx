import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Barchart.css";

const salesData = [
  {
    name: "Jan",
    profit: 2400,
  },
  {
    name: "Feb",
    profit: 1398,
  },
  {
    name: "Mar",
    profit: 2000,
  },
  {
    name: "Apr",
    profit: 2780,
  },
  {
    name: "May",
    profit: 1890,
  },
  {
    name: "Jun",
    profit: 2390,
  },
  {
    name: "Jun",
    profit: 2390,
  },
  {
    name: "Jun",

    profit: 2390,
  },
  {
    name: "Jun",
    revenue: 3800,
    profit: 2390,
  },
  {
    name: "Jun",

    profit: 2390,
  },
  {
    name: "Jun",

    profit: 2390,
  },
  {
    name: "Jun",

    profit: 2390,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip-container">
        <p className="tooltip-text">{label}</p>

        <p className="tooltip-profit">
          Profit:
          <span className="ml-2">${payload[0].value}</span>
        </p>
      </div>
    );
  }
};

const BarChartComponent = () => {
  return (
    
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Bar dataKey="profit" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
