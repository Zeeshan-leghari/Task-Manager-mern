import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import TaskList from "./assets/components/TaskList";
import AddTask from "./assets/components/AddTask";
import Registor from "./Auth/Registor.jsx";
import Login from "./Auth/Login.jsx";

// ✅ Define `ProtectedRoute` inside `index.jsx`
const isAuthorized = localStorage.getItem("jwt"); // Check if token exists
const ProtectedRoute = () => {
  
  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✅ Configure the router with `ProtectedRoute`
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // Protect all routes
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
        ],
      },
    ],
  },
  {
    path: "/login",
    element: isAuthorized ? <Navigate to="/" replace /> : <Login />, // Public route
  },
  {
    path: "/registor",
    element: isAuthorized ? <Navigate to="/" replace /> : <Registor />, // Public route
  },
]);

// ✅ Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
