import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const Post = ({
  closeModal,
  defaultUserName,
  defaultUserImage,
  defaultUserEmail,
  updateStatusList,
}) => {
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [userNameValue] = useState(defaultUserName);
  const [userImageValue] = useState(defaultUserImage);
  const [userEmailValue] = useState(defaultUserEmail);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const mystatus = statusValue;
    const name = userNameValue;
    const image = userImageValue;
    const email = userEmailValue;
    const status = {
      email,
      image,
      mystatus,
      name,
      img: imgURL,
    };
    form.reset();

    setLoading(true);

    axios
      .post("https://server-tea-chat.vercel.app/status", status, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        const data = response.data;
        window.location.reload(); // Reload the page
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Status Added to the Database",
            icon: "success",
            confirmButtonText: "Cool",
          }).then((result) => {
            if (result.isConfirmed) {
              closeModal();
              updateStatusList(status);
            }
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error adding status:", error);
      });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
        formData
      );

      const data = response.data;
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
        <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              ></label>
              <input
                id="status"
                className="border-2 rounded-lg border-purple-900 mt-3 w-80 lg:w-96 h-44 text-center mx-auto"
                name="status"
                placeholder="What's on your mind?"
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 mt-12">
              <label
                htmlFor="img"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="img"
                className="border-2 rounded-lg p-3 border-purple-900 w-80 lg:w-96 mt-3"
                name="img"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            {/* hidden items */}
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
              />
            </div>
            <div className="flex gap-5 justify-end mt-10">
              <button
                type="submit"
                className="btn btn-active btn-secondary"
                disabled={loading} // Disable the button during loading
              >
                {loading ? "Uploading..." : "Create"}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-primary"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
