import React from "react";
import BarChartComponent from "./Barchart";
import LineChartComponent from "./Linechart";
import Piechart from "./Piechart";
export default function Dashboard() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-left justify-center px-4 md:px-8 xl:px-10 py-44">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mt- -157">
          <GridItem title="Bar Chart">
            <BarChartComponent />
          </GridItem>
          <GridItem title="Bar Chart">
            <LineChartComponent />
          </GridItem>
          <GridItem title="Bar Chart">
            <Piechart />
          </GridItem>
        </div>
      </main>
    </>
  );
}
function GridItem({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-slate-900  rounded-xl h-[400px]">
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}
