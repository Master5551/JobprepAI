import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { FiMoon, FiSun, AiOutlineArrowUp } from "../assets/icons/vander";

export default function Switcher() {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollTop(window.scrollY > 50);
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  function changeMode(mode, event) {
    switch (mode) {
      case "mode":
        if (document.documentElement.className.includes("dark")) {
          document.documentElement.className = "light";
        } else {
          document.documentElement.className = "dark";
        }
        break;

      default:
        break;
    }
  }
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

            <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
          </label>
        </span>
      </div>

      <Link
        to="#"
        onClick={scrollToTop}
        id="back-to-top"
        className={`${
          scrollTop
            ? "back-to-top fixed flex items-c enter  justify-center text-lg rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center  bg-amber-400 hover:bg-amber-500 text-white  leading-9"
            : "none"
        } `}
      >
        <AiOutlineArrowUp />
      </Link>
    </>
  );
}
