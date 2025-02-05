import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Registor from "./Auth/Registor.jsx";
import Login from "./Auth/Login.jsx";
import TaskList from "./components/TaskList.jsx";
import AddTask from "./components/AddTask.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const isAuthorized = localStorage.getItem("jwt"); 
const ProtectedRoute = () => {
  
  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <TaskList />,
          },
          {
            path: "addtask",
            element: <AddTask />,
          },
          {
            path: "updatetask/:id",
            element: <AddTask />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: isAuthorized ? <Navigate to="/" replace /> : <Login />, 
  },
  {
    path: "/registor",
    element: isAuthorized ? <Navigate to="/" replace /> : <Registor />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
