import React, { useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const usersFormFetch = useLoaderData([]);
  const [users, setUsers] = useState(usersFormFetch);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-tea-chat.vercel.app/users/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = users.filter((user) => user._id !== _id);
              setUsers(remaining);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

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
              <Link to={`/updateMain/${user._id}`}>
                <button className="bg-green-700 text-white p-3 rounded-md">
                  Update
                </button>
              </Link>
              <div>
                <button
                  className="bg-red-700 text-white p-3 rounded-md"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Update;
