// Card.jsx
import React, { useState } from "react";
import BarChart from "./Barchart";
import LineChart from "./Linechart";
import PieChart from "./Piechart";

const Card = ({ title, subtitle, chartType }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to handle expansion
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  // Function to render chart based on chart type
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <BarChart></BarChart>;
      case "line":
        return <LineChart></LineChart>;
      case "pie":
        return <PieChart></PieChart>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md cursor-pointer relative`}
      onClick={handleExpand}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
      {expanded && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg w-4/5">
          {renderChart()} {/* Render chart based on chart type */}
        </div>
      )}
    </div>
  );
};

export default Card;
