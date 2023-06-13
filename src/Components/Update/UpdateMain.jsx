import React from "react";
import { useLoaderData } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import Swal from "sweetalert2";
const UpdateMain = () => {
  const theLoadedUsers = useLoaderData();
  console.log(theLoadedUsers);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const img = form.img.value;
    const description = form.description.value;
    const user = {
      name,
      img,
      description,
    };

    form.reset();

    fetch(`http://localhost:4000/users/${theLoadedUsers._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Toy updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };
  return (
    <div>
      <div>
        <NavigationBar />
        <div className="post-card mt-5 p-2 lg:p-20 pb-10">
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="img"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="img"
                  className="border border-gray-400 p-2 w-full"
                  name="img"
                  defaultValue={theLoadedUsers.img}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                     Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="border border-gray-400 p-2 w-full"
                    name="name"
                    defaultValue={theLoadedUsers?.name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="name"
                    className="border border-gray-400 p-2 w-full"
                    name="name"
                    defaultValue={theLoadedUsers?.email}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Detail Description
                </label>
                <textarea
                  id="description"
                  className="border border-gray-400 p-2 w-full"
                  name="description"
                  defaultValue={theLoadedUsers?.description}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Updated
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMain;
