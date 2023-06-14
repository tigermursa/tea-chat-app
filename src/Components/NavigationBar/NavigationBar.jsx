import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserAlt } from "react-icons/fa";

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
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {isMobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/" onClick={() => handleItemClick("home")}>
                  Item 1
                </NavLink>
              </li>
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
                <NavLink to="/blogs" onClick={() => handleItemClick("blogs")}>
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={() => handleItemClick("login")}>
                  {user ? "Log Out" : "Log In"}
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <NavLink to="/">
          <div className="btn btn-ghost normal-case text-xl">
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
            <NavLink to="/" onClick={() => handleItemClick("home")}>
              Home
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/users" onClick={() => handleItemClick("mytoys")}>
                All Users
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/blogs" onClick={() => handleItemClick("blogs")}>
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="hidden md:block">
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
