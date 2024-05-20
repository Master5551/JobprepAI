import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./layout.css"; // Import the CSS file
import Header from "./Header/Header";
export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar isAdmin={false} />
      <div className="layout-content">
        <Header />
        <div className="layout-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
