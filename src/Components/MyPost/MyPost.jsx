import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import "./MyPost.css";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import UpdateMain from "../Update/UpdateMain";

// Custom CSS styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "1000",
    transition: "opacity 0.3s",
  },
};

const MyPost = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://server-tea-chat.vercel.app/status/email/${user?.email}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`https://server-tea-chat.vercel.app/status/${itemId}`, {
            method: "DELETE",
          });
          fetchData();
          Swal.fire("Deleted!", "Your card has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the card.",
            "error"
          );
        }
      }
    });
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  return (
    <div className="w-full grid gap-4 md:grid-cols-3">
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item._id}
            className=" bg-white rounded-lg shadow-lg p-4 m-2"
          >
            {item.img && (
              <img
                src={item.img}
                alt="Post Image"
                className="card-image w-full h-auto"
              />
            )}

            <div className="card-content">
              <p className="card-status mt-4 text-xl">
                Status: {item.mystatus}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="delete-button text-red-700 p-2 rounded-full"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash className="bin-icon" />
              </button>
              <button
                className="delete-button text-red-700 btn btn-info btn-outline rounded-full"
                onClick={() => openModal(item)}
              >
                Update
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center  flex  p-4">
            <p className="text-3xl font-semibold">
              You have no posts yet &#128513;
            </p>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Update Modal"
        ariaHideApp={false}
      >
        {selectedPost && (
          <UpdateMain
            closeModal={closeModal}
            defaultStatus={selectedPost.mystatus}
            postId={selectedPost._id}
            setData={setData}
          />
        )}
      </Modal>
    </div>
  );
};

export default MyPost;
