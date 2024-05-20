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

const LineChartComponent = () => {
  let userId;
  const [interviewData, setInterviewData] = useState([]);
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    console.log("User ID:", userId);
  } else {
    console.error("JWT token not found in local storage.");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/getaveragescoreline/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const formattedData = data.map(({ date_time, average_score }) => ({
          date: new Date(date_time), // Parse date_time string to Date object
          average_score: average_score || 0, // If average_score is null, replace it with 0
        }));
        setInterviewData(formattedData);
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
            Average Score:
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
        data={interviewData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => date.toLocaleDateString()}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="average_score" stroke="#8b5cf6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
