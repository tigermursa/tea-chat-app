import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
        About This Website
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
        <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
          Welcome to my social app! This website is built using{" "}
          <span className="text-green-600">ReactJS</span> for the frontend,{" "}
          <span className="text-green-600">MongoDB</span> for the database, and{" "}
          <span className="text-green-600">Node.js</span> with{" "}
          <span className="text-green-600">Express.js</span> for the backend.
        </p>
        <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed mt-4">
          On this platform, users can create an account, post photos, and
          interact with others. Currently, all posts are shown in the news feed
          without any restrictions, but in the future, I plan to make posts
          visible only to friends.
        </p>
        <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed mt-4">
          The website also includes a chat feature that allows users to
          communicate with each other in real-time.
        </p>
        <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed mt-4">
          I hope you enjoy using the website and connecting with others in this
          social community!
        </p>
      </div>
    </div>
  );
};

export default About;
