import React from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Status from "../Status/Status";

const Home = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="mt-5">
      {isMobile ? (
        // Drawer for smaller screens
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
              <span className="material-icons">menu</span>
            </label>
            <div>
              <Status></Status>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <ProfileInfo></ProfileInfo>
            </ul>
          </div>
        </div>
      ) : (
        // Divided layout for larger screens
        <div className="flex center border-2 p-5">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="w-44 mx-auto md:mx-0 lg:mx-0">
              <ProfileInfo></ProfileInfo>
            </div>
            {/* divider */}
            <div className="divider lg:divider-horizontal"></div>
            <div className="w-80 md:w-full md:ms-10 mx-auto lg:ms-10 me-0 md:me-10 ">
              <h1 className="text-4xl mb-7 font-semibold">News Feed</h1>
              <Status></Status>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
