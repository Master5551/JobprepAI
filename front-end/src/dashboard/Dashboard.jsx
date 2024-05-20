import React from "react";
import BarChartComponent from "./Barchart";
import Piechart from "./Piechart";
import "./dashboard.css"; // Import the CSS file
import Header from "./Header/Header";
import PersonalHigh from "./User_dashboard_cards/PersonalHigest";
import ProfilePage from "./Profilepage";
import BarChartComponentAdmin from "./admin_pages/Subjects/Barchart_admin";
import LineChartComponentAdmin from "./admin_pages/Subjects/Linechat_admin";

export default function Dashboard() {
  let userId;
  let isadmin;
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    isadmin = decodedToken.isadmin;
    console.log("User ID:", userId);
  } else {
    console.error("JWT token not found in local storage.");
  }

  return (
    <>
      {!isadmin ? (
        <>
          <div className="flex-container">
            <PersonalHigh
              backgroundColor="lightblue"
              apiUrl={`http://localhost:3001/getuniquesubjects/${userId}`}
              title={"Explored JobRoles"}
              showDropdown={false}
            />

            <PersonalHigh
              backgroundColor="lightgreen"
              apiUrl={`http://localhost:3001/gettotalinterviews/${userId}`}
              title={"Total Interviews"}
              showDropdown={false}
            />
            <PersonalHigh
              title={"No. Of Interviews by JobRole"}
              backgroundColor="royalblue"
              apiUrl={`http://localhost:3001/getinterviewcountbyrole/${userId}`}
              showDropdown={true}
            />
          </div>
          <main className="dashboard-main">
            <div className="grid-container">
              <GridItem title="Bar Chart">
                <BarChartComponent />
              </GridItem>

              <GridItem title="Line Chart">{/* <Piechart /> */}</GridItem>
            </div>
          </main>
        </>
      ) : (
        <>
          <div className="flex-container">
            <PersonalHigh
              title={""}
              apiUrl={"http://localhost:3001/admin"}
              backgroundColor="royalblue"
              showDropdown={true}
            ></PersonalHigh>
            <PersonalHigh
              title={"Total Candidates"}
              apiUrl={"http://localhost:3001/totalusers"}
              backgroundColor="royalblue"
            ></PersonalHigh>
            <PersonalHigh
              title={"Total Interviews"}
              apiUrl={"http://localhost:3001/totalinterview"}
              backgroundColor="lightblue"
            ></PersonalHigh>

            <PersonalHigh
              title={"Total Jobroles"}
              apiUrl={"http://localhost:3001/totalsubjects"}
              backgroundColor="lightgreen"
            ></PersonalHigh>
          </div>
          <main className="dashboard-main">
            <div className="grid-container">
              <GridItem title="Bar Chart">
                <BarChartComponentAdmin />
              </GridItem>

              <GridItem title="Line Chart">
                <LineChartComponentAdmin />
              </GridItem>
            </div>
          </main>
        </>
      )}
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
