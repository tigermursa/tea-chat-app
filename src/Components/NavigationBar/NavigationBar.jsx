import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserAlt, FaLeaf } from "react-icons/fa";

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOutUser, user } = useContext(AuthContext);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const signOutHandler = () => {
    signOutUser()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className=" lg:hidden"
            onClick={toggleMobileMenu}
          >
            <FaLeaf className="ms-2 me-2 text-3xl text-green-700"/>
          </label>
          {isMobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user && (
                <li>
                  <NavLink
                    to="/users"
                    onClick={() => handleItemClick("mytoys")}
                  >
                    All Users
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/about" onClick={() => handleItemClick("about")}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={() => handleItemClick("login")}>
                  {user ? (
                    <button
                      onClick={signOutHandler}
                      className={`btn btn-ghost  ms-5 ${
                        activeItem === "login" ? "activeNavItem" : ""
                      }`}
                    >
                      Log Out
                    </button>
                  ) : (
                    <button
                      className={`btn btn-ghost   ms-5 ${
                        activeItem === "login" ? "activeNavItem" : ""
                      }`}
                    >
                      Log In
                    </button>
                  )}
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <NavLink to="/">
          <div className="btn btn-ghost normal-case text-xl ms-10 md:ms-3">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="w-14 h-14 rounded-full me-2"
                src="https://png.pngtree.com/png-vector/20221023/ourmid/pngtree-green-tea-logo-png-image_6383759.png"
                alt=""
              />
              <p className="text-2xl font-bold">TEA CHAT</p>
            </div>
          </div>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              exact
              to="/"
              onClick={() => handleItemClick("home")}
              activeClassName="activeLink"
            >
              Home
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/users"
                onClick={() => handleItemClick("mytoys")}
                activeClassName="activeLink"
              >
                All Users
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/about"
              onClick={() => handleItemClick("about")}
              activeClassName="activeLink"
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className=" md:block me-10 md:me-0">
          {user ? (
            <img
              className="profile-pic"
              title={user.displayName}
              src={user.photoURL}
              alt=""
            />
          ) : (
            <p className="text-2xl rounded-full">
              <FaUserAlt />
            </p>
          )}
        </div>
        <NavLink to="/login" onClick={() => handleItemClick("login")}>
          {user ? (
            <button
              onClick={signOutHandler}
              className={`btn btn-ghost hidden md:block ms-5 ${
                activeItem === "login" ? "activeNavItem" : ""
              }`}
            >
              Log Out
            </button>
          ) : (
            <button
              className={`btn btn-ghost hidden md:block ms-5 ${
                activeItem === "login" ? "activeNavItem" : ""
              }`}
            >
              Log In
            </button>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationBar;
