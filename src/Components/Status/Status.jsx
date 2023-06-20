import React, { useEffect, useState } from "react";
import axios from "axios";

// Utility function to format the time difference
const formatTimeDifference = (timestamp) => {
  if (!timestamp || isNaN(new Date(timestamp).getTime())) {
    return "";
  }

  const currentTime = new Date().getTime();
  const postTime = new Date(timestamp).getTime();
  const differenceInSeconds = Math.floor((currentTime - postTime) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} sec ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} min ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} h ago`;
  } else {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} d ago`;
  }
};

const Status = () => {
  const [loadedStatus, setLoadedStatus] = useState([]);

  useEffect(() => {
    axios
      .get("https://server-tea-chat.vercel.app/status")
      .then((response) => {
        const data = response.data;
        setLoadedStatus(data.reverse()); // Reverse the array of loadedStatus
      })
      .catch((error) => {
        console.log("Error fetching status:", error);
      });
  }, []);

  return (
    <div>
      {loadedStatus.length > 0 ? (
        loadedStatus.map((status, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 mb-20 relative"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={status.image}
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="ml-3 flex flex-col items-start">
                <div className="font-bold text-xl">{status.name}</div>
                <div className="text-gray-500 text-sm  ">
                  {formatTimeDifference(status.dateTime)}
                </div>
              </div>
            </div>
            <div className="mt-4 text-start">
              <p className="text-gray-700 text-base font-semibold">
                {status.mystatus}
              </p>
            </div>
            <div>
              {status.img && (
                <img
                  src={status?.img}
                  alt="Status Image"
                  className="w-full h-80 object-contain mt-4"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-2xl mt-8">There are no posts yet.</div>
      )}
    </div>
  );
};

export default Status;
