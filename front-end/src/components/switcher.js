import React from "react";
import { FiMoon, FiSun } from "../assets/icons/vander";

export default function Switcher() {
  function changeMode(mode, event) {
    switch (mode) {
      case "mode":
        if (document.documentElement.className.includes("dark")) {
          document.documentElement.className = "light";
          document.documentElement.setAttribute("data-theme", "light");
        } else {
          document.documentElement.className = "dark";
          document.documentElement.setAttribute("data-theme", "dark");
        }
        updateTextareaColor(); // Update textarea text color when switching mode
        break;

      default:
        break;
    }
  }

  // Function to update textarea text color
  const updateTextareaColor = () => {
    const textarea = document.getElementById("transcript");
    if (textarea) {
      textarea.style.color = document.documentElement.className.includes("dark")
        ? "white"
        : "black";
    }
  };

  return (
    <>
      <div className="fixed top-1/2 -right-4 z-2">
        <span className="relative inline-block rotate-60">
          <input
            type="checkbox"
            className="checkbox opacity-0 absolute"
            id="chk"
            onClick={(event) => changeMode("mode", event)}
          />
          <label
            className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
            htmlFor="chk"
          >
            <FiMoon className="h-[18px] w-[18px] text-yellow-500" />
            <FiSun className="h-[18px] w-[18px] text-yellow-500" />

            <span
              className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"
              // No need for inline style here
            ></span>
          </label>
        </span>
      </div>
    </>
  );
}
