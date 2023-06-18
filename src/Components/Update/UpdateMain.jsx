import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateMain = ({ closeModal, defaultStatus, postId, setData }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const mystatus = form.status.value;
    const updatedStatus = {
      mystatus,
    };

    try {
      const response = await fetch(`http://localhost:4000/status/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStatus),
      });
      const data = await response.json();
      console.log(data);

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Status updated successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });

        // Update the post in the local state of MyPost component
        setData((prevData) =>
          prevData.map((item) =>
            item._id === postId ? { ...item, mystatus } : item
          )
        );

        // Close the modal
        closeModal();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating the status.",
        "error"
      );
    }
  };

  return (
    <div>
      <div className="post-card mt-5 p-2 lg:p-20 pb-10">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              >
                Detail Description
              </label>
              <input
                id="status"
                className="border border-gray-400 p-2 "
                name="status"
                defaultValue={defaultStatus}
                required
                style={{ height: "100px", width: "350px", }}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMain;
