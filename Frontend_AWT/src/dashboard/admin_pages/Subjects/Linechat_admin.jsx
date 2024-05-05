import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../linechart.css"; // Assuming you'll create a separate CSS file for LineChart

const LineChartComponentAdmin = () => {
  let userId;
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    console.log("User ID:", userId);
  } else {
    console.error("JWT token not found in local storage.");
  }

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/gettotalinterviewsbyyear`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const formattedData = data.map(({ interview_year, num_interview }) => ({
          year: interview_year.toString(),
          number: num_interview,
        }));
        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ensure the effect runs only once on component mount

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-container">
          <p className="tooltip-text">{label}</p>
          <p className="tooltip-profit">
            Number of Interviews:
            <span className="ml-2">{payload[0].value}</span>
          </p>
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="number" stroke="#8b5cf6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponentAdmin;
