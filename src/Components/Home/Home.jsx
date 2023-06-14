import React from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import NewsFeed from "../NewsFeed/NewsFeed.JSX";

const Home = () => {
  return (
    <div className="mt-5">
      <div className="flex center">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="w-4/10 pr-4">
            <ProfileInfo></ProfileInfo>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="w-6/10 pl-4 overflow-y-auto">
            <NewsFeed></NewsFeed>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
