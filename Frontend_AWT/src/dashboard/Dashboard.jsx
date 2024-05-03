import React from "react";
import BarChartComponent from "./Barchart";
import Piechart from "./Piechart";
import "./dashboard.css"; // Import the CSS file
import Header from "./Header/Header";

export default function Dashboard() {
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "option1") {
    } else if (selectedOption === "option2") {
    } else if (selectedOption === "option3") {
    }
  };
  return (
    <>
      <div className="dropdown-container">
        <select
          style={{
            color: "black",
            padding: "5px",
            borderRadius: "5px",
          }}
          onChange={handleOptionChange}
        >
          <option value="option1" style={{ color: "black" }}>
            Option 1
          </option>
          <option value="option2" style={{ color: "black" }}>
            Option 2
          </option>
          <option value="option3" style={{ color: "black" }}>
            Option 3
          </option>
        </select>
      </div>
      <main className="dashboard-main">
        <div className="grid-container">
          <GridItem title="Bar Chart">
            <BarChartComponent />
          </GridItem>

          <GridItem title="Pie Chart">
            <Piechart />
          </GridItem>
        </div>
      </main>
    </>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="grid-item">
      <h3 className="grid-item-title">{title}</h3>
      {children}
    </div>
  );
}
