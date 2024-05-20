import React, { useState, useEffect } from "react";
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
import { Button } from "@mui/material";
import "../../Barchart.css";

const BarChartComponentAdmin = () => {
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
  const [showMonthly, setShowMonthly] = useState(false); // State for showing monthly button
  const [tooltipColor, setTooltipColor] = useState(""); // State for tooltip color

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/gettotalinterviewsbyyear/`
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
      // Get color of the first bar
      const color = payload[0].fill;
      // Set color of the button
      setTooltipColor(color);

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

  const handleMonthlyClick = (label) => {
    // Handle logic for monthly button click, e.g., display monthly data
    console.log("Monthly button clicked for:", label);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div className="chart-container">
        <BarChart
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
          <Bar dataKey="number" fill="#8b5cf6" />
        </BarChart>
        {showMonthly && (
          <Button
            className="monthly-button"
            onClick={() => handleMonthlyClick("label")}
            style={{ backgroundColor: tooltipColor, color: "black" }}
          >
            Monthly
          </Button>
        )}
      </div>
    </ResponsiveContainer>
  );
};

export default BarChartComponentAdmin;
