import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FcAcceptDatabase, FcDatabase } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "./navigation";
import "./sidebar.css"; // Import the CSS file

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <FcDatabase className="sidebar-logo-icon" />
        <span className="sidebar-logo-text">Job Prep AI</span>
      </div>
      <div className="sidebar-links">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="sidebar-bottom-links">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames("sidebar-bottom-link", "text-red-500")}>
          <HiOutlineLogout className="text-xl" />
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames("sidebar-link", {
        "bg-neutral-700 text-white": pathname === link.path,
      })}
    >
      {link.icon}
      {link.label}
    </Link>
  );
}
