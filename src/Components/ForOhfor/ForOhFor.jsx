import React from "react";
import useTitle from "../../Hooks/useTitle";

const ForOhFor = () => {
  useTitle("404");
  return (
    <div className="flex items-center justify-center h-screen bg-blue-950">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-8  text-white">Oops 404!</h1>
        <h1 className="text-5xl font-bold mb-8  text-white">Page Not Found</h1>
        <p className="text-2xl mb-8  text-white">
          "Looks like you're lost in cyberspace
        </p>
        <img
          src="https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif"
          alt="404"
          className="mb-8 rounded-full"
        />
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ForOhFor;
