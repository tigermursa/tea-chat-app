import React, { useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import Swal from "sweetalert2";
import "./Post.css";
const Post = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const img = form.img.value;
    const description = form.description.value;
    const user = {
      name,
      img,
      description,
      email,
    };
    form.reset();
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Food Added to the Data Base",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
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
                placeholder="Photo URL link address here"
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
                  placeholder=" Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-400 p-2 w-full"
                  name="email"
                  placeholder="email"
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
                placeholder="Detail Description"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
