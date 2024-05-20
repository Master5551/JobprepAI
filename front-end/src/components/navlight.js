import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import logoWhite from "../assets/images/logo-white.png";

export default function NavLight() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    activateMenu();
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []); // Add activateMenu to dependency array

  function getClosest(elem, selector) {
    // Polyfill for Element.matches()
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Find the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  }

  function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
          break;
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");

        var immediateParent = getClosest(matchingMenuItem, "li");

        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        var parent = getClosest(immediateParent, ".child-menu-item");
        if (parent) {
          parent.classList.add("active");
        }

        parent = getClosest(parent || immediateParent, ".parent-menu-item");
        if (parent) {
          parent.classList.add("active");

          var parentMenuItem = parent.querySelector(".menu-item");
          if (parentMenuItem) {
            parentMenuItem.classList.add("active");
          }

          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          // Remove this else block if not needed
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
    }
  }

  return (
    <>
      <nav
        id="topnav"
        className={`${scroll ? "nav-sticky" : ""} defaultscroll is-sticky`}
      >
        <div className="container">
          <Link className="logo" to="/">
            <span className="inline-block dark:hidden">
              {/* <img src={logoDark} className="h-6 l-dark" alt="" /> */}
              {/* <img src={logoWhite} className="h-6 l-light" alt="" /> */}
            </span>
            <img
              // src={logoLight}
              className="h-6 hidden dark:inline-block"
              alt=""
            />
          </Link>

          <div className="menu-extras">
            <div className="menu-item">
              <Link
                className={`${toggleMenu ? "open" : ""} navbar-toggle`}
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>

          <ul className="buy-button list-none mb-0">
            <li className="inline mb-0">
              <Link to="/login">
                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                  Login
                </span>
                <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">
                  Login
                </span>
              </Link>
            </li>

            <li className="md:inline hidden ps-1 mb-0 ">
              <Link
                to="/signup"
                target="_blank"
                className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold"
              >
                Signup
              </Link>
            </li>
          </ul>

          <div id="navigation" className={`${toggleMenu ? "block" : ""}`}>
            <ul className="navigation-menu nav-light">
              <li>
                <Link to="/" className="sub-menu-item">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="sub-menu-item">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="sub-menu-item">
                  Pricing{" "}
                </Link>
              </li>

              <li className="has-submenu parent-parent-menu-item">
                <Link to="#">Pages</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link to="/services" className="sub-menu-item">
                      Services
                    </Link>
                  </li>

                  <li>
                    <Link to="/helpcenter" className="sub-menu-item">
                      Helpcenter
                    </Link>
                  </li>

                  <li className="has-submenu parent-menu-item">
                    <Link to="#"> Auth Pages </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link to="/login" className="sub-menu-item">
                          {" "}
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup" className="sub-menu-item">
                          {" "}
                          Signup
                        </Link>
                      </li>
                      <li>
                        <Link to="/reset-password" className="sub-menu-item">
                          {" "}
                          Forgot Password
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link to="#"> Utility </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link to="/terms" className="sub-menu-item">
                          Terms of Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/privacy" className="sub-menu-item">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="/error" className="sub-menu-item">
                      {" "}
                      404!
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/contact" className="sub-menu-item">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
