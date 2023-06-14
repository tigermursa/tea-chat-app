import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Post from "./Components/Post/Post.jsx";
import Update from "./Components/Update/Update.jsx";
import UpdateMain from "./Components/Update/UpdateMain.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import LogIn from "./Components/LogIn/LogIn.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import AuthProvider from "./Components/Provider/AuthProvider.jsx";
import AllUsers from "./Components/AllUsers/AllUsers.jsx";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo.jsx";
import NewsFeed from "./Components/NewsFeed/NewsFeed.JSX";
import Status from "./Components/Status/Status.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/users",
        element: <AllUsers></AllUsers>,
        loader: () => fetch("http://localhost:4000/users"),
      },
      {
        path: "/post/:id",
        element: <Post></Post>,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/users/${params.id}`),
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/profileinfo",
        element: <ProfileInfo></ProfileInfo>,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/users/${params.id}`),
      },
      {
        path: "/feed",
        element: <NewsFeed></NewsFeed>,
        children: [
          {
            path: "/feed/status",
            element: <Status></Status>,
            
          },
        ],
      },
      {
        path: "/update",
        element: <Update></Update>,
        loader: () => fetch("http://localhost:4000/users"),
      },
      {
        path: "/updateMain/:id",
        element: <UpdateMain />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/users/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
