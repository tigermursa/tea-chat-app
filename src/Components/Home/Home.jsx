import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData([]);
  console.log(users);
  return (
    <div>
      <NavigationBar />
      <div className="space-y-4 text-center mt-5">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded shadow">
            <img src={user.img} alt="" className="w-28 h-auto m-auto" />
            <div className="p-4">
              <p className="text-lg font-bold mb-2">{user.name}</p>
              <p className="text-gray-600">{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
