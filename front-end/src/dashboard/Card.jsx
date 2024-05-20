import React, { useState } from "react";
import BarChart from "./Barchart";
// import LineChart from "./Linechart";
// import PieChart from "./Piechart";
import "./cardStyles.css"; // Import the CSS file

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
      //   case "line":
      //     return <LineChart></LineChart>;
      //   case "pie":
      //     return <PieChart></PieChart>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`card p-4 rounded-lg shadow-md relative`}
      onClick={handleExpand}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">{title}</h2>
          <p className="card-subtitle">{subtitle}</p>
        </div>
      </div>
      {expanded && (
        <div className="card-content">
          {renderChart()} {/* Render chart based on chart type */}
        </div>
      )}
    </div>
  );
};

export default Card;
