import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import Post from "../Post/Post";
import axios from "axios";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
    padding: "20px",
    minWidth: "300px",
    maxWidth: "600px",
    width: "90%",
  },
};

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    const fetchUserToys = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/email/${user?.email}`
        );
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user toys:", error);
      }
    };

    if (user) {
      fetchUserToys();
    }
  }, [user, dataUpdated]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDataUpdate = () => {
    setDataUpdated(true);
  };

  return (
    <div className="flex w-full flex-col">
      {users.map((user) => (
        <div key={user._id}>
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-auto object-scale-down"
              src={user.image}
              alt="Profile"
            />
            <h2 className="font-semibold mt-2">{user.name}</h2>
          </div>
          <div>
            <button
              className="btn btn-outline btn-sm mt-10"
              onClick={openModal}
            >
              Post Status
            </button>
          </div>
          <Link to={`/mypost/${user._id}`}>
            <button className="btn btn-outline btn-sm mt-10">
              My all posts
            </button>
          </Link>
        </div>
      ))}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Post Status Modal"
        ariaHideApp={false}
      >
        {users.length > 0 && (
          <Post
            closeModal={closeModal}
            defaultUserName={users[0].name}
            defaultUserImage={users[0].image}
            defaultUserEmail={users[0].email}
            updateData={handleDataUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProfileInfo;
