import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "./navigation";
import "./sidebar.css";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
// import { Navigate } from "react-router-dom";
export default function Sidebar() {
  // const navigate = Navigate();
  let isadmin;
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    isadmin = decodedToken.isadmin;
    console.log("Is Admin:", isadmin);
  } else {
    console.error("JWT token not found in local storage.");
  }

  const handleLogout = async () => {
    try {
      // Make the API call asynchronously
      const response = await fetch("http://localhost:3001/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout API call successful");
      } else {
        console.error("Logout API call failed");
      }
    } catch (error) {
      console.error("Error occurred during logout API call:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link className="logo" to="/index">
          <img
            src={logoLight}
            className="h-6 inline-block dark:hidden"
            alt=""
          />
          <img
            src={logoLight}
            className="h-6 hidden dark:inline-block"
            alt=""
          />
        </Link>
      </div>
      <div className="sidebar-links">
        {DASHBOARD_SIDEBAR_LINKS.filter(
          (link) =>
            (!link.isadmin || (link.isadmin && isadmin)) &&
            !(isadmin && link.key === "products")
        ).map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="sidebar-bottom-links">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.filter(
          (link) => !link.isadmin || (link.isadmin && isadmin)
        ).map((link) => (
          <SidebarBottomLink
            key={link.key}
            link={link}
            handleLogout={handleLogout}
          />
        ))}
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

function SidebarBottomLink({ link, handleLogout }) {
  const { pathname } = useLocation();

  const handleClick = (event) => {
    if (link.key === "logout") {
      console.log("clicked logout");
      handleLogout(); // Call the handleLogout function passed as prop
    }
  };

  return (
    <Link
      to={link.path}
      className={classNames("sidebar-link", {
        "bg-neutral-700 text-white": pathname === link.path,
      })}
      onClick={handleClick}
    >
      {link.icon}
      {link.label}
    </Link>
  );
}
