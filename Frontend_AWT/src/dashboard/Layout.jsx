import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./layout.css"; // Import the CSS file

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <div className="layout-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
