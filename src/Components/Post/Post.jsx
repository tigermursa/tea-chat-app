import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const Post = ({ closeModal, defaultUserName, defaultUserImage }) => {
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [userNameValue] = useState(defaultUserName);
  const [userImageValue] = useState(defaultUserImage);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const mystatus = statusValue;
    const name = userNameValue;
    const image = userImageValue;
    const status = {
      image,
      mystatus,
      name,
      img: imgURL,
    };
    form.reset();

    fetch("http://localhost:4000/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Status Added to the Database",
            icon: "success",
            confirmButtonText: "Cool",
          });
          closeModal();
        }
      })
      .catch((error) => {
        console.log("Error adding status:", error);
      });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setImgURL(data.data.display_url);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                type="file"
                id="img"
                className="border border-gray-400 p-2 w-full"
                name="img"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              >
                Status
              </label>
              <input
                id="status"
                className="border border-gray-400 p-2 w-full"
                name="status"
                placeholder="Your status"
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 hidden">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              >
                User Name
              </label>
              <input
                id="userName"
                className="border border-gray-400 p-2 w-full"
                name="userName"
                placeholder="Name"
                value={userNameValue}
                readOnly
                required
              />
            </div>
            <div className="mb-4 hidden">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              >
                User Image
              </label>
              <input
                id="userImage"
                className="border border-gray-400 p-2 w-full"
                name="userName"
                placeholder="User Image"
                value={userImageValue}
                readOnly
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!imgURL || loading}
            >
              {loading ? "Uploading..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
