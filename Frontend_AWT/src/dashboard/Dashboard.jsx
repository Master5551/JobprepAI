import React from "react";
import BarChartComponent from "./Barchart";
import Piechart from "./Piechart";
import "./dashboard.css"; // Import the CSS file
import Header from "./Header";
import Scores from "./scores";

export default function Dashboard() {
  return (
    <>
      <Header></Header>
      <main className="dashboard-main">
        <div className="grid-container">
          <GridItem title="Bar Chart">
            <BarChartComponent />
          </GridItem>
          <GridItem title="Line Chart">{/* <LineChartComponent /> */}</GridItem>
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
