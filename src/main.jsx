import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Post from "./Components/Post/Post.jsx";
import Update from "./Components/Update/Update.jsx";
import UpdateMain from "./Components/Update/UpdateMain.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    loader: () => fetch("http://localhost:4000/users"),
  },
  {
    path: "/post",
    element: <Post></Post>,
  },
  {
    path: "/update",
    element: <Update></Update>,
    loader: () => fetch("http://localhost:4000/users"),
  },
  {
    path: "/updateMain/:id",
    element: <UpdateMain />,
    loader: ({ params }) => fetch(`http://localhost:4000/users/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
