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

import MyPost from "./Components/MyPost/MyPost.jsx";
import Status from "./Components/Status/Status.jsx";
import ForOhFor from "./Components/ForOhfor/ForOhFor.jsx";
import About from "./Components/About/About.jsx";
import PrivateRoute from "./Components/Private/PrivateRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element:  <PrivateRoute><Home></Home></PrivateRoute> ,
      },
      {
        path: "/users",
        element: <AllUsers></AllUsers>,
        loader: () => fetch("https://server-tea-chat.vercel.app/users"),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/post/:id",
        element: <Post></Post>,
        loader: ({ params }) =>
          fetch(`https://server-tea-chat.vercel.app/users/${params.id}`),
      },
      {
        path: "/mypost/:id",
        element: <MyPost></MyPost>,
        loader: ({ params }) =>
          fetch(`https://server-tea-chat.vercel.app/status/${params.id}`),
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
          fetch(`https://server-tea-chat.vercel.app/users/${params.id}`),
      },
      {
        path: "/feed",
        element: <Status></Status>,
      },
      {
        path: "/update",
        element: <Update></Update>,
        loader: () => fetch("https://server-tea-chat.vercel.app/users"),
      },
      {
        path: "/updateMain/:id",
        element: <UpdateMain />,
        loader: ({ params }) =>
          fetch(`https://server-tea-chat.vercel.app/status/${params.id}`),
      },
    ],
  },
  {
    path: "/*",
    element: <ForOhFor></ForOhFor>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
