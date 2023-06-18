import React, { useEffect, useState } from "react";
import axios from "axios";

const Status = () => {
  const [loadedStatus, setLoadedStatus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/status")
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
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={status.image}
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="font-bold text-xl">{status.name}</div>
              </div>
            </div>
            <div className="mt-4 text-start">
              <p className="text-gray-700 text-base font-semibold">
                {status.mystatus}
              </p>
            </div>
            {status.img && (
              <img
                src={status?.img}
                alt="Status Image"
                className="w-full h-80 object-contain mt-4"
              />
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-2xl mt-8">There are no posts yet.</div>
      )}
    </div>
  );
};

export default Status;
